
	var contentScripts = "";
	chrome.runtime.sendMessage({method:"getLocalStorage",key:"current_session"},function(response){

if(response.data == undefined || response.data == ""){ return; }
		if(!response.data.sessionOn){ return; }

		/* config */
		contentScripts += 'window.uxExtension = {};';
		contentScripts += 'window.uxExtension.linksToRemove = ["'+response.data.sessionRemoveCss.join('","')+'"];';
		contentScripts += 'window.uxExtension.linksToAdd = ["'+response.data.sessionAddCss.join('","')+'"];';

		/*njected js */
		contentScripts += '!function(){if(window.uxExtension){for(var e=uxExtension.linksToRemove||[],n=uxExtension.linksToAdd||[],t=document.getElementsByTagName("link"),o=0;o<e.length;o++)for(var d=0;d<t.length;d++)t[d].href&&-1!==t[d].href.indexOf(e[o])&&t[d].parentNode.removeChild(t[d]);for(var r=new Date().getTime(),a=document.head||document.getElementsByTagName("head")[0],o=0;o<n.length;o++){var i=n[o];i+=-1===i.indexOf("?")?"?":"&",i+="ord="+r;var l=document.createElement("link");l.rel="stylesheet",l.type="text/css",l.href=i,a.appendChild(l)}}}();';

		if(contentScripts !== ""){
			var actualCode = contentScripts;
			var script = document.createElement("script"); script.textContent = actualCode; (document.head||document.documentElement).appendChild(script); script.parentNode.removeChild(script);
		}
	});
