var express = require('express');
var controller = require("../../controllers/admin/order-edit");
var authentication = require("../../config/authentication");

var router = express.Router();

/* GET order-edit page. */
router.get('/', authentication.ensureAuthenticatedAdmin, controller.index);

/* POST order-edit page. */
router.post('/', controller.indexPost);

module.exports = router;