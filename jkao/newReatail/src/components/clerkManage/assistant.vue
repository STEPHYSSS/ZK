<template>
  <div class="assistant minWidth1600 minimum">
    <div class="assisBox">
      <h3 class="manager">店员管理</h3>
      <!-- <p class="addtip">您可以新增店员，并修改店员信息</p> -->
      <div class="addBtn">
        <!-- <el-button disabled class="btnAdd themeColor" @click="addStaff"> -->
        <el-button class="btnAdd themeColor" @click="addStaff">
          <i class="el-icon-plus"></i>新增
        </el-button>
      </div>
      <!-- 店员新增 -->
      <el-dialog
        title="店员新增"
        :visible.sync="dialogVisible"
        width="506px"
        center
        v-model="dialogVisible"
        @close="handleClose"
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
                <p>创建成功后凭系统生成的工号和初始密码123456</p>
                <p>登录收银系统，请提醒员工及时修改密码</p>
              </div>
            </div>
          </div>
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="ruleForm.name" class="add_width"></el-input>
          </el-form-item>
          <el-form-item label="职位：" prop="position">
            <el-select v-model="ruleForm.position" placeholder="请选择" class="add_width">
              <el-option
                v-for="(item,index) in value"
                :key="index"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系方式：" prop="phone">
            <el-input v-model="ruleForm.phone" type="tel" oninput="value=value.replace(/[^\d]/g,'')" maxlength="11" class="add_width"></el-input>
          </el-form-item>
          <el-form-item label="入职时间：" required prop="entryTime">
            <el-date-picker
              v-model="ruleForm.entryTime"
              type="date"
              placeholder="选择日期"
              class="add_width"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button class="theBtn themeColor textMright" @click="submitForm1('ruleForm')">确定</el-button>
            <el-button class="theBtn resetButton" @click="dialogVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 结束 -->
      <div class="tab_list">
        <el-table :data="tableData" style="width: 100%;" max-height="600">
          <el-table-column prop="code" label="工号" align="center"></el-table-column>
          <el-table-column prop="name" label="姓名" align="center"></el-table-column>
          <el-table-column prop="position" label="职位" align="center"></el-table-column>
          <el-table-column label="入职日期" align="center">
            <template scope="scope">{{scope.row.entryTime | converTime('YYYY-MM-DD')}}</template>
          </el-table-column>
          <el-table-column label="离职日期" align="center">
            <template scope="scope">
              <span
                v-if="scope.row.quitTime !=null"
              >{{scope.row.quitTime | converTime('YYYY-MM-DD')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="更新时间" align="center">
            <template scope="scope">{{scope.row.updateTime | converTime('YYYY-MM-DD HH:mm:ss')}}</template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" align="center" width="300">
            <template slot-scope="scope">
              <!-- <el-tooltip class="item" effect="dark" content="编辑" placement="bottom"> -->
              <span class="codesty" @click="editShow(scope.row.code,scope.$index)">
                <!-- <img src="@/assets/xiugai_icon.png" /> -->
                编辑
              </span>&nbsp;&nbsp;
              <span @click="open7(scope.row.code)" class="codesty">删除</span>
              <!-- </el-tooltip> -->

              <!-- <el-tooltip class="item" effect="dark" content="删除" placement="bottom"> -->
              <!-- <a disable="true" class="disc dis"> -->
              <!-- <img src="@/assets/shanchu_icon.png" @click="open7(scope.row.code)" /> -->
              <!-- <img src="@/assets/shanchu_icon.png" alt=""> -->

              <!-- </a> -->
              <!-- </el-tooltip> -->
              <!-- <el-tooltip class="item" effect="dark" content="重置密码" placement="bottom"> -->
              <span class="codesty" @click="pwdClick(scope.row.code,scope.$index)">
                重置密码
                <!-- <img
                    src="@/assets/resetpasswords_icon.png"
                    @click="pwdClick(scope.row.code,scope.$index)"
                />-->
              </span>
              <!-- </el-tooltip> -->
            </template>
          </el-table-column>
        </el-table>
        <div style="height:50px">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[20, 40, 60,80]"
            :page-size="pageSize"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            class="pagination"
          ></el-pagination>
        </div>
        <!-- 编辑 -->
        <el-dialog
          title="店员编辑"
          :visible.sync="centerDialogVisible"
          width="506px"
          center
          v-model="centerDialogVisible"
          id="add"
          @close="handleClose"
        >
          <el-form
            :model="ruleForm1"
            :rules="rules2"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="姓名：" prop="name">
              <el-input v-model="ruleForm1.name" class="add_width"></el-input>
            </el-form-item>
            <el-form-item label="职位：" prop="position">
              <el-select v-model="ruleForm1.position" placeholder="请选择" class="add_width">
                <el-option
                  v-for="(item,index) in value"
                  :key="index"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="联系方式：" prop="phone">
              <el-input v-model="ruleForm1.phone" type="tel" oninput="value=value.replace(/[^\d]/g,'')" maxlength="11" class="add_width"></el-input>
            </el-form-item>
            <el-form-item label="入职时间：" required prop="entryTime">
              <el-date-picker
                v-model="ruleForm1.entryTime"
                type="date"
                @change="change(ruleForm1.entryTime, 'entryTime')"
                placeholder="选择日期"
                class="add_width"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="离职时间：" prop="quitTime">
              <el-date-picker
                v-model="ruleForm1.quitTime"
                type="date"
                @change="change(ruleForm1.quitTime, 'quitTime')"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item>
              <div style="margin-left: 50px;">
                <el-button class="theBtn themeColor textMright" @click="submitForm('ruleForm')">确定</el-button>
              <el-button class="theBtn resetButton" @click="centerDialogVisible = false">取消</el-button>
              </div>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "assistant",
  data() {
    return {
      centerDialogVisible: false,
      tableData: [],
      ruleForm: {
        token: "",
        code: "",
        name: "",
        position: "",
        phone: "",
        entryTime: "", //入职时间
        quitTime: "" //离职时间
      },
      ruleForm1: {
        token: "",
        code: "",
        name: "",
        position: "",
        phone: "",
        entryTime: "", //入职时间
        quitTime: "" //离职时间
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { max: 20, message: "输入不超过20个字符", trigger: "blur" }
        ],
        position: [
          { required: true, message: "请选择职位", trigger: "change" }
        ],
        phone: [
          { required: true, message: "请输入电话号码", trigger: "change" },
          { max: 11, message: "请输入正确的电话号码", trigger: "change" }
        ],
        entryTime: [
          {
            required: true,
            message: "请选择入职日期",
            trigger: "change"
          }
        ],
        quitTime: [
          {
            required: true,
            message: "请选择离职日期",
            trigger: "change"
          }
        ]
      },
      rules2: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { max: 20, message: "输入不超过20个字符", trigger: "blur" }
        ],
        position: [
          { required: true, message: "请选择职位", trigger: "change" }
        ],
        phone: [
          { required: true, message: "请输入电话号码", trigger: "change" },
          { max: 11, message: "请输入正确的电话号码", trigger: "change" }
        ],
        entryTime: [
          {
            required: true,
            message: "请选择入职日期",
            trigger: "change"
          }
        ],
        // quitTime: [
        //   {
        //     required: true,
        //     message: "请选择离职日期",
        //     trigger: "change"
        //   }
        // ]
      },
      dialogVisible: false,
      value: [],
      pageNum: 1,
      pageSize: 20,
      total: 0
    };
  },
  created() {
    this.cleckList(this.pageNum);
    this.showother();
  },
  methods: {
    handleClose() {
      this.$refs.ruleForm.resetFields();
    },
    // code编码
    showother() {
      let _this = this;
      let token = sessionStorage.getItem("token");
      let code = "personel_position_select";
      _this
        .$axios({
          url: window.apiUrl + "dictionary/list",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            token: token,
            code: code
          })
        })
        .then(res => {
          if ((res.data.code = "0000")) {
            this.value = res.data.data;
          } else if (res.data.code == "6666") {
            this.$message({
              showClose: true,
              message: "token异常，请重新登录",
              type: "error"
            });
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log("数据异常", err);
        });
    },
    // 员工列表
    cleckList(pageNum, pageSize) {
      let _this = this;
      let token = sessionStorage.getItem("token");
      _this
        .$axios({
          url: window.apiStore + "personnel/list",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            token: token,
            pageNum: this.pageNum,
            pageSize: this.pageSize
          })
        })
        .then(res => {
          if (res.data.code == "0000") {
            _this.tableData = res.data.data.list;
            _this.total = res.data.data.total;
          } else if (res.data.code == "6666") {
            _this.$message({
              showClose: true,
              message: "token异常，请重新登录",
              type: "error"
            });
            const timer = setTimeout(() => {
              clearTimeout(timer);
              _this.$router.push({ name: "login" });
            }, 3000);
          } else {
            _this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log("数据异常", err);
        });
    },
    // 新增员工
    addStaff() {
      this.ruleForm = {};
      this.dialogVisible = true;
    },
    // 新增提交
    submitForm1(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          let _this = this;
          _this.ruleForm.token = sessionStorage.getItem("token");
          _this
            .$axios({
              url: window.apiStore + "personnel/insert",
              method: "POST",
              headers: { "content-type": "application/x-www-form-urlencoded" },
              data: qs.stringify(_this.ruleForm)
            })
            .then(res => {
              if (res.data.code == "0000") {
                this.dialogVisible = false;
                this.cleckList();
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
            })
            .catch(err => {
              console.log("数据异常", err);
            });
        } else {
          return false;
        }
      });
    },
    // 编辑
    editShow(code, index) {
      //记录数据
      this.editObj = code;
      //显示弹窗

      // _this.ruleForm.code=code;
      let token = sessionStorage.getItem("token");
      this.$axios({
        url: window.apiStore + "personnel/detail",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: token,
          code: code
        })
      })
        .then(res => {
          if (res.data.code == "0000") {
            this.ruleForm = res.data.data;
            this.ruleForm1.name = res.data.data.name;
            this.ruleForm1.position = res.data.data.position;
            this.ruleForm1.phone = res.data.data.phone;
            if (res.data.data.entryTime != null) {
              this.ruleForm1.entryTime = res.data.data.entryTime;
              this.ruleForm.entryTime = this.$moment(
                this.ruleForm.entryTime
              ).format("YYYY-MM-DD");
            }
            if (res.data.data.quitTime != null) {
              this.ruleForm1.quitTime = res.data.data.quitTime;
              this.ruleForm.quitTime = this.$moment(
                this.ruleForm.quitTime
              ).format("YYYY-MM-DD");
            }

            this.centerDialogVisible = true;
          } else if (res.data.code == "6666") {
            this.$message({
              showClose: true,
              message: "token异常，请重新登录",
              type: "error"
            });
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log("数据异常", err);
        });
    },
    // 编辑提交
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          let _this = this;
          _this.ruleForm.token = sessionStorage.getItem("token");
          _this
            .$axios({
              url: window.apiStore + "personnel/update",
              method: "POST",
              headers: { "content-type": "application/x-www-form-urlencoded" },
              data: qs.stringify(_this.ruleForm)
            })
            .then(res => {
              if (res.data.code == "0000") {
                this.centerDialogVisible = false;
                this.cleckList();
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
            })
            .catch(err => {
              console.log("数据异常", err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 删除
    open7(code) {
      this.$confirm("此操作将永久删除该条信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          let _this = this;
          let token = sessionStorage.getItem("token");
          _this
            .$axios({
              url: window.apiStore + "personnel/delete",
              method: "POST",
              headers: { "content-type": "application/x-www-form-urlencoded" },
              data: qs.stringify({
                token: token,
                code: code
              })
            })
            .then(res => {
              if (res.data.code == "0000") {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                _this.cleckList();
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
            })
            .catch(err => {
              console.log("数据异常", err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //   重置
    pwdClick(code) {
      this.$confirm("确定将员工登录密码重置为123456, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          let _this = this;
          let token = sessionStorage.getItem("token");
          _this
            .$axios({
              url: window.apiStore + "personnel/password/modify",
              method: "POST",
              headers: { "content-type": "application/x-www-form-urlencoded" },
              data: qs.stringify({
                token: token,
                code: code
              })
            })
            .then(res => {
              if (res.data.code == "0000") {
                this.$message({
                  type: "success",
                  message: "重置成功!"
                });
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
            })
            .catch(err => {
              console.log("数据异常", err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消重置"
          });
        });
    },
    change(a, b) {
      let time = this.$moment(a).format("YYYY-MM-DD");
      this.ruleForm[b] = time;
    },
    // resetForm(formName) {
    //     this.$refs[formName].resetFields();
    // },
    handleSizeChange(val) {
      this.pageSize = val;
      this.cleckList(this.pageNum, val);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.cleckList(val, this.pageSize);
    }
  },
  watch: {
    $route: "getParams"
  }
};
</script>
<style scoped>
.assistant {
  /* background-color: #f1f6fa; */
  min-height: 647px;
  min-width: 1200px;
}
.assisBox {
  background: #fff;
}
.tab_list {
  /* padding-left: 35px;
  padding-right: 30px; */
  padding-bottom: 20px;
}
.manager {
  padding: 20px 0 10px 35px;
}
.addtip {
  padding-left: 35px;
  font-size: 15px;
  color: #b6b6b6;
  display: inline-block;
}
.assisBox .addBtn {
  display: inline-block;
  box-sizing: border-box;
  height: 32px;
  margin-bottom: 16px;
  cursor: pointer;
  width: 100%;
  text-align: right;
  padding-right: 20px;
}
.assisBox .addBtn > .el-button {
  margin: 0;
  padding: 8px 18px;
  border-radius: 6px;
}

/* 返回 */
.nav {
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
.add_width {
  width: 300px;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 300px !important;
}

.ti {
  font-size: 16px;
  font-weight: 800;
  display: inline-block;
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
.disc {
  display: inline-block;
  cursor: not-allowed;
}
</style>


