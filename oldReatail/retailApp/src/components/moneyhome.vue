<template>
  <div class="home">
    <div class="mui-content" id="order-list">
      <div class="Top">
        <div class="Top_left">
          <li @click="showMeny" style="text-align:center;">
            <img src="@/assets/image/menu_icon.png" alt class="logo" v-if="showIcom" />
            <img src="@/assets/image/transferIcon.png" alt class="logo2" v-if="showIcom2" />
          </li>
          <!-- <img src="@/assets/image/logo.png" alt class="logo"> -->
          <span class="title1">{{Info.storename}}</span>
        </div>
        <div class="Top_right">
          <span class="title2">POS机号：{{Info.posNo}}</span>
          <span class="title2 titlTime">{{date |converTime('YYYY-MM-DD HH:mm:ss')}}</span>
          <span class="title2">收银员：{{Info.username}}</span>
        </div>
      </div>
      <div id="warpper">
        <!-- 左侧边栏 -->
        <div class="warLeft">
          <div v-show="hide">
            <ul class="warLeftUl">
              <li class="warleftList">
                <figure>
                  <img src="@/assets/image/snacks.png" class="imgs" />
                  <p>零食</p>
                </figure>
              </li>
              <li class="warleftList">
                <figure>
                  <img src="@/assets/image/drinks.png" class="imgs" />
                  <p>饮料</p>
                </figure>
              </li>
              <li class="warleftList">
                <figure>
                  <img src="@/assets/image/cakes.png" class="imgs" />
                  <p>糕点</p>
                </figure>
              </li>
              <li class="warleftList">
                <figure>
                  <img src="@/assets/image/commodity.png" class="imgs" />
                  <p>日用品</p>
                </figure>
              </li>
              <li class="warleftList">
                <figure>
                  <img src="@/assets/image/biscuits_icon.png" class="imgs" />
                  <p>饼干</p>
                </figure>
              </li>
              <li class="warleftList">
                <figure>
                  <img src="@/assets/image/departmentstore.png" class="imgs" />
                  <p>百货</p>
                </figure>
              </li>
              <li class="warleftList">
                <figure>
                  <img src="@/assets/image/else.png" class="imgs" />
                  <p>其他</p>
                </figure>
              </li>
            </ul>
          </div>
        </div>
        <!-- 左侧边栏2 -->
        <div class="clas">
          <LeftNav v-if="show"></LeftNav>
        </div>
        <div style="display:flex">
          <!-- 中间 -->
          <div class="warMain">
            <div style="min-height:100%">
              <mt-button
                size="small"
                @click.native.prevent="active = 'tab-container1'"
                v-bind:class="{active2:isActive}"
              >常规系列</mt-button>
              <div class="page-tab-container center_list">
                <mt-tab-container
                  class="page-tabbar-tab-container vheight"
                  swipeable
                  v-model="active"
                >
                  <mt-tab-container-item lable="aaa" id="tab-container1">
                    <mt-cell>
                      <ul class="list">
                        <li v-for="(item,index) in foodsList" :key="index">
                          <div>
                            <p class="tips" @click="addFoods(item)">{{item.name}}</p>
                            <p class="sprice">￥{{item.salesPrice}}</p>
                          </div>
                        </li>
                      </ul>
                    </mt-cell>
                  </mt-tab-container-item>
                </mt-tab-container>
                <div class="shousuo">
                  <p class="searchBox">
                    <input type="text" placeholder="请输入国际编码" v-model="barcode" />
                    <input type="button" @click="btnseach" class="btn" />
                  </p>
                  <ul>
                    <li @click="changeMoney">找零</li>
                    <li>大购物袋</li>
                    <li>小购物袋</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <!-- 右侧边栏 -->
          <div class="warRight">
            <div class="addbox">
              <div class="addRight_top" v-for="(item, index) in list" :key="index">
                <mt-button
                  size="small"
                  @click.native.prevent="addactive = 'add-container1'"
                  id="itemBoxBtn"
                >{{item.name}}</mt-button>
              </div>
              <mt-tab-container class="page-tabbar-tab-container" id="contBox" v-model="addactive">
                <div style="margin-left:10px;width:100%">
                  <mt-cell v-for="(item, index) in addgoodss" :key="index">
                    <div class="shopbox" @click="dbshijian(index)">
                      <div class="name1">
                        <p class="hides">{{item.foodsName}}</p>
                        <span>{{item.code}}</span>
                      </div>
                      <div class="name1 name2">
                        <input
                          type="number"
                          v-model="item.value"
                          min="1"
                          @blur="blurChange"
                          @input="inputFun(item, index)"
                        />
                      </div>
                      <div class="name1">
                        <p class="sprices colorRed">￥{{item.Saleprice | numFilter}}</p>
                      </div>
                    </div>
                  </mt-cell>
                </div>
              </mt-tab-container>
              <!-- 会员登录 -->
              <div class="countPrice">
                <hr />
                <p class="countPriceTit">总价</p>
                <div style="min-height:60px;">
                  <p class="countHj">合计：{{total | numFilter }}</p>
                  <p class="colorRed countHj" v-show="showCoupon2">已选择优惠券</p>
                </div>
                <div class="countBoxs">
                  <div class="checkLogin">
                    <div class="Vip">
                      <button @click="vipLogin" v-show="showLogin">会员登录</button>
                      <button
                        @click="vipCouponInfo"
                        v-if="showCoupon"
                      >{{vipInfo.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}}</button>
                    </div>
                    <div class="price">
                      <button @click="payment">结账</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 会员登录弹窗 -->
            <div class="diashow">
              <el-dialog title="会员登录" :visible.sync="dialogVisible" width="24%">
                <el-form
                  :model="numberValidateForm"
                  ref="numberValidateForm"
                  label-width="100px"
                  class="demo-ruleForm"
                >
                  <el-form-item
                    label="会员卡号"
                    prop="vipNumber"
                    :rules="[ { required: false, message: '不能为空'},
                    { type: 'number', message: '必须为数字'} ]"
                  >
                    <el-input
                      type="age"
                      v-model.number="numberValidateForm.vipNumber"
                      auto-complete="off"
                      placeholder="请输入会员卡号或者手机号"
                    ></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer diaBtn">
                  <el-button @click="NotShow">取 消</el-button>
                  <el-button class="present-btn" @click="iSure">确 定</el-button>
                </div>
              </el-dialog>
            </div>
            <el-dialog
              title="选择优惠券"
              :visible.sync="dialogVisible2"
              width="58%"
              :before-close="handleClose"
            >
              <div class="tuichu">
                <p @click="tuichu">退出登录</p>
              </div>
              <div class="diachoose">
                <div class="userInfo">
                  <span>姓名：{{vipInfo.name}}</span>
                  <span>手机号：{{vipInfo.phone}}</span>
                  <span>会员等级：{{vipInfo.levelName}}</span>
                </div>
                <div>
                  <div
                    :class="{ active : item.active }"
                    v-for="(item,index) in couponList"
                    :key="index"
                    @click="choooseBox(item,index)"
                    class="pickbgc"
                  >
                    <p>{{item.name}}</p>
                    <p v-if="item.reduceMoney != null" class="diamoney">￥{{item.reduceMoney}}</p>
                    <p v-if="item.discountMoney != null" class="diamoney">￥{{item.discountMoney}}</p>
                    <p>有效期：{{item.startTime | converTime('YYYY-MM-DD')}}至{{item.endTime | converTime('YYYY-MM-DD')}}</p>
                  </div>
                </div>
              </div>
              <div slot="footer" class="dialog-footer diaBtn">
                <el-button @click="dialogVisible2 = false">取 消</el-button>
                <el-button class="present-btn" @click="isCoupin">确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </div>
      </div>
    </div>
    <Lock @closeMo="lock" v-if="isshow"></Lock>
  </div>
