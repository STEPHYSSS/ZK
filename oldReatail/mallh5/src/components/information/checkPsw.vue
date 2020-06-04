<template>
    <div id="checkPws">
        <van-nav-bar title="修改密码" left-arrow @click-left="onClickLeft" :fixed="fixed">
            <div slot="left">
                <img class="topimgstyle" src="@/images/fanhui_icon@2x.png" alt />
            </div>
        </van-nav-bar>
        <!-- 修改密码checkPws -->
        <div class="content">
            <van-cell-group>
                <van-field
                    type="password"
                    maxlength="18"
                    v-model="oldPassword"
                    :clearable="true"
                    label="旧密码"
                    placeholder="请输入旧密码"
                />

                <van-field
                    type="password"
                    maxlength="18"
                    v-model="newPassword"
                    :clearable="true"
                    label="新密码"
                    placeholder="请输入新密码"
                />
                <van-field
                    v-model="checkpsw"
                    maxlength="18"
                    type="password"
                    :clearable="true"
                    label="确认密码"
                    placeholder="请输入密码"
                />
            </van-cell-group>
            <div class="surePsw">
                <span @click="submit">保存</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            oldPassword: "",
            newPassword: "",
            checkpsw: "",
            fixed: true,
            msg: ""
        };
    },
    methods: {
        onClickLeft() {
            //   this.$router.go(-1)
            this.$router.push({
                name: "infosetting"
            });
        },
        submit() {
            if (!this.oldPassword) {
                return this.$toast("请输入旧密码");
            }
            if (this.oldPassword.length < 6 || this.oldPassword.length > 18) {
                return this.$toast("密码长度为6 - 18个字符");
            }

            if (!this.newPassword) {
                return this.$toast("请输入新密码");
            }
            if (this.newPassword.length < 6 || this.newPassword.length > 18) {
                return this.$toast("密码长度为6 - 18个字符");
            }
            if (!this.checkpsw) {
                return this.$toast("请确认密码");
            }
            if (this.checkpsw.length < 6 || this.checkpsw.legnth > 18) {
                return this.$toast("密码长度为6 - 18个字符");
            }
            if (this.newPassword != this.checkpsw) {
                return this.$toast("请确认密码一致！");
            }
            this.$axios
                .post(
                    "/shop/my/password/modify",
                    this.$qs.stringify({
                        token: localStorage.getItem("token"),
                        oldPassword: this.oldPassword,
                        newPassword: this.newPassword
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.$toast("密码修改成功");
                        this.$router.push({
                            name: "infosetting"
                        });
                    } else {
                        this.$toast(res.data.msg);
                    }
                });
        }
    }
};
</script>
<style lang="less" scoped>
#checkPws {
    background-color: #fff;
    min-height: 100%;
}
.content {
    margin-top: 46px;
}
.van-cell {
    height: 45px;
    line-height: 37px;
    padding: 5px 16px;
    border-bottom: 1px solid #dedede;
    // margin-top: 10px;
    margin-bottom: 10px;
}
.van-cell-group {
    background-color: #f5f5f5;
}
.surePsw {
    width: 345px;
    height: 34px;
    border-radius: 3px;
    background-color: #fc2e2e;
    margin: 0 auto;
    margin-top: 40px;
    text-align: center;
    > span {
        color: #fff;
        font-size: 14px;
        letter-spacing: 1px;
        display: block;
        padding: 7px 0;
        // font-weight: 600;
    }
}
</style>