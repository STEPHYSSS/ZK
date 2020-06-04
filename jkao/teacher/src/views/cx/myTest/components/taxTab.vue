<template>
    <!-- <<<<<<< HEAD -->
    <!-- <div class="examscore"> -->
    <!-- <h4 class="typeTitle">实训题</h4> -->
    <!-- <div class="question-show" v-for="(item, index) in prcQus" :key="index + 'a'"> -->
    <div id="examBox" class="examscore">
        <h4 v-if="prcQus.length>0" class="typeTitle">实训题</h4>
        <span v-if="prcQus.length==0">暂无数据</span>
        <div
            v-show="prcQus.length>0"
            class="question-show"
            v-for="(item, index) in prcQus"
            :key="index + 'a'"
        >
            <template v-if="index === showQuestion">
                <span
                    v-show="prcQus.length>0&&hide==1"
                    class="delStyle"
                    @click="delCollect(item)"
                >删除</span>
                <!-- 题干 -->
                <collection
                    v-if="hide!=1&&roleId==4"
                    :question_uuid="item.practice_question_uuid"
                    type="tax"
                ></collection>
                <div class="stem">
                    <img src="@/assets/images/tigan_icon.png" />
                    {{index + 1}}.题干
                </div>
                <div v-html="item.content" class="timujiexi"></div>
                <!--解析-->
                <div v-if="type === 'viewDetails'" class="stem">
                    <img src="@/assets/images/jiexi_icon.png" alt />解析
                </div>
                <p v-if="type === 'viewDetails'" class="jiexi">
                    <span
                        v-if="item.resolve && item.resolve != '' && item.resolve != 'null'"
                        v-html="item.resolve"
                    ></span>
                    <span v-else>无试题解析</span>
                </p>
                <!-- <div v-if="type === 'viewDetails'" class="stem"><img src="@/assets/images/jiexi_icon.png" alt="">数据分析</div> -->
                <button
                    v-if="type === 'viewDetails'&&hide!=1&&roleId==4"
                    @click="showScope(item)"
                    class="examScore"
                >实训分数</button>
                <button
                    v-if="type === 'viewDetails'&&hide!=1&&roleId==4"
                    @click="Trytoreview(item)"
                    class="examScore"
                >试题回顾</button>

                <span v-if="item.remark">备注：{{item.remark}}</span>
                <!-- go -->
                <!-- <el-button
                    v-if="type != 'viewDetails'"
                    @click="startAnswerQuestion(item)"
                    class="startQuestion"
                    :class="{openExam:type != 'viewDetails'}"
                >{{ msg }}</el-button> -->
                <!--  -->
                <el-button
                    v-if="type != 'viewDetails'"
                    @click="startAnswerQuestion(item)"
                    class="startQuestion"
                    :class="{openExam:type != 'viewDetails'}"
                >{{ msg }}</el-button>
            </template>
        </div>
        <el-dialog title="提示" :visible.sync="dialogVisible1" width="30%">
            <span class="tipsText">确定删除？</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="sure">确 定</el-button>
                <el-button @click="dialogVisible1 = false">取 消</el-button>
            </span>
        </el-dialog>
        <div class="buttonSty">
            <el-button type="primary" v-show="showQuestion !== 0" plain @click="$emit('cut')">上一题</el-button>
            <el-button
                type="primary"
                v-show="prcQus.length - 1 != showQuestion"
                plain
                @click="$emit('add')"
            >下一题</el-button>
        </div>
        <el-dialog :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <el-table :data="examScoreList">
                <el-table-column prop="pointName" label="评分项名称" align="center"></el-table-column>
                <el-table-column prop="isCorrect" label="是否正确" align="center"></el-table-column>
                <el-table-column prop="score" label="得分" align="center"></el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
