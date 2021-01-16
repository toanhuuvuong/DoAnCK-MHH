var express = require('express');
var controller = require("../../controllers/admin/update-admin-info.js");
var authentication = require('../../config/authentication');

var router = express.Router();

/* GET update-admin-info page. */
router.get('/', authentication.ensureAuthenticatedAdmin, controller.index);

/* POST update-admin-info page. */
router.post('/', controller.indexPost);

module.exports = router;