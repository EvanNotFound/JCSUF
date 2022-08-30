var vm = new Vue({
    el: '#articles',
    data: {
        articles: [
            {
                title: "Feel good",
                snapshot: "突然感觉这东西也没这么难写",
                read: 114,
                ccount: 514
            }
        ]
    },
    methods:{
        getArticles:function(){
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