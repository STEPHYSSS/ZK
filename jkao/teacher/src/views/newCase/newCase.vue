<template>
  <el-card shadow="never" class="box-card">
    <!-- <my-bread level1="管理案例"></my-bread> -->
    <!-- <my-bread level1="新零售案例" level2="新零售案例"></my-bread> -->
    <div class="font-weight-700 teacher-title topPadding">新零售案例</div>
    <el-row style="display:inline-block;margin-top:14px;" class="topPadding">
      <el-button size="mini" @click="addCase" class="addNewcase">新增</el-button>
    </el-row>

    <!-- 搜索框 -->
    <el-form :inline="true" :model="form" class="fr demo-form-inline">
      <el-form-item label="创建日期:">
        <p class="cTime">
          <el-date-picker
            v-model="form.createTime"
            @change="timeChange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </p>
      </el-form-item>
      <el-form-item label="案例名称:" prop="region">
        <el-input clearable v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="search" class="search search-btn">搜索</el-button>
      </el-form-item>
    </el-form>
    <!-- 新增弹窗 -->
    <div id="showAddLog">
      <el-dialog
        :title="message"
        :visible.sync="dialogFormVisible"
        :show-close="false"
        width="500px"
      >
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" id="addDialog">
          <el-form-item label="案例名称" :label-width="formLabelWidth" prop="name">
            <p class="addIn">
              <el-input v-model="ruleForm.name"></el-input>
            </p>
            <!--  -->
          </el-form-item>
          <el-form-item label="状 态" :label-width="formLabelWidth" prop="status">
            <p class="addIn">
              <el-select v-model="ruleForm.status" placeholder="请选择">
                <el-option label="关闭" value="0"></el-option>
                <el-option label="开启" value="1"></el-option>
              </el-select>
            </p>
          </el-form-item>
          <el-form-item label="知识点" :label-width="formLabelWidth" prop="knowledgePoints">
            <p class="addIn">
              <el-input v-model="ruleForm.knowledgePoints"></el-input>
            </p>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="submitForm('ruleForm',flag)">确 定</el-button>
          <el-button @click="dialogFormVisible = false">返 回</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column align="center" prop="code" label="案例编号"></el-table-column>
      <el-table-column align="center" prop="name" label="案例名称"></el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">{{scope.row.status | statusTip}}</template>
      </el-table-column>
      <el-table-column align="center" label="更新时间">
        <template slot-scope="scope">{{scope.row.updateTime | converTime('YYYY-MM-DD')}}</template>
      </el-table-column>
      <el-table-column align="center" label="操作" >
        <template slot-scope="scope">
          <span class="hoveSty xiugai" @click="handlePut(scope.row.code)">修改</span>
          <span class="hoveSty" @click="open(scope.row.code)" v-if="scope.row.status =='0'">启用</span>
          <span class="hoveSty" @click="open(scope.row.code)" v-else>禁用</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="pagesizes"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </el-card>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "120px",
      message: "新增",
      form: {
        createTime: [], //创建时间
        name: "", //案例名称
        createTimeStart: "",
        createTimeEnd: ""
      },
      ruleForm: {
        name: "",
        status: "",
        knowledgePoints: ""
      },
      tableData: [],
      list: [],
      // 分页数据
      total: 10,
      pagesize: 10,
      pagesizes: [10, 15, 20, 30],
      pagenum: 1,
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { max: 50, message: "长度不超过50个字符", trigger: "blur" }
        ],
        status: [{ required: true, message: "请选择", trigger: "change" }],
        knowledgePoints: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { max: 50, message: "长度不超过50个字符", trigger: "blur" }
        ]
      },
      flag: 1,
      infoCode: ""
    };
  },

  created() {
    this.getfindCase();
  },

  methods: {
    // 获取列表页
    getfindCase() {
      this.$axios({
        url: "http://192.168.1.168:8086/exam/case/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          createTimeStart: this.form.createTimeStart,
          createTimeEnd: this.form.createTimeEnd,
          name: this.form.name,
          pagesize: this.pagesize,
          pagenum: this.pagesize
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.tableData = res.data.data.list;
          this.total = res.data.data.total;
        } else if (res.data.code == "6666") {
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
      });
    },
    timeChange() {
      this.form.createTimeStart = this.$moment(e[0]).format("YYYY-MM-DD");
      this.form.createTimeEnd = this.$moment(e[1]).format("YYYY-MM-DD");
    },
    // 搜索
    search() {
      this.getfindCase();
      // const that = this;
      // if (that.form.createTime === "" && that.form.name === "")
      //   return that.getfindCase();
    },

    // 新增
    addCase() {
      this.message = "新增";
      this.dialogFormVisible = true;
      this.ruleForm.name = "";
      this.ruleForm.status = "";
      this.ruleForm.knowledgePoints = "";
      this.flag = 1;
    },
    // 编辑
    handlePut(info) {
      this.infoCode = info;
      this.message = "编辑";
      this.dialogFormVisible = true;
      // 获取表格详情接口
      this.$axios({
        url: "http://192.168.1.168:8086/exam/case/detail",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          code: info
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.ruleForm = res.data.data;
        } else {
          this.$message.error(res.data.msg);
        }
      });
      this.flag = 2;
    },
    submitForm(formName, flag) {
      if (flag == 1) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$axios({
              url: "http://192.168.1.168:8086/exam/case/insert",
              method: "POST",
              headers: { "content-type": "application/x-www-form-urlencoded" },
              data: qs.stringify({
                name: this.ruleForm.name,
                status: this.ruleForm.status,
                knowledgePoints: this.ruleForm.knowledgePoints
              })
            }).then(res => {
              if (res.data.code == "0000") {
                this.dialogFormVisible = false;
                this.getfindCase();
              } else {
                this.$message.error(res.data.msg);
              }
            });
          } else {
            return false;
          }
        });
      } else {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$axios({
              url: "http://192.168.1.168:8086/exam/case/update",
              method: "POST",
              headers: { "content-type": "application/x-www-form-urlencoded" },
              data: qs.stringify({
                code: this.infoCode,
                name: this.ruleForm.name,
                status: this.ruleForm.status,
                knowledgePoints: this.ruleForm.knowledgePoints
              })
            }).then(res => {
              if (res.data.code == "0000") {
                this.dialogFormVisible = false;
                this.getfindCase();
              } else {
                this.$message.error(res.data.msg);
              }
            });
          } else {
            return false;
          }
        });
      }
    },
    // 禁用/启用
    open(info) {
      this.$axios({
        url: "http://192.168.1.168:8086/exam/case/status/modify",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          code: info
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.getfindCase();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 分页
    handleSizeChange(val) {
      this.pagesize = val;
      this.tableData = [];
      this.pagenum = 1;
      this.list.forEach((item, index) => {
        if (index < this.pagesize) return this.tableData.push(item);
      });
    },

    handleCurrentChange(val) {
      this.pagenum = val;
      this.tableData = [];
      const currentIndex = this.pagesize * val;
      this.list.forEach((item, index) => {
        let result = [];
        if (index < currentIndex) {
          result.push(item);
          if (index >= this.pagesize * (val - 1))
            return this.tableData.push(item);
        }
      });
    }
  },
  filters: {
    statusTip(value) {
      if (value === "1") {
        return "开启";
      } else if (value === "0") {
        return "关闭";
      }
    }
  }
};
</script>

<style scoped>
.cTime {
  display: inline-block;
  width: 266px;
}
.addIn {
  display: inline-block;
  width: 300px;
}
.cTime .el-date-editor.el-input__inner,
.addIn .el-date-editor.el-input__inner,
.addIn .el-select {
  width: 100%;
}
.cTime .el-range-editor.el-input__inner {
  padding: 0 10px;
  height: 32px;
}
#addDialog {
  padding-top: 30px;
}
.xiugai {
  display: inline-block;
  margin-right: 20px;
}
.hoveSty:hover {
  cursor: pointer;
}
.addNewcase {
  background-color: #e71537;
  color: #fff;
  border: 0px solid #ccc !important;
  font-size: 12px;
}
</style>
