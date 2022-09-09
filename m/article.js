var vm = new Vue({
    el: '.vue-enable',
    data: {
        entity: {
        },
        roll: 0,
        comment_start: false,
        target_floor: 0
    },
    methods: {
        getArticles: function () {
            //发送get请求
            console.log("www")
            this.$http.get('https://api.jcsuf.top/api/articleinfo' + location.href.substring(location.href.indexOf("?")), { credentials: true }).then(function (res) {
                console.log(res.body);
                vm.entity = res.body;
                this.$http.get('https://api.jcsuf.top/api/userinfo?uid=' + vm.entity.author, { credentials: true }).then(function (res) {
                    vm.$set(vm.entity, "author_name", res.body.name.replace(/<.*?>/g, ""))
                    vm.$set(vm.entity, "author_avatar", res.body.avatar)
                    vm.$set(vm.entity, "author_level", this.process_level(res.body.exp))
                }, function () {
                    console.log('请求失败处理');
                });
                for (this.roll = 0; this.roll < vm.entity.comments.length; this.roll++) {
                    this.$http.get('https://api.jcsuf.top/api/userinfo?uid=' + vm.entity.comments[this.roll].author + "&help=" + this.roll, { credentials: true }).then(function (res) {
                        console.log(res);
                        vm.$set(vm.entity.comments[res.body.mob_helper], "author_name", res.body.name.replace(/<.*?>/g, ""))
                        vm.$set(vm.entity.comments[res.body.mob_helper], "author_avatar", res.body.avatar)
                        vm.$set(vm.entity.comments[res.body.mob_helper], "author_level", this.process_level(res.body.exp))
                    }, function () {
                        console.log('请求失败处理');
                    });
                }
            }, function () {
                console.log('请求失败处理');
            });
        },
        process_level: function (exp) {
            if (exp == 0) {
                vm.$set(vm.entity, "author_style", "0px 0px 5px black")
                return "Lv0"
            } else if (exp < 30) {
                vm.$set(vm.entity, "author_style", "0px 0px 5px white")
                return "Lv1"
            } else if (exp < 60) {
                vm.$set(vm.entity, "author_style", "0px 0px 5px white")
                return "Lv2"
            } else if (exp < 100) {
                vm.$set(vm.entity, "author_style", "0px 0px 5px rgb(180,255,190)")
                return "Lv3"
            } else if (exp < 200) {
                vm.$set(vm.entity, "author_style", "0px 0px 5px rgb(180,255,190)")
                return "Lv4"
            } else if (exp < 500) {
                vm.$set(vm.entity, "author_style", "0px 0px 5px rgb(180,216,255)")
                return "Lv5"
            } else if (exp < 800) {
                vm.$set(vm.entity, "author_style", "0px 0px 5px rgb(180,216,255)")
                return "Lv6"
            } else if (exp < 1500) {
                vm.$set(vm.entity, "author_style", "0px 0px 5px rgb(255,216,180)")
                return "Lv7"
            } else if (exp < 2500) {
                vm.$set(vm.entity, "author_style", "0px 0px 5px rgb(255,174,255)")
                return "Lv8"
            } else if (exp < 4000) {
                vm.$set(vm.entity, "author_style", "0px 0px 5px rgb(225,154,225)")
                return "Lv9"
            } else if (exp < 6000) {
                vm.$set(vm.entity, "author_style", "0px 0px 5px rgb(255,72,72)")
                return "Lv10"
            } else if (exp < 10000) {
                vm.$set(vm.entity, "author_style", "0px 0px 8px rgb(255,36,36)")
                return "Lv11"
            } else {
                vm.$set(vm.entity, "author_style", "0px 0px 15px red")
                return "Lv12"
            }
        },
        comment: function () {
            this.$http.post('https://api.jcsuf.top/api/postcomment', { aid: vm.entity.id, anonymous: document.getElementById("anon").checked, replyto: vm.target_floor, content: document.getElementById("comment").value } , { credentials: true, emulateJSON: true }).then(function (res) {
                switch(res.body.code){
                    case 0:
                    alert("发布成功");
                    vm.comment_start = false;
                    vm.getArticles();
                    break;
                    case 1:
                    alert("发布失败，您是否已经登录？目标帖子是否已被删除？");
                    location.href = "https://www.jcsuf.top/signin.html?redir=article.html%3Faid%3D"+vm.entity.id
                    break;
                    case 2:
                    alert("您已被封禁");
                    break;
                    case 999:
                    alert("管理员正在修正服务器数据，请稍等几秒并重试");
                }
            }, function () {
                console.log('请求失败处理');
            });
        },
        callcomment: function (level) {
            vm.comment_start = true;
            vm.target_floor = level;
        }
    },
    mounted() {
        this.getArticles()
    }
})