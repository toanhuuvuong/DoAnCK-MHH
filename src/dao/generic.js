var mongodb = require("mongodb");

var mongoClient = mongodb.MongoClient;

var url = "mongodb+srv://toanhuuvuong:"+process.env.CONNECT_PASSWORD+"@toandb-lttzl.azure.mongodb.net/test?retryWrites=true&w=majority/";

module.exports = 
{
	// ------------------------------------------------- BASE QUERIES
	// -- Cập nhật 1 dòng trong bảng collection bằng giá trị mới newValue theo câu truy vấn query
	update: function(collection, query, newValue, callback)
	{
		mongoClient.connect(url, function(err, db)
		{
			if(err) throw err;

			var dbo = db.db("ToanDB");

			dbo.collection(collection).updateOne(query, newValue, { writeConcern: { w: "majority" , wtimeout: 5000 } }, function(err, result)
			{
				if(err) throw err;

				db.close();

				return callback(new Promise(function(resolve, reject)
				{
					setTimeout(function()
					{
						resolve(result);
					}, 1);
				}));
			});
		});
	},
	// -- Thêm 1 dòng newDocument vào bảng collection
	insertOne: function(collection, newDocument, callback)
	{
		mongoClient.connect(url, function(err, db)
		{
			if(err) throw err;

			var dbo = db.db("ToanDB");

			dbo.collection(collection).insertOne(newDocument, { writeConcern: { w: "majority" , wtimeout: 5000 } }, function(err, result)
			{
				if(err) throw err;

				db.close();

				return callback(new Promise(function(resolve, reject)
				{
					setTimeout(function()
					{
						resolve(result);
					}, 1);
				}));
			});
		});
	},
	// -- Thêm nhiều dòng document vào bảng collection
	insertMany: function(collection, listDocument, callback)
	{
		mongoClient.connect(url, function(err, db)
		{
			if(err) throw err;

			var dbo = db.db("ToanDB");

			dbo.collection(collection).insertMany(listDocument, { writeConcern: { w: "majority" , wtimeout: 5000 } }, function(err, result)
			{
				if(err) throw err;

				db.close();

				return callback(new Promise(function(resolve, reject)
				{
					setTimeout(function()
					{
						resolve(result);
					}, 1);
				}));
			});
		});
	},
	// -- Lấy danh sách các dòng từ bảng collection theo câu truy vấn query
	find: function(collection, query, callback, options = {})
	{
		this.getPromise(collection, query, function(promise)
		{
			promise.then(function(value)
			{
				return callback(value);
			});
		}, options);
	},
	aggregate: function(collection, group, callback, options = {}, having ={})
	{
		this.getPromiseByAggregate(collection, group, function(promise)
		{
			promise.then(function(value)
			{
				return callback(value);
			});
		}, options, having);
	},
	// -- Lấy đối tượng promise = <kết quả trả về + thực thi theo thứ tự> của bảng collection theo câu truy vấn query
	getPromise: function(collection, query, callback, options = {})
	{
		mongoClient.connect(url, function(err, db)
		{
			if(err) throw err;

			var dbo = db.db("ToanDB");

			dbo.collection(collection).find(query).sort(options).toArray(function(err, result)
			{
				if(err) throw err;

				db.close();

				return callback(new Promise(function(resolve, reject)
				{
					setTimeout(function()
					{
						resolve(result);
					}, 1);
				}));
			});
		});
	},
	getPromiseByAggregate: function(collection, group, callback, options = {}, having = {})
	{
		mongoClient.connect(url, function(err, db)
		{
			if(err) throw err;

			var dbo = db.db("ToanDB");

			dbo.collection(collection).aggregate([group, options, having]).toArray(function(err, result)
			{
				if(err) throw err;

				db.close();

				return callback(new Promise(function(resolve, reject)
				{
					setTimeout(function()
					{
						resolve(result);
					}, 1);
				}));
			});
		});
	}
};
