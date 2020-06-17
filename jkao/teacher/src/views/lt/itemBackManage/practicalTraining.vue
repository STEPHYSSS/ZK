<template>
    <el-card class="box-card f-new" id="manageQuestion">
        <previous-page goPreviousPage="/mpage"></previous-page>
        <!-- <new-tabs :active="2" level1="新增试题" level2="管理试题" level3="批量导入试题" @callback1="newQuestion" @callback3="batchLeadQuestion"></new-tabs> -->
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="客观题管理" name="first"></el-tab-pane>
            <el-tab-pane label="实训题管理" name="second">
                <el-form
                    :inline="true"
                    :model="form"
                    size="mini"
                    style="padding:0px 20px 0px 20px;"
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
                                        :value="item.practice_bank_id"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="6">
                            <el-form-item label="试题类型:">
                                <el-select v-model="form.type" placeholder="请选择">
                                    <el-option label="全部" value="0"></el-option>
                                    <el-option label="单选题" value="1"></el-option>
                                    <el-option label="多选题" value="2"></el-option>
                                    <el-option label="实训题" value="4"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>-->
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
                        <el-col :span="6" style="text-align: right;">
                            <el-form-item label="试题状态:">
                                <el-select v-model="form.open" placeholder="请选择" clearable>
                                    <el-option label="关闭" :value="2"></el-option>
                                    <el-option label="开放" :value="1"></el-option>
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
                    </el-row>
                    <el-row>
                        <el-col class="fr text-right" :span="6">
                            <!-- <el-form-item> -->
                            <el-button
                                class="search search-btn"
                                @click="searchCX"
                                style="margin-bottom:10px;"
                            >搜索</el-button>
                            <el-button
                                class="search search-btn"
                                @click="clear"
                                style="margin-bottom:10px;"
                            >重置</el-button>
                            <!-- </el-form-item> -->
                        </el-col>
                    </el-row>
                    <div class="buttonStyle">
                        <el-button class="whiteBtn" @click="toaddQuestion">新增</el-button>
                        <el-button @click="toBatch">批量导入</el-button>
                    </div>
                </el-form>

                <!-- 表格 -->
                <el-table :data="tableData" class="topBorder" style="width: 100%">
                    <el-table-column align="center" prop="number" label="试题编号"></el-table-column>
                    <el-table-column align="center" prop="name" label="名称"></el-table-column>
                    <!-- <el-table-column align="center" prop="dbname" label="所属题库"></el-table-column> -->
                    <el-table-column align="center" label="试题类型">
                        <template slot-scope="scope">
                            <!-- <span v-if="scope.row.type == 1">普通</span>
                            <span v-if="scope.row.type == 2">综合</span>-->
                            <!-- <span v-if="scope.row.type == 3">判断</span> -->
                            <span v-if="scope.row.type == 1">普通实训</span>
                            <span v-if="scope.row.type == 2">综合实训</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="试题状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.open == 2">不开放</span>
                            <span v-if="scope.row.open == 1">开放</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="锁定状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.locked == 1">已锁定</span>
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
                    <el-table-column align="center" label="创建人">
                        <template slot-scope="scope">
                            {{ scope.row.create_user_name }}
                            <br />
                            {{scope.row.create_time|fmtDate}}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="最后修改人">
                        <template slot-scope="scope">
                            {{ scope.row.update_user_name }}
                            <br />
                            {{scope.row.update_time|fmtDate}}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" width="160" label="操作" fixed="right">
                        <template slot-scope="scope">
                            <el-tooltip
                                class="item"
                                effect="dark"
                                :content="scope.row.locked==2?'编辑':'查看详情'"
                                placement="bottom"
                            >
                                <span
                                    class="cur-point dis-inline-block"
                                    @click="questionPut(scope.row)"
                                >
                                    <img
                                        v-if="scope.row.locked==2"
                                        src="@/assets/images/xiugai_icon.png"
                                        alt
                                    />
                                    <img v-else src="@/assets/images/zicejilu_icon.png" alt />
                                </span>
                            </el-tooltip>&nbsp;&nbsp;
                            <!-- <span class="cur-point dis-inline-block" @click="copyQuestion(scope.row)">
            <img src="@/assets/images/xiugai_icon.png" alt="">&nbsp;&nbsp;&nbsp;
                            </span>-->
                            <!-- 复制试题 -->
                            <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                                <span class="cur-point dis-inline-block" @click="open(scope.row)">
                                    <img src="@/assets/images/shanchu_icon.png" alt />
                                </span>
                            </el-tooltip>&nbsp;&nbsp;
                            <el-tooltip
                                v-if="scope.row.locked==2"
                                class="item"
                                effect="dark"
                                content="锁题"
                                placement="bottom"
                            >
                                <!-- <span
                                    class="cur-point dis-inline-block el-icon-lock"
                                    style="font-size: 17px; color: #5691F6;"
                                    @click="lockQuestion(scope.row)"
                                ></span> -->
                                 <span class="cur-point"  @click="lockQuestion(scope.row)">
                                    <img src="@/assets/images/suo_icon.png" alt />
                                </span>
                            </el-tooltip>
                            <el-tooltip v-if="scope.row.locked==1" class="item" effect="dark" content="解锁" placement="bottom">
                                  <span class="cur-point"  @click="lockQuestion(scope.row)">
                                    <img src="@/assets/images/jiesuo_icon.png" alt />
                                </span>
                            <!-- <i class="el-icon-unlock" style="font-size: 17px; color: #5691F6;"  @click="lockQuestion(scope.row)"></i> -->
                            </el-tooltip>&nbsp;&nbsp;
                            <el-tooltip class="item" effect="dark" content="复制" placement="bottom">
                                <span class="cur-point" @click="copy(scope.row)">
                                    <img src="@/assets/images/fuzhi_icon.png" alt />
                                </span>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                </el-table>
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
                                    <el-input
                                        v-model="formInline.question_name"
                                        placeholder="请输入名称"
                                    ></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="sure">确 定</el-button>
                        <el-button @click="dialogVisible = false">取 消</el-button>
                    </span>
                </el-dialog>
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
        </el-tabs>
    </el-card>
