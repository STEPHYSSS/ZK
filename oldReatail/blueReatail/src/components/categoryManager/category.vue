<template>
  <div class="category">
    <p class="store_tit marStore">类目管理</p>
    <div class="warpper">
      <div class="left">
        <div class="left_list">
          <div class="searchList">
            <h3 class="same">商品类目结构</h3>
            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
          </div>
        </div>
      </div>
      <div class="right">
        <el-row>
          <el-button
            size="mini"
            @click="tongji=1, showInfo=false,dialogVisible = true"
            :disabled="!codea && !level"
            class="btn chaxunBtn"
          >新增同级类目</el-button>
          <el-button
            size="mini"
            :disabled="!codea && !level || codea.length == 9"
            @click="tongji=2,showInfo=false,dialogVisible = true"
            v-show="hideAdd"
            class="chongzhiBtn"
          >新增下级类目</el-button>
        </el-row>
        <div class="catebox" v-show="tongji!=0 || showInfo">
          <div class="boxNum">
            <p class="code code1">类目编码：{{this.codea}}</p>
            <p class="code">类目编码：{{this.level}}</p>
          </div>
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="类目名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" v-model="form.description"></el-input>
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
            <el-form-item>
              <el-button type="primary" class="AllquedingBtn" @click="baocun">保存</el-button>
              <el-button class="chaxunBtn" @click="delTree">删除</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- 弹框 -->
        <el-dialog
          :visible.sync="dialogVisible"
          width="720px"
          :title="tongji == 1 ? '新增同级类目':'新增下级类目'"
        >
          <div class="catebox" v-show="tongji!=0 || showInfo">
            <div class="boxNum">
              <p class="code code1">类目编码：{{this.codea}}</p>
              <p class="code">类目编码：{{this.level}}</p>
            </div>
            <el-form ref="form2" :model="form2" label-width="80px">
              <el-form-item label="类目名称">
                <el-input v-model="form2.name"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input type="textarea" v-model="form2.description"></el-input>
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
              <el-form-item>
                <el-button type="primary" class="AllquedingBtn" @click="baocun2">保存</el-button>
                <el-button v-if="showInfo" class="chaxunBtn" @click="delTree2">删除</el-button>
              </el-form-item>
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
  name: "category",
  data() {
    return {
      showInfo: false,
      codea: "",
      level: "",
      tongji: 0,
      data: [],
      form: {
        code: "",
        name: "",
        description: "", //备注
        pcode: "",
        image: ""
      },
      form2: {
        code: "",
        name: "",
        description: "", //备注
        pcode: "",
        image: ""
      },
      defaultProps: {
        children: "children",
        label: "label"
      },
      dialogVisible: false,
      hideAdd: true,
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
      dialogVisible1: false,
      fileList1: [],
      imageUrl1: ""
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let token = sessionStorage.getItem("token");
      this.$axios({
        url: window.apiUrl + "goods/type/tree",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          pcode: "0",
          token: token
        })
      })
        .then(res => {
          if (res.data.code === "0000") {
            this.data = res.data.data;
          } else if (res.data.code === "6666") {
            this.$message({
              showClose: true,
              message: "token异常，请重新登录",
              type: "error"
            });
            const timer = setTimeout(() => {
              clearTimeout(timer);
              this.$router.push({ name: "login" });
            }, 3000);
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log("数据异常", err);
        });
    },
    handleNodeClick(data) {
      this.codea = data.code;
      this.level = data.level;
      this.showInfo = true;
      this.tongji = 0;
      this.getdetai();
      if (this.level == 3) {
        this.hideAdd = false;
      } else {
        this.hideAdd = true;
      }
    },
    // 同级目录
    baocun() {
      let info = this.showInfo
        ? `${window.apiUrl}goods/type/update`
        : `${window.apiUrl}goods/type/insert`;
      if (this.level == "1" && this.tongji == 1) this.codea = 0;
      if (this.level == "2" && this.tongji == 1)
        this.codea = this.codea.substring(0, this.codea.length - 4);
      if (this.level == "3" && this.tongji == 1)
        this.codea = this.codea.substring(0, this.codea.length - 5);
      let token = sessionStorage.getItem("token");
      this.form.pcode = this.codea;
      this.form.token = token;
      this.$axios({
        url: info,
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify(this.form)
      }).then(res => {
        console.log(res);
        if (res.data.code == "0000") {
          this.$message({
            type: "success",
            message: "保存成功"
          });
          this.dialogVisible = false;
          this.showInfo = false;
          this.getData();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    baocun2() {
      let info = this.showInfo
        ? `${window.apiUrl}goods/type/update`
        : `${window.apiUrl}goods/type/insert`;
      if (this.level == "1" && this.tongji == 1) this.codea = 0;
      if (this.level == "2" && this.tongji == 1)
        this.codea = this.codea.substring(0, this.codea.length - 4);
      if (this.level == "3" && this.tongji == 1)
        this.codea = this.codea.substring(0, this.codea.length - 5);
      let token = sessionStorage.getItem("token");
      this.form2.pcode = this.codea;
      this.form2.token = token;
      this.$axios({
        url: info,
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify(this.form2)
      }).then(res => {
        if (res.data.code == "0000") {
          this.$message({
            type: "success",
            message: "保存成功"
          });
          this.dialogVisible = false;
          this.showInfo = false;
          this.getData();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 获取编辑信息
    getdetai() {
      let token = sessionStorage.getItem("token");
      let a = {
        code: this.codea,
        token: token
      };
      this.$axios({
        url: window.apiUrl + "goods/type/detail",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify(a)
      })
        .then(res => {
          this.form.code = res.data.data.code;
          this.form.name = res.data.data.name;

          this.form.description = res.data.data.description;
          //备注
          this.form.pcode = res.data.data.pcode;

          this.form.image = res.data.data.image;
          if (this.form.image != null && this.form.image != "") {
            this.fileList = [];
            let url = "";
            // let url = "http://192.168.1.168:8080";
            this.fileList.push({
              url: this.uploadUrl + this.form.image
            });
          } else {
            this.fileList = [];
          }
          this.hideUpload = this.fileList.length >= this.limitCount;
        })
        .catch(err => {
          console.log("数据异常", err);
        });
    },
    // 删除
    delTree() {
      let token = sessionStorage.getItem("token");
      let a = {
        code: this.codea,
        token: token
      };
      this.$confirm("确定删除此类目?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            url: window.apiUrl + "goods/type/delete",
            method: "POST",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            data: qs.stringify(a)
          }).then(res => {
            const {
              data: { code, msg }
            } = res;
            if (code == "0000") {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.dialogVisible = false;
              this.getData();
              this.codea = "";
              this.level = "";
              this.form.name = "";
              this.form.description = "";
              this.showInfo = false;
            } else return this.$message(msg);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    delTree2() {
      let token = sessionStorage.getItem("token");
      let a = {
        code: this.codea,
        token: token
      };
      this.$confirm("确定删除此类目?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            url: window.apiUrl + "goods/type/delete",
            method: "POST",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            data: qs.stringify(a)
          }).then(res => {
            const {
              data: { code, msg }
            } = res;
            if (code == "0000") {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.dialogVisible = false;
              this.showInfo = false;
              this.getData();
              this.codea = "";
              this.level = "";
              this.form2.name = "";
              this.form2.description = "";
              this.showInfo = false;
            } else return this.$message(msg);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 图片上传
    astrict(file, fileList) {
      this.hideUpload = fileList.length >= this.limitCount;
    },
    handleRemove(file, fileList) {
      console.log(file);
      this.form.image = [];
      console.log(this.form.image);
      this.hideUpload = fileList.length >= this.limitCount;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible1 = true;
    },
    onSuccess(response, file, fileList) {
      // console.log(file, "file");
      // console.log(fileList, "fileList");
      if (file.response) {
        this.form.image = file.response.data;
      }
      this.hideUpload = fileList.length >= this.limitCount;
    },
    beforeUpload(file) {
      if (file.size > 2 * 1024 * 1024) {
        return this.$message.error(file.name + "图片超过2M 不允许上传");
      }
    },
    // 图片上传
    handleAvatarSuccess(res, file) {
      // let url = "http://192.168.1.168:8080";
      // this.imageUrl= res.data
      this.form.image = res.data;
    },
    beforeAvatarUpload(file) {
      // console.log(file);
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
      this.form2.image = [];
      this.hideUpload1 = fileList.length >= this.limitCount;
    },
    handlePictureCardPreview1(file) {
      this.dialogImageUrl1 = file.url;
      this.dialogVisible1 = true;
    },
    onSuccess1(response, file, fileList) {
      if (file.response) {
        this.form2.image = file.response.data;
      }
      this.hideUpload1 = fileList.length >= this.limitCount;
    },
    beforeUpload1(file) {
      if (file.size > 2 * 1024 * 1024) {
        return this.$message.error(file.name + "图片超过2M 不允许上传");
      }
    },
    // 图片上传
    handleAvatarSuccess(res, file) {
      this.form2.image = res.data;
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
    }
  },
  watch: {
    showInfo: function(val) {
      if (!val) {
        this.form = {};
        this.form2 = {};
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
  width: 30%;
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
