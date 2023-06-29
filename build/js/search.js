/*
function search() {
    var xhttp4 = new XMLHttpRequest();
    xhttp4.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            nettaskfinish();
            var rarts = JSON.parse(this.responseText).results;
            document.getElementById("searched-articles").innerHTML = '搜索到 ' + JSON.parse(this.responseText).matches + ' 条结果';

            for (let i = 0; i < rarts.length; i++) {
                var articleElement = document.createElement("div");
                articleElement.className = "flex flex-row justify-between mx-6";
                articleElement.id = "article-" + rarts[i].entity.id;

                var articleDescElement = document.createElement("div");
                articleDescElement.className = "post-column w-7/12 dark:bg-gh-subtledarkbg dark:border-gh-gray-7";
                articleDescElement.id = "article-desc-" + rarts[i].entity.id;

                var articleTitleElement = document.createElement("h4");
                articleTitleElement.className = "text-center text-lg font-bold mb-1";
                var articleTitleLink = document.createElement("a");
                articleTitleLink.href = "article.html?aid=" + rarts[i].entity.id;
                articleTitleLink.className = "post_title center";
                articleTitleLink.textContent = rarts[i].entity.title;
                articleTitleElement.appendChild(articleTitleLink);

                var articleSnapshotElement = document.createElement("p");
                articleSnapshotElement.className = "text-sm text-center";
                articleSnapshotElement.textContent = rarts[i].entity.snapshot;

                articleDescElement.appendChild(articleTitleElement);
                articleDescElement.appendChild(articleSnapshotElement);

                var articleStatElement = document.createElement("div");
                articleStatElement.className = "m-2.5 px-3 py-2.5 bg-white dark:bg-gh-subtledarkbg rounded-xl gh-border flex flex-col justify-center w-2/12 max-w-[135px] dark:border-gh-gray-7";
                articleStatElement.id = "article-stat-" + rarts[i].entity.id;

                var statsHtml = '<div class="flex justify-center flex-wrap">';
                statsHtml += '<div class="flex flex-row items-center w-1/2">';
                statsHtml += '<i class="fa-regular fa-up fa-lg"></i>';
                statsHtml += '<p class="text-md text-gh-gray-8 dark:text-gh-gray-2 ml-1">' + rarts[i].entity.like + '</p>';
                statsHtml += '</div>';
                statsHtml += '<div class="flex flex-row items-center w-1/2">';
                statsHtml += '<i class="fa-regular fa-comments fa-md"></i>';
                statsHtml += '<p class="text-md text-gh-gray-8 dark:text-gh-gray-2 ml-1">' + rarts[i].entity.ccount + '</p>';
                statsHtml += '</div>';
                statsHtml += '<div class="flex flex-row items-center w-1/2">';
                statsHtml += '<i class="fa-regular fa-down fa-lg"></i>';
                statsHtml += '<p class="text-md text-gh-gray-8 dark:text-gh-gray-2 ml-1">' + rarts[i].entity.dislike + '</p>';
                statsHtml += '</div>';
                statsHtml += '<div class="flex flex-row items-center w-1/2">';
                statsHtml += '<i class="fa-regular fa-eye fa-md"></i>';
                statsHtml += '<p class="text-md text-gh-gray-8 dark:text-gh-gray-2 ml-1">' + rarts[i].entity.view + '</p>';
                statsHtml += '</div>';
                statsHtml += '</div>';

                articleStatElement.innerHTML = statsHtml;

                var articleInfoElement = document.createElement("div");
                articleInfoElement.className = "post-column w-3/12 dark:bg-gh-subtledarkbg dark:border-gh-gray-7";
                var articleInfoParagraph = document.createElement("p");
                articleInfoParagraph.id = "article-info-" + rarts[i].entity.id;

                articleInfoElement.appendChild(articleInfoParagraph);

                articleElement.appendChild(articleDescElement);
                articleElement.appendChild(articleStatElement);
                articleElement.appendChild(articleInfoElement);

                document.getElementById("searched-articles").appendChild(articleElement);

                transname(rarts[i].entity, rarts[i].relativity);
            }
        }
    };

    var str = document.getElementById("search-content").value;
    var utf8Str = '';
    for (let i = 0; i < str.length; i++) {
        let t = str[i];
        let text = '';
        text = encodeURIComponent(t);
        utf8Str += text;
    }

    xhttp4.open("GET", "https://api.jcsuf.top/api/searcharticle?qs=" + utf8Str + "&vw=0&cw=0", true);
    xhttp4.withCredentials = true;
    xhttp4.send();
    nettaskcreate();
}

function transname(art, rel) {
    var xhttptrans = new XMLHttpRequest();
    xhttptrans.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            nettaskfinish();

            var articleInfoElement = document.getElementById("article-info-" + art.id);
            articleInfoElement.innerHTML = '';

            if (currentid == art.author) {
                if (art.fromAnonymous) {
                    var authorHtml = '<div><i class="fa-regular fa-paper-plane"></i>';
                    authorHtml += '<p color="#6699aa" class="ml-1 font-bold">' + JSON.parse(this.responseText).name + ' (you, 匿名)</p></div>';
                    articleInfoElement.innerHTML += authorHtml;
                } else {
                    var authorHtml = '<div><i class="fa-regular fa-paper-plane"></i>';
                    authorHtml += '<p color="#3399aa" class="ml-1 font-bold">' + JSON.parse(this.responseText).name + ' (you)</p></div>';
                    articleInfoElement.innerHTML += authorHtml;
                }
            } else {
                if (art.fromAnonymous) {
                    var authorHtml = '<div><i class="fa-regular fa-paper-plane"></i>';
                    authorHtml += '<p color="#AAAA00" class="inline font-bold ml-1">匿名</p></div>';
                    articleInfoElement.innerHTML += authorHtml;
                } else {
                    var authorHtml = '<div><i class="fa-regular fa-paper-plane"></i>';
                    authorHtml += '<a href="user.html?uid=' + art.author + '" class="font-bold ml-1">' + JSON.parse(this.responseText).name + '</a></div>';
                    articleInfoElement.innerHTML += authorHtml;
                }

                if (admin > 0) {
                    var deleteHtml = '<br><p onclick="del(' + art.id + ')" color="red" style="margin-left: 18px"><small>删除</small></p>';
                    articleInfoElement.innerHTML += deleteHtml;
                }
            }
        }
    };
	xhttptrans.open("GET", "https://api.jcsuf.top/api/userinfo?uid="+art.author, true);
	xhttptrans.send(); nettaskcreate();
}
*/

var searchInput = document.getElementById("search-content");
var searchBg = document.getElementById("search-bg");
var searchResults = document.getElementById("search-results");

searchInput.addEventListener("keypress", function(event) {
	// If the user presses the "Enter" key on the keyboard
	if (event.key === "Enter") {
		search();
	}
});

searchInput.addEventListener("click", function(event) {
    searchBg.classList.toggle("hidden");
});

searchBg.addEventListener("click", function(event) {

    var targetElement = event.target;


    if (targetElement == searchBg && targetElement !== searchResults) {
        setTimeout(function() {
            searchBg.classList.add("hidden");
        }, 0);
	}
});
