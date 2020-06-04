<template>
  <div class="jiaoOrder">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
      <!-- <el-breadcrumb-item :to="{ path: '/operatIndex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>门店单据管理</el-breadcrumb-item>
      <el-breadcrumb-item>叫货单管理</el-breadcrumb-item>-->
    </el-breadcrumb>
    <h3 style="store_tit">叫货单管理</h3>
    <!-- <button class="Couponbtnback" @click="goback">返回</button> -->
    <img src="@/assets/Rbutton.png" @click="goback" class="CouponbtnbackC" />
    <div class="jiaoDetail">
      <div class="detailSpan">
        <el-row style="white-space: nowrap;">
          <el-col :span="6" class>
            <span>创建日期：{{listInfo.createTime|converTime('YYYY-MM-DD')}}</span>
          </el-col>
          <el-col :span="6">
            <span>叫货单编号：{{listInfo.code}}</span>
          </el-col>
          <el-col :span="6" class="TongCenter">
            <span>叫货状态：{{listInfo.status | yanTip}}</span>
          </el-col>
          <el-col :span="6" class="TongCenter">
            <span>门店：{{listInfo.storeName}}</span>
          </el-col>
        </el-row>
      </div>
      <div class="konge"></div>
    </div>
    <div class="jiaoTable">
      <div class="konge"></div>
      <div class="detailSpan">
        <el-table :data="tableData" style="width: 100%;" id="bordBck" border>
          <el-table-column prop="code" label="货号" align="center"></el-table-column>
          <el-table-column prop="name" label="品名" align="center"></el-table-column>
          <el-table-column prop="orderingCount" label="订购总数" align="center"></el-table-column>
          <el-table-column prop="orderingAmount" label="订购总金额" align="center"></el-table-column>
          <el-table-column prop="spec" label="规格" align="center"></el-table-column>
          <el-table-column prop="salesPrice" label="单品售价" align="center"></el-table-column>
          <el-table-column label="保质期" align="center">
            <template slot-scope="scope">{{scope.row.period}}{{scope.row.periodUnit}}</template>
          </el-table-column>
          <el-table-column prop="temperature" label="温层" align="center"></el-table-column>
          <el-table-column label="预计到货日期" align="center">
            <template scope="scope">{{scope.row.estimatedArrivalTime|converTime('YYYY-MM-DD')}}</template>
          </el-table-column>
          <el-table-column prop="supplierName" label="供应商" align="center"></el-table-column>
          <el-table-column prop="actualDelivery" label="实际发货数" align="center"></el-table-column>
          <el-table-column prop="actualReceipt" label="实际收货数" align="center"></el-table-column>
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
          ></el-pagination>
        </div>
        <div class="konge"></div>
      </div>
    </div>
  </div>
</template>

<script >
import qs from "qs";
export default {
  data() {
    return {
      tableData: [],
      listInfo: {},
      pageNum: 1,
      pageSize: 20,
      total: 0
    };
  },
  created() {
    this.getJiaoDetail(this.pageNum, this.pageSize);
  },
  methods: {
    // orderingCode
    getJiaoDetail() {
      this.$axios({
        url: window.apiUrl + "ordering/sub/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: sessionStorage.getItem("token"),
          orderingCode: sessionStorage.getItem("jiaoCode"),
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.tableData = res.data.data.pageInfo.list;
          this.listInfo = res.data.data.orderingSheet;
          this.total = res.data.data.pageInfo.total;
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
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getJiaoDetail(this.pageNum, val);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getJiaoDetail(val, this.pageSize);
    },
    goback() {
      this.$router.go(-1);
    }
  },
  filters: {
    yanTip(value) {
      if (value == "1") {
        return "备货中";
      } else if (value == "2") {
        return "待验收";
      } else if (value == "3") {
        return "部分验收";
      } else if (value == "4") {
        return "全部验收";
      }
    }
  }
};
</script>

<style scoped>
.jiaoOrder {
  min-width: 1700px;
  background-color: #ffffff;
  min-height: 647px;
  height: 100%;
}
.jiaoOrder h3 {
  display: inline-block;
  margin-left: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  font-size: 14px;
  font-weight: 900;
}
.jiaoTable {
  min-height: 260px;
  margin: 0px auto;
  background: #fff;
  border-radius: 10px;
}
.jiaoDetail .detailSpan span {
  margin-right: 15px;
  font-size: 12px;
}
.detailSpan {
  width: 98%;
  margin: 0 auto;
}
.paginStyle {
  height: 50px;
  text-align: right;
}
.TongCenter {
  text-align: center;
}
.CouponbtnbackC {
  margin-right: 20px;
  text-decoration: none;
  float: right;
  cursor: pointer;
  margin-top: 13px;
}
</style>
