var vm = new Vue({
    el: '#articles',
    data: {
        articles: [],
        ababa: 0
    },
    methods:{
        getArticles:function() {
            //发送get请求
            console.log("www")
            this.$http.get('https://api.jcsuf.top/api/fetchnewarticle?pc=50').then(function(res){
                console.log(res.body);
                console.log(res.body.articles);
                vm.articles = res.body.articles;
            },function(){
                console.log('请求失败处理');
            });
            return this.articles;
        },
    },
    mounted(){
        this.getArticles()
    }
})