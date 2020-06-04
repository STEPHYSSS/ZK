<template>
    <el-card class="f-new box-card">
        <!-- <new-tabs :active="1" :level1="level" level2="管理列表" @callback2="adminList"></new-tabs> -->
        <h3 v-if="this.$route.query.id">修改老师</h3>
        <h3 v-else>新增老师</h3>
        <previous-page goPreviousPage="/adminList"></previous-page>
        <el-form
            ref="form"
            :model="form"
            :rules="rules"
            style="padding-top: 20px;"
            label-width="80px"
            class="pageForm"
        >
            <!-- <el-upload
        class="avatar-uploader"
        action="#"
        :show-file-list="false"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" :onerror="errorImg" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>-->
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
                    maxlength="50"
                    v-if="this.$route.query.id"
                    oninput="value=value.replace(/[\u4E00-\u9FA5]/g,'')"
                    type="text"
                    v-model="form.username"
                    :disabled="disabledName"
                />
                <input
                    maxlength="50"
                    v-else
                    oninput="value=value.replace(/[\u4E00-\u9FA5]/g,'')"
                    type="text"
                    v-model="form.username"
                />
                <span>
                    <span class="redB">*</span>填写英文和数字组成的用户名
                </span>
            </el-form-item>
            <!-- <el-form-item class="dianxian" label="密码:">
        <el-input type="password" class="inpWid" show-password v-model.trim="form.aUserpass" @input="change"></el-input>
        <span>
          <span class="redB">*</span>填写密码，建议包含数字字母和符号
        </span>
        <div class="password-big">
          <span class="password-one"></span>
          <span class="password-two"></span>
          <span class="password-three"></span>
          <div class="wenzi">
            <span>弱</span>
            <span>中</span>
            <span>强</span>
          </div>
        </div>
            </el-form-item>-->
            <el-form-item label="姓名:" prop="realname">
                <input maxlength="50" type="text" v-model="form.realname" />
                <span>
                    <span class="redB">*</span>填写用户的真实姓名
                </span>
            </el-form-item>
            <!-- <el-form-item label="角色:">
        <el-select v-model="form.aRoleid" placeholder="请选择">
            <el-option label="老师" value="teacher"></el-option>-->
            <!-- <el-option label="管理员" value="admin"></el-option> -->
            <!-- </el-select>
            </el-form-item>-->
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
                    <el-option label="关闭" :value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注:">
                <input maxlength="50" type="text" v-model="form.remark" />
            </el-form-item>
            <el-form-item>
                <el-button
                    type="danger"
                    class="modifyPsd"
                    plain
                    v-if="$route.query.id === userId"
                    @click="dialogFormVisible = true"
                >修改密码</el-button>
                <add-btn
                    level1="提 交"
                    level2="取 消"
                    @submitForm="submitForm('form')"
                    @cancelForm="adminList"
                ></add-btn>
            </el-form-item>
        </el-form>

        <!-- 修改密码弹框 -->
        <el-dialog
            title="修改密码"
            :visible.sync="dialogFormVisible"
            center
            :before-close="handleClose"
        >
            <el-form :model="psw">
                <el-form-item label="原密码" :label-width="formLabelWidth">
                    <el-input v-model="psw.oldPsw" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" :label-width="formLabelWidth">
                    <el-input v-model="psw.newPsw" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" :label-width="formLabelWidth">
                    <el-input v-model="psw.surePsw" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <!-- <el-button @click="dialogFormVisible = false">取 消</el-button> -->
                <el-button @click="handleClose">取 消</el-button>
                <!-- <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button> -->
                <el-button type="primary" @click="modifyNotarize">确 定</el-button>
            </div>
        </el-dialog>
    </el-card>
</template>

