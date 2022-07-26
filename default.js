var animateLock = 0;
var registerLock = 0;
var currentid = -1;
var admin = 0;
var tasks = 0;
var finishes = 0;

function change_to_dark() {
	document.documentElement.setAttribute("theme", "dark")
}

function change_to_white() {
	document.documentElement.setAttribute("theme", "white")
}

if (window.screen.availWidth > 1080) {
	document.documentElement.setAttribute("dtype", "default")
} else {
	document.documentElement.setAttribute("dtype", "mobile")
}

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
	if (this.readyState == 4 && this.status == 200) { nettaskfinish()
		document.getElementById("namefield").innerHTML = "<b><big>" + JSON.parse(this.responseText).name + "</big></b>";
		document.getElementById("more-namefield").innerHTML = "<b>" + JSON.parse(this.responseText).name + "</b>";
		document.getElementById("ava-img").src = JSON.parse(this.responseText).avatar;
		currentid = JSON.parse(this.responseText).uid;
		admin = JSON.parse(this.responseText).admin_level;
		process_level(JSON.parse(this.responseText).exp);
		if (JSON.parse(this.responseText).uid != -1) {
			document.getElementById("signin-compose").title = "发帖";
			document.getElementById("signin-compose").innerHTML = "发帖";
			document.getElementById("signin-compose").href = "compose.html";
		}
		if (document.getElementById("message-count") != undefined) {
			document.getElementById("message-count").innerHTML = JSON.parse(this.responseText).unreadmsgcount;
			//if (JSON.parse(this.responseText).last_seen < 1662816492984) {
			//	display_notice()
			//}
		}
	}
};
xhttp.open("GET", "https://api.jcsuf.top/api/loginstatus", true);
xhttp.withCredentials = true;
xhttp.send(); nettaskcreate();

var xhttp3 = new XMLHttpRequest();
xhttp3.onreadystatechange = function () {
	if (this.readyState == 4 && this.status == 200) { nettaskfinish()
		document.getElementById("server-os").innerHTML = JSON.parse(this.responseText).os_type;
		document.getElementById("run-time").innerHTML = Math.round(JSON.parse(this.responseText).ontime / 60) / 1000;
	}
};
xhttp3.open("GET", "https://api.jcsuf.top/api/osinfo", true);
xhttp3.withCredentials = true;
xhttp3.send(); nettaskcreate();

function process_level(exp) {
	if (exp == 0) {
		document.getElementById("avatar").style.boxShadow = "0px 0px 5px black"
		document.getElementById("levelfield").innerHTML = "Lv0"
	} else if (exp < 30) {
		document.getElementById("avatar").style.boxShadow = "0px 0px 5px white"
		document.getElementById("levelfield").innerHTML = "Lv1"
	} else if (exp < 60) {
		document.getElementById("avatar").style.boxShadow = "0px 0px 5px white"
		document.getElementById("levelfield").innerHTML = "Lv2"
	} else if (exp < 100) {
		document.getElementById("avatar").style.boxShadow = "0px 0px 5px rgb(180,255,190)"
		document.getElementById("levelfield").innerHTML = "Lv3"
	} else if (exp < 200) {
		document.getElementById("avatar").style.boxShadow = "0px 0px 5px rgb(180,255,190)"
		document.getElementById("levelfield").innerHTML = "Lv4"
	} else if (exp < 500) {
		document.getElementById("avatar").style.boxShadow = "0px 0px 5px rgb(180,216,255)"
		document.getElementById("levelfield").innerHTML = "Lv5"
	} else if (exp < 800) {
		document.getElementById("avatar").style.boxShadow = "0px 0px 5px rgb(180,216,255)"
		document.getElementById("levelfield").innerHTML = "Lv6"
	} else if (exp < 1500) {
		document.getElementById("avatar").style.boxShadow = "0px 0px 5px rgb(255,216,180)"
		document.getElementById("levelfield").innerHTML = "Lv7"
	} else if (exp < 2500) {
		document.getElementById("avatar").style.boxShadow = "0px 0px 5px rgb(255,174,255)"
		document.getElementById("levelfield").innerHTML = "Lv8"
	} else if (exp < 4000) {
		document.getElementById("avatar").style.boxShadow = "0px 0px 5px rgb(225,154,225)"
		document.getElementById("levelfield").innerHTML = "Lv9"
	} else if (exp < 6000) {
		document.getElementById("avatar").style.boxShadow = "0px 0px 5px rgb(255,72,72)"
		document.getElementById("levelfield").innerHTML = "Lv10"
	} else if (exp < 10000) {
		document.getElementById("avatar").style.boxShadow = "0px 0px 8px rgb(255,36,36)"
		document.getElementById("levelfield").innerHTML = "Lv11"
	} else {
		document.getElementById("avatar").style.boxShadow = "0px 0px 15px red"
		document.getElementById("levelfield").innerHTML = "Lv12"
	}
}

