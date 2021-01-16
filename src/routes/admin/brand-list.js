var express = require('express');
var controller = require("../../controllers/admin/brand-list");
var authentication = require("../../config/authentication");

var router = express.Router();

/* GET brand-list page. */
router.get('/', authentication.ensureAuthenticatedAdmin, controller.index);

module.exports = router;