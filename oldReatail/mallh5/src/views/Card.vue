<template>
  <div class="Card">
    <van-nav-bar v-if="this.bar != 'Bar'"
      title="购物车"
      :right-text="this.hideBuy ? '管理':'完成'"
      
      @click-right="onClickRight"
      
    />
    <van-nav-bar v-else
      title="购物车"
      left-text
      :right-text="this.hideTabbar ? '管理':'完成'"
      left-arrow
      @click-right="onClickRight"
      @click-left="onClickLeft"
    />
    <!-- 商品列表 -->
    <div class="paddingB200" v-if="noShop">
      <!-- 第一个店铺 -->
      <div class="oneShop">
        <div class="shoptitle">
          <van-checkbox
            id="checked"
            checked-color="#fc2e2e"
            icon-size="15px"
            v-model="isCheckAll"
            @click="checkShop"
          ></van-checkbox>
          <p style="font-size:12px;line-height: 44px;display: inline-block;margin-left: 7px;">
            <img style="width:14;height:12px;padding-right:5px" src="@/assets/homeimg/icon@2x.png" />自营商品
          </p>
        </div>
        <div v-for="(pros,index) in carts" :key="index">
          <div class="shangpin">
            <van-checkbox
              ref="checkbox"
              id="checked2"
              checked-color="#fc2e2e"
              icon-size="15px"
              v-model="pros.index"
              @change="ischeck($event, pros)"
            ></van-checkbox>
            <div class="shangpinLeft">
              <img
                :src="pros.listImage | serverUrl(pros.listImage)"
                :onerror="errImg"
                alt
                class="shangpImg"
              />
            </div>
            <div class="shangpinRight">
              <p class="sptitle">{{pros.goodsName}}</p>
              <div class="goodsPrice">
                <p class="price">￥{{pros.salesPrice | totalprice(pros.count)}}</p>
                <div class="buyCount">
                  <van-stepper
                    v-model="pros.count"
                    @plus="update(pros,1)"
                    @minus="update(pros,2)"
                    @blur="shoudong(pros,3)"
                    style="height:21px;"
                    id="slep"
                    input-width="25px"
                    button-size="21px"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="paybox" v-show="hideBuy">
            <div class="payleft">
              <van-checkbox
                id="checked"
                checked-color="#fc2e2e"
                icon-size="15px"
                v-model="isCheckAll"
                @click="checkShop"
              ></van-checkbox>
              <b>全选</b>
            </div>
            <div class="allPrice">
              <p>合计：￥{{ com }}</p>
              <p>优惠：￥00.00（不含运费）</p>
            </div>
            <div class="jiesuan">
              <button @click="jiesuan">结算</button>
            </div>
          </div>
        </div>
      </div>
      <!-- 结算删除 -->
      <div class="paybox" v-show="hideDel">
        <div class="payleft">
          <van-checkbox
            id="checked"
            checked-color="#fc2e2e"
            icon-size="15px"
            v-model="isCheckAll"
            @click="checkShop"
          ></van-checkbox>
          <b>全选</b>
        </div>
        <div class="jiesuan">
          <button @click="delCard">删除</button>
        </div>
      </div>
      <!-- 从商品详情直接过来展示 -->
      <div class="paybox22" v-show="hideDel2">
        <div class="payleft22">
          <van-checkbox
            id="checked"
            checked-color="#fc2e2e"
            icon-size="15px"
            v-model="isCheckAll"
            @click="checkShop"
          ></van-checkbox>
          <b>全选</b>
        </div>
        <div class="jiesuan">
          <button @click="delCard">删除</button>
        </div>
      </div>
    </div>
    <div class="paddingB200" v-if="showBuyCard">
      <img src="../assets/homeimg/noshop.png" style="margin-top:25%" />
      <p class="kongkong">购物车空空如也~~</p>
      <router-link to="/Home">
        <van-button type="default" style>去逛逛</van-button>
      </router-link>
      <div class="hide">
      </div>
    </div>
    <tabbar v-if="hideTabbar1"></tabbar>
    <div class="paybox22" v-if="hideTabbar">
      <div class="payleft22">
        <van-checkbox
          id="checked"
          checked-color="#fc2e2e"
          icon-size="15px"
          v-model="isCheckAll"
          @click="checkShop"
        ></van-checkbox>
        <b>全选</b>
      </div>
      <div class="allPrice22">
        <p>合计：￥{{ com }}</p>
        <p>优惠：￥00.00（不含运费）</p>
      </div>
      <div class="jiesuan">
        <button @click="jiesuan">结算</button>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
