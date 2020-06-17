<template>
    <el-card class="f-new box-card">
        <div v-if="$route.query.objective">
            <previous-page  goPreviousPage="/manageQuestion"></previous-page>
            <h3 class="titleText">客观题批量导入/导出</h3>
        </div>
         <div v-if="$route.query.practical">
            <previous-page goPreviousPage="/practicalTraining"></previous-page>
            <h3 class="titleText">实训题批量导入/导出</h3>
        </div>
        <div class="newQue-body">
            <div class="new-body">
                <!-- <p>请使用EXCEl作为模版文件,请注意格式要求,一种题型一个文件,多余的单元格可留空</p> -->
                <!-- <p>
                    <a @click="downLoad" href="javascript:;">下载Excel格式模版</a>请下载模版,并按照格式填写，填写完成后,上传文件即可完成导入
                </p>-->
                <el-form ref="form" :rules="rules" :model="form" label-width="100px">
                    <el-form-item>
                        <span style="color:red;font-size:12px">请先导出模板，再导入</span>
                    </el-form-item>
                    <el-form-item
                        label="所属题库:"
                        prop="objective_bank_id"
                        v-if="$route.query.objective"
                    >
                        <el-select v-model="form.objective_bank_id" placeholder="请选择">
                            <el-option
                                v-for="(item,index) in list"
                                :key="index"
                                :label="item.name"
                                :value="item.objective_bank_id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属题库:" prop="objective_bank_id" v-else>
                        <el-select v-model="form.practice_bank_id" placeholder="请选择">
                            <el-option
                                v-for="(item,index) in list"
                                :key="index"
                                :label="item.name"
                                :value="item.practice_bank_id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- <el-form-item label="选择课程:" prop="id">
                        <el-select v-model="form.id" placeholder="请选择">
                            <el-option
                                v-for="(item,index) in curriculumList"
                                :key="index"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>-->
                    <el-form-item>
                        <el-button @click="exportQs">导出</el-button>
                        <el-button @click="importQs">导入</el-button>
                    </el-form-item>
                    <el-form-item v-if="show">
                        <el-upload
                            class="upload-demo"
                            :action="url"
                            :show-file-list="false"
                            :before-upload="beforeUploadVideo"
                            :on-progress="uploadVideoProcess"
                            :on-success="handleVideoSuccess"
                            :on-error="fileError"
                            ref="uploadVue"
                            id="zujian"
                            :data="data1"
                            name="orign"
                            :on-exceed="handleExceed"
                            :file-list="fileList"
                        >
                            <el-button size="small" class="btnclass">
                                <i class="el-icon-plus"></i>选择文件
                            </el-button>
                            <!-- <div slot="tip" class="tipText" v-show="activeName=='other'">只能上传pdf/ppt/doc/文件，且不超过10M</div> -->
                            <!-- <div slot="tip" class="tipText" v-show="activeName=='video'">只能上传.mp4/ogg/webm文件，且不超过1G</div> -->
                        </el-upload>
                        <el-progress
                            v-if="videoFlag == true"
                            type="circle"
                            :percentage="videoUploadPercent"
                            style="margin-top:30px;"
                        ></el-progress>
                    </el-form-item>

                    <!-- <add-btn
                        class="text-center"
                        level1="提 交"
                        level2="取 消"
                        @submitForm="tmImport('form')"
                        @cancelForm="manageQuestion"
                    ></add-btn>-->
                </el-form>
            </div>
        </div>
    </el-card>
</template>

