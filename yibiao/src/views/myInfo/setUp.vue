<template>
  <div class="setUp">
    <div class="box">
      <NavBar>
        <van-icon name="arrow-left" slot="left" @click="onClickLeft" />
        <div slot="title" class="van-nav-bar__title van-ellipsis">设置</div>
      </NavBar>
      <div class="List">
        <van-cell-group>
          <van-cell is-link title="修改密码" @click="changePwd"/>
          <van-cell is-link title="关于我们"/>
          <van-cell is-link title="历史版本" @click="VersionHistory"/>
        </van-cell-group>
      </div>
      <div class="logOut">
        <van-button type="primary" color="#4489FE" block @click="logOut">退出登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import NavBar from "@/components/NavBar.vue";//顶部导航
export default {
  name: 'setUp',
  data () {
    return {

    }
  },
  components: {
    NavBar
  },
  methods: {
    onClickLeft() {
      // this.$router.go(-1);
      this.$router.push({ name: "myInfo" })
    },
    changePwd() {
      this.$router.push({ name: "changePwd" })
    },
    VersionHistory() {
      this.$router.push({ name: "version" })
    },
    logOut() {
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('role_id')
      sessionStorage.removeItem('username')
      sessionStorage.removeItem('active')
      sessionStorage.removeItem('manager')
      this.$router.push({ name: "login" })
    }
  },
}
</script>
<style scoped>
@import "../../style/zhu.css";
</style>
