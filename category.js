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