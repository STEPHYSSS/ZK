<template>
  <div class="positionDetail">
    <NavBar>
        <van-icon name="arrow-left" slot="left" @click="onClickLeft" />
        <div  slot="title" class="van-nav-bar__title van-ellipsis">{{name}}</div>
      </NavBar>
    <div class="box">
      <div class="ListDetail">
        <div v-html="rules"></div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import NavBar from "@/components/NavBar.vue";//顶部导航
export default {
  name: 'positionDetail',
  data () {
    return {
      rules:this.$route.query.rules,
      name:this.$route.query.name
    }
  },
  components: {
    NavBar
  },
  methods: {
    // 返回
    onClickLeft() {
      this.$router.go(-1);
    }
  },
}
</script>
<style scoped>
@import "../../style/zhu.css";
</style>
