var express = require('express');
var controller = require("../../controllers/web/renew-password.js");
var authentication = require('../../config/authentication');

var router = express.Router();

/* GET renew-password page. */
router.get('/', authentication.checkLoginStatus, controller.index);

/* POST renew-password page. */
router.post('/', controller.indexPost);


module.exports = router;