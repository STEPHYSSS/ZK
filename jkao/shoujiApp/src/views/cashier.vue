<template>
  <div class="cashier">
    <div class="isshow" v-if="back">
      <i class="el-icon-close" @click="goout"></i>
      <div class="middle">
        <el-radio v-model="radio" label="用户取消购买">用户取消购买</el-radio>
        <el-radio v-model="radio" label="商品购买错误,重新下单">商品购买错误,重新下单</el-radio>
      </div>
      <div class="buttom">
        <el-button @click="goout">返回</el-button>
        <el-button type="primary" @click="isCash">确定</el-button>
      </div>
    </div>
    <div class="top">
      <div class="cashBtn" style="height:33px;">
        <countDown
          :examInfo="countDownInfo"
          v-if="countDownInfo"
          @autoSubmit="autoHandInExaminationPaper"
          ref="countDown"
          class="exam-interval fr"
        ></countDown>
        <backBtn></backBtn>
        <questionInfo :questionInfo="questionInfo"></questionInfo>
      </div>
      <div class="cashTit">
        <span>{{storeInfo.storename}}</span>
        <span>pos机号:{{storeInfo.posNo}}</span>
        <span class="title2 titlTime">{{showData |converTime('YYYY-MM-DD HH:mm:ss')}}</span>
        <span>收银员:{{storeInfo.username}}</span>
      </div>
    </div>
    <div class="left">
      <span>支付倒计时:{{time}}s</span>
      <button type="button" class="mui-btn mui-btn-primary" @click="goback">退出支付</button>
      <div class="rect"></div>
      <p class="imgApp" v-show="showIcon">
        <img src="../assets/2largeicons.png" @click="alipayss" />
      </p>
      <p class="imgApp2" v-show="showIcon2">
        <img src="../assets/largeicons.png" @click="wechatPayss" />
      </p>
      <p class="imgApp3" v-show="showIcon3">
        <img src="../assets/3largeicons.png" @click="unionpayss" />
      </p>
      <p class="imgApp4" v-show="showIcon4">
        <img src="../assets/4largeicons.png" @click="cashss" />
      </p>

      <img
        src="@/assets/image/paybyAlipay_icon(2).png"
        class="imgWidth imgApp222"
        @click="alipayss"
        v-show="hideIcon"
      />
      <img
        src="@/assets/image/WeChatPay_icon(1).png"
        class="imgWidth imgApp_2"
        @click="wechatPayss"
        v-show="hideIcon2"
      />
      <img
        src="@/assets/image/Unionpaypay_icon(1).png"
        class="imgWidth imgApp_3"
        @click="unionpayss"
        v-show="hideIcon3"
      />
      <img
        src="@/assets/image/readyup_icon(1).png"
        class="imgWidth imgApp_4"
        v-show="hideIcon4"
        @click="cashss"
      />
    </div>
    <div class="diashow">
      <el-dialog :visible.sync="dialogVisible" :before-close="closeDialog" width="500px">
        <h3 class="hCenter" style="text-align: center">支付中</h3>
        <img src="@/assets/image/erweima.png" alt class="erweima" />
      </el-dialog>
      <el-dialog :visible.sync="dialogVisible22" width="500px" :modal="false">
        <el-form label-width="100px" class="demo-ruleForm">
          <el-form-item label="现金">
            <el-input
              type="texy"
              v-model="moneynum"
              maxlength="10"
              oninput="value=value.replace(/[^\d.]/g, '').replace(/\.{2,}/g, '.').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3').replace(/^\./g, '')"
              auto-complete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer diaBtn">
          <el-button @click="dialogVisible22 = false">取 消</el-button>
          <el-button class="present-btn" @click="cashSure">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog :visible.sync="dialogzhaoling" width="500px">
        <el-form label-width="100px" class="demo-ruleForm">
          <el-form-item>
            <p>找零：￥{{zhaoMoney | showNum}}</p>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer diaBtn">
          <el-button class="present-btn" @click="zhaoling">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="right">
      <div class="topdiv" v-if="weixin">
        <img src="../assets/icon.png" alt />
        <span>&nbsp;微信支付</span>
      </div>
      <div class="under" v-if="appli">
        <img src="../assets/2icon.png" alt />
        <span>&nbsp;支付宝支付</span>
      </div>
      <div class="under" v-if="card">
        <img src="../assets/3largeicons.png" alt />
        <span>&nbsp;银联支付</span>
      </div>
      <div class="under" v-if="cashM">
        <img src="../assets/4largeicons.png" alt />
        <span>&nbsp;现金支付</span>
      </div>
      <div class="money">
        <span>
          总价
          <p>¥{{totalMoney}}</p>
        </span>
        <span>
          应收
          <p>¥{{payableMoney}}</p>
        </span>
        <span>
          优惠
          <p class="colorRed">¥{{discountMoney}}</p>
        </span>
      </div>
      <div class="boss">
        <div class="leftli">
          <ul>
            <li @click="call($event)">1</li>
            <li @click="call($event)">2</li>
            <li @click="call($event)">3</li>
            <li @click="call($event)">4</li>
            <li @click="call($event)">5</li>
            <li @click="call($event)">6</li>
            <li @click="call($event)">7</li>
            <li @click="call($event)">8</li>
            <li @click="call($event)">9</li>
            <li @click="call($event)">0</li>
            <li @click="call($event)">00</li>
            <li @click="call($event)">.</li>
          </ul>
        </div>
        <div class="rightli">
          <ul>
            <li @click="callthree">
              <img src="../assets/delete_icon.png" alt />
            </li>
            <li>
              <button type="button" class="mui-btn mui-btn-primary">确定</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import countDown from "@/components/countDown";
