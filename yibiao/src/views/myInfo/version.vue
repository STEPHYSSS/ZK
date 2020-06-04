<template>
  <div class="version">
    <div class="box">
      <NavBar>
        <van-icon name="arrow-left" slot="left" @click="onClickLeft" />
        <div slot="title" class="van-nav-bar__title van-ellipsis">版本历史</div>
      </NavBar>
      <div class="List">
        <p class="versionNum"><em>|</em> 当前版本号：{{titel}}</p>
        <van-cell-group v-for="(item,index) in group" :key="index">
          <van-cell :title="item.time" :value="item.remark"/>
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import NavBar from "@/components/NavBar.vue";//顶部导航
export default {
  name: 'version',
  data () {
    return {
      titel:'1.1.0',
      group:[{
        time:"2020-05-12",
        remark:"更新通讯录版本"
      },{
        time:"2020-05-11",
        remark:"版本bug修复"
      },{
        time:"2020-05-09",
        remark:"版本试运营测试"
      }]
    }
  },
  components: {
    NavBar
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    changePwd() {
      this.$router.push({ name: "changePwd" })
    },
    VersionHistory() {
      this.$router.push({ name: "version" })
    },
  },
}
</script>
<style scoped>
@import "../../style/zhu.css";
</style>
