var express = require('express');
var controller = require("../../controllers/admin/revenue");
var authentication = require("../../config/authentication");

var router = express.Router();

/* GET revenue page. */
router.get('/', authentication.ensureAuthenticatedAdmin, controller.index);

/* POST revenue page. */
router.post('/', controller.indexPost);

module.exports = router;