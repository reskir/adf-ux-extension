(function(){

	if(!window.uxExtension) return;

	var linksToRemove = uxExtension.linksToRemove || [];
	var linksToAdd = uxExtension.linksToAdd || [];

	var links = document.getElementsByTagName("link");
	for(var i=0;i<linksToRemove.length;i++){
		for(var n=0;n<links.length;n++){
			if(links[n].href && links[n].href.indexOf(linksToRemove[i]) !== -1){
				links[n].parentNode.removeChild(links[n]);
			}
		}
	}

	var timestamp = (new Date().getTime());
	var head = document.head || document.getElementsByTagName('head')[0];
	for(var i=0;i<linksToAdd.length;i++){

		var href = linksToAdd[i]; href += href.indexOf("?") === -1 ? "?" : "&"; href += "ord="+timestamp;
		var style = document.createElement("link");
		style.rel = "stylesheet";
		style.type = "text/css";
		style.href = href;
		head.insertBefore(style, head.firstChild);
	}
})();
