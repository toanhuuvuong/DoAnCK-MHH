var userDAO = require('../../dao/user');

var ObjectId = require('mongodb').ObjectId;

module.exports = 
{
	index: function(req, res, next)
	{
		var _id = req.query._id;

		userDAO.find({ _id: ObjectId(_id) }, function(users)
		{
			res.render('admin/account-edit.pug', 
			{
				user: users[0],
				currentEmail: req.user.email
			});
		});
	},
	indexPost: function(req, res, next) 
	{
		var _id = req.query._id;
		var { didDelete } = req.body;

		userDAO.update({ _id: ObjectId(_id) }, { $set: { didDelete: (didDelete=='true') } }, function(result)
		{
			req.flash('success_msg', 'Updated successful :)');

            res.redirect('/admin-account-edit.html?_id=' + _id);
		});
	}
};