<template>
  <div class="orderQuery minimum">
    <div class="orderBox1">
      <div class="orderInfo">
        <h3 class="orderTit">订单查询</h3>
        <el-row class="rowSpacing">
          <el-col :span="6">
            <div>
              <span class="textTitle70px">订单状态：</span>
                <el-select type="text" v-model="orderForm.orderStatus" class="TongYiInput">
                  <el-option
                    v-for="(item,index) in orderSta"
                    :key="index"
                    
                    :label="item.label"
                    :value="item.value"
                    placeholder="请选择"
                  ></el-option>
                </el-select>
            </div>
          </el-col>
          <el-col :span="6" class="textAlignCenter">
            <div>
              <span class="textTitle70px">交易状态：</span>
                <el-select type="text" v-model="orderForm.payStatus" class="TongYiInput">
                  <el-option
                    v-for="(item,index) in paySta"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    placeholder="请选择"
                  ></el-option>
                </el-select>
            </div>
          </el-col>
          <el-col :span="6" class="textAlignCenter">
            <div>
              <span class="textTitle70px">订单日期：</span>
                <el-date-picker
                  v-model="callTime"
                  @change="changeJiao"
                  class="input1"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
            </div>
          </el-col>
          <el-col :span="6" class="textAlignRight">
            <div>
              <span class="textTitle70px">会员手机：</span>
                <el-input class="input1" type="text" v-model="orderForm.phone" placeholder="请输入"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div>
              <span class="textTitle70px">订单编号：</span>
                <el-input class="input1" type="text" v-model="orderForm.code" placeholder="请输入"></el-input>
            </div>
          </el-col>
          <el-col :span="6" class="textAlignCenter">
            <div>
              <span class="textTitle70px">交易日期：</span>
                <el-date-picker
                  v-model="tradingTime"
                  @change="changePayTime"
                  type="daterange"
                  class="input1"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
            </div>
          </el-col>
          <el-col :span="6">
            <div></div>
          </el-col>
          <el-col :span="6" style="margin-left:25%">
            <div class="textAlignRight">
              <el-button class="theBtn queryButton" @click="orderChaxun">查询</el-button>
              <el-button @click="reset" class="theBtn resetButton">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="orderBox2">
      <!-- <div class="orderTabList"> -->
        <el-table :data="tableData" style="width: 100%;" max-height="600" border>
          <el-table-column label="订单编号" align="center" width="300">
            <template scope="scope">
              <span class="codesty" @click="detaiRow(scope.row.code)">{{scope.row.code}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="会员手机号" align="center"></el-table-column>
          <el-table-column prop="posNo" label="POS编号" align="center"></el-table-column>
          <el-table-column prop="payableMoney" label="应付金额" align="center"></el-table-column>
          <el-table-column prop="actualMoney" label="实付金额" align="center"></el-table-column>
          <el-table-column prop="discountMoney" label="优惠金额" align="center"></el-table-column>
          <el-table-column label="订单状态" align="center">
            <template scope="scope">{{scope.row.orderStatus | orderStat}}</template>
          </el-table-column>
          <el-table-column label="交易状态" align="center">
            <template scope="scope">{{scope.row.payStatus | payStat}}</template>
          </el-table-column>
          <el-table-column label="订单时间" align="center">
            <template scope="scope">
              <span
                v-if="scope.row.createTime!=null"
              >{{scope.row.createTime | converTime('YYYY-MM-DD HH:mm:ss')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="交易时间" align="center">
            <template scope="scope">
              <span
                v-if="scope.row.payTime!=null"
              >{{scope.row.payTime | converTime('YYYY-MM-DD HH:mm:ss')}}</span>
            </template>
          </el-table-column>
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
      <!-- </div> -->
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "orderQuery",
  data() {
    return {
      orderSta: [
        {
          //订单状态
          value: "1",
          label: "付款中"
        },
        {
          value: "2",
          label: "已完成"
        },
        {
          value: "3",
          label: "已取消"
        },
        {
          value: "4",
          label: "已退款"
        }
      ],
      paySta: [
        {
          //交易状态
          value: "1",
          label: "未付款"
        },
        {
          value: "2",
          label: "已付款"
        },
        {
          value: "3",
          label: "已退款"
        }
      ],
      callTime: [], //叫货日期
      tradingTime: [], //交易日期
      orderForm: {
        orderStatus: "",
        payStatus: "",
        phone: "",
        code: "",
        createTimeStart: "",
        createTimeEnd: "",
        payTimeStart: "",
        payTimeEnd: ""
      },
      tableData: [],
      // 分页
      pageNum: 1,
      pageSize: 20,
      total: 0
    };
  },
  created() {
    this.getOrderQuery(this.pageNum, this.pageSize);
  },
  methods: {
    getOrderQuery(pageNum, pageSize) {
      this.$axios({
        url: window.apiStore + "order/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          orderStatus: this.orderForm.orderStatus,
          payStatus: this.orderForm.payStatus,
          phone: this.orderForm.phone,
          code: this.orderForm.code,
          createTimeStart: this.orderForm.createTimeStart,
          createTimeEnd: this.orderForm.createTimeEnd,
          payTimeStart: this.orderForm.payTimeStart,
          payTimeEnd: this.orderForm.payTimeEnd,
          token: sessionStorage.getItem("token"),
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.tableData = res.data.data.list;
          this.total = res.data.data.total;
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
    // 详情
    detaiRow(code) {
      sessionStorage.setItem("Ordercode", code);
      this.$router.push({
        name: "details",
        params: {
          code: sessionStorage.getItem("Ordercode")
        }
      });
    },
    changeJiao(e) {
      this.orderForm.createTimeStart = this.$moment(e[0]).format("YYYY-MM-DD");
      this.orderForm.createTimeEnd = this.$moment(e[1]).format("YYYY-MM-DD");
    },
    changePayTime(e) {
      this.orderForm.payTimeStart = this.$moment(e[0]).format("YYYY-MM-DD");
      this.orderForm.payTimeEnd = this.$moment(e[1]).format("YYYY-MM-DD");
    },
    orderChaxun() {
      this.getOrderQuery();
    },
    reset() {
      this.orderForm.orderStatus = "";
      this.orderForm.payStatus = "";
      this.orderForm.phone = "";
      this.orderForm.code = "";
      this.orderForm.createTimeStart = "";
      this.orderForm.createTimeEnd = "";
      this.orderForm.payTimeStart = "";
      this.orderForm.payTimeEnd = "";
      this.callTime = [];
      this.tradingTime = [];
      this.getOrderQuery();
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getOrderQuery(this.pageNum, val);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getOrderQuery(val, this.pageSize);
    }
  },
  filters: {
    orderStat(value) {
      if (value == "1") {
        return "付款中";
      } else if (value == "2") {
        return "已完成";
      } else if (value == "3") {
        return "已取消";
      } else if (value == "4") {
        return "已退款";
      }
    },
    payStat(value) {
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
.orderQuery {
  /* background-color: #f1f6fa; */
  /* min-height: 647px; */
  min-width: 1600px;
  overflow: auto;
}
.orderBox1 {
  /* border-radius: 10px; */
  height: 200px;
  background-color: #fff;
}
.orderBox2 {
  background-color: #fff;
}
.orderInfo {
  width: 97%;
  margin: 0 auto;
}
.orderTabList {
  /* padding-top: 20px; */
}
.orderInfoInput,
.orderInfoInput2,
.Pinput,
.Pinput2 {
  display: inline-block;
}
.orderInfoInput {
  width: 32%;
}
.orderInfoInput2 {
  width: 36%;
}
.orderInfoBtn {
  text-align: right;
  margin-right: 20px;
  height: 50px;
  line-height: 60px;
}
.orderTit {
  margin-bottom: 0;
  padding-bottom: 0;
  height: 50px;
  line-height: 50px;
}
.Pinput,
.Pinput2 {
  width: 67%;
}
.Pinput2 .el-range-editor.el-input__inner {
  width: 100%;
}
.orderInfoInput1 {
  text-align: center;
}
.orderInfoInput2 {
  text-align: right;
}
/* 测试布局 */
.orderQuery {
  display: flex;
  flex-direction: column;

}
.orderBox2 {
  flex: 1;

}
</style>
