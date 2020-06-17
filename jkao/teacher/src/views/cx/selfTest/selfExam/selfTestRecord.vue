<template>
  <el-card shadow="never" class="box-card">
    <div class="topPadding onlySty">
      <div class="headline pb">
        自我检测记录
        <previous-page goPreviousPage="/page" style="float: right;display: inline-block;"></previous-page>
      </div>

      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="自测名称">
          <el-input v-model="formInline.name" placeholder="自测名称"></el-input>
        </el-form-item>
        <!-- <el-form-item label="自测耗时排序">
          <el-select v-model="formInline.dur_sort" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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
        </el-form-item> -->
        <el-form-item>
          <el-button class="search" type="primary" @click="selfExamList(pagesize, pagenum)">搜索</el-button>
          <el-button class="search" type="primary" @click="chognzhi(pagesize, pagenum)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!--表格-->
    <el-table
      :data="list"
      style="width: 100%"
      class="topBorder"
      :header-cell-style="{color:'#444',textAlign:'center'}"
      :cell-style="{textAlign:'center'}"
    >
      <el-table-column prop="name" label="自测名称" width="180"></el-table-column>
      <el-table-column prop="total_score" label="卷面总分" width="180"></el-table-column>
      <el-table-column label="考试得分">
        <template slot-scope="scope">
          <span v-if="!scope.row.get_score">0</span>
          <span v-else>{{scope.row.get_score}}</span>
        </template>
      </el-table-column>
      <el-table-column label="考试时间">
        <template slot-scope="scope">
          <span v-if="scope.row.start_time !== scope.row.end_time">
            {{scope.row.start_time | fmtDate}}
            <br />
            {{scope.row.end_time | fmtDate}}
          </span>
          <span v-else>{{scope.row.start_time}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="duration" label="考试耗时"></el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="详情" placement="bottom">
            <span class="cur-point" @click="particulars(scope.row)">
              <img src="@/assets/images/chaxun_icon.png" alt />
            </span>
          </el-tooltip>&nbsp;&nbsp;
          <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
            <span class="cur-point" @click="selfExamDelete(scope.row)">
              <img src="@/assets/images/shanchu_icon.png" alt />
            </span>
          </el-tooltip>
          <!-- <a href="javascript:;" @click="particulars(scope.row)">详情&nbsp;|</a>
          <a href="javascript:;" @click="selfExamDelete(scope.row)">删除</a> -->
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
import { selfExamList, selfExamDelete } from "@/api/taxUrl/selfExam";
export default {
  name: "selfTestRecord",
  data() {
    return {
      formInline: {
        uid: sessionStorage.getItem("userId"),
        name: "",
        dur_sort: "",
        create_sort: "",
      },
      list: [],
      total: 10,
      pagesize: 10,
      pagesizes: [10, 20, 30, 40],
      pagenum: 1,
      options: [{
        value: 'ASC',
        label: '升序'
      }, {
        value: 'DESC',
        label: '降序'
      }],
      options2: [{
        value: 'ASC',
        label: '升序'
      }, {
        value: 'DESC',
        label: '降序'
      }],
    };
  },
  created() {
    this.selfExamList(); //表格数据
  },
  methods: {
    async selfExamList(pageSize, pageNum) {
      const { name } = this.formInline
      const { data: { selfExams, code } } = await selfExamList({pageSize, pageNum, name, create_sort:'DESC', finished: 1})
      if (code == '0000') {
        this.list = selfExams.list;
        this.total = selfExams.total;
      }
    },
    //表格操作列（详情）
    particulars(info) {
      this.$router.push({
        name: "historyExamDetails",
        query: {
          keepAlive: '1',
          exam_id: info.id,
          testDetail: 1,
          examFlow:info.exam_flow
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
    chognzhi(){
      this.formInline.name = "";
      this.selfExamList();
    },
    // 分页
    handleSizeChange(val) {
      this.pagesize = val
      // this.pagenum = 1
      this.selfExamList(this.pagesize, this.pagenum)
    },
    handleCurrentChange(val) {
      this.pagenum = val
      this.selfExamList(this.pagesize, this.pagenum)
    }
  },
  components: {
    previousPage
  }
};
</script>

<style scoped>
.search {
  background-color: #444;
}
.pb{
  padding-bottom: 10px;
}
</style>
