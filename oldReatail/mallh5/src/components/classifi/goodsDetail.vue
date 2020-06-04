<template>
  <div class="goodsDetail" id="boxFixed">
    <!-- <h1>This is an about page</h1> -->
    <van-nav-bar fixed left-arrow :title="goodsInfo.name" @click-left="onClickLeft"/>
    <div>
      <img v-show="flag" src="@/assets/homeimg/img22@2x.png" style="width:100%;height:100%">
    </div>
    <div class="Swipe" id="Swipe" v-show="flag1">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in goodsInfo.detailImage" :key="index">
          <!-- <img :src="'http://192.168.1.202:8080' + image" :onerror="errImg" class="imgwidth" /> -->
          <img :src="image | serverUrl(image)" :onerror="errImg" class="imgwidth" >
        </van-swipe-item>
        <!-- :onerror="errImg" -->
      </van-swipe>
    </div>
    <!-- <div class="activeTit">
      <h3>双十一全球购物节</h3>
    </div> -->
    <div class="goodsTitle">
      <div class="goodsBox">
        <p>
          <span class="xianjia">￥{{goodsInfo.salesPrice}}</span>
          <!-- <span class="yuanjia">￥{{goodsInfo.salesPrice}}</span> -->
        </p>
        <p class="goosInfoT">{{goodsInfo.name}}</p>
        <p class="flexBox">
          <span>快递：00.00</span>
          <!-- <span>销量：200</span> -->
        </p>
        <p class="actTit">活动：上不封顶上不封顶</p>
      </div>
    </div>
    <div class="spac">
      <div class="canshu">
        <p class="guige"></p>
        <p class="guigecanshu">规格参数</p>
        <thead>
          <tbody>
            <tr class="oneUnit">
              <td class="tdSt">单位</td>
              <td class="tdSt2">{{goodsInfo.unit}}</td>
            </tr>
            <tr>
              <td class="tdSt">温层</td>
              <td class="tdSt2">{{goodsInfo.temperature}}</td>
            </tr>
            <tr>
              <td class="tdSt">规格</td>
              <td class="tdSt2">{{goodsInfo.spec}}</td>
            </tr>
          </tbody>
        </thead>
      </div>
    </div>
    <div class="imgInfo">
      <p class="guige"></p>
      <p class="guigecanshu">商品详情</p>
      <div class="imgLazy">
        <p v-html="goodsInfo.goodsDetail"></p>
      </div>
    </div>
    <div style="height:50px;">
      <van-goods-action>
        <van-goods-action-icon icon="cart-o" text="购物车" @click="onClickIcon" :info="info"/>
        <van-goods-action-button type="warning" text="加入购物车" :disabled="disabled" @click="onClickButton(goodsInfo.code)" />
        <van-goods-action-button type="danger" :text="stock" :disabled="disabled" @click="buyNow(goodsInfo.code)" />
      </van-goods-action>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "goodsDetail",
  data() {
    return {
      flag:false,
      flag1:true,
      errImg: 'this.src="' + require("@/assets/homeimg/img22@2x.png") + '"',
      images: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg"
      ],
      imageList: [
        //图片懒加载
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg"
      ],
      info:0,
      code:this.$route.query.code,
      goodsInfo:{},
      token:localStorage.getItem("token"),
      toHomeFlag:this.$route.query.goodsInfo,
      title: this.$route.query.label,
      stock:"",
      disabled:false
    };
  },
  created(){
    this.getgoodsDetail();
    console.log(this.$homeScroll);
  },
  methods: {
    getgoodsDetail(){
      this.$axios({
        url: "shop/goods/detail",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          goodsCode:this.code
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.goodsInfo = res.data.data;
          if(this.goodsInfo.mallStock != '0'){
            this.stock = "立即购买"
          }else{
            this.stock = "售罄";
            this.disabled = !this.disabled;
          }
          if(this.goodsInfo.detailImage !=null && this.goodsInfo.detailImage !=""){
            this.goodsInfo.detailImage= JSON.parse(this.goodsInfo.detailImage)
          }else{
            this.flag=true;
            this.flag1=false;
          }
        }
      });
    },
    onClickIcon() {
      this.$router.push({
        name: "Card",
        query:{
          tps:"Bar"
        }
      });
    },
    // 加入购物车
    onClickButton(value) {
      this.info = this.info +1;
      this.$axios({
        url: "shop/cart/add",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token:this.token,
          goodsCode:value,
          count:this.info
        })
      }).then(res => {
        if (res.data.code == "0000") {
          // console.log(res.data)
        }else if (res.data.code == "6666") {
          this.$toast("请登录");
          const timer = setTimeout(() => {
            clearTimeout(timer);
            this.$router.push({
              name: "login"
            });
          }, 1000);
        }else{
          this.$toast(res.data.msg);
        }
      });
    },
    // 立即购买
    buyNow(value){
      if(!this.token){
        this.$toast("请登录");
        this.$router.push({
          name: "login"
        });
      }else{
        sessionStorage.setItem('goodsCode',value)
        let buyNowFalg = "buyNow"
        sessionStorage.setItem('typefg',buyNowFalg);        
        this.$router.push({
          name: "buyNow",
          query:{
            goodsCode : sessionStorage.getItem('goodsCode'),
            typs:sessionStorage.getItem('typefg')
          }
        });
      }
      
      
    },
    // 返回按钮
    onClickLeft() {
      if(this.toHomeFlag == "goodsInfo"){
        this.$router.push({
          name: "Home"
        });
      }else if(this.toHomeFlag == "buyNow"){
        this.$router.push({
          name: "Home"
        });
      }else{
        this.$router.go(-1);
      }
    },
    handleScroll() {

    }
  },
  mounted(){
    window.addEventListener('scroll',this.handleScroll)
  },
  // activated (){
  //   //this.$nextTick()异步执行dom刷新
  //   this.$nextTick(() => {
  //       console.log(this.$homeScroll);
  //       window.scrollTop(0, this.$homeScroll);
  //   })
  // },
   

  //离开路由时
  beforeRouteLeave(to, from, next){
    console.log(to);
    //全局变量homeScroll默认为0 离开页面时 记录当前的页面滚动值
    this.$homeScroll = document.documentElement.scrollTop || document.body.scrollTop;
    //需要执行next函数 否则不起作用
    next();
  },
};
</script>
<style scoped>
.goodsDetail {
  background: rgba(245, 245, 245, 1);
}
.Swipe {
  height: 329px;
}
#Swipe{
  margin-top:46px;
}
.van-swipe {
  height: 100%;
}
.activeTit {
  height: 50.5px;
  background: rgba(255, 255, 255, 1);
}
.imgwidth {
  width: 100%;
  height: 100%;
}
.van-swipe-item {
  height: 100%;
}
.van-goods-action {
  z-index: 10;
}
/* 文字 */

