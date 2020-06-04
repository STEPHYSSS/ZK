<template>
  <div class="receipts">
    <!-- <div class="top">
      <img src="../assets/Categorymanagement_icon.png" @click="show">
      <span>{{data.storename}}</span>
      <span>pos机号:{{data.posNo}}</span>
      <span>收银员:{{data.username}}</span>
      <span>{{nowTime}}</span>
    </div>-->
    <div class="Top">
      <div class="Top_left">
        <li @click="show" style="text-align:center;">
          <img src="@/assets/image/menu_icon.png" alt class="logo" v-if="showIcom"/>
          <img src="@/assets/image/transferIcon.png" alt class="logo2" v-if="showIcom2" />
        </li>
        <span class="title1">{{data.storename}}</span>
      </div>
      <div class="Top_right">
        <countDown
            :examInfo="countDownInfo"
            v-if="countDownInfo"
            @autoSubmit="autoHandInExaminationPaper"
            ref="countDown"
            class="exam-interval fr"
          ></countDown>
          <backBtn></backBtn>
          <questionInfo :questionInfo = "questionInfo"></questionInfo>
        <span class="title2">POS机号：{{data.posNo}}</span>
        <span class="title2 titlTime">{{nowTime}}</span>
        <span class="title2">收银员：{{data.username}}</span>
      </div>
    </div>
    <LeftNav v-if="isshow" @listenchild="showchild" :msg="centerDialogVisible"></LeftNav>
    <div class="btnBox">
      <button class="reback" @click="reback">返&nbsp;&nbsp;回</button>
      <button type="success" class="Printing" @click="Printing" size="small">打印小票</button>
      <button class="refund" @click="refund" v-if="flag">退款</button>
    </div>
    <div class="little">
      <!-- <div class="box">
        <button class="refund" @click="refund">退款</button>
      </div>-->
      <h5>seekerp</h5>
      <div class="onebox">
        <div>店名:{{storeList.storeName}}</div>
        <div>收营员:{{storeList.personnelCode}}</div>
        <div>订单时间:{{storeList.createTime | fmtDate }}</div>
        <div>订单号:{{storeList.orderCode}}</div>
      </div>
      <div class="allgoods">
        <table>
          <tr>
            <th class="left">品名/货号</th>
            <th class="center">数量</th>
            <th class="center">单价</th>
            <th class="center">小计</th>
            <th class="center">优惠金额</th>
          </tr>
          <tr v-for="(item,index) in shopList2" :key="index">
            <td class="left">{{item.goodsName}}/{{item.goodsCode}}</td>
            <td class="center">x{{item.number}}</td>
            <td class="center">{{item.price}}</td>
            <td class="center">{{item.money}}</td>
            <td>
              <span  v-show="item.promoteMoney">-{{item.promoteMoney}}</span>
            </td>
          </tr>
        </table>
      </div>
      <div class="addgoods">
        <table>
          <tr>
            <td>原价合计:</td>
            <td></td>
            <td></td>
            <td v-show="storeList.sumMoney">x{{add}}</td>
            <td v-show="storeList.sumMoney">{{storeList.sumMoney}}</td>
          </tr>
          <tr>
            <td>优惠合计:</td>
            <td></td>
            <td></td>
            <td v-show="storeList.discountMoney">x{{add}}</td>
            <td v-show="storeList.discountMoney">{{storeList.discountMoney}}</td>
          </tr>
        </table>
      </div>
      <div class="newpay">
        <table>
          <tr>
            <th>实付:</th>
            <th>
              <span
                style="margin-left:111px"
                v-show="storeList.actualMoney"
              >¥{{storeList.actualMoney}}</span>
            </th>
            <th></th>
          </tr>
          <tr>
            <td>
              <div style="text-align: left;">支付方式：</div>
            </td>
            <td v-for="(item,index) in shopList3" :key="index">
              <div class="l">{{item.channel}}</div>
              <div class="r">
                <span>{{item.money}}</span>
              </div>
            </td>

            <!-- //<td v-for="(item,index) in shopList3" :key='index'>{{item.channel}}</td> -->
            <!-- //<td>{{item.money}}</td> -->
          </tr>
        </table>
      </div>
      <div class="vip">
        <span>会员卡号:{{storeList.memberNo}}</span>
        <span>剩余积分:1111</span>
      </div>
      <div class="vip">
        <div v-for="(item,index) in shopList4" :key="index">
          <div class="in">参与促销：</div>
          <div class="in-r">
            <p class="font">{{item}}</p>
          </div>
        </div>
        <table>
          <tr>
            <td>优惠券:</td>
            <td>{{storeList.couponName}}</td>
          </tr>
        </table>
        <div class="vip">
          <span>感谢您的支持，若您有任何疑问可致电或登录网站留言反馈</span>
          <span>官方网站：www.seekerp.com</span>
          <span>服务热线:027-88393779</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import LeftNav from "@/components/leftnav.vue";
