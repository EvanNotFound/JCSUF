//每100毫秒检测更新刷新预览
var lastVar = "";
setInterval(function(){
	if(lastVar!=document.getElementById("i2").value.replaceAll('\n','<br>')){
		lastVar = document.getElementById("i2").value.replaceAll('\n','<br>')
		document.getElementsByClassName("preview")[0].innerHTML = lastVar
	}
},100)

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		var rbody = JSON.parse(this.responseText)
		for(let i = 0; i < rbody.length; i++){
			document.getElementById("i3").innerHTML += '<option value="'+rbody[i].id+'">'+rbody[i].name+'</option>';
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
        if(t.charCodeAt(0)>=256){
          text = "uN1c0dE"+t.charCodeAt(0).toString(16).toLowerCase();
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
				case 999:
				alert("管理员正在修正服务器数据，请稍等几秒并重试");
			}
		}
	};
	xhttp2.open("POST", "https://api.jcsuf.top/api/postarticle", true);
	xhttp2.withCredentials = true;
	xhttp2.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
	xhttp2.send("category="+document.getElementById("i3").selectedIndex+"&anonymous="+document.getElementById("i4").checked+"&content="+utf8Str.replaceAll("\n","<br>")+"&title="+utf8Str2.replaceAll("\n","<br>")+"&tag=0");
}

function invokevote(){
	alert("您正在尝试测试功能，投票创建后暂时无法显示，预计将在7-22完成功能");
}
