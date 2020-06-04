<template>
  <div class="exam-box">
    <!-- 考试界面头部 -->
    <div class="previousPage"><img src="@/assets/images/returnbutton.png" @click="goback" /></div>
    <div class="exam-head">
      <!-- 定时器 -->
      <count-down
        :examInfo="countDownInfo"
        v-if="countDownInfo"
        @autoSubmit="autoSubmitPaper"
        ref="countDown"
        class="fr"
      ></count-down>
      <button class="fr btnstyle" @click="submitPaper">交 卷</button>
    </div>
    <!-- 考试界面身体 -->
    <div class="exam-body">
      <!-- 试题部分 -->
      <div class="exam-question">
        <!-- tab栏 -->
        <exam-tabs
        :activeName="activeName"
        :singleObjs="singleObjs"
        :multiObjs="multiObjs"
        :judgeObjs="judgeObjs"
        :prcQus="prcQus"
        @handleTabs="handleTabs"></exam-tabs>
        <!-- tab中的内容 -->
        <div class="tab-content">
          <!-- 单选题 -->
          <template v-if="activeName === 'single'">
            <single-tab
            :isExam="true"
            :singleObjs="singleObjs"
            :activeName="activeName"
            :examFlow="examFlow"
            :showQuestion="showQuestion"
            @add="showQuestion++"
            @cut="showQuestion--">
            </single-tab>
          </template>
          <!-- 多选题 -->
          <template v-if="activeName === 'multiple'">
            <multiple-tab
            :isExam="true"
            :multiObjs="multiObjs"
            :examFlow="examFlow"
            :showQuestion="showQuestion"
            @add="showQuestion++"
            @cut="showQuestion--">
            </multiple-tab>
          </template>
          <!-- 判断题 -->
          <template v-if="activeName === 'judge'">
            <single-tab
            :isExam="true"
            :singleObjs="judgeObjs"
            :activeName="activeName"
            :examFlow="examFlow"
            :showQuestion="showQuestion"
            @add="showQuestion++"
            @cut="showQuestion--">
            </single-tab>
          </template>
          <!-- s实训题 -->
          <template v-if="activeName === 'tax'">
            <tax-tab
            :isExam="true"
              :prcQus="prcQus"
              :continueQ = "continueQ"
              :examFlow="examFlow"
              :showQuestion="showQuestion"
              :testpaperId= "testpaperId"
              @add="showQuestion++"
              @cut="showQuestion--"
            ></tax-tab>
          </template>
        </div>
      </div>
      <!-- 学生信息 -->
      <div class="exam-detail">
        <exam-detail
        @handleTabs="handleTabs"
        @jumpToCurrent="jumpToCurrent"
        :activeName="activeName"
        :showQuestion="showQuestion"
        :singleObjs="singleObjs"
        :multiObjs="multiObjs"
        :judgeObjs="judgeObjs"
        :prcQus="prcQus">
        </exam-detail>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import { startExam, addRecord, getRecord, detailForStu } from "@/api/taxUrl/exam";
