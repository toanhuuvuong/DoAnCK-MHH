var productDAO = require('../../dao/product');

module.exports = 
{
	// Lấy danh sách sản phẩm theo nhiều tiêu chí
	index: function(req, res, next)
	{
		var { brandId, gte, lte, sort, startPage, page, perPage } = req.query;

		startPage = (startPage == undefined) ? 1 : parseInt(startPage);
		page = (page == undefined) ? 1 : parseInt(page);
		perPage = (perPage == undefined) ? 8 : parseInt(perPage);

		var start = (page - 1) * perPage;
		var end = page * perPage;
  
		var query, options;
		
		if(brandId == undefined)
		{
			if(gte == undefined)
			{
				if(sort == undefined)
				{
					query = 
					{ 
						stallId: "5e0afc1b1c9d44000022aa62",
						didDelete: false
					};
					options = {};
				}
				else
				{
					query = 
					{ 
						stallId: "5e0afc1b1c9d44000022aa62",
						didDelete: false
					};
					options = { 'price': parseInt(sort) };
				}
			}
			else
			{
				if(sort == undefined)
				{
					query = 
					{ 
						stallId: "5e0afc1b1c9d44000022aa62",
						didDelete: false, 
						price: { $gte: parseInt(gte), $lte: parseInt(lte) } 
					};
					options = {};
				}
				else
				{
					query = 
					{
						stallId: "5e0afc1b1c9d44000022aa62", 
						didDelete: false,
						price: { $gte: parseInt(gte), $lte: parseInt(lte) } 
					};
					options = { 'price': parseInt(sort) };
				}
			}
		}
		else
		{
			if(gte == undefined)
			{
				if(sort == undefined)
				{
					query = 
					{
						stallId: "5e0afc1b1c9d44000022aa62", 
						didDelete: false,
						brandId: brandId
					};
					options = {};
				}
				else
				{
					query = 
					{
						stallId: "5e0afc1b1c9d44000022aa62", 
						didDelete: false,
						brandId: brandId
					};
					options = { 'price': parseInt(sort) };
				}
			}
			else
			{
				if(sort == undefined)
				{
					query = 
					{
						stallId: "5e0afc1b1c9d44000022aa62", 
						didDelete: false,
						brandId: brandId, 
						price: { $gte: parseInt(gte), $lte: parseInt(lte) } 
					};
					options = {};
				}
				else
				{
					query = 
					{ 
						stallId: "5e0afc1b1c9d44000022aa62",
						didDelete: false,
						brandId: brandId, 
						price: { $gte: parseInt(gte), $lte: parseInt(lte) } 
					};
					options = { 'price': parseInt(sort) };
				}
			}
		}
		productDAO.find(query, function(products)
		{
			productDAO.aggregate({ $project: { name: 1, image: 1, oldPrice: 1, price: 1, priceDifference: { $subtract: ['$oldPrice', '$price'] } } }, function(results)
			{
				var top9MostDiscountProduct = results.slice(0, 9);

				res.render('web/shoes-stall.pug', 
				{
					products: products.slice(start, end),
					brandId: brandId,
					gte: gte,
					lte: lte,
					sort: sort,
					startPage: startPage,
					page: page,
					perPage: perPage,
					top9MostDiscountProduct: top9MostDiscountProduct
				});
			}, { $sort: { priceDifference: -1 } }, { $match: {} });
		}, options);
	}
};