.goodsTitle {
  height: 136px;
  width: 100%;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);
}
.goodsTitle .goodsBox {
  margin: 0 25px 0 15px;
  width: 334px;
  text-align: left;
}
.xianjia {
  display: inline-block;
  height: 19px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 800;
  color: rgba(252, 46, 46, 1);
  line-height: 22px;
}
.yuanjia {
  display: inline-block;
  height: 9px;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
  line-height: 22px;
  text-decoration: line-through;
  margin-left: 8px;
}
.flexBox {
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
}
.flexBox span,
.actTit {
  color: rgba(51, 51, 51, 1);
  font-size: 12px;
}
.goosInfoT {
  width: 334px;
  height: 28px;
  font-size: 16px;
  margin: 10px 0;
  background: rgba(255, 255, 255, 1);
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.spac {
  margin: 10px 0;
  height: 126px;
  width: 100%;
  background: rgba(255, 255, 255, 1);
}
.spac .canshu {
  margin: 0 25px 0 15px;
  width: 334px;
  text-align: left;
}
.canshu .guige,
.imgInfo .guige {
  width: 3px;
  height: 12px;
  background: rgba(252, 46, 46, 1);
  display: inline-block;
  margin-right: 10px;
}
.guigecanshu {
  display: inline-block;
  /* height: 15px; */
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  line-height: 24px;
}
.imgInfo {
  background: rgba(255, 255, 255, 1);
  width: 100%;
  height: 100%;
  text-align: left;
}
.imgInfo .guige {
  margin-left: 15px;
}
.imgLazy img {
  width: 100%;
}
.imgLazy{
  font-size: 12px;
  margin:0 0.66667rem;
}
/* 详情里的表格样式 */
tbody{
  font-size: 12px; 
}
.canshu tr{
  height: 25px;
  line-height: 25px;
  display: block;
  border-bottom:1px solid rgba(235,235,235,1);
}
.tdSt{
  width: 80px;
  padding-left: 13px;
  box-sizing: border-box;
}
.tdSt2{
  width: 300px;
}
/* .van-swipe-item:nth-child(2){
    height: 100%;
} */
</style>
