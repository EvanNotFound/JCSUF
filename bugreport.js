function report() {
	document.getElementById("bgmask").style.display = "block";
	document.getElementById("report-container").style.display = "block";
}

function minimize_pane() {
	document.getElementById("bgmask").style.display = "none";
	document.getElementById("report-container").style.display = "none";
}

function post_report() {
    if(!document.getElementById("i1").checked){
		if(prompt("不勾选采集浏览器数据会降低上报成功率!\n确定不勾选请输入“继续操作”，反之请输入其他内容重新勾选")=="继续操作") post_report_checked(false);
	} else post_report_checked(true);
}

function post_report_checked(pick){
	var str = document.getElementById("comment-text").value;
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
	xhss = new XMLHttpRequest();
	xhss.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			switch(JSON.parse(this.responseText).code){
				case 0:
				alert("发布成功（工单号："+JSON.parse(this.responseText).oid+"）");
				minimize_pane();
				break;
				default:
				alert("发布失败");
				break;
			}
		}
	};
	xhss.open("POST", "https://api.jcsuf.top/api/report", true);
	xhss.withCredentials = true;
	xhss.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
	if(pick) xhss.send("pick="+pick+"&content="+utf8Str+"&vw="+window.screen.availWidth+"&vh="+window.screen.availHeight);
	else xhss.send("pick="+pick+"&content="+utf8Str);
}

xhgw = new XMLHttpRequest();
xhgw.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		switch(JSON.parse(this.responseText).code){
			case 0:
				for(var c = 0; c < art.orders.length; c++) {
					processComment(art.orders[c]);
				}
		}
	}
};
xhgw.open("GET", "https://api.jcsuf.top/api/myworkorder", true);
xhgw.withCredentials = true;
xhgw.send();

function processOrder(order) {
	document.getElementById("main-content").innerHTML += '<div class="order-body" highlight="no" id="order-'+order.oid+'"></div>'
	document.getElementById("floor-"+order.oid).innerHTML += '<div class="userinfo" id="author-comment'+order.oid+'"><img src="https://upload.thwiki.cc/thumb/0/0a/%E9%AC%BC%E4%BA%BA%E6%AD%A3%E9%82%AA%EF%BC%88Q%E7%89%88%E7%AB%8B%E7%BB%98%EF%BC%89.png/100px-%E9%AC%BC%E4%BA%BA%E6%AD%A3%E9%82%AA%EF%BC%88Q%E7%89%88%E7%AB%8B%E7%BB%98%EF%BC%89.png" height="64px" class="left-avatar" id="author-avatar-'+order.oid+'" style="margin: 0 auto;"><br><b><span id="author-name-'+order.oid+'">作者</span></b><br><span id="author-level-'+order.oid+'">LvXX</span></div>'
	document.getElementById("floor-"+comment.floor).innerHTML += '<div class="content-container"><div class="content" id="content-'+comment.floor+'">'+order.content+'</div></div>'
}