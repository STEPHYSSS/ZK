<template>
  <div class="category">
    <p class="store_tit marStore">类目管理</p>
    <div class="warpper">
      <div class="left">
        <div class="left_list">
          <div class="searchList">
            <h3 class="same">商品类目结构</h3>
            <el-tree
              :data="data"
              :props="defaultProps"
              :highlight-current="true"
              :expand-on-click-node="false"
              @node-click="handleNodeClick"
              style="min-width:300px"
            ></el-tree>
            <!-- <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree> -->
          </div>
        </div>
      </div>
      <div class="right">
        <el-row>
          <el-button size="mini" @click="addSameLevel('新增同级类目')" class="btn chaxunBtn">新增同级类目</el-button>
          <el-button
            size="mini"
            @click="addSameLevel('新增下级类目')"
            :disabled="disabled"
            class="chongzhiBtn"
          >新增下级类目</el-button>
        </el-row>
        <div class="catebox">
          <div class="boxNum">
            <p class="code code1">类目编码：{{formData.code}}</p>
            <p class="code">类目级别：{{formData.level}}</p>
          </div>
          <el-form :model="formData" ref="formData" label-width="80px">
            <el-form-item
              prop="name"
              label="类目名称"
              :rules="[{ required: true, message: '请输入类目名称', trigger: 'blur' }]"
            >
              <el-input v-model="formData.name" class="inputkuang" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" v-model="formData.description"></el-input>
            </el-form-item>
            <el-form-item label="图标" label-width="80px">
              <el-upload
                :action="`${this.uploadUrl}/image/upload`"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="onSuccess"
                :before-upload="beforeUpload"
                :on-change="astrict"
                :data="data1"
                name="files"
                accept=".jpg, .jpeg, .png, .JPG, .JPEG"
                :file-list="fileList"
                :show-file-list="true"
                :limit="limitCount"
                :class="{hide:hideUpload}"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <span style="color:red">图片(最多上传1张图片，单张图片2M以内)</span>
              <el-dialog :visible.sync="dialogVisible1">
                <img width="100%" :src="dialogImageUrl" alt />
              </el-dialog>
            </el-form-item>
            <div class="btnBox33">
              <el-button @click="updateSame('formData')" class="AllquedingBtn">保存</el-button>
              <el-button @click="delCategory(formData.code)" class="chaxunBtn">删除</el-button>
            </div>
          </el-form>
        </div>
        <!--  新增类目弹窗 -->
        <el-dialog :title="titleText" :visible.sync="dialogVisible" width="720px">
          <div class="formBox">
            <div class="boxNum">
              <p class="code code1">类目编码：{{formData1.code}}</p>
              <p class="code">类目级别：{{formData1.level}}</p>
            </div>
            <el-form :model="formData1" ref="formData1" :rules="rules" label-width="80px">
              <el-form-item prop="name" label="类目名称">
                <el-input class="inputkuang" v-model="formData1.name" placeholder="请输入" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input type="textarea" v-model="formData1.description"></el-input>
              </el-form-item>
              <el-form-item label="图标" label-width="80px">
                <el-upload
                  :action="`${this.uploadUrl}/image/upload`"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview1"
                  :on-remove="handleRemove1"
                  :on-success="onSuccess1"
                  :before-upload="beforeUpload1"
                  :on-change="astrict1"
                  :data="data1"
                  name="files"
                  accept=".jpg, .jpeg, .png, .JPG, .JPEG"
                  :file-list="fileList1"
                  :show-file-list="true"
                  :limit="limitCount"
                  :class="{hide:hideUpload1}"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
                <span style="color:red">图片(最多上传1张图片，单张图片2M以内)</span>
                <el-dialog :visible.sync="dialogVisible1">
                  <img width="100%" :src="dialogImageUrl1" alt />
                </el-dialog>
              </el-form-item>
              <div class="btnBox33">
                <el-button @click="sameLevel('formData1')" class="AllquedingBtn">保存</el-button>
              </div>
            </el-form>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "label"
      },
      dialogVisible: false,
      disabled: false,
      titleText: "",
      data: [],
      formData: {
        name: "",
        level: "",
        description: "",
        image: "",
        token: sessionStorage.getItem("token")
      },
      formData1: {
        name: "",
        code: "",
        level: "",
        pcode: "",
        description: "",
        image: "",
        token: sessionStorage.getItem("token")
      },
      CategoryCode: "",
      backupsCode: "",
      rules: {
        name: [
          {
            required: true,
            message: "请输入类目名称",
            trigger: "blur"
          }
        ]
      },
      token: sessionStorage.getItem("token"),
      //   图片相关
      data1: {
        token: sessionStorage.getItem("token")
      },
      limitCount: 1,
      hideUpload: false,
      dialogImageUrl: "",
      dialogVisible1: false,
      fileList: [],
      imageUrl: "",
      // 新增
      hideUpload1: false,
      dialogImageUrl1: "",
      fileList1: [],
      imageUrl1: ""
    };
  },
  created() {
    this.getThree();
  },
  mounted() {},
  methods: {
    handleClose(done) {
      done();
    },
    // 删除
    delCategory(code) {
      this.$axios({
        url: window.apiUrl + "goods/type/delete",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          code: code,
          token: this.token
        })
      }).then(res => {
        if (res.data.code === "0000") {
          this.$message.success("删除成功！");
          this.getThree();
          this.formData.name = "";
          this.formData.level = "";
          this.formData.code = "";
          this.formData.description = "";
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    addSameLevel(tit) {
      if (this.data.length == 0) {
        this.dialogVisible = true;
      } else {
        if (!this.CategoryCode) {
          return this.$message.error("请选择类目！");
        }
        this.dialogVisible = true;
      }

      this.categoryDetail();
      this.titleText = tit;
      this.backupsCode = this.formData1.code;

      // if (tit == "新增同级类目") {
      // } else if (tit == "新增下级类目") {
      // }
    },
    updateSame(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.formData1.level == 1) {
            this.formData1.code = 0;
          }
          this.$axios({
            url: window.apiUrl + "goods/type/update",
            method: "POST",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            data: qs.stringify(this.formData)
          }).then(res => {
            if (res.data.code === "0000") {
              this.$message.success("修改成功！！");
              this.CategoryCode = "";
              // this.formData.name = "";
              // this.formData.level = "";
              // this.formData.code = "";
              // this.formData.image = "";
              this.getThree();
            }
          });
        }
      });
    },
    // 新增
    sameLevel(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let code = this.formData1.code;
          if (this.titleText === "新增同级类目") {
            if (this.formData1.level == 1 || this.data.length == 0) {
              this.formData1.code = 0;
            } else {
              this.formData1.code = this.formData1.pcode;
            }
          }
          this.$axios({
            url: window.apiUrl + "goods/type/insert",
            method: "POST",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            data: qs.stringify({
              token: this.token,
              pcode: this.formData1.code,
              name: this.formData1.name,
              description: this.formData1.description,
              image: this.formData1.image
            })
          }).then(res => {
            if (res.data.code === "0000") {
              this.$message.success("新增成功！");
              this.dialogVisible = false;
              this.formData1.code = "";
              this.formData1.level = "";
              this.formData1.name = "";
              this.formData1.description = "";
              this.formData1.image = "";
              this.CategoryCode = "";
              this.getThree();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        }
      });
    },
    // 类目树
    getThree() {
      this.$axios({
        url: window.apiUrl + "goods/type/tree",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          pcode: "0",
          token: this.token
        })
      }).then(res => {
        if (res.data.code === "0000") {
          this.data = res.data.data;
        }
      });
    },
    handleNodeClick(data) {
      // 类目编号
      this.CategoryCode = data.code;
      this.categoryDetail();
      if (data.level == 3) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    },
    // 详情
    categoryDetail() {
      this.$axios({
        url: window.apiUrl + "goods/type/detail",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: this.token,
          code: this.CategoryCode
        })
      }).then(res => {
        if (res.data.code === "0000") {
          this.formData.name = res.data.data.name;
          this.formData.code = res.data.data.code;
          this.formData.level = res.data.data.level;
          this.formData.description = res.data.data.description;
          this.formData.image = res.data.data.image;
          if (this.formData.image != null && this.formData.image != "") {
            this.fileList = [];
            let url = "";
            // let url = "http://192.168.1.168:8080";
            // url: this.uploadUrl + this.form.image
            this.fileList.push({
              url: this.uploadUrl + this.formData.image
            });
          } else {
            this.fileList = [];
          }
          this.hideUpload = this.fileList.length >= this.limitCount;
          this.formData1.level = res.data.data.level;
          this.formData1.code = res.data.data.code;
          this.formData1.pcode = res.data.data.pcode;
        }
      });
    },
    // 图片上传
    astrict(file, fileList) {
      this.hideUpload = fileList.length >= this.limitCount;
    },
    handleRemove(file, fileList) {
      this.formData.image = [];
      this.hideUpload = fileList.length >= this.limitCount;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible1 = true;
    },
    onSuccess(response, file, fileList) {
      if (file.response) {
        this.formData.image = file.response.data;
      }
      this.hideUpload = fileList.length >= this.limitCount;
    },
    beforeUpload(file) {
      if (file.size > 2 * 1024 * 1024) {
        return this.$message.error(file.name + "图片超过2M 不允许上传");
      }
    },
    handleAvatarSuccess(res, file) {
      this.formData.image = res.data;
    },
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        "image/png" ||
        "image/jpg" ||
        "image/JPG" ||
        "image/JPEG";
      const isLt2M = file.size / 1024 / 1024 < 1;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 复制图片上传的
    astrict1(file, fileList) {
      this.hideUpload1 = fileList.length >= this.limitCount;
    },
    handleRemove1(file, fileList) {
      this.formData1.image = [];
      this.hideUpload1 = fileList.length >= this.limitCount;
    },
    handlePictureCardPreview1(file) {
      this.dialogImageUrl1 = file.url;
      this.dialogVisible1 = true;
    },
    onSuccess1(response, file, fileList) {
      if (file.response) {
        this.formData1.image = file.response.data;
      }
      this.hideUpload1 = fileList.length >= this.limitCount;
    },
    beforeUpload1(file) {
      if (file.size > 2 * 1024 * 1024) {
        return this.$message.error(file.name + "图片超过2M 不允许上传");
      }
    }
  }
};
</script>

