var stallDAO = require('../../dao/stall');

var ObjectId = require('mongodb').ObjectId;

module.exports = 
{
	index: function(req, res, next)
	{
		res.render('admin/stall-add.pug');
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
			res.render('admin/stall-add.pug', 
			{
				errors: errors,
				values: req.body
			});
		}
		else
		{
			var newStall =
			{
				name: name,
				didDelete: false
			};
			stallDAO.insertOne(newStall, function(result)
			{
				req.flash('success_msg', 'Inserted successful :)');

	            res.redirect('/admin-stall-add.html');
			});
		}
	}
};