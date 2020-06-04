<template>
    <div class="exam-box">
        <div class="previousPage">
            <img src="@/assets/images/returnbutton.png" @click="goback" />
        </div>
        <div class="testPaper">
            <span>试卷名称：{{testPaperName}}</span>
        </div>
        <!-- 返回  -->
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
                    @handleTabs="handleTabs"
                ></exam-tabs>
                <!-- tab中的内容 -->
                <div class="tab-content">
                    <!-- 单选题 -->
                    <template v-if="activeName === 'single'">
                        <single-tab
                            type="viewDetails"
                            :rightKey="true"
                            analysis="analysis"
                            :singleObjs="singleObjs"
                            :activeName="activeName"
                            :showQuestion="showQuestion"
                            :rateList="rateList"
                            @add="showQuestion++"
                            @cut="showQuestion--"
                        ></single-tab>
                    </template>
                    <!-- 多选题 -->
                    <template v-if="activeName === 'multiple'">
                        <multiple-tab
                            type="viewDetails"
                            :rightKey="true"
                            analysis="analysis"
                            :multiObjs="multiObjs"
                            :showQuestion="showQuestion"
                            :rateList="rateList"
                            @add="showQuestion++"
                            @cut="showQuestion--"
                        ></multiple-tab>
                    </template>
                    <!-- 判断题 -->
                    <template v-if="activeName === 'judge'&&judgeObjs.length>0">
                        <single-tab
                            type="viewDetails"
                            :rightKey="true"
                            analysis="analysis"
                            :singleObjs="judgeObjs"
                            :activeName="activeName"
                            :showQuestion="showQuestion"
                            :rateList="rateList"
                            @add="showQuestion++"
                            @cut="showQuestion--"
                        ></single-tab>
                    </template>
                    <!-- s实训题 -->
                    <template v-if="activeName === 'tax'">
                        <tax-tab
                            type="viewDetails"
                            analysis="analysis"
                            :prcQus="prcQus"
                            :showQuestion="showQuestion"
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
                    :prcQus="prcQus"
                ></exam-detail>
            </div>
        </div>
    </div>
</template>

<script>
import qs from "qs";
import { getRecord, detailHistory } from "@/api/taxUrl/exam";
import examDetail from "@/views/cx/myTest/components/examDetail"; // 学生详情
import examTabs from "@/views/cx/myTest/components/examTabs"; // tab栏
import singleTab from "@/views/cx/myTest/components/singleTab"; // 单选判断
import multipleTab from "@/views/cx/myTest/components/multipleTab"; // 多选
import taxTab from "@/views/cx/myTest/components/taxTab"; // 实训
export default {
    data() {
        return {
            activeName: "single", // tab选中栏
            examDetailInfo: {}, // 考试详情信息
            paperDetailInfo: {}, // 试卷详情信息
            singleObjs: [], // 单选题
            multiObjs: [], // 多选题
            judgeObjs: [], // 判断题
            prcQus: [], // 实训题集合
            showQuestion: 0,
            testPaperName: "",
            rateList:[]
        };
    },
    created() {
        this.detailHistory(this.$route.query.exam_id); // 获取考试信息
        this.getExamanster();
    },
    components: {
        examDetail,
        examTabs,
        singleTab,
        multipleTab,
        taxTab
    },
    methods: {
        goback() {
            this.$router.go(-1);
        },
        // 题目解析
        getExamanster() {
            this.$utils
                .post(
                    this.reqApi.shuiwuUrl + "/analysis/getQuAysByExamId",
                    qs.stringify({
                        exam_id: this.$route.query.exam_id
                    })
                )
                .then(res => {});
        },
        // 获取考试信息
        detailHistory() {
          this.$utils.post(this.reqApi.shuiwuUrl+'/analysis/getQuAysByTestpaperId',qs.stringify({
            testpaper_id:this.$route.query.testpaper_id
          })).then(res=>{
            this.rateList=res.data.qu_analysises

          })
            this.$utils
                .post(
                    this.reqApi.shuiwuUrl + "/exam/detailForAys",
                    qs.stringify({ exam_id: this.$route.query.exam_id })
                )
                .then(
                    ({
                        data: {
                            code,
                            exam,
                            msg,
                            singleObjs,
                            multiObjs,
                            judgeObjs,
                            prcQus,
                            records
                        }
                    }) => {
                        if (code == "0000") {
                            this.testPaperName = exam.name;
                            this.singleObjs = singleObjs;
                            this.multiObjs = multiObjs;
                            this.judgeObjs = judgeObjs;
                            this.prcQus = prcQus;
                            if (this.singleObjs && this.singleObjs.length > 0) {
                                this.activeName = "single";
                            } else if (
                                this.multiObjs &&
                                this.multiObjs.length > 0
                            ) {
                                this.activeName = "multiple";
                            } else if (
                                this.judgeObjs &&
                                this.judgeObjs.length > 0
                            ) {
                                this.activeName = "judge";
                            } else if (this.prcQus && this.prcQus.length > 0) {
                                this.activeName = "tax";
                            }
                        } else {
                            return this.$message.error(msg);
                        }
                    }
                );
        },
        /* 学生信息tabs栏 */
        handleTabs(data) {
            this.activeName = data;
            this.showQuestion = 0;
        },
        /* 学生信息栏切换题 */
        jumpToCurrent(data) {
            this.showQuestion = data;
        }
    }
};
</script>

<style scoped>
@import "../../cx/myTest/components/exam.css";
/* 试题部分 */
.exam-question {
    width: calc(100% - 464px);
    height: 100%;
    /* background-color: rgb(13, 138, 44); */
    padding: 0px;
    position: relative;
}
.previousPage {
    /* position: absolute;
    top: 30px;
    right: 35px; */
    float: right;
    margin: 20px 20px 0 0;
    cursor: pointer;
    z-index: 55;
}
.testPaper {
    height: 20px;
    padding: 10px;
}
.testPaper span {
    color: #444;
    font-size: 16px;
}
</style>
