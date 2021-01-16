var express = require('express');
var controller = require("../../controllers/admin/stall-edit");
var authentication = require("../../config/authentication");

var router = express.Router();

/* GET stall-edit page. */
router.get('/', authentication.ensureAuthenticatedAdmin, controller.index);

/* POST stall-edit page. */
router.post('/', controller.indexPost);

module.exports = router;