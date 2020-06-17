<template>
  <el-card shadow="never" class="box-card">
    <!-- <my-bread2 level1="试卷管理" level2="配置"></my-bread2> -->
    <div class="new-padding-left font-weight-700 teacher-title">配置</div>
    <previous-page goPreviousPage="/findPapers"></previous-page>
    <!-- <h3>配置</h3> -->
    <div class="new-padding-left ex">试卷详情配置，您可以在当前页面创建章节，并向章节中添加试题并设置分值。</div>
    
    <el-form ref="userConfigOptions" :model="userConfigOptions" label-width="80px" class="config-big">
      <h1 class="text-center">考试试卷配置</h1>
      <div class="config-left">
        <div class="config-left-header text-center">
          随机试卷<span>各考生试卷随机生成</span>
        </div>
        <div class="config-left-neck text-center">
          <span>时间设定: 
            <span>{{userConfigOptions.pstarttime}} -- {{userConfigOptions.pendtime}}</span>
          </span>
          <span>考试时长: <span>{{userConfigOptions.pduration}}</span></span>
          <div class="neck-input">
            <span>卷面总分: <input type="text" v-model="userConfigOptions.ptotalScore"></span>
            <span>及格分数: <input type="text" v-model="userConfigOptions.ppassScore"></span>
          </div>
        </div>
        <div class="config-left-chest">
          <el-button @click="addRow(userConfigOptions.tmPaperSections)">增加题型</el-button>
          <el-button @click="computeTotal(userConfigOptions.tmPaperSections)">计算总分</el-button>
        </div>
        <ul>
          <li class="config-left-body" v-for="(item, index) in userConfigOptions.tmPaperSections" :key="index">
            <div class="config-body-header">
              题型名称: 
              <el-select @input="change($event, item)" v-model="item.cname" class="long-input" placeholder="请选择题型">
                <el-option label="单选题" value="单选题"></el-option>
                <el-option label="多选题" value="多选题"></el-option>
                <el-option label="实训题" value="实训题"></el-option>
              </el-select>
              <span class="body-header-del fr" @click="deleteRow(index,userConfigOptions.tmPaperSections)">❌</span>
            </div>
            <div class="config-body-body">
              题型描述: <input type="text" maxlength="50" v-model="item.remark" class="long-input">
            </div>
            
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="题型设定:">
                <el-select v-model="item.qdbid" placeholder="请选择题库">
                  <el-option
                    v-for="(item,index) in list"
                    :key="index"
                    :label="item.dname"
                    :value="item.did">
                  </el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item>
                <input type="text" v-model="item.cname" readonly>
              </el-form-item> -->
              <el-form-item>
                <el-select v-model="item.qlevel" placeholder="常规">
                  <el-option label="非常容易" value="1"></el-option>
                  <el-option label="比较容易" value="2"></el-option>
                  <el-option label="常规" value="3"></el-option>
                  <el-option label="较难" value="4"></el-option>
                  <el-option label="非常难" value="5"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="试题数量:">
                <el-input maxlength="10" v-model="item.qsl"></el-input>
              </el-form-item>
              <el-form-item label="每题分值:">
                <el-input maxlength="10" v-model="item.score"></el-input>
              </el-form-item>
            </el-form>
          </li>
        </ul>
      <add-btn
      class="text-center"
      level1="提 交" level2="取 消"
      @submitForm="submitForm"
      @cancelForm="findPapers">
      </add-btn>
      </div>
      
    </el-form>
  </el-card>

</template>

