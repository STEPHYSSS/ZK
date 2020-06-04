<template>
  <el-card shadow="never" class="box-card">
    <my-bread level1="用户自测记录" level2="用户自测记录" level3="下表为用户自测记录，您可以进行条件晒选以查询需要的数据"></my-bread>

    <!-- 搜索框 -->
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item label="试卷案例名称:">
        <el-input clearable v-model="form.tname" class="searchWid-2"></el-input>
      </el-form-item>
      <el-form-item label="所属班级:">
        <el-select clearable v-model="form.classid" placeholder="请选择" class="searchWid-2">
          <el-option
            v-for="(item,index) in classList"
            :key="index"
            :label="item.name"
            :value="item.cid">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间排序:">
        <el-select clearable v-model="form.timecost" placeholder="请选择" class="searchWid-1">
          <el-option label="开考时间降序" value="1"></el-option>
          <el-option label="开考时间升序" value="2"></el-option>
          <el-option label="测试时长降序" value="3"></el-option>
          <el-option label="测试时长升序" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button class="search search-btn" @click="searchCX">搜索</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <template>
      <el-table
      :data="tableData"
      :header-cell-style="{background:'#3ec8dd', color:'#fff'}"
      stripe
      style="width: 100%">
        <el-table-column align="center" label="用户名" >
          <template slot-scope="scope">
            {{ scope.row.username }}<br/>
            {{ scope.row.realname}}
          </template>
        </el-table-column>
        <el-table-column prop="name" align="center" label="所属部门" >
        </el-table-column>
        <el-table-column prop="username" align="center" label="证件编号">
        </el-table-column>
        <el-table-column align="center" label="考试时间">
          <template slot-scope="scope">
            {{scope.row.starttime | fmtDate()}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="耗时(分钟)">
          <template slot-scope="scope">
            {{scope.row.timecost || 0}}
          </template>
        </el-table-column>
        <el-table-column prop="userscore" align="center" label="得分">
          <template slot-scope="scope">
            <span class="redQ">{{scope.row.userscore || 0}}</span>/{{scope.row.totalscore || 0}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" fixed="right">
          <template slot-scope="scope">
            <a href="javacript:;" @click='handleExamDetails(scope.row)'>查看详情</a>
            | <a href="javacript:;" @click='open(scope.row)'>删除</a>
          </template>
        </el-table-column>
      </el-table>
    </template>

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
  export default {
    data() {
      return {
        // 表格
        tableData: [],
        form: {
          tname: '',
          classid: '',
          timecost: '1'
        },
        classList: [],
        list: [],
        // 分页数据
        total: 10,
        pagesize: 10,
        pagesizes: [10, 20, 30, 40],
        pagenum: 1,
      }
    },

    created () {
      this.getFindAllUserTest()
      this.getfindClasses()
    },

    methods: {
      // 获取列表
      getFindAllUserTest () {
        const that = this
        that.$utils.post(`exam/test/findAllUserTest`).then(res => {
          const {list, code} = res.data
          if (code === '00') {
            that.list = list
            that.total = list.length
            that.tableData = []
            list.forEach((item, index) => {
              if (index < that.pagesize) return that.tableData.push(item)
            })
          }
        })
      },
      // banji
      getfindClasses () {
        const that = this
        that.$utils.post('exam/sys/findOpenClasses').then(res => {
          const {list, code} = res.data
          if (code === '00') return that.classList = list
        })
      },
      searchCX () {
        const that = this
        that.$utils.post('exam/test/findAllUserTestSearch', that.form).then(res => {
          const {code, msg, list} = res.data
          if (code === '00') {
            that.list = list
            that.total = list.length
            that.tableData = []
            list.forEach((item, index) => {
              if (index < that.pagesize) return that.tableData.push(item)
            })
          }
          else return that.$message(msg)
        })
      },

      // 删除
      open(info) {
        const that = this
        that.$confirm('删除操作无法恢复，确定删除吗?', '来自网页的消息', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
        }).then(() => {
          that.$utils.post(`exam/test/delUserTest/${info.tid}`).then(res => {
            const {code, msg} = res.data
            if (code === '00') {
              that.tableData = []
              that.getFindAllUserTest()
              that.$message.success(msg)
            }
            else return that.$message(msg)
          })
        }).catch(() => {

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
            if (index >= this.pagesize * (val - 1)) return this.tableData.push(item)
          }
        })
      },

      // 考试详情
      handleExamDetails (info) {
        this.$router.push({
          name : 'testingDetails',
          query: { id : info.tid }
        })
      },

    },

  }
</script>

<style scoped>
  .redQ {
    color:#ef6f6e;
  }
</style>