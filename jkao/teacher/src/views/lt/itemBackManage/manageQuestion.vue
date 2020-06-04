<template>
    <el-card class="box-card f-new" id="manageQuestion">
        <previous-page goPreviousPage="/mpage"></previous-page>
        <!-- <new-tabs :active="2" level1="新增试题" level2="管理试题" level3="批量导入试题" @callback1="newQuestion" @callback3="batchLeadQuestion"></new-tabs> -->
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="客观题管理" name="first">
                <el-form
                    :inline="true"
                    :model="form"
                    size="mini"
                    style="padding: 20px 20px 0 20px;"
                    class="f-new-inp demo-form-inline"
                >
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="关键词  :">
                                <el-input clearable v-model="form.content"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="所属题库:">
                                <el-select clearable v-model="form.bank_id" placeholder="请选择">
                                    <el-option
                                        v-for="(item,index) in dbsList"
                                        :key="index"
                                        :label="item.name"
                                        :value="item.objective_bank_id"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="试题类型:">
                                <el-select v-model="form.type" placeholder="请选择" clearable>
                                    <el-option label="全部" value></el-option>
                                    <el-option label="单选题" value="1"></el-option>
                                    <el-option label="多选题" value="2"></el-option>
                                    <el-option label="判断题" value="3"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" style="text-align: right;">
                            <el-form-item label="试题难度:">
                                <el-select v-model="form.level" placeholder="请选择" clearable>
                                    <el-option label="全部" value></el-option>
                                    <el-option label="非常容易" value="1"></el-option>
                                    <el-option label="比较容易" value="2"></el-option>
                                    <el-option label="常规" value="3"></el-option>
                                    <el-option label="较难" value="4"></el-option>
                                    <el-option label="非常难" value="5"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="试题状态:">
                                <el-select v-model="form.open" placeholder="请选择" clearable>
                                    <el-option label="请选择" value></el-option>
                                    <el-option label="关闭" value="2"></el-option>
                                    <el-option label="开放" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="6">
                    <el-form-item label="时间排序:">
                        <el-select v-model="form.timeOrder" placeholder="请选择">
                            <el-option label="降序" value="1"></el-option>
                            <el-option label="升序" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                        </el-col>-->
                        <el-col class="fr txalign-c" :span="6">
                            <el-form-item>
                                <el-button class="search search-btn" @click="searchCX">搜索</el-button>
                                <el-button class="search search-btn" @click="clear">重置</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <div class="buttonStyle">
                        <el-button class="whiteBtn" @click="toaddQuestion">新增试题</el-button>
                        <el-button class="whiteBtn" @click="toBatch">批量导入</el-button>
                    </div>
                </el-form>

                <!-- 表格 -->
                <el-table :data="tableData" class="topBorder" style="width: 100%">
                    <el-table-column align="center" width="250" prop="number" label="试题编号"></el-table-column>
                    <el-table-column
                        align="center"
                        width="200"
                        prop="name"
                        label="名称"
                        max-width="300px"
                        :show-overflow-tooltip="true"
                    ></el-table-column>
                    <!-- <el-table-column align="center" width="150" prop="dbname" label="所属题库"></el-table-column> -->
                    <el-table-column align="center" label="试题类型" width="100">
                        <template slot-scope="scope">
                            <span v-if="scope.row.type == 1">单选</span>
                            <span v-if="scope.row.type == 2">多选</span>
                            <span v-if="scope.row.type == 3">判断</span>
                            <!-- <span v-if="scope.row.type == 4">实训</span> -->
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="试题状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.open == 1">开放</span>
                            <span v-if="scope.row.open == 2">关闭</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="是否锁定">
                        <template slot-scope="scope">
                            <span v-if="scope.row.locked == 1">锁定</span>
                            <span v-if="scope.row.locked == 2">未锁定</span>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column align="center" prop="shared" label="是否共享">
                        <template slot-scope="scope">
                            <span v-if="scope.row.shared == 1">共享</span>
                            <span v-else>私有</span>
                        </template>
                    </el-table-column>-->
                    <el-table-column align="center" show-overflow-tooltip label="试题题干">
                        <template slot-scope="scope">{{scope.row.content}}</template>
                    </el-table-column>
                    <el-table-column align="center" label="创建人" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.create_user_name }}
                            <br />
                            {{scope.row.create_time|fmtDate}}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="最后修改人">
                        <template slot-scope="scope">
                            {{scope.row.update_user_name}}
                            <br />
                            {{scope.row.update_time|fmtDate}}
                            <!-- {{ scope.row.qmodifyor_name }}
                            <br />
                            {{ scope.row.qmodifydate }}-->
                        </template>
                    </el-table-column>
                    <el-table-column align="center" width="150" label="操作">
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
                                <span
                                    class="cur-point dis-inline-block"
                                    @click="questionPut(scope.row)"
                                >
                                    <img src="@/assets/images/xiugai_icon.png" alt />
                                </span>
                            </el-tooltip>&nbsp;
                            <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                                <span class="cur-point dis-inline-block" @click="open(scope.row)">
                                    <img src="@/assets/images/shanchu_icon.png" alt />
                                </span>
                            </el-tooltip>&nbsp;
                            <el-tooltip class="item" effect="dark" content="锁题" placement="bottom">
                                <span
                                    class="cur-point dis-inline-block el-icon-lock"
                                    style="font-size: 17px; color: #528ef4;"
                                    @click="lockQuestion(scope.row)"
                                ></span>
                            </el-tooltip>&nbsp;
                            <el-tooltip class="item" effect="dark" content="复制" placement="bottom">
                                <span class="cur-point" @click="copy(scope.row)">
                                    <img src="@/assets/images/fuzhi_icon.png" alt />
                                </span>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
                <div class="block">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="form.pageNum"
                        :page-sizes="pagesizes"
                        :page-size="form.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total"
                    ></el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="实训题管理" name="second"></el-tab-pane>
        </el-tabs>

        <el-dialog title="提示" :visible.sync="dialogVisible" width="600px">
            <el-form
                :inline="true"
                :model="formInline"
                size="mini"
                class="demo-form-inline"
                label-width="100px"
            >
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="题号">
                            <el-input v-model="formInline.oldNumber"></el-input>
                        </el-form-item>
                        <el-form-item label="名称">
                            <el-input v-model="formInline.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="新题号">
                            <span>{{formInline.question_number}}</span>
                            <!-- <el-input placeholder="请输入题号" v-model="questionNumber"></el-input> -->
                        </el-form-item>
                        <el-form-item label="新名称">
                            <el-input v-model="formInline.question_name" placeholder="请输入名称"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="sure">确 定</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
    </el-card>
