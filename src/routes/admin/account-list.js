var express = require('express');
var controller = require("../../controllers/admin/account-list");
var authentication = require("../../config/authentication");

var router = express.Router();

/* GET account-list page. */
router.get('/', authentication.ensureAuthenticatedAdmin, controller.index);

module.exports = router;