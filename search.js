function search() {
    var xhttp4 = new XMLHttpRequest();
    xhttp4.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
    		var rarts = JSON.parse(this.responseText).results;
            document.getElementById("articles").innerHTML = '搜索到 '+JSON.parse(this.responseText).matches+' 条结果';
	    	for(let i=0;i<rarts.length;i++){
	    		document.getElementById("articles").innerHTML += '<div class="subforum-row" id="article-'+rarts[i].entity.id+'"></div>'
	    		document.getElementById("article-"+rarts[i].entity.id).innerHTML += '<div class="subforum-description subforum-column" id="article-desc-'+rarts[i].entity.id+'"></div>'
	    		document.getElementById("article-desc-"+rarts[i].entity.id).innerHTML += '<h4><a href="article.html?aid='+rarts[i].entity.id+'" class="post_title center">'+rarts[i].entity.title+'</a></h4>'
	    		document.getElementById("article-desc-"+rarts[i].entity.id).innerHTML += '<p class="post_description">'+snapshot(rarts[i].entity.html)+'</p>'
	    		document.getElementById("article-"+rarts[i].entity.id).innerHTML += '<div class="subforum-stats subforum-column center" id="article-stat-'+rarts[i].entity.id+'"></div>'
	    		document.getElementById("article-stat-"+rarts[i].entity.id).innerHTML += '<p>+'+rarts[i].entity.like+'</p>'
	    		document.getElementById("article-stat-"+rarts[i].entity.id).innerHTML += '<p>-'+rarts[i].entity.dislike+'</p>'
		    	document.getElementById("article-"+rarts[i].entity.id).innerHTML += '<div class="subforum-info subforum-column"><p id="article-info-'+rarts[i].entity.id+'"></p></div>'
		    	document.getElementById("article-info-"+rarts[i].entity.id).innerHTML = '<a href="user.html?uid='+rarts[i].entity.author+'" class="post_author"><font color="#333333" style="background-color:#aaa;">&emsp;&emsp;&emsp;&emsp;&emsp;</font></a> 发布于 '+formatDateTime(rarts[i].entity.ctime)+'<br><span style="margin-left:18px">'+rarts[i].entity.ccount+' 评论</span><br><span style="margin-left:18px">'+rarts[i].entity.view+' 阅读</span><br><span style="margin-left:18px">相关性 '+rarts[i].relativity+'</span>'
	    		transname(rarts[i].entity,rarts[i].relativity)
	    	}
	    }
    };
    var str = document.getElementById("search-content").value;
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
    xhttp4.open("GET", "https://api.jcsuf.top/api/searcharticle?qs="+utf8Str+"&vw=0&cw=0", true);
    xhttp4.withCredentials = true;
    xhttp4.send();
}

function snapshot(content) {
	let unformat =  content.replace(/<\/?[^>]*>/g, '');
	return unformat.substring(0,64);
}

function transname(art,rel) { //解析Id为用户名
	var xhttptrans = new XMLHttpRequest();
	xhttptrans.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			if(currentid==art.author){
				if(art.fromAnonymous){
					document.getElementById("article-info-"+art.id).innerHTML = '<a href="user.html?uid='+art.author+'" class="post_author"><font color="#6699aa">'+JSON.parse(this.responseText).name+' (you, 匿名)</font></a> 发布于 '+formatDateTime(art.ctime)+'<br><span style="margin-left:18px">'+art.ccount+' 评论</span><br><span style="margin-left:18px">'+art.view+' 阅读</span><br><font onclick="del('+art.id+')" color="red" style="margin-left: 18px"><small>删除</small></font><br><span style="margin-left:18px">相关性 '+rel+'</span>'
				} else {
					document.getElementById("article-info-"+art.id).innerHTML = '<a href="user.html?uid='+art.author+'" class="post_author"><font color="#3399aa">'+JSON.parse(this.responseText).name+' (you)</font></a> 发布于 '+formatDateTime(art.ctime)+'<br><span style="margin-left:18px">'+art.ccount+' 评论</span><br><span style="margin-left:18px">'+art.view+' 阅读</span><br><font onclick="del('+art.id+')" color="red" style="margin-left: 18px"><small>删除</small></font><br><span style="margin-left:18px">相关性 '+rel+'</span>'
				}
			} else {
				if(art.fromAnonymous){
					document.getElementById("article-info-"+art.id).innerHTML = '<a class="post_author"><font color="#AAAA00">匿名</font></a> 发布于 '+formatDateTime(art.ctime)+'<br><span style="margin-left:18px">'+art.ccount+' 评论</span><br><span style="margin-left:18px">'+art.view+' 阅读</span><br><span style="margin-left:18px">相关性 '+rel+'</span>'
				} else {
					document.getElementById("article-info-"+art.id).innerHTML = '<a href="user.html?uid='+art.author+'" class="post_author">'+JSON.parse(this.responseText).name+'</a> 发布于 '+formatDateTime(art.ctime)+'<br><span style="margin-left:18px">'+art.ccount+' 评论</span><br><span style="margin-left:18px">'+art.view+' 阅读</span><br><span style="margin-left:18px">相关性 '+rel+'</span>'
				}
				if(admin>0){
					document.getElementById("article-info-"+art.id).innerHTML += '<br><font onclick="del('+art.id+')" color="red" style="margin-left: 18px"><small>删除</small></font><br><span style="margin-left:18px">相关性 '+rel+'</span>'
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
	xhttpdel.withCredentials = true;
	xhttpdel.send();
}