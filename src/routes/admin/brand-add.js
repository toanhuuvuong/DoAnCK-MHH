var express = require('express');
var controller = require("../../controllers/admin/brand-add");
var authentication = require("../../config/authentication");

var router = express.Router();

/* GET brand-add page. */
router.get('/', authentication.ensureAuthenticatedAdmin, controller.index);

/* POST brand-add page. */
router.post('/', controller.indexPost);

module.exports = router;