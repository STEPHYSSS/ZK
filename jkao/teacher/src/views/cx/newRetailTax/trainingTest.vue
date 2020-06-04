<template>
  <el-card shadow="never" class="box-card myTest">
    <div class="font-weight-700 teacher-title topPadding">实训测试
      <previous-page goPreviousPage="/newRetailTax" style="float: right;display: inline-block;"></previous-page>
    </div>

    <!--实训题-->
    <div style="margin-top:20px;" class="topPadding">
      <!--标签页-->
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="实训题" name="first">
          <!-- 试卷名字 -->
          <h3 class="tigan">题干</h3>
          <p>{{ contentInfo }}</p>
          <div class="star">
            <el-button class="present-btn" @click="docking(question,selfExam)">开始答题</el-button>
            <el-button class="present-btn" @click="jiaojuan(selfExam)">交 卷</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-card>
</template>

<script>
import previousPage from "@/components/previousPage.vue";
import qs from "qs";
export default {
  data() {
    return {
      activeName: "first",
      // name:this.$route.query.name,
      questions_id: this.$route.query.questions_id,
      question: {},
      contentInfo: "",
      selfExam: {}
    };
  },
  created() {
    this.gettingData();
  },
  components: {
    "previous-page": previousPage
  },
  methods: {
    // 列表查询
    gettingData() {
      this.$utils({
        url: this.reqApi.shuiwuUrl + "/selfExam/prcTraining",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          prc_uuid: this.questions_id
        })
      }).then(res => {
        if(res.data.code === "0000") {
          this.question = res.data.prcQu;
          this.contentInfo=this.question.content.replace(/<[^>]+>|&[^>]+;/g, "").trim();
          this.selfExam = res.data.selfExam;
        }else {
          this.$message.error(res.data.msg)
        }
      });
    },
    docking(prcQu,info) {
      this.$router.push({
        name: "toNewRetail",
        query: {
          examFlow: info.exam_flow,
          examType: "T",
          questionCode: prcQu.practice_question_uuid,
          baseScore: info.total_score
        }
      })
    },
    // 交卷
    jiaojuan(info) {
      this.$utils({
        url: this.reqApi.shuiwuUrl + "/selfExam/submit",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          self_exam_id: info.id
        })
      }).then(res => {
        if (res.data.code === "0000") {
          this.$message.success('交卷成功')
          this.$router.push({ name: "newRetailTax" });
        }
      });
    },
    // tab 栏切换
    handleClick(e) {
    }
  }
};
</script>

<style scoped>
.me {
  margin-top: 25px;
}

.me p {
  font-weight: 600;
  font-size: 20px;
  position: absolute;
  left: 110px;
}

.el-form {
  margin-top: 10px;
}

.el-form--inline .el-form-item__label {
  font-weight: 600;
}
.tigan{
  font-size: 14px;
  font-weight: 800;
  padding-left: 0;
  padding-top: 0;
}
.star{
  text-align: right;
  margin-top: 20px;
}
.present-btn:hover{
  background-color: #e71537;
  opacity: .5;
}
</style>
