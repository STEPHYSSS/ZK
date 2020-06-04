<template>
    <div>
        <!-- <van-nav-bar
            title="已签收"
            left-arrow
            @click-left="onClickLeft"
            @click-right="onClickRight"
            :fixed="fixed"
        >
            <div slot="left">
                <img class="topimgstyle" src="@/images/fanhui_icon@2x.png" alt />
            </div>
        </van-nav-bar>-->
        <topNav :title="title"></topNav>
        <div class="signed">
            <van-steps direction="vertical" :active="active" active-color="#333">
                <van-step>
                    <div>
                        <div>已下单</div>
                        <div>交易成功，您的订单已开始处理</div>
                    </div>
                    <p>{{orderList.createTime|fmtDate}}</p>
                </van-step>
                <van-step v-show="orderList.deliverTime">
                    <div>
                        <div>已发货</div>
                        <div>包裹已经出库，正在等待揽收</div>
                    </div>
                    <p>{{orderList.deliverTime|fmtDate}}</p>
                </van-step>
                <van-step v-show="orderList.logisticsDatail">
                    <div>运输中</div>
                    <div>{{orderList.logisticsDatail}}</div>
                    <p>{{orderList.deliverTime|fmtDate}}</p>
                </van-step>
                <van-step v-show="orderList.receiveTime">
                    <div>已签收</div>
                    <div>签收方式：本人签收 您的包裹已经送达，如有问题请联系客服，风里来 雨里去，只为客官您满意，请赐五星好评，快递小哥继续努力！</div>
                    <p>{{orderList.receiveTime|fmtDate}}</p>
                </van-step>
            </van-steps>
        </div>
    </div>
</template>
<script>
import topNav from "@/components/common/topNav.vue";
export default {
    data() {
        return {
            fixed: true,
            active: 0,
            title: "已签收",
            orderList: {}
        };
    },
    created() {
        this.getDetail();
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        onClickRight() {},
        getDetail() {
            this.$axios
                .post(
                    "/shop/my/order/detail",
                    this.$qs.stringify({
                        token: localStorage.getItem("token"),
                        orderCode: this.$route.query.code
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.orderList = res.data.data;
                        if (this.orderList.createTime != null) {
                            this.active = 0;
                            this.title="已下单"
                        }
                        if (this.orderList.deliverTime != null) {
                             this.active = 1;
                             this.title="已发货"
                        }
                        if (this.orderList.logisticsDatail != null) {
                             this.active = 2;
                             this.title="运输中"
                        }
                        if (this.orderList.receiveTime != null) {
                            this.active = 3;
                            this.title="已签收"
                        }
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
.signed {
    margin-top: 46px;
}
.van-steps--vertical {
    padding-left: 50px;
    text-align: left;
    // padding-left: 20px;
}
.van-step--vertical {
    padding-left: 20px;
    font-size: 12px;
}
.van-step__title {
    // font-weight: 300;
}
.van-step--finish {
    color: #999;
}
.van-step__title{
    color: #333;
}
.van-step--finish .van-step__circle, .van-step--finish .van-step__line{
    color: #333;
}
</style>