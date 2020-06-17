<template>
  <div class="login-bg">
    <!-- 浙科logo -->
    <div class="login-logo"></div>
    <!-- form表单背景图 -->
    <div class="login-page">
      <!-- title智能考勤 -->
      <div class="login-page-top"></div>
      <div class="login-page-bottom">
        <el-form class="login-form">
          <p class="font-size-12">账号</p>
          <el-input
          placeholder="请输入手机号"
          size="mini"
          maxlength="11"
          @keydown.enter.native="check_phone(form.phone, 'enter')"
          @blur="check_phone(form.phone)"
          v-model.trim="form.phone"
          clearable>
          </el-input>
          <p class="font-size-12">密码</p>
          <el-input
          placeholder="请输入密码"
          size="mini"
          maxlength="20"
          @keydown.enter.native="submitForm"
          type="password"
          clearable
          show-password
          v-model.trim="form.password">
          </el-input>
          <el-button class="login-botton bgc-blue font-color-fff" @click="submitForm" size="mini">登录</el-button>
        </el-form>
      </div>
    </div>
    <div class="login-remark font-color-fff text-center font-size-12">技术支持, 武汉浙科友通软件有限公司</div>
  </div>
</template>

<script>
import { login } from '@/api/login'
import { checkPhone } from '@/api/public'
export default {
  data () {
    return {
      form: {
        phone: '',
        password: '',
      }
    }
  },
  methods: {
    async submitForm () {
      const { phone, password } = this.form
      if (!phone) return false
      if (!password) return this.$message.error('请输入密码')
      const { data: { code, msg, data: { user, token } } } = await login({phone, password})
      if (code === '0000') {
        sessionStorage.userInfo = JSON.stringify(user)
        sessionStorage.token = token
        this.$message.success('登陆成功')
        this.$router.push({name: 'userList'})
      }
    },
    check_phone (data, key) {
      // this.form.phone = checkPhone(this.form.phone)
      if (key === 'enter' && this.form.phone) this.submitForm()
    }
  }
}
</script>

<style scoped>
.login-bg {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url("../../assets/images/login-bg.png") no-repeat center center;
  background-size: 100% 100%;
}
.login-logo, .login-remark {
  position: absolute;
}
.login-logo {
  width: 110px;
  height: 15px;
  background-color: #fff;
  top: 20px;
  left: 20px;
  background: url("../../assets/images/logo.png") no-repeat center center;
  background-size: 100% 100%;
}
.login-remark {
  width: 300px;
  height: 30px;
  line-height: 30px;
  left: 50%;
  bottom: 20px;
  transform: translate(-50%, 0)
}
.login-page-top {
  width: 736px;
  height: 65px;
  background-color: #fff;
  background: url("../../assets/images/login-title.png") no-repeat 58% center;
}
.login-page-bottom {
  position: relative;
  width: 736px;
  height: 286px;
  background: url("../../assets/images/login-xbg.png") no-repeat center center;
  background-size: 100% 100%;
}
.login-form {
  position: absolute;
  top: 54px;
  right: 40px;
  width: 250px;
  height: 200px;
  display: flex;
  flex-direction: column;
}
.login-botton {
  position: relative;
  left: 50%;
  width: 120px;
  transform: translate(-50%, 25px);
}
.el-input {
  margin-top: 10px;
}
p {
  margin-top: 10px;
}
</style>