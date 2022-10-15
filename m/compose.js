var lastVar = "";
var votetitle = undefined;
var voteend = -1;
var votetype = 0;
var voteanon = false;
var tasks = 0;
var finishes = 0;
setInterval(function(){
	if(lastVar!=document.getElementById("i2").value.replaceAll('\n','<br>')){
		lastVar = document.getElementById("i2").value.replaceAll('\n','<br>')
		document.getElementById("preview").innerHTML = lastVar
	}
},100)

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) { nettaskfinish()
		var rbody = JSON.parse(this.responseText)
		for(let i = 0; i < rbody.length; i++){
			if(rbody[i].id>=1000) document.getElementById("maincate").innerHTML += '<option value="'+rbody[i].id+'">'+rbody[i].name+'</option>';
		}
	}
};
xhttp.open("GET", "https://api.jcsuf.top/api/categorylist", true);
xhttp.withCredentials = true;
xhttp.send(); nettaskcreate();

function loadbranch(val){
	if(val!=-1){
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) { nettaskfinish()
				var rbody = JSON.parse(this.responseText)
				document.getElementById("i3").innerHTML = '<option value="-1">--未选择--</option>';
				for(let i = 0; i < rbody.length; i++){
					document.getElementById("i3").innerHTML += '<option value="'+rbody[i].id+'">'+rbody[i].name+'</option>';
				}
			}
		};
		xhttp.open("GET", "https://api.jcsuf.top/api/categorylist?parent="+val, true);
		xhttp.withCredentials = true;
		xhttp.send(); nettaskcreate();
	}
}

function display_user_option(checked){
	if(checked) document.getElementById("more-option").style.display = "block";
	else document.getElementById("more-option").style.display = "none";
}

function post(){
	var xhttp2 = new XMLHttpRequest();
	var str = document.getElementById("i2").value;
	let utf8Str=''
    for (let i=0; i<str.length;i++){
        let t = str[i]
        let text = ''
        text = encodeURIComponent(t)
        utf8Str += text
    }
	var str2 = document.getElementById("i1").value;
	let utf8Str2=''
    for (let i=0; i<str2.length;i++){
        let t = str2[i]
        let text = ''
        text = encodeURIComponent(t)
        utf8Str2 += text
     }
	xhttp2.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) { nettaskfinish()
			switch(JSON.parse(this.responseText).code){
				case 0:
				location.href = "https://www.jcsuf.top/sendSuccess.html"
				break;
				case 1:
				alert("发布失败，请检查登录状态等内容");
				location.href = "https://www.jcsuf.top/signin.html?redir=compose.html"
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
				text = encodeURIComponent(t)
				reqparam += text
			 }
			reqparam += "&votetype=0";
			reqparam += "&voteend="+voteend;
			reqparam += "&voteanonymous="+voteanon;
		}
	}
	xhttp2.send(reqparam);
}

var vm = new Vue({
    el: '.vue-enable',
    data: {
		but_visible: false
    },
    methods: {
    },
    mounted() {
        
    }
})

function nettaskcreate() {
	tasks++;
	output_task();
}

function nettaskfinish() {
	finishes++;
	output_task();
	if (tasks = finishes) setTimeout(function () { if (tasks = finishes) { tasks = 0; finishes = 0; output_task() } }, 1000)
}

function output_task() {
	console.log("Network Tasks: " + tasks + " created, " + finishes + " finished.")
}