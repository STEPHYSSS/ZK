<template>
  <div class="purchase">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
      <el-breadcrumb-item :to="{ path: '/operatIndex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>门店单据管理</el-breadcrumb-item>
      <el-breadcrumb-item>新增强配单</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="warpper">
      <div class="left">
        <div class="left_list">
          <h4 class="title">门店列表</h4>
          <div class="search">
            <input type="text" id="txt" v-model="form.name" placeholder="请输入门店名称">
            <button type="button" class="search-btn" @click="searchbtn">查询</button>
          </div>
          <div class="searchList">
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
              @select="checkedValue"
            >
              <el-table-column type="selection" width="55" class="leftTitle"></el-table-column>
              <el-table-column label="门店编号" width="163" class="leftTitle" align="center">
                <template slot-scope="scope">{{ scope.row.code }}</template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="门店名称"
                width="163"
                show-overflow-tooltip
                class="leftTitle"
                align="center"
              ></el-table-column>
              <!-- <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column> -->
            </el-table>
          </div>
        </div>
      </div>
      <div class="right" style="width:66.6%;">
        <h4 class="title">商品列表</h4>
        <div class="shopInp">
          <div class="shopSel">
            <span class="fenlei">商品分类</span>
            <p class="shopSelect">
              <el-select
                v-model="formInline.typeLevel1"
                size="mini"
                placeholder="请选择"
                @change="choose"
              >
                <el-option
                  v-for="item in TypeLevel1"
                  :key="item.value"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </p>
            <p class="shopSelect shopSel1">
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
            </p>
            <p class="shopSelect">
              <el-select v-model="formInline.typeLevel3" size="mini" placeholder="请选择">
                <el-option
                  v-for="item in TypeLevel3"
                  :key="item.value"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </p>
            <div class="shopList">
              <span>品名</span>
              <p class="shopscan2">
                <el-input type="text" placeholder="请输入" v-model="formInline.goodsName"/>
              </p>
            </div>
          </div>
          <div class="shopInp" style="margin:20px 0">
            <div class="shopList2">
              <span>货号</span>
              <p class="shopscan2">
                <el-input type="text" placeholder="请输入" v-model="formInline.goodsCode"/>
              </p>
            </div>
            <div class="pr">
              <el-button @click="inquire">查询</el-button>
              <el-button class="reset" @click="reset">重置</el-button>
            </div>
          </div>
        </div>
        <div class="tab">
          <el-table :data="clist" style="width: 100%">
            <el-table-column align="center" prop="code" label="货号"></el-table-column>
            <el-table-column align="center" prop="name" label="品名"></el-table-column>
            <el-table-column align="center" prop="spec" label="单位"></el-table-column>
            <el-table-column align="center" prop="mutiple" label="订购倍数">
              <template slot-scope="scope">
                <input
                  type="number"
                  oninput="value=value.replace(/[^\d]/g,'')"
                  min="1"
                  max="99999"
                  class="btn99"
                  v-model="scope.row.mutiple"
                  @blur="onBlur"
                >
              </template>
            </el-table-column>
            <el-table-column align="center" prop="orderingUtil" label="基本订购单位"></el-table-column>
            <el-table-column align="center" prop="salesPrice" label="单品售价"></el-table-column>
          </el-table>
        </div>
        <div class="pl">
          <el-button @click="increased">保存</el-button>
          <el-button class="reset">
            <router-link :to="{ path: '/strongDelivery' }" tag="span">返回</router-link>
          </el-button>
        </div>
        <!-- 分页 -->
        <div style="height:50px">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[20, 40, 60, 80]"
            :page-size="formData.pageSize"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="clistTotal"
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
      currentPage: 1,
      form: {
        goodsCode: "",
        goodsNameLike: "",
        priceStatus: "",
        pageNum: 1,
        pageSize: 20,
        supplierCode: "",
        code: "",
        token: sessionStorage.getItem("token")
      },
      input: "",
      input2: "",
      tableData: [], //门店数据
      // pagesize: 2,
      pagesizes: [10, 40, 60],
      // pagenum: 1,
      // show: false,
      clist: [], // 获取到的商品信息
      clistTotal: 0,
      formData: {
        pageNum: 1,
        pageSize: 10,
        total: 400
      },
      TypeLevel1: [],
      TypeLevel2: [],
      TypeLevel3: [],
      formInline: {
        typeLevel1: "",
        typeLevel2: "",
        typeLevel3: "",
        goodsCode: "", //货号
        goodsName: "", //品名
        token: sessionStorage.getItem("token"),
        pageNum: 1,
        pageSize: 10,
        total: ""
      },
      mutiple: "",
      storeList: ""
    };
  },
  created() {
    this.getcode();
    this.getGoodsList();
    this.query();
  },
  methods: {
    searchbtn() {
      this.getcode();
    },
    handleCurrentChange(val) {
      this.formInline.pageNum = val;
      this.query();
    },
    handleSizeChange(val) {
      this.formInline.pageSize = val;
      this.query();
    },
    // 页面加载获取门店列表
    getcode() {
      this.$axios.post("/public/store/list", qs.stringify(this.form)).then(res => {
        if (res.data.code == "0000") {
          this.tableData = res.data.data.list;
        }
      });
    },
    showing(e) {
      this.form.supplierCode = e;
      this.$axios
        .post("/sys/price/supplier/goods/list", qs.stringify(this.form))
        .then(res => {
          if (res.data.code == "0000") {
            this.tableData = res.data.data.list;
            if (res.data.data.list.length > 0) {
              this.show = true;
            } else {
              this.show = false;
            }
          }
        });
    },
    //商品分类
    getGoodsList() {
      this.$axios
        .post(
          "/sys/goods/type/list",
          qs.stringify({
            pcode: "0",
            token: this.token
          })
        )
        .then(res => {
          if (res.data.code === "0000") {
            this.TypeLevel1 = res.data.data;
          }
        });
    },
    choose(value) {
      // this.formInline.typeLevel1=value
      let code = value;
      this.$axios
        .post(
          "/sys/goods/type/list",
          qs.stringify({
            pcode: code
          })
        )
        .then(res => {
          if (res.data.code === "0000") {
            this.TypeLevel2 = res.data.data;
          }
        });
    },
    choose2(value) {
      // this.formInline.typeLevel2=value
      let code = value;
      this.$axios
        .post(
          "/sys/goods/type/list",
          qs.stringify({
            pcode: code
          })
        )
        .then(res => {
          if (res.data.code === "0000") {
            this.TypeLevel3 = res.data.data;
          }
        });
    },
    inquire() {
      this.query();
    },

    handleSelectionChange() {},
    reset() {
      this.formInline.typeLevel1 = "";
      this.formInline.typeLevel2 = "";
      this.formInline.typeLevel3 = "";
      this.formInline.goodsCode = "";
      this.formInline.goodsName = "";
      this.query();
    },
    //拿到所有的商品数据
    query() {
      this.$axios
        .post("/sys/goods/list", qs.stringify(this.formInline))
        .then(res => {
          if (res.data.code === "0000") {
            //把拿到的商品存放到数组里面,分页需要tatal
            this.clistTotal = res.data.data.total;
            this.clist = res.data.data.list;
            this.clist.forEach((item, index) => {
              this.clist[index]["mutiple"] = null;
            });
          } else if (res.data.code === "6666") {
            this.$message({
              showClose: true,
              message: "token异常，请重新登录",
              type: "error"
            });
          }else return this.$message.error(res.data.msg)
        });
    },
    //勾选门店
    checkedValue(val) {
      this.storeList = [];
      for (const i of val) {
        this.storeList.push(i.code);
      }

      // return storeList
    },
    //输入框失去焦点判断
    onBlur() {
      if (0 > this.maxOrderingMultiple || this.maxOrderingMultiple > 999999) {
        this.$message.error("请输入正确的数据");
      }
    },
    // 拿到倍数和货号存起来
    increased() {
      let matchList = [];
      for (const i of this.clist) {
        if (i.mutiple) {
          matchList.push({
            goodsCode: i.code,
            multiple: i.mutiple
          });
        }
      }
      let storeList = this.storeList;

      let obj = {
        token: sessionStorage.getItem("token"),
        storeList: JSON.stringify(storeList),
        matchList: JSON.stringify(matchList)
      };
      if (matchList.length > 0 && storeList.length > 0) {
        this.$axios.post("/sys/match/add", qs.stringify(obj)).then(res => {
          if (res.data.code === "0000") {
            this.$router.push({ name: "strongDelivery" });
          } else {
            this.$message.error(res.data.msg);
          }
        });
      } else if (storeList.length==''){
        return this.$message.error('请选择门店')
      }else if(matchList.length==''){
        return this.$message.error('请选择商品')
        
      }
    }
  }
};
</script>
<style scoped>
.purchase {
  background-color: #f1f6fa;
  min-height: 647px;
  min-width: 1700px;
}
.warpper {
  display: flex;
}
.left {
  flex: 1.5;
  background-color: #fff;
  border-radius: 5px;
  margin-right: 30px;
  box-shadow: 0px 2px 10px #ccc;
}
.left_list {
  margin: 20px 20px;
}
.search {
  position: relative;
  height: 30px;
  margin-bottom: 15px;
}
.search input {
  border-radius: 0;
  border: 1px solid #01c8dc;
  width: 80%;
}
.search .search-btn {
  width: 20%;
  height: 30px;
  position: absolute;
  top: 0px;
  color: #fff;
  background-color: #01c8dc;
  border: none;
}
.el-select .el-input .el-select__caret {
  line-height: 30px;
}
.search-btn:hover {
  cursor: pointer;
  opacity: 0.7;
}
.searchList {
  border: 1px solid #c2cad8;
  padding: 5px;
  max-height: 550px;
  overflow-y: scroll;
}
.searchList table tr:last-child {
  border-bottom: none;
}
.leftTitle .el-table th {
  background-color: #fff;
}
/* 右边表格部分 */
.right {
  flex: 3;
  background-color: #fff;
  border-radius: 5px;
  min-width: 69.6%;
  padding: 15px;
  box-sizing: border-box;
  box-shadow: 0px 2px 10px #ccc;
}
.inpList {
  margin: 30px 35px 30px 40px;
}
.inpList .name {
  margin-left: 30px;
}
.inpList .el-input {
  width: 196px;
  width: 183px;
}
.inpList .el-select {
  width: 184px;
}
.btn {
  margin: 20px 4px;
  float: right;
}
.btn button {
  width: 80px;
  height: 30px;
  border: 1px solid #31b5ff;
  margin-left: 15px;
  border-radius: 5px;
}
.result {
  background: #ffffff;
  color: #31b5ff;
}
.result:hover {
  background-color: #31b5ff;
  opacity: 0.7;
  color: #fff;
}
.tab {
  clear: both;
}
.block {
  float: right;
  margin-right: 18px;
}

