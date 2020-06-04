<template>
    <el-card class="f-new box-card">
        <!-- <new-tabs :active="1" :level1="level" level2="管理用户" level3="批量导入用户" @callback2="manageUser" @callback3="ImportingUsers"></new-tabs> -->
        <h3 v-if="this.$route.query.id">修改学生</h3>
        <h3 v-else>新增学生</h3>
        <previous-page goPreviousPage="/user"></previous-page>
        <el-form
            :model="form"
            :rules="rules"
            ref="form"
            style="padding-top: 20px;"
            label-width="80px"
            class="form1"
        >
            <el-upload
                class="avatar-uploader"
                :action="`${this.reqApi.shuiwuUrl}/image/upload`"
                :show-file-list="false"
                :data="data1"
                name="files"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                accept="image/jpeg, image/jpg, image/png"
            >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-form-item label="用户名:" prop="username">
                <input
                    v-if="this.$route.query.id"
                    maxlength="20"
                    type="text"
                    v-model="form.username"
                    :disabled="disabledName"
                    oninput="value=value.replace(/[\u4E00-\u9FA5]/g,'')"
                />
                <input
                    v-else
                    maxlength="20"
                    type="text"
                    v-model="form.username"
                    oninput="value=value.replace(/[\u4E00-\u9FA5]/g,'')"
                />
                <span>
                    <!-- <span class="redB">*</span>填写英文和数字组成的用户名 -->
                </span>
            </el-form-item>
            <el-form-item label="所属班级:" prop="class_id">
                <el-select style="width: 300px;" v-model="form.class_id" placeholder="请选择">
                    <el-option
                        v-for="(item, index) in list"
                        :key="index"
                        :label="item.class_name"
                        :value="item.id"
                    ></el-option>
                </el-select>
                <span>
                    <!-- <span class="redB">*</span>选择用户所在班级 -->
                </span>
            </el-form-item>
            <el-form-item label="姓名:" prop="realname">
                <input maxlength="50" type="text" v-model="form.realname" />
                <span>
                    <!-- <span class="redB">*</span>填写用户的真实姓名 -->
                </span>
            </el-form-item>
            <el-form-item label="学号:" prop="num">
                <input
                    v-if="this.$route.query.id"
                    :disabled="disabledName"
                    maxlength="50"
                    oninput="value=value.replace(/[\u4E00-\u9FA5]/g,'')"
                    type="text"
                    v-model="form.num"
                />
                <input
                    v-else
                    maxlength="50"
                    oninput="value=value.replace(/[\u4E00-\u9FA5]/g,'')"
                    type="text"
                    v-model="form.num"
                />
            </el-form-item>
            <el-form-item label="联系电话:">
                <input
                    maxlength="11"
                    type="text"
                    oninput="value=value.replace(/[^\d]/g,'')"
                    v-model="form.phone"
                />
            </el-form-item>
            <el-form-item label="电子邮箱:">
                <input
                    maxlength="50"
                    type="text"
                    v-model="form.email"
                    
                />
            </el-form-item>
            <el-form-item label="用户状态:" prop="status">
                <el-select style="width: 300px;" v-model="form.status" placeholder="请选择">
                    <el-option label="开放" :value="1"></el-option>
                    <el-option label="关闭" :value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注:">
                <input maxlength="50" type="text" v-model="form.remark" />
            </el-form-item>
            <el-form-item>
                <!-- <el-button v-if="$route.query.id" @click="checkPwd">修改密码</el-button> -->
                <add-btn
                    level1="确 认"
                    level2="取 消"
                    @submitForm="submitForm('form')"
                    @cancelForm="manageUser"
                ></add-btn>
            </el-form-item>
        </el-form>
        <changePwd ref="change"></changePwd>
    </el-card>
</template>

