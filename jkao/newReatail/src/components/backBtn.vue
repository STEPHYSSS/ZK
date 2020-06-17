<template>
    <div class="countDown">
        <!-- 返回到教考页面 -->
        <button class="showQuestion" @click="showQuestion('pre')">上一题</button>
        <button class="showQuestion" @click="showQuestion('next')">下一题</button>
        <button class="showQuestion" @click="showQuestion">返回</button>
    </div>
</template>

<script>
export default {
    name: "questionInfo",
    data() {
        return {
            exam_id: "",
            examType: "",
            review: "",
            type: ""
        };
    },
    created() {
        if(sessionStorage.getItem("questionInfo")){
        this.questionInfo=JSON.parse(sessionStorage.getItem("questionInfo"))
        }
    },
    methods: {
        showQuestion(qusetion) {
            this.type = qusetion;
            if (this.type == "pre") {
                if (this.questionInfo.index == 0) {
                    return this.$message("已经是第一题了");
                } else {
                    this.questionInfo.index = this.questionInfo.index - 1;
                }
            } else if (this.type == "next") {
                if (
                    this.questionInfo.index == this.questionInfo.prcQus.length - 1
                ) {
                    return this.$message("已经是最后一题了");
                } else {
                    this.questionInfo.index = this.questionInfo.index - 0 + 1;
                }
            }
            let url = "http://192.168.1.30:8080";
            this.exam_id = sessionStorage.getItem("examId");
            this.examType = sessionStorage.getItem("examType"); //E代表考试，T代表自测
            this.review = sessionStorage.getItem("review"); //review = N 代表不是试题回顾，Y：试题回顾
            //  等于-1 代表的是从公司进入的，exam_id == undefined代表从测试进入的
            // historyExamDetails返回到自测详情页面
            // historyExamDetails返回到考试历史记录详情页面
            // return
            if (this.review == "Y" && this.examType == "T") {
              // 测试试题回顾
                // window.location.href =
                //     window.teacherSide +
                //     "/#/historyExamDetails?exam_id=" +
                //     this.exam_id +
                //     "&testDetail=" +
                //     1;
               window.location.href =
                    window.teacherSide +
                    "/#/historyExamDetails?flag=" +
                    "continueQ" +
                    "&index=" +
                    this.questionInfo.index +
                    "&question=" +
                    this.type+"&exam_id="+this.questionInfo.exam_id+'&flagBack=Z'+'&type='+this.questionInfo.type+"&testDetail="+1
                // window.location.href = "http://192.168.1.144:8080" + "/#/historyExamDetails?exam_id=" + exam_id + "&testDetail=" + 1;
            } else if (this.review == "Y" && this.examType == "E") {
              // 考试试题回顾
                // window.location.href =
                //     window.teacherSide +
                //     "/#/historyExamDetails?exam_id=" +
                //     this.exam_id;
                 window.location.href =
                    window.teacherSide +
                    "/#/historyExamDetails?flag=" +
                    "continueQ" +
                    "&index=" +
                    this.questionInfo.index +
                    "&question=" +
                    this.type+"&exam_id="+this.questionInfo.exam_id+'&type='+this.questionInfo.type



                // window.location.href = "http://192.168.1.144:8080"  + "/#/historyExamDetails?exam_id=" + exam_id;
            } else if (this.review == "N" && this.examType == "T") {
                // 自测
                // window.location.href =
                //     window.teacherSide + "/#/startSelfExam?flag=" + "continueQ";
                window.location.href =
                    window.teacherSide +
                    "/#/startSelfExam?flag=" +
                    "continueQ" +
                    "&index=" +
                    this.questionInfo.index +
                    "&question=" +
                    this.type+"&exam_id="+this.questionInfo.exam_id+'&flagBack=Z'+'&type='+this.questionInfo.type
            } else if (this.review == "N" && this.examType == "E") {
              // 考试
                // window.location.href =
                //     window.teacherSide + "/#/exam?exam_id=" + exam_id;
                // window.location.href = "http://192.168.1.144:8081" + "/#/exam?exam_id=" + exam_id;
                window.location.href =
                    window.teacherSide +
                    "/#/exam?flag=" +
                    "continueQ" +
                    "&index=" +
                    this.questionInfo.index +
                    "&question=" +
                    this.type+"&exam_id="+this.questionInfo.exam_id+'&type='+this.questionInfo.type
            } else if (this.exam_id == "-1" || this.exam_id == -1) {
                window.location.href = window.teacherSide + "/#/publicRole";
                //  window.location.href = "http://192.168.1.144:8081" + "/#/publicRole";
            } else {
                window.location.href = window.teacherSide + "/#/page";
                // window.location.href = "http://192.168.1.144:8080" + "/#/page";
            }
            if (sessionStorage.getItem("flagTeacher")) {
                window.location.href =
                    window.teacherSide + "/#/teacherPublicRole";
                // window.location.href = "http://192.168.1.144:8080" + "/#/teacherPublicRole";
                sessionStorage.removeItem("flagTeacher");
            }
        }
    }
};
</script>

<style scoped>
</style>
