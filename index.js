var xhttp2 = new XMLHttpRequest();
xhttp2.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) { nettaskfinish()
		document.getElementById("notice-content").innerHTML = JSON.parse(this.responseText).text;
		document.getElementById("notice-modify-time").innerHTML = "JCSUF Team, "+JSON.parse(this.responseText).modify;
	}
};
xhttp2.open("GET", "https://api.jcsuf.top/api/notice", true);
xhttp2.withCredentials = true;
xhttp2.send(); nettaskcreate();

var xhttp4 = new XMLHttpRequest();
xhttp4.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) { nettaskfinish()
		var rarts = JSON.parse(this.responseText).articles;
		for(let i=0;i<rarts.length;i++){
			document.getElementById("articles").innerHTML += '<div class="subforum-row" id="article-'+rarts[i].id+'"></div>'
			document.getElementById("article-"+rarts[i].id).innerHTML += '<div class="subforum-description subforum-column" id="article-desc-'+rarts[i].id+'"></div>'
			document.getElementById("article-desc-"+rarts[i].id).innerHTML += '<h4><a href="article.html?aid='+rarts[i].id+'" class="post_title center">'+rarts[i].title+'</a></h4>'
			document.getElementById("article-desc-"+rarts[i].id).innerHTML += '<p class="post_description">'+rarts[i].snapshot+'</p>'	
			document.getElementById("article-"+rarts[i].id).innerHTML += '<div class="subforum-stats subforum-column center" id="article-stat-'+rarts[i].id+'"></div>'
			document.getElementById("article-stat-"+rarts[i].id).innerHTML += '<p>+'+rarts[i].like+'</p>'
			document.getElementById("article-stat-"+rarts[i].id).innerHTML += '<p>-'+rarts[i].dislike+'</p>'
			document.getElementById("article-"+rarts[i].id).innerHTML += '<div class="subforum-info subforum-column"><p id="article-info-'+rarts[i].id+'"></p></div>'
			//document.getElementById("article-info-"+rarts[i].id).innerHTML = '<p class="fade-group-1"><a href="user.html?uid='+rarts[i].author+'" class="post_author">'+rarts[i].author_name+'</a> 发布于 '+formatDateTime(rarts[i].ctime)+'</p><span style="margin-left:18px" class="fade-group-2">'+rarts[i].ccount+' 评论</span><br><span style="margin-left:18px" class="fade-group-2">'+rarts[i].view+' 阅读</span>'
			transname(rarts[i])
		}
	}
};
xhttp4.open("GET", "https://api.jcsuf.top/api/fetchnewarticle", true);
xhttp4.withCredentials = true;
xhttp4.send(); nettaskcreate();

