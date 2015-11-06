function TimeLine(startDate)
{
	var _startDate = startDate
	var _endDate = new Date();
	_endDate.setTime(_endDate.getTime() + 150*24*60*60*1000);
	
	this.getLength = function(endDate)
	{
		return dayDiff(_startDate, _endDate);
	}

	this.getDateDistance = function(date)
	{
		return dayDiff(_startDate, date);
	}

	this.endDate = function()
	{
		return _endDate;
	}
	
	
	function dayDiff(first, second)
	{
		return Math.floor((second-first)/(1000*60*60*24));
	}
}