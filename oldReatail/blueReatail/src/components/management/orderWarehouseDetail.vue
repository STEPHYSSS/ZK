<template>
  <div class="orderWarehouseDetail minimum minWidth1600" id="orderWarehouseDetail">
    <div class="billBox">
       <div class="detailBackBtn">
        <router-link :to="{ path: '/orderWarehouseList' }"><img src="@/assets/returnbutton.png" alt="" class="codesty"></router-link>
      </div>
      <div class="billboxTab">
        <h3 class="billtit">出库单详情</h3>

          <el-row>
          <el-col :span="6">
            <div>创建日期：{{list.createTime|converTime('YYYY-MM-DD')}}</div>
          </el-col>
          <el-col :span="6">
            <div>门店名称：{{list.storeName}}</div>
          </el-col>
          <el-col :span="6">
            <div>实际发货数量：{{list.actualDeliver}}</div>
          </el-col>
          <el-col :span="6">
            <div>实际收货数量：{{list.actualReceive}}</div>
          </el-col>
        </el-row>
      </div>
      <div class="billboxTab">
        <el-table :data="tableData" style="width: 100%" max-height="600">
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
          <el-table-column prop="unit" label="供应商" align="center"></el-table-column>
          <el-table-column prop="actualDeliver" label="实际发货数" align="center"></el-table-column>
          <el-table-column prop="actualReceive" label="实际收货数" align="center"></el-table-column>
          <el-table-column prop="packingCode" label="包装箱号" align="center"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "orderWarehouseDetail",
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
          "/warehouse/checkout/detail",
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
  },
  filters: {
    statusTip(value) {
      if (value == "F") {
        return "审核不通过";
      } else if (value == "W") {
        return "待审核";
      } else if (value == "S") {
        return "审核通过";
      }
    }
  }
};
</script>
<style scoped>
#orderWarehouseDetail {
  /* min-height: 647px; */
  min-width: 1200px;
}
#orderWarehouseDetail .billBox {
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
  padding-top: 15px;
}
#orderWarehouseDetail .billboxTab {
  margin-left: 30px;
  margin-right: 30px;
  padding-bottom: 30px;
}
#orderWarehouseDetail .billboxTab .billtit span {
  font-weight: 100;
  font-size: 16px;
}
#orderWarehouseDetail .deliveTab {
  position: relative;
  border-collapse: collapse;
  width: 100%;
  text-align: left;
}
#orderWarehouseDetail .deliveTab td {
  width: 25%;
  padding-bottom: 15px;
  font-size: 16px;
}
#orderWarehouseDetail .deliveTab tr {
  width: 100%;
}
#orderWarehouseDetail .deliveTab .rowwith {
  width: 30%;
}
/* 返回 */
#orderWarehouseDetail .nav {
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
#orderWarehouseDetail .btnback {
  text-decoration: none;
  width: 80px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  background-color: #fff;
  color: #fff;
  border: 1px solid #01c8dc;
  border-radius: 5px;
  float: right;
  margin-right: 2%;
  background-color: #01c8dc;
}
#orderWarehouseDetail .btnback:hover {
  background-color: #01c8dc;
  color: #fff;
}
#orderWarehouseDetail .inputBox {
  height: 70px;
  width: 300px;
  margin-bottom: 10px;
  resize: none;
  outline: none;
  line-height: 70px;
}
</style>


