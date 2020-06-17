<template>
  <!-- 编辑弹框 -->
  <div id="attendanceRecord">
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" class="compileDialog">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="旧密码:" prop="oldPassword" label-width="100px">
          <el-input
            v-model="form.oldPassword"
            type="password"
            show-password
            class="compileDialogInp"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码:" prop="newPassword" label-width="100px">
          <el-input
            v-model="form.newPassword"
            type="password"
            show-password
            class="compileDialogInp"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认新密码:" prop="conPassword" label-width="100px">
          <el-input
            v-model="form.conPassword"
            type="password"
            show-password
            class="compileDialogInp"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="rePwd('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { rePwd } from "@/api/user";
  export default {
    data() {
      const checkConPassword = (rule, value, callback) => {
        if (this.form.newPassword !== value) {
          return callback(new Error("请与新密码保持一致"));
        } else {
          callback();
        }
      };
      const checkNewPassword = (rule, value, callback) => {
        if (value.length <= 0) {
          return callback(new Error("请填写新密码"));
        } else if (value === this.form.oldPassword) {
          return callback(new Error("新密码与旧密码重复"));
        } else {
          callback();
        }
      };
      return {
        form: {
          id: JSON.parse(sessionStorage.userInfo).id,
          oldPassword: "",
          newPassword: "",
          conPassword: ""
        },
        // 修改密码弹框开关
        dialogFormVisible: false,
        rules: {
          newPassword: {
            required: true,
            validator: checkNewPassword,
            trigger: "blur"
          },
          oldPassword: {
            required: true,
            message: "请填写旧密码",
            trigger: "blur"
          },
          conPassword: {
            required: true,
            validator: checkConPassword,
            trigger: "blur"
          }
        }
      }
    },
    methods: {
      rePwd(formName) {
        this.$refs[formName].validate(async valid => {
          if (valid) {
            const { id, oldPassword, newPassword } = this.form;
            const {
              data: { code }
            } = await rePwd({ id, oldPassword, newPassword });
            if (code === "0000") {
              this.$message.success("修改成功");
              this.dialogFormVisible = false;
            }
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      }
    }
    
  }
</script>

<style scoped>
/* 编辑弹框 */
.compileDialog .dialog-footer {
  text-align: center;
}
</style>