<script>
import newTabs from "@/components/newTabs";
import previousPage from "@/components/previousPage.vue";
import changePwd from "@/views/lt/userManage/changePwd.vue";
import qs from "qs";
export default {
    data() {
        return {
            imageUrl: require("@/assets/images/img.png"),
            errorImg:
                'this.src="' + require("@/assets/images/failToLoad.png") + '"',

            list: [],
            disabledName: true, //禁止改变用户名
            data1: {
                token: sessionStorage.getItem("token")
            },
            centerDialogVisible: false,
            strength: "",
            form: {
                user_photo: "",
                username: "",
                realname: "",
                phone: "",
                email: "",
                status: "",
                remark: "",
                num: "",
                class_id: ""
            },
            rules: {
                username: [
                    {
                        required: true,
                        message: "用户名不能为空！",
                        trigger: "blur"
                    }
                ],
                realname: [
                    {
                        required: true,
                        message: "姓名不能为空！",
                        trigger: "blur"
                    }
                ],
                num: [
                    {
                        required: true,
                        message: "学号不能为空！",
                        trigger: "blur"
                    }
                ],
                status: [
                    {
                        required: true,
                        message: "用户状态不能为空！",
                        trigger: "change"
                    }
                ]
            }
        };
    },

    computed: {
        level: {
            get: function() {
                return (this.level = !this.$route.query.id
                    ? "新增用户"
                    : "修改用户");
            },
            set: function() {}
        }
    },
    components: {
        newTabs,
        "previous-page": previousPage,
        changePwd
    },

    created() {
        this.getfindClasses();
    },

    methods: {
        // checkEmail(val) {
        //     var reg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;
        //     if (!reg.test(val)) {
        //         this.$message.error("请输入合法的邮箱!");
        //         this.form.email = "";
        //         return;
        //     }
        // },
        checkPwd() {
            this.$refs.change.centerDialogVisible = true;
        },

        handleClose1() {
            this.$refs.ruleForm2.resetFields();
            this.centerDialogVisible = false;
        },
        getUserInfo() {
            this.$utils
                .post(
                    this.reqApi.shuiwuUrl + "/student/detail",
                    qs.stringify({
                        student_id: this.$route.query.id
                    })
                )
                .then(res => {
                    if (res.data.code == "0000") {
                        this.form = res.data.student;
                        if (this.form.user_photo) {
                            this.imageUrl =
                                this.reqApi.shuiwuUrl + this.form.user_photo;
                        }
                        for (const i of this.list) {
                            if (this.form.class_name === i.class_name) {
                                this.$set(this.form, "class_id", i.id);
                            }
                        }
                    }
                });
        },

        // 班级列表
        getfindClasses() {
            this.$utils
                .post(
                    this.reqApi.shuiwuUrl + "/class/list",
                    qs.stringify({
                        pageSize: "99999"
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.list = res.data.classes.list;
                        if (this.$route.query.id) return this.getUserInfo();
                    } else {
                    }
                });
        },

        // 上传图片
        beforeAvatarUpload(file) {
            var testmsg = /^image\/(jpeg|png|jpg)$/.test(file.type);
            if (!testmsg) {
                this.$message.error("上传图片格式不对!");
                return;
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                return this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            this.imageUrl = URL.createObjectURL(file);
            return testmsg && isLt2M;
        },
        handleAvatarSuccess(res, file) {
            this.form.user_photo = res.imgCodes;
        },
        // 管理用户
        manageUser() {
            this.$router.push({ name: "user" });
        },

        // 批量导入用户
        ImportingUsers() {
            this.$router.push({ name: "ImportingUsers" });
        },

        // 提交
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (
                        this.form.create_time ||
                        this.form.update_time ||
                        this.form.last_login_time
                    ) {
                        this.form.create_time = null;
                        this.form.update_time = null;
                        this.form.last_login_time = null;
                    }
                    // 上面清空了以后，this.form.email 就为空 这个分支就不会往下执行
                    if (this.form.email) {
                        var reg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;
                        if (!reg.test(this.form.email)) {
                            this.$message.error("请输入合法的邮箱!");
                            this.form.email = "";
                            return;
                        }
                    }

                    if (!this.form.username)
                        return that.$message("用户名不能为空!");
                    // if (!this.form.class_id) return this.$message("所属班级不能为空!");
                    if (!this.form.realname)
                        return this.$message("真实姓名不能为空!");
                    const Identification = !this.$route.query.id
                        ? "/student/create"
                        : "/student/update";
                    this.$utils
                        .post(
                            this.reqApi.shuiwuUrl + Identification,
                            qs.stringify({
                                user: JSON.stringify(this.form),
                                class_id: this.form.class_id
                            })
                        )
                        .then(res => {
                            if (res.data.code === "0000") {
                                this.$message.success("新增成功！！");
                                this.$router.push({
                                    name: "user"
                                });
                            } else {
                                this.$message.error(res.data.msg);
                            }
                        });
                } else {
                }
            });
        },
        change(e) {
            let g = e.target.value;
            this.strength = this.$utils.checkStrong(g);
            this.huanse(this.strength);
        },
        submitForm1(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.ruleForm2.token = sessionStorage.getItem("token");
                    this.$utils
                        .post(
                            this.reqApi.shuiwuUrl + "/user/changePWD",
                            qs.stringify({
                                oldPassword: this.ruleForm2.oldPassword,
                                newPassword: this.ruleForm2.newPassword
                            })
                        )
                        .then(res => {
                            if (res.data.code === "0000") {
                                this.$message.success("修改成功");
                                this.$router.push({
                                    name: "user"
                                });
                            }
                        });
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        // 密码强度
        huanse(num) {
            let weak = document.querySelector(".password-one");
            let middle = document.querySelector(".password-two");
            let strong = document.querySelector(".password-three");
            if (num === 0) {
                weak.style.background = "#ccc";
                middle.style.background = "#ccc";
                strong.style.background = "#ccc";
            }
            if (num === 1) {
                weak.style.background = "#31b5ff";
                middle.style.background = "#ccc";
                strong.style.background = "#ccc";
            }
            if (num === 2) {
                weak.style.background = "#31b5ff";
                middle.style.background = "#31b5ff";
                strong.style.background = "#ccc";
            }
            if (num === 3) {
                weak.style.background = "#31b5ff";
                middle.style.background = "#31b5ff";
                strong.style.background = "#31b5ff";
            }
        }
    }
};
</script>

