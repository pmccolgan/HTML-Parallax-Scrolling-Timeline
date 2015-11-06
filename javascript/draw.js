
//console.log("canvasName: " + canvasName);
//console.log("Point: " + lineArray[i].x + ", " + lineArray[i].y);

var COLOUR = { RED:"#FF0000",
			   GREEN:"#00FF00",
			   BLUE:"#0000FF",
			   YELLOW:"#FFFF00",
			   BLACK:"#000000",
			   WHITE:"#FFFFFF",
			   GRAY:"#808080",
			   PINK:"#FFC0CB"};

// http://stackoverflow.com/questions/1484506/random-color-generator-in-javascript			   
function getRandomColor()
{
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}


function getCanvas(document, canvasName)
{
	return document.getElementById(canvasName);
}


function getContext(canvas, contextName)
{
	return canvas.getContext(contextName);
}


function getContextFromDocument(document, canvasName, contextName)
{
	var canvas = getCanvas(document, canvasName);
	return getContext(canvas, contextName);
}


function setFillColour(context, colour)
{
	context.fillStyle = colour;
}


function setStrokeColour(context, colour)
{
	context.strokeStyle = colour;
}


function setLineWidth(context, width)
{
	context.lineWidth = width;
}


function clearArea(context, minX, minY, width, height)
{
	context.clearRect(minX,
					  minY,
					  width,
					  height);
}


function drawRectangleWithColour(context, minX, minY, width, height, colour)
{
	setFillColour(context, colour);
	
	drawRectangle(context, minX, minY, width, height);
}


function drawRectangle(context, minX, minY, width, height)
{
	context.fillRect(minX,
					 minY,
					 width,
					 height);
}


function drawLineWithColour(context, startX, startY, endX, endY, colour)
{
	setStrokeColour(context, colour);
	
	drawLine(context, 
			 startX, 
			 startY, 
			 endX, 
			 endY);
}


function drawLine(context, startX, startY, endX, endY)
{
	context.beginPath();
	context.moveTo(startX, startY);
	context.lineTo(endX, endY);
	context.stroke();
}


function drawLineArray(context, lineArray, lineArrayCount)
{
//    context.translate(0.5, 0.5);
	context.beginPath();
	
	for (var i = 0; i < lineArrayCount; i += 2)
	{
		context.moveTo(lineArray[i].x, lineArray[i].y);
		context.lineTo(lineArray[i + 1].x, lineArray[i + 1].y);
	}
	
	context.stroke();
//    context.translate(-0.5, -0.5);
}


function drawCircleWithColour(context, centerX, centerY, radius, colour)
{
	setFillColour(context, colour);
	
	drawCircle(context, 
			   centerX, 
			   centerY, 
			   radius, 
			   colour);
}


function drawCircle(context, centerX, centerY, radius)
{
	context.beginPath();
	context.arc(centerX, centerY, radius, 0, Math.PI*2, true);
	context.closePath();
	context.fill();
}


function drawGridWithColour(context, grid, colour)
{
	setStrokeColour(context, colour);
	
	drawGrid(context, 
			 grid);
}


function drawGrid(context, grid)
{
	var points = new Array();
	
	var count = 0;
	
	for (var i = 0; i <= grid.getHeight(); ++i)
	{
		var start = new Point(0, i * grid.getHeightInterval());
		var end = new Point(grid.getDimension(), i * grid.getHeightInterval());
		
		points[count++] = start;
		points[count++] = end;
	}
	
	for (var i = 0; i <= grid.getWidth(); ++i)
	{
		var start = new Point(i * grid.getHeightInterval(), 0);
		var end = new Point(i * grid.getHeightInterval(), grid.getDimension());
		
		points[count++] = start;
		points[count++] = end;
	}
	
	drawLineArray(context, points, count);
}


function drawRectangleOutlineWithColour(context, minX, minY, width, height, colour)
{
	setStrokeColour(context, colour);
	
	drawRectangleOutline(context, minX, minY, width, height);
}


function drawRectangleOutline(context, minX, minY, width, height)
{
	var points = new Array(8);
	
	points[0] = new Point(minX, minY);
	points[1] = new Point(minX + width, minY);
	points[2] = new Point(minX + width, minY);
	points[3] = new Point(minX + width, minY + height);
	points[4] = new Point(minX + width, minY + height);
	points[5] = new Point(minX, minY + height);
	points[6] = new Point(minX, minY + height);
	points[7] = new Point(minX, minY);
	
	drawLineArray(context, points, 8);
}


function Render(document, canvasName, contextName)
{
	var _context = getContextFromDocument(document, canvasName, contextName);
	
	this.drawRectangle = function (minX, minY, width, height, colour)
	{
		drawRectangleWithColour(_context, minX, minY, width, height, colour);
	}
	
	this.drawRectangleOutline = function (minX, minY, width, height, colour)
	{
		drawRectangleOutlineWithColour(_context, minX, minY, width, height, colour);
	}
	
	this.drawLine = function (startX, startY, endX, endY, colour)
	{
		drawLineWithColour(_context, startX, startY, endX, endY, colour);
	}
	
	this.drawCircle = function (centerX, centerY, radius, colour)
	{
		drawCircleWithColour(_context, centerX, centerY, radius, colour);
	}
	
	this.drawGrid = function (grid, colour)
	{
		drawGridWithColour(_context, grid, colour);
	}
	
	this.clearArea = function (minX, minY, width, height)
	{
		clearArea(_context, minX, minY, width, height);
	}
	
	this.setLineWidth = function (width)
	{
		setLineWidth(_context, width);
	}
}


function Point(x, y)
{
	this.x = x;
	this.y = y;
}


function findPos(obj)
{
	var result = new Point(0, 0);
	
    if (obj.offsetParent)
	{
        do
		{
            result.x += obj.offsetLeft;
            result.y += obj.offsetTop;
        } while (obj = obj.offsetParent);
    }
	
    return result;
}


function Grid(width, height, dimension)
{
	var _width = width;
	var _height = height;
	var _dimension = dimension;
	var _widthInterval = _dimension/_width;
	var _heightInterval = _dimension/_height;

	this.getWidth = function ()
	{
		return _width;
	}
	
	this.getHeight = function ()
	{
		return _height;
	}
	
	this.getWidthInterval = function ()
	{
		return _widthInterval;
	}
	
	this.getHeightInterval = function ()
	{
		return _heightInterval;
	}
	
	this.getDimension = function ()
	{
		return _dimension;
	}
	
	this.getColumn = function (xPosition)
	{
		if (xPosition < 0)
		{
			xPosition = 0;
		}
		
		if (xPosition > _dimension)
		{
			xPosition = _dimension;
		}
		
		return Math.floor(xPosition/_widthInterval);
	}
	
	this.getRow = function (yPosition)
	{
		if (yPosition < 0)
		{
			yPosition = 0;
		}
		
		if (yPosition > _dimension)
		{
			yPosition = _dimension;
		}
		
		return Math.floor(yPosition/_heightInterval);
	}
	
	this.getCellPosition = function (column, row)
	{
		if (row < 0)
		{
			row = 0;
		}
		
		if (row > height)
		{
			row = height - 1;
		}
		
		if (column < 0)
		{
			row = 0;
		}
		
		if (column > width)
		{
			column = width - 1;
		}
		
		var result = new Point(column * _widthInterval, row * _heightInterval);
		return result;
	}
}
