var genericDAO = require("./generic");

module.exports = 
{
	// -- Thêm 1 đánh giá
	insertOne: function(newReview, callback)
	{
		genericDAO.insertOne("Review", newReview, callback)
	},
	// -- Lấy danh sách đánh giá theo câu truy vấn
	find: function(query, callback, options = {})
	{
		genericDAO.find("Review", query, callback, options)
	}
};