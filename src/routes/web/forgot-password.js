var express = require('express');
var controller = require("../../controllers/web/forgot-password.js");
var authentication = require('../../config/authentication');

var router = express.Router();

/* GET forgot-password page. */
router.get('/', authentication.checkLoginStatus, controller.index);

/* POST forgot-password page. */
router.post('/', controller.indexPost);


module.exports = router;