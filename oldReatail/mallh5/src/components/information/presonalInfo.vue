
<template>
    <div>
        <!-- 设置infosetting -->
        <!-- <van-nav-bar title="个人信息" left-arrow @click-left="onClickLeft">
            <div slot="left">
                <img class="topimgstyle" src="@/images/fanhui_icon@2x.png" alt />
            </div>
        </van-nav-bar>-->
        <topNav :title="title"></topNav>
        <div class="bodyContent">
            <van-cell-group>
                <van-cell title="姓名" :value="infoList.name" />
                <van-cell title="会员等级" :value="infoList.levelName" />
                <van-cell title="手机号码" :value="infoList.phone" />
                <van-cell title="注册时间" :value="infoList.createTime |fmtDate" />
            </van-cell-group>
        </div>
    </div>
</template>
<script>
import topNav from "@/components/common/topNav.vue";
export default {
    data() {
        return {
            title: "个人信息",
            show: false,
            infoList: {}
        };
    },
    created() {
        this.getDetail();
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        getDetail() {
            this.$axios
                .post(
                    "/shop/my/info",
                    this.$qs.stringify({
                        token: localStorage.getItem("token")
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.infoList = res.data.data;
                    } else if (res.data.code === "6666") {
                        this.$toast.fail("请登录");
                        this.$router.push({
                            name: "login"
                        });
                    } else {
                        this.$toast.fail(res.data.msg);
                    }
                });
        }
    },
    components: {
        topNav
    }
};
</script>
<style lang="less" scoped>
.van-nav-bar {
    background-color: #cd2518;
}
.van-cell {
    height: 44px;
}
.van-cell__title {
    font-size: 12px;
    color: #999;
}
.van-cell__value {
    font-size: 12px;
    color: #333;
}
.topimgstyle {
    width: 16px;
    height: 15px;
    vertical-align: middle;
}
</style>