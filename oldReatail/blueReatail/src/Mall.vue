<template>
  <div class="mallHome">
    <el-container>
      <el-header id="header" style="height:68px">
        <img class="Nlogo" src="./Uimage/logo.png" alt />
        <img class="logoBtn" v-if="flag4" @click="close" src="./Uimage/icon.png" alt />
        <img class="logoBtn" src="./Uimage/icon (3).png" @click="close" v-if="flag3" alt />
        <div class="setimg">
          <i>欢迎你,{{name}}</i>
          <div class="drop">
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
              </el-dropdown-menu>
            </el-dropdown>
          </div>
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
                src="./assets/basicsetting_icon.png"
                class="iconImgBox"
                v-if="imgListBlack.show1"
              />
              <img
                src="./assets/basicsetting_icon(1).png"
                class="iconImgBox"
                v-if="show.isCollapse1"
              />
              <span slot="title" class="margintit">基础设置</span>
              <el-menu-item-group v-show="show.isCollapse1 === true">
                <div class="aside-menu">
                  <router-link to="/Advertising">广告位管理</router-link>
                  <router-link to="/activityModuleManage">模块管理</router-link>
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
                src="./assets/ordermanagement_icon.png"
                alt
                class="iconImgBox"
                v-if="imgListBlack.show2"
              />
              <img
                src="./assets/ordermanagement_icon(1).png"
                alt
                class="iconImgBox"
                v-if="show.isCollapse2"
              />
              <span slot="title" class="margintit">订单管理</span>
              <el-menu-item-group v-show="show.isCollapse2 === true">
                <div class="aside-menu">
                  <router-link to="/mallOrderinquiry">订单查询</router-link>
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
                src="./assets/storemanagement_icon(1).png"
                alt
                class="iconImgBox"
                v-if="imgListBlack.show3"
              />
              <img
                src="./assets/storemanagement_icon.png"
                alt
                class="iconImgBox"
                v-if="show.isCollapse3"
              />
              <span slot="title" class="margintit">仓库管理</span>
              <el-menu-item-group v-show="show.isCollapse3 === true">
                <div class="aside-menu">
                  <router-link to="/mallPurchase">采购入库</router-link>
                  <router-link to="/mallOutbound">商城出库</router-link>
                  <router-link to="/mallInquiry">库存查询</router-link>
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
        isCollapse3: false
      },
      imgListBlack: {
        show: true,
        show1: true,
        show2: true,
        show3: true
      },
      flag3: false,
      flag4: true,
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
      }
      // writeMessageShow: false
    };
  },
  created() {},
  mounted() {
    this.test();
  },
  methods: {
    close() {
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
      this.leftnavWidth = window.innerHeight;
    },
    enter(index) {
      const obj = this.show;
      if (!this.show.isCollapse) {
        Object.keys(obj).forEach((key, q) => {
          if (q === index) {
            this.show[key] = true;
          }
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

      this.$axios.post("/mall/index/logout", formData).then(res => {
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
          this.$axios.post("/mall/index/password/modify", formData).then(res => {
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
          console.log("error!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
.mallHome {
  width: 100%;
  height: 100%;
  /* min-width: 1829px; */
}
.el-container.is-vertical{
  height: 100%;
}
#header {
  background-color: #fff;
  box-shadow: 0 3px 10px #ccc;
  line-height: 68px;
  padding: 0 20px 0 0;
  box-sizing: border-box;
  z-index: 21;
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
.mallHome .el-aside {
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
.mallHome .el-menu-vertical-demo .el-menu-item {
  border-left: 3px solid transparent;
}
.mallHome .el-menu-vertical-demo .el-menu-item:hover {
  border-left: 3px solid #e50109;
  background-color: #edf1f4;
}
.mallHome .el-menu-item {
  background-color: #fff;
}
.mallHome .el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 144px;
  z-index: 20;
}
.mallHome .el-menu-item {
  background-color: #fff;
}
.el-menu--collapse{
  width: 64px;
}
.el-main {
  background-color: #eceff4;
  width: 100%;
  overflow-x: scroll;
  box-sizing: border-box;
  padding: 15px;
}
</style>