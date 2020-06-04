<template>
  <div class="buyNow">
    <van-nav-bar title="确认订单" fixed left-arrow @click-left="onClickLeft" />
    <div class="address" @click="addressBtn">
      <div class="flexbox" v-if="address != null">
        <div class="flexboxL">
          <img src="@/images/dizhiicon@2x.png" alt />
        </div>
        <div class="flexboxR" v-if="this.id">
          <span class="addressName">{{address2.name}}</span>
          <span style="color:#999999">{{address2.phone}}</span>
          <br />
          <p>{{address2.province}}{{address2.city}}{{address2.area}}{{address2.address}}</p>
        </div>
        <div class="flexboxR" v-else>
          <span class="addressName">{{address.name}}</span>
          <span style="color:#999999">{{address.phone}}</span>
          <br />
          <p>{{address.province}}{{address.city}}{{address.area}}{{address.address}}</p>
        </div>
      </div>
      <p v-else class="addressBtn" @click="addressBtn">+ 添加收货地址</p>
      <van-icon name="arrow" class="editAddress" @click="addressBtn" />
    </div>
    <div>
      <div class="buyShopList">
        <p style="font-size:12px;line-height: 44px;">
          <img
            style="width:14;height:12px;padding-right:5px"
            src="../../assets/homeimg/icon@2x.png"
          />自营商品
        </p>
        <div class="shopListBox" v-for="(item,index) in cartListInfo" :key="index">
          <div class="shopListImg">
            <img :src="item.listImage | serverUrl(item.image)" :onerror="errImg" class="shangpImg" />
          </div>
          <div class="shopListTitle">
            <p class="buyShopInfo">{{item.goodsName}}</p>
            <div class="goodsPrice">
              <p class="buyPrice">￥{{item.finalPrice}}</p>
              <p class="price">X{{item.count}}</p>
            </div>
          </div>
        </div>
        <div class="goodsPrice">
          <p class="sptitle">商品总价</p>
          <p class="price">￥{{com}}</p>
        </div>
        <div class="goodsPrice">
          <p class="sptitle">运费</p>
          <p class="price">￥00.00</p>
        </div>
        <div class="goodsPrice">
          <p class="sptitle">优惠券</p>
          <router-link to="/couponList" style="color:#333333">
            <p class="price">请选择&nbsp;></p>
          </router-link>
        </div>
        <div class="goodsPrice">
          <p class="sptitle">积分（可抵扣￥00.00）</p>
          <p class="price">
            <van-switch
              v-model="checked"
              size="15px"
              active-color="#07c160"
              inactive-color="#ee0a24"
            />
          </p>
        </div>
      </div>
      <div class="paybox">
        <div class="payleft">
          <span style="color:#999999">
            共{{com2}}件，合计：
            <span style="color:#FC2E2E">￥{{com}}</span>
          </span>
        </div>
        <div class="jiesuan">
          <button @click="submitOrders">提交订单</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  data() {
    return {
      errImg: 'this.src="' + require("@/assets/homeimg/img22@2x.png") + '"',
      chosenAddressId: "1",
      list: [],
      token: localStorage.getItem("token"),
      // typs: this.$route.query.typs,
      typs:sessionStorage.getItem('typefg'),
      checked: true,
      code: sessionStorage.getItem("goodsCode"),
      code2: sessionStorage.getItem("goodsCode2"),
      cartListInfo: [], //购物车列表
      address: {}, //地址
      address2:{},
      score: "", //积分
      goodsSet: [],
      orderCode: "",
      id: sessionStorage.getItem("id") ,
      country:''
    };
  },
  created() {
    this.getBuyInfo();
    this.getDetail();//地址
  },
  methods: {
    getBuyInfo() {
      if (this.typs === "buyNow") {
        this.$axios({
          url: "shop/goods/buy",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            token: this.token,
            goodsCode: this.code
          })
        }).then(res => {
          if (res.data.code == "0000") {
            this.cartListInfo = res.data.data.cartList;
            this.address = res.data.data.address;
            this.score = res.data.data.score;
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
      } else if(this.typs === "cardNow"){
        this.$axios({
          url: "shop/cart/settle",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            token: this.token,
            idSet: this.code2
          })
        }).then(res => {
          if (res.data.code == "0000") {
            this.cartListInfo = res.data.data.cartList;
            this.address = res.data.data.address;
            this.score = res.data.data.score;
          } else {
            this.$toast(res.data.msg);
          }
        });
      }
    },
    // 增加地址
    addressBtn() {
      // this.$router.push({
      //   name: "addresList",
      //   query: {
      //     code: sessionStorage.getItem("goodsCode")
      //   }        
      // });
      if(this.typs === "buyNow"){
        this.$router.push({
        name: "addresList",
        query: {
          code: sessionStorage.getItem("goodsCode")
        }        
      });
      }else if(this.typs === "cardNow"){
        this.$router.push({
        name: "addresList",
        query: {
          code: sessionStorage.getItem("goodsCode2")
        }        
      });
      }
    },
    getDetail() {
      if (this.id) {
        this.$axios
          .post(
            "/shop/my/address/detail",
            this.$qs.stringify({
              token: localStorage.getItem("token"),
              id: this.id
            })
          )
          .then(res => {
            if (res.data.code === "0000") {

              this.address2 = res.data.data;
              
            }
          });
      } else {
        return;
      }
    },
    onClickLeft() {
      if (this.typs == "buyNow") {
        this.$router.push({
          name: "goodsDetail",
          query: {
            code: sessionStorage.getItem("goodsCode"),
            goodsInfo:"buyNow"
          }
        });
      } else {
        this.$router.push({
          name: "Card",
          query: {
            code: sessionStorage.getItem("goodsCode")
          }
        });
      }
    },
    // 提交订单
    submitOrders() {
      this.goodsSet = this.cartListInfo.map(item => {
        return {
          code: item.goodsCode,
          number: item.count
        };
      });
      if (this.address == null) {
        this.$toast("请添加地址信息");
      } else {
        this.$axios({
          url: "shop/order/create",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            token: localStorage.getItem("token"),
            addressId: this.address.id,
            goodsSet: JSON.stringify(this.goodsSet)
          })
        }).then(res => {
          if (res.data.code == "0000") {
            //提交订单跳转支付页面
            this.$router.push({
              name: "pay",
              query: {
                orderCode: res.data.data,
                price: this.com,
                typs: this.typs
              }
            });
          } else if (res.data.code == "6666") {
            this.$toast("请登录");
            this.$router.push({
              name: "login"
            });
          } else {
            this.$toast(res.data.msg);
          }
        });
      }
    }
  },
  computed: {
    com() {
      let num = 0;
      for (const i of this.cartListInfo) {
        num += i.salesPrice * i.count;
      }
      return parseFloat(num).toFixed(2);
    },
    com2() {
      let countw = 0;
      for (const i of this.cartListInfo) {
        countw += i.count;
      }
      return countw;
    }
  }
};
</script>

