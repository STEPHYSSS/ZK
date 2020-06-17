<template>
  <div class="mallOrder">
    <div class="storeBox storeBox222">
      <div class="store_Box">
        <p class="store_tit">订单查询</p>
        <el-row style="white-space: nowrap;">
          <el-col :span="6">
            <span>订单状态：</span>
            <p>
              <el-select type="text" v-model="orderForm.status">
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
            <span>用户手机：</span>
            <p>
              <el-input type="text" v-model="orderForm.memberPhone" placeholder="请输入"></el-input>
            </p>
          </el-col>
        </el-row>
        <div class="konge"></div>
        <el-row>
          <el-col :span="6">
            <span>订单编号：</span>
            <p>
              <el-input type="text" v-model="orderForm.orderCode" placeholder="请输入"></el-input>
            </p>
          </el-col>
          <el-col :span="18" class="TongRight">
            <el-button class="theBtn queryButton" @click="chaxunsto">查询</el-button>
            <el-button class="theBtn resetButton" @click="resetsto">重置</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="storeInfo1">
      <div class="store_Box1">
        <el-table :data="tableData" width="100%">
          <el-table-column label="订单编号" align="center" width="250">
            <template scope="scope">
              <span class="codesty" @click="detaiRow(scope.row.code)">{{scope.row.code}}</span>
            </template>
          </el-table-column>
          <el-table-column label="用户手机" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.memberPhone !='18888888888'">{{scope.row.memberPhone}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="amount" label="商品总价" align="center"></el-table-column>
          <el-table-column prop="discountMoney" label="优惠金额" align="center"></el-table-column>
          <el-table-column prop="actualMoney" label="实付金额" align="center"></el-table-column>
          <el-table-column label="订单状态" align="center">
            <template scope="scope">{{scope.row.status | orderStat}}</template>
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
        <div class="konge"></div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "mallOrders",
  data() {
    return {
      orderSta: [
        //订单状态
        {
          value: "WP",
          label: "待付款"
        },
        {
          value: "WD",
          label: "待发货"
        },
        {
          value: "WR",
          label: "待收货"
        },
        {
          value: "WE",
          label: "待评价"
        },
        {
          value: "AS",
          label: "已完成"
        },
        {
          value: "AC",
          label: "已取消"
        }
      ],
      paySta: [
        //交易状态
        {
          value: "Y",
          label: "已付款"
        },
        {
          value: "N",
          label: "未付款"
        }
      ],
      callTime: [], //叫货日期
      orderForm: {
        //表单数据
        token: sessionStorage.getItem("token"),
        status: "", //订单状态
        memberPhone: "", //会员手机号
        orderCode: "", //订单编号
        payStatus: "", //支付状态
        createTimeStart: "", // 创建时间开始
        createTimeEnd: "" //创建时间结束
      },
      tableData: [],
      // 分页
      pageNum: 1,
      pageSize: 20,
      total: 0
    };
  },
  mounted() {
    this.getMallOrders(this.pageNum, this.pageSize);
  },
  methods: {
    getMallOrders(pageNum, pageSize) {
      this.$axios({
        url:"mall/order/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: this.orderForm.token,
          status: this.orderForm.status,
          memberPhone: this.orderForm.memberPhone,
          orderCode: this.orderForm.orderCode,
          payStatus: this.orderForm.payStatus,
          createTimeStart: this.orderForm.createTimeStart,
          createTimeEnd: this.orderForm.createTimeEnd,
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
      
      this.$router.push({
        name: "mallOrderinquiryDetail",
        query: {
          code: code,
          token:sessionStorage.getItem('token')
        }
      });
    },
    // 查询，重置
    chaxunsto() {
      this.getMallOrders();
    },
    resetsto() {
      this.orderForm.status = "";
      this.orderForm.memberPhone = "";
      this.orderForm.orderCode = "";
      this.orderForm.payStatus = "";
      this.orderForm.createTimeStart = "";
      this.orderForm.createTimeEnd = "";
      this.callTime = [];
      this.getMallOrders();
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getMallOrders(this.pageNum, val);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getMallOrders(val, this.pageSize);
    },
    Panchange(e) {
      this.orderForm.createTimeStart = this.$moment(e[0]).format("YYYY-MM-DD");
      this.orderForm.createTimeEnd = this.$moment(e[1]).format("YYYY-MM-DD");
    }
  },
  filters: {
    orderStat(value) {
      if (value == "WP") {
        return "待付款";
      } else if (value == "WD") {
        return "待发货";
      } else if (value == "WR") {
        return "待收货";
      } else if (value == "WE") {
        return "待评价";
      } else if (value == "AS") {
        return "已完成";
      } else if (value == "AC") {
        return "已取消";
      }else if (value == "AD") {
        return "已删除";
      }
    },
    payStat(value) {
      if (value == "Y") {
        return "已付款";
      } else if (value == "N") {
        return "未付款";
      }
    }
  }
};
</script>
<style scoped>
.mallOrder {
  background-color: #fff;
  height: 100%;
  min-height: 647px;
  min-width: 1700px;
  box-shadow: 0px 2px 10px #ccc;
}
p {
  display: inline-block;
  width: 300px;
}
.mallOrder .el-range-editor.el-input__inner {
  width: 100%;
}
.mallOrder .el-select {
  width: 100%;
}
.storeBox222 {
  height: 200px;
}
.paginStyle {
  height: 50px;
  text-align: right;
}
</style>