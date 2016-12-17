// gets event and all children from or given Event Ids
// parameters:
// 		eventIds - list of Event Ids comma seperated e.g: "1,2,3,4". Can include supported or filters e.g. "1,2,3,4?filter=this"
// 		callback - function to call when data is returned e.g. "getDataForEvents(eventIds, function(data) { callbackData(data) } );"
//		queryParams - query string specifying additional arguments, such as simpleFilter. Defaults to null.
function getDataForEvents(eventIds, callback, queryParams)
{
	// this is the AJAX call
	getDataForCriteria("Drilldown", "2.0", "EventToOutcomeForEvent", eventIds, queryParams, callback)
}

// gets event and all children from or given Market Ids
// parameters:
// 		marketIds - list of Market Ids comma seperated e.g: "1,2,3,4". Can include supported or filters e.g. "1,2,3,4?filter=this"
// 		callback - function to call when data is returned e.g. "getDataForMarkets(marketIds, function(data) { callbackData(data) } );"
//		queryParams - query string specifying additional arguments, such as simpleFilter. Defaults to null.
function getDataForMarkets(marketIds, callback, queryParams)
{
    // this is the AJAX call
	getDataForCriteria("Drilldown", "2.0", "EventToOutcomeForMarket", marketIds, queryParams, callback)
}

// gets events and markets from or given Event Ids
// parameters:
// 		eventIds - list of Event Ids comma seperated e.g: "1,2,3,4". Can include supported or filters e.g. "1,2,3,4?filter=this"
// 		callback - function to call when data is returned e.g. "getMarketsForEvents(eventIds, function(data) { callbackData(data) } );"
//		queryParams - query string specifying additional arguments, such as simpleFilter. Defaults to null.
function getMarketsForEvents(eventIds, callback, queryParams)
{
	// this is the AJAX call
	getDataForCriteria("Drilldown", "2.0", "EventToMarketForEvent", eventIds, queryParams, callback)
}

// gets events and markets from or given Market Ids
// parameters:
// 		marketIds - list of Market Ids comma seperated e.g: "1,2,3,4". Can include supported or filters e.g. "1,2,3,4?filter=this"
// 		callback - function to call when data is returned e.g. "getMarketsForMarkets(eventIds, function(data) { callbackData(data) } );"
//		queryParams - query string specifying additional arguments, such as simpleFilter. Defaults to null.
function getMarketsForMarkets(marketIds, callback, queryParams)
{
	// this is the AJAX call
	getDataForCriteria("Drilldown", "2.0", "EventToMarketForMarket", marketIds, queryParams, callback)
}

// gets data from or using custom criteria. The final request is of the format "/<func-area>/<api-version>/<resource-type>/<path-params>?<query-params>"
// parameters:
// 		funcArea - Area of functionality (e.g. Drilldown).
// 		apiVersion - The version of the orer API the client is using (e.g. 2.0).
//		resourceType - The type of resource being requested (e.g. Event).
// 		pathParams - Parameters that identify the specific resource required.
// 		queryParams - Parameters that filter or transform the information returned.
function getDataForCriteria(funcArea, apiVersion, resourceType, pathParams, queryParams, callback)
{
	if (typeof(queryParams)==='undefined') queryParams = null;
	var urlString = getorURL() + "/" + funcArea + "/" + /*apiVersion + "/" +*/ resourceType;	
	requestData(urlString, pathParams, queryParams, callback);	
}

function getorURL()
{
	var alternateorUrl = getURLParameter("orPrevieworPath");
	if(alternateorUrl != null
		&& alternateorUrl.length > 0)
		orURL = alternateorUrl;
		
	return orURL;
}

function postData(path, data_, callback)
{	
	// this allows cross domain calls
	jQuery.support.cors = true;

    // this is the AJAX call
    $.ajax({
		url: path,
		processData: false,	
		type: "POST",
		data: data_
	})
	.always(function(data) {
		callback(data);
	});
	/*
	.failure(function(jqXHR, textStatus, errorThrown) {
		alert(jqXHR.status);
		alert(textStatus);
		alert(errorThrown);	
		});
	*/
}

function requestData(path, pathParams, queryParams, callback)
{
	var urlString = path;
	if (pathParams)
		urlString += ("/" + pathParams);
	
	if (queryParams)
		urlString += ("?" + queryParams);
	
	// this allows cross domain calls
	jQuery.support.cors = true;
	
	// this is the AJAX call
	$.ajax({
		//type: "GET",
		url: urlString,
		//data: { responseFormat: "json" },
		//contentType: "application/json; charset=utf-8",
		//dataType: "text"
		dataType: "json"
	})
	.always(function(data) {
		callback(data);
	});
}

/*--Auxiliary interface------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------*/

