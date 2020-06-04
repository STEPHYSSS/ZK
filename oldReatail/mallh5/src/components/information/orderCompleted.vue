<template>
    <div>
        <!-- 订单已完成 -->
        <topNav :title="orderList.status|fstatus"></topNav>
        <div class="bodyContent mgbottom">
            <div class="address">
                <div class="flexbox">
                    <!-- <div class="inlineBlock posimiddl"> -->
                    <div class="flexboxL">
                        <img src="@/images/dizhiicon@2x.png" alt />
                    </div>
                    <!-- <div class="inlineBlock addressBox"> -->
                    <div class="flexboxR">
                        <!-- <span class="nameText">{{orderList.name}}</span>
                    <span class="phoneText nameText">{{orderList.phone}}</span>
                        <div class="fontSizeColor addressDetail">{{orderList.address}}</div>-->
                        <span class="addressName">{{orderList.name}}</span>
                        <span class="phoneText nameText">{{orderList.phone}}</span>
                        <div class="fontSizeColor addressDetail">{{orderList.address}}</div>
                    </div>
                </div>
            </div>
            <div class="orderList">
                <div class="shopIconBox">
                    <img class="shopIconW" src="@/images/shopicon@2x.png" alt />
                    <span class="fontSizeColor shoptext">自营商品</span>
                </div>
                <div>
                    <van-card
                        v-for="(item,index) in orderList.detailList"
                        :key="index"
                        :num="item.count"
                        :price="item.price"
                        :title="item.goodsName"
                    >
                        <!-- :title="item.goodsName" -->
                        <div slot="thumb">
                            <img v-if="!item.listImage" src="@/assets\homeimg/img22@2x.png" alt />
                            <img v-else :src="item.listImage" alt />
                            <!-- <img src="@/images/img1@2x.png" alt />
                            <img :src="item.listImage" alt />-->
                        </div>
                        <div slot="bottom">
                            <!-- <span class="waitfor">待付款</span> -->
                            <!-- <span>共1件</span>
                            <span class="tprice">合计:¥30元</span>-->
                        </div>
                        <!-- <div slot="footer">
                        <van-button class="payFor" size="mini">继续付款</van-button>
                        </div>-->
                    </van-card>
                </div>
                <!-- <van-card num="2" price="49.60" title="可口可乐200ml可口可乐200ml可口可乐200ml可口可乐200ml">
                    <div slot="thumb">
                        <img src="@/images/img1@2x.png" alt />
                    </div>
                    <div slot="bottom">
                        <span>共1件</span>
                        <span class="tprice">合计:¥30元</span>
                    </div>
                </van-card>-->
                <van-row>
                    <van-col span="12" class="textal">
                        <span>商品总价</span>
                    </van-col>
                    <van-col span="12" class="textar">
                        <span>¥&nbsp;&nbsp;{{orderList.amount}}&nbsp;&nbsp;元</span>
                    </van-col>
                </van-row>
                <van-row>
                    <van-col span="12" class="textal">
                        <span>运费</span>
                    </van-col>
                    <van-col span="12" class="textar">
                        <span>¥0.00元</span>
                    </van-col>
                </van-row>
                <van-row>
                    <van-col span="12" class="textal">
                        <span>优惠金额</span>
                    </van-col>
                    <van-col span="12" class="textar">
                        <span>¥&nbsp;&nbsp;{{orderList.discountMoney}}&nbsp;&nbsp;元</span>
                    </van-col>
                </van-row>
                <van-row>
                    <van-col span="12" class="textal">
                        <span>积分抵扣</span>
                    </van-col>
                    <van-col span="12" class="textar">
                        <span>¥0元</span>
                    </van-col>
                </van-row>
                <van-row>
                    <van-col span="12" class="textal">
                        <span class="shifu">实付金额</span>
                    </van-col>
                    <van-col span="12" class="textar">
                        <span class="shifu">¥&nbsp;&nbsp;{{orderList.discountMoney}}&nbsp;&nbsp;元</span>
                    </van-col>
                </van-row>
                <span></span>
            </div>
            <div class="orderDetail">
                <div class="orderDetail1" style="text-align: left;">
                    <div class="border3px"></div>
                    <span class="orderInfo">订单信息</span>
                </div>
                <van-row>
                    <van-col span="6" class="textal">
                        <span>订单编号</span>
                    </van-col>
                    <van-col span="18" class="textar">
                        <span>{{orderList.code}}</span>
                    </van-col>
                </van-row>
                <van-row>
                    <van-col span="12" class="textal">
                        <span>创建时间</span>
                    </van-col>
                    <van-col span="12" class="textar">
                        <span>{{orderList.createTime|fmtDate}}</span>
                    </van-col>
                </van-row>
                <van-row v-show="orderList.payTime">
                    <van-col span="12" class="textal">
                        <span>交易时间</span>
                    </van-col>
                    <van-col span="12" class="textar">
                        <span>{{orderList.payTime|fmtDate}}</span>
                    </van-col>
                </van-row>
                <van-row v-show="orderList.deliverTime">
                    <van-col span="12" class="textal">
                        <span>发货时间</span>
                    </van-col>
                    <van-col span="12" class="textar">
                        <span>{{orderList.deliverTime|fmtDate}}</span>
                    </van-col>
                </van-row>
            </div>
            <div slot="bottom">
                <span class="waitfor">待收货</span>
                <!-- <span>共1件</span>
                <span class="tprice">合计:¥30元</span>-->
            </div>
            <div slot="footer">
                <!-- <van-button class="payFor" size="mini" @click="tosigned">查看物流</van-button>
                <van-button class="payFor" size="mini">追加评论</van-button>
                <van-button class="payFor1" size="mini">确认收货</van-button>
                <van-button class="payFor" size="mini">删除订单</van-button>-->
                <!-- <van-button class="payFor" size="mini">继续付款</van-button> -->
                <!-- <van-button size="mini"></van-button> -->
            </div>
        </div>
        <div class="buttonBox">
            <van-button
                class="payFor"
                size="mini"
                v-show="orderList.status==='WP'"
                @click="topay(orderList.code,orderList.amount,orderList.createTime)"
            >继续付款</van-button>
            <van-button
                class="payFor"
                size="mini"
                v-show="orderList.status==='WR'|| orderList.status==='AS'||orderList.status==='WE'||orderList.status==='WD'"
                @click="tosigned(orderList.code)"
            >查看物流</van-button>
            <van-button
                class="payFor"
                v-show="orderList.status==='WE'"
                size="mini"
                @click="comment"
            >待评论</van-button>
            <!-- <van-button class="payFor" v-show="i.status==='AS'" size="mini" @click="comment">追加评论</van-button> -->
            <van-button
                class="payFor1"
                v-show="orderList.status==='WR'"
                size="mini"
                @click="sureOrder(orderList.code)"
            >确认收货</van-button>
            <van-button
                class="payFor"
                v-show="orderList.status==='AC'"
                size="mini"
                @click="delect(orderList.code)"
            >删除订单</van-button>
        </div>
    </div>
