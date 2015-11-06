function randomBool()
{
	var result = false;
	
	if (Math.random() > 0.5)
	{
		result = true;
	}
	
	return result;
}


function randomFloat(min, max)
{
	var result = min;
	
	if (max > min)
	{
		var difference = (max) - min;	
		difference = Math.random() * difference;
		
		result = min + difference;
		
		if (result > max)
		{
			result = max;
		}
	}
	
	return result;
}


function randomInteger(min, max)
{
	var result = min;
	
	if (max > min)
	{
		var difference = (max + 1) - min;	
		difference = Math.random() * difference;
		difference = Math.floor(difference);
		
		result = min + difference;
		
		if (result > max)
		{
			result = max;
		}
	}
	
	return result;
}


function Vector2f(x, y)
{
	var _x = x;
	var _y = y;
	
	this.getX = function ()
	{
		return _x;
	}
	
	this.getY = function ()
	{
		return _y;
	}
	
	this.setX = function (x)
	{
		_x = x;
	}
	
	this.setY = function (y)
	{
		_y = y;
	}
}