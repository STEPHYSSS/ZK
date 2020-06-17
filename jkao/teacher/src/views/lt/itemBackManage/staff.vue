<template>
    <div class="staff">
        <h4 style="margin-left:20px;font-size:14px;font-weight:700">职员管理</h4>
        <div class="storeInfo">
            <div class="addStore">
                <el-button class="increase themeColor" @click="add_staff">
                    <i class="el-icon-plus"></i>新增
                </el-button>
            </div>
            <div class="hidescoll">
                <div class="store_Box12">
                    <el-table :data="tableData" style="width: 100%" border>
                        <el-table-column prop="realname" label="姓名" align="center"></el-table-column>
                        <el-table-column prop="username" label="登录用户名" align="center"></el-table-column>
                        <el-table-column prop="department" label="部门 " align="center"></el-table-column>
                        <el-table-column prop="roleName" label="职员类型 " align="center"></el-table-column>
                        <el-table-column prop="remark" label="备注" align="center"></el-table-column>
                        <el-table-column prop="createTime" label="创建时间 " align="center">
                            <template
                                slot-scope="scope"
                            >{{scope.row.createTime | fmtDate2('YYYY-MM-DD')}}</template>
                        </el-table-column>
                        <el-table-column prop="opeartion" label="操作" align="center" fixed="right">
                            <template slot-scope="scope">
                                <div class="tootip">
                                    <el-tooltip
                                        class="item"
                                        effect="dark"
                                        content="编辑"
                                        placement="bottom"
                                    >
                                        <img
                                            src="@/assets/images/xiugai_icon.png"
                                            @click="editShow(scope.row)"
                                            class="imgSize"
                                        />
                                    </el-tooltip>&nbsp;&nbsp;
                                    <el-tooltip
                                        class="item"
                                        effect="dark"
                                        content="删除"
                                        placement="bottom"
                                    >
                                        <img
                                            src="@/assets/images/shanchu_icon.png"
                                            @click="del(scope.row)"
                                            class="imgSize"
                                        />
                                    </el-tooltip>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <!-- 店员新增 -->
        <el-dialog
            title="职员新增"
            :visible.sync="dialogVisible"
            width="550px"
            center
            v-model="dialogVisible"
        >
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="120px"
                class="demo-ruleForm"
            >
                <div class="prompt">
                    <div class="prot">
                        <div class="pro1">
                            <span class="ti">提示：</span>
                        </div>
                        <div class="pro2">
                            <p>创建成功后凭用户名和初始密码123456登录</p>
                        </div>
                    </div>
                </div>
                <el-form-item label="姓名" prop="realname">
                    <el-input v-model="ruleForm.realname" class="add_width"></el-input>
                </el-form-item>
                <el-form-item label="登录用户名" prop="username">
                    <el-input
                        v-model="ruleForm.username"
                        class="add_width"
                        placeholder="用户名创建后不可修改"
                    ></el-input>
                </el-form-item>
                <el-form-item label="部门" prop="department">
                    <el-select v-model="ruleForm.department" placeholder="请选择" class="add_width">
                        <el-option
                            v-for="item in value"
                            :key="item.id"
                            :label="item.name"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="职员类型" prop="roleId">
                    <el-select v-model="ruleForm.roleId" placeholder="请选择" class="add_width">
                        <el-option
                            v-for="item in listid"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="ruleForm.remark" class="add_width"></el-input>
                </el-form-item>
                <div style="text-align:center">
                    <el-button @click="addsubmitForm('ruleForm')">确定</el-button>
                    <el-button class="theBtn resetButton" @click="dialogVisible = false">取消</el-button>
                </div>
            </el-form>
        </el-dialog>
        <!-- 编辑 -->
        <el-dialog
            title="职员编辑"
            :visible.sync="centerDialogVisible"
            width="550px"
            center
            v-model="centerDialogVisible"
        >
            <el-form
                :model="ruleForm2"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-form-item label="姓名" prop="realname">
                    <el-input v-model="ruleForm2.realname" class="add_width"></el-input>
                </el-form-item>
                <el-form-item label="登录用户名">
                    <el-input v-model="ruleForm2.username" class="add_width" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="部门" prop="department">
                    <el-select v-model="ruleForm2.department" placeholder="请选择" class="add_width">
                        <el-option
                            v-for="item in value"
                            :key="item.id"
                            :label="item.name"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="职员类型" prop="roleId">
                    <el-select v-model="ruleForm2.roleId" placeholder="请选择" class="add_width">
                        <el-option
                            v-for="item in listid"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="ruleForm2.remark" class="add_width"></el-input>
                </el-form-item>
                <div style="text-align:center">
                    <el-button class="AllquedingBtn" @click="submitForm(ruleForm2)">确定</el-button>
                    <el-button class="theBtn resetButton" @click="centerDialogVisible = false">取消</el-button>
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
            value: [],
            form: {
                questionCode: sessionStorage.getItem("questionUUid")
            },
            userId: "",
            tableData: [],
            listid: [],
            ruleForm: {
                realname: "",
                username: "",
                department: "",
                roleId: "",
                remark: "",
                questionCode: sessionStorage.getItem("questionUUid")
            },
            ruleForm2: {
                realname: "",
                username: "",
                department: "",
                roleId: "",
                remark: "",
                token: sessionStorage.getItem("token")
            },
            rules: {
                realname: [
                    { required: true, message: "请输入姓名", trigger: "blur" },
                    { max: 20, message: "输入不超过20个字符", trigger: "blur" }
                ],
                username: [
                    { required: true, message: "请输入用户名", trigger: "blur" }
                ],
                department: [
                    { required: true, message: "请选择部门", trigger: "change" }
                ],
                roleId: [
                    {
                        required: true,
                        message: "请选择职员类型",
                        trigger: "change"
                    }
                ],
                remark: [
                    { max: 20, message: "输入不超过20个字符", trigger: "blur" }
                ]
            },
            dialogVisible: false,
            centerDialogVisible: false
        };
    },
    created() {
        this.getstaff();
        this.showother();
        this.getList();
    },
    methods: {
        //角色id
        getList() {
            var getlist = [];
            getlist.questionCode = sessionStorage.getItem("questionUUid");
            // getlist.pageNum = this.form.pageNum;
            let formData = new FormData();
            const obj = getlist;
            Object.keys(obj).forEach(key => {
                formData.append(key, obj[key]);
            });
            this.$utils
                .post(this.reqApi.xinls + "/exam/user/role/list", formData)
                .then(res => {
                    if (res.data.code === "0000") {
                        this.listid = res.data.data;
                    }
                });
        },
        //value
        showother() {
            var codelist = [];
            codelist.questionCode = sessionStorage.getItem("questionUUid");
            codelist.code = "sys_user_department";
            let formData = new FormData();
            const obj = codelist;
            Object.keys(obj).forEach(key => {
                formData.append(key, obj[key]);
            });
            this.$utils
                .post(this.reqApi.xinls + "/exam/dictionary/list", formData)
                .then(res => {
                    if (res.data.code == "0000") {
                        this.value = res.data.data;
                    }
                });
        },
        getstaff() {
            // let formData = new FormData();
            // formData.append('token',sessionStorage.getItem('token'))
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/user/list",
                    qs.stringify({
                        questionCode: sessionStorage.getItem("questionUUid")
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.tableData = res.data.data;
                    }
                });
        },

        add_staff() {
            this.dialogVisible = true;
        },
        // 编辑

        editShow(e) {
            this.centerDialogVisible = true;
            this.userId = e.id;
            this.ruleForm2.realname = e.realname;
            this.ruleForm2.username = e.username;
            this.ruleForm2.department = e.department;
            this.ruleForm2.roleId = e.roleId;
            this.ruleForm2.remark = e.remark;
        },
        // 删除
        del(e) {
            var del = [];
            del.questionCode = sessionStorage.getItem("questionUUid");
            del.userId = e.id;
            let formData = new FormData();
            const obj = del;
            Object.keys(obj).forEach(key => {
                formData.append(key, obj[key]);
            });
            this.$confirm("确定删除?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
            })
                .then(() => {
                    this.$utils
                        .post(this.reqApi.xinls + "/exam/user/delete", formData)
                        .then(res => {
                            if (res.data.code == "0000") {
                                this.getstaff();
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
        //新增
        addsubmitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$utils
                        .post(
                            this.reqApi.xinls + "/exam/user/insert",
                            qs.stringify(this.ruleForm)
                        )
                        .then(res => {
                            if (res.data.code == "0000") {
                                this.dialogVisible = false;
                                this.$message.success("提交成功");
                                this.getstaff();
                            } else {
                                this.$message.error(res.data.msg);
                            }
                        });
                } else {
                    return false;
                }
            });
        },
        // 编辑改变
        submitForm(formName) {
            var change = [];
            change.questionCode = sessionStorage.getItem("questionUUid");
            change.username = formName.username;
            change.realname = formName.realname;
            change.department = formName.department;
            change.roleId = formName.roleId;
            change.remark = formName.remark;
            change.userId = this.userId;
            let formData = new FormData();
            const obj = change;
            Object.keys(obj).forEach(key => {
                formData.append(key, obj[key]);
            });
            this.$utils
                .post(this.reqApi.xinls + "/exam/user/update", formData)
                .then(res => {
                    if (res.data.code == "0000") {
                        this.centerDialogVisible = false;
                        this.$message.success("提交成功");
                        this.getstaff();
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });
        }
    }
};
</script>
<style scoped>
.staff {
    background-color: #fff;
    min-height: 647px;
    height: 100%;
    /* min-width: 1700px; */
    box-sizing: border-box;
    /* box-shadow: 0px 2px 10px #ccc; */
}
p {
    display: inline-block;
    width: 300px;
}
.storeBox222 {
    height: 150px;
}
/* 弹窗样式 */
.demo-ruleForm {
    padding-bottom: 15px;
}
.ti {
    font-size: 16px;
    font-weight: 800;
    /* background: url("../../assets/hint.png") no-repeat; */
    width: 58px;
    height: 28px;
    padding-left: 40px;
    line-height: 30px;
    float: left;
}
.prot {
    display: flex;
    margin-bottom: 15px;
}
.pro1 {
    flex: 1;
    height: 30px;
}
.pro2 {
    flex: 5;
    margin-top: -1px;
}
.pro2 p {
    margin: 5px auto;
}
.staff .addStore img {
    width: 69px;
    margin-right: 20px;
}
.staff .hidescoll {
    overflow: hidden;
    position: relative;
    height: 648px;
}
.staff .store_Box12 {
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
.add_width {
    width: 300px;
}
</style>
