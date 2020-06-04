<template>
  <div class="left-nav">
    <div>
      <el-menu default-active="1" class="el-menu-vertical-demo">
        <router-link to="/moneyhome">
          <el-menu-item index="1" class="noPda">
            <img src="../assets/tocollectmoney_icon.png" alt class="leftImg" />
            <span slot="title">收银</span>
          </el-menu-item>
        </router-link>
        <router-link to="/shif">
          <el-menu-item index="2" class="noPda">
            <img src="../assets/Accountmanagement_icon.png" alt class="leftImg" />
            <span slot="title">shift账管理</span>
          </el-menu-item>
        </router-link>
        <router-link to="/query">
          <el-menu-item index="3" class="noPda">
            <img src="../assets/orderinquiry_icon.png" alt class="leftImg" />
            <span slot="title">订单查询</span>
          </el-menu-item>
        </router-link>
        <!-- <el-menu-item index="4" class="noPda">
          <img src="../assets/takeoverfrom_icon.png" alt class="leftImg" />
          <span slot="title">
            <router-link to>交班</router-link>
          </span>
        </el-menu-item>
        <el-menu-item index="5" class="noPda" @click="zanli ">
          <img src="../assets/Temporarilyleave_icon.png" alt class="leftImg" />
          <span slot="title">暂离</span>
        </el-menu-item>
        <el-menu-item index="6" class="noPda" @click="checkPWd">
          <img src="../assets/settingup_icon.png" alt class="leftImg" />
          <span slot="title">系统设置</span>
        </el-menu-item> -->
      </el-menu>
      <!-- <Lock @closeMo="lock" v-if="isshow"></Lock> -->
      <!-- <el-dialog
            title="提示"
            :visible.sync="centerDialogVisible"
            width="35%"
            center
            :modal-append-to-body="false"
        >
            <div slot="title" class="auditBtn">
                <span class="el-icon-info"></span>
                <span class="auditBtn-1">提示</span>
            </div>
            <div style="text-align: center">您确定交班?</div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="jiaoban" class="btn12">确 定</el-button>
                <el-button @click="centerDialogVisible = false" class="btn13">取 消</el-button>
            </span>
      </el-dialog>
      <el-dialog
            title="修改密码"
            :visible.sync="centerDialogVisible1"
            center
            :before-close="handleClose1"
            :modal-append-to-body="false"
        >
            <el-form
                :model="ruleForm2"
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
                <div class="center">
                    <el-button type="primary" @click="submitForm('ruleForm2')" class="btn14">提交</el-button>
                    <button @click="fanhui" class="btn15">返回</button>
                </div>
            </el-form>
      </el-dialog> -->
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      isshow: false,
      isCollapse: true,
      centerDialogVisible: false,
      centerDialogVisible1: false,
      current: 0,
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
      }
    };

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
  },
  methods: {
    fanhui() {
      this.centerDialogVisible1 = false;
    },
    // lock() {
    //     this.isshow = this.isshow ? false : true;
    // },
    back() {
      this.centerDialogVisible = true;
    },
    sendmsg() {
      this.$emit("listenchild", true);
      this.centerDialogVisible1 = true;
    },
    handleClose1() {
      this.$refs.ruleForm2.resetFields();
      this.centerDialogVisible1 = false;
    },
    jiaoban() {
      this.$axios
        .post(
          "/clerk/index/logout",
          qs.stringify({
            token: sessionStorage.getItem("token")
          })
        )
        .then(res => {
          if (res.data.code == "0000") {
            sessionStorage.removeItem("token");
            this.$router.push({ name: "login" });
          }
        });
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
            .post("/clerk/index/password/modify", formData)
            .then(res => {
              if (res.data.code == "0000") {
                this.centerDialogVisible = false;
                this.$message("修改成功");
              } else {
                this.$message.error(res.data.msg);
              }
            });
        } else {
          return false;
        }
      });
    },
    zanli() {
        // this.centerDialogVisible = true;
        this.isshow = this.isshow ? false : true;
    },
    checkPWd(){
        this.centerDialogVisible1 = true;
    }
  },
  props: ["msg"],
  // components: {
  //     Lock
  // },
  created() {}
};
</script>

<style lang="less" scoped>
.el-menu {
  background: #000;
}
.el-menu-item {
  color: #dae0ec;
}
.el-menu-item,
.el-submenu__title {
  height: 110px;
}
.el-menu-item:focus,
.el-menu-item:hover {
  outline: 0;
  background-color: #47b9c5;
}
.noPda {
  padding-left: 0 !important;
}
.noPda a {
  color: #fff;
}
.noPda a:active {
  color: #fff;
}
.leftImg {
  width: 30px;
  display: block;
  margin: 0 auto 5px;
  cursor: pointer;
}
.left-nav {
  position: absolute;
  color: #fff;
  font-size: 10px;
  background-color: #000;
  float: left;
  // height: calc(100% - 0.2rem);
  height: 94.65vh;
  width: 100px;
  // min-height: 4rem;
  z-index: 111;
}

.iconfont {
  font-size: 24px;
}

.left-nav ul {
  padding: 0px;
  margin: 0px;
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
  font-size: 21px;
}
.auditBtn-1 {
  font-size: 16px;
  margin-left: 5px;
  vertical-align: top;
  color: #000;
}
.btn12 {
  background-color: #01c8dc;
  border: 1px solid #01c8dc;
  color: #fff;
  padding: 12px 12px;
}
.btn13 {
  background-color: #fff;
  border: 1px solid #01c8dc;
  color: #01c8dc;
  padding: 12px 12px;
  margin-left: 10px;
}
.btn14 {
  background-color: #01c8dc;
  border: 1px solid #01c8dc;
  color: #fff;
  padding: 14px 20px;
}
.btn15 {
  background-color: #fff;
  border: 1px solid #01c8dc;
  color: #01c8dc;
  padding: 11px 20px;
  margin-left: 10px;
}
.left-nav li {
  list-style: none;
  text-align: center;
  padding: 15px 0;
}
.left-nav li img {
  width: 30px;
  display: block;
  margin: 0 auto 5px;
  cursor: pointer;
}
.jiaoban {
  z-index: 9999;
}
.center {
  text-align: center;
}
</style>

