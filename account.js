function reg(){
	var str = document.getElementById("i1").value;
	let utf8Str=''
    for (let i=0; i<str.length;i++){
        let t = str[i]
        let text = ''
        if(t.charCodeAt(0)>=256){
          text = "uN1c0dE"+t.charCodeAt(0).toString(16).toLowerCase();
        }else{
          text = encodeURIComponent(t)
          text = text.replaceAll('%','')
        }
        utf8Str += text
     }
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		switch(JSON.parse(this.responseText).code){
			case 0:
			location.href = "http://1.15.82.181:8080/regSuccess.html"
			break;
			case 1:
			alert("该邮箱已被占用")
			break;
			case 2:
			alert("非法的邮箱名")
		}
	}
	};
	xhttp.open("POST", "http://1.15.82.181:8080/api/register", true);
	xhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded")//必须要设置，被坑了一天啊
	xhttp.send("name="+utf8Str+"&password="+document.getElementById("i2").value+"&mail="+document.getElementById("i3").value);
}

function signin(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		switch(JSON.parse(this.responseText).code){
			case 0:
			location.href = "http://1.15.82.181:8080/signinSuccess.html"
			break;
			case 1:
			alert("该邮箱不存在")
			break;
			case 2:
			alert("邮箱与密码不匹配")
		}
	}
	};
	xhttp.open("POST", "http://1.15.82.181:8080/api/signin", true);
	xhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded")//必须要设置，被坑了一天啊
	xhttp.send("password="+document.getElementById("i2").value+"&mail="+document.getElementById("i1").value);
}