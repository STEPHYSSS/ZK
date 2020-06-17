<template>
  <div class="operaPurWareDetail" id="operaPurWareDetail">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
      <el-breadcrumb-item :to="{ path: '/operatIndex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>c</el-breadcrumb-item>
      <el-breadcrumb-item>c</el-breadcrumb-item> 
    </el-breadcrumb>-->
    <h3 class="store_tit">采购入库详情</h3>
    <router-link :to="{ path: '/operaPurWare' }" class="opWBtnBack">
      <img src="@/assets/Rbutton.png" />
    </router-link>
    <div class="billBox">
      <div class="billboxTab">
        <!-- <h3 class="billtit" v-if="list.status=='W'">入库详情待验收</h3>
        <h3 class="billtit" v-if="list.status=='S'">入库详情已收货</h3>-->
        <table class="deliveTab">
          <tr>
            <td class="rowWith">
              <span>创建日期：</span>
              {{list.createTime|converTime('YYYY-MM-DD')}}
            </td>
            <td class="rowwith">
              <span>单据编号：</span>
              {{list.code}}
            </td>
            <td class="rowwith">
              <span>入库状态：</span>
              {{list.status |statusTip }}
            </td>
            <td class="rowWith">
              <span>供应商：</span>
              {{list.supplierCode}}
            </td>
          </tr>
          <tr>
            <td class="rowWith">
              <span>入库品项数：</span>
              {{list.item}}
            </td>
            <td class="rowwith">
              <span>入库总数：</span>
              {{list.count}}
            </td>
            <td class="rowWith">
              <span>创建人：</span>
              {{list.createName}}
            </td>
            <td class="rowWith" v-if="list.acceptance!=null">
              <span>验收人：</span>
              {{list.acceptance}}
            </td>
          </tr>
        </table>
      </div>
      <div class="billboxTab">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="code" label="货号" align="center"></el-table-column>
          <el-table-column prop="name" label="品名" align="center"></el-table-column>
          <el-table-column prop="purchaseCount" label="采购数量" align="center"></el-table-column>
          <el-table-column prop="deliverCount" label="发货数量" align="center"></el-table-column>
          <el-table-column prop="warehouseCount" label="入库数量" align="center"></el-table-column>
          <el-table-column prop="spec" label="规格" align="center"></el-table-column>
          <el-table-column prop="unit" label="单位" align="center"></el-table-column>
          <el-table-column label="保质期" align="center">
            <template scope="scope">{{scope.row.period}}{{scope.row.periodUnit}}</template>
          </el-table-column>
          <el-table-column prop="temperature" label="温层" align="center"></el-table-column>
          <el-table-column prop="locationCode" label="存放货位" align="center"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "operaPurWareDetail",
  data() {
    return {
      tableData: [],
      list: {},
      subSet: []
    };
  },
  created() {
    this.getPurInfo();
  },
  methods: {
    //获取详情
    getPurInfo() {
      this.$axios({
        url: window.apiUrl + "warehouse/purchase/detail",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: sessionStorage.getItem("token"),
          purchaseCode: sessionStorage.getItem("purWareC")
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.tableData = res.data.data.subList;
          this.list = res.data.data.purchase;
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
    }
  },
  filters: {
    statusTip(value) {
      if (value == "F") {
        return "待发货";
      } else if (value == "W") {
        return "待收货";
      } else if (value == "S") {
        return "已收货";
      }
    }
  }
};
</script>
<style scoped>
#operaPurWareDetail {
  background-color: #ffffff;
  height: 100%;
  min-height: 647px;
  min-width: 1700px;
}
#operaPurWareDetail .billBox {
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
}
#operaPurWareDetail .billboxTab {
  margin: 0 20px;
}
#operaPurWareDetail .billboxTab .billtit {
  padding-top: 20px;
}
#operaPurWareDetail .billboxTab .billtit span {
  font-weight: 100;
  font-size: 12px;
}
#operaPurWareDetail .deliveTab {
  position: relative;
  border-collapse: collapse;
  width: 100%;
  text-align: left;
}
#operaPurWareDetail .deliveTab td {
  width: 25%;
  padding-bottom: 15px;
  font-size: 12px;
}
#operaPurWareDetail .deliveTab tr {
  width: 100%;
}
#operaPurWareDetail .deliveTab .rowwith {
  width: 30%;
}
/* 返回 */
#operaPurWareDetail .nav {
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
.opWBtnBack {
  text-decoration: none;
  border-radius: 5px;
  float: right;
  margin-right: 20px;
  cursor: pointer;
  margin-top: 13px;
}
.opWBtnBack:hover {
  /* background-color:#01c8dc; */
  color: #444444;
}
#operaPurWareDetail .btn {
  position: absolute;
  right: -7px;
}
#operaPurWareDetail .inputBox {
  height: 70px;
  width: 300px;
  margin-bottom: 10px;
  resize: none;
  outline: none;
  line-height: 70px;
}
#operaPurWareDetail .fixationCenter {
  width: 360px;
}
#operaPurWareDetail .el-dialog__header {
  padding-top: 20px;
  border-bottom: 1px solid #01c8dc;
}
#operaPurWareDetail .auditBtn {
  position: absolute;
  left: 0;
  top: -1px;
  padding-top: 20px;
  border-bottom: 3px solid #01c8dc;
  width: 100%;
  text-align: left;
  padding-left: 14px;
  box-sizing: border-box;
}
#operaPurWareDetail .el-icon-info {
  color: #ffab5a;
  font-size: 25px;
}
#operaPurWareDetail .store_tit {
  margin-left: 20px;
}
</style>


