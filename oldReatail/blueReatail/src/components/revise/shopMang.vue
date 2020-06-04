<template>
  <div class="shopManage">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
            <el-breadcrumb-item :to="{ path: '/suppIndex' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item >商品管理</el-breadcrumb-item>
    </el-breadcrumb>-->
    <div class="storeBox storeBox222">
      <div class="store_Box">
        <p class="store_tit">商品管理</p>
        <el-row style="white-space: nowrap;">
          <el-col :span="6">
            <span>货号：</span>
            <p>
              <el-input type="text" placeholder="请输入" v-model="goodsCode"></el-input>
            </p>
          </el-col>
          <el-col :span="6" class="TongCenter">
            <span>国际条码：</span>
            <p>
              <el-input type="text" placeholder="请输入" v-model="barcode"></el-input>
            </p>
          </el-col>
          <el-col :span="6" class="TongCenter">
            <span>品名：</span>
            <p>
              <el-input type="text" placeholder="请输入" v-model="goodsNameLike"></el-input>
            </p>
          </el-col>
          <el-col :span="6" class="TongRight">
            <el-button class="theBtn queryButton" @click="chaxun">查询</el-button>
            <el-button class="theBtn resetButton" @click="reset">重置</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="storeInfo">
      <div class="store_Box1">
        <div class="scrollHide">
          <el-table :data="tableData" style="width: 100%;" border>
          <el-table-column prop="code" label="货号" align="center"></el-table-column>
          <el-table-column prop="barcode" label="国际条码" align="center" width="150"></el-table-column>
          <el-table-column prop="name" label="品名" align="center" width="160"></el-table-column>
          <el-table-column prop="unit" label="单位" align="center"></el-table-column>
          <el-table-column prop="temperature" label="温层" align="center"></el-table-column>
          <el-table-column prop="spec" label="规格" align="center"></el-table-column>
          <el-table-column prop="period" label="保质期" align="center">
            <template scope="scope">{{scope.row.period}}{{scope.row.periodUnit}}</template>
          </el-table-column>
          <el-table-column prop="purchasePrice" label="商品进价" align="center"></el-table-column>
          <el-table-column prop="orderingUtil" label="基本订购单位" align="center"></el-table-column>
          <el-table-column prop="minOrderingMultiple" label="最小订购倍数" align="center"></el-table-column>
          <el-table-column prop="maxOrderingMultiple" label="最大订购倍数" align="center"></el-table-column>
        </el-table>
        <div class="konge"></div>
        <div class="paginStyle">
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
        <div class="konge"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "shopManage",
  data() {
    return {
      goodsCode: "", //商品编码
      goodsNameLike: "", //商品名称
      barcode: "", //	国际条码
      tableData: [],
      pageNum: 1,
      pageSize: 20,
      total: 0
    };
  },
  created() {
    this.getgoodsList(this.pageNum, this.pageSize);
  },
  methods: {
    getgoodsList(pageNum, pageSize) {
      let that = this;
      let token = sessionStorage.getItem("token");
      that
        .$axios({
          url: window.apiSuppli + "index/goods/list",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            token: token,
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            goodsCode: that.goodsCode,
            goodsNameLike: that.goodsNameLike,
            barcode: that.barcode
          })
        })
        .then(res => {
          if (res.data.code == "0000") {
            that.tableData = res.data.data.list;
            that.total = res.data.data.total;
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
    // 查询
    chaxun() {
      this.getgoodsList();
    },
    reset() {
      this.goodsCode = ""; //商品编码
      this.goodsNameLike = ""; //商品名称
      this.barcode = ""; //	国际条码
      this.getgoodsList();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getgoodsList(this.pageNum, val);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getgoodsList(val, this.pageSize);
    }
  }
};
</script>
<style scoped>
.shopManage {
  background-color: #fff;
  min-height: 647px;
  min-width: 1700px;
  box-sizing: border-box;
  height: 100%;
  box-shadow: 0px 2px 10px #ccc;
}
.store_Box1{
    position: relative;
    overflow: hidden;
    height: 634px;
}
.scrollHide{
  position: absolute;
	left: 0;
	top: 0;
	right: -17px;
	bottom: 0;
	overflow-x: hidden;
  overflow-y: scroll;
  height: 100%;
}
p {
  display: inline-block;
  width: 300px;
}
.shoporder .el-range-editor.el-input__inner {
  width: 100%;
}
.storeBox222{
  height: 150px;
}
</style>
