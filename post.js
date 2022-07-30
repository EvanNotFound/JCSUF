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
					document.getElementById("parent-section-"+rbody[i].parent).innerHTML += '<div id="category-banner-'+rbody[i].id+'"><h1>'+rbody[i].name+'</h1></div>';
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