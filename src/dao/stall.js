var genericDAO = require("./generic");

module.exports = 
{
	// -- Cập nhật 1 gian hàng
	update: function(query, newValue, callback)
	{
		genericDAO.update("Stall", query, newValue, callback)
	},
	// -- Thêm 1 gian hàng
	insertOne: function(newStall, callback)
	{
		genericDAO.insertOne("Stall", newStall, callback)
	},
	// -- Lấy danh sách gian hàng theo câu truy vấn
	find: function(query, callback, options = {})
	{
		genericDAO.find("Stall", query, callback, options)
	}
};