var orderDAO = require('../../dao/order');
var customerDAO = require('../../dao/customer');

var ObjectId = require('mongodb').ObjectId;

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
  
		orderDAO.find({}, function(orders)
		{
			var customerIds = [];
			
			for(var order of orders)
			{
				customerIds.push(ObjectId(order.customerId));
			}

			customerDAO.find({ _id: { $in: customerIds } }, function(customers)
			{
				res.render('admin/order-list.pug',
				{
					orders: orders.slice(start, end),
					customers: customers,
					startPage: startPage,
					page: page,
					perPage: perPage
				});
			});
		});
		
	}
};