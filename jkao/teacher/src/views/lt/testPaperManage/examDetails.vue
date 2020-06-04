<template>
  <el-card shadow="never" class="box-card">
    <!-- <my-bread2 level1="试卷管理" level2="考试详情"></my-bread2>
    <h3>考试详情</h3> -->
    <previous-page goPreviousPage="/testInfo"></previous-page>
    <div class="topPadding">
    <div class="font-weight-700 teacher-title">考试详情</div>
    

    <table border="1">
      <tbody>
        <tr>
          <td>试卷名称: </td>
          <td>{{object.name}}</td>
        </tr>
        <tr>
          <td>时间设置: </td>
          <td>{{object.start_time | fmtDate()}} -- {{object.end_time | fmtDate()}}</td>
        </tr>
        <tr>
          <td>考试时长: </td>
          <td>{{object.duration}}</td>
        </tr>
        <tr>
          <td>卷面总分: </td>
          <td>{{total_score}}</td>
        </tr>
      </tbody>
    </table>

    <el-form :inline="true" :model="form" size="mini" class="demo-form-inline">
      <el-form-item label="用户名:">
        <el-input clearable v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="姓名:">
        <el-input clearable v-model="form.realname"></el-input>
      </el-form-item>
     <!--  <el-form-item label="根据总分排序:">
        <el-select clearable v-model="form.order_by" placeholder="请选择" class="searchWid-1">
          <el-option label="正序" value="ASC"></el-option>
          <el-option label="倒序" value="DESC"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="所在班级:">
        <el-select clearable v-model="form.class_id" placeholder="全部">
          <el-option
            v-for="(item,index) in classList"
            :key="index"
            :label="item.class_name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="getStuExamAys" type="search-btn">搜索</el-button>
      </el-form-item>
    </el-form>
</div>

    <!-- 表格 -->
    <template>
      <el-table
      :data="tableData"
      
      :header-cell-style="{color:'#444'}"
      style="width: 100%">
        <el-table-column align="center" prop="username" label="用户名"></el-table-column>
        <el-table-column align="center" prop="class_name" label="所属班级"></el-table-column>
        <el-table-column align="center" prop="realname" label="真实姓名"></el-table-column>
        <el-table-column align="center" label="开始时间">
          <template slot-scope="scope">
              {{ scope.row.start_time | fmtDate()}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="结束时间">
          <template slot-scope="scope">
              {{ scope.row.end_time | fmtDate()}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="耗时(分钟)">
          <template slot-scope="scope">
            {{scope.row.duration}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="user_score" label="得分"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <a href="javascript:;" @click="questionData(scope.row)">阅卷</a>
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
  import { getStuExamAys } from '@/api/taxUrl/Analysis'
  import { classList } from '@/api/taxUrl/class'
import previousPage from "@/components/previousPage.vue";
import qs from "qs";
  export default {
    data() {
      return {
        classList: [],
        form: {
          username: '',
          realname: '',
          order_by: '',
          class_id: ''
        },

        // 表格
        tableData: [],
        // 试卷详情
        object: {},
        total_score:'',//卷面总分
        list: [],
        // 分页数据
        total: 10,
        pagesize: 10,
        pagesizes: [10, 20, 30, 40],
        pagenum: 1,

      }
    },

    created () {
      this.getStuExamAys()
      this.getfindClasses()
      this.getdetail()
    },
    components:{
      "previous-page": previousPage
    },
    methods: {
      getdetail(){
        this.$utils.post(this.reqApi.shuiwuUrl+'/exam/detailForAys',qs.stringify({
          exam_id:this.$route.query.id
        })).then(res=>{
            if(res.data.code==='0000'){
              this.object=res.data.exam
              this.total_score=res.data.testpaper.total_score
            }
        })
      },
      // 学生考试记录
      async getStuExamAys () {
        const { username, realname, order_by, class_id } = this.form
        const { data: { code, stuAys, msg } } = await getStuExamAys({
          exam_id: this.$route.query.id,
          username, realname, order_by, class_id,
          pageSize: this.pagesize,
          pageNum: this.pagenum
        })
        if (code == '0000') {
          this.total = stuAys.total
          this.tableData = stuAys.list
        }
      },

      // 操作
      // 查看详情
      questionData (user) {
        this.$router.push({
          name:'specificAnalysis',
          query:{
            exam_id: user.exam_id,
            testDetail: 2
          }
        })
        // this.$router.push({
        //   name : 'historyExamDetails',
        //   query: {
        //     exam_id: user.exam_id,
        //     testDetail: 2
        //   }
        // })
      },

      // banji
      async getfindClasses () {
        const { data: { code, classes } } = await classList()
        if (code == '0000') {
          this.classList = classes.list
        }
      },

      // 分页
      handleSizeChange(val) {
        this.pagesize = val
        this.pagenum = 1
        this.getStuExamAys()
      },

      handleCurrentChange(val) {
        this.pagenum = val
        this.getStuExamAys()
      }
    },
  }
</script>

<style scoped>
  .el-button {
    color: #fff;
    background: #444;
  }
  /* 头部表格 */
  table {
    border-color:#e4e9ec;
    border-collapse: collapse;
    border: 1px solid #e4e9ec;
    color: #777;
    margin-bottom: 20px;
  }
  table tbody tr td {
    padding: 0 15px;
  }
  table tbody tr td:nth-child(1) {
    /* background-color: #a8e7f0; */
    padding: 5px 4px 5px 7px;
  }
  table tbody tr td:nth-child(2) {
    width: 350px;
  }
  
</style>