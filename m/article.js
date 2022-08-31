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
                    vm.$set(vm.entity,"author_level",this.process_level(res.body.exp))
                }, function () {
                    console.log('请求失败处理');
                });
                //for()
            }, function () {
                console.log('请求失败处理');
            });
        },
        process_level: function (exp){
            if(exp==0){
                vm.$set(vm.entity,"author_style","0px 0px 5px black")
                return "Lv0"
            } else if(exp<30){
                vm.$set(vm.entity,"author_style","0px 0px 5px white")
                return "Lv1"
            } else if(exp<60){
                vm.$set(vm.entity,"author_style","0px 0px 5px white")
                return "Lv2"
            } else if(exp<100){
                vm.$set(vm.entity,"author_style","0px 0px 5px rgb(180,255,190)")
                return "Lv3"
            } else if(exp<200){
                vm.$set(vm.entity,"author_style","0px 0px 5px rgb(180,255,190)")
                return "Lv4"
            } else if(exp<500){
                vm.$set(vm.entity,"author_style","0px 0px 5px rgb(180,216,255)")
                return "Lv5"
            } else if(exp<800){
                vm.$set(vm.entity,"author_style","0px 0px 5px rgb(180,216,255)")
                return "Lv6"
            } else if(exp<1500){
                vm.$set(vm.entity,"author_style","0px 0px 5px rgb(255,216,180)")
                return "Lv7"
            } else if(exp<2500){
                vm.$set(vm.entity,"author_style","0px 0px 5px rgb(255,174,255)")
                return "Lv8"
            } else if(exp<4000){
                vm.$set(vm.entity,"author_style","0px 0px 5px rgb(225,154,225)")
                return "Lv9"
            } else if(exp<6000){
                vm.$set(vm.entity,"author_style","0px 0px 5px rgb(255,72,72)")
                return "Lv10"
            } else if(exp<10000){
                vm.$set(vm.entity,"author_style","0px 0px 8px rgb(255,36,36)")
                return "Lv11"
            } else {
                vm.$set(vm.entity,"author_style","0px 0px 15px red")
                return "Lv12"
            }
        }
    },
    mounted() {
        this.getArticles()
    }
})