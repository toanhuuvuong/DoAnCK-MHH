var express = require('express');
var controller = require("../../controllers/web/login.js");
var authentication = require('../../config/authentication');

var router = express.Router();

/* GET login page. */
router.get('/', authentication.forwardAuthenticated, controller.index);

/* POST login page. */
router.post('/', controller.indexPost);

module.exports = router;