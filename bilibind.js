var stop = false;

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
	switch(JSON.parse(this.responseText).code){
		case 0:
		document.getElementById("pin").innerHTML = JSON.parse(this.responseText).pin;
        setInterval(refresh(),750);
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

function refresh(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
	    switch(JSON.parse(this.responseText).code){
	    	case 0:
	    	if(JSON.parse(this.responseText).verified&&!stop){
                document.getElementById("verify-status").innerHTML = '<i class="fa-solid fa-circle-check"></i><span style="color:#333333; font-size:18px">&nbsp;已验证</span>'
            }
	    	break;
	    }
    }
    };
    xhttp.open("GET", "https://api.jcsuf.top/api/bilibind", true);
    xhttp.withCredentials = true;
    xhttp.send();
}