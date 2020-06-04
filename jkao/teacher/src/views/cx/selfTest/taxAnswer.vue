<template>
  <div>
    <el-table
      :data="tableData"
      border
      :header-cell-style="{background:'#3ec8dd', color:'#fff', height:'50px'}"
      class="qzbhh"
      style="width: 100%">
      <el-table-column align="center" prop="id.xh"  label="序号"></el-table-column>
      <el-table-column align="center" prop="pfxm" width="400" label="评分项目"></el-table-column>
      <el-table-column align="center" prop="bzz" label="标准值"></el-table-column>
      <el-table-column align="center" prop="fs" label="分数"></el-table-column>
    </el-table>
    
    <!-- 分页 -->
    <div class="block" style="padding-bottom: 20px">
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
  </div>
</template>

<script>
  export default {
    data () {
      return {
        tableData: [],
        // 分页数据
        total: 10,
        pagesize: 10,
        pagesizes: [10, 20, 30, 40],
        pagenum: 1,
      }
    },
    props: {
      taxAnswerList: {
        type: Array,
        default: function () {
          return []
        },
      }
    },
    created () {
      this.getTaxData()
    },
    methods: {
      getTaxData () {
        this.total = this.taxAnswerList.length
        this.tableData = []
        this.taxAnswerList.forEach((item, index) => {
            if (index < this.pagesize) return this.tableData.push(item)
        })
      },

      // 分页
      handleSizeChange(val) {
        this.pagesize = val
        this.tableData = []
        this.pagenum = 1
        this.taxAnswerList.forEach((item, index) => {
          if (index < this.pagesize) return this.tableData.push(item)
        })
      },

      handleCurrentChange(val) {
        this.pagenum = val
        this.tableData = []
        const currentIndex = this.pagesize * val
        this.taxAnswerList.forEach((item, index) => {
          let result = []
          if (index < currentIndex) {
            result.push(item)
            if (index >= this.pagesize * (val-1)) return this.tableData.push(item)
          }
        })
      }
    },
  }
</script>

<style scoped>

</style>