var productDAO = require('../../dao/product');
var stallDAO = require('../../dao/stall');
var brandDAO = require('../../dao/brand');

var ObjectId = require('mongodb').ObjectId;

module.exports = 
{
	index: function(req, res, next)
	{
		stallDAO.find({}, function(stalls)
		{
			brandDAO.find({}, function(brands)
			{
				res.render('admin/product-add.pug', 
				{
					stalls: stalls,
					brands: brands
				});
			});
		});
	},
	indexPost: function(req, res, next) 
	{
		console.log(req.body);

		var { stallId, brandId, name, oldPrice, price, qtyInStock, description } = req.body;
		var image = req.file ? req.file.path.split('/').slice(1).join('/') : '';
		var errors = [];

		if(!name || image=='' || !oldPrice || !price || !qtyInStock || !description)
		{
			errors.push('You forget some fields :(');
		}

		if(errors.length > 0)
		{
			stallDAO.find({}, function(stalls)
			{
				brandDAO.find({}, function(brands)
				{
					res.render('admin/product-add.pug', 
					{
						stalls: stalls,
						brands: brands,
						errors: errors,
						values: req.body
					});
				});
			});
		}
		else
		{
			var today = new Date();
			var dd = String(today.getDate()).padStart(2, '0');
			var mm = String(today.getMonth() + 1).padStart(2, '0');
			var yyyy = today.getFullYear();
			today = yyyy + '-' + mm + '-' + dd;

			var newProduct =
			{
				stallId: stallId,
				brandId: brandId,
				name: name,
				image: image,
				oldPrice: parseInt(oldPrice),
				price: parseInt(price),
				qtyInStock: parseInt(qtyInStock),
				createdDate: today,
				ratingStar: 0,
				numRate: 0,
				numView: 0,
				description: description,
				didDelete: false
			};
			productDAO.insertOne(newProduct, function(result)
			{
				req.flash('success_msg', 'Inserted successful :)');

	            res.redirect('/admin-product-add.html');
			});
		}
	}
};