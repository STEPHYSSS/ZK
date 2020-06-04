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
        <span class="title2 titlTime">{{showData |converTime('YYYY-MM-DD HH:mm:ss')}}</span>
        <span class="title2">收银员：{{data.username}}</span>
      </div>
    </div>
    <LeftNav v-if="isshow" :msg="centerDialogVisible"></LeftNav>
    <div id="warpperShif">
      <div class="chooseTime">
        <p>
          选择时间：
          <el-date-picker
            v-model="value6"
            type="daterange"
            @change="change($event, 'value6')"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </p>
        <p>
          <el-button @click="searchone" class="codesty">重置</el-button>
          <el-button @click="queryone" class="codesty">查询</el-button>
        </p>
      </div>
      <div class="shifTable">
        <el-table :data="list" border style="width:100%" height="750px">
          <el-table-column prop="name" label="收银员" align="center"></el-table-column>
          <el-table-column label="当班时间" align="center">
            <template slot-scope="scope">{{scope.row.onDutyTime | converTime('YYYY-MM-DD HH:mm:ss')}}</template>
          </el-table-column>
          <el-table-column label="交班时间" align="center">
            <template slot-scope="scope"><span v-if="scope.row.handOverDutyTime !=null">{{scope.row.handOverDutyTime | converTime('YYYY-MM-DD HH:mm:ss')}}</span></template>
          </el-table-column>
          <el-table-column prop="totalTurnover" label="营业额" align="center"></el-table-column>
          <el-table-column label="现金收款" align="center">
            <template slot-scope="scope">{{scope.row.cash | numFilter}}</template>
          </el-table-column>
          <el-table-column label="移动支付收款" align="center">
            <template slot-scope="scope">{{scope.row.unionPay | numFilter}}</template>
          </el-table-column>
          <el-table-column label="退款金额" align="center">
            <template slot-scope="scope">{{scope.row.refund | numFilter}}</template>
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
        pageNum: 1,
        pageSize: 20,
        total: 0,
        createTimeStart: "",
        createTimeEnd: ""
      },
      value6: "",
      currentPage4: 1,
      isshow: false,
      centerDialogVisible: false,
      showData: new Date(),
      time: "",
      list: [],
      ruleForm2: {
        newPassword: "",
        checkPass: "",
        oldPassword: ""
      },
      data: {},
      pageNum: 1,
      pageSize: 20,
      total: 0
    };
  },
  mounted: function() {
    var orderHeight = document.body.clientHeight;
    document.getElementById("order-list").style.height = orderHeight + "px";
    let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
    this.time = setInterval(() => {
      _this.showData = new Date(); // 修改数据date
    }, 1000);
    // if(sessionStorage.getItem('VipId')){
    //     this.showCoupon = true;
    // }
  },
  beforeDestroy() {
    if (this.time) {
      clearInterval(this.time); // 在Vue实例销毁前，清除我们的定时器
    }
  },
  created() {
    // this.nowTimes()
    this.name();
    this.query();
  },
  methods: {
    queryone() {
      this.query();
    },
    searchone() {
      this.form.createTimeStart = "";
      this.form.createTimeEnd = "";
      this.data1 = "";
      this.value6 = "";
      this.query();
    },
    change(e, name) {
      if (name === "value6") {
        this.form.createTimeStart = this.$moment(e[0]).format("YYYY-MM-DD");
        this.form.createTimeEnd = this.$moment(e[1]).format("YYYY-MM-DD");
      }
    },
    name() {
      let formData = new FormData();
      formData.append("token", sessionStorage.getItem("token"));
      this.$axios.post("/clerk/index/detail", formData).then(res => {
        if (res.data.code == "0000") {
          this.data = res.data.data;
        }
      });
    },
    query() {
      this.$axios
        .post("/clerk/ordering/shift", qs.stringify(this.form))
        .then(res => {
          if (res.data.code == "0000") {
            this.list = res.data.data.list;
            this.total = res.data.data.total;
          } else if (res.data.code === "6666") {
            this.$message({
              showClose: true,
              message: "token异常，请重新登录",
              type: "error"
            });
            const timer = setTimeout(() => {
              clearTimeout(timer);
              this.$router.push({ name: "login" });
            }, 3000);
          }
        });
    },
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear();
      let month =
        new Date(timeStamp).getMonth() + 1 < 10
          ? "0" + (new Date(timeStamp).getMonth() + 1)
          : new Date(timeStamp).getMonth() + 1;
      let date =
        new Date(timeStamp).getDate() < 10
          ? "0" + new Date(timeStamp).getDate()
          : new Date(timeStamp).getDate();
      let hh =
        new Date(timeStamp).getHours() < 10
          ? "0" + new Date(timeStamp).getHours()
          : new Date(timeStamp).getHours();
      let mm =
        new Date(timeStamp).getMinutes() < 10
          ? "0" + new Date(timeStamp).getMinutes()
          : new Date(timeStamp).getMinutes();
      let ss =
        new Date(timeStamp).getSeconds() < 10
          ? "0" + new Date(timeStamp).getSeconds()
          : new Date(timeStamp).getSeconds();
      this.nowTime =
        year + "-" + month + "-" + date + "" + " " + HH + ":" + mm + ":" + ss;
    },
    nowTimes() {
      this.timeFormate(new Date());
      setInterval(this.nowTimes, 1000);
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.form.pageSize = val;
      this.query();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.form.pageNum = val;
      this.query();
    },
    show() {
      this.isshow = !this.isshow ? true : false;
    }
  },
  components: {
    LeftNav
  }
};
</script>
<style scoped>
.shif{
  background-color: #fff;
  height: 100% !important;
  width: 100%;
  min-width: 1024px;
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
/* .wrapperShif {
  width: 100%;
  height: 100%;
  background-color: #fff;
} */
.dis {
  display: inline-block;
}
#warpperShif {
  width: 100%;
  height: 94.6vh;
  /* height: 100%; */
  background-color: #fff;
}
#warpperShif .chooseTime {
  display: flex;
}
#warpperShif .chooseTime p {
  flex: 1;
  padding-top: 12px;
}
#warpperShif .chooseTime p:first-child {
  padding-left: 35px;
}
#warpperShif .chooseTime p:last-child {
  padding-right: 35px;
  text-align: right;
}
#warpperShif .shifTable {
  margin: 10px 35px;
}
.el-pagination{
  padding: 15px 5px; 
}
</style>