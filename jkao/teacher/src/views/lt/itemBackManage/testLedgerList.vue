<template>
    <el-card class="new-class f-new box-card" id="accountSet">
        <div class="topPadding">
            <h3 class="headline2">试题账套</h3>
            <previous-page goPreviousPage="/mpage" style="float: right;display: inline-block;"></previous-page>
            <el-form :inline="true" :model="formInline" size="mini" class="demo-form-inline">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="创建日期：">
                            <el-date-picker
                                style="width: 300px;"
                                type="daterange"
                                @input="Panchange"
                                v-model="createTim"
                                range-separator="-"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="账套名称：">
                            <el-input
                                placeholder="请输入关键词"
                                clearable
                                style="width: 300px;"
                                v-model="formInline.name"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" class="serchbox">
                        <el-button
                            type="primary"
                            style="background-color:#444;color:#fff;border:1px solid #444;"
                            @click="search"
                        >搜索</el-button>
                        <el-button class="search search-btn" @click="clear">重置</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="addBtnBox">
            <el-button @click="addCompany">新增</el-button>
            <el-button class="whiteBtn" @click="toBatch">导入账套</el-button>
        </div>
        <el-table ref="multipleTable" :data="tableData" class="topBorder" style="width: 100%">
            <el-table-column prop="name" label="账套名称" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="remark" label="备注" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="状态" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.lock=='Y'">锁定</span>
                    <span v-else>未锁定</span>
                </template>
            </el-table-column>
            <!-- <el-table-column label="共享" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.shared=='1'">共享</span>
                    <span v-else>私有</span>
                </template>
            </el-table-column>-->
            <el-table-column prop="flow" label="流水号" align="center"></el-table-column>
            <el-table-column label="创建时间" align="center">
                <template slot-scope="scope">{{scope.row.createTime | fmtDate1}}</template>
            </el-table-column>
            <el-table-column label="操作" width="200" align="center" fixed="right">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" content="修改" placement="bottom">
                        <span class="cur-point dis-inline-block">
                            <img
                                src="@/assets/images/xiugai_icon.png"
                                @click="editCompany(scope.row)"
                            />&nbsp;&nbsp;&nbsp;
                        </span>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="详情" placement="bottom">
                        <span class="cur-point dis-inline-block">
                            <img src="@/assets/images/chaxun_icon.png" @click="detail(scope.row)" />&nbsp;&nbsp;&nbsp;
                        </span>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="账套导出" placement="bottom">
                        <!-- <span
                            class="cur-point dis-inline-block"
                            @click="exportAccountSet(scope.row)"
                        >账套导出</span>-->
                        <img
                            src="@/assets/images/zhangtaodaochu_icon.png"
                            @click="exportAccountSet(scope.row)"
                        />
                    </el-tooltip>&nbsp;&nbsp;&nbsp;
                    <el-tooltip
                        class="item cur-point"
                        effect="dark"
                        content="解锁"
                        placement="bottom"
                        v-if="scope.row.lock=='Y'"
                    >
                        <span class="cur-point" @click="lockQuestion(scope.row)">
                            <img src="@/assets/images/jiesuo_icon.png" alt />
                        </span>
                    </el-tooltip>
                    <el-tooltip
                        v-if="scope.row.lock=='N'"
                        class="item"
                        effect="dark"
                        content="锁定"
                        placement="bottom"
                    >
                        <!-- <span
                            class="cur-point dis-inline-block el-icon-lock"
                            style="font-size: 17px; color: #5691F6;"
                            @click="lockQuestion(scope.row)"
                        ></span>&nbsp;-->
                        <span class="cur-point" @click="lockQuestion(scope.row)">
                            <img src="@/assets/images/suo_icon.png" alt />
                        </span>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <!-- 新增 -->
        <el-dialog title="提示" :visible.sync="dialogVisible" width="450px">
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-form-item label="账套名称" prop="name">
                    <el-input class="inputWidth" maxlength="50" v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input class="inputWidth" maxlength="50" v-model="ruleForm.remark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="submit('ruleForm')">确 定</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
        <!-- 修改 -->
        <el-dialog title="提示" :visible.sync="dialogVisible1" width="450px">
            <el-form
                :model="ruleForm1"
                :rules="rules1"
                ref="ruleForm1"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-form-item label="账套名称" prop="name">
                    <el-input class="inputWidth" v-model="ruleForm1.name" maxlength="50"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input class="inputWidth" maxlength="50" v-model="ruleForm1.remark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="submit1('ruleForm1')">确 定</el-button>
                <el-button @click="dialogVisible1 = false">取 消</el-button>
            </span>
        </el-dialog>
        <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="formInline.pageNum"
                :page-sizes="[10,20,30,40]"
                :page-size="formInline.pageSize"
                background
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                class="pagination"
            ></el-pagination>
        </div>
    </el-card>
