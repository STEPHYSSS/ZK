<template>
  <div class="shoporder">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
      <el-breadcrumb-item :to="{ path: '/suppIndex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item >订单管理</el-breadcrumb-item>
      <el-breadcrumb-item >采购单管理</el-breadcrumb-item>
    </el-breadcrumb>-->
    <div class="storeBox">
      <div class="store_Box">
        <p class="store_tit">采购单管理</p>
        <el-row style="white-space:nowrap;">
          <el-col :span="6">
            <span>创建日期：</span>
            <p>
              <el-date-picker
                v-model="ruleForm.date1"
                @change="change($event, 'data1')"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </p>
          </el-col>
          <el-col :span="6" class="TongCenter">
            <span>预计到货日期：</span>
            <p>
              <el-date-picker
                v-model="ruleForm.date2"
                @change="change($event, 'data2')"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </p>
          </el-col>
          <el-col :span="6" class="TongCenter">
            <span>状态：</span>
            <p>
              <el-select v-model="form.status" size="mini" placeholder="请选择">
                <el-option label="待确认" value="1"></el-option>
                <el-option label="已发货" value="2"></el-option>
                <el-option label="已完成" value="3"></el-option>
              </el-select>
            </p>
          </el-col>
          <el-col :span="6" class="TongRight">
            <span>采购单编号：</span>
            <p>
              <el-input type="text" placeholder="请输入" v-model="form.code" />
            </p>
          </el-col>
        </el-row>
        <div class="konge"></div>
        <el-row>
          <el-col class="TongRight">
            <el-button class="theBtn queryButton" @click="submitForm(ruleForm)">查询</el-button>
            <el-button class="theBtn resetButton" @click="resetForm">重置</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="storeInfo">
      <div class="store_Box1">
        <div class="scollHide">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column label="创建日期" align="center">
              <template scope="scope">
                <span>{{scope.row.createTime|fmtDate2}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="code" label="采购单编号" align="center" width="220"></el-table-column>
            <el-table-column prop="item" label="订购品项数" align="center"></el-table-column>
            <el-table-column prop="count" label="订购总数" align="center"></el-table-column>
            <el-table-column prop="amount" label="订购总金额" align="center"></el-table-column>
            <el-table-column label="订单状态" align="center">
              <template scope="scope">{{scope.row.status | revistauTip}}</template>
            </el-table-column>
            <el-table-column label="预计到店日期" align="center">
              <template scope="scope">
                <span>{{scope.row.estimatedArrivalTime|fmtDate2}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" fixed="right">
              <template scope="scope">
                <el-tooltip class="item" effect="dark" content="查看" placement="bottom">
                    <img src="@/assets/chaxun_icon.png" class="imgSize" @click="see(scope.row.code)"/>
                </el-tooltip>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="配送"
                  placement="bottom"
                  v-if="scope.row.status=='1'"
                >
                    <img src="@/assets/present_icon_one.png" class="imgSize" @click="see2(scope.row.code)"/>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
          <div class="konge"></div>
          <div class="paginStyle">
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
          <div class="konge"></div>
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
      form: {
        code: "",
        status: "",
        createTimeStart: "",
        createTimeEnd: "",
        estimatedArrivalTimeStart: "",
        estimatedArrivalTimeEnd: "",
        token: sessionStorage.getItem("token"),
        pageNum: 1,
        pageSize: 20,
        total: 0
      },
      tableData: [],
      ruleForm: {
        date1: "",
        date2: ""
      },
      pageNum: 1,
      pageSize: 20,
      total: 0
    };
  },
  created() {
    this.getlist(this.pageNum);
  },
  methods: {
    resetForm() {
      this.form.code = "";
      this.form.status = "";
      this.form.createTimeStart = "";
      this.form.createTimeEnd = "";
      this.form.estimatedArrivalTimeStart = "";
      this.form.estimatedArrivalTimeEnd = "";
      this.ruleForm = {};
      this.getlist();
    },
    change(e, name) {
      if (name === "data1") {
        this.form.createTimeStart = this.$moment(e[0]).format("YYYY-MM-DD");
        this.form.createTimeEnd = this.$moment(e[1]).format("YYYY-MM-DD");
      } else {
        this.form.estimatedArrivalTimeStart = this.$moment(e[0]).format(
          "YYYY-MM-DD"
        );
        this.form.estimatedArrivalTimeEnd = this.$moment(e[1]).format(
          "YYYY-MM-DD"
        );
      }
    },
    submitForm() {
      this.getlist();
    },
    getlist() {
      this.$axios
        .post("/supplier/purchase/list", qs.stringify(this.form))
        .then(res => {
          if (res.data.code == "0000") {
            this.tableData = res.data.data.list;
            this.total = res.data.data.total;
          } else if (res.data.code == "6666") {
            this.$message({
              showClose: true,
              message: "token异常，请重新登录",
              type: "error"
            });
          } else {
            this.$message.error(res.data.msg);
          }
        });
    },
    handleSizeChange(val) {
      this.form.pageSize = val;
      this.getlist();
    },
    handleCurrentChange(val) {
      this.form.pageNum = val;
      this.getlist();
    },
    see(e) {
      sessionStorage.setItem("purchaseCode", e);
      this.$router.push({
        name: "shopdetails"
      });
    },
    see2(e) {
      sessionStorage.setItem("purchaseCode", e);
      this.$router.push({
        name: "confirm"
      });
    }
  },
  filters: {
    revistauTip(value) {
      // 验收状态
      if (value == "1") {
        return "待确认";
      } else if (value == "2") {
        return "已发货";
      } else if (value == "3") {
        return "已完成";
      }
    }
  }
};
</script>

<style scoped>
.shoporder {
  background-color: #fff;
  min-width: 1700px;
  min-height: 647px;
  box-shadow: 0px 2px 10px #ccc;
}
.store_Box1 {
  position: relative;
  overflow: hidden;
  height: 634px;
}
.scollHide {
  position: absolute;
  left: 0;
  top: 0;
  right: -17px;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  height: 100%;
}
p {
  display: inline-block;
  width: 300px;
}
.shoporder .el-range-editor.el-input__inner {
  width: 100%;
}
.shoporder .el-select {
  width: 100%;
}
</style>
