<template>
  <div class="suppliHome">
    <el-container>
      <el-header id="suppHeader" style="height:68px">
        <div style="float:left;height:68px;">
          <div style="display:inline-block;margin-right:7px;">
            <p class="el-dropdown-link" style="display:inline-block;">
              <span style="font-size: 22px;padding-left: 20px;">供应商</span>              
            </p>
            <!-- <el-dropdown trigger="click">
              <p class="el-dropdown-link" style="display:inline-block">
                <span style="font-size: 22px;padding-left: 20px;">供应商</span>
                <sub>(<i class="el-icon-arrow-down el-icon--right">切换</i>)</sub>
              </p>
              <el-dropdown-menu slot="dropdown">
                <router-link to="/storeManage"><el-dropdown-item>运营后台</el-dropdown-item></router-link>
                <router-link to="/choose"><el-dropdown-item>门店</el-dropdown-item></router-link>
                <router-link to="/WSettings"><el-dropdown-item>仓库后台</el-dropdown-item></router-link>
              </el-dropdown-menu>
            </el-dropdown> -->
          </div>
          <img v-if="flag4" @click="close" src="./Uimage/icon.png" />
          <img src="./Uimage/icon (3).png" @click="close" v-if="flag3" />
        </div>
        <div class="setimg">
          <i>欢迎你,{{name}}</i>
          <div class="drop">
            <el-dropdown>
              <span class="el-dropdown-link">
                <img src="./Uimage/setting_icon.png" alt />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <div class="buttonbox" @click="suppInfo">
                    <img src="./images/shop_icon.png" alt />
                    <span>供应商信息</span>
                  </div>
                </el-dropdown-item>
                <!-- <el-dropdown-item>
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
                    <span>关于版本</span>
                  </div>
                </el-dropdown-item> -->
              </el-dropdown-menu>
            </el-dropdown>
          </div>
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
          <questionInfo></questionInfo>
        </div>
      </el-header>
      <el-container>
        <el-aside style="width:auto">
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
                src="./Uimage/ordermanagement_icon.png"
                alt
                class="iconImgBox"
                v-if="imgListBlack.show1"
              />
              <img
                src="./Uimage/ordermanagement_icon1.png"
                alt
                class="iconImgBox"
                v-if="show.isCollapse1"
              />
              <span slot="title" class="margintit">订单管理</span>
              <el-menu-item-group v-show="show.isCollapse1 === true">
                <div class="aside-menu">
                  <router-link to="/shoporder">采购单管理</router-link>
                </div>
                <div class="aside-menu">
                  <router-link to="/revise">配送单管理</router-link>
                </div>
                <div class="aside-menu">
                  <router-link to="/amendList">修正单管理</router-link>
                </div>
                <div class="aside-menu">
                  <router-link to="/GbManager">退货单管理</router-link>
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
                src="./Uimage/commoditymanagement_icon.png"
                alt
                class="iconImgBox"
                v-if="imgListBlack.show2"
              />
              <img
                src="./Uimage/commoditymanagement_icon1.png"
                alt
                class="iconImgBox"
                v-if="show.isCollapse2"
              />
              <span slot="title" class="margintit">商品管理</span>
              <el-menu-item-group v-show="show.isCollapse2 === true">
                <div class="aside-menu">
                  <router-link to="/shopManage">商品管理</router-link>
                </div>
              </el-menu-item-group>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
      <!-- 遮罩层门店信息 -->
      <div class="showStoreMask" v-show="supplierInfo">
        <div class="showMaskContent" ref="msk">
          <div class="show">
            <div class="storepos">
              <img src="./assets/delete.png" @click="hideDel" class="delet" />
              <div class="storeDivBox">
                <div class="showleft">
                  <p>
                    供应商编号：
                    <span>{{suppListimg.code}}</span>
                  </p>
                  <p>
                    所在区域：
                    <span>{{suppListimg.province}}{{suppListimg.city}}{{suppListimg.area}}</span>
                  </p>
                  <p>
                    联系人：
                    <span>{{suppListimg.contactsName}}</span>
                  </p>
                  <p>
                    采购中心：
                    <span>{{suppListimg.purchase}}</span>
                  </p>
                  <p>
                    到货周期（天）：
                    <span>{{suppListimg.arrivalCycle}}</span>
                  </p>
                </div>
                <div class="showright">
                  <p>
                    供应商名称：
                    <span>{{suppListimg.name}}</span>
                  </p>
                  <p>
                    详细地址：
                    <span>{{suppListimg.address}}</span>
                  </p>
                  <p>
                    联系方式：
                    <span>{{suppListimg.contactsPhone}}</span>
                  </p>
                  <p>
                    物流中心：
                    <span>{{suppListimg.logistics}}</span>
                  </p>
                </div>
              </div>
              <div class="storeShowCard">
                <P>证照信息：</P>
                <!-- <ul>
                  <li
                    v-for="(item,index) in this.suppListimg.resourceCodes"
                    :key="index"
                    class="inline"
                  >
                    <img :src="item" alt @click="readImage(index,item)" style="cursor: pointer;" />
                  </li>
                  <el-dialog
                    :visible.sync="dialogVisible1"
                    :modal-append-to-body="false"
                    center
                    width="50%"
                  >
                    <img width="100%" :src="dialogImageUrl" alt="证照信息.jpg" />
                  </el-dialog>
                </ul>-->
                <div class="imageBox">
                  <span v-if="!this.suppListimg.resourceCodes" style="color:#ccc">暂无信息:</span>
                  <img
                    v-for="(item,index) in this.suppListimg.resourceCodes"
                    :key="index"
                    title="查看大图"
                    :src="uploadUrl+item"
                    class="littleImg"
                    alt
                    @click="readImage(index,item)"
                  />
                  <el-dialog
                    :visible.sync="dialogVisible1"
                    :modal-append-to-body="false"
                    center
                    width="800px"
                  >
                    <div class="imgBox1">
                      <img class="infoImg" :src="dialogImageUrl" alt="证照信息.jpg" />
                    </div>
                  </el-dialog>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 供应商信息结束 -->
      <el-dialog
        title="修改密码"
        :visible.sync="centerDialogVisible"
        width="30%"
        center
        :before-close="handleClose1"
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
            <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
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
      token: "",
      isActive: true,
      isError: false,
      show: {
        isCollapse: false,
        isCollapse1: false,
        isCollapse2: false
      },
      imgListBlack: {
        //图标
        show: true,
        show1: true,
        show2: true
      },
      flag3: false,
      flag4: true,
      name: sessionStorage.getItem("supplierName"),
      dialogVisible: false,
      centerDialogVisible: false,
      dialogVisible1: false,
      dialogImageUrl: "",
      // url: "http://192.168.1.168:8080",
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
      suppListimg: {},
      supplierInfo: false,
      curTime: new Date().getTime(), // 当前服务器时间
      countDownInfo: null, // 定时器所需信息
      questionInfo:sessionStorage.getItem("questionInfo")//显示题干信息
    };
  },
  created() {
    this.getDate()
  },
  components: {
    countDown,
    questionInfo,
    backBtn
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
    //查看大图
    readImage(index, item) {
      this.dialogVisible1 = true;
      this.dialogImageUrl = this.uploadUrl + item;
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
      formData.append("token", this.token);
      this.$axios.post("/supplier/index/logout", formData).then(res => {
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
          this.$axios
            .post("/supplier/index/password/modify", formData)
            .then(res => {
              if (res.data.code === "0000") {
                this.centerDialogVisible = false;
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
                this.$refs[formName].resetFields();
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
    // 请求供应商信息
    suppInfo() {
      // 展示遮罩层
      this.supplierInfo = true;
      this.$axios({
        url: window.apiSuppli + "index/detail",
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: qs.stringify({
          token: sessionStorage.getItem("token")
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.suppListimg = res.data.data;
          if (this.suppListimg.resourceCodes != null) {
            this.suppListimg.resourceCodes = JSON.parse(
              this.suppListimg.resourceCodes
            );
          }
        }
      });
    },
    hideDel() {
      this.supplierInfo = false;
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
            exam_id:sessionStorage.getItem("examId"),
            token:sessionStorage.getItem("token")
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
    }
  }
};
</script>
<style scoped>
.suppliHome {
  width: 100%;
  height: 100%;
  /* min-width: 1829px; */
}
.el-container.is-vertical {
  height: 100%;
}
#suppHeader {
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
  width: 140px;
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
.suppliHome .showStoreMask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 101;
}
.suppliHome .showMaskContent {
  top: 120px;
  left: 34%;
  margin: 0 auto;
  width: 600px;
  height: 500px;
  position: absolute;
  background-color: #fff;
}
.suppliHome .show {
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
  box-sizing: border-box;
}
.suppliHome .storepos {
  background: url(./images/mbgk.png) no-repeat;
  background-size: 100%;
  position: absolute;
  width: 100%;
  top: -21px;
  left: 0;
}
.suppliHome .storeDivBox {
  display: flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  margin-top: 66px;
}
.storeDivBox p {
  margin: 8px 0;
  width: 240px;
}
.showleft {
  margin-left: 40px;
}
.suppliHome .showright {
  margin-left: 20%;
}
.suppliHome .storeShowCard {
  margin-left: 6.7%;
  margin-top: 10px;
}
.suppliHome .storeShowCard ul {
  margin-top: 4px;
}
.suppliHome .storeShowCard ul li {
  float: left;
  margin: 0 10px;
  width: 120px;
  height: 90px;
}
.suppliHome .storeShowCard ul li img {
  width: 120px;
  height: 90px;
}
.suppliHome .delet {
  position: absolute;
  right: 10px;
  top: 28px;
  cursor: pointer;
}
.suppliHome .el-aside {
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
.suppliHome .el-menu-vertical-demo .el-menu-item {
  border-left: 3px solid transparent;
}
.suppliHome .el-menu-vertical-demo .el-menu-item:hover {
  border-left: 3px solid #e50109;
  background-color: #edf1f4;
}
.suppliHome .el-menu-item {
  background-color: #fff;
}
.suppliHome .el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 144px;
  z-index: 20;
}

.suppliHome .el-menu-item {
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
.imageBox .infoImg {
  /* width: 50%;
  height: 50%; */
  width: 100%;
  height: 100%;
}
.imageBox {
  height: 121px;
}
.imageBox img {
  width: 18%;
  height: 100%;
  /* margin-left: 10px; */
}
.littleImg {
  cursor: pointer;
  margin-left: 10px;
}
/* 考试时间 */
.exam-interval {
  display: inline-block;
  background-color: #fff;
}
.countDown{
  float: right;
  margin-right: 15px;
}
</style>