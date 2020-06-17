<template>
  <el-card id="attendanceRecord">
        <div>
            <el-form ref="form" :inline="true" :model="form" size="mini" style="padding: 20px 20px 0 20px;" class="form-query demo-form-inline">
                <el-row>
                    <el-col :span="6">
                        <el-form-item prop="name" label="姓名：">
                            <el-input  clearable  placeholder="请输入姓名" v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item prop="startCreateTime" label="考勤日期：">
                            <el-date-picker type="date" value-format="yyyy-MM-dd" style="width: 150px;" v-model="form.startCreateTime" placeholder="选择日期"></el-date-picker> - 
                            <el-date-picker type="date" value-format="yyyy-MM-dd" style="width: 150px;" v-model="form.endCreateTime" placeholder="选择日期"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="formStatus">
                        <el-form-item prop="status" label="状态">
                            <el-select placeholder="请选择状态" v-model="form.status">
                    <el-option label="正常" value="1"></el-option>
                    <el-option label="迟到" value="2"></el-option>
                    <el-option label="早退" value="3"></el-option>
                    <el-option label="缺卡" value="4"></el-option>
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

        <el-button size="mini" class="derive" @click="derive">导出</el-button>
        <!-- 表格 -->
        <el-table :data="tableData" class="tableStyle" :header-cell-style="{color:'#444', width: '100%', borderTop: '1px solid #E6E6E6'}">
              <el-table-column prop="name" label="姓名" align="center"></el-table-column>
              <el-table-column prop="day" label="考勤日期" align="center"></el-table-column>
              <el-table-column prop="time" label="打卡时间" align="center"></el-table-column>
              <el-table-column prop="type" label="打卡方式" align="center">
                 <template slot-scope="scope">
                    <span v-if="scope.row.type == 'TO'">上班</span>
                    <span v-if="scope.row.type == 'OFF'">下班</span>
                  </template>
              </el-table-column>
              <el-table-column prop="schedule" label="排班方式" align="center">
                 <template slot-scope="scope">
                    <span v-if="scope.row.schedule == 1">固定</span>
                    <span v-if="scope.row.schedule == 2">自由</span>
                  </template>
              </el-table-column>
              <el-table-column prop="status" label="状态" align="center">
                 <template slot-scope="scope">
                    <span v-if="scope.row.status == 1">正常</span>
                    <span v-if="scope.row.status == 2">早退</span>
                    <span v-if="scope.row.status == 3">迟到</span>
                    <span v-if="scope.row.status == 4">缺卡</span>
                  </template>
              </el-table-column>
              <el-table-column prop="operatorName" label="操作人" align="center"></el-table-column>
              <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                  <a @click="redact(scope.row)">编辑&nbsp;&nbsp;|&nbsp;</a>
                  <a @click="details(scope.row.id)">详情</a>
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
        <!-- 编辑弹框 -->
        <el-dialog title="编辑" :visible.sync="dialogFormVisible" class="compileDialog">
            <el-form :model="compileForm" :rules="rules">
                <el-form-item label="打卡时间：" prop="time" :label-width="formLabelWidth">
                     <el-time-picker v-model="compileForm.time" value-format="HH:mm:ss" format="HH:mm:ss" placeholder="" class="compileDialogInp"></el-time-picker>
                </el-form-item>
                <el-form-item label="状态" prop="status" :label-width="formLabelWidth">
                <el-select v-model="compileForm.status" placeholder="请选择状态" class="compileDialogInp">
                    <el-option label="正常" value="1"></el-option>
                    <el-option label="迟到" value="2"></el-option>
                    <el-option label="早退" value="3"></el-option>
                    <el-option label="缺卡" value="4"></el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="备注：" prop="remark" :label-width="formLabelWidth">
                    <el-input v-model="compileForm.remark" autocomplete="off" class="compileDialogInp"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="recordUpdate">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 导出弹框 -->
        <el-dialog title="编辑" :visible.sync="dialogFormVisibleDC" class="compileDialog export-excel">
            <export-excel :type="'record'" @handleClose="dialogFormVisibleDC = false"></export-excel>
        </el-dialog>

        <!-- 详情弹框 -->
        <el-dialog :visible.sync="detailsDialogVisible" width="320px" class="detailsDialog">
            <div class="pictureVessel">
                <img src="@/assets/爱丽儿.jpg">
            </div>
            <span slot="footer" class="dialog-footer">
                <p>2020-04-19 11:04:02</p>
                <!-- <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
            </span>
        </el-dialog>
  </el-card>
