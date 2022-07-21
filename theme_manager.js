function switch_theme(){
	if(document.documentElement.getAttribute("theme")=="white"){
		document.documentElement.setAttribute("theme","dark")
	} else {
		document.documentElement.setAttribute("theme","white")
	}
	var xhttp2 = new XMLHttpRequest();
	xhttp2.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			if(JSON.parse(this.responseText).code==0){
				alert("成功将主题进行全局变换（现在是"+document.documentElement.getAttribute("theme")+"）")
			} else if(JSON.parse(this.responseText).code==-1){
				alert("成功将主题进行本页面变换，登录后再尝试可以全局生效（现在是"+document.documentElement.getAttribute("theme")+"）")
			} else {
				alert("你是怎么触发这个的？")
			}
		}
	};
	xhttp2.open("GET", "http://1.15.82.181:8080/api/themechange?theme="+document.documentElement.getAttribute("theme"), true);
	xhttp2.send();
}

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		document.documentElement.setAttribute("theme",JSON.parse(this.responseText).theme_preferrence)
	}
};
xhttp.open("GET", "http://1.15.82.181:8080/api/loginstatus", true);
xhttp.send();