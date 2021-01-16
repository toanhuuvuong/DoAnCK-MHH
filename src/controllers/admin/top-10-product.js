var stallDAO = require('../../dao/stall');

module.exports = 
{
	index: function(req, res, next)
	{
		stallDAO.find({}, function(stalls)
		{		
			res.render('admin/top-10-product.pug',
			{
				stalls: stalls
			});
		});
	},
	indexPost: function(req, res, next)
	{
		var { stallId } = req.body;

		res.redirect('admin-top-10-product-of-stall.html?_id=' + stallId);
	},
};