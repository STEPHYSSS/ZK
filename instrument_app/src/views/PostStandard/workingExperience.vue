<template>
  <div class="workingExperience">
    <div class="box">
      <NavBar>
        <van-icon name="arrow-left" slot="left" @click="onClickLeft" />
        <div slot="title" class="van-nav-bar__title van-ellipsis">轮岗经历</div>
      </NavBar>
      <div class="List">
        <van-row type="flex" justify="space-between" v-for="(item,index) in list" :key="index">
          <van-col span="8" class="spLeft">{{item.section}}</van-col>
          <van-col span="8" class="only">{{item.job}}</van-col>
          <van-col span="8" class="only">{{item.effectiveTime | conTime('YYYY-MM-DD')}}</van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import NavBar from "@/components/NavBar.vue";//顶部导航
export default {
  name: 'workingExperience',
  data () {
    return {
      list:[]
    }
  },
  components: {
    NavBar
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.$axios.post(this.reqApi.yiBSchool + `/mobile/section/record/list`,
        qs.stringify({token:sessionStorage.getItem('token')})
      ).then(res=>{
        if(res.data.code == '0000') {
          this.list = res.data.data;
        }else return this.$toast(res.data.msg)
      })
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  },
}
</script>
<style scoped>
@import "../../style/zhu.css";
</style>
