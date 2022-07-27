var fid = 0;
var authid = -1;
var art = {};
var checkmax = 0;
var finishcount = 0;
var targetcount = 0;

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		art = JSON.parse(this.responseText);
		document.getElementById("artcontent").innerHTML = art.html.replaceAll("\n","<br>")
		document.getElementById("title-container").innerHTML = '<b>' + art.title + '</b>'
		document.title = art.title + " - JCSUF"
		authid = art.author;
		targetcount = art.ccount;
		if(art.popverify){
			//如果需要年龄验证
			document.getElementById("bgmask").style.display = "block";
			document.getElementById("verify-container").style.display = "block";
			var xhttpve = new XMLHttpRequest();
			xhttpve.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					document.getElementById("verify-title").innerHTML = JSON.parse(this.responseText).desc;
					for(var i in JSON.parse(this.responseText).choices){
						document.getElementById("verify-answer-container").innerHTML += '<button onclick="access('+JSON.parse(this.responseText).accid+','+JSON.parse(this.responseText).choices[i]+')" class="verify-answer">选这个</button>&emsp;'+i+"<br>";
					}
				}
			};
			xhttpve.open("GET", "https://api.jcsuf.top/api/getproblem?diff="+art.nsfw_lvl, true);
			xhttpve.withCredentials = true;
			xhttpve.send();
		}
		if(art.political){
			document.getElementById("bgmask").style.display = "block";
			document.getElementById("political-container").style.display = "block";
		}
		if(art.vote!=undefined){
			//投票处理逻辑
			document.getElementById("vote-title").innerHTML = art.vote.title;
			document.getElementById("vote-container").className = "enabled-vote-pane";
			for(var o = 0; o < art.vote.detail.length; o++){
				document.getElementById("vote-option-container").innerHTML += '<input type="checkbox" class="option-check" onclick="checked('+o+')" id="option-'+o+'"><span class="vote-option-name">'+art.vote.detail[o].option+'</span>&emsp;<span class="vote-option-count">'+art.vote.detail[o].count+'票</span><br>';
			}
			checkmax = art.vote.maximum;
			if(JSON.parse(this.responseText).vote.anonymousVote){
				document.getElementById("vote-anon-type").innerHTML = '不记名投票';
			} else {
				document.getElementById("vote-anon-type").innerHTML = '记名投票';
			}
		}
		for(var c = 0; c < art.ccount; c++) {
			processComment(art.comments[c]);
		}
		document.getElementById("rating-0").innerHTML = (art.likedbyyou?'<font color="#3cf">↑ ':'↑ ')+art.like+(art.likedbyyou?'</font> ':' ')+(art.dislikedbyyou?'<font color="#f31">↓ ':'↓ ')+art.dislike+(art.dislike+art.dislikedbyyou?'</font>':'');
		var xhttptrans = new XMLHttpRequest();
		xhttptrans.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				if(currentid==art.author){
					if(art.fromAnonymous){
						//匿名作者是本人
						document.getElementById("author-avatar-0").src = JSON.parse(this.responseText).avatar;
						document.getElementById("author-name-0").innerHTML = JSON.parse(this.responseText).name+"<font color='#a0a0a0'>（已匿名）</font>";
						process_author_level(JSON.parse(this.responseText).exp, 0);
					} else {
						//本人发布且非匿名
						document.getElementById("author-avatar-0").src = JSON.parse(this.responseText).avatar;
						document.getElementById("author-name-0").innerHTML = JSON.parse(this.responseText).name+"<font color='#a0a0a0'>（你）</font>";
						process_author_level(JSON.parse(this.responseText).exp, 0);
					}
				} else {
					//不是本人
					if(art.fromAnonymous){
						//匿名者
						document.getElementById("author-avatar-0").style.backgroundColor = str_pad((0-this.fuckargument).toString(16));
						document.getElementById("author-name-0").innerHTML = "<font color='#a0a0a0'>匿名</font>";
					} else {
						//非匿名者
						document.getElementById("author-avatar-0").src = JSON.parse(this.responseText).avatar;
						document.getElementById("author-name-0").innerHTML = JSON.parse(this.responseText).name;
						process_author_level(JSON.parse(this.responseText).exp, 0);
					}
				}
			}
		};
		xhttptrans.open("GET", "https://api.jcsuf.top/api/userinfo?uid="+art.author, true);
		xhttptrans.withCredentials = true;
		xhttptrans.fuckargument = art.author;
		xhttptrans.send();
	}
};
xhttp.open("GET", "https://api.jcsuf.top/api/articleinfo"+location.href.substring(location.href.indexOf(".html")+5), true);
xhttp.withCredentials = true;
xhttp.send();

function comment(wfid) {
	fid = wfid;
	document.getElementById("cfid").innerHTML = "#"+fid;
	document.getElementById("bgmask").style.display = "block";
	document.getElementById("comment-container").style.display = "block";
}

