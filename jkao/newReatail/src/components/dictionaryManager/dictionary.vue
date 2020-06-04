<template>
  <div class="dicitonary">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
      <el-breadcrumb-item :to="{ path: '/operatIndex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
    </el-breadcrumb> -->
    <div class="">
    </div>
    <div class="Case">
      <div class="left">
        <div class="store_list">
          <h3 class="title">字典列表</h3>
          <div class="konge"></div>
          <div class="searchList">
            <table table-bordered width="100%">
              <tr class="tabthsty">
                <th>字典编码</th>
                <th>字典名称</th>
              </tr>
              <tr
                class="hove"
                v-for="(item,index) in options"
                :key="index"
                @click="showother(item.code,index)"
                :class="{active:index==current}"
              >
                <td>{{item.code}}</td>
                <td>{{item.name}}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="tab">
          <div class="shopList">
            <h3 class="title1">字典项列表</h3>
            <img src="@/assets/addsys.png" alt class="addsys" v-if="hideAdd">
            <!-- <img
              src="@/assets/addBtn.png"
              alt
              v-if="showAdd"
              class="add_dictionary"
              @click="adddicitonary"
            > -->
            <el-button class="increase themeColor add_dictionary" @click="adddicitonary" v-if="showAdd">
              <i class="el-icon-plus"></i>新增
            </el-button>
            <div class="konge"></div>
            <el-table :data="tableData" style="width: 100%" border>
              <el-table-column prop="name" label="字典项名称" width align="center"></el-table-column>
              <el-table-column prop="value" label="字典项值" width align="center"></el-table-column>
              <el-table-column prop="description" label="备注 " align="center"></el-table-column>
              <el-table-column prop="opeartion" label="操作" align="center">
                <template scope="scope">
                  <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
                    <a  href="javascript:void(0);">
                      <img src="@/assets/xiugai_icon.png" @click="editor(scope.row)">
                    </a>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
            <!-- 编辑 -->
            <el-dialog
              title="编辑"
              :visible.sync="dialogVisible"
              width="550px"
              v-model="dialogVisible"
            >
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
              >
                <el-form-item label="字典项名称" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="字典项值" prop="value">
                  <el-input v-model="ruleForm.value" readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="description">
                  <el-input type="textarea" v-model="ruleForm.description"></el-input>
                </el-form-item>
                <div class="labelSty">
                  <el-button class="AllquedingBtn" type="primary" @click="determine('ruleForm')">确定</el-button>
                  <el-button class="theBtn resetButton" @click="dialogVisible = false">取消</el-button>
                </div>
              </el-form>
            </el-dialog>
            <!-- 新增 -->
            <el-dialog title="新增" :visible.sync="Visible" width="550px" v-model="Visible">
              <el-form
                :model="addfrom"
                :rules="rules"
                ref="addfrom"
                label-width="100px"
                class="demo-ruleForm"
              >
                <el-form-item label="字典项名称" prop="name">
                  <el-input v-model="addfrom.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="字典项值" prop="value">
                  <el-input v-model="addfrom.value" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input type="textarea" v-model="addfrom.desc" placeholder="选填，不超过20个字符"></el-input>
                </el-form-item>
                <div class="labelSty">
                  <el-button class="AllquedingBtn" type="primary" @click="adddetermine('addfrom')">确定</el-button>
                  <el-button class="theBtn resetButton" @click="Visible = false">取消</el-button>
                </div>
              </el-form>
            </el-dialog>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";

