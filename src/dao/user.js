var genericDAO = require("./generic");

module.exports = 
{
	// -- Cập nhật 1 người dùng
	update: function(query, newValue, callback)
	{
		genericDAO.update("User", query, newValue, callback)
	},
	// -- Thêm 1 người dùng
	insertOne: function(newUser, callback)
	{
		genericDAO.insertOne("User", newUser, callback)
	},
	// -- Lấy danh sách người dùng theo câu truy vấn
	find: function(query, callback, options = {})
	{
		genericDAO.find("User", query, callback, options)
	}
};