<template>
  <div id="TurnLibraryWorkList" class="minimum">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
      <el-breadcrumb-item :to="{ path: '/operatIndex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>仓库管理</el-breadcrumb-item>
      <el-breadcrumb-item>转库作业</el-breadcrumb-item>
    </el-breadcrumb> -->
    <div class="storeBox storeBox222">
      <div class="store_Box">
        <p class="store_tit">转库作业</p>
        <el-row style="white-space: nowrap;">
          <el-col :span="6">
            <span>创建日期：</span>
            <p>
              <el-date-picker
                v-model="changeTime"
                type="daterange"
                @input="change1"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </p>
          </el-col>
          <el-col :span="6" class="TongCenter">
            <span>单据状态：</span>
            <p>
              <el-select placeholder="请选择" v-model="ruleForm.status" class="input1">
                <el-option label="待审核" value="W"></el-option>
                <el-option label="审核通过" value="S"></el-option>
                <el-option label="审核不通过" value="F"></el-option>
              </el-select>
            </p>
          </el-col>
          <el-col :span="6" class="TongCenter">
            <span>单据编号：</span>
            <p>
              <el-input type="text" placeholder="请输入" class="input1" v-model="ruleForm.code"></el-input>
            </p>
          </el-col>
          <el-col :span="6" class="TongRight">
            <el-button class="theBtn queryButton" @click="chaxun">查询</el-button>
            <el-button @click="reset" class="theBtn resetButton">重置</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="storeInfo">
      <div class="store_Box1">
        <el-table :data="tableData" style="width: 100%;" border>
        <el-table-column label="单据编号" prop="code" align="center" width="250"></el-table-column>
        <el-table-column label="创建日期" align="center">
          <template scope="scope">
            <span>{{scope.row.createTime|fmtDate2}}</span>
          </template>
        </el-table-column>
        <el-table-column label="单据状态" align="center">
          <template scope="scope">
            <span>{{scope.row.status|statusTip}}</span>
          </template>
        </el-table-column>
        <el-table-column label="转库品项数" prop="item" align="center"></el-table-column>
        <el-table-column label="转库总数" prop="count" align="center"></el-table-column>
        <el-table-column label="创建人" prop="createName" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="scope">
            <el-tooltip class="item" effect="dark" content="审核" placement="bottom" v-if="scope.row.status == 'W'">
                <div @click="toDetail(scope.row.code)">
                  <img src="@/assets/present_icon_one.png" class="imgSize" />
                </div>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="查看" placement="bottom" v-if="scope.row.status=='S'" >
                <div @click="toDetail(scope.row.code)">
                  <img src="@/assets/chaxun_icon.png" class="imgSize" />
                </div>
              </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
        <div class="konge"></div>
        <div class="paginStyle">
          <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="ruleForm.pageNum"
          :page-sizes="[20, 40, 60]"
          :page-size="ruleForm.pageSize"
          class="page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableDataTotal"
        ></el-pagination>
        </div>
        <div class="konge"></div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "TurnLibraryWorkList",
  data() {
    return {
      changeTime: "",
      ruleForm: {
        token: sessionStorage.getItem("token"),
        pageNum: 1,
        pageSize: 20,
        createTimeStart: "",
        createTimeEnd: "",
        status: "",
        code: ""
      },
      tableDataTotal: 0,
      tableData: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    change1(e) {
      this.ruleForm.createTimeStart = this.$moment(e[0]).format("YYYY-MM-DD");
      this.ruleForm.createTimeEnd = this.$moment(e[1]).format("YYYY-MM-DD");
    },
    chaxun() {
      this.getList();
    },
    reset() {
      this.ruleForm.code = "";
      this.ruleForm.status = "";
      this.changeTime = "";
      this.ruleForm.createTimeStart = "";
      this.ruleForm.createTimeEnd = "";
      this.getList();
    },
    getList() {
      this.$axios
        .post("/sys/warehouse/transfer/list", qs.stringify(this.ruleForm))
        .then(res => {
          if (res.data.code === "0000") {
            this.tableData = res.data.data.list;
            this.tableDataTotal = res.data.data.total;
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
          }
        });
    },
    toDetail(code) {
      let codes = sessionStorage.setItem("code", code);
      this.$router.push({
        name: "TurnLibraryWorkDetail",
        params: {
          code: codes
        }
      });
    },
    handleSizeChange(val) {
      this.ruleForm.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.ruleForm.pageNum = val;
      this.getList();
    }
  },
  filters: {
    statusTip(value) {
      if (value == "S") {
        return "审核通过";
      } else if (value == "W") {
        return "待审核";
      } else if (value == "F") {
        return "审核不通过";
      }
    }
  }
};
</script>
<style scoped>
#TurnLibraryWorkList .nav {
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
#TurnLibraryWorkList {
  background-color: #fff;
  min-height: 647px;
  height: 100%;
  min-width: 1700px;
  box-shadow: 0px 2px 10px #ccc;
}
p {
  display: inline-block;
  width: 300px;
}
#TurnLibraryWorkList .el-range-editor.el-input__inner {
  width: 100%;
}
.storeBox222 {
  height: 150px;
}
.paginStyle {
    height: 50px;
    text-align: right;
}
</style>

