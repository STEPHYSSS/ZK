<template>
  <div class="receiving minWidth1600">
    <div class="receBox">
      <h3 class="demonstration ml20">常规收货</h3>
      <el-row class="ml20 rowSpacing">
        <el-col :span="6">
          <div class="classify">
            <span class="wpx100">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;叫货日期：</span>
            <el-date-picker
              v-model="order_time"
              @change="changeTime"
              type="daterange"
              class="input1"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-col>
        <el-col :span="6" class="textAlignCenter">
          <div>
            <span class="sotretype5 textTitleR">配送状态：</span>
            <p class="TongYiInput">
              <el-select v-model="value2" placeholder="请选择" class="choo">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </p>
          </div>
        </el-col>
        <el-col :span="6" class="textAlignCenter">
          <div>
            <span class="Width">验收状态：</span>
            <p class="TongYiInput">
              <el-select v-model="value1" placeholder="请选择">
                <el-option
                  v-for="item in check"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </p>
          </div>
        </el-col>
        <el-col :span="6" class="textAlignRight">
          <div>
            <span class="sotretype5">叫货单编号：</span>
            <el-input class="input1" type="text" placeholder="请输入内容" v-model="order_goods" />
          </div>
        </el-col>
      </el-row>
      <el-row class="ml20">
        <el-col :span="6">
          <div>
            <span class="wpx100">预计到货日期：</span>
            <el-date-picker
              v-model="Arrival_time"
              @change="changeTime2"
              type="daterange"
              class="input1"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-col>
        <el-col :span="6" class="textAlignCenter">
          <div>
            <span class="sotretype5">配送单编号：</span>
            <el-input class="input1" type="text" placeholder="请输入内容" v-model="delivery" />
          </div>
        </el-col>
        <el-col :span="6">
          <div></div>
        </el-col>
        <el-col :span="6" style="margin-left:25%">
          <div class="textAlignRight">
            <el-button class="theBtn queryButton" @click="inquiry">查询</el-button>
            <el-button @click="resett" class="theBtn resetButton">重置</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="info">
      <div class="rece_Box">
        <el-table :data="list" style="width: 100%" max-height="600">
          <el-table-column prop="code" label="配送单编号" align="center" width="250"></el-table-column>
          <el-table-column label="配送状态" align="center">
            <template scope="scope">{{scope.row.deliveryStatus | deliveryTip}}</template>
          </el-table-column>
          <el-table-column prop="supplierName" label="配送方" align="center"></el-table-column>
          <el-table-column label="预计到货日期" align="center">
            <template scope="scope">{{scope.row.estimatedArrivalTime | converTime('YYYY-MM-DD')}}</template>
          </el-table-column>
          <el-table-column prop="temperature" label="温层" align="center"></el-table-column>
          <el-table-column label="验收状态" align="center">
            <template scope="scope">
              <span>{{scope.row.checkStatus | restaTip}}</span>
            </template>
          </el-table-column>
          <el-table-column label="叫货单编号" align="center" width="250">
            <template scope="scope">
              <span
                class="codesty"
                @click="jhDetail(scope.row.orderingCode)"
              >{{scope.row.orderingCode}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" fixed="right">
            <template scope="scope">
              <span
                @click="check1(scope.row.code)"
                v-if="scope.row.deliveryStatus==1 && scope.row.checkStatus == 1"
                class="codesty"
              >查看</span>
              <span
                @click="check2(scope.row.code)"
                v-if="scope.row.deliveryStatus==2 && scope.row.checkStatus == 1"
                class="codesty"
              >验收</span>
              <span
                @click="check3(scope.row.code)"
                v-if="scope.row.deliveryStatus==3 && scope.row.checkStatus == 2"
                class="codesty"
              >查看</span>
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
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "receiving",
  data() {
    return {
      order_time: "", //叫货日期
      Arrival_time: [], //预计到货日期
      order_goods: "", //叫货单编号
      createTimeStart: "", //创建时间开始
      createTimeEnd: "", //创建时间结束
      estimatedArrivalTimeStart: "", //	预计到货时间开始
      estimatedArrivalTimeEnd: "", //	预计到货时间结束
      delivery: "", //配送单编号,
      value1: "", //配送状态
      value2: "", //验收状态
      options: [
        {
          value: "",
          label: "请选择"
        },
        {
          value: "1",
          label: "待配送"
        },
        {
          value: "2",
          label: "配送中"
        },
        {
          value: "3",
          label: "已完成"
        }
      ],
      check: [
        {
          value: "",
          label: "请选择"
        },
        {
          value: "1",
          label: "待验收"
        },
        {
          value: "2",
          label: "已验收"
        }
      ],
      list: [],
      pageNum: 1,
      pageSize: 20,
      total: 0
    };
  },
  created() {
    this.receivingList(this.pageNum, this.pageSize);
  },
  methods: {
    receivingList(pageNum, pageSize) {
      let that = this;
      let token = sessionStorage.getItem("token");
      that
        .$axios({
          url: window.apiStore + "delivery/list",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            token: token,
            pageNum: that.pageNum,
            pageSize: that.pageSize,
            deliveryCode: that.delivery,
            orderingCode: that.order_goods,
            checkStatus: that.value1, //验收
            deliveryStatus: that.value2, //配送
            createTimeStart: that.createTimeStart,
            createTimeEnd: that.createTimeEnd,
            estimatedArrivalTimeStart: that.estimatedArrivalTimeStart,
            estimatedArrivalTimeEnd: that.estimatedArrivalTimeEnd
          })
        })
        .then(res => {
          if (res.data.code == "0000") {
            that.list = res.data.data.list;
            that.total = res.data.data.total;
          } else if (res.data.code == "6666") {
            this.$message({
              showClose: true,
              message: "token异常，请重新登录",
              type: "error"
            });
          } else {
            this.$message.error(res.data.msg);
          }
        })
    },
    // 待配送
    check1(code) {
      sessionStorage.setItem("waitpeiCode", code);
      this.$router.push({
        name: "delivered",
        params: {
          deliveryCode: sessionStorage.getItem("waitpeiCode"),
          token: sessionStorage.getItem("token")
        }
      });
    },
    // 待验收
    check2(code) {
      this.$router.push({
        name: "waitCheck",
        params: {
          deliveryCode: sessionStorage.setItem("waitpeiCode", code),
          token: sessionStorage.getItem("token")
        }
      });
    },
    // 验收完成
    check3(code) {
      sessionStorage.setItem("waitpeiCode", code);
      this.$router.push({
        name: "acceptance",
        params: {
          deliveryCode: sessionStorage.getItem("waitpeiCode"),
          token: sessionStorage.getItem("token")
        }
      });
    },
    // 查询时间
    changeTime() {
      this.createTimeStart = this.$moment(e[0]).format("YYYY-MM-DD");
      this.createTimeEnd = this.$moment(e[1]).format("YYYY-MM-DD");
    },
    changeTime2() {
      this.estimatedArrivalTimeStart = this.$moment(e[0]).format("YYYY-MM-DD");
      this.estimatedArrivalTimeEnd = this.$moment(e[1]).format("YYYY-MM-DD");
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.receivingList(this.pageNum, val);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.receivingList(val, this.pageSize);
    },
    jhDetail(orderingCode) {
      let code = sessionStorage.setItem("code", orderingCode);
      this.$router.push({
        name: "goodsmanagement",
        params: {
          code: code
        }
      });
    },
    // 查询 重置
    inquiry() {
      this.receivingList();
    },
    resett() {
      this.order_time = ""; //叫货日期
      this.Arrival_time = ""; //预计到货日期
      this.order_goods = ""; //叫货单编号
      this.delivery = ""; //配送单编号,
      this.value1 = "";
      this.value2 = "";
      this.receivingList();
    }
  },
  filters: {
    restaTip(value) {
      if (value == "1") {
        return "待验收";
      } else if (value == "2") {
        return "已验收";
      }
    },
    deliveryTip(value) {
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
.receiving {
  /* background-color: #f1f6fa; */
  min-height: 647px;
  min-width: 1200px;
}
.receBox,
.info {
  margin: 0 auto;
  background: #fff;
}
.receBox {
  height: 200px;
  padding-right: 20px;
}
.receiving .rece_Box {
  /* padding-bottom: 15px; */
  /* margin-left: 30px;
  margin-right: 30px; */
}
.receiving .nav {
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
.receiving .demonstration {
  padding-top: 20px;
  padding-bottom: 20px;
}
.spacelet {
  letter-spacing: 6px;
}
.cit {
  width: 30%;
}
.shop2 {
  margin: 0 4px;
}
.TongYi {
  width: 65%;
}
.sotlnameTime {
  width: 72%;
}
.sotlnameTime2 {
  width: 60.5%;
}
.colright {
  text-align: right;
}
.colWiths {
  text-align: center;
}
.peiWidth {
  letter-spacing: 3px;
}
.cit,
.TongYi,
.sotlnameTime,
.sotlnameTime2 {
  display: inline-block;
}
.receiving .el-range-editor.el-input__inner {
  width: 100%;
}
.btn_flot {
  width: 100%;
  text-align: right;
}
.info {
  clear: both;
  /* margin-top: 30px; */
}
.info_box table th {
  color: #444444;
}
.listTab {
  border-collapse: collapse;
}
.hove {
  border-top: 1px solid #ccd3df;
  border-bottom: 1px solid #ccd3df;
  height: 40px;
}
.hove:hover {
  background-color: #dcf9fc;
}
.pagin {
  margin: 20px;
  position: relative;
  height: 20px;
}
.pagin_p {
  position: absolute;
  right: 0;
}
.mard {
  letter-spacing: 2px;
}
/* .codesty{
  color:#01c8dc;
} */

.Width {
  width: 75px;
}
.wpx100 {
  width: 100px;
  display: inline-block;
}
.ml20 {
  margin-left: 20px;
}
.rowSpacing {
  margin-bottom: 20px;
}
.serchBoxContent {
  width: 385px;
  text-align: right;
}
</style>


