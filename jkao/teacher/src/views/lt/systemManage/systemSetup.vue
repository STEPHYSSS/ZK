<template>
  <el-card shadow="never" class="box-card">
    <!-- <my-bread level1="系统设置" level2="系统设置" level3="请根据实际的应用需求, 在下列表单设置系统的各项参数值"></my-bread> -->

    <el-form ref="form" :model="form" label-width="130px">
      <!-- <div class="font-size-12">
        系统名称: <input type="text" class="inputWid" v-model="form.sname">
      </div> -->
      <el-form-item label="系统名称:">
        <input type="text" maxlength="50" class="inputWid" v-model="form.sname">
      </el-form-item>
      <el-form-item label="允许学员注册:">
        <el-select disabled v-model="zhanwei" placeholder="请选择" class="inputWid">
          <el-option label="不允许" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="允许学员登陆:">
        <el-select v-model="form.login" placeholder="请选择" class="inputWid">
          <el-option label="允许" value="1"></el-option>
          <el-option label="不允许" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="允许学员考试:">
        <el-select v-model="form.exam" placeholder="请选择" class="inputWid">
          <el-option label="允许" value="1"></el-option>
          <el-option label="不允许" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="允许未审核学员考试:">
        <el-select disabled v-model="zhanwei" placeholder="请选择" class="inputWid">
          <el-option label="允许" value="1"></el-option>
          <el-option label="不允许" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="允许学员自我检测:">
        <el-select v-model="form.test" placeholder="请选择" class="inputWid">
          <el-option label="允许" value="1"></el-option>
          <el-option label="不允许" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="访问控制:">
        <el-select disabled v-model="zhanwei" placeholder="请选择" class="inputWid">
          <el-option label="不启用" value="1"></el-option>
          <el-option label="黑名单" value="0"></el-option>
          <el-option label="白名单" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="系统语言:" class="dianxian">
        <el-select disabled v-model="zhanwei" placeholder="请选择" class="inputWid">
          <el-option label="简体中文" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <div>
          <add-btn
          level1="提 交"
          level2="取 消"
          @submitForm="submitForm"
          @cancelForm="adminList">
          </add-btn>
        </div>
      </el-form-item>
    </el-form>

  </el-card>

</template>

<script>
  export default {
    data() {
      return {
        zhanwei: '',
        form: {
          sname: '',
          login: '',
          test: '',
          exam: ''
        },
      }
    },

    created() {
      this.findSysFig()
    },

    methods: {
      submitForm () {
        const that = this
        that.$utils.post('exam/admin/updateSysFig', that.form).then(res => {
          const {code, msg} = res.data
          if (code === '00') return that.$message.success(msg)
          else return that.$message(msg)
        })
      },

      adminList () {
        this.$router.push({name: 'adminList'})
      },

      findSysFig () {
        const that = this
        that.$utils.post('exam/admin/findSysFig').then(res => {
          const {code, object} = res.data
          if (code === '00') {
            that.form = object
            that.form.login = object.login + ''
            that.form.test = object.test + ''
            that.form.exam = object.exam + ''
          }
        })
      },

    },
  }
</script>

<style scoped>
.el-form-item {
    margin-bottom: 10px;
}

  .inputWid {
    width: 260px;
    /* margin-left: 10px;
    margin-bottom: 15px; */
  }

.dianxian.el-form-item {
  padding-bottom: 20px;
  margin-bottom: 5px;
  border-bottom: 2px dotted #AEE1FE;
}
</style>