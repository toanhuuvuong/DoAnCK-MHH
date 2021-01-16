module.exports = function Cart(oldCard)
{
	this.items = oldCard.items || {};
	this.totalQty = oldCard.totalQty || 0;
	this.totalPrice = oldCard.totalPrice || 0;

	this.add = function(item, id, qty)
	{
		var storedItem = this.items[id];

		if(!storedItem)
		{
			storedItem = this.items[id] = { item: item, qty: 0, price: 0 };
		}
		storedItem.qty += qty;
		storedItem.price = storedItem.item.price * storedItem.qty;
		this.totalQty += qty;
		this.totalPrice += storedItem.item.price * qty;
	};

	this.remove = function(id)
	{
		var storedItem = this.items[id];

		if(!storedItem)
		{
			return;
		}
		this.totalQty -= storedItem.qty;
		this.totalPrice -= storedItem.price;
		this.items[id] = undefined;
	};

	this.update = function(qtys)
	{
		this.totalQty = 0;
		this.totalPrice = 0;
		var i = 0;
		
		for(var id in this.items)
		{
			this.items[id].qty = parseInt(qtys[i++]);
			this.items[id].price = this.items[id].item.price * this.items[id].qty;
			this.totalQty += this.items[id].qty;
			this.totalPrice += this.items[id].price;
		}
	};

	this.generateArray = function()
	{
		var arr = [];

		for(var id in this.items)
		{
			arr.push(this.items[id]);
		}
		return arr;
	};
};