<template>
  <el-card class="f-new box-card">
    <!-- <new-tabs :active="2" level1="新增课程" level2="课程列表" @callback1="addCourse"></new-tabs> -->
    <h3>配置</h3>
    <!-- <previous-page @back="back"></previous-page> -->
     <div class="previousPage" @click="back">
       <!-- <el-button @click="backHistory" size="mini" >返回</el-button> -->
       <img src="@/assets/images/returnbutton.png"  />
     </div>
    <div class="addBox">
      <el-button @click="addConfigura">新增</el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="tableData" border class="topBorder" style="width: 100%">
      <el-table-column align="center" prop="name" label="教材名称" max-width="300px" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column align="center" label="图标">
        <template slot-scope="scope">
          <img v-if="scope.row.picture" class="img-wid-table" :src="reqApi.shuiwuUrl+scope.row.picture" alt />
        </template>
      </el-table-column>
      <el-table-column align="center" prop="description" label="备注"></el-table-column>
      <el-table-column align="center" prop="create_user_name" label="创建人"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
            <span class="cur-point dis-inline-block" @click="editConfigura(scope.row)">
              <img src="@/assets/images/xiugai_icon.png" alt />&nbsp;&nbsp;&nbsp;
            </span>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="目录" placement="bottom">
            <span class="cur-point dis-inline-block" @click="directory(scope.row)">
              <img src="@/assets/images/mulv_icon.png" alt />&nbsp;&nbsp;&nbsp;
            </span>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="资源库" placement="bottom">
            <span class="cur-point dis-inline-block" @click="repository(scope.row)">
              <img src="@/assets/images/ziyuanku_icon.png" alt />&nbsp;&nbsp;&nbsp;
            </span>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
            <span class="cur-point dis-inline-block" @click="delConfigura(scope.row)">
              <img src="@/assets/images/shanchu_icon.png" alt />
            </span>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[10,20,30,40]"
        :page-size="pageSize"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        class="pagination"
      ></el-pagination>
    </div>
    <el-dialog :title="title" :visible.sync="dialogVisibleData" :show-close="false">
      <el-row class="add-exam">
      <el-row class="add-data">
        <el-form ref="form" :rules="rules" :model="form" label-width="100px">
          <el-form-item label="教材名称:" prop="name">
            <input type="text" maxlength="50" v-model="form.name" id="inputColor" class="inputBbig" />
          </el-form-item>
          <el-form-item label="教材logo:">
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
          </div>
          <div>
          </div>
          <el-form-item label="备注:" prop="description">
            <template>
              <el-input
                type="text"
                maxlength="50"
                placeholder="请课程介绍"
                v-model="form.description"
                style="width: 250px;"
              ></el-input>
            </template>
          </el-form-item>
        </el-form>
      </el-row>
    </el-row>
    <add-btn
      style="margin-left: 60px;padding-bottom:30px"
      level1="提 交"
      level2="取 消"
      @submitForm="submitForm('form')"
      @cancelForm="courseList"
    ></add-btn>
    </el-dialog>
  </el-card>
</template>
<script>
import qs from "qs";
import newTabs from "@/components/newTabs";
import previousPage from "@/components/previousPage.vue";
export default {
  name: "configuration",
  data() {
    return {
      tableData: [],
      course_id: this.$route.query.id,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      dialogVisibleData: false,
      form:{
        name: '',
        description: '',
        picture: ''
      },
      rules: {
        name: [
          { required: true, message: "教材名称不能为空！", trigger: "blur" }
        ],
      },
      title:''
    };
  },

  created() {
    this.getConfiguration();
  },
  components: {
    newTabs,
    "previous-page": previousPage
  },
  mounted(){

    //  sessionStorage.setItem('uuid',this.$route.query.uuid)
    //   sessionStorage.setItem('paramsId',this.$route.query.id)
  },
  methods: {
    back(){
      this.$router.push({
        name:'courseList',
        //  query: {
        //   id: this.$router.query.id
        // }
      })
    },
    // 获取教材列表
    getConfiguration() {
      this.$utils.post(
          this.reqApi.shuiwuUrl + "/textbook/list", qs.stringify({
            course_id: this.course_id
          })
        )
        .then(res => {
          if (res.data.code == "0000") {
            this.tableData = res.data.textbooks.list;
            this.total = res.data.textbooks.total;
          }
        });
    },
    // 新增
    addConfigura() {
      this.title = "新增教材"
      this.dialogVisibleData = true;
      this.form.name = '';
      this.form.description = '';
      this.form.picture = '';
    },
    //新增提交，编辑提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let formData = new FormData();
          const obj = this.form;
          Object.keys(obj).forEach(key => {
            formData.append(key, obj[key]);
          });
          if(this.form.uuid) {
            this.$utils
            .post(
              this.reqApi.shuiwuUrl + "/textbook/update",
              qs.stringify({
                textbook: JSON.stringify({
                  picture: this.form.picture,
                  name: this.form.name,
                  description: this.form.description,
                  uuid : this.form.uuid
                })
              })
            )
            .then(res => {
              const { code, msg } = res.data;
              if (code === "0000") {
                this.getConfiguration();
                this.dialogVisibleData = false;
                this.$message.success("提交成功!");
              } else return this.$message(msg);
            });
          }else{
            this.$utils
            .post(
              this.reqApi.shuiwuUrl + "/textbook/create",
              qs.stringify({
                course_id : this.$route.query.id,
                textbook: JSON.stringify({
                  picture: this.form.picture,
                  name: this.form.name,
                  description: this.form.description
                })
              })
            )
            .then(res => {
              const { code, msg } = res.data;
              if (code === "0000") {
                this.getConfiguration();
                this.dialogVisibleData = false;
                this.$message.success("提交成功!");
              } else return this.$message(msg);
            });
          }
        } else {
          this.$message("请填写完整！");
          return false;
        }
      })
    },
    // 取消
    courseList() {
      this.dialogVisibleData = false;
    },
    // 图片
    handleAvatarSuccess(response, file, fileList) {
      if (file.response) {
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
    // 编辑
    editConfigura(info) {
      this.title = "编辑教材"
      this.dialogVisibleData = true;
      this.$utils
        .post(
          this.reqApi.shuiwuUrl + "/textbook/detail",
          qs.stringify({
            textbook_uuid: info.uuid
          })
        )
        .then(res => {
          if (res.data.code == "0000") {
            this.form = res.data.textbook
          }
        });
    },
    // 目录
    directory(info) {
      this.$router.push({
        name: "configCourse",
        query: { uuid: info.uuid,
        id:this.$route.query.id }
      });
    },

    // 资源库
    repository(info) {
      sessionStorage.setItem('paramsId',this.$route.query.id)
      this.$router.push({
          name: 'uploadResources',
          query: {id: info.uuid}
        })
    },

    // 删除
    delConfigura(info) {
      const that = this;
      that
        .$confirm("删除操作无法恢复，确定删除吗?", "来自网页的消息", {
          cancelButtonText: "取消",
          confirmButtonText: "确定"
        })
        .then(() => {
          that.$utils.post(that.reqApi.shuiwuUrl +`/textbook/delete`,qs.stringify({
            textbook_uuid: info.uuid
          })).then(res => {
            if (res.data.code == "0000") {
              that.getConfiguration();
              that.$message.success("删除成功！");
            }
          });
        })
        .catch(() => {});
    },

    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getConfiguration(this.pageNum, val);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getConfiguration(val, this.pageSize);
    }
  }
};
</script>

<style scoped>
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
.inputBbig {
  width: 250px;
}
</style>
