<template>
  <el-card shadow="never" class="box-card">
    <div class="topPadding onlySty">
      <span class="headline">自我检测</span>
      <previous-page goPreviousPage="/page" style="float: right;display: inline-block;"></previous-page>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="自测名称">
          <el-input v-model="formInline.name" clearable placeholder="自测名称"></el-input>
        </el-form-item>
        <el-form-item label="创建时间排序">
          <el-select v-model="formInline.create_sort" placeholder="请选择">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button class="search" type="primary" @click="selfExamList(pagesize, pagenum)">搜索</el-button>
          <el-button class="search" type="primary" @click="chognzhi">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--表格-->
    <el-button @click="selfTest" style="float: right;margin: 0 35px 20px 0;">新建自测</el-button>
    <el-table
      :data="list"
      style="width: 100%"
      class="tabPulley topBorder"
      :header-cell-style="{color:'#444',textAlign:'center'}"
      :cell-style="{textAlign:'center'}"
    >
      <el-table-column prop="name" label="自测名称" ></el-table-column>
      <!-- <el-table-column prop="duration" label="考试时长"></el-table-column> -->
      <el-table-column prop="create_time" label="创建时间">
        <template slot-scope="scope">
          <span v-if="scope.row.create_time != null">{{scope.row.create_time|fmtDate}}</span></template>
      </el-table-column>
      <el-table-column prop="start_time" label="开始时间">
        <template slot-scope="scope"><span v-if="scope.row.start_time != null">{{scope.row.start_time|fmtDate}}</span></template>
      </el-table-column>
      <el-table-column prop="total_score" label="总分"></el-table-column>
      <!-- <el-table-column prop="get_score" label="得分"></el-table-column> -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <a @click="selfExamStart(scope.row)">开始测试</a> |
          <a @click="selfExamDelete(scope.row)">删除</a>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </el-card>
</template>

<script>
import previousPage from "@/components/previousPage.vue";
import { selfExamList, selfExamDelete } from "@/api/taxUrl/selfExam";
export default {
  name: "historyTryBook",
  data() {
    return {
      //表单数据
      formInline: {
        uid: sessionStorage.getItem("userId"),
        name: "",
        dur_sort: "",
        create_sort: ""
      },
      options2: [{
        value: 'ASC',
        label: '升序'
      }, {
        value: 'DESC',
        label: '降序'
      }],
      // 分页数据
      total: 10,
      pagesize: 10,
      pagenum: 1,
      pagingData: [],
      list: [], //表格数据
    };
  },
  created() {
    this.selfExamList(this.pagesize, this.pagenum);
  },
  methods: {
    async selfExamList(pageSize, pageNum) {
      const { name, dur_sort, create_sort } = this.formInline
      const { data: { selfExams, code } } = await selfExamList({pageSize, pageNum, name, dur_sort, create_sort})
      if (code == '0000') {
        this.list = selfExams.list;
        this.total = selfExams.total;
      }
    },
    //试卷详情跳转
    selfExamStart(data) {
      sessionStorage.setItem("exam_id",data.id)
      this.$router.push({
        name: 'startSelfExam',
        query: {
          exam_id: data.id,
          flagBack:"Z"
        }
      });
    },
    selfExamDelete (row) {
      const that = this
      that.$confirm('删除操作无法恢复，确定删除吗?', '来自网页的消息', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
      }).then(async () => {
        const { data: { code, msg } } = await selfExamDelete({ self_exam_id:row.id })
          if (code === '0000') {
            that.$message.success("删除成功")
            that.selfExamList(that.pagesize, that.pagenum);
          }
          else return that.$message(msg)
      }).catch((err) => {
      })
    },
    selfTest () {
      this.$router.push({ name: 'selfConfigOptions' })
    },
    chognzhi(){
      this.formInline.name="";
      this.selfExamList();
    },
    // 分页
    handleSizeChange(val) {
      this.pagesize = val
      this.pagenum = 1
      this.selfExamList(this.pagesize, this.pagenum)
    },
    handleCurrentChange(val) {
      this.pagenum = val
      this.selfExamList(this.pagesize, this.pagenum)
    }
  },
  components: {
    "previous-page": previousPage
  }
};
</script>

<style scoped>
.el-form--inline .el-form-item__label {
  font-weight: 600;
}

.el-form {
  margin: 15px 0 5px 0;
}

.search {
  background-color: #444;
}
</style>