function transname(art) { //解析Id为用户名
	var xhttptrans = new XMLHttpRequest();
	xhttptrans.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) { nettaskfinish()
			if(currentid==art.author){
				if(art.fromAnonymous){
					document.getElementById("article-info-"+art.id).innerHTML = '<p class="fade-group-1"><a href="user.html?uid='+art.author+'" class="post_author"><font color="#6699aa">'+JSON.parse(this.responseText).name+' (you, 匿名)</font></a> 发布于 '+formatDateTime(art.ctime)+'</p><span style="margin-left:18px" class="fade-group-2">'+art.ccount+' 评论</span><br><span style="margin-left:18px" class="fade-group-2">'+art.view+' 阅读</span><br><font onclick="del('+art.id+')" color="red" style="margin-left: 18px"><small>删除</small></font>'
				} else {
					document.getElementById("article-info-"+art.id).innerHTML = '<p class="fade-group-1"><a href="user.html?uid='+art.author+'" class="post_author"><font color="#3399aa">'+JSON.parse(this.responseText).name+' (you)</font></a> 发布于 '+formatDateTime(art.ctime)+'</p><span style="margin-left:18px" class="fade-group-2">'+art.ccount+' 评论</span><br><span style="margin-left:18px" class="fade-group-2">'+art.view+' 阅读</span><br><font onclick="del('+art.id+')" color="red" style="margin-left: 18px"><small>删除</small></font>'
				}
			} else {
				if(art.fromAnonymous){
					document.getElementById("article-info-"+art.id).innerHTML = '<p class="fade-group-1"><a class="post_author"><font color="#AAAA00">匿名</font></a> 发布于 '+formatDateTime(art.ctime)+'</p><span style="margin-left:18px" class="fade-group-2">'+art.ccount+' 评论</span><br><span style="margin-left:18px" class="fade-group-2">'+art.view+' 阅读</span>'
				} else {
					document.getElementById("article-info-"+art.id).innerHTML = '<p class="fade-group-1"><a href="user.html?uid='+art.author+'" class="post_author">'+JSON.parse(this.responseText).name+'</a> 发布于 '+formatDateTime(art.ctime)+'</p><span style="margin-left:18px" class="fade-group-2">'+art.ccount+' 评论</span><br><span style="margin-left:18px" class="fade-group-2">'+art.view+' 阅读</span>'
				}
				if(admin>0){
					document.getElementById("article-info-"+art.id).innerHTML += '<br><font onclick="del('+art.id+')" color="red" style="margin-left: 18px"><small>删除</small></font>'
				}
			}
		}
	};
	xhttptrans.open("GET", "https://api.jcsuf.top/api/userinfo?uid="+art.author, true);
	xhttptrans.send(); nettaskcreate();
}

function reloadnew() {
	var xhttpreload = new XMLHttpRequest();
	xhttpreload.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) { nettaskfinish()
			var rarts = JSON.parse(this.responseText).articles;
			document.getElementById("articles").innerHTML = ''
			for(let i=0;i<rarts.length;i++){
				document.getElementById("articles").innerHTML += '<div class="subforum-row" id="article-'+rarts[i].id+'"></div>'
				document.getElementById("article-"+rarts[i].id).innerHTML += '<div class="subforum-description subforum-column" id="article-desc-'+rarts[i].id+'"></div>'
				document.getElementById("article-desc-"+rarts[i].id).innerHTML += '<h4><a href="article.html?aid='+rarts[i].id+'" class="post_title center">'+rarts[i].title+'</a></h4>'
				document.getElementById("article-desc-"+rarts[i].id).innerHTML += '<p class="post_description">'+rarts[i].snapshot+'</p>'	
				document.getElementById("article-"+rarts[i].id).innerHTML += '<div class="subforum-stats subforum-column center" id="article-stat-'+rarts[i].id+'"></div>'
				document.getElementById("article-stat-"+rarts[i].id).innerHTML += '<p>+'+rarts[i].like+'</p>'
				document.getElementById("article-stat-"+rarts[i].id).innerHTML += '<p>-'+rarts[i].dislike+'</p>'
				document.getElementById("article-"+rarts[i].id).innerHTML += '<div class="subforum-info subforum-column"><p id="article-info-'+rarts[i].id+'"></p></div>'
				//document.getElementById("article-info-"+rarts[i].id).innerHTML = '<p class="fade-group-1"><a href="user.html?uid='+rarts[i].author+'" class="post_author">'+rarts[i].author_name+'</a> 发布于 '+formatDateTime(rarts[i].ctime)+'</p><span style="margin-left:18px" class="fade-group-2">'+rarts[i].ccount+' 评论</span><br><span style="margin-left:18px" class="fade-group-2">'+rarts[i].view+' 阅读</span>'
				transname(rarts[i])
			}
		}
	};
	xhttpreload.open("GET", "https://api.jcsuf.top/api/fetchnewarticle?pc="+document.getElementById("input-row-count").value, true);
	xhttpreload.withCredentials = true;
	xhttpreload.send(); nettaskcreate();
}

function minimize_pane(){
	document.getElementById("bgmask").style.display = "none";
	document.getElementById("important-notice-container").style.display = "none";
}

function display_notice(){
	document.getElementById("bgmask").style.display = "block";
	document.getElementById("important-notice-container").style.display = "block";
}

