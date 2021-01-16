var productDAO = require('../../dao/product');
var stallDAO = require('../../dao/stall');
var orderDetailDAO = require('../../dao/order-detail');

var ObjectId = require('mongodb').ObjectId;

module.exports = 
{
	index: function(req, res, next)
	{ 
		var _id = req.query._id;

		productDAO.find({ stallId: _id }, function(productsOfStall)
		{
			var productIdsOfStall = [];

			for(var productOfStall of productsOfStall)
			{
				productIdsOfStall.push(''+productOfStall._id);
			}
				
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
					stallDAO.find({ _id: ObjectId(_id) }, function(stalls)
					{
						res.render('admin/top-10-product-of-stall.pug',
						{
							items: items,
							products: products,
							stall: stalls[0]
						});
					});
				});
			}, { $sort: { qtySale: -1 } }, { $match: { '_id': { $in: productIdsOfStall } } });
		});	
	}
};