<template>
  <div class="postStandard">
    <div class="box">
      <NavBar>
        <van-icon name="arrow-left" slot="left" @click="onClickLeft" />
        <div slot="title" class="van-nav-bar__title van-ellipsis">岗位标准</div>
        <span slot="right" class="van-nav-bar__text" @click="lis">历史</span>
      </NavBar>
      <div class="List">
        <van-cell is-link v-for="(item,index) in list" :key="index" @click = "listDetail(item.id,item.name,item.rules)">{{item.name}}</van-cell>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import NavBar from "@/components/NavBar.vue";//顶部导航
export default {
  name: 'postStandard',
  data () {
    return {
      list:[]
    }
  },
  components: {
    NavBar
  },
  created(){
    this.getList();
  },
  methods: {
    getList() {
      this.$axios.post(this.reqApi.yiBSchool + `/mobile/section/list`,
        qs.stringify({token:sessionStorage.getItem('token')})
      ).then(res=>{
        if(res.data.code == '0000') {
          this.list = res.data.data;
        }else return this.$toast(res.data.msg)
      })
    },
    // 跳转详情页
    listDetail(id,name,rules) {
      this.$router.push({
        name:"positionDetail",
        query:{rules:rules,name:name}
      })
    },
    lis() {
      this.$router.push({ name :'workingExperience'})
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
