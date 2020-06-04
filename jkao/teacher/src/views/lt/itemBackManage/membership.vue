<template>
    <div class="memberM">
        <h4 style="margin-left:20px;font-size:14px;font-weight:700">会员级别</h4>
        <div class="addStore">
            <el-button class="increase themeColor" @click="addship">
                <i class="el-icon-plus"></i>新增
            </el-button>
        </div>
        <div class="memberBox">
            <div class="hideMemberScoll">
                <el-table :data="tableData" style="width: 100%;" border>
                    <el-table-column prop="id" label="序号" align="center"></el-table-column>
                    <el-table-column prop="name" label="级别名称" align="center"></el-table-column>
                    <el-table-column prop="discount" label="会员折扣" align="center"></el-table-column>
                    <el-table-column prop="remark" label="备注" align="center"></el-table-column>
                    <el-table-column prop="updateTime" label="更新时间" align="center">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.updateTime !=null"
                            >{{scope.row.updateTime | converTime('YYYY-MM-DD HH:mm:ss')}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="状态" align="center">
                        <template slot-scope="scope">{{scope.row.status|statusTip}}</template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-tooltip
                                class="item codesty"
                                effect="dark"
                                content="编辑"
                                placement="bottom"
                            >
                                <img
                                    src="@/assets/images/xiugai_icon.png"
                                    @click="onClinckEdit(scope.row)"
                                    class="imgSize"
                                />
                            </el-tooltip>&nbsp;&nbsp;
                            <el-tooltip
                                class="item codesty"
                                effect="dark"
                                content="下架"
                                placement="bottom"
                                v-if="scope.row.status == 'Y'"
                            >
                                <img
                                    src="@/assets/images/shangjia_icon.png"
                                    @click="up(scope.row.id,scope.row.status)"
                                    class="imgSize"
                                />
                            </el-tooltip>
                            <el-tooltip
                                class="item codesty"
                                effect="dark"
                                content="上架"
                                placement="bottom"
                                v-else-if="scope.row.status == 'N'"
                            >
                                <img
                                    src="@/assets/images/derive_icon.png"
                                    @click="up(scope.row.id,scope.row.status)"
                                    class="imgSize"
                                />
                            </el-tooltip>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="zanwei"></div>
                <el-dialog title="新增" :visible.sync="dialogFormVisible" width="500px">
                    <el-form
                        :model="lineForm"
                        :rules="rules"
                        ref="lineForm"
                        label-width="100px"
                        class="formBox"
                    >
                        <el-form-item label="级别名称：" prop="name">
                            <el-input v-model="lineForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="会员折扣：" prop="discount">
                            <el-input
                                v-model="lineForm.discount"
                                placeholder="八折请输入0.8"
                                maxlength="5"
                                @blur="numdisCount(lineForm.discount)"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="备注：">
                            <el-input v-model="lineForm.remark"></el-input>
                        </el-form-item>
                        <div style="text-align:center">
                            <el-button class="AllquedingBtn" @click="submitForm('lineForm')">确定</el-button>
                            <el-button class="theBtn resetButton" @click="resetForm('lineForm')">返回</el-button>
                        </div>
                    </el-form>
                </el-dialog>
                <el-dialog title="编辑" :visible.sync="dialogForm2Visible" width="500px">
                    <el-form
                        :model="lineForm"
                        :rules="rules"
                        ref="lineForm"
                        label-width="100px"
                        class="formBox"
                    >
                        <el-form-item label="级别名称：" prop="name">
                            <el-input v-model="lineForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="会员折扣：" prop="discount">
                            <el-input
                                v-model="lineForm.discount"
                                placeholder="八折请输入0.8"
                                @blur="numdisCount"
                                maxlength="5"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="备注：">
                            <el-input v-model="lineForm.remark"></el-input>
                        </el-form-item>
                        <div style="text-align:center">
                            <el-button class="AllquedingBtn" @click="submitForm2('lineForm')">确定</el-button>
                            <el-button class="theBtn resetButton" @click="resetForm2('lineForm')">返回</el-button>
                        </div>
                    </el-form>
                </el-dialog>
            </div>
        </div>
    </div>
</template>
<script>
import qs from "qs";
export default {
    name: "memberM",
    data() {
        return {
            tableData: [],
            dialogFormVisible: false,
            dialogForm2Visible: false,
            lineForm: {
                name: "",
                discount: "",
                remark: ""
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入会员级别名称",
                        trigger: "blur"
                    },
                    {
                        min: 3,
                        max: 5,
                        message: "长度在 3 到 5 个字符",
                        trigger: "blur"
                    }
                ],
                discount: [
                    {
                        required: true,
                        message: "请输入活动优惠",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    created() {
        this.getMenber();
    },
    methods: {
        getMenber() {
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/member/level",
                    qs.stringify({
                        questionCode: sessionStorage.getItem("questionUUid")
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.tableData = res.data.data;
                    } else {
                        return this.$message.error(res.data.msg);
                    }
                });
        },
        // 上架、下架
        up(id, status) {
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/member/levelStatus",
                    qs.stringify({
                        questionCode: sessionStorage.getItem("questionUUid"),
                        id,
                        status
                    })
                )
                .then(res => {
                    if (res.data.code == "0000") {
                        this.getMenber();
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });
        },
        //新增
        addship() {
            this.lineForm = {};
            this.dialogFormVisible = true;
        },
        // 确定 返回
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$utils
                        .post(
                            this.reqApi.xinls + "/exam/member/addLevel",
                            qs.stringify({
                                name: this.lineForm.name,
                                discount: this.lineForm.discount,
                                remark: this.lineForm.remark,
                                questionCode: sessionStorage.getItem(
                                    "questionUUid"
                                )
                            })
                        )
                        .then(res => {
                            if (res.data.code === "0000") {
                                this.dialogFormVisible = false;
                                this.$message.success("提交成功");
                                this.getMenber();
                            } else {
                                this.$message.error(res.data.msg);
                            }
                        });
                } else {
                    return false;
                }
            });
        },
        resetForm() {
            this.dialogFormVisible = false;
        },
        resetForm2() {
            this.dialogForm2Visible = false;
        },
        //编辑
        onClinckEdit(row) {
            this.dialogForm2Visible = true;
            this.lineForm = row;
        },
        submitForm2(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$utils
                        .post(
                            this.reqApi.xinls + "/exam/member/addLevel",
                            qs.stringify({
                                id: this.lineForm.id,
                                name: this.lineForm.name,
                                discount: this.lineForm.discount,
                                remark: this.lineForm.remark,
                                questionCode: sessionStorage.getItem(
                                    "questionUUid"
                                )
                            })
                        )
                        .then(res => {
                            if (res.data.code === "0000") {
                                this.dialogForm2Visible = false;
                                this.$message.success("提交成功");
                                this.getMenber();
                            } else {
                                this.$message.error(res.data.msg);
                            }
                        });
                } else {
                    return false;
                }
            });
        },
        // 折扣金额限制输入的数字大于0小于1的
        numdisCount() {
            if (this.lineForm.discount <= 0 || this.lineForm.discount > 1) {
                this.$message.error("请输入大于0 小于1的数据");
                return (this.lineForm.discount = "");
            }
        }
    },
    filters: {
        statusTip(value) {
            if (value == "Y") {
                return "已上架";
            } else if (value == "N") {
                return "已下架";
            }
        },
        statusName(value) {
            if (value == "Y") {
                return "禁用";
            } else if (value == "N") {
                return "启用";
            }
        }
    }
};
</script>
<style scoped>
.memberM {
    background-color: #fff;
}
.huiyuanjibie {
    margin-left: 20px;
}
.zanwei {
    height: 20px;
}
.imgMargin {
    text-align: right;
    margin-bottom: 10px;
    float: right;
    margin-right: 20px;
    margin-top: 20px;
}
.memberBox {
    overflow: hidden;
    position: relative;
    height: 760px;
    width: 100%;
}
.hideMemberScoll {
    position: absolute;
    left: 0;
    top: 0;
    right: -17px;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: scroll;
}
.addStore {
    text-align: right;
    margin-bottom: 20px;
}
.formBox {
    padding: 0 20px 15px 20px;
}
</style>
