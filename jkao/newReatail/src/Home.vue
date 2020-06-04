<template>
  <div class="box" id="shopNavigation">
    <div class="head">
      <!-- <div> -->
      <!-- <div class="head-nav">
        <img class="Nlogo" src="./Uimage/logo.png" alt />
        <img class="logoBtn" v-if="flag4" @click="close" src="./Uimage/icon.png" alt />
        <img class="logoBtn" src="./Uimage/icon (3).png" @click="close" v-if="flag3" alt="">
      </div> -->
      <div style="float:left;">
          <div class="chooDrop">
            <p class="el-dropdown-link" style="display:inline-block;line-height:64px">
              <span style="font-size: 22px;">门店</span>               
            </p>
            <!-- <el-dropdown trigger="click">
              <p class="el-dropdown-link" style="display:inline-block;line-height:64px">
                <span style="font-size: 22px;">门店</span> 
                <sub>(<i class="el-icon-arrow-down el-icon--right">切换</i>)</sub>              
              </p>
              <el-dropdown-menu slot="dropdown">
                <router-link to="/storeManage"><el-dropdown-item>运营后台</el-dropdown-item></router-link>
                <router-link to="/shoporder"><el-dropdown-item>供应商</el-dropdown-item></router-link>
                <router-link to="/WSettings"><el-dropdown-item>仓库后台</el-dropdown-item></router-link>
              </el-dropdown-menu>
            </el-dropdown> -->
          </div>
          <img v-if="flag4" @click="close" src="./Uimage/icon.png" />
          <img src="./Uimage/icon (3).png" @click="close" v-if="flag3" />
        </div>
      <div class="top">
        <div class="setimg">
          <i>欢迎你,{{username}}</i>
          <el-dropdown>
            <span class="el-dropdown-link">
              <img class="vertical" src="./Uimage/setting_icon.png" alt />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <div class="buttonbox" @click="storeInfo">
                  <img src="./images/shop_icon.png" alt />
                  <span>门店信息</span>
                </div>
              </el-dropdown-item>
              <!-- <el-dropdown-item>
                <div class="buttonbox" @click="centerDialogVisible = true">
                  <img src="./images/password_icon.png" alt />
                  <span>修改密码</span>
                </div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div class="buttonbox" @click="exit">
                  <img src="./images/shut_icon.png" alt />
                  <span>退出系统</span>
                </div>
              </el-dropdown-item> -->
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="countDown">
          <countDown
            :examInfo="countDownInfo"
            v-if="countDownInfo"
            @autoSubmit="autoHandInExaminationPaper"
            ref="countDown"
            class="exam-interval fr"
          ></countDown>
          <questionInfo :questionInfo = "questionInfo"></questionInfo>
          <backBtn></backBtn>
        </div>
      </div>
    </div>
    <div class="content">
      <!-- <div class="aside"></div> -->
      <!-- 展开的nav -->
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
          <!-- v-show="show.isCollapse1 === true" -->
          <img
            class="iconImgBox"
            v-if="imgListBlack.show1"
            src="./Uimage/dinggouzuoye_icon.png"
            alt
          />
          <img class="iconImgBox" v-if="show.isCollapse1" src="./Uimage/dinggouzuoye_icon1.png" alt />
          <span slot="title">订购作业</span>
          <el-menu-item-group v-show="show.isCollapse1 === true">
            <div class="aside-menu">
              <router-link to="/choose">选品订购</router-link>
              <router-link to="/management">叫货单管理</router-link>
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
            class="iconImgBox"
            v-if="imgListBlack.show2"
            src="./Uimage/shouhuozuoye_icon.png"
            alt
          />
          <img class="iconImgBox" v-if="show.isCollapse2" src="./Uimage/shouhuozuoye_icon1.png" alt />
          <span slot="title">收货作业</span>
          <el-menu-item-group v-show="show.isCollapse2 === true">
            <div class="aside-menu">
              <router-link to="/receiving">常规收货</router-link>
              <router-link to="/amendment">收货修正单</router-link>
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
            class="iconImgBox"
            v-if="imgListBlack.show3"
            src="./Uimage/ordermanagement_icon.png"
            alt
          />
          <img
            class="iconImgBox"
            v-if="show.isCollapse3"
            src="./Uimage/ordermanagement_icon1.png"
            alt
          />
          <span slot="title">订单管理</span>
          <el-menu-item-group v-show="show.isCollapse3 === true">
            <div class="aside-menu">
              <router-link to="/query">收银订单</router-link>
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
            class="iconImgBox"
            v-if="imgListBlack.show4"
            src="./Uimage/dianyuanguanli_icon.png"
            alt
          />
          <img
            class="iconImgBox"
            v-if="show.isCollapse4"
            src="./Uimage/dianyuanguanli_icon1.png"
            alt
          />
          <span slot="title">店员管理</span>
          <el-menu-item-group v-show="show.isCollapse4 === true">
            <div class="aside-menu">
              <router-link to="/assistant">店员管理</router-link>
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
            class="iconImgBox"
            v-if="imgListBlack.show5"
            src="./Uimage/mrijieguanli_icon.png"
            alt
          />
          <img class="iconImgBox" v-if="show.isCollapse5" src="./Uimage/mrijieguanli_icon1.png" alt />
          <span slot="title">日结管理</span>
          <el-menu-item-group v-show="show.isCollapse5 === true">
            <div class="aside-menu">
              <router-link to="/dailyManager">日结管理</router-link>
            </div>
          </el-menu-item-group>
        </el-menu-item>
        <el-menu-item
          class="acne"
          index="6"
          @mouseenter.native.prevent="enter(6)"
          @mouseleave.native.prevent="leave(6)"
        >
          <img class="iconImgBox" v-if="imgListBlack.show6" src="./Uimage/Promotioncenter.png" alt />
          <img class="iconImgBox" v-if="show.isCollapse6" src="./Uimage/Promotioncenter1.png" alt />
          <span slot="title">库存管理</span>
          <el-menu-item-group v-show="show.isCollapse6 === true">
            <div class="aside-menu">
              <router-link to="/inventory">商品库存管理</router-link>
            </div>
          </el-menu-item-group>
        </el-menu-item>
        <el-menu-item
          class="acne"
          index="7"
          @mouseenter.native.prevent="enter(7)"
          @mouseleave.native.prevent="leave(7)"
        >
          <img class="iconImgBox" v-if="imgListBlack.show7" src="./Uimage/shujufenxi_icon.png" alt />
          <img class="iconImgBox" v-if="show.isCollapse7" src="./Uimage/shujufenxi_icon1.png" alt />
          <span slot="title">数据分析</span>
          <el-menu-item-group v-show="show.isCollapse7 === true">
            <div class="aside-menu">
              <router-link to="/echarts">数据分析</router-link>
            </div>
          </el-menu-item-group>
        </el-menu-item>
        <el-menu-item
          class="acne"
          index="8"
          @mouseenter.native.prevent="enter(8)"
          @mouseleave.native.prevent="leave(8)"
        >
          <img class="iconImgBox" v-if="imgListBlack.show8" src="./Uimage/salesreturn_icon.png" alt />
          <img class="iconImgBox" v-if="show.isCollapse8" src="./Uimage/salesreturn_icon1.png" alt />
          <span slot="title">退货单管理</span>
          <el-menu-item-group v-show="show.isCollapse8 === true">
            <div class="aside-menu">
              <router-link to="/billManager">退货单管理</router-link>
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
            class="iconImgBox"
            v-if="imgListBlack.show9"
            src="./Uimage/Transferofsingle_icon.png"
            alt
          />
          <img
            class="iconImgBox"
            v-if="show.isCollapse9"
            src="./Uimage/Transferofsingle_icon1.png"
            alt
          />
          <span slot="title">转移单管理</span>
          <el-menu-item-group v-show="show.isCollapse9 === true">
            <div class="aside-menu">
              <router-link to="/transferSlip">转移单管理</router-link>
            </div>
          </el-menu-item-group>
        </el-menu-item>
        <el-menu-item
          class="acne"
          index="10"
          @mouseenter.native.prevent="enter(10)"
          @mouseleave.native.prevent="leave(10)"
        >
          <img class="iconImgBox" v-if="imgListBlack.show10" src="./Uimage/scrapform_icon.png" alt />
          <img class="iconImgBox" v-if="show.isCollapse10" src="./Uimage/scrapform_icon1.png" alt />
          <span slot="title">报废单管理</span>
          <el-menu-item-group v-show="show.isCollapse10 === true">
            <div class="aside-menu">
              <router-link to="/scrapManage">报废单管理</router-link>
            </div>
          </el-menu-item-group>
        </el-menu-item>
        <el-menu-item
          class="acne"
          index="11"
          @mouseenter.native.prevent="enter(11)"
          @mouseleave.native.prevent="leave(11)"
        >
          <img
            class="iconImgBox"
            v-if="imgListBlack.show11"
            src="./Uimage/systemmanagement_icon.png"
            alt
          />
          <img
            class="iconImgBox"
            v-if="show.isCollapse11"
            src="./Uimage/systemmanagement_icon1.png"
            alt
          />
          <span slot="title">盘点管理</span>
          <el-menu-item-group v-show="show.isCollapse11 === true">
            <div class="aside-menu">
              <router-link to="/storeManagement">盘点管理</router-link>
            </div>
          </el-menu-item-group>
        </el-menu-item>
      </el-menu>
      <div class="main">
        <router-view></router-view>
      </div>
    </div>
    <!-- 遮罩层门店信息 -->
    <div class="showStoreMask" v-show="shoreListImg">
      <div class="showMaskContent" ref="msk">
        <div class="show">
          <div class="storepos">
            <img src="./assets/delete.png" @click="hideDel" class="delet" />
            <div class="storeDivBox">
              <div class="showleft">
                <p>
                  门店编号：
                  <span>{{storeImgInfo.code}}</span>
                </p>
                <p>
                  门店名称：
                  <span>{{storeImgInfo.name}}</span>
                </p>
                <p>
                  类型：{{storeImgInfo.type}}
                  <!-- <span v-show="storeImgInfo.type=='jm'">加盟店1</span>
                  <span v-show="storeImgInfo.type=='zy'">直营店</span> -->
                </p>
                <p>
                  所在区域：
                  <span>{{storeImgInfo.province}}{{storeImgInfo.city}}{{storeImgInfo.area}}</span>
                </p>
                <p>
                  详细地址：
                  <span>{{storeImgInfo.address}}</span>
                </p>
              </div>
              <div class="showright">
                <p>
                  开店时间：
                  <span>{{storeImgInfo.openTime | converTime('YYYY-MM-DD')}}</span>
                </p>
                <p>
                  营业时间：
                  <span
                    v-if="storeImgInfo.businessTimeStart!=null && storeImgInfo.businessTimeEnd!=null"
                  >{{storeImgInfo.businessTimeStart|fmtDate1}}--{{storeImgInfo.businessTimeEnd|fmtDate1}}</span>
                </p>
                <p>
                  门店联系人：
                  <span>{{storeImgInfo.contactsName}}</span>
                </p>
                <p>
                  联系方式：
                  <span>{{storeImgInfo.contactsPhone}}</span>
                </p>
              </div>
            </div>
            <div class="storeShowCard">
             <P>证照信息：</P>
              <div  class="imageBox">
                <span v-if="!this.storeImgInfo.resourceCodes" style="color:#ccc">暂无信息:</span>
                <img v-for="(item,index) in this.storeImgInfo.resourceCodes"
                  :key="index" title="查看大图" :src="uploadUrl+item" alt @click="readImage(index,item)" class="littleImg">
                  <el-dialog :visible.sync="dialogVisible1" :modal-append-to-body="false" center width="800px">
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
          <el-button class="theBtn queryButton" @click="submitForm('ruleForm2')">提交</el-button>
          <el-button class="theBtn resetButton" @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>

