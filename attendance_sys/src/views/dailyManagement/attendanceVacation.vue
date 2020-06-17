<template>
  <el-card id="atedanceVacation">
        <div>
            <el-form :model="form" ref="form" :inline="true" size="mini" class="atedanceVacationlForm">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="单据编号:">
                            <el-input  clearable  placeholder="请输入单据编号" v-model="form.code"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="提交人：">
                            <el-input  clearable  placeholder="请输入提交人" v-model="form.personnelName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="提交时间：">
                            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="form.startCreateTime"></el-date-picker> - 
                            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="form.endCreateTime"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="formStatus">
                        <el-form-item label="状态">
                            <el-select  placeholder="请选择状态" v-model="form.status">
                            <el-option label="待审核" value="W"></el-option>
                            <el-option label="不通过" value="F"></el-option>
                            <el-option label="通过" value="S"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="btn_style fr text-right">
                        <el-form-item label=" ">
                            <el-button class="search" @click="getTableData">查询</el-button>
                            <el-button class="reset" @click="resetForm('form')">重置</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <!-- 表格 -->
        <el-table :data="tableData" class="tableStyle" :header-cell-style="{color:'#444', width: '100%', borderTop: '1px solid #E6E6E6'}">
              <el-table-column prop="code" label="单据编号" align="center"></el-table-column>
              <el-table-column prop="personnelName" label="提交人" align="center"></el-table-column>
              <el-table-column prop="createTime" label="提交时间" align="center">
                  <template slot-scope="scope">
                      {{scope.row.createTime | fmtDate}}
                  </template>
              </el-table-column>
              <el-table-column prop="type" label="出勤类型" align="center">
                 <template slot-scope="scope">
                    <span v-if="scope.row.type == 'C'">事假</span>
                    <span v-if="scope.row.type == 'S'">病假</span>
                    <span v-if="scope.row.type == 'G'">外出</span>
                  </template>
              </el-table-column>
              <el-table-column prop="status" label="status" align="center">
                 <template slot-scope="scope">
                    <span v-if="scope.row.status == 'W'">待审核</span>
                    <span v-if="scope.row.status == 'F'">不通过</span>
                    <span v-if="scope.row.status == 'S'">通过</span>
                  </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <a @click="examine(scope.row)">
                        <span v-if="scope.row.status != 'W'">查看</span>
                        <span v-else>审核</span>
                    </a>
                  </template>
              </el-table-column>
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

  </el-card>
</template>

<script>
import { leaveList } from '@/api/dailyManage'
export default {
    data() {
        return {
      role: JSON.parse(sessionStorage.role),
            tableData: [],
            form: {
                code: '',
                personnelName: '',
                startCreateTime: '',
                endCreateTime: '',
                status: ''
            },
            // 分页数据
            total: 10,
            pageSize: 10,
            pageSizes: [10, 20, 30, 40],
            pageNum: 1,
        }
    },

    created () {
        this.getTableData()
    },

    methods:{
        //页面列表数量
        async getTableData(){
            const { personnelName, startCreateTime, endCreateTime, status } = this.form
            const { data: { code, msg, data: { list, total } } } = await leaveList({code: this.form.code, personnelName, startCreateTime, endCreateTime, status, pageSize: this.pageSize, pageNum: this.pageNum})
            if (code === '0000') {
                this.tableData = list
                this.total = total
            }
        },
        resetForm(formName) {
            this.form = {
                code: '',
                personnelName: '',
                startCreateTime: '',
                endCreateTime: '',
                status: ''
            }
            this.getTableData()
        },
        //查看
        examine(row){
            let roleResult = {}
            if (row.status != 'w') {
                roleResult = this.role.find(item => item.id == 36)
            }else {
                roleResult = this.role.find(item => item.id == 37)
            }
            if (roleResult.check == 1) {
                this.$router.push({
                    name: 'attendanceDetails',
                    query: {
                        code: row.code,
                        status: row.status
                    }
                })
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
    },
}
</script>

<style scoped>
.atedanceVacationlForm{
    margin: 25px 0 20px 20px;
}
</style>