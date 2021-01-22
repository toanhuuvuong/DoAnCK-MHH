var userDAO = require('../../dao/user');
var bcrypt = require('bcryptjs');

module.exports =
{
	index: function(req, res, next)
	{
		res.render('web/registration.pug');
	},
	indexPost: function(req, res, next) 
	{
		var { name, phone, gender, birth, email, password1, password2 } = req.body;

		var errors = [];

		if(!name || !phone || !birth || !email || !password1 || !password2)
		{
			errors.push('You forget some fields :(');
		}
		if(password1 != password2)
		{
			errors.push('Your password do not match :(');
		}
		if(password1.length <= 6)
		{
			errors.push('Your password must be at least 7 characters :(');
		}

		if(errors.length > 0)
		{
			res.render('web/registration.pug', 
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

				if(user)
				{
					errors.push('Email already exists :(');
			    	res.render('web/registration.pug', 
					{
						errors: errors,
						values: req.body
					});
				}
				else
				{
					var newUser = 
					{
						name: name,
						phone: phone,
						gender: gender,
						birth: birth,
						email: email,
						password: password1,
						type: 'customer',
						didDelete: false
					}

					bcrypt.genSalt(10, function(err, salt)
					{
				        bcrypt.hash(newUser.password, salt, function(err, hash)
				        {
				            if (err) throw err;

				            newUser.password = hash;

				            userDAO.insertOne(newUser, function(result)
				            {
				            	req.flash('success_msg', 'You are now registered and can log in :)');

				              	res.redirect('login.html');
				            });
		        		});
		  			});
				}
			});
		}
	}
};