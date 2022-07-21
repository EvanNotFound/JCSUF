var animateLock = 0;
var registerLock = 0;
var currentid = -1;
var admin = 0;

function change_to_dark(){
	document.documentElement.setAttribute("theme","dark")
}

function change_to_white(){
	document.documentElement.setAttribute("theme","white")
}

if(window.screen.availWidth>1080){
	document.documentElement.setAttribute("dtype","default")
} else {
	document.documentElement.setAttribute("dtype","mobile")
}

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		document.getElementById("namefield").innerHTML = "<b><big>"+JSON.parse(this.responseText).name+"</big></b>";
		document.getElementById("more-namefield").innerHTML = "<b>"+JSON.parse(this.responseText).name+"</b>";
		document.getElementById("ava-img").src = JSON.parse(this.responseText).avatar;
		currentid = JSON.parse(this.responseText).uid;
		admin = JSON.parse(this.responseText).admin_level;
		process_level(JSON.parse(this.responseText).exp);
		if(JSON.parse(this.responseText).uid!=-1){
			document.getElementById("signin-compose").title = "发帖";
			document.getElementById("signin-compose").innerHTML = "发帖";
			document.getElementById("signin-compose").href = "compose.html";
		}
	}
};
xhttp.open("GET", "https://api.jcsuf.top/api/loginstatus", true);
xhttp.withCredentials = true;
xhttp.send();

var xhttp3 = new XMLHttpRequest();
xhttp3.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		document.getElementById("server-os").innerHTML = JSON.parse(this.responseText).os_type;
		document.getElementById("run-time").innerHTML = Math.round(JSON.parse(this.responseText).ontime/60)/1000;
	}
};
xhttp3.open("GET", "https://api.jcsuf.top/api/osinfo", true);
xhttp3.withCredentials = true;
xhttp3.send();

//procceed with over-widthed images
document.onreadystatechange = function(){setTimeout(function(){
    if(document.readyState == 'complete'){
        for(var imgelemid = 0; imgelemid < document.getElementsByTagName("img").length; imgelemid++) {
		var procimg = document.getElementsByTagName("img")[imgelemid];
		if(procimg.width > 480){
			procimg.width = 480;
		}
	}
    }
	process_user();
},2000)}

function process_level(exp){
	if(exp==0){
		document.getElementById("avatar").style.boxShadow = "0px 0px 5px black"
		document.getElementById("levelfield").innerHTML = "Lv0"
	} else if(exp<30){
		document.getElementById("avatar").style.boxShadow = "0px 0px 5px white"
		document.getElementById("levelfield").innerHTML = "Lv1"
	} else if(exp<60){
		document.getElementById("avatar").style.boxShadow = "0px 0px 5px white"
		document.getElementById("levelfield").innerHTML = "Lv2"
	} else if(exp<100){
		document.getElementById("avatar").style.boxShadow = "0px 0px 5px rgb(180,255,190)"
		document.getElementById("levelfield").innerHTML = "Lv3"
	} else if(exp<200){
		document.getElementById("avatar").style.boxShadow = "0px 0px 5px rgb(180,255,190)"
		document.getElementById("levelfield").innerHTML = "Lv4"
	} else if(exp<500){
		document.getElementById("avatar").style.boxShadow = "0px 0px 5px rgb(180,216,255)"
		document.getElementById("levelfield").innerHTML = "Lv5"
	} else if(exp<800){
		document.getElementById("avatar").style.boxShadow = "0px 0px 5px rgb(180,216,255)"
		document.getElementById("levelfield").innerHTML = "Lv6"
	} else if(exp<1500){
		document.getElementById("avatar").style.boxShadow = "0px 0px 5px rgb(255,216,180)"
		document.getElementById("levelfield").innerHTML = "Lv7"
	} else if(exp<2500){
		document.getElementById("avatar").style.boxShadow = "0px 0px 5px rgb(255,174,255)"
		document.getElementById("levelfield").innerHTML = "Lv8"
	} else if(exp<4000){
		document.getElementById("avatar").style.boxShadow = "0px 0px 5px rgb(225,154,225)"
		document.getElementById("levelfield").innerHTML = "Lv9"
	} else if(exp<6000){
		document.getElementById("avatar").style.boxShadow = "0px 0px 5px rgb(255,72,72)"
		document.getElementById("levelfield").innerHTML = "Lv10"
	} else if(exp<10000){
		document.getElementById("avatar").style.boxShadow = "0px 0px 8px rgb(255,36,36)"
		document.getElementById("levelfield").innerHTML = "Lv11"
	} else {
		document.getElementById("avatar").style.boxShadow = "0px 0px 15px red"
		document.getElementById("levelfield").innerHTML = "Lv12"
	}
}

