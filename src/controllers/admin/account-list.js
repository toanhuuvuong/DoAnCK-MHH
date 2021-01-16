var userDAO = require('../../dao/user');

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
  
		userDAO.find({}, function(users)
		{
			res.render('admin/account-list.pug', 
			{
				users: users.slice(start, end),
				startPage: startPage,
				page: page,
				perPage: perPage
			});
		});
		
	}
};