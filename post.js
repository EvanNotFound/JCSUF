var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		var rbody = JSON.parse(this.responseText)
		for(let i = 0; i < rbody.length; i++){
			if(rbody[i].id>=1000) document.getElementsByClassName("right-container")[0].innerHTML += '<div class="subforum-sort" id="parent-banner-'+rbody[i].id+'"><h1>'+rbody[i].name+'demo</h1></div>';
		}
	}
};
xhttp.open("GET", "https://api.jcsuf.top/api/categorylist", true);
xhttp.withCredentials = true;
xhttp.send();