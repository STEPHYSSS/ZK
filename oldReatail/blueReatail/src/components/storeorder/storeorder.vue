<template>
  <div class="dingdanchaxun">
    <div class="dingdanRece">
      <div class="dingdanflexBox">
        <!-- 查询框部分 -->
        <p class="store_tit">订单查询</p>
        <el-row style="white-space: nowrap;">
          <el-col :span="6">
            <span>订单状态：</span>
            <p>
              <el-select type="text" v-model="orderForm.orderStatus">
                <el-option
                  v-for="(item,index) in orderSta"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  placeholder="请选择"
                ></el-option>
              </el-select>
            </p>
          </el-col>
          <el-col :span="6" class="TongCenter">
            <span>交易状态：</span>
            <p>
              <el-select type="text" v-model="orderForm.payStatus">
                <el-option
                  v-for="(item,index) in paySta"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  placeholder="请选择"
                ></el-option>
              </el-select>
            </p>
          </el-col>
          <el-col :span="6" class="TongCenter">
            <span>订单日期：</span>
            <p>
              <el-date-picker
                v-model="callTime"
                @input="Panchange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </p>
          </el-col>
          <el-col :span="6" class="TongRight">
            <span>会员手机：</span>
            <p>
              <el-input type="text" v-model="orderForm.phone" placeholder="请输入"></el-input>
            </p>
          </el-col>
        </el-row>
        <div class="konge"></div>
        <el-row>
          <el-col :span="6">
            <span>订单编号：</span>
            <p>
              <el-input type="text" v-model="orderForm.code" placeholder="请输入"></el-input>
            </p>
          </el-col>
          <el-col :span="6" class="TongCenter">
            <span>交易日期：</span>
            <p>
              <el-date-picker
                v-model="tradingTime"
                @input="Panchange2"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </p>
          </el-col>
          <el-col :span="12" class="TongRight">
            <el-button class="theBtn queryButton" @click="chaxunsto">查询</el-button>
            <el-button class="theBtn resetButton" @click="resetsto">重置</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="dingdanMain">
        <!-- 表格部分 -->
        <div class="firstCeng">
          <div class="seconedCeng">
            <el-table :data="tableData" border height="100%" width="100%">
          <el-table-column label="订单编号" align='center' width="250">
            <template scope="scope">
              <span class="codesty" @click="detaiRow(scope.row.code)">{{scope.row.code}}</span>
            </template>
          </el-table-column>
          <el-table-column label="会员手机号" align='center'>
            <template slot-scope="scope">
              <span v-if="scope.row.phone !='18888888888'">{{scope.row.phone}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="posNo" label="POS编号" align='center'>
          </el-table-column>
          <el-table-column prop="payableMoney" label="应付金额" align='center'>
          </el-table-column>
          <el-table-column prop="actualMoney" label="实付金额" align='center'>
          </el-table-column>
          <el-table-column prop="discountMoney" label="优惠金额" align='center'>
          </el-table-column>
          <el-table-column label="订单状态" align='center'>
            <template scope="scope">{{scope.row.orderStatus | orderStat}}</template>
          </el-table-column>
          <el-table-column label="交易状态" align='center'>
            <template scope="scope">{{scope.row.payStatus | payStat}}</template>
          </el-table-column>
          <el-table-column label="订单时间" align='center'>
            <template scope="scope">
              <span v-if="scope.row.createTime!=null">{{scope.row.createTime | converTime('YYYY-MM-DD HH:mm:ss')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="交易时间" align='center'>
            <template scope="scope">
              <span v-if="scope.row.payTime!=null">{{scope.row.payTime | converTime('YYYY-MM-DD HH:mm:ss')}}</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="paginStyle">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[20,40,60]"
            :page-size="pageSize"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            class="pagination"
          ></el-pagination>
        </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "storeQuery",
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
        payTimeEnd: "",
        pageNum: 1,
        pageSize: 20,
        total: 0,
        token: sessionStorage.getItem("token")
      },
      tableData: [],
      // 分页
      pageNum: 1,
      pageSize: 20,
      total: 0
    };
  },
  created() {
    this.getStoreQuery(this.pageNum, this.pageSize);
  },
  methods: {
    getStoreQuery(pageNum, pageSize) {
      this.$axios({
        url: window.apiUrl + "order/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify(this.orderForm)
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
        name: "storedetails",
        params: {
          code: sessionStorage.getItem("Ordercode")
        }
      });
    },
    // 分页
    handleSizeChange(val) {
      this.orderForm.pageSize = val;
      this.getStoreQuery(this.orderForm.pageNum, val);
    },
    handleCurrentChange(val) {
      this.orderForm.pageNum = val;

      this.getStoreQuery(val, this.orderForm.pageSize);
    },
    chaxunsto() {
      this.getStoreQuery();
    },
    resetsto() {
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
      this.getStoreQuery();
    },
    Panchange(e) {
      this.orderForm.createTimeStart = this.$moment(e[0]).format("YYYY-MM-DD");
      this.orderForm.createTimeEnd = this.$moment(e[1]).format("YYYY-MM-DD");
    },
    Panchange2(e) {
      this.orderForm.payTimeStart = this.$moment(e[0]).format("YYYY-MM-DD");
      this.orderForm.payTimeEnd = this.$moment(e[1]).format("YYYY-MM-DD");
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
.dingdanchaxun {
  background-color: #fff;
  min-height: 647px;
  min-width: 1700px;
  height: 100%;
  box-sizing: border-box;
  box-shadow: 0px 2px 10px #ccc;
}
.dingdanchaxun .dingdanRece {
  font-size: 12px;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.dingdanflexBox {
  height:200px;
  margin: 0 20px;
  box-sizing: border-box;
}
.dingdanMain {
  flex: 1;
  height: 100%;
  -webkit-box-flex: 1;
  /* max-height: 634px;
  overflow-y: scroll; */
}
.firstCeng{
  position: relative;
  overflow: hidden;
  height: 634px;
}
.seconedCeng{
  position: absolute;
  left: 0;
  top: 0;
  right: -17px;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: scroll;
}
p {
  display: inline-block;
  width: 300px;
}
.dingdanchaxun .el-range-editor.el-input__inner {
  width: 100%;
}
.dingdanchaxun .el-select{
  width: 100%;
}
</style>


