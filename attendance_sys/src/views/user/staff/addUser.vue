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
        <el-form-item label="部门:" prop="sectionId">
          <el-select clearable size="mini" class="inp-width" v-model="form.sectionId" placeholder="请选择部门">
            <el-option v-for="(item, index) in statisticList" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职务:" prop="job">
          <el-input clearable size="mini" maxlength="50" class="inp-width" v-model="form.job"></el-input>
        </el-form-item>
        <el-form-item label="班级:" prop="classes">
          <el-input clearable size="mini" maxlength="50" class="inp-width" v-model="form.classes"></el-input>
        </el-form-item>
        <el-form-item label="学号:" prop="studentNo">
          <el-input clearable size="mini" maxlength="50" class="inp-width" v-model="form.studentNo"></el-input>
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
        <el-form-item label="部门经理:" prop="manager">
          <el-select clearable size="mini" class="inp-width" v-model="form.manager" placeholder="请选择部门经理">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
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
      <el-button size="mini" class="border-blue font-color-blue" @click="usersList">取消</el-button>
    </div>
  </div>
</template>

<script>
import { personnelInsert, personnelUpdate, personnelDetail } from '@/api/user'
import { stationList } from '@/api/systemSetup'
import { checkEmail } from '@/api/public'
export default {
  data() {
    return {
      statisticList: [], //岗位管理列表
      form: {
        name: '',
        phone: '',
        sectionId: '',
        job: '',
        classes: '',
        studentNo: '',
        email: '',
        qq: '',
        remark: '',
        manager: '0',
        status: null,
      },
      rules: {
        name: { required: true, message: '请输入姓名', trigger: 'blur' },
        phone: { required: true, message: '请输入联系方式', trigger: 'blur' },
        sectionId: { required: true, message: '请选择部门', trigger: 'change' },
        status: { required: true, message: '请选择状态', trigger: 'change' },
        manager: { required: true, message: '请选择是否部门经理', trigger: 'change' }
      }
    };
  },
  
  created () {
    if (this.$route.query.id) {
      this.getPersonnelDetail(this.$route.query.id)
    }
    this.getTableData()
  },

  methods: {
    // 获取员工详情
    async getPersonnelDetail (id) {
      const { data: { code, msg, data } } = await personnelDetail({id})
      if (code === '0000') {
        if (data) this.form = data
        this.form['id'] = this.$route.query.id
      }
    },
    async getTableData () {
      const { data: { code, msg, data: { list, total } } } = await stationList()
      if (code === '0000') {
        this.statisticList = list
      }
    },
    // 保存
    submitForm (formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          let res = {}
          if (!this.$route.query.id) {
            res = await personnelInsert(this.form)
          }else {
            res = await personnelUpdate(this.form)
          }
          const { code, msg } = res.data
          if (code === '0000') {
            this.usersList()
            this.$message.success('保存成功')
          }
        }
      })
    },
    // 验证邮箱
    checkEmail(val) {
      this.form.email = checkEmail(val)
    },
    // 取消跳转员工列表
    usersList () {
      this.$router.push({ name: 'userList' })
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