<style scoped>
.category {
  background-color: #fff;
  min-height: 647px;
  width: 100%;
}
.warpper {
  display: flex;
}
.left {
  width: 300px;
  border-radius: 5px;
  margin-right: 20px;
  min-height: 486px;
  margin: 0 20px;
}
.left_list {
  border: 1px solid #c2c8de;
  height: 690px;
  overflow: auto;
}
.searchList {
  padding: 5px;
  height: 100%;
}
.searchList table tr:last-child {
  border-bottom: none;
}
/* 右边表格部分 */
.right {
  flex: 1;
  border: 1px solid #c2c8de;
  border-radius: 5px;
}

.catebox,
.catebox2 {
  /* height: 400px; */
  width: 600px;
  border-radius: 10px;
  border: 1px solid #c8c8c8;
}
.btn,
.catebox {
  margin: 15px 35px;
  /* background-color: #01c8dc; */
}
.catebox {
  padding: 0 0 15px 15px;
}
.catebox2 {
  margin: 0 auto;
}
.right .el-input {
  width: 40%;
}
.right .el-textarea {
  width: 73%;
}
/* 共同部分 */
.same,
.same1 {
  border-left: 3px solid #e6000b;
  padding-left: 8px;
  color: #888888;
}
.same {
  margin: 8px 0;
  padding-bottom: 0px;
}
.code {
  display: inline-block;
  width: 45%;
}
.code1 {
  margin: 15px;
}
/* 更改部分样式 */
.marStore {
  margin-left: 20px;
}
.chaxunBtn {
  background-color: #444444;
  color: #fff;
}
.chongzhiBtn {
  background-color: #fff;
  color: #444444;
  border: 1px solid #555555;
  margin-left: 10px;
}
.chaxunBtn,
.chongzhiBtn {
  width: auto;
  height: 32px;
  border-radius: 5px;
  line-height: 10px;
}
.chaxunBtn:hover,
.chongzhiBtn:hover {
  cursor: pointer;
  background-color: rgba(68, 68, 68, 0.8);
  color: #fff;
  border-color: #444;
}
</style>