export default {
  data() {
    return {
      options: [],
      id: "",
      form: {
        code: "",
        name: "",
        token: sessionStorage.getItem("token"),
        pageSize: 9999
      },
      tableData: [],
      dialogVisible: false,
      Visible: false,
      ruleForm: {
        name: "",
        value: "",
        description: "",
        token:sessionStorage.getItem("token"),
        id:''
      },
      addfrom: {
        name: "",
        value: "",
        desc: ""
      },
      current: 0,
      codelist: {},
      rules: {
        name: [
          { required: true, message: "请输入字典项名称", trigger: "blur" }
        ],
        value: [{ required: true, message: "请输入字典项值", trigger: "blur" }]
      },
      hideAdd: true, //灰色新增按钮
      showAdd: false //新增按钮
    };
  },
  created() {
    this.getcode();
  },
  methods: {
    seach() {
      this.getcode();
    },
    result() {
      this.form.code = "";
      this.form.name = "";
    },
    getcode() {
      this.$axios
        .post("/sys/dictionary/type/list", qs.stringify(this.form))
        .then(res => {
          if (res.data.code == "0000") {
            this.options = res.data.data;
            // this.total = res.data.data.total;
            this.id = res.data.data;
          } else if (res.data.code == "6666") {
            this.$message({
              showClose: true,
              message: "token异常，请重新登录",
              type: "error"
            });
          }else{
            this.$message.error(res.data.msg);
          }
        });
    },
    showother(e, index) {
      this.hideAdd = false;
      this.showAdd = true;
      this.current = index;
      this.codelist.token = sessionStorage.getItem("token");
      if (e !== "a") this.codelist.code = e;
      let formData = new FormData();
      const obj = this.codelist;
      Object.keys(obj).forEach(key => {
        formData.append(key, obj[key]);
      });
      this.$axios.post("/sys/dictionary/list", formData).then(res => {
        if (res.data.code == "0000") {
          this.tableData = res.data.data;
        }
      });
    },
    dicitonary() {
      this.dialogVisible = true;
    },
    adddicitonary() {
      this.Visible = true;
      this.addfrom.name = "";
      this.addfrom.value = "";
      this.addfrom.desc = "";
    },
    editor(e) {
      console.log(e)
      this.dialogVisible = true;
      this.ruleForm.id = e.id;
      this.ruleForm.name = e.name;
      this.ruleForm.value = e.value;
      this.ruleForm.description = e.description;
      console.log(this.ruleForm.desc)
      // this.ruleForm=e
      // console.log(this.ruleForm)
    },
    //编辑确定
    determine(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.ruleForm)
          console.log(this.ruleForm.description)
          // var editor = [];
          // editor.name = this.ruleForm.name;
          // editor.id = this.id;
          // editor.description = this.ruleForm.description;
          // editor.value = this.ruleForm.value;
          // editor.description = this.ruleForm.desc;
          // editor.token = sessionStorage.getItem("token");
          // let formData = new FormData();
          // const obj = editor;
          // Object.keys(obj).forEach(key => {
          //   formData.append(key, obj[key]);
          // });
          this.$axios.post("/sys/dictionary/update", qs.stringify(this.ruleForm)).then(res => {
            if (res.data.code == "0000") {
              this.dialogVisible = false;
              this.showother("a");
            }
          });
        } else {
          return false;
        }
      });
    },
    //添加
    adddetermine(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var add = [];
          add.token = sessionStorage.getItem("token");
          add.code = this.tableData[0].code;
          add.name = this.addfrom.name;
          add.value = this.addfrom.value;
          add.description = this.addfrom.desc;
          let formData = new FormData();
          const obj = add;
          Object.keys(obj).forEach(key => {
            formData.append(key, obj[key]);
          });
          this.$axios.post("/sys/dictionary/insert", formData).then(res => {
            if (res.data.code == "0000") {
              this.Visible = false;
              this.showother("a");
              this.getcode();
            }else if(res.data.code=="6666"){
              this.$message({
              showClose: true,
              message: 'token异常，请重新登录',
              type: 'error'
              });
              const timer = setTimeout(() => {
              clearTimeout(timer)
              this.$router.push({name: "login"})}, 3000)
            }else{
              this.$message.error(res.data.msg)
            }
          });
        } else {
          return false;
        }
      });
    },
    // 验证
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert('submit!')
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
.dicitonary {
  background-color: #fff;
  min-height: 647px;
  min-width: 1700px;
  height: 100%;
}
.dicitonary h3 {
  margin-bottom: 0px;
  padding-bottom: 0px;
}
.el-dialog__header {
  border-bottom: 2px solid #01c8dc;
}
.active {
  background-color: #eef1f5;
}
.storNumber,
.storName {
  width: 300px;
}
.name {
  margin-left: 30px;
}
.dicitonaryBtn {
  line-height: 90px;
  margin-right: 22px;
  float: right;
}
.dicitonaryBtn button {
  width: 80px;
  height: 30px;
  border: 1px solid #01c8dc;
  margin-left: 15px;
  border-radius: 5px;
}
.add_dictionary:hover {
  opacity: 0.7;
  cursor: pointer;
}
.Case {
  display: flex;
  clear: both;
}
.dicitonary .left {
  width: 450px;
  background-color: #fff;
}
.store_list{
  margin: 0 20px;
  
}
.searchList {
  border: 1px solid #c2c8de;
}
.searchList table tr:last-child {
  border-bottom: none;
}
/* 右边表格部分 */
.dicitonary .right {
  flex: 1;
  background-color: #fff;
  border-radius: 5px;
  height: 824px;
  position: relative;
  overflow: hidden;
}
.add_dictionary,
.addsys {
  margin-right: 20px;
  float: right;
}
.add_dictionary img{
  width: 69px;
}
.tab {
  clear: both;
  position: absolute;
  left: 0;
  top: 0;
  right: -17px;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: scroll;
}
.block {
  margin: 10px auto;
}
.title,
.title1 {
  border-left: 3px solid #e6000b;
  padding-left: 8px;
  color: #444444;
  font-size: 14px;
  font-weight: 800;
  margin-bottom: 0px;
}
.title {
  margin: 20px 0;
}
.shopList {
  margin-top: 20px;
  width: 100%;
}
.shopList .title1,
.shopList p {
  display: inline-block;
}
.shopList p {
  float: right;
}

table {
  border-collapse: collapse;
}
.dicitonary table th {
  height: 40px;
}
.hove {
  border-top: 1px solid #ccd3df;
  border-bottom: 1px solid #ccd3df;
  height: 40px;
  overflow-y: scroll;
}
.hove:hover {
  background-color: #eef1f5;
}
.tabthsty {
  background: #eef1f5;
}
.labelSty{
  text-align: center;
}
</style>