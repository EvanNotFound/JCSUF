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
	console.log("hahaha")
	xhsv = new XMLHttpRequest();
	xhsv.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		}
	};
	xhsv.open("POST", "https://api.jcsuf.top/api/report", true);
	xhsv.withCredentials = true;
	xhsv.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
}