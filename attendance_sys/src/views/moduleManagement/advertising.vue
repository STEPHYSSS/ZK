<template>
  <el-card id="advertising">
        <div>
            <el-form :model="form" ref="form" :inline="true" size="mini" class="advertising">
                <el-row>
                    <el-col :span="8">
                        <el-form-item prop="name" label="主题名称:">
                            <el-input  clearable  placeholder="请输入主题名称" v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item prop="status" label="状态">
                            <el-select  placeholder="请选择状态" v-model="form.status">
                            <el-option label="启用" value="1"></el-option>
                            <el-option label="禁用" value="0"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" class="btn_style">
                        <el-form-item label=" ">
                            <el-button class="search" @click="getTableData">查询</el-button>
                            <el-button class="reset" @click="resetForm('form')">重置</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <el-button size="mini" class="newAdd el-icon-plus" @click="newAdd">&nbsp;新增</el-button>
        <!-- 表格 -->
        <el-table :data="tableData" class="tableStyle" :header-cell-style="{color:'#444', width: '100%', borderTop: '1px solid #E6E6E6'}">
              <el-table-column prop="name" label="主题名称" align="center"></el-table-column>
              <el-table-column prop="url" label="链接地址" align="center"></el-table-column>
              <el-table-column prop="createTime" label="创建时间" align="center">
                  <template slot-scope="scope">
                      {{scope.row.createTime | fmtDate}}
                  </template>
              </el-table-column>
              <el-table-column prop="updateTime" label="更新时间" align="center">
                  <template slot-scope="scope">
                      <span v-if="scope.row.updateTime">{{scope.row.updateTime | fmtDate}}</span>
                  </template>
              </el-table-column>
              <el-table-column prop="operatorName" label="操作人姓名" align="center"></el-table-column>
              <el-table-column prop="status" label="状态" align="center">
                 <template slot-scope="scope">
                    <span v-if="scope.row.status == 1">启用</span>
                    <span v-if="scope.row.status == 0">禁用</span>
                  </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                 <template slot-scope="scope">
                     <a @click="redact(scope.row.id)">编辑&nbsp;&nbsp;|&nbsp;</a>
                     <a @click="remove(scope.row.id)">删除</a>
                 </template>
              </el-table-column>
        </el-table>

        <!-- 删除对话框 -->
        <my-dialog ref="myDialog" :content="reContent" @confirm="sureRemove"></my-dialog>

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
                :total="total">
            </el-pagination>
        </div>
  </el-card>
</template>

<script>
import myDialog from '@/components/myDialog'
import { advertList, advertDelete } from '@/api/moduleManage'
export default {
    data() {
        return {
      role: JSON.parse(sessionStorage.role),
            form: {
                name: '',
                status: ''
            },
            // 页面表格数据
            tableData: [],
            delId: '',
            // 分页数据
            total: 10,
            pageSize: 10,
            pageSizes: [10, 20, 30, 40],
            pageNum: 1,
            // 删除弹框
            reContent: '确定删除该数据？',
        }
    },

    created () {
        this.getTableData()
    },

    components: {
        myDialog
    },


    methods:{
        //页面列表数量
        async getTableData () {
            const { name, status } = this.form
            const { data: { code, msg, data } } = await advertList({name, status, pageSize: this.pageSize, pageNum: this.pageNum})
            if (code === '0000') {
                this.tableData = data
                // this.total = total
            }
        },

        // 新增
        newAdd(){
            const roleResult = this.role.find(item => item.id == 38)
            if (roleResult.check == 1) {
                this.$router.push({name : 'addNewAdvertising'})
            }
            else this.$message.error('无权限')
        },
        //编辑
        redact(id) {
            const roleResult = this.role.find(item => item.id == 39)
            if (roleResult.check == 1) {
                this.$router.push({
                    name: 'addNewAdvertising',
                    query: { id }
                })
            }
            else this.$message.error('无权限')
        },

        //删除
        remove (id) {
            const roleResult = this.role.find(item => item.id == 40)
            if (roleResult.check == 1) {
                    this.delId = id
                    this.$refs.myDialog.dialogVisible = true
            }
            else this.$message.error('无权限')
        },

        // 确认删除
        async sureRemove () {
            const { data: { code, msg } } = await advertDelete({id: this.delId})
            if (code === '0000') {
                this.$message.success('删除成功!')
                this.getTableData()
            }
            this.$refs.myDialog.dialogVisible = false
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.getTableData()
        },

        // 分页
        handleSizeChange(val) {
        this.pageSize = val
        this.pageNum = 1
        this.getTableData()
        },

        handleCurrentChange(val) {
        this.pageNum = val
        this.getTableData()
        },
    },
}
</script>

<style scoped>
.advertising{
    margin: 25px 0 20px 20px;
}

.btn_style{
    text-align: right;
}

.newAdd{
    background-color: #FA8A11;
    color: #fff;
    font-size: 11px;
    border: 1px solid #FA8A11;
    display: block;
    margin: 0 0 18px 20px;
}

.tableStyle a{
    color: #FA8A11;
    cursor:pointer;
}
</style>