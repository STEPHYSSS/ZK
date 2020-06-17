<template>
    <el-card class="f-new box-card">
        <!-- <new-tabs :active="1" level1="新建考试" level2="考试管理" @callback2="testInfo"></new-tabs> -->
        <!-- <el-row>
      <el-button size="mini" class="present-btn">新建考试</el-button>
      <el-button size="mini" @click="testInfo">考试管理</el-button>
        </el-row>-->
        <h3 v-if="this.$route.query.id">修改考试</h3>
        <h3 v-else>新建考试</h3>
        <previous-page goPreviousPage="/testInfo"></previous-page>
        <!-- 表单 -->
        <div class="newQue-body">
            <div class="new-body">
                <el-form ref="form" :rules="rules" :model="form" label-width="100px">
                    <div>
                        <el-form-item label="考试名称:" prop="name" class="wushi">
                            <input type="text" maxlength="50" v-model="form.name" />
                        </el-form-item>
                        <span>{{testPaperName}}</span>
                        <el-button class="haha search-btn" @click="getFindPaperStatistics">选择试卷</el-button>
                        <el-form-item label="考试时长:" prop="duration" class="wushi fr">
                            <!-- <input type="text" v-model="duration" disabled> -->
                            <span>{{duration}}分钟&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="开考时间:" prop="start_time" class="wushi ">
                            <el-date-picker
                                type="datetime"
                                prefix-icon="el-icon-date"
                                format="yyyy-MM-dd HH:mm:ss"
                                value-format="timestamp"
                                placeholder="选择开考日期"
                                v-model="form.start_time"
                            ></el-date-picker>
                        </el-form-item>

                        <el-form-item label="结束时间:" prop="end_time" class="wushi fr">
                            <el-date-picker
                                type="datetime"
                                prefix-icon="el-icon-date"
                                default-value
                                format="yyyy-MM-dd HH:mm:ss"
                                value-format="timestamp"
                                placeholder="选择结束日期"
                                v-model="form.end_time"
                            ></el-date-picker>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="目标班级:" prop="class_ids" class="wushi">
                            <el-select
                                v-model="class_ids"
                                multiple
                                placeholder="请选择"
                                
                            >
                                <el-option
                                    v-for="(item, index) in classList"
                                    :key="index"
                                    :label="item.class_name"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="成绩公布时间:" prop="pshowtime" class="wushi fr">
                            <el-select v-model="form.status" placeholder="请选择">
                                <el-option label="开放" :value="1"></el-option>
                                <el-option label="关闭" :value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <el-form-item label="考试说明:" prop="description">
                        <textarea v-model="form.description" maxlength="200"></textarea>
                        <p
                            class="txalign-c paper-p"
                        >{{form.description.length}}/200 &nbsp;&nbsp;&nbsp;</p>
                    </el-form-item>
                    <add-btn
                        style="margin-left: 100px;"
                        level1="提 交"
                        level2="取 消"
                        @submitForm="submitForm('form')"
                        @cancelForm="testInfo"
                    ></add-btn>
                </el-form>
            </div>
        </div>

        <!-- 选择试卷对话框 -->
        <!-- <el-dialog :visible.sync="dialogVisibleData" width="60%" class="analy-q"> -->
        <choose-paper ref="choose" :paperList="paperList" @close="handleClose" @examRow="examRow"></choose-paper>
        <!-- </el-dialog> -->
    </el-card>
</template>

