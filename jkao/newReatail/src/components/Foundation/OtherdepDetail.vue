<template>
  <div class="depotsInfo minWidth1600">
    <div class="depbillBox">
      <div class="detailBackBtn">
        <router-link :to="{ path: '/Otherdepots' }">
          <img src="@/assets/returnbutton.png" alt class="codesty" />
        </router-link>
      </div>
      <div class="depbillBoxTab">
        <h3>出库详情</h3>
        <el-row class="rowSpacing">
          <el-col :span="6">
            <div>创建日期：{{list.createTime|converTime('YYYY-MM-DD')}}</div>
          </el-col>
          <el-col :span="6">
            <div>单据编号：{{list.code}}</div>
          </el-col>
          <el-col :span="6">
            <div>单据状态：{{list.status | statusTip}}</div>
          </el-col>
          <el-col :span="6">
            <div>
              <span v-if="list.checkOpinion == null">审核意见：无</span>
              <span v-else>审核意见：{{list.checkOpinion}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div>仓库名称：{{list.warehouseCode}}</div>
          </el-col>
          <el-col :span="6">
            <div>出库品项数：{{list.count}}</div>
          </el-col>
          <el-col :span="6">
            <div>出库总数：{{list.item}}</div>
          </el-col>
          <el-col :span="6">
            <div>创建人：{{list.createName}}</div>
          </el-col>
        </el-row>
      </div>
      <div class="depbillBoxTab">
        <el-table :data="tableData" style="width: 100%" max-height="600">
          <el-table-column prop="code" label="货号" align="center"></el-table-column>
          <el-table-column prop="name" label="品名" align="center"></el-table-column>
          <el-table-column prop="barcode" label="国际条码" align="center" width="200"></el-table-column>
          <el-table-column prop="count" label="出库数量" align="center"></el-table-column>
          <el-table-column prop="spec" label="规格" align="center"></el-table-column>
          <el-table-column prop="unit" label="单位" align="center"></el-table-column>
          <el-table-column label="保质期" align="center">
            <template scope="scope">{{scope.row.period}}{{scope.row.periodUnit}}</template>
          </el-table-column>
          <el-table-column prop="temperature" label="温层" align="center"></el-table-column>
          <el-table-column prop="locationCode" label="出库货位" align="center"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "depotsInfo",
  data() {
    return {
      tableData: [],
      list: {}
    };
  },
  created() {
    this.getDepDetail();
  },
  methods: {
    getDepDetail() {
      this.$axios({
        url: window.apiWare + "other/out/detail",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          otherOutCode: sessionStorage.getItem("depotCode"),
          token: sessionStorage.getItem("token")
        })
      }).then(res => {
        // const {code,data:{otherOut,subList}} = res.data
        if (res.data.code == "0000") {
          this.list = res.data.data.otherOut;
          this.tableData = res.data.data.subList;
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
      if (value == "W") {
        return "待审核";
      } else if (value == "S") {
        return "审核通过";
      } else if (value == "F") {
        return "审核不通过";
      }
    }
  }
};
</script>
<style scoped>
.depotsInfo {
  /* background-color: #f1f6fa; */
  min-height: 647px;
  min-width: 1200px;
}
.depbillBox {
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
  padding-top: 15px;
}
.depbillBoxTab {
  margin-left: 30px;
  margin-right: 30px;
  padding-bottom: 30px;
}
.depbillBoxTab .depbilltit {
  padding-top: 20px;
}
.depbillBoxTab .depbilltit span {
  font-weight: 100;
  font-size: 16px;
}
.depTab {
  border-collapse: collapse;
  width: 100%;
  text-align: left;
}
.depTab td {
  width: 19%;
  padding-bottom: 15px;
  font-size: 16px;
}
.depTab tr {
  width: 100%;
}
.depTab .rowwith {
  width: 30%;
}
/* 返回 */
.nav {
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
h3 {
  padding: 0px 0 20px 0px;
}
</style>