import countDown from "@/components/countDown";
import questionInfo from "@/components/questionInfo";
import backBtn from "@/components/backBtn";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      timer2: "",
      nowTime: "",
      storeList: {},
      shopList2: [],
      shopList3: [],
      shopList4: [],
      // add:'',
      ordercode: "",
      ordertime: "",
      channel: "",
      paymoney: "",
      isshow: false,
      data: {},
      centerDialogVisible: false,
      flag: false,
      curTime: new Date().getTime(), // 当前服务器时间
      countDownInfo: null, // 定时器所需信息
      questionInfo:sessionStorage.getItem("questionInfo"),//显示题干信息
      showIcom: true,
      showIcom2: false
    };
  },
  components: {
    LeftNav,
    countDown,
    questionInfo,
    backBtn
  },
  created() {
    this.nowTimes();
    this.name();
    this.pickdetail();
    this.getDate()
  },
  computed: {
    add: function() {
      var sun = 0;
      this.shopList2.forEach(item => {
        sun += item.number;
      });
      return sun;
    }
  },
  methods: {
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
        year + "-" + month + "-" + date + "-" + " " + hh + ":" + mm + ":" + ss;
    },
    // 定时器函数
    nowTimes() {
      this.timeFormate(new Date());
      this.timer2 = setTimeout(this.nowTimes, 1000);
    },
    beforeDestroy() {
      clearTimeout(this.timer2);
    },
    // 小票详情
    pickdetail() {
      this.$axios({
        url: "/clerk/ordering/detail",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: sessionStorage.getItem("token"),
          orderCode: sessionStorage.getItem("packCode")
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.storeList = res.data.data.orderInfo;
          this.shopList2 = res.data.data.listDetail;
          this.shopList3 = res.data.data.listPay;
          this.shopList4 = res.data.data.listPromote;
          let oneDay = new Date().getTime();
          let payTime = this.$moment(this.storeList.createTime).format(
            "YYYY-MM-DD hh:mm:ss"
          );
          let old_time = new Date(payTime.replace(/-/g, "/")).getTime(); //替换字符，js不认2013-01-31,只认2013/01/31
          let fd = new Date(
            old_time.valueOf() + 1 * 24 * 60 * 60 * 1000
          ).getTime(); //日期加上指定的天数
          if (oneDay - old_time < fd - old_time) {
            this.flag = true;
          }
        }
      });
    },
    reback() {
      this.$router.push({
        name:'query'
      })
    },
    Printing() {
      this.$axios({
        url: "clerk/index/ticket/again",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: sessionStorage.getItem("token")
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.$message("小票打印完成");
          this.$router.push({ name: "query" });
        } else {
          this.$message(res.data.msg);
        }
      });
    },
    refund() {
      this.$axios({
        url: "clerk/ordering/refund",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: sessionStorage.getItem("token"),
          orderCode: sessionStorage.getItem("packCode")
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.$message("退款完成");
          this.$router.push({ name: "query" });
        } else {
          this.$message(res.data.msg);
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm2.token = sessionStorage.getItem("token");
          let formData = new FormData();
          const obj = this.ruleForm2;
          Object.keys(obj).forEach(key => {
            formData.append(key, obj[key]);
          });
          this.$axios
            .post("/clerk/index/password/modify", formData)
            .then(res => {
              if (res.data.code == "0000") {
                this.centerDialogVisible = false;
                this.$message("修改成功");
              }
            });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    showchild(data) {
      this.centerDialogVisible = data;
    },
    show() {
      // this.isshow = !this.isshow ? true : false;
      this.isshow=!this.isshow;
      this.showIcom = !this.showIcom;
      this.showIcom2 = !this.showIcom2;
    },
    name() {
      let formData = new FormData();
      formData.append("token", sessionStorage.getItem("token"));
      this.$axios.post("/clerk/index/detail", formData).then(res => {
        if (res.data.code == "0000") {
          this.data = res.data.data;
        }
      });
    },
    // 考试时间
    // 获取考试信息中的考试时间
    getdetailExam() {
      let examType = sessionStorage.getItem("examType")
      let review = sessionStorage.getItem("review")
      if(examType == "E" && review == "N"){
        let examid = sessionStorage.getItem("examId");
        if(examid !="undefined" && examid != "-1"){
          this.$axios.post(this.teacherSide+"/exam/detailForStu",qs.stringify({
            exam_id:sessionStorage.getItem("examId"),
            token:sessionStorage.getItem("token")
          })).then(res => {
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
    //   this.$axios.post(this.teacherSide+'/common/getDate',qs.stringify({
    //     token:sessionStorage.getItem("token")
    //   })).then(res => {
    //     if (res.data.code === "0000") {
    //       this.curTime = res.data.date;
    //       this.getdetailExam();
    //     } else {
    //       this.$message.error('获取当前服务器时间失败, 请刷新页面');
    //     }
    //   });
    // },
    autoHandInExaminationPaper() {
      this.$message('答题时间即将结束，自动交卷')
      window.location.href = this.backExam + "/#/historyTryBook";
      // window.location.href = "http://192.168.1.144:8081" + "/#/historyTryBook";
    },
  }
};
</script>

<style lang="less" scoped>
// ul p {
//   margin: 0;
//   padding: 0;
// }
// // p {
// //   // display: inline-block;
// //   color: #695555;
// // }
// ul {
//   margin: 0;
//   padding: 0;
//   // display: flex;
//   // flex-direction: row;
//   // flex-wrap: nowrap;
//   // justify-content: flex-start;
//   font-size: 13px;
//   height: 55px;
//   // overflow: hidden;
// }
// ul > li {
//   height: 40px;
//   // width: 45px;
//   // flex: 1;
//   width: 30%;
//   list-style: none;
//   display: inline-block;
//   line-height: 40px;
// }
// .productName {
//   text-align: left;
//   color: #695555;
// }
// .first-li {
//   text-align: left;
// }
// .second-li,
// .third-li {
//   text-align: right;
// }
.center {
  text-align: center;
}
.left {
  text-align: left;
}
.receipts {
  list-style: none;
  .btnBox {
    // margin-left: 100px;

    margin-left: 0.4rem;
    margin-top: 25px;
    .refund {
      margin-left: 0.04rem;
      color: #01c8dc;
      border: 1px solid #01c8dc;
    }
    .Printing {
      color: #fff;
      background-color: #01c8dc;
      border: 1px solid #01c8dc;
    }
    .reback {
      border: 1px solid #01c8dc;
      color: #01c8dc;
      background-color: #fff;
      margin-right: 20px;
    }
  }
  // .top {
  //   height: 0.2rem;
  //   width: 100%;
  //   padding: 0 0.1rem;
  //   // background-color: skyblue;
  //   background-color: #01c8dc;
  //   line-height: 0.2rem;
  //   color: #fff;
  //   img {
  //     vertical-align: middle;
  //   }
  //   span {
  //     font-size: 13px;
  //     &:nth-last-child(4) {
  //       margin-left: 0.4rem;
  //     }
  //     &:nth-last-child(3) {
  //       float: right;
  //     }
  //     &:nth-last-child(2) {
  //       float: right;
  //       padding: 0 0.325rem 0 0.075rem;
  //     }
  //     &:nth-last-child(1) {
  //       float: right;
  //     }
  //   }
  // }
  .Top {
    height: 50px;
    box-sizing: border-box;
    background-color: #23cfe1;
  }
  .Top_left {
    display: inline-flex;
    float: left;
  }
  .Top_left .logo {
    width: 28px;
    margin: 15px 15px 0 15px;
  }
  .Top_left .title1,
  .Top_right .title2 {
    line-height: 58px;
    color: #fff;
  }
  .Top_right {
    display: inline-flex;
    float: right;
    margin-right: 0.12rem;
  }
  .titlTime {
    margin: 0 15px;
  }
  .little {
    color: #695555;
    font-size: 14px;
    // width: 1rem;
    width: 350px;
    padding: 0.025rem 0.025rem 0.05rem 0.025rem;
    border: 1px solid #c2cad8;
    border-radius: 4px;
    box-shadow: 0px 1px 10px #bbadad;
    text-align: center;
    // margin-left: 0.37rem;
    margin-left: 205px;
    // margin-top: 0.1rem;
    margin-top: 15px;
    background-color: #fff;
    h5 {
      font-weight: 700;
      font-size: 18px;
    }
    .onebox {
      border-bottom: 1px dashed #ccc;
      text-align: left;
      // font-size: 13px;
    }
    .allgoods {
      table {
        width: 100%;
        tr {
          width: 100%;
          th {
            // font-size: 13px;
            // text-align: left;
            &:nth-child(1) {
              width: 39%;
            }
            &:nth-child(2) {
              width: 12%;
            }
            &:nth-child(3) {
              width: 15%;
            }
            &:nth-child(4) {
              width: 15%;
            }
            &:nth-child(5) {
              width: 32%;
            }
          }
          td {
            // font-size: 13px;
            // text-align: left;
            &:nth-last-child(3) {
              // width: 60%;
            }
            &:nth-last-child(2) {
              // width: 20%;
            }
            &:nth-last-child(1) {
              // width: 20%;
            }
             
          }
        }
      }
      // span {
      //   font-size: 13px;
      //   text-align: left;
      //   display: inline-block;
      //   &:nth-last-child(3) {
      //     width: 60%;
      //   }
      //   &:nth-last-child(2) {
      //     width: 20%;
      //   }
      //   &:nth-last-child(1) {
      //     width: 20%;
      //   }
      // }
    }
    .addgoods {
      // font-size: 13px;
      border-top: 1px dashed #ccc;
      border-bottom: 1px dashed #ccc;
      // padding: 0.025rem;
      padding: 8px 0;
      table {
        width: 100%;
        tr {
          td {
            // text-align: left;
            // &:nth-last-child(3) {
            //   width: 60%;
            // }
            // &:nth-last-child(2) {
            //   width: 20%;
            // }
            // &:nth-last-child(1) {
            //   width: 20%;
            // }
            &:nth-child(1) {
              width: 39%;
              text-align: left;
            }
            &:nth-child(2) {
              width: 12%;
            }
            &:nth-child(3) {
              width: 15%;
            }
            &:nth-child(4) {
              width: 15%;
            }
            &:nth-child(5) {
              width: 32%;
            }
          }
        }
      }
    }
    .newpay {
      table {
        width: 100%;
        font-size: 13px;
        tr {
          th {
            &:nth-last-child(3) {
              text-align: left;
            }

            &:nth-last-child(1) {
              text-align: right;
            }
          }
          td {
            //   text-align: left;
            &:nth-last-child(2) {
              width: 28%;
              // text-align: left;
            }
            &:nth-last-child(1) {
              width: 72%;
              box-sizing: border-box;

              // text-align: left;
            }
          }
        }
      }
      .r {
        display: inline-block;
        width: 50%;
      }
      .l {
        display: inline-block;
        width: 50%;
      }
    }
    .vip {
      border-top: 1px dashed #ccc;
      border-bottom: 1px dashed #ccc;
      padding: 0.005rem;
      font-size: 13px;
      .in {
        display: inline-block;
        width: 30%;
        text-align: left;
      }
      .in-r {
        display: inline-block;
        width: 70%;
        text-align: left;
        .font {
          color: black;
        }
      }

      table {
        width: 100%;
        td {
          text-align: left;
        }
      }
      span {
        display: block;
        font-size: 13px;
        text-align: left;
      }
    }
  }
}
</style>

