<template>
  <div class="purchaseOrder">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
      <el-breadcrumb-item :to="{ path: '/operatIndex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>门店单据管理</el-breadcrumb-item>
      <el-breadcrumb-item>采购单管理</el-breadcrumb-item>
    </el-breadcrumb>-->
    <div class="storeBox">
      <div class="store_Box">
        <p class="store_tit">采购单管理</p>
        <el-row style="white-space: nowrap;">
          <el-col :span="6">
            <span>创建日期：</span>
            <p>
              <el-date-picker
                v-model="date1"
                @change="change($event, 'data2')"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </p>
          </el-col>
          <el-col :span="6" class="TongCenter">
            <span>供应商编号：</span>
            <p>
              <el-input v-model="form.supplierCode" placeholder="请输入"></el-input>
            </p>
          </el-col>
          <el-col :span="6" class="TongCenter">
            <span>采购单编号：</span>
            <p>
              <el-input v-model="form.code" placeholder="请输入"></el-input>
            </p>
          </el-col>
          <el-col :span="6" class="TongRight">
            <span>供应商名称：</span>
            <p>
              <el-input v-model="form.supplierNameLike" placeholder="请输入"></el-input>
            </p>
          </el-col>
        </el-row>
        <div class="konge"></div>
        <el-row>
          <el-col class="TongRight">
            <el-button type="primary" @click="seach" class="theBtn queryButton">查询</el-button>
            <el-button @click="result" class="theBtn resetButton">重置</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="storeInfo">
      <div class="store_Box1">
        <div class="hideScoll">
          <el-table :data="tableData" style="width: 100%;">
            <el-table-column label="创建日期" align="center">
              <template scope="scope">{{scope.row.createTime|converTime('YYYY-MM-DD')}}</template>
            </el-table-column>
            <el-table-column prop="code" label="采购单编号" align="center" width="250">
              <template scope="scope">
                <span class="codesty" @click="clod(scope.row.code)">{{scope.row.code}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="supplierCode" label="供应商编号" align="center"></el-table-column>
            <el-table-column prop="supplierName" label="供应商名称" align="center"></el-table-column>
            <el-table-column prop="item" label="订购品项数" align="center"></el-table-column>
            <el-table-column prop="count" label="订购总数" align="center"></el-table-column>
            <el-table-column prop="amount" label="订购总金额" align="center"></el-table-column>
            <el-table-column align="center" label="预计到货日期">
              <template scope="scope">{{scope.row.estimatedArrivalTime|converTime('YYYY-MM-DD')}}</template>
            </el-table-column>
          </el-table>
          <div class="paginStyle">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageNum"
              :page-sizes="[20,40,60]"
              :page-size="pageSize"
              background
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              class="pagination"
            ></el-pagination>
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
      form: {
        code: "",
        supplierNameLike: "",
        supplierCode: "",
        createTimeStart: "",
        createTimeEnd: "",
        token: sessionStorage.getItem("token")
      },
      date1: [],
      tableData: [],
      pageNum: 1,
      pageSize: 20,
      total: 0,
      show: false
    };
  },
  created() {
    this.getlist(this.pageNum, this.pageSize);
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.getlist(this.pageNum, this.pageSize);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getlist(this.pageNum, this.pageSize);
    },
    result() {
      this.form.code = "";
      this.form.supplierNameLike = "";
      this.form.supplierCode = "";
      this.form.createTimeStart = "";
      this.form.createTimeEnd = "";
      this.date1 = [];
      this.getlist();
    },
    seach() {
      this.getlist();
    },
    change(e, name) {
      this.form.createTimeStart = this.$moment(e[0]).format("YYYY-MM-DD");
      this.form.createTimeEnd = this.$moment(e[1]).format("YYYY-MM-DD");
    },
    getlist(pageNum, pageSize) {
      this.$axios({
        url: window.apiUrl + "purchase/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          code: this.form.code,
          supplierNameLike: this.form.supplierNameLike,
          supplierCode: this.form.supplierCode,
          createTimeStart: this.form.createTimeStart,
          createTimeEnd: this.form.createTimeEnd,
          token: this.form.token,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.tableData = res.data.data.list;
          this.total = res.data.data.total;
        } else if (code == "6666") {
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
    clod(code) {
      this.$router.push({
        name: "orderDetail",
        query: {
          code: code
        }
      });
    },
    onSubmit() {},
    showing() {
      this.show = !this.show;
    }
  }
};
</script>
<style scoped>
.purchaseOrder {
  background-color: #fff;
  min-height: 647px;
  height: 100%;
  min-width: 1700px;
  box-shadow: 0px 2px 10px #ccc;
  box-sizing: border-box;
}
.store_Box1 {
  position: relative;
  overflow: hidden;
  height: 643px;
}
.hideScoll {
  position: absolute;
  left: 0;
  top: 0;
  right: -17px;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: scroll;
}
p {
  display: inline-block;
  width: 300px;
}
.storeBox,
.storeInfo {
  margin: 0 auto;
  background: #fff;
  font-size: 12px;
}

.storeBox {
  /* border-bottom: 1px solid #555555; */
  height: 200px;
  box-sizing: border-box;
}

.store_Box {
  margin-left: 20px;
  margin-right: 20px;
}

.store_tit {
  padding-top: 20px;
  padding-bottom: 20px;
  font-size: 14px;
  font-weight: 900;
}

.addStore {
  display: inline-block;
  box-sizing: border-box;
  margin-bottom: 16px;
  text-align: right;
  width: 100%;
  padding-right: 20px;
}

.addStore img {
  width: 69px;
}

.imgSize {
  width: 14px;
  margin: 0 5px;
}

.TongCenter {
  text-align: center;
}

.TongRight {
  text-align: right;
}
.paginStyle {
  height: 50px;
  text-align: right;
}
.el-button {
  margin: 0 0 0 15px;
}
.widOne {
  width: 93.3px;
}
.widOne:nth-child(3) {
  margin: 0 10px;
}
</style>
