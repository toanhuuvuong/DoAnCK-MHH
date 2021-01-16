var orderDAO = require('../../dao/order');
var orderDetailDAO = require('../../dao/order-detail');
var customerDAO = require('../../dao/customer');

var ObjectId = require('mongodb').ObjectId;

module.exports = 
{
	index: function(req, res, next)
	{
		var { typeRevenue, date, month, monthYear, year, startDate, endDate, startPage, page, perPage } = req.query;

		startPage = (startPage == undefined) ? 1 : parseInt(startPage);
		page = (page == undefined) ? 1 : parseInt(page);
		perPage = (perPage == undefined) ? 10 : parseInt(perPage);

		var start = (page - 1) * perPage;
		var end = page * perPage;
  
		var queryBefore = '';
		var query;

		if(typeRevenue=='1')
		{
			queryBefore='typeRevenue='+typeRevenue+'&date='+date;
			query = 
			{
				orderDate: date
			};
		}
		else if(typeRevenue=='2')
		{
			queryBefore='typeRevenue='+typeRevenue+'&month='+month+'&monthYear='+monthYear;
			query = 
			{
				orderDate: { $regex : monthYear+'-'+month } 
			};
		}
		else if(typeRevenue=='3')
		{
			queryBefore='typeRevenue='+typeRevenue+'&year='+year;
			query = 
			{
				orderDate: { $regex : year } 
			};
		}
		else
		{
			queryBefore='typeRevenue='+typeRevenue+'&startDate='+startDate+'&endDate='+endDate;
			query = 
			{
				orderDate: { $gte: startDate, $lte: endDate } 
			};
		}

		orderDAO.find(query, function(orders)
		{
			var customerIds = [];
			var orderIds = [];
			var totalRevenue = 0;

			for(var order of orders)
			{
				customerIds.push(ObjectId(order.customerId));
				orderIds.push(''+order._id);
				totalRevenue += order.total;
			}

			orderDetailDAO.find({ orderId: { $in: orderIds } }, function(orderDetails)
			{
				var qtyRevenue = 0;

				for(var orderDetail of orderDetails)
				{
					qtyRevenue += orderDetail.qty;
				}

				customerDAO.find({ _id: { $in: customerIds } }, function(customers)
				{
					res.render('admin/revenue-statistics.pug',
					{
						orders: orders.slice(start, end),
						customers: customers,
						totalRevenue: totalRevenue,
						qtyRevenue: qtyRevenue,
						queryBefore: queryBefore,
						startPage: startPage,
						page: page,
						perPage: perPage
					});
				});
			});
		});
		
	}
};