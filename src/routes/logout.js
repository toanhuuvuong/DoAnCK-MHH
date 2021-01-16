var express = require('express');

var router = express.Router();

router.get('/', function(req, res) 
{
	req.logout();

	req.flash('success_msg', 'You are logged out :)');

	if(process.env.LOGIN_TYPE != 'admin')
	{
		process.env.DID_LOGIN = 'FALSE';
		res.redirect('login.html');
    }
	else
	{
		process.env.DID_LOGIN_ADMIN = 'FALSE';
		res.redirect('admin-login.html');
	}
});

module.exports = router;