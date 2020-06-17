<template>
  <el-card shadow="never" class="box-card">
    <div class="topPadding">
      <div class="headline" style="margin-bottom:30px">
        课程列表
        <previous-page goPreviousPage="/page" style="float: right;display: inline-block;"></previous-page>
      </div>
    </div>
    <!-- 表格 -->
    <el-table
      :data="tableData"
      :header-cell-style="{color:'#444'}"
      style="width: 100%"
      class="topBorder"
    >
      <el-table-column align="center" prop="cname" label="课程名称"></el-table-column>
      <!-- <el-table-column align="center" label="课程状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.status == 0">开放</span>
                    <span v-if="scope.row.status == 1">关闭</span>
                </template>
      </!-->
      <el-table-column align="center" label="课程图标">
        <template slot-scope="scope">
          <img class="img-wid-table" :src="$utils.serverUrl + scope.row.logo" alt="加载失败" />
        </template>
      </el-table-column>
      <el-table-column align="center" prop="caname" label="课程分类"></el-table-column>
      <el-table-column align="center" prop="introduce" label="课程介绍" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column align="center" prop="stars" label="管理员给的星"></el-table-column>
      <el-table-column align="center" label="发布人" width="210">
        <template slot-scope="scope">
          {{ scope.row.poster }}
          <br />
          {{ $utils.momentDate(scope.row.postdate) }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="最后修改人" width="210">
        <template slot-scope="scope">
          {{scope.row.modifier}}
          <br />
          {{ $utils.momentDate(scope.row.modifydate)}}
        </template>
      </el-table-column>
      <el-table-column align="center" width="150" label="操作" fixed="right">
        <template slot-scope="scope">
          <!-- <a href="javascript:;" @click="examine(scope.row)">查看课程详情</a> -->
          <el-tooltip class="item" effect="dark" content="查看课程详情" placement="bottom">
            <span class="cur-point" @click="examine(scope.row)">
              <img src="@/assets/images/chaxun_icon.png" alt />
            </span>
          </el-tooltip>
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
        :total="total"
      ></el-pagination>
    </div>
  </el-card>
</template>

<script>
import previousPage from "@/components/previousPage.vue";
export default {
  name: "curriculumsTable",
  data() {
    return {
      // 表格
      tableData: [],
      // 学习名单
      // dialogVisibleData: false,
      list: [],
      // 分页数据
      total: 10,
      pagesize: 10,
      pagesizes: [10, 20, 30, 40],
      pagenum: 1,
      errorImg: 'this.src="' + require("@/assets/images/failToLoad.png") + '"'
    };
  },

  created() {
    this.getfindCourse();
  },

  methods: {
    //表格数据
    getfindCourse() {
      const that = this;
      that.$utils.post("exam/course/findOpenCourse").then(res => {
        const { list, code } = res.data;
        if (code === "00") {
          this.total = list.length;
          list.forEach((item, index) => {
            item.introduce = item.introduce
              .replace(/<[^>]+>|&[^>]+;/g, "")
              .trim();
            if (index < this.pagesize) return this.tableData.push(item);
          });
          this.list = list;
        }
      });
    },

    //查看课程详情（操作栏）
    examine(courseInfo) {
      this.$router.push({
        name: "user-defined-selfTest",
        query: { idC: courseInfo.cid }
      });
    },

    // 跳转回创建自测
    createdSelfTest() {
      this.$router.push({ name: "selfTest" });
    },

    // 分页
    handleSizeChange(val) {
      this.pagesize = val;
      this.tableData = [];
      this.pagenum = 1;
      this.list.forEach((item, index) => {
        if (index < this.pagesize) return this.tableData.push(item);
      });
    },

    handleCurrentChange(val) {
      this.pagenum = val;
      this.tableData = [];
      const currentIndex = this.pagesize * val;
      this.list.forEach((item, index) => {
        let result = [];
        if (index < currentIndex) {
          result.push(item);
          if (index >= this.pagesize * (val - 1))
            return this.tableData.push(item);
        }
      });
    }
  },
  components: {
    "previous-page": previousPage
  }
};
</script>

<style scoped>
</style>
