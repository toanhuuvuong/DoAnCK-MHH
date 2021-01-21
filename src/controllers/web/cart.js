var Cart = require('../../models/cart');

module.exports= 
{
	index: function(req, res, next)
	{
		var cartModel = new Cart((req.session.cart) ? req.session.cart : {});
		
		res.render('web/cart.pug', 
		{
			storedItems: cartModel.generateArray(),
			totalQty: cartModel.totalQty,
			totalPrice: cartModel.totalPrice
		});
	},
	indexPost: function(req, res, next) 
	{
		var { qtys } = req.body;

		var cartModel = new Cart((req.session.cart) ? req.session.cart : {});

		cartModel.update(qtys);

		req.session.cart = cartModel;

		res.redirect('cart.html');
	},
	removeItem: function(req, res, next)
	{
		var cartModel = new Cart((req.session.cart) ? req.session.cart : {});

		cartModel.remove(req.query._id);

		req.session.cart = cartModel;

		res.redirect('/cart.html');
	}
};