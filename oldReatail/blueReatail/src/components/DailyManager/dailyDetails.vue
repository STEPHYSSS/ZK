<template>
  <div class="dailyDetail minWidth1600 minimum">
    <!-- <button class="Couponbtnback coUnit" @click="goback">返回</button> -->
    
    <div class="detail_box">
      <div class="detailBackBtn">
        <img src="@/assets/returnbutton.png" @click="goback" alt="" class="codesty">
      </div>
      <h3>日结明细</h3>

      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick" class="detai_mar">
        <el-tab-pane label="门店营收日报" name="first">
          <ul class="listMarginRig" v-for="(item,index) in ulist" :key="index">
            <li>微信：{{item.wechatPay}}</li>
            <li>支付宝：{{item.alipay}}</li>
            <li>银联：{{item.unionPay}}</li>
            <li>现金：{{item.cash}}</li>
            <li>退款金额：{{item.refund}}</li>
          </ul>
          <div class="daily_tab">
            <el-table :data="tableData" border style="width: 100%;" max-height="600">
              <el-table-column prop="payTime" label="支付时间" align="center">
                <template scope="scope">{{scope.row.payTime | converTime('YYYY-MM-DD HH:mm:ss')}}</template>
              </el-table-column>
              <el-table-column prop="code" label="订单编号" align="center"></el-table-column>
              <el-table-column prop="actualMoney" label="支付金额" align="center"></el-table-column>
              <el-table-column prop="name" label="收银员" align="center"></el-table-column>
              <el-table-column prop="channel" label="支付方式" align="center"></el-table-column>
            </el-table>
            <div style="height:50px">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-sizes="[20,40,60]"
                :page-size="pageSize"
                background
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                class="pagination"
              ></el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="POS机交易异常汇总" name="second">
          <el-table :data="tableData2" border style="width: 100%;" max-height="600">
            <el-table-column prop="posNo" label="POS机号" align="center"></el-table-column>
            <el-table-column prop="smallChange" label="换零" align="center"></el-table-column>
            <el-table-column prop="cashBox" label="开启钱箱" align="center"></el-table-column>
            <el-table-column prop="cancelOrder" label="取消订单" align="center"></el-table-column>
            <el-table-column prop="cancelPay" label="取消支付" align="center"></el-table-column>
            <el-table-column prop="ticketAgain" label="小票重印" align="center"></el-table-column>
            <el-table-column prop="refund" label="退款" align="center"></el-table-column>
          </el-table>
          <div class="konge"></div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "dailyDetail",
  data() {
    return {
      activeName2: "first",
      ulist: [],
      tableData: [],
      tableData2: [],
      pageNum: 1,
      pageSize: 20,
      total: 0
    };
  },
  created() {
    this.getdailyInfoList(this.pageNum, this.pageSize);
    this.getPos();
  },
  methods: {
    handleClick(tab, event) {},
    //  获取列表
    getdailyInfoList(pageNum, pageSize) {
      let that = this;
      let createTime = sessionStorage.getItem("times");
      let token = sessionStorage.getItem("token");
      that
        .$axios({
          url: window.apiStore + "dailysummary/sub/list",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            token: token,
            pageNum: that.pageNum,
            pageSize: that.pageSize,
            createTime
          })
        })
        .then(res => {
          if (res.data.code == "0000") {
            that.ulist = res.data.data.list1;
            that.tableData = res.data.data.list2.list;
            that.total = res.data.data.list2.total;
          } else if (res.data.code == "6666") {
            that.$message({
              showClose: true,
              message: "token异常，请重新登录",
              type: "error"
            });
            const timer = setTimeout(() => {
              clearTimeout(timer);
              that.$router.push({ name: "login" });
            }, 3000);
          } else {
            that.$message.console.error(res.data.msg);
          }
        });
    },
    // pos机交易异常汇总
    getPos() {
      this.$axios({
        url: window.apiStore + "order/pos/exception",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: sessionStorage.getItem("token")
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.tableData2.push(res.data.data);
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
    goback() {
      this.$router.go(-1);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getdailyInfoList(this.pageNum, val);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getdailyInfoList(val, this.pageSize);
    }
  }
};
</script>
<style scoped>
.dailyDetail {
  min-height: 647px;
  min-width: 1200px;
}
.nav {
  display: inline-block;
}
.btnback {
  width: 80px;
  height: 30px;
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
.detail_box {
  /* width: 97%; */
  /* margin: 25px auto; */
  background: #fff;
  padding-top: 15px;
  /* border-radius: 10px; */
}
h3 {
  padding: 0px 0 20px 20px;
}
.detai_mar {
  /* padding-left: 35px;
  padding-right: 30px; */
}
.listMarginRig {
    overflow: hidden;
    margin-left: 20px;
}
ul {
  font: 12px verdana, arial, sans-serif;
}
ul li {
  list-style: none;
  float: left;
  margin-right: 80px;
  font-size: 14px;
  line-height: 30px;
  margin-bottom: 10px;
  margin-left: 5px;
}
.daily_tab {
  clear: both;
}
.pagination {
  float: right;
  margin-top: 20px;
  margin-bottom: 30px;
}
</style>


