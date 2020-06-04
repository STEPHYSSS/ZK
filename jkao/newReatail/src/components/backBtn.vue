<template>
  <div class="countDown">
    <!-- 返回到教考页面 -->
    <button class="showQuestion" @click="showQuestion">返回</button>
  </div>
</template>

<script>
export default {
  name: "questionInfo",
  data() {
    return {
    };
  },
  methods: {
    showQuestion() {
      let exam_id = sessionStorage.getItem("examId");
      let examType = sessionStorage.getItem("examType"); //E代表考试，T代表自测
      let review = sessionStorage.getItem("review");//review = N 代表不是试题回顾，Y：试题回顾
      //  等于-1 代表的是从公司进入的，exam_id == undefined代表从测试进入的
      // historyExamDetails返回到自测详情页面
      // historyExamDetails返回到考试历史记录详情页面
      if(review == "Y" && examType == "T") {
        window.location.href = window.teacherSide + "/#/historyExamDetails?exam_id=" + exam_id + "&testDetail=" + 1;
        // window.location.href = "http://192.168.1.144:8080" + "/#/historyExamDetails?exam_id=" + exam_id + "&testDetail=" + 1;
      }else if(review == "Y" && examType == "E") {
        window.location.href = window.teacherSide  + "/#/historyExamDetails?exam_id=" + exam_id;
        // window.location.href = "http://192.168.1.144:8080"  + "/#/historyExamDetails?exam_id=" + exam_id;
      }else if(review == "N" && examType == "T") {
        window.location.href = window.teacherSide + "/#/startSelfExam?flag=" +'continueQ';
        // window.location.href = "http://192.168.1.144:8080" + "/#/startSelfExam?flag=" +'continueQ';
      }else if(review == "N" && examType == "E") {
        window.location.href = window.teacherSide + "/#/exam?exam_id=" + exam_id;
        // window.location.href = "http://192.168.1.144:8081" + "/#/exam?exam_id=" + exam_id;
      }else if(exam_id == "-1" || exam_id == -1 ){
        window.location.href = window.teacherSide + "/#/publicRole";
        //  window.location.href = "http://192.168.1.144:8081" + "/#/publicRole";
      }else {
        window.location.href = window.teacherSide + "/#/page";
        // window.location.href = "http://192.168.1.144:8080" + "/#/page";
      }
      if(sessionStorage.getItem("flagTeacher")){
        window.location.href = window.teacherSide + "/#/teacherPublicRole";
        // window.location.href = "http://192.168.1.144:8080" + "/#/teacherPublicRole";
        sessionStorage.removeItem("flagTeacher");
      }      
    }
  }
};
</script>

<style scoped>
</style>
