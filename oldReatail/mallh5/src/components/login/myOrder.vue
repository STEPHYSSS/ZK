<template>
    <div class="myOrder" id="myOrder">
        <!-- 我的订单 -->
        <van-nav-bar
            title="我的订单"
            left-arrow
            @click-left="onClickLeft"
            @click-right="onClickRight"
            fixed
        >
            <div slot="left">
                <img class="topimgstyle" src="@/images/fanhui_icon@2x.png" alt />
            </div>
        </van-nav-bar>
        <div class="tabbox">
            <van-tabs v-model="status" @click="serchOrder" >
                <van-tab title="全部" name></van-tab>
                <van-tab title="待付款" name="WP"></van-tab>
                <van-tab title="待发货" name="WD"></van-tab>
                <van-tab title="待收货" name="WR"></van-tab>
                <van-tab title="待评价" name="WE"></van-tab>
                <!-- <van-tab title="已完成" name="AS"></van-tab>
                <van-tab title="已取消" name="AC"></van-tab>-->
            </van-tabs>
        </div>
        <div class="bodyContent boxTop">
            <div class="outBigbox">
                <div v-for="(i,index) in orderList" :key="index" class="shopBoxList">
                    <van-card
                        v-for="(item,index) in i.detailList"
                        :key="index"
                        :num="item.count"
                        :price="item.price"
                        :title="item.goodsName"
                        @click="toDetail(i.code,i.status)"
                    >
                        <div slot="thumb">
                            <img v-if="!item.listImage" src="@/assets\homeimg/img22@2x.png" alt />
                            <img v-else :src="item.listImage" alt />
                        </div>
                        <!-- <div slot="bottom" class="listBox" style="text-align: right;">
                            <span class="waitfor">{{i.status|fstatus}}--</span>
                            <span>共{{i.count}}件</span>
                            <span class="tprice">合计:¥{{i.actualMoney}}元</span>
                        </div>-->
                    </van-card>
                    <div class="conutBox">
                        <span class="waitfor">{{i.status|fstatus}}</span>
                        <span class="fontSizeColor">共&nbsp;&nbsp;{{i.count}}&nbsp;&nbsp;件</span>
                        <span class="tprice">合计:¥{{i.actualMoney}}元</span>
                    </div>
                    <div class="buttonBox">
                        <van-button
                            class="payFor"
                            size="mini"
                            v-show="i.status==='WP'"
                            @click="topay(i.code,i.actualMoney,i.status,i.createTime)"
                        >继续付款</van-button>
                         <van-button
                            class="payFor"
                            size="mini"
                            v-show="i.status==='WP'"
                            @click="cancel(i.code)"
                        >取消订单</van-button>
                        <van-button
                            class="payFor"
                            size="mini"
                            v-show="i.status==='WR'|| i.status==='AS'||i.status==='WE'||i.status==='WD'"
                            @click="tosigned(i.code,i.status)"
                        >查看物流</van-button>
                        <van-button
                            class="payFor"
                            v-show="i.status==='WE'"
                            size="mini"
                            @click="comment"
                        >待评论</van-button>
                        <!-- <van-button class="payFor" v-show="i.status==='AS'" size="mini" @click="comment">追加评论</van-button> -->
                        <van-button
                            class="payFor1"
                            v-show="i.status==='WR'"
                            size="mini"
                            @click="sureOrder(i.code)"
                        >确认收货</van-button>
                        <van-button
                            class="payFor"
                            v-show="i.status==='AC'"
                            size="mini"
                            @click="delect(i.code)"
                        >删除订单</van-button>
                    </div>
                </div>
                <div v-show="orderList.length==0" class="nomessage">
                    <span>暂无数据</span>
                </div>
            </div>
            <!-- <van-card
                num="2"
                price="49.60"
                title="可口可乐200ml可口可乐200ml可口可乐200ml可口可乐200ml"
            >
                <div slot="thumb">
                    <img src="@/images/img1@2x.png" alt />
                </div>
                <div slot="bottom" class="listBox" style="text-align: right;">
                    <span class="waitfor">待付款</span>
                    <span>共1件</span>
                    <span class="tprice">合计:¥30元</span>
                </div>
                <div slot="footer">
                    <van-button class="payFor" size="mini">继续付款</van-button>
                </div>
            </van-card>-->
            <!-- <van-card num="2" price="49.60" title="可口可乐200ml可口可乐200ml可口可乐200ml可口可乐200ml">
                <div slot="thumb">
                    <img @click="toDetail" src="@/images/img1@2x.png" alt />
                </div>
                <div slot="bottom" class="listBox" style="text-align: right;">
                    <span class="waitfor">待收货</span>
                    <span>共1件</span>
                    <span class="tprice">合计:¥30元</span>
                </div>
                <div slot="footer">
                    <van-button class="payFor" size="mini" @click="tosigned">查看物流</van-button>
                    <van-button class="payFor" size="mini">追加评论</van-button>
                    <van-button class="payFor1" size="mini">确认收货</van-button>
                    <van-button class="payFor" size="mini">删除订单</van-button>
                </div>
            </van-card>-->
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeName: " ",
            status: "",
            orderList: [],
            show: false,
            cancelButton:true
        };
    },
    created() {
        if (this.$route.query.flag) {
            this.getDetail();
        } else if (this.$route.query.orderCode) {
            this.getDetail();
        }
        this.switchPage();
    },
    methods: {
        serchOrder() {
            this.getDetail();
        },
        // 我的页面订单四个状态 代付款待发货 待收货待评价
        switchPage() {
            if (this.$route.query.status === "WP") {
                this.status = "WP";
                this.getDetail();
            } else if (this.$route.query.status === "WD") {
                this.status = "WD";
                this.getDetail();
            } else if (this.$route.query.status === "WR") {
                this.status = "WR";
                this.getDetail();
            } else if (this.$route.query.status === "WE") {
                this.status = "WE";
                this.getDetail();
            }
            // if (
            //     this.$route.query.status === "WP" ||
            //     this.$route.query.status === "WD" ||
            //     this.$route.query.status === "WR" ||
            //     this.$route.query.status === "WE"
            // ) {
            //     this.getDetail();
            // }
        },
        // 取消订单
        cancel(orderCode){
             this.$dialog
                .confirm({
                    title: "确认要取消？",
                    message: ""
                })
                .then(() => {
                    this.$axios
                        .post(
                            "/shop/my/order/cancel",
                            this.$qs.stringify({
                                token: localStorage.getItem("token"),
                                orderCode: orderCode
                            })
                        )
                        .then(res => {
                            if (res.data.code === "0000") {
                                this.$toast.success("取消成功");
                            }
                            this.getDetail();
                        });
                })
                .catch(() => {
                });
        },
        getDetail() {
            if (this.status == 0) {
                this.status = "";
            }
            let status = sessionStorage.getItem("status");
            if (status) {
                if (status == "AS") {
                    this.status = "";
                } else if (status == "AC") {
                    this.status = "";
                } else {
                    this.status = status;
                }
            }
            this.$axios
                .post(
                    "/shop/my/order/list",
                    this.$qs.stringify({
                        token: localStorage.getItem("token"),
                        status: this.status
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.orderList = res.data.data.list;
                    } else if (res.data.code === "6666") {
                        this.$toast.fail("请登录");
                        this.$router.push({
                            name: "login"
                        });
                    } else {
                        this.$toast.fail(res.data.code);
                    }
                });
            sessionStorage.removeItem("status");
        },
        onClickLeft() {
            this.$router.push("/myinfo");
        },
        onClickRight() {},
        tosigned(code, status) {
            // 保持已完成的状态
            sessionStorage.setItem("status", status);
            this.$router.push({
                name: "alreadySigned",
                query: {
                    code: code
                }
            });
        },
        toDetail(code, status) {
            sessionStorage.setItem("status", status);
            this.$router.push({
                name: "orderCompleted",
                query: {
                    code: code
                }
            });
        },
        sureOrder(code) {
            this.$dialog
                .confirm({
                    title: "确认要收货？",
                    message: ""
                })
                .then(() => {
                    this.$axios
                        .post(
                            "/shop/my/order/confirm/receive",
                            this.$qs.stringify({
                                token: localStorage.getItem("token"),
                                orderCode: code
                            })
                        )
                        .then(res => {
                            if (res.data.code === "0000") {
                                this.$toast.success("收货成功");
                            }
                            this.getDetail();
                        });
                })
                .catch(() => {
                });
        },
        delect(code) {
            this.$dialog
                .confirm({
                    title: "确认要删除？",
                    message: ""
                })
                .then(() => {
                    this.$axios
                        .post(
                            "/shop/my/order/delete",
                            this.$qs.stringify({
                                token: localStorage.getItem("token"),
                                orderCode: code
                            })
                        )
                        .then(res => {
                            if (res.data.code === "0000") {
                                this.$toast.success("删除成功");
                            }
                            this.getDetail();
                        });
                })
                .catch(() => {
                    // on cancel
                });
        },
        comment() {
            this.$toast.fail("功能暂时没开发！！");
        },
        topay(code, price, status,createTime) {        
            sessionStorage.setItem("status", status);
            sessionStorage.setItem("createTime", createTime);
            // return;
            this.$router.push({
                name: "pay",
                query: {
                    orderCode: code,
                    price: price
                }
            });
        }
    },
    filters: {
        fstatus(value) {
            if (value == "WP") {
                return "待付款";
            } else if (value == "WD") {
                return "待发货";
            } else if (value == "WR") {
                return "待收货";
            } else if (value == "WE") {
                return "待评价";
            } else if (value == "AS") {
                return "已完成";
            } else if (value == "AC") {
                return "已取消";
            }
        }
    }
};
</script>
<style lang="less" scoped>
#myOrder {
    background-color: #f5f5f5;
    .tabbox {
        display: flex;
        flex-direction: column;
        justify-content: start;
        width: 375px;
        height: 44px;
        position: fixed;
        top: 46px;
        z-index: 10;
        .van-tab {
            width: 20%;
        }
        .van-tabs__wrap--scrollable .van-tab {
            flex: none;
        }
    }
    .payFor {
        width: 80px;
        height: 25px;
        border: 1px solid #fc2e2e;
        color: #fc2e2e;
        border-radius: 12.5px;
        font-weight: 600;
    }
    .payFor1 {
        background-color: #fc2e2e;
        color: #fff;
        width: 80px;
        height: 25px;
        border-radius: 12.5px;
        font-weight: 600;
    }
    .van-button::before {
        background-color: #fff;
        border-color: #fc2e2e;
    }
    .conutBox {
        text-align: right;
        padding-right: 20px;
    }
    .waitfor {
        font-size: 12px;
        font-weight: 500;
        color: #333333;
        position: absolute;
        top: 18px;
        right: 20px;
    }
    .boxTop {
        // padding-top: 89px;
    }
    .van-card {
        // height: 177px;

        background-color: #fff;
        box-sizing: border-box;
        padding-bottom: 0;
    }
    // .van-card__footer {
    //     height: 25px;
    // }
    .van-card__header {
        // height: 139px;
        padding-top: 30px;
        // line-height: 139px;
    }
    .van-card__title {
        font-size: 12px;
        color: #333;
        text-align: left;
    }
    .van-card__thumb {
        width: 96px;
        height: 76px;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .van-card__price {
        font-size: 14px;
        color: #fc2e2e;
        font-weight: 700;
    }
    .van-card__bottom {
        text-align: left;
        padding-top: 15px;
    }
    .listBox {
        text-align: right;
        margin-top: 5px;
    }
    .shopBoxList {
        margin-top: 10px;
        background-color: #fff;
        box-sizing: border-box;
        position: relative;
    }
    .buttonBox {
        text-align: right;
        margin-right: 10px;
        padding-bottom: 5px;
    }
    .outBigbox {
        padding-top: 44px;
    }
    .nomessage {
        font-size: 14px;
        color: #999;
        padding-top: 10px;
        background-color: #fff;
    }
    .tprice {
        // font-size: 12px;
        // color: #FC2E2E;
        font-size: 12px;
        color: #999;
        margin-left: 10px;
    }
    .van-button::before {
        background-color: #fc2e2e;
        color: #fff;
    }
}
</style>
