<template>
  <div class="shadow-card">
    <el-button size="mini" class="add-btn font-size-12 border-orange bgc-orange font-color-fff" icon="el-icon-back" @click="stationList">返回</el-button>
    <!-- 查询条件表单 -->
    <el-form ref="form" :inline="true" :model="form" size="mini" style="padding: 20px 20px 0 20px;" class="form-query demo-form-inline">
      <el-row>
        <el-col :span="6">
          <el-form-item label="姓名:" prop="name">
            <el-input maxlength="10" clearable v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="操作时间:" prop="startCreateTime">
            <el-date-picker type="date" value-format="yyyy-MM-dd" style="width: 150px;" v-model="form.startCreateTime" placeholder="选择日期"></el-date-picker> - 
            <el-date-picker type="date" value-format="yyyy-MM-dd" style="width: 150px;" v-model="form.endCreateTime" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="fr text-right" :span="6">
          <el-form-item>
            <el-button class="border-blue bgc-blue font-color-fff" @click="getRecordList">查询</el-button>
            <el-button class="border-blue font-color-blue" @click="resetForm('form')">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    
    <!-- 表格 -->
    <el-table :data="tableData" :header-cell-style="{color:'#444', width: '100%', borderTop: '1px solid #E6E6E6'}">
      <el-table-column prop="id" label="编号" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="section" label="部门" align="center"></el-table-column>
      <el-table-column prop="job" label="职务" align="center"></el-table-column>
      <el-table-column prop="createTime" label="操作时间" align="center">
        <template slot-scope="scope">
          {{scope.row.createTime | fmtDate}}
        </template>
      </el-table-column>
      <el-table-column prop="operatorName" label="操作人" align="center"></el-table-column>
      <el-table-column prop="isReveal" label="是否在学生端展示" align="center">
        <template slot-scope="scope">
          <span class='font-color-orange cur-point' @click="recordChange(scope.row.id, '1')" v-if="scope.row.isReveal == 2">否</span>
          <span class='font-color-orange cur-point' @click="recordChange(scope.row.id, '2')" v-else-if="scope.row.isReveal == 1">是</span>
        </template>
      </el-table-column>
    </el-table>

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
import { recordList, recordChange } from '@/api/systemSetup'
export default {
  data() {
    return {
      form: {
        name: "",
        startCreateTime: "",
        endCreateTime: "",
        // 分页数据
        total: 10,
        pageSize: 10,
        pageSizes: [10, 20, 30],
        pageNum: 1,
      },
      tableData: []
    };
  },
  
  created () {
    this.getRecordList()
  },

  methods: {
    // 获取人员列表
    async getRecordList () {
      const that = this
      const { pageSize, pageNum, name, startCreateTime, endCreateTime } = that.form
      const { data: { code, msg, data: { total, list } } } = await recordList({ pageSize, pageNum, name, startCreateTime, endCreateTime })
      if (code === '0000') {
        that.form.total = total
        that.tableData = list
      }
    },

    // 重置表单
    resetForm(formName) {
      this.form.endCreateTime = ''
      this.$refs[formName].resetFields();
      this.getRecordList()
    },
    // recordChange
    async recordChange (id, is_reveal) {
      const { data: { code, msg } } = await recordChange({ id, is_reveal })
      if (code === '0000') {
        this.getRecordList()
      }
    },

    //stationList
    stationList () {
      this.$router.push({name : 'stationList'})
    },
    
    // 分页
    handleSizeChange(val) {
      this.form.pageSize = val
      this.form.pageNum = 1
      this.getRecordList()
    },

    handleCurrentChange(val) {
      this.form.pageNum = val
      this.getRecordList()
    },
  }
};
</script>

<style scoped>
.add-btn {
  margin: 10px;
}
</style>