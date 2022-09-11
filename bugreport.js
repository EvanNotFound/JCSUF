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
		if(prompt("不勾选采集浏览器数据会降低上报成功率!\n确定不勾选请输入“继续操作”")=="继续操作") post_report_checked();
	}
}

function post_report_checked(){

}