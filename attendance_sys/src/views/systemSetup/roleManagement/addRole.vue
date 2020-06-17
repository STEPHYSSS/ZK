<template>
  <div class="shadow-card">
    <div class="container-card">
      <el-form :model="form" :rules="rules" ref="from" label-width="100px" class="demo-ruleForm">
        <el-form-item label="角色名称:" prop="name">
          <el-input clearable size="mini" maxlength="50" class="inp-width" v-model="form.name"></el-input>
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
        <el-form-item label="权限设置:" prop="rules">
          <el-tree
            :data="data"
            show-checkbox
            @check-change="handleCheckChange"
            node-key="id"
            :default-expanded-keys="defaultExpandedKeys"
            :default-checked-keys="defaultCheckedKeys"
            :props="defaultProps">
          </el-tree>
        </el-form-item>
      </el-form>
    </div>
    <div class="footer-card">
      <el-button size="mini" class="border-blue bgc-blue font-color-fff" @click="submitForm('from')">保存</el-button>
      <el-button size="mini" class="border-blue font-color-blue" @click="roleList">取消</el-button>
    </div>
  </div>
</template>

<script>
import { roleInsert, roleUpdate, roleDetail, powerTree } from '@/api/systemSetup'
export default {
  data() {
    return {
      data: [],
      form: {
        name: '',
        remark: '',
        powerSet: [],
        status: null
      },
      // 结构树默认选中
      defaultCheckedKeys: [],
      // 结构树默认展开
      defaultExpandedKeys: [1],
      rules: {
        name: { required: true, message: '请输入姓名', trigger: 'blur' },
        status: { required: true, message: '请选择状态', trigger: 'change' }
      },
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    };
  },
  
  created () {
    if (this.$route.query.id) {
      this.getRoleDetail(this.$route.query.id)
    }else {
      this.getPowerTree()
    }
  },

  methods: {
    // 获取账号详情
    async getRoleDetail (id) {
      const res = await roleDetail({id})
      const { code, msg, data } = res.data
      if (code === '0000') {
        this.form = data
        // 需要将已选中的权限回显、展开
        for (const i of data.powerSet) {
          for (const y of i.children) {
            if (y.check == 1) {
              // 如果选中就需要展开  第二次进来避免重复push
              if (this.defaultExpandedKeys.indexOf(i.id) === -1) {
                this.defaultExpandedKeys.push(i.id) // 如果有一个选中就展开
              }
              this.defaultCheckedKeys.push(y.id)
            }
          }
        }
        // 将选中的role赋值到form
        this.data = data.powerSet
        this.form.powerSet = this.defaultCheckedKeys
      }
    },
    // 获取权限树
    async getPowerTree () {
      const { data: { code, msg, data } } = await powerTree()
      if (code === '0000') {
        this.data = data
      }
    },
    // 保存
    submitForm (formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          if (this.form.powerSet.length <= 0) return this.$message('至少选择一项权限！')
          let res = {}
          this.form.powerSet = this.form.powerSet.join(',')
          if (!this.$route.query.id) {
            res = await roleInsert(this.form)
          }else {
            res = await roleUpdate(this.form)
          }
          const { code, msg } = res.data
          if (code === '0000') {
            this.roleList()
            this.$message.success('保存成功')
          }else {
            this.$message.error(msg)
          }
        }
      })
    },
    // tree选中
    handleCheckChange(data, checked, indeterminate) {
      const { id, type } = data
      if (checked) {
        this.form.powerSet.push(id)
      }else {
        for (const i in this.form.powerSet) {
          const element = this.form.powerSet[i];
          if (element === id) {
            this.form.powerSet.splice(i, 1)
          }
        }
      }
    },
    // 取消跳转账号列表
    roleList () {
      this.$router.push({ name: 'roleList' })
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