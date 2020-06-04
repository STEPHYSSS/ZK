<template>
  <div class="purchase">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
      <el-breadcrumb-item :to="{ path: '/operatIndex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>价格管理</el-breadcrumb-item>
      <el-breadcrumb-item>供应商进价管理</el-breadcrumb-item>
    </el-breadcrumb>-->
    <p class="store_tit marStore">供应商进价管理</p>
    <div class="warpper">
      <div class="left">
        <div class="left_list">
          <div class="search">
            <p style="width:258px">
              <el-input type="text" v-model="form.code" clearable placeholder="请输入供应商编号"></el-input>
            </p>
            <!-- <button type="button" class="search-btn" @click="searchbtn(form.code)" >查询</button> -->
            <p style="width:40px;" class="search-btn" @click="searchbtn(form.code)">
              <img src="@/images/search_icon.png" alt />
            </p>
          </div>
          <div class="searchList">
            <el-table
              :data="purchList"
              style="width: 100%"
              height="720px"
              :highlight-current-row="true"
              id="hiegLine"
              @row-click="showing"
            >
              <el-table-column label="供应商编号" align="center">
                <template scope="scope">
                  <span>{{scope.row.code}}</span>
                </template>
              </el-table-column>
              <el-table-column label="供应商名称" align="center">
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
                  <p class="purchTit">
                    <el-input v-model="form.goodsCode" placeholder="请输入"></el-input>
                  </p>
                </el-col>
                <el-col :span="7">
                  <span class="name">品名：</span>
                  <p class="purchTit">
                    <el-input v-model="form.goodsNameLike" placeholder="请输入"></el-input>
                  </p>
                </el-col>
                <el-col :span="7">
                  <span class="name">国际条码：</span>
                  <p class="purchTit">
                    <el-input v-model="form.barcode" placeholder="请输入"></el-input>
                  </p>
                </el-col>
                <el-col :span="3" style="text-align:right">
                  <el-button class="theBtn queryButton" @click="seach">查询</el-button>
                  <el-button class="theBtn resetButton" @click="chongzhi">重置</el-button>
                </el-col>
              </el-row>
            </div>
            <div class="konge"></div>
            <!-- <div class="tab"> -->
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column align="center" prop="code" label="货号"></el-table-column>
              <el-table-column align="center" prop="name" label="品名"></el-table-column>
              <el-table-column align="center" prop="barcode" label="国际条码"></el-table-column>
              <el-table-column align="center" prop="unit" label="单位"></el-table-column>
              <el-table-column align="center" prop="purchasePrice" label="进价"></el-table-column>
            </el-table>
            <!-- </div> -->
            <div class="konge"></div>
            <div class="paginStyle" v-if="show">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="form.pageNum"
                :page-sizes="[20,40,60]"
                :page-size="form.pageSize"
                background
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
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
export default {
  data() {
    return {
      form: {
        goodsCode: "",
        goodsNameLike: "",
        barcode: "",
        supplierCode: "",
        token: sessionStorage.getItem("token"),
        pageNum: 1,
        pageSize: 20
      },
      input: "",
      input2: "",
      tableData: [],
      show: false,
      purchList: [],
      total: 0
    };
  },
  created() {
    this.getcode();
  },
  methods: {
    searchbtn(val) {
      this.form.code = val;
      let pArr = {
        // 传入商品code 和token
        token: sessionStorage.getItem("token"),
        code: this.form.code
      };
      this.$axios.post("/public/supplier/list", qs.stringify(pArr)).then(res => {
        if (res.data.code === "0000") {
          this.purchList = res.data.data.list;
        }
      });
    },
    seach() {
      this.$axios
        .post("/sys/price/supplier/goods/list", qs.stringify(this.form))
        .then(res => {
          if (res.data.code == "0000") {
            this.tableData = res.data.data.list;
          }
        });
    },
    handleCurrentChange(val) {
      this.form.pageNum = val;
      this.supplieLis();
    },
    handleSizeChange(val) {
      this.form.pageSize = val;
      this.supplieLis();
    },
    getcode() {
      this.$axios
        .post(
          "/public/supplier/list",
          qs.stringify({
            token: sessionStorage.getItem("token"),
            pageSize: 9999
          })
        )
        .then(res => {
          if (res.data.code == "0000") {
            this.purchList = res.data.data.list;
          } else if (res.data.code == "6666") {
            this.$message({
              showClose: true,
              message: "token异常，请重新登录",
              type: "error"
            });
          } else {
            this.$message.error(res.data.msg);
          }
        });
    },
    showing(code) {
      this.form.supplierCode = code.code;
      this.supplieLis(this.form.pageNum, this.form.pageSize);
    },
    supplieLis(pageNum, pageSize) {
      this.$axios
        .post("/sys/price/supplier/goods/list", qs.stringify(this.form))
        .then(res => {
          if (res.data.code == "0000") {
            this.tableData = res.data.data.list;
            this.total = res.data.data.total;
            if (res.data.data.list.length > 0) {
              this.show = true;
            } else {
              this.show = false;
            }
          }
        });
    },
    // 重置
    chongzhi() {
      this.form.goodsCode = "";
      (this.form.goodsNameLike = ""), (this.form.barcode = "");
      this.supplieLis();
    }
  }
};
</script>
<style scoped>
.purchase {
  background-color: #fff;
  min-height: 647px;
  min-width: 1700px;
  box-sizing: border-box;
  box-shadow: 0px 2px 10px #ccc;
}
.warpper {
  display: flex;
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
}
.purchTit {
  width: 300px;
  display: inline-block;
}
.scollHide {
  position: relative;
  overflow: hidden;
  height: 749px;
}
.rightBox2 {
  position: absolute;
  left: 0;
  top: 0;
  right: -17px;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
