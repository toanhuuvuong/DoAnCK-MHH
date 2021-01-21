var express = require('express');
var controller = require("../../controllers/web/checkout.js");
var authentication = require('../../config/authentication');

var router = express.Router();

/* GET checkout page. */
router.get('/', authentication.ensureAuthenticated, controller.index);

/* GET checkout/check-coupon page. */
router.get('/check-coupon/', authentication.ensureAuthenticated, controller.checkCoupon);

/* POST checkout page. */
router.post('/', controller.indexPost);

module.exports = router;