</template>
<script>
import qs from "qs";
import newTabs from "@/components/newTabs";
import previousPage from "@/components/previousPage.vue";
export default {
    data() {
        return {
            formInline: {
                name: "",
                createTimeStart: "",
                createTimeEnd: "",
                pageNum: 1,
                pageSize: 10
            },
            ruleForm: {
                name: "",
                type: "N",
                remark: ""
            },
            ruleForm1: {
                name: "",
                // type: "N",
                remark: ""
            },
            tableData: [],
            dialogVisible: false,
            dialogVisible1: false,
            total: 0,
            createTim: [], //创建时间
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入账套名称",
                        trigger: "change"
                    }
                ]
            },
            rules1: {
                name: [
                    {
                        required: true,
                        message: "请输入账套名称",
                        trigger: "change"
                    }
                ]
            },
            accountCode: ""
        };
    },
    components: {
        newTabs,
        "previous-page": previousPage
    },
    created() {
        this.getCompanyList();
    },
    mounted() {
        if (sessionStorage.getItem("activeName")) {
            sessionStorage.removeItem("activeName");
        }
    },
    methods: {
        lockQuestion(row) {
            let title = "";
            if (row.lock == "N") {
                title = "确定锁定该账套？";
            } else {
                title = "确认解锁该账套？";
            }
            this.$confirm(title, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
            })
                .then(() => {
                    if (row.lock == "Y") {
                        this.$utils
                            .post(
                                this.reqApi.xinls + "/exam/account/unlock",
                                qs.stringify({
                                    accountCode: row.code
                                })
                            )
                            .then(res => {
                                if (res.data.code === "0000") {
                                    this.$message.success("操作成功");
                                    this.getCompanyList();
                                } else {
                                    return this.$message.error(res.data.msg);
                                }
                            });
                    } else {
                        this.$utils
                            .post(
                                this.reqApi.xinls + "/exam/account/locked",
                                qs.stringify({
                                    accountCode: row.code
                                })
                            )
                            .then(res => {
                                if (res.data.code === "0000") {
                                    this.$message.success("操作成功");
                                    this.getCompanyList();
                                } else {
                                    return this.$message.error(res.data.msg);
                                }
                            });
                    }
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消"
                    });
                });
        },
        clear() {
            this.createTim = [];
            this.formInline.createTimeStart = "";
            this.formInline.createTimeEnd = "";
            this.formInline.name = "";
            this.getCompanyList();
        },
        toBatch() {
            this.$router.push({
                name: "batchImportPage"
            });
        },
        // 账套导出
        exportAccountSet(row) {
            window.location.href = `${this.reqApi.xinls}/exam/accouunt/output?accountCode=${row.code}`;
            return;
            // 以下是excel表格导出方法，废弃
            window.location.href =
                "http://47.103.211.239:8086/exam/accouunt/output?accountCode=14db64b8010040e283f31d059614d03f";
            // return;
            this.accountCode = "14db64b8010040e283f31d059614d03f";
            let url =
                "http://47.103.211.239:8086/exam/accouunt/output?accountCode=14db64b8010040e283f31d059614d03f";
            this.$utils({
                url: url,
                method: "post",
                headers: {
                    "content-type": "application/json; charset=utf-8"
                },
                // responseType: 'arraybuffer'
                responseType: "blob"
                // data:{
                //  accountCode:this.accountCode
                // }
            }).then(res => {
                const type = "application/vnd.ms-excel";
                const blob = new Blob([res.data], { type: type });
                const fileName = "账套导入模版";
                const elink = document.createElement("a");
                elink.download = fileName;
                elink.style.display = "none";
                elink.href = window.URL.createObjectURL(blob);
                document.body.appendChild(elink);
                elink.click();
                URL.revokeObjectURL(elink.href);
                document.body.removeChild(elink);
            });
            // this.$utils.post(url,qs.stringify({
            //   accountCode:this.accountCode
            // })).then(res=>{
            //   console.log(res)
            //   // const blob = new Blob([_res.data], { type: 'application/vnd.ms-excel;' })

            // })
        },
        importAccountSet() {},
        // copy(row) {
        //     console.log(row)
        //     this.$utils
        //         .post(
        //             this.reqApi.xinls + "/exam/account/copy",
        //             qs.stringify({
        //                 code:
        //                 questionCode
        //                 name
        //             })
        //         )
        //         .then(res => {
        //             if (res.data.code === "0000") {
        //                 this.$message.success("复制成功！！");
        //                 this.getCompanyList();
        //             }else {
        //                 this.$message.error(res.data.msg)
        //             }
        //         });
        // },
        detail(info) {
            // 存账套编号questionUUid
            sessionStorage.setItem("questionUUid", info.code);
            sessionStorage.setItem("tag", 1);
            if (sessionStorage.getItem("activeName")) {
                sessionStorage.removeItem("activeName");
            }
            this.$router.push({
                name: "dictionary",
                query: {
                    name: info.name
                }
                // query:{
                //   questionCode:info.code,
                //   tag:1
                // }
            });
        },
        submit(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$utils
                        .post(
                            this.reqApi.xinls + "/exam/account/add",
                            qs.stringify(this.ruleForm)
                        )
                        .then(res => {
                            if (res.data.code === "0000") {
                                this.dialogVisible = false;
                                this.$message.success("提交成功！！");
                                this.$refs[formName].clearValidate();
                                this.getCompanyList();
                            }
                        });
                } else {
                    return false;
                }
            });
        },
        submit1(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$utils
                        .post(
                            this.reqApi.xinls + "/exam/account/update",
                            qs.stringify(this.ruleForm1)
                        )
                        .then(res => {
                            if (res.data.code === "0000") {
                                this.dialogVisible1 = false;
                                this.$message.success("提交成功！！");
                                this.getCompanyList();
                            } else {
                                this.$message.error(res.data.msg);
                            }
                        });
                } else {
                    return false;
                }
            });
        },
        Panchange(e) {
            if (e == null) {
                this.formInline.createTimeStart = "";
                this.formInline.createTimeEnd = "";
            } else {
                this.formInline.createTimeStart = this.$moment(e[0]).format(
                    "YYYY-MM-DD"
                );
                this.formInline.createTimeEnd = this.$moment(e[1]).format(
                    "YYYY-MM-DD"
                );
            }
        },
        // 搜索
        search() {
            this.getCompanyList();
        },
        getCompanyList() {
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/account/list",
                    qs.stringify(this.formInline)
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.tableData = res.data.data.list;
                        this.total = res.data.data.total;
                    } else {
                        return this.$message.error(res.data.msg);
                    }
                });
        },
        // 新增
        addCompany() {
            this.dialogVisible = true;
            return;
            this.$router.push({ name: "addCompany" });
        },
        //编辑
        editCompany(info) {
            this.ruleForm1.name = info.name;
            this.ruleForm1.remark = info.remark;
            this.ruleForm1.code = info.code;
            this.dialogVisible1 = true;
            // this.$router.push({
            //     name: "addCompany",
            //     query: { id: info.id }
            // });
        },
        // 账套
        zhangtao(info) {
            sessionStorage.setItem("companyId", info.id);
            this.$router.push({
                name: "teacherPublicRole",
                query: { teacher: "Y" }
            });
        },
        // 删除
        delCompany(info) {
            const that = this;
            if (this.role_id == "3" && info.create_user_id != this.userId) {
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
                                that.reqApi.shuiwuUrl + "/company/delete",
                                qs.stringify({
                                    company_id: info.id
                                })
                            )
                            .then(res => {
                                const { code, msg } = res.data;
                                if (code === "0000") {
                                    that.getCompanyList();
                                    that.$message.success("删除成功！");
                                } else return that.$message(msg);
                            });
                    })
                    .catch(() => {});
            }
        },
        handleSizeChange(val) {
            this.formInline.pageSize = val;
            this.getCompanyList();
        },
        handleCurrentChange(val) {
            this.formInline.pageNum = val;
            this.getCompanyList();
        }
    }
};
</script>
<style scoped>
.inputWidth {
    width: 300px;
}
.headline2 {
    padding-left: 0px;
}
.addBtnBox {
    text-align: right;
    margin-right: 20px;
    margin-bottom: 20px;
}
.topPadding {
    padding: 0;
    padding-left: 20px;
}
</style>
