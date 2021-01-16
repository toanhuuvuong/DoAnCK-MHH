var passport = require('passport');

module.exports =
{
	index: function(req, res, next)
	{
		res.render('admin/login.pug');
	},
	indexPost: function(req, res, next)
	{
		process.env.LOGIN_TYPE = 'admin';
		
		passport.authenticate('local', 
		{
		    successRedirect: 'admin-home.html',
		    failureRedirect: 'admin-login.html',
		    failureFlash: true
	  	})(req, res, next);
	}
};
