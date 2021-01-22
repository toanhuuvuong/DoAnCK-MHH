var customerDAO = require('../../dao/customer');
var orderDAO = require('../../dao/order');

var ObjectId = require('mongodb').ObjectId;
var Cart = require('../../models/cart');

module.exports =
{
	index: function(req, res, next)
	{
		var _id = req.query._id;

		if(!_id)
		{
			res.redirect('home.html');
		}
		else
		{
			orderDAO.find({ _id: ObjectId(_id) }, function(orders)
			{
				if(orders.length==0)
				{
					res.redirect('home.html');
				}
				else
				{
					var order = orders[0];

					var cartModel = new Cart((req.session.cart) ? req.session.cart : {});

					customerDAO.find({ _id: ObjectId(order.customerId) }, function(customers)
					{
						var customer = customers[0];

						res.render('web/confirmation.pug', 
						{
							storedItems: cartModel.generateArray(),
							totalPrice: cartModel.totalPrice,
							order: order,
							customer: customer
						});
					});
				}
			});	
		}
	}
};