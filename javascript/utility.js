function getElementWidth(element)
{
	if (typeof element.clip !== "undefined")
	{
		return element.clip.width;
	} 
	else
	{
		if (element.style.pixelWidth)
		{
			return element.style.pixelWidth;
		}
		else
		{
			return element.offsetWidth;
		}
	}
}


function getElementHeight(element)
{
	if (typeof element.clip !== "undefined")
	{
		return element.clip.height;
	} 
	else
	{
		if (element.style.pixelHeight)
		{
			return element.style.pixelHeight;
		}
		else
		{
			return element.offsetHeight;
		}
	}
}