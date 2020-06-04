<template>
  <div class="login">
    <!-- <img src="../assets/images/bg@2x.png" alt="登录"> -->
    <div class="entryInput">
      <div class="user">
        <img :src="this.ruleForm.phone !='' ? srcs:nosrc" class="icon">
        <el-input v-model="ruleForm.phone" placeholder="请输入手机号" :clearable="true" maxlength="11" class="input-wid"></el-input>
      </div>
      <div class="user">
        <img :src="this.ruleForm.password !='' ? pwd:nopwd" class="icon">
        <el-input v-model="ruleForm.password" type="password" placeholder="请输入密码" :clearable="true" class="input-wid" maxlength="18"></el-input>
      </div>
      <div class="dengLu">
        <van-button type="primary" block color="#4489FE" round @click="lonin">登录</van-button>
      </div>
    </div>
    <p class="company">技术支持：武汉浙科友通软件有限公司</p>
  </div>
</template>

<script>
import qs from "qs";
export default {
  name: 'login',
  data () {
    return {
      value:'',
      srcs:require('@/assets/images/bluephone_icon@2x.png'),
      nosrc:require('@/assets/images/phone_icon@2x.png'),
      pwd:require('@/assets/images/bluepassword_icon@2x.png'),
      nopwd:require('@/assets/images/passwor_icon@2x.png'),
      ruleForm: {
        phone: "",
        password: ""
      },
    }
  },
  methods: {
    lonin() {
      if (this.ruleForm.phone == "") {
        return this.$toast("请输入手机号");
      }
      if (this.ruleForm.password == "") {
        return this.$toast("请输入密码");
      }
      this.$axios.post(
        this.reqApi.yiBSchool + `/mobile/index/login`,
        qs.stringify(this.ruleForm)
      ).then(res=>{
        if (res.data.code === "0000") {
          const { code,data,msg } = res.data;
          sessionStorage.setItem("token",data.token);
          sessionStorage.setItem("username", data.personnel.name);
          sessionStorage.setItem("role_id", data.personnel.id);
          sessionStorage.setItem("user_photo", data.personnel.image);
          sessionStorage.setItem("manager", data.personnel.manager);

          // if(user.user_photo){
          //   sessionStorage.setItem("user_photo", data.personnel.image);
          // }
          this.$router.push({ name: "home" });
          } else{
            this.$toast(res.data.msg)
          }
      })
    },
  }
}
</script>
<style scoped>
@import "../style/zhu.css";
</style>
