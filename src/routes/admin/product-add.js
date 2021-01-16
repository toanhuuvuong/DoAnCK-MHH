var express = require('express');
var controller = require("../../controllers/admin/product-add");
var authentication = require("../../config/authentication");
var multer = require('multer');

var router = express.Router();

var upload = multer({ dest: './public/img/product' });

/* GET product-add page. */
router.get('/', authentication.ensureAuthenticatedAdmin, controller.index);

/* POST product-add page. */
router.post('/', upload.single('image'), controller.indexPost);

module.exports = router;