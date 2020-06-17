<template>
    <div class="exam-box box-card">
        <div class="previousPage" id="previousPage">
            <img src="@/assets/images/returnbutton.png" @click="goback" />
        </div>
        <!-- 返回 -->
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
                            :isShowAnswer="true"
                            type="viewDetails"
                            :singleObjs="singleObjs"
                            :activeName="activeName"
                            :showQuestion="showQuestion"
                            @add="showQuestion++"
                            @cut="showQuestion--"
                        ></single-tab>
                    </template>
                    <!-- 多选题 -->
                    <template v-if="activeName === 'multiple'">
                        <multiple-tab
                            :isShowAnswer="true"
                            type="viewDetails"
                            :multiObjs="multiObjs"
                            :showQuestion="showQuestion"
                            @add="showQuestion++"
                            @cut="showQuestion--"
                        ></multiple-tab>
                    </template>
                    <!-- 判断题 -->
                    <template v-if="activeName === 'judge'">
                        <single-tab
                            :isShowAnswer="true"
                            type="viewDetails"
                            :singleObjs="judgeObjs"
                            :activeName="activeName"
                            :showQuestion="showQuestion"
                            @add="showQuestion++"
                            @cut="showQuestion--"
                        ></single-tab>
                    </template>
                    <!-- s实训题 -->
                    <!-- :examFlow2="examFlow2" -->
                    <template v-if="activeName === 'tax'">
                        <tax-tab
                            type="viewDetails"
                            :prcQus="prcQus"
                            :exam_flow="exam_flow"
                            :exam_flowSelf="exam_flowSelf"
                            :examFlow2="examFlow2"
                            :showQuestion="showQuestion"
                            :test="test"
                            @add="showQuestion++"
                            @cut="showQuestion--"
                        ></tax-tab>
                    </template>
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
                    :prcQus="prcQus"
                ></exam-detail>
            </div>
        </div>
    </div>
</template>

