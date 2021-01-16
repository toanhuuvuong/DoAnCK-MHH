var express = require('express');
var controller = require("../../controllers/admin/home");
var authentication = require("../../config/authentication");

var router = express.Router();

/* GET home page. */
router.get('/', authentication.ensureAuthenticatedAdmin, controller.index);

module.exports = router;