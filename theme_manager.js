function switch_theme(){
	if(document.documentElement.getAttribute("theme")=="white") {
		document.documentElement.setAttribute("theme","dark")
		document.cookie = "theme=dark"
	} else if(document.documentElement.getAttribute("theme")=="dark") {
		document.documentElement.setAttribute("theme","bing")
		document.cookie = "theme=bing"
	} else {
		document.documentElement.setAttribute("theme","white")
		document.cookie = "theme=white"
	}
	var xhttp2 = new XMLHttpRequest();
	xhttp2.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			if(JSON.parse(this.responseText).code==0){
				console.log("theme server storage =>"+document.documentElement.getAttribute("theme")+"")
			} else if(JSON.parse(this.responseText).code==-1){
				console.log("theme cookie storage =>"+document.documentElement.getAttribute("theme")+"")
			} else {
				alert("你是怎么触发这个的？")
			}
		}
	};
	xhttp2.open("GET", "https://api.jcsuf.top/api/themechange?theme="+document.documentElement.getAttribute("theme"), true);
	xhttp2.withCredentials = true;
	xhttp2.send();
}

document.documentElement.setAttribute("theme",document.cookie.replace(/(?:(?:^|.*;\s*)theme\s*\=\s*([^;]*).*$)|^.*$/, "$1"))
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		document.documentElement.setAttribute("theme",JSON.parse(this.responseText).theme_preferrence)
		document.cookie = "theme="+JSON.parse(this.responseText).theme_preferrence
	}
};
xhttp.open("GET", "https://api.jcsuf.top/api/loginstatus", true);
xhttp.withCredentials = true;
xhttp.send();
