<template>
  <el-card class="f-new box-card">
    <!-- <new-tabs :active="2" level1="新增课程分类" level2="课程分类列表" @callback1="addCourseCategory"></new-tabs> -->
    <h3>课程分类</h3>
    <previous-page goPreviousPage="/mpage"></previous-page>
    <div class="addBox">
      <el-button @click="addCourseCategory">新增</el-button>
    </div>
    <!-- 表格 -->
    <el-table
    :data="tableData"
    class="topBorder"
    style="width: 100%"

    >
      <el-table-column align="center" prop="name" label="分类名称" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 1">开放</span>
          <span v-if="scope.row.status == 2">关闭</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="description" label="分类描述" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column align="center" prop="order_by" label="排序标志">
      </el-table-column>
      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">{{scope.row.create_time | fmtDate}}</template>
      </el-table-column>
      <el-table-column align="center" label="操作" fixed="right">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
              <img src="@/assets/images/xiugai_icon.png" class="codesty" @click="handlePut(scope.row)"/>
          </el-tooltip>&nbsp;&nbsp;
          <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
              <img src="@/assets/images/shanchu_icon.png" class="codesty" @click="open(scope.row)"/>
          </el-tooltip>&nbsp;&nbsp;
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
        :current-page="pageNum"
        :page-sizes="[10,20,30,40]"
        :page-size="pageSize"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        class="pagination"
      ></el-pagination>
    </div>
  </el-card>

</template>

<script>
import qs from 'qs'
  import newTabs from '@/components/newTabs'
  import previousPage from "@/components/previousPage.vue";
  export default {
    data() {
      return {
        // 表格
        tableData: [],
        pageNum: 1,
        pageSize: 10,
        total: 0,
        imgList:[]
      }
    },

    created() {
      this.getFindCourseCategory()
    },

    components: {
      newTabs,
      "previous-page": previousPage
    },
    methods: {
      getFindCourseCategory () {
        const that = this
        that.$utils.post(that.reqApi.shuiwuUrl+'/course/listType',qs.stringify({ pageNum: this.pageNum,pageSize:this.pageSize })).then(res => {
          if (res.data.code === '0000') {
            this.tableData = res.data.types.list;
            this.total = res.data.types.total;
          }
        })
      },

      // 新增
      addCourseCategory () {
        this.$router.push({name : 'addCourseCategory'})
      },

      // 编辑
      handlePut (info) {
        this.$router.push({
          name: 'addCourseCategory',
          query: {id: info.id}
        })
      },

      // 删
      open(info) {
        const that = this
        that.$confirm('删除操作无法恢复，确定删除吗?', '来自网页的消息', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
        }).then(() => {
          that.$utils.post(that.reqApi.shuiwuUrl +`/course/deleteType`,qs.stringify({
            type_id: info.id
          })).then(res => {
            if (res.data.code == "0000") {
              that.getFindCourseCategory();
              that.$message.success("删除成功！");
            }
          });
        })
      },

      // 分页
      handleSizeChange(val) {
        this.pageSize = val;
        this.getFindCourseCategory(this.pageNum, val);
      },
      handleCurrentChange(val) {
        this.pageNum = val;
        this.getFindCourseCategory(val, this.pageSize);
      }
    },
  }
</script>

<style scoped>
</style>