<script>
import newTabs from "@/components/newTabs";
import previousPage from "@/components/previousPage.vue";
import qs from "qs";
export default {
    data() {
        return {
            data1: {
                token: sessionStorage.getItem("token")
            },
            imageUrl: require("@/assets/images/img.png"),
            errorImg:
                'this.src="' + require("@/assets/images/failToLoad.png") + '"',
            list: [],
            disabledName: true, //禁止改变用户名
            // passwordJY: '',
            // 密码强度
            strength: "",
            form: {
                user_photo: "",
                username: "",
                // aUserpass: "",
                realname: "",
                email: "",
                phone: "",
                status: "",
                remark: ""
                // aRoleid: "", //老师/管理员
                // aPhoto: "",
                // aId: ""
            },
            rules: {
                username: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "change"
                    }
                ],
                realname: [
                    {
                        required: true,
                        message: "请输入姓名",
                        trigger: "change"
                    }
                ],
                status: [
                    {
                        required: true,
                        message: "请选择状态",
                        trigger: "change"
                    }
                ]
            },
            dialogFormVisible: false,
            formLabelWidth: "120px",
            psw: {
                oldPsw: "",
                newPsw: "",
                surePsw: ""
            },
            userId: sessionStorage.userId
        };
    },

    computed: {
        level: {
            get: function() {
                return (this.level = !this.$route.query.id
                    ? "新增教师"
                    : "修改教师");
            },
            set: function() {}
        }
    },
    components: {
        newTabs,
        "previous-page": previousPage
    },

    created() {
        if (this.$route.query.id) return this.getAdminInfo();
    },

    methods: {
        // checkEmail(val) {
        //     var reg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;
        //     if (!reg.test(val)) {
        //          this.$message.error("请输入合法的邮箱!");
        //         this.form.email = "";
        //         return;
        //     }
        // },
        getAdminInfo() {
            const that = this;
            // that.form = JSON.parse(sessionStorage.getItem("oneTeacher"))
            that.$utils
                .post(
                    that.reqApi.shuiwuUrl + "/teacher/detail",
                    qs.stringify({
                        teacher_id: that.$route.query.id
                    })
                )
                .then(res => {
                    const { code, msg, teacher } = res.data;
                    if (code === "0000") {
                        that.form = teacher;
                        if (that.form.user_photo) {
                            that.imageUrl =
                                that.reqApi.shuiwuUrl + that.form.user_photo;
                        }
                    } else {
                        that.$message(msg);
                    }
                });
        },

        // 上传图片
        beforeAvatarUpload(file) {
            const isJPG = file.type === "image/jpeg";
            const isPNG = file.type === "image/png";
            const isLt2M = file.size / 1024 / 1024 < 2;

            var testmsg = /^image\/(jpeg|png|jpg)$/.test(file.type);
            // const isLt5M = file.size / 1024 / 1024 < 5;
            if (!testmsg) {
                this.$message.error("上传图片格式不对!");
                return;
            }
            if (!isLt2M) {
                return this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            this.imageUrl = URL.createObjectURL(file);
            this.form.user_photo = file;
            return testmsg && isLt2M;
        }, //成功
        handleAvatarSuccess(res, file) {
            this.form.user_photo = res.imgCodes;
        },

        // 管理用户
        adminList() {
            this.$router.push({ name: "adminList" });
        },

        //修改密码
        //修改密码-（确定）
        modifyNotarize() {
            let that = this;
            if (that.psw.newPsw != that.psw.surePsw) {
                that.$message("两次密码不一致");
            } else if (
                that.psw.newPsw == "" ||
                that.psw.oldPsw == "" ||
                that.psw.surePsw == ""
            ) {
                that.$message("请输入密码");
            } else {
                that.$utils
                    .post(
                        that.reqApi.shuiwuUrl + "/user/changePWD",
                        qs.stringify({
                            oldPassword: that.psw.oldPsw,
                            newPassword: that.psw.newPsw
                        })
                    )
                    .then(res => {
                        const { code, msg } = res.data;
                        if (code === "0000") {
                            that.handleClose();
                            that.$message.success("修改成功");
                        } else {
                            that.$message(msg);
                        }
                    });
            }
        },
        // 修改密码-（取消）
        handleClose(done) {
            this.psw.oldPass = "";
            this.psw.newPsw = "";
            this.sureNewPass = "";
            this.dialogFormVisible = false;
        },

        // 提交
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                     if (this.form.email) {
                        var reg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;
                        if (!reg.test(this.form.email)) {
                            this.$message.error("请输入合法的邮箱!");
                            this.form.email = "";
                            return;
                        }
                    }
                    if (this.$route.query.id) {
                        let formPost = {
                            file: this.form.file,
                            id: this.form.id,
                            username: this.form.username,
                            role_id: this.form.role_id,
                            realname: this.form.realname,
                            status: this.form.status,
                            school_uuid: this.form.school_uuid,
                            phone: this.form.phone,
                            email: this.form.email,
                            remark: this.form.remark,
                            user_photo: this.form.user_photo
                        };
                        this.$utils
                            .post(
                                this.reqApi.shuiwuUrl + "/teacher/update",
                                qs.stringify({
                                    user: JSON.stringify(formPost)
                                })
                            )
                            .then(res => {
                                const { code, msg } = res.data;
                                if (code === "0000") {
                                    this.$message.success("修改成功");
                                    sessionStorage.removeItem("oneTeacher");
                                    this.$router.push({
                                        name: "adminList"
                                    });
                                } else {
                                    this.$message(msg);
                                }
                            });
                    } else {
                        this.$utils
                            .post(
                                this.reqApi.shuiwuUrl + "/teacher/create",
                                qs.stringify({
                                    user: JSON.stringify(this.form)
                                })
                            )
                            .then(res => {
                                if (res.data.code === "0000") {
                                    this.$message.success("新增成功");
                                    this.$router.push({
                                        name: "adminList"
                                    });
                                } else {
                                    this.$message(res.data.msg);
                                }
                            });
                    }
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
            return;
            const that = this;
            if (that.form.username == "" || !that.form.username)
                return that.$message("用户名不能为空!");
            if (that.form.aUserpass == "" || !that.form.aUserpass)
                return that.$message("密码不能为空!");
            if (that.form.realname == "" || !that.form.realname)
                return that.$message("真实姓名不能为空!");
            let formData = new FormData();
            const obj = that.form;
            Object.keys(obj).forEach(key => {
                formData.append(key, obj[key]);
            });
            const Identification = !that.$route.query.id
                ? "exam/admin/newAdmin"
                : "exam/admin/updateAdmin";
            that.$utils.post(Identification, formData).then(res => {
                const { code, msg } = res.data;
                if (code === "00") {
                    that.$router.push({ name: "adminList" });
                    that.$message.success(msg);
                } else return that.$message(msg);
            });
        },

        change(e) {
            this.strength = this.$utils.checkStrong(e);
            this.huanse(this.strength);
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

    // beforeDestroy () {
    //   sessionStorage.removeItem('putUserInfo')
    // },

    // watch: {
    // passwordJY (val) {
    //     const that = this
    //     that.form.aUserpass = val
    //     that.strength = that.$utils.checkStrong(val)
    //     that.huanse(that.strength)
    //   }
    // }
};
</script>

<style scoped>
input,
.inpWid {
    width: 300px !important;
}
div.el-select {
    width: 200px;
}
.el-form.pageForm {
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
    height: 50px;
}

/* 上传文件 */
.avatar-uploader {
    position: absolute;
    left: 45px;
    width: 120px;
    height: 120px;
    /* border-radius: 60px; */
    overflow: hidden;
}
.avatar-uploader .el-upload img {
    width: 120px;
    height: 120px;
    display: block;
    border-radius: 60px;
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
.redB {
    color: #ef6f6e;
    vertical-align: middle;
    padding: 0 5px 0 20px;
}
</style>
