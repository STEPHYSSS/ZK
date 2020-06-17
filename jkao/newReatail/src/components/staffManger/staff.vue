<template>
  <div class="staff">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
      <el-breadcrumb-item :to="{ path: '/operatIndex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>职员管理</el-breadcrumb-item>
    </el-breadcrumb>-->
    <div class="storeBox storeBox222">
      <div class="store_Box">
        <p class="store_tit">职员管理</p>
        <el-row style="white-space: nowrap;">
          <el-col :span="6">
            <span>姓名：</span>
            <p>
              <el-input type="text" placeholder="请输入" v-model="form.realname" class="storNumber"></el-input>
            </p>
          </el-col>
          <el-col :span="6" class="TongCenter">
            <span>用户名：</span>
            <p>
              <el-input type="text" placeholder="请输入" v-model="form.username" class="storName"></el-input>
            </p>
          </el-col>
          <el-col :span="12" class="TongRight">
            <el-button class="theBtn queryButton" @click="seach">查询</el-button>
            <el-button class="theBtn resetButton" @click="result">重置</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="storeInfo">
      <div class="addStore">
        <!-- <img src="@/assets/addBtn.png" @click="add_staff" /> -->
        <el-button class="increase themeColor" @click="add_staff">
          <i class="el-icon-plus"></i>新增
        </el-button>
      </div>
      <div class="hidescoll">
        <div class="store_Box12">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="realname" label="姓名" align="center"></el-table-column>
            <el-table-column prop="username" label="登录用户名" align="center"></el-table-column>
            <el-table-column prop="department" label="部门 " align="center"></el-table-column>
            <el-table-column prop="roleName" label="职员类型 " align="center"></el-table-column>
            <el-table-column prop="remark" label="备注" align="center"></el-table-column>
            <el-table-column prop="createTime" label="创建时间 " align="center">
              <template scope="scope">{{scope.row.createTime | fmtDate2('YYYY-MM-DD')}}</template>
            </el-table-column>
            <el-table-column prop="opeartion" label="操作" align="center" fixed="right">
              <template scope="scope">
                <div class="tootip">
                  <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
                    <img
                      src="@/assets/xiugai_icon.png"
                      @click="editShow(scope.row)"
                      class="imgSize"
                    />
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                    <img src="@/assets/shanchu_icon.png" @click="del(scope.row)" class="imgSize" />
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="重置" placement="bottom">
                    <img
                      src="@/assets/resetpasswords_icon.png"
                      @click="pwdClick(scope.row)"
                      class="imgSize"
                    />
                  </el-tooltip>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="konge"></div>
          <div class="paginStyle">
            <el-pagination
              :current-page="pageNum"
              :page-sizes="pagesizes"
              :page-size="form.pageSize"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
          <div class="konge"></div>
        </div>
      </div>
    </div>
    <!-- 店员新增 -->
    <el-dialog
      title="职员新增"
      :visible.sync="dialogVisible"
      width="550px"
      center
      v-model="dialogVisible"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <div class="prompt">
          <div class="prot">
            <div class="pro1">
              <span class="ti">提示：</span>
            </div>
            <div class="pro2">
              <p>创建成功后凭用户名和初始密码123456登录</p>
            </div>
          </div>
        </div>
        <el-form-item label="姓名" prop="realname">
          <el-input v-model="ruleForm.realname" class="add_width"></el-input>
        </el-form-item>
        <el-form-item label="登录用户名" prop="username">
          <el-input v-model="ruleForm.username" class="add_width" placeholder="用户名创建后不可修改"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-select v-model="ruleForm.department" placeholder="请选择" class="add_width">
            <el-option v-for="item in value" :key="item.id" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职员类型" prop="roleId">
          <el-select v-model="ruleForm.roleId" placeholder="请选择" class="add_width">
            <el-option v-for="item in listid" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="ruleForm.remark" class="add_width"></el-input>
        </el-form-item>
        <div style="text-align:center">
          <el-button class="AllquedingBtn" type="primary" @click="addsubmitForm('ruleForm')">确定</el-button>
          <el-button class="theBtn resetButton" @click="dialogVisible = false">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog
      title="职员编辑"
      :visible.sync="centerDialogVisible"
      width="550px"
      center
      v-model="centerDialogVisible"
    >
      <el-form
        :model="ruleForm2"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="姓名" prop="realname">
          <el-input v-model="ruleForm2.realname" class="add_width"></el-input>
        </el-form-item>
        <el-form-item label="登录用户名">
          <el-input v-model="ruleForm2.username" class="add_width" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-select v-model="ruleForm2.department" placeholder="请选择" class="add_width">
            <el-option v-for="item in value" :key="item.id" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职员类型" prop="roleId">
          <el-select v-model="ruleForm2.roleId" placeholder="请选择" class="add_width">
            <el-option v-for="item in listid" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="ruleForm2.remark" class="add_width"></el-input>
        </el-form-item>
        <div style="text-align:center">
          <el-button class="AllquedingBtn" type="primary" @click="submitForm(ruleForm2)">确定</el-button>
          <el-button class="theBtn resetButton" @click="centerDialogVisible = false">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import qs from "qs";
