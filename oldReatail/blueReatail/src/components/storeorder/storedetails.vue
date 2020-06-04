<template>
  <div class="storeDetai">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
      <el-breadcrumb-item :to="{ path: '/operatIndex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
    </el-breadcrumb>-->
    <!-- <el-button class="btnAdd">基础信息</el-button>
    <el-button @click="refund" v-if="baseList.payStatus == '3'" class="tuiKInfo">退款信息</el-button>-->
    <!-- <button class="Couponbtnback" @click="goback">返回</button> -->
    <img src="@/assets/Rbutton.png" @click="goback" class="CouponbtnbackC" />
    <div class="detaiInfo">
      <!-- <h3 class="orderTitle">订单查询</h3> -->
      <div v-show="baseInfo">
        <div class="btnBox">
          <el-button class="btnAdd">基础信息</el-button>
          <el-button @click="refund" v-if="baseList.payStatus == '3'" class="tuiKInfo">退款信息</el-button>
        </div>
        <div class="orderTabInfo">
          <div class="konge"></div>
          <div class="rowInfo">
            <el-row style="white-space: nowrap;">
              <el-col :span="6">
                <p>订单编号：{{baseList.code}}</p>
              </el-col>
              <el-col :span="6">
                <p>会员手机号：{{baseList.phone}}</p>
              </el-col>
              <el-col :span="6">
                <p>收银员工号：{{baseList.storePersonnelCode}}</p>
              </el-col>
              <el-col :span="6">
                <p>POS编号：{{baseList.posNo}}</p>
              </el-col>
            </el-row>
            <div class="konge"></div>
            <el-row style="white-space: nowrap;">
              <el-col :span="6">
                <p>订单时间：{{baseList.createTime|converTime('YYYY-MM-DD HH:mm:ss')}}</p>
              </el-col>
              <el-col :span="6" v-if="baseList.payTime !=null">
                <p>交易时间：{{baseList.payTime |converTime('YYYY-MM-DD HH:mm:ss')}}</p>
              </el-col>
              <el-col :span="6">
                <p v-if="baseList.reason !=null">取消理由：{{baseList.reason}}</p>
                <p v-else>取消理由：无</p>
              </el-col>
            </el-row>
          </div>
          <el-table :data="tableData" style="width: 100%;" border>
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
          <el-dialog :visible.sync="dialogTableVisible">
            <el-table :data="tableData2" style="width: 100%;" border>
              <el-table-column prop="code" label="支付流水号" align="center"></el-table-column>
              <el-table-column prop="channel" label="支付渠道" align="center"></el-table-column>
              <el-table-column prop="money" label="支付金额（元）" align="center"></el-table-column>
              <el-table-column label="交易状态" align="center">
                <template scope="scope">{{scope.row.status|payStatus}}</template>
              </el-table-column>
              <el-table-column label="支付时间" align="center">
                <template slot-scope="scope">
                  <span
                    v-if="scope.row.createTime !=null"
                  >{{scope.row.createTime|converTime('YYYY-MM-DD HH:mm:ss')}}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-dialog>
        </div>
      </div>
      <div v-show="showInfo">
        <div class="btnBox">
          <el-button class="tuiKInfo" @click="baseBtn">基础信息</el-button>
          <el-button class="btnAdd">退款信息</el-button>
        </div>
        <div class="orderTabInfo">
          <div class="konge"></div>
          <el-table :data="tableData3" style="width: 100%;">
            <el-table-column prop="code" label="支付流水号" align="center"></el-table-column>
            <el-table-column prop="channel" label="支付渠道" align="center"></el-table-column>
            <el-table-column prop="money" label="支付金额（元）" align="center"></el-table-column>
            <el-table-column label="交易状态" align="center">
              <template scope="scope">{{scope.row.status|payStatus}}</template>
            </el-table-column>
            <el-table-column label="支付时间" align="center">
              <template
                slot-scope="scope"
              >{{scope.row.createTime|converTime('YYYY-MM-DD HH:mm:ss')}}</template>
            </el-table-column>
            <el-table-column label="退款时间" align="center">
              <template
                slot-scope="scope"
              >{{scope.row.refundTime|converTime('YYYY-MM-DD HH:mm:ss')}}</template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "storeDetai",
  data() {
    return {
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
    this.getStoreDetail();
  },
  methods: {
    getStoreDetail() {
      this.$axios({
        url: window.apiUrl + "order/sub/list",
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
      this.showInfo = true;
      this.baseInfo = false;
    },
    baseBtn() {
      this.showInfo = false;
      this.baseInfo = true;
    },
    goback() {
      this.$router.go(-1);
    }
  },
  filters: {
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
.storeDetai {
  background-color: #fff;
  min-height: 647px;
  height: 100%;
  min-width: 1700px;
}
.storeDetai .el-button+.el-button{
  margin-left: 0;
}
.detaiInfo {
  margin: 0 auto;
  min-height: 200px;
  background-color: #fff;
}
.orderTitle {
  margin-bottom: 0;
  padding-bottom: 0;
  height: 50px;
  line-height: 50px;
}
.orderTabInfo,
.orderTitle {
  width: 97%;
  margin: 0 auto;
}
.rowInfo {
  margin-bottom: 20px;
  font-size: 12px;
}
p {
  display: inline-block;
  width: 300px;
}
.TongCenter {
  text-align: center;
}
.TongRight {
  text-align: right;
}

.count {
  text-align: right;
  height: 40px;
  line-height: 40px;
  padding: 20px 0;
}
.count h4 {
  display: inline-block;
}
.count span {
  margin: 0 8px;
}
.btnAdd {
  background-color: #fff;
  color: #444444;
  border-radius: 0;
  border: 1px solid #c2cad8;
  border-top: 2px solid #e6000b;
  /* margin-bottom: 10px; */
}
.tuiKInfo {
  background-color: #fff;
  color: #444444;
  border-radius: 0;
  /* border: 1px solid #c2cad8;
  border-top: 2px solid #c2cad8; */
}
.CouponbtnbackC {
  margin-right: 20px;
  text-decoration: none;
  float: right;
  cursor: pointer;
  margin-top: 13px;
}
</style>


