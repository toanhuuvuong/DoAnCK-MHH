var genericDAO = require("./generic");

module.exports = 
{
	// -- Cập nhật 1 đơn hàng
	update: function(query, newValue, callback)
	{
		genericDAO.update("Order", query, newValue, callback)
	},
	// -- Thêm 1 đơn hàng
	insertOne: function(newOrder, callback)
	{
		genericDAO.insertOne("Order", newOrder, callback)
	},
	// -- Lấy danh sách đơn hàng theo câu truy vấn
	find: function(query, callback, options = {})
	{
		genericDAO.find("Order", query, callback, options)
	}
};