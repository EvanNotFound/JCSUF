function compileTemplate(templateId, data, targetId, elementId, callback) {
	var templateSource = document.getElementById(templateId).innerHTML;
	var template = Handlebars.compile(templateSource);
	var renderedTemplate = template(data);
	document.getElementById(targetId).innerHTML = renderedTemplate;
  
	if (typeof callback === 'function') {
	  callback(elementId);
	}
  }

var xhttp2 = new XMLHttpRequest();
xhttp2.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    nettaskfinish();
    var responseData = JSON.parse(this.responseText);
    var templateData = {
      content: responseData.text.replace("入站须知", ""),
      modifyTime: "JCSUF Team, " + responseData.modify,
    };

    var template = document.getElementById("notice-template").innerHTML;
    var compiledTemplate = template.replace(/{{(\w+)}}/g, function (match, p1) {
      return templateData[p1];
    });
    document.getElementById("notice-content").innerHTML = compiledTemplate;

    var modifyTemplate = document.getElementById(
      "notice-modify-template"
    ).innerHTML;
    var compiledModifyTemplate = modifyTemplate.replace(
      /{{(\w+)}}/g,
      function (match, p1) {
        return templateData[p1];
      }
    );
    document.getElementById("notice-modify-time").innerHTML =
      compiledModifyTemplate;
  }
};
xhttp2.open("GET", "https://api.jcsuf.top/api/notice", true);
xhttp2.withCredentials = true;
xhttp2.send();
nettaskcreate();

var xhttp4 = new XMLHttpRequest();
xhttp4.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    nettaskfinish();
    var responseData = JSON.parse(this.responseText);
    var rarts = responseData.articles;
    var templateData = { articles: [] };

    for (let i = 0; i < rarts.length; i++) {
      var article = {
        id: rarts[i].id,
        title: rarts[i].title,
        snapshot: rarts[i].snapshot,
        like: rarts[i].like,
        dislike: rarts[i].dislike,
        author: rarts[i].author,
        ctime: rarts[i].ctime,
        ccount: rarts[i].ccount,
        view: rarts[i].view,
        fromAnonymous: rarts[i].fromAnonymous,
        isAdmin: admin > 0,
      };
      templateData.articles.push(article);
      transname(rarts[i]);
    }

    compileTemplate("articles-template", templateData, "articles");
  }
};
xhttp4.open("GET", "https://api.jcsuf.top/api/fetchnewarticle", true);
xhttp4.withCredentials = true;
xhttp4.send();
nettaskcreate();

function transname(art) {
  var xhttptrans = new XMLHttpRequest();
  xhttptrans.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      nettaskfinish();
      var responseData = JSON.parse(this.responseText);
      var articleInfoElement = document.getElementById(
        "article-info-" + art.id
      );

      if (currentid == art.author) {
        var templateData = {
          id: art.id,
          author: responseData.name,
          isCurrentUser: true,
          isAnonymous: art.fromAnonymous,
          ctime: formatDateTime(art.ctime),
          ccount: art.ccount,
          view: art.view,
          canDelete: admin > 0,
        };
		compileTemplate("article-info-template", templateData, "article-info-" + art.id, art.id, function(elementId) {
			// Your code to execute after the template has been rendered
			const deleteButton = document.getElementById("delete-btn-" + elementId);
			if (deleteButton) {
				deleteButton.addEventListener("click", function() {
					var aid = deleteButton.getAttribute("data-id");
					console.log(aid);
				
					var xhttpdel = new XMLHttpRequest();
					xhttpdel.onreadystatechange = function () {
						if (this.readyState == 4 && this.status == 200) { nettaskfinish()
							switch (JSON.parse(this.responseText).code) {
								case 0:
									alert("成功删除。")
									document.getElementById("article-" + aid).style.opacity = "0%";
									setTimeout(function () { document.getElementById("article-" + aid).remove() }, 1000)
									break
								case 1:
									alert("指向的帖子不存在！")
									break
								case 2:
									alert("权限不足！")
							}
						}
					};
					xhttpdel.open("GET", "https://api.jcsuf.top/api/deletearticle?aid=" + aid, true);
					xhttpdel.withCredentials = true;
					xhttpdel.send(); nettaskcreate();
				})
			} else {
			  console.error("Element with ID 'delete-btn' not found");
			}
		  });
      } else {
        var templateData = {
          id: art.id,
          author: responseData.name,
          isCurrentUser: false,
          isAnonymous: art.fromAnonymous,
          ctime: formatDateTime(art.ctime),
          ccount: art.ccount,
          view: art.view,
          canDelete: admin > 0,
        };
		compileTemplate("article-info-template", templateData, "article-info-" + art.id, art.id, function(elementId) {
			// Your code to execute after the template has been rendered
			const deleteButton = document.getElementById("delete-btn-" + elementId);
			if (deleteButton) {
				deleteButton.addEventListener("click", function() {
					var aid = deleteButton.getAttribute("data-id");
					console.log(aid);
				
					var xhttpdel = new XMLHttpRequest();
					xhttpdel.onreadystatechange = function () {
						if (this.readyState == 4 && this.status == 200) { nettaskfinish()
							switch (JSON.parse(this.responseText).code) {
								case 0:
									alert("成功删除。")
									document.getElementById("article-" + aid).style.opacity = "0%";
									setTimeout(function () { document.getElementById("article-" + aid).remove() }, 1000)
									break
								case 1:
									alert("指向的帖子不存在！")
									break
								case 2:
									alert("权限不足！")
							}
						}
					};
					xhttpdel.open("GET", "https://api.jcsuf.top/api/deletearticle?aid=" + aid, true);
					xhttpdel.withCredentials = true;
					xhttpdel.send(); nettaskcreate();
				})
			} else {
			  console.error("Element with ID 'delete-btn' not found");
			}
		  });
      }
    }
  };
  xhttptrans.open(
    "GET",
    "https://api.jcsuf.top/api/userinfo?uid=" + art.author,
    true
  );
  xhttptrans.send();
  nettaskcreate();
}

function reloadnew() {
  var xhttpreload = new XMLHttpRequest();
  xhttpreload.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      nettaskfinish();
      var responseData = JSON.parse(this.responseText);
      var rarts = responseData.articles;
      var templateData = { articles: [] };

      for (let i = 0; i < rarts.length; i++) {
        var article = {
          id: rarts[i].id,
          title: rarts[i].title,
          snapshot: rarts[i].snapshot,
          like: rarts[i].like,
          dislike: rarts[i].dislike,
          author: rarts[i].author,
          ctime: rarts[i].ctime,
          ccount: rarts[i].ccount,
          view: rarts[i].view,
          fromAnonymous: rarts[i].fromAnonymous,
          isAdmin: admin > 0,
        };
        templateData.articles.push(article);
        transname(rarts[i]);
      }

      compileTemplate("articles-template", templateData, "articles");
    }
  };
  xhttpreload.open(
    "GET",
    "https://api.jcsuf.top/api/fetchnewarticle?pc=" +
      document.getElementById("input-row-count").value,
    true
  );
  xhttpreload.withCredentials = true;
  xhttpreload.send();
  nettaskcreate();
}

function minimize_pane() {
  document.getElementById("bgmask").style.display = "none";
  document.getElementById("important-notice-container").style.display = "none";
}

function display_notice() {
  document.getElementById("bgmask").style.display = "block";
  document.getElementById("important-notice-container").style.display = "block";
}
