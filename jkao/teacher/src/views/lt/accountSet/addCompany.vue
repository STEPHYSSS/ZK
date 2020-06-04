<template>
  <el-card class="f-new box-card">
    <!-- <new-tabs :active="1" :level1="level" level2="课程列表" @callback2="courseList"></new-tabs> -->
    <h3 v-if="this.$route.query.id" style="padding-left:20px;">修改公司</h3>
    <h3 v-else style="padding-left:20px;">新增公司</h3>
    <previous-page goPreviousPage="/accountSet"></previous-page>
    <el-row>
      <el-row>
        <el-form ref="form" :rules="rules" :model="form" label-width="100px">
          <el-form-item label="公司名称：" prop="name">
            <el-input type="text" v-model="form.name" style="width: 250px;" maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="共享：" prop="shared">
            <el-select v-model="form.shared" placeholder="请选择">
              <el-option label="开放" :value="1"></el-option>
              <el-option label="关闭" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态：" prop="status">
            <el-select v-model="form.status" placeholder="请选择">
              <el-option label="启用" :value="1"></el-option>
              <el-option label="禁用" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注：" prop="description">
            <el-input
              maxlength="50"
              type="text"
              placeholder="请输入"
              v-model="form.description"
              style="width: 250px;"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-row>
    </el-row>
    <el-button @click="chooseStudent" class="chooseStudent">选择学生</el-button>
    <el-table :data="studentList" v-if="show" border style="width: 65%;margin:0 25px;">
      <el-table-column prop="username" label="用户名" align="center"></el-table-column>
      <el-table-column prop="realname" label="姓名" align="center"></el-table-column>
      <el-table-column prop="class_name" label="所属班级" align="center"></el-table-column>
      <el-table-column prop="status" label="学员状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status == '1'">开放</span>
          <span v-else>不开放</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <img src="@/assets/images/shanchu_icon.png" @click="delRetuen(scope.$index,scope.row)" class="codesty">
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="选择学生"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="60%"
      border
      style="min-width:60%"
    >
      <el-form ref="form" :model="studentForm" size="mini" label-width="100px">
        <el-form-item label="姓名：" class="wushi" >
          <el-input type="text" clearable placeholder="请选择" v-model="studentForm.name" style="width:220px"></el-input>
        </el-form-item>
        <el-form-item label="所属班级：" class="wushi">
          <el-select v-model="studentForm.Studentclass" placeholder="请选择" clearable>
            <el-option
              v-for="item in studentClsaaList"
              :key="item.id"
              :label="item.class_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" class="btnchax" @click="chaxun">查询</el-button>
      </el-form>
      <el-table
        ref="multipleTable"
        :data="studentData"
        tooltip-effect="dark"
        style="width: 95%;margin:0 25px;height: 388px;overflow-y: scroll;"
        @selection-change="handleSelectionChange"
        @select-all="selectAll"
        :row-key="getGoodsCode"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="username" label="用户名" align="center"></el-table-column>
        <el-table-column prop="realname" label="姓名" align="center"></el-table-column>
        <el-table-column prop="class_name" label="所属班级" align="center"></el-table-column>
        <el-table-column prop="status" label="学员状态" align="center"></el-table-column>
      </el-table>
      <div style="display:flex">
        <add-btn
          style="margin-left: 40px;margin-bottom:20px"
          level1="确 定"
          level2="取 消"
          @submitForm="queding"
          @cancelForm="quxiao"
        ></add-btn>
        <!-- <div class="block" style="flex:2">
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
        </div> -->
      </div>
    </el-dialog>
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
export default {
  name: "addCompany",
  data() {
    return {
      form: {
        name: "",
        shared: "",
        description: "",
        status: "",
        token: sessionStorage.getItem("token"),
        company_id: this.$route.query.id
      },
      studentForm: {
        name: "",
        Studentclass: ""
      },
      studentList: [], //选中之后展示的学生列表
      studentClsaaList: [], //学生班级列表
      studentData: [], //学生列表
      rules: {
        name: [
          { required: true, message: "课程名称不能为空！", trigger: "blur" }
        ],
        shared: [
          { required: true, message: "共享不能为空！", trigger: "blur" }
        ],
        status: [{ required: true, message: "状态不能为空！", trigger: "blur" }]
      },
      dialogVisible: false,
      show: false,
      // pageNum: 1,
      // pageSize: 10,
      // total: 0,
      multipleSelection: []
    };
  },

  created() {
    if (this.$route.query.id) this.findOneCourse();
  },

  components: {
    newTabs,
    "previous-page": previousPage
  },
  computed: {
    level: {
      get: function() {
        return (this.level = !this.$route.query.id ? "新增公司" : "修改公司");
      },
      set: function() {}
    }
  },
  methods: {
    // 获取学生列表
    getStudentInfo() {
      this.$utils
        .post(this.reqApi.shuiwuUrl + "/student/listStudent",qs.stringify({
          pageSize:99999,
          stuname:this.studentForm.name,
          class_id:this.studentForm.Studentclass
        }))
        .then(res => {
          if (res.data.code === "0000") {
            this.studentData = res.data.students.list;
            if (this.$refs.multipleTable) {
              this.studentData.forEach((item, index) => {
                this.studentList.forEach((i, index2) => {
                  if (item.id == i.id) {
                    item.flag = true;
                    this.$nextTick(() => {
                      this.$refs.multipleTable.toggleRowSelection(
                        this.studentData[index],
                        true
                      );
                    });
                  }
                });
              });
            }
          }
        });
    },
    // 获取下拉框班级列表
    getClassList() {
      this.$utils.post(this.reqApi.shuiwuUrl + "/class/list").then(res=>{
        if (res.data.code === "0000") {
          this.studentClsaaList = res.data.classes.list;
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },
    // 获取编辑详情
    findOneCourse() {
      const that = this;
      that.$utils
        .post(
          this.reqApi.shuiwuUrl + "/company/detail",
          qs.stringify({
            company_id: this.form.company_id
          })
        )
        .then(res => {
          if (res.data.code == "0000") {
            that.form = res.data.company;
            this.studentList = res.data.students;
          }
        });
      this.show = true;
    },
    // 根据班级查询
    chaxun() {
      this.getStudentInfo();
    },
    // 选择学生
    chooseStudent() {
      this.getStudentInfo();
      this.getClassList();
      this.dialogVisible = true;
    },
    getGoodsCode(row) {
      return row.code;
    },
    // 多选
    selectAll(selection) {
      this.multipleSelection = selection;
    },
    // 多选表格
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 选择学生确定
    queding() {
      if (this.multipleSelection == "")
        return this.$message.error("请选择学生");
      this.studentList = this.multipleSelection;
      this.dialogVisible = false;
      this.show = true; //展示选择了几个学生
    },
    quxiao() {
      this.dialogVisible = false;
    },
    // 删除选中表格中的学生
    delRetuen(index, code) {
      this.studentList.splice(index, 1);
      this.toggleSelection();
    },
    // 删除完商品之后再次选择商品是应该取消掉之前记录的值
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 学生列表分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getStudentInfo(this.pageNum, val);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getStudentInfo(val, this.pageSize);
    },
    // 关闭弹窗
    handleClose() {
      this.dialogVisible = false;
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
          const goosCount = this.studentList.map(item => {
            return item.id;
          });
          const Identification = !this.$route.query.id
            ? this.reqApi.shuiwuUrl + "/company/create"
            : this.reqApi.shuiwuUrl + "/company/update";
          this.$utils
            .post(
              Identification,
              qs.stringify({
                token: this.form.token,
                company: JSON.stringify({
                  name: this.form.name,
                  shared: this.form.shared,
                  description: this.form.description,
                  status: this.form.status,
                  id: this.form.id
                }),
                user_ids: JSON.stringify(goosCount)
              })
            )
            .then(res => {
              const { code, msg } = res.data;
              if (code === "0000") {
                // this.courseList();
                // this.$message.success("提交成功!");
                this.courseList();
                this.$message.success(`${this.level}成功!`);
              } else return this.$message(msg);
            });
        } else {
          this.$message("请填写完整！");
          return false;
        }
      });
    },
    courseList() {
      this.$router.push({ name: "accountSet" });
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
.chooseStudent {
  margin-left: 24px;
  margin-bottom: 15px;
}
.btnchax {
  background-color: #444;
  color: #fff;
  border: 1px solid #444;
  margin-left: 25px;
}
.codesty{
  cursor: pointer;
}
</style>
