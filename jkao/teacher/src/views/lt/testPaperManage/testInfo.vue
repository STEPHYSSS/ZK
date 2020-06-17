<template>
  <el-card class="f-new box-card">
    <!-- <new-tabs :active="2" level1="新建考试" level2="考试管理" @callback1="newTest"></new-tabs> -->
    <h3>考试管理</h3>
    <previous-page goPreviousPage="/mpage"></previous-page>
    <!-- <div class="addBox">
      <el-button @click="newTest">新建考试</el-button>
    </div> -->
    <!-- 搜索框 -->
    <el-form :inline="true" :model="form" size="mini" style="padding: 20px 20px 0 20px;" class="f-new-inp demo-form-inline">
      <el-row>
        <!-- <el-col :span="6">
          <el-form-item label="试卷名称:">
            <el-input v-model="form.remark" clearable></el-input>
          </el-form-item>
        </el-col> -->
        <el-col :span="6">
          <el-form-item label="选择班级:">
            <el-select clearable v-model="form.class_id" placeholder="请选择">
              <el-option
                v-for="(item,index) in classList"
                :key="index"
                :label="item.class_name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <el-button class="search search-btn" @click="examList(pagesize, pagenum, form.class_id)">搜索</el-button>
            <el-button class="search search-btn" @click="clear">重置</el-button>
          </el-form-item>
        </el-col>
        <el-col class="fr text-right" :span="6">
          <el-form-item>
            <el-button @click="newTest">新增</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 表格 -->
    <el-table
    :data="tableData"
    class="topBorder"
    style="width: 100%"

    >
      <el-table-column align="center" prop="name" label="考试名称"></el-table-column>
      <el-table-column align="center" label="开始时间">
        <template slot-scope="scope">{{scope.row.start_time | fmtDate()}}</template>
      </el-table-column>
      <el-table-column align="center" label="结束时间">
        <template slot-scope="scope">{{ scope.row.end_time | fmtDate()}}</template>
      </el-table-column>
      <!-- <el-table-column align="center" label="成绩公布时间">
        <template slot-scope="scope">{{ scope.row.pshowtime }}</template>
      </el-table-column> -->
      <el-table-column prop="duration" align="center" label="考试时长">
        <template slot-scope="scope">{{ scope.row.duration }}分钟</template>
      </el-table-column>
      <el-table-column prop="description" show-overflow-tooltip align="center" label="考试说明">
      </el-table-column>
      <el-table-column align="center" label="创建人">
        <template slot-scope="scope">{{scope.row.create_user_name}}<br/>{{ scope.row.create_time | fmtDate() }}</template>
      </el-table-column>
      <el-table-column align="center" label="操作" fixed="right" width="210">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="修改" placement="bottom">
            <span class="cur-point" @click="handlePut(scope.row)">
              <img src="@/assets/images/xiugai_icon.png" alt />
            </span>
          </el-tooltip>&nbsp;&nbsp;
          <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
            <span class="cur-point" @click="open(scope.row)">
              <img src="@/assets/images/shanchu_icon.png" alt />
            </span>
          </el-tooltip>&nbsp;&nbsp;
          <el-tooltip class="item" effect="dark" content="考试详情" placement="bottom">
            <span class="cur-point" @click="examDetails(scope.row)">
              <img src="@/assets/images/chaxun_icon.png" alt />
            </span>
          </el-tooltip>&nbsp;&nbsp;
          <!-- <a href="javacript:;" @click='handlePut(scope.row)'>修改</a>
          | <a href="javacript:;" @click='open(scope.row)'>删除</a>
          | <a href="javacript:;" @click='examDetails(scope.row)'>考试详情</a> -->
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
  import { examList, deleteExam } from '@/api/taxUrl/exam'
  import { classList } from '@/api/taxUrl/class'
  import newTabs from '@/components/newTabs'
  import previousPage from "@/components/previousPage.vue";
  export default {
    data() {
      return {
        // 表格
        tableData: [],
        form: {
          class_id: ''
        },

        list: [],
        classList: [],
        // 分页数据
        total: 10,
        pagesize: 10,
        pagesizes: [10, 20, 30, 40],
        pagenum: 1,
        aRoleid:sessionStorage.role_id
      }
    },

    created () {
      this.examList(this.pagesize, this.pagenum)
      this.getfindClasses()
    },
    components: {
      newTabs,
      "previous-page": previousPage
    },

    methods: {
      clear(){
        this.form.class_id=''
        this.examList()
      },
      // 获取考试列表
      async examList (pagesize, pagenum, class_id=null) {
        const that = this
        const { data: { exams, code } } = await examList({
          class_id,
          pageSize: JSON.stringify(pagesize),
          pageNum: JSON.stringify(pagenum)
        })
          if (code === '0000') {
            that.total = exams.total
            that.tableData = exams.list
          }
      },
      // banji
      async getfindClasses () {
        const that = this
        const { data: { classes, code } } = await classList()
        if (code === '0000') return that.classList = classes.list
      },
      searchCX () {
        const that = this
        that.$utils.post('exam/sys/findPapersSearch', that.form).then(res => {
          const {code, msg, list} = res.data
          if (code === '0000') {
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

      // 删除
      open(info) {
        const that = this
        if(that.aRoleid > 2 && info.create_user_id != sessionStorage.userId){
          that.$message('无权限！无法操作')
        }else{
          that.$confirm('删除操作无法恢复，确定删除吗?', '来自网页的消息', {
            cancelButtonText: '取消',
            confirmButtonText: '确定',
          }).then(async () => {
            const { data: { code, msg } } = await deleteExam(info.id)
            if (code === '0000') {
              that.$message.success('删除成功')
              that.pagenum = 1
              that.tableData = []
              that.examList()
            }
            else return that.$message(msg)
          }).catch((err) => {})
        }
      },

      handlePut (info) {
        if(this.aRoleid > 2 && info.create_user_id != sessionStorage.userId){
          this.$message('无权限！无法操作')
        }else{
          this.$router.push({
            name : 'newTest',
            query : {id : info.id}
          })
        }
      },

      newTest () {
        this.$router.push({ name : 'newTest' })
      },

      examDetails (user) {
        if(user.finished==2) return this.$message('考试暂未结束！')
        this.$router.push({
          name: 'examDetails',
          query: { id : user.id }
        })
      },

      // 分页
      handleSizeChange(val) {
        this.pagesize = val
        this.pagenum = 1
        this.examList(val, 1, this.form.class_id)
      },

      handleCurrentChange(val) {
        this.pagenum = val
        this.examList(this.pagesize, val, this.form.class_id)
      },

    },

  }
</script>

<style scoped>
  span.el-input__suffix {
    width: 35px;
  }
  .search {
    height: 30px;
  }

</style>
