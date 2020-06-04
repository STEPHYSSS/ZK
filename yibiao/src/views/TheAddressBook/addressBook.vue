<template>
  <div class="addressBook">
    <div class="box">
      <NavBar>
        <!-- <van-icon name="arrow-left" slot="left" @click="onClickLeft" /> -->
        <div slot="title" class="van-nav-bar__title van-ellipsis">通讯录</div>
      </NavBar>
      <div class="List">
        <van-index-bar highlight-color="#07c160" sticky>
          <div v-for="(item,index) in phoneArr" :key="index">
            <van-index-anchor :index="item.key" :style="{background:'#F7F8FA'}"/>
            <div v-for="(item2,index) in item.addressBooks" :key="index" @click="toDetail(item2.id)">
              <van-cell :title="item2.name" :label="item2.phone"></van-cell>
            </div>
          </div>
        </van-index-bar>
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
  name: 'addressBook',
  data () {
    return {
      phoneArr:[],
    }
  },
  components: {
    NavBar,
    tabbar
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.$axios.post(this.reqApi.yiBSchool+ `/mobile/book/list`,
        qs.stringify({token:sessionStorage.getItem('token')})
      ).then(res=>{
        if(res.data.code == '0000') {
          this.phoneArr = res.data.data;
        }else return this.$toast(res.data.msg)
      })
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    toDetail(id){
      this.$router.push({ name:'addressBookDetail',query:{
        id:id
      } })
    }
  },
}
</script>
<style scoped>
@import "../../style/zhu.css";
</style>
