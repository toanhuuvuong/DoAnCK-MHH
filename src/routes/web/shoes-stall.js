var express = require('express');
var controller = require("../../controllers/web/shoes-stall.js");
var authentication = require('../../config/authentication');

var router = express.Router();

/* GET shoes-stall page. */
router.get('/', authentication.checkLoginStatus, controller.index);

module.exports = router;