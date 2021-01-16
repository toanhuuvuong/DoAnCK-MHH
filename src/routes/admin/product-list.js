var express = require('express');
var controller = require("../../controllers/admin/product-list");
var authentication = require("../../config/authentication");

var router = express.Router();

/* GET product-list page. */
router.get('/', authentication.ensureAuthenticatedAdmin, controller.index);

module.exports = router;