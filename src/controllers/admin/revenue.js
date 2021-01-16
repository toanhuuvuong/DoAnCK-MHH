module.exports = 
{
	index: function(req, res, next)
	{
		res.render('admin/revenue.pug');
	},
	indexPost: function(req, res, next) 
	{
		var { typeRevenue, date, month, monthYear, year, startDate, endDate } = req.body;

		var errors = [];

		if((typeRevenue=='1'&&!date) || 
			(typeRevenue=='2'&&!month) || 
			(typeRevenue=='2'&&!monthYear) || 
			(typeRevenue=='3'&&!year) || 
			(typeRevenue=='4'&&!startDate) || 
			(typeRevenue=='4'&&!endDate))
		{
			errors.push('You forget some fields :(');
		}

		if(errors.length > 0)
		{
			res.render('admin/revenue.pug', 
			{
				errors: errors
			});
		}
		else
		{
			var link = '';

			if(typeRevenue=='1')
			{
				link='/admin-revenue-statistics.html?typeRevenue='+typeRevenue+'&date='+date;
			}
			else if(typeRevenue=='2')
			{
				link='/admin-revenue-statistics.html?typeRevenue='+typeRevenue+'&month='+month+'&monthYear='+monthYear;
			}
			else if(typeRevenue=='3')
			{
				link='/admin-revenue-statistics.html?typeRevenue='+typeRevenue+'&year='+year;
			}
			else
			{
				link='/admin-revenue-statistics.html?typeRevenue='+typeRevenue+'&startDate='+startDate+'&endDate='+endDate;
			}

	        res.redirect(link);
	    }
	}
};