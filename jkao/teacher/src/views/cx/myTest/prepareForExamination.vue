<template>
  <!--准备考试-->
  <el-card shadow="never" class="prepareForTheExamination">
    <previous-page goPreviousPage="/myTest" style="float: right;display: inline-block;"></previous-page>
    <div id="aligning">
      <div class="student">
        <img src="@/assets/images/student.png" alt />
        <span>同学马上开始考试了，请做好准备工作...</span>
        <br />
        <img src="@/assets/images/prepareForTheExamination.png" class="circle" />
      </div>

      <div class="stipulate">
        <span>
          考试名称：
          <i>{{exam.name}}</i>
        </span>
        <br />
        <span>
          考试时长：
          <i>{{exam.duration}}</i>分钟
        </span>
        <br />
        <span>
          试卷总分：
          <i>{{testPaper.total_score}}</i>分， &nbsp;&nbsp;及格分数：
          <i>{{testPaper.pass_score}}</i>分， &nbsp;&nbsp; 试卷说明：{{testPaper.remark}}
        </span>
      </div>
    </div>

    <div class="button text-center">
      <el-button class="el-icon-edit enterTheTest" style="color:#444" @click="enterTest(exam.id)">&nbsp; 进入考试</el-button>
    </div>
  </el-card>
</template>

<script>
import qs from "qs";
import previousPage from "@/components/previousPage.vue";
export default {
  name: "prepareForExamination",
  data() {
    return {
      exam_id: this.$route.query.exam_id,
      exam:{},
      testPaper:{}
    };
  },
  components: {
    "previous-page": previousPage
  },
  created() {
    this.getDetail();
  },
  methods: {
    // 获取考试信息
    getDetail() {
      this.$utils({
        url: this.reqApi.shuiwuUrl + "/exam/detailForStu",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded"},
        data: qs.stringify({
          token: sessionStorage.getItem("token"),
          exam_id: this.exam_id
        })
      }).then(res => {
          if(res.data.code === "0000") {
            this.exam = res.data.exam;
            this.testPaper = res.data.testpaper;
          }
      });
    },
    //跳转进入考试页面
    enterTest(info) {
      sessionStorage.setItem("exam_id",info)
      this.$router.push({ name: "exam" ,query: { exam_id: sessionStorage.getItem("exam_id") }})
    },
  }
};
</script>

<style scoped>
#aligning {
  display: flex;
  justify-content: space-between;
}

.student {
  margin-left: 20px;
}

.student img:nth-child(1) {
  vertical-align: middle;
  margin-right: 10px;
  width: 30px;
}

.student span {
  color: #444;
  font-size: 15px;
  font-weight: 600;
  vertical-align: bottom;
}

.student .circle {
  display: block;
  margin: 25px 0 0 80px;
  width: 100%;
}
/*========================*/
.stipulate {
  margin: 120px 40px 50px 0;
}

.stipulate span {
  display: block;
  width: 545px;
  background-color: #f1f1fd;
  border: 1px solid #e5e5ea;
  border-radius: 5px;
  padding: 8px 20px;
  font-weight: 600;
}

.stipulate span i {
  color: red;
}

.boundary {
  display: block;
  margin: 80px auto;
  width: 100%;
}

.button {
  width: 100%;
  margin: 0 auto 60px;
  text-align: center;
}

.enterTheTest {
  color: #444 !important;
  border: 1px solid #d8e0f6 !important;
  background-color: #fff !important;
}

.historicalPerformance {
  color: #444 !important;
  background-color: #d8e0f6 !important;
  border: 1px solid #d8e0f6 !important;
}
</style>
