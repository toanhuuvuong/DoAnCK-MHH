var userDAO = require('../../dao/user');

module.exports =
{
	index: function(req, res, next)
	{
		userDAO.find({ email: req.user.email }, function(users)
		{
			res.render('web/update-account-info.pug',
			{
				values: users[0]
			});
		});
	},
	indexPost: function(req, res, next) 
	{
		var { name, gender, birth } = req.body;
		var email = req.user.email;

		var errors = [];

		if(!name || !birth)
		{
			errors.push('You forget some fields :(');
		}

		if(errors.length > 0)
		{
			userDAO.find({ email: email }, function(users)
			{
				var values = users[0];
				values.name = name;
				values.gender = gender;
				values.birth = birth;	
				res.render('web/update-account-info.pug', 
				{
					errors: errors,
					values: values
				});
			});
		}
		else
		{
			userDAO.update({ email: email }, { $set: { name: name, gender: gender, birth: birth } }, function(result)
			{
				req.flash('success_msg', 'Updated successful :)');

				res.redirect('update-account-info.html');
			});
		}
	}
};