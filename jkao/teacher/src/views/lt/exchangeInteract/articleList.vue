<template>
  <el-card class="f-new box-card">
    <h3>文章公告</h3>
    <previous-page goPreviousPage="/mpage"></previous-page>
    <div class="addBox">
      <el-button @click="newArticleList">新增</el-button>
    </div>
    <!-- 表格 -->
    <el-table
    :data="tableData"
    class="topBorder"
    style="width: 100%">
      <el-table-column align="center" prop="name"  label="标题" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 1">开放</span>
          <span v-if="scope.row.status == 2">关闭</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="visits" label="访问量"></el-table-column>
      <el-table-column align="center" label="创建人 " width="210">
        <template slot-scope="scope">{{ scope.row.create_user_name }}<br/>{{scope.row.create_time | fmtDate()}}</template>
      </el-table-column>
      <el-table-column align="center" label="最后修改人 " width="210">
        <template slot-scope="scope">{{ scope.row.update_user_name }}<br/>{{scope.row.update_time | fmtDate()}}</template>
      </el-table-column>
      <el-table-column align="center" prop="name" label="操作" width="150" fixed="right">
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
  import { delNotice, noticeList, noticeListType } from '@/api/taxUrl/announcement'
  // import newTabs from '@/components/newTabs'
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
        categorysList: [],
        form: {
          ntitle: '',
          nclassid: '',
          nstatus: '2',
          ntotop: '2',
          timeOrder: '1'
        },
        aRoleid:sessionStorage.role_id
      }
    },

    created () {
      this.noticeList(this.pagesize, this.pagenum)
      this.noticeListType()
    },
    components: {
      // newTabs,
      "previous-page": previousPage
    },

    methods: {
      // 获取文章公告列表
      async noticeList (pageSize, pageNum) {
        const { data : { annos, code } } = await noticeList({ pageSize, pageNum })
        if (code === '0000') {
          this.total = annos.total
          this.tableData = annos.list
        }
      },
      // 分页
      handleSizeChange(val) {
        this.pagesize = val
        this.pagenum = 1
        this.noticeList(val, 1)
      },
      handleCurrentChange(val) {
        this.pagenum = val
        this.noticeList(this.pagesize, val)
      },
      // 获取文章公告分类列表
      async noticeListType () {
        const { data: { anno_types, code } } = await noticeListType()
        if (code === '0000') return this.categorysList = anno_types.list
      },
      // newArticleList
      newArticleList () {
        this.$router.push({ name : 'newArticleList' })
      },
      // 修改
      handlePut (info) {
        if(this.aRoleid > 2 && info.create_user_id != sessionStorage.userId){
          this.$message('无权限！无法操作')
        }else{
          sessionStorage.setItem('announcementInfo', JSON.stringify(info))
          this.$router.push({
            name : 'newArticleList',
            query: { id : info.id }
          })
        }
      },
      // 删除
      open(info) {
        const that = this
        if(that.aRoleid > 2 && info.create_user_id != sessionStorage.userId){
          that.$message('无权限！无法操作')
        }else{
          that.$confirm('删除操作无法恢复，确定删除吗?', '来自网页的消息', {
            cancelButtonText: '取消',
            confirmButtonText: '确定',
          }).then(async () => {
            const { data : { code, msg } } = await delNotice(info.id)
            if (code === '0000') {
              that.$message.success('删除成功')
              that.pagenum = 1
              that.noticeList()
            }
            else return that.$message(msg)
          }).catch(() => {
          })
        }
      }
    }
  }
</script>

<style scoped>
</style>
