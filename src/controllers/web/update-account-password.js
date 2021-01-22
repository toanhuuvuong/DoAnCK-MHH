var userDAO = require('../../dao/user');
var bcrypt = require('bcryptjs');

module.exports =
{
	index: function(req, res, next)
	{
		res.render('web/update-account-password.pug');
	},
	indexPost: function(req, res, next) 
	{	
		var { password1, password2, password3 } = req.body;
		var email = req.user.email;

		var errors = [];

		if(!password1 || !password2 || !password3)
		{
			errors.push('You forget some fields :(');
		}

		userDAO.find({ email: email }, function(users)
		{
			var user = users[0];

			bcrypt.compare(password1, user.password, function(err, isMatch)
	      	{
	        	if (err) throw err;

	        	if (isMatch) 
	        	{
	          		if(password2 != password3)
					{
						errors.push('Your new password do not match :(');
					}
					if(password2.length <= 6)
					{
						errors.push('Your new password must be at least 7 characters :(');
					}
	        	} 
	        	else
	        	{
	        		errors.push('Your old password was wrong :(');
	        	}

	        	if(errors.length > 0)
				{
					res.render('web/update-account-password.pug', 
					{
						errors: errors,
					});
				}
				else
				{

					bcrypt.genSalt(10, function(err, salt)
					{
				        bcrypt.hash(password2, salt, function(err, hash)
				        {
				            if (err) throw err;

				            userDAO.update({ email: email }, { $set: { password: hash } }, function(result)
							{
								req.flash('success_msg', 'Updated successful :)');

								res.redirect('update-account-password.html');
							});
		        		});
		  			});
				}
	      	});
		});
	}
};