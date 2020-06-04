<template>
  <div class="shif" id="order-list">
    <div class="Top">
      <div class="Top_left">
        <li @click="show" style="text-align:center;">
          <img src="../assets/Categorymanagement_icon.png" class="logo" />
        </li>
        <span class="title1">{{data.storename}}</span>
      </div>
      <div class="Top_right">
        <span class="title2">POS机号：{{data.posNo}}</span>
        <!-- <span class="title2 titlTime">{{showData |converTime('YYYY-MM-DD HH:mm:ss')}}</span> -->
        <span class="title2">收银员：{{data.username}}</span>
      </div>
    </div>
    <LeftNav v-if="isshow" :msg="centerDialogVisible"></LeftNav>
    <div id="warpperShif">
      <div class="chooseTime">
        <p class="queryOne">查询：<el-input style="width:300px" v-model="form.code" placeholder="订单号"></el-input></p>
        <p class="queryOne2">
          选择时间：
          <el-date-picker
            v-model="data1"
            @change="change($event, 'data1')"
            type="daterange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </p>
        <p class="queryOne3">
          <el-button @click="searchone" class="codesty">重置</el-button>
          <el-button @click="queryone" class="codesty">查询</el-button>
        </p>
      </div>
      <div class="shifTable">
        <el-table :data="list" border style="width:100%" height="750px">
          <el-table-column prop="code" label="订单编号" align="center">
            <template slot-scope="scope"><span class="styFont" @click="rowDetail(scope.row.code)">{{scope.row.code}}</span></template>
          </el-table-column>
          <el-table-column prop="phone" label="会员手机号" align="center"></el-table-column>
          <el-table-column label="订单时间" align="center">
            <template slot-scope="scope">{{scope.row.createTime|converTime('YYYY-MM-DD HH:mm:ss')}}</template>
          </el-table-column>
          <el-table-column label="订单状态" align="center">
            <template slot-scope="scope">{{scope.row.orderStatus | payTip}}</template>
          </el-table-column>
          <el-table-column label="应付金额" align="center">
            <template slot-scope="scope">{{scope.row.payableMoney | numFilter}}</template>
          </el-table-column>
          <el-table-column label="实付金额" align="center">
            <template slot-scope="scope">{{scope.row.actualMoney | numFilter}}</template>
          </el-table-column>
        </el-table>
        <div style="text-align: right;">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[20,40,60]"
            :page-size="form.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LeftNav from "@/components/leftnav.vue";
import qs from "qs";
export default {
  data() {
    return {
      form: {
        token: sessionStorage.getItem("token"),
        code: "",
        createTimeStart: "",
        createTimeEnd: ""
      },
      ruleForm2: {
        newPassword: "",
        checkPass: "",
        oldPassword: ""
      },

      data1: "",
      input: "",
      currentPage4: 1,
      centerDialogVisible: false,
      data: {},
      isshow: false,
      formInline: {
        user: "",
        region: ""
      },
      list: [],
      pageNum: 1,
      pageSize: 20,
      total: 0
    };
  },
  created() {
    this.name();
    this.query();
  },
  methods: {
    // 查询，重置
    queryone() {
      this.query();
    },
    searchone() {
      this.form.code = "";
      this.form.createTimeStart = "";
      this.form.createTimeEnd = "";
      this.data1 = "";
      this.query();
    },
    change(e, name) {
      if (name === "data1") {
        this.form.createTimeStart = this.$moment(e[0]).format("YYYY-MM-DD");
        this.form.createTimeEnd = this.$moment(e[1]).format("YYYY-MM-DD");
      }
    },

    rowDetail(code) {
      sessionStorage.setItem("packCode", code);
      this.$router.push({
        name: "receipts",
        params: {
          orderCode: sessionStorage.getItem("packCode")
        }
      });
    },
    // 门店信息
    name() {
      let formData = new FormData();
      formData.append("token", sessionStorage.getItem("token"));
      this.$axios.post("/clerk/index/detail", formData).then(res => {
        if (res.data.code == "0000") {
          this.data = res.data.data;
        }
      });
    },
    // 列表渲染
    query(pageNum, pageSize) {
      this.$axios
        .post(
          "/clerk/ordering/order",
          qs.stringify({
            code: this.form.code,
            token: sessionStorage.getItem("token"),
            createTimeStart: this.form.createTimeStart,
            createTimeEnd: this.form.createTimeEnd,
            pageNum: this.pageNum,
            pageSize: this.pageSize
          })
        )
        .then(res => {
          if (res.data.code == "0000") {
            this.list = res.data.data.list;
            this.total = res.data.data.total;
          }
        });
    },
    handleSizeChange(val) {
      this.form.pageSize = val;
      this.query();
    },
    handleCurrentChange(val) {
      this.form.pageNum = val;
      this.query();
    },
    show() {
      this.isshow = !this.isshow ? true : false;
    },
    handleClose1(done) {
      this.$refs.ruleForm2.resetFields();
      this.centerDialogVisible = false;
    }
  },
  components: {
    LeftNav
  },
  filters: {
    payTip(value) {
      if (value == "1") {
        return "付款中";
      } else if (value == "2") {
        return "已完成";
      } else if (value == "3") {
        return "已取消";
      } else if (value == "4") {
        return "已退款";
      }
    }
  }
};
</script>
<style scoped>
.shif{
  background-color: #fff;
  height: 100% !important;
  width: 100%;
  min-width: 1024px !important;
}
.Top {
  height: 50px;
  box-sizing: border-box;
  background-color: #23cfe1;
}
.Top_left {
  display: inline-flex;
  float: left;
}
.Top_left .logo {
  width: 28px;
  margin: 10px 15px 0 15px;
}
.Top_left .logo2 {
  width: 19px;
  margin: 11px 15px 0 15px;
}
.Top_left .title1,
.Top_right .title2 {
  line-height: 50px;
  color: #fff;
}
.Top_right {
  display: inline-flex;
  float: right;
  margin-right: 40px;
}
.titlTime {
  margin: 0 15px;
}
.wrapperShif {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.dis {
  display: inline-block;
}
#warpperShif {
  width: 100%;
  height: 94.6vh;
  background-color: #fff;
}
#warpperShif .chooseTime {
  display: flex;
}
#warpperShif .chooseTime .queryOne{
    padding-top: 15px;
    width: 34%;
    margin-left: 35px;
}
#warpperShif .chooseTime .queryOne3{
  text-align: right;
  flex: 1;
  margin-right: 35px;
  box-sizing: border-box;
}
.queryOne,.queryOne2,.queryOne3{
  padding-top: 15px;
}
#warpperShif .shifTable {
  margin: 10px 35px;
}
.styFont{
  color: #23cfe1;
  cursor: pointer;
}
</style>

