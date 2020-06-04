<template>
  <el-card class="box-card f-new">
    <previous-page goPreviousPage="/mpage" style="float: right;display: inline-block;"></previous-page>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="客观题库列表" name="first">
        <div class="buttonStyle">
          <el-button class="whiteBtn" @click="addQuestion">新增</el-button>
        </div>
        <!-- 表格 -->
        <el-table :data="tableData" border class="topBorder" style="width: 100%"
        
        >
          <el-table-column align="center" prop="name" label="题库名称"></el-table-column>
          <el-table-column align="center" label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status == 1">开放</span>
              <span v-if="scope.row.status == 2">关闭</span>
            </template>
          </el-table-column>
          <!-- <el-table-column align="center" prop="question_count" label="试题数量"></el-table-column> -->
          <el-table-column align="center" label="创建人" width="210">
            <template slot-scope="scope">
              {{ scope.row.create_user_name }}
              <br />
              {{ scope.row.create_time | fmtDate }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="最后修改人" width="210">
            <template slot-scope="scope">
              {{ scope.row.update_user_name }}
              <br />
              {{ scope.row.update_time | fmtDate }}
              </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="180">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="数据分析" placement="bottom">
                <span class="cur-point dis-inline-block" @click="questionData(scope.row)">
                  <img src="@/assets/images/zicejilu_icon.png" alt />&nbsp;&nbsp;&nbsp;
                </span>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="编 辑" placement="bottom">
                <span class="cur-point dis-inline-block" @click="questionPut(scope.row)">
                  <img src="@/assets/images/xiugai_icon.png" alt />&nbsp;&nbsp;&nbsp;
                </span>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删 除" placement="bottom">
                <span class="cur-point dis-inline-block" @click="dele(scope.row)">
                  <img src="@/assets/images/shanchu_icon.png" alt />
                </span>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      
        <!-- 分页 -->
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[10,20,30,40]"
            :page-size="pageSize"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            class="pagination"
          ></el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="实训题库列表" name="second">
        <div class="buttonStyle">
          <el-button class="whiteBtn" @click="addQuestion2">新增</el-button>
        </div>
        <el-table :data="tableData2" border class="topBorder" style="width: 100%"
        
        >
          <el-table-column align="center" prop="name" label="题库名称"></el-table-column>
          <el-table-column align="center" label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status == 1">开放</span>
              <span v-if="scope.row.status == 2">关闭</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="创建人">
            <template slot-scope="scope">
              {{ scope.row.create_user_name }}
              <br />
              {{ scope.row.create_time | fmtDate }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="最后修改人">
            <template slot-scope="scope">
              {{ scope.row.update_user_name }}
              <br />
              {{ scope.row.update_time | fmtDate }}
              </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="180">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="数据分析" placement="bottom">
                <span class="cur-point dis-inline-block" @click="questionData2(scope.row)">
                  <img src="@/assets/images/zicejilu_icon.png" alt />&nbsp;&nbsp;&nbsp;
                </span>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="编 辑" placement="bottom">
                <span class="cur-point dis-inline-block" @click="questionPut2(scope.row)">
                  <img src="@/assets/images/xiugai_icon.png" alt />&nbsp;&nbsp;&nbsp;
                </span>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删 除" placement="bottom">
                <span class="cur-point dis-inline-block" @click="dele2(scope.row)">
                  <img src="@/assets/images/shanchu_icon.png" alt />
                </span>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange2"
            @current-change="handleCurrentChange2"
            :current-page="pageNum2"
            :page-sizes="[10,20,30,40]"
            :page-size="pageSize2"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="total2"
            class="pagination"
          ></el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
       <!-- 数据分析对话框 -->
    <el-dialog :visible.sync="dialogVisibleData" width="750px" :show-close="false">
      <div class="analyzeHead">
        <img src="@/assets/images/icon_news.png" alt="">
        <span>数据分析</span>
        <a href="javacript:;" @click="handleClose" class="fr el-icon-close"></a>
      </div>
      <div class="analyzeBody">
        <table border="1">
          <tbody>
            <tr>
              <td>分类名称</td>
              <td>{{dataFx.name}}</td>
            </tr>
            <tr>
              <td>状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态</td>
              <td>
                <span v-if="dataFx.status === 1">开放</span>
                <span v-if="dataFx.status === 2">关闭</span>
              </td>
            </tr>
            <tr>
              <td>试题数量</td>
              <td>{{list.length}}</td>
            </tr>
          </tbody>
        </table>
        <div id="main" ref="main" :style="{width: '100%', height: '300px'}"></div>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import newTabs from "@/components/newTabs";
import previousPage from "@/components/previousPage.vue";
import qs from "qs";
import echarts from 'echarts'
export default {
  name: "findQuestionDbs",
  data() {
    return {
      activeName: "first",
      tableData: [],
      tableData2: [],
      userId: sessionStorage.getItem("userId"),
      role_id: sessionStorage.getItem("role_id"),
      pageNum: 1,
      pageSize: 10,
      total: 0,
      pageNum2: 1,
      pageSize2:10,
      total2:0,
      echartsData: [],
      dialogVisibleData:false,
      dataFx:[],
      list:[],
      echartsDataCopy:[]
    };
  },

  created() {
    this.getFindQuestion();
  },
  components: {
    newTabs,
    "previous-page": previousPage
  },
  beforeRouteEnter (to, from, next) {
    next(vm=>{
      if (from.name === 'addQuestionSx') {
        vm.activeName = 'second'
        vm.getFindQuestionSx()
        next()
      }
      else {
        vm.activeName = 'first'
        next()
      }
    })
    next()
  },

  methods: {
    // 获取题库列表
    getFindQuestion() {
      this.$utils({
        url: this.reqApi.shuiwuUrl + "/question/obj/listBank",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: sessionStorage.getItem("token"),
          course_id: "",
          shared: "",
          create_name: "",
          pageNum:this.pageNum,
          pageSize:this.pageSize
        })
      }).then(res => {
        if (res.data.code === "0000") {
          this.tableData = res.data.banks.list;
          this.total = res.data.banks.total;
        } else if (res.data.code === 401 || res.data.code === 403) {
          this.$message.error(res.data.msg);
          this.$router.push("/register");
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 新增客观题库
    addQuestion() {
      this.$router.push({ name: "addQuestion" });
    },
    // 编辑
    questionPut(info) {
      // 当用户状态等于3的时候判断是否是本人，是本人就可以编辑
      if (this.role_id == "3" && info.create_user_id != this.userId) {
        this.$message("无权限！无法操作");
      } else {
        this.$router.push({
          name: "addQuestion",
          query: { id: info.objective_bank_id }
        });
      }
    },
    // 删除
    dele(info) {
      const that = this;
      if (this.role_id == "3" && info.create_user_id != this.userId) {
        this.$message("无权限！无法操作");
      } else {
        that
          .$confirm("删除操作无法恢复，确定删除吗?", "来自网页的消息", {
            cancelButtonText: "取消",
            confirmButtonText: "确定"
          })
          .then(() => {
            that.$utils.post(that.reqApi.shuiwuUrl + "/question/obj/deleteBank",qs.stringify({
            bank_id: info.objective_bank_id
          })).then(res => {
              const { code, msg } = res.data;
              if (code === "0000") {
                that.getFindQuestion();
                that.$message.success("删除成功！");
              } else return that.$message(msg);
            });
          })
          .catch(() => {});
      }
    },
    handleClose () {
        this.dialogVisibleData = false
      },
    // 数据分析
    questionData(data) {
      // return
      this.dialogVisibleData = true
      this.dataFx=data
        this.$utils.post(this.reqApi.shuiwuUrl+'/question/obj/detailBank',qs.stringify({
          bank_id:data.objective_bank_id
        })).then(res=>{
          if(res.data.code==='0000'){
            this.list =res.data.questions.list
            this.echartsData = [
              {value: 0, name: '单选题'},
              {value: 0, name: '多选题'},
              {value: 0, name: '判断题'},
            ]
            this.list.forEach(item => {
              if (item.type === 1) this.echartsData[0].value++
              if (item.type === 2) this.echartsData[1].value++
              if (item.type === 3) this.echartsData[2].value++
              // if (item.qtype === 4) that.echartsData[2].value++
            });
            this.echartsDataCopy=[]
            this.echartsData.forEach((item,index)=>{
              if(item.value!=0){
                this.echartsDataCopy.push(item)
                // this.echartsData.splice(index,1)
              }
            })
            
            this.$nextTick(() => this.ehcharsT())
          }
        })
      return
        const that = this
        that.dataFx = info
        that.$utils.post(`exam/sys/OneDbQuestions/${info.did}`).then(res => {
          const {code, list} = res.data
          if (code === '00') {
            that.echartsData = [
              {value: 0, name: '单选题'},
              {value: 0, name: '多选题'},
              {value: 0, name: '实训题'},
            ]
            list.forEach(item => {
              if (item.qtype === 1) that.echartsData[0].value++
              if (item.qtype === 2) that.echartsData[1].value++
              if (item.qtype === 4) that.echartsData[2].value++
            });
            that.dialogVisibleData = true
            that.$nextTick(() => that.ehcharsT())
          }
        })
    },
    ehcharsT(){
        const that = this
        const myChart = echarts.init(that.$refs.main);
        myChart.setOption({
          tooltip : {
            formatter: "{b} : {c} ({d}%)"
          },
          series : [
            {
              name: '',
              type: 'pie',
              radius: ['25%', '50%'],
              color: ['#ee7738', '#51c2ee', '#fde14c'],
              data: that.echartsDataCopy
            }
          ]
        })
      },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getFindQuestion(this.pageNum, val);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getFindQuestion(val, this.pageSize);
    },
    // 实训题库部分
    handleClick(tab, event) {
      if (this.activeName == "second") {
        this.getFindQuestionSx();
      }
    },
     // 获取实训题库列表
    getFindQuestionSx() {
      this.$utils({
        url: this.reqApi.shuiwuUrl + "/question/prc/listBank",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: sessionStorage.getItem("token"),
          course_id: "",
          shared: "",
          create_name: "",
          pageNum:this.pageNum2,
          pageSize:this.pageSize2
        })
      }).then(res => {
        if (res.data.code === "0000") {
          this.tableData2 = res.data.banks.list;
          this.total2 = res.data.banks.total;
        } else if (res.data.code === 401 || res.data.code === 403) {
          this.$message.error(res.data.msg);
          this.$router.push("/register");
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 实训题库新增
    addQuestion2() {
      this.$router.push({ name: "addQuestionSx" });
    },
    // 编辑
    questionPut2(info) {
      // 当用户状态等于3的时候判断是否是本人，是本人就可以编辑
      if (this.role_id == "3" && info.create_user_id != this.userId) {
        this.$message("无权限！无法操作");
      } else {
        this.$router.push({
          name: "addQuestionSx",
          query: { id: info.practice_bank_id }
        });
      }
    },
    // 删除
    dele2(info) {
      const that = this;
      if (this.role_id == "3" && info.create_user_id != this.userId) {
        this.$message("无权限！无法操作");
      } else {
        that
          .$confirm("删除操作无法恢复，确定删除吗?", "来自网页的消息", {
            cancelButtonText: "取消",
            confirmButtonText: "确定"
          })
          .then(() => {
            that.$utils.post(that.reqApi.shuiwuUrl + "/question/prc/deleteBank",qs.stringify({
            bank_id: info.practice_bank_id
          })).then(res => {
              const { code, msg } = res.data;
              if (code === "0000") {
                that.getFindQuestionSx();
                that.$message.success("删除成功！");
              } else return that.$message(msg);
            });
          })
          .catch(() => {});
      }
    },
    // 数据分析
    questionData2(data) {
      this.dialogVisibleData = true
         this.dataFx=data
        this.$utils.post(this.reqApi.shuiwuUrl+'/question/prc/detailBank',qs.stringify({
          bank_id:data.practice_bank_id
        })).then(res=>{
          if(res.data.code==='0000'){
            this.list =res.data.questions.list
            this.echartsDataCopy = [
              {value: 0, name: '实训题'}
            ]
            if(this.list.length>0){
              this.list.forEach(item => {
              if (item.type === 1) this.echartsDataCopy[0].value++
            });
            this.$nextTick(() => this.ehcharsT())
            }
            
          }
        })
    },
    // 分页
    handleSizeChange2(val) {
      this.pageSize2 = val;
      this.getFindQuestionSx(1, val);
    },
    handleCurrentChange2(val) {
      this.pageNum2 = val;
      this.getFindQuestionSx(val, this.pageSize2);
    },
  }
};
</script>

<style scoped>
.buttonStyle {
  text-align: right;
  margin-bottom: 15px;
  margin-right: 20px;
}
 /* 数据分析身体 */
  .analyzeBody {
    padding: 30px;
  }
  .analyzeBody table {
    border-color:#e4e9ec;
    border-collapse: collapse;
    border: 1px solid #e4e9ec;
  }
  .analyzeBody tr td:nth-child(1){
    white-space:nowrap;
    padding: 3px 20px;
    background-color: #dbe0e5;
  }
  .analyzeBody tr td:nth-child(2){
    width: 100%;
    padding-left: 10px;
  }
/* 数据分析头部 */
  .analyzeHead {
    padding: 4px 20px;
    background-color:#000;
    color: #fff;
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
    color: #fff;
    font-weight: 700;
  }
  .analyzeHead span:nth-child(3) {
    font-size: 24px;
    color: #fff;
    font-weight: 700;
  }
</style>
