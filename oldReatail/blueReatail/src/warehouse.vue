<template>
  <div class="box" id="shopNavigation">
    <div class="head">
      <div class="head-nav">
        <img class="Nlogo" src="./Uimage/logo.png" alt />
        <!-- <img class="logoBtn" @click="close" src="./Uimage/icon.png" alt /> -->
        <img class="logoBtn" v-if="flag4" @click="close" src="./Uimage/icon.png" alt />
        <img class="logoBtn" src="./Uimage/icon (3).png" @click="close" v-if="flag3" alt="">
      </div>
      <div class="top">
        <div class="setimg">
          <i>欢迎你,{{name}}</i>
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
                <div class="buttonbox" @click="exitWare">
                  <img src="./images/shut_icon.png" alt />
                  <span>退出系统</span>
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        
      </div>
    </div>
    <div class="content">
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
          <img
            class="iconImgBox"
            v-if="imgListBlack.show1"
            src="./Uimage/basicsetting_icon.png"
            alt
          />
          <img src="./Uimage/basicsetting_icon1.png" class="iconImgBox" v-if="show.isCollapse1" alt />
          <span slot="title">基础设置</span>
          <el-menu-item-group v-show="show.isCollapse1 === true">
            <div class="aside-menu">
              <router-link to="/WSettings">仓库设置</router-link>
            </div>
            <div class="aside-menu">
              <router-link to="/areaSetting">库区设置</router-link>
            </div>
            <div class="aside-menu">
              <router-link to="/shelvesShop">货位商品关联</router-link>
            </div>
            <div class="aside-menu">
              <router-link to="/dispatchingList">配送路线</router-link>
            </div>
            <div class="aside-menu">
              <router-link to="/setOfWaveList">组波策略</router-link>
            </div>
            <div class="aside-menu">
              <router-link to="/distributionList">分配策略</router-link>
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
            src="./Uimage/storemanagement_icon.png"
            alt
          />
          <img src="./Uimage/storemanagement_icon1.png" class="iconImgBox" v-if="show.isCollapse2" alt />
          <span slot="title">仓库管理</span>
          <el-menu-item-group v-show="show.isCollapse2 === true">
            <div class="aside-menu">
              <router-link to="/procurementList">采购入库</router-link>
            </div>
            <div class="aside-menu">
              <router-link to="/otherWarehouseList">其他入库</router-link>
            </div>
            <div class="aside-menu">
              <router-link to="/turnWarehouseList">转库作业</router-link>
            </div>
            <div class="aside-menu">
              <router-link to="/orderWarehouseList">订购出库</router-link>
            </div>
            <div class="aside-menu">
              <router-link to="/Otherdepots">其他出库</router-link>
            </div>
            <div class="aside-menu">
              <router-link to="/storeOutletList">商城出库</router-link>
            </div>
            <div class="aside-menu">
              <router-link to="/wareInventory">盘点管理</router-link>
            </div>
            <div class="aside-menu">
              <router-link to="/wareStock">库存查询</router-link>
            </div>
          </el-menu-item-group>
        </el-menu-item>
        <el-menu-item
          class="acne"
          index="3"
          @mouseenter.native.prevent="enter(3)"
          @mouseleave.native.prevent="leave(3)"
        >
          <img class="iconImgBox" v-if="imgListBlack.show3" src="./Uimage/receipts_icon.png" alt />
          <img src="./Uimage/receipts_icon1.png" class="iconImgBox" v-if="show.isCollapse3" alt />
          <span slot="title">门店单据</span>
          <el-menu-item-group v-show="show.isCollapse3 === true">
            <div class="aside-menu">
              <router-link to="/wareAmendList">修正单管理</router-link>
            </div>
          </el-menu-item-group>
        </el-menu-item>
      </el-menu>
      <div class="main">
        <router-view></router-view>
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
          <el-button type="primary" class="theBtn queryButton                                                                                                                                                                                      " @click="submitForm('ruleForm2')">提交</el-button>
          <el-button class="theBtn resetButton" @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import qs from "qs";
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
       flag3:false,
      flag4:true,
      show: {
        isCollapse: false,
        isCollapse1: false,
        isCollapse2: false,
        isCollapse3: false
      },
      imgListBlack: {
        show: true,
        show1: true,
        show2: true,
        show3: true
      },
      name: sessionStorage.getItem("username"),
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
          { required: true, validator: validatePass2, trigger: "blur" }
        ]
      },
      suppListimg: {},
      supplierInfo: false
    };
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
    enter(index) {
      const obj = this.show;
      if (!this.show.isCollapse) {
        Object.keys(obj).forEach((key, q) => {
          if (q === index) this.show[key] = true;
          this.show.isCollapse=false
        });
        let imglist = this.imgListBlack;
        Object.keys(imglist).forEach((b, i) => {
          if (i === index) {
            this.imgListBlack[b] = false;
             this.show.isCollapse=false
          }
        });
      }
    },
    leave(index) {
      const obj = this.show;
      // Object.keys(obj).forEach(key => {
      //   this.show[key] = false;
      // });
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
    exitWare() {
      this.token = sessionStorage.getItem("token");
      let formData = new FormData();
      formData.append("token", this.token);
      this.$axios.post("/warehouse/index/logout", formData).then(res => {
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
    handleClose1(done) {
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
            .post("/warehouse/index/password/modify", formData)
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 请求供应商信息
    suppInfo() {
      // 展示遮罩层
      //   this.supplierInfo = true;
      /* this.$axios({
        url:window.apiSuppli+'index/detail',
        method:'POST',
        headers:{'content-type': 'application/x-www-form-urlencoded'},
        data:qs.stringify({
          token:sessionStorage.getItem('token')
        })
      }).then(res=>{
        if(res.data.code=='0000'){
          this.suppListimg = res.data.data;
        }
      }) */
    },
    hideDel() {
      //   this.supplierInfo = false;
    }
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
  box-shadow: 0 3px 10px #ccc;
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
  margin-top: 24px;
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
  background: url(./images/storeimg.png) no-repeat;
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
</style>