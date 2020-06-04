<template>
  <div class="mallOutboundInfo" id="mallOutboundInfo">
    <h3 class="store_tit">商城出库详情</h3>
    <router-link :to="{ path: '/mallOutbound' }" class="opWBtnBack">
      <img src="@/assets/Rbutton.png" />
    </router-link>
    <div class="billBox">
      <div class="billboxTab">
        <el-row>
          <el-col :span="6">
            <span>创建日期：</span>{{outStock.createTime}}
          </el-col>
          <el-col :span="6">
            <span>单据编号：</span>
            {{outStock.code}}
          </el-col>
          <el-col :span="6">
            <span>单据状态：</span>
            {{outStock.status | stockStatus}}
          </el-col>
          <el-col :span="6">
            <span>关联订单：</span>
            {{outStock.orderCode}}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <span>出库品项数</span>
            {{outStock.item}}
          </el-col>
          <el-col :span="6">
            <span>出库总数：</span>
            {{outStock.count}}
          </el-col>
          <el-col :span="6" v-if="outStock.operationName !=null">
            <span>最后操作人：</span>
            {{outStock.operationName}}
          </el-col>
          <el-col :span="6" v-else>
            <span>最后操作人：无</span>
          </el-col>
        </el-row>
      </div>
      <div class="konge"></div>
      <div class="billboxTab">
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column prop="goodsCode" label="货号" align="center"></el-table-column>
          <el-table-column prop="goodsName" label="品名" align="center"></el-table-column>
          <el-table-column prop="barcode" label="国际条码" align="center"></el-table-column>
          <el-table-column prop="count" label="订单数量" align="center"></el-table-column>
          <el-table-column prop="outCount" label="出库数量" align="center"></el-table-column>
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
  name: "mallOutboundInfo",
  data() {
    return {
      tableData: [],
      outStock: {},
      outCode: this.$route.query.code
    };
  },
  created() {
    this.getPurInfo();
  },
  methods: {
    //获取详情
    getPurInfo() {
      this.$axios({
        url: "mall/out/stock/detail",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: sessionStorage.getItem("token"),
          outCode: this.outCode
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.tableData = res.data.data.subList;
          this.outStock = res.data.data.outStock;
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
    stockStatus(value) {
      if (value == "WD") {
        return "待发货";
      } else if (value == "AD") {
        return "已发货";
      } else if (value == "AR") {
        return "已验收";
      }
    }
  }
};
</script>
<style scoped>
#mallOutboundInfo {
  background-color: #ffffff;
  height: 100%;
  min-height: 647px;
  min-width: 1700px;
}
#mallOutboundInfo .billBox {
  font-size: 12px;
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
}
#mallOutboundInfo .billboxTab {
  margin: 5px 20px;
}
.billboxTab p {
  display: inline-block;
}

/* 返回 */
.opWBtnBack {
  text-decoration: none;
  float: right;
  margin-right: 20px;
  cursor: pointer;
  margin-top: 13px;
}
#mallOutboundInfo .btn {
  position: absolute;
  right: -7px;
}
#mallOutboundInfo .inputBox {
  height: 70px;
  width: 300px;
  margin-bottom: 10px;
  resize: none;
  outline: none;
  line-height: 70px;
}
#mallOutboundInfo .fixationCenter {
  width: 360px;
}
#mallOutboundInfo .el-dialog__header {
  padding-top: 20px;
  border-bottom: 1px solid #ccc;
}
#mallOutboundInfo .auditBtn {
  position: absolute;
  left: 0;
  top: -1px;
  padding-top: 20px;
  border-bottom: 3px solid #ccc;
  width: 100%;
  text-align: left;
  padding-left: 14px;
  box-sizing: border-box;
}
#mallOutboundInfo .el-icon-info {
  color: #ffab5a;
  font-size: 25px;
}
#mallOutboundInfo .store_tit {
  margin-left: 20px;
}
</style>


