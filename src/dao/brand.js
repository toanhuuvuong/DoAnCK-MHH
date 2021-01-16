var genericDAO = require("./generic");

module.exports = 
{
		// -- Cập nhật 1 nhãn hiệu
	update: function(query, newValue, callback)
	{
		genericDAO.update("Brand", query, newValue, callback)
	},
	// -- Thêm 1 nhãn hiệu
	insertOne: function(newBrand, callback)
	{
		genericDAO.insertOne("Brand", newBrand, callback)
	},
	// -- Lấy danh sách nhãn hiệu theo câu truy vấn
	find: function(query, callback, options = {})
	{
		genericDAO.find("Brand", query, callback, options)
	}
};