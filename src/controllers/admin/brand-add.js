var brandDAO = require('../../dao/brand');

var ObjectId = require('mongodb').ObjectId;

module.exports = 
{
	index: function(req, res, next)
	{
		res.render('admin/brand-add.pug');
	},
	indexPost: function(req, res, next) 
	{
		var { name } = req.body;

		var errors = [];
		
		if(!name)
		{
			errors.push('You forget some fields :(');
		}

		if(errors.length > 0)
		{
			res.render('admin/brand-add.pug', 
			{
				errors: errors,
				values: req.body
			});
		}
		else
		{
			var newBrand =
			{
				name: name,
				didDelete: false
			};
			brandDAO.insertOne(newBrand, function(result)
			{
				req.flash('success_msg', 'Inserted successful :)');

	            res.redirect('/admin-brand-add.html');
			});
		}
	}
};