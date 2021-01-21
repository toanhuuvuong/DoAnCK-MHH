var userDAO = require('../../dao/user');

module.exports =
{
	index: function(req, res, next)
	{
		res.render('web/forgot-password.pug');
	},
	indexPost: function(req, res, next)
	{	
		var { email } = req.body;

		var errors = [];

		if(!email)
		{
			errors.push('You forget some fields :(');
		}

		if(errors.length > 0)
		{
			res.render('web/forgot-password.pug', 
			{
				errors: errors,
				values: req.body
			});
		}
		else
		{
			userDAO.find({ email: email }, function(users)
			{
				var user = users[0];

				if(!user)
				{
					errors.push('That email is not registered :(');
			    	res.render('web/forgot-password.pug', 
					{
						errors: errors,
						values: req.body
					});
				}
				else if(user.didDelete)
				{
					errors.push('Your account is locked :(');
			    	res.render('web/forgot-password.pug', 
					{
						errors: errors,
						values: req.body
					});
				}
				else
				{
				    res.redirect('/renew-password.html?email='+email);
				}
			});
		}
	}
};