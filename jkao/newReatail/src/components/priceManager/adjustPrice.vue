<template>
  <div class="adjustPrice">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
      <el-breadcrumb-item :to="{ path: '/operatIndex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>价格管理</el-breadcrumb-item>
      <el-breadcrumb-item>特殊门店调价申请</el-breadcrumb-item>
    </el-breadcrumb> -->
    <div id="warpper">
      <div class="left">
        <div style="display:inline-block" class="hw">
          <h2>门店列表</h2>
        </div>
        <div class="left_list">
          
          <div class="search">
            <p style="width:258px">
              <el-input type="text" clearable v-model="code" placeholder="请输入门店编号"></el-input>
            </p>
            <!-- <button type="button" class="search-btn" @click="seach1">查询</button> -->
            <p style="width:40px;" class="search-btn" @click="seach1">
              <img src="@/images/search_icon.png" alt />
            </p>
          </div>
          <div class="searchList">
            <el-table
              :data="storeList"
              height="720px"
              style="width: 100%"
              :highlight-current-row="true"
              id="hiegLine"
              @row-click="show"
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
        <div class="inpList">
          <h2 class="hw">商品列表</h2>
          <button class="choose2" v-if="hideShop">选择商品</button>
          <button class="choose" v-if="showShop" @click="chooseshop">选择商品</button>

          <el-dialog title="选择商品" :visible.sync="dialogTableVisible"  width="60%">
            <!-- 商品列表开始 -->
            <div id="adjustBox">
              <span>货号：</span>
              <el-input v-model="goodsForm.goodsCode" placeholder="请输入内容"></el-input>
              <span class="name">品名：</span>
              <el-input v-model="goodsForm.goodsName" placeholder="请输入内容"></el-input>
              <div class="adjustBtn">
                <el-button class="theBtn queryButton" @click="seach2">查询</el-button>
                <el-button class="theBtn resetButton" @click="result">重置</el-button>
              </div>
              <div class="konge"></div>
              <div class="tab">
                <el-table
                  :data="tableData"
                  height="290"
                  style="width: 100%"
                  @select="handleSelectionChange"
                  @select-all="handleSelectionChange"
                  :row-key="getGoodsCode"
                >
                  <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
                  <el-table-column align="center" prop="code" label="货号"></el-table-column>
                  <el-table-column align="center" prop="name" label="品名"></el-table-column>
                  <el-table-column align="center" prop="unit" label="单位"></el-table-column>
                  <el-table-column align="center" prop="salesPrice" label="单品售价"></el-table-column>
                </el-table>
                <div class="konge"></div>
                 <div class="paginStyle">
                <el-pagination
                  background
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="pageNum"
                  :page-sizes="[20,40,60]"
                  :page-size="pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total"
                ></el-pagination>
              </div>
                <div class="BtnCen">
                  <el-button class="theBtn queryButton" @click="queding">确定</el-button>
                  <el-button class="theBtn resetButton" @click="back">返回</el-button>
                </div>
              </div>
            </div>
          </el-dialog>
        </div>
        <!-- 商品列表结束 -->
        <!-- 选择商品后的列表 -->
        <div v-if="chooseShopList">
          <div class="tabcheck">
            <el-table :data="multipleSelection" style="width: 100%">
              <el-table-column align="center" prop="code" label="货号"></el-table-column>
              <el-table-column align="center" prop="name" label="品名"></el-table-column>
              <el-table-column align="center" prop="unit" label="单位"></el-table-column>
              <el-table-column align="center" label="售价" width="100">
                <template slot-scope="scope">
                  <div>
                    <el-input v-model="scope.row.salesPrice"></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="center" label="生效日期" width="180">
                <template slot-scope="scope">
                  <div>
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="scope.row.entryIntoForceTime"
                      style="width:100%"
                    ></el-date-picker>
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="center" label="失效日期" width="180">
                <template slot-scope="scope">
                  <div>
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="scope.row.outOfServiceTime"
                      style="width:100%"
                    ></el-date-picker>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="konge"></div>
            <div class="BtnCen">
              <el-button class="theBtn queryButton" @click="baocun">保存</el-button>
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
      checked: true,
      code:'',
      multipleSelection: [],
      tableData: [],
      // storeCode: {},
      goodsForm: {
        token: sessionStorage.getItem("token"),
        pageNum: 1,
        pageSize: 20,
        total: 0,
        goodsCode: "",
        goodsName: ""
      },
      storeList: [], //门店列表展示
      showShopList: false, //商品列表展示
      chooseShopList: false, //选中商品列表中数据展示
      hideShop: true,
      showShop: false,
      pageNum: 1,
      pageSize: 20,
      total: 0,
      dialogTableVisible: false
    };
  },
  created() {
    this.setTable();
    this.getcode();
    this.goodList();
  },
  methods: {
    chooseshop() {
      this.dialogTableVisible = true;
    },
    // 展示门店列表
    getcode() {
      this.$axios({
        url: window.baseUrl + "public/store/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: sessionStorage.getItem("token"),
          code:this.code,
          pageSize: 400
        })
      }).then(res => {
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
        }else{
          this.$message.error(res.data.msg);
        }
      });
    },
    // 查询
    seach1() {
      this.getcode();
    },
    // 点击门店选择一列，右边展示数据
    show(e) {
      let rowCode = e.code;
      sessionStorage.setItem("CstoCode", rowCode); //存储门店的code，保存时用
      this.hideShop = false;
      this.showShop = true;
      // this.showShopList = true; //右边显示的数据
      this.chooseShopList = false;
      // this.goodList();
    },
    // 商品列表
    goodList() {
      this.$axios
        .post("/sys/goods/list", qs.stringify(this.goodsForm))
        .then(res => {
          if (res.data.code == "0000") {
            this.total = res.data.data.total;
            this.tableData = res.data.data.list;
          }
        });
    },
    //商品列表分页
    handleSizeChange(val) {
      this.form.pageSize = val;
      this.goodList(this.pageNum, val);
    },
    handleCurrentChange(val) {
      this.form.pageNum = val;
      this.goodList(val, this.pageSize);
    },
    getGoodsCode(row){
      return row.code
    },
    // 商品列表查询、重置
    seach2() {
      this.goodList();
    },
    result() {
      this.goodsForm.goodsCode = "";
      this.goodsForm.goodsName = "";
      this.goodList();
    },
    back(){
      this.dialogTableVisible = false;
    },
    // 选择框
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    setTable() {
      let resdata = this.tableData;
      // 后台数据返回后,手动添加一个checked属性控制选中与否
      resdata.forEach(item => {
        item.checked = false;
      });
    },
    // 选择商品列表中的数据保存
    queding() {
      this.chooseShopList = true;
      this.showShopList = false;
      this.dialogTableVisible = false;
    },
    // 保存
    baocun() {
      let obj = this.multipleSelection;
      const jianzhi = obj.map(item => {
        return {
          goodsCode: item.code,
          price: item.salesPrice,
          entryIntoForceTime: this.$moment(item.entryIntoForceTime).format(
            "YYYY-MM-DD"
          ),
          outOfServiceTime: this.$moment(item.outOfServiceTime).format(
            "YYYY-MM-DD"
          )
        };
      });

      let formData = new FormData();
      formData.append("token", sessionStorage.getItem("token"));
      formData.append("storeCode", sessionStorage.getItem("CstoCode"));
      formData.append("goodsJsonArray", JSON.stringify(jianzhi));
      this.$axios.post("/sys/price/store/readjust", formData).then(res => {
        if (res.data.code == "0000") {
          this.$router.push({
            name: "selling"
          });
        } else if(res.data.code=="6666"){
            this.$message({
            showClose: true,
            message: 'token异常，请重新登录',
            type: 'error'
        });
        const timer = setTimeout(() => {
            clearTimeout(timer)
            this.$router.push({name: "login"})}, 3000)
        }else{
            this.$message.error(res.data.msg);
        }
      });
    }
  }
};
</script>
<style scoped>
.el-input__prefix .el-input__icon {
  line-height: 30px;
}
.adjustPrice {
  background-color: #fff;
  min-height: 647px;
  min-width: 1700px;
}
#warpper {
  display: flex;
}
.hw{
      margin: 20px 0;
    text-align: center;

}

.searchList table tr:last-child {
  border-bottom: none;
}
/* 右边表格部分 */
/* .right {
  width: 66%;
  background-color: #fff;
  border-radius: 5px;
} */
/* .inpList {
  margin: 20px 35px 14px 16px;
  white-space:nowrap;
}
.inpList .name {
  margin-left: 30px;
}
.inpList .el-select {
  width: 184px;
}*/
.inpList .name {
  margin-left: 30px;
}
#adjustBox{
  position: relative;
}
#adjustBox .el-input{
  width: 196px;
}
.adjustBtn {
  display: inline-block;
  position: absolute;
  top: -14px;
  right: 0;
} 
.seach {
  background-color: #01c8dc;
  color: #fff;
}
.seach:hover {
  opacity: 0.7;
}
.result {
  background-color: #fff;
  border: 1px solid #01c8dc;
  color: #01c8dc;
}
.result:hover {
  background-color: #01c8dc;
  opacity: 0.7;
  color: #fff;
}
.tab {
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
.paginStyle {
    height: 50px;
    text-align: right;
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
.choose2 {
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
.BtnCen {
  text-align: right;
}
/* .tabcheck {
  width: 97%;
  margin: 0 auto;
} */
</style>