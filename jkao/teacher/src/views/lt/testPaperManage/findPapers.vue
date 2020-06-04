<template>
  <el-card class="f-new box-card">
    <!-- <new-tabs :active="2" level1="创建试卷" level2="试卷管理" @callback1="newPaper"></new-tabs> -->
    <h3>试卷管理</h3>
    <previous-page goPreviousPage="/mpage"></previous-page>
    <!-- 搜索框 -->
    <el-form :inline="true" :model="form" size="mini" style="padding: 20px 20px 0 20px;" class="f-new-inp demo-form-inline">
      <el-row>
        <el-col :span="6">
          <el-form-item label="试卷名称:">
            <el-input v-model="form.paper_name" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="试卷分类:">
            <el-select clearable v-model="form.type_id" placeholder="请选择">
              <el-option
                v-for="(item,index) in paperList"
                :key="index"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item class="qzbhh" label="创建人名称:">
            <el-input v-model="form.create_name" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col class="fr txalign-c" :span="6">
          <el-form-item>
            <el-button class="search-btn" @click="getPapers(pagesize, pagenum)">搜索</el-button>
            <el-button class="search search-btn" @click="clear">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="addBox">
      <el-button @click="newPaper">创建</el-button>
    </div>

    <!-- 表格 -->
    <el-table
    :data="tableData"
    border
    class="topBorder"
    style="width: 100%"

    >
      <el-table-column align="center" prop="name" label="试卷名称" :show-overflow-tooltip="true" width="300px"></el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 1">开放</span>
          <span v-if="scope.row.status == 2">关闭</span>
        </template>
      </el-table-column>
      <el-table-column prop="total_score" align="center" label="卷面总分">
      </el-table-column>
      <el-table-column prop="pass_score" align="center" label="及格分数">
      </el-table-column>
      <!-- <el-table-column align="center" label="试卷类型">
        <template slot-scope="scope">
          <span v-if="scope.row.ppapertype == '1'">随机试卷</span>
          <span v-if="scope.row.ppapertype == '0'">普通试卷</span>
        </template>
      </el-table-column> -->
      <el-table-column prop="remark" show-overflow-tooltip align="center" label="试卷说明">
      </el-table-column>
      <el-table-column align="center" label="创建人" width="180">
        <template slot-scope="scope">{{scope.row.create_user_name}}<br/>{{ scope.row.create_time | fmtDate() }}</template>
      </el-table-column>
      <el-table-column align="center" label="是否锁卷" width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.locked == 2 ">未锁卷</span>
          <span v-else>已锁卷</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" fixed="right" width="210">
        <template slot-scope="scope">
          <a href="javacript:;" @click='handleConfigOptions(scope.row)'>组卷</a>
          <span v-if="scope.row.locked == 2">| <a href="javacript:;" @click="suojuan(scope.row)">锁卷</a></span>
          | <a href="javacript:;" @click='copyPaper(scope.row)'>复制</a>
          | <a href="javacript:;" @click='handlePut(scope.row)'>修改</a>
          | <a href="javacript:;" @click='open(scope.row)'>删除</a>
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

    <!-- 选择试卷对话框 -->
    <el-dialog title="选择试卷" :visible.sync="dialogVisibleData" width="60%">
      <test-paper-info :paperList="testPaperList" @close="handleClose"></test-paper-info>
    </el-dialog>
  </el-card>

</template>

<script>
  import testPaperInfo from './testPaperInfo'
  import { getPapers, getTypePapers, deletePaper } from '@/api/taxUrl/testpaper'
  import previousPage from "@/components/previousPage.vue";
  import qs from 'qs'
  export default {
    data() {
      return {
        // 考试信息
        testPaperList: [],
        dialogVisibleData: false,
        // 表格
        tableData: [],
        form: {
          paper_name: '',
          type_id: '',
          create_name: '',
        },

        list: [],
        paperList: [],
        // 分页数据
        total: 10,
        pagesize: 10,
        pagesizes: [10, 20, 30, 40],
        pagenum: 1,
        aRoleid:sessionStorage.role_id
      }
    },

    created () {
      this.getPapers(this.pagesize, this.pagenum)
      this.getTypePapers()
    },
    components: {
      // newTabs,
      testPaperInfo,
      "previous-page": previousPage
    },

    methods: {
      clear(){
          this.form.paper_name=''
          this.form.type_id=''
          this.form.create_name=''
          this.getPapers()
      },
      // 获取试卷列表
      async getPapers (pagesize, pagenum) {
        const that = this
        const { paper_name, type_id, create_name } = this.form
        const { data: { testpapers, code } } = await getPapers({
          pageSize: JSON.stringify(pagesize),
          pageNum: JSON.stringify(pagenum),
          paper_name,
          type_id,
          create_name
        })
        if (code === '0000') {
          that.total = testpapers.total
          that.tableData = testpapers.list
        }
      },
      // 获取试卷分类
      async getTypePapers () {
        const that = this
        const { data: { types, code } } = await getTypePapers()
        if (code === '0000') return that.paperList = types.list
      },
      copyPaper (data) {
        this.$utils.post(this.reqApi.shuiwuUrl+'/testpaper/copy',qs.stringify({
          testpaper_id:data.id
        })).then(res=>{
          if(res.data.code==='0000'){
            this.$message.success('复制成功')
            this.getPapers()
          }else {
            this.$message.error(res.data.msg)
          }
        })
      },

      // 创建试卷
      newPaper () {
        this.$router.push({name: 'newPaper'})
      },

      // 删除
      open(info) {
        const that = this
        if(that.aRoleid > 2 && info.create_user_id != sessionStorage.userId){
          that.$message('无权限！无法操作')
        }else{
            that.$confirm('删除操作无法恢复，确定删除吗?', '来自网页的消息', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',

            }).then(async () => {
              const { data: { code, msg } } = await deletePaper(info.id)
                if (code === '0000') {
                  that.getPapers()
                  that.$message.success(msg)
                } else return that.$message(msg)
            }).catch((err) => {
            })
        }
      },

      // 关闭
      handleClose () {
        this.dialogVisibleData = false
      },

      handlePut (info) {
        if(this.aRoleid > 2 && info.create_user_id != sessionStorage.userId){
          this.$message('无权限！无法操作')
        }else{
          sessionStorage.setItem('paperInfo', JSON.stringify(info))
          this.$router.push({
            name : 'newPaper',
            query : {id : info.id}
          })
        }
      },

      // 分页
      handleSizeChange(val) {
        this.pagesize = val
        this.pagenum = 1
        this.getPapers(val, 1)
      },

      handleCurrentChange(val) {
        this.pagenum = val
        this.getPapers(this.pagesize, val)
      },

      // 配置用户
      handleConfigOptions (user) {
        this.$router.push({
          name: 'configOptions',
          query: { id : user.id }
        })
      },
      // 锁卷
      suojuan(info) {
        this.$utils
        .post(
          this.reqApi.shuiwuUrl + `/testpaper/lock`,
          qs.stringify({
            testpaper_id: info.id
          })
        ).then(res=>{
          if (res.data.code === "0000") {
            this.$message.success("锁定成功");
            this.getPapers();
          }else return this.$message.error(msg);
        })
      },
      // 考试详情
      handleExamDetails (user) {
        this.$utils.post(`exam/sys/findExamSetByPid/${user.pid}`)
        .then(res => {
          const {code, list} = res.data
          if (code == '00') {
            this.testPaperList = list
            this.dialogVisibleData = true
          }
        })
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
