var xhttp2 = new XMLHttpRequest();
xhttp2.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var rbody = JSON.parse(this.responseText)
        document.getElementById("category-title").innerHTML = rbody.title;
        document.getElementById("category-desc").innerHTML = rbody.category.desc;
    }
};
xhttp2.open("GET", "https://api.jcsuf.top/api/categoryinfo?"+location.href.substring(location.href.indexOf(".html")+6), true);
xhttp2.withCredentials = true;
xhttp2.send();

var xhttp4 = new XMLHttpRequest();
xhttp4.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
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
			document.getElementById("article-info-"+rarts[i].id).innerHTML = '<a href="user.html?uid='+rarts[i].author+'" class="post_author"><font color="#333333" style="background-color:#aaa;">&emsp;&emsp;&emsp;&emsp;&emsp;</font></a> 发布于 '+formatDateTime(rarts[i].ctime)+'<br><span style="margin-left:18px">'+rarts[i].ccount+' 评论</span><br><span style="margin-left:18px">'+rarts[i].view+' 阅读</span>'
			transname(rarts[i])
		}
	}
};
xhttp4.open("GET", "https://api.jcsuf.top/api/fetchnewarticle?"+location.href.substring(location.href.indexOf(".html")+6), true);
xhttp4.withCredentials = true;
xhttp4.send();

if(window.screen.availWidth<=1080){
	document.getElementsByClassName("notice-container")[0].style.display = "none";
}

function transname(art) { //解析Id为用户名
	var xhttptrans = new XMLHttpRequest();
	xhttptrans.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			if(currentid==art.author){
				if(art.fromAnonymous){
					document.getElementById("article-info-"+art.id).innerHTML = '<a href="user.html?uid='+art.author+'" class="post_author"><font color="#6699aa">'+JSON.parse(this.responseText).name+' (you, 匿名)</font></a> 发布于 '+formatDateTime(art.ctime)+'<br><span style="margin-left:18px">'+art.ccount+' 评论</span><br><span style="margin-left:18px">'+art.view+' 阅读</span><br><font onclick="del('+art.id+')" color="red" style="margin-left: 18px"><small>删除</small></font>'
				} else {
					document.getElementById("article-info-"+art.id).innerHTML = '<a href="user.html?uid='+art.author+'" class="post_author"><font color="#3399aa">'+JSON.parse(this.responseText).name+' (you)</font></a> 发布于 '+formatDateTime(art.ctime)+'<br><span style="margin-left:18px">'+art.ccount+' 评论</span><br><span style="margin-left:18px">'+art.view+' 阅读</span><br><font onclick="del('+art.id+')" color="red" style="margin-left: 18px"><small>删除</small></font>'
				}
			} else {
				if(art.fromAnonymous){
					document.getElementById("article-info-"+art.id).innerHTML = '<a class="post_author"><font color="#AAAA00">匿名</font></a> 发布于 '+formatDateTime(art.ctime)+'<br><span style="margin-left:18px">'+art.ccount+' 评论</span><br><span style="margin-left:18px">'+art.view+' 阅读</span>'
				} else {
					document.getElementById("article-info-"+art.id).innerHTML = '<a href="user.html?uid='+art.author+'" class="post_author">'+JSON.parse(this.responseText).name+'</a> 发布于 '+formatDateTime(art.ctime)+'<br><span style="margin-left:18px">'+art.ccount+' 评论</span><br><span style="margin-left:18px">'+art.view+' 阅读</span>'
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
				document.getElementById("article-desc-"+rarts[i].id).innerHTML += '<p class="post_description">'+rarts[i].snapshot+'</p>'
				document.getElementById("article-"+rarts[i].id).innerHTML += '<div class="subforum-stats subforum-column center" id="article-stat-'+rarts[i].id+'"></div>'
				document.getElementById("article-stat-"+rarts[i].id).innerHTML += '<p>+'+rarts[i].like+'</p>'
				document.getElementById("article-stat-"+rarts[i].id).innerHTML += '<p>-'+rarts[i].dislike+'</p>'
				document.getElementById("article-"+rarts[i].id).innerHTML += '<div class="subforum-info subforum-column"><p id="article-info-'+rarts[i].id+'"></p></div>'
				document.getElementById("article-info-"+rarts[i].id).innerHTML = '<a href="user.html?uid='+rarts[i].author+'" class="post_author"><font color="#333333" style="background-color:#aaa;">&emsp;&emsp;&emsp;&emsp;&emsp;</font></a> 发布于 '+formatDateTime(rarts[i].ctime)+'<br><span style="margin-left:18px">'+rarts[i].ccount+' 评论</span><br><span style="margin-left:18px">'+rarts[i].view+' 阅读</span>'
				transname(rarts[i])
			}
		}
	};
	xhttpreload.open("GET", "https://api.jcsuf.top/api/fetchnewarticle?pc="+document.getElementById("input-row-count").value+"&"+location.href.substring(location.href.indexOf(".html")+6)+"&page="+document.getElementById("input-row-page").value, true);
	xhttpreload.withCredentials = true;
	xhttpreload.send();
}