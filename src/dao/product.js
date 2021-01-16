var genericDAO = require("./generic");

module.exports = 
{
	// -- Cập nhật 1 sản phẩm
	update: function(query, newValue, callback)
	{
		genericDAO.update("Product", query, newValue, callback)
	},
	// -- Thêm 1 sản phẩm
	insertOne: function(newProduct, callback)
	{
		genericDAO.insertOne("Product", newProduct, callback)
	},
	// -- Lấy danh sách sản phẩm theo câu truy vấn
	find: function(query, callback, options = {})
	{
		genericDAO.find("Product", query, callback, options)
	},
	aggregate: function(group, callback, options = {}, having = {})
	{
		genericDAO.aggregate("Product", group, callback, options, having)
	}
};