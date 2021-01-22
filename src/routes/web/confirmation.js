var express = require('express');
var controller = require("../../controllers/web/confirmation.js");
var authentication = require('../../config/authentication');

var router = express.Router();

/* GET confirmation page. */
router.get('/', authentication.checkLoginStatus, controller.index);

module.exports = router;