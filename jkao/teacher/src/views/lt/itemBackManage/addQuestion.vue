<template>
  <el-card class="f-new box-card">
    <!-- <new-tabs :active="1" :level1="level" level2="题库列表" @callback2="findQuestionDbs"></new-tabs> -->
    <h3 v-if="this.$route.query.id">修改客观题库</h3>
    <h3 v-else>新增客观题库</h3>
    <previous-page goPreviousPage="/findQuestionDbs"></previous-page>
    <!-- 考试信息 -->
    <div class="add-exam">
      <!-- <add-header level="请填写增加考试信息"></add-header> -->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="名称:" prop="name">
          <input type="text" maxlength="50" class="add-name" v-model="ruleForm.name" />
          <span class="add-name-bt">
            *
            <span>必填字段，填写题库名称</span>
          </span>
        </el-form-item>
        <el-form-item label="状态:" prop="status">
          <el-select v-model="ruleForm.status" placeholder="请选择" class="add-status">
            <el-option label="开放" :value="1"></el-option>
            <el-option label="关闭" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="共享:" prop="shared">
          <el-select v-model="ruleForm.shared" placeholder="请选择" class="add-status">
            <el-option label="共享" :value="1"></el-option>
            <el-option label="私有" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题库说明:" prop="description">
          <input type="text" maxlength="50" class="add-remark" v-model="ruleForm.description" />
        </el-form-item>
      </el-form>
    </div>
    <add-btn
      style="margin-left: 180px;"
      level1="提 交"
      level2="取 消"
      @submitForm="submitForm('ruleForm')"
      @cancelForm="findQuestionDbs"
    ></add-btn>
  </el-card>
</template>

<script>
import qs from "qs";
import newTabs from "@/components/newTabs";
import previousPage from "@/components/previousPage.vue";
export default {
  data() {
    return {
      ruleForm: {
        bank_id: this.$route.query.id,
        // userId: sessionStorage.getItem("userId"),
        name: "",
        description: "",
        status: "",
        shared: ""
      },
      rules: {
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
        shared: [
          { required: true, message: "请选择是否共享", trigger: "change" }
        ]
      }
    };
  },

  computed: {
    level: {
      get: function() {
        return (this.level = !this.$route.query.id
          ? "新增客观题库"
          : "修改客观题库");
      },
      set: function() {}
    }
  },
  components: {
    newTabs,
    "previous-page": previousPage
  },

  created() {
    if (this.$route.query.id) return this.getQuestionInfo();
  },

  methods: {
    getQuestionInfo() {
      this.$utils
        .post(
          this.reqApi.shuiwuUrl + "/question/obj/detailBank",
          qs.stringify({
            bank_id: this.ruleForm.bank_id
          })
        )
        .then(res => {
          if (res.data.code === "0000") {
            this.ruleForm = res.data.objQuBank;
          } else if (res.data.code === 401 || res.data.code === 403) {
            this.$message.error(res.data.msg);
            this.$router.push("/register");
          } else {
            this.$message.error(res.data.msg);
          }
        });
    },

    // 提交
    // submitForm() {
    //   if(this.$route.query.id){
    //     // 编辑
    //     if (this.ruleForm.name !== "") {
    //       this.$utils
    //         .post(
    //             this.reqApi.shuiwuUrl + "/question/obj/updateBank",
    //             qs.stringify({
    //             bank_vo: JSON.stringify({
    //               bank:this.ruleForm,
    //               questions:[{
    //                  objective_question_uuid :'',//客观题UUID
    //                  number :'', //客观题号
    //                  name :'', //题目名称
    //                  content :'', //题目内容
    //                  key :'' //题目答案
    //               }]
    //             })
    //           })
    //         )
    //         .then(res => {
    //           console.log(res.data);
    //           const { code, msg } = res.data;
    //           if (code === '0000') {
    //           this.$router.push({ name : 'findQuestionDbs'})
    //           this.$message.success(`${this.level}成功!`)
    //         }
    //         else return this.$message(msg)
    //         });
    //     } else return this.$message("请填写题库名称!");
    //   }else{
    //     // 新增
    //     if (this.ruleForm.name !== "") {
    //       this.$utils
    //         .post(
    //             this.reqApi.shuiwuUrl + "/question/obj/createBank",
    //             qs.stringify({
    //               bank: JSON.stringify(this.ruleForm)
    //             })
    //         )
    //         .then(res => {
    //           console.log(res.data);
    //           const { code, msg } = res.data;
    //           if (code === '0000') {
    //           this.$router.push({ name : 'findQuestionDbs'})
    //           this.$message.success(`${this.level}成功!`)
    //         }
    //         else return this.$message(msg)
    //         });
    //     } else return this.$message("请填写题库名称!");
    //   }
    // },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const that = this;
          const Identification = !that.$route.query.id
            ? this.reqApi.shuiwuUrl + "/question/obj/createBank"
            : this.reqApi.shuiwuUrl + "/question/obj/updateBank";
          if (that.ruleForm.name !== "") {
            that.$utils
              .post(
                Identification,
                qs.stringify({
                  bank: JSON.stringify({
                    name: that.ruleForm.name,
                    description: that.ruleForm.description,
                    status: that.ruleForm.status,
                    shared: that.ruleForm.shared,
                    objective_bank_id: that.$route.query.id
                  })
                })
              )
              .then(res => {
                const { code, msg } = res.data;
                if (code === "0000") {
                  this.$router.push({ name: "findQuestionDbs" });
                  this.$message.success(`${this.level}成功!`);
                }
              });
          } else return that.$message("请填写题库名称!");
        } else {
          return false;
        }
      });
    },

    // 试题列表
    findQuestionDbs() {
      this.$router.push({ name: "findQuestionDbs" });
    }
  }
};
</script>

<style scoped>
/* 考试信息头 */
.add-exam {
  width: 100%;
  /* height: 450px; */
  /* border: 1px solid #c2cad8; */
}

.el-form {
  padding: 26px;
}

/* 输入框的样式 */
/* 添加图标 */
.add-img {
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  background-color: #ededed;
  color: #fff;
  font-size: 30px;
}

/* 名称输入框 */
.add-name {
  width: 300px;
}
.add-name-bt {
  color: red;
  padding-left: 10px;
}
.add-name-bt span {
  color: #ccc;
  padding-left: 10px;
}
/* 状态输入框 */
/* 题库说明输入框 */
.add-remark,
.add-exam .el-select {
  width: 300px;
}
/* 缩略图 */
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  background-color: #dbdfe6;
  border-radius: 6px;
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
  color: #fff;
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
</style>