</template>

<script>
import { lockQu } from "@/api/taxUrl/question";
import newTabs from "@/components/newTabs";
import previousPage from "@/components/previousPage.vue";
import qs from "qs";
export default {
    name: "manageQuestion",
    data() {
        return {
            dbsList: [],
            dialogVisible: false,
            form: {
                content: "",
                bank_id: "",
                type: "",
                level: "",
                open: "",
                // timeOrder: "1",
                pageSize: 10,
                pageNum: 1
            },
            formInline: {
                question_number: "",
                question_name: "",
                oldNumber: "",
                name: "",
                question_uuid: ""
            },
            // 表格
            tableData: [],
            list: [],
            // 分页数据
            total: 10,
            pagesize: 10,
            pagesizes: [10, 20, 30, 40],
            pagenum: 1,
            aRoleid: sessionStorage.role_id,
            activeName: "first"

            // dialogData:{
            //     testNumber:'',
            //     oldName:'',
            //     newName:'',
            //     questionNumber:'',
            // }
        };
    },

    created() {
        this.getManageQuestion();
        this.getFindQuestionDbs();
    },
    components: {
        newTabs,
        "previous-page": previousPage
    },

    methods: {
        sure() {
            this.$utils
                .post(
                    this.reqApi.shuiwuUrl + "/question/obj/copyQu",
                    qs.stringify(this.formInline)
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.dialogVisible = false;
                        this.$message.success("复制成功！！");
                        this.getManageQuestion();
                    } else {
                        this.$message.error("复制失败");
                    }
                });
        },
        clear() {
            this.form.content = "";
            this.form.bank_id = "";
            this.form.level = "";
            this.form.open = "";
            this.getManageQuestion();
        },
        copy(row) {
            this.formInline.oldNumber = row.number;
            this.formInline.name = row.name;
            this.formInline.question_uuid = row.objective_question_uuid;
            this.$utils
                .post(this.reqApi.shuiwuUrl + "/common/getDateNumber")
                .then(res => {
                    if (res.data.code === "0000") {
                        this.formInline.question_number = res.data.dateNumber;
                    } else {
                        return this.$message.error(res.data.msg);
                    }
                });
            this.dialogVisible = true;
        },
        handleClick(tab, event) {
            if (this.activeName == "second") {
                this.$router.push({
                    name: "practicalTraining"
                });
            }
        },
        // 跳转到新增试题
        toaddQuestion() {
            this.$router.push({
                name: "newQuestion",
                query: {
                    flag: 1
                }
            });
        },
        toBatch() {
            this.$router.push({
                name: "batchLeadQuestion",
                query:{
                    objective:1
                }
            });
        },
        // 获取试题列表
        getManageQuestion() {
            this.$utils
                .post(
                    this.reqApi.shuiwuUrl + "/question/obj/listQu",
                    qs.stringify(this.form)
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.tableData = res.data.questions.list;
                        this.total = res.data.questions.total;
                        this.tableData.forEach(item => {
                            item.content = item.content
                                .replace(/<[^>]+>|&[^>]+;/g, "")
                                .trim();
                        });
                    }
                });
        },
        // 获取题库列表
        getFindQuestionDbs() {
            this.$utils
                .post(
                    this.reqApi.shuiwuUrl + "/question/obj/listBank",
                    qs.stringify({
                        pageSize: 999999
                    })
                )
                .then(res => {
                    this.dbsList = res.data.banks.list;
                });
        },
        async lockQuestion(row) {
            const {
                data: { code, msg }
            } = await lockQu({ uuid: row.objective_question_uuid });
            if (code == "0000") {
                this.$message.success("锁定成功");
                this.getManageQuestion();
            } else {
                this.$message.error(msg);
            }
        },
        copyQuestion(data) {
            if (data.shared == 0) return this.$message("无权限！无法操作");
            this.$utils
                .post(
                    `exam/sys/copyQuestion/${data.qid}/${sessionStorage.userId}`
                )
                .then(res => {
                    const { code, msg } = res.data;
                    if (code === "00") {
                        this.searchCX();
                        this.pagenum = 1;
                        this.$message.success("复制成功");
                    } else {
                        this.$message(msg);
                    }
                });
        },
        searchCX() {
            this.getManageQuestion();
        },

        // 分页
        handleSizeChange(val) {
            this.form.pageSize = val;
            this.getManageQuestion();
            // this.tableData = [];
            // this.pagenum = 1;
            // this.list.forEach((item, index) => {
            //     if (index < this.pagesize) return this.tableData.push(item);
            // });
        },

        handleCurrentChange(val) {
            this.form.pageNum = val;
            this.getManageQuestion();
            // this.tableData = [];
            // const currentIndex = this.pagesize * val;
            // this.list.forEach((item, index) => {
            //     let result = [];
            //     if (index < currentIndex) {
            //         result.push(item);
            //         if (index >= this.pagesize * (val - 1))
            //             return this.tableData.push(item);
            //     }
            // });
        },

        // addOption
        // newQuestion() {
        //     this.$router.push({ name: "newQuestion" });
        // },

        // 新增试题
        // addQuestionDbs() {
        //     this.$router.push({ name: "addQuestion" });
        // },

        // 批量导入试题
        // batchLeadQuestion() {
        //     this.$router.push({ name: "batchLeadQuestion" });
        // },

        // 修改
        questionPut(info) {
            if (
                this.aRoleid > "2" &&
                info.create_user_id != sessionStorage.userId
            ) {
                this.$message("无权限！无法操作");
            } else {
                this.$router.push({
                    name: "newQuestion",
                    query: { id: info.objective_question_uuid, flag: 1 }
                });
            }
        },

        // 删除
        open(info) {
            const that = this;
            if (
                this.aRoleid > "2" &&
                info.create_user_id != sessionStorage.userId
            ) {
                this.$message("无权限！无法操作");
            } else {
                that.$confirm(
                    "删除操作无法恢复，确定删除吗?",
                    "来自网页的消息",
                    {
                        cancelButtonText: "取消",
                        confirmButtonText: "确定"
                    }
                )
                    .then(() => {
                        that.$utils
                            .post(
                                that.reqApi.shuiwuUrl +
                                    "/question/obj/deleteQu",
                                qs.stringify({
                                    question_id: info.objective_question_uuid
                                })
                            )
                            .then(res => {
                                if (res.data.code === "0000") {
                                    this.$message.success("删除成功！");
                                    this.getManageQuestion();
                                } else {
                                    this.$message.error(res.data.msg);
                                }
                            });
                    })
                    .catch(() => {});
            }
        }
    }
};
</script>

<style scoped>
.buttonStyle {
    text-align: right;
    margin-bottom: 15px;
}
#manageQuestion .el-table td,
.el-table th {
    padding: 12px 0;
}
</style>
