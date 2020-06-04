<template>
  <div class="home">
    <!-- <topNav></topNav> -->
    <!-- <van-nav-bar left-arrow :fixed="show"/> -->
    <div class="main">
      <van-nav-bar fixed title="首页" />
      <div class="bannerimg" style="position: relative">
        <!-- <img alt="Vue logo" src="../assets/homeimg/banner.png" /> -->
        <div style="width: 93%;margin: 0 auto;height: 160px;">
          <van-swipe :autoplay="5000">
            <van-swipe-item v-for="(item, index) in bannerImg" :key="index">
              <!-- <img  src="http://192.168.1.168:8080/image/771722f9d3174a46996414ce6f440d7e" class="imgwidth" /> -->
              <img :src="item.image | serverUrl(item.image)" :onerror="errImg2" class="imgwidth" key="item.id" @click="bannerTO(item.url)" />
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
      <!-- 九宫格 -->
      <div class="jiugongge">
        <van-grid>
          <van-grid-item v-for="(item, index) in modeList" :key="index" @click="toInfo(item.url)">
            <img :src="item.image | serverUrl(item.image)" :onerror="errImg"/>
            <span class="titlength">{{item.name}}</span>
          </van-grid-item>
        </van-grid>
      </div>
      <!-- 商品列表 -->
      <div>
        <p class="recommended">
          <img src="../assets/homeimg/img@2x.png" alt />
        </p>
        <van-grid :border="false" :column-num="2">
          <van-grid-item van-grid-item v-for="(item,index) in goodsList" :key="index">
            <div class="listImgBox" @click="togoodsInfo(item.code)">
              <!-- <img src="../assets/homeimg/img_5.png" class="goodsTip" /> -->

              <img :src="item.listImage | serverUrl(item.image)" :onerror="errImg" class="imgWidth2" />

              <p class="goodsTit">{{item.name}}</p>

              <div class="goodsPrice">
                <p class="price">￥{{item.salesPrice}}</p>
                <p class="buy"></p>
              </div>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
    <tabbar></tabbar>
  </div>
</template>

<script>
// @ is an alias to /src
import qs from "qs";
import tabbar from "@/components/common/tabbar.vue";
// import topNav from "@/components/common/topNav.vue";
export default {
  name: "home",
  data() {
    return {
      errImg: 'this.src="' + require('@/assets/homeimg/img22@2x.png') + '"',
      errImg2: 'this.src="' + require('@/assets/homeimg/banner.png') + '"',
      show: true,
      bannerImg: [], //轮播数据
      modeList: [], //九宫格数据
      goodsList: [] //商品列表
    };
  },
  created() {
    this.getHome();
  },
  methods: {
    getHome() {
      this.$axios({
        url: "shop/index",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({})
      }).then(res => {
        if (res.data.code == "0000") {
          this.bannerImg = res.data.data.bannerList;
          this.modeList = res.data.data.modelList;
          this.goodsList = res.data.data.goodsList;
        }
      });
    }, //跳转详情页面
    togoodsInfo(value) {
      this.$router.push({
        path: "/goodsDetail",
        query: {
          code: value,
          tips:"goodsInfo"
        }
      });
    },
    toInfo(url) {
      window.location.href = url;
    },
    bannerTO(url) {
      window.location.href = url;
    }
  },
  // filters: {
  //   filterImgSrc(value) {
  //     return "http://192.168.1.168:8080" + value;
  //   }
  // },
  components: {
    tabbar
    // topNav
  }
};
</script>
<style scoped>
/* 设置页面滑动的动画 */
.v-enter {
  opacity: 0;
  transform: translateX(100%);
}
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
.home {
  width: 100%;
  display: flex;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;
  margin-top: 46px;
}
.main {
  flex: 1;
  box-sizing: border-box;
  margin-bottom: 50px;
  background: #f5f5f5;
}
.header {
  /* height: 39px; */
  box-sizing: border-box;
}
.bottom {
  height: 43px;
  box-sizing: border-box;
}
.van-grid-item__content::after {
  border-width: 0 0 0 0 !important;
}
.jiugongge{
  margin: 20px 0;
}
.jiugongge img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.jiugongge span {
  font-size: 12px;
  padding-top: 10px;
}

.bannerimg {
  width: 100%;
  background: url("../assets/homeimg/bg@2x.png") no-repeat;
  background-size: 100%;
  height: 160px;
  margin: 0 auto;
}
.bannerimg .imgwidth {
  width: 345px;
  height: 160px;
}
.recommended {
  width: 60%;
  margin: 0 auto;
}
.recommended img {
  width: 100%;
}
.listImgBox {
  width: 167.5px;
  position: relative;
  margin: 5px 0;
  background-color: #fff;
  border-radius: 3px;
}
.listImgBox .imgWidth2 {
  width: 100%;
  height: 134px;
}
.listImgBox .goodsTip {
  position: absolute;
  top: 0;
  left: 0;
}
.goodsTit {
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 95.5px;
  text-align: left;
  box-sizing: border-box;
  padding-left: 5px;
}
.goodsPrice {
  width: 100%;
  display: flex;
  margin-top: 10px;
}
.goodsPrice .price {
  display: inline-block;
  flex: 3;
  font-size: 16px;
  text-align: left;
  height: 30px;
  color: #f23a3a;
  box-sizing: border-box;
  padding-left: 5px;
}
.buy {
  display: inline-block;
  /* width: 25px;
  height: 25px; */
  position: relative;
  font-size: 10px;
  color: #fff;
}
.buy::before {
  content: "购买";
  position: absolute;
  width: 30.7px;
  height: 30px;
  line-height: 30px;
  border-radius: 50%;
  top: -4px;
  right: 5px;
  background-color: rgba(0, 0, 0, 1);
}
.titlength{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 50px;
}
</style>
