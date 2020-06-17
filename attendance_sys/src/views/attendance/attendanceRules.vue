<template>
  <el-card id="attendanceRules">
    <div>
      <el-form ref="form" :inline="true" :model="form" size="mini" style="padding: 20px 20px 0 20px;" class="form-query demo-form-inline">
        <el-row>
          <el-col :span="6">
            <el-form-item label="考勤名称:">
              <el-input clearable placeholder="请输入考勤名称" v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="排班方式">
              <el-select clearable placeholder="请选择状态" v-model="form.schedule">
                <el-option label="固定" :value="1"></el-option>
                <el-option label="自由" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态">
              <el-select clearable placeholder="请选择状态" v-model="form.status">
                <el-option label="启用" :value="1"></el-option>
                <el-option label="禁用" :value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="fr text-right" :span="6">
            <el-form-item>
              <el-button class="border-blue bgc-blue font-color-fff" @click="getTableData">查询</el-button>
              <el-button class="border-blue font-color-blue" @click="resetForm('form')">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <el-button size="mini" class="newAdd el-icon-plus" @click="newAdd">&nbsp;新增</el-button>
    <!-- 表格 -->
    <el-table
      :data="tableData"
      class="tableStyle"
      :header-cell-style="{color:'#444', width: '100%', borderTop: '1px solid #E6E6E6'}"
    >
      <el-table-column prop="name" label="考勤名称" align="center"></el-table-column>
      <el-table-column prop="remark" label="备注" align="center"></el-table-column>
      <el-table-column prop="schedule" label="排班方式" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 1">固定</span>
          <span v-if="scope.row.status == 2">自由</span>
        </template>
      </el-table-column>
      <el-table-column prop="commute" label="班次" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.commute == '1'">一天一次</span>
          <span v-if="scope.row.commute == '2'">一天两次</span>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 1">启用</span>
          <span v-if="scope.row.status == 2">禁用</span>
        </template>
      </el-table-column> -->
      <el-table-column prop="location" label="定位打卡" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.location == '1'">是</span>
          <span v-if="scope.row.location == '2'">否</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="230" align="center">
        <template slot-scope="scope">
          <a @click="redact(scope.row.id)">编辑&nbsp;&nbsp;|&nbsp;</a>
          <a @click="remove(scope.row.id)">删除&nbsp;&nbsp;|&nbsp;</a>
          <a @click="handleStatus(scope.row)">
            <span v-if="scope.row.status == 1">启用</span>
            <span v-if="scope.row.status == 2">禁用</span>
          &nbsp;|&nbsp;</a>
          <a @click="select(scope.row.id)">选择人员</a>
        </template>
      </el-table-column>
    </el-table>

    <!-- 删除对话框 -->
    <my-dialog ref="myDialog" :content="reContent" @confirm="confirmDeletion"></my-dialog>

    <!-- 选择人员遮罩层 -->
    <el-dialog v-if="dialogFormVisible" :visible.sync="dialogFormVisible" width="800px" class="maskLayer"
      :close-on-click-modal="false"
      :close-on-press-escape="false">
      <choose-pre v-if="dialogFormVisible" ref="choosePre" :rule_id="rule_id" @handleClose="dialogFormVisible = false"></choose-pre>
    </el-dialog>

    <!-- 分页 -->
    <div class="block">
      <el-pagination
        class="text-right"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </el-card>
</template>

<script>
import myDialog from "@/components/myDialog";
import { attendanceList, attendanceDelete, ruleBan } from '@/api/attendance'
import choosePre from "@/views/attendance/attRules/choosePre"
export default {
  data() {
    return {
      role: JSON.parse(sessionStorage.role),
      rule_id: '',
      form: {
        name: '',
        schedule: '',
        status: ''
      },
      // 选择人员 遮罩层数据
      dialogFormVisible: false,
      // 页面表格数据
      tableData: [],
      // 分页数据
      total: 10,
      pageSize: 10,
      pageSizes: [10, 20, 30, 40],
      pageNum: 1,
      delId: '',
      // 删除弹框
      reContent: "确定删除该数据？"
    };
  },

  created() {
      this.getTableData()
  },

  components: {
    myDialog,
    choosePre
  },

  methods: {
    //页面列表数量
    async getTableData() {
        const { name, schedule, status } = this.form
        const { data: { code, msg, data: { list, total } } } = await attendanceList({name, schedule, status, pageSize: this.pageSize, pageNum: this.pageNum})
        if (code === '0000') {
            this.tableData = list
            this.total = total
        }
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
        this.getTableData()
    },
    async handleStatus (row) {
      let status = row.status == '1' ? '2' : '1'
      const { data: { code } } = await ruleBan({id: row.id, status})
      if (code === '0000') {
        this.getTableData()
      }
    },

    //新增考勤
    newAdd() {
      const roleResult = this.role.find(item => item.id == 18)
      if (roleResult.check == 1) {
        this.$router.push({name : 'addAttendance'})
      }
      else this.$message.error('无权限')
    },

    //编辑
    redact(id) {
      const roleResult = this.role.find(item => item.id == 19)
      if (roleResult.check == 1) {
        this.$router.push({
          name: 'addAttendance',
          query: { id }
        })
      }
      else this.$message.error('无权限')
    },

    //删除
    remove(id) {
      const roleResult = this.role.find(item => item.id == 20)
      if (roleResult.check == 1) {
        this.delId = id
        this.$refs.myDialog.dialogVisible = true;
      }
      else this.$message.error('无权限')
    },

    //确认删除
    async confirmDeletion() {
      const { data: { code, msg } } = await attendanceDelete({id: this.delId})
      if (code === '0000') {
        this.$message.success('删除成功!')
            this.getTableData()
      }
      this.$refs.myDialog.dialogVisible = false
    },

    //选择人员
    select(id) {
      const roleResult = this.role.find(item => item.id == 21)
      if (roleResult.check == 1) {
        this.rule_id = id
        this.dialogFormVisible = true
      }
      else this.$message.error('无权限')
    },

    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageNum = 1;
      this.getTableData();
    },

    handleCurrentChange(val) {
      this.pageNum = val;
      this.getTableData();
    }
  }
};
</script>

<style scoped>
.attendanceRules {
  margin: 25px 0 20px 20px;
}

.btn_style {
  text-align: right;
}

.search {
  background-color: #4489fe;
  color: #fff;
  border: 1px solid #4489fe;
}

.reset {
  background-color: #fff;
  color: #4489fe;
  border: 1px solid #4489fe;
}

.newAdd {
  background-color: #fa8a11;
  color: #fff;
  font-size: 11px;
  border: 1px solid #fa8a11;
  display: block;
  margin: 0 0 18px 20px;
}
/* 表单样式结束 */
.tableStyle a {
  cursor: pointer;
  color: #fa8a11;
}
</style>