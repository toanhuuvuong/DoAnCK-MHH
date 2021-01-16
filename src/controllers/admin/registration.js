var userDAO = require('../../dao/user');
var bcrypt = require('bcryptjs');

module.exports =
{
	index: function(req, res, next)
	{
		res.render('admin/registration.pug');
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
			res.render('admin/registration.pug', 
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
					userDAO.update({ email: email }, { $set: { type: 'admin' } }, function(result)
					{
						req.flash('success_msg', 'That email already exists, transfer its role from customer to admin :)');

						res.redirect('admin-registration.html');
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
						type: 'admin',
						didDelete: false
					}

					bcrypt.genSalt(10, function(err, salt)
					{
				        bcrypt.hash(newUser.password, salt, function(err, hash)
				        {
				            if (err) throw err;

				            newUser.password = hash;

				            userModel.insertOne(newUser, function(result)
				            {
				            	req.flash('success_msg', 'Registered successful :)');

				              	res.redirect('admin-registration.html');
				            });
		        		});
		  			});
				}
			});
		}
	},
	checkTheHighestAdmin: function(req, res, next)
	{
		if(req.user.email == 'toanhuuvuong.com@gmail.com')
		{
			next();
		}
		res.redirect('/admin-home.html');
	}
};