var genericDAO = require("./generic");

module.exports = 
{
	// -- Cập nhật 1 phiếu giảm giá
	update: function(query, newValue, callback)
	{
		genericDAO.update("Coupon", query, newValue, callback)
	},
	// -- Thêm 1 phiếu giảm giá
	insertOne: function(newCoupon, callback)
	{
		genericDAO.insertOne("Coupon", newCoupon, callback)
	},
	// -- Lấy danh sách phiếu giảm giá theo câu truy vấn
	find: function(query, callback, options = {})
	{
		genericDAO.find("Coupon", query, callback, options)
	}
};