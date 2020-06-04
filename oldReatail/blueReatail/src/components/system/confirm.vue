<template>
  <div class="confirm">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
      <el-breadcrumb-item :to="{ path: '/suppIndex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item >采购单管理</el-breadcrumb-item>
      <el-breadcrumb-item >确认配送</el-breadcrumb-item>
    </el-breadcrumb>-->
    <img src="@/assets/Rbutton.png" @click="goback" class="CouponbtnbackC"/>
    <div class="storeBox">
      <div class="store_Box">
        <p class="store_tit">采购单确认配送</p>
        <el-row style="white-space: nowrap;">
          <el-col :span="6">
            <span>货号：</span>
            <p>
              <el-input type="text" placeholder="请输入" v-model="ruleForm.goodsCode"></el-input>
            </p>
          </el-col>
          <el-col :span="6" class="TongCenter">
            <span>国际条码：</span>
            <p>
              <el-input type="text" placeholder="请输入" v-model="ruleForm.barcode"></el-input>
            </p>
          </el-col>
          <el-col :span="6" class="TongRight">
            <span>品名：</span>
            <p>
              <el-input type="text" placeholder="请输入" v-model="ruleForm.goodsName"></el-input>
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
        <div class="scollHide">
          <div class="divs"><el-button class="AllquedingBtn" @click="determne">确认配送</el-button></div>
          <el-table :data="tableData" stripe style="width: 100%" border>
            <el-table-column prop="code" label="货号" align="center"></el-table-column>
            <el-table-column prop="barcode" label="国际条码" align="center"></el-table-column>
            <el-table-column prop="name" label="品名" align="center"></el-table-column>
            <el-table-column prop="spec" label="规格" align="center"></el-table-column>
            <el-table-column prop="unit" label="单位" align="center"></el-table-column>
            <el-table-column prop="purchasePrice" label="商品进价" align="center"></el-table-column>
            <el-table-column label="保质期" align="center">
              <template scope="scope">
                <span>{{scope.row.period}}{{scope.row.periodUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="temperature" label="温层" align="center"></el-table-column>
            <el-table-column prop="purchaseCount" label="订购总数" align="center"></el-table-column>
            <el-table-column prop="purchaseAmount" label="订购总金额" align="center"></el-table-column>
            <el-table-column prop="purchaseCount" label="库存数量" align="center"></el-table-column>
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
  data() {
    return {
      tableData: [],
      ruleForm: {
        goodsCode: "",
        barcode: "",
        goodsName: "",
        token: sessionStorage.getItem("token"),
        purchaseCode: sessionStorage.getItem("purchaseCode")
      },
      pageNum: 1,
      pageSize: 20,
      total: 0
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    handleSizeChange(val) {
      this.pageNum = val;
      this.getlist();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getlist();
    },
    submitForm() {
      this.getlist();
    },
    getlist() {
      this.$axios
        .post(
          "/supplier/purchase/delivery/list",
          qs.stringify({
            token: sessionStorage.getItem("token"),
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            goodsCode: this.ruleForm.goodsCode,
            barcode: this.ruleForm.barcode,
            goodsName: this.ruleForm.goodsName,
            purchaseCode: this.ruleForm.purchaseCode
          })
        )
        .then(res => {
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
    determne() {
      var codelist = [];
      codelist.token = sessionStorage.getItem("token");
      codelist.purchaseCode = sessionStorage.getItem("purchaseCode");
      let formData = new FormData();
      const obj = codelist;
      Object.keys(obj).forEach(key => {
        formData.append(key, obj[key]);
      });
      this.$axios.post("/supplier/purchase/delivery", formData).then(res => {
        if (res.data.code == "0000") {
          this.$message({
            type: "success",
            message: "配送成功"
          });
          this.$router.push({ name: "shoporder" });
        } else {
          this.$message("操作失败");
        }
      });
    },
    // 查询，重置
    chaxun() {
      this.getlist();
    },
    reset() {
      this.ruleForm.goodsCode = "";
      this.ruleForm.goodsName = "";
      this.ruleForm.barcode = "";
      this.getlist();
    },
    goback() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.confirm {
  background-color: #f1f6fa;
  min-height: 647px;
  min-width: 1700px;
  height: 100%;
}
.store_Box1 {
  position: relative;
  overflow: hidden;
  height: 690px;
}
.storeBox {
  height: 150px;
}
.scollHide {
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
.shoporder .el-select {
  width: 100%;
}
.CouponbtnbackC{
  text-decoration: none;
  float: right;
  margin-right: 20px;
  margin-top: 17px;
  cursor: pointer;
}
.chaxunBtn {
  background-color: #434444;
  height: 32px;
  border-radius: 5px;
  line-height: 10px;
  width: auto;
  color: #fff;
  border: none;
}
.chaxunBtn:hover {
  cursor: pointer;
}
.divs{
  text-align: right;
  margin: 0 0px 20px 0;
}
.storeInfo{
  max-height: 90%;
}
</style>
