var express = require('express');
var controller = require("../../controllers/web/tracking.js");
var authentication = require('../../config/authentication');

var router = express.Router();

/* GET tracking page. */
router.get('/', authentication.ensureAuthenticated, controller.index);

module.exports = router;