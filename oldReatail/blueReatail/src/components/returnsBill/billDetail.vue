<template>
  <div class="billdetailInfo minWidth1600 minimum">
    <div class="billBox">
      <div class="detailBackBtn">
        <router-link :to="{ path: '/billManager' }">
          <img src="@/assets/returnbutton.png" alt />
        </router-link>
      </div>

      <div class="billboxTab" v-for="(item,index) in list" :key="index">
        <h3 >退货单详情</h3>
        <el-row >
          <el-col :span="6">
            <div>创建日期：{{item.createTime|converTime('YYYY-MM-DD')}}</div>
          </el-col>
          <el-col :span="6">
            <div>退货单编号：{{item.code}}</div>
          </el-col>
          <el-col :span="6">
            <div>退货状态：{{item.status | statusTip}}</div>
          </el-col>
          <el-col :span="6">
            <div>审核意见：{{item.checkOpinion}}</div>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="6">
            <div>退货品项数：{{item.item}}</div>
          </el-col>
          <el-col :span="6">
            <div>退货总数：{{item.count}}</div>
          </el-col>
          <el-col :span="6">
            <div>退货总金额：{{item.amount}}</div>
          </el-col>
          <el-col :span="6">
            <div></div>
          </el-col>
        </el-row>

        <table class="deliveTab" v-for="(item,index) in list" :key="index">
          <!-- <tr>
            <td class="rowWith">创建日期：{{item.createTime|converTime('YYYY-MM-DD')}}</td>
            <td class="rowwith">退货单编号：{{item.code}}</td>
            <td class="rowWith">退货状态：{{item.status | statusTip}}</td>
            <td class="rowwith">审核意见：{{item.checkOpinion}}</td>
          </tr>-->
          <!-- <tr>
            <td class="rowWith">退货品项数：{{item.item}}</td>
            <td class="rowwith">退货总数：{{item.count}}</td>
            <td class="rowWith">退货总金额：{{item.amount}}</td>
          </tr>-->
        </table>
      </div>
      <div class="billboxTab">
        <el-table :data="tableData" style="width: 100%" border max-height="600">
          <el-table-column prop="goodsCode" label="货号" align="center"></el-table-column>
          <el-table-column prop="name" label="品名" align="center"></el-table-column>
          <el-table-column prop="salePrice" label="单品售价" align="center"></el-table-column>
          <el-table-column prop="count" label="退货数量" align="center"></el-table-column>
          <el-table-column prop="amount" label="退货总金额" align="center"></el-table-column>
          <el-table-column prop="spec" label="规格" align="center"></el-table-column>
          <el-table-column prop="unit" label="单位" align="center"></el-table-column>
          <el-table-column label="保质期" align="center">
            <template scope="scope">{{scope.row.period}}{{scope.row.periodUnit}}</template>
          </el-table-column>
          <el-table-column prop="temperature" label="温层" align="center"></el-table-column>
          <el-table-column prop="reason" label="退货原因" align="center"></el-table-column>
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
      tableData: [],
      list: []
    };
  },
  created() {
    this.getBillDetail();
  },
  methods: {
    getBillDetail() {
      this.$axios({
        url: window.apiStore + "return/detail",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          code: sessionStorage.getItem("code"),
          token: sessionStorage.getItem("token")
        })
      }).then(res => {
        const {
          code,
          data: { list, subList }
        } = res.data;
        if (code == "0000") {
          this.list = list;
          this.tableData = subList;
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
      if (value == "1") {
        return "待审核";
      } else if (value == "2") {
        return "审核通过";
      } else if (value == "3") {
        return "审核不通过";
      }
    }
  }
};
</script>
<style scoped>
.billdetailInfo {
  /* background-color: #f1f6fa; */
  min-height: 647px;
  min-width: 1200px;
}
.billBox {
  background: #fff;
  margin-top: 20px;
}
.billboxTab {
  margin-left: 20px;
  margin-right: 21px;
  padding-bottom: 20px;
}
.billboxTab .billtit {
  padding-top: 20px;
}
.billboxTab .billtit span {
  font-weight: 100;
  font-size: 16px;
}
.deliveTab {
  border-collapse: collapse;
  width: 100%;
  text-align: left;
}
.deliveTab td {
  width: 19%;
  padding-bottom: 15px;
  font-size: 16px;
}
.deliveTab tr {
  width: 100%;
}
.deliveTab .rowwith {
  width: 30%;
}
/* 返回 */
.nav {
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
.btnback {
  text-decoration: none;
  width: 80px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  background-color: #fff;
  color: #01c8dc;
  border: 1px solid #01c8dc;
  border-radius: 5px;
  float: right;
  margin-right: 2%;
}
.btnback:hover {
  background-color: #01c8dc;
  color: #fff;
}
</style>

