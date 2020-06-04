<template>
  <div class="selling">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
      <el-breadcrumb-item :to="{ path: '/operatIndex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>价格管理</el-breadcrumb-item>
      <el-breadcrumb-item>特殊门店售价管理</el-breadcrumb-item>
    </el-breadcrumb>-->
    <p class="store_tit marStore">特殊门店售价管理</p>
    <div id="warpper">
      <div class="left">
        <div class="left_list">
          <!-- <input type="text"> -->
          <div class="search">
            <p style="width:258px">
              <el-input type="text" clearable v-model="form.code" placeholder="请输入门店编号"></el-input>
            </p>
            <!-- <button type="button" class="search-btn" @click="searchbtn">查询</button> -->
            <p style="width:40px;" class="search-btn" @click="searchbtn(form.code)">
              <img src="@/images/search_icon.png" alt />
            </p>
          </div>
          <div class="searchList">
            <el-table
              :data="storeList"
              height="720"
              style="width: 100%"
              :highlight-current-row="true"
              id="hiegLine"
              @row-click="showing"
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
            </el-table>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="scollHide">
          <div class="rightBox2">
            <div class="inpList">
              <el-row>
                <el-col :span="7">
                  <span>货号：</span>
                  <p class="sellTit">
                    <el-input v-model="shopList.goodsCode" placeholder="请输入"></el-input>
                  </p>
                </el-col>
                <el-col :span="7">
                  <span class="name">品名：</span>
                  <p class="sellTit">
                    <el-input v-model="shopList.goodsNameLike" placeholder="请输入"></el-input>
                  </p>
                </el-col>
                <el-col :span="7">
                  <span class="name">国际条码：</span>
                  <p class="sellTit">
                    <el-input v-model="shopList.barcode" placeholder="请输入" />
                  </p>
                </el-col>
                <el-col :span="3" style="text-align:right">
                  <el-button class="theBtn queryButton" @click="seach">查询</el-button>
                  <el-button @click="chongzhi" class="theBtn resetButton">重置</el-button>
                </el-col>
              </el-row>
            </div>
            <div class="konge"></div>
            <!-- <div class="tab"> -->
              <el-table :data="tableData" style="width: 100%" border>
                <el-table-column align="center" prop="code" label="货号"></el-table-column>
                <el-table-column align="center" prop="name" label="品名"></el-table-column>
                <el-table-column align="center" prop="unit" label="单位"></el-table-column>
                <el-table-column align="center" prop="salesPrice" label="售价"></el-table-column>
                <el-table-column align="center" label="生效日期">
                  <template
                    scope="scope"
                  >{{scope.row.entryIntoForceTime | converTime('YYYY-MM-DD')}}</template>
                </el-table-column>
                <el-table-column align="center" label="失效日期">
                  <template scope="scope">
                    <span
                      v-if="scope.row.outOfServiceTime != null"
                    >{{scope.row.outOfServiceTime | converTime('YYYY-MM-DD')}}</span>
                  </template>
                </el-table-column>
              </el-table>
            <!-- </div> -->
            <div class="konge"></div>
            <div class="paginStyle">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="shopList.pageNum"
                :page-sizes="[20,40,60]"
                :page-size="shopList.pageSize"
                background
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
              ></el-pagination>
            </div>
            <div class="konge"></div>
          </div>
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
      storeList: [],
      input: "",
      input2: "",
      form: {
        goodsCode: "",
        goodsNameLike: "",
        barcode: "",
        storeCode: "",
        code: "",
        token: sessionStorage.getItem("token"),
        pageNum: 1,
        pageSize: 9999999
      },
      shopList: {
        token: sessionStorage.getItem("token"),
        pageNum: 1,
        pageSize: 20,
        storeCode: "",
        priceStatus: "",
        goodsCode: "",
        goodsNameLike: ""
      },
      tableData: [],
      total: 0
    };
  },
  created() {
    this.getcode();
  },
  methods: {
    searchbtn() {
      this.getcode();
    },
    handleSizeChange(val) {
      this.shopList.pageSize = val;
      this.goodsPriceList();
    },
    handleCurrentChange(val) {
      this.shopList.pageNum = val;
      this.goodsPriceList();
    },
    seach() {
      this.goodsPriceList();
    },
    getcode() {
      this.$axios.post("/public/store/list", qs.stringify(this.form)).then(res => {
        if (res.data.code == "0000") {
          this.storeList = res.data.data.list;
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
    onSubmit() {},
    showing(e, index) {
      this.shopList.storeCode = e.code;
      this.goodsPriceList();
    },
    goodsPriceList() {
      this.$axios
        .post("/sys/price/store/goods/list", qs.stringify(this.shopList))
        .then(res => {
          if (res.data.code == "0000") {
            this.total = res.data.data.total;
            this.tableData = res.data.data.list;
          }
        });
    },
    // 重置
    chongzhi() {
      this.shopList.goodsCode = "";
      (this.shopList.goodsNameLike = ""), (this.shopList.barcode = "");
      this.goodsPriceList();
    }
  }
};
</script>
<style scoped>
.selling {
  background-color: #fff;
  min-width: 1700px;
  box-sizing: border-box;
  box-shadow: 0px 2px 10px #ccc;
}
#warpper {
  display: flex;
}
.active {
  background-color: skyblue;
}
.marStore {
  margin-left: 20px;
}
.left {
  width: 300px;
  background-color: #fff;
  border-radius: 5px;
  margin: 0 20px;
}
.left_list {
  border: 1px solid #c2c8de;
  margin-bottom: 20px;
}
.search {
  position: relative;
  height: 30px;
}
.search .search-btn {
  position: absolute;
  top: 0px;
  right: 0;
  color: #fff;
  border: none;
}
.search .el-input {
  height: 32px;
}

.el-select .el-input .el-select__caret {
  line-height: 32px;
}
.search-btn:hover {
  cursor: pointer;
  opacity: 0.7;
}
.searchList {
  min-height: 100%;
}
.searchList table tr:last-child {
  border-bottom: none;
}
/* 右边表格部分 */
.right {
  width: 1404px;
  height: 100%;
  max-height: 740px;
}
.right .rightBox2 {
  height: 100%;
}
.sellTit {
  width: 300px;
  display: inline-block;
}
.scollHide{
  position: relative;
  overflow: hidden;
  height: 749px;
}
.rightBox2{
  position: absolute;
	left: 0;
	top: 0;
	right: -17px;
	bottom: 0;
	overflow-x: hidden;
	overflow-y: scroll;
}
</style>
