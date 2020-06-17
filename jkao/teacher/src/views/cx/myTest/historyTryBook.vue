<template>
  <el-card shadow="never" class="box-card">
    <!-- <my-bread level1="历史考试"></my-bread> -->
    <div class="topPadding onlySty">
      <span class="headline">历史考试</span>
      <previous-page goPreviousPage="/page" style="float: right;display: inline-block;"></previous-page>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="考试名称">
          <el-input v-model="formInline.name" placeholder="请输入考试名称"></el-input>
        </el-form-item>
        <!-- <el-form-item label="试卷分类">
          <el-select v-model="formInline.ppapertype" placeholder="全部">
            <el-option label="普通试卷" value="0"></el-option>
            <el-option label="随机试卷" value="1"></el-option>
            <el-option label="全部试卷" value="2"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item>
          <el-button class="search" type="primary" @click="onSearch">搜索</el-button>
          <el-button class="search" type="primary" @click="chongzhi">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--表格-->
    <el-table
      :data="list"
      style="width: 100%"
      class="tabPulley topBorder"
      :header-cell-style="{color:'#444',textAlign:'center'}"
      :cell-style="{textAlign:'center'}"
    >
      <el-table-column prop="name" label="考试名称" width="180"></el-table-column>
      <el-table-column label="评分状态">
        <template slot-scope="scope">
          <span v-if="scope.row.finished == '1'">已评分</span>
          <span v-else>未评分</span>
        </template>
      </el-table-column>
      <el-table-column prop="total_score" label="卷面总分"></el-table-column>
      <el-table-column prop="user_score" label="得分"></el-table-column>
      <el-table-column label="考试时长">
        <template slot-scope="scope">{{scope.row.duration}} 分钟</template>
      </el-table-column>
      <el-table-column prop="starttime" label="开始时间">
        <template slot-scope="scope">{{scope.row.start_time|fmtDate}}</template>
      </el-table-column>
      <el-table-column prop="endtime"  label="结束时间">
        <template slot-scope="scope">{{scope.row.end_time|fmtDate}}</template>
      </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <!-- <a @click="particulars(scope.row)">详情</a> -->
           <el-tooltip class="item" effect="dark" content="详情" placement="bottom" v-if="currentTime >= scope.row.end_time && scope.row.finished == '1'">
            <span class="cur-point"  @click="particulars(scope.row)">
              <img src="@/assets/images/chaxun_icon.png" alt />
            </span>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="考试未评分" placement="bottom" v-else>
            <span class="cur-point" >——</span>
          </el-tooltip>
          <!-- <a
            href="javascript:;"
            v-if="currentTime >= scope.row.end_time && scope.row.finished == '1'"
            @click="particulars(scope.row)"
          >详情</a> -->
          <!-- <a href="javascript:;" v-else>——</a> -->
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
import previousPage from "@/components/previousPage.vue";
import { myHistoryExam, getRecord, detailHistory } from "@/api/taxUrl/exam";
import { getDate } from '@/api/taxUrl/base'
export default {
  name: "historyTryBook",
  data() {
    return {
      //表单数据
      formInline: {
        name:""
      },
      // 分页数据
      currentPage1: 5,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      pagingData: [],
      list: [], //表格数据
      currentTime: new Date().getTime() //当前时间
    };
  },
  created() {
    this.$nextTick(async () => this.currentTime = await getDate())
    this.myHistoryExam(this.pageSize, this.pageNum);
  },
  methods: {
    //历史考试列表
    async myHistoryExam(pageSize, pageNum) {
      const { data: { exams, code } } = await myHistoryExam({pageNum: this.pageNum, pageSize: this.pageSize, exam_name:this.formInline.name})
      if (code == '0000') {
        this.list = exams.list;
        this.total = exams.total;
      }
    },
    //试卷详情跳转
    async particulars(data) {
      const { data: { code, msg , exam_flow } } = await detailHistory({exam_id: data.id})
      if (code == '0000') {
        this.$router.push({
          name: 'historyExamDetails',
          query: {
            keepAlive: '1',
            exam_id: data.id,
            examFlow:data.exam_flow
          }
        });
      }else {
        this.$message.error(msg)
      }
    },
    //搜索
    onSearch() {
      this.myHistoryExam();
    },
    chongzhi() {
      this.formInline.name = "";
      this.myHistoryExam();
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      // this.pagenum = 1
      this.myHistoryExam(this.pageNum, val)
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.myHistoryExam(val, this.pageSize)
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
