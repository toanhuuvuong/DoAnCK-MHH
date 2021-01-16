var express = require('express');
var controller = require("../../controllers/admin/stall-add");
var authentication = require("../../config/authentication");

var router = express.Router();

/* GET stall-add page. */
router.get('/', authentication.ensureAuthenticatedAdmin, controller.index);

/* POST stall-add page. */
router.post('/', controller.indexPost);

module.exports = router;