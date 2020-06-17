<template>
  <el-card class="f-new box-card">
    <!-- <new-tabs :active="2" level1="新增试卷分类" level2="试卷分类" @callback1="newPaperCategory"></new-tabs> -->
    <h3>试卷分类</h3>
    <previous-page goPreviousPage="/mpage"></previous-page>
    <!-- 表格 -->
    <div class="addBox">
      <el-button @click="newPaperCategory">新增</el-button>
    </div>
    <el-table
    :data="tableData"
    class="topBorder"
    style="width: 100%"

    >
      <el-table-column align="center" prop="name" label="分类名称"></el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 1">正常</span>
          <span v-if="scope.row.status == 2">锁定</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="共享">
        <template slot-scope="scope">
          <span v-if="scope.row.shared == 1">共享</span>
          <span v-if="scope.row.shared == 2">私有</span>
        </template>
      </el-table-column>
      <el-table-column align="center" show-overflow-tooltip prop="description" label="分类说明">
      </el-table-column>
      <el-table-column align="center" label="创建人">
        <template slot-scope="scope">{{ scope.row.creater_name }}<br/>{{scope.row.create_time | fmtDate()}}</template>
      </el-table-column>
      <el-table-column align="center" label="最后修改人">
        <template slot-scope="scope">{{ scope.row.updater_name }}<br/>{{scope.row.update_time | fmtDate()}}</template>
      </el-table-column>
      <el-table-column align="center" prop="name" label="操作" width="120" fixed="right">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
           <span class="cur-point dis-inline-block" @click="handlePut(scope.row)">
            <img src="@/assets/images/xiugai_icon.png" alt="">&nbsp;&nbsp;&nbsp;
          </span>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
           <span class="cur-point dis-inline-block" @click="open(scope.row)">
            <img src="@/assets/images/shanchu_icon.png" alt="">
          </span>
          </el-tooltip>
          <!-- <span class="cur-point dis-inline-block" @click="handlePut(scope.row)">
            <img src="@/assets/images/xiugai_icon.png" alt="">&nbsp;&nbsp;&nbsp;
          </span>
          <span class="cur-point dis-inline-block" @click="open(scope.row)">
            <img src="@/assets/images/shanchu_icon.png" alt="">
          </span> -->
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="pagesizes"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </el-card>

</template>

<script>
  import { getTypePapers, deleteTypePaper } from '@/api/taxUrl/testpaper'
  import newTabs from '@/components/newTabs'
  import previousPage from "@/components/previousPage.vue";
  export default {
    data() {
      return {
        // 表格
        tableData: [],
        list: [],
        // 分页数据
        total: 10,
        pagesize: 10,
        pagesizes: [10, 20, 30, 40],
        pagenum: 1,
        aRoleid:sessionStorage.role_id
      }
    },

    created () {
      this.getTypePapers(this.pagesize, this.pagenum)
    },
    components: {
      newTabs,
      "previous-page": previousPage
    },

    methods: {
      // 获取试卷分类
      async getTypePapers (pagesize, pagenum) {
        const that = this
        const { data: { types, code } } = await getTypePapers({ pageSize: JSON.stringify(pagesize), pageNum: JSON.stringify(pagenum) })
        if (code === '0000') {
          that.total = types.total
          that.tableData = types.list
        }
      },

      // 增加试卷分类
      newPaperCategory () {
        this.$router.push({ name : 'newPaperCategory' })
      },

      // 修改
      handlePut (info) {
        const that = this
        if(that.aRoleid > 2 && info.create_user_id != sessionStorage.userId){
          that.$message('无权限！无法操作')
        }else{
          sessionStorage.setItem('paperTypeInfo', JSON.stringify(info))
          that.$router.push({
            name : 'newPaperCategory',
            query : { id : info.id }
          })
        }
      },

      // 删除
      open(info) {
        const that = this
        if(that.aRoleid > 2 && info.create_user_id != sessionStorage.userId){
          that.$message('无权限！无法操作')
        }else{
          that.$confirm(
            '删除操作无法恢复，确定删除吗?', '提示', {
            cancelButtonText: '取消',
            confirmButtonText: '确定',
          }).then(async () => {
            const { data: { code, msg } } = await deleteTypePaper(info.id)
            // that.$utils.post(`exam/sys/delPaperCategory/${info.cid}`).then(res => {
              // const {code, msg} = res.data
              if (code === '0000') {
                that.tableData = []
                that.getTypePapers()
                that.$message.success("删除成功")
              }else if(code === '1000'){
                return that.$message.error('删除失败')
              }
              else return that.$message(msg)
            // })
          }).catch(() => {

          })
        }
      },

      // 分页
      handleSizeChange(val) {
        this.pagesize = val
        this.pagenum = 1
        this.getTypePapers(val, 1)
      },

      handleCurrentChange(val) {
        this.pagenum = val
        this.getTypePapers(this.pagesize, val)
      },

    },
  }
</script>

<style scoped>
</style>
