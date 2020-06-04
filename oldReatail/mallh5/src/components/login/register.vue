<template>
    <div class="register" id="register">
        <div class="imgBoxwidth">
            <img @click="onClickLeft" class="topimgstyle" src="@/images/fanhui_icon@2x.png" alt />
            <img class="signin" src="@/images/bg.png" alt />
        </div>
        <div class="box">
            <van-cell-group class="telephone">
                <img class="posiabsoulut" src="@/images/phone_icon@2x.png" alt />
                <van-field
                    type="number"
                    maxlength="11"
                    v-model="phone"
                    placeholder="请输入手机号"
                    @blur="textphone(phone)"
                />
            </van-cell-group>
            <van-cell-group class="password">
                <img class="pswImg" src="@/images/mima_icon@2x.png" alt />
                <van-field type="password" @blur="textPsw(password)" v-model="password" placeholder="请设置密码" />
            </van-cell-group>
            <!-- type="password" -->
            <van-cell-group class="password">
                <img class="pswImg" src="@/images/yanzheng_icon@2x.png" alt />
                <van-field v-model="yanz" placeholder="请输入验证码" />
                <span class="yanzhengma" @click="getyz">获取验证码</span>
            </van-cell-group>
            <div class="logint" @click="submit">提交</div>
        </div>
    </div>
</template>
<script>
// import qs from "qs";
export default {
    data() {
        return {
            phone: "",
            password: "",
            yanz: ""
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
        getyz() {
            this.yanz = "123456";
        },
        onClickLeft() {
            this.$router.go(-1);
            // this.$router.push({
            //   name:'Home'
            // });
        },
        submit() {
            if (this.phone == "") {
                return this.$toast("请输入手机号");
            } else if (this.password == "") {
                return this.$toast("请输入密码");
            } else if (this.yanz === "") {
                return this.$toast("请输入验证码");
            }

            let formdata = new FormData();
            formdata.append("phone", this.phone);
            formdata.append("password", this.password);
            this.$axios.post("/shop/index/register", formdata).then(res => {
                if (res.data.code === "0000") {
                    sessionStorage.setItem("token", res.data.data.token);
                    sessionStorage.setItem("username", res.data.data.username);
                    this.$toast("注册成功");
                    this.$router.push({
                        name: "login"
                    });
                } else {
                    return this.$toast(res.data.msg);
                }
            });
        }
    }
};
</script>
<style lang="less" scoped>
.register {
    background-color: #fff;

    .imgBoxwidth {
        width: 100vw;
        height: 324px;
        .signin {
            height: 324px;
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
        cursor: pointer;
    }
    .box {
        width: 100vw;
        position: relative;
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

    .yanzhengma {
        background: rgba(204, 204, 204, 1);
        width: 72px;
        height: 29px;
        line-height: 29px;
        color: #fff;
        font-size: 12px;
        font-weight: 500;
        text-align: center;
        position: absolute;
        z-index: 1;
        right: 2px;
        top: 7px;
    }
}
</style>