<script>
import qs from "qs";
import { detailHistory } from "@/api/taxUrl/exam";
import { selfExamDetail } from "@/api/taxUrl/selfExam";
import { detailForAys } from "@/api/taxUrl/Analysis";
import examDetail from "./components/examDetail"; // 学生详情
import examTabs from "./components/examTabs"; // tab栏
import singleTab from "./components/singleTab"; // 单选判断
import multipleTab from "./components/multipleTab"; // 多选
import taxTab from "./components/taxTab"; // 实训
import previousPage from "@/components/previousPage.vue";
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
            exam_flow: "",
            exam_flowSelf: "",
            examFlow2: this.$route.query.examFlow,
            test: 0 //试题回顾所需的参数
        };
    },
    created() {
        if (this.$route.query.index)
            this.showQuestion = this.$route.query.index - 0;
        if (sessionStorage.getItem("hide")) {
            sessionStorage.removeItem("hide");
        }
        /**
         * @testDetail  1 表示自测详情 2 表示从考试管理-->考试详情-->查看详情中进入  不传表示查看考试详情   ------可用于判断返回按钮返回哪个页面
         */
        this.detailHistory(
            this.$route.query.exam_id,
            this.$route.query.testDetail
        ); // 获取考试信息
    },
    activated() {
        if (this.$route.query.keepAlive == "1") {
            if (this.$route.query.index)
                this.showQuestion = this.$route.query.index - 0;
            if (sessionStorage.getItem("hide")) {
                sessionStorage.removeItem("hide");
            }
            /**
             * @testDetail  1 表示自测详情 2 表示从考试管理-->考试详情-->查看详情中进入  不传表示查看考试详情   ------可用于判断返回按钮返回哪个页面
             */
            this.detailHistory(
                this.$route.query.exam_id,
                this.$route.query.testDetail
            ); // 获取考试信息
        }
    },
    components: {
        examDetail,
        examTabs,
        singleTab,
        multipleTab,
        taxTab,
        "previous-page": previousPage
    },
    methods: {
        goback() {
            if (!this.$route.query.testDetail) {
                this.$router.push({ name: "historyTryBook" });
            } else {
                this.$router.push({ name: "selfTestRecord" });
            }
        },
        // 获取开始考试信息
        async detailHistory(exam_id, testDetail) {
            let res = {};
            if (testDetail == 1) {
                res = await selfExamDetail({ self_exam_id: exam_id });
                const {
                    code,
                    msg,
                    singleObjs,
                    multiObjs,
                    judgeObjs,
                    prcQus,
                    records,
                    selfExam
                } = res.data;
                if (code == "0000") {
                   let reg = new RegExp('src="', "g");
                    // 这三个遍历 手动添加考生所选选中答案字段
                    for (const i of singleObjs) {
                        this.$set(i, "checkAnswer", "");
                    }
                    for (const i of multiObjs) {
                        this.$set(i, "checkAnswer", "");
                    }
                    for (const i of judgeObjs) {
                        this.$set(i, "checkAnswer", "");
                    }
                    this.singleObjs = singleObjs;
                    this.singleObjs.forEach(item => {
                        if (item.question.content) {
                            item.question.content = item.question.content.replace(
                                reg,
                                `src="${this.reqApi.shuiwuUrl}`
                            );
                        }
                        if (item.question.resolve) {
                            item.question.resolve = item.question.resolve.replace(
                                reg,
                                `src="${this.reqApi.shuiwuUrl}`
                            );
                        }
                    });
                    this.multiObjs = multiObjs;
                    this.multiObjs.forEach(item => {
                        if (item.question.content) {
                            item.question.content = item.question.content.replace(
                                reg,
                                `src="${this.reqApi.shuiwuUrl}`
                            );
                        }

                        if (item.question.resolve) {
                            item.question.resolve = item.question.resolve.replace(
                                reg,
                                `src="${this.reqApi.shuiwuUrl}`
                            );
                        }
                    });
                    this.judgeObjs = judgeObjs;
                    this.judgeObjs.forEach(item => {
                        if (item.question.content) {
                            item.question.content = item.question.content.replace(
                                reg,
                                `src="${this.reqApi.shuiwuUrl}`
                            );
                        }

                        if (item.question.resolve) {
                            item.question.resolve = item.question.resolve.replace(
                                reg,
                                `src="${this.reqApi.shuiwuUrl}`
                            );
                        }
                    });
                    this.prcQus = prcQus;
                    this.prcQus.forEach(item => {
                        if (item.content) {
                            item.content = item.content.replace(
                                reg,
                                `src="${this.reqApi.shuiwuUrl}`
                            );
                        }

                        if (item.resolve) {
                            item.resolve = item.resolve.replace(
                                reg,
                                `src="${this.reqApi.shuiwuUrl}`
                            );
                        }
                    });
                    this.exam_flowSelf = selfExam.exam_flow;
                    this.test = testDetail;
                    if (this.singleObjs && this.singleObjs.length > 0) {
                        this.activeName = "single";
                    } else if (this.multiObjs && this.multiObjs.length > 0) {
                        this.activeName = "multiple";
                    } else if (this.judgeObjs && this.judgeObjs.length > 0) {
                        this.activeName = "judge";
                    } else if (this.prcQus && this.prcQus.length > 0) {
                        this.activeName = "tax";
                    }
                    // 调用
                    this.getRecord(
                        records,
                        singleObjs,
                        multiObjs,
                        judgeObjs,
                        prcQus
                    );
                }
            } else if (testDetail == 2) {
                res = await detailForAys({ exam_id });
            } else {
                res = await detailHistory({ exam_id });
            }
            const {
                code,
                msg,
                singleObjs,
                multiObjs,
                judgeObjs,
                prcQus,
                records,
                exam_flow
            } = res.data;
            if (code == "0000") {
                // 这三个遍历 手动添加考生所选选中答案字段
                for (const i of singleObjs) {
                    this.$set(i, "checkAnswer", "");
                }
                for (const i of multiObjs) {
                    this.$set(i, "checkAnswer", "");
                }
                for (const i of judgeObjs) {
                    this.$set(i, "checkAnswer", "");
                }
                this.singleObjs = singleObjs;
                this.multiObjs = multiObjs;
                this.judgeObjs = judgeObjs;
                this.prcQus = prcQus;
                this.exam_flow = exam_flow;
                if (this.singleObjs && this.singleObjs.length > 0) {
                    this.activeName = "single";
                } else if (this.multiObjs && this.multiObjs.length > 0) {
                    this.activeName = "multiple";
                } else if (this.judgeObjs && this.judgeObjs.length > 0) {
                    this.activeName = "judge";
                } else if (this.prcQus && this.prcQus.length > 0) {
                    this.activeName = "tax";
                }
                // 调用
                this.getRecord(
                    records,
                    singleObjs,
                    multiObjs,
                    judgeObjs,
                    prcQus
                );
            }
        },
        /**
         * @records 用户的所有操作 @singleObjs 单选列表 @multiObjs 多选列表 @judgeObjs 判断列表
         */
        getRecord(records, singleObjs, multiObjs, judgeObjs) {
            if (this.$route.query.type) {
                this.activeName = this.$route.query.type;
            }
            if (records && records.length > 0) {
                for (const i of records) {
                    // 这边三个遍历 将答案放入自己手动添加的字段中
                    // 遍历单选操作
                    for (const single of singleObjs) {
                        if (
                            i.question_uuid ===
                            single.question.objective_question_uuid
                        ) {
                            if (i.answer)
                                single.checkAnswer = i.answer
                                    .join("")
                                    .toUpperCase();
                        }
                    }
                    // 遍历多选操作
                    for (const multiple of multiObjs) {
                        if (
                            i.question_uuid ===
                            multiple.question.objective_question_uuid
                        ) {
                            if (i.answer)
                                multiple.checkAnswer = i.answer
                                    .join("")
                                    .toUpperCase();
                        }
                    }
                    // 遍历判选操作
                    for (const judge of judgeObjs) {
                        if (
                            i.question_uuid ===
                            judge.question.objective_question_uuid
                        ) {
                            if (i.answer)
                                judge.checkAnswer = i.answer
                                    .join("")
                                    .toUpperCase();
                        }
                    }
                }
            }
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
@import "./components/exam.css";
/* 试题部分 */
.exam-question {
    /* width: calc(100% - 464px); */
    height: 100%;
    padding: 40px 15px;
}
#previousPage {
    position: absolute;
    top: 30px;
    right: 10px;
    /* right: 35px; */
    /* float: right;
    margin: 20px 20px 0 0;
    cursor: pointer;
    z-index: 55; */
}
.yibanban {
    width: 333px;
    /* background-color: pink; */
}
</style>
