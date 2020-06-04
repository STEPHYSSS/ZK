<template>
  <div class="login">
    <img src="../assets/111.png" alt class="pic">
    <div class="center">
      <form :model="formInline">
        <input class="mui-input-password" placeholder=" 请输入工号" v-model="formInline.code">
        <input type="password" class="mui-input-password" placeholder="请输入密码" v-model="formInline.password">
         <!-- /^[0-9a-zA-Z]{19}$/,'')限制位数 -->
        <button type="button" class="mui-btn mui-btn-primary" @click="login">登录</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      formInline:{
        code:'',
        password:''
      }
    }
  },
  methods:{
    login(){
      if(this.formInline.code == '' && this.formInline.password == ''){
        this.$message('请输入用户名和密码');
      }else if(this.formInline.code == '' && this.formInline.password != ''){
        this.$message('用户名不能为空')
      }else if(this.formInline.code != '' && this.formInline.password == ''){
        this.$message('密码不能为空')
      }
       let formData = new FormData();
          const obj = this.formInline
          Object.keys(obj).forEach(key => {
            formData.append(key, obj[key])
          })
          this.$axios.post('/clerk/index/login', formData).then(res=>{
            if(res.data.code=="0000"){
                this.$message({
                  message: '登录成功',
                  type: 'success'
                });
              sessionStorage.setItem('token', res.data.data.token) // token
              sessionStorage.setItem('username', res.data.data.username) // 用户名
              this.$router.push({name:"moneyhome"})
            }else{
              this.$message.error(res.data.msg);
            //   else if(res.data.code == '1000'){
            //   this.$message('用户不存在,请重新输入')
            // }
            }
          })
    }
  }
};
</script>

<style scoped lang="less">
body {
  margin: 0;
  padding: 0;
}
.login {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: url("../assets/bg.png");
  background-size: 100% 100%;
  position: relative;
  .pic {
    width: 100px;
    height: 20px;
    padding: 12px 0 0 17px;
  }
  .center {
    width: 100%;
    position: absolute;
    top: 30%;
    left: calc(50% - 100px);
    .mui-input-password {
      width: 200px;
      background-color: transparent;
      border: 1px solid skyblue;
      color: white;
      height: 30px;
      text-align: center;
      display: block;
      margin-bottom: 30px;
    }
    button {
      width: 200px;
    }
  }
}
</style>
