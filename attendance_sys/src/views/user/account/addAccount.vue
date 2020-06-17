<template>
  <div class="shadow-card">
    <div class="container-card">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名:" prop="name">
          <el-input clearable size="mini" maxlength="50" class="inp-width" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="联系方式:" prop="phone">
          <el-input clearable size="mini" maxlength="10" class="inp-width" v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="角色:" prop="roleId">
          <el-select clearable size="mini" class="inp-width" v-model="form.roleId" placeholder="请选择角色">
            <el-option v-for="(item, index) in roleList" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件编号:" prop="idCard">
          <el-input clearable size="mini" maxlength="50" class="inp-width" v-model="form.idCard"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-input clearable size="mini" maxlength="50" @change="checkEmail" class="inp-width" v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="QQ:" prop="qq">
          <el-input clearable size="mini" maxlength="20" class="inp-width" v-model="form.qq"></el-input>
        </el-form-item>
        <el-form-item label="备注:" prop="remark">
          <el-input clearable size="mini" maxlength="20" class="inp-width" v-model="form.remark"></el-input>
        </el-form-item>
        <el-form-item v-if="form.status" label="状态:" prop="status">
          <el-select clearable size="mini" class="inp-width" v-model="form.status" placeholder="请选择状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="footer-card">
      <el-button size="mini" class="border-blue bgc-blue font-color-fff" @click="submitForm('form')">保存</el-button>
      <el-button size="mini" class="border-blue font-color-blue" @click="accountList">取消</el-button>
    </div>
  </div>
</template>

<script>
import { accountInsert, accountUpdate, accountDetail } from '@/api/user'
import { roleList } from '@/api/systemSetup'
import { checkEmail } from '@/api/public'
export default {
  data() {
    return {
      roleList: [],  // 角色列表
      form: {
        name: '',
        phone: '',
        roleId: 1,
        idCard: '',
        email: '',
        qq: '',
        remark: '',
        status: null,
      },
      rules: {
        name: { required: true, message: '请输入姓名', trigger: 'blur' },
        phone: { required: true, message: '请输入联系方式', trigger: 'blur' },
        roleId: { required: true, message: '请选择角色', trigger: 'change' },
        status: { required: true, message: '请选择状态', trigger: 'change' }
      }
    };
  },
  
  created () {
    if (this.$route.query.id) {
      this.getAccountDetail(this.$route.query.id)
    }
    this.getRoleList()
  },

  methods: {
    // 获取账号详情
    async getAccountDetail (id) {
      const { data: { code, msg, data } } = await accountDetail({id})
      if (code === '0000') {
        if (data) this.form = data
        this.form['id'] = this.$route.query.id
      }
    },
    // 获取角色列表
    async getRoleList () {
      const that = this
      const { data: { code, msg, data: { total, list } } } = await roleList()
      if (code === '0000') {
        that.roleList = list
      }
    },
    // 保存
    submitForm (formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          let res = {}
          if (!this.$route.query.id) {
            res = await accountInsert(this.form)
          }else {
            res = await accountUpdate(this.form)
          }
          const { code, msg } = res.data
          if (code === '0000') {
            this.accountList()
            this.$message.success('保存成功')
          }
        }
      })
    },
    // 验证邮箱
    checkEmail(val) {
      this.form.email = checkEmail(val)
    },
    // 取消跳转账号列表
    accountList () {
      this.$router.push({ name: 'accountManagement' })
    }
  }
};
</script>

<style scoped>
.shadow-card {
  background-color: #fbfbfb;
  overflow: hidden;
}
.el-form {
  padding: 50px 50px 100px;
}
.inp-width {
  width: 300px;
}
</style>