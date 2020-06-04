<template>
  <div class="adjustPrice">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>价格管理</el-breadcrumb-item>
      <el-breadcrumb-item>特殊门店调价申请</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="warpper">
      <div class="left">
        <div class="left_list">
          <h2>门店列表</h2>
          <div class="search">
            <input type="text" id="txt">
            <button type="button" class="search-btn">搜索</button>
          </div>
          <div class="searchList">
            <table table-bordered width="100% ">
              <tr>
                <th>门店编号</th>
                <th>门店名称</th>
              </tr>
              <tr class="hove" v-for="item in list" :key="item.code" @click="show(item.code)">
                <td>{{item.code}}</td>
                <td>{{item.name}}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="inpList">
          <h2>商品列表</h2>
          <button class="choose2" v-if="hideShop">选择商品</button>
          <button class="choose" v-if="showShop" @click="showCount">选择商品</button>
          <!-- 商品列表开始 -->
          <div v-if="showShopList">
            <span>货号：</span>
            <el-input v-model="form.goodsCode" placeholder="请输入内容"></el-input>
            <span class="name">品名：</span>
            <el-input v-model="form.goodsNameLike" placeholder="请输入内容"></el-input>
            <div class="btn">
              <button class="seach" @click="seach">查询</button>
              <button class="result" @click="result">重置</button>
            </div>
          </div>
          <div class="tab">
            <el-table
              :data="tableData"
              border
              style="width: 100%"
              @select="handleSelectionChange"
              @select-all="handleSelectionChange"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column align="center" prop="code" label="货号"></el-table-column>
              <el-table-column align="center" prop="name" label="品名"></el-table-column>
              <el-table-column align="center" prop="unit" label="单位"></el-table-column>
              <el-table-column align="center" prop="salesPrice" label="售价"></el-table-column>
              <el-table-column
                align="center"
                prop="entryIntoForceTime"
                label="生效日期"
              >{{this.tableData.entryIntoForceTime|fmtDate2()}}</el-table-column>
              <el-table-column
                align="center"
                prop="outOfServiceTime"
                label="失效日期"
                show-overflow-tooltip
              >{{this.tableData.outOfServiceTime|fmtDate2()}}</el-table-column>
            </el-table>
            <el-button type="primary" @click="btnNext" class="seach">确定</el-button>
            <el-button type="primary" plain>返回</el-button>
          </div>
          <div class="pagesize">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[10, 20, 40]"
              :page-size="form.pageSize"
              class="page"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </div>
        <!-- 商品列表结束 -->
        <!-- 选择商品后的列表 -->
        <div v-if="chooseShopList">
          <el-table :data="multipleSelection" style="width: 100%">
            <el-table-column align="center" prop="code" label="货号"></el-table-column>
            <el-table-column align="center" prop="name" label="品名"></el-table-column>
            <el-table-column align="center" prop="unit" label="单位"></el-table-column>
            <el-table-column align="center" prop="salesPrice" label="售价">
              <template slot-scope="scope">
                <el-input v-model="scope.row.salesPrice"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="生效日期">
              <template slot-scope="scope">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="scope.row.entryIntoForceTime"
                  style="width:100px"
                ></el-date-picker>
              </template>
            </el-table-column>
            <el-table-column align="center" label="失效日期">
              <template slot-scope="scope">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="scope.row.outOfServiceTime"
                  style="width:100px"
                ></el-date-picker>
              </template>
            </el-table-column>
          </el-table>
          <el-button @click="onSubmit" type="primary">保存</el-button>
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
      checked: true,
      multipleSelection: [],
      tableData: [],
      list: [],
      storeCode: {},
      form: {
        token: sessionStorage.getItem("token"),
        pageNum: 1,
        pageSize: 20,
        storeCode: "",
        goodsCode: "",
        goodsNameLike: ""
      },
      showShopList:false,//商品列表展示
      chooseShopList:false,//选中商品列表中数据展示
      hideShop:true,
      showShop:false,
    };
  },
  created() {
    // this.setTable();
    this.getcode();
  },
  methods: {
    // result() {
    //   this.form.goodsCode = "";
    //   this.form.goodsNameLike = "";
    // },
    // handleSizeChange(val) {
    //   this.form.pageSize = val;
    //   this.show("a");
    // },
    // handleCurrentChange(val) {
    //   this.form.pageNum = val;
    //   this.show("a");
    // },
    // seach() {
    //   this.show("a");
    // },
    getcode() {
      let formData = new FormData();
      formData.append("token", sessionStorage.getItem("token"));
      this.$axios.post("/sys/store/list", formData).then(res => {
        if (res.data.code == "0000") {
          this.list = res.data.data.list;
        }
      });
    },
    // 点击门店选择一列，右边展示数据
    show(e) {
      this.hideShop = false;
      this.showShop = true;
      this.showShopList = false;
      if (e !== "a") this.form.storeCode = e;
      this.$axios
        .post("/sys/price/store/goods/list", qs.stringify(this.form))
        .then(res => {
          console.log(res);
          if (res.data.code == "0000") {
            this.total = res.data.data.size;
            this.tableData = res.data.data.list;
          }
        });
    },
    // onSubmit() {
    //   let obj = this.multipleSelection;
    //   const jianzhi = obj.map(item => {
    //     return {
    //       goodsCode: item.code,
    //       price: item.salesPrice,
    //       entryIntoForceTime: this.$moment(item.entryIntoForceTime).format(
    //         "YYYY-MM-DD"
    //       ),
    //       outOfServiceTime: this.$moment(item.outOfServiceTime).format(
    //         "YYYY-MM-DD"
    //       )
    //     };
    //   });

    //   let formData = new FormData();
    //   formData.append("token", sessionStorage.getItem("token"));
    //   formData.append("storeCode", this.storeCode.storeCode);
    //   formData.append("goodsJsonArray", JSON.stringify(jianzhi));
    //   this.$axios.post("/sys/price/store/readjust", formData).then(res => {
    //     console.log(res);
    //     if (res.data.code == "0000") {
    //     } else {
    //       this.$message(res.data.msg);
    //     }
    //   });
    // },
    // showCount() {
    //   this.show2 = 1;
    // },
    // 选择框
    // handleSelectionChange(val) {
    //   this.multipleSelection = val;
    //   console.log(val);
    // },
    // setTable() {
    //   let resdata = this.tableData;
    //   // 后台数据返回后,手动添加一个checked属性控制选中与否
    //   resdata.forEach(item => {
    //     item.checked = false;
    //   });
    // },
    // btnNext() {
    //   this.show2 = 2;
    // }
  }
};
</script>
<style scoped>
.el-input__prefix .el-input__icon {
  line-height: 30px;
}
.adjustPrice {
  background-color: #f1f6fa;
  min-height: 647px;
  min-width: 1200px;
}
.warpper {
  display: flex;
}
h2 {
  text-align: center;
  color: #888888;
  margin-bottom: 20px;
}
.left {
  flex: 1.5;
  background-color: #fff;
  border-radius: 5px;
  margin-right: 30px;
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
  border: 1px solid #c2cad8;
  padding: 5px;
  max-height: 600px;
  overflow-y: scroll;
}
.searchList table tr:last-child {
  border-bottom: none;
}
/* 右边表格部分 */
.right {
  flex: 3;
  background-color: #fff;
  border-radius: 5px;
}
.inpList {
  margin: 20px 35px 30px 40px;
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
  float: right;
  margin: 0px 4px;
}
.btn button {
  width: 80px;
  height: 30px;
  border: 1px solid #31b5ff;
  margin-left: 15px;
  border-radius: 5px;
}
.seach {
  background-color: #31b5ff;
  color: #fff;
}
.seach:hover {
  opacity: 0.7;
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
  margin: 0 35px 40px;
  clear: both;
}
.tabs {
  margin: 10px 35px 40px;
  clear: both;
}
.block {
  float: right;
  margin-right: 18px;
}

