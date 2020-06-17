<template>
  <div class="shadow-card">
    <el-button size="mini" class="add-btn font-size-12 border-orange bgc-orange border-orange font-color-fff" icon="el-icon-plus" @click="addRole">新增</el-button>
    
    <!-- 表格 -->
    <el-table :data="tableData" :header-cell-style="{color:'#444', width: '100%', borderTop: '1px solid #E6E6E6'}">
      <el-table-column prop="name" label="角色名称" align="center"></el-table-column>
      <el-table-column prop="remark" label="备注" align="center"></el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 1">启用</span>
          <span v-else-if="scope.row.status == 0">禁用</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center">
        <template slot-scope="scope">
          {{scope.row.createTime | fmtDate}}
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="更新时间" align="center">
        <template slot-scope="scope">
          {{scope.row.updateTime | fmtDate}}
        </template>
      </el-table-column>
      <el-table-column width="130" label="操作" align="center">
      <template slot-scope="scope">
        <i class="font-color-orange cur-point" @click="editRole(scope.row.id)">编辑</i>
        <i class="font-color-orange cur-point">&nbsp;|&nbsp;</i>
        <i class="font-color-orange cur-point" @click="delRole(scope.row.id)">删除</i>
      </template>
      </el-table-column>
    </el-table>

    <!-- 删除对话框 -->
    <my-dialog ref="myDialog" :content="delContent" @confirm="conDel"></my-dialog>

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
import { roleList, roleDel } from '@/api/systemSetup'
export default {
  data() {
    return {
      role: JSON.parse(sessionStorage.role),
      token: 'token',
      form: {
        // 分页数据
        total: 10,
        pageSize: 20,
        pageSizes: [20, 40, 60],
        pageNum: 1,
      },
      tableData: [],
      delRoleId: null, // 重置密码人的id
      delContent: '确定删除当前数据？',
    };
  },
  
  created () {
    this.getRoleList()
  },

  components: {
    myDialog
  },

  methods: {
    // 获取账号列表
    async getRoleList () {
      const that = this
      const { pageSize, pageNum } = that.form
      const { data: { code, msg, data: { total, list } } } = await roleList({ pageSize, pageNum })
      if (code === '0000') {
        that.form.total = total
        that.tableData = list
      }
    },

    //addRole
    addRole () {
      const roleResult = this.role.find(item => item.id == 29)
      if (roleResult.check == 1) {
        this.$router.push({name : 'addRole'})
      }
      else this.$message.error('无权限')
    },
    
    // 编辑
    editRole (id) {
      const roleResult = this.role.find(item => item.id == 30)
      if (roleResult.check == 1) {
        this.$router.push({
          name: 'addRole',
          query: { id }
        })
      }
      else this.$message.error('无权限')
    },

    // 删除角色
    delRole (id) {
      const roleResult = this.role.find(item => item.id == 31)
      if (roleResult.check == 1) {
        this.delRoleId = id
        this.$refs.myDialog.dialogVisible = true
      }
      else this.$message.error('无权限')
    },

    // 确认删除
    async conDel () {
      const { data: { code, msg } } = await roleDel({id: this.delRoleId})
      if (code === '0000') {
        this.$message.success('删除成功!')
        this.delRoleId = null
        this.getRoleList()
      }
      this.$refs.myDialog.handleClose()
    },
    
    // 分页
    handleSizeChange(val) {
      this.form.pageSize = val
      this.form.pageNum = 1
      this.getRoleList()
    },

    handleCurrentChange(val) {
      this.form.pageNum = val
      this.getRoleList()
    },
  }
};
</script>

<style scoped>
.add-btn {
  margin: 20px 0 18px 20px;
}
</style>