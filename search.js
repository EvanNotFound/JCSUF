function search() {
    var xhttp4 = new XMLHttpRequest();
    xhttp4.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) { nettaskfinish()
    		var rarts = JSON.parse(this.responseText).results;
            document.getElementById("articles").innerHTML = '搜索到 '+JSON.parse(this.responseText).matches+' 条结果';
	    	for(let i=0;i<rarts.length;i++){
	    		document.getElementById("articles").innerHTML += '<div class="subforum-row" id="article-'+rarts[i].entity.id+'"></div>'
	    		document.getElementById("article-"+rarts[i].entity.id).innerHTML += '<div class="subforum-description subforum-column" id="article-desc-'+rarts[i].entity.id+'"></div>'
	    		document.getElementById("article-desc-"+rarts[i].entity.id).innerHTML += '<h4><a href="article.html?aid='+rarts[i].entity.id+'" class="post_title center">'+rarts[i].entity.title+'</a></h4>'
	    		document.getElementById("article-desc-"+rarts[i].entity.id).innerHTML += '<p class="post_description">'+rarts[i].entity.snapshot+'</p>'
	    		document.getElementById("article-"+rarts[i].entity.id).innerHTML += '<div class="subforum-stats subforum-column center" id="article-stat-'+rarts[i].entity.id+'"></div>'
	    		document.getElementById("article-stat-"+rarts[i].entity.id).innerHTML += '<p>+'+rarts[i].entity.like+'</p>'
	    		document.getElementById("article-stat-"+rarts[i].entity.id).innerHTML += '<p>-'+rarts[i].entity.dislike+'</p>'
		    	document.getElementById("article-"+rarts[i].entity.id).innerHTML += '<div class="subforum-info subforum-column"><p id="article-info-'+rarts[i].entity.id+'"></p></div>'
		    	document.getElementById("article-info-"+rarts[i].entity.id).innerHTML = '<p class="fade-group-1"><a href="user.html?uid='+rarts[i].author+'" class="post_author">'+rarts[i].author_name+'</a> 发布于 '+formatDateTime(rarts[i].ctime)+'</p><span style="margin-left:18px" class="fade-group-2">'+rarts[i].ccount+' 评论</span><br><span style="margin-left:18px" class="fade-group-2">'+rarts[i].view+' 阅读</span><br><span style="margin-left:18px">相关性 '+rarts[i].relativity+'</span>'
	    		transname(rarts[i].entity,rarts[i].relativity)
	    	}
	    }
    };
    var str = document.getElementById("search-content").value;
	let utf8Str=''
    for (let i=0; i<str.length;i++){
        let t = str[i]
        let text = ''
        text = encodeURIComponent(t)
        utf8Str += text
    }
    xhttp4.open("GET", "https://api.jcsuf.top/api/searcharticle?qs="+utf8Str+"&vw=0&cw=0", true);
    xhttp4.withCredentials = true;
    xhttp4.send(); nettaskcreate();
}

function transname(art,rel) { //解析Id为用户名
	var xhttptrans = new XMLHttpRequest();
	xhttptrans.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) { nettaskfinish()
			if(currentid==art.author){
				if(art.fromAnonymous){
					document.getElementById("article-info-"+art.id).innerHTML = '<p class="fade-group-1"><a href="user.html?uid='+art.author+'" class="post_author"><font color="#6699aa">'+JSON.parse(this.responseText).name+' (you, 匿名)</font></a> 发布于 '+formatDateTime(art.ctime)+'</p><span style="margin-left:18px">'+art.ccount+' 评论</span><br><span style="margin-left:18px">'+art.view+' 阅读</span><br><font onclick="del('+art.id+')" color="red" style="margin-left: 18px"><small>删除</small></font><br><span style="margin-left:18px">相关性 '+rel+'</span>'
				} else {
					document.getElementById("article-info-"+art.id).innerHTML = '<p class="fade-group-1"><a href="user.html?uid='+art.author+'" class="post_author"><font color="#3399aa">'+JSON.parse(this.responseText).name+' (you)</font></a> 发布于 '+formatDateTime(art.ctime)+'</p><span style="margin-left:18px">'+art.ccount+' 评论</span><br><span style="margin-left:18px">'+art.view+' 阅读</span><br><font onclick="del('+art.id+')" color="red" style="margin-left: 18px"><small>删除</small></font><br><span style="margin-left:18px">相关性 '+rel+'</span>'
				}
			} else {
				if(art.fromAnonymous){
					document.getElementById("article-info-"+art.id).innerHTML = '<p class="fade-group-1"><a class="post_author"><font color="#AAAA00">匿名</font></a> 发布于 '+formatDateTime(art.ctime)+'</p><span style="margin-left:18px">'+art.ccount+' 评论</span><br><span style="margin-left:18px">'+art.view+' 阅读</span><br><span style="margin-left:18px">相关性 '+rel+'</span>'
				} else {
					document.getElementById("article-info-"+art.id).innerHTML = '<p class="fade-group-1"><a href="user.html?uid='+art.author+'" class="post_author">'+JSON.parse(this.responseText).name+'</a> 发布于 '+formatDateTime(art.ctime)+'</p><span style="margin-left:18px">'+art.ccount+' 评论</span><br><span style="margin-left:18px">'+art.view+' 阅读</span><br><span style="margin-left:18px">相关性 '+rel+'</span>'
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