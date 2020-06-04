<template>
  <div>
    <el-dialog
            title="修改密码"
            :visible.sync="centerDialogVisible"
            width="500px"
            center
            :before-close="handleClose1"
        >
           <div class="formBox">
                <el-form
                :model="ruleForm2"
                status-icon
                :rules="rules2"
                ref="ruleForm2"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-form-item
                    label="旧密码"
                    prop="oldPassword"
                    :rules="[
         { required: true, message: '请输入旧密码', trigger: 'blur' }
        ]"
                >
                    <el-input type="password" v-model="ruleForm2.oldPassword"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword">
                    <el-input type="password" v-model="ruleForm2.newPassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="theBtn queryButton" @click="submitForm1('ruleForm2')">提交</el-button>
                    <el-button class="theBtn resetButton" @click="resetForm('ruleForm2')">重置</el-button>
                </el-form-item>
            </el-form>
           </div>
        </el-dialog>
  </div>
</template>
<script>
import qs from "qs";
export default {
  data(){
    var validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入新密码"));
            } else if (
                value.toString().length < 6 ||
                value.toString().length > 18
            ) {
                callback(new Error("密码长度为6 - 18个字符"));
            } else {
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value !== this.ruleForm2.newPassword) {
                callback(new Error("确认密码输入有误!"));
            } else {
                callback();
            }
        };
    return{
        ruleForm2: {
                newPassword: "",
                checkPass: "",
                oldPassword: ""
            },
            centerDialogVisible:false,
               rules2: {
                newPassword: [
                    { required: true, validator: validatePass, trigger: "blur" }
                ],
                checkPass: [
                    {
                        required: true,
                        validator: validatePass2,
                        trigger: "blur"
                    }
                ]
            },
    }
  },
  methods:{
     handleClose1() {
            this.$refs.ruleForm2.resetFields();
            this.centerDialogVisible = false;
        },
    submitForm1(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {this.ruleForm2.token = sessionStorage.getItem("token");
                    this.$utils.post(this.reqApi.shuiwuUrl+'/user/changePWD',qs.stringify({
                        oldPassword:this.ruleForm2.oldPassword,
                        newPassword:this.ruleForm2.newPassword
                    })).then(res=>{
                        if(res.data.code==='0000'){
                          this.centerDialogVisible=false
                            this.$message.success('修改成功')
                            this.$router.push({
                                name:'user'
                            })
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
  },
  props:[]
}
</script>