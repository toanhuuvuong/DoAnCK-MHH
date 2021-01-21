var passport = require('passport');

module.exports =
{
	index: function(req, res, next)
	{
		res.render('web/login.pug');
	},
	indexPost: function(req, res, next)
	{
		process.env.LOGIN_TYPE = 'customer';

		passport.authenticate('local', 
		{
		    successRedirect: 'home.html',
		    failureRedirect: 'login.html',
		    failureFlash: true
	  	})(req, res, next);
	}
};
