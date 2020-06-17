<template>
  <div class="myInfo">
    <div class="box">
      <NavBar>
        <div slot="title" class="van-nav-bar__title van-ellipsis">我的</div>
      </NavBar>
      <div class="List">
        <div class="PhoneBox">
          <img class="imgPhoto" :src="photo" alt="" @click="personalInfo">
          <p class="userName" :title="userName">{{userName}}</p>
        </div>
        <van-cell-group id="imgSt">
          <van-cell :icon="kaoqin" is-link title="我的考勤" @click="myAttendance"/>
          <van-cell :icon="shezhi" is-link title="设置" @click="toSetUp"/>
        </van-cell-group>
      </div>
      <tabbar></tabbar>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import NavBar from "@/components/NavBar.vue";//顶部导航
import tabbar from "../tabbar.vue";//底部栏
export default {
  name: 'myInfo',
  data () {
    return {
      kaoqin:require('@/assets/images/wodekaoqin_icon@2x.png'),
      shezhi:require('@/assets/images/shezhi_icon@2x.png'),
      photo:require('@/assets/images/img@2x.png'),
      userName:sessionStorage.getItem('username')
    }
  },
  components: {
    NavBar,
    tabbar
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    personalInfo() {
      this.$router.push({ name: "personalInfo" })
    },
    myAttendance() {
      this.$router.push({ name: "myAttendance" })
    },
    toSetUp() {
      this.$router.push({ name: "setUp" })
    }
  },
}
</script>
<style scoped>
@import "../../style/zhu.css";
</style>
