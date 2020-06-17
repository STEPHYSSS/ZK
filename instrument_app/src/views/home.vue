<template>
    <div class="home">
        <div class="main">
            <van-nav-bar fixed title="首页">
                <template #title>
                    <span style="color:#fff">首页</span>
                </template>
            </van-nav-bar>

            <!-- <div class="bg">
                <div class="topBox">
                    <img class="imgStyle" src="@/assets/images/img@1232x.png" alt="">
                </div>
                    <van-swipe :autoplay="3000"  class="swipeBox" >
                        <van-swipe-item v-for="(item, index) in bannerList" :key="index" @click="toAdvertisement(item)">
                            <img v-if="item.image" class="imgStyle" v-lazy="`${reqApi.yiBSchool}${item.image}`" :src='`${reqApi.yiBSchool}${item.image}`'/>
                        </van-swipe-item>
                    </van-swipe>
                    
            </div>-->
            <div class="bg" style="position: relative">
                <div class="topBox">
                    <!-- <van-swipe :autoplay="5000">
                        <van-swipe-item
                            v-for="(item, index) in bannerList"
                            :key="index"
                            @click="toAdvertisement(item)"
                        >
                            <img
                               :src='`${reqApi.yiBSchool}${item.image}`'
                               v-lazy="`${reqApi.yiBSchool}${item.image}`"
                                :onerror="errImg2"
                                class="imgStyle"
                                key="item.id"
                            />
                        </van-swipe-item>
                    </van-swipe>-->
                </div>
                <!-- <div class="swipeBox"> -->
                <van-swipe :autoplay="3000" class="swipeBox">
                    <van-swipe-item
                        v-for="(item, index) in bannerList"
                        :key="index"
                        @click="toAdvertisement(item)"
                    >
                        <img :src="`${reqApi.yiBSchool}${item.image}`" class="imgStyle" />

                        <!-- <div>
                            {{`${reqApi.yiBSchool}${item.image}`}}
                        </div> -->
                    </van-swipe-item>
                </van-swipe>
                <!-- <van-swipe :autoplay="3000" class="swipeBox">
                    <van-swipe-item
                        v-for="(item, index) in img"
                        :key="index"
                        @click="toAdvertisement(item)"
                    >
                        <img
                            :src="item.img"
                            class="imgStyle"
                        />
                    </van-swipe-item>
                </van-swipe>-->
                <!-- </div> -->
                <!-- <div class="swipeBox">
                <van-swipe :autoplay="3000">
                    <van-swipe-item v-for="(image, index) in bannerList" :key="index">
                        <img :src="`${reqApi.yiBSchool}${image.image}`"/>
                    </van-swipe-item>
                </van-swipe>
                </div>-->
            </div>
            <div class="girdBox">
                <van-grid :border="false">
                    <van-grid-item
                        @click="toMenu(item)"
                        v-for="(item,index) in imgList"
                        :key="index+'a'"
                        :icon="item.img"
                        :text="item.title"
                    />
                </van-grid>
            </div>
        </div>
        <tabbar></tabbar>
    </div>
</template>
<script>
import tabbar from "./tabbar";
import qs from "qs";
export default {
    data() {
        return {
            errImg: 'this.src="' + require("@/assets/images/img@2x.png") + '"',
            imgList: [
                {
                    title: "考勤打卡",
                    img: require("@/assets/images/icon/kaoqin_icon@2x.png"),
                    url: "/clockIn"
                },
                {
                    title: "自评打分",
                    img: require("@/assets/images/icon/dafen_icon@2x.png"),
                    url: "/scroing"
                },
                {
                    title: "岗位标准",
                    img: require("@/assets/images/icon/gangwei_icon@2x.png"),
                    url: "/postStandard"
                },
                {
                    title: "申诉管理",
                    img: require("@/assets/images/icon/shensu_icon@2x.png"),
                    url: "/grievanceManagement"
                },
                {
                    title: "出勤休假",
                    img: require("@/assets/images/icon/chuqin_icon@2x.png"),
                    url: "/attendanceOnVacation"
                }
            ],
            bannerList: [],
            img: [
                { img: require("@/assets/images/img@2x.png") },
                { img: require("@/assets/images/camera_Icon@2x.png") }
            ]
        };
    },
    components: {
        tabbar
    },
    created() {
        this.getBannerList();
    },
    methods: {
        getBannerList() {
            this.$utils
                .post(this.reqApi.yiBSchool + "/mobile/index/banner")
                .then(res => {
                    if (res.data.code === "0000") {
                        this.bannerList = res.data.data;
                        this.bannerList.forEach(item => {
                            item.image=JSON.parse(item.image)
                            // alert(`${this.reqApi.yiBSchool}${item.image}`)
                        });
                    }
                });
        },
        toAdvertisement(item) {
            // return
            window.location.href = `https://${item.url}`;
        },
        toMenu(item) {
            this.$router.push(item.url);
        }
    }
};
</script>
<style scoped>
.home {
    width: 100%;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    flex-direction: column;
    box-sizing: border-box;
    height: 100%;
    /* background-color: pink; */
    padding-top: 46px;
}
.main {
    flex: 1;
    box-sizing: border-box;
    margin-bottom: 50px;
    background: #fff;
}
.box {
    /* background-color: pink; */
    width: 100%;
    height: 100%;
}
.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: skyblue;
}
.swipeBox {
    /* margin: 0 20px; */
    height: 200px;
    width: 90%;
    position: absolute;
    top: 130px;
    border-radius: 15px;
    box-sizing: border-box;
    margin: 0 20px;
    background-color: skyblue;
}
.girdBox {
    padding: 0 20px;
    padding-bottom: 50px;
    background-color: #fff;
}
.bg {
    /* height: 274px;
    box-sizing: border-box; */
    /* background-color: #eee; */
    /* box-sizing: border-box; */
    /* padding-top: 94px; */
    width: 100%;
    background: url("../assets/images/img@1232x.png") no-repeat;
    background-size: 100%;
    height: 340px;
    margin: 0 auto;
    margin-top: -1px;
    z-index: 55;
}
.topBox {
    /* background-color: #39a9ed; */
    /* background-image: url('../assets/images/img@1232x.png'); */
    height: 160px;
}
.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
}
.imgStyle {
    width: 100%;
    height: 100%;
}
.van-nav-bar {
    background-color: #4489fe;
}
.van-nav-bar__title {
    color: #fff !important;
}
</style>