import questionInfo from "@/components/questionInfo";
import backBtn from "@/components/backBtn";
export default {
  data() {
    return {
      storeInfo: {},
      back: false,
      radio: "用户取消购买",
      zhaoMoney: "",
      dialogVisible: false,
      dialogVisible22: false,
      dialogzhaoling: false,
      weixin: false,
      appli: false,
      card: false,
      cashM: false,
      numarr: [],
      moneynum: "",
      change: "",
      time: 1200000,
      // money:'',
      totalMoney: "", //总价
      payableMoney: "", //应收
      discountMoney: "", //优惠
      channel: "",
      showIcon: true,
      showIcon2: true,
      showIcon3: true,
      showIcon4: true,
      hideIcon: false,
      hideIcon2: false,
      hideIcon3: false,
      hideIcon4: false,
      timer2: "",//用来选择微信，支付宝，银联支付时取消支付
      curTime: new Date().getTime(), // 当前服务器时间
      countDownInfo: null, // 定时器所需信息
      questionInfo: sessionStorage.getItem("questionInfo"), //显示题干信息
      showData: new Date(),
      newTime:""
    };
  },
  created() {
    // this.name();
    this.Times();
    this.getParams();
    this.storedetail();
    this.getDate()
  },
  components: {
    countDown,
    questionInfo,
    backBtn
  },
  methods: {
    alipayss() {
      this.showIcon = false;
      this.hideIcon = true;
      this.channel = "alipay";
      this.dialogVisible = true;
      this.weixin = false;
      this.appli = true;
      this.cashM = false;
      this.card = false;
      this.hideIcon2 = false;
      this.hideIcon3 = false;
      this.hideIcon4 = false;
      this.showIcon2 = true;
      this.showIcon3 = true;
      this.showIcon4 = true;
      this.pay();
    },
    wechatPayss() {
      this.showIcon2 = false;
      this.hideIcon2 = true;
      this.channel = "wechatPay";
      this.dialogVisible = true;
      this.appli = false;
      this.weixin = true;
      this.cashM = false;
      this.card = false;
      this.hideIcon = false;
      this.hideIcon3 = false;
      this.hideIcon4 = false;
      this.showIcon = true;
      this.showIcon3 = true;
      this.showIcon4 = true;
      this.pay();
    },
    cashss() {
      this.showIcon4 = false;
      this.hideIcon4 = true;
      this.channel = "cash";
      this.dialogVisible22 = true;
      this.cashM = true;
      this.weixin = false;
      this.appli = false;
      this.card = false;
      this.showIcon = true;
      this.hideIcon = false;
      this.hideIcon3 = false;
      this.hideIcon2 = false;
      this.showIcon = true;
      this.showIcon2 = true;
      this.showIcon3 = true;
    },
    unionpayss() {
      this.showIcon3 = false;
      this.hideIcon3 = true;
      this.channel = "unionpay";
      this.dialogVisible = true;
      this.card = true;
      this.weixin = false;
      this.appli = false;
      this.cashM = false;
      this.hideIcon = false;
      this.hideIcon2 = false;
      this.hideIcon4 = false;
      this.showIcon = true;
      this.showIcon2 = true;
      this.showIcon4 = true;
      this.pay();
    },
    getParams() {
      // 取到路由带过来的参数
      this.totalMoney = sessionStorage.getItem("totalMoney");
      this.payableMoney = sessionStorage.getItem("payableMoney");
      this.discountMoney = sessionStorage.getItem("discountMoney");
    },
    // 门店详情
    storedetail() {
      this.$axios({
        url: "clerk/index/detail",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: sessionStorage.getItem("token")
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.storeInfo = res.data.data;
        } else {
          this.$message(res.data.msg);
        }
      });
    },
    // cashSure订单支付
    cashSure() {
      let parNumber = parseInt(this.moneynum);
      let parMoney = parseInt(this.totalMoney)
      let parPayMoney = parseInt(this.payableMoney)
      if (parNumber < parMoney) {
        this.dialogzhaoling = false;
        this.$message.error("金额有误，请重新输入");
        return;
      } else if (parNumber >= parMoney) {
        this.pay();
        this.zhaoMoney = parNumber - parPayMoney;
      }
      // 
      // if (this.moneynum < this.totalMoney) {
      //   this.dialogzhaoling = false;
      //   this.$message.error("金额有误，请重新输入");
      //   return;
      // } else if (this.moneynum >= this.totalMoney) {
      //   this.pay();
      //   this.zhaoMoney = this.moneynum - this.payableMoney;
      // }
      this.dialogVisible22 = false;
      this.dialogzhaoling = true;
    },
    // 找零
    zhaoling() {
      this.dialogzhaoling = false;
      this.$message({
        type: "success",
        message: "找零成功"
      });
      this.$router.push({ name: "moneyhome" });
    },
    closeZhaoling() {
      this.dialogzhaoling = false;
      this.$router.push({ name: "moneyhome" });
    },
    // pay收银
    pay() {
      this.timer2 = setTimeout(() => {
        clearTimeout(this.timer2);
        this.$axios({
          url: "clerk/ordering/pay",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            token: sessionStorage.getItem("token"),
            orderCode: sessionStorage.getItem("CorderCode"),
            paymoney: this.payableMoney,
            channel: this.channel
          })
        }).then(res => {
          if (res.data.code == "0000") {
            this.dialogVisible = false;
            this.$router.push({ name: "moneyhome" });
          } else {
            this.dialogVisible = false;
            this.dialogVisible22 = false;
            this.dialogzhaoling = false;
            this.$message(res.data.msg);
          }
        });
      }, 3000);
    },
    closeDialog() {
      clearTimeout(this.timer2);
      this.dialogVisible = false;
      this.dialogVisible22 = false;
      this.dialogzhaoling = false;
    },
    // 退出支付
    isCash() {
      this.$axios({
        url: "clerk/ordering/cancel",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: sessionStorage.getItem("token"),
          orderCode: sessionStorage.getItem("CorderCode"),
          reason: this.radio
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.$message("订单取消成功");
          this.$router.push({ name: "moneyhome" });
        } else {
          this.$message(res.data.msg);
          this.back = false;
        }
      });
    },
    Times() {
      let _this = this;
      var interval = window.setInterval(function() {
        if (_this.time-- == 1) {
          _this.gotime();
          window.clearInterval(interval);
        }
      }, 1000);
    },
    // 自动取消订单
    gotime() {
      if (this.channel == "") {
        clearTimeout(this.timer2);
        this.$axios({
          url: "clerk/ordering/cancel",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            token: sessionStorage.getItem("token"),
            orderCode: sessionStorage.getItem("CorderCode"),
            reason: "订单超时"
          })
        }).then(res => {
          if (res.data.code == "0000") {
            this.$message("时间超时，订单已取消");
            this.$router.push({ name: "moneyhome" });
          } else {
            this.$message(res.data.msg);
            this.back = false;
          }
        });
      }
    },
    call(e) {
      // var num = e.target.innerText;
      // this.numarr.push(num);
      // this.numarr.forEach(item => {
      //   this.moneynum += item;
      //   this.numarr = [];
      // });
    },
    callthree() {
    },
    goback() {
      this.back = true;
    },
    goout() {
      this.back = false;
    },
    
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear();
      let month =
        new Date(timeStamp).getMonth() + 1 < 10
          ? "0" + (new Date(timeStamp).getMonth() + 1)
          : new Date(timeStamp).getMonth() + 1;
      let date =
        new Date(timeStamp).getDate() < 10
          ? "0" + new Date(timeStamp).getDate()
          : new Date(timeStamp).getDate();
      let hh =
        new Date(timeStamp).getHours() < 10
          ? "0" + new Date(timeStamp).getHours()
          : new Date(timeStamp).getHours();
      let mm =
        new Date(timeStamp).getMinutes() < 10
          ? "0" + new Date(timeStamp).getMinutes()
          : new Date(timeStamp).getMinutes();
      let ss =
        new Date(timeStamp).getSeconds() < 10
          ? "0" + new Date(timeStamp).getSeconds()
          : new Date(timeStamp).getSeconds();
      this.nowTime =
        year + "-" + month + "-" + date + "" + " " + HH + ":" + mm + ":" + ss;
    },
    nowTimes() {
      this.timeFormate(new Date());
      setInterval(this.nowTimes, 1000);
    },
    // 考试时间
    // 获取考试信息中的考试时间
    getdetailExam() {
      let examType = sessionStorage.getItem("examType")
      let review = sessionStorage.getItem("review")
      if(examType == "E" && review == "N"){
        let examid = sessionStorage.getItem("examId");
        if (examid != "undefined" && examid != "-1") {
          this.$axios
            .post(
              this.teacherSide + "/exam/detailForStu",
              qs.stringify({
                exam_id: sessionStorage.getItem("examId"),
                token: sessionStorage.getItem("token")
              })
            )
            .then(res => {
              if (res.data.code === "0000") {
                this.countDownInfo = {
                  duration: res.data.exam.duration,
                  deadline: res.data.exam.end_time,
                  nowTime: this.curTime,
                  starTime: res.data.exam.start_time
                };
              } else {
                this.$message.error(res.data.msg);
              }
            });
        }
      }
      
    },
    // 获取服务器当前时间
    // getDate() {
    //   this.$axios
    //     .post(
    //       this.teacherSide + "/common/getDate",
    //       qs.stringify({
    //         token: sessionStorage.getItem("token")
    //       })
    //     )
    //     .then(res => {
    //       if (res.data.code === "0000") {
    //         this.curTime = res.data.date;
    //         this.getdetailExam();
    //       } else {
    //         this.$message.error("获取当前服务器时间失败, 请刷新页面");
    //       }
    //     });
    // },
    autoHandInExaminationPaper() {
      this.$message('答题时间即将结束，自动交卷')
      window.location.href = this.backExam + "/#/historyTryBook";
      // window.location.href = "http://192.168.1.144:8081" + "/#/historyTryBook";
    },
  },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    $route: "getParams"
  },
  filters: {
    showNum(value) {
      value = Number(value);
      return value.toFixed(2);
    }
  },
  mounted(){
    let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
    this.newTime = setInterval(() => {
      _this.showData = new Date(); // 修改数据date
    }, 1000);
  },
  beforeDestroy() {
    if (this.newTime) {
      clearInterval(this.newTime); // 在Vue实例销毁前，清除我们的定时器
    }
  },
};
</script>