import qs from "qs";
import { addRecord } from "@/api/taxUrl/exam";
import collection from "./collection.vue";
export default {
    props: {
        prcQus: Array,
        exam_flow: String,
        examFlow2: String,
        exam_flowSelf:String,
        test:{
            type: Number,
            default: 0
        },
        showQuestion: {
            type: Number,
            default: 0
        },
        testpaperId: Number,
        type: String, // 判断考试还是查看详情
        examFlow: String,
        analysis: String, // 考试分析
        isExam: Boolean, // 是否考试
        collect_id: Number,
        remarksList: Array,
        continueQ:String
    },
    data() {
        return {
            exam_id: this.$route.query.exam_id,
            hide: 0,
            question_uuid: "",
            dialogVisible1: false,
            dialogVisible: false,
            roleId: sessionStorage.getItem("role_id"),
            msg:"开始答题",
            examScoreList: []
            // <<<<<<< HEAD
            //   exam_id:sessionStorage.getItem("exam_id"),
            //   dialogVisible: false,
            //   examScoreList:[],
            //   abc:this.$route.query.examFlow
            // }
        };
    },
    created() {
        sessionStorage.exam_id = this.exam_id;
    },
    // =======

    //   }
    // },
    components: {
        collection
    },
    created() {
        if (sessionStorage.getItem("hide")) {
            this.hide = Number(sessionStorage.getItem("hide"));
        }
        this.getRemark();
        if(this.continueQ) {
          this.msg = "继续答题"
        }
    },
    // >>>>>>> dev_teaching_scl
    methods: {
        getRemark() {
            if (this.remarksList && this.remarksList.length > 0) {
                this.remarksList.forEach(item => {
                    this.prcQus.forEach(i => {
                        if (item.questions_uuid == i.practice_question_uuid) {
                            i.remark = item.remark;
                        }
                    });
                });
            }
        },
        sure(data) {
            this.dialogVisible = false;
            this.$emit("getData", this.question_uuid);
        },
        delCollect(data) {
            this.dialogVisible1 = true;
            this.question_uuid = data.practice_question_uuid;
            // this.$emit('getData',data.practice_question_uuid)
        },
        // 开始答题
        startAnswerQuestion(item) {
          sessionStorage.setItem("questionInfo",item.content)
            if (this.type === "viewDetails") return false;
            if (!this.isExam) {
                this.$router.push({
                    name: "toNewRetail",
                    query: {
                        exam_id: this.exam_id,
                        examFlow: this.examFlow,
                        examType: "T",
                        questionCode: item.practice_question_uuid,
                        baseScore: 100
                    }
                });
            } else {
                this.$utils({
                    url: this.reqApi.shuiwuUrl + "/exam/getQuScore",
                    method: "POST",
                    headers: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    data: qs.stringify({
                        testpaper_id: this.testpaperId,
                        question_uuid: item.practice_question_uuid
                    })
                }).then(res => {
                    if (res.data.code === "0000") {
                        let baseScore = res.data.baseScore;
                        this.$router.push({
                            name: "toNewRetail",
                            query: {
                                exam_id: this.exam_id,
                                examFlow: this.examFlow,
                                examType: "E",
                                questionCode: item.practice_question_uuid,
                                baseScore: baseScore
                            }
                        });
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });
            }
        },
        showScope(item) {
            this.dialogVisible = true;
             if (this.exam_flow) {
                this.$utils({
                    url: this.reqApi.xinls + "/exam/grade/detail",
                    method: "POST",
                    headers: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    data: qs.stringify({
                        token: sessionStorage.getItem("token"),
                        examFlow: this.exam_flow,
                        questionCode: item.practice_question_uuid
                    })
                }).then(res => {
                    if (res.data.code === "0000") {
                        this.examScoreList = res.data.data.pointGradeList;
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });
            } else if (this.examFlow2) {
                this.$utils({
                    url: this.reqApi.xinls + "/exam/grade/detail",
                    method: "POST",
                    headers: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    data: qs.stringify({
                        token: sessionStorage.getItem("token"),
                        examFlow: this.examFlow2,
                        questionCode: item.practice_question_uuid
                    })
                }).then(res => {
                    if (res.data.code === "0000") {
                        this.examScoreList = res.data.data.pointGradeList;
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });
            }
        },
        // 考试回顾
        Trytoreview(item){
          sessionStorage.setItem("questionInfo",item.content)
          if (this.test) {
            this.$router.push({
                name: "testOrExamDetail",
                query: {
                  exam_id: this.exam_id,
                  examFlow: this.exam_flowSelf,
                  examType: "T",
                  questionCode: item.practice_question_uuid,
                  testDetail:this.test
                }
            });
          } else {
            this.$router.push({
                name: "testOrExamDetail",
                query: {
                  exam_id: this.exam_id,
                  examFlow: this.exam_flow,
                  examType: "E",
                  questionCode: item.practice_question_uuid
                }
            });
              // this.$utils({
              //     url: this.reqApi.shuiwuUrl + "/exam/getQuScore",
              //     method: "POST",
              //     headers: {
              //         "content-type": "application/x-www-form-urlencoded"
              //     },
              //     data: qs.stringify({
              //         testpaper_id: this.testpaperId,
              //         question_uuid: item.practice_question_uuid
              //     })
              // }).then(res => {
              //     if (res.data.code === "0000") {
              //       console.log(res.data)
              //         // this.$router.push({
              //         //     name: "testOrExamDetail",
              //         //     query: {
              //         //         exam_id: this.exam_id,
              //         //         examFlow: this.examFlow,
              //         //         examType: "E",
              //         //         questionCode: item.practice_question_uuid
              //         //     }
              //         // });
              //     } else {
              //         this.$message.error(res.data.msg);
              //     }
              // });
          }
          // this.$router.push({name:'testOrExamDetail'})
        },
        handleClose() {
            this.dialogVisible = false;
        }
    }
};
</script>

<style scoped>
@import "./exam.css";
.el-dialog__header {
    height: 15px !important;
}
.openExam{
  position: absolute;
  left: 30px;
  bottom: 40px;
}
</style>
