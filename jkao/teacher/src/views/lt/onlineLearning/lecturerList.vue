<template>
  <el-card shadow="never" class="box-card">
    <my-bread level1="讲师列表" level2="讲师列表" level3="讲师资料管理，选择下面的讲师进行修改或其他操作"></my-bread>
    <el-row>
      <el-button size="mini" @click="addLecturer">增加讲师</el-button>
      <el-button size="mini" class="present-btn">讲师列表</el-button>
    </el-row>

    <!-- 表格 -->
    <el-table
    :data="tableData"
    stripe
    :header-cell-style="{background:'#3ec8dd', color:'#fff'}"
    style="width: 100%">
      <el-table-column align="center" prop="name" label="讲师名称">
      </el-table-column>
      <el-table-column align="center" prop="userCount" label="讲师照片">
      </el-table-column>
      <el-table-column align="center" prop="userCount" label="联系电话">
      </el-table-column>
      <el-table-column align="center" prop="userCount" label="电子信箱">
      </el-table-column>
      <el-table-column align="center" label="创建时间" width="210">
        <template slot-scope="scope">{{ scope.row.createdate }}</template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <a href="javascript:;" @click="handlePut(scope.row)">修改</a> |
          <a href="javascript:;" @click="open(scope.row)">删除</a>
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
  export default {
    data() {
      return {
        // 表格
        tableData: [],
        list: [],
        // 分页数据
        total: 10,
        pagesize: 2,
        pagesizes: [1, 2, 3, 4],
        pagenum: 1,
      }
    },

    created() {
      this.getfindClasses()
    },

    methods: {
      getfindClasses () {
        const that = this
        that.$utils.post('exam/sys/findClasses').then(res => {
          const {list, code} = res.data
          if (code === '00') {
            this.list = list
            this.total = list.length
            list.forEach((item, index) => {
              if (index < this.pagesize) return this.tableData.push(item)
            })
          }
        })
      },

      // addLecturer
      addLecturer () {
        this.$router.push({name : 'addLecturer'})
      },

      // 改
      handlePut (info) {
        const that = this
        that.$utils.post(`sys/${info.cid}`).then(res => {
          const {code, object} = res.data
          if (code === '00') {
            const putClassInfo = JSON.stringify(object)
            sessionStorage.setItem('putClassInfo', putClassInfo)
            that.$router.push({name : 'addLecturer'})
          }
        })
      },

      // 删
      open(info) {
        const that = this
        that.$confirm('删除操作无法恢复，确定删除吗?', '来自网页的消息', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
        }).then(() => {
          that.$utils.post(`exam/sys/delClass/${info.cid}`).then(res => {
            this.tableData = []
            that.getfindClasses()
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
            if (index >= this.pagesize * (val-1)) return this.tableData.push(item)
          }
        })
      },
    },
  }
</script>

<style scoped>

  /* 数据分析头部 */
  .analyzeHead {
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
  }

  /* 数据分析身体 */
  .analyzeBody {
    padding: 10px 30px;
    height: 480px;
  }

  .analyzeBody div.el-table {
    border: 1px solid #ebeef5;
    border-bottom: 0px solid #ccc;
  }
</style>