<template>
  <div class="outboundOrderDetail" id="outboundOrderDetail">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
      <el-breadcrumb-item :to="{ path: '/operatIndex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订购出库</el-breadcrumb-item>
      <el-breadcrumb-item>详情</el-breadcrumb-item>
    </el-breadcrumb>-->

    <div class="billBox">
      <div class="billboxTab">
        <p class="billtit store_tit">出库详情</p>
        <router-link :to="{ path: '/operateOutboundOrder' }" class="outBtnBack">
          <img src="@/assets/Rbutton.png" />
        </router-link>
        <table class="deliveTab">
          <tr>
            <td class="rowWith">创建日期：{{list.createTime|converTime('YYYY-MM-DD')}}</td>
            <td class="rowwith">门店名称：{{list.storeName}}</td>
            <td class="rowwith">实际发货数量：{{list.actualDeliver}}</td>
            <td class="rowWith">实际收货数量：{{list.actualReceive}}</td>
          </tr>
        </table>
      </div>
      <div class="billboxTab">
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column prop="code" label="货号" align="center"></el-table-column>
          <el-table-column prop="name" label="品名" align="center"></el-table-column>
          <el-table-column prop="count" label="订购数量" align="center"></el-table-column>
          <el-table-column prop="unit" label="单位" align="center"></el-table-column>
          <el-table-column prop="spec" label="规格" align="center"></el-table-column>
          <el-table-column label="保质期" align="center">
            <template scope="scope">
              <span>{{scope.row.period}}{{scope.row.periodUnit}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="temperature" label="温层" align="center"></el-table-column>
          <el-table-column prop="actualDeliver" label="实际发货数" align="center"></el-table-column>
          <el-table-column prop="actualReceive" label="实际收货数" align="center"></el-table-column>
          <el-table-column prop="packinCode" label="包装箱号" align="center"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "outboundOrderDetail",
  data() {
    return {
      tableData: [],
      list: {}
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    //获取详情
    getlist() {
      this.$axios
        .post(
          "/sys/warehouse/checkout/detail",
          qs.stringify({
            token: sessionStorage.getItem("token"),
            checkoutCode: sessionStorage.getItem("code")
          })
        )
        .then(res => {
          if (res.data.code === "0000") {
            this.list = res.data.data.checkout;
            this.tableData = res.data.data.subList;
            this.list.actualDeliver = 0;
            this.list.actualReceive = 0;
            for (let i = 0; i < this.tableData.length; i++) {
              this.list.actualDeliver += parseFloat(
                this.tableData[i].actualDeliver
              );
              this.list.actualReceive += parseFloat(
                this.tableData[i].actualReceive
              );
            }
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
    }
  }
};
</script>
<style scoped>
#outboundOrderDetail {
  background-color: #fff;
  min-height: 647px;
  min-width: 1700px;
  height: 100%;
  box-shadow: 0 2px 10px #ccc;
}
#outboundOrderDetail .billBox {
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
}
#outboundOrderDetail .billboxTab {
  margin: 0 20px;
  padding-bottom: 30px;
}
#outboundOrderDetail .billboxTab .billtit {
  /* padding-top: 20px; */
  display: inline-block;
}
#outboundOrderDetail .billboxTab .billtit span {
  font-weight: 100;
  font-size: 16px;
}
#outboundOrderDetail .deliveTab {
  position: relative;
  border-collapse: collapse;
  width: 100%;
  text-align: left;
}
#outboundOrderDetail .deliveTab td {
  width: 25%;
  padding-bottom: 15px;
  font-size: 12px;
}
#outboundOrderDetail .deliveTab tr {
  width: 100%;
}
#outboundOrderDetail .deliveTab .rowwith {
  width: 30%;
}
/* 返回 */
#outboundOrderDetail .nav {
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
#outboundOrderDetail .outBtnBack {
  text-decoration: none;
  width: 69px;
  float: right;
  cursor: pointer;
  margin-top: 13px;
}
#outboundOrderDetail .outBtnBack:hover {
  color: #444444;
}
#outboundOrderDetail .inputBox {
  height: 70px;
  width: 300px;
  margin-bottom: 10px;
  resize: none;
  outline: none;
  line-height: 70px;
}
</style>


