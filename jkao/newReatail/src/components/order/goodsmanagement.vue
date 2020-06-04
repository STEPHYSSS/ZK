<template>
  <div class="goodsmanagement minimum">
    <div class="waitBox2">
      <div class="detailBackBtn aa">
        <img src="@/assets/returnbutton.png" alt="" @click="retuBack" class="codesty">
      </div>
      <div class="margin20">
        <h3 class="h3mt">叫货单管理</h3>
        <el-row class="rowSpacing">
          <el-col :span="6">
            <div>
              创建日期:
              <span>{{orderingSheet.createTime | converTime('YYYY-MM-DD')}}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              叫货单编号:
              <span>{{orderingSheet.code}}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              叫货状态:
              <span v-if="orderingSheet.status =='1'">备货中</span>
              <span v-else-if="orderingSheet.status =='2'">待验收</span>
              <span v-else-if="orderingSheet.status =='3'">待验收</span>
              <span v-else>全部验收</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div></div>
          </el-col>
        </el-row>
      </div>
      <div class="wait_Box">
        <el-table :data="tableData" style="width: 100%" max-height="600">
          <el-table-column align="center" prop="code" label="货号"></el-table-column>
          <el-table-column align="center" prop="name" label="品名" width="120"></el-table-column>
          <el-table-column label="订购倍数" align="center" prop="orderingMultiple"></el-table-column>
          <el-table-column align="center" prop="orderingCount" label="订购总数"></el-table-column>
          <el-table-column align="center" prop="orderingAmount" label="订购总金额"></el-table-column>
          <el-table-column align="center" prop="spec" label="规格"></el-table-column>
          <el-table-column align="center" prop="salesPrice" label="单品售价"></el-table-column>
          <el-table-column label="保质期" align="center">
            <template scope="scope">{{scope.row.period}}{{scope.row.periodUnit}}</template>
          </el-table-column>
          <el-table-column align="center" prop="temperature" label="温层"></el-table-column>
          <el-table-column align="center" prop="orderingUtil" label="基本订购单位" width="120"></el-table-column>
          <el-table-column align="center" prop="minOrderingMultiple" label="最小订购倍数" width="120"></el-table-column>
          <el-table-column align="center" prop="maxOrderingMultiple" label="最大订购倍数" width="120"></el-table-column>
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
  name: "goodsmanagement",
  data() {
    return {
      orderingSheet: {},
      tableData: [],
      pageNum: 1,
      pageSize: 20,
      total: 100
    };
  },
  created() {
    this.detailList(this.pageNum, this.pageSize);
  },
  methods: {
    detailList(pageNum, pageSize) {
      let that = this;
      // let orderingCode = that.$route.query.code;
      let token = sessionStorage.getItem("token");
      that
        .$axios({
          url: window.apiStore + "ordering/sub/list",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            token: token,
            orderingCode: sessionStorage.getItem("code"),
            pageNum: that.pageNum,
            pageSize: that.pageSize
          })
        })
        .then(res => {
          if (res.data.code == "0000") {
            that.orderingSheet = res.data.data.orderingSheet;
            that.tableData = res.data.data.pageInfo.list;
            that.total = res.data.data.pageInfo.total;
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
            that.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log("数据异常", err);
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.detailList(this.pageNum, val);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.detailList(val, this.pageSize);
    },
    retuBack() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.goodsmanagement {
  /* background-color: #f1f6fa; */
  min-height: 647px;
  position: relative;
  min-width: 1600px;
  overflow: auto;
}
h3 {
  margin-bottom: 20px;
}
.margin20 {
  margin: 0 20px;
}
.waitBox,
.waitBox2 {
  background: #fff;
}
.waitBox2 {
  /* padding: 0 20px; */
}
.wait_Box {
  /* margin-left: 30px;
  margin-right: 30px; */
  padding-bottom: 30px;
}
.waitBox2 input {
  width: 50px;
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
.backBtn {
  position: absolute;
  right: 22px;
  top: 15px;
}
.aa {
  right: 0;
}
/* .fanhuiann{
  float: right;
  margin-right: 30px;
} */
</style>


