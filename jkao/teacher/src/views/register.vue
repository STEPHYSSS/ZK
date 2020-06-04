<template>
  <el-container style="width: 100%;height: 100%;">
    <div class="main" id="register-c">
      <div class="re-content">
        <img class="logo" v-if="!$utils.isSeek" src="@/assets/images/chanjetLogo.png" alt />
        <img class="logo" v-else src="@/assets/images/company-logo.png" style="width: 12%;" alt />

        <div class="login-Verify txalign-c">
          <h3>
            <img v-if="!$utils.isSeek" src="@/assets/images/cjtLogo.png" alt />
            <img v-else src="@/assets/images/titlelogo.png" alt />
            <img src="@/assets/images/V1.0.png" alt style="width: 35px;" />
          </h3>

          <el-form :model="ruleForm" label-width="70px" class="login-form">
            <template>
              <el-tabs v-model="activeName">
                <!--用户名-->
                <el-input
                  placeholder="请输入账号"
                  prefix-icon="iconfont icon-ren"
                  clearable
                  @keydown.enter.native="submitForm"
                  v-model.trim="ruleForm.username"
                ></el-input>

                <!--密码-->
                <el-input
                  placeholder="请输入密码"
                  prefix-icon="iconfont icon-mima"
                  type="password"
                  clearable
                  @keydown.enter.native="submitForm"
                  show-password
                  v-model.trim="ruleForm.password"
                ></el-input>
                <br />

                <el-button
                  type="primary"
                  round
                  @click="submitForm"
                  class="login-button"
                  :disabled="disabledLogin"
                >登录</el-button>
              </el-tabs>
            </template>
          </el-form>
        </div>
      </div>
    </div>
  </el-container>
</template>

<script>
import qs from "qs";
export default {
  name: "register",
  data() {
    return {
      activeName: "first", //tab切换
      input: "",
      checked: false, //记住密码勾选

      disabledLogin: false,
      ruleForm: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    submitForm() {
      const that = this;
      if (that.ruleForm.username === "" || that.ruleForm.password === "")
        return that.$message("用户名或密码不能为空");
      that.disabledLogin = true;
      that.$utils
        .post(
          that.reqApi.shuiwuUrl + "/user/login",
          qs.stringify(that.ruleForm)
        )
        .then(res => {
          if (res.data.code === "0000") {
            that.$message({
              message: "登陆成功,即将跳转至首页..",
              type: "success",
              duration: 500
            });
            const { code, user, token, msg } = res.data;
            const timer2 = setTimeout(() => {
              clearTimeout(timer2);
              // localStorage.setItem("token", token)
              sessionStorage.setItem("token", token);
              sessionStorage.setItem("username", user.username);
              sessionStorage.setItem("role_id", user.role_id);
              sessionStorage.setItem("realname", user.realname);
              sessionStorage.setItem("userId", user.id);
              sessionStorage.setItem("last_login_time", user.last_login_time);
              // sessionStorage.setItem("user_photo",user.user_photo)
              if(user.user_photo){
                sessionStorage.setItem("user_photo", user.user_photo);
              }
              if (user.role_id === 4) {
                that.$router.push({ name: "index" });
              } else {
                that.$router.push({ name: "mindex" });
              }
            }, 500);
          } else {
            that.$message.error(res.data.msg);
            that.disabledLogin = false;
          }
        })
        .catch(res => {
          that.disabledLogin = false;
        });
      /*    return;
            that.$utils
                .post("exam/login", that.ruleForm)
                .then(res => {
                    const { code, object, token, msg } = res.data;
                    if (code === "00") {
                        that.$message({
                            message: "登陆成功,即将跳转至首页..",
                            type: "success",
                            duration: 1000
                        });

                        sessionStorage.token = token;
                        const timer2 = setTimeout(() => {
                            clearTimeout(timer2);
                            if (that.ruleForm.usertype === "SYS") {
                                sessionStorage.setItem(
                                    "realName",
                                    object.aRealname
                                );
                                sessionStorage.setItem(
                                    "aLastlogin",
                                    object.aLastlogin
                                );
                                sessionStorage.setItem(
                                    "aLogintimes",
                                    object.aLogintimes
                                );
                                sessionStorage.setItem("aPhoto", object.aPhoto);
                                sessionStorage.setItem("aId", object.aId);
                                sessionStorage.setItem(
                                    "aRoleid",
                                    object.aRoleid
                                ); //判断是管理员/老师，是否显示管理员列表
                                that.$router.push({ name: "mindex" });
                            } else {
                                sessionStorage.setItem("userId", object.uId);
                                sessionStorage.setItem(
                                    "studentRealName",
                                    object.uRealname
                                );
                                that.$router.push({ name: "index" });
                                sessionStorage.setItem(
                                    "hPortrait",
                                    object.uPhoto
                                );
                            }
                        }, 1000);
                    } else {
                        that.$message(msg);
                        that.disabledLogin = false;
                    }
                })
                .catch(res => {
                    that.disabledLogin = false;
                }); */
    }
  },
  watch: {
    activeName: function() {
      this.ruleForm.username = "";
      this.ruleForm.password = "";
    }
  }
};
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  background-image: url("../assets/images/login-bg.png");
  background-size: 100% 100%;
  position: relative;
}

.main .re-content {
  width: 45%;
  height: 55%;
  background-image: url("../assets/images/login-inner.png");
  background-size: 100% 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  min-height: 530px;
  min-width: 864px;
}

.main .re-content .logo {
  width: 8%;
  margin: 10px 0 0 10px;
}

/*tab切换学生端教师端及内部内容*/
.main .re-content .login-Verify {
  width: 32%;
  float: right;
  padding: 10% 0;
  margin-right: 35px;
}

.main .re-content .login-Verify h3 img {
  width: 95%;
}

/*技术支持提示*/
/* .main .technicalSupport {
  display: block;
  position: absolute;
  bottom: 90px;
  left: 0;
  right: 0;
  text-align: center;
  color: #fff;
  font-weight: 200;
} */
</style>
