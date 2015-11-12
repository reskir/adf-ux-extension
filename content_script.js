
	var contentScripts = "";
	chrome.runtime.sendMessage({method:"getLocalStorage",key:"current_session"},function(response){

if(response.data == undefined || response.data == ""){ return; }
		if(!response.data.sessionOn){ return; }

		/* config */
		contentScripts += 'window.uxExtension = {};';
		contentScripts += 'window.uxExtension.linksToRemove = ["'+response.data.sessionRemoveCss.join('","')+'"];';
		contentScripts += 'window.uxExtension.linksToAdd = ["'+response.data.sessionAddCss.join('","')+'"];';

		/*njected js */
		contentScripts += '!function(){if(window.uxExtension){for(var e=uxExtension.linksToRemove||[],n=uxExtension.linksToAdd||[],t=document.getElementsByTagName("link"),o=0;o<e.length;o++)for(var r=0;r<t.length;r++)t[r].href&&-1!==t[r].href.indexOf(e[o])&&t[r].parentNode.removeChild(t[r]);for(var i=(new Date).getTime(),d=document.head||document.getElementsByTagName("head")[0],o=0;o<n.length;o++){var a=n[o];a+=-1===a.indexOf("?")?"?":"&",a+="ord="+i;var l=document.createElement("link");l.rel="stylesheet",l.type="text/css",l.href=a,d.insertBefore(l,d.firstChild)}}}();'
		if(contentScripts !== ""){
			var actualCode = contentScripts;
			var script = document.createElement("script"); script.textContent = actualCode; (document.head||document.documentElement).appendChild(script); script.parentNode.removeChild(script);
		}
	});
