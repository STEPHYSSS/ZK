<template>
  <el-card class="f-new box-card">
    <!-- <new-tabs :active="2" level1="新增文章分类" level2="文章分类管理" @callback1="newArticleManage"></new-tabs> -->
    <h3>公告分类</h3>
    <previous-page goPreviousPage="/mpage"></previous-page>
    <div class="addBox">
      <el-button @click="newArticleManage">新增</el-button>
    </div>
    <!-- 表格 -->
    <el-table
    :data="tableData"
    border
    class="topBorder"
    style="width: 100%">
      <el-table-column align="center" prop="name"  label="分类名称" :show-overflow-tooltip="true"></el-table-column>
      <!-- <el-table-column align="center" prop="corderid" label="排序" width="120"></el-table-column> -->
      <el-table-column align="center" prop="newscount" label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 1">开放</span>
          <span v-if="scope.row.status == 2">关闭</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建人 " width="210">
        <template slot-scope="scope">{{ scope.row.create_user_name }}</template>
      </el-table-column>
      <el-table-column align="center" prop="remark" label="备注" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column align="center" prop="name" label="操作" width="150">
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
  import { noticeListType, delNoticeType } from '@/api/taxUrl/announcement'
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
      this.noticeListType(this.pagesize, this.pagenum)
    },
    components: {
      newTabs,
      "previous-page": previousPage
    },

    methods: {
      // 获取文章公告列表
      async noticeListType (pageSize, pageNum) {
        const that = this
        const { data: { anno_types, code } } =  await noticeListType({ pageSize, pageNum })
        if (code === '0000') {
          that.total = anno_types.total
          that.tableData = anno_types.list
        }
      },

      // newArticleManage
      newArticleManage () {
        this.$router.push({ name : 'newArticleManage' })
      },

      // 修改
      handlePut (info) {
        if(this.aRoleid > 2 && info.create_user_id != sessionStorage.userId){
          this.$message('无权限！无法操作')
        }else{
          sessionStorage.setItem('announcementTypeInfo', JSON.stringify(info))
          this.$router.push({
            name : 'newArticleManage',
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
          that.$confirm('删除操作无法恢复，确定删除吗?', '来自网页的消息', {
            cancelButtonText: '取消',
            confirmButtonText: '确定',
          }).then(async () => {
            const { data : { code, msg } } = await delNoticeType(info.id)
            if (code === '0000') {
              that.noticeListType()
              that.$message.success('删除成功')
            }
            else return that.$message(msg)
          }).catch(() => {})
        }
      },

      // 分页
      handleSizeChange(val) {
        this.pagesize = val
        this.pagenum = 1
        this.noticeListType(val, 1)
      },

      handleCurrentChange(val) {
        this.pagenum = val
        this.noticeListType(this.pagesize, val)
      },

    },
  }
</script>

<style scoped>
</style>