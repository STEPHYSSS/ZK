<template>
  <div class="operatHome my-index">
    <el-container>
      <el-header id="header" style="height:68px">
        <div style="float:left;height:68px;">
          <div style="display:inline-block;margin-right:7px;">
            <!-- <el-dropdown trigger="click">
              <p class="el-dropdown-link" style="display:inline-block">
                <span style="font-size: 22px;padding-left: 20px;">运营后台</span> 
                <sub>(<i class="el-icon-arrow-down el-icon--right">切换</i>)</sub>              
              </p>
              <el-dropdown-menu slot="dropdown">
                <router-link to="/choose"><el-dropdown-item>门店</el-dropdown-item></router-link>
                <router-link to="/shoporder"><el-dropdown-item>供应商</el-dropdown-item></router-link>
                <router-link to="/WSettings"><el-dropdown-item>仓库后台</el-dropdown-item></router-link>
              </el-dropdown-menu>
          </el-dropdown> -->
          <p class="el-dropdown-link" style="display:inline-block;">
              <span style="font-size: 22px;padding-left: 20px;">运营后台</span>              
            </p>
          </div>
          <img v-if="flag4" @click="close" src="./Uimage/icon.png" />
          <img src="./Uimage/icon (3).png" @click="close" v-if="flag3" />
        </div>
        <!-- <img class="Nlogo" src="./Uimage/logo.png" alt /> -->
        <!-- <img class="logoBtn" v-if="flag4" @click="close" src="./Uimage/icon.png" alt />
        <img class="logoBtn" src="./Uimage/icon (3).png" @click="close" v-if="flag3" alt />-->
        <div class="setimg">          
          <i>欢迎你,{{name}}</i>
          <!-- <div class="drop">
            <el-dropdown>
              <span class="el-dropdown-link">
                <img src="./Uimage/setting_icon.png" alt />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <div class="buttonbox" @click="centerDialogVisible = true">
                    <img src="./images/password_icon.png" alt />
                    <span>修改密码</span>
                  </div>
                </el-dropdown-item>
                <el-dropdown-item>
                  <div class="buttonbox" @click="back">
                    <img src="./images/shut_icon.png" alt />
                    <span>退出系统</span>
                  </div>
                </el-dropdown-item>
                <el-dropdown-item>
                  <div class="buttonbox">
                    <img src="./images/shut_icon.png" alt />
                    <span>关于版本</span>
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>           -->
        </div>
        
        <div class="countDown">              
          <countDown
            :examInfo="countDownInfo"
            v-if="countDownInfo"
            @autoSubmit="autoHandInExaminationPaper"
            ref="countDown"
            class="exam-interval fr"
          ></countDown>          
          <backBtn></backBtn>
          <questionInfo ></questionInfo>   
        </div>
      </el-header>
      <el-container>
        <el-aside width="auto">
          <el-menu
            class="el-menu-vertical-demo"
            :collapse="show.isCollapse"
            text-color="#444"
            active-text-color="#ffd04b"
          >
            <el-menu-item
              class="acne"
              index="1"
              @mouseenter.native.prevent="enter(1)"
              @mouseleave.native.prevent="leave(1)"
            >
              <img
                src="./images/Storemanagement_icon.png"
                class="iconImgBox"
                v-if="imgListBlack.show1"
              />
              <img
                src="./assets/1.mendianguanli_icon.png"
                class="iconImgBox"
                v-if="show.isCollapse1"
              />
              <span slot="title" class="margintit">门店管理</span>
              <el-menu-item-group v-show="show.isCollapse1 === true">
                <div class="aside-menu">
                  <router-link to="/storeManage">门店管理</router-link>
                </div>
              </el-menu-item-group>
            </el-menu-item>
            <el-menu-item
              class="acne"
              index="2"
              @mouseenter.native.prevent="enter(2)"
              @mouseleave.native.prevent="leave(2)"
            >
              <img
                src="./images/suppliermanagement_icon.png"
                alt
                class="iconImgBox"
                v-if="imgListBlack.show2"
              />
              <img
                src="./assets/2.gongyinshang_icon.png"
                alt
                class="iconImgBox"
                v-if="show.isCollapse2"
              />
              <span slot="title" class="margintit">供应商管理</span>
              <el-menu-item-group v-show="show.isCollapse2 === true">
                <div class="aside-menu">
                  <router-link to="/smanagement">供应商管理</router-link>
                </div>
              </el-menu-item-group>
            </el-menu-item>
            <el-menu-item
              class="acne"
              index="3"
              @mouseenter.native.prevent="enter(3)"
              @mouseleave.native.prevent="leave(3)"
            >
              <img
                src="./images/commoditymanagement_icon.png"
                alt
                class="iconImgBox"
                v-if="imgListBlack.show3"
              />
              <img
                src="./assets/3.shangpinguanli_icon.png"
                alt
                class="iconImgBox"
                v-if="show.isCollapse3"
              />
              <span slot="title" class="margintit">商品管理</span>
              <el-menu-item-group v-show="show.isCollapse3 === true">
                <div class="aside-menu">
                  <router-link to="/shopmanagement">商品管理</router-link>
                </div>
              </el-menu-item-group>
            </el-menu-item>
            <el-menu-item
              class="acne"
              index="4"
              @mouseenter.native.prevent="enter(4)"
              @mouseleave.native.prevent="leave(4)"
            >
              <img
                src="./Uimage/pricecontrol_icon.png"
                alt
                class="iconImgBox"
                v-if="imgListBlack.show4"
              />
              <img
                src="./assets/4.jiageguanli_icon.png"
                alt
                class="iconImgBox"
                v-if="show.isCollapse4"
              />
              <span slot="title" class="margintit">价格管理</span>
              <el-menu-item-group v-show="show.isCollapse4 === true">
                <div class="aside-menu">
                  <router-link to="/purchase">供应商进价管理</router-link>
                  <router-link to="/selling">特殊门店售价管理</router-link>
                  <router-link to="/adjustPrice">特殊门店调价申请</router-link>
                </div>
              </el-menu-item-group>
            </el-menu-item>
            <el-menu-item
              class="acne"
              index="5"
              @mouseenter.native.prevent="enter(5)"
              @mouseleave.native.prevent="leave(5)"
            >
              <img
                src="./images/ordermanagement_icon.png"
                alt
                class="iconImgBox"
                v-if="imgListBlack.show5"
              />
              <img
                src="./assets/5.dingdanguanli_icon.png"
                alt
                class="iconImgBox"
                v-if="show.isCollapse5"
              />
              <span slot="title" class="margintit">订单管理</span>
              <el-menu-item-group v-show="show.isCollapse5 === true">
                <div class="aside-menu">
                  <router-link to="/storeorder">收银订单</router-link>
                  <!-- <router-link to="/mallOrders">商城订单</router-link> -->
                </div>
              </el-menu-item-group>
            </el-menu-item>
            <el-menu-item
              class="acne"
              index="6"
              @mouseenter.native.prevent="enter(6)"
              @mouseleave.native.prevent="leave(6)"
            >
              <img
                src="./Uimage/MemberCenter_icon.png"
                alt
                class="iconImgBox"
                v-if="imgListBlack.show6"
              />
              <img
                src="./assets/6.mendiandanjuguanli_icon.png"
                alt
                class="iconImgBox"
                v-if="show.isCollapse6"
              />
              <span slot="title" class="margintit">门店单据管理</span>
              <el-menu-item-group v-show="show.isCollapse6 === true">
                <div class="aside-menu">
                  <router-link to="/delivery">叫货单管理</router-link>
                  <router-link to="/sheet">修正单管理</router-link>
                  <router-link to="/PurchaseOrder">采购单管理</router-link>
                  <router-link to="/returnManagement">退货单管理</router-link>
                  <router-link to="/transferSingle">转移单管理</router-link>
                  <router-link to="/scrapForm">报废单管理</router-link>
                </div>
              </el-menu-item-group>
            </el-menu-item>
            <el-menu-item
              class="acne"
              index="7"
              @mouseenter.native.prevent="enter(7)"
              @mouseleave.native.prevent="leave(7)"
            >
              <img
                src="./Uimage/Promotioncenter.png"
                alt
                class="iconImgBox"
                v-if="imgListBlack.show7"
              />
              <img
                src="./assets/7.kucunguanli_icon.png"
                alt
                class="iconImgBox"
                v-if="show.isCollapse7"
              />
              <span slot="title" class="margintit">库存管理</span>
              <el-menu-item-group v-show="show.isCollapse7 === true">
                <div class="aside-menu">
                  <router-link to="/Kinventor">门店库存</router-link>
                </div>
                <div class="aside-menu">
                  <router-link to="/sysStockManag">仓库库存</router-link>
                </div>
              </el-menu-item-group>
            </el-menu-item>
            <el-menu-item
              class="acne"
              index="8"
              @mouseenter.native.prevent="enter(8)"
              @mouseleave.native.prevent="leave(8)"
            >
              <img
                src="./Uimage/Couponmanagement_icon.png"
                alt
                class="iconImgBox"
                v-if="imgListBlack.show8"
              />
              <img
                src="./assets/8.leimuguanli_1icon.png"
                alt
                class="iconImgBox"
                v-if="show.isCollapse8"
              />
              <span slot="title" class="margintit">类目管理</span>
              <el-menu-item-group v-show="show.isCollapse8 === true">
                <div class="aside-menu">
                  <router-link to="/category">类目管理</router-link>
                </div>
              </el-menu-item-group>
            </el-menu-item>
            <el-menu-item
              class="acne"
              index="9"
              @mouseenter.native.prevent="enter(9)"
              @mouseleave.native.prevent="leave(9)"
            >
              <img
                src="./Uimage/Storeinventory_icon.png"
                alt
                class="iconImgBox"
                v-if="imgListBlack.show9"
              />
              <img
                src="./assets/9.xitongguanli_icon.png"
                alt
                class="iconImgBox"
                v-if="show.isCollapse9"
              />
              <span slot="title" class="margintit">系统管理</span>
              <el-menu-item-group v-show="show.isCollapse9 === true">
                <div class="aside-menu">
                  <router-link to="/dictionary">字典管理</router-link>
                  <router-link to="/staff">职员管理</router-link>
                  <router-link to="/role">角色管理</router-link>
                </div>
              </el-menu-item-group>
            </el-menu-item>
            <el-menu-item
              class="acne"
              index="14"
              @mouseenter.native.prevent="enter(14)"
              @mouseleave.native.prevent="leave(14)"
            >
              <img
                src="./Uimage/storemanagement1_icon.png"
                alt
                class="iconImgBox"
                v-if="imgListBlack.show14"
              />
              <img
                src="./assets/14.cangkuguangli_icon.png"
                alt
                class="iconImgBox"
                v-if="show.isCollapse14"
              />
              <span slot="title" class="margintit">仓库管理</span>
              <el-menu-item-group v-show="show.isCollapse14 === true">
                <div class="aside-menu">
                  <router-link to="/operaPurWare">采购入库</router-link>
                  <router-link to="/operaOtherInWare">其他入库</router-link>
                  <router-link to="/TurnLibraryWorkList">转库作业</router-link>
                  <router-link to="/operateOutboundOrder">订购出库</router-link>
                  <router-link to="/OtherOutboundList">其他出库</router-link>
                </div>
              </el-menu-item-group>
            </el-menu-item>
            <el-menu-item
              class="acne"
              index="10"
              @mouseenter.native.prevent="enter(10)"
              @mouseleave.native.prevent="leave(10)"
            >
              <img src="./Uimage/huiyuan.png" alt class="iconImgBox" v-if="imgListBlack.show10" />
              <img
                src="./assets/10.huiyuanzhongxin_icon.png"
                alt
                class="iconImgBox"
                v-if="show.isCollapse10"
              />
              <span slot="title" class="margintit">会员中心</span>
              <el-menu-item-group v-show="show.isCollapse10 === true">
                <div class="aside-menu">
                  <router-link to="/memberManage">会员管理</router-link>
                  <router-link to="/membership">会员级别</router-link>
                  <router-link to="/Integral">积分政策</router-link>
                </div>
              </el-menu-item-group>
            </el-menu-item>
            <!-- <el-menu-item
              class="acne"
              index="15"
              @mouseenter.native.prevent="enter(15)"
              @mouseleave.native.prevent="leave(15)"
            >
              <img
                src="./assets/yingxiaoguanli_icon.png"
                alt
                class="iconImgBox"
                v-if="imgListBlack.show15"
              />
              <img
                src="./assets/yingxiaoguanli1_icon.png"
                alt
                class="iconImgBox"
                v-if="show.isCollapse15"
              />
              <span slot="title" class="margintit">营销管理</span>
              <el-menu-item-group v-show="show.isCollapse15 === true">
                <div class="aside-menu">
                  <router-link to="/turnTable">大转盘</router-link>
                  <router-link to="/scratchCard">刮刮乐</router-link>
                  <router-link to="/smashingGoldenEggs">砸金蛋</router-link>
                  <router-link to="/shakeActivity">摇一摇</router-link>
                  <router-link to="/mutiplayerGroup">多人拼团</router-link>
                  <router-link to="/bargainActivity">砍价</router-link>
                </div>
              </el-menu-item-group>
            </el-menu-item> -->
            <el-menu-item
              class="acne"
              index="11"
              @mouseenter.native.prevent="enter(11)"
              @mouseleave.native.prevent="leave(11)"
            >
              <img
                src="./images/Promotioncenter_icon.png"
                alt
                class="iconImgBox"
                v-if="imgListBlack.show11"
              />
              <img
                src="./assets/11.cuxiaozhongxin_icon.png"
                alt
                class="iconImgBox"
                v-if="show.isCollapse11"
              />
              <span slot="title" class="margintit">促销中心</span>
              <el-menu-item-group v-show="show.isCollapse11 === true">
                <div class="aside-menu">
                  <router-link to="/productSales">商品促销</router-link>
                  <router-link to="/nDiscounts">第N件优惠</router-link>
                  <router-link to="/buyPresent">买赠活动</router-link>
                </div>
              </el-menu-item-group>
            </el-menu-item>
            <el-menu-item
              class="acne"
              index="12"
              @mouseenter.native.prevent="enter(12)"
              @mouseleave.native.prevent="leave(12)"
            >
              <img
                src="./assets/12youhuijuanguanli_icon.png"
                alt
                class="iconImgBox"
                v-if="imgListBlack.show12"
              />
              <img
                src="./assets/12.youhuijuanguanli_icon.png"
                alt
                class="iconImgBox"
                v-if="show.isCollapse12"
              />
              <span slot="title" class="margintit">优惠券管理</span>
              <el-menu-item-group v-show="show.isCollapse12 === true">
                <div class="aside-menu">
                  <router-link to="/CouponMana">优惠券管理</router-link>
                </div>
              </el-menu-item-group>
            </el-menu-item>

            <el-menu-item
              class="acne"
              index="13"
              @mouseenter.native.prevent="enter(13)"
              @mouseleave.native.prevent="leave(13)"
            >
              <img
                src="./Uimage/systemmanagement_icon.png"
                alt
                class="iconImgBox"
                v-if="imgListBlack.show13"
              />
              <img
                src="./assets/13.mendianpandian_icon.png"
                alt
                class="iconImgBox"
                v-if="show.isCollapse13"
              />
              <span slot="title" class="margintit">门店盘点</span>
              <el-menu-item-group v-show="show.isCollapse13 === true">
                <div class="aside-menu">
                  <router-link to="/operaInventory">门店盘点</router-link>
                </div>
              </el-menu-item-group>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
      <el-dialog
        title="修改密码"
        :visible.sync="centerDialogVisible"
        width="30%"
        center
        :before-close="handleClose1"
        class="checkpass"
      >
        <el-form
          :model="ruleForm2"
          status-icon
          :rules="rules2"
          ref="ruleForm2"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="旧密码"
            prop="oldPassword"
            :rules="[
         { required: true, message: '请输入旧密码', trigger: 'blur' }
        ]"
          >
            <el-input type="password" v-model="ruleForm2.oldPassword"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input type="password" v-model="ruleForm2.newPassword" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="AllquedingBtn" @click="submitForm('ruleForm2')">提交</el-button>
            <el-button class="theBtn resetButton" @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-container>
  </div>
