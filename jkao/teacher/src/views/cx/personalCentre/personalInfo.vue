<template>
    <el-card shadow="never" class="box-card studentInfo">
        <previous-page goPreviousPage="/page" style="float: right;display: inline-block;"></previous-page>
        <div class="topPadding onlySty">
            <div class="headline" style="margin-bottom:15px">账户信息</div>
        </div>

        <el-form ref="form" :model="form" label-width="80px" style="margin-top:25px;">
            <el-upload
                class="avatar-uploader"
                :action="`${this.reqApi.shuiwuUrl}/image/upload`"
                :show-file-list="false"
                :data="data1"
                name="files"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
            >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-form-item label="用户名:">
                <span v-if="form.username">{{form.username}}</span>
                <input v-else type="text" v-model="username" @blur="checkUsername" maxlength="20"/>{{usermsg}}
            </el-form-item>
            <el-form-item label="所属班级:">
                <span v-if="form.class_name">{{form.class_name}}</span>
                <span v-else style="color:#c4c2c2">暂无班级信息</span>
            </el-form-item>
            <el-form-item label="姓名:">
                <input type="text" v-model="form.realname" :disabled="disabledName" maxlength="20"/>
                <!-- <span>
                    <span class="redB">*</span>填写用户的真实姓名
                </span> -->
            </el-form-item>
            <el-form-item label="工号:">
                <span v-if="form.num">{{form.num}}</span>
                <input v-else type="text" v-model="number" @blur="checknum" maxlength="20"/>{{nummsg}}
                <!-- <input type="text" v-model="form.num" /> -->
            </el-form-item>
            <el-form-item label="联系电话:">
                <input type="text" v-model="form.phone" oninput="value=value.replace(/[^\d]/g,'')"  maxlength="11"/>
            </el-form-item>
            <el-form-item label="电子邮箱:">
                <input type="text" v-model="form.email" />
            </el-form-item>
            <!-- <el-form-item label="联系地址:">
        <input type="text" v-model="form.uAddress" />
            </el-form-item>-->
            <el-form-item label="用户状态:">
                <span v-if="form.status === 1">有效</span>
                <span v-else>失效</span>
            </el-form-item>
            <el-form-item label="备注:">
                <input type="text" v-model="form.remark" maxlength="50"/>
            </el-form-item>
            <el-form-item>
                <div class="footer-btn">
                    <!-- <el-button @click="submitForm">确 定</el-button>
                    <el-button class="cancel">取 消</el-button>-->
                    <el-button @click="checkPwd">修改密码</el-button>
                    <el-button @click="submitForm" class="cancel">确认</el-button>
                </div>
            </el-form-item>
        </el-form>
        <changePwd ref="change"></changePwd>
        <!-- <el-dialog
        title="修改密码"
        :visible.sync="dialogVisible"
        width="480px"
        :before-close="handleClose">
        <div class="inpPassword">
          请输入原密码：
          <el-input v-model="pwd.oldPass" placeholder="请输入原密码"></el-input>
        </div>
        <div class="inpPassword">
          请输入新密码：
          <el-input  v-model="pwd.newPass" placeholder="请输入新密码"></el-input>
        </div>
        <div class="inpPassword">
          请确认新密码：
          <el-input  v-model="sureNewPass" placeholder="请确认新密码"></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button class="cancel" @click="handleClose">取 消</el-button>
          <el-button class="sure" type="primary" @click="verifyModify">确 定</el-button>
        </span>
        </el-dialog>-->
    </el-card>
</template>

