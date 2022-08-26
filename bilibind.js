var stop = false;

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
	switch(JSON.parse(this.responseText).code){
		case 0:
		document.getElementById("pin").innerHTML = JSON.parse(this.responseText).pin;
        setInterval(refresh,750);
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
    if(!stop){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
	    switch(JSON.parse(this.responseText).code){
	    	case 0:
	    	if(JSON.parse(this.responseText).received){
                document.getElementById("verify-status").innerHTML = '<i class="fa-solid fa-circle-check"></i><span style="color:#333333; font-size:18px">&nbsp;已验证</span>'
                var xhttp3 = new XMLHttpRequest();
                xhttp3.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                	document.getElementById("bili-username").innerHTML = JSON.parse(this.responseText).data.name+" Bili Level "+JSON.parse(this.responseText).data.level;
                }
                };
                xhttp3.open("GET", "https://api.jcsuf.top/api/biliuserinfo?bid="+JSON.parse(this.responseText).buid, true);
                xhttp3.withCredentials = true;
                xhttp3.send();
                stop = true;
            }
	    	break;
	    }
    }
    };
    xhttp.open("GET", "https://api.jcsuf.top/api/bilibind", true);
    xhttp.withCredentials = true;
    xhttp.send();
    }
}