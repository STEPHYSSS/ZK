<template>
  <el-card shadow="never" class="box-card myTest">
    <div class="topPadding onlySty">
      <span class="headline">我的考试</span>
      <previous-page goPreviousPage="/page" style="float: right;display: inline-block;"></previous-page>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="考试名称">
          <el-input v-model="formInline.paper_name" placeholder="请输入关键词"></el-input>
        </el-form-item>
        <!-- <el-form-item label="试卷分类">
          <el-select placeholder="请选择属性" v-model="formInline.type_id">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item class="serch">
          <el-button
            type="primary"
            @click="sousuo"
            style="background-color:#444;color:#fff;border:1px solid #444;"
          >搜索</el-button>
          <el-button
            type="primary"
            @click="chongzhi"
            style="background-color:#444;color:#fff;border:1px solid #444;"
          >重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!--表格-->
    <el-table
      :data="dataList"
      class="topBorder"
      style="width: 100%"
      :header-cell-style="{color:'#444',textAlign:'center'}"
      :cell-style="{textAlign:'center'}"
    >
      <el-table-column prop="name" label="考试名称"></el-table-column>
      <el-table-column label="开始时间" width="180">
        <template slot-scope="scope">{{scope.row.start_time|fmtDate}}</template>
      </el-table-column>
      <el-table-column prop="pendtime" label="结束时间">
        <template slot-scope="scope">{{scope.row.end_time|fmtDate}}</template>
      </el-table-column>
      <el-table-column label="考试时长">
        <template slot-scope="scope">{{scope.row.duration}} 分钟</template>
      </el-table-column>
      <el-table-column prop="pcid" label="操作">
        <template slot-scope="scope">
          <a v-if="curTime >= scope.row.start_time && curTime < scope.row.end_time" @click="start(scope.row)">开始考试</a>
          <a v-if="curTime < scope.row.start_time">未开始</a>
          <a v-if="curTime > scope.row.end_time">已结束</a>
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
import { getDate } from '@/api/taxUrl/base'
import qs from "qs";
export default {
  name: "myTest",
  data() {
    return {
      curTime: new Date().getTime(),
      formInline: {
        paper_name: "",
        // type_id: ""
      },
      options: [], //试卷分类
      dataList: [], //表格渲染
      pageNum: 0,
      pageSize: 10,
      total: 0
    };
  },
  created() {
    this.$nextTick(async () => {
      this.curTime = await getDate()
    })
    this.getPaperList();
    // this.showother();
  },
  components: {
    "previous-page": previousPage
  },
  methods: {
    getPaperList() {
      this.$utils({
        url: this.reqApi.shuiwuUrl + "/exam/myAliveExam",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: sessionStorage.getItem("token"),
          exam_name: this.formInline.paper_name,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
      }).then(res => {
        if(res.data.code === "0000"){
          this.dataList = res.data.exams.list;
          this.total = res.data.exams.total;
        }else{
          this.$message.error(res.data.msg);
        }
      });
    },
    // 试卷分类
    showother() {
      this.$utils({
        url: this.reqApi.shuiwuUrl + "/testpaper/listType",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        // data: qs.stringify({
        //   token: sessionStorage.getItem("token"),
        //   pageNum: this.pageNum,
        //   pageSize: this.pageSize
        // })
      }).then(res => {
        if (res.data.code == "0000") {
          this.options = res.data.types.list;
        }
      });
    },
    start(info) {
      this.$router.push({
        name: "prepareForExamination",
        query: {
          exam_id : info.id
        }
      });
    },
    // 搜索和重置
    sousuo() {
      this.getPaperList();
    },
    chongzhi() {
      this.formInline.paper_name = "";
      this.getPaperList();
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      // this.pageNum = 1;
      this.getPaperList();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getPaperList();
    }
  }
};
</script>

<style scoped>
.me {
  margin-top: 25px;
}

.me p {
  font-weight: 600;
  font-size: 20px;
  position: absolute;
  left: 110px;
}

.el-form {
  margin: 15px 0 5px 0;
}

.el-form--inline .el-form-item__label {
  font-weight: 600;
}
</style>