<script>
import { createExam, updateExam, examDetail } from "@/api/taxUrl/exam";
import { getPapers } from "@/api/taxUrl/testpaper";
import { classList } from "@/api/taxUrl/class";
import choosePaper from "./choosePaper";
import newTabs from "@/components/newTabs";
import previousPage from "@/components/previousPage.vue";
export default {
    data() {
        const checkExamTime = (rule, value, callback) => {
            if (value <= this.form.start_time) {
                this.form.end_time = "";
                return callback(new Error("结束时间应大于开始时间"));
            } else {
                callback();
            }
        };
        return {
            testName: "",
            classList: [], // 存放班级id
            paperList: [],
            // 选择试卷对话框
            dialogVisibleData: false,
            form: {
                id: null,
                name: "",
                description: "",
                start_time: "",
                end_time: "",
                duration: "",
                create_time: null,
                create_user_id: null,
                update_time: null,
                update_user_id: null,
                status: 1,
                course_id: null,
                testpaper_id: null,
                school_uuid: null,
                create_user_name: null,
                update_user_name: null
            },
            testPaperName: "",
            class_ids: [],
            rules: {
                name: [
                    {
                        required: true,
                        message: "试卷名称不能为空！",
                        trigger: "blur"
                    }
                ],
                start_time: [
                    {
                        required: true,
                        message: "开考时间不能为空！",
                        trigger: "blur"
                    }
                ],
                duration: [
                    {
                        required: true,
                        message: "考试时长不能为空！",
                        trigger: "blur"
                    }
                ],
                end_time: [
                    {
                        required: true,
                        validator: checkExamTime,
                        trigger: "blur"
                    }
                ],
                description: [
                    {
                        required: true,
                        message: "考试说明不能为空！",
                        trigger: "blur"
                    }
                ]
            }
        };
    },

    created() {
        this.getfindClasses();
        if (this.$route.query.id) return this.getOnePaper();
    },

    computed: {
        level: {
            get: function() {
                return (this.level = !this.$route.query.id
                    ? "新建考试"
                    : "修改考试");
            },
            set: function() {}
        },
        duration() {
            let duration =
                (this.form.end_time - this.form.start_time) / 1000 / 60;
            if (duration >= 0) {
                return (this.form.duration = Math.ceil(duration));
            } else {
                return (this.form.duration = 0);
            }
        }
    },

    components: {
        choosePaper,
        newTabs,
        "previous-page": previousPage
    },

    methods: {
        async getfindClasses() {
            const that = this;
            const {
                data: { classes, code }
            } = await classList();
            if (code === "0000") return (that.classList = classes.list);
            else return that.$message("获取班级列表失败");
        },

        // 获取单个考试信息
        async getOnePaper() {
            const {
                data: { exam, classes, code }
            } = await examDetail(this.$route.query.id - 0);
            if (code == "0000") {
                this.form = exam;
                for (const i of classes) {
                    this.class_ids.push(i.id);
                }
            }
        },
        // 获取试卷列表
        getFindPaperStatistics() {
            this.$refs.choose.dialogVisibleData = true;
        },
        // 选择试卷后
        examRow(row) {
            this.testPaperName = this.$refs.choose.dataRow.name;
            this.form.testpaper_id = this.$refs.choose.exam_id;
            // this.form.testpaper_id = row.id
            // this.form.name = row.name
            // this.dialogVisibleData = false
        },

        // 提交
        submitForm(formName) {
            const that = this;
            that.$refs[formName].validate(async valid => {
                if (valid) {
                    let res = {};
                    that.form.create_time = null;
                    that.form.update_time = null;
                    if (!that.$route.query.id) {
                        if (this.form.testpaper_id == null)
                            return this.$message("请选择试卷");
                        res = await createExam({
                            exam: JSON.stringify(that.form),
                            class_ids: JSON.stringify(that.class_ids)
                        });
                    } else {
                        res = await updateExam({
                            exam: JSON.stringify(that.form),
                            class_ids: JSON.stringify(that.class_ids)
                        });
                    }
                    const { code, msg } = res.data;
                    if (code === "0000") {
                        sessionStorage.removeItem("testInfo");
                        that.$router.push({ name: "testInfo" });
                        that.$message.success("提交成功");
                    } else return that.$message(msg);
                } else {
                    that.$message("请填写完整！");
                    return false;
                }
            });
        },

        // 试卷管理
        testInfo() {
            this.$router.push({ name: "testInfo" });
        },

        // 关闭
        handleClose() {
            this.dialogVisibleData = false;
        }
    }
};
</script>

<style scoped>
/* 头部表格 */
table {
    border-color: #e4e9ec;
    border-collapse: collapse;
    border: 1px solid #e4e9ec;
    color: #777;
    margin-bottom: 20px;
    min-width: 720px;
}
table td {
    padding: 0 5px;
    white-space: nowrap;
}
.newQue-body {
    border: 1px solid #dbdfe6;
}
.newQue-body .new-body {
    padding: 30px 200px 30px 70px;
}
.wushi {
    display: inline-block;
}

.inputWid {
    width: 300px !important;
}
div.el-select {
    width: 220px;
}
input {
    width: 220px;
}
.paper-p {
    width: 500px;
    position: absolute;
    bottom: 0;
}
div.el-form-item {
    margin-bottom: 15px;
}
textarea {
    display: block;
    resize: none;
    padding: 5px 15px;
    line-height: 1.5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 500px;
    height: 100px;
    font-size: inherit;
    color: #606266;
    background-color: #fff;
    background-image: none;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
textarea:focus {
    outline: 0;
}
</style>
