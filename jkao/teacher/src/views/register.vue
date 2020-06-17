<template>
    <div class="login" id="login">
        <div class="logwapper">
            <img src="@/assets/images/company-logo.png" class="pic">
            <div class="loginBox">
                <div class="content">
                    <!-- <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-top:25px;"> -->
                    <!-- <el-tab-pane label="运营后台" name="first"> -->
                    <el-form :model="ruleForm">
                        <div class="konge"></div>
                        <h2 class="userLog">用户登录</h2>
                        <div class="konge"></div>
                        <div class="user">
                            <img :src="ruleForm.username !='' ? srcs:nosrc" class="icon" />
                            <el-input
                                v-model="ruleForm.username"
                                clearable
                                @keydown.enter.native="submitForm"
                                placeholder="请输入用户名"
                                class="input-wid"
                            ></el-input>
                        </div>
                        <div class="password">
                            <img
                                :src="ruleForm.password !='' ? pswSrc:nopswSrc"
                                class="icon"
                                style="margin-right: 3px"
                            />
                            <el-input
                                v-model="ruleForm.password"
                                clearable
                                @keydown.enter.native="submitForm"
                                placeholder="请输入密码"
                                type="password"
                                class="input-wid"
                            ></el-input>
                        </div>
                        <div class="check">
                            <img :src="picLyanzhengma !=''?safSrc:nosafSrc" class="icon iconcheck" />
                            <div class="input-check el-input afterCheck">
                                <input
                                    type="text"
                                    @keyup.enter="submitForm"
                                    v-model="picLyanzhengma"
                                    class="inp-check"
                                    placeholder="请输入验证码"
                                    clearable
                                />
                                <input
                                    type="button"
                                    @click="createCode"
                                    v-model="checkCode"
                                    class="btn-code"
                                />
                                <div class="resful">
                                    <img src="@/assets/images/icon_refresh.png" @click="createCode" />
                                </div>
                            </div>
                        </div>
                        <el-button
                            type="primary"
                            round
                            @click="submitForm"
                            class="login-button"
                            :disabled="disabledLogin"
                        >登录</el-button>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import qs from "qs";
export default {
    name: "login",
    data() {
        return {
            disabledLogin: false,
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
            srcs: require("@/assets/images/teacher_icon_violet.png"),
            nosrc: require("@/assets/images/teacher_icon.png"),
            pswSrc: require("@/assets/images/password_icon_violet.png"),
            nopswSrc: require("@/assets/images/password_icon.png"),
            safSrc: require("@/assets/images/safety_icon_violet.png"),
            nosafSrc: require("@/assets/images/safety_icon.png"),
            resSrc: require("@/assets/images/icon_refresh_violet.png"),
            noresSrc: require("@/assets/images/icon_refresh.png")
        };
    },
    methods: {
        submitForm() {
            let newPicLyanzhengma = this.picLyanzhengma.toUpperCase();
            let newCheckCode = this.checkCode.toUpperCase();
            if (this.ruleForm.username === "" || this.ruleForm.password === "")
                return this.$message("用户名或密码不能为空");
            if(!this.picLyanzhengma)return this.$message.error('请输入验证码')
            this.disabledLogin = true;
            setInterval(()=>{
              this.disabledLogin = false;
            },3000)
            let check = newCheckCode == newPicLyanzhengma;
            if (check) {
               this.$utils
                .post(
                    this.reqApi.shuiwuUrl + "/user/login",
                    qs.stringify(this.ruleForm)
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.$message({
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
                            sessionStorage.setItem(
                                "last_login_time",
                                user.last_login_time
                            );
                            // sessionStorage.setItem("user_photo",user.user_photo)
                            if (user.user_photo) {
                                sessionStorage.setItem(
                                    "user_photo",
                                    user.user_photo
                                );
                            }
                            if (user.role_id === 4) {
                                this.$router.push({ name: "index" });
                            } else {
                                this.$router.push({ name: "mindex" });
                            }
                        }, 500);
                    } else {
                        this.$message.error(res.data.msg);
                        // this.disabledLogin = false;
                    }
                })
                .catch(res => {
                    // this.disabledLogin = false;
                });
            } else {
                this.$message.error("请输入正确的验证码！");
                this.picLyanzhengma=''
                this.createCode();
                return
            }
        },
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
    background: url("../assets/images/newLoginBg.png");
    background-size: 100% 100%;
    min-height: 647px;
    min-width: 1200px;
    /* position: relative; */
}
#login .content .input-wid .el-input__inner {
    font-size: 16px;
    border: none !important;
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
    height: 370px;
    background: #fff;
    border-radius: 10px;
    position: absolute;
    top: 20%;
    right: 16%;
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
.userLog {
    font-weight: 900;
    margin-top: 5px;
    margin-bottom: 10px;
    color: #444;
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
.refresh img {
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

.konge {
    height: 25px;
}
#login .el-button.is-round {
    margin-top: 15px;
    width: 99%;
}
input::-webkit-input-placeholder {
    color: #c0c4cc;
  }
  input::-moz-input-placeholder {
    color: #c0c4cc;
  }
  input::-ms-input-placeholder {
    color: #c0c4cc;
  }
</style>