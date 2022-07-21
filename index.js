var xhttp2 = new XMLHttpRequest();
xhttp2.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		document.getElementById("notice-content").innerHTML = JSON.parse(this.responseText).text;
		document.getElementById("notice-modify-time").innerHTML = "JCSUF Team, "+JSON.parse(this.responseText).modify;
	}
};
xhttp2.open("GET", "https://api.jcsuf.top/api/notice", true);
xhttp2.send();

var xhttp4 = new XMLHttpRequest();
xhttp4.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		var rarts = JSON.parse(this.responseText).articles;
		for(let i=0;i<rarts.length;i++){
			document.getElementById("articles").innerHTML += '<div class="subforum-row" id="article-'+rarts[i].id+'"></div>'
			document.getElementById("article-"+rarts[i].id).innerHTML += '<div class="subforum-description subforum-column" id="article-desc-'+rarts[i].id+'"></div>'
			document.getElementById("article-desc-"+rarts[i].id).innerHTML += '<h4><a href="article.html?aid='+rarts[i].id+'" class="post_title center">'+rarts[i].title+'</a></h4>'
			document.getElementById("article-desc-"+rarts[i].id).innerHTML += '<p class="post_description">'+snapshot(rarts[i].html)+'</p>'
			document.getElementById("article-"+rarts[i].id).innerHTML += '<div class="subforum-stats subforum-column center" id="article-stat-'+rarts[i].id+'"></div>'
			document.getElementById("article-stat-"+rarts[i].id).innerHTML += '<p>+'+rarts[i].like+'</p>'
			document.getElementById("article-stat-"+rarts[i].id).innerHTML += '<p>-'+rarts[i].dislike+'</p>'
			document.getElementById("article-"+rarts[i].id).innerHTML += '<div class="subforum-info subforum-column"><p id="article-info-'+rarts[i].id+'"></p></div>'
			transname(rarts[i])
		}
	}
};
xhttp4.open("GET", "https://api.jcsuf.top/api/fetchnewarticle", true);
xhttp4.send();

if(window.screen.availWidth<=1080){
	document.getElementsByClassName("notice-container")[0].style.display = "none";
}

function snapshot(content) {
	let unformat =  content.replace(/<\/?[^>]*>/g, '');
	return unformat.substring(0,64);
}

function formatDateTime(date) {
    if (date == "" || !date) {
        return "";
    }
    var date = new Date(date);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    var second = date.getSeconds();
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second; 
}

function transname(art) { //解析Id为用户名
	var xhttptrans = new XMLHttpRequest();
	xhttptrans.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			if(currentid==art.author){
				if(art.fromAnonymous){
					document.getElementById("article-info-"+art.id).innerHTML += '<a href="user.html?uid='+art.author+'" class="post_author"><font color="#6699aa">'+JSON.parse(this.responseText).name+' (you, 匿名)</font></a> 发布于 '+formatDateTime(art.ctime)+'<br><span style="margin-left:18px">'+art.ccount+' 评论</span><br><span style="margin-left:18px">'+art.view+' 阅读</span><br><font onclick="del('+art.id+')" color="red" style="margin-left: 18px"><small>删除</small></font>'
				} else {
					document.getElementById("article-info-"+art.id).innerHTML += '<a href="user.html?uid='+art.author+'" class="post_author"><font color="#3399aa">'+JSON.parse(this.responseText).name+' (you)</font></a> 发布于 '+formatDateTime(art.ctime)+'<br><span style="margin-left:18px">'+art.ccount+' 评论</span><br><span style="margin-left:18px">'+art.view+' 阅读</span><br><font onclick="del('+art.id+')" color="red" style="margin-left: 18px"><small>删除</small></font>'
				}
			} else {
				if(art.fromAnonymous){
					document.getElementById("article-info-"+art.id).innerHTML += '<a class="post_author"><font color="#AAAA00">匿名</font></a> 发布于 '+formatDateTime(art.ctime)+'<br><span style="margin-left:18px">'+art.ccount+' 评论</span><br><span style="margin-left:18px">'+art.view+' 阅读</span>'
				} else {
					document.getElementById("article-info-"+art.id).innerHTML += '<a href="user.html?uid='+art.author+'" class="post_author">'+JSON.parse(this.responseText).name+'</a> 发布于 '+formatDateTime(art.ctime)+'<br><span style="margin-left:18px">'+art.ccount+' 评论</span><br><span style="margin-left:18px">'+art.view+' 阅读</span>'
				}
				if(admin>0){
					document.getElementById("article-info-"+art.id).innerHTML += '<br><font onclick="del('+art.id+')" color="red" style="margin-left: 18px"><small>删除</small></font>'
				}
			}
		}
	};
	xhttptrans.open("GET", "https://api.jcsuf.top/api/userinfo?uid="+art.author, true);
	xhttptrans.send();
}

function del(aid) {
	var xhttpdel = new XMLHttpRequest();
	xhttpdel.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			switch(JSON.parse(this.responseText).code){
				case 0:
				alert("成功删除，请刷新。")
				break
				case 1:
				alert("指向的帖子不存在！")
				break
				case 2:
				alert("权限不足！")
			}
		}
	};
	xhttpdel.open("GET", "https://api.jcsuf.top/api/deletearticle?aid="+aid, true);
	xhttpdel.send();
}

function reloadnew() {
	var xhttpreload = new XMLHttpRequest();
	xhttpreload.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var rarts = JSON.parse(this.responseText).articles;
			document.getElementById("articles").innerHTML = ''
			for(let i=0;i<rarts.length;i++){
				document.getElementById("articles").innerHTML += '<div class="subforum-row" id="article-'+rarts[i].id+'"></div>'
				document.getElementById("article-"+rarts[i].id).innerHTML += '<div class="subforum-description subforum-column" id="article-desc-'+rarts[i].id+'"></div>'
				document.getElementById("article-desc-"+rarts[i].id).innerHTML += '<h4><a href="article.html?aid='+rarts[i].id+'" class="post_title center">'+rarts[i].title+'</a></h4>'
				document.getElementById("article-desc-"+rarts[i].id).innerHTML += '<p class="post_description">'+snapshot(rarts[i].html)+'</p>'
				document.getElementById("article-"+rarts[i].id).innerHTML += '<div class="subforum-stats subforum-column center" id="article-stat-'+rarts[i].id+'"></div>'
				document.getElementById("article-stat-"+rarts[i].id).innerHTML += '<p>+'+rarts[i].like+'</p>'
				document.getElementById("article-stat-"+rarts[i].id).innerHTML += '<p>-'+rarts[i].dislike+'</p>'
				document.getElementById("article-"+rarts[i].id).innerHTML += '<div class="subforum-info subforum-column"><p id="article-info-'+rarts[i].id+'"></p></div>'
				transname(rarts[i])
			}
		}
	};
	xhttpreload.open("GET", "https://api.jcsuf.top/api/fetchnewarticle?pc="+document.getElementById("input-row-count").value, true);
	xhttpreload.send();
}