function process_author_level(exp, floor) {
	if (exp == 0) {
		document.getElementById("author-avatar-" + floor).style.boxShadow = "0px 0px 5px black"
		document.getElementById("author-level-" + floor).innerHTML = "Lv0"
	} else if (exp < 30) {
		document.getElementById("author-avatar-" + floor).style.boxShadow = "0px 0px 5px white"
		document.getElementById("author-level-" + floor).innerHTML = "Lv1"
	} else if (exp < 60) {
		document.getElementById("author-avatar-" + floor).style.boxShadow = "0px 0px 5px white"
		document.getElementById("author-level-" + floor).innerHTML = "Lv2"
	} else if (exp < 100) {
		document.getElementById("author-avatar-" + floor).style.boxShadow = "0px 0px 5px rgb(180,255,190)"
		document.getElementById("author-level-" + floor).innerHTML = "Lv3"
	} else if (exp < 200) {
		document.getElementById("author-avatar-" + floor).style.boxShadow = "0px 0px 5px rgb(180,255,190)"
		document.getElementById("author-level-" + floor).innerHTML = "Lv4"
	} else if (exp < 500) {
		document.getElementById("author-avatar-" + floor).style.boxShadow = "0px 0px 5px rgb(180,216,255)"
		document.getElementById("author-level-" + floor).innerHTML = "Lv5"
	} else if (exp < 800) {
		document.getElementById("author-avatar-" + floor).style.boxShadow = "0px 0px 5px rgb(180,216,255)"
		document.getElementById("author-level-" + floor).innerHTML = "Lv6"
	} else if (exp < 1500) {
		document.getElementById("author-avatar-" + floor).style.boxShadow = "0px 0px 5px rgb(255,216,180)"
		document.getElementById("author-level-" + floor).innerHTML = "Lv7"
	} else if (exp < 2500) {
		document.getElementById("author-avatar-" + floor).style.boxShadow = "0px 0px 5px rgb(255,174,255)"
		document.getElementById("author-level-" + floor).innerHTML = "Lv8"
	} else if (exp < 4000) {
		document.getElementById("author-avatar-" + floor).style.boxShadow = "0px 0px 5px rgb(225,154,225)"
		document.getElementById("author-level-" + floor).innerHTML = "Lv9"
	} else if (exp < 6000) {
		document.getElementById("author-avatar-" + floor).style.boxShadow = "0px 0px 5px rgb(255,72,72)"
		document.getElementById("author-level-" + floor).innerHTML = "Lv10"
	} else if (exp < 10000) {
		document.getElementById("author-avatar-" + floor).style.boxShadow = "0px 0px 8px rgb(255,36,36)"
		document.getElementById("author-level-" + floor).innerHTML = "Lv11"
	} else {
		document.getElementById("author-avatar-" + floor).style.boxShadow = "0px 0px 15px red"
		document.getElementById("author-level-" + floor).innerHTML = "Lv12"
	}
}

function display_more() {
	if (animateLock == 0) {
		animateLock = 1
		document.getElementById("avatar").style.width = "480px"
		setTimeout(function () { document.getElementById("avatar").style.height = "360px" }, 80)
		setTimeout(function () {
			document.getElementById("more-namefield").style.display = "block"
			document.getElementById("nfield-bg").style.display = "block"
			document.getElementById("nfield-bg").style.width = "432px"
		}, 80)
		setTimeout(function () { animateLock = 0 }, 390)
	} else if (registerLock == 0) {
		registerLock = 1;
		setTimeout(function () {
			registerLock = 0;
			display_more()
		}, 10)
	}
}

function display_less() {
	if (animateLock == 0) {
		animateLock = 1
		document.getElementById("avatar").style.height = "48px"
		document.getElementById("more-namefield").style.display = "none"
		document.getElementById("nfield-bg").style.display = "none"
		document.getElementById("nfield-bg").style.width = "0px"
		setTimeout(function () { document.getElementById("avatar").style.width = "48px" }, 80)
		setTimeout(function () { animateLock = 0 }, 390)
	} else if (registerLock == 0) {
		registerLock = 1;
		setTimeout(function () {
			registerLock = 0;
			display_less()
		}, 10)
	}
}

function process_user() {
	var userlist = document.getElementsByClassName("username-content");
	for (var i = 0; i < userlist.length; i++) {
		if (!(userlist[i].getAttribute("after") == "yes") && !(userlist[i].getAttribute("uid") == null)) {
			var uid = userlist[i].getAttribute("uid");
			var xhttptrans = new XMLHttpRequest();
			xhttptrans.onreadystatechange = function () {
				if (this.readyState == 4 && this.status == 200 && JSON.parse(this.responseText).uid != -1) {
					document.getElementsByClassName("username-content")[this.fuckargument].innerHTML = JSON.parse(this.responseText).name;
					document.getElementsByClassName("username-content")[this.fuckargument].setAttribute("after", "yes");
				}
			};
			xhttptrans.fuckargument = i;
			xhttptrans.open("GET", "https://api.jcsuf.top/api/userinfo?uid=" + uid, true);
			xhttptrans.withCredentials = true;
			xhttptrans.send(); nettaskcreate();
		}
	}
}