<script>
import previousPage from "@/components/previousPage.vue";
  export default {
    data() {
      return {
        // 题库名称
        list: [],
        // 配置信息
        userConfigOptions: {},
      }
    },

    created () {
      this.getFindQuestionDbs()
      this.getQuestionConfig()
    },

    methods: {
      getQuestionConfig () {
        const that = this
        that.$utils.post(`exam/sys/findPaper/${that.$route.query.id}`).then(res => {
          const {object, code} = res.data
          if (code === '00') {
            if (!object.tmPaperSections) object.tmPaperSections = []
            that.userConfigOptions = object
            that.userConfigOptions.tmPaperSections.forEach((item, index) => {
              that.userConfigOptions.tmPaperSections[index].qtype = item.qtype + ''
              that.userConfigOptions.tmPaperSections[index].qlevel = item.qlevel + ''
            });
          }
        })
      },
      // 获取题库列表
      getFindQuestionDbs () {
        this.$utils.post(`exam/sys/findQuestionDbs`).then(res => {
          const {list} = res.data
          this.list = list
        })
      },
      change (e, item) {
        if (e === '单选题') return item.qtype = 1
        else if (e === '多选题') return item.qtype = 2
        else if (e === '判断题') return item.qtype = 3
        else if (e === '实训题') return item.qtype = 4
      },
      // 删除行
      deleteRow(index, rows) {
        rows.splice(index, 1)
      },

      // 增加题型
      addRow(rows) {
        rows.push({
          "cname": "单选题",
          "remark": " ",
          "qdbid": "",
          "qlevel": '',
          "qtype": '1',
          "qsl": '',
          "score": '',
          "xh": rows.length + 1,
        })
      },

      // 计算总分
      computeTotal (row) {
        let sum = 0
        row.forEach((item, index) => {
          sum += parseFloat(item.qsl * item.score)
        })
        this.userConfigOptions.ptotalScore = sum
        this.userConfigOptions.ppassScore = parseInt(sum * .6)
      },

      submitForm() {
        const that = this
        if (that.userConfigOptions.tmPaperSections.length <= 0) return this.$message('请增加题型')
        for (const i of that.userConfigOptions.tmPaperSections) {
          if (!i.qdbid || !i.qlevel || i.qsl == 0 || i.qsl == '' || i.score == 0 || i.score == '') return this.$message('请完善配置信息')
        }
        that.computeTotal(that.userConfigOptions.tmPaperSections)
        that.$utils.post('exam/sys/updatePaperConfig', that.userConfigOptions).then(res => {
          const {code, msg} = res.data
          if (code == '00') {
            that.$message.success(msg)
            that.$router.push({name : 'findPapers'})
          }
          else return that.$message(msg)
        })
      },

      // 试卷管理
      findPapers () {
        this.$router.push({name: 'findPapers'})
      },

    },
    components:{
      "previous-page": previousPage
    }
  }
</script>

<style scoped>
.text-center {
  margin-bottom: 30px;
}
  /* 面包屑结束 */
  h1 {
    height: 30px;
    color: #000;
    font-size: 18px;
    width: 100%;
  }
  input {
    width: 100px;
    /* height: 25px;
    line-height: 25px; */
    padding: 0 15px;
  }
  input.long-input {
    width: 300px !important;
  }
  .el-select.long-input {
    width: 300px !important;
    /* height: 25px; */
  }
  input.short-input {
    width: 60px;
  }
  /* 外圈大盒子 */
  .config-big {
    box-sizing: content-box;
    font-size: 0; 
  }
  .config-big > div {
    display: inline-block;
    border: 1px solid #e4e9ec;
    vertical-align: top;
    font-size: 14px;
    box-sizing: border-box;
  }
  .config-big .config-left {
    /* min-height: 400px; */
    width: 100%;
  }
  .config-left-header {
    background-color: #ececec;
    color: #000;
    height: 35px;
    line-height: 35px;
  }
  .config-big .config-left .config-left-header span {
    padding-left:15px;
  }
  .config-big .config-left .config-left-neck {
    font-size: 12px;
    padding: 10px 0;
  }
  .config-big .config-left .config-left-neck span:nth-child(2) {
    padding-left: 20px;
  }
  .config-big .config-left .config-left-chest {
    margin-left: 15px;
    margin-bottom: 15px;
  }
  .config-big .config-left .config-left-body {
    background-color: #f0f4f7;
    /* margin-bottom: 15px; */
  }
  .config-big .config-left .config-left-body .config-body-header,
  .config-big .config-left .config-left-body .config-body-body,
  .config-big .config-left .config-left-body .demo-form-inline{
    border-top: 1px solid #e4e9ec;
    padding: 5px 0;
    padding-left: 20px
  }
  .config-big .config-left .config-left-body .config-body-header .body-header-del {
    padding-right: 20px;
  }

  /* 输入框们 */
  div.el-input {
    width: 120px !important;
  }
  div.el-form-item {
    margin-bottom: 0;
    margin-right: 0;
  }
  .search.el-button {
    border: 1px solid #31b5ff;
    background-color: #31b5ff;
    color: #fff;
    padding: 7px 7px;
  }
  .demo-form-inline {
    border-bottom: 1px solid #e4e9ec;
    padding-left: 3px;
  }

  /* 分页 */
  div.el-pagination {
    /* position: fixed;
    right: 12px;
    bottom: 12px; */
    float: right;
    border: 0px solid #000;
  }
</style>