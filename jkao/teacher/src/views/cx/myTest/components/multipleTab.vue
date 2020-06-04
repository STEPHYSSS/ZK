<template>
    <div id="examBox">
        <!-- {{rateList}} -->
        <h4 class="typeTitle">多选题</h4>
        <span v-if="multiObjs.length==0">暂无数据</span>
        <div
            v-else
            v-show="multiObjs.length>0"
            class="question-show"
            v-for="(item, index) in multiObjs"
            :key="index + 'b'"
        >
            <!-- <span>
                正确率
                <span v-for="(item,index) in rateList" :key="index">
                    <span v-for="(data,i) in multiObjs" :key="i">
                        <span
                            v-if="item.question_uuid==data.question.objective_question_uuid"
                        >{{item.rate}}%</span>
                    </span>
                </span>
            </span> -->
            <span v-show="multiObjs.length>0&&hide==1" class="delStyle" @click="delCollect(item)">删除</span>
            <template v-if="index === showQuestion">
                <!-- 题干 -->
                <collection
                    v-if="hide!=1&&roleId==4"
                    :question_uuid="item.question.objective_question_uuid"
                    type="multiple"
                ></collection>

                <div class="stem">
                    <img src="@/assets/images/tigan_icon.png" />
                    {{index + 1}}.题干
                </div>
                <span class="rateText" >

                <span v-for="(item,index) in rateList" :key="index">
                    <span v-for="(data,i) in multiObjs" :key="i">
                        <!-- 正确率 -->
                        <span
                        class="rateColor"
                            v-if="item.question_uuid==data.question.objective_question_uuid"
                        >{{item.rate}}%</span>
                    </span>
                </span>
            </span>
                <div v-html="item.question.content" class="timujiexi"></div>
                <div class="stem">
                    <img src="@/assets/images/xuanxiang_icon.png" />选项
                </div>

                <!-- 选项 -->
                <div
                    class="question-option"
                    v-for="(item1, index1) in item.options"
                    :key="index1 + 'bb'"
                >
                    <template v-if="analysis === 'analysis'">
                        <input
                            type="checkbox"
                            :disabled="type === 'viewDetails'"
                            :id="item1.objective_question_option_uuid"
                            :value="item1.option"
                            :checked="item.question.key.indexOf(item1.option) > -1"
                            style="cursor: pointer;"
                            @change="changeCheckbox($event, item1, item)"
                        />
                        <label
                            :for="item1.objective_question_option_uuid"
                            :class="item.question.key.indexOf(item1.option) >= 0 ? 'answerColor' : ''"
                            class="option-content dis-inline-block"
                        >
                            <span>{{item1.option}}: {{item1.content}}</span>
                        </label>
                    </template>
                    <template v-else>
                        <input
                            type="checkbox"
                            :disabled="type === 'viewDetails'"
                            :id="item1.objective_question_option_uuid"
                            :value="item1.option"
                            :checked="item.checkAnswer.indexOf(item1.option) > -1"
                            style="cursor: pointer;"
                            @change="changeCheckbox($event, item1, item)"
                        />
                        <label
                            :for="item1.objective_question_option_uuid"
                            :class="item.checkAnswer.indexOf(item1.option) >= 0 ? 'answerColor' : ''"
                            class="option-content dis-inline-block"
                        >
                            <span>{{item1.option}}: {{item1.content}}</span>
                        </label>
                    </template>
                </div>

                <div class="question-answer" v-if="isShowAnswer">
                    <span class="dis-inline-block">您的答案:{{item.checkAnswer}}</span>
                    <span class="dis-inline-block"  style="color:red">正确答案:{{item.question.key}}</span>
                </div>
                <span v-if="rightKey" class="dis-inline-block">正确答案:{{item.question.key}}</span>
                <!--解析-->
                <div v-if="type === 'viewDetails'" class="stem">
                    <img src="@/assets/images/jiexi_icon.png" alt />解析
                </div>
                <p v-if="type === 'viewDetails'" class="jiexi">
                    <span
                        v-if="item.question.resolve && item.question.resolve != '' && item.question.resolve != 'null'"
                        v-html="item.question.resolve"
                    ></span>
                    <span v-else>无试题解析</span>
                </p>
                <span v-if="item.question.remark">备注：{{item.question.remark}}</span>
            </template>
        </div>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
            <span class="tipsText">确定删除？</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="sure">确 定</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
        <div class="buttonSty">
            <el-button type="primary" v-show="showQuestion !== 0" plain @click="$emit('cut')">上一题</el-button>
            <el-button
                type="primary"
                v-show="multiObjs.length - 1 != showQuestion"
                plain
                @click="$emit('add')"
            >下一题</el-button>
        </div>
    </div>
</template>

<script>
import { addRecord } from "@/api/taxUrl/exam";
import { selfExamAddRecord } from "@/api/taxUrl/selfExam";
import collection from "./collection.vue";
import qs from "qs";
export default {
    data() {
        return {
            hide: 0,
            question_uuid: "",
            dialogVisible: false,
            roleId: sessionStorage.getItem("role_id")
        };
    },
    props: {
        multiObjs: Array,
        rateList: Array,
        showQuestion: {
            type: Number,
            default: 0
        },
        isShowAnswer: {
            //显示学生答案和正确答案
            type: Boolean,
            default: false
        },
        rightKey: {
            type: Boolean,
            default: false
        },
        type: String, // 查看试题详情
        examFlow: String,
        analysis: String, // 考试分析
        isExam: Boolean, // 是否考试
        collect_id: Number,
        remarksList: Array
    },
    components: {
        collection
    },
    created() {
        if (sessionStorage.getItem("hide")) {
            this.hide = Number(sessionStorage.getItem("hide"));
        }
        this.getRemark();

    },
    methods: {
        getRemark() {
            if (this.remarksList && this.remarksList.length > 0) {
                this.remarksList.forEach(item => {
                    this.multiObjs.forEach(i => {
                        if (
                            item.questions_uuid ==
                            i.question.objective_question_uuid
                        ) {
                            i.question.remark = item.remark;
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
            this.dialogVisible = true;
            this.question_uuid = data.question.objective_question_uuid;
            // this.$emit('getData',data.question.objective_question_uuid)
        },
        async changeCheckbox(e, item1, item) {
            if (this.type === "viewDetails") return false;
            // 多选
            if (e.target.checked) {
                // 选中
                if (item["checkAnswer"]) {
                    item["checkAnswer"] += item1.option;
                    item["checkAnswer"] = item["checkAnswer"]
                        .toUpperCase()
                        .split("")
                        .sort()
                        .join("");
                } else {
                    item["checkAnswer"] = "";
                    item["checkAnswer"] += item1.option;
                }
                this.$set(item, "checkAnswer", item["checkAnswer"]);
            } else {
                item["checkAnswer"] = item["checkAnswer"].replace(
                    item1.option,
                    ""
                );
                this.$set(item, "checkAnswer", item["checkAnswer"]);
            }
            let res = {};
            if (!this.isExam) {
                res = await selfExamAddRecord({
                    self_exam_id: this.$route.query.exam_id,
                    exam_flow: this.examFlow,
                    question_uuid: item1.objective_question_uuid,
                    answer: item["checkAnswer"]
                });
            } else {
                res = await addRecord({
                    exam_id: this.$route.query.exam_id,
                    exam_flow: this.examFlow,
                    question_uuid: item1.objective_question_uuid,
                    answer: item["checkAnswer"]
                });
            }
            const { code, msg } = res.data;
            if (code != "0000") return this.$message.error(msg);
        }
    }
};
</script>

<style scoped>
@import "./exam.css";
</style>