</template>
<script>
import topNav from "@/components/common/topNav.vue";
export default {
    data() {
        return {
            title: "已完成",
            orderList: {},
            bcakPage: ""
        };
    },
    components: {
        topNav
    },
    created() {
        this.getDetail();
    },
    methods: {
        comment() {
            this.$toast.fail("功能没开发！！");
        },
        onAdd() {
            this.$toast("新增地址");
        },

        onEdit(item, index) {
            this.$toast("编辑地址:" + index);
        },
        onClickLeft() {
            // if(this.$route.query.code){
            //     this.bcakPage=
            // }
            this.$router.go(-1);
        },
        tosigned(code) {
            this.$router.push({
                name: "alreadySigned",
                query: {
                    code: code
                }
            });
        },
        topay(code, price, createTime) {
            sessionStorage.setItem("createTime", createTime);
            this.$router.push({
                name: "pay",
                query: {
                    orderCode: code,
                    price: price
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
                            this.$router.push({
                                name: "myOrder"
                            });
                        });
                })
                .catch(() => {
                    // on cancel
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
                            this.$router.push({
                                name: "myOrder"
                            });
                        });
                })
                .catch(() => {
                    // on cancel
                });
        },
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
.bodyContent {
    background-color: #f5f5f5;
}
.van-card {
    background-color: #fff;
    box-sizing: border-box;
}
.van-card__thumb {
    width: 96px;
    height: 76px;
    img {
        width: 100%;
        height: 100%;
    }
}
.van-row {
    font-size: 12px;
    // margin: 0 18px;
}
.mgbottom {
    margin-bottom: 40px;
}
.address {
    height: 113px;
    box-sizing: border-box;
    padding-top: 20px;
    background-color: #fff;
    white-space: nowrap;
    // padding: 28px auto;
}
.addressIcon {
    width: 32px;
    height: 32px;
}
.posimiddl {
    // margin-bottom: 39px;
    height: 55px;
    // background-color: pink;
    width: 32px;
}
.nameText {
    font-size: 16px;
}
.nameText {
    color: #333;
    font-weight: 500;
}
.phoneText {
    color: #999;
    margin-left: 5px;
    // font-size: 12px;
}
.inlineBlock {
    display: inline-block;
}
.addressBox {
    width: 284px;
    height: 55px;
    box-sizing: border-box;
    text-align: left;
    // margin-top: 28px;
    margin-left: 15px;
    // background-color: orange;
}
.addressDetail {
    margin-top: 8px;
    white-space: normal;
}
.orderList,
.orderDetail {
    background-color: #fff;
    padding: 0 17px;
    margin-top: 10px;
    padding-bottom: 5px;
}
.orderDetail1 {
    text-align: left;
    padding: 5px 0;
}
.shopIconW {
    width: 14px;
    height: 12px;
    margin-bottom: -1px;
}
.shopIconBox {
    text-align: left;
}
.shoptext {
    margin-left: 5px;
    margin-top: 16px;
}
.orderDetail {
    margin: 10px 0;
}
.border3px {
    height: 12px;
    width: 3px;
    background-color: #fc2e2e;
    display: inline-block;
}
.orderInfo {
    color: #333;
    font-size: 16px;
    margin-left: 5px;
    font-weight: 600;
}
.van-row {
    color: #999;
    font-size: 12px;
    margin-bottom: 5px;
}

