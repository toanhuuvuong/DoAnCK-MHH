var stallDAO = require('../../dao/stall');

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
  
		stallDAO.find({}, function(stalls)
		{
			res.render('admin/stall-list.pug',
			{
				stalls: stalls.slice(start, end),
				startPage: startPage,
				page: page,
				perPage: perPage
			});
		});
		
	}
};