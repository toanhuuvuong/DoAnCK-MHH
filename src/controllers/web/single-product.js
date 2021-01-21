var productDAO = require('../../dao/product');
var reviewDAO = require('../../dao/review');
var userDAO = require('../../dao/user');
var brandDAO = require('../../dao/brand');

var ObjectId = require('mongodb').ObjectId;
var Cart = require('../../models/cart');

module.exports =
{
	index: function(req, res, next) 
	{
		var { _id, startPage, page, perPage } = req.query;

		startPage = (startPage == undefined) ? 1 : parseInt(startPage);
		page = (page == undefined) ? 1 : parseInt(page);
		perPage = (perPage == undefined) ? 3 : parseInt(perPage);

		var start = (page - 1) * perPage;
		var end = page * perPage;

		productDAO.find({ _id: ObjectId(_id) }, function(products)
		{
			var product = products[0];

			productDAO.update({ _id: ObjectId(_id) }, { $set: { numView: product.numView + 1 } } , function(result)
			{
				reviewDAO.find({ productId: _id }, function(reviews)
				{
					brandDAO.find({ _id: ObjectId(product.brandId) }, function(brands)
					{
						productDAO.find({ brandId: product.brandId }, function(products)
						{
							var top9MostRelatedProduct = products.slice(0, 9);

							res.render('web/single-product.pug', 
							{
								product: product,
								productBrand: brands[0].name,
								reviews: reviews.slice(start, end),
								startPage: startPage,
								page: page,
								perPage: perPage,
								top9MostRelatedProduct: top9MostRelatedProduct
							});
						});
					});
				});
			});
		});
	},
	indexPost: function(req, res, next) 
	{	
		var { email, name, comment, rating } = req.body;

		var { _id, startPage, page, perPage } = req.query;

		startPage = (startPage == undefined) ? 1 : parseInt(startPage);
		page = (page == undefined) ? 1 : parseInt(page);
		perPage = (perPage == undefined) ? 3 : parseInt(perPage);

		var start = (page - 1) * perPage;
		var end = page * perPage;

		var errors = [];

		if(!comment || !rating)
		{
			errors.push('You forget some fields :(');
			productDAO.find({ _id: ObjectId(_id) }, function(products)
			{
				reviewDAO.find({ productId: _id }, function(reviews)
				{
					brandDAO.find({ _id: ObjectId(products[0].brandId) }, function(brands)
					{
						productDAO.find({ brandId: product.brandId }, function(products)
						{
							var top9MostRelatedProduct = products.slice(0, 9);

							res.render('web/single-product.pug', 
							{
								product: products[0],
								productBrand: brands[0].name,
								reviews: reviews.slice(start, end),
								startPage: startPage,
								page: page,
								perPage: perPage,
								top9MostRelatedProduct: top9MostRelatedProduct,
								errors: errors,
								values: req.body
							});
						});
					});
				});
			});
		}
		else
		{
			if(!email || !name)
			{
				if(process.env.DID_LOGIN == 'FALSE')
				{
					errors.push('You forget some fields :(');
					productDAO.find({ _id: ObjectId(_id) }, function(products)
					{
						reviewDAO.find({ productId: _id }, function(reviews)
						{
							brandDAO.find({ _id: ObjectId(products[0].brandId) }, function(brands)
							{								
								productDAO.find({ brandId: product.brandId }, function(products)
								{
									var top9MostRelatedProduct = products.slice(0, 9);

									res.render('web/single-product.pug', 
									{
										product: products[0],
										productBrand: brands[0].name,
										reviews: reviews.slice(start, end),
										startPage: startPage,
										page: page,
										perPage: perPage,
										top9MostRelatedProduct: top9MostRelatedProduct,
										errors: errors,
										values: req.body
									});
								});
							});
						});
					});
				}
				else
				{
					userDAO.find({ email: req.user.email }, function(users)
					{
						var user = users[0];

						email = user.email;
						name = user.name;

						var today = new Date();
						var dd = String(today.getDate()).padStart(2, '0');
						var mm = String(today.getMonth() + 1).padStart(2, '0');
						var yyyy = today.getFullYear();
						today = yyyy + '-' + mm + '-' + dd;

						var newReview = 
						{
							productId: _id,
							email: email,
							name: name,
							rating: parseInt(rating),
							comment: comment,
							commentedDate: today,
							didDelete: false
						}

						reviewDAO.insertOne(newReview, function(result)
						{
							productDAO.find({ _id: ObjectId(_id) }, function(products)
							{ 
								var product = products[0];
								var numRate = product.numRate + 1;
								var ratingStar = (product.ratingStar * product.numRate + newReview.rating) / numRate;
								
								productDAO.update({ _id: ObjectId(_id) }, { $set: { ratingStar: ratingStar, numRate: numRate } }, function(result)
								{
									req.flash('success_msg', 'Review successful :)');
									res.redirect('/single-product.html?_id=' + _id + '&startPage=' + startPage + '&page=' + page + '&perPage=' + perPage);
								});
							});
						});
					});
				}
			}
			else
			{
				var today = new Date();
				var dd = String(today.getDate()).padStart(2, '0');
				var mm = String(today.getMonth() + 1).padStart(2, '0');
				var yyyy = today.getFullYear();
				today = yyyy + '-' + mm + '-' + dd;

				var newReview = 
				{
					productId: _id,
					email: email,
					name: name,
					rating: parseInt(rating),
					comment: comment,
					commentedDate: today,
					didDelete: false
				}

				reviewDAO.insertOne(newReview, function(result)
				{
					productDAO.find({ _id: ObjectId(_id) }, function(products)
					{ 
						var product = products[0];
						var numRate = products[0].numRate + 1;
						var ratingStar = (product.ratingStar * product.numRate + newReview.rating) / numRate;
						
						productDAO.update({ _id: ObjectId(_id) }, { $set: { ratingStar: ratingStar, numRate: numRate } }, function(result)
						{
							req.flash('success_msg', 'Review successful :)');
							res.redirect('/single-product.html?_id=' + _id + '&startPage=' + startPage + '&page=' + page + '&perPage=' + perPage);
						});
					});
				});
			}
		}
	},
	addToCart: function(req, res, next)
	{
		productDAO.find({ _id: ObjectId(req.query._id) }, function(products)
		{
			var product = products[0];
			var cartModel = new Cart((req.session.cart) ? req.session.cart : {});

			cartModel.add(product, product._id, parseInt(req.query.qty));

			req.session.cart = cartModel;

			res.redirect('/single-product.html?_id='+product._id);
		});
	}
};