function reward(wfid) {
	fid = wfid;
	document.getElementById("rfid").innerHTML = "#"+fid;
	document.getElementById("bgmask").style.display = "block";
	document.getElementById("reward-container").style.display = "block";
}

function report(wfid) {
	fid = wfid;
	document.getElementById("refid").innerHTML = "#"+fid;
	document.getElementById("bgmask").style.display = "block";
	document.getElementById("report-container").style.display = "block";
}

function minimize_pane() {
	document.getElementById("bgmask").style.display = "none";
	document.getElementById("comment-container").style.display = "none";
	document.getElementById("reward-container").style.display = "none";
	document.getElementById("report-container").style.display = "none";
	document.getElementById("political-container").style.display = "none";
}

function post_comment() {
	var xhttp2 = new XMLHttpRequest();
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
	xhttp2.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			switch(JSON.parse(this.responseText).code){
				case 0:
				alert("发布成功");
				minimize_pane();
				break;
				case 1:
				alert("发布失败，您是否已经登录？目标帖子是否已被删除？");
				break;
				case 2:
				alert("您已被封禁");
				break;
				case 999:
				alert("管理员正在修正服务器数据，请稍等几秒并重试");
			}
		}
	};
	xhttp2.open("POST", "https://api.jcsuf.top/api/postcomment", true);
	xhttp2.withCredentials = true;
	xhttp2.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
	xhttp2.send(location.href.substring(location.href.indexOf(".html")+6)+"&anonymous="+document.getElementById("i1").checked+"&content="+utf8Str+"&replyto="+fid);
}

function processComment(comment) {
	document.getElementById("main-content").innerHTML += '<div class="floor-body" highlight="no" id="floor-'+comment.floor+'"></div>'
	document.getElementById("floor-"+comment.floor).innerHTML += '<div class="level">#'+comment.floor+'</div>'
	document.getElementById("floor-"+comment.floor).innerHTML += '<div class="userinfo" id="author-comment'+comment.floor+'"><img src="https://upload.thwiki.cc/thumb/0/0a/%E9%AC%BC%E4%BA%BA%E6%AD%A3%E9%82%AA%EF%BC%88Q%E7%89%88%E7%AB%8B%E7%BB%98%EF%BC%89.png/100px-%E9%AC%BC%E4%BA%BA%E6%AD%A3%E9%82%AA%EF%BC%88Q%E7%89%88%E7%AB%8B%E7%BB%98%EF%BC%89.png" height="64px" class="left-avatar" id="author-avatar-'+comment.floor+'" style="margin: 0 auto;"><br><b><span id="author-name-'+comment.floor+'">作者</span></b><br><span id="author-level-'+comment.floor+'">LvXX</span></div>'
	document.getElementById("floor-"+comment.floor).innerHTML += '<div class="content-container"><div class="content" id="content-'+comment.floor+'"><font style="color:rgb(68,68,100);font-size:10px">Reply to <span onclick="skipflr('+comment.quote+') style="color:rgb(84,84,120)">"#'+comment.quote+'</span></font>'+comment.html+'</div><div class="button-group"><p class="rating-info" id="rating-'+comment.floor+'">'+(comment.likedbyyou?'<font color="#3cf">↑ ':'↑ ')+comment.like+(comment.likedbyyou?'</font> ':' ')+(comment.dislikedbyyou?'<font color="#f31">↓ ':'↓ ')+comment.dislike+(comment.dislikedbyyou?'</font>':'')+'</p><span onclick="comment('+comment.floor+')">评论</span> <span onclick="like('+comment.floor+')">点赞</span> <span onclick="reward('+comment.floor+')">奖励</span> <span onclick="dislike('+comment.floor+')">点踩</span> <span onclick="report('+comment.floor+')">举报</span></div></div>'
	var xhttpcom = new XMLHttpRequest();
	xhttpcom.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			if(currentid==comment.author){
				if(comment.fromAnonymous){
					//匿名作者是本人
					document.getElementById("author-avatar-"+comment.floor).src = JSON.parse(this.responseText).avatar;
					document.getElementById("author-name-"+comment.floor).innerHTML = JSON.parse(this.responseText).name+"<font color='#a0a0a0'>（已匿名）</font>";
					process_author_level(JSON.parse(this.responseText).exp, comment.floor);
				} else {
					//本人发布且非匿名
					document.getElementById("author-avatar-"+comment.floor).src = JSON.parse(this.responseText).avatar;
					document.getElementById("author-name-"+comment.floor).innerHTML = JSON.parse(this.responseText).name+"<font color='#a0a0a0'>（你）</font>";
					process_author_level(JSON.parse(this.responseText).exp, comment.floor);
				}
			} else {
				//不是本人
				if(comment.fromAnonymous){
					//匿名者
					document.getElementById("author-avatar-"+comment.floor).style.backgroundColor = str_pad((0-this.fuckargument).toString(16));
					document.getElementById("author-name-"+comment.floor).innerHTML = "<font color='#a0a0a0'>匿名</font>";
				} else {
					//非匿名者
					document.getElementById("author-avatar-"+comment.floor).src = JSON.parse(this.responseText).avatar;
					document.getElementById("author-name-"+comment.floor).innerHTML = JSON.parse(this.responseText).name;
					process_author_level(JSON.parse(this.responseText).exp, comment.floor);
				}
			}
			finishcount ++;
			if(finishcount==targetcount && location.href.indexOf("&skiptofloor")!=-1){
				setTimeout(function(){
					var skipcont = location.href.substring(location.href.indexOf("&skiptofloor=")+13)
					if(skipcont.indexOf("&")!=-1) skipcont = skipcont.substring(0,skipcont.indexOf("&"))
					skipflr(skipcont)
				}, 500)
			}
		}
	};
	xhttpcom.open("GET", "https://api.jcsuf.top/api/userinfo?uid="+comment.author, true);
	xhttpcom.fuckargument = comment.author;
	xhttpcom.withCredentials = true;
	xhttpcom.send();
}

