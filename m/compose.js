var lastVar = "";
setInterval(function(){
	if(lastVar!=document.getElementById("i2").value.replaceAll('\n','<br>')){
		lastVar = document.getElementById("i2").value.replaceAll('\n','<br>')
		document.getElementById("preview").innerHTML = lastVar
	}
},100)

var vm = new Vue({
    el: '.vue-enable',
    data: {

    },
    methods: {
        
    },
    mounted() {
        
    }
})