<script>
import newTabs from "@/components/newTabs";
import previousPage from "@/components/previousPage.vue";
import qs from "qs";
export default {
    data() {
        return {
            list: [],
            show: false,
            data1: {
                token: sessionStorage.getItem("token"),
                bankId: ""
            },
            fileList: [],
            url: "",
            videoFlag: false,
            videoUploadPercent: 0,
            curriculumList: [],
            afile: "",
            fromRouter: "",
            form: {
                file: {},
                objective_bank_id: "",
                practice_bank_id: "",
                id: ""
            },
            rules: {
                objective_bank_id: [
                    {
                        required: true,
                        message: "所属题库不能为空！",
                        trigger: "blur"
                    }
                ],
                id: [
                    {
                        required: true,
                        message: "选择课程不能为空！",
                        trigger: "blur"
                    }
                ],
                file: [
                    {
                        required: true,
                        message: "数据文件不能为空！",
                        trigger: "blur"
                    }
                ]
            }
        };
    },

    created() {
        this.getZJM();
        this.getFindQuestionDbs();
        // this.$utils.post("http://192.168.1.202:8086/teach_exam/excel/objOut");
    },
    mounted() {
        // `${this.reqApi.shuiwuUrl}/excel/objIn`

        // this.data1.bankId = this.form.objective_bank_id;
        if (this.$route.query.objective) {
            this.url = `${this.reqApi.shuiwuUrl}/excel/objIn`;
        } else if (this.$route.query.practical) {
            this.url = `${this.reqApi.shuiwuUrl}/zip/prcIn`;
        }
    },
    components: {
        newTabs,
        "previous-page": previousPage
    },

    methods: {
        exportQs() {
            if (this.$route.query.objective) {
                let token = sessionStorage.getItem("token");
                window.location.href = `${this.reqApi.shuiwuUrl}/excel/objOut?bankId=${this.form.objective_bank_id}&token=${token}`;
            } else if (this.$route.query.practical) {
                let token = sessionStorage.getItem("token");
                window.location.href = `${this.reqApi.shuiwuUrl}/zip/prcOut?bankId=${this.form.objective_bank_id}&token=${token}`;
            }
        },
        importQs() {
            this.show = true;
        },
        // 获取题库列表
        getFindQuestionDbs() {
            let url = "";
            if (this.$route.query.objective) {
                url = "/question/obj/listBank";
            } else if (this.$route.query.practical) {
                url = "/question/prc/listBank";
            }
            this.$utils
                .post(
                    this.reqApi.shuiwuUrl + url,
                    qs.stringify({
                        pageSize: 99999
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.list = res.data.banks.list;
                    }else {
                        this.$message.error(res.data.msg)
                    }
                });
        },
        // 课程
        getZJM() {
            this.$utils
                .post(
                    this.reqApi.shuiwuUrl + "/course/list",
                    qs.stringify({
                        pageSize: 9999
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.curriculumList = res.data.courses.list;
                    } else {
                        return this.$message.error(res.data.msg);
                    }
                });
        },
        // 选择文件
        getFile(event) {
            this.form.file = event.target.files[0];
            this.afile = event.target.files[0].name;
        },
        // 下载模版
        downLoad() {
            this.$utils({
                method: "post",
                url: "/exam/tmDownload/1",
                responseType: "blob"
            }).then(res => {
                const type = "application/zip"; //ZIP文件
                const blob = new Blob([res.data], { type: type });
                const fileName = "批量导入模版";
                const elink = document.createElement("a");
                elink.download = fileName;
                elink.style.display = "none";
                elink.href = window.URL.createObjectURL(blob);
                document.body.appendChild(elink);
                elink.click();
                URL.revokeObjectURL(elink.href);
                document.body.removeChild(elink);
            });
        },
        // addOption
        newQuestion() {
            this.$router.push({ name: "newQuestion" });
        },
        // 管理试题
        manageQuestion() {
            this.$router.push({ name: "manageQuestion" });
        },

        // 提交
        tmImport(formName) {
            const that = this;
            that.$refs[formName].validate(valid => {
                if (valid) {
                    let obj = that.form;
                    let formData = new FormData();
                    Object.keys(obj).forEach(key => {
                        formData.append(key, obj[key]);
                    });
                    that.$utils.post("exam/tmImport", formData).then(res => {
                        const { code, msg } = res.data;
                        if (code === "00") {
                            that.$message.success("添加成功！");
                            that.$router.push({ name: "manageQuestion" });
                        } else return that.$message(msg);
                    });
                } else {
                    that.$message("请填写完整!");
                    return false;
                }
            });
        },
        handleVideoSuccess(res, file, fileList) {
            if (res.code === "0000") {
                this.videoFlag = false;
                this.$message.success("上传成功");
                if (this.$route.query.objective) {
                    this.$router.push("/manageQuestion");
                } else if (this.$route.query.practical) {
                    this.$router.push("/practicalTraining");
                }
            }
        },
        handleExceed() {},
        // 上传进度
        uploadVideoProcess(event, file, fileList) {
            this.videoFlag = true;
            this.videoUploadPercent = file.percentage;
        },
        // 上传前，判断文件类型大小
        beforeUploadVideo(file) {
            if (this.$route.query.objective) {
                this.data1.bankId = this.form.objective_bank_id;
                const isLt10M = file.size / 1024 / 1024 < 1;
                var FileExt = file.name.replace(/.+\./, "");
                if (["excel"].indexOf(FileExt.toLowerCase()) === -1) {
                    this.$message({
                        type: "warning",
                        message: "请上传后缀名为excel的附件！"
                    });
                    this.videoFlag = false;
                    return;
                }
            } else if (this.$route.query.practical) {
                this.data1.bankId = this.form.practice_bank_id;
                  const isLt10M = file.size / 1024 / 1024 < 10;
                var FileExt = file.name.replace(/.+\./, "");
                if (["zip"].indexOf(FileExt.toLowerCase()) === -1) {
                    this.$message({
                        type: "warning",
                        message: "请上传后缀名为excel的附件！"
                    });
                    this.videoFlag = false;
                    return;
                }

            }
        },
        // 上传失败
        fileError(err, file, fileList) {
            if (file.status == "fail") {
                this.$refs.uploadVue.clearFiles();
                this.videoFlag = false;
                this.$message.error("上传失败！！！");
            }
            // this.$refs.uploadVue.clearFiles()
        }
    }
};
</script>

<style scoped>
.newQue-body {
    border: 1px solid #dbdfe6;
}
.newQue-body .new-body {
    padding: 25px 60px;
}
.newQue-body .new-body p {
    color: #c3c3c3;
    height: 30px;
    position: relative;
}
.newQue-body .new-body p::before {
    display: inline-block;
    content: "";
    position: absolute;
    left: -22px;
    top: 5px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: #f6ad42;
}
.newQue-body .new-body p:nth-child(2):before {
    background-color: #54c9de;
}
a {
    color: #31b5ff;
}
div.el-form-item {
    margin-bottom: 12px;
}
/* 选择文件 */
.upload {
    padding: 6px 10px;
    height: 30px;
    line-height: 30px;
    position: relative;
    border: 1px solid #c7eff5;
    background-color: #c7eff5;
    text-decoration: none;
    color: #666;
    border-radius: 0 4px 4px 0;
    left: -4px;
    top: 1px;
}
input {
    width: 310px;
    border-radius: 4px 0 0 4px;
}

div.el-select {
    width: 370px !important;
}
.change {
    position: absolute;
    overflow: hidden;
    right: 0;
    top: 0;
    opacity: 0;
    height: 30px;
}
.titleText {
    margin-left: 20px;
    margin-top: 10px;
}
</style>