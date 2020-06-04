<template>
  <div>
    <!-- <div class="analyzeHead">
      <img src="@/assets/images/icon_news.png" alt="">
      <span>选择试卷</span>
      <a href="javacript:;" @click="$emit('close')" class="fr el-icon-close"></a>
    </div> -->
    <div class="analyzeBody">
      <!-- 搜索框 -->
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="试卷名称:">
          <el-input v-model="form.pname"></el-input>
        </el-form-item>
        <el-form-item label="试卷分类:">
          <el-select v-model="form.pcid" placeholder="请选择" class="searchWid-2">
            <el-option
              v-for="(item,index) in paperListCategorys"
              :key="index"
              :label="item.cname"
              :value="item.cid">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="试卷类型:">
          <el-select v-model="form.ppapertype" placeholder="请选择" class="searchWid-1">
            <el-option label="全部" value="2"></el-option>
            <el-option label="普通试卷" value="0"></el-option>
            <el-option label="随机试卷" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="search">
          <el-button @click="searchCX">搜索</el-button>
        </el-form-item>
      </el-form>

      <!-- 表格 -->
      <template>
        <el-table
        :data="tableData"
        class="topBorder"
        style="width: 100%">
          <el-table-column align="center" prop="pname" label="试卷名称"></el-table-column>
          <el-table-column align="center" label="开始时间" width="180">
            <template slot-scope="scope">{{scope.row.pstarttime}}</template>
          </el-table-column>
          <el-table-column align="center" label="结束时间" width="180">
            <template slot-scope="scope">{{ scope.row.pendtime }}</template>
          </el-table-column>
          <el-table-column align="center" label="成绩公布时间" width="180">
            <template slot-scope="scope">{{ scope.row.pshowtime }}</template>
          </el-table-column>
          <el-table-column prop="pduration" align="center" label="考试时长">
            <template slot-scope="scope">{{ scope.row.pduration }}分钟</template>
          </el-table-column>
          <el-table-column prop="premark" show-overflow-tooltip align="center" label="试卷说明">
          </el-table-column>
        </el-table>
      </template>

      <!-- 分页 -->
      <div class="block">
        <el-pagination
          small
          background
          layout="prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="pagesize"
          :current-page="pagenum"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import { getTypePapers } from '@/api/taxUrl/testpaper'
  export default {
    data () {
      return {
        // 表格
        tableData: [],
        paperListCategorys: [],
        form: {
          pname: '',
          pcid: '',
          ppapertype: '2',
        },
        // 选择试卷对话框
        list: [],
        // 分页数据
        total: 10,
        pagesize: 5,
        pagesizes: [1, 2, 3, 4],
        pagenum: 1,
      }
    },

    created () {
      this.getFindPaperStatistics()
      this.getTypePapers()
    },

    props: {
      paperList: {
        type: Array,
        default: function () {
          return []
        }
      }
    },

    methods: {
      // 获取试卷分析列表
      getFindPaperStatistics () {
        const that = this
        that.list = this.paperList
        that.total = this.paperList.length
        that.tableData = []
        this.paperList.forEach((item, index) => {
          if (index < that.pagesize) return that.tableData.push(item)
        })
      },

      // 选择试卷后
      // examRow (row) {
      //   this.$emit('examRow', row)
      // },
      // 获取试卷分类
      async getTypePapers () {
        const that = this
        const { data: { list, code } } = await getTypePapers()
        // that.$utils.post(`exam/sys/findOpenPaperCategorys`).then(res => {
          // const {list, code} = res.data
          if (code === '0000') return that.paperListCategorys = list
        // })
      },
      searchCX () {
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
      
      // 分页
      handleSizeChange(val) {
        this.pagesize = val
        this.tableData = []
        this.pagenum = 1
        this.list.forEach((item, index) => {
          if (index < this.pagesize) return this.tableData.push(item)
        })
      },

      handleCurrentChange(val) {
        this.pagenum = val
        this.tableData = []
        const currentIndex = this.pagesize * val
        this.list.forEach((item, index) => {
          let result = []
          if (index < currentIndex) {
            result.push(item)
            if (index >= this.pagesize * (val-1)) return this.tableData.push(item)
          }
        })
      }
    },
    watch: {
      paperList: function (val) {
        this.getFindPaperStatistics()
      }
    },
  }
</script>

<style scoped>

</style>