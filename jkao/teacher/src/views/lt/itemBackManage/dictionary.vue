<template>
    <div class="dicitonary">
        <div class="Case">
            <div class="left">
                <div class="store_list">
                    <div class="title">字典列表</div>
                    <div class="searchList">
                        <template>
                            <!-- @row-click="examRow" -->
                            <el-table
                                :data="tableData"
                                max-height="600px"
                                ref="singleTable"
                                border
                                style="width: 100%"
                                @current-change="chooseOne"
                            >
                                <el-table-column label width="55" align="center">
                                    <template slot-scope="scope">
                                        <el-radio
                                            class="radio"
                                            v-model="radioList"
                                            :label="scope.row.code"
                                            @change="changeRadio(scope.row)"
                                        >&nbsp;</el-radio>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="code" label="字典编码" align="center"></el-table-column>
                                <el-table-column prop="name" label="字典名称" align="center"></el-table-column>
                            </el-table>
                        </template>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="tab">
                    <div class="shopList">
                        <div class="title1">字典项列表</div>
                        <div class="addStore buttonbox">
                            <el-button class="increase themeColor" @click="adddicitonary">
                                <i class="el-icon-plus"></i>新增
                            </el-button>
                        </div>
                        <el-table :data="dictionaryList" style="width: 100%" border>
                            <el-table-column prop="name" label="字典项名称" width align="center"></el-table-column>
                            <el-table-column prop="value" label="字典项值" width align="center"></el-table-column>
                            <el-table-column
                                prop="description"
                                label="备注 "
                                align="center"
                                :show-overflow-tooltip="true"
                            ></el-table-column>
                            <el-table-column label="操作" align="center">
                                <template slot-scope="scope">
                                    <el-tooltip
                                        class="item"
                                        effect="dark"
                                        content="编辑"
                                        placement="bottom"
                                    >
                                        <a href="javascript:void(0);">
                                            <img
                                                src="@/assets/images/xiugai_icon.png"
                                                @click="editor(scope.row)"
                                            />
                                        </a>
                                    </el-tooltip>&nbsp;&nbsp;&nbsp;
                                    <el-tooltip
                                        class="item"
                                        effect="dark"
                                        content="删除"
                                        placement="bottom"
                                    >
                                        <span class="cur-point dis-inline-block">
                                            <img
                                                src="@/assets/images/shanchu_icon.png"
                                                @click="del(scope.row)"
                                            />
                                        </span>
                                    </el-tooltip>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
        <!-- 新增 -->
        <el-dialog title="新增" :visible.sync="Visible" width="550px" v-model="Visible">
            <el-form
                :model="addfrom"
                :rules="rules"
                ref="addfrom"
                label-width="140px"
                class="demo-ruleForm"
            >
                <el-form-item label="字典项名称" prop="name">
                    <el-input
                        class="inputWidth"
                        maxlength="50"
                        v-model="addfrom.name"
                        placeholder="请输入"
                    ></el-input>
                </el-form-item>
                <el-form-item label="字典项值" prop="value">
                    <el-input
                        class="inputWidth"
                        maxlength="50"
                        v-model="addfrom.value"
                        placeholder="请输入"
                    ></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input
                        type="textarea"
                        class="inputWidth"
                        maxlength="100"
                        v-model="addfrom.description"
                        placeholder="选填，不超过20个字符"
                    ></el-input>
                </el-form-item>
                <div class="labelSty">
                    <el-button class="AllquedingBtn" @click="adddetermine('addfrom')">确定</el-button>
                    <el-button class="theBtn resetButton" @click="quxiao('addfrom')">取消</el-button>
                </div>
            </el-form>
        </el-dialog>
        <!-- 编辑 -->
        <el-dialog title="编辑" :visible.sync="dialogVisible" width="550px" v-model="dialogVisible">
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="140px"
                class="demo-ruleForm"
            >
                <el-form-item label="字典项名称" prop="name">
                    <el-input class="inputWidth" maxlength="50" v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="字典项值" prop="value">
                    <el-input
                        class="inputWidth"
                        maxlength="50"
                        v-model="ruleForm.value"
                        readonly="readonly"
                    ></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="description">
                    <el-input
                        class="inputWidth"
                        maxlength="100"
                        type="textarea"
                        v-model="ruleForm.description"
                    ></el-input>
                </el-form-item>
                <div class="labelSty">
                    <el-button class="AllquedingBtn" @click="determine('ruleForm')">确定</el-button>
                    <el-button class="theBtn resetButton" @click="reset('ruleForm')">取消</el-button>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import qs from "qs";