import tabbar from "@/components/common/tabbar.vue";
export default {
  name: "Card",
  data() {
    return {
      carts: [],
      errImg: 'this.src="' + require("@/assets/homeimg/img22@2x.png") + '"',
      token: localStorage.getItem("token"),
      noShop: true, //没有商品的时候隐藏
      idSet: [], //购物车id数组
      allCountPrice: "",
      showBuyCard: false,
      checked: false,
      isCheckAll: false, //是否全选
      hideBuy: true, //点击管理隐藏结算
      hideDel: false, //点击完成隐藏删除
      allPrice: 0, //所有价格
      allShops: 0, //被选中的商店数量
      allCount: 0, //被选中的产品数量
      numType: "",
      id: "",
      goodsSet: [],
      comP: [],
      bar:this.$route.query.tps,
      hideTabbar:false,
      hideTabbar1:true,
      hideDel2:false
    };
  },
  created() {
    if (this.token == "") {
      this.noShop = !this.noShop;
      this.showBuyCard = !this.showBuyCard;
    } else {
      this.getCartList();
    }
    if(this.bar == "Bar"){
      this.hideTabbar = !this.hideTabbar;
      this.hideTabbar1 = !this.hideTabbar1;
      this.hideBuy = !this.hideBuy;
      // this.hideDel = !this.hideDel;
    }
  },
  components: {
    tabbar
  },

  methods: {
    // 购物车列表
    getCartList() {
      this.$axios({
        url: "shop/cart/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: this.token
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.carts = res.data.data;
          if(res.data.data.length<=0){
            this.noShop = !this.noShop;
            this.showBuyCard = !this.showBuyCard;            
          }else{
            this.carts = res.data.data;
          }
        } else if (res.data.code == "6666") {
          this.$toast("请登录");
          this.$router.push({
            name: "login"
          });
        } else {
          this.$toast(res.data.msg);
        }
      });
    },
    // 增加按钮，减少按钮
    update(ids, type) {
      if (type == "1") {
        this.numType = "A";
        ids.count++;
      } else if (type == "2") {
        this.numType = "S";
        ids.count--;
      }
      this.id = ids.id;
      this.plusFunc();
    },
    shoudong(ids, type) {
      if (type == "3") {
        this.numType = "U";
      }
      this.id = ids.id;
      this.allPrice = ids.count;
      this.plusFunc();
    },
    plusFunc() {
      this.$axios({
        url: "shop/cart/count/update",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: this.token,
          id: this.id,
          type: this.numType,
          count: this.allPrice
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.goodsSet = res.data.data;
        } else if (res.data.code == "6666") {
          this.$toast("请登录");
          const timer = setTimeout(() => {
            clearTimeout(timer);
            this.$router.push({
              name: "login"
            });
          }, 2000);
        } else {
          this.$toast(res.data.msg);
        }
      });
    },
    // 管理按钮
    onClickRight() {
      this.idSet = [];
      this.getCartList();
      if(this.bar == "Bar"){
        this.hideTabbar = !this.hideTabbar;
        this.hideDel2 = !this.hideDel2;
      }else{
        this.hideBuy = !this.hideBuy;
        this.hideDel = !this.hideDel;
      }
    },
    //选择单个商品
    ischeck(boo, arrId) {
      if (boo == true) {
        this.idSet.push(arrId.id);
        this.comP.push(arrId);
      } else {
        this.comP.forEach((item, index) => {
          if (item.id === arrId.id) {
            this.idSet.splice(index, 1);
            this.comP.splice(index, 1);
          }
        });
      }
    },
    // 全选
    checkShop() {
      let boo;
      for (const i of this.$refs.checkbox) {
        if (!i.checked) boo = true;
        else boo = false;
      }
      for (const i of this.$refs.checkbox) {
        i.checked = boo;
      }
    },
    // 结算
    jiesuan() {
      if (this.idSet.length <= 0) {
        this.$toast("请选择商品");
      } else {
        sessionStorage.setItem("goodsCode2", JSON.stringify(this.idSet));
         let buyNowFalg = "cardNow"
        sessionStorage.setItem('typefg',buyNowFalg);     
        this.$router.push({
          name: "buyNow",
          typs:sessionStorage.getItem('typefg')
        });
      }
    },
    // 删除
    delCard() {
      this.$axios({
        url: "shop/cart/delete",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: this.token,
          idSet: JSON.stringify(this.idSet)
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.getCartList();
          this.comP = [];          
        } else {
          this.$toast(res.data.msg);
        }
      });
    },
    // 返回按钮
    onClickLeft() {
      this.$router.go(-1)
      // this.$router.push(
      //   {
      //     name:'goodsDetail',
      //     query:{
      //       code:this.$route.query.code
      //     }
      //   }
      // );    
    }
  },
  computed: {
    com() {
      let num = 0;
      for (const i of this.comP) {
        num += i.salesPrice * i.count;
      }
      return parseFloat(num).toFixed(2);
    }
  },
  filters: {
    //单件商品的价格 × 数量
    totalprice(val, count) {
      let realVal = parseFloat(val * count).toFixed(2);
      return realVal;
    }
  }
};
</script>
<style scoped>
.Card{
  background: #fff;
}
.Card .van-button {
  line-height: 30px;
  font-size: 14px;
  width: 96px;
  height: 34px;
  border: 1px solid rgba(153, 153, 153, 1);
}
.Card .hide {
  background: #fff;
  height: 50px;
}
.Card .hide .van-submit-bar {
  position: fixed;
  bottom: 50px;
  left: 0;
  z-index: 100;
  width: 100%;
}
.Card .hide .van-submit-bar__price {
  color: rgba(51, 51, 51, 1);
}
/* .Card .hide .van-button {
  font-size: 15px;
  background: rgba(153, 153, 153, 1);
  border: 1px solid rgba(220, 220, 220, 1);
  height: 43px;
} */
.kongkong {
  height: 12px;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  line-height: 18px;
  margin: 18px 0 40px 0;
}
.paddingB200 {
  box-sizing: border-box;
  overflow: auto;
  padding-bottom: 106px;
}
.paddingB200 .oneShop {
  margin: 10px 16px;
}
.paddingB200 .check {
  width: 10px;
  border: 15px;
  border: 1px solid red;
  height: 10px;
  border-radius: 20px;
  display: inline-block;
}
.shoptitle {
  text-align: left;
  font-size: 12px;
  position: relative;
}
.shopTitle1 {
  margin-left: 8px;
  position: absolute;
}
.shangpImg {
  width: 96px;
  height: 76px;
}
.shangpin {
  width: 100%;
  display: flex;
  font-size: 12px;
  margin: 15px 0;
}
.shangpinLeft {
  flex: 1;
}
.shangpinRight {
  flex: 2;
  text-align: left;
}
.sptitle {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.goodsPrice {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.goodsPrice .price {
  display: inline-block;
  font-size: 12px;
  color: #fc2e2e;
  text-align: left;
}
.goodsPrice .buyCount {
  display: inline-block;
  width: 76px;
  height: 21px;
  text-align: right;
}
.goodsPrice .buyCount input {
  width: 34px;
  text-align: center;
}
.paybox {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  position: fixed;
  bottom: 50px;
  left: 0;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px -2px 11px 0px rgba(149, 143, 173, 0.1);
}
.paybox .payleft {
  flex: 1;
  text-align: left;
  box-sizing: border-box;
  margin-left: 16px;
  font-size: 12px;
  color: #333333;
  line-height: 42px;
}
.payleft b {
  margin-left: 5px;
  font-weight: 500;
}
.paybox .allPrice {
  text-align: left;
  font-size: 12px;
  line-height: 20px;
}
.paybox .allPrice p:first-child {
  padding-top: 3px;
}
.jiesuan button {
  color: #fff;
  border: none;
  font-size: 15px;
  width: 92px;
  height: 43px;
  background: rgba(252, 46, 46, 1);
}
/* 全选按钮设置 */
#checked,
#checked2,
.shopTitle1,
#checked22,
#checked11 {
  display: inline-block;
}
#checked2 {
  padding-top: 30px;
}
.van-checkbox__icon--round .van-icon {
  width: 14px;
  height: 14px;
}
.van-stepper__input {
  margin: 0;
  padding: 0;
  background-color: #ffffff;
  border-top: 1px solid #d2d2d2;
  border-bottom: 1px solid #d2d2d2;
}
.van-stepper__minus,
.van-stepper__plus {
  background-color: #ffffff;
  border: 1px solid #d2d2d2;
}
/* 展示 */
.paybox22 {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  position: fixed;
  bottom: 0px;
  left: 0;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px -2px 11px 0px rgba(149, 143, 173, 0.1);
}
.paybox22 .payleft22 {
  flex: 1;
  text-align: left;
  box-sizing: border-box;
  margin-left: 16px;
  font-size: 12px;
  color: #333333;
  line-height: 42px;
}
.payleft22 b {
  margin-left: 5px;
  font-weight: 500;
}
.paybox22 .allPrice22 {
  text-align: left;
  font-size: 12px;
  line-height: 20px;
}
.paybox22 .allPrice22 p:first-child {
  padding-top: 3px;
}
</style>