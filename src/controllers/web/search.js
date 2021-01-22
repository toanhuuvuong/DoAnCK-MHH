var productDAO = require('../../dao/product');

module.exports = 
{
	// Lấy danh sách sản phẩm theo từ khoá
	index: function(req, res, next)
	{
		var { key, sort, startPage, page, perPage } = req.query;

		startPage = (startPage == undefined) ? 1 : parseInt(startPage);
		page = (page == undefined) ? 1 : parseInt(page);
		perPage = (perPage == undefined) ? 8 : parseInt(perPage);

		var start = (page - 1) * perPage;
		var end = page * perPage;
  
		var query, options;
		
		if(sort == undefined)
		{
			query = 
			{ 
				name: { $regex: key, $options: 'i' },
				didDelete: false
			};
			options = {};
		}
		else
		{
			query = 
			{ 
				name: { $regex: key, $options: 'i' },
				didDelete: false
			};
			options = { 'price': parseInt(sort) };
		}

		productDAO.find(query, function(products)
		{
			res.render('web/search.pug', 
			{
				products: products.slice(start, end),
				key: key,
				sort: sort,
				startPage: startPage,
				page: page,
				perPage: perPage
			});
		}, options);
	}
};