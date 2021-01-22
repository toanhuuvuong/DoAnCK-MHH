var express = require('express');
var controller = require("../../controllers/web/registration.js");
var authentication = require('../../config/authentication');

var router = express.Router();

/* GET registration page. */
router.get('/', authentication.forwardAuthenticated, controller.index);

/* POST registration page. */
router.post('/', controller.indexPost);

module.exports = router;