<template>
  <div class="Gmanagement">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
      <el-breadcrumb-item :to="{ path: '/operatIndex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>供应商管理</el-breadcrumb-item>
    </el-breadcrumb>-->
    <div class="dingdanRece">
      <div class="dingdanflexBox">
        <!-- 查询框部分 -->
        <p class="store_tit">供应商管理</p>
        <el-row style="white-space: nowrap;">
          <el-col :span="6">
            <span class="lett">供应类型：</span>
            <p>
              <el-select v-model="ruleForm.type" placeholder="请选择">
                <el-option
                  v-for="suppType in suppliType"
                  :key="suppType.value"
                  :label="suppType.name"
                  :value="suppType.name"
                ></el-option>
              </el-select>
            </p>
          </el-col>
          <el-col :span="6" class="TongCenter">
            <span>采购中心：</span>
            <p>
              <el-select v-model="ruleForm.purchase" placeholder="请选择">
                <el-option
                  v-for="puritem in supPurchase"
                  :key="puritem.value"
                  :label="puritem.name"
                  :value="puritem.value"
                ></el-option>
              </el-select>
            </p>
          </el-col>
          <el-col :span="6" class="TongCenter">
            <span>状态：</span>
            <p>
              <el-select v-model="ruleForm.status" placeholder="请选择">
                <el-option
                  v-for="staItem in statu"
                  :key="staItem.value"
                  :label="staItem.label"
                  :value="staItem.value"
                ></el-option>
              </el-select>
            </p>
          </el-col>
          <el-col :span="6" class="TongRight">
            <span>供应商名称：</span>
            <p>
              <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
            </p>
          </el-col>
        </el-row>
        <div class="konge"></div>
        <el-row>
          <el-col :span="6">
            <span>供应商编号：</span>
            <p>
              <el-input v-model="ruleForm.code" placeholder="请输入"></el-input>
            </p>
          </el-col>
          <el-col :span="18" class="TongRight">
            <el-button class="theBtn queryButton" @click="search">查询</el-button>
            <el-button class="theBtn resetButton" @click="resetForm">重置</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="dingdanMain">
        <div class="addStore">
          <router-link to="/addsupplier">
            <!-- <img src="@/assets/addBtn.png" /> -->
            <el-button class="increase themeColor">
              <i class="el-icon-plus"></i>新增
            </el-button>
          </router-link>
        </div>
        <el-table :data="tableDataList" style="width: 100%" border height="100%">
          <el-table-column prop="code" label="供应商编号" align="center"></el-table-column>
          <el-table-column prop="name" label="供应商名称" align="center"></el-table-column>
          <el-table-column prop="contactsName" label="联系人" align="center"></el-table-column>
          <el-table-column label="创建时间" align="center">
            <template scope="scope">
              <span
                v-if="scope.row.createTime!=null"
              >{{scope.row.createTime | converTime('YYYY-MM-DD')}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="purchase" label="采购中心" align="center"></el-table-column>
          <el-table-column prop="type" label="类型" align="center"></el-table-column>
          <el-table-column label="供应方式" align="center">
            <template scope="scope">{{scope.row.supplyMode | suppmode}}</template>
          </el-table-column>
          <el-table-column prop="status" label="状态" align="center">
            <template scope="scope">
              <span v-if="scope.row.status =='0'">已禁用</span>
              <span v-else>已启用</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template scope="scope">
              <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
                <img
                  src="@/assets/xiugai_icon.png"
                  @click="editSupplier(scope.row.code)"
                  class="imgSize"
                />
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="启用"
                placement="bottom"
                v-if="scope.row.status=='0'"
              >
                <img
                  src="@/assets/jinyong_icon.png"
                  @click="modify(scope.row.status,scope.row.code)"
                  class="imgSize"
                />
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="禁用" placement="bottom" v-else>
                <img
                  src="@/assets/qiyong_icon.png"
                  @click="modify(scope.row.status,scope.row.code)"
                  class="imgSize"
                />
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="重置密码" placement="bottom">
                <img src="@/assets/resetpasswords_icon.png" @click="resPwd" class="imgSize" />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <div class="paginStyle fenyedignwei">
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
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      ruleForm: {
        type: "",
        purchase: "",
        status: "",
        name: "",
        code: "",
        pageNum: 1,
        pageSize: 20,
        total: 0,
        token: sessionStorage.getItem("token")
      },
      Info: {
        token: "",
        code: ""
      },
      tableDataList: [],
      n1: false,
      n2: true,
      n3: true,
      n4: false,
      suppliType: [], //类型下拉选
      supPurchase: [], //采购下拉选
      statu: [
        {
          value: "0",
          label: "已禁用"
        },
        {
          value: "1",
          label: "已启用"
        }
      ],
      // 分页数据
      pageNum: 1,
      pageSize: 20,
      total: 0
    };
  },
  created() {
    this.getSmageList();
    this.showother();
    this.suPurchase();
  },
  filters: {
    suppmode(value) {
      if (value == "Z") {
        return "直送门店";
      } else if (value == "W") {
        return "仓库配送";
      }
    }
  },
  methods: {
    getSmageList(pageNum, pageSize) {
      const _this = this;
      _this
        .$axios({
          url: window.apiUrl + "supplier/list",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify(_this.ruleForm)
        })
        .then(res => {
          if (res.data.code == "0000") {
            _this.tableDataList = res.data.data.list;
            _this.total = res.data.data.total;
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
    // 采购中心下拉选supplier_purchase_select
    suPurchase() {
      let _this = this;
      let token = sessionStorage.getItem("token");
      let code = "supplier_purchase_select";
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
            _this.supPurchase = res.data.data;
          }
        });
    },
    // 供应商类型下拉选	supplier_type_select
    showother() {
      let _this = this;
      let token = sessionStorage.getItem("token");
      let code = "supplier_type_select";
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
            console.log(res.data.data)
            _this.suppliType = res.data.data;
          }
        })
        .catch(err => {
          console.log("数据异常", err);
        });
    },
    // 查询
    search() {
      this.getSmageList();
    },
    resetForm() {
      this.ruleForm.type = "";
      this.ruleForm.purchase = "";
      this.ruleForm.status = "";
      this.ruleForm.name = "";
      this.ruleForm.code = "";
      this.getSmageList();
      // this.$refs['ruleForm'].resetFields() //重置表单
    },
    // 编辑
    editSupplier(code) {
      let token = sessionStorage.getItem("token");
      this.$router.push({
        name: "suppliermanagement",
        query: {
          code: code
        }
      });
    },
    // 启用1、禁用0
    modify(status, code) {
      let _this = this;
      _this.Info.token = sessionStorage.getItem("token");
      _this.Info.code = code;
      _this
        .$axios({
          url: window.apiUrl + "supplier/status/modify",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify(_this.Info)
        })
        .then(res => {
          if (res.data.code == "0000") {
            this.getSmageList();
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
    },
    // 重置密码
    resPwd(code) {
      this.$confirm("确定将供应商登陆密码重置为123456？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const _this = this;
          _this
            .$axios({
              url: window.apiUrl + "supplier/password/reset",
              method: "POST",
              headers: { "content-type": "application/x-www-form-urlencoded" },
              data: qs.stringify(_this.Info)
            })
            .then(res => {
              this.$message({
                type: "success",
                message: "设置成功!"
              });
            })
            .catch(err => {
              this.$message({
                type: "info",
                message: "已取消重置"
              });
              console.log("数据有误");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消重置"
          });
        });
    },
    handleSizeChange(val) {
      this.ruleForm.pageSize = val;
      this.getSmageList(this.pageNum, val);
    },
    handleCurrentChange(val) {
      this.ruleForm.pageNum = val;
      this.getSmageList(val, this.pageSize);
    },
    enter() {
      this.n1 = true;
      this.n4 = true;
    },
    leave() {
      this.n1 = false;
      this.n4 = false;
    },
    click(index, row) {
      this.n3 = this.n3 ? false : true;
      this.n4 = true;
    },
    enter2() {
      this.n2 = true;
    },
    leave2() {
      this.n2 = false;
    }
  }
};
</script>

<style scoped>
.Gmanagement {
  background-color: #fff;
  min-height: 647px;
  min-width: 1700px;
  height: 100%;
  box-sizing: border-box;
  box-shadow: 0px 2px 10px #ccc;
}
.Gmanagement .dingdanRece {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.dingdanflexBox {
  height: 200px;
  margin: 0 20px;
  box-sizing: border-box;
}
.dingdanMain {
  flex: 1;
  -webkit-box-flex: 1;
  position: relative;
  margin-bottom: 90px;
  max-height: 600px;
}
.fenyedignwei {
  position: absolute;
  bottom: -90px;
  right: 0;
}
p {
  display: inline-block;
  width: 300px;
}
.Gmanagement .el-range-editor.el-input__inner {
  width: 100%;
}
.Gmanagement .el-select {
  width: 100%;
}
.TongRight .el-button {
  padding: 0;
}
.addStore img {
  margin-right: 20px;
}
.lett {
  letter-spacing: 3px;
}
</style>