function like(floor){
	var xhttplike = new XMLHttpRequest();
	xhttplike.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			switch(JSON.parse(this.responseText).code){
				case 0:
				alert("表态成功");
				break;
				case 1:
				alert("表态类型错误");
				break;
				case 2:
				alert("请求楼层错误");
				break;
				case 3:
				alert("请勿重复表态");
				break;
				case 4:
				alert("取消表态成功");
				break;
				case 5:
				alert("请先登录");
				break;
				case 999:
				alert("管理员正在修正服务器数据，请稍等几秒并重试");
				break;
				default:
				alert("what?");
			}
		}
	};
	xhttplike.open("GET", "https://api.jcsuf.top/api/rating?type=like&"+location.href.substring(location.href.indexOf(".html")+6)+"&floor="+floor, true);
	xhttplike.withCredentials = true;
	xhttplike.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
	xhttplike.send();
}

function dislike(floor){
	var xhttpdislike = new XMLHttpRequest();
	xhttpdislike.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			switch(JSON.parse(this.responseText).code){
				case 0:
				alert("表态成功");
				break;
				case 1:
				alert("表态类型错误");
				break;
				case 2:
				alert("请求楼层错误");
				break;
				case 3:
				alert("请勿重复表态");
				break;
				case 4:
				alert("取消表态成功");
				break;
				case 5:
				alert("请先登录");
				break;
				default:
				alert("what?");
			}
		}
	};
	xhttpdislike.open("GET", "https://api.jcsuf.top/api/rating?type=dislike&"+location.href.substring(location.href.indexOf(".html")+6)+"&floor="+floor, true);
	xhttpdislike.withCredentials = true;
	xhttpdislike.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
	xhttpdislike.send();
}

function checked(oid){
	var totalcheck = 0;
	for(var cbox = 0; cbox < document.getElementsByClassName("option-check").length; cbox++){
		if(document.getElementsByClassName("option-check")[cbox].checked){
			totalcheck ++;
		}
	}
	if(totalcheck>maximum){
		alert("选中内容超过数量上限，请先取消一个");
		document.getElementById("option-"+oid).checked = false;
	}
}

function submitvote(){
	xhsv = new XMLHttpRequest();
	xhsv.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			switch(JSON.parse(this.responseText).code){
				case 0:
				alert("投票成功");
				break;
				case 1:
				alert("该帖子没有投票");
				break;
				case 2:
				alert("未登录或已投票");
				break;
				case 3:
				alert("选中的数量超过上限");
				break;
				case 999:
				alert("管理员正在修正服务器数据，请稍等几秒并重试");
			}
		}
	};
	xhsv.open("POST", "https://api.jcsuf.top/api/submitvote", true);
	xhsv.withCredentials = true;
	xhsv.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
	var formdata = location.href.substring(location.href.indexOf(".html")+6)+"&selected=";
	var hasn = false;
	for(var cbox = 0; cbox < document.getElementsByClassName("option-check").length; cbox++){
		if(document.getElementsByClassName("option-check")[cbox].checked){
			if(hasn){
				formdata += "N"
			}
			formdata += cbox;
			hasn = true;
		}
	}
	xhsv.send(formdata);
}

function access(id,pin){
	location.href += "&access-id="+id+"&access-pin="+pin;
}

function back(){
	location.href = "https://www.jcsuf.top/index.html";
}

function str_pad(oldstr){
	var zero = '#000';
	var tmp = 4-oldstr.length;
	return zero.substring(0,tmp) + oldstr;
}

function skipflr(floor){
	document.getElementById("floor-"+floor).scrollIntoView();
	scrollTo({top:scrollY-100})
	document.getElementById("floor-"+floor).setAttribute("highlight","yes")
	setTimeout(document.getElementById("floor-"+floor).setAttribute("highlight","no"),500)
}