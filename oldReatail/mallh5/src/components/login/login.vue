
<template>
    <div class="login" id="login">
        <div class="imgBoxwidth">
            <img @click="onClickLeft" class="topimgstyle" src="@/images/fanhui_icon@2x.png" alt />
            <img class="signin" src="@/images/bg.png" alt />
            <span class="loginText">sign in</span>
        </div>
        <div class="box">
            <van-cell-group class="telephone">
                <img class="posiabsoulut" src="@/images/phone_icon@2x.png" alt />
                <van-field
                    @blur="textphone(login.phone)"
                    v-model="login.phone"
                    type="number"
                    maxlength="11"
                    placeholder="请输入手机号"
                />
            </van-cell-group>
            <van-cell-group class="password">
                <img class="pswImg" src="@/images/mima_icon@2x.png" alt />
                <van-field
                    type="password"
                    maxlength="13"
                    @blur="textPsw(login.password)"
                    v-model="login.password"
                    placeholder="请输入密码"
                />
            </van-cell-group>
            <div class="logint" @click="submit">登录</div>
            <div class="logintreg">
                还没有账号？点击
                <span class="toregis" @click="toregister">立即注册</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            login: {
                phone: "",
                password: ""
            }
        };
    },
    methods: {
        textPsw(psw) {
            if (psw) {
                var myreg = new RegExp();
                myreg = /[\u4E00-\u9FA5]/g;
                if (myreg.test(psw)) {
                    return this.$toast("密码不能包含中文");
                } else {
                    return true;
                }
            }
        },
        textphone(phone) {
            if (phone) {
                var myreg = new RegExp();
                myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
                if (!myreg.test(phone)) {
                    return this.$toast("请输入有效的手机号");
                } else {
                    return true;
                }
            }
        },
        onClickLeft() {
            this.$router.push({
                name: "Home"
            });
        },
        submit() {
            if (this.login.phone == "") {
                return this.$toast.fail("请输入手机号");
            }
            if (this.login.password == "") {
                return this.$toast.fail("请输入密码");
            }
            this.$axios
                .post("/shop/index/login", this.$qs.stringify(this.login))
                .then(res => {
                    if (res.data.code === "0000") {
                        localStorage.setItem("token", res.data.data.token);
                        localStorage.setItem(
                            "username",
                            res.data.data.username
                        );
                        localStorage.setItem("phone", res.data.data.phone);
                        this.$router.push({
                            name: "myinfo"
                        });
                    } else{
                      this.$toast(res.data.msg)
                    }
                });
        },
        toregister() {
            this.$router.push({
                name: "register"
            });
        }
    }
};
</script>
<style lang="less" scoped>
.login {
    background-color: #fff;
}
.imgBoxwidth {
    position: relative;
    width: 100%;
    height: 100%;
    .signin {
        width: 100%;
        height: 100%;
    }
    .topimgstyle {
        position: absolute;
        top: 19px;
        left: 15px;
    }
}
.telephone,
.password,
.logint {
    width: 80vw;
    margin: 0 auto;
    border-bottom: 1px solid #ccc;
}
.logint {
    background-color: #fc2e2e;
    border-radius: 20px;
    width: 254px;
    height: 40px;
    font-weight: 500;
    font-size: 16px;
    color: #fff;
    text-align: center;
    line-height: 40px;
    margin-top: 30px;
}
.logintreg {
    width: 254px;
    font-size: 12px;
    margin: 0 auto;
    margin-top: 5px;
    font-weight: 500;
}
.box {
    width: 100vw;
}
.loginText {
    font-size: 30px;
    color: #fff;
    font-weight: 500;
    position: absolute;
    top: 70px;
    left: 139px;
    // z-index: 1
}
.posiabsoulut {
    position: absolute;
    z-index: 10;
    left: 0px;
    top: 14px;
    width: 12px;
    height: 15px;
}
.pswImg {
    position: absolute;
    z-index: 1;
    width: 12px;
    height: 15px;
    left: 0px;
    top: 14px;
}
.toregis {
    color: #0078ff;
    font-size: 12px;
}
</style>