export default {
    data() {
        return {
            form: {
                code: "",
                name: "",
                pageSize: 9999,
                questionCode: sessionStorage.getItem("questionUUid")
            },
            tableData: [],
            radioList: "",
            code: "",
            dictionaryList: [],
            addfrom: {
                code: "",
                name: "",
                value: "",
                description: "",
                questionCode: sessionStorage.getItem("questionUUid")
            },
            Visible: false,
            dialogVisible: false,
            ruleForm: {
                name: "",
                value: "",
                description: "",
                id: "",
                questionCode: ""
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入字典项名称",
                        trigger: "blur"
                    }
                ],
                value: [
                    {
                        required: true,
                        message: "请输入字典项值",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    created() {
        this.getList();
    },
    methods: {
        quxiao(formName){
            this.Visible=false
            this.$refs[formName].resetFields();
            this.addfrom.description=''
        },
        reset(formName){
            this.dialogVisible=false
            this.$refs[formName].resetFields();
            this.ruleForm.description=''
        },
        getList() {
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/dictionary/type/list",
                    qs.stringify(this.form)
                )
                .then(res => {
                    if (res.data.code == "0000") {
                        this.tableData = res.data.data;
                    }
                });
        },
        changeRadio() {},
        chooseOne(row) {
            this.radioList=row.code
            this.code = row.code;
            this.getSubList();
        },
        getSubList() {
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/dictionary/list",
                    qs.stringify({
                        code: this.code,
                        questionCode: sessionStorage.getItem("questionUUid")
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.dictionaryList = res.data.data;
                    } else {
                        return this.$message.error(res.data.msg);
                    }
                });
        },
        adddicitonary() {
            this.Visible = true;
        },
        editor(row) {
            this.dialogVisible = true;
            this.ruleForm = row;
            this.getSubList()
        },
        del(row) {
            this.$confirm("确定删除?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
            })
                .then(() => {
                    this.$utils
                        .post(
                            this.reqApi.xinls + "/exam/dictionary/delete",
                            qs.stringify({
                                questionCode: row.questionCode,
                                id: row.id
                            })
                        )
                        .then(res => {
                            if (res.data.code === "0000") {
                                this.$message({
                                    type: "success",
                                    message: "删除成功!"
                                });
                                this.getSubList();
                            } else {
                                this.$message.error(res.data.msg);
                            }
                        });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        // 新增
        adddetermine(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (!this.code)
                        return this.$message.error("请选择字典类型！！");
                    this.addfrom.code = this.code;
                    this.$utils
                        .post(
                            this.reqApi.xinls + "/exam/dictionary/insert",
                            qs.stringify(this.addfrom)
                        )
                        .then(res => {
                            if (res.data.code === "0000") {
                                this.$refs[formName].resetFields();
                                this.Visible = false;
                                this.$message.success("新增成功！");
                                this.addfrom.description=''
                                this.getSubList();
                            } else {
                                this.Visible = false;
                                return this.$message.error(res.data.msg);
                            }
                        });
                }
            });
        },
        // 编辑
        determine(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$utils
                        .post(
                            this.reqApi.xinls + "/exam/dictionary/update",
                            qs.stringify(this.ruleForm)
                        )
                        .then(res => {
                            if (res.data.code === "0000") {
                                this.dialogVisible = false;
                                this.$message.success("修改成功！");
                                this.getSubList();
                            } else {
                                this.dialogVisible = false;
                                this.$message.error(res.data.msg);
                            }
                        });
                }
            });
        }
    }
};
</script>
<style scoped>
.dicitonary {
    background-color: #fff;
    /* min-height: 647px; */
    /* min-width: 1700px; */
    /* height: 100%; */
}
.dicitonary h3 {
    margin-bottom: 0px;
    padding-bottom: 0px;
}
.el-dialog__header {
    border-bottom: 2px solid #01c8dc;
}
.active {
    background-color: #eef1f5;
}
.storNumber,
.storName {
    width: 300px;
}
.name {
    margin-left: 30px;
}
.dicitonaryBtn {
    line-height: 90px;
    margin-right: 22px;
    float: right;
}
.dicitonaryBtn button {
    width: 80px;
    height: 30px;
    border: 1px solid #01c8dc;
    margin-left: 15px;
    border-radius: 5px;
}
.add_dictionary:hover {
    opacity: 0.7;
    cursor: pointer;
}
.Case {
    display: flex;
    clear: both;
}
.dicitonary .left {
    width: 450px;
    background-color: #fff;
}
.store_list {
    margin: 0 20px;
}
.searchList {
    border: 1px solid #c2c8de;
}
.searchList table tr:last-child {
    border-bottom: none;
}
/* 右边表格部分 */
.dicitonary .right {
    flex: 1;
    background-color: #fff;
    border-radius: 5px;
    /* height: 824px; */
    position: relative;
    overflow: hidden;
}
.add_dictionary,
.addsys {
    margin-right: 20px;
    float: right;
}
.add_dictionary img {
    width: 69px;
}
.tab {
    clear: both;
    position: absolute;
    left: 0;
    top: 0;
    right: -17px;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: scroll;
}
.block {
    margin: 10px auto;
}
.title,
.title1 {
    border-left: 3px solid #e6000b;
    padding-left: 8px;
    color: #444444;
    font-size: 14px;
    font-weight: 800;
    margin-bottom: 0px;
}
.title {
    margin: 20px 0;
}
.shopList {
    margin-top: 20px;
    width: 100%;
}
.shopList .title1,
.shopList p {
    display: inline-block;
}
.shopList p {
    float: right;
}

table {
    border-collapse: collapse;
}
.dicitonary table th {
    height: 40px;
}
.hove {
    border-top: 1px solid #ccd3df;
    border-bottom: 1px solid #ccd3df;
    height: 40px;
    overflow-y: scroll;
}
.hove:hover {
    background-color: #eef1f5;
}
.tabthsty {
    background: #eef1f5;
}
.labelSty {
    text-align: center;
    padding-bottom: 15px;
}
.buttonbox {
    display: inline-block;
    float: right;
    padding-bottom: 10px;
    padding-right: 13px;
}
.inputWidth {
    width: 65%;
}
</style>