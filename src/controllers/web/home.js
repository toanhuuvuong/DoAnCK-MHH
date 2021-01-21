var productDAO = require('../../dao/product');

module.exports = 
{
	// -- Lấy top 10 sản phẩm mới nhất và phổ biến nhất
	index: function(req, res, next)
	{
		productDAO.find({ didDelete: false }, function(products)
		{
			var top12LastestProduct = products.slice(0, 12);

			productDAO.find({ didDelete: false }, function(products)
			{
				var top12MostPopularProduct = products.slice(0, 12);

				productDAO.aggregate({ $project: { name: 1, image: 1, oldPrice: 1, price: 1, priceDifference: { $subtract: ['$oldPrice', '$price'] } } }, function(products)
				{
					var top9MostDiscountProduct = products.slice(0, 9);

					res.render('web/home.pug', 
					{
						top12LastestProduct: top12LastestProduct,
						top12MostPopularProduct: top12MostPopularProduct,
						top9MostDiscountProduct: top9MostDiscountProduct
					});
				}, { $sort: { priceDifference: -1 } }, { $match: {} });
			}, { numRate: -1 });

		}, { date: -1 });
	}
};