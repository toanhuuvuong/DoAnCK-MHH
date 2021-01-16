var express = require('express');
var controller = require("../../controllers/admin/revenue-statistics");
var authentication = require("../../config/authentication");

var router = express.Router();

/* GET revenue-statistics page. */
router.get('/', authentication.ensureAuthenticatedAdmin, controller.index);

module.exports = router;