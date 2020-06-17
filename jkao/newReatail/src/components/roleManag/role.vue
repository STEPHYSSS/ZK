<template>
  <div class="role">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
     <el-breadcrumb-item :to="{ path: '/operatIndex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>-->
    <!-- <div class="addRole" style="height:30px">
      <img src="@/assets/newlyincreased.png" alt class="add_role" @click="add_role">
    </div>-->
    <div class="roleBoxs">
      <div class="yinScoll">
        <p class="store_tit marStore">角色管理</p>
        <div class="addRole" style="height:30px">
          <!-- <img src="@/assets/addBtn.png" alt class="add_role" @click="add_role" /> -->
          <el-button class="increase themeColor add_role" @click="add_role">
            <i class="el-icon-plus"></i>新增
          </el-button>
        </div>
        <div class="rolecase">
          <div class="roletab">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="id" label="角色ID" width align="center"></el-table-column>
              <el-table-column prop="name" label="角色名称" align="center"></el-table-column>
              <el-table-column prop="basicPermiss" label="基本权限" align="center">
                <p>查看所有页面</p>
              </el-table-column>
              <el-table-column prop="opeartionPermiss" label="操作权限" align="center" width="250">
                <p>所有新增、修改、删除、查看功能</p>
              </el-table-column>
              <el-table-column label="创建时间" align="center">
                <template scope="scope">{{scope.row.createTime | fmtDate}}</template>
              </el-table-column>
              <el-table-column prop="opeartion" label="操作" align="center">
                <template scope="scope">
                  <div class="tootip">
                    <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
                      <img
                        src="@/assets/xiugai_icon.png"
                        @click="roleDetail(scope.row)"
                        class="imgSize"
                      />
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                      <img src="@/assets/shanchu_icon.png" @click="del(scope.row)" class="imgSize" />
                    </el-tooltip>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="konge"></div>
            <div class="block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-sizes="[20,40,60]"
                :page-size="pageSize"
                background
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                class="pagination"
              ></el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 角色新增 -->
    <el-dialog
      title="角色新增"
      :visible.sync="dialogVisible"
      width="450px"
      center
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="ruleForm.name" class="add_width"></el-input>
        </el-form-item>
        <el-form-item label="管理模块" prop="system">
          <el-radio v-model="ruleForm.system" label="sys">运营后台</el-radio>
          <el-radio v-model="ruleForm.system" label="warehouse">仓库后台</el-radio>
          <!-- <el-radio v-model="ruleForm.system" label="mallsys">商城后台</el-radio> -->
        </el-form-item>
        <el-form-item label="基本权限" prop="type1">
          <!-- <el-checkbox-group v-model="type1"> -->
          <el-checkbox-group v-model="ruleForm.type1">
            <el-checkbox label="新增" name="type1"></el-checkbox>
            <el-checkbox label="修改" name="type1"></el-checkbox>
            <el-checkbox label="删除" name="type1"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="操作权限" prop="type2">
          <el-checkbox-group v-model="ruleForm.type2">
            <!-- <el-checkbox-group v-model="type2"> -->
            <el-checkbox label="新增" name="type2"></el-checkbox>
            <el-checkbox label="修改" name="type2"></el-checkbox>
            <el-checkbox label="删除" name="type2"></el-checkbox>
            <el-checkbox label="发布" name="type2"></el-checkbox>
            <el-checkbox label="新增门店" name="type2"></el-checkbox>
            <el-checkbox label="删除门店" name="type2"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <div class="boxCenter">
          <el-button class="AllquedingBtn" @click="addRoles('ruleForm')">确定</el-button>
          <el-button class="theBtn resetButton" @click="cancle">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
    <!-- 角色编辑 -->
    <el-dialog
      title="角色编辑"
      :visible.sync="centerDialogVisible"
      width="450px"
      center
      :before-close="handleClose"
      v-model="centerDialogVisible"
    >
      <el-form
        :model="ruleForm1"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="ruleForm1.name" class="add_width"></el-input>
        </el-form-item>
        <el-form-item label="管理模块" prop="system">
          <el-radio v-model="ruleForm1.system" label="sys">运营后台</el-radio>
          <el-radio v-model="ruleForm1.system" label="warehouse">仓库后台</el-radio>
          <!-- <el-radio v-model="ruleForm1.system" label="mall">商城后台</el-radio> -->
        </el-form-item>
        <el-form-item label="基本权限" prop="type1">
          <!-- <el-checkbox-group v-model="type1"> -->
          <el-checkbox-group v-model="ruleForm1.type1">
            <el-checkbox label="新增" name="type1"></el-checkbox>
            <el-checkbox label="修改" name="type1"></el-checkbox>
            <el-checkbox label="删除" name="type1"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="操作权限" prop="type2">
          <el-checkbox-group v-model="ruleForm1.type2">
            <!-- <el-checkbox-group v-model="type2"> -->
            <el-checkbox label="新增" name="type2"></el-checkbox>
            <el-checkbox label="修改" name="type2"></el-checkbox>
            <el-checkbox label="删除" name="type2"></el-checkbox>
            <el-checkbox label="发布" name="type2"></el-checkbox>
            <el-checkbox label="新增门店" name="type2"></el-checkbox>
            <el-checkbox label="删除门店" name="type2"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <div class="boxCenter">
          <el-button class="AllquedingBtn" @click="addRoles('ruleForm')">确定</el-button>
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
      pageNum: 1,
      inputnum: "",
      inputname: "",
      tableData: [],
      pageNum: 1,
      pageSize: 20,
      total: 0,
      dialogVisible: false,
      centerDialogVisible: false,
      ruleForm: {
        token: sessionStorage.getItem("token"),
        name: "",
        type1: [],
        type2: [],
        id: "",
        system: ""
      },
      ruleForm1: {
        token: sessionStorage.getItem("token"),
        name: "",
        type1: [],
        type2: [],
        id: "",
        system: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        type1: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个基本权限",
            trigger: "change"
          }
        ],
        type2: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个操作权限",
            trigger: "change"
          }
        ],
        system: [
          { required: true, message: "请选择管理模块", trigger: "change" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      var getlist = [];
      getlist.token = sessionStorage.getItem("token");
      getlist.pageNum = this.pageNum;
      getlist.pageSize = this.pageSize;
      let formData = new FormData();
      const obj = getlist;
      Object.keys(obj).forEach(key => {
        formData.append(key, obj[key]);
      });
      this.$axios.post("/sys/user/role/list", formData).then(res => {
        if (res.data.code == "0000") {
          this.tableData = res.data.data.list;
          this.total = res.data.data.total;
        }
      });
    },
    //角色详情
    roleDetail(row) {
      this.centerDialogVisible = true;
      if (row.id) {
        this.ruleForm1.name = row.name;
        this.ruleForm1.id = row.id;
        this.ruleForm1.system = row.system;
        let arr1 = ["新增", "修改"];
        let arr2 = ["新增", "修改", "发布"];
        for (const i of arr1) {
          this.ruleForm1.type1.push(i);
        }
        for (const i of arr2) {
          this.ruleForm1.type2.push(i);
        }
      }
    },
    addRoles(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let obj = {
            name: this.ruleForm.name,
            token: this.ruleForm.token
          };
          if (this.ruleForm1.id) {
            this.$axios
              .post("/sys/user/role/update", qs.stringify(this.ruleForm1))
              .then(res => {
                if (res.data.code === "0000") {
                  this.centerDialogVisible = false;
                  this.getList();
                }
              });
          } else {
            this.$axios
              .post("/sys/user/role/add", qs.stringify(this.ruleForm))
              .then(res => {
                if (res.data.code == "0000") {
                  this.dialogVisible = false;
                  this.getList();
                }
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    cancle() {
      this.$refs.ruleForm.clearValidate();
      this.dialogVisible = false;
    },
    handleClose(done) {
      this.$refs.ruleForm.resetFields();
      this.dialogVisible = false;
      done();
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getList();
    },
    add_role() {
      this.dialogVisible = true;
      // this.ruleForm.name = "";
      // this.ruleForm.type1 = [];
      // this.ruleForm.type2 = [];
    },
    edit(e) {
      this.ruleForm.id = e.id;
      this.ruleForm.rolename = e.name;
      this.centerDialogVisible = true;
    },
    del(e) {
      this.$confirm("删除后员工将无法登陆,确定提交?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          var bianji = [];
          bianji.id = e.id;
          bianji.token = sessionStorage.getItem("token");
          let formData = new FormData();
          const obj = bianji;
          Object.keys(obj).forEach(key => {
            formData.append(key, obj[key]);
          });
          this.$axios.post("/sys/user/role/delete", formData).then(res => {
            if (res.data.code == "0000") {
              this.getList();
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style scoped>
.role {
  background-color: #fff;
  min-height: 647px;
  min-width: 1700px;
  height: 100%;
  box-sizing: border-box;
  box-shadow: 0px 2px 10px #ccc;
}
.rolebox {
  margin-bottom: 20px;
  height: 90px;
  background-color: #fff;
  border-radius: 10px;
}
.staInput {
  display: inline-block;
  line-height: 90px;
  margin-left: 20px;
}
.storNumber,
.storName {
  width: 240px;
}
.name {
  margin-left: 30px;
}

.addRole {
  margin-top: 15px;
  padding-bottom: 15px;
  float: right;
}
.addRole img {
  width: 69px;
}
.add_role {
  cursor: pointer;
  margin-right: 28px;
}
.boxCenter {
  text-align: center;
}
.rolecase {
  background-color: #fff;
  border-radius: 10px;
  clear: both;
}
.roletab {
  box-sizing: border-box;
  width: 97%;
  margin: 0 auto;
  padding-top: 7px;
  padding-bottom: 30px;
}
.block {
  height: 45px;
}
.block .el-pagination {
  float: right;
  margin-top: 0;
}
.marStore {
  margin-left: 20px;
}
.roleBoxs {
  height: 834px;
  overflow: hidden;
  position: relative;
}
.yinScoll {
  position: absolute;
  left: 0;
  top: 0;
  right: -17px;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
