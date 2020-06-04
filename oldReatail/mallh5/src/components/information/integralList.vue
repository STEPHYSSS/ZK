<template>
    <div>
        <!-- <van-nav-bar title="积分" left-arrow @click-left="onClickLeft">
            <div slot="left">
                <img class="topimgstyle" src="@/images/fanhui_icon@2x.png" alt />
            </div>
        </van-nav-bar> -->
        <topNav :title="title"></topNav>
        <div class="bodyContent" @click="toast">
            <van-cell  v-for="(item,index) in integraList"
            :key="index" :title="item.type" value="+9" size="large" label="2019-09-06  11：22：03" />
            <van-cell title=" 购物—交易订单" value="+15" size="large" label="2019-09-06  12：22：03" />
            <van-cell title="购物—积分抵扣" value="+909" size="large" label="2019-09-06  11：22：03" />
            <van-cell title="购物—交易订单" value="+99" size="large" label="2019-09-06  11：22：03" />
            <van-cell title="购物—积分抵扣" value="+5" size="large" label="2019-09-06  11：22：03" />
        </div>
    </div>
</template>
<script>
import topNav from "@/components/common/topNav.vue";
export default {
    data() {
        return {
            integraList: [],
            title:'积分'
        };
    },
    created(){
      this.getList()
    },
    methods: {
        getList() {
            this.$axios
                .post(
                    "/shop/my/score/list",
                    this.$qs.stringify({
                        token: localStorage.getItem("token")
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.integraList = res.data.data.list;
                    }
                });
        },
        toast(){
            this.$toast.fail('功能暂未启用')
        }
    },
    components: {
        topNav
    }
};
</script>
<style lang="less" scoped>
.van-cell__title {
    > span {
        font-size: 12px;
        color: #333;
    }
}
.van-cell__label {
    font-size: 10px;
    color: #999;
}
.van-cell__value {
    > span {
        font-size: 16px;
        color: #333;
        font-weight: 700;
    }
}
.van-cell {
    // height: 44px;
    border-bottom: 1px solid #f9f9f9;
}
</style>