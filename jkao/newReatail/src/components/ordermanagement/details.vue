<template>
  <div class="orderDetai minimum">
    <!-- <el-button class="theBtn resetButton btn58" @click="goback">返回</el-button> -->
    <div class="detaiInfo">
      <div class="detailBackBtn aa">
        <img src="@/assets/returnbutton.png" alt class="codesty" @click="goback" />
      </div>
      <h3 class="orderTitle">订单查询</h3>
      <div class="orderTabInfo" v-show="baseInfo">
        <div class="btnBox">
          <el-button @click="refund" :class="{a:basicInformation}">基础信息</el-button>
          <el-button @click="refund" v-if="baseList.payStatus == '3'" :class="{a:showStyle}">退款信息</el-button>
        </div>
        <div v-if="basicInformation">
          <el-row class="rowSpacing">
            <el-col :span="6">
              <div></div>
            </el-col>
            <el-col :span="6">
              <div>订单编号：{{baseList.code}}</div>
            </el-col>
            <el-col :span="6">
              <div>会员手机号：{{baseList.phone}}</div>
            </el-col>
            <el-col :span="6">
              <div>收银员工号：{{baseList.storePersonnelCode}}</div>
            </el-col>
            <el-col :span="6">
              <div>POS编号：{{baseList.posNo}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div>订单时间：{{baseList.createTime|converTime('YYYY-MM-DD HH:mm:ss')}}</div>
            </el-col>
            <el-col :span="6">
              <div
                v-if="baseList.payTime !=null"
              >交易时间：{{baseList.payTime |converTime('YYYY-MM-DD HH:mm:ss')}}</div>
            </el-col>
            <el-col :span="6">
              <div v-if="baseList.reason !=null">取消理由：{{baseList.reason}}</div>
            </el-col>
            <el-col :span="6">
              <div></div>
            </el-col>
          </el-row>
          <div class="rowInfo">
            <!-- <p class="rowL">订单编号：{{baseList.code}}</p> -->
            <!-- <p class="rowL2">会员手机号：{{baseList.phone}}</p> -->
            <!-- <p class="rowL">收银员工号：{{baseList.storePersonnelCode}}</p> -->
            <!-- <p class="rowL3">POS编号：{{baseList.posNo}}</p> -->
            <br />
            <!-- <p class="rowL">订单时间：{{baseList.createTime|converTime('YYYY-MM-DD HH:mm:ss')}}</p> -->
            <!-- <p class="rowL2" v-if="baseList.payTime !=null">交易时间：<span>{{baseList.payTime |converTime('YYYY-MM-DD HH:mm:ss')}}</span></p> -->
            <!-- <p class="rowL2" v-if="baseList.reason !=null">取消理由：{{baseList.reason}}</p> -->
          </div>
          <el-table :data="tableData" style="width: 100%;">
            <el-table-column prop="code" label="货号" align="center"></el-table-column>
            <el-table-column prop="name" label="品名" align="center"></el-table-column>
            <el-table-column prop="spec" label="规格" align="center"></el-table-column>
            <el-table-column prop="unit" label="单位" align="center"></el-table-column>
            <el-table-column prop="number" label="数量" align="center"></el-table-column>
            <el-table-column prop="price" label="门店售价（元）" align="center"></el-table-column>
            <el-table-column prop="discountPrice" label="折后金额" align="center"></el-table-column>
            <el-table-column prop="remark" label="备注" align="center"></el-table-column>
          </el-table>
          <div class="count">
            <h4>合计：</h4>
            <span>应付金额：{{baseList.payableMoney}}</span>
            <span @click="meet" class="codesty">实付金额：{{baseList.actualMoney}}</span>
            <span>优惠金额：{{baseList.discountMoney || 0}}</span>
            <span>数量：{{sum}}</span>
          </div>
        </div>

        <el-dialog :visible.sync="dialogTableVisible">
          <el-table :data="tableData2" style="width: 100%;">
            <el-table-column prop="code" label="支付流水号" align="center"></el-table-column>
            <el-table-column prop="channel" label="支付渠道" align="center"></el-table-column>
            <el-table-column prop="money" label="支付金额（元）" align="center"></el-table-column>
            <el-table-column label="交易状态" align="center">
              <template scope="scope">{{scope.row.status|payStatus}}</template>
            </el-table-column>
            <el-table-column label="支付时间" align="center">
              <template scope="scope">
                <span
                  v-if="scope.row.createTime !=null"
                >{{scope.row.createTime|converTime('YYYY-MM-DD HH:mm:ss')}}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-dialog>
      </div>
      <div class="orderTabInfo" v-show="showInfo">
        <!-- <div class="btnBox">
          <el-button @click="baseBtn">基础信息</el-button>
          <el-button>退款信息</el-button>
        </div> -->
        <el-table :data="tableData3" style="width: 100%;">
          <el-table-column prop="code" label="支付流水号" align="center"></el-table-column>
          <el-table-column prop="channel" label="支付渠道" align="center"></el-table-column>
          <el-table-column prop="money" label="支付金额（元）" align="center"></el-table-column>
          <el-table-column label="交易状态" align="center">
            <template scope="scope">{{scope.row.status|payStatus}}</template>
          </el-table-column>
          <el-table-column label="支付时间" align="center">
            <template scope="scope">
              <span
                v-if="scope.row.createTime !=null"
              >{{scope.row.createTime|converTime('YYYY-MM-DD HH:mm:ss')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="退款时间" align="center">
            <template scope="scope">
              <span
                v-if="scope.row.refundTime !=null"
              >{{scope.row.refundTime|converTime('YYYY-MM-DD HH:mm:ss')}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "orderDetai",
  data() {
    return {
      showStyle: false,
      basicInformation: true,
      tableData: [],
      tableData2: [], //完成单
      tableData3: [], //退款单
      baseList: {},
      count: [],
      baseInfo: true,
      showInfo: false,
      dialogTableVisible: false,
      sum: 0
    };
  },
  created() {
    this.getRowDetail();
  },
  methods: {
    getRowDetail() {
      this.$axios({
        url: window.apiStore + "order/sub/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: sessionStorage.getItem("token"),
          orderCode: sessionStorage.getItem("Ordercode")
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.tableData = res.data.data.list1;
          this.tableData2 = res.data.data.list2;
          this.tableData3 = res.data.data.list3;
          this.baseList = res.data.data.orderInfo;
          this.tableData.forEach((item, index) => {
            this.count = item;
            this.sum += item.number;
          });
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
    meet() {
      this.dialogTableVisible = true;
    },
    refund() {
      // this.showInfo = true;
      // this.showStyle = true;
      // this.basicInformation = false;
      this.showInfo=!this.showInfo
      this.showStyle=!this.showStyle
      this.basicInformation=!this.basicInformation

    },
    baseBtn() {
      // this.showInfo = false;
      // this.baseInfo = true;
      this.showStyle = false;
      this.basicInformation = true;
      this.showInfo = false;
    },
    goback() {
      this.$router.go(-1);
    }
  },
  filters: {
    paySta(value) {
      if (value == "1") {
        return "待确认";
      } else if (value == "2") {
        return "已确认";
      }
    },
    payStatus(value) {
      if (value == "1") {
        return "未付款";
      } else if (value == "2") {
        return "已付款";
      } else if (value == "3") {
        return "已退款";
      }
    }
  }
};
</script>
<style scoped>
.orderDetai {
  /* background-color: #f1f6fa; */
  min-height: 647px;
  min-width: 1600px;
  overflow: auto;
  position: relative;
}
.detaiInfo {
  background-color: #fff;
  padding: 0 20px;
}
.orderTitle {
  margin-bottom: 0;
  padding-bottom: 0;
  height: 30px;
  margin-top: 20px;
}
.rowInfo {
  margin-top: 20px;
}
.rowInfo p {
  display: inline-block;
  margin-bottom: 10px;
}
.rowL {
  width: 24%;
}
.rowL2 {
  width: 22%;
}
.rowL3 {
  width: 24%;
}
.count {
  text-align: right;
  height: 40px;
  line-height: 40px;
}
.count h4 {
  display: inline-block;
}
.count span {
  margin: 0 10px;
}
.el-button:focus,
.el-button:hover {
  background-color: rgba(229, 1, 9, 0.7);
  color: #fff;
  border-color: #e6000b;
}
.btn58 {
  position: absolute;
  right: 20px;
  top: 20px;
}
.btnBox {
  padding: 5px 0;
}
.a {
  background-color: #e6000b;
  color: #fff;
  border-color: #e6000b;
}
.aa{
  right: 0;
}
</style>