<script>
import previousPage from "@/components/previousPage.vue";
import changePwd from "@/views/lt/userManage/changePwd.vue";
import qs from "qs";
export default {
    name: "personalInfo",
    data() {
        return {
            data1: {
                token: sessionStorage.getItem("token")
            },
            imageUrl: require("@/assets/images/img.png"),
            errorImg: 'this.src="' + require("@/assets/images/studentPhoto.jpg") + '"',

            object: [],
            // 班级名称
            className: "",

            passwordJY: "",
            // 密码强度
            strength: "",
            form: {
                user_photo: "",
            },
            username: '',
            number: '',
            usermsg: '',
            nummsg: '',

            //修改密码
            dialogVisible: false,
            pwd: {
                uid: sessionStorage.userId,
                oldPass: "",
                newPass: ""
            },
            sureNewPass: "",
            disabledName: true,//禁止改变姓名
        };
    },

    created() {
        this.getStudentInfo();
        // this.getfindClasses();
    },
    components: {
        "previous-page": previousPage,
        changePwd
    },

    methods: {
        checkUsername () {
            if (!this.username) return false
            this.$utils.post(
                this.reqApi.shuiwuUrl + "/user/checkUsername",
                qs.stringify({
                    username: this.username
                })
            )
            .then(res => {
                const { code, msg } = res.data;
                if (code === "0000") {
                    this.usermsg = msg;
                } else {
                    this.usermsg = msg;
                }
            });
        },
        checknum () {
            if (!this.number) return false
            this.$utils.post(
                this.reqApi.shuiwuUrl + "/user/checkNum",
                qs.stringify({
                    number: this.number
                })
            )
            .then(res => {
                const { code, msg } = res.data;
                if (code === "0000") {
                    this.nummsg = msg;
                } else {
                    this.nummsg = msg;
                }
            });
        },
        // 上传图片
        beforeAvatarUpload(file) {
            const isJPG = file.type === "image/jpeg";
            const isPNG = file.type === "image/png";
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG && !isPNG) {
                return this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
            }
            if (!isLt2M) {
                return this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            this.imageUrl = URL.createObjectURL(file);
            return isJPG && isLt2M;
        },
        handleAvatarSuccess(res, file) {
            this.form.user_photo = res.imgCodes;
        },
        checkPwd() {
            this.$refs.change.centerDialogVisible = true;
        },
        getStudentInfo() {
            this.$utils
                .post(
                    this.reqApi.shuiwuUrl + "/student/detail",
                    qs.stringify({
                        student_id: sessionStorage.getItem("userId")
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.form = res.data.student;
                        if (this.form.user_photo) {
                            this.imageUrl = this.reqApi.shuiwuUrl + this.form.user_photo;
                            let userPhoto = this.form.user_photo;
                            sessionStorage.setItem("user_photo",userPhoto)
                        }
                    }
                });
            // let that=this;
            // that.$utils.openFullScreen();
            // await that.$utils.post(`exam/user/findOneUser/${sessionStorage.userId}`).then(res=>{
            //   const {object, code} = res.data
            //   that.form = object
            //   that.passwordJY = object.uUserpass
            //   that.imageUrl = `${that.$utils.serverUrl}${object.uPhoto}`
            //   sessionStorage.setItem("hPortrait", that.form.uPhoto);
            // })
        },

        // getAmendStudent(){
        //   const that = this;
        //   that.$utils.post(`user/findOneUser/${info.uId}`).then(res => {
        //     const {object, code} = res.data;
        //     if (code === '00') {
        //       const putUserInfo = JSON.stringify(object);
        //       sessionStorage.setItem('putUserInfo', putUserInfo);
        //       that.$router.push({name : 'addUsers'})
        //     }
        //   })
        // },

        // 班级列表
        // getfindClasses () {
        //   const that = this;
        //   // that.$utils.openFullScreen();
        //   that.$utils.post('exam/sys/findClasses').then(res => {
        //     const {code, list} = res.data
        //     if (code === '00') {
        //       list.forEach((item, index) => {
        //         if (item.cid === that.form.uClassid) return that.className = item.name
        //       })
        //     }
        //   })
        // },

        // 上传图片
        beforeAvatarUpload(file) {
            const isJPG = file.type === "image/jpeg";
            const isPNG = file.type === "image/png";
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG && !isPNG) {
                return this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
            }
            if (!isLt2M) {
                return this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            this.imageUrl = URL.createObjectURL(file);
            this.form.file = file;
            return isJPG && isLt2M;
        },

        //修改密码
        verifyModify() {
            let that = this;
            if (that.pwd.newPass != that.sureNewPass) {
                that.$message("两次密码不一致");
            } else if (
                that.pwd.newPass == "" ||
                that.pwd.oldPass == "" ||
                that.sureNewPass == ""
            ) {
                that.$message("请输入密码");
            } else {
                let formData = new FormData();
                const obj = that.pwd;
                Object.keys(obj).forEach(key => {
                    formData.append(key, obj[key]);
                });
                that.$utils.post(`user/changePWD`, formData).then(res => {
                    const { code, msg } = res.data;
                    if (code == "0000") {
                        that.passwordJY = that.pwd.newPass;
                        that.$message.success(msg);
                        that.handleClose();
                    } else {
                        that.$message(msg);
                        that.dialogVisible = true;
                    }
                });
            }
        },

        handleClose(done) {
            this.pwd.oldPass = "";
            this.pwd.newPass = "";
            this.sureNewPass = "";
            this.dialogVisible = false;
        },

        // 提交
        submitForm() {
            if (this.username) this.form.username = this.username
            if (this.number) this.form.num = this.number
            this.form.update_time = null;
            this.form.create_time = null;
            this.form.last_login_time = null;
            // this.form.
            this.$utils
                .post(
                    this.reqApi.shuiwuUrl + "/student/update",
                    qs.stringify({
                        user: JSON.stringify(this.form)
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.$message.success("修改成功！");
                        this.getStudentInfo();
                        let timer = setTimeout(() => {
                            // clearTimeout(timer);
                            this.$router.push({ name: "page" });
                        }, 1000);
                    }
                });
            return;
            let formData = new FormData();
            const that = this;
            delete that.form.lastLogin;
            that.form.uScore = 0;
            const obj = that.form;
            Object.keys(obj).forEach(key => {
                formData.append(key, obj[key]);
            });
            that.$utils.post("exam/user/updateUser", formData).then(res => {
                const { code } = res.data;
                if (code === "0000") {
                    that.getStudentInfo();
                    let timer = setTimeout(() => {
                        clearTimeout(timer);
                        that.$router.push({ name: "page" });
                    }, 1000);
                }
            });
        }

        // 密码强度
        // huanse (num) {
        //   let weak = document.querySelector('.password-one')
        //   let middle = document.querySelector('.password-two')
        //   let strong = document.querySelector('.password-three')
        //   if (num === 0) {
        //     weak.style.background = '#ccc'
        //     middle.style.background = '#ccc'
        //     strong.style.background = '#ccc'
        //   }
        //   if (num === 1) {
        //     weak.style.background = '#31b5ff'
        //     middle.style.background = '#ccc'
        //     strong.style.background = '#ccc'
        //   }
        //   if (num === 2) {
        //     weak.style.background = '#31b5ff'
        //     middle.style.background = '#31b5ff'
        //     strong.style.background = '#ccc'
        //   }
        //   if (num === 3) {
        //     weak.style.background = '#31b5ff'
        //     middle.style.background = '#31b5ff'
        //     strong.style.background = '#31b5ff'
        //   }
        // },
    },

    watch: {
        // passwordJY (val) {
        //   this.form.uUserpass = val
        //   // if(this.passwordJY.length > 12) this.passwordJY = this.passwordJY.slice(0, 12)
        //   this.strength = this.$utils.checkStrong(val)
        //   this.huanse(this.strength)
        // }
    }
};
</script>
<style scoped>
input {
    width: 200px !important;
}
div.el-select {
    width: 200px;
}
.el-form {
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
    border-bottom: 2px dotted #aee1fe;
}
.el-form-item {
    margin-bottom: 5px;
}
/* 按钮 */
.footer-btn .el-button {
    margin-top: 20px;
    /* border: 0px solid #ccc; */
}
.footer-btn .el-button:nth-child(1) {
    background-color: #444;
    color: #fff;
}
.footer-btn .el-button:nth-child(2) {
    background: #fff;
    color: #444 !important;
    border: 1px solid #444;
}

/* 上传文件 */
.avatar-uploader {
  position: absolute;
  left: 45px;
  border-radius: 50%;
  overflow: hidden;
  width: 130px;
  height: 130px;
  /* border: 1px solid; */
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
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
}
.avatar {
    width: 130px;
    height: 130px;
    display: block;
    border-radius: 50%;
}
.redB {
    color: #ef6f6e;
    vertical-align: middle;
    padding: 0 5px 0 20px;
}

.cancel {
    color: #444 !important;
    border: 1px solid #444 !important;
    background-color: #fff !important;
}
</style>
