var express = require('express');
var controller = require("../../controllers/web/home.js");
var authentication = require('../../config/authentication');

var router = express.Router();

/* GET home page. */
router.get('/', authentication.checkLoginStatus, controller.index);

module.exports = router;