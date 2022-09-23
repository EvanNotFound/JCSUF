var lastVar = "";
setInterval(function(){
	if(lastVar!=document.getElementById("i2").value.replaceAll('\n','<br>')){
		lastVar = document.getElementById("i2").value.replaceAll('\n','<br>')
		document.getElementById("preview").innerHTML = lastVar
	}
},100)

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		var rbody = JSON.parse(this.responseText)
		for(let i = 0; i < rbody.length; i++){
			if(rbody[i].id>=1000) document.getElementById("maincate").innerHTML += '<option value="'+rbody[i].id+'">'+rbody[i].name+'</option>';
		}
	}
};
xhttp.open("GET", "https://api.jcsuf.top/api/categorylist", true);
xhttp.withCredentials = true;
xhttp.send();

function loadbranch(val){
	if(val!=-1){
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var rbody = JSON.parse(this.responseText)
				document.getElementById("i3").innerHTML = '<option value="-1">--未选择--</option>';
				for(let i = 0; i < rbody.length; i++){
					document.getElementById("i3").innerHTML += '<option value="'+rbody[i].id+'">'+rbody[i].name+'</option>';
				}
			}
		};
		xhttp.open("GET", "https://api.jcsuf.top/api/categorylist?parent="+val, true);
		xhttp.withCredentials = true;
		xhttp.send();
	}
}

function display_user_option(checked){
	if(checked) document.getElementById("more-option").style.display = "block";
	else document.getElementById("more-option").style.display = "none";
}

var vm = new Vue({
    el: '.vue-enable',
    data: {

    },
    methods: {
        
    },
    mounted() {
        
    }
})