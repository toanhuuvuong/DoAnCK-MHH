var orderDAO = require('../../dao/order');
var orderDetailDAO = require('../../dao/order-detail');
var productDAO = require('../../dao/product');
var customerDAO = require('../../dao/customer');

var ObjectId = require('mongodb').ObjectId;

module.exports = 
{
	// -- Lấy top 10 sản phẩm mới nhất và phổ biến nhất
	index: function(req, res, next)
	{
		customerDAO.find({ email: req.user.email }, function(customers)
		{
			var customerIds = [];
			for(customer of customers)
			{
				customerIds.push('' + customer._id);
			}

			orderDAO.find({ customerId: { $in: customerIds }, didDelete: false }, function(orders)
			{
				var orderIds = [];
				for(order of orders)
				{
					orderIds.push('' + order._id);
				}
				orderDetailDAO.find({ orderId: { $in: orderIds } }, function(orderDetails)
				{
					var productIds = [];
					for(orderDetail of orderDetails)
					{
						productIds.push(ObjectId(orderDetail.productId));
					}
					productDAO.find({ _id: { $in: productIds } }, function(products)
					{
						res.render('web/tracking.pug', 
						{
							orders: orders,
							orderDetails: orderDetails,
							products: products
						});
					});
				});
			});
		});
	}
};