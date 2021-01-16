var express = require('express');
var controller = require("../../controllers/admin/stall-list");
var authentication = require("../../config/authentication");

var router = express.Router();

/* GET stall-list page. */
router.get('/', authentication.ensureAuthenticatedAdmin, controller.index);

module.exports = router;