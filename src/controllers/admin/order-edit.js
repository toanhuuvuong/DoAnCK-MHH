var orderDAO = require('../../dao/order');
var orderDetailDAO = require('../../dao/order-detail');
var customerDAO = require('../../dao/customer');
var productDAO = require('../../dao/product');

var ObjectId = require('mongodb').ObjectId;

module.exports = 
{
	index: function(req, res, next)
	{
		var { _id, startPage, page, perPage } = req.query;

		startPage = (startPage == undefined) ? 1 : parseInt(startPage);
		page = (page == undefined) ? 1 : parseInt(page);
		perPage = (perPage == undefined) ? 10 : parseInt(perPage);

		var start = (page - 1) * perPage;
		var end = page * perPage;

		orderDAO.find({ _id: ObjectId(_id) }, function(orders)
		{
			customerDAO.find({ _id: ObjectId(orders[0].customerId) }, function(customers)
			{
				orderDetailDAO.find({ orderId: _id }, function(orderDetails)
				{
					var productIds = [];

					for(var orderDetail of orderDetails)
					{
						productIds.push(ObjectId(orderDetail.productId));
					}

					productDAO.find({ _id: { $in: productIds } }, function(products)
					{
						res.render('admin/order-edit.pug', 
						{
							order: orders[0],
							customer: customers[0],
							orderDetails: orderDetails.slice(start, end),
							products: products,
							startPage: startPage,
							page: page,
							perPage: perPage
						});
					});
				});
			});
		});
	},
	indexPost: function(req, res, next) 
	{
		var { _id, startPage, page, perPage } = req.query;
		var { status, didDelete } = req.body;

		orderDAO.update({ _id: ObjectId(_id) }, { $set: { status: status, didDelete: (didDelete=='true') } }, function(result)
		{
			req.flash('success_msg', 'Updated successful :)');

            res.redirect('/admin-order-edit.html?_id=' + _id);
		});
	}
};