</template>

<script>
import newTabs from "@/components/newTabs";
import previousPage from "@/components/previousPage.vue";
import qs from "qs";
export default {
    name: "manageQuestion",
    data() {
        return {
            dbsList: [],
            form: {
                content: "",
                bank_id: "",
                type: "",
                level: "",
                open: "",
                pageNum: 1,
                pageSize: 10
                // timeOrder: "1"
            },
            // 表格
            tableData: [],
            list: [],
            // 分页数据
            total: 10,
            pagesizes: [10, 20, 30, 40],
            aRoleid: sessionStorage.aRoleid,
            activeName: "second",
            dialogVisible: false,
            formInline: {
                question_number: "",
                question_name: "",
                oldNumber: "",
                name: "",
                question_uuid: ""
            }
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
        clear() {
            this.form.content = "";
            this.form.bank_id = "";
            this.form.level = "";
            this.form.open = "";
            this.getManageQuestion();
        },
        sure() {
            this.$utils
                .post(
                    this.reqApi.shuiwuUrl + "/question/prc/copyQuOld",
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
        copy(row) {
            this.formInline.oldNumber = row.number;
            this.formInline.name = row.name;
            this.formInline.question_uuid = row.practice_question_uuid;
            this.$utils
                .post(this.reqApi.shuiwuUrl + "/common/getDateNumber",  qs.stringify({type: 'P'}))
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
            if (this.activeName == "first") {
                this.$router.push({
                    name: "manageQuestion"
                });
            }
        },
        // 跳转到新增试题
        toaddQuestion() {
            this.$router.push({
                name: "newQuestion",
                query: {
                    flag1: 2
                }
            });
        },
        toBatch() {
            this.$router.push({
                name: "batchLeadQuestion",
                query: {
                    practical: 1
                }
            });
        },
        // 锁定
        lockQuestion(row) {
            if (row.locked == 1) {
                this.$confirm("确认解锁该题目？", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消"
                }).then(() => {
                    this.$utils
                        .post(
                            this.reqApi.shuiwuUrl + "/question/prc/unlock",
                            qs.stringify({
                                question_uuid:
                                    row.practice_question_uuid
                            })
                        )
                        .then(res => {
                            if (res.data.code === "0000") {
                                this.$message.success("解锁成功");
                                this.getManageQuestion();
                            }else {
                                return this.$message.error(res.data.msg)
                            }
                        })
                }).catch(() => {
                            this.$message({
                                type: "info",
                                message: "已取消"
                            });
                        });
            }else {
                 this.$utils
                .post(
                    this.reqApi.xinls + "/exam/grade/point",
                    qs.stringify({
                        questionCode: row.practice_question_uuid
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        if (row.locked == 1) {
                            return this.$message.error("题目已锁定！");
                        }
                        this.$utils
                            .post(
                                this.reqApi.shuiwuUrl + "/question/prc/lockQu",
                                qs.stringify({
                                    uuid: row.practice_question_uuid
                                })
                            )
                            .then(res => {
                                if (res.data.code === "0000") {
                                    this.$message.success("锁定成功！");
                                    this.getManageQuestion();
                                } else {
                                    this.$message.error(res.data.msg);
                                }
                            });
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });
            }

        },
        // 获取试题列表
        getManageQuestion() {
            this.$utils
                .post(
                    this.reqApi.shuiwuUrl + "/question/prc/listQu",
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
                    this.reqApi.shuiwuUrl + "/question/prc/listBank",
                    qs.stringify({
                        pageSize: 999999
                    })
                )
                .then(res => {
                    this.dbsList = res.data.banks.list;
                });
        },
        copyQuestion(data) {
            if (data.shared == 0) return this.$message("无权限！无法操作");
            this.$utils
                .post(`exam/sys/copyQuestion/${data.qid}/${sessionStorage.aId}`)
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
        },

        handleCurrentChange(val) {
            this.form.pageNum = val;
            this.getManageQuestion();
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
            this.$router.push({
                name: "newQuestion",
                query: { qid: info.practice_question_uuid, flag1: 2 }
            });
            return;
            if (
                this.aRoleid == "teacher" &&
                info.qposter != sessionStorage.aId
            ) {
                this.$message("无权限！无法操作");
            } else {
                this.$router.push({
                    name: "newQuestion",
                    query: { id: info.qid }
                });
            }
        },

        // 删除
        open(info) {
            this.$utils
                .post(
                    this.reqApi.shuiwuUrl + "/question/prc/deleteQu",
                    qs.stringify({
                        question_id: info.practice_question_uuid
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.$message.success("删除成功！！");
                        this.getManageQuestion();
                    }
                });
            return;
            const that = this;
            if (
                this.aRoleid == "teacher" &&
                info.qposter != sessionStorage.aId
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
                            .post(`exam/sys/delQuestion/${info.qid}`)
                            .then(res => {
                                const { code, msg } = res.data;
                                if (code === "00") {
                                    that.$message.success(msg);
                                    that.tableData = [];
                                    that.searchCX();
                                } else return that.$message(msg);
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
</style>