import qs from "qs";
import countDown from "@/components/countDown.vue";
import questionInfo from "@/components/questionInfo.vue";
import backBtn from "@/components/backBtn.vue";
export default {
  name: "shopNavigation",
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
      flag: false,
      flag2: true,
      flag3:false,
      flag4:true,
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
        isCollapse11: false
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
        show11: true
      },
      // url: "http://192.168.1.168:8080",
      storeImgInfo: {
        resourceCodes:[]
      },
      shoreListImg: false,
      username: sessionStorage.getItem("username"),
      code: sessionStorage.getItem("code"),
      dialogVisible: false,
      centerDialogVisible: false,
      dialogVisible1: false,
      dialogImageUrl: "",
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
          { required: true, validator: validatePass2, trigger: "blur" }
        ]
      },
      curTime: new Date().getTime(), // 当前服务器时间
      countDownInfo: null, // 定时器所需信息
      questionInfo:sessionStorage.getItem("questionInfo")//显示题干信息
    };
  },
  created() {
    this.showInfo();
    this.getDate()
  },
  components: {
    countDown,
    questionInfo,
    backBtn
  },
  methods: {
    close() {
      if(!this.show.isCollapse){
        this.show.isCollapse = !this.show.isCollapse;
        this.flag3=true
        this.flag4=false
      }else {
        this.show.isCollapse = !this.show.isCollapse;
        this.flag3=false
        this.flag4=true
      }
    },
    //查看大图
    readImage(index, item) {
      this.dialogVisible1 = true;
      this.dialogImageUrl =this.uploadUrl+item;
    },
    //退出登录
    exit() {
      this.$axios
        .post(
          "/store/index/logout",
          qs.stringify({
            token: sessionStorage.getItem("token")
          })
        )
        .then(res => {
          if (res.data.code === "0000") {
            sessionStorage.removeItem("token");
            this.$message({
              type: "success",
              message: "退出成功"
            });
            this.$router.push({
              name: "login"
            });
          } else if (res.data.code !== "0000") {
            this.$message.error(res.data.msg);
          }
        });
    },
    // 请求门店信息
    storeInfo() {
      this.shoreListImg = true;
      this.showInfo();
    },
    // showInfo() {
    //   this.$axios
    //     .post(
    //       "/store/index/info",
    //       qs.stringify({
    //         token: sessionStorage.getItem("token")
    //       })
    //     )
    //     .then(res => {
    //       if (res.data.code === "0000") {
    //         this.storeImgInfo = res.data.data;
    //         if (this.storeImgInfo.resourceCodes != null) {
    //           this.storeImgInfo.resourceCodes = JSON.parse(
    //             this.storeImgInfo.resourceCodes
    //           );
    //         }
    //         sessionStorage.setItem("shopName", this.storeImgInfo.name);
    //       }
    //     });
    // },
    showInfo() {
      this.$axios({
      url: window.apiStore + "index/info",
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data:qs.stringify({token:sessionStorage.getItem("token")})
      }).then( res =>{
        if(res.data.code === "0000") {
          this.storeImgInfo = res.data.data;
          if (this.storeImgInfo.resourceCodes != null) {
            this.storeImgInfo.resourceCodes = JSON.parse(this.storeImgInfo.resourceCodes)
          }
        }
        sessionStorage.setItem("shopName", this.storeImgInfo.name);
      })
    },

    hideDel() {
      this.shoreListImg = false;
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
    handleClose1() {
      this.$refs.ruleForm2.resetFields();
      this.centerDialogVisible = false;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
            .post("/store/index/password/modify", formData)
            .then(res => {
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
    },
  }
};
</script>
<style  scoped>
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

.box {
  width: 100%;
  height: 100%;
  background-color: #edf1f5;
  display: flex;
  flex-direction: column;
  /* min-width: 1600px;
  overflow: hidden; */
}

.head {
  height: 68px;
  width: 100%;
  background-color: #fff;
  /* box-shadow: 0 1px 10px rgba(204, 204, 204, 0.8); */
  box-shadow: 0 3px 10px #ccc;
  /* margin-bottom: 6px; */
  z-index: 8;
}

#shopNavigation .content {
  flex: 1;
  width: 100%;
  height: 100%;
  /* background-color: pink; */
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  /* box-shadow: 5px 1px 10px rgba(0, 0, 0, 0.5); */
}
/* ======= */
#shopNavigation .head-nav {
  height: 68px;
  float: left;
}
#shopNavigation .top {
  float: right;
  margin-top: 18px;
}
.el-dropdown-link {
  margin-left: 20px;
}
#shopNavigation .top .setimg {
  float: right;
  margin-right: 40px;
  padding-top: 2px;
}
#shopNavigation .Nlogo {
  margin: 27px 15px;
  width: 115px;
  cursor: pointer;
}
#shopNavigation .logoBtn {
  margin: 26px 10px;
  cursor: pointer;
}
/* 遮罩层 */
#shopNavigation .showStoreMask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 101;
}
#shopNavigation .showMaskContent {
  top: 120px;
  left: 34%;
  margin: 0 auto;
  width: 600px;
  height: 500px;
  position: absolute;
  background-color: #fff;
}
#shopNavigation .show {
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
  box-sizing: border-box;
}
#shopNavigation .storepos {
  background: url(./images/mbgk2.png) no-repeat;
  background-size: 100%;
  position: absolute;
  width: 100%;
  top: -21px;
  left: 0;
}
#shopNavigation .storeDivBox {
  display: flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  margin-top: 66px;
}
.storeDivBox p {
  margin: 8px 0;
}
.showleft {
  margin-left: 40px;
}
#shopNavigation .showright {
  margin-left: 20%;
}
#shopNavigation .storeShowCard {
  margin-left: 6.7%;
  margin-top: 10px;
}
#shopNavigation .storeShowCard ul {
  margin-top: 4px;
}
#shopNavigation .storeShowCard ul li img {
  /* height: 240px; */
  width: 120px;
  height: 90px;
}
#shopNavigation .delet {
  position: absolute;
  right: 10px;
  top: 28px;
  cursor: pointer;
}
#shopNavigation .el-menu {
  border-right: none;
}
#shopNavigation .iconImgBox {
  width: 17px;
  height: 17px;
  margin-right: 5px;
}
#shopNavigation .el-menu-vertical-demo .el-menu-item {
  border-left: 3px solid transparent;
}
#shopNavigation .el-menu-vertical-demo .el-menu-item:hover {
  border-left: 3px solid #e50109;
  background-color: #edf1f4;
}
#shopNavigation .el-menu-item {
  background-color: #fff;
}
#shopNavigation .el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 144px;
  z-index: 7;
}
#shopNavigation .el-menu-item {
  background-color: #fff;
}
/* nav end */
/* main start */
#shopNavigation .main {
  background-color: #eceff4;
  padding: 15px 15px 0px 15px;
  box-sizing: border-box;
  flex: 1;
  width: 100%;
  height: 100%;
  overflow: auto;
  
  /* min-width: 1600px; */
}

/* 原来的样式 */
#shopNavigation .Nlogo {
  margin: 27px 15px;
  width: 115px;
  cursor: pointer;
}
#shopNavigation .logoBtn {
  margin: 26px 10px;
  cursor: pointer;
}
/* main end */


/* 下拉 */
.el-dropdown-menu {
  width: 135px;
}
.vertical  {
  vertical-align: middle;
}
.imageBox .infoImg{
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
.littleImg{
  cursor: pointer;
  margin-left: 10px;
}
.chooDrop{
  display:inline-block;margin-right:7px;cursor: pointer;height:64px
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