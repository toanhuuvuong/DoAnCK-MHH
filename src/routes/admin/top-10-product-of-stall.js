var express = require('express');
var controller = require("../../controllers/admin/top-10-product-of-stall");
var authentication = require("../../config/authentication");

var router = express.Router();

/* GET top-10-product-of-stall page. */
router.get('/', authentication.ensureAuthenticatedAdmin, controller.index);

module.exports = router;