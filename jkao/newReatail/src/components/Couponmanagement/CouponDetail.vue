<template>
  <div class="CouPage">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
      <!-- <el-breadcrumb-item :to="{ path: '/operatIndex' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item >优惠券管理</el-breadcrumb-item>
      <el-breadcrumb-item >详情</el-breadcrumb-item>-->
    </el-breadcrumb>
    <h3 class="store_tit marStore">优惠券使用详情</h3>
    <img src="@/assets/Rbutton.png" class="CouponbtnbackT" @click="goback" />
    <div class="CoupageBox">
      <div class="Cdetail">
        <div class="CInfo">
          <p>活动名称：{{pageList.name}}</p>
          <p>生效日期：{{pageList.takeEffectTime | converTime('YYYY-MM-DD')}}</p>
          <p>失效日期：{{pageList.loseEffectTime | converTime('YYYY-MM-DD')}}</p>
          <p>发放数量：{{pageList.num}}</p>
        </div>
        <div style="width:100%">
          <el-table :data="tableData" style="width: 100%;">
            <el-table-column prop="id" label="优惠券ID" align="center"></el-table-column>
            <el-table-column prop="name" label="优惠券名称" align="center"></el-table-column>
            <el-table-column prop="type" label="优惠券类型" align="center">
              <template scope="scope">
                <span v-if="scope.row.type == 'R'">减免券</span>
                <span v-if="scope.row.type == 'D'">折扣券</span>
              </template>
            </el-table-column>
            <el-table-column prop="remark" label="优惠券说明" align="center"></el-table-column>
            <el-table-column label="门店范围" align="center">
              <template scope="scope">
                <span
                  class="codesty"
                  v-if="scope.row.offlineStore == 'B'"
                  @click="Bstore(scope.row.storeList)"
                >部分门店</span>
                <span v-else-if="scope.row.offlineStore == 'A'">全部门店</span>
              </template>
            </el-table-column>
            <el-table-column label="商品范围" align="center">
              <template scope="scope">
                <span
                  class="codesty"
                  v-if="scope.row.goodsScope == 'B'"
                  @click="Bgoods(scope.row.goodsList)"
                >部分商品</span>
                <span v-else-if="scope.row.goodsScope == 'A'">全部商品</span>
              </template>
            </el-table-column>
            <el-table-column prop="discountMoney" label="减免或折扣" align="center">
              <template scope="scope">
                <span v-if="scope.row.discountMoney == null">{{scope.row.reduceMoney}}</span>
                <span v-if="scope.row.reduceMoney == null">{{scope.row.discountMoney}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="period" label="使用有效期（天）" align="center"></el-table-column>
            <el-table-column label="开始使用时间" align="center">
              <template scope="scope">
                <span
                  v-if="scope.row.startTime!=null"
                >{{scope.row.startTime|converTime('YYYY-MM-DD HH:mm:ss')}}</span>
              </template>
            </el-table-column>
            <el-table-column label="结束使用时间" align="center">
              <template scope="scope">
                <span
                  v-if="scope.row.endTime!=null"
                >{{scope.row.endTime|converTime('YYYY-MM-DD HH:mm:ss')}}</span>
              </template>
            </el-table-column>
          </el-table>
          <!-- 部分门店，商品 -->
          <el-dialog :visible.sync="dialogTableVisible" width="400px" title="部分门店">
            <!-- <h4 class="daiTitle">部分门店</h4> -->
            <div class="part">
              <el-table :data="storeLists">
                <el-table-column prop="storeCode" label="门店编号" align="center"></el-table-column>
                <el-table-column prop="storeName" label="门店名称" align="center"></el-table-column>
              </el-table>
            </div>
          </el-dialog>
          <el-dialog :visible.sync="dialogTableVisible2" width="400px" title="部分商品">
            <!-- <h4 class="daiTitle">部分商品</h4> -->
            <div class="part">
              <el-table :data="goodsLists">
                <el-table-column property="goodsCode" label="货号" align="center"></el-table-column>
                <el-table-column property="goodsName" label="商品名称" align="center"></el-table-column>
              </el-table>
            </div>
          </el-dialog>
        </div>
        <div class="konge"></div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "CouDetai",
  data() {
    return {
      pageList: {},
      tableData: [],
      storeLists: [], //部分门店
      goodsLists: [], //部分商品
      dialogTableVisible: false,
      dialogTableVisible2: false
    };
  },
  created() {
    this.getRowDetai();
  },
  methods: {
    getRowDetai() {
      this.$axios({
        url: window.apiUrl + "coupon/detail",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: sessionStorage.getItem("token"),
          packageId: sessionStorage.getItem("packageId")
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.pageList = res.data.data.couponPackage;
          this.tableData = res.data.data.list;
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
    Bstore(val) {
      this.storeLists = val;
      this.dialogTableVisible = true;
    },
    Bgoods(val) {
      this.goodsLists = val;
      this.dialogTableVisible2 = true;
    },
    goback() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.CouPage {
  background-color: #fff;
  height: 100%;
  min-height: 647px;
  min-width: 1700px;
  box-shadow: 0 2px 10px #ccc;
}
.CoupageBox {
  margin: 0px auto;
  background: #fff;
  border-radius: 10px;
  min-height: 170px;
}
.CoupageBox h3 {
  margin-bottom: 0;
  padding-bottom: 0;
  height: 50px;
  line-height: 60px;
}
.Cdetail {
  width: 97%;
  margin: 0 auto;
}
.Cdetail p {
  display: inline-block;
  width: 25%;
}
.part {
  width: 350px;
}
.daiTitle {
  font-size: 20px;
}
.CInfo {
  margin-bottom: 15px;
}
.marStore {
  margin-left: 20px;
}
.CouponbtnbackT {
  text-decoration: none;
  float: right;
  margin-right: 20px;
  cursor: pointer;
  margin-top: 13px;
}
</style>


