<template>
  <div class="pay">
    <van-nav-bar title="支付" left-arrow @click-left="onClickLeft" />
    <div class="paysty">
      <span>支付剩余时间：</span>
      <van-count-down ref="countDown" :time="time" @finish="finished" />
      <!-- {{time}} -->
      <p class="payPrice">￥{{priceFlag}}</p>
    </div>
    <div class="choosePay">
      <img src="../../assets/homeimg/weixin_icon@2x.png" />
      <span class="payName">微信支付</span>
      <van-radio-group v-model="payChannel" icon-size="15px" class="radioSty">
        <van-radio name="wechatPay" checked-color="#fc2e2e"></van-radio>
      </van-radio-group>
    </div>
    <div class="choosePay">
      <img src="../../assets/homeimg/zhifubao_icon@2x.png" style="padding-right: 8px;" />
      <span class="payName">支付宝</span>
      <van-radio-group v-model="payChannel" icon-size="15px" class="radioSty">
        <van-radio name="alipay" checked-color="#fc2e2e"></van-radio>
      </van-radio-group>
    </div>
    <div class="choosePay">
      <img style="height:19px;padding-top:14px;" src="../../assets/homeimg/yinlian_icon@2x.png" />
      <span class="payName">中国银行信用卡尾号xxxx</span>
      <van-radio-group v-model="payChannel" icon-size="15px" class="radioSty">
        <van-radio name="unionPay" checked-color="#fc2e2e"></van-radio>
      </van-radio-group>
    </div>
    <van-popup v-model="show" position="bottom" :style="{ height: '43%' }">
      <van-password-input
        :value="value"
        :length="6"
        :focused="showKeyboard"
        @focus="showKeyboard = true"
      />
      <van-number-keyboard
        :show="showKeyboard"
        @blur="show = false"
        @input="onInput"
        @delete="onDelete"
      />
    </van-popup>
    <van-loading size="24px" v-show="showLoading" vertical style="z-index:999">支付中...</van-loading>
    <van-submit-bar button-text="确认支付" @submit="onSubmit" v-show="hidePay" />
  </div>
</template>
<script>
import { Dialog } from "vant";
import qs from "qs";
export default {
  name: "pay",
  data() {
    return {
      time: 1800000, //倒计时
      // time2: "",
      payChannel: "wechatPay", //支付方式
      priceFlag: this.$route.query.price,
      orderCode: this.$route.query.orderCode,
      typs: this.$route.query.typs,
      show: false,
      value: "",
      showKeyboard: true,
      hidePay: true,
      showLoading: false,
      abc: ""
    };
  },
  created() {
    // 获取本地时间
    this.endTime();
  },
  methods: {
    finished() {
      this.cancel();
      this.$router.push({
        name: "myOrder",
        query: {
          id: "1",
          orderCode: this.orderCode
        }
      });
    },
    endTime() {
      let endtimes = sessionStorage.getItem("createTime");
      var endtimes2 = this.$moment(endtimes).format("YYYY-MM-DD HH:mm:ss");
      if (endtimes) {
        var createTimes =new Date(endtimes2.replace(/-/g, "/")).valueOf() + 30 * 60 * 1000;
        var sysTime = new Date().valueOf();
        if (createTimes - sysTime <= 0) {
          // console.log("订单已超时");
          this.cancel();
          this.$router.push({
            name: "myOrder",
            query: {
              orderCode: this.orderCode
            }
          });
        } else {
          var labb = createTimes - sysTime;
          this.time = labb;
        }
      }
    },
    onClickLeft() {
      // this.$router.go(-1);
      Dialog.confirm({
        message: "是否取消支付"
      })
        .then(() => {
          this.$router.push({
            name: "myOrder",
            query: {
              orderCode: this.orderCode
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    // 取消支付提示
    onSubmit() {
      this.show = true;
    },
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
      if (this.value.length === 6) {
        this.showKeyboard = false;
        this.hidePay = false;
        this.show = false;
        this.showLoading = true;
        this.payA();
        //支付完成3秒后跳转到我的订单页面
        const timer = setTimeout(() => {
          clearTimeout(timer);
          this.$router.push({
            name: "myOrder",
            query: {
              id: "1",
              orderCode: this.orderCode
            }
          });
        }, 3000);
      }
    },
    payA() {
      this.$axios({
        url: "shop/order/pay",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: localStorage.getItem("token"),
          orderCode: this.orderCode,
          payChannel: this.payChannel
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.abc = res.data.data;
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
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    closeKeyboard() {
      this.showKeyboard = false;
      this.hidePay = false;
      //支付完成3秒后跳转到我的订单页面
      const timer = setTimeout(() => {
        clearTimeout(timer);
        this.$router.push({
          name: "myOrder",
          query: {
            id: "1"
          }
        });
      }, 3000);
    },
    cancel() {
      this.$axios
        .post(
          "/shop/my/order/cancel",
          this.$qs.stringify({
            token: localStorage.getItem("token"),
            orderCode: this.orderCode
          })
        )
        .then(res => {
          if (res.data.code === "0000") {
            // this.$toast.success("取消成功");
          }
        });
    }
  }
};
</script>
<style scoped>
.pay {
  background: #fff;
}
.paysty {
  width: 100%;
  height: 92px;
  font-size: 12px;
  background: rgba(245, 245, 245, 1);
  padding-top: 25px;
  box-sizing: border-box;
}
.paysty .van-count-down,
.van-divider {
  display: inline-block;
}
.payPrice {
  font-size: 15px;
  font-weight: 800;
  color: rgba(252, 46, 46, 1);
  margin-top: 10px;
}
.choosePay {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  height: 44px;
  border-bottom: 1px solid rgba(222, 222, 222, 1);
  padding: 0 10px 0 16px;
}
.choosePay img {
  height: 30px;
  padding-right: 5px;
  padding-top: 7px;
}
.payName {
  line-height: 44px;
  width: 80%;
  display: inline-block;
  text-align: left;
}
.radioSty {
  padding-top: 12px;
}
.van-submit-bar__button {
  width: 100%;
}
</style>