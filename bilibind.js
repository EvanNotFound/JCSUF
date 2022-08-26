var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
	switch(JSON.parse(this.responseText).code){
		case 0:
		document.getElementById("pin").innerHTML = JSON.parse(this.responseText).pin
		break;
		case 1:
		alert("未登录")
		break;
	}
}
};
xhttp.open("GET", "https://api.jcsuf.top/api/bilibind", true);
xhttp.withCredentials = true;
xhttp.send();