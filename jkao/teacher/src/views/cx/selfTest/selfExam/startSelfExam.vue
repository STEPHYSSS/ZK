<template>
  <div class="exam-box">
    <div class="previousPage"><img src="@/assets/images/returnbutton.png" @click="goback" /></div>
    <!-- 考试界面身体 -->
    <div class="exam-body">
      <!-- 试题部分 -->
      <div class="exam-question">
        <!-- tab栏 -->
        <exam-tabs :activeName="activeName" @handleTabs="handleTabs"></exam-tabs>
        <!-- tab中的内容 -->
        <div class="tab-content">
          <!-- 单选题 -->
          <template v-if="activeName === 'single'">
            <single-tab
            :isShowAnswer="false"
            :singleObjs="singleObjs"
            :isExam="false"
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
            :isShowAnswer="false"
            :multiObjs="multiObjs"
            :isExam="false"
            :examFlow="examFlow"
            :showQuestion="showQuestion"
            @add="showQuestion++"
            @cut="showQuestion--">
            </multiple-tab>
          </template>
          <!-- 判断题 -->
          <template v-if="activeName === 'judge'">
            <single-tab
            :isShowAnswer="false"
            :singleObjs="judgeObjs"
            :isExam="false"
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
              :prcQus="prcQus"
              :continueQ = "continueQ"
              :isExam="false"
              :examFlow="examFlow"
              :showQuestion="showQuestion"
              @add="showQuestion++"
              @cut="showQuestion--"
            ></tax-tab>
          </template>
          <button class="fr btnstyle" id="positionBtn" @click="submitPaper1" v-if="jilurecords.length > 0" :class="{selfExam:this.$route.query.flagBack}">交 卷</button>
          <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            height="16%">
            <p style="font-size: 18px;margin: 22px;">确定交卷</p>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>&nbsp;&nbsp;&nbsp;
              <el-button type="primary" @click="submitPaper">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      </div>
      <!-- 学生信息 -->
      <div class="exam-detail yibanban">
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
/**
 * @selfExamStart 开始自测  @selfExamGetRecord 获得所有操作记录  @selfExamSubmit 交卷
 */
import { selfExamStart, selfExamGetRecord, selfExamSubmit } from "@/api/taxUrl/selfExam";
import examDetail from '@/views/cx/myTest/components/examDetail'  // 学生详情
import examTabs from '@/views/cx/myTest/components/examTabs'; // tab栏
import singleTab from '@/views/cx/myTest/components/singleTab'; // 单选判断
import multipleTab from '@/views/cx/myTest/components/multipleTab'; // 多选
import taxTab from '@/views/cx/myTest/components/taxTab'; // 实训
export default {
  data() {
    return {
      activeName: "single", // tab选中栏
      examFlow: "", // 考试流水号
      singleObjs: [], // 单选题
      multiObjs: [], // 多选题
      judgeObjs: [], // 判断题
      prcQus: [], // 实训题集合
      showQuestion: 0,
      id:sessionStorage.getItem("exam_id"),
      continueQ:"",//判断是否继续答题
      jilurecords:'',
      dialogVisible:false
    }
  },
  created() {
    this.selfExamStart(); // 获取开始考试信息
    let localUrl = window.location.href;
    if(localUrl.split("?").length >= 2) {
      let url = localUrl.split("?")[1].split("=")[1];
      if(url === "continueQ") {
        this.continueQ = "continueQ"
      }
    }
    // if(localUrl.split("?")[1].split("=")[1] === 'continueQ') {
    //   this.continueQ = "continueQ"
    // }
  },
  components: {
    examDetail,
    examTabs,
    singleTab,
    multipleTab,
    taxTab
  },
  methods: {
    goback(){
      // newRetailTax(实训练习列表)
      // selfExamList(自测列表)
      let flagBack = this.$route.query.flagBack
      if(flagBack) {
        this.$router.push({name: 'selfExamList'});
      }else{
        this.$router.push({name: 'newRetailTax'});
      }

    },
    // 获取开始考试信息
    async selfExamStart() {
      const { data: { code, msg, examFlow, singleObjs, multiObjs, judgeObjs, prcQus } } = await selfExamStart({ self_exam_id: this.id });
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
        this.selfExamGetRecord(
          sessionStorage.getItem("exam_id"),
          singleObjs,
          multiObjs,
          judgeObjs
        );
      }
    },
    async selfExamGetRecord(self_exam_id, singleObjs, multiObjs, judgeObjs) {
      const { data: { code, records } } = await selfExamGetRecord({ self_exam_id:sessionStorage.getItem("exam_id") });
      this.jilurecords = records;
      if (code == "0000" && records.length > 0) {
        for (const i of records) {
          // 这边三个遍历 将答案放入自己手动添加的字段中
          // 遍历单选操作
          if (i.answer && i.answer.length > 0) {
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
    submitPaper1() {
      this.dialogVisible = true;
    },
    // 交卷
    async submitPaper() {
      const { data: { code, msg } } = await selfExamSubmit({ self_exam_id: sessionStorage.getItem("exam_id") })
      if (code === "0000") {
        this.$message.success('交卷成功')
        this.$router.push({ name: "selfTestRecord" });
      }else {
        this.$message.error(msg)
      }
    }
    // this.$utils({
    //     url: this.reqApi.shuiwuUrl + "/exam/submit",
    //     method: "POST",
    //     headers: { "content-type": "application/x-www-form-urlencoded" },
    //     data: qs.stringify({
    //       exam_flow: this.examFlow,
    //       exam_id: this.$route.query.exam_id
    //     })
    //   }).then(res => {
    //     if (res.data.code === "0000") {
    //       this.$refs.countDown.clearTime()
    //       this.$message.success('交卷成功')
    //       this.$router.push({ name: "myTest" });
    //     }
    //   });
  }
};
</script>

<style scoped>
  @import "../../myTest/components/exam.css";
  /* 试题部分 */
  .exam-question {
    width: calc(100% - 464px);
    height: 100%;
    /* background-color: rgb(13, 138, 44); */
    padding: 0px;
  }
  .previousPage{
    position: absolute;
    top: 24px;
    /* right: 35px; */
    right: 10px;
  }
  .yibanban{
    width: 333px;
    /* background-color: pink; */
  }
  /* #positionBtn{
    position: absolute;
    bottom: 50px;
    left: 60px;
  } */
  .selfExam{
    position: absolute;
    bottom: 50px;
    left: 150px;
  }
</style>
