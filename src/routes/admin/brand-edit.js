var express = require('express');
var controller = require("../../controllers/admin/brand-edit");
var authentication = require("../../config/authentication");

var router = express.Router();

/* GET brand-edit page. */
router.get('/', authentication.ensureAuthenticatedAdmin, controller.index);

/* POST brand-edit page. */
router.post('/', controller.indexPost);

module.exports = router;