function or_aux_auxiliaryPath()
{
	return getorURL() + "/Auxiliary/";
}

// gets data from or using custom criteria. The final request is of the format "/<func-area>/<api-version>/<resource-type>/<path-params>?<query-params>"
// parameters:
// 		funcArea - Area of functionality (e.g. Drilldown).
// 		apiVersion - The version of the orer API the client is using (e.g. 2.0).
//		resourceType - The type of resource being requested (e.g. Event).
// 		pathParams - Parameters that identify the specific resource required.
// 		queryParams - Parameters that filter or transform the information returned.


// Provides access to non-event & market datafile content not otherwise available from the main or interface.
// parameters:
//		datafileIds - Comma separated list of datafileIds. Must be of the same filetype.
//		callback - function to call when data is returned e.g. "or_aux_datafileDetail(datafileIds, function(data) { callbackData(data) } );"
//		queryParams - query string specifying additional arguments, such as simpleFilter. Defaults to null.
function or_aux_datafileDetail(datafileIds, callback, queryParams)
{
	if (typeof(queryParams)==='undefined') queryParams = null;
	requestData(or_aux_auxiliaryPath() + "DatafileDetail", datafileIds, queryParams, callback);
}

// Get the control panel for specified datafile ids.
// parameters:
//		datafileIds - Comma separated list of datafileIds.
//		callback - function to call when data is returned e.g. "or_aux_controlPanelLinks(datafileIds, function(data) { callbackData(data) } );"
//		queryParams - query string specifying additional arguments, such as simpleFilter. Defaults to null.
function or_aux_controlPanelLinks(datafileIds, callback, queryParams)
{
	if (typeof(queryParams)==='undefined') queryParams = null;
	requestData(or_aux_auxiliaryPath() + "ControlPanelLinks", datafileIds, queryParams, callback);
}

// Get the URL hardlinked to specified datafile ids.
// parameters:
//		datafileIds - Comma separated list of datafileIds.
//		callback - function to call when data is returned e.g. "or_aux_linkedURLForDatafile(datafileIds, function(data) { callbackData(data) } );"
//		queryParams - query string specifying additional arguments, such as simpleFilter. Defaults to null.
function or_aux_linkedURLForDatafile(datafileIds, callback, queryParams)
{
	if (typeof(queryParams)==='undefined') queryParams = null;
	requestData(or_aux_auxiliaryPath() + "LinkedURLForDatafile", datafileIds, queryParams, callback);
}

// Get all links in a specified menu datafile.
// parameters:
//		menuId - The file id of a menu datafile (datafile filetype=1)
//		callback function to call when data is returned e.g. "or_aux_MenuLinks(datafileIds, function(data) { callbackData(data) } );"
//		queryParams - query string specifying additional arguments, such as simpleFilter. Defaults to null.
function or_aux_MenuLinks(menuId, callback, queryParams)
{
	if (typeof(queryParams)==='undefined') queryParams = null;
	requestData(or_aux_auxiliaryPath() + "MenuLinks", menuId, queryParams, callback);
}

// Logging requires or > 1.5.14