import { getDate } from "@/api/taxUrl/base";
import examDetail from './components/examDetail'  // 学生详情
import countDown from "@/components/countDown.vue";
import examTabs from './components/examTabs'; // tab栏
import singleTab from './components/singleTab'; // 单选判断
import multipleTab from './components/multipleTab'; // 多选
import taxTab from './components/taxTab'; // 实训
export default {
  data() {
    return {
      curTime: new Date().getTime(), // 当前服务器时间
      activeName: "single", // tab选中栏
      countDownInfo: null, // 定时器所需信息
      testpaperId:0,//试卷Id
      examFlow: "", // 考试流水号
      singleObjs: [], // 单选题
      multiObjs: [], // 多选题
      judgeObjs: [], // 判断题
      prcQus: [], // 实训题集合
      showQuestion: 0,
      continueQ:""//判断是否继续答题
    };
  },
  created() {
    this.$nextTick( async () => this.curTime = await getDate() )
    this.detailForStu(this.$route.query.exam_id); // 获取考试信息
    this.startExam(); // 获取开始考试信息
    let localUrl = window.location.href;
    if(localUrl.split("?").length >= 2) {
      let url = localUrl.split("?")[1].split("=")[1];
      if(url === "continueQ") {
        this.continueQ = "continueQ"
      }
    }
  },
  components: {
    countDown,
    examDetail,
    examTabs,
    singleTab,
    multipleTab,
    taxTab
  },
  methods: {
    // 获取考试信息
    async detailForStu(exam_id) {
      const { data: { code, testpaper, exam } } = await detailForStu({ exam_id });
      if (code == "0000") {
        this.testpaperId = testpaper.id;
        this.countDownInfo = {
          duration: exam.duration,
          deadline: exam.end_time,
          nowTime: this.curTime,
          starTime: exam.start_time
        };
      }
    },
    // 获取开始考试信息
    async startExam() {
      const { data: { code, msg, examFlow, singleObjs, multiObjs, judgeObjs, prcQus } } = await startExam({ exam_id: this.$route.query.exam_id });
      if (code == "0000") {
        this.examFlow = examFlow;
        // 这三个遍历 手动添加考生所选选中答案字段
        for (const i of singleObjs) { this.$set(i, "checkAnswer", "") }
        for (const i of multiObjs) { this.$set(i, "checkAnswer", "") }
        for (const i of judgeObjs) { this.$set(i, "checkAnswer", "") }
        this.singleObjs = singleObjs;
        this.multiObjs = multiObjs;
        this.judgeObjs = judgeObjs;
        this.prcQus = prcQus;
        if (this.singleObjs && this.singleObjs.length > 0) {
          this.activeName = 'single'
        } else if (this.multiObjs && this.multiObjs.length > 0) {
          this.activeName = 'multiple'
        } else if (this.judgeObjs && this.judgeObjs.length > 0) {
          this.activeName = 'judge'
        } else if (this.prcQus && this.prcQus.length > 0) {
          this.activeName = 'tax'
        }
        // 调用
        this.getRecord(
          this.$route.query.exam_id,
          examFlow,
          singleObjs,
          multiObjs,
          judgeObjs
        );
      }
    },
    async getRecord(exam_id, exam_flow, singleObjs, multiObjs, judgeObjs) {
      const { data: { code, records } } = await getRecord({ exam_id, exam_flow });
      if (code == "0000" && records.length > 0) {
        for (const i of records) {
          // 这边三个遍历 将答案放入自己手动添加的字段中
          // 遍历单选操作
          for (const single of singleObjs) {
            if (i.question_uuid === single.question.objective_question_uuid) {
              single.checkAnswer = i.answer.join("").toUpperCase();
            }
          }
          // 遍历多选操作
          for (const multiple of multiObjs) {
            if (i.question_uuid === multiple.question.objective_question_uuid) {
              multiple.checkAnswer = i.answer.join("").toUpperCase();
            }
          }
          // 遍历判选操作
          for (const judge of judgeObjs) {
            if (i.question_uuid === judge.question.objective_question_uuid) {
              judge.checkAnswer = i.answer.join("").toUpperCase();
            }
          }
        }
      }
    },
    /* 学生信息tabs栏 */
    handleTabs (data) {
      this.activeName = data
      this.showQuestion = 0
    },
    /* 学生信息栏切换题 */
    jumpToCurrent (data) {
      this.showQuestion = data
    },
    // 交卷
    submitPaper() {
      this.$confirm('确认交卷吗？','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
          this.subPaper();
        })
    },
    //
    subPaper() {
      this.$utils({
        url: this.reqApi.shuiwuUrl + "/exam/submit",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          exam_flow: this.examFlow,
          exam_id: this.$route.query.exam_id
        })
      }).then(res => {
        if (res.data.code === "0000") {
          this.$refs.countDown.clearTime()
          this.$message.success('交卷成功')
          this.$router.push({ name: "myTest" });
        }else if(res.data.code === "9410"){
          this.$message('答题时间已结束，自动交卷')
          let timer = setTimeout(() => {
            this.$router.push({ name: "myTest" });
          }, 1000);
        }else return this.$message.error(res.data.msg)
      });
    },
    autoSubmitPaper () {
      this.$refs.countDown.clearTime()
      this.subPaper();
    },
    goback(){
      this.$router.push({name:"prepareForExamination",query: {
        exam_id: sessionStorage.getItem("exam_id")
      }})
    },
  }
};
</script>

<style scoped>
  @import "./components/exam.css";
  .previousPage{
    float: right;
    margin: 16px 16px 0px;
  }
  .el-message-box__status.el-icon-warning {
    color: #E6A23C;
    position: absolute;
    left: 122px;
    top: 50px;
}
</style>
