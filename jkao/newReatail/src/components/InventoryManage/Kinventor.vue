<template>
  <div class="KinventorManager">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
      <el-breadcrumb-item :to="{ path: '/operatIndex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>库存管理</el-breadcrumb-item>
    </el-breadcrumb>-->
    <div class="warpper">
      <div class="left">
        <div class="left_list">
          <h3 class="same">门店列表</h3>
          <div class="searchList">
            <el-table
              :data="storeList"
              height="720px"
              style="width: 100%"
              :highlight-current-row="true"
              id="hiegLine"
              @row-click="stockCode"
            >
              <el-table-column label="门店编号" align="center">
                <template scope="scope">
                  <span>{{scope.row.code}}</span>
                </template>
              </el-table-column>
              <el-table-column label="门店名称" align="center">
                <template scope="scope">
                  <span>{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <!-- @click="stock(scope.row,scope.row.code)" -->
            </el-table>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="scollhide">
          <div class="tab">
            <div class="shopList">
              <h3 class="same1">商品列表</h3>
              <div class="timer">
                <span>时间：</span>
                <p>
                  <el-date-picker
                    @change="change1"
                    v-model="time"
                    type="date"
                    :editable="false"
                    placeholder="选择日期"
                    @input="choosetime"
                    :picker-options="pickerOptions0"
                  ></el-date-picker>
                </p>
              </div>
            </div>
            <el-table :data="shopList" style="width: 100%">
              <el-table-column prop="goodsCode" label="货号" align="center"></el-table-column>
              <el-table-column prop="goodsName" label="商品名称" align="center"></el-table-column>
              <el-table-column prop="spec" label="规格" align="center"></el-table-column>
              <el-table-column prop="unit" label="单位" align="center"></el-table-column>
              <el-table-column prop="stock" label="库存量" align="center"></el-table-column>
            </el-table>
            <div class="konge"></div>
            <!-- 分页 -->
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
import { debuglog } from "util";
export default {
  data() {
    return {
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6; //如果没有后面的-8.64e6就是不可以选择今天的
        }
      },
      ruleForm: {
        province: "",
        city: "",
        area: "",
        code: "",
        name: "",
        pageNum: 1,
        pageSize: 999999999
      },
      inProvince: [], //下拉遍历省
      inCity: [], //下拉遍历市
      inArea: [], //下拉遍历区
      time: "",
      pageNum: 1,
      pageSize: 20,
      total: 0,
      shopList: [], //商品列表
      storeList: [], //门店列表
      storeCode: ""
    };
  },
  mounted() {
    // 进入页面就执行城市列表
    let that = this;
    that.$axios
      .post(`${window.apiUrl}city/list`)
      .then(res => {
        if (res.data.code == "0000") {
          that.inProvince = res.data.data;
        }
      })
      .catch(err => {
        console.log("数据异常", err);
      });
  },
  created() {
    this.getStoreList();
    this.getdatatime();
  },
  methods: {
    getdatatime() {
      // this.time = new Date();
    },
    getStoreList() {
      this.$axios({
        url: window.baseUrl + "public/store/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: sessionStorage.getItem("token"),
          province: this.ruleForm.province,
          city: this.ruleForm.city,
          area: this.ruleForm.area,
          name: this.ruleForm.name,
          code: this.ruleForm.code,
          pageSize: this.ruleForm.pageSize,
          pageNum: this.ruleForm.pageNum
        })
      })
        .then(res => {
          if (res.data.code == "0000") {
            this.storeList = res.data.data.list;
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
        .catch(err => {
          console.log("数据异常", err);
        });
    },
    // 点击左侧展示数据在右侧
    stockCode(code) {
      this.time = new Date();
      this.storeCode = code.code;
      this.getShopList();
    },
    change1(e) {
      this.time = this.$moment(e).format("YYYY-MM-DD");
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getShopList(this.pageNum, val);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getShopList(val, this.pageSize);
    },
    getShopList(code) {
      this.$axios({
        url: window.apiUrl + "stock/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: sessionStorage.getItem("token"),
          storeCode: this.storeCode,
          time: this.time,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
      })
        .then(res => {
          if (res.data.code == "0000") {
            this.shopList = res.data.data.list;
            this.total = res.data.data.total;
          } else if (res.data.code === "1010") {
            this.$message.error("请选择门店");
          }
        })
        .catch(err => {
          console.log("数据异常", err);
        });
    },
    // 查询重置
    seach() {
      this.getStoreList();
    },
    result() {
      this.ruleForm.province = "";
      this.ruleForm.city = "";
      this.ruleForm.area = "";
      this.ruleForm.code = "";
      this.ruleForm.name = "";
      this.getStoreList();
    },
    choosetime(time) {
      this.getShopList();
    },
    // 城市列表
    chooseProvince(value) {
      for (const key in this.inProvince) {
        if (this.inProvince[key].id == value)
          this.ruleForm.province = this.inProvince[key].name;
      }
      this.ruleForm.city = "";
      this.ruleForm.area = "";
      this.inArea = [];
      this.$axios({
        url: window.apiUrl + "city/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          pid: value
        })
      })
        .then(res => {
          if (res.data.code == "0000") {
            this.inCity = res.data.data;
          }
        })
        .catch(err => {
          console.log("数据异常", err);
        });
    },
    // 市下拉change事件
    chooseCity(value) {
      for (const key in this.inCity) {
        if (this.inCity[key].id == value)
          this.ruleForm.city = this.inCity[key].name;
      }
      this.ruleForm.area = "";
      this.$axios({
        url: window.apiUrl + "city/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          pid: value
        })
      })
        .then(res => {
          if (res.data.code == "0000") {
            this.inArea = res.data.data;
          }
        })
        .catch(err => {
          console.log("数据异常", err);
        });
    },
    chooseArea(value) {
      for (const key in this.inArea) {
        if (this.inArea[key].id == value)
          this.ruleForm.area = this.inArea[key].name;
      }
    }
  }
};
</script>
<style scoped>
.KinventorManager {
  background-color: #fff;
  height: 100%;
  min-height: 647px;
  min-width: 1700px;
}
.inverBox {
  margin-bottom: 20px;
  height: 150px;
  background-color: #fff;
  border-radius: 10px;
}
.manger {
  margin: 0 20px;
  line-height: 38px;
}
.kmanager {
  margin-bottom: 0px;
  padding-bottom: 0px;
}
.inverBox .el-select {
  width: 176px;
  margin: 0 3px;
}
.inverBox .el-input {
  width: 222px;
}
.inleft {
  text-align: left;
}
.warpper {
  display: flex;
  clear: both;
}
.left {
  width: 300px;
  background-color: #fff;
  box-sizing: border-box;
}
.search {
  position: relative;
  height: 30px;
  margin-bottom: 15px;
}
.search input {
  border-radius: 0;
  width: 80%;
}
.search .search-btn {
  width: 20%;
  height: 30px;
  position: absolute;
  top: 0px;
  color: #fff;
  background-color: #31b5ff;
  border: none;
}
.search-btn:hover {
  cursor: pointer;
  opacity: 0.7;
}
.searchList {
  border: 1px solid #ccc;
  border-top: none;
}
.searchList table tr:last-child {
  border-bottom: none;
}
/* 右边表格部分 */
.right {
  flex: 1;
  background-color: #fff;
  border-radius: 5px;
}
.btn {
  margin: 20px 10px;
  float: right;
}
.btn button {
  width: 80px;
  height: 30px;
  border: 1px solid #01c8dc;
  margin-right: 18px;
  border-radius: 5px;
}
.seach {
  background-color: #01c8dc;
  color: #fff;
}
.seach:hover {
  opacity: 0.7;
}
.result {
  background: #ffffff;
  color: #01c8dc;
}
.result:hover {
  background-color: #01c8dc;
  opacity: 0.7;
  color: #fff;
}
.block {
  float: right;
  margin-right: 18px;
}
.same,
.same1 {
  font-size: 14px;
  border-left: 3px solid #e6000b;
  padding-left: 8px;
  color: #888888;
  margin-bottom: 0;
  padding-bottom: 0;
}
.same {
  margin: 23px 0;
}
.left_list {
  margin-left: 20px;
}
.KinventorManager .shopList {
  margin-top: 9px;
}
.shopList .same1,
.shopList p,
.timer p {
  display: inline-block;
  margin: 15px auto;
}
.shopList .timer .el-input__icon {
  line-height: 0px;
}
.timer {
  float: right;
}

.hove {
  border-top: 1px solid #ccd3df;
  border-bottom: 1px solid #ccd3df;
  height: 40px;
  overflow-y: scroll;
}
.hove:hover {
  background-color: #dcf9fc;
  cursor: pointer;
}
.stomen {
  width: 22%;
}
.KinventorManager .el-input__icon {
  line-height: 30px;
}
.el-date-editor.el-input {
  width: 100%;
}
.KinventorManager .el-table__body,
.el-table__footer,
.el-table__header {
  width: 100% !important;
}
.paginStyle {
  height: 50px;
  text-align: right;
}
.scollhide{
  position: relative;
  overflow: hidden;
  height: 700px;
}
.scollhide .tab{
  position: absolute;
	left: 0;
	top: 0;
	right: -40px;
	bottom: 0;
	overflow-x: hidden;
  overflow-y: scroll;
  margin: 0 25px;
  clear: both;
  box-sizing: border-box;
}
</style>
