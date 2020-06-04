<template>
  <div class="delivered minWidth1600 minimum">
    <div class="deliveBox">
      <div class="detailBackBtn">
        <router-link :to="{ path: '/receiving' }">
          <img src="@/assets/returnbutton.png" alt class="codesty" />
        </router-link>
      </div>
      <div class="delive_Box">
        <h3 class="h3mt">待配送</h3>
        <div class="waitList">
          <div class="waitList_l">
            <p>
              配送单编号：
              <span>{{check1.code}}</span>
            </p>
            <p>
              关联叫货单编号：
              <span>{{check1.orderingCode}}</span>
            </p>
            <p>
              配送品项总数：
              <span>{{check1.item}}</span>
            </p>
          </div>
          <div class="waitList_c">
            <p>
              配送方：
              <span>{{check1.supplierName}}</span>
            </p>
            <p>
              配送方联系电话：
              <span>{{check1.supplierContactsPhone}}</span>
            </p>
            <p>
              配送总数量：
              <span>{{check1.count}}</span>
            </p>
          </div>
          <div class="waitList_c">
            <p>
              预计到货日期：
              <span>{{check1.estimatedArrivalTime | converTime('YYYY-MM-DD')}}</span>
            </p>
            <p>
              下单日：
              <span>{{check1.orderingTime | converTime('YYYY-MM-DD')}}</span>
            </p>
            <p>
              配送总金额（元）：
              <span>{{check1.amount}}</span>
            </p>
          </div>
          <div class="waitList_r">
            <p>
              温层：
              <span>常温</span>
            </p>
            <p>
              配送状态：
              <span>{{check1.deliveryStatus | waitStateTip}}</span>
            </p>
            <p v-if="check1.receivingTime !=null">
              验收日：
              <span>{{check1.receivingTime | converTime('YYYY-MM-DD')}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="deliveBox2">
      <div class="delive_Box">
        <el-table :data="check2" style="width: 100%" border max-height="600">
          <el-table-column prop="id" label="序号" align="center"></el-table-column>
          <el-table-column prop="goodsCode" label="货号" align="center"></el-table-column>
          <el-table-column prop="goodsName" label="品名" align="center"></el-table-column>
          <el-table-column prop="spec" label="规格" align="center"></el-table-column>
          <el-table-column prop="unit" label="单位" align="center"></el-table-column>
          <el-table-column prop="temperature" label="温层" align="center"></el-table-column>
          <el-table-column prop="period" label="保质期" align="center"></el-table-column>
          <el-table-column prop="salesPrice" label="单品售价" align="center"></el-table-column>
          <el-table-column prop="amount" label="订购总金额" align="center"></el-table-column>
          <el-table-column prop="count" label="订购总数" align="center"></el-table-column>
          <el-table-column prop="actualDelivery" label="实际发货数" align="center"></el-table-column>
          <el-table-column label="实际收货数" align="center">
            <template scope="scope">
              <span>{{scope.row.actualDelivery-scope.row.shortage-scope.row.shortage}}</span>
            </template>
          </el-table-column>
          <el-table-column label="缺货数" align="center"></el-table-column>
          <el-table-column label="拒收数" align="center"></el-table-column>
          <el-table-column label="拒收原因" align="center"></el-table-column>
          <el-table-column label="实际收货总金额" align="center"></el-table-column>
          <el-table-column label="缺货总金额" align="center"></el-table-column>
          <el-table-column label="拒收总金额" align="center"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "delivered",
  data() {
    return {
      token: sessionStorage.getItem('token'),
      code: sessionStorage.getItem('waitpeiCode'),
      check1: {},
      check2: [],
      currentPage: 1
    };
  },
  created() {
    this.waitcheck();
  },
  methods: {
    waitcheck() {
      let _this = this;
      let token = _this.token;
      let deliveryCode = _this.code;
      _this
        .$axios({
          url: window.apiStore + "delivery/detail",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            token: token,
            deliveryCode: deliveryCode
          })
        })
        .then(res => {
          const {
            code,
            data: { deliverySheetVo, subList }
          } = res.data;
          if (code == "0000") {
            _this.check1 = deliverySheetVo;
            _this.check2 = subList;
          } else if (res.data.code == "6666") {
            _this.$message({
              showClose: true,
              message: "token异常，请重新登录",
              type: "error"
            });
            const timer = setTimeout(() => {
              clearTimeout(timer);
              _this.$router.push({ name: "login" });
            }, 3000);
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log("数据异常", err);
        });
    }
  },
  filters: {
    waitStateTip(value) {
      if (value == "1") {
        return "待配送";
      } else if (value == "2") {
        return "配送中";
      } else if (value == "3") {
        return "已完成";
      }
    }
  }
};
</script>
<style scoped>
.delivered {
  min-height: 647px;
  min-width: 1200px;
}
.deliveBox,
.deliveBox2 {
  background: #fff;
}
.delive_Box {
  margin: 0 20px;
}
.delive_Box .title {
  padding-top: 20px;
  margin-bottom: 0;
  padding-bottom: 0;
}
.delive_Box .title span {
  font-weight: 100;
  font-size: 16px;
}
.tip {
  margin: 0 0 20px 0px;
  color: #c2c2c2;
}
.deliveTab {
  border-collapse: collapse;
}
.check th {
  width: 9%;
  background: #dcf9fc;
  color: #444444;
  font-family: "微软雅黑";
}
.check td {
  text-align: center;
  width: 12%;
  height: 50px;
  padding: 0 10px;
}
.checkInfo tr {
  height: 40px;
}
.checkInfo th {
  background-color: #01c8dc;
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
.noInfo {
  background: #cccccc;
}
.waitList {
  display: flex;
}
.waitList_l {
  width: 30%;
}
.waitList_c {
  width: 25%;
}
.waitList_r {
  width: 20%;
}
.waitList_r p,
.waitList_c p {
  padding-left: 14%;
}
.waitList p {
  margin-bottom: 10px;
}
</style>

