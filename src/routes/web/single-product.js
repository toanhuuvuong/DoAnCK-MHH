var express = require('express');
var controller = require("../../controllers/web/single-product");
var authentication = require('../../config/authentication');

var router = express.Router();

/* GET single-product page. */
router.get('/', authentication.checkLoginStatus, controller.index);

/* GET single-product/add-to-cart page. */
router.get('/add-to-cart/', authentication.checkLoginStatus, controller.addToCart);

/* POST single-product page. */
router.post('/', controller.indexPost);

module.exports = router;