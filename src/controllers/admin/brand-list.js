var brandDAO = require('../../dao/brand');

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
  
		brandDAO.find({}, function(brands)
		{
			res.render('admin/brand-list.pug',
			{
				brands: brands.slice(start, end),
				startPage: startPage,
				page: page,
				perPage: perPage
			});
		});
		
	}
};