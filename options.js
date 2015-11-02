	
	var newSession = {e:document.getElementById("newsession")};
	newSession.cells = newSession.e.getElementsByTagName("td");
	newSession.inputRemoveCss = newSession.cells[0].getElementsByTagName("input")[0];
	newSession.inputAddCss = newSession.cells[1].getElementsByTagName("input")[0];
	newSession.inputLimit = newSession.cells[2].getElementsByTagName("input")[0];
	
	var curentSession = {e:document.getElementById("cursession")};
	curentSession.cells = curentSession.e.getElementsByTagName("td");
	curentSession.ctnRemoveCss = curentSession.cells[0];
	curentSession.ctnAddCss = curentSession.cells[1];
	curentSession.ctnLimit = curentSession.cells[2];
	
	function showMsg(msg){
		var status = document.getElementById("status"); status.style.display = "block";
		status.textContent = msg;
		setTimeout(function(){ status.style.display = "none"; restore_options(); },1250);
	}
	
	function convertTime(timestamp){
		
		var a = new Date(timestamp);
		var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		var year = a.getFullYear();
		var month = months[a.getMonth()];
		var date = a.getDate();
		var hour = a.getHours(); if(hour < 10) hour = "0"+hour;
		var min = a.getMinutes(); if(min < 10) min = "0"+min;
		var sec = a.getSeconds(); if(sec < 10) sec = "0"+sec;
		var time = date + ' ' + month + ' ' + year + ', ' + hour + ':' + min + ':' + sec ;
		return time;
	}
	
	function start_session(){
		
		var settings = {
			sessionRemoveCss:newSession.inputRemoveCss.value.split(" ** "),
			sessionAddCss:newSession.inputAddCss.value.split(" ** "),
			sesstionLimit:(new Date().getTime())+parseInt(newSession.inputLimit.value)*60000
		};
		localStorage["current_session"] = JSON.stringify(settings);
		showMsg("New session started.");
	}
	document.getElementById("start").addEventListener("click",start_session);
	
	function stop_session(){
		
		var settings = {
			sessionRemoveCss:curentSession.removeCss,
			sessionAddCss:curentSession.addCss,
			sesstionLimit:0
		};
		localStorage["current_session"] = JSON.stringify(settings);
		showMsg("Session stopped.");
	}
	document.getElementById("stop").addEventListener("click",stop_session);
	
	function restore_options(){
		
		chrome.runtime.sendMessage({method:"getLocalStorage",key:"current_session"},function(response){
			
			newSession.inputRemoveCss.value = response.data.optRemoveCss.join(" ** ");
			newSession.inputAddCss.value = response.data.optAddCss.join(" ** ");
			newSession.inputLimit.value = "15";
			
			curentSession.removeCss = response.data.sessionRemoveCss;
			curentSession.addCss = response.data.sessionAddCss;
			curentSession.ctnRemoveCss.innerHTML = response.data.sessionRemoveCss.join("<br>");
			curentSession.ctnAddCss.innerHTML = response.data.sessionAddCss.join("<br>");
			curentSession.ctnLimit.innerHTML = response.data.sessionOn > 0 ? convertTime(response.data.sesstionLimit) : "Session is over.";
		});
	}
	document.addEventListener("DOMContentLoaded",restore_options);
	