<template>
    <el-card class="f-new box-card">
        <!-- <new-tabs :active="1" :level1="level" level2="管理列表" @callback2="adminList"></new-tabs> -->
        <h3 v-if="this.$route.query.id">修改管理员</h3>
        <h3 v-else>新增管理员</h3>
        <previous-page goPreviousPage="/studentAdminList"></previous-page>
        <el-form
            ref="form"
            :model="form"
            :rules="rules"
            style="padding-top: 20px;"
            label-width="80px"
            class="pageForm"
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
                <input maxlength="50" v-if="form.username" oninput="value=value.replace(/[\u4E00-\u9FA5]/g,'')" type="text" v-model="form.username" :disabled="disabledName" />
                <input maxlength="50" v-else oninput="value=value.replace(/[\u4E00-\u9FA5]/g,'')" type="text"
                    @blur="checkUsername" v-model="username" />
                <span>
                    <template v-if="!msg">
                        <span class="redB">*</span>填写英文和数字组成的用户名
                    </template>
                    <span v-else>{{usermsg}}</span>
                </span>
            </el-form-item>
            <el-form-item label="姓名:" prop="realname">
                <input maxlength="50" type="text" v-model="form.realname" />
                <span>
                    <span class="redB">*</span>填写用户的真实姓名
                </span>
            </el-form-item>
            <el-form-item label="工号:" prop="num">
                <input
                    v-if="form.num"
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
                    @blur="checknum"
                    v-model="number"
                />{{nummsg}}
            </el-form-item>
            <el-form-item label="联系电话:">
                <input  maxlength="11"
                    type="text"
                    oninput="value=value.replace(/[^\d]/g,'')" v-model="form.phone" />
            </el-form-item>
            <el-form-item label="电子邮箱:">
                <input maxlength="50" type="text" v-model="form.email" />
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
                <el-button type="danger" class="modifyPsd" plain v-if="$route.query.id === userId" @click="dialogFormVisible = true">修改密码</el-button>
                <add-btn
                    level1="提 交"
                    level2="取 消"
                    @submitForm="submitForm('form')"
                    @cancelForm="adminList"
                ></add-btn>
            </el-form-item>
        </el-form>


        <!-- 修改密码弹框 -->
        <!-- <el-dialog title="修改密码" :visible.sync="dialogFormVisible" center :before-close="handleClose">
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
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="modifyNotarize">确 定</el-button>
            </div>
        </el-dialog> -->

    </el-card>
</template>

<script>
import newTabs from "@/components/newTabs";
import previousPage from "@/components/previousPage.vue";
import qs from 'qs'
export default {
    data() {
        return {
            data1: {
                token: sessionStorage.getItem("token")
            },
            imageUrl: require("@/assets/images/img.png"),
            errorImg: 'this.src="' + require("@/assets/images/failToLoad.png") + '"',
            list: [],
            disabledName: true,//禁止改变用户名
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
            number: '',
            username: '',
            rules: {
                num: [
                    {
                        required: true,
                        message: "请输入工号",
                        trigger: "change"
                    }
                ],
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
            formLabelWidth: '120px',
            usermsg: '',
            nummsg: '',
            psw: {
                oldPsw: '',
                newPsw: '',
                surePsw: '',
            },
            userId: sessionStorage.userId,
        };
    },

    computed: {
        level: {
            get: function() {
                return (this.level = !this.$route.query.id
                    ? "新增管理员"
                    : "修改管理员");
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
                    this.msg = msg;
                } else {
                    this.msg = msg;
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
                    this.usermsg = msg;
                } else {
                    this.usermsg = msg;
                }
            });
        },
        getAdminInfo() {
            const that = this;
            // that.form = JSON.parse(sessionStorage.getItem("oneTeacher"))
            that.$utils.post(that.reqApi.shuiwuUrl+'/manager/detail',qs.stringify({
                 manager_id: that.$route.query.id
               })).then(res=>{
                   const {code, msg, manager} = res.data;
                 if(code==='0000'){
                     that.form = manager;
                     if(that.form.user_photo){
                      that.imageUrl=that.reqApi.shuiwuUrl + that.form.user_photo
                    }
                 }else{
                     that.$message(msg)
                 }
               })
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
            this.form.user_photo = file;
            return testmsg && isLt2M;
        }, //成功
        handleAvatarSuccess(res, file) {
            this.form.user_photo=res.imgCodes
        },

        // 返回管理列表页面
        adminList() {
          this.$router.push({ name: "studentAdminList" });
        },

        //修改密码
        //修改密码-（确定）
        // modifyNotarize(){
        //   let that = this;
        //   if(that.psw.newPsw != that.psw.surePsw){
        //     that.$message('两次密码不一致')
        //   }else if(that.psw.newPsw == '' || that.psw.oldPsw == '' || that.psw.surePsw == ''){
        //     that.$message('请输入密码')
        //   }else{
        //     that.$utils.post(that.reqApi.shuiwuUrl+'/user/changePWD',qs.stringify({
        //           oldPassword: that.psw.oldPsw,
        //           newPassword: that.psw.newPsw
        //         })).then(res=>{
        //             const {code, msg} = res.data;
        //           if(code==='0000'){
        //               that.handleClose()
        //               that.$message.success('修改成功')
        //           }else{
        //               that.$message(msg)
        //           }
        //         })
        //   }
        // },
        // // 修改密码-（取消）
        // handleClose(done) {
        //   this.psw.oldPass = '';
        //   this.psw.newPsw = '';
        //   this.sureNewPass = '';
        //   this.dialogFormVisible = false
        // },

        // 提交
        submitForm(formName) {
            if (this.username) this.form.username = this.username
            if (this.number) this.form.num = this.number
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
                    if(this.$route.query.id){
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
                          remark:this.form.remark,
                          user_photo:this.form.user_photo
                      }
                      this.$utils.post(this.reqApi.shuiwuUrl+'/manager/update',qs.stringify({
                        user:JSON.stringify(formPost)
                      })).then(res=>{
                          const {code, msg} = res.data;
                        if(code==='0000'){
                          this.$message.success('修改成功')
                          // sessionStorage.removeItem('oneTeacher')
                          this.$router.push({
                            name:'studentAdminList'
                          })
                        }else{
                            this.$message(msg)
                        }
                      })
                    }else {
                      this.$utils.post(this.reqApi.shuiwuUrl+'manager/create',qs.stringify({
                        user:JSON.stringify(this.form)
                      })).then(res=>{
                        if(res.data.code==='0000'){
                          this.$message.success('新增成功')
                          this.$router.push({
                            name:'studentAdminList'
                          })
                        }else{
                            this.$message(res.data.msg)
                        }
                      })
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