table {
  border-collapse: collapse;
}
table th {
  height: 35px;
}
.hove {
  border-top: 1px solid #ccd3df;
  border-bottom: 1px solid #ccd3df;
  height: 40px;
  overflow-y: scroll;
}
.hove:hover {
  background-color: #dcf9fc;
}
.title {
  color: #888;
  text-align: center;
  margin-bottom: 15px;
}
.shopSel,
.shopSta,
.shopSelect {
  display: inline-block;
}
.shopInp .shopSel {
  width: 100%;
}
.fenlei {
  margin-right: 13px;
}
/*商品分类第二个下拉选*/
.shopSel .shopSel1 {
  margin: 0 5px;
}
.shopSel .shopSelect {
  width: 20%;
}
.shopInp {
  width: 100%;
}
.shopList {
  display: inline-block;
  width: 29%;
  margin-left: 10px;
}
.shopList .shopscan {
  width: 77%;
  display: inline-block;
}
.shopList2 {
  width: 30%;
  text-align: left;
  display: inline-block;
  margin-left: auto;
}
.shopList2 .shopscan2 {
  width: 75%;
  margin-right: 9px;
  display: inline-block;
}
.shopscan2 {
  margin-left: 10px;
  display: inline-block;
  width: 80%;
}
.el-input--mini .el-input__inner {
  height: 30px;
}
.el-button {
  background-color: #01c8dc;
  color: #fff;
}
.reset {
  background-color: #fff;
  border: 1px solid #01c8dc;
  color: #01c8dc;
}
.pr {
  display: inline-block;
  text-align: right;
  width: 67%;
}
.pl {
  text-align: center;
  padding-top: 15px;
}
.btn99 {
  width: 60px;
  height: 25px;
  border: 1px solid #bbb;
  border-radius: 5px;
  outline: none;
  margin: 0 6px;
}
</style>
