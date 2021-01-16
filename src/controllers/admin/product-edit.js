var productDAO = require('../../dao/product');
var stallDAO = require('../../dao/stall');
var brandDAO = require('../../dao/brand');

var ObjectId = require('mongodb').ObjectId;

module.exports = 
{
	index: function(req, res, next)
	{
		var _id = req.query._id;

		productDAO.find({ _id: ObjectId(_id) }, function(products)
		{
			stallDAO.find({}, function(stalls)
			{
				brandDAO.find({}, function(brands)
				{
					res.render('admin/product-edit.pug', 
					{
						product: products[0],
						stalls: stalls,
						brands: brands
					});
				});
			});
		});
	},
	indexPost: function(req, res, next) 
	{
		var _id = req.query._id;
		var { stallId, brandId, name, oldPrice, price, qtyInStock, description, didDelete } = req.body;
		var image = req.file ? req.file.path.split('/').slice(1).join('/') : '';
		var errors = [];

		if(!name || !oldPrice || !price || !qtyInStock || !description)
		{
			errors.push('You forget some fields :(');
		}

		if(errors.length > 0)
		{
			productDAO.find({ _id: ObjectId(_id) }, function(products)
			{
				stallDAO.find({}, function(stalls)
				{
					brandDAO.find({}, function(brands)
					{
						res.render('admin/product-edit.pug', 
						{
							product: products[0],
							stalls: stalls,
							brands: brands,
							errors: errors,
							values: req.body
						});
					});
				});
			});
		}
		else
		{
			if(image != '')
			{
				productDAO.update({ _id: ObjectId(_id) }, { $set: { stallId: stallId, brandId: brandId, name: name, image: image, oldPrice: parseInt(oldPrice), price: parseInt(price), qtyInStock: parseInt(qtyInStock), description: description, didDelete: (didDelete=='true') } }, function(result)
				{
					req.flash('success_msg', 'Updated successful :)');

		            res.redirect('/admin-product-edit.html?_id=' + _id);
				});
			}
			else
			{
				productDAO.update({ _id: ObjectId(_id) }, { $set: { stallId: stallId, brandId: brandId, name: name, oldPrice: parseInt(oldPrice), price: parseInt(price), qtyInStock: parseInt(qtyInStock), description: description, didDelete: (didDelete=='true') } }, function(result)
				{
					req.flash('success_msg', 'Updated successful :)');

		            res.redirect('/admin-product-edit.html?_id=' + _id);
				});
			}
		}
	}
};