</template>
<script>
import qs from "qs";
import LeftNav from "@/components/leftnav.vue";
import { MessageBox } from "mint-ui";
import Lock from "@/components/lock.vue";
export default {
  name: "home",
  data() {
    return {
      qian: 0,
      isshow: false,
      obj: {},
      active: "tab-container1",
      isActive: true,
      addactive: "add-container1",
      Info: [],
      date: new Date(),
      foodsList: [],
      addgoodss: [],
      shopList: [], //商品列表
      barcode: "", //搜索编码
      token: sessionStorage.getItem("token"),
      list: [{ name: "订单" }],
      count: 0,
      time: "",
      show: false,
      hide: true,
      abc: false,
      ttt: true,
      showIcom: true,
      showIcom2: false,
      centerDialogVisible: false,
      centerDialogVisible1: false,
      ruleForm2: {
        newPassword: "",
        checkPass: "",
        oldPassword: ""
      },
      dialogVisible: false,
      numberValidateForm: {
        vipNumber: ""
      },
      vipInfo: {},
      showCoupon: false,
      showCoupon2: false,
      showLogin: true,
      dialogVisible2: false,
      goodsSet: [],
      couponList: [],
      takeCoupon: ""
    };
  },
  mounted: function() {
    var orderHeight = document.body.clientHeight;
    document.getElementById("order-list").style.height = orderHeight + "px";
    let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(() => {
      _this.date = new Date(); // 修改数据date
    }, 1000);
    // if(sessionStorage.getItem('VipId')){
    //     this.showCoupon = true;
    // }
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  },
  created() {
    //读取常用商品列表
    let token = this.token;
    this.$axios({
      url: "clerk/index/detail",
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify({
        token: token
      })
    }).then(res => {
      this.Info = res.data.data;
    });
    this.getOrderList();
    this.getFoodsList();
  },
  methods: {
    lock() {
      this.isshow = this.isshow ? false : true;
    },
    addTT() {
      // this.list.push({name : '2'})
    },
    // 侧边栏列表
    getOrderList() {
      let token = this.token;
      this.$axios({
        url: "clerk/ordering/order",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: token
        })
      });
    },
    // 商品列表
    getFoodsList() {
      let token = this.token;
      this.$axios({
        url: "clerk/ordering/goods",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: token
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.foodsList = res.data.data.list;
        } else if (res.data.code === "6666") {
          this.$message({
            showClose: true,
            message: "token异常，请重新登录",
            type: "error"
          });
          const timer = setTimeout(() => {
            clearTimeout(timer);
            this.$router.push({ name: "login" });
          }, 3000);
        }
      });
    },
    // 添加到右侧
    addFoods(item) {
      // console.log(item)
      let _this = this;
      if (_this.addgoodss.length == 0) {
        _this.addgoodss.push({
          foodsName: item.name,
          code: item.code,
          Saleprice: item.salesPrice,
          value: 1,
          bbdq: item.salesPrice // 不变的钱
        });
      } else {
        let flag = false;
        var obj;
        _this.addgoodss.forEach((item1, index) => {
          if (item1.code == item.code) {
            obj = item1;
            flag = true;
          }
        });
        if (flag) {
          obj.value = obj.value - 0 + 1;
          obj.Saleprice = obj.value * item.salesPrice;
        } else {
          _this.addgoodss.push({
            foodsName: item.name,
            code: item.code,
            Saleprice: item.salesPrice,
            value: 1,
            bbdq: item.salesPrice
          });
        }
      }
    },
    blurChange() {
      this.addgoodss.forEach((item, index) => {
        if (item.value == "" || item.value == null || item.value == 0)
          this.addgoodss.splice(index, 1);
      });
    },
    // 监听input是否改变
    inputFun(item, index) {
      for (const iterator of this.addgoodss) {
        if (
          iterator.value == "" ||
          iterator.value == null ||
          iterator.value == 0
        )
          iterator.value = "";
      }
      this.addgoodss[index].Saleprice = item.value * item.bbdq;
    },
    // 双击
    dbshijian(index) {
      this.time = setTimeout(() => {
        this.count = 0;
        clearTimeout(this.time);
      }, 200);
      this.count++;
      if (this.count === 2) {
        MessageBox.confirm("", {
          message: "是否删除商品",
          title: "提示",
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          center: true
        })
          .then(action => {
            if (action == "confirm") {
              //确认的回调
              this.addgoodss.splice(index, 1);
            }
          })
          .catch(err => {
            if (err == "cancel") {
              //取消的回调
              return;
            }
          });
        this.count = 0;
      }
    },
    // 付款
    payment() {
      let _this = this;
      _this.addgoodss.forEach((item, index) => {
        _this.shopList.push({
          code: item.code,
          number: item.value
        });
      });
      if (_this.addgoodss.length === 0) {
        _this.$message("请添加商品");
      } else {
        let token = _this.token;
        _this
          .$axios({
            url: "clerk/ordering/create",
            method: "POST",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            data: qs.stringify({
              token: token,
              memberId: sessionStorage.getItem("VipId"),
              couponMemberId: this.takeCoupon,
              json: JSON.stringify(_this.shopList)
            })
          })
          .then(res => {
            if (res.data.code == "0000") {
              sessionStorage.setItem("CorderCode", res.data.data.orderCode);
              const payInfo = res.data.data;
              sessionStorage.removeItem("VipId");
              sessionStorage.setItem("totalMoney", payInfo.totalMoney);
              sessionStorage.setItem("payableMoney", payInfo.payableMoney);
              sessionStorage.setItem("discountMoney", payInfo.discountMoney);
              _this.$router.push({
                name: "cashier",
                params: {
                  totalMoney: sessionStorage.getItem("totalMoney"), //总价
                  payableMoney: sessionStorage.getItem("payableMoney"), //应收
                  discountMoney: sessionStorage.getItem("discountMoney") //优惠
                }
              });
            } else {
              _this.$message(res.data.msg);
            }
          });
      }
    },
    // 会员登录
    vipLogin() {
      this.dialogVisible = true;
    },
    NotShow() {
      this.numberValidateForm.vipNumber = "";
      this.dialogVisible = false;
    },
    iSure() {
      if (this.numberValidateForm.vipNumber.length === 0) {
        this.$message("请输入会员号");
      } else {
        this.$axios({
          url: "clerk/member/login",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            token: sessionStorage.getItem("token"),
            phone: this.numberValidateForm.vipNumber
          })
        }).then(res => {
          if (res.data.code == "0000") {
            sessionStorage.setItem("VipId", res.data.data.id); // token
            sessionStorage.setItem("vipPhone", res.data.data.phone);
            this.vipInfo = res.data.data;
            this.dialogVisible = false;
            this.showCoupon = true;
            this.showLogin = false;
          } else {
            this.$message(res.data.msg);
          }
        });
      }
    },
    // 优惠券
    vipCouponInfo() {
      let couponId = this.addgoodss;
      this.goodsSet = couponId.map(item => {
        return item.code;
      });
      if (this.goodsSet == "") {
        this.$message("请选择商品后再选择优惠券");
        // console.log(this.goodsSet);
      } else {
        this.dialogVisible2 = true;
      }
      this.$axios({
        url: "clerk/member/coupon",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: sessionStorage.getItem("token"),
          memberId: sessionStorage.getItem("VipId"),
          goodsSet: JSON.stringify(this.goodsSet)
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.couponList = res.data.data.list;
        }
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //选择优惠券
    choooseBox(a, b) {
      for (const i of this.couponList) {
        i["active"] = false;
      }
      this.couponList[b].active = true;
      this.obj = a;
    },
    // 确定优惠券
    isCoupin() {
      // let couponId = this.couponList.map(item => {
      //   return item.couponMemberId;
      // });
      // this.couponList.forEach(item => {
      //   console.log(item.couponMemberId)
      //   return item.couponMemberId;
      //   this.takeCoupon = item.couponMemberId
      // });
      this.takeCoupon = this.obj.couponMemberId;
      this.dialogVisible2 = false;
      // if(this.takeCoupon !="" || this.takeCoupon != "undefined"){
      //   this.showCoupon2 = true;
      // }
      if (this.takeCoupon != undefined) {
        this.showCoupon2 = true;
      }
    },
    //找零
    changeMoney() {
      this.$axios({
        url: "clerk/index/small/change",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({ token: sessionStorage.getItem("token") })
      }).then(res => {
        if (res.data.code == "0000") {
        } else {
          this.$message(res.data.msg);
        }
      });
    },
    // 搜索
    btnseach() {
      let token = this.token;
      this.$axios({
        url: "clerk/ordering/goods",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: token,
          barcode: this.barcode
        })
      }).then(res => {
        this.foodsList = res.data.data.list;
      });
    },
    showMeny() {
      this.show = !this.show;
      // this.abc = !this.abc;
      this.showIcom = !this.showIcom;
      this.showIcom2 = !this.showIcom2;
      this.hide = !this.hide;
    },
    // shouyin() {
    //   this.$router.push({ name: "moneyhome" });
    // },
    // jiaoban() {
    //   let formData = new FormData();
    //   formData.append("token", sessionStorage.getItem("token"));
    //   this.$axios.post("/clerk/index/logout", formData).then(res => {
    //     if (res.data.code == "0000") {
    //       sessionStorage.removeItem("token");
    //       this.$router.push({ name: "login" });
    //     }
    //   });
    //   this.centerDialogVisible1 = false;
    // },
    // shift() {
    //   this.$router.push({ name: "shif" });
    // },
    // chaxun() {
    //   this.$router.push({ name: "query" });
    // },

    // submitForm(formName) {
    //   this.$refs[formName].validate(valid => {
    //     if (valid) {
    //       this.ruleForm2.token = sessionStorage.getItem("token");
    //       let formData = new FormData();
    //       const obj = this.ruleForm2;
    //       Object.keys(obj).forEach(key => {
    //         formData.append(key, obj[key]);
    //       });
    //       this.$axios
    //         .post("/clerk/index/password/modify", formData)
    //         .then(res => {
    //           if (res.data.code == "0000") {
    //             this.centerDialogVisible = false;
    //             this.$message("修改成功");
    //           } else {
    //             this.$message.error(res.data.msg);
    //           }
    //         });
    //     } else {
    //       return false;
    //     }
    //   });
    // },
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // },
    // handleClose1(done) {
    //   this.$refs.ruleForm2.resetFields();
    //   this.centerDialogVisible = false;
    // },
    tuichu(done) {
      this.$confirm("确认退出？")
        .then(_ => {
          sessionStorage.removeItem("VipId");
          this.dialogVisible2 = false;
          this.showLogin = true;
          this.showCoupon = false;
        })
        .catch(_ => {});
      // sessionStorage.getItem('VipId')
    }
  },
  filters: {
    numFilter(value) {
      // 截取当前数据到小数点后两位
      let realVal = parseFloat(value).toFixed(2);
      return realVal;
    }
  },
  computed: {
    total() {
      let money = 0;
      this.addgoodss.forEach((item, index) => {
        money += item.Saleprice;
      });
      return money;
    }
  },
  components: {
    Lock,
    LeftNav
  }
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
.active {
  opacity: 0.4;
}
.menuSt {
  min-height: 656px;
}
.tijiao {
  width: 0.24rem;
  height: 0.12rem;
}
.home {
  width: 100%;
  height: 100%;
  min-width: 1024px;
}
.Top {
  /* height: 0.24rem; */
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
.Top_left .logo2 {
  width: 19px;
  margin: 11px 15px 0 15px;
}
.Top_left .title1,
.Top_right .title2 {
  /* margin-top: 0.08rem;
  margin-left: 0.05rem; */
  line-height: 50px;
  color: #fff;
}
.Top_right {
  display: inline-flex;
  float: right;
  margin-right: 0.12rem;
}
/* .Top_right .title2 {
  margin-top: 0.08rem;
  color: #fff;
} */
.titlTime {
  margin: 0 15px;
}
/*头部结束*/
/*中间部分-侧边栏*/
.mui-col-sm-1,
.mui-col-sm-7,
.mui-col-sm-4 {
  margin-top: 10px;
  box-sizing: border-box;
}
.menu-list {
  color: #fff;
}
.posMenu li {
  background: #23cfe1;
}
.posMenu ul {
  padding-top: 7px;
}
.center {
  background: #ffffff;
  margin-left: 10px;
  width: 100%;
}
.center_top {
  float: left;
}
.center_list {
  clear: both;
}
.center1 {
  text-align: center;
}
#submit {
  background-color: #01c8dc;
  border: 1px solid #01c8dc;
  color: #fff;
  height: 40px;
  width: 60px;
}
#rest {
  background-color: #fff;
  border: 1px solid #01c8dc;
  color: #01c8dc;
  height: 40px;
  width: 60px;
  margin-left: 10px;
}
.btn12 {
  background-color: #01c8dc;
  border: 1px solid #01c8dc;
  color: #fff;
  height: 40px;
  width: 60px;
}
.btn13 {
  background-color: #fff;
  border: 1px solid #01c8dc;
  color: #01c8dc;
  height: 40px;
  width: 60px;
  margin-left: 10px;
}
.parent {
  position: relative;
}

