<template>
  <el-card class="f-new box-card">
    <!-- <new-tabs :active="1" :level1="level" level2="课程列表" @callback2="courseList"></new-tabs> -->
    <h3 v-if="this.$route.query.id">修改课程</h3>
    <h3 v-else>新增课程</h3>
    <previous-page goPreviousPage="/courseList"></previous-page>
    <!-- 考试信息 -->
    <el-row class="add-exam">
      <el-row class="add-data">
        <el-form ref="form" :rules="rules" :model="form" label-width="100px">
          <el-form-item label="课程名称:" prop="name">
            <input type="text" maxlength="50" v-model="form.name" id="inputColor" class="inputBbig" />
          </el-form-item>
          <el-form-item label="课程logo:">
            <el-upload
              class="avatar-uploader"
              :action="`${this.reqApi.shuiwuUrl}/image/upload`"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              name="files"
            >
              <img
                v-if="this.form.picture"
                :src="reqApi.shuiwuUrl+this.form.picture"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <div>
            <el-form-item label="分类:" prop="type" class="wushi">
              <el-select v-model="form.type" placeholder="请选择">
                <el-option
                  v-for="(item,index) in courseCategoryList"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态:" prop="status" class="wushi fr">
              <el-select v-model="form.status" placeholder="请选择">
                <el-option label="开放" :value="1"></el-option>
                <el-option label="关闭" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div>
            <!-- <el-form-item label="分值:" prop="stars" class="wushi">
              <input type="text" maxlength="10" @input="checkNum" v-model="form.stars" class="inputWid" />
            </el-form-item>-->
          </div>
          <el-form-item label="课程介绍:" prop="introduce">
            <template>
              <!-- <div id="editor"></div> -->
              <el-input
                type="textarea"
                :rows="3"
                show-word-limit
                :autosize="{ minRows: 2, maxRows: 4}"
                maxlength="200"
                placeholder="请课程介绍"
                v-model="form.description"
              ></el-input>
            </template>
          </el-form-item>
        </el-form>
      </el-row>
    </el-row>

    <add-btn
      style="margin-left: 160px;"
      level1="提 交"
      level2="取 消"
      @submitForm="submitForm('form')"
      @cancelForm="courseList"
    ></add-btn>
  </el-card>
</template>

