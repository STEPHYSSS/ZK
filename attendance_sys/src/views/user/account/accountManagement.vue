<template>
  <div class="shadow-card">
    <!-- 查询条件表单 -->
    <el-form ref="form" :inline="true" :model="form" size="mini" style="padding: 20px 20px 0 20px;" class="form-query demo-form-inline">
      <el-row>
        <el-col :span="6">
          <el-form-item label="姓名:" prop="name">
            <el-input maxlength="10" clearable v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="联系方式:" prop="phone">
            <el-input maxlength="11" clearable v-model="form.phone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="状态:" prop="status">
            <el-select clearable v-model="form.status" placeholder="请选择">
              <el-option label="启用" :value="1"></el-option>
              <el-option label="禁用" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="fr text-right" :span="6">
          <el-form-item>
            <el-button class="border-blue bgc-blue font-color-fff" @click="getAccountList">查询</el-button>
            <el-button class="border-blue font-color-blue" @click="resetForm('form')">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-button size="mini" class="add-btn font-size-12 border-orange bgc-orange border-orange font-color-fff" icon="el-icon-plus" @click="addAccount">新增</el-button>
    
    <!-- 表格 -->
    <el-table :data="tableData" :header-cell-style="{color:'#444', width: '100%', borderTop: '1px solid #E6E6E6'}">
      <el-table-column prop="id" label="ID编号" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="phone" label="联系方式" align="center"></el-table-column>
      <el-table-column prop="roleName" label="角色" align="center"></el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 1">启用</span>
          <span v-else-if="scope.row.status == 0">禁用</span>
        </template>
      </el-table-column>
      <el-table-column width="130" label="操作" align="center">
      <template slot-scope="scope">
        <i class="font-color-orange cur-point" @click="editAccount(scope.row.id)">编辑</i>
        <i class="font-color-orange cur-point">&nbsp;|&nbsp;</i>
        <i class="font-color-orange cur-point" @click="resetPwd(scope.row.id)">重置密码</i>
      </template>
      </el-table-column>
    </el-table>

    <!-- 重置密码对话框 -->
    <my-dialog ref="myDialog" :content="reContent" @confirm="conRePwd"></my-dialog>

    <!-- 分页 -->
    <div class="block">
      <el-pagination
        class="text-right"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.pageNum"
        :page-sizes="form.pageSizes"
        :page-size="form.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="form.total">
      </el-pagination>
    </div>
    
  </div>
</template>

<script>
import myDialog from '@/components/myDialog'
import { accountList, accountrePwd } from '@/api/user'
export default {
  data() {
    return {
      role: JSON.parse(sessionStorage.role),
      token: 'token',
      form: {
        name: "",
        phone: "",
        status: null,
        // 分页数据
        total: 10,
        pageSize: 20,
        pageSizes: [20, 40, 60],
        pageNum: 1,
      },
      tableData: [],
      rePwdId: null, // 重置密码人的id
      reContent: '确定将用户登陆密码重置为123456？',
    };
  },
  
  created () {
    this.getAccountList()
  },

  components: {
    myDialog
  },

  methods: {
    // 获取账号列表
    async getAccountList () {
      const that = this
      const { pageSize, pageNum, name, phone, station, status } = that.form
      const token = that.token
      const { data: { code, msg, data: { total, list } } } = await accountList({ name, phone, station, status, pageSize, pageNum })
      if (code === '0000') {
        that.form.total = total
        that.tableData = list
      }
    },

    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.getAccountList()
    },

    //addUser
    addAccount () {
      const roleResult = this.role.find(item => item.id == 15)
      if (roleResult.check == 1) {
        this.$router.push({name : 'addAccount'})
      }
      else this.$message.error('无权限')
    },
    
    // 编辑
    editAccount (id) {
      const roleResult = this.role.find(item => item.id == 16)
      if (roleResult.check == 1) {
        this.$router.push({
          name: 'addAccount',
          query: { id }
        })
      }
      else this.$message.error('无权限')
    },

    // 重置密码
    resetPwd (id) {
      const roleResult = this.role.find(item => item.id == 17)
      if (roleResult.check == 1) {
        this.rePwdId = id
        this.$refs.myDialog.dialogVisible = true
      }
      else this.$message.error('无权限')
    },

    // 确认重置
    async conRePwd () {
      const { data: { code, msg } } = await accountrePwd({id: this.rePwdId})
      if (code === '0000') {
        this.$message.success('操作成功')
        this.rePwdId = null
        this.$refs.myDialog.handleClose()
      }
    },
    
    // 分页
    handleSizeChange(val) {
      this.form.pageSize = val
      this.form.pageNum = 1
      this.getAccountList()
    },

    handleCurrentChange(val) {
      this.form.pageNum = val
      this.getAccountList()
    },
  }
};
</script>

<style scoped>
.add-btn {
  margin: 0 0 18px 20px;
}
</style>