
	var TIME_START = "01/01/1982";
	var UPDATE_INTERVAL_MILLISECONDS = 40
	var DAY_PIXEL_LENGTH = 0.5
	
	var EVENT_TYPE = {	LIFE:0,
						CAREER:1};
	
	var _timeline;
	var _containerWidth;
	var _timelineWidth;
	var _emptyArray;
	var _lastScrollPosition;
	
	var eventData = [
        {"title": "Born", "date": "25/01/1982", "type": 0},
        {"title": "Primary School", "date": "01/09/1986", "type": 1, "endDate": "30/06/1993"},
        {"title": "Secondary School", "date": "01/09/1993", "type": 1, "endDate": "30/06/2000"},
        {"title": "Passed my Driving Test", "date": "22/09/1999", "type": 0},
        {"title": "University", "date": "01/09/2000", "type": 1, "endDate": "31/05/2004"},
        {"title": "First job: Software Developer", "date": "04/10/2004", "type": 1, "endDate": "03/08/2007"},
        {"title": "Second job: Programmer", "date": "07/08/2007", "type": 1, "endDate": "19/12/2007"},
        {"title": "Third job: Software Developer", "date": "01/01/2008", "type": 1, "endDate": "30/04/2012"},
        {"title": "Got Married", "date": "09/07/2008", "type": 0},
        {"title": "First child born", "date": "23/02/2010", "type": 0},
        {"title": "Joined Twitter", "date": "16/09/2011", "type": 0},
        {"title": "Fourth job: Senior Software Engineer", "date": "14/05/2012", "type": 1, "endDate": "09/10/2015"},
        {"title": "Second child born", "date": "03/09/2012", "type": 0}
    ];
	
		
	function init()
	{
		console = new ConsolePrinter("consoleText", 10);
		console.addLine("Console");
		
		recordScrollPosition();
		
		var timeline_start = parseDate(TIME_START);
		
		_timeline = new TimeLine(timeline_start);
		var length = _timeline.getLength();
		
		var right_container = document.getElementById("divRightEventContainer");
		_containerWidth = getElementWidth(right_container);
		
		console.addLine("Container width: " + _containerWidth);
		
		var timeline_container = document.getElementById("divTimeLine");
		_timelineWidth = getElementWidth(timeline_container);
		
		console.addLine("Timeline width: " + _timelineWidth);
		
		// add random scrolling empty events
		var total_empties = randomInteger(30, 100);
		
		_emptyArray = new Array(total_empties);
		
		// add to two planes, some before actual events and some after
		var total_back = randomInteger(0, total_empties);
		var total_fore = total_empties - total_back;
		
		console.addLine("Number empties: " + total_empties + " Fore: " + total_fore + " Back: " + total_back);
		
		// add background
		for (var i = 0; i < total_back; ++i)
		{ 
			_emptyArray[i] = addEmptyEvent(length);
		}

		var now = new Date();
		console.addLine("Now: " + now);
		
		// add events
		for (var i = 0; i < eventData.length; i++)
		{
			if (typeof(eventData[i].endDate) == "undefined")
			{
				addEvent(eventData[i].type, eventData[i].date, eventData[i].title);
			}
			else
			{
				addEventRange(eventData[i].type, eventData[i].date, eventData[i].endDate, eventData[i].title);
			}
		}
		
		// add an up-to-the-present event
		// addEventRange(EVENT_TYPE.CAREER, "14/05/2012", now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear(), "Fourth job: Senior Software Engineer");
	
		var year = now.getFullYear();
		
		if ((now.getMonth() == 0) && (now.getDate() < 25))
		{
			--year;
		}
	
		// Add my most recent birthday, a dynamic event
		addEvent(EVENT_TYPE.LIFE, "25/01/" + year, "My most recent birthday, turned " +  (year - 1982));
	
		addEvent(EVENT_TYPE.LIFE, formatDate(new Date()), "Today");
		
		// add foreground
		for (var i = 0; i < total_fore; ++i)
		{ 
			_emptyArray[total_back + i] = addEmptyEvent(length);
		}
		
		// resize container
		console.addLine("Resize Container");
		var container = document.getElementById("divTimeLineContainer");

		container.style.height = length * DAY_PIXEL_LENGTH + "px";
		
		// add timeline... lines
		var timeline_line = new Date(timeline_start.getYear(), 0, 1);
		
		while(timeline_line.getFullYear() <= _timeline.endDate().getFullYear())
		{
//			timeline_line.setYear(timeline_line.getYear() + 1);
//			console.addLine("timeline_line.getFullYear(): " + timeline_line.getFullYear() + " " + timeline_line.getMonth() + " " + timeline_line.getDate());
			addYear(timeline_line.getFullYear())
			timeline_line.setFullYear(timeline_line.getFullYear() + 1);
		}
		
		requestTick();
	}
	
	
	function scroll() 
	{
		var change = window.pageYOffset - _lastScrollPosition;
		
		for (var i = 0; i < _emptyArray.length; i++)
		{
			var top = _emptyArray[i].style.top;
			
			var new_top = parseInt(top.substring(0, (top.length - 2))) + (change * _emptyArray[i].scrollSpeed);
			
			_emptyArray[i].style.top = new_top + "px";
		}
		
		recordScrollPosition();
	}
	
	
	function recordScrollPosition()
	{
		_lastScrollPosition = window.pageYOffset;
	}
	
	
	function parseDate(str)
	{
		var mdy = str.split('/');
		return new Date(mdy[2], mdy[1]-1, mdy[0]);
	}
	
	
	function formatDate(date)
	{
		var month = date.getMonth() + 1;
		var result = date.getDate() + "/"

		if (month < 10)
		{
			result += "0"
		}
		
		result += month + "/" + date.getYear();
		
		return result;
	}
	
	
	function addEvent(type, date, text)
	{
		var div = document.createElement('div');
		div.innerHTML = "<p><b>" + date + "</b><br>" + text + "</p>";
		
		div.setAttribute('class', 'timeLineEvent');
		
		div.style.top = _timeline.getDateDistance(parseDate(date)) * DAY_PIXEL_LENGTH + "px";
		div.style.backgroundColor = getRandomColor();
		
		var container;
	
		switch (type)
		{
			case EVENT_TYPE.LIFE:
				container = document.getElementById("divLeftEventContainer");
				break;
			case EVENT_TYPE.CAREER:
				container = document.getElementById("divRightEventContainer");
				break;
			default:
				console.addLine("addEvent invalid type: " + type);
				break;
		}
	
		var overlap = false;
/*		var element;
		
		for (var i = 0; i < container.children.length; i++)
		{
			if (element.style.pixelWidth)
			{
				return element.style.pixelWidth;
			}
		}
*/		
		switch (type)
		{
			case EVENT_TYPE.LIFE:
				div.style.right = "10px";
				break;
			case EVENT_TYPE.CAREER:
				div.style.left = "10px";
				break;
			default:
				console.addLine("addEvent invalid type: " + type);
				break;
		}
	
		container.appendChild(div);
	}
	
	
	function addEventRange(type, startDate, endDate, text)
	{
		var div = document.createElement('div');
		div.innerHTML = "<p><b>" + startDate + " - " + endDate + "</b><br>" + text + "</p>";
		
		div.setAttribute('class', 'timeLineEvent');
		
		div.style.top = _timeline.getDateDistance(parseDate(startDate)) * DAY_PIXEL_LENGTH + "px";
		div.style.height = (_timeline.getDateDistance(parseDate(endDate)) - _timeline.getDateDistance(parseDate(startDate))) * DAY_PIXEL_LENGTH + "px";
		div.style.backgroundColor = getRandomColor();
		
		var container;
	
		switch (type)
		{
			case EVENT_TYPE.LIFE:
				div.style.right = "10px";
				container = document.getElementById("divLeftEventContainer");;
				break;
			case EVENT_TYPE.CAREER:
				div.style.left = "10px";
				container = document.getElementById("divRightEventContainer");;
				break;
			default:
				console.addLine("addEvent invalid type: " + type);
				break;
		}
	
		container.appendChild(div);
	}
	
	
	function addEmptyEvent(maxLength)
	{
		var div = document.createElement('div');
		
		div.setAttribute('class', 'event');
		
		var width = randomInteger(10, 100);
		var height = randomInteger(10, width);
		
		var top = randomInteger(0, maxLength) * DAY_PIXEL_LENGTH;
		
		div.style.top = top + "px";
//		div.style.width = width + "px";
		div.style.height = height + "px";
		div.style.backgroundColor = getRandomColor();
		div.style.opacity = 0.5;
		
		var x_position = randomFloat(0, _containerWidth - width);
		
		var container;
	
		if (randomBool())
		{
			div.style.right = x_position + "px";
			container = document.getElementById("divLeftEventContainer");
		}
		else
		{
			div.style.left = x_position + "px";
			container = document.getElementById("divRightEventContainer");
		}
	
		container.appendChild(div);
		
		div.scrollSpeed = randomFloat(-1.5, 1.5);
		
		return div;
	}
	
	
	function addYear(year)
	{
		var div = document.createElement('div');
		div.innerHTML = "<p><center><b>" + year + "</b></center></p>";
		
		div.setAttribute('class', 'timeLineYear');
		
		div.style.top = _timeline.getDateDistance(new Date(year, 0, 1)) * DAY_PIXEL_LENGTH + "px";
		div.style.width = _timelineWidth + "px";
		
		var container = document.getElementById("divTimeLine");
		
		container.appendChild(div);
	}


	function requestTick()
	{
		setTimeout("update()", UPDATE_INTERVAL_MILLISECONDS);
	}


	function update()
	{	
		requestTick();
	}