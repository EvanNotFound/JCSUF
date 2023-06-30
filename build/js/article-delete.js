// window.onload = function () {
// 	const deleteButton = document.getElementById("delete-btn");
// 	deleteButton.addEventListener("click", function() {
// 		var aid = deleteButton.getAttribute("data-id");
// 		console.log(aid);
	
// 		var xhttpdel = new XMLHttpRequest();
// 		xhttpdel.onreadystatechange = function () {
// 			if (this.readyState == 4 && this.status == 200) { nettaskfinish()
// 				switch (JSON.parse(this.responseText).code) {
// 					case 0:
// 						alert("成功删除。")
// 						document.getElementById("article-" + aid).style.opacity = "0%";
// 						setTimeout(function () { document.getElementById("article-" + aid).remove() }, 1000)
// 						break
// 					case 1:
// 						alert("指向的帖子不存在！")
// 						break
// 					case 2:
// 						alert("权限不足！")
// 				}
// 			}
// 		};
// 		xhttpdel.open("GET", "https://api.jcsuf.top/api/deletearticle?aid=" + aid, true);
// 		xhttpdel.withCredentials = true;
// 		xhttpdel.send(); nettaskcreate();
// 	})
// }