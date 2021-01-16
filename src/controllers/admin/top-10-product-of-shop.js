var productDAO = require('../../dao/product');
var stallDAO = require('../../dao/stall');
var orderDetailDAO = require('../../dao/order-detail');

var ObjectId = require('mongodb').ObjectId;

module.exports = 
{
	index: function(req, res, next)
	{ 
		orderDetailDAO.aggregate({ $group: { _id: '$productId', qtySale: { $sum: '$qty' } } }, function(orderDetails)
		{
			var items = orderDetails.slice(0, 10);

			var productIds = [];

			for(var item of items)
			{
				productIds.push(ObjectId(item._id));
			}

			productDAO.find({ _id: { $in: productIds } }, function(products)
			{
				stallDAO.find({}, function(stalls)
				{
					res.render('admin/top-10-product-of-shop.pug',
					{
						items: items,
						products: products,
						stalls: stalls
					});
				});
			});
		}, { $sort: { qtySale: -1 } }, { $match: {} });		
	}
};