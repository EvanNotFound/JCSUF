var newname = "";

function rename() {
    newname = prompt("请输入您的新用户名","不应为空或相似于JCSUF Admin");
	let utf8Str=''
    for (let i=0; i<newname.length;i++){
        let t = newname[i]
        let text = ''
        if(t.charCodeAt(0)>=256){
          text = "uN1c0dE"+t.charCodeAt(0).toString(16).toLowerCase();
        }else{
          text = encodeURIComponent(t)
        }
        utf8Str += text
     }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
	    	switch(JSON.parse(this.responseText).code){
                case 0:
                alert("改名成功");
                document.getElementById("namefield").innerHTML = "<b><big>"+newname+"</big></b>";
		        document.getElementById("more-namefield").innerHTML = "<b>"+newname+"</b>";
				break;
				case 1:
				alert("你不登陆改个什么？");
				break;
				case 2:
				alert("您已被封禁");
				break;
                case 3:
				alert("不合法的用户名");
				break;
				case 999:
				alert("管理员正在修正服务器数据，请稍等几秒并重试");
            }
	    }
    };
    xhttp.open("GET", "https://api.jcsuf.top/api/rename?newname="+utf8Str, true);
    xhttp.withCredentials = true;
    xhttp.send();
}