<style scoped>
input {
    width: 300px !important;
}
div.el-select {
    width: 200px;
}
.form1 {
    padding-left: 200px;
    position: relative;
}
/* 密码强度 */
.password-big {
    width: 200px;
    height: 20px;
    border: 1px solid #ccc;
    border-radius: 20px;
    margin: 10px 0;
    position: relative;
}
.password-big > span {
    width: 62px;
    height: 14px;
    background-color: #ccc;
    position: absolute;
    top: 3px;
}
.password-big .password-one {
    left: 3px;
    border-radius: 7px 0 0 7px;
}
.password-big .password-two {
    left: 69px;
}
.password-big .password-three {
    border-radius: 0px 7px 7px 0;
    left: 135px;
}
.wenzi span {
    position: absolute;
    top: 12px;
}
.wenzi span:nth-child(1) {
    left: 30px;
}
.wenzi span:nth-child(2) {
    left: 95px;
}
.wenzi span:nth-child(3) {
    left: 155px;
}

.dianxian.el-form-item {
    padding-bottom: 20px;
    margin-bottom: 5px;
    /* border-bottom: 2px dotted #AEE1FE; */
}
.el-form-item {
    margin-bottom: 5px;
    height: 52px;
    /* border-radius: 60px; */
}

/* 上传文件 */
.avatar-uploader {
    position: absolute;
    left: 45px;
    border-radius: 60px;
    overflow: hidden;
    width: 120px;
    height: 120px;
}
.avatar-uploader .el-upload {
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
}
.avatar {
    width: 120px;
    height: 120px;
    display: block;
}
.redB {
    color: #ef6f6e;
    vertical-align: middle;
    padding: 0 5px 0 20px;
}
.formBox {
    /* width: 500px; */
    box-sizing: border-box;
    padding-right: 50px;
}
</style>