</template>

<script>
import { recordList, recordUpdate, recordExport } from '@/api/attendance'
import { export2Excel } from '@/api/public'
  import exportExcel from './attRules/exportExcel'
export default {
    data() {
        return {
            role: JSON.parse(sessionStorage.role),
            dialogFormVisibleDC: false,
            form: {
                name: '',
                startCreateTime: '',
                endCreateTime: '',
                status: ''
            },
            tableData: [],
            // 分页数据
            total: 10,
            pageSize: 10,
            pageSizes: [10, 20, 30, 40],
            pageNum: 1,
            // 编辑弹框中数据
            dialogFormVisible: false,
            compileForm: {
                id: '',
                time: '',
                status: '',
                remark: '',
            },
            rules: {
                remark: [{ required: true, message: '请填写备注', trigger: 'blur' }]
            },
            formLabelWidth: '120px',
            //详情弹框中数据
            detailsDialogVisible: false,
        }
    },

    created () {
        this.getTableData()
    },

    components: {
        exportExcel
    },

    methods:{
        //页面列表数量
        async getTableData(){
            const { name, startCreateTime, endCreateTime, status } = this.form
            const { data: { code, msg, data: { list, total } } } = await recordList({name, startCreateTime, endCreateTime, status, pageSize: this.pageSize, pageNum: this.pageNum})
            if (code === '0000') {
                this.tableData = list
                this.total = total
            }
        },
        resetForm(formName) {
            this.form = {
                name: '',
                startCreateTime: '',
                endCreateTime: '',
                status: ''
            },
            this.getTableData()
        },

        async recordUpdate () {
            const { data: { code, msg } } = await recordUpdate(this.compileForm)
            if (code === '0000') {
                this.$message.success('操作成功！')
                this.dialogFormVisible = false
            }
        },

        //导出
        derive(){
            const roleResult = this.role.find(item => item.id == 22)
            if (roleResult.check == 1) {
                this.dialogFormVisibleDC = true
            }
            else this.$message.error('无权限')
        },

        //编辑
        redact(row){
            const roleResult = this.role.find(item => item.id == 23)
            if (roleResult.check == 1) {
                this.dialogFormVisible = true;
                Object.keys(this.compileForm).forEach(item => {
                    this.compileForm[item] = row[item]
                })
            }
            else this.$message.error('无权限')
        },
        
        //详情
        details(){
            const roleResult = this.role.find(item => item.id == 24)
            if (roleResult.check == 1) {
                this.detailsDialogVisible = true;
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
.attendanceRecord{
    margin: 25px 0 20px 20px;
}

.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 145px;
}

.formStatus{
    text-align: right;
}

.btn_style{
    text-align: right;
}

.search{
    background-color: #4489FE;
    color: #fff;
    border: 1px solid #4489FE;
}

.reset{
    background-color: #fff;
    color: #4489FE;
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
/* 表单样式结束 */
.tableStyle a{
    cursor:pointer;
    color: #FA8A11;
}

/* 编辑弹框 */
.compileDialog .dialog-footer{
    text-align: center;
}

/* 详情弹框 */
.detailsDialog .pictureVessel{
    width: 320px;
    height: 410px;
    overflow: hidden;
}

.detailsDialog .pictureVessel img{
    height: 100%;
    width: 100%;
}
</style>