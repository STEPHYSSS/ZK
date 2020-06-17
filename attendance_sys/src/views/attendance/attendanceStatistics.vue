<template>
  <el-card id="attendancestatistics">
        <div>
            <el-form :model="form" ref="form" :inline="true" size="mini" class="attendancestatistics">
                <el-row>
                    <el-col :span="6">
                        <el-form-item prop="name" label="姓名:">
                            <el-input  clearable  placeholder="请输入姓名" v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item prop="phone" label="联系方式：">
                            <el-input  clearable  placeholder="请输入联系方式" v-model="form.phone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item prop="sectionId" label="部门：">
                            <el-select  placeholder="请选择部门" v-model="form.sectionId">
                                <el-option v-for="(item, index) in statisticList" :key="index" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="btn_style">
                        <el-form-item label=" ">
                            <el-button class="search" @click="getTableData">查询</el-button>
                            <el-button class="reset" @click="resetForm('form')">重置</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <el-button size="mini" class="derive" @click="derive">导出</el-button>
        <!-- 表格 -->
        <el-table :data="tableData" class="tableStyle" :header-cell-style="{color:'#444', width: '100%', borderTop: '1px solid #E6E6E6'}">
              <el-table-column prop="personnelName" label="姓名" align="center"></el-table-column>
              <el-table-column prop="phone" label="联系方式" align="center"></el-table-column>
              <el-table-column prop="sectionName" label="部门" align="center"></el-table-column>
              <el-table-column prop="job" label="职务" align="center"></el-table-column>
              <el-table-column prop="ruleName" label="考勤名称" align="center"></el-table-column>
        </el-table>

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
        <!-- 导出弹框 -->
        <el-dialog title="编辑" :visible.sync="dialogFormVisibleDC" class="compileDialog export-excel">
            <export-excel :type="'statistics'" @handleClose="dialogFormVisibleDC = false"></export-excel>
        </el-dialog>

  </el-card>
</template>

<script>
  import exportExcel from './attRules/exportExcel'
import { statisticList } from '@/api/attendance'
import { export2Excel } from '@/api/public'
import { stationList } from '@/api/systemSetup'
export default {
    data() {
        return {
      role: JSON.parse(sessionStorage.role),
            dialogFormVisibleDC: false,
      statisticList: [],
            form: {
                name: '',
                phone: '',
                sectionId: ''
            },
            tableData: [],
            // 分页数据
            total: 10,
            pageSize: 10,
            pageSizes: [10, 20, 30, 40],
            pageNum: 1,
        }
    },

    created () {
        this.getTableData()
        this.getStationList()
    },
    components: {
        exportExcel
    },

    methods:{
        async getTableData () {
            const { name, phone, sectionId } = this.form
            const { data: { code, msg, data: { list, total } } } = await statisticList({name, phone, sectionId, pageSize: this.pageSize, pageNum: this.pageNum})
            if (code === '0000') {
                this.tableData = list
                this.total = total
            }
        },
        async getStationList () {
        const { data: { code, msg, data: { list, total } } } = await stationList()
        if (code === '0000') {
            this.statisticList = list
        }
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.getTableData()
        },
        //导出
        derive(){
            const roleResult = this.role.find(item => item.id == 25)
            if (roleResult.check == 1) {
                this.dialogFormVisibleDC = true
            }
            else this.$message.error('无权限')
        },
      // 导出excel
        exportExcel () {
            const columns = [
                {title: '姓名', key: 'name'},
                {title: '联系方式', key: 'phone'},
                {title: '部门', key: 'section'},
                {title: '职务', key: 'job'},
                {title: '考勤名称', key: 'ruleName'}
            ]
            export2Excel(columns, this.tableData, '考勤统计')
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
    },
}
</script>

<style scoped>
.attendancestatistics{
    margin: 25px 0 20px 20px;
}

.btn_style{
    text-align: right;
}

.btn_style .search{
    color: #fff;
    background-color: #4489FE;
    border: 1px solid #4489FE;
}

.btn_style .reset{
    color: #4489FE;
    background-color: #fff;
    border: 1px solid #4489FE;
}

.derive{
    background-color: #FA8A11;
    color: #fff;
    font-size: 11px;
    border: 1px solid #FA8A11;
    display: block;
    margin: 0 0 18px 20px;
}
</style>