/*中间-右边*/
.mui-row .mui-col-sm-4 {
  float: right;
}
.Add {
  float: right;
  background: #23cfe1;
  width: 0.15rem;
  height: 0.15rem;
  border: none;
  font-size: 0.13rem;
  line-height: 0.14rem;
  color: #fff;
  margin-right: 0.04rem;
}
.addRight_top {
  /* position: absolute;;
  margin-left: 20px; */
}
/* .addbox {
  clear: both;
  width: 95%;
  margin: 0 auto;
  -moz-box-shadow: 0px 2px 2px 1px #ccc; 
  box-shadow: 0px 2px 2px 1px #ccc;
} */
/* .addBoxs {
  width: 91%;
  margin-left: 20px;
  position: relative;
  min-height: 65vh;
  overflow: scroll;
  background: #fff;
} */
.conten {
  width: 30.35vw;
  position: fixed;
  bottom: 18px;
  background-color: #fff;
}
.conts {
  font-size: 0.075rem;
  line-height: 0.15rem;
  height: 0.15rem;
  text-align: left;
  padding-left: 0.03rem;
  color: #000;
}
.countPrice {
  height: 28%;
}
.countBoxs {
  position: relative;
  height: 54%;
}
.checkLogin {
  display: flex;
  /* position: relative; */
  /* height: 130px; */
  flex-direction: row;
}
.Vip {
  border-right: 1px solid #cccccc;
  position: absolute;
  left: 0;
  bottom: 0;
}
.price {
  position: absolute;
  right: 0;
  bottom: 0;
}
.Vip,
.price {
  flex: 1;
  width: 50%;
}
.Vip button,
.price button {
  width: 100%;
  height: 40px;
  font-size: 16px;
}
.shopbox {
  display: flex;
  margin-bottom: 5px;
  margin-top: 10px;
  cursor: pointer;
}
.name1 {
  flex: 1.5;
  height: 0.18rem;
}
.name1 .hides {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 100px;
}
.name1 p {
  height: 27px;
  /* background: pink; */
  line-height: 27px;
  font-size: 16px;
}
.name2 {
  margin-left: 0.1rem;
}
.name1 .sprices {
  line-height: 45px;
  text-align: center;
}
.diashow .el-dialog__header {
  border-bottom: 2px solid #018dce;
}
.diashow .el-dialog__body {
  padding: 0 20px !important;
}
.formItem {
  margin-bottom: 20px;
}
.el-form-item__content {
  margin-left: 0;
}
.diaBtn button {
  height: 40px;
  width: 80px;
  font-size: 16px;
}
.diachoose .userInfo {
  display: inline-flex;
}
.userInfo span {
  font-size: 16px;
  padding-right: 40px;
  padding-bottom: 20px;
}
.pickbgc {
  background-image: url("../assets/image/bgk.png");
  background-size: 100% 100%;
  height: 130px;
  width: 300px;
  margin: 0 40px 20px 0;
  display: inline-block;
}
.diamoney {
  text-align: right;
}
.pickbgc p {
  color: #fff;
  box-sizing: border-box;
  margin-right: 20px;
  font-size: 16px;
  padding-left: 30px;
  height: 40px;
}
.colorRed {
  color: red;
}
.tuichu {
  display: inline-block;
  position: absolute;
  top: 20px;
  right: 20px;
}
.auditBtn {
  position: absolute;
  left: 0;
  top: -1px;
  padding-top: 20px;
  border-bottom: 3px solid #01c8dc;
  width: 100%;
  text-align: left;
  padding-left: 14px;
  box-sizing: border-box;
}
.el-icon-info {
  color: #ffab5a;
  font-size: 25px;
}
.auditBtn-1 {
  font-size: 16px;
  margin-left: 5px;
  vertical-align: top;
}
#warpper {
  width: 100%;
  min-width: 1024px;
  box-sizing: border-box;
}
#warpper .warLeft {
  width: 100px;
  min-width: 100px;
  height: 92vh;
  float: left;
  background-color: #fff;
  margin-top: 20px;
}
#warpper .clas {
  /* width: 6%; */
  width: 100px;
  /* height: 100%; */
}
#warpper .warMain {
  width: 75%;
  position: relative;
  display: inline-block;
  background: #fff;
  margin-left: 10px;
  margin-top: 20px;
  /* height: calc(100vh - 70px); */
  height: 92vh;
}
#warpper .warRight {
  width: 23%;
  margin-top: 20px;
  margin-left: 20px;
  background: #fff;
}
.warLeft .warLeftUl {
  /* background-color: #f1f6fa; */
  margin-top: 6px;
}
.warLeft .warLeftUl .warleftList {
  background: #fff;
}
.warLeft .warLeftUl .warleftList,
.warLeft .posMenu li {
  box-shadow: 0px 2px 5px #cccccc;
  border-radius: 5px;
  width: 78px;
  height: 70px;
  margin: 0 auto;
  margin-bottom: 10px;
}
.warleftList figure,
.posMenu figure {
  text-align: center;
  padding-top: 10px;
}
.warleftList .imgs,
.posMenu .imgs {
  width: 30px;
}
.active2 {
  border-top: 4px solid #01f8dc;
  background-color: #fff;
  width: 126px;
  height: 48px;
  margin-bottom: 15px;
  font-size: 16px;
}
.list {
  list-style: none;
  margin-left: 16px;
}
.list li {
  float: left;
  border: 1px solid #cccccc;
  border-radius: 5px;
  width: 135px;
  height: 120px;
  margin: 0 10px 10px 0px;
}
.list li .tips {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  line-height: 75px;
  height: 75px;
  text-align: center;
}
.list li .tips:hover {
  cursor: pointer;
}
.list li:hover {
  box-shadow: 0px 4px 7px 2px #c8c8c8;
}
.list li .sprice {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: #f2f1ef;
  line-height: 42px;
  text-align: center;
}
.shousuo {
  position: absolute;
  bottom: 10px;
  left: 30px;
  box-sizing: border-box;
  width: 92%;
}
.shousuo ul {
  list-style: none;
  position: absolute;
  right: 0;
}
.shousuo ul li,
.searchBox {
  float: left;
}
.shousuo ul li {
  width: 100px;
  text-align: center;
  padding: 7px;
  border: 1px solid #01c8dc;
  margin: 0 4px;
  border-radius: 5px;
  color: #01c8dc;
  font-size: 15px;
}
.shousuo ul li:hover {
  background-color: #01c8dc;
  color: #fff;
  cursor: pointer;
}
.searchBox {
  width: 280px;
  position: relative;
}
.searchBox input {
  border-radius: 6px;
  font-size: 14px;
  margin-bottom: 0;
}
.searchBox .btn {
  position: absolute;
  background: url("../assets/image/search.png") no-repeat;
  top: 11px;
  right: 10px;
  border: none;
  outline: none;
}
.searchBox .btn:hover {
  cursor: pointer;
}
.addbox {
  clear: both;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}
.addbox #contBox {
  height: 68%;
  overflow-y: scroll;
}
.countPriceTit {
  font-size: 20px;
  font-weight: 800;
  margin-left: 20px;
  margin-top: 10px;
  box-sizing: border-box;
  color: #3c3a3a;
}
.countHj {
  text-align: right;
  margin-right: 30px;
  font-size: 16px;
  margin-bottom: 10px;
}
#itemBoxBtn {
  min-height: 20px;
  margin-bottom: 10px;
  border-top: 4px solid #01f8dc;
  width: 100px;
  font-size: 16px;
}
</style>


