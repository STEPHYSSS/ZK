<template>
  <div class="changePwd">
    <div class="box">
      <NavBar>
        <van-icon name="arrow-left" slot="left" @click="onClickLeft" />
        <div slot="title" class="van-nav-bar__title van-ellipsis">修改密码</div>
      </NavBar>
      <div class="ListBoxPwd">
        <van-cell-group>
          <van-field v-model="oldPassword" type="password" maxlength="18" :clearable="true" placeholder="请输入密码" label="旧密码" />
        </van-cell-group>
        <van-cell-group>
          <van-field v-model="newPassword" type="password" maxlength="18" :clearable="true" placeholder="输入新密码" label="新密码" />
        </van-cell-group>
        <van-cell-group>
          <van-field v-model="ConfirmPwd" type="password" maxlength="18" :clearable="true" placeholder="确认新密码" label="确认密码" />
        </van-cell-group>
        <div class="logOut">
          <van-button type="primary" color="#4489FE" block @click="subPwd">保存</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import NavBar from "@/components/NavBar.vue";//顶部导航
export default {
  name: 'changePwd',
  data () {
    return {
      oldPassword:'',
      newPassword:'',
      ConfirmPwd:''
    }
  },
  components: {
    NavBar
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    subPwd() {
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
      if (!this.ConfirmPwd) {
        return this.$toast("请确认密码");
      }
      if (this.ConfirmPwd.length < 6 || this.ConfirmPwd.legnth > 18) {
        return this.$toast("密码长度为6 - 18个字符");
      }
      if (this.newPassword != this.ConfirmPwd) {
        return this.$toast("请确认密码一致！");
      }
      this.$axios.post(this.reqApi.yiBSchool + `/mobile/my/modify/password`,
        qs.stringify({
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
          token:sessionStorage.getItem('token')
        })
      )
      .then(res => {
        if (res.data.code === "0000") {
          this.$toast("密码修改成功");
          this.$router.push({ name: "setUp" });
        } else {
          this.$toast(res.data.msg);
        }
      });
    }
  },
}
</script>
<style scoped>
@import "../../style/zhu.css";
</style>