<style scoped lang="less">
.isshow {
  position: absolute;
  left: 1.2rem;
  top: 0.6rem;
  width: 1.2rem;
  height: 1rem;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1111;
  padding: 5px;
  border-radius: 4px;
  i {
    float: right;
    color: #fff;
  }
  .middle {
    width: 100%;
    padding-left: 0.3rem;
    padding-top: 0.2rem;
    .el-radio {
      color: #fff;
    }
  }
  .buttom {
    width: 100%;
    text-align: center;
    padding-top: 0.4rem;
  }
}
.boss {
  width: 482px;
  height: 460px;
  position: relative;
  margin-left: 22px;
}
.cashier {
  width: 100vw;
  height: 100vh;
  min-width: 1200px !important;
  overflow: hidden;
  background: url("../assets/图层883.png");
  background-size: 100% 100%;
  .top {
    // height: 0.16rem;
    height: 50px;
    line-height: 37px;
    width: 100%;
    background-color: #000;
    color: #fff;
    .cashTit{
      position: absolute;
      top: 4px;
      right: 15px;
      span{
        display: inline-block;
        margin: 0 15px;
      }
    }
    // padding: 0 0.1rem;
    .cashBtn {
      display: inline-block;
      box-sizing: border-box;
      margin-top: 7px;
    }
  }
  .left {
    width: 30%;
    min-width: 550px;
    height: 600px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow: hidden;
    background: url("../assets/bgk.png");
    background-size: 100% 100%;
    float: left;
    margin-top: 5%;
    margin-left: 5%;
    position: relative;
    padding: 20px;
    span {
      font-size: 18px;
      line-height: 45px;
    }
    button {
      float: right;
    }
    .imgWidth {
      width: 160px;
    }
    .imgApp {
      display: inline-block;
      img {
        width: 130px;
        position: absolute;
        top: 23%;
        left: 16%;
      }
    }
    .imgApp2 {
      display: inline-block;
      img {
        width: 130px;
        position: absolute;
        top: 23%;
        right: 16%;
      }
    }
    .imgApp3 {
      display: inline-block;
      img {
        width: 130px;
        position: absolute;
        bottom: 18%;
        left: 16%;
      }
    }
    .imgApp4 {
      display: inline-block;
      img {
        width: 130px;
        position: absolute;
        bottom: 18%;
        right: 16%;
      }
    }
    .imgApp222 {
      position: absolute;
      top: 20%;
      left: 14%;
    }
    .imgApp_2 {
      position: absolute;
      top: 20%;
      right: 14%;
    }
    .imgApp_3 {
      position: absolute;
      bottom: 14%;
      left: 14%;
    }
    .imgApp_4 {
      position: absolute;
      bottom: 14%;
      right: 14%;
    }
  }
  .right {
    height: 600px;
    min-width: 500px;
    margin-top: 5%;
    margin-right: 5%;
    float: right;
    background-color: rgba(0, 0, 0, 0.3);
    .topdiv {
      margin-left: 0.04rem;
      margin-top: 0.02rem;
      margin-bottom: 0.02rem;
      img {
        width: 0.08rem;
        height: 0.08rem;
        vertical-align: middle;
      }
      span {
        font-size: 13px;
      }
    }
    .under {
      margin-left: 0.04rem;
      height: 0.12rem;
      line-height: 0.12rem;
      img {
        width: 0.08rem;
        height: 0.08rem;
        vertical-align: middle;
      }
      span {
        font-size: 13px;
      }
    }
    .money {
      background-color: #fff;
      margin: 10px 20px;
      border-radius: 5px;
      span {
        display: inline-block;
        width: 33%;
        padding-top: 7px;
        font-size: 13px;
        text-align: center;
        &:nth-last-child(2) {
          border-left: 1px solid skyblue;
          border-right: 1px solid skyblue;
        }
      }
    }
    .leftli {
      display: inline-block;
      width: 348px;
      ul {
        padding: 0;
        margin: 0;
        li {
          list-style: none;
          display: inline-block;
          width: 102px;
          height: 102px;
          background-color: #fff;
          margin-top: 10px;
          margin-right: 10px;
          border-radius: 4px;
          line-height: 124px;
          text-align: center;
          cursor: pointer;
        }
      }
    }
    .rightli {
      width: 20%;
      height: 424px;
      display: inline-block;
      position: relative;
      ul {
        padding: 0;
        position: absolute;
        // margin-top: 0.04rem;
        width: 112px;
        li {
          list-style: none;
          width: 100%;
          height: 214px;
          background-color: #fff;
          /* margin-bottom: 0.02rem; */
          border-radius: 4px;
          cursor: pointer;
          margin: 5px 0 10px;
          &:nth-last-child(1) {
            button {
              width: 100%;
              height: 100%;
            }
          }
          &:nth-last-child(2) {
            line-height: 214px;
            text-align: center;
            img {
              width: 50px;
            }
          }
        }
      }
    }
  }
  .erweima {
    width: auto;
    margin-left: 30px;
  }
}
</style>
