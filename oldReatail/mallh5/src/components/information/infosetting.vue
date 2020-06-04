<template>
    <div class="infosetting">
        <van-nav-bar :title="title" left-arrow @click-left="onClickLeft" :fixed="fixed">
            <div slot="left">
                <img class="topimgstyle" src="@/images/fanhui_icon@2x.png" alt />
            </div>
        </van-nav-bar>
        <div v-show="show1">
            <div class="content">
                <van-cell title="修改密码" is-link to="checkPsw" />
                <van-cell :title="guanyu" is-link value="1.0.1" @click="about(guanyu)" />
                <van-cell :title="xieyi" is-link @click="about(xieyi)" />
                <van-cell :title="bangzhu" is-link @click="about(bangzhu)" />
                <van-cell :title="lianxi" is-link @click="about(lianxi)" />
                <div class="loginout">
                    <span @click="logOut">退出登录</span>
                </div>
            </div>
        </div>
        <iframe
            v-show="show"
            src="http://www.seekerp.com/"
            frameborder="0"
            height="800px"
            width="100%"
        ></iframe>

        <!-- 设置 -->
    </div>
</template>
<script>
export default {
    data() {
        return {
            fixed: true,
            show: false,
            show1: true,
            guanyu: "关于我们",
            xieyi: "用户协议",
            bangzhu: "帮助中心",
            lianxi: "联系客服",
            title: "设置"
        };
    },
    methods: {
        onClickLeft() {
            //   this.$router.go(-1)
            if (this.show) {
                this.show = false;
                this.show1 = true;
            } else {
                this.$router.push({
                    name: "myinfo"
                });
            }
        },
        logOut() {
            this.$axios
                .post(
                    "/shop/my/logout",
                    this.$qs.stringify({
                        token: localStorage.getItem("token")
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        localStorage.removeItem("token");
                        this.$toast.success("退出成功");
                        this.$router.push({
                            name: "Home"
                        });
                    } else if (res.data.code === "6666") {
                        this.$notify({ type: "danger", message: "请登录" });
                        // const timer = setTimeout(() => {
                        //     clearTimeout(timer);
                        this.$router.push({ name: "login" });
                        // }, 3000);
                    } else {
                        this.$toast(res.data.msg);
                    }
                });
            localStorage.removeItem("token");
            this.$toast.fail("退出成功");
            this.$router.push({
                name: "Home"
            });
        },
        about(value) {
            // console.log(value);
            this.title = value;
            (this.show = true), (this.show1 = false);
            // console.log(1)
            // window.location.href="http://www.seekerp.com/"
            // location.href="http://www.seekerp.com/"
            // this.$dialog.alert({
            //     title: "版本：",
            //     message: "版本号：1.0.1"
            // });
            // window.open('http://www.seekerp.com/')
        }
    }
};
</script>
<style lang="less" scoped>
.content {
    margin-top: 46px;
}
.loginout {
    width: 345px;
    height: 34px;
    background-color: #fc2e2e;
    margin: 0 auto;
    text-align: center;
    border-radius: 3px;
    margin-top: 30px;
    > span {
        color: #fff;
        font-size: 14px;
        letter-spacing: 1px;
        font-weight: 600;
        display: block;
        padding: 7px 0;
    }
}
.van-cell__title {
    font-size: 12px;
    color: #999;
}
</style>