// DO NOT USE - INTERNAL
function or_aux_detail_escapeXml(str)
{
    return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

// DO NOT USE - INTERNAL
function or_aux_detail_log(level, msg)
{
	// If logging is explicitly turned off, then skip.
	if (typeof orLog != 'undefined' && orLog != true)
		return;

	if (typeof console != 'undefined')
	{
		var logMsg = level + ': ' + msg;
		console.log(logMsg);
	}		
		
	var browserInfo = navigator.userAgent + ' (' + $(window).width() + 'x' + $(window).height() + ')';
	var screen = getURLParameter('or_screen');
	
	var xml = '<?xml version="1.0" encoding="UTF-8"?><LogMsg ' 
		+ 'Level="' + or_aux_detail_escapeXml(level) + '" ' 
		+ 'Url="' + or_aux_detail_escapeXml(document.URL) + '" ' 
		+ 'Browser="' + or_aux_detail_escapeXml(browserInfo) + '" '
		+ 'Screen="' + or_aux_detail_escapeXml(screen) + '" '
		+ 'Message="' + or_aux_detail_escapeXml(msg) + '" ' 
		+ '/>';

	postData(or_aux_auxiliaryPath() + 'Log', xml, function(data) { });
}

// Log an error message
// parameters:
//		msg - The message to log.
function or_aux_logError(msg)
{
	or_aux_detail_log("error", msg);
}

// Log a warning message
// parameters:
//		msg - The message to log.
function or_aux_logWarn(msg)
{
	or_aux_detail_log("warning", msg);
}

// Log an information message
// parameters:
//		msg - The message to log.
function or_aux_logInfo(msg)
{
	or_aux_detail_log("information", msg);
}

/*--Utility functions-----------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------*/

// gets a parameter from the URL by name
function getURLParameter(name) 
{
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
	
// this just expands the JSON to text. the parameter data is a JSON object.
function recurseObjectToString( data ) {
	var htmlRetStr = "<ul class='recurseObj' >"; 
	for (var key in data) {
		if (typeof(data[key])== 'object' && data[key] != null) {
			htmlRetStr += "<li class='keyObj' ><strong>" + key + ":</strong><ul class='recurseSubObj' >";
			htmlRetStr += recurseJSONtoString( data[key] );
			htmlRetStr += '</ul  ></li   >';
		} else {
			htmlRetStr += ("<li class='keyStr' ><strong>" + key + ': </strong>&quot;' + data[key] + '&quot;</li  >' );
		}
	};
	htmlRetStr += '</ul >';    
	return( htmlRetStr );
}

/*--Live Updates------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------*/

var or_updateChannels = [];
var or_updatesStarted = false;
var or_lastMsgId = "";

// represents the function used in LiveServ API to get updates
// parameters:
// 		key - unused. here to match call provided by LiveServ API.
// 		handler - call back function that will receive the updates.
// 		channels - array of strings containing channel names that updates are required for.
// 		last_msg_id - the last msg id that was returned by the SiteServ equivilant requests.
// 		

function or_connect_register(key, handler, channels, last_msg_id, varargs) 
{
	// update request information
	for(var chanIndex = 0; chanIndex < channels.length; chanIndex++)
	{
		var alreadyHeld = false;
	
		// dont allow duplicates
		for(var chanIndex2 = 0; chanIndex2 < or_updateChannels.length; chanIndex2++)
		{
			if (or_updateChannels[chanIndex2] == channels[chanIndex])
			{
				alreadyHeld = true;
				break;
			}
		}
		
		if (!alreadyHeld)
		{
			or_updateChannels.push(channels[chanIndex]);
		}
	}
	
	or_lastMsgId = last_msg_id;
		
	if (or_updatesStarted == false)
	{
		or_updatesStarted = true;

		// make request for updates from or to selected channels
		or_pollUpdates(handler);
	}
}

function or_splitResponse(handler, data)
{
	if(data.length != undefined)
	{
		// split the request
		for(var iCount = 0; iCount < data.length; iCount++)
		{
			// catch any callback errors so the next data element can be passed on
			try
			{
				var dataElement = data[iCount];
				if (or_lastMsgId < dataElement.msg_id)
					or_lastMsgId = dataElement.msg_id;
					
				// call the data back to the web page
				handler(dataElement);
			}
			catch(ex) { }
		}
	}
}

function or_pollUpdates(handler)
{
	var alternateorUrl = getURLParameter("orPrevieworPath");
	if(alternateorUrl != null
		&& alternateorUrl.length > 0)
		orURL = alternateorUrl;

	var urlString = orURL + "/orLiveUpdates?lastMsgId=" + or_lastMsgId + "&channels=";
	for(var chanIndex = 0; chanIndex < or_updateChannels.length; chanIndex++)
	{
		urlString += ((chanIndex > 0 ? "," : "") + or_updateChannels[chanIndex]);
	}
	
	// this allows cross domain calls
	jQuery.support.cors = true;
	
    // this is the AJAX call
    $.ajax({
        //type: "GET",
        url: urlString,
		//data: { responseFormat: "json" },
        //contentType: "application/json; charset=utf-8",
		//dataType: "text"
		dataType: "json"
    })
    .always(function(data) {
        or_splitResponse(handler, data);
		setTimeout(or_pollUpdates(handler),5000);
    });
}

/*--Assignment interface----------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------*/

function as_detail_AssignmentsPath()
{
	return getorURL() + "/Assignments/";
}

// This is an "improved" version of requestData - with errors passed back to the callback.
//
// callback must have the following signature function(data, textStatus, errorThrown) where:
//		data: The response data.
//		textStatus: A string categorizing the status of the request.
//		errorThrown: The error thrown, if appropriate.
function requestCheckedData(path, pathParams, queryParams, callback)
{
	var urlString = path;
	if (pathParams)
		urlString += ("/" + pathParams);
	
	if (queryParams)
		urlString += ("?" + queryParams);
	
	// this allows cross domain calls
	jQuery.support.cors = true;
	
	// this is the AJAX call
	$.ajax({
		url: urlString,
		dataType: "json"
	})
	.done(function(data, textStatus)
	{
		// On success we simply call the callback with the json data.
		callback(data, textStatus);
	})
	.fail(function(jqXHR, textStatus, errorThrown)
	{
		// On failure, we *attempt* to fetch the json data to pass as data, and we forward on the textStatus and errorThrown.
		var json;
		try
		{
			json = $.parseJSON(jqXHR.responseText);
		} catch (ex) {}
		try
		{
			callback(json, textStatus, errorThrown);
		}
		catch (ex) {}
	});
}

// Get the layouts for a given uuid.
// parameters:
//		queryParams - 
//			uuid - The uuid which identifies the device.
//		callback - function to call when data is returned. Must have the following signature function(data, textStatus, errorThrown) where:
//			data: The response data.
//			textStatus: A string categorizing the status of the request.
//			errorThrown: The error thrown, if appropriate.
function as_GetLayouts(queryParams, callback)
{
	if (typeof(queryParams)==='undefined') queryParams = null;
	requestCheckedData(as_detail_AssignmentsPath() + "Layout", null, queryParams, callback);
}

// Get the screen assignments for a set of screens.
// parameters:
//		queryParams - 
//			uuid - The uuid which identifies the device.
//			screenIds - A comma-separated set of screen ids.
//		callback - function to call when data is returned. Must have the following signature function(data, textStatus, errorThrown) where:
//			data: The response data.
//			textStatus: A string categorizing the status of the request.
//			errorThrown: The error thrown, if appropriate.
function as_GetScreenAssignments(queryParams, callback)
{
	if (typeof(queryParams)==='undefined') queryParams = null;
	requestCheckedData(as_detail_AssignmentsPath() + "Screen", null, queryParams, callback);
}

/*--Assignment interface: Screen Updates------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------*/

var as_Screen_updateUuid = "";
var as_Screen_updateScreenIds = [];
var as_Screen_lastMsgId = "";

var as_Screen_request;
var as_Screen_timeoutId;

// Subscribe to screen assignment updates.
// 		handler - callback function which will receive the updates. Should have the following signature
//			function(data, textStatus, errorThrown)
//				data: The response data.
//				textStatus: A string categorizing the status of the request.
//				errorThrown: The error thrown, if appropriate.
//		uuid - identifier of the client device.
//		screenIds - the screen ids to subscribe to updates on.
// 		last_msg_id - the sequence number of the updates. Pass '!'.
function as_Screen_connect_register(handler, uuid, screenIds, last_msg_id)
{
	// Check if the screens subscription has changed.
	
	// If we've already got an existing subscription, then cancel it.
	if (as_Screen_request)
		as_Screen_request.abort();
	
	if (as_Screen_timeoutId)
		clearTimeout(as_Screen_timeoutId);
	
	// Update existing subscription information.
	as_Screen_updateUuid = uuid;
	as_Screen_updateScreenIds = screenIds;
	as_Screen_lastMsgId = last_msg_id;
	
	as_Screen_pollUpdates(handler);
}

function as_Screen_pollUpdates(handler)
{
	var urlString = as_detail_AssignmentsPath() + "ScreenUpdates" 
		+ "?uuid=" + as_Screen_updateUuid 
		+ "&screenIds=" + as_Screen_updateScreenIds.join()
		+ "&lastMsgId=" + as_Screen_lastMsgId;
	
	// this allows cross domain calls
	jQuery.support.cors = true;
	
	as_Screen_request = $.ajax(
	{
		url : urlString,
		dataType : "json"
	})
	.done(function(data, textStatus, jqXHR)
	{
		as_Screen_splitResponse(handler, data, textStatus);
	})
	.fail(function(jqXHR, textStatus, errorThrown)
	{
		var json;
		try
		{
			json = $.parseJSON(jqXHR.responseText);
		} catch (ex) {}
		try
		{
			handler(json, textStatus, errorThrown);
		}
		catch (ex) {}
	})
	.always(function(data)
	{
		as_Screen_timeoutId = setTimeout(function() { as_Screen_pollUpdates(handler); }, 2000);
	});
}

function as_Screen_splitResponse(handler, data, textStatus)
{
	if (data.length != undefined)
	{
		// Iterate through all screen updates.
		for (var iScreen = 0; iScreen < data.length; iScreen++)
		{
			var Screen = data[iScreen];
			
			// Get the maximum lastMsgId.
			if (Screen.Screen.Assignments.hasOwnProperty("children"))
			{
				var Assignments = Screen.Screen.Assignments.children;
				for (var iAssignment = 0; iAssignment < Assignments.length; iAssignment++)
				{
					var assignment = Assignments[iAssignment].Assignment;
					if (as_Screen_lastMsgId < assignment.lastMsgId)
						as_Screen_lastMsgId = assignment.lastMsgId;
				}
			}
			
			// Invoke the handler for this screen's assignment updates.
			try
			{
				handler(Screen, textStatus);
			} catch (ex) {}
		}
	}
}
