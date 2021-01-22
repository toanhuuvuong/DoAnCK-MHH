var express = require('express');
var controller = require("../../controllers/web/update-account-info.js");
var authentication = require('../../config/authentication');

var router = express.Router();

/* GET update-account-info page. */
router.get('/', authentication.ensureAuthenticated, controller.index);

/* POST update-account-info page. */
router.post('/', controller.indexPost);

module.exports = router;