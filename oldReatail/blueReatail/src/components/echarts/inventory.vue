<template>
  <div class="inventory minimum minWidth1600">
    <div class="inventoryBox">
      <div class="inventory_Box1">
        <div class="Block">
          <h3 class="inventory_tit">商品库存管理</h3>
          <el-row class="rowSpacing">
            <el-col :span="6">
              <div class="classify">
                <span class="textTitle70px">商品分类：</span>
                <div class="classify1">
                  <el-select
                    v-model="formInline.typeLevel1"
                    size="mini"
                    placeholder="请选择"
                    class="select1"
                    @change="choose"
                  >
                    <el-option
                      v-for="item in TypeLevel1"
                      :key="item.value"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                  <el-select
                    v-model="formInline.typeLevel2"
                    size="mini"
                    placeholder="请选择"
                    @change="choose2"
                  >
                    <el-option
                      v-for="item in TypeLevel2"
                      :key="item.value"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                  <el-select v-model="formInline.typeLevel3" size="mini" placeholder="请选择">
                    <el-option
                      v-for="item in TypeLevel3"
                      :key="item.value"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </div>
              </div>
            </el-col>
            <el-col :span="6" class="textAlignCenter">
              <div>
                <span class="textTitle textTitleR textMright">温层:</span>
                <p class="TongYiInput">
                  <el-select v-model="formInline.temperature" placeholder="请选择">
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
                <span class="textTitle textTitleR textMright">货号:</span>
                <el-input
                  type="text"
                  placeholder="请输入"
                  v-model="formInline.goodsCode"
                  class="input1"
                />
              </div>
            </el-col>
            <el-col :span="6" class="textAlignRight">
              <div>
                <span class="textTitle textTitleR">品名：</span>
                <el-input
                  type="text"
                  placeholder="请输入"
                  v-model="formInline.goodsName"
                  class="input1"
                />
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div>
                <span class="textTitle70px">国际条码：</span>
                <p class="TongYi">
                  <el-input
                    type="text"
                    placeholder="请输入"
                    v-model="formInline.barcode"
                    class="input1"
                  />
                </p>
              </div>
            </el-col>
            <el-col :span="6">
              <div></div>
            </el-col>
            <el-col :span="6">
              <div></div>
            </el-col>
            <el-col :span="6" class="colMleft50">
              <div class="textAlignRight">
                <el-button class="theBtn queryButton" @click="enter">查询</el-button>
                <el-button @click="resetForm" class="theBtn resetButton">重置</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
        <!-- <div class="invenBtn">
          <el-button class="theBtn queryButton" @click="enter">查询</el-button>
          <el-button @click="resetForm" class="theBtn resetButton">重置</el-button>
        </div>-->
      </div>
    </div>
    <div class="storeInfo">
      <div class="inventory_Box" style="padding-top: 20px;">
        <el-table :data="tableData" style="width: 100%" border max-height="600">
          <el-table-column align="center" prop="code" label="货号"></el-table-column>
          <el-table-column align="center" prop="name" label="品名"></el-table-column>
          <el-table-column align="center" prop="unit" label="单位"></el-table-column>
          <el-table-column align="center" prop="spec" label="规格"></el-table-column>
          <el-table-column align="center" prop="salesPrice" label="单品售价"></el-table-column>
          <el-table-column align="center" prop="period" label="保质期"></el-table-column>
          <el-table-column align="center" label="商品分类" width="280">
            <template
              slot-scope="scope"
            >{{scope.row.typeLevel1}}/{{scope.row.typeLevel2}}/{{scope.row.typeLevel3}}</template>
          </el-table-column>
          <el-table-column align="center" prop="temperature" label="温层"></el-table-column>
          <el-table-column align="center" prop="stock" label="当前库存"></el-table-column>
          <el-table-column align="center" prop="stockMoney" label="库存金额"></el-table-column>
          <el-table-column align="center" prop="onTheRoad" label="在途量"></el-table-column>
        </el-table>
        <div class="pagin">
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
  data() {
    return {
      formInline: {
        token: "",
        typeLevel1: "",
        typeLevel2: "",
        typeLevel3: "",
        temperature: "",
        goodsCode: "",
        goodsName: "",
        barcode: "",
        supplierCode: "",
        supplierName: ""
      },
      TypeLevel1: [], //商品类型
      TypeLevel2: [],
      TypeLevel3: [],
      tableData: [],
      options: [],
      pageNum: 1,
      pageSize: 20,
      total: 0
    };
  },
  created() {
    this.getInventory(this.pageNum);
    this.showother();
  },
  mounted() {
    // 进入页面就执行商品类型列表
    let that = this;
    let token = sessionStorage.getItem("token");
    this.$axios({
      url: window.apiUrl + "goods/type/list",
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify({
        pcode: "0",
        token: token
      })
    })
      .then(res => {
        if (res.data.code == "0000") {
          this.TypeLevel1 = res.data.data;
        }
      })
      .catch(err => {
        console.log("数据异常", err);
      });
  },
  methods: {
    getInventory(pageNum) {
      let _this = this;
      let token = sessionStorage.getItem("token");
      _this
        .$axios({
          url: window.apiStore + "stock/list",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            token: token,
            typeLevel1: this.formInline.typeLevel1,
            typeLevel2: this.formInline.typeLevel2,
            typeLevel3: this.formInline.typeLevel3,
            temperature: this.formInline.temperature,
            goodsCode: this.formInline.goodsCode,
            goodsName: this.formInline.goodsName,
            barcode: this.formInline.barcode,
            supplierCode: this.formInline.supplierCode,
            supplierName: this.formInline.supplierName,
            pageNum: this.pageNum,
            pageSize: this.pageSize
          })
        })
        .then(res => {
          if (res.data.code == "0000") {
            _this.tableData = res.data.data.list;
            _this.total = res.data.data.total;
          } else if (res.data.code == "6666") {
            _this.$message({
              showClose: true,
              message: "token异常，请重新登录",
              type: "error"
            });
            const timer = setTimeout(() => {
              clearTimeout(timer);
              _this.$router.push({ name: "login" });
            }, 3000);
          } else {
            _this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log("数据异常", err);
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getInventory(this.pageNum, val);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getInventory(val, this.pageSize);
    },
    // 温层下拉选
    showother() {
      let _this = this;
      let token = sessionStorage.getItem("token");
      let code = "goods_temperature";
      _this
        .$axios({
          url: window.apiUrl + "dictionary/list",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            token: token,
            code: code
          })
        })
        .then(res => {
          if ((res.data.code = "0000")) {
            this.options = res.data.data;
          }
        })
        .catch(err => {
          console.log("数据异常", err);
        });
    },
    choose(value) {
      this.formInline.typeLevel2 = "";
      this.formInline.typeLevel3 = "";
      this.TypeLevel3 = "";
      let token = sessionStorage.getItem("token");
      this.$axios({
        url: window.apiUrl + "goods/type/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          pcode: value,
          token: token
        })
      })
        .then(res => {
          if (res.data.code == "0000") {
            this.TypeLevel2 = res.data.data;
          }
        })
        .catch(err => {
          console.log("数据异常", err);
        });
    },
    // 下拉change事件
    choose2(value) {
      this.formInline.typeLevel3 = "";
      let token = sessionStorage.getItem("token");
      this.$axios({
        url: window.apiUrl + "goods/type/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          pcode: value,
          token: token
        })
      })
        .then(res => {
          if (res.data.code == "0000") {
            this.TypeLevel3 = res.data.data;
          }
        })
        .catch(err => {
          console.log("数据异常", err);
        });
    },
    // 查询
    enter() {
      this.getInventory();
    },
    // 重置
    resetForm() {
      (this.formInline.typeLevel1 = ""),
        (this.formInline.typeLevel2 = ""),
        (this.formInline.typeLevel3 = ""),
        (this.formInline.temperature = ""),
        (this.formInline.goodsCode = ""),
        (this.formInline.goodsName = ""),
        (this.formInline.barcode = ""),
        (this.formInline.supplierCode = ""),
        (this.formInline.supplierName = "");
      this.getInventory();
    }
  }
};
</script>
<style scoped>
.inventory {
  /* background-color: #f1f6fa; */
  min-height: 647px;
  min-width: 1200px;
}
.inventoryBox,
.storeInfo {
  margin: 0 auto;
  background: #fff;
  /* border-radius: 10px; */
}
.inventory_Box1 {
  margin-left: 20px;
  margin-right: 20px;
  padding-bottom: 30px;
}
.inventory_Box {
  padding-bottom: 30px;
}
.inventory .cit {
  width: 31%;
}
#colstyleF {
  white-space: nowrap;
}
.shop2 {
  margin: 0 4px;
}
.TongYi {
  width: 65%;
}
.sotlname {
  width: 60%;
}
.sotlname2 {
  width: 60.5%;
}
.colright {
  text-align: right;
}
.cit,
.TongYi,
.sotlname,
.sotlname2 {
  display: inline-block;
}
.inventory .el-range-editor.el-input__inner {
  width: 100%;
}
.invenBtn {
  width: 100%;
  text-align: right;
}
.but_flot {
  height: 50px;
  float: right;
  margin-top: 20px;
  margin-right: 2%;
}
.tishi {
  padding: 20px 0;
}
.zhanwei {
  display: inline-block;
  width: 21px;
}
.jianju {
  margin-right: 5px;
}
.xuan_Store_Box .tishi .xuan_tit {
  padding: 0;
}
.xuantip {
  color: #c8c8c8;
}
.xuanList {
  margin-bottom: 30px;
}
.nav {
  display: inline-Block;
  height: 50px;
  line-height: 50px;
}
.inventory_tit {
  padding-top: 20px;
  padding-bottom: 20px;
}
.first {
  margin-bottom: 30px;
}
.inquiry,
.reset {
  width: 80px;
  height: 30px;
  border: none;
  border-radius: 5px;
  float: right;
}
.reset {
  border: 1px solid #01c8dc;
  color: #01c8dc;
  background-color: #fff;
  margin-left: 20px;
  margin-right: 16px;
}
.inquiry {
  color: #fff;
  background-color: #01c8dc;
}
.inquiry:hover {
  opacity: 0.7;
  cursor: pointer;
}
.storeInfo {
  /* clear: both;
  margin-top: 30px; */
}
table,
table tr th,
table tr td {
  border: 1px solid #c6c6c6;
}
table {
  border-collapse: collapse;
}
.listTab th {
  background-color: #01c8dc;
  color: #fff;
}
.hove {
  border-top: 1px solid #ccd3df;
  border-bottom: 1px solid #ccd3df;
  height: 40px;
}
.resule {
  padding-left: 10px;
  display: inline-block;
}
.resule:hover {
  color: #01c8dc;
  cursor: pointer;
}
.hove:hover {
  background-color: #dcf9fc;
}
.addStore {
  display: inline-block;
  margin-bottom: 16px;
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
.distpicker-address-wrapper select {
  width: 245px;
}
.classify {
  width: 100%;
  height: 32px;
}
.classify1 {
  width: 300px;
  display: inline-block;
  box-sizing: border-box;
}
.classify1 .el-select {
  width: 31%;
  margin-left: 10px;
}
.classify1 .select1 {
  margin-left: 0;
}
</style>




