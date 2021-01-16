var genericDAO = require("./generic");

module.exports = 
{
	// -- Thêm 1 khách hàng
	insertOne: function(newCustomer, callback)
	{
		genericDAO.insertOne("Customer", newCustomer, callback)
	},
	// -- Lấy danh sách khách hàng theo câu truy vấn
	find: function(query, callback, options = {})
	{
		genericDAO.find("Customer", query, callback, options)
	}
};