</template>
<script>
import qs from "qs";
import countDown from "@/components/countDown.vue";
import questionInfo from "@/components/questionInfo.vue";
import backBtn from "@/components/backBtn.vue";
export default {
  name: "operatinHome",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else if (value.toString().length < 6 || value.toString().length > 18) {
        callback(new Error("密码长度为6 - 18个字符"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.newPassword) {
        callback(new Error("确认密码输入有误!"));
      } else {
        callback();
      }
    };
    return {
      leftnavWidth: "",
      token: "",
      show: {
        isCollapse: false,
        isCollapse1: false,
        isCollapse2: false,
        isCollapse3: false,
        isCollapse4: false,
        isCollapse5: false,
        isCollapse6: false,
        isCollapse7: false,
        isCollapse8: false,
        isCollapse9: false,
        isCollapse10: false,
        isCollapse11: false,
        isCollapse12: false,
        isCollapse13: false,
        isCollapse14: false,
        isCollapse15: false
      },
      imgListBlack: {
        show: true,
        show1: true,
        show2: true,
        show3: true,
        show4: true,
        show5: true,
        show6: true,
        show7: true,
        show8: true,
        show9: true,
        show10: true,
        show11: true,
        show12: true,
        show13: true,
        show14: true,
        show15: true
      },
      flag3: false,
      flag4: true,
      name: sessionStorage.getItem("sysName"),
      dialogVisible: false,
      centerDialogVisible: false,
      ruleForm2: {
        newPassword: "",
        checkPass: "",
        oldPassword: ""
      },
      rules2: {
        newPassword: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        checkPass: [
          {
            required: true,
            validator: validatePass2,
            trigger: "blur"
          }
        ]
      },
      curTime: new Date().getTime(), // 当前服务器时间
      countDownInfo: null, // 定时器所需信息
      questionInfo:''//显示题干信息
      // writeMessageShow: false
    };
  },
  created() {
    this.getDate()
    
  },
  mounted() {
    this.test();
  },
  components: {
    countDown,
    backBtn,
    questionInfo
  },
  methods: {
    close() {
      // this.show.isCollapse = !this.show.isCollapse;
      if (!this.show.isCollapse) {
        this.show.isCollapse = !this.show.isCollapse;
        this.flag3 = true;
        this.flag4 = false;
      } else {
        this.show.isCollapse = !this.show.isCollapse;
        this.flag3 = false;
        this.flag4 = true;
      }
    },
    test() {
      // console.log(this.$refs.leftnav.$children[0])
      // console.log(this.$refs['leftnav'])
      // window.innerHeight
      // this.$refs.leftnav.$children[0].width=20+'px'
      // 网页可见区域高：" document.body.clientHeight;
      // 网页可见区域高：" document.body.offsetHeight "
      // 屏幕可用工作区宽度：" window.screen.availWidth;
      this.leftnavWidth = window.innerHeight;
      // console.log(this.leftnavWidth)
    },
    enter(index) {
      const obj = this.show;
      if (!this.show.isCollapse) {
        Object.keys(obj).forEach((key, q) => {
          if (q === index) {
            this.show[key] = true;
          }
          // else this.show[key] = false;
        });
        let imglist = this.imgListBlack;
        Object.keys(imglist).forEach((b, i) => {
          if (i === index) {
            this.imgListBlack[b] = false;
          }
        });
      }
    },
    leave(index) {
      const obj = this.show;
      Object.keys(obj).forEach((key, q) => {
        if (q === index) {
          this.show[key] = false;
        }
        // this.show[key] = false;
      });
      let imglist = this.imgListBlack;
      Object.keys(imglist).forEach((b, i) => {
        if (i === index) {
          this.imgListBlack[b] = true;
        }
      });
    },
    back() {
      this.token = sessionStorage.getItem("token");
      let formData = new FormData();
      // const obj = this.token
      // Object.keys(obj).forEach(key => {
      //   formData.append(key, obj[key])
      // })
      formData.append("token", this.token);

      this.$axios.post("/sys/user/logout", formData).then(res => {
        if (res.data.code == "0000") {
          sessionStorage.removeItem("token");
          this.$message({
            type: "success",
            message: "退出成功"
          });
          this.$router.push({ name: "login" });
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    handleClose1() {
      this.$refs.ruleForm2.resetFields();
      this.centerDialogVisible = false;
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
          this.$axios.post("/sys/user/password/modify", formData).then(res => {
            if (res.data.code === "0000") {
              this.centerDialogVisible = false;
              this.$message({
                message: "修改成功",
                type: "success"
              });
            } else {
              this.$message.error(res.data.msg);
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
    // 获取考试信息中的考试时间
    getdetailExam() {
      let examType = sessionStorage.getItem("examType")
      let review = sessionStorage.getItem("review")
      if(examType == "E" && review == "N"){
        let examid = sessionStorage.getItem("examId");
        if(examid !="undefined" && examid != "-1"){
          this.$axios({
          url: window.apiExam+"/exam/detailForStu",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            exam_id:sessionStorage.getItem("examId")
          })
        }).then(res => {
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
    getDate() {
      this.$axios({
        url: window.apiExam+"/common/getDate",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token:sessionStorage.getItem("token")
        })
      }).then(res => {
        if (res.data.code === "0000") {
          this.curTime = res.data.date;
          this.getdetailExam();
        } else {
          this.$message.error('获取当前服务器时间失败, 请刷新页面');
        }
      });
    },
    autoHandInExaminationPaper() {
      this.$message('答题时间即将结束，自动交卷')
      window.location.href = window.teacherSide + "/#/historyTryBook";
      // window.location.href = "http://192.168.1.144:8081" + "/#/historyTryBook";
    },
    // fanhui() {
    //   let exam_id = sessionStorage.getItem("examId")
    //   //  等于-1 代表的是从公司进入的，exam_id == undefined代表从测试进入的      
    //   if(exam_id =="undefined"){
    //     //  window.location.href = window.teacherSide + "/#/startSelfExam";
    //     window.location.href = window.teacherSide + "/#/startSelfExam?flag=" +'continueQ';
    //   }else if(exam_id == "-1" || exam_id == -1 ){
    //     window.location.href = window.teacherSide + "/#/publicRole";
    //   }else {
    //     window.location.href = "http://192.168.1.144:8080" + "/#/exam?exam_id=" + exam_id;
    //   }
    //   if(sessionStorage.getItem("flagTeacher")){
    //     window.location.href = window.teacherSide + "/#/teacherPublicRole";
    //   }
    // }
  }
};
</script>

<style scoped>
.operatHome {
  width: 100%;
  height: 100%;
  /* min-width: 1829px; */
}
.el-container.is-vertical {
  height: 100%;
}
#header {
  background-color: #fff;
  box-shadow: 0 3px 10px #ccc;
  line-height: 68px;
  padding: 0 20px 0 0;
  box-sizing: border-box;
  z-index: 21;
  /* min-width: 1200px; */
  min-width: 1024px;
}
.Nlogo {
  margin: 27px 15px;
  display: inline-block;
  width: 115px;
}
.logoBtn {
  margin: 26px 10px;
}
.setimg {
  float: right;
}
.drop {
  float: right;
  margin-left: 20px;
}
.drop .el-dropdown {
  line-height: 75px;
}
.el-dropdown-menu {
  width: 120px;
  position: absolute;
  top: 50px !important;
  right: 0;
  z-index: 10;
  padding: 10px 0;
  margin: 5px 0;
  background-color: #fff;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  max-height: 400px;
  overflow: auto;
}
.operatHome .el-aside {
  background-color: #fff;
  line-height: 100%;
  overflow: visible;
  z-index: 20;
}
.el-menu {
  border-right: none;
}
.iconImgBox {
  width: 17px;
  height: 17px;
}
.margintit {
  display: inline-block;
  margin-left: 5px;
}
.operatHome .el-menu-vertical-demo .el-menu-item {
  border-left: 3px solid transparent;
}
.operatHome .el-menu-vertical-demo .el-menu-item:hover {
  border-left: 3px solid #e50109;
  background-color: #edf1f4;
}
.operatHome .el-menu-item {
  background-color: #fff;
}
.operatHome .el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 144px;
  z-index: 20;
}
.operatHome .el-menu-item {
  background-color: #fff;
}
.el-menu--collapse {
  width: 64px;
}
.el-main {
  background-color: #eceff4;
  /* min-width: 1700px; */
  width: 100%;
  overflow-x: scroll;
  box-sizing: border-box;
  padding: 15px;
}
.exam-interval {
  display: inline-block;
  background-color: #fff;
}
.countDown{
  float: right;
  margin-right: 15px;
}
</style>