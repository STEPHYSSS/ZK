<template>
  <el-card shadow="never" class="box-card">
    <!-- <my-bread level1="试卷分析" level2="试卷分析" level3="选择试卷查看分析试题的答题情况。"></my-bread> -->
    
    <!-- <div class="new-padding-left font-weight-700 teacher-title">试卷分析</div> -->
    <h3>考试分析</h3>
    <previous-page goPreviousPage="/mpage"></previous-page>
    <!-- 搜索框 -->
    <el-form :inline="true" :model="form" size="mini" class="new-padding-left f-new-inp demo-form-inline">
      <el-row>
        <el-col :span="6">
          <el-form-item label="考试名称:">
            <el-input clearable v-model="form.exam_name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="试卷分类" prop="region">
            <el-select v-model="form.type_id" placeholder="请选择" clearable>
              <el-option
                v-for="(item,index) in paperList"
                :key="index"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="6">
          <el-form-item label="试卷类型" prop="region">
            <el-select v-model="form.ppapertype" placeholder="请选择类型">
              <el-option label="默认全部" value="2"></el-option>
              <el-option label="普通试卷" value="0"></el-option>
              <el-option label="随机试卷" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col> -->
        <el-col class="txalign-c" style="padding-right: 20px;text-align:right" :span="12">
          <!-- <el-form-item> -->
            <el-button @click="searchCX" class="search search-btn">搜索</el-button>
            <el-button class="search search-btn" @click="clear">重置</el-button>
          <!-- </el-form-item> -->
        </el-col>
      </el-row>
    </el-form>

    <!-- 表格 -->
    <el-table
    :data="tableData"
    class="topBorder"
    style="width: 100%"
    
    >
      <el-table-column align="center" label="考试名称" :show-overflow-tooltip="true" width="200px">
        <template slot-scope="scope">{{ scope.row.exam_name }}</template>
      </el-table-column>
      <el-table-column prop="pposter" align="center" width="160" label="时间设定">
        <template slot-scope="scope">
            {{scope.row.start_time | fmtDate()}}<br/>
            {{scope.row.end_time | fmtDate()}}
        </template>
      </el-table-column>
      <el-table-column prop="duration" align="center" label="考试时长">
      </el-table-column>
      <!-- <el-table-column prop="ppapertype" align="center" label="试卷类型">
        <template slot-scope="scope">
            <span v-if="scope.row.ppapertype === 0">普通试卷</span>
            <span v-if="scope.row.ppapertype === 1">随机试卷</span>
        </template>
      </el-table-column> -->
      <el-table-column prop="total_score" align="center" label="卷面总分">
      </el-table-column>
      <el-table-column prop="pass_score" align="center" label="及格分数">
      </el-table-column>
      <el-table-column prop="max_score" align="center" label="最高分">
      </el-table-column>
      <el-table-column prop="min_score" align="center" label="最低分">
      </el-table-column>
      <el-table-column prop="avg_score" align="center" label="平均分">
        <template slot-scope="scope" >
          <span>{{scope.row.avg_score}}</span>
          <!-- {{parseFloat(scope.row.avg_score).toFixed(2) || '0.00'}} -->
        </template>
      </el-table-column>
      <el-table-column prop="pass_count" align="center" label="及格人数">
      </el-table-column>
      <el-table-column prop="join_count" align="center" label="参加人数">
      </el-table-column>
      <el-table-column align="center" label="操作" fixed="right">
        <template slot-scope="scope">
          <a href="javacript:;" @click='handleExamDetails(scope.row)'>详情</a>
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
  // import eventBus from '../eventBus.js'
  import previousPage from "@/components/previousPage.vue";
  import qs from "qs";
  export default {
    data() {
      return {
        // 表格
        tableData: [],
        form: {
          exam_name: '',
          type_id: '',
          pageSize: 10,
          pageNum: 1
          // ppapertype: '2'
        },

        list: [],
        paperList: [],
        // 分页数据
        total: 10,
        pagesize: 10,
        pagesizes: [10, 20, 30, 40],
        pagenum: 1,
      }
    },

    created () {
      this.getFindPaperCategorys()
      this.getFindPaperStatistics()
    },
    components:{
      "previous-page": previousPage
    },
    methods: {
      clear(){
        this.form.exam_name=''
        this.form.type_id=''
        this.getFindPaperStatistics()
      },
      // 获取试卷分析列表
      getFindPaperStatistics () {
        this.$utils.post(this.reqApi.shuiwuUrl+'/analysis/getExamList',qs.stringify(this.form)).then(res=>{
          if(res.data.code==='0000'){
            this.tableData=res.data.tp_analysises.list
            this.total=res.data.tp_analysises.total
          }
        })
      },
      // 获取试卷分类
      getFindPaperCategorys () {
        this.$utils.post(this.reqApi.shuiwuUrl+'/testpaper/listType',qs.stringify({
          pageSize:'99999'
        })).then(res=>{
          if(res.data.code==='0000'){
              this.paperList=res.data.types.list
          }else {
            this.$message.error(res.data.msg)
          }
        })
        
        return
        const that = this
        that.$utils.post(`exam/sys/findOpenPaperCategorys`).then(res => {
          const {list, code} = res.data
          if (code === '00') return that.paperList = list
        })
      },
      searchCX () {
        this.getFindPaperStatistics()
        return
        const that = this
        that.$utils.post('exam/statistics/findPaperStatisticsSearch', that.form).then(res => {
          const {code, msg, list} = res.data
          if (code === '00') {
            that.list = list
            that.tableData = []
            list.forEach((item, index) => {
              if (index < that.pagesize) return that.tableData.push(item)
            })
            that.total = list.length
          }
          else return that.$message(msg)
        })
      },
      
      // 创建试卷
      newPaper () {
        this.$router.push({name: 'newPaper'})
      },

      // 分页
      handleSizeChange(val) {

        this.form.pageSize = val
        this.getFindPaperStatistics()
      },

      handleCurrentChange(val) {
        this.form.pageNum = val
        this.getFindPaperStatistics()
      },

      // 试卷分析
      handleExamDetails (row) {
          this.$router.push({
            name:'specificAnalysis',
            query:{
              exam_id:row.exam_id,
              testpaper_id:row.testpaper_id
            }
          })
      },

    },

  }
</script>

<style scoped>
</style>