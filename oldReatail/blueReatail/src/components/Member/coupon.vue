<template>
  <div class="coupon">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
      <el-breadcrumb-item :to="{ path: '/operatIndex' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item >会员中心</el-breadcrumb-item>
      <el-breadcrumb-item >优惠券明细</el-breadcrumb-item>
    </el-breadcrumb>-->
    <h3 class="coup">优惠券明细</h3>
    <img class="Couponbtnback22" src="@/assets/Rbutton.png" @click="goback" />
    <!-- <button class="Couponbtnback22" @click="goback">返回</button> -->
    <div class="coupHideScoll">
      <div class="couponbox">
      <el-table :data="tableData" style="width: 100%;">
        <el-table-column prop="name" label="优惠券名称" align="center"></el-table-column>
        <el-table-column label="金额（折扣）" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.reduceMoney !=null">{{scope.row.reduceMoney}}</span>
            <span v-else-if="scope.row.discountMoney !=null">{{scope.row.discountMoney}}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template scope="scope">{{scope.row.status|couponTip}}</template>
        </el-table-column>
        <el-table-column label="发放时间" align="center">
          <template scope="scope">
            <span
              v-if="scope.row.createTime !=null"
            >{{scope.row.createTime | converTime('YYYY-MM-DD HH:mm:ss')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="使用时间" align="center">
          <template scope="scope">
            <span
              v-if="scope.row.useTime !=null"
            >{{scope.row.useTime | converTime('YYYY-MM-DD HH:mm:ss')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="orderCode" label="关联订单号" align="center"></el-table-column>
        <el-table-column prop="source" label="优惠券来源" align="center"></el-table-column>
      </el-table>
    </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "coupon",
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.getcoupon();
  },
  methods: {
    getcoupon() {
      this.$axios({
        url: window.apiUrl + "member/coupon/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: sessionStorage.getItem("token"),
          memberId: sessionStorage.getItem("couCode"),
          pageSize:9999
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.tableData = res.data.data.list;
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
    goback() {
      this.$router.go(-1);
    }
  },
  filters: {
    couponTip(value) {
      if (value == "1") {
        return "未生效";
      } else if (value == "2") {
        return "未使用";
      } else if (value == "3") {
        return "已使用";
      } else if (value == "4") {
        return "已失效";
      }
    }
  }
};
</script>

<style scoped>
.coupon {
  background-color: #fff;
  height: 100%;
  min-width: 1700px;
  box-sizing: border-box;
  box-shadow: 0px 2px 10px #ccc;
}
.Couponbtnback22 {
  text-decoration: none;
  width: 69px;
  float: right;
  cursor: pointer;
  margin-right: 20px;
  background-color: #fff;
  /* color: #444444;
  border: 1px solid #555555; */
  margin-top: 13px;
}
.coupHideScoll{
  overflow: hidden;
  position: relative;
  height: 760px;
}
.couponbox {
  margin: 0 auto;
  position: absolute;
  left: 0;
  top: 0;
  right: -17px;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: scroll;
}
.coup {
  padding-top: 20px;
  padding-bottom: 20px;
  margin-left: 20px;
  font-size: 14px;
  font-weight: 900;
  display: inline-block;
}
.couponbox .el-table {
  margin: 0;
}
</style>