function process_pixiv() {
	var pixivlist = document.getElementsByTagName("pixiv");
	for (var i = 0; i < pixivlist.length; i++) {
		if (!(pixivlist[i].getAttribute("after") == "yes") && !(pixivlist[i].getAttribute("pid") == null)) {
			var pid = pixivlist[i].getAttribute("pid");
			pixivlist[i].innerHTML = "<a href='https://www.pixiv.net/artworks/" + pid + "' target='_blank'><img src='https://pximg.rainchan.win/img?img_id=" + pid + "' width='90%' alt='PID" + pid + "'/></a>";
			pixivlist[i].setAttribute("after", "yes");
		}
	}
}

function process_wyy() {
	var wyylist = document.getElementsByTagName("wyy");
	for (var i = 0; i < wyylist.length; i++) {
		if (!(wyylist[i].getAttribute("after") == "yes") && !(wyylist[i].getAttribute("mid") == null)) {
			var mid = wyylist[i].getAttribute("mid");
			wyylist[i].innerHTML = '<iframe frameborder="0" border="1" marginwidth="0" marginheight="0" width="90%" src="https://music.163.com/outchain/player?type=2&id=' + mid + '&auto=1&height=60"></iframe>';
			wyylist[i].setAttribute("after", "yes");
		}
	}
}

function process_bilibili() {
	var blist = document.getElementsByTagName("bili");
	for (var i = 0; i < blist.length; i++) {
		if (!(blist[i].getAttribute("after") == "yes") && !(blist[i].getAttribute("bvid") == null)) {
			var bvid = blist[i].getAttribute("bvid");
			blist[i].innerHTML = '<iframe src="https://player.bilibili.com/player.html?bvid=' + bvid + '" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>';
			blist[i].setAttribute("after", "yes");
		}
	}
}

function formatDateTime(date) {
	if (date == "" || !date) {
		return "";
	}
	var date = new Date(date);
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	m = m < 10 ? ('0' + m) : m;
	var d = date.getDate();
	d = d < 10 ? ('0' + d) : d;
	var h = date.getHours();
	h = h < 10 ? ('0' + h) : h;
	var minute = date.getMinutes();
	minute = minute < 10 ? ('0' + minute) : minute;
	var second = date.getSeconds();
	second = second < 10 ? ('0' + second) : second;
	return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
}

function del(aid) {
	var xhttpdel = new XMLHttpRequest();
	xhttpdel.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) { nettaskfinish()
			switch (JSON.parse(this.responseText).code) {
				case 0:
					alert("成功删除。")
					document.getElementById("article-" + aid).style.opacity = "0%";
					setTimeout(function () { document.getElementById("article-" + aid).remove() }, 1000)
					break
				case 1:
					alert("指向的帖子不存在！")
					break
				case 2:
					alert("权限不足！")
			}
		}
	};
	xhttpdel.open("GET", "https://api.jcsuf.top/api/deletearticle?aid=" + aid, true);
	xhttpdel.withCredentials = true;
	xhttpdel.send(); nettaskcreate();
}

function repaintdef() {
	setInterval(function () {
		if (document.readyState == 'complete') {
			for (var imgelemid = 0; imgelemid < document.getElementsByTagName("img").length; imgelemid++) {
				var procimg = document.getElementsByTagName("img")[imgelemid];
				if (procimg.style.width > 480) {
					procimg.style.width = "90%";
				}
			}
		}
		process_user();
		process_pixiv();
		process_wyy();
		process_bilibili();
	}, 2000)
}

function nettaskcreate() {
	tasks++;
	output_task();
}

function nettaskfinish() {
	finishes++;
	output_task();
	if (tasks == finishes) setTimeout(function () { if (tasks == finishes) { tasks = 0; finishes = 0; output_task() } }, 1000)
}

function output_task() {
	console.log("Network Tasks: " + tasks + " created, " + finishes + " finished.")
	if(tasks!=0||finishes!=0){
		document.getElementById("resource-load").innerHTML = "加载资源: "+finishes+"/"+tasks;
	} else {
		document.getElementById("resource-load").innerHTML = "";
	}
}

document.getElementById("nav-icon").addEventListener("click", changeNav);
function changeNav(){
	var topnav = document.getElementById("nav-bar");
	if (topnav.className === "navbar") {
		topnav.className += " responsive";
	} else {
		topnav.className = "navbar";
	}

}