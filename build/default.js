var animateLock = 0;
var registerLock = 0;
var currentid = -1;
var admin = 0;
var tasks = 0;
var finishes = 0;

function change_to_dark() {
	document.documentElement.setAttribute("theme", "dark");
}

function change_to_white() {
	document.documentElement.setAttribute("theme", "white");
}

if (window.screen.availWidth > 1080) {
	document.documentElement.setAttribute("dtype", "default");
} else {
	document.documentElement.setAttribute("dtype", "mobile");
}

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		nettaskfinish();
		var response = JSON.parse(this.responseText);
		document.getElementById("namefield").innerHTML = response.name;
		document.getElementById("more-namefield").innerHTML = response.name;
		document.getElementById("ava-img").src = response.avatar;
		currentid = response.uid;
		admin = response.admin_level;
		process_level(response.exp);
		if (response.uid != -1) {
			document.getElementById("signin-compose").title = "发帖";
			document.getElementById("signin-compose").innerHTML = "发帖";
			document.getElementById("signin-compose").href = "compose.html";
		}
		if (document.getElementById("message-count") != undefined) {
			document.getElementById("message-count").innerHTML = response.unreadmsgcount;
			//if (response.last_seen < 1662816492984) {
			//	display_notice();
			//}
		}
	}
};
xhttp.open("GET", "https://api.jcsuf.top/api/loginstatus", true);
xhttp.withCredentials = true;
xhttp.send();
nettaskcreate();

function process_level(exp) {
	const levelMapping = [
		{ expLimit: 0, levelText: "Lv0" },
		{ expLimit: 30, levelText: "Lv1" },
		{ expLimit: 60, levelText: "Lv2" },
		{ expLimit: 100, levelText: "Lv3" },
		{ expLimit: 200, levelText: "Lv4" },
		{ expLimit: 500, levelText: "Lv5" },
		{ expLimit: 800, levelText: "Lv6" },
		{ expLimit: 1500, levelText: "Lv7" },
		{ expLimit: 2500, levelText: "Lv8" },
		{ expLimit: 4000, levelText: "Lv9" },
		{ expLimit: 6000, levelText: "Lv10" },
		{ expLimit: 10000, levelText: "Lv11" },
		{ expLimit: Infinity, levelText: "Lv12" }
	];

	const levelField = document.getElementById("levelfield");

	for (let i = 0; i < levelMapping.length; i++) {
		if (exp < levelMapping[i].expLimit) {
			levelField.innerHTML = levelMapping[i].levelText;
			break;
		}
	}
}

function process_author_level(exp, floor) {
	const levelMapping = [
		{ expLimit: 0, levelText: "Lv0" },
		{ expLimit: 30, levelText: "Lv1" },
		{ expLimit: 60, levelText: "Lv2" },
		{ expLimit: 100, levelText: "Lv3" },
		{ expLimit: 200, levelText: "Lv4" },
		{ expLimit: 500, levelText: "Lv5" },
		{ expLimit: 800, levelText: "Lv6" },
		{ expLimit: 1500, levelText: "Lv7" },
		{ expLimit: 2500, levelText: "Lv8" },
		{ expLimit: 4000, levelText: "Lv9" },
		{ expLimit: 6000, levelText: "Lv10" },
		{ expLimit: 10000, levelText: "Lv11" },
		{ expLimit: Infinity, levelText: "Lv12" }
	];

	const level = document.getElementById("author-level-" + floor);

	for (let i = 0; i < levelMapping.length; i++) {
		if (exp < levelMapping[i].expLimit) {
			level.innerHTML = levelMapping[i].levelText;
			break;
		}
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
	const userlist = Array.from(document.getElementsByClassName("username-content"));

	userlist.forEach((user) => {
		const afterAttribute = user.getAttribute("after");
		const uidAttribute = user.getAttribute("uid");

		if (afterAttribute !== "yes" && uidAttribute !== null) {
			const uid = uidAttribute;
			const xhttptrans = new XMLHttpRequest();

			xhttptrans.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					const response = JSON.parse(this.responseText);

					if (response.uid !== -1) {
						user.innerHTML = response.name;
						user.setAttribute("after", "yes");
					}
				}
			};

			xhttptrans.open("GET", `https://api.jcsuf.top/api/userinfo?uid=${uid}`, true);
			xhttptrans.withCredentials = true;
			xhttptrans.send();
		}
	});
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
	var dateObj = new Date(date);
	var currentYear = new Date().getFullYear();
	var year = dateObj.getFullYear();
	var month = dateObj.toLocaleString('default', { month: 'short' });
	var day = String(dateObj.getDate()).padStart(2, '0');
	
	if (year === currentYear) {
		return month + ' ' + day;
	} else {
		return year + ' ' + month + ' ' + day;
	}
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

//document.getElementById("nav-icon").addEventListener("click", changeNav);
function changeNav(){
	var topnav = document.getElementById("nav-bar");
	if (topnav.className === "navbar") {
		topnav.className += " responsive";
	} else {
		topnav.className = "navbar";
	}

}