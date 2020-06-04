<template>
  <el-card class="f-new box-card">
    <!-- <new-tabs :active="2" level1="新增班级" level2="管理班级" @callback1="newClass"></new-tabs> -->
    <h3>管理班级</h3>
    <previous-page goPreviousPage="/mpage"></previous-page>
    <div class="addBox">
      <el-button @click="newClass">新增</el-button>
    </div>
    <!-- 表格 -->
    <template>
      <el-table
      :data="tableData"
      border
      class="topBorder"
      style="width: 100%"
      
      >
        <el-table-column align="center" prop="class_name" label="班级名称" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column align="center" prop="stu_count" label="用户数">
        </el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">开放</span>
            <span v-if="scope.row.status == 2">关闭</span>
          </template>
        </el-table-column>
        <el-table-column prop="create_user_name" align="center" label="创建人" width="210">
          <!-- <template slot-scope="scope">{{ scope.row.poster }}<br/>{{ scope.row.createdate }}</template> -->
        </el-table-column>
        <el-table-column prop="update_user_name" align="center" label="最后修改人" width="210">
          <!-- <template slot-scope="scope">{{ scope.row.modifyor }}<br/>{{ scope.row.modifydate }}</template> -->
        </el-table-column>
        <el-table-column align="center" label="操作" width="180">
          <template slot-scope="scope">
            <span class="cur-point dis-inline-block" @click="handlePut(scope.row)">
              <img src="@/assets/images/xiugai_icon.png" alt="">&nbsp;&nbsp;&nbsp;
            </span>
            <span class="cur-point dis-inline-block" @click="open(scope.row)">
              <img src="@/assets/images/shanchu_icon.png" alt="">
            </span>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="pagesizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

  </el-card>

</template>

<script>
  import newTabs from '@/components/newTabs'
  import previousPage from "@/components/previousPage.vue";
  import qs from 'qs'
  export default {
    data() {
      return {
        // 表格
        tableData: [],
        list: [],
        // 分页数据
        total: 10,
        pageSize: 10,
        pagesizes: [10, 20, 30, 40],
        pageNum: 1,

      }
    },

    created() {
      this.getfindClasses()
    },
    components: {
      newTabs,
      "previous-page": previousPage
    },

    methods: {
      getfindClasses () {
        const that = this
        that.$utils.post(this.reqApi.shuiwuUrl+'/class/list',qs.stringify({
          pageNum: this.pageNum,
          pageSize:this.pageSize
        })).then(res => {
          if(res.data.code==='0000'){
            this.tableData=res.data.classes.list
            this.total=res.data.classes.total
          }
        })
      },

      // newClass
      newClass () {
        this.$router.push({name : 'newClass'})
      },

      // 改
      handlePut (info) {
        this.$router.push({
          name: 'newClass',
          query: {id : info.id}
        })
      },

      // 删
      open(info) {
        const that = this
        that.$confirm('删除操作无法恢复，确定删除吗?', '来自网页的消息', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
        }).then(() => {
          that.$utils.post(this.reqApi.shuiwuUrl+'/class/delete',qs.stringify({
            class_id:info.id
          })).then(res => {
            if(res.data.code==='0000'){
              this.$message.success('删除成功')
              this.getfindClasses()
            }else{
              this.$message.error(res.data.msg)
            }
          })
        }).catch(() => {

        })
      },

      // 分页
      handleSizeChange(val) {
        this.pageSize = val
       this.getfindClasses()
      
      },

      handleCurrentChange(val) {
        this.pageNum = val
        this.getfindClasses()
      }

    },
  }
</script>

<style scoped>
</style>