<template>
    <div id="couponList">
        <topNav :title="title"></topNav>
        <!-- 优惠券列表couponList -->
        <div class="bodyContent" style="padding-top: 10px;">
            <div class="couponList" @click="toast">
                <div class="coupontextleft">
                    <span>¥30</span>
                </div>
                <div class="coupontextright">
                    <div>
                        <div class="text1">面包减免券</div>
                    <div class="text2">2019-05-08至2019-09-15</div>
                    </div>
                    <div class="textBox">
                        <span class="text3 fl">全部门店</span>
                        <span class="text4 fr" @click="show1">全部商品</span>
                    </div>
                </div>
                <img class="couponImg" src="@/images/coupon@2x.png" alt />
            </div>
            <div class="couponList"  @click="toast">
                <div class="coupontextleft">
                    <span>6折</span>
                </div>
                <div class="coupontextright">
                    <!-- <div class="text1">面包折扣券</div>
                    <span class="text2">2019-05-08至2019-09-15</span> -->
                    <div>
                        <div class="text1">面包折扣券</div>
                    <div class="text2">2019-05-08至2019-09-15</div>
                    </div>
                    <div class="textBox">
                        <span class="text3 fl">全部门店</span>
                        <span class="text4 fr" @click="show1">全部商品</span>
                    </div>
                </div>
                <img class="couponImg" src="@/images/coupon@2x.png" alt />
            </div>
            <van-popup v-model="show" position="bottom" :style="{ height: '20%' }" :overlay="false">
                <div class="shuoming">
                    适用于所有面包类，满1元可以抵扣使用优惠券商城和门店通用，除特价商品外
                    <br />于所有面包类，元可以抵扣使用优惠券商城和门店通用，除特价商品外
                </div>
            </van-popup>
        </div>
    </div>
</template>
<script>
import topNav from "@/components/common/topNav.vue";
export default {
    data() {
        return {
            //  activeNames: ['']
            show: false,
            title: "优惠券"
        };
    },
    methods: {
        show1() {
            this.show = !this.show;
        },
        toast(){
            this.$toast.fail('该功能暂时没启用！')
        }
    },
    components: {
        topNav
    }
};
</script>
<style lang="less" scoped>
.couponList {
    position: relative;
    width: 334px;
    height: 80px;
    margin: 0 auto;
    box-sizing: border-box;
    margin-bottom: 10px;
    .couponImg {
        // position: absolute;
        // left: 0;
        width: 100%;
        height: 100%;
    }
    .coupontextleft {
        box-sizing: border-box;
        position: absolute;
        left: 12px;
        top: 10px;
        width: 96px;
        height: 59px;
        padding: 20px 0;
        color: #fff;
        font-size: 15px;
        span {
            font-weight: 700;
        }
    }
    .coupontextright {
        position: absolute;
        right: 0;
        width: 210px;
        height: 80px;
        box-sizing: border-box;
        text-align: left;
        padding: 5px 25px;
        .text1 {
            font-size: 16px;
            color: #333;
        }
        .text2,
        .text3,
        .text4 {
            font-size: 12px;
            color: #333;
        }
        .textBox {
            // display: inline-block;
            padding-top: 5px;
            line-height: 12px;
            overflow: hidden;
            // position: relative;
        }
        .text1 {
            text-align: left;
            font-weight: 700;
        }
        .text2 {
            // font-size: 12px;
            // color: #333;
        }
        .text3 {
            // font-size: 12px;
            // color: #333;
            // position: absolute;
            // left: 0;
            // height: 12px;
        }
        .text4 {
            //  position: absolute;
            //  right: 0;
            //  height: 12px;
        }
    }
}
.shuoming {
    font-size: 10px;
    text-align: left;
    width: 332px;
    margin: 0 auto;
}
</style>