function process_author_level(exp, floor){
	if(exp==0){
		document.getElementById("author-avatar-"+floor).style.boxShadow = "0px 0px 5px black"
		document.getElementById("author-level-"+floor).innerHTML = "Lv0"
	} else if(exp<30){
		document.getElementById("author-avatar-"+floor).style.boxShadow = "0px 0px 5px white"
		document.getElementById("author-level-"+floor).innerHTML = "Lv1"
	} else if(exp<60){
		document.getElementById("author-avatar-"+floor).style.boxShadow = "0px 0px 5px white"
		document.getElementById("author-level-"+floor).innerHTML = "Lv2"
	} else if(exp<100){
		document.getElementById("author-avatar-"+floor).style.boxShadow = "0px 0px 5px rgb(180,255,190)"
		document.getElementById("author-level-"+floor).innerHTML = "Lv3"
	} else if(exp<200){
		document.getElementById("author-avatar-"+floor).style.boxShadow = "0px 0px 5px rgb(180,255,190)"
		document.getElementById("author-level-"+floor).innerHTML = "Lv4"
	} else if(exp<500){
		document.getElementById("author-avatar-"+floor).style.boxShadow = "0px 0px 5px rgb(180,216,255)"
		document.getElementById("author-level-"+floor).innerHTML = "Lv5"
	} else if(exp<800){
		document.getElementById("author-avatar-"+floor).style.boxShadow = "0px 0px 5px rgb(180,216,255)"
		document.getElementById("author-level-"+floor).innerHTML = "Lv6"
	} else if(exp<1500){
		document.getElementById("author-avatar-"+floor).style.boxShadow = "0px 0px 5px rgb(255,216,180)"
		document.getElementById("author-level-"+floor).innerHTML = "Lv7"
	} else if(exp<2500){
		document.getElementById("author-avatar-"+floor).style.boxShadow = "0px 0px 5px rgb(255,174,255)"
		document.getElementById("author-level-"+floor).innerHTML = "Lv8"
	} else if(exp<4000){
		document.getElementById("author-avatar-"+floor).style.boxShadow = "0px 0px 5px rgb(225,154,225)"
		document.getElementById("author-level-"+floor).innerHTML = "Lv9"
	} else if(exp<6000){
		document.getElementById("author-avatar-"+floor).style.boxShadow = "0px 0px 5px rgb(255,72,72)"
		document.getElementById("author-level-"+floor).innerHTML = "Lv10"
	} else if(exp<10000){
		document.getElementById("author-avatar-"+floor).style.boxShadow = "0px 0px 8px rgb(255,36,36)"
		document.getElementById("author-level-"+floor).innerHTML = "Lv11"
	} else {
		document.getElementById("author-avatar-"+floor).style.boxShadow = "0px 0px 15px red"
		document.getElementById("author-level-"+floor).innerHTML = "Lv12"
	}
}

function display_more() {
	if(animateLock==0){
		animateLock=1
		document.getElementById("avatar").style.width = "240px"
		setTimeout(function(){document.getElementById("avatar").style.height = "360px"},80)
		setTimeout(function(){
			document.getElementById("more-namefield").style.display = "block"
			document.getElementById("nfield-bg").style.display = "block"
			document.getElementById("nfield-bg").style.width = "192px"
		},80)
		setTimeout(function(){animateLock=0},390)
	} else if(registerLock==0){
		registerLock=1;
		setTimeout(function(){
			registerLock=0;
			display_more()
		},10)
	}
}

function display_less() {
	if(animateLock==0){
		animateLock=1
		document.getElementById("avatar").style.height = "48px"
		document.getElementById("more-namefield").style.display = "none"
		document.getElementById("nfield-bg").style.display = "none"
		document.getElementById("nfield-bg").style.width = "0px"
		setTimeout(function(){document.getElementById("avatar").style.width = "48px"},80)
		setTimeout(function(){animateLock=0},390)
	} else if(registerLock==0){
		registerLock=1;
		setTimeout(function(){
			registerLock=0;
			display_less()
		},10)
	}
}

function process_user() {
	var userlist = document.getElementsByClassName("username-content");
	for(var i=0;i<userlist.length;i++){
		var uid = userlist[i].getAttribute("uid");
		var xhttptrans = new XMLHttpRequest();
		xhttptrans.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				document.getElementsByClassName("username-content")[this.fuckargument].innerHTML = JSON.parse(this.responseText).name;
			}
		};
		xhttptrans.fuckargument = i;
		xhttptrans.open("GET", "https://api.jcsuf.top/api/userinfo?uid="+uid, true);
		xhttptrans.withCredentials = true;
		xhttptrans.send();
	}
}
