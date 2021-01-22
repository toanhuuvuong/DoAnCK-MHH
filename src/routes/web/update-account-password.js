var express = require('express');
var controller = require("../../controllers/web/update-account-password.js");
var authentication = require('../../config/authentication');

var router = express.Router();

/* GET update-account-password page. */
router.get('/', authentication.ensureAuthenticated, controller.index);

/* POST update-account-password page. */
router.post('/', controller.indexPost);

module.exports = router;