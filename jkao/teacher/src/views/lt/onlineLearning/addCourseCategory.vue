<template>
  <el-card class="f-new box-card">
    <!-- <new-tabs :active="1" :level1="level" level2="课程分类列表" @callback2="courseCategory"></new-tabs> -->
    <h3 v-if="this.$route.query.id">修改课程分类</h3>
    <h3 v-else>新增课程分类</h3>
    <!-- <previous-page goPreviousPage="/courseCategory"></previous-page> -->
    <!-- 考试信息 -->
    <div class="add-exam">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
        <el-form-item label="分类名称:" prop="name">
          <input type="text" maxlength="50" class="add-name" v-model="ruleForm.name" />
          <!-- <span class="add-name-bt">
            *
            <span>必填字段，填写分类名称</span>
          </span> -->
        </el-form-item>
        <el-form-item label="排序标志:" prop="order_by">
          <input type="text" max="999999999" v-model="ruleForm.order_by" class="add-name" oninput="value=value.replace(/[^\d]/g,'')"/>
        </el-form-item>
        <el-form-item label="状态:" prop="status">
          <el-select v-model="ruleForm.status" placeholder="请选择" class="add-status">
            <el-option label="开放" :value="1"></el-option>
            <el-option label="关闭" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类描述:" prop="description">
          <input type="text" maxlength="50" class="add-remark" v-model="ruleForm.description" />
        </el-form-item>
      </el-form>
    </div>
    <add-btn
      style="margin-left: 180px;"
      level1="提 交"
      level2="取 消"
      @submitForm="submitForm"
      @cancelForm="courseCategory"
    ></add-btn>
  </el-card>
</template>

<script>
import qs from 'qs'
import newTabs from "@/components/newTabs";
import previousPage from "@/components/previousPage.vue";
export default {
  data() {
    return {
      type_id: this.$route.query.id,
      ruleForm: {
        name: '',
        status: '',
        description: '',
        order_by: ''
      },
      dialogVisible: false,
      rules: {
        name: [
          { required: true, message: "课程名称不能为空！", trigger: "blur" }
        ],
        order_by: [{ required: true, message: "请输入排序！", trigger: "blur" }],
        status: [
          { required: true, message: "状态不能为空！", trigger: "blur" }
        ],
        // stars: [{ required: true, message: "分值不能为空！", trigger: "blur" }],
        description: [
          { required: true, message: "课程介绍不能为空！", trigger: "blur" }
        ]
      }
    };
    
  },

  computed: {
    level: {
      get: function() {
        return (this.level = !this.$route.query.id
          ? "新增课程分类"
          : "修改课程分类");
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
      const that = this
      that.$utils.post(that.reqApi.shuiwuUrl + `/course/detailType`,qs.stringify({
            type_id: this.type_id
          })).then(res => {
        if (res.data.code == "0000") {
          this.ruleForm = res.data.type
        }
      })
    },

    // 提交
    submitForm() {
      if(!this.ruleForm.name) return this.$message.error('请填写分类名称！')
      if(!this.ruleForm.order_by) return this.$message.error('请填写排序！')
      if(!this.ruleForm.status) return this.$message.error('请选择状态！')
      const that = this;
      const Identification = !that.$route.query.id
        ? that.reqApi.shuiwuUrl + "/course/createType"
        : that.reqApi.shuiwuUrl + "/course/updateType";
      if (that.ruleForm.name !== "") {
        that.$utils.post(Identification, qs.stringify({
          type:JSON.stringify({
            id:this.type_id,
            name: this.ruleForm.name,
            status: this.ruleForm.status,
            description: this.ruleForm.description,
            order_by: this.ruleForm.order_by
          })
        })).then(res => {
          const { code, msg } = res.data;
          if (code === "0000") {
            that.courseCategory();
            that.$message.success(msg);
          } else return that.$message("提交失败！");
        });
      } else return that.$message("请填写分类名称!");
    },

    // 试题列表
    courseCategory() {
      this.$router.push({ name: "courseCategory" });
    }
  }
};
</script>

<style scoped>
/* 考试信息头 */
.add-exam {
  width: 100%;
  height: 450px;
  border: 1px solid #c2cad8;
}

.el-form {
  padding: 30px;
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
.add-remark,.add-status {
  width: 300px;
}
</style>
