<template>
  <div class="billdetailInfo">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
      <el-breadcrumb-item :to="{ path: '/operatIndex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>门店单据管理</el-breadcrumb-item>
      <el-breadcrumb-item>强配单管理</el-breadcrumb-item>
      <router-link :to="{ path: '/strongDelivery' }" class="btnback">返回</router-link>
    </el-breadcrumb>
    <!-- <router-link :to="{ path: '/strongDelivery' }" class="btnback">返回</router-link> -->

    <div class="billBox">
      <div class="billboxTab">
        <h3 class="billtit">强配单管理</h3>
        <table class="deliveTab" :data="list">
          <tr>
            <td class="rowWith">创建日期：{{list.createTime|converTime('YYYY-MM-DD')}}</td>
            <td class="rowwith1">强配单编号：{{list.code}}</td>
            <!-- <td class="rowWith">门店：{{item.name}}</td> -->
            <td class="rowwith">状态：{{list.status |statusTip }}</td>
            <!-- (对应的是后台的123代码 1待审核2 审核通过 3 审核不通过) -->
            <td class="rowwith">实际发货总量:{{list.actualDelivery}}</td>
            <td class="rowwith">实际收货总量：{{list.actualReceipt}}</td>
          </tr>
        </table>
      </div>
      <div class="billboxTab">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="storeName" label="门店" align="center"></el-table-column>
          <el-table-column prop="goodsCode" label="货号" align="center"></el-table-column>
          <el-table-column prop="goodsName" label="品名" align="center"></el-table-column>
          <el-table-column prop="count" label="订购总数" align="center"></el-table-column>
          <!-- <el-table-column label="保质期" align="center">
            <template scope="scope">{{scope.row.period}}{{scope.row.periodUnit}}</template>
          </el-table-column>-->
          <el-table-column prop="amount" label="订购总金额" align="center"></el-table-column>
          <el-table-column prop="unit" label="单位" align="center"></el-table-column>
          <el-table-column prop="salesPrice" label="单品售价" align="center"></el-table-column>
          <el-table-column prop="temperature" label="温层" align="center"></el-table-column>
          <el-table-column prop="supplierName" label="供应商" align="center"></el-table-column>
          <el-table-column prop="actualDelivery" label="实际发货数" align="center"></el-table-column>
          <el-table-column prop="actualReceipt" label="实际收货" align="center"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "billdetailInfo",
  data() {
    return {
      centerDialogVisible: false,
      tableData: [],
      list: [],
      ruleForm: {
        token: sessionStorage.getItem("token"),
        matchCode: sessionStorage.getItem("code")
      },
      flag: true
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    //获取详情
    getlist() {
      this.$axios
        .post("/sys/match/detail", qs.stringify(this.ruleForm))
        .then(res => {
          if (res.data.code === "0000") {
            this.list = res.data.data.matchSheet;
            this.tableData = res.data.data.deliveryList;
          } else if (res.data.code === "6666") {
            this.$message({
              showClose: true,
              message: "token异常，请重新登录",
              type: "error"
            });
          }else return this.$message.error(res.data.msg)
        });
    }
  },
  filters: {
    statusTip(value) {
      if (value == "1") {
        return "待提交";
      } else if (value == "2") {
        return "备货中";
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
.billdetailInfo {
  background-color: #f1f6fa;
  min-height: 647px;
  min-width: 1700px;
}
.billBox {
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
}
.billboxTab {
  margin-left: 30px;
  margin-right: 30px;
  padding-bottom: 30px;
  margin-top: 10px;
}
.billboxTab .billtit {
  padding-top: 20px;
}
.billboxTab .billtit span {
  font-weight: 100;
  font-size: 16px;
}
.deliveTab {
  position: relative;
  border-collapse: collapse;
  width: 100%;
  text-align: left;
}
.deliveTab td {
  width: 15%;
  padding-bottom: 15px;
  font-size: 16px;
}
.deliveTab tr {
  width: 100%;
}
.deliveTab .rowwith1 {
  width: 25%;
}
/* 返回 */
.nav {
  height: 50px;
  line-height: 50px;
  display: block;
}
.btnback {
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
  margin-top: 15px;
}
.btnback:hover {
  background-color: #01c8dc;
  color: #fff;
}
.btn {
  position: absolute;
  right: 90px;
}
.inputBox {
  height: 70px;
  width: 300px;
  margin-bottom: 10px;
  resize: none;
  outline: none;
  line-height: 70px;
}
.title {
  text-align: center;
  margin-top: 20px;
}
.el-dialog__header {
  padding-top: 20px;
  border-bottom: 1px solid #01c8dc;
}
.auditBtn {
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
.el-icon-info {
  color: #ffab5a;
  font-size: 25px;
}
.auditBtn-1 {
  font-size: 16px;
  margin-left: 5px;
  vertical-align: top;
}
</style>


