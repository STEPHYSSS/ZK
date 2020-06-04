<template>
  <div class="login" id="login">
    <div class="logwapper">
      <img src="@/assets/logo.png" class="pic">
      <!-- <div class="loginBox">        
        <div class="content">
          <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-top:25px;">
            <el-tab-pane label="运营后台" name="first">
              <el-form :model="ruleForm">
                <div class="konge"></div>
                <h2 class="userLog">用户登录</h2>
                <div class="konge"></div>
                <div class="user">
                  <img :src="this.ruleForm.username !='' ? srcs:nosrc" class="icon">
                  <el-input v-model="ruleForm.username" @keyup.enter.native="handleSubmit" placeholder="请输入用户名" class="input-wid"></el-input>
                </div>
                <div class="password">
                  <img :src="this.ruleForm.password !='' ? pswSrc:nopswSrc" class="icon" style="margin-right: 3px">
                  <el-input v-model="ruleForm.password" @keyup.enter.native="handleSubmit" placeholder="请输入密码" type="password" class="input-wid"></el-input>
                </div>
                <div class="check">
                  <img :src="this.picLyanzhengma !=''?safSrc:nosafSrc" class="icon iconcheck">
                  <div class="input-check el-input afterCheck">
                    <input type="text" @keyup.enter="handleSubmit" v-model="picLyanzhengma" class="inp-check">
                    <input type="button" @click="createCode" v-model="checkCode" class="btn-code">
                    <div class="resful"><img src="@/assets/icon_refresh.png" @click="createCode"></div>
                  </div>
                </div>
                <div class="btn"><img src="@/assets/button.png" style=" width: 310px;" @click="oneclick"></div>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="门店系统" name="second">
              <el-form :model="ruleForm2">
                <div class="konge"></div>
                <h2 class="userLog">用户登录</h2>
                <div class="konge"></div>
                <div class="user">
                  <img :src="this.ruleForm2.code !='' ? srcs:nosrc" class="icon">
                  <el-input v-model="ruleForm2.code" @keyup.enter.native="shop" placeholder="门店编号" class="input-wid"></el-input>
                </div>
                <div class="password">
                  <img :src="this.ruleForm2.password !='' ? pswSrc:nopswSrc" class="icon" style="margin-right: 3px">
                  <el-input v-model="ruleForm2.password" @keyup.enter.native="shop" placeholder="请输入密码" type="password" class="input-wid" ></el-input>
                </div>
                <div class="check">
                  <img :src="this.picLyanzhengma !=''?safSrc:nosafSrc" class="icon iconcheck">
                  <div class="input-check el-input afterCheck">
                    <input type="text" @keyup.enter="shop" v-model="picLyanzhengma" class="inp-check">
                    <input type="button" @click="createCode" v-model="checkCode" class="btn-code">
                    <div class="resful"><img src="@/assets/icon_refresh.png" @click="createCode"></div>
                  </div>
                </div>
                <div class="btn">
                  <img src="@/assets/button.png" style=" width: 310px;" @click="shoplogin">
                </div>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="供应商系统" name="third">
              <el-form :model="ruleForm3" ref="ruleForm" class="demo-ruleForm">
                <div class="konge"></div>
                <h2 class="userLog">用户登录</h2>
                <div class="konge"></div>
                <div class="user">
                  <img :src="this.ruleForm3.code !='' ? srcs:nosrc" class="icon">
                  <el-input v-model="ruleForm3.code" @keyup.enter.native="supplier" placeholder="供应商编号" class="input-wid"></el-input>
                </div>
                <div class="password">
                  <img :src="this.ruleForm3.password !='' ? pswSrc:nopswSrc" class="icon" style="margin-right: 3px">
                  <el-input v-model="ruleForm3.password" @keyup.enter.native="supplier" placeholder="请输入密码" type="password" class="input-wid"
                  ></el-input>
                </div>
                <div class="check">
                  <img :src="this.picLyanzhengma !=''?safSrc:nosafSrc" class="icon iconcheck">
                  <div class="input-check el-input afterCheck">
                    <input type="text" v-model="picLyanzhengma" @keyup.enter="supplier" class="inp-check">
                    <input type="button" @click="createCode" v-model="checkCode" class="btn-code">
                    <div class="resful">
                      <img src="@/assets/icon_refresh.png" @click="createCode">
                    </div>
                  </div>
                </div>
                <div class="btn"><img src="@/assets/button.png" style=" width: 310px;" @click="supplierlogin"></div>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="仓库后台" name="fourth">
              <el-form :model="ruleForm4">
                <div class="konge"></div>
                <h2 class="userLog">用户登录</h2>
                <div class="konge"></div>
                <div class="user">
                  <img :src="this.ruleForm4.username !='' ? srcs:nosrc" class="icon">
                  <el-input v-model="ruleForm4.username" @keyup.enter.native="warahouse" placeholder="请输入用户名" class="input-wid"></el-input>
                </div>
                <div class="password">
                  <img :src="this.ruleForm4.password !='' ? pswSrc:nopswSrc" class="icon" style="margin-right: 3px">
                  <el-input v-model="ruleForm4.password" @keyup.enter.native="warahouse" placeholder="请输入密码" type="password" class="input-wid"></el-input>
                </div>
                <div class="check">
                  <img :src="this.picLyanzhengma !=''?safSrc:nosafSrc" class="icon iconcheck">
                  <div class="input-check el-input afterCheck">
                    <input type="text" @keyup.enter="warahouse" v-model="picLyanzhengma" class="inp-check">
                    <input type="button" @click="createCode" v-model="checkCode" class="btn-code">
                    <div class="resful"><img src="@/assets/icon_refresh.png" @click="createCode"></div>
                  </div>
                </div>
                <div class="btn"><img src="@/assets/button.png" style=" width: 310px;" @click="waraLogin"></div>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="商城后台" name="five">
              <el-form :model="ruleForm5">
                <div class="konge"></div>
                <h2 class="userLog">用户登录</h2>
                <div class="konge"></div>
                <div class="user">
                  <img :src="this.ruleForm5.username !='' ? srcs:nosrc" class="icon">
                  <el-input v-model="ruleForm5.username" @keyup.enter.native="mallSystem" placeholder="请输入用户名" class="input-wid"></el-input>
                </div>
                <div class="password">
                  <img :src="this.ruleForm5.password !='' ? pswSrc:nopswSrc" class="icon" style="margin-right: 3px">
                  <el-input v-model="ruleForm5.password" @keyup.enter.native="mallSystem" placeholder="请输入密码" type="password" class="input-wid"></el-input>
                </div>
                <div class="check">
                  <img :src="this.picLyanzhengma !=''?safSrc:nosafSrc" class="icon iconcheck">
                  <div class="input-check el-input afterCheck">
                    <input type="text" @keyup.enter="mallSystem" v-model="picLyanzhengma" class="inp-check">
                    <input type="button" @click="createCode" v-model="checkCode" class="btn-code">
                    <div class="resful"><img src="@/assets/icon_refresh.png" @click="createCode"></div>
                  </div>
                </div>
                <div class="btn"><img src="@/assets/button.png" style=" width: 310px;" @click="mallLogin"></div>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      // 运营
      ruleForm: {
        username: "",
        password: ""
      },
      // 门店
      ruleForm2: {
        code: "",
        password: ""
      },
      // 供应商
      ruleForm3: {
        code: "",
        password: ""
      },
      // 仓库
      ruleForm4: {
        username: "",
        password: ""
      },
      //商城
      ruleForm5: {
        username: "",
        password: ""
      },
      checkCode: "",
      picLyanzhengma: "",
      activeName: "first",
      show: true,
      srcs: require("@/assets/teacher_icon_violet.png"),
      nosrc: require("@/assets/teacher_icon.png"),
      pswSrc: require("@/assets/password_icon_violet.png"),
      nopswSrc: require("@/assets/password_icon.png"),
      safSrc: require("@/assets/safety_icon_violet.png"),
      nosafSrc: require("@/assets/safety_icon.png"),
      resSrc: require("@/assets/icon_refresh_violet.png"),
      noresSrc: require("@/assets/icon_refresh.png")
    };
  },
  methods: {
    // 回车登录
    shop() {
      this.shoplogin();
    },
    supplier() {
      this.supplierlogin();
    },
    warahouse(){
      this.waraLogin();
    },
    mallSystem(){
      this.mallLogin();
    },
    // 运营登录
    oneclick() {
      let newPicLyanzhengma = this.picLyanzhengma.toUpperCase();
      let newCheckCode = this.checkCode.toUpperCase();
      if(this.ruleForm.username == '' && this.ruleForm.password == ''){
        this.$message.error('请输入用户名和密码');
      }else if(this.ruleForm.username == '' && this.ruleForm.password != ''){
        this.$message.error('用户名不能为空')
      }else if(this.ruleForm.username != '' && this.ruleForm.password == ''){
        this.$message.error('密码不能为空')
      }else{
        let formData = new FormData();
        const obj = this.ruleForm;
        Object.keys(obj).forEach(key => {
          formData.append(key, obj[key]);
        });
        let a = newCheckCode == newPicLyanzhengma;
        if(a){
          this.$axios.post("sys/user/login", formData).then(res => {
            if (res.data.code == "0000") {
              this.$message({
                message: "登录成功",
                type: "success"
              });
              sessionStorage.setItem("token", res.data.data.token); // token
              sessionStorage.setItem("username", res.data.data.username); // 用户名
              this.ruleForm.token = sessionStorage.getItem("token");
              this.$router.push({ name: "operating" });
            } else {
              this.$message.error(res.data.msg);
            }
          });
        }else{
          this.$message.error("请输入正确的验证码！");
          this.createCode();
        }
      }
    },
    //门店登录
    shoplogin() {
      let newPicLyanzhengma = this.picLyanzhengma.toUpperCase();
      let newCheckCode = this.checkCode.toUpperCase();
      if(this.ruleForm2.code == '' && this.ruleForm2.password == ''){
        this.$message.error('请输入用户名和密码');
      }else if(this.ruleForm2.code == '' && this.ruleForm2.password != ''){
        this.$message.error('用户名不能为空')
      }else if(this.ruleForm2.code != '' && this.ruleForm2.password == ''){
        this.$message.error('密码不能为空')
      }else{
        let formData = new FormData();
        const obj = this.ruleForm2;
        Object.keys(obj).forEach(key => {
          formData.append(key, obj[key]);
        });
        let a = newCheckCode == newPicLyanzhengma;
        if (a) {
          this.$axios.post("/store/index/login", formData).then(res => {
            if (res.data.code == "0000") {
              this.$message({
                message: "登录成功",
                type: "success"
              });
              sessionStorage.setItem("token", res.data.data.token); // token
              sessionStorage.setItem("code", this.ruleForm2.code);
              this.ruleForm.token = sessionStorage.getItem("token");
              this.$router.push({ name: "home" });
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          this.$message.error("请输入正确的验证码！");
          this.createCode();
        }
      }
    },
    //供应商登录
    supplierlogin() {
      let newPicLyanzhengma = this.picLyanzhengma.toUpperCase();
      let newCheckCode = this.checkCode.toUpperCase();
      if(this.ruleForm3.code == '' && this.ruleForm3.password == ''){
        this.$message.error('请输入用户名和密码');
      }else if(this.ruleForm3.code == '' && this.ruleForm3.password != ''){
        this.$message.error('用户名不能为空')
      }else if(this.ruleForm3.code != '' && this.ruleForm3.password == ''){
        this.$message.error('密码不能为空')
      }else{
        let formData = new FormData();
        const obj = this.ruleForm3;
        Object.keys(obj).forEach(key => {
          formData.append(key, obj[key]);
        });
        let a = newCheckCode == newPicLyanzhengma;
        if (a) {
          this.$axios.post("/supplier/index/login", formData).then(res => {
              if (res.data.code == "0000") {
                this.$message({
                  message: "登录成功",
                  type: "success"
                });
                sessionStorage.setItem("token", res.data.data.token); // token
                sessionStorage.setItem("username", res.data.data.username); // 用户名
                this.ruleForm.token = sessionStorage.getItem("token");
                this.$router.push({ name: "supppliManage" });
              } else {
                this.$message.error(res.data.msg);
              }
            });
        }else{
          this.$message.error('请输入正确的验证码！')
          this.createCode();
        }
      
      }
    },
    // 仓库登录
    waraLogin() {
      let newPicLyanzhengma = this.picLyanzhengma.toUpperCase();
      let newCheckCode = this.checkCode.toUpperCase();
      if(this.ruleForm4.username == '' && this.ruleForm4.password == ''){
        this.$message.error('请输入用户名和密码');
      }else if(this.ruleForm4.username == '' && this.ruleForm4.password != ''){
        this.$message.error('用户名不能为空')
      }else if(this.ruleForm4.username != '' && this.ruleForm4.password == ''){
        this.$message.error('密码不能为空')
      }else{
        let formData = new FormData();
        const obj = this.ruleForm4;
        Object.keys(obj).forEach(key => {
          formData.append(key, obj[key]);
        });
        let a = newCheckCode == newPicLyanzhengma;
        if(a){
          this.$axios.post("/warehouse/index/login", formData).then(res => {
            if (res.data.code == "0000") {
              this.$message({
                message: "登录成功",
                type: "success"
              });
              sessionStorage.setItem("token", res.data.data.token); // token
              sessionStorage.setItem("username", res.data.data.username); // 用户名
              this.ruleForm4.token = sessionStorage.getItem("token");
              this.$router.push({ name: "warehouse" });
            } else {
              this.$message.error(res.data.msg);
            }
          });
        }else{
          this.$message.error("请输入正确的验证码！");
          this.createCode();
        }
      }
    },
    // 商城登录
    mallLogin(){
      let newPicLyanzhengma = this.picLyanzhengma.toUpperCase();
      let newCheckCode = this.checkCode.toUpperCase();
      if(this.ruleForm5.username == '' && this.ruleForm5.password == ''){
        this.$message.error('请输入用户名和密码');
      }else if(this.ruleForm5.username == '' && this.ruleForm5.password != ''){
        this.$message.error('用户名不能为空')
      }else if(this.ruleForm5.username != '' && this.ruleForm5.password == ''){
        this.$message.error('密码不能为空')
      }else{
        let formData = new FormData();
        const obj = this.ruleForm5;
        Object.keys(obj).forEach(key => {
          formData.append(key, obj[key]);
        });
        let a = newCheckCode == newPicLyanzhengma;
        if(a){
          this.$axios.post("/mall/index/login", formData).then(res => {
            if (res.data.code == "0000") {
              this.$message({
                message: "登录成功",
                type: "success"
              });
              sessionStorage.setItem("token", res.data.data.token); // token
              sessionStorage.setItem("username", res.data.data.username); // 用户名
              this.ruleForm5.token = sessionStorage.getItem("token");
              this.$router.push({ name: "Mall" });
            } else {
              this.$message.error(res.data.msg);
            }
          });
        }else{
          this.$message.error("请输入正确的验证码！");
          this.createCode();
        }
      }
    },
    empty() {
      this.user = "";
    },

    // 调用登录接口
    // loginEnter(user, password) {
    //   this.$axios.post("/sys/user/login").then(res => {
    //     if (res.data.code == 0) {
    //       this.$message({
    //         message: res.data.msg,
    //         type: "success"
    //       });
    //       window.localStorage.setItem("token", res.data.data.token);
    //       window.localStorage.setItem("user", user);
    //       window.localStorage.setItem("password", password);
    //       this.$router.push({ path: "/main" });
    //     } else if (res.data.code == 2 || res.data.code == 5) {
    //       this.$message.error(res.data.msg);
    //       this.$router.push({ path: "/" });
    //     } else {
    //       this.$message.error(res.data.msg);
    //     }
    //   });
    // },
    // 登录切换
    handleClick(tab, event) {},
    createCode() {
      //先清空验证码的输入
      this.code = "";
      this.checkCode = "";
      this.picLyanzhengma = "";
      //验证码的长度
      var codeLength = 4;
      //随机数
      var random = new Array(
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "0",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z"
      );
      for (var i = 0; i < codeLength; i++) {
        //取得随机数的索引（0~35）
        var index = Math.floor(Math.random() * 36);
        //根据索引取得随机数加到code上
        this.code += random[index];
      }
      //把code值赋给验证码
      this.checkCode = this.code;
    },
    handleSubmit() {
      this.oneclick();
    }
  },

  created() {
    this.createCode();
  }
};
</script>

<style scoped>
.login {
  height: 100% !important;
}
/* @import "../styles/login.css"; */
.login {
  /* width: 100vw;
    height: 100vh; */
  /* overflow: hidden; */
  /* background: url("../assets/loginbg.png"); */
  background: url("../assets/newLoginBg.png");
  background-size: 100% 100%;
  min-height: 647px;
  min-width: 1200px;
  /* position: relative; */
}
#login .content .el-input__inner {
  font-size: 16px;
  border: none;
}
.el-input__inner {
  border: red;
}
.btn {
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 10px;
}

.logwapper {
  position: relative;
  height: 100%;
  width: 100%;
}

.loginBox {
  width: 380px;
  height: 400px;
  background: #fff;
  border-radius: 10px;
  position: absolute;
  top: 20%;
  right: 10%;
  /* top: 24%;
    right: 10%; */
}

.el-tabs__header {
  padding: 0 20px;
  width: 280px;
  margin: 0 auto;
}

.pic {
  margin: 20px 0 0px 16px;
}

.content {
  margin: 0 35px;
}

/* .logo_right {
  float: right;
  width: 135px;
  margin-top: 5px;
  margin-bottom: 10px;
  margin-right: 2px;
} */
.userLog{
  font-weight: 900;
  margin-top: 5px;
  margin-bottom: 10px;
  color: #727070;
}

.icon {
  float: left;
}

.iconcheck {
  margin-right: 4px;
}

.user,
.password,
.check {
  padding-bottom: 4px;
  margin-bottom: 12px;
  clear: both;
  border-bottom: 1px solid #999999;
}

.check {
  position: relative;
  height: 33px;
}
.input-wid {
  font-size: 16px;
}
input[type="text"],
input[type="password"] {
  border: none;
}
.input-wid,
.input-check {
  width: 82% !important;
}

.inp-check {
  width: 118px;
  outline: 0;
  /* font-size: 14px; */
}

.resful {
  display: inline-block;
  position: absolute;
  right: -17px;
  top: 3px;
}
.refresh img{
  cursor: pointer;
}
.btn-code {
  height: 30px;
  width: 92px;
  background-color: #eef8fc;
  border-radius: 5px;
  border: none;
  position: absolute;
  top: 0;
  font-size: 16px;
  letter-spacing: 10px;
  margin-left: 8px;
}

.refresh {
  position: absolute;
  /* bottom: 12px; */
}

.showbtn:hover {
  cursor: pointer;
}

/* .afterCheck {
  position: absolute;
  top: -1px;
  clear: both;
} */
</style>