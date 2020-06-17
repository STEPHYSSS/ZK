<template>
  <el-card class="f-new box-card">
    <!-- <new-tabs :active="2" level1="新增管理员" level2="管理员列表" @callback1="newAdmin"></new-tabs> -->
    <h3>教师列表</h3>
    <previous-page goPreviousPage="/mpage"></previous-page>
    <!-- 搜索框 -->
    <el-form
      :inline="true"
      :model="form"
      size="mini"
      style="padding: 20px 0 0 20px;"
      class="f-new-inp demo-form-inline"
    >
      <el-row style="margin-right: 20px;">
        <el-col :span="6">
          <el-form-item label="姓名:">
            <el-input clearable v-model="form.username"></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="6"> -->
        <!-- <el-form-item label="真实姓名:">
        <el-input clearable v-model="form.realname"></el-input>
        </el-form-item>-->
        <!-- </el-col> -->

        <!-- <el-col :span="6">
      <el-form-item label="班级:">
        <el-input clearable v-model="className"></el-input>
      </el-form-item>
        </el-col>-->

        <el-col :span="6">
          <el-form-item label="班级:">
            <el-select clearable v-model="form.class_id" placeholder="请选择">
              <el-option
                v-for="(item,index) in classList"
                :key="index"
                :label="item.class_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item class="qzbhh" label="角色状态:">
            <el-select clearable v-model="form.status" placeholder="请选择">
              <!-- <el-option label="全部" value="2"></el-option> -->
              <el-option label="开放" value="1"></el-option>
              <el-option label="关闭" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <!-- <el-form-item label="时间排序:">
        <el-select clearable v-model="form.timeOrder" placeholder="请选择">
          <el-option label="降序" value="1"></el-option>
          <el-option label="升序" value="2"></el-option>
        </el-select>
          </el-form-item>-->
        </el-col>
        <el-col class="fr text-right" :span="6" style="min-width: 240px">
          <el-form-item>
            <el-button class="search search-btn" @click="searchCX">搜索</el-button>
            <el-button class="search search-btn" @click="clear">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="addBox">
      <el-button @click="newAdmin">新增</el-button>
      <el-button @click="bulkImport">批量导入</el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="tableData" class="topBorder" style="width: 100%">
      <el-table-column align="center" prop="username" label="用户名"></el-table-column>
      <el-table-column align="center" prop="realname" label="姓名"></el-table-column>
      <el-table-column align="center" prop="role_id" label="角色">
        <template slot-scope="scope">
          <span v-if="scope.row.role_id == '1'">超级管理员</span>
          <span v-if="scope.row.role_id == '2'">学校管理员</span>
          <span v-if="scope.row.role_id == '3'">教师</span>
          <span v-if="scope.row.role_id == '4'">学生</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="形象照片">
        <template slot-scope="scope">
          <img v-if="scope.row.user_photo" class="img-wid-table" :src="reqApi.shuiwuUrl+scope.row.user_photo" alt>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 1">有效</span>
          <span v-if="scope.row.status == 2">失效</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="最后登录时间" width="210">
        <template slot-scope="scope">
          {{ scope.row.realname }}
          <br>
        <span v-if="scope.row.last_login_time">  {{ scope.row.last_login_time | fmtDate() }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="180" fixed="right">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
              <span class="cur-point dis-inline-block" @click="questionPut(scope.row)">
                <img src="@/assets/images/xiugai_icon.png" alt />
              </span>
            </el-tooltip>&nbsp;&nbsp;&nbsp;
            <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
              <span class="cur-point dis-inline-block" @click='del(scope.row)'>
                <img src="@/assets/images/shanchu_icon.png" alt />&nbsp;&nbsp;&nbsp;
              </span>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="重置" placement="bottom">
              <span class="cur-point dis-inline-block"  @click="reset(scope.row)"
            v-if="role_id == 1 || role_id == 2">
                <img src="@/assets/images/chongzhi_icon.png" alt />
              </span>
            </el-tooltip>
          <!-- <span class="cur-point dis-inline-block" @click="questionPut(scope.row)">
            <img src="@/assets/images/xiugai_icon.png" alt>&nbsp;&nbsp;&nbsp;
          </span>
          <span class="cur-point dis-inline-block" @click="del(scope.row)">
            <img src="@/assets/images/shanchu_icon.png" alt>&nbsp;&nbsp;&nbsp;
          </span>
          <span
            class="cur-point dis-inline-block"
            @click="reset(scope.row)"
            v-if="role_id == 1 || role_id == 2"
          >
            <img src="@/assets/images/chongzhi_icon.png" alt>
          </span> -->
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-size="pageSize"
        :page-sizes="[10,20,30,40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </el-card>
</template>

<script>
import qs from "qs";
import newTabs from "@/components/newTabs";
import previousPage from "@/components/previousPage.vue";
export default {
  data() {
    return {
      // 数据分析对话框
      dialogVisibleData: false,
      // 表格
      tableData: [],
      list: [],
      form: {
        class_id: "",
        username: "",
        realname: "",
        phone: "",
        status: "",
        timeOrder: "1"
      },
      classList: [],
      // 分页数据
      total: 0,
      pageSize: 10,
      pageNum: 1,
      role_id: sessionStorage.getItem("role_id")
    };
  },

  created() {
    this.getAdminList();
    this.getClass();
  },

  components: {
    newTabs,
    "previous-page": previousPage
  },
  methods: {
     bulkImport(){
            this.$router.push({
                name:'importUserList',
                query:{
                    teacher:'teacher'
                }
            })
        },
    clear(){
      this.form.username=''
      this.form.class_id=''
      this.form.status=''
      this.getAdminList();
    },
    // 获取管理员列表
    getAdminList() {
      const that = this;
      that.$utils
        .post(
          that.reqApi.shuiwuUrl + "/teacher/list",
          qs.stringify({
            class_id: that.form.class_id,
            tname: that.form.username,
            status: that.form.status,
            pageNum: that.pageNum,
            pageSize: that.pageSize
          })
        )
        .then(res => {
          const { code, msg, teachers } = res.data;
          if (code === "0000") {
            that.tableData = teachers.list;
            that.total = teachers.total;
          } else {
            that.$message(msg);
          }
        });
    },

    //搜索
    searchCX() {
      this.getAdminList();
    },

    //获取班级分类
    getClass() {
      const that = this;
      that.$utils
        .post(
          that.reqApi.shuiwuUrl + "/class/list",
          qs.stringify({
            pageNum: that.pagenum,
            pageSize: that.pagesize
          })
        )
        .then(res => {
          const { code, msg, classes } = res.data;
          if (code === "0000") {
            that.classList = classes.list;
          }
        });
    },

    // 新增管理员
    newAdmin() {
      this.$router.push({ name: "newAdmin" });
    },

    // 修改
    questionPut(info) {
      this.$router.push({
        name: "newAdmin",
        query: { id: info.id }
      });
    },

    // 删除
    del(info) {
      const that = this;
      that
        .$confirm("删除操作无法恢复，确定删除吗?", "来自网页的消息", {
          cancelButtonText: "取消",
          confirmButtonText: "确定"
        })
        .then(() => {
          that.$utils
            .post(
              that.reqApi.shuiwuUrl + "/teacher/delete",
              qs.stringify({
                user_id: info.id
              })
            )
            .then(res => {
              const { code, msg } = res.data;
              if (code === "0000") {
                that.$message.success("删除成功");
                that.getAdminList();
              } else {
                that.$message(msg);
              }
            });
        })
        .catch(() => {});
    },
    //重置
    reset(info) {
      this.$confirm("确认将密码重置为123456吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
        // type: 'warning'
      })
        .then(() => {
          this.$utils
            .post(
              this.reqApi.shuiwuUrl + "/teacher/resetPWD",
              qs.stringify({ user_id: JSON.stringify(info.id) })
            )
            .then(res => {
              const { code, msg } = res.data;
              if (code === "0000") {
                this.$message.success("重置成功");
                this.getAdminList();
              } else {
                this.$message(msg);
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消重置"
          });
        });
    },

    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getAdminList(this.pageNum, val);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getAdminList(val, this.pageSize);
    },
    // handleSizeChange(val) {
    //   this.pagesize = val;
    //   this.tableData = [];
    //   this.pagenum = 1;
    //   this.list.forEach((item, index) => {
    //     if (index < this.pagesize) return this.tableData.push(item);
    //   });
    // },

    // handleCurrentChange(val) {
    //   this.pagenum = val;
    //   this.tableData = [];
    //   const currentIndex = this.pagesize * val;
    //   this.list.forEach((item, index) => {
    //     let result = [];
    //     if (index < currentIndex) {
    //       result.push(item);
    //       if (index >= this.pagesize * (val - 1))
    //         return this.tableData.push(item);
    //     }
    //   });
    // }
  }
};
</script>

<style scoped>
</style>
