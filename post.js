var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		var rbody = JSON.parse(this.responseText)
		for(let i = 0; i < rbody.length; i++){
			document.getElementsByClassName("right-container")[0].innerHTML += '<div id="parent-section-'+rbody[i].id+'"><div class="subforum-sort"><h1>'+rbody[i].name+'专区</h1></div></div>';
		}
		var xhttp2 = new XMLHttpRequest();
		xhttp2.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var rbody = JSON.parse(this.responseText)
				for(let i = 0; i < rbody.length; i++){
					document.getElementById("parent-section-"+rbody[i].parent).innerHTML += '<div class="subforum-row" id="category-'+rbody[i].id+'"></div>'
					document.getElementById("category-"+rbody[i].id).innerHTML += '<div class="subforum-description subforum-column" id="category-desc-'+rbody[i].id+'"></div>'
					document.getElementById("category-desc-"+rbody[i].id).innerHTML += '<h4><a href="category.html?cid='+rbody[i].id+'" class="post_title center">'+rbody[i].name+'</a></h4>'
					document.getElementById("category-desc-"+rbody[i].id).innerHTML += '<p class="post_description">'+'未实装捏'+'</p>'
					document.getElementById("category-"+rbody[i].id).innerHTML += '<div class="subforum-stats subforum-column center" id="category-stat-'+rbody[i].id+'"></div>'
					document.getElementById("category-stat-"+rbody[i].id).innerHTML += '<p>'+rbody[i].count+'</p>'
					document.getElementById("category-"+rbody[i].id).innerHTML += '<div class="subforum-info subforum-column"><p id="category-info-'+rbody[i].id+'"></p></div>'
					document.getElementById("category-info-"+rbody[i].id).innerHTML = '最后一篇文章 由 <a href="user.html?uid='+(-1)+'" class="post_author"><font color="#333333" style="background-color:#aaa;">&emsp;&emsp;&emsp;&emsp;&emsp;</font></a> 发布于 '+formatDateTime(0)
				}
			}
		};
		xhttp2.open("GET", "https://api.jcsuf.top/api/categorylist?parent=-2", true);
		xhttp2.withCredentials = true;
		xhttp2.send();
	}
};
xhttp.open("GET", "https://api.jcsuf.top/api/categorylist", true);
xhttp.withCredentials = true;
xhttp.send();