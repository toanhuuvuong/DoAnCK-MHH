var productDAO = require('../../dao/product');

module.exports = 
{
	index: function(req, res, next)
	{
		var { startPage, page, perPage } = req.query;

		startPage = (startPage == undefined) ? 1 : parseInt(startPage);
		page = (page == undefined) ? 1 : parseInt(page);
		perPage = (perPage == undefined) ? 10 : parseInt(perPage);

		var start = (page - 1) * perPage;
		var end = page * perPage;
  
		productDAO.find({}, function(products)
		{
			res.render('admin/product-list.pug',
			{
				products: products.slice(start, end),
				startPage: startPage,
				page: page,
				perPage: perPage
			});
		});
		
	}
};