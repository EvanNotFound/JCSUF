function rename() {
    var newname = prompt("请输入您的新用户名","不应为空或相似于JCSUF Admin");
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
    xhttp.open("GET", "https://api.jcsuf.top/api/rename?newname="+utf8Str, true);
    xhttp.withCredentials = true;
    xhttp.send();
}