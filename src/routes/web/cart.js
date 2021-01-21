var express = require('express');
var controller = require("../../controllers/web/cart.js");
var authentication = require('../../config/authentication');

var router = express.Router();

/* GET cart page. */
router.get('/', authentication.checkLoginStatus, controller.index);

/* GET cart/remove-item page. */
router.get('/remove-item/', authentication.checkLoginStatus, controller.removeItem);

/* POST cart page. */
router.post('/', controller.indexPost);

module.exports = router;