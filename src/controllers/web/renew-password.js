var userDAO = require('../../dao/user');
var bcrypt = require('bcryptjs');

module.exports =
{
	index: function(req, res, next)
	{
		res.render('web/renew-password.pug');
	},
	indexPost: function(req, res, next)
	{
		var email = req.query.email;
		var { password1, password2 } = req.body;

		var errors = [];

		if(!password1 || !password2)
		{
			errors.push('You forget some fields :(');
		}
		if(password1 != password2)
		{
			errors.push('Your new password do not match :(');
		}
		if(password1.length <= 6)
		{
			errors.push('Your new password must be at least 7 characters :(');
		}

		if(errors.length > 0)
		{
			res.render('web/renew-password.pug', 
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

				bcrypt.genSalt(10, function(err, salt)
				{
			        bcrypt.hash(password1, salt, function(err, hash)
			        {
			            if (err) throw err;

			            userDAO.update({ email: email }, { $set: { password: hash } }, function(result)
						{
							req.flash('success_msg', 'Renew successful :)');

							res.redirect('/renew-password.html?email='+email);
						});
	        		});
	  			});
			});
		}
	}
};