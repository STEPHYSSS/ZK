<template>
  <div class="depotsInfo minWidth1600">
    <div class="depbillBox">
      <div class="detailBackBtn">
        <router-link :to="{ path: '/storeOutletList' }">
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
            <div>关联订单：{{list.orderCode}}</div>
          </el-col>
          <!-- <el-col :span="6">
            <div>
              <span v-if="list.checkOpinion == null">审核意见：无</span>
              <span v-else>审核意见：{{list.checkOpinion}}</span>
            </div>
          </el-col> -->
        </el-row>
        <el-row>
          <!-- <el-col :span="6">
            <div>出库品项数：{{list.warehouseCode}}</div>
          </el-col> -->
          <el-col :span="6">
            <div>出库品项数：{{list.item}}</div>
          </el-col>
          <el-col :span="6">
            <div>出库总数：{{list.count}}</div>
          </el-col>
          <el-col :span="6">
            <div>操作人：{{list.operationName}}</div>
          </el-col>
          <!-- <el-col :span="6">
            <div><el-button class="themeColor increase">确认出库</el-button></div>
          </el-col> -->
        </el-row>
        <div class="sureCheck">
          <el-button
            class="themeColor increase"
            @click="centerDialogVisible = true"
            v-if="list.status=='WD'"
          >确认出库</el-button>
        </div>
      </div>
      <div >
        <el-table :data="tableData" style="width: 100%" max-height="600">
          <el-table-column prop="goodsCode" label="货号" align="center"></el-table-column>
          <el-table-column prop="goodsName" label="品名" align="center"></el-table-column>
          <el-table-column prop="barcode" label="国际条码" align="center" width="200"></el-table-column>
          <el-table-column prop="count" label="订单数量" align="center"></el-table-column>
          <el-table-column prop="outCount" label="出库数量" align="center"></el-table-column>
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
    <el-dialog title="提示" :visible.sync="centerDialogVisible" width="360px" center>
              <div slot="title" class="auditBtn">
                <span class="el-icon-info"></span>
                <span class="auditBtn-1">提示</span>
              </div>

              <div class="title">
                <p>确定按照当前数量进行出库？</p>
              </div>

              <span slot="footer" class="dialog-footer">
                <el-button class="theBtn themeColor textMright" @click="SubmitAduit">确定</el-button>
                <el-button class="theBtn resetButton" @click="centerDialogVisible = false">取 消</el-button>
              </span>
            </el-dialog>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "outOfStockDetail",
  data() {
    return {
      tableData: [],
      list: {},
      centerDialogVisible:false
    };
  },
  created() {
    this.getDepDetail();
  },
  methods: {
    getDepDetail() {
      this.$axios.post('/warehouse/out/stock/detail',qs.stringify({
        token:sessionStorage.getItem('token'),
        outCode:sessionStorage.getItem('code')
      })).then(res => {
        // const {code,data:{otherOut,subList}} = res.data
        if (res.data.code == "0000") {
          this.list = res.data.data.outStock;
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
    },
    SubmitAduit(){
      this.$axios.post('/warehouse/out/stock/confirm',qs.stringify({
        token:sessionStorage.getItem('token'),
        outCode:sessionStorage.getItem('code')
      })).then(res=>{
        if(res.data.code==='0000'){
          this.centerDialogVisible=false
          this.$router.push({
            name:'storeOutletList'
          })
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
      })
    }
  },
  filters: {
     statusTip(value) {
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
  margin-left: 20px;
  margin-right: 20px;
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
.sureCheck {
  text-align: right;
  margin-bottom: 15px;
}
.el-icon-info {
  color: #ffab5a;
  font-size: 25px;
}
.auditBtn {
  position: absolute;
  left: 0;
  top: -1px;
  padding-top: 20px;
  border-bottom: 3px solid #dbe0e5;
  width: 100%;
  text-align: left;
  padding-left: 14px;
  box-sizing: border-box;
}
.title {
  text-align: center;
  margin-top: 20px;
}
.auditBtn-1 {
  font-size: 16px;
  margin-left: 5px;
  vertical-align: top;
}
.btn-1 {
  margin-bottom: 15px;
  text-align: right;
}
</style>

