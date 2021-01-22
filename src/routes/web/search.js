var express = require('express');
var controller = require("../../controllers/web/search");
var authentication = require('../../config/authentication');

var router = express.Router();

/* GET search page. */
router.get('/', authentication.checkLoginStatus, controller.index);

module.exports = router;