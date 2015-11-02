chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
	
	if(request.method == "setLocalStorage"){ localStorage[request.key] = request.data; }
	else if(request.method == "getLocalStorage"){
		if(request.key == "current_session"){
			
			var d = {optRemoveCss:[],optAddCss:[],sessionRemoveCss:[],sessionAddCss:[],sesstionLimit:0,sessionOn:false};
			
			var local_json = localStorage[request.key];
			var local_data = (local_json == undefined || local_json == "") ? {} : JSON.parse(local_json);
			for(var prop in local_data){ if(local_data.hasOwnProperty(prop)){ d[prop] = local_data[prop]; }}
			
			d.optRemoveCss = d.sessionRemoveCss;
			d.optAddCss = d.sessionAddCss;
			if(d.sesstionLimit > 0 && d.sesstionLimit > (new Date().getTime())) d.sessionOn = true;
			sendResponse({data:d});
		}
		else{
			sendResponse({data:localStorage[request.key]});
		}
	}
});