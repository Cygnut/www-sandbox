// -----------------------------------------------------------------
// --------------------- HOW TO USE DATAFILEAX ---------------------
// -----------------------------------------------------------------
/*
To use this script will require that the dll "WebPage-X.ocx" be registered with regsvr32. e.g. on the command line 
type "regsvr32 WebPage-X.ocx" (with sufficient a User Access Level - to ensure, run regsvr32 as Administrator).

This script will prepare datafileAX for use in the webpage. 

	1) 	Include this file in the head of the webpage e.g. add "<script type="text/javascript" src="datafileAX.js"></script>" to the <head> element.
	2) 	Create a new <script> element and add within it blank functions for "datafileAXEventStatus(NewStatus,OldStatus)" 
		and "datafileAXEventFileUpdate(FileId)"
		These are the events that will be fired by the datafileAX.
		e.g.
		<script type="text/JavaScript">
			function datafileAXEventStatus(NewStatus,OldStatus)
			{
			}
		
			function datafileAXEventFileUpdate(FileId)
			{
			}
		</script>
		
	3) 	The web page is now ready for the custom code to be added. See examples html files.
*/


// -----------------------------------------------------------------
// ------------------------ USER FUNCTIONS -------------------------
// -----------------------------------------------------------------

// Gets the number of repeats in the datafile
// * fileId - the datafile to retrieve information from
function GetFileNumberOfRepeats(fileId)
{
	return datafileAX.GetFileNumberOfRepeats(fileId);
}

// Gets a data record from a datafile.
// * fileId - the datafile to retrieve information from
// * recordOffset - the 0 based index to a record. The offset can be the absolute offset or a relative offset within a repeat.
// * repeatNo - the repeat number to get data from. If repeatNo is set to 0 then the offset will be treated as absolute.
function GetFileRecordValue(fileId, recordOffset, repeatNo)
{
	return datafileAX.GetFileRecordValue(fileId, recordOffset, repeatNo);
}

// Turns on or off the statusByte when getting datafile data. Every datafile record has a statusByte as the first character.
function IncludeStatusByte()
{
	datafileAX.NoStatusChar=0;
}
function ExcludeStatusByte()
{
	datafileAX.NoStatusChar=1;
}

// Clears the list of watched datafiles. 
// * fileId - the datafile to remove from the list. If fileId is 0 then the whole list is cleared.
function ClearWatchList(fileId)
{
	return datafileAX.ClearWatchList(fileId);
}


// -----------------------------------------------------------------
// ----------- NOT USER FUNCTIONS - USED FOR PREPARATION -----------
// -----------------------------------------------------------------

document.write("<script type='text/javascript' src='datafileAXConf.js'></script>");

window.onload = function() 
{
	// build object string
	var objectString = "<object id='datafileAX' classid='clsid:8E858344-7DFE-40C7-9623-A9841ECBC8E7'>";
	if(datafileAXHost) 
		objectString += "<param name='host' value='" + datafileAXHost + "'/>"
	objectString += "</object>";
	
	// this adds the activeX control to the bottom on the webpage
	document.getElementsByTagName('body')[0].innerHTML += objectString;

	// I want the datafileAX events to be loaded after the ActiveX control is added 
	// to the page so firing this timeout event allows the above code to render in memory first
	window.setTimeout(loadDatafileAXEvents, 0);
}

// activeX events
function loadDatafileAXEvents()
{
	function datafileAX::EventStatus(newStatus,oldStatus)
	{
		datafileAXEventStatus(newStatus,oldStatus)
	}

	function datafileAX::EventFileUpdate(fileId)
	{
		datafileAXEventFileUpdate(fileId);
	}
}
