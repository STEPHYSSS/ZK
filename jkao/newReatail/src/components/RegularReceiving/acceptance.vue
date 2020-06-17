<template>
  <div class="acceptance minWidth1600 minimum">
    <!-- 配送完成(acceptance已验收) -->
    <div class="waitBox">
      <div class="detailBackBtn">
        <router-link :to="{ path: '/receiving' }">
          <img src="@/assets/returnbutton.png" alt class="codesty" />
        </router-link>
      </div>
      <div class="wait_Box">
        <h3 class="title">
          配送完成
          <span>（已验收）</span>
        </h3>
        <div class="waitList">
          <div class="waitList_l">
            <p>
              配送单编号：
              <span>{{check1.code}}</span>
            </p>
            <p>
              下单日期
              <span>{{check1.orderingTime | converTime('YYYY-MM-DD')}}</span>
            </p>
            <p>
              配送总金额（元）：
              <span>{{check1.amount}}</span>
            </p>
          </div>
          <div class="waitList_c waitList_2">
            <p>
              配送方：
              <span>{{check1.supplierName}}</span>
            </p>
            <p>
              配送状态：
              <span>{{check1.deliveryStatus | waitStateTip}}</span>
            </p>
          </div>
          <div class="waitList_c">
            <p>
              配送方联系电话：
              <span>{{check1.supplierContactsPhone}}</span>
            </p>
            <p>
              配送品项总数：
              <span>{{check1.item}}</span>
            </p>
          </div>
          <div class="waitList_r">
            <p>
              关联叫货单编号：
              <span>{{check1.orderingCode}}</span>
            </p>
            <p>
              配送总数量：
              <span>{{check1.count}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="waitBox2">
      <div class="wait_Box">
        <el-table :data="check2" style="width: 100%" max-height="600">
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
          <el-table-column prop="actualReceipt" label="实际收货数" align="center">
            <!-- <template scope="scope">
              <span>{{scope.row.actualDelivery-scope.row.shortage-scope.row.shortage}}</span>
            </template> -->
          </el-table-column>
          <el-table-column prop="shortage" label="缺货数" align="center"></el-table-column>
          <el-table-column prop="rejection" label="拒收数" align="center"></el-table-column>
          <el-table-column prop="rejectionReason" label="拒收原因" align="center"></el-table-column>
          <el-table-column prop="actualAmount" label="实际收货总金额" align="center"></el-table-column>
          <el-table-column prop="shortageAmount" label="缺货总金额" align="center"></el-table-column>
          <el-table-column prop="rejectionAmount" label="拒收总金额" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template scope="scope" fixed="right">
              <span v-if="scope.row.shortage > '0'" @click="chakan" class="codesty">查看修正单</span>
              <span
                v-if="scope.row.shortage && scope.row.rejection !='0'"
                @click="chakan"
                class="codesty"
              >查看修正单</span>
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
  name: "acceptance",
  data() {
    return {
      token: sessionStorage.getItem("token"),
      code: sessionStorage.getItem("deliveryCode"),
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
      _this
        .$axios({
          url: window.apiStore + "delivery/detail",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            token: sessionStorage.getItem("token"),
            deliveryCode: sessionStorage.getItem("waitpeiCode")
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
    },
    // 查看修正单
    chakan() {
      this.$router.push({ name: "amendment" });
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
.waitCheck {
  background-color: #f1f6fa;
  min-height: 647px;
  min-width: 1200px;
}
.waitBox{
  padding-top: 20px;
}
.waitBox2 {
  padding-top: 15px;
}
.wait_Box {
  margin: 0 20px;
}
.waitTab {
  border-collapse: collapse;
}
.wait_Box .title {
  /* padding-top: 20px;
  padding-top: 20px; */
}
.wait_Box .title span {
  font-weight: 100;
  font-size: 16px;
}
.tip {
  margin: 0 0 20px 0px;
  color: #c2c2c2;
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

.waitBox2 input {
  width: 50px;
}
/* 返回 */
.nav {
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
.waitList {
  display: flex;
}
.waitList_l {
  width: 30%;
}
.waitList_c {
  width: 22%;
}
.waitList_r {
  width: 30%;
}
.waitList p {
  margin-bottom: 10px;
}
</style>

