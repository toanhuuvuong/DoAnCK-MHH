var express = require('express');
var controller = require("../../controllers/admin/top-10-product");
var authentication = require("../../config/authentication");

var router = express.Router();

/* GET top-10-product page. */
router.get('/', authentication.ensureAuthenticatedAdmin, controller.index);

/* POST top-10-product page. */
router.post('/', controller.indexPost);

module.exports = router;