<style lang="css" scoped>
.buyNow {
  height: 100%;
  width: 100%;
  background: rgba(245, 245, 245, 1);
  padding-top: 46px;
  padding-bottom: 50px;
}
.buyNow .van-address-list__add {
  display: none;
}
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
}
.flexboxL{
  padding-top: 8px;
}
.flexboxL img {
  width: 32px;
  height: 32px;
}
.flexboxR p {
  margin-top: 10px;
}
.addressName {
  font-size: 14px;
  font-weight: 700;
  padding-right: 10px;
  display: inline-block;
}
.address .van-radio {
  text-align: left;
}
.address .van-address-list {
  padding: 0;
}
.buyShopList {
  padding: 1px 16px;
  text-align: left;
  background: #fff;
  margin-top: 10px;
}
.shopListTitle .buyShopInfo {
  width: 206px;
  height: 40px;
  font-size: 12px;
  margin: 10px 0;
  text-align: left;
  background: rgba(255, 255, 255, 1);
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  padding-left: 5px;
}
.shopListImg img {
  width: 96px;
  height: 76px;
}
.goodsPrice {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  margin: 10px 0;
}
.goodsPrice .buyPrice {
  color: #fc2e2e;
  padding-left: 5px;
}
/* 文字 */
.shopListBox {
  display: flex;
}
.shopListImg {
  width: 96px;
  height: 76px;
  border-radius: 5px 5px 5px 5px;
}
.shopListTitle {
  flex: 2;
}
.goodsTitle {
  height: 136px;
  width: 100%;
  background: rgba(255, 255, 255, 1);
}
.goodsTitle .goodsBox {
  margin: 0 25px 0 15px;
  width: 334px;
  text-align: left;
}

.paybox {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
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
.jiesuan button {
  color: #fff;
  border: none;
  font-size: 15px;
  width: 92px;
  height: 43px;
  background: rgba(252, 46, 46, 1);
}
.addressBtn {
  font-size: 12px;
  position: absolute;
  top: 33%;
  left: 37%;
  height: 30px;
  border: 1px solid;
  line-height: 30px;
  padding: 0 10px;
}
.editAddress {
  position: absolute;
  right: 3%;
  font-size: 18px;
  top: 42%;
}
</style>