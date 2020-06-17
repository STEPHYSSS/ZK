<template>
  <el-card shadow="never" class="box-card" id="add-case">
    <!-- <my-bread level1="设置标准答案" level2="设置标准答案" level3="设置标准答案"></my-bread> -->
    <div class="topPadding">
      <div class="font-weight-700 teacher-title">设置标准答案</div>
   </div>
    <!-- <el-row>
      <el-button size="mini" class="present-btn">设置标准答案</el-button>
      <el-button size="mini" @click="caseList">管理案例</el-button>
    </!-->

    <!-- 考试信息 -->
    <el-row class="add-exam">
      <el-table
        :data="tableData" class="topBorder"
        :header-cell-style="{color:'#444'}"
        style="width: 100%">
        <el-table-column align="center" prop="id.xh"  label="序号">
        </el-table-column>
        <el-table-column align="center" prop="pfxm" width="400" label="评分项目">
        </el-table-column>
        <el-table-column align="center" label="标准值">
          <template slot-scope="{row,$index}">
            <input
            maxlength="20"
            v-if="editable[$index]"
            v-model="row.bzz"
            @blur.prevent="hiddenEdit($index)"
            @keydown.enter="hiddenEdit($index)"
            type="text"
            v-focus
            class="text-center inputSmall"/>
            <span v-else>{{row.bzz}}</span>
            <a href="javascript:;" @click="showEdit($index)" class="edit-icon el-icon-edit-outline">
              <span class="edit-word font-size-12">编辑</span>
            </a>
          </template>
        </el-table-column>
        <el-table-column align="center" label="分数">
          <template slot-scope="{row,$index}">
            <input
            maxlength="10"
            v-if="editFs[$index]"
            v-model="row.fs"
            @blur.prevent="hiddenEdit($index)"
            @keydown.enter="hiddenEdit($index)"
            type="text"
            v-focus
            class="text-center inputSmall"/>
            <span v-else>{{row.fs}}</span>
            <a href="javascript:;" @click="showEditFs($index)" class="edit-icon el-icon-edit-outline">
              <span class="edit-word font-size-12">编辑</span>
            </a>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    
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
    <add-btn
    class="text-center"
    level1="提 交" level2="取 消"
    @submitForm="submitForm"
    @cancelForm="caseList">
    </add-btn>

  </el-card>

</template>

<script>
  export default {
    data() {
      return {
        // 编辑框显示隐藏
        editable:[],
        editFs:[],
        tableData: [],
        list: [],
        // 分页数据
        total: 10,
        pagesize: 10,
        pagesizes: [10, 20, 30, 40],
        pagenum: 1,

      }
    },

    directives: {
      focus: {
        inserted: function (el) {
          el.focus()
        }
      }
    },

    created() {
      this.getCaseBz()
    },

    methods: {
      // 获得标准答案
      getCaseBz () {
        const that = this
        that.$utils.post(`tax/getCaseBz/${that.$route.query.id}`)
        .then(res => {
          const {list, code} = res.data
          if (code === '00') {
            let arr = list
            let len = arr.length;
            that.editable = new Array(len);
            that.list = list
            that.total = list.length
            that.tableData = []
            list.forEach((item, index) => {
              if (index < that.pagesize) return that.tableData.push(item)
            })
          }
        })
        .catch(err => {
          this.$message.error('网络异常')
        })
      },
      
      // 编辑输入框显示隐藏
      showEdit (row) {
        this.editable[row] = true
        this.$set(this.editable, row, true)
      },
      showEditFs (row) {
        this.editFs[row] = true
        this.$set(this.editFs, row, true)
      },
      hiddenEdit(row) {
        this.$set(this.editable, row, false)
        this.$set(this.editFs, row, false)
      },

      // 提交
      submitForm () {
        const that = this
        that.$utils.post(`tax/upCaseBz`, that.tableData).then(res => {
          const {code, msg} = res.data
          if (code === '00') {
            that.$message.success(msg)
            that.caseList()
          }
          else return that.$message(msg)
        })
      },
      
      caseList () {
        this.$router.push({name : 'caseList'})
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
  /* 考试信息头 */
  .add-exam {
    width: 100%;
    border: 1px solid #c2cad8;
  }
  .el-form, .table-border {
    padding: 20px 200px 20px 60px;
  }
  .table-border {
    border: 1px solid #dbdfe6;
    margin-top: 20px;
  }
  .wushi {
    display: inline-block;
  }

  h4 {
    height: 40px;
  }

  .inputWid {
    width: 250px;
  }
  .inputSmall {
    width: 80px;
  }
  .inputBbig {
    width: 360px;
  }
  div.el-select {
    width: 250px !important;
  }
  .el-form-item {
    margin-bottom: 14px;
  }
  .edit-icon{
    position: absolute;
    padding-left: 10px;
    top: 50%;
    transform: translateY(-50%);
    display: none;
  }
  .edit-icon:hover .edit-word{
    display: inline-block;
  }
  .edit-word {
    display: none;
    position: absolute;
    padding: 5px 0px;
    width: 40px;
    left: 40px;
    top: 50%;
    z-index: 99999999;
    transform: translateY(-50%);
    border: 1px solid #c2cad8;
    border-radius: 3px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    background-color: #fff;
  }
  .edit-word::before {
    display: block;
    content: '';
    position: absolute;
    left: -24px;
    top: 5px;
    z-index: 9;
    width: 0px;
    height: 0px;
    border-top: 6px solid rgba(34, 173, 87, 0);
    border-right: 12px solid #c2cad8;
    border-bottom: 6px solid rgba(34, 173, 87, 0);
    border-left: 12px solid rgba(34, 173, 87, 0);
  }
  .edit-word::after {
    display: block;
    content: '';
    position: absolute;
    left: -23px;
    top: 5px;
    z-index: 9;
    width: 0px;
    height: 0px;
    border-top: 6px solid rgba(34, 173, 87, 0);
    border-right: 12px solid #fff;
    border-bottom: 6px solid rgba(34, 173, 87, 0);
    border-left: 12px solid rgba(34, 173, 87, 0);
  }
</style>