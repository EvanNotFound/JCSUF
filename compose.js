//每200毫秒检测更新刷新预览
var lastVar = "";
var reptime = 0
setInterval(function(){
	if(lastVar!=document.getElementById("i2").value.replaceAll('\n','<br>')){
		lastVar = document.getElementById("i2").value.replaceAll('\n','<br>')
		document.getElementsByClassName("preview")[0].innerHTML = lastVar
		if(reptime%10===0) repaintdef()
		if(lastVar.search(/https?:\/\/music\.163\.com\/song\?id=[0-9]+(\&userid=[0-9]+)?/g)!=-1){
			document.getElementById("usertip-content").innerHTML = "检测到网易云音乐链接，可以 <button onclick='wyy_compile()'>一键插入</button> 音乐卡片，显示可能需要一定时间";
		} else if(lastVar.search(/https?:\/\/www\.pixiv\.net\/artworks\/([0-9]+)/g)!=-1){
			document.getElementById("usertip-content").innerHTML = "检测到Pixiv插图链接，可以 <button onclick='pixiv_compile()'>一键插入</button> 插图，显示可能需要一定时间";
		} else if(lastVar.search(/https?:\/\/www\.bilibili\.com\/video\/(BV[0-9a-zA-V]{10})\//g)!=-1){
			document.getElementById("usertip-content").innerHTML = "检测到Bilibili视频链接，可以 <button onclick='bilibili_compile()'>一键插入</button> 视频，显示可能需要一定时间";
		} else {
			document.getElementById("usertip-content").innerText = "";
		}
	}
	reptime++
},200)

var votetitle = undefined;
var voteend = -1;
var votetype = 0;
var voteanon = false;

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		var rbody = JSON.parse(this.responseText)
		for(let i = 0; i < rbody.length; i++){
			if(rbody[i].id>=1000) document.getElementById("maincate").innerHTML += '<option value="'+rbody[i].id+'">'+rbody[i].name+'</option>';
		}
	}
};
xhttp.open("GET", "https://api.jcsuf.top/api/categorylist", true);
xhttp.withCredentials = true;
xhttp.send();

function post(){
	var xhttp2 = new XMLHttpRequest();
	var str = document.getElementById("i2").value;
	let utf8Str=''
    for (let i=0; i<str.length;i++){
        let t = str[i]
        let text = ''
        if(t.charCodeAt(0)>=4096){
          text = "uN1c0dE"+t.charCodeAt(0).toString(16).toLowerCase();
        }else if(t.charCodeAt(0)>=256){
			text = "uN1c0dE0"+t.charCodeAt(0).toString(16).toLowerCase();
		}else{
          text = encodeURIComponent(t)
        }
        utf8Str += text
    }
	var str2 = document.getElementById("i1").value;
	let utf8Str2=''
    for (let i=0; i<str2.length;i++){
        let t = str2[i]
        let text = ''
        if(t.charCodeAt(0)>=256){
          text = "uN1c0dE"+t.charCodeAt(0).toString(16).toLowerCase();
        }else{
          text = encodeURIComponent(t)
        }
        utf8Str2 += text
     }
	xhttp2.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			switch(JSON.parse(this.responseText).code){
				case 0:
				location.href = "https://www.jcsuf.top/sendSuccess.html"
				break;
				case 1:
				alert("发布失败，请检查登录状态等内容");
				break;
				case 2:
				alert("您已被封禁");
				break;
				case 3:
				alert("未选择分区");
				break;
				case 4:
				alert("你什么身份，我什么地位？");
				break;
				case 999:
				alert("管理员正在修正服务器数据，请稍等几秒并重试");
			}
		}
	};
	xhttp2.open("POST", "https://api.jcsuf.top/api/postarticle", true);
	xhttp2.withCredentials = true;
	xhttp2.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
	var reqparam = "category="+document.getElementById("i3").value+"&anonymous="+document.getElementById("i4").checked+"&content="+utf8Str.replaceAll("\n","<br>")+"&title="+utf8Str2.replaceAll("\n","<br>")+"&tag=0&nsfw="+document.getElementById("i5").checked+"&lonly="+document.getElementById("i6").checked+"&political="+document.getElementById("i7").checked+"&unsearch="+document.getElementById("i8").checked+"&restrictreg="+document.getElementById("i9").checked+"&levellimit="+document.getElementById("i10").value;
	if(votetitle!=undefined){
		if(votetype==0){
			reqparam += "&vote=";
			for (let i=0; i<votetitle.length;i++){
				let t = votetitle[i]
				let text = ''
				if(t.charCodeAt(0)>=4096){
				  text = "uN1c0dE"+t.charCodeAt(0).toString(16).toLowerCase();
				}else if(t.charCodeAt(0)>=256){
					text = "uN1c0dE0"+t.charCodeAt(0).toString(16).toLowerCase();
				} else {
				  text = encodeURIComponent(t)
				}
				reqparam += text
			 }
			reqparam += "&votetype=0";
			reqparam += "&voteend="+voteend;
			reqparam += "&voteanonymous="+voteanon;
		}
	}
	xhttp2.send(reqparam);
}

function invokevote(){
	document.getElementById("bgmask").style.display = "block";
	document.getElementById("create-vote-container").style.display = "block";
}

function minimize_pane(){
	document.getElementById("bgmask").style.display = "none";
	document.getElementById("create-vote-container").style.display = "none";
}

function enablevote(){
	votetitle = document.getElementById("v1").value;
	voteanon = document.getElementById("v2").checked;
	minimize_pane()
}

function loadbranch(val){
	if(val!=-1){
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var rbody = JSON.parse(this.responseText)
				document.getElementById("i3").innerHTML = '<option value="-1">--未选择--</option>';
				for(let i = 0; i < rbody.length; i++){
					document.getElementById("i3").innerHTML += '<option value="'+rbody[i].id+'">'+rbody[i].name+'</option>';
				}
			}
		};
		xhttp.open("GET", "https://api.jcsuf.top/api/categorylist?parent="+val, true);
		xhttp.withCredentials = true;
		xhttp.send();
	}
}

function display_user_option(checked){
	if(checked) document.getElementById("more-option").style.display = "block";
	else document.getElementById("more-option").style.display = "none";
}

function displaytip(val) {
	console.log("val => "+val)
	if(val==8){
		document.getElementById("usertip-cate").innerText = "如果是来自网易云音乐的音乐，可以复制链接中的id字段，在内容框输入<wyy mid='id'></wyy>，以快捷插入音乐";
	} else if(val==14) {
		document.getElementById("usertip-cate").innerText = "如果是来自Pixiv的插画，可以复制链接中artworks/后的数字，在内容框输入<pixiv pid='id'></pixiv>，以快捷插入插画";
	} else {
		document.getElementById("usertip-cate").innerText = "";
	}
}

function wyy_compile() {
	document.getElementById("i2").value = document.getElementById("i2").value.replace(/https?:\/\/music\.163\.com\/song\?id=([0-9]+)(\&userid=[0-9]+)?/g,"<wyy mid='$1'></wyy>")
	repaintdef()
}

function pixiv_compile() {
	document.getElementById("i2").value = document.getElementById("i2").value.replace(/https?:\/\/www\.pixiv\.net\/artworks\/([0-9]+)/g,"<pixiv pid='$1'></pixiv>")
	repaintdef()
}

function bilibili_compile() {
	document.getElementById("i2").value = document.getElementById("i2").value.replace(/https?:\/\/www\.bilibili\.com\/video\/(BV[0-9a-zA-V]{10})\//g,"<bili bvid='$1'></bili>")
	repaintdef()
}