/* 点击选择商品按钮 */
.choose {
  width: 100px;
  height: 35px;
  text-align: center;
  color: #fff;
  background-color: #3acd59;
  border-radius: 5px;
  border: none;
  margin-bottom: 20px;
}
.choose:hover {
  cursor: pointer;
  opacity: 0.8;
}
.choose2{
  width: 100px;
  height: 35px;
  text-align: center;
  color: #fff;
  background-color: #888888;
  border-radius: 5px;
  border: none;
  margin-bottom: 20px;
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
.el-input--suffix .el-input__inner {
  padding-right: 0;
}
</style>













<template>
  <div class="selling">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>价格管理</el-breadcrumb-item>
      <el-breadcrumb-item>特殊门店售价管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="warpper">
      <div class="left">
        <div class="left_list">
          <!-- <input type="text"> -->
          <div class="search">
            <input type="text" id="txt" v-model="form.code" placeholder="请输入门店名称或编号">
            <button type="button" class="search-btn" @click="searchbtn">查询</button>
          </div>
          <div class="searchList">
            <el-table :data="storeList" max-height="530" style="width: 100%"
             :highlight-current-row = 'true' id = 'hiegLine' @row-click= showing>
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
               <!-- @click="showing(scope.row,scope.row.code)" -->
            </el-table>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="inpList">
          <span>货号：</span>
          <el-input v-model="form.goodsCode" placeholder="请输入内容"></el-input>
          <span class="name">品名：</span>
          <el-input v-model="form.goodsNameLike" placeholder="请输入内容"></el-input>
          <span class="name">国际条码：</span>
          <el-input v-model="form.barcode" placeholder="请输入内容"></el-input>
          <!-- <el-select v-model="form.priceStatus" size="mini" placeholder="状态">
            <el-option label="未生效" value="0"></el-option>
            <el-option label="已生效" value="1"></el-option>
          </el-select> -->
          <div class="btn">
            <button class="seach" @click="seach">查询</button>
            <button class="result" @click="chongzhi">重置</button>
          </div>
        </div>
        <div class="tab">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column align="center" prop="code" label="货号"></el-table-column>
            <el-table-column align="center" prop="name" label="品名"></el-table-column>
            <el-table-column align="center" prop="unit" label="单位"></el-table-column>
            <el-table-column align="center" prop="salesPrice" label="售价"></el-table-column>
            <el-table-column
              align="center"
              prop="entryIntoForceTime"
              label="生效日期"
            >{{this.tableData.entryIntoForceTime|fmtDate2()}}</el-table-column>
            <el-table-column
              align="center"
              prop="outOfServiceTime"
              label="失效日期"
            >{{this.tableData.outOfServiceTime|fmtDate2()}}</el-table-column>
          </el-table>
        </div>
         <div class="pagesize">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[20,40,60]"
            :page-size="pageSize"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
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
        pageSize:20,
        total: 0
      },
      tableData: [],
      pageNum: 1,
      pageSize:20,
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
      this.form.pageSize = val;
      this.$axios
        .post("/sys/price/store/goods/list", qs.stringify(this.form))
        .then(res => {
          console.log(res);
          if (res.data.code == "0000") {
            this.total=res.data.data.total
            this.tableData = res.data.data.list;
          }
        });
    },
    handleCurrentChange(val) {
      this.form.pageNum = val;
      this.$axios
        .post("/sys/price/store/goods/list", qs.stringify(this.form))
        .then(res => {
          if (res.data.code == "0000") {
            this.total=res.data.data.total
            this.tableData = res.data.data.list;
          }
        });
    },
    seach() {
      this.$axios
        .post("/sys/price/store/goods/list", qs.stringify(this.form))
        .then(res => {
          console.log(res);
          if (res.data.code == "0000") {
            this.total=res.data.data.total
            this.tableData = res.data.data.list;
          }
        });
    },
    getcode() {
      this.$axios.post("/sys/store/list", qs.stringify(this.form)).then(res => {
        console.log(res);
        if (res.data.code == "0000") {
          this.total=res.data.data.size
          this.storeList = res.data.data.list;
        }else if(res.data.code=="6666"){
            this.$message({
              showClose: true,
              message: 'token异常，请重新登录',
              type: 'error'
            });
            const timer = setTimeout(() => {
              clearTimeout(timer)
              this.$router.push({name: "login"})}, 3000)
            }
      });
      });
    },
    onSubmit() {},
    showing(e,index) {
      let sellCode = e.code;
      this.current = index;
      this.form.storeCode =sellCode;
      this.$axios
        .post("/sys/price/store/goods/list", qs.stringify(this.form))
        .then(res => {
          if (res.data.code == "0000") {
            this.tableData = res.data.data.list;
          }
        });
    },
    // 重置
    chongzhi(){
      this.form.goodsCode = '';
      this.form.goodsNameLike = '';
      this.form.priceStatus = '';
      this.form.storeCode = '';
      this.form.code = '';
    }
  }
};
</script>
<style scoped>
.selling {
  background-color: #f1f6fa;
}
.warpper {
  display: flex;
}
.active{
  background-color: skyblue;
}
.left {
  flex: 1.5;
  background-color: #fff;
  border-radius: 5px;
  margin-right: 30px;
  min-width: 300px;
}
.left_list {
  margin: 30px 20px;
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
  padding: 5px;
  max-height: 550px;
}
.searchList table tr:last-child {
  border-bottom: none;
}
/* 右边表格部分 */
.right {
  flex: 3;
  background-color: #fff;
  border-radius: 5px;
  min-width: 1066px;
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
  margin: 0px 4px;
  float: right;
}
.btn button {
  width: 80px;
  height: 30px;
  border: 1px solid #31b5ff;
  margin-left: 15px;
  border-radius: 5px;
}
.seach {
  background-color: #31b5ff;
  color: #fff;
}
.seach:hover {
  opacity: 0.7;
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
  margin: 0 35px 40px;
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
</style>

