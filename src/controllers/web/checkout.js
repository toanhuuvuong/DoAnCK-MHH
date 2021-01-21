var couponDAO = require('../../dao/coupon');
var customerDAO = require('../../dao/customer');
var orderDAO = require('../../dao/order');
var orderDetailDAO = require('../../dao/order-detail');

var Cart = require('../../models/cart');

module.exports =
{
	index: function(req, res, next)
	{
		var cartModel = new Cart((req.session.cart) ? req.session.cart : {});
		
		res.render('web/checkout.pug', 
		{
			storedItems: cartModel.generateArray(),
			totalPrice: cartModel.totalPrice,
			values: req.query
		});
	},
	checkCoupon: function(req, res, next)
	{
		var code = req.query.code;

		if(code=='')
		{
			res.redirect('/checkout.html');
		}
		else
		{
			couponDAO.find({ code: code, didDelete: false }, function(coupons)
			{
				var discount = 0;
				if(coupons.length)
				{
					discount = coupons[0].discount;
				}

				req.flash('discount', discount);

				res.redirect('/checkout.html?code=' + code);
			});
		}
	},
	indexPost: function(req, res, next)
	{
		var { code, discount, name, phone, address, shipType} = req.body;

		var errors = [];

		var cartModel = new Cart((req.session.cart) ? req.session.cart : {});

		if(!name || !phone || !address || !shipType)
		{
			errors.push('You forget some fields :(');
		}

		if(errors.length > 0)
		{
			res.render('web/checkout.pug', 
			{
				storedItems: cartModel.generateArray(),
				totalPrice: cartModel.totalPrice,
				errors: errors,
				values: req.body
			});
		}
		else
		{
			var newCustomer = 
			{
				email: req.user.email,
				name: name,
				phone: phone,
				address: address,
				didDelete: false
			}
			customerDAO.insertOne(newCustomer, function(promise)
			{
				promise.then(function(result)
				{
					var shipCharge = 0;
					if(shipType=='veryFast')
					{
						shipCharge = 15;
					}
					if(shipType=='fast')
					{
						shipCharge = 10;
					}
					if(shipType=='normal')
					{
						shipCharge = 5;
					}

					var today = new Date();
					var dd = String(today.getDate()).padStart(2, '0');
					var mm = String(today.getMonth() + 1).padStart(2, '0');
					var yyyy = today.getFullYear();
					today = yyyy + '-' + mm + '-' + dd;

					var newOrder = 
					{
						customerId: ''+result.ops[0]._id,
						coupon: code,
						discount: parseInt(discount),
						shipCharge: shipCharge,
						total: cartModel.totalPrice + shipCharge - parseInt(discount),
						status: 'Chưa giao',
						orderDate: today,
						didDelete: false
					}
					orderDAO.insertOne(newOrder, function(promise)
					{
						promise.then(function(result)
						{
							var listOrderDetail = [];
							for(var storedItem of cartModel.generateArray())
							{
								var newOrderDetail = 
								{
									orderId: ''+result.ops[0]._id,
									productId: storedItem.item._id,
									qty: storedItem.qty,
									didDelete: false
								}
								listOrderDetail.push(newOrderDetail);
							}
							orderDetailDAO.insertMany(listOrderDetail, function(promise)
							{
								promise.then(function(result)
								{
									res.redirect('confirmation.html?_id='+result.ops[0].orderId);
								});
							});
						});

					});
				});				
			});
		}
	}
};