var genericDAO = require("./generic");

module.exports = 
{
	// -- Thêm 1 chi tiết đơn hàng
	insertOne: function(newOrderDetail, callback)
	{
		genericDAO.insertOne("OrderDetail", newOrderDetail, callback)
	},
	insertMany: function(listOrderDetail, callback)
	{
		genericDAO.insertMany("OrderDetail", listOrderDetail, callback)
	},
	// -- Lấy danh sách chi tiết đơn hàng theo câu truy vấn
	find: function(query, callback, options = {})
	{
		genericDAO.find("OrderDetail", query, callback, options)
	},
	aggregate: function(group, callback, options = {}, having = {})
	{
		genericDAO.aggregate("OrderDetail", group, callback, options, having)
	}
};