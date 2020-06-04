<template>
    <div class="myinfo">
        <div class="infotop">
            <h3>我的</h3>
            <div class="headImgBox">
                <div class="borderRadius1">
                    <img @click="tomyInfo" class="headImg" src="@/images/20191030192824.png" alt />
                    <!-- <div class="borderRadius"></div> -->
                </div>
            </div>
            <div class="infointegral">
                <div class="infoleft dispinlbloc">
                    <span class="leftText disblock">{{infoList.score}}</span>
                    <span class="leftText1 disblock" @click="tointegral">我的积分</span>
                </div>
                <div class="infocenter dispinlbloc">
                    <span class="infoPhone">{{infoList.phone}}</span>
                </div>
                <div class="inforight dispinlbloc" @click="toCoupon">
                    <span class="leftText disblock">{{infoList.couponCount}}</span>
                    <span class="leftText1 disblock">优惠券</span>
                </div>
            </div>
        </div>
        <div class="infocontent">
            <van-cell title="我的订单" is-link @click="toorder" value="全部">
                <img class="infocontentIcon" slot="icon" src="@/images/wodedingdan_icon@2x.png" alt />
            </van-cell>
            <div class="infoMenu">
                <span @click="topay">
                    <img src="@/images/daifukuan_icon@2x.png" alt />
                    <div class="navText">待付款</div>
                </span>
                <span @click="toDeliver">
                    <img src="@/images/daifahuo_icon@2x.png" alt />
                    <div class="navText">待发货</div>
                </span>
                <span @click="toreceiving">
                    <img src="@/images/daishouhuo_icon@2x.png" alt />
                    <div class="navText">待收货</div>
                </span>
                <span @click="toevaluate">
                    <img src="@/images/daipingjia_icon@2x.png" alt />
                    <div class="navText">待评价</div>
                </span>
            </div>
            <van-cell title="我的地址" is-link to="addresList">
                <img class="infocontentIcon" slot="icon" src="@/images/wodedizhi_icon@2x.png" alt />
            </van-cell>
            <!-- <van-icon name="arrow" class="icon2" /> -->
            <van-cell title="设置" is-link to="infosetting">
                <img class="infocontentIcon" slot="icon" src="@/images/shezhi_icon@2x.png" alt />
            </van-cell>
            <!-- <van-icon name="arrow" is-link to="addresList" class="icon3" /> -->
        </div>
        <tabbar></tabbar>
    </div>
</template>
<script>
import tabbar from "@/components/common/tabbar.vue";
export default {
    name: "myinfo",
    data() {
        return {
            infoList:{}
        };
    },
    created(){
       let token=localStorage.getItem('token')
       if(!token){
            return this.$router.push({
               name:'login'
           })
       }
       this.getinfo()
    },
    methods: {
        toorder(){
            this.$router.push({
                name:'myOrder',
                query:{
                    flag:'status'
                }
            })
        },
        topay(){
            let stu="WP"
            this.$router.push({
                name:'myOrder',
                query:{
                    status:stu
                }
            })
        },
        toDeliver(){
            // 待发货
             let stu="WD"
            this.$router.push({
                name:'myOrder',
                query:{
                    status:stu
                }
            })
        },
        toreceiving(){
            // 待收货
             let stu="WR"
            this.$router.push({
                name:'myOrder',
                query:{
                    status:stu
                }
            })
        },
        toevaluate(){
            // 待评价
             let stu="WE"
            this.$router.push({
                name:'myOrder',
                query:{
                    status:stu
                }
            })
        },
        getinfo(){
            this.$axios.post('/shop/my',this.$qs.stringify({
                token:localStorage.getItem('token')
            })).then(res=>{
                if(res.data.code==='0000'){
                    this.infoList=res.data.data
                }else if(res.data.code==='6666'){
                    this.$toast.fail('请登录')
                    this.$router.push({
                        name:'login'
                    })
                }else {
                    this.$toast.fail(res.data.msg)
                }
            })
        },
        toAddress() {
            this.$router.push({
                name: "addresList"
            });
        },
        tomyInfo(){
            this.$router.push({
                name:'presonalInfo'
            })
        },
        toCoupon(){
            this.$router.push({
                name:'couponList'
            })
        },
        tointegral(){
            this.$router.push({
                name:'integralList'
            })
        }
    },
    components: {
        tabbar
    }
};
</script>
<style lang="less" scoped>
.myinfo {
    width: 100%;
    background-color: #fff;
    box-sizing: border-box;

    .infotop {
        height: 231px;
        background-color: #cd2518;
        box-sizing: border-box;
    }
    h3 {
        font-size: 18px;
        padding: 15px 0;
        color: #fff;
        font-family: "微软雅黑";
    }
    .headImgBox {
        text-align: center;
        // height: 120px;
        // position: relative;
    // height: 120px;
    position: relative;

    }
    .borderRadius1{
        margin: 0 auto;
        border-radius: 30px;
        width: 75px;
        height: 75px;
        margin-bottom: 15px;
        margin-top: 38px;
    }
    .borderRadius{
        margin: 0 auto;
        border-radius: 30px;
        width: 75px;
        height: 75px;
        // margin-bottom: 15px;
        // margin-top: 38px;
        background-color: #fff;
        position: absolute;
        top: 0;
        
    }
    .headImg {
        width: 75px;
        height: 75px;
        border-radius: 38px;
        
    }
    .infointegral {
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        flex-direction: row;
        position: relative;
        height: 50px;
    }
    .infocenter {
        flex: 1;
        margin: 0 80px;
    }
    .infoleft {
        width: 80px;
        position: absolute;
        left: 0;
    }
    .inforight {
        width: 80px;
        position: absolute;
        right: 0;
    }
    .leftText {
        font-size: 18px;
        color: #fff;
        font-weight: 700;
        letter-spacing: 1px;
    }
    .leftText1 {
        font-size: 14px;
        color: #fff;
        font-weight: 200;
        letter-spacing: 1px;
    }
    .infoPhone {
        color: #fff;
        font-size: 16px;
    }
    .infoMenu {
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        flex-direction: row;
        justify-content: start;
        height: 110px;
        // width: 345px;
        // background-color: #eee;
        border-bottom: 1px solid #dedede;
        width: 345px;
        margin: 0 auto;
        span {
            flex: 1;
            // height: 50px;
            font-size: 14px;
            color: #999;
            img {
                display: inline-block;
                width: 33px;
                height: 33px;
                margin-top: 28px;
            }
            .navText {
                // display: inline-block;
                margin-top: 17px;
            }
            // :nth-last-child(4){
            //     width: 38px;
            //     height: 32px;
            //     background-color: orange;
            // }
        }
    }
    .van-cell__title,
    .van-cell__value {
        color: #333333;
        font-size: 16px;
        font-weight: 500;
        border-bottom: #dedede;
    }
    .van-cell__value {
        text-align: right;
        font-size: 12px;
    }
    .van-cell {
        border-bottom: 1px solid #dedede;
        width: 345px;
        margin: 0 auto;
    }
    .infocontent {
        position: relative;
        .infocontentIcon {
            width: 17px;
            height: 19px;
            margin-right: 7px;
            margin-top: 2px;
        }
    }
}
</style>