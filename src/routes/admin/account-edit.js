var express = require('express');
var controller = require("../../controllers/admin/account-edit");
var authentication = require("../../config/authentication");

var router = express.Router();

/* GET account-edit page. */
router.get('/', authentication.ensureAuthenticatedAdmin, controller.index);

/* POST account-edit page. */
router.post('/', controller.indexPost);

module.exports = router;