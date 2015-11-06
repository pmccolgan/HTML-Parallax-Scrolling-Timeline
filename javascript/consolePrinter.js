function ConsolePrinter(consoleId, maxLines)
{
	var _console = document.getElementById(consoleId);
	_console.innerHTML = "";
	
	var _lineCount = 0;
	var _consoleLines = new Array(maxLines);

	
	this.addLine = function(line)
	{
		if ((_lineCount + 1) <= _consoleLines.length)
		{
			appendLine(line);
			
			++_lineCount;
			
			_consoleLines[_lineCount - 1] = line;
		}
		else
		{
			_console.innerHTML = "";
			
			for (var i = 0; i < (_consoleLines.length - 1); ++i) 
			{
				_consoleLines[i] = _consoleLines[i + 1];
				
				appendLine(_consoleLines[i]);
			}

			_consoleLines[_consoleLines.length - 1] = line;
				
			appendLine(line);
			
			_lineCount = _consoleLines.length;
		}
		
//		appendLine("lineCount: " + _lineCount + " _consoleLines.length: " + _consoleLines.length)
	}
	
	
	function appendLine(line)
	{
		_console.innerHTML = _console.innerHTML + line + "<br>";
	}
}