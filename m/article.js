var vm = new Vue({
    el: '.vue-enable',
    data: {
        entity: {
            author_name: "."
        }
    },
    methods: {
        getArticles: function () {
            //发送get请求
            console.log("www")
            this.$http.get('https://api.jcsuf.top/api/articleinfo' + location.href.substring(location.href.indexOf("?"))).then(function (res) {
                console.log(res.body);
                vm.entity = res.body;
                this.$http.get('https://api.jcsuf.top/api/userinfo?uid=' + vm.entity.author).then(function (res) {
                    vm.$set(vm.entity,"author_name",res.body.name)
                    vm.$set(vm.entity,"author_avatar",res.body.avatar)
                }, function () {
                    console.log('请求失败处理');
                });
            }, function () {
                console.log('请求失败处理');
            });
        },
    },
    mounted() {
        this.getArticles()
    }
})