<script>
import qs from "qs";
import newTabs from "@/components/newTabs";
import previousPage from "@/components/previousPage.vue";
// import Editor from "wangeditor";
// import "wangeditor/release/wangEditor.min.css";
export default {
  data() {
    return {
      courseCategoryList: [],
      // 缩略图
      // picture: "",
      // 学科分类
      list: [],
      // 章节设定测试
      zhelist: [{ name: "" }],
      form: {
        picture: "",
        name: "",
        type: "",
        description: "",
        status: "",
        token: sessionStorage.getItem("token"),
        course_id: this.$route.query.id
        // stars: "",
        // poster: sessionStorage.getItem("realName"),
        // modifier: sessionStorage.getItem("realName")
      },
      rules: {
        name: [
          { required: true, message: "课程名称不能为空！", trigger: "blur" }
        ],
        type: [{ required: true, message: "分类不能为空！", trigger: "blur" }],
        status: [
          { required: true, message: "状态不能为空！", trigger: "blur" }
        ],
        // stars: [{ required: true, message: "分值不能为空！", trigger: "blur" }],
        description: [
          { required: true, message: "课程介绍不能为空！", trigger: "blur" }
        ]
      }
      // 富文本
      // editor: "",
      // editorOption: {
      //   modules: {
      //     toolbar: [
      //       ["bold", "italic", "underline", "strike"], // toggled buttons
      //       ["blockquote", "code-block"],
      //       [{ header: 1 }, { header: 2 }],
      //       [{ list: "ordered" }, { list: "bullet" }],
      //       [{ script: "sub" }, { script: "super" }],
      //       [{ indent: "-1" }, { indent: "+1" }],
      //       [{ direction: "rtl" }],
      //       // [{ 'size': ['small', false, 'large', 'huge'] }],
      //       // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      //       [{ color: [] }, { background: [] }],
      //       [{ font: [] }],
      //       [{ align: [] }]
      //     ]
      //   }
      // }
    };
  },

  created() {
    this.getfindCourseCategory();
    if (this.$route.query.id) this.findOneCourse();
  },

  components: {
    newTabs,
    "previous-page": previousPage
  },
  computed: {
    level: {
      get: function() {
        return (this.level = !this.$route.query.id ? "新增课程" : "修改课程");
      },
      set: function() {}
    }
  },

  // mounted() {
  //   this.editor = new Editor("#editor");
  //   this.editor.customConfig.onchange = html => {
  //     this.form.introduce = html;
  //   };
  //   this.editor.create();
  // },

  methods: {
    // 获取课程分类列表
    getfindCourseCategory() {
      this.$utils.post(this.reqApi.shuiwuUrl + "/course/listType").then(res => {
        const { code, types } = res.data;
        this.courseCategoryList = types.list;
      });
    },
    //
    checkNum(e) {
      let g = e.target.value;
      //先把非数字的都替换掉，除了数字和.
      g = g.replace(/[^\d]/g, "");
      this.form.stars = g; //设置值
    },
    // 获取编辑详情
    findOneCourse() {
      const that = this;
      that.$utils
        .post(
          this.reqApi.shuiwuUrl + "/course/detail",
          qs.stringify({
            course_id: this.form.course_id
          })
        )
        .then(res => {
          if (res.data.code == "0000") {
            that.form = res.data.course;
            // picture
            // name
            // type
            // description
            // status
            // Object.keys(object).forEach(key => {
            //   if (that.form[key] !== undefined)
            //     return (that.form[key] = object[key]);
            // });
            // that.picture = this.$utils.serverUrl + object.logo;
            // // that.editor.txt.html(that.form.introduce);
            // that.form.status = object.status + "";
            // that.form["cid"] = object.cid;
            // that.form["logo"] = object.logo;
            // that.form.modifier = sessionStorage.realName;
          }
        });
    },
    // 图片
    handleAvatarSuccess(response, file, fileList) {
      // this.imageUrl = URL.createObjectURL(file);
      if (file.response) {
        // let url = "http://192.168.1.171:8080"
        this.form.picture = file.response.imgCodes;
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 增加章节
    addRow(rows) {
      let list = {
        name: ""
      };
      rows.push(list);
    },

    // 删章节
    delRow(row, index) {
      row.splice(index, 1);
    },

    // 提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let formData = new FormData();
          const obj = this.form;
          Object.keys(obj).forEach(key => {
            formData.append(key, obj[key]);
          });
          const Identification = !this.$route.query.id
            ? this.reqApi.shuiwuUrl + "/course/create"
            : this.reqApi.shuiwuUrl + "/course/update";
          this.$utils
            .post(
              Identification,
              qs.stringify({
                token: this.form.token,
                course: JSON.stringify({
                  picture: this.form.picture,
                  name: this.form.name,
                  type: this.form.type,
                  description: this.form.description,
                  status: this.form.status,
                  id: this.$route.query.id
                })
              })
            )
            .then(res => {
              const { code, msg } = res.data;
              if (code === "0000") {
                // this.courseList();
                // this.$message.success("提交成功!");
                this.courseList();
                this.$message.success(`${this.level}成功!`)
              } else return this.$message(msg);
            });
        } else {
          this.$message("请填写完整！");
          return false;
        }
      });
    },
    //缩略图
    // beforeAvatarUpload(file) {
    //   const isJPG = file.type === "image/jpeg";
    //   const isPNG = file.type === "image/png";
    //   const isLt2M = file.size / 1024 / 1024 < 2;
    //   if (!isJPG && !isPNG) {
    //     return this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
    //   }
    //   if (!isLt2M) {
    //     return this.$message.error("上传头像图片大小不能超过 2MB!");
    //   }
    //   this.imageUrl = URL.createObjectURL(file);
    //   this.form.file = file;
    //   return isJPG && isLt2M;
    // },

    // courseList
    courseList() {
      this.$router.push({ name: "courseList" });
    }
  }
};
</script>

<style scoped>
/* 考试信息头 */
.add-exam {
  width: 100%;
  border: 1px solid #c2cad8;
}
.add-data {
  padding: 28px 200px 60px 60px;
}

.newQue-body {
  border: 1px solid #dbdfe6;
}
.newQue-body .new-header {
  height: 50px;
  background-color: #54c9de;
}
.newQue-body .new-body {
  padding: 30px 100px;
}
.wushi {
  display: inline-block;
}

.inputWid {
  width: 250px;
}
.inputBbig {
  width: 360px;
}
div.el-select {
  width: 250px !important;
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
/* tu */
.el-form-item {
  margin-bottom: 14px;
}

/* add-course */
.add-course {
  border: 1px solid #c2cad8;
  padding: 60px 200px 60px 60px;
  overflow: auto;
}

/* 头部表格 */
table {
  border-color: #c2cad8;
  border-collapse: collapse;
  border: 1px solid #c2cad8;
  color: #777;
  margin-bottom: 20px;
}
table tbody tr td {
  padding: 0px 15px;
}
table tbody tr .one-td {
  background-color: #a8e7f0;
  width: 100px;
}
table tbody tr .two-td {
  width: 38%;
}
table tbody tr .three-td {
  width: 33.8%;
}
</style>