.shifu {
    font-size: 12px;
    color: #333;
    font-weight: 700;
}
// 产品样式 start
.van-card {
    // height: 177px;

    background-color: #fff;
    box-sizing: border-box;
    padding-left: 0;
    padding-right: 0;
}
.van-card__footer {
    height: 25px;
}
.van-card__header {
    // height: 139px;
    // padding-top: 30px;
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
.van-card__bottom {
    text-align: left;
    margin-top: 3px;
}
.van-card__price {
    font-size: 14px;
    color: #fc2e2e;
    font-weight: 700;
}
.tprice {
    // font-size: 12px;
    // color: #FC2E2E;
    font-size: 12px;
    color: #999;
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
.buttonBox {
    text-align: right;
    margin-right: 10px;
    padding-bottom: 5px;
    position: fixed;
    width: 95%;
    bottom: 0;
    background-color: #fff;
    height: 35px;
    margin: 0px 10px;
}
.van-button::before {
    background-color: #fff;
    border-color: #fc2e2e;
}
.waitfor {
    font-size: 12px;
    font-weight: 500;
    color: #333333;
    position: absolute;
    top: -28px;
    right: 3px;
}
// 产品样式 end

.address {
    height: 112px;
    background: #fff;
    position: relative;
    box-sizing: border-box;
}
.address .flexbox {
    display: flex;
    position: absolute;
    top: 34%;
    left: 5%;
}
.flexboxR {
    font-size: 12px;
    text-align: left;
    margin-left: 20px;
    margin-right: 10px;
}
.flexboxL {
    padding-top: 8px;
}
.flexboxL img {
    width: 32px;
    height: 32px;
}
</style>