export default {
  data() {
    return {
      value: [],
      form: {
        realname: "",
        username: "",
        pageNum: 1,
        pageSize: 20,
        token: sessionStorage.getItem("token")
      },
      userId: "",
      tableData: [],
      listid: [],
      total: 10,

      pagesizes: [20, 40, 60],
      pageNum: 1,
      ruleForm: {
        realname: "",
        username: "",
        department: "",
        roleId: "",
        remark: "",
        token: sessionStorage.getItem("token")
      },
      ruleForm2: {
        realname: "",
        username: "",
        department: "",
        roleId: "",
        remark: "",
        token: sessionStorage.getItem("token")
      },
      rules: {
        realname: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { max: 20, message: "输入不超过20个字符", trigger: "blur" }
        ],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        department: [
          { required: true, message: "请选择部门", trigger: "change" }
        ],
        roleId: [
          { required: true, message: "请选择职员类型", trigger: "change" }
        ],
        remark: [{ max: 20, message: "输入不超过20个字符", trigger: "blur" }]
      },
      dialogVisible: false,
      centerDialogVisible: false
    };
  },
  created() {
    this.getstaff();
    this.showother();
    this.getList();
  },
  methods: {
    seach() {
      this.getstaff();
    },
    result() {
      this.form.realname = "";
      this.form.username = "";
      this.getstaff();
    },
    handleSizeChange(val) {
      this.form.pageSize = val;
      this.form.getList();
    },
    handleCurrentChange(val) {
      this.form.pageNum = val;
      this.getList();
    },
    //角色id
    getList() {
      var getlist = [];
      getlist.token = sessionStorage.getItem("token");
      getlist.pageNum = this.form.pageNum;
      let formData = new FormData();
      const obj = getlist;
      Object.keys(obj).forEach(key => {
        formData.append(key, obj[key]);
      });
      this.$axios.post("/sys/user/role/list", formData).then(res => {
        const {
          code,
          data: { list }
        } = res.data;
        if (code == "0000") {
          this.listid = list;
        }
      });
    },
    //value
    showother() {
      var codelist = [];
      codelist.token = sessionStorage.getItem("token");
      codelist.code = "sys_user_department";
      let formData = new FormData();
      const obj = codelist;
      Object.keys(obj).forEach(key => {
        formData.append(key, obj[key]);
      });
      this.$axios.post("/sys/dictionary/list", formData).then(res => {
        if (res.data.code == "0000") {
          this.value = res.data.data;
        }
      });
    },
    getstaff() {
      // let formData = new FormData();
      // formData.append('token',sessionStorage.getItem('token'))
      this.$axios.post("/sys/user/list", qs.stringify(this.form)).then(res => {
        if (res.data.code === "0000") {
          this.tableData = res.data.data.list;
        }
      });
    },
    onSubmit() {},
    add_staff() {
      this.dialogVisible = true;
    },
    // 编辑

    editShow(e) {
      this.centerDialogVisible = true;
      this.userId = e.id;
      this.ruleForm2.realname = e.realname;
      this.ruleForm2.username = e.username;
      this.ruleForm2.department = e.department;
      this.ruleForm2.roleId = e.roleId;
      this.ruleForm2.remark = e.remark;
    },
    // 删除
    del(e) {
      var del = [];
      del.token = sessionStorage.getItem("token");
      del.userId = e.id;
      let formData = new FormData();
      const obj = del;
      Object.keys(obj).forEach(key => {
        formData.append(key, obj[key]);
      });
      this.$axios.post("/sys/user/delete", formData).then(res => {
        if (res.data.code == "0000") {
          this.getstaff();
        }
      });
    },
    //   重置
    pwdClick(e) {
      var pwd = [];
      pwd.token = sessionStorage.getItem("token");
      pwd.userId = e.id;
      let formData = new FormData();
      const obj = pwd;
      Object.keys(obj).forEach(key => {
        formData.append(key, obj[key]);
      });
      this.$axios.post("/sys/user/password/reset", formData).then(res => {
        if (res.data.code == "0000") {
          this.getstaff();
          this.$message({
            type: "success",
            message: "重置成功!"
          });
        }
      });
    },
    //新增
    addsubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios({
            url: window.apiUrl + "user/insert",
            method: "POST",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            data: qs.stringify(this.ruleForm)
          })
            .then(res => {
              if (res.data.code == "0000") {
                this.dialogVisible = false;
                this.getstaff();
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch(err => {
              console.log("数据异常", err);
            });
        } else {
          return false;
        }
      });
    },
    // 编辑改变
    submitForm(formName) {
      var change = [];
      change.token = sessionStorage.getItem("token");
      change.username = formName.username;
      change.realname = formName.realname;
      change.department = formName.department;
      change.roleId = formName.roleId;
      change.remark = formName.remark;
      change.userId = this.userId;
      let formData = new FormData();
      const obj = change;
      Object.keys(obj).forEach(key => {
        formData.append(key, obj[key]);
      });
      this.$axios.post("/sys/user/update", formData).then(res => {
        if (res.data.code == "0000") {
          this.centerDialogVisible = false;
          this.getstaff();
        }
      });
    }
  }
};
</script>
<style scoped>
.staff {
  background-color: #fff;
  min-height: 647px;
  height: 100%;
  min-width: 1700px;
  box-sizing: border-box;
  box-shadow: 0px 2px 10px #ccc;
}
p {
  display: inline-block;
  width: 300px;
}
.storeBox222 {
  height: 150px;
}
/* 弹窗样式 */
.demo-ruleForm {
  margin: 0 30px;
}
.ti {
  font-size: 16px;
  font-weight: 800;
  background: url("../../assets/hint.png") no-repeat;
  width: 58px;
  height: 28px;
  padding-left: 40px;
  line-height: 30px;
  float: left;
}
.prot {
  display: flex;
  margin-bottom: 15px;
}
.pro1 {
  flex: 1;
  height: 30px;
}
.pro2 {
  flex: 5;
  margin-top: -1px;
}
.pro2 p {
  margin: 5px auto;
}
.staff .addStore img {
  width: 69px;
  margin-right: 20px;
}
.staff .hidescoll {
  overflow: hidden;
  position: relative;
  height: 648px;
}
.staff .store_Box12 {
  position: absolute;
  left: 0;
  top: 0;
  right: -17px;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
