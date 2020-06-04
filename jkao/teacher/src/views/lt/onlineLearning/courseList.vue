<template>
  <el-card class="f-new box-card">
    <!-- <new-tabs :active="2" level1="新增课程" level2="课程列表" @callback1="addCourse"></new-tabs> -->
    <h3>课程列表</h3>
    <previous-page goPreviousPage="/mpage"></previous-page>
    <div class="addBox">
      <el-button @click="addCourse">新增课程</el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="tableData" border class="topBorder" style="width: 100%"
    
    >
      <el-table-column align="center" prop="name" label="课程名称" :show-overflow-tooltip="true" width="200px"></el-table-column>
      <el-table-column align="center" label="课程状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 1">开放</span>
          <span v-if="scope.row.status == 2">关闭</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="课程图标">
        <template slot-scope="scope">
          <img v-if="scope.row.picture" class="img-wid-table" :src="reqApi.shuiwuUrl+scope.row.picture" alt />
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" prop="introduce" label="课程分类">
      </el-table-column>-->
      <el-table-column align="center" show-overflow-tooltip label="课程介绍" width="250px">
        <template slot-scope="scope">{{scope.row.description}}</template>
      </el-table-column>
      <!-- <el-table-column align="center" prop="stars" label="分值"></el-table-column> -->
      <el-table-column align="center" label="发布人" width="210">
        <template slot-scope="scope">
          {{ scope.row.create_user_name }}
          <br />
          {{ scope.row.create_time }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="最后修改人" width="210">
        <template slot-scope="scope">
          {{ scope.row.update_user_name }}
          <br />
          {{ scope.row.update_time }}
        </template>
      </el-table-column>
      <el-table-column align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="配置" placement="bottom">
            <span class="cur-point dis-inline-block" @click="handleDate(scope.row)">
              <img src="@/assets/images/peizhi_icon.png" alt />&nbsp;&nbsp;&nbsp;
            </span>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
          <span class="cur-point dis-inline-block" @click="handlePut(scope.row)">
            <img src="@/assets/images/xiugai_icon.png" alt />&nbsp;&nbsp;&nbsp;
          </span>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
          <span class="cur-point dis-inline-block" @click="open(scope.row)">
            <img src="@/assets/images/shanchu_icon.png" alt />
          </span>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 学习名单对话框 -->
    <!-- <el-dialog :visible.sync="dialogVisibleData" :show-close="false">
      <div class="analyzeHead">
        <img src="@/assets/images/icon_news.png" alt="">
        <span>学习名单</span>
        <a href="javacript:;" @click="handleClose" class="fr el-icon-close"></a>
      </div>
      <div class="analyzeBody">
        <h4>学习名单</h4>
        <template>
          <el-table
          :data="tableData"
          stripe
          :header-cell-style="{background:'#3ec8dd', color:'#fff'}"
          style="width: 100%">
            <el-table-column align="center" prop="name" label="用户名">
            </el-table-column>
            <el-table-column align="center" prop="name" label="真实姓名">
            </el-table-column>
            <el-table-column align="center" label="最后登录">
              <template slot-scope="scope">{{ scope.row.uRegdate }}</template>
            </el-table-column>
          </el-table>
        </template>
      </div>
    </el-dialog>-->
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
import newTabs from "@/components/newTabs";
import previousPage from "@/components/previousPage.vue";
export default {
  data() {
    return {
      // 表格
      tableData: [],
      // 学习名单
      // dialogVisibleData: false,
      list: [],
      // 分页数据
      pageNum: 1,
      pageSize: 10,
      total: 0
    };
  },

  created() {
    this.getfindCourse();
  },
  components: {
    newTabs,
    "previous-page": previousPage
  },

  methods: {
    getfindCourse() {
      this.$utils({
        url: this.reqApi.shuiwuUrl + "/course/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          pageNum: this.pageNum,
          pageSize:this.pageSize
        })
      }).then(res => {
        if (res.data.code === "0000") {
          this.tableData = res.data.courses.list;
          this.total = res.data.courses.total;
        } else if (res.data.code === 401 || res.data.code === 403) {
          this.$message.error(res.data.msg);
          this.$router.push("/register");
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },

    // addCourse
    addCourse() {
      this.$router.push({ name: "addCourse" });
    },

    // 配置
    handleDate(info) {
      this.$router.push({
        name: "configuration",
        query: {
          id: info.id
        }
      });
    },

    // 改
    handlePut(info) {
      this.$router.push({
        name: "addCourse",
        query: { id: info.id }
      });
    },

    // 删
    open(info) {
      const that = this;
      that
        .$confirm("删除操作无法恢复，确定删除吗?", "来自网页的消息", {
          cancelButtonText: "取消",
          confirmButtonText: "确定"
        })
        .then(() => {
          that.$utils.post(that.reqApi.shuiwuUrl +`/course/delete`,qs.stringify({
            course_id: info.id
          })).then(res => {
            if (res.data.code == "0000") {
              that.getfindCourse();
              that.$message.success("删除成功！");
            }
          });
        })
        .catch(() => {});
    },

    // 关闭
    handleClose() {
      this.dialogVisibleData = false;
    },

    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getfindCourse(this.pageNum, val);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getfindCourse(val, this.pageSize);
    }
  }
};
</script>

<style scoped>
/* 数据分析头部 */
/* .analyzeHead {
    padding: 10px 20px;
    border-bottom:3px rgb(62, 200, 221) solid;
    color: #ccc;
    font-size: 16px;
  }
  .analyzeHead img {
    width: 25px;
    height: 25px;
    vertical-align: top;
  }
  .analyzeHead a {
    padding-top: 3px;
    font-size: 20px;
    color: #ccc;
    font-weight: 700;
  }
  .analyzeHead span:nth-child(3) {
    font-size: 24px;
    color: #ccc;
    font-weight: 700;
  } */

/* 数据分析身体 */
/* .analyzeBody {
    padding: 10px 30px;
    height: 480px;
  }

  .analyzeBody div.el-table {
    border: 1px solid #ebeef5;
    border-bottom: 0px solid #ccc;
  } */
</style>
