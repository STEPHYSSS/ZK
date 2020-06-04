<template>
  <div class="personalInfo">
    <div class="box">
      <NavBar>
        <van-icon name="arrow-left" slot="left" @click="onClickLeft" />
        <div slot="title" class="van-nav-bar__title van-ellipsis">个人信息</div>
      </NavBar>
      <div class="List">
        <div class="PhoneBox"><img class="imgPhoto" :src="photo" alt=""></div>
        <van-cell-group>
          <van-cell title="姓名" :value="group.name" />
          <van-cell title="联系方式" :value="group.phone" />
          <van-cell title="部门" :value="group.sectionName" />
          <van-cell title="职务" :value="group.job" />
          <van-cell title="邮箱" :value="group.email" />
          <van-cell title="QQ" :value="group.qq" />
          <van-cell title="入职时间">{{group.createTime | conTime('YYYY-MM-DD')}}</van-cell>
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import NavBar from "@/components/NavBar.vue";//顶部导航
export default {
  name: 'personalInfo',
  data () {
    return {
      group:{},
      photo:require('@/assets/images/img@2x.png')
    }
  },
  components: {
    NavBar
  },
  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      this.$axios.post(this.reqApi.yiBSchool + `/mobile/my/info`,
        qs.stringify({token:sessionStorage.getItem('token')})
      ).then(res=>{
        if(res.data.code == '0000') {
          this.group = res.data.data;
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
