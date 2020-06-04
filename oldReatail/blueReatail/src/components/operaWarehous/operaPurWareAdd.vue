<template>
  <!-- <div class="operaPurWareAdd">
         <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
            <el-breadcrumb-item :to="{ path: '/operatIndex' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item >采购入库</el-breadcrumb-item>
            <el-breadcrumb-item >新增</el-breadcrumb-item>
  </el-breadcrumb>-->
  <div class="storehousebox">
    <div class="storehouse_box">
      <h3 class="demonstration">新增</h3>
      <div class="block">
        <el-button class="chaxunBtn BtnColor" @click="SelectionArea">选择仓库</el-button>
        <el-button class="chongzhiBtn" @click="SelectSupp">选择供应商</el-button>
        <el-button class="chongzhiBtn" @click="SelectionGoods">选择商品</el-button>
        <p class="colo" v-show="hideK">选择仓库：{{AreaCode.name}}</p>
        <p class="colo" v-show="hideSup">选择供应商：{{suppOnlyRow.name}}</p>
        <div class="konge"></div>
        <!-- 选择之后的列表 -->
        <el-table :data="goodsSet" style="width: 100%;" v-show="hideG" border>
          <el-table-column prop="code" label="货号" align="center"></el-table-column>
          <el-table-column prop="name" label="品名" align="center"></el-table-column>
          <el-table-column prop="salesPrice" label="单品售价" align="center"></el-table-column>
          <el-table-column prop="count" label="入库数量" align="center">
            <template scope="scope">
              <p>
                <el-input
                  type="text"
                  oninput="value=value.replace(/[^\d]/g,'')"
                  v-model="scope.row.count"
                ></el-input>
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="unit" label="单位" align="center"></el-table-column>
          <el-table-column prop="spec" label="规格" align="center"></el-table-column>
          <el-table-column label="保质期" align="center">
            <template slot-scope="scope">{{scope.row.period}}{{scope.row.periodUnit}}</template>
          </el-table-column>
          <el-table-column prop="temperature" label="温层" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template scope="scope">
              <span class="codesty" @click="delRetuen(scope.$index,scope.row)">删除</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="konge"></div>
        <div class="hideBtn" v-if="this.AreaCode !='' && this.goodsSet !=''">
          <el-button type="primary" class="AllquedingBtn" @click="submitForm">确定</el-button>
          <el-button class="theBtn resetButton" @click="resetForm">返回</el-button>
        </div>
        <!-- 选择仓库弹窗 -->
        <el-dialog title="选择入库仓库" :visible.sync="dialogVisible" width="800px">
          <div class="wrapperKu">
            <div class="soList">
              <div class="sotl sotl2">
                <span>仓库名称：</span>
                <p class="sotlname">
                  <el-input type="text" placeholder="请输入" v-model="name"></el-input>
                </p>
              </div>
              <div class="diaFloat">
                <el-button class="theBtn queryButton" @click="chaxun">查询</el-button>
                <el-button class="theBtn resetButton" @click="reseting">重置</el-button>
              </div>
            </div>
            <div class="konge"></div>
            <el-table
              :data="DeoptionList"
              style="width: 100%;"
              border
              id="hiegLine"
              @row-click="CAreaCode"
            >
              <el-table-column width="55" align="center">
                <template slot-scope="scope">
                  <el-radio-group v-model="radioList">
                    <el-radio :label="scope.row.code" @change="changeRadio(scope.row.code)">1</el-radio>
                  </el-radio-group>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="仓库名称" align="center"></el-table-column>
              <el-table-column label="所在区域" align="center">
                <template scope="scope">{{scope.row.province}}-{{scope.row.city}}-{{scope.row.area}}</template>
              </el-table-column>
              <el-table-column prop="address" label="详细地址" align="center"></el-table-column>
            </el-table>
            <div class="konge"></div>
            <div class="pageFenye">
              <div class="PromotBtn">
                <el-button class="AllquedingBtn" @click="nextclick()">确定</el-button>
                <el-button class="theBtn resetButton" @click="dialogVisible = false">取消</el-button>
              </div>
              <el-pagination
                @size-change="handleSizeChange2"
                @current-change="handleCurrentChange2"
                :current-page="pageNum2"
                :page-sizes="[20, 40, 60]"
                :page-size="pageSize2"
                background
                layout="total, sizes, prev, pager, next, jumper"
                :total="total2"
                class="pagination"
              ></el-pagination>
            </div>
          </div>
        </el-dialog>
        <!-- 选择商品弹窗 -->
        <el-dialog title="选择商品" :visible.sync="dialogVisible2" width="800px">
          <div class="choosestore">
            <el-row style="white-space: nowrap;">
              <el-col :span="10">
                <span>商品分类：</span>
                <p class="widOne">
                  <el-select v-model="typeLevel1" size="mini" placeholder="请选择" @change="choose">
                    <el-option
                      v-for="item in TypeLevel1"
                      :key="item.value"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </p>
                <p class="widOne">
                  <el-select v-model="typeLevel2" size="mini" placeholder="请选择" @change="choose2">
                    <el-option
                      v-for="item in TypeLevel2"
                      :key="item.value"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </p>
                <p class="widOne">
                  <el-select v-model="typeLevel3" size="mini" placeholder="请选择">
                    <el-option
                      v-for="item in TypeLevel3"
                      :key="item.value"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </p>
              </el-col>
              <el-col :span="7" class="TongCenter">
                <span>温层：</span>
                <p style="width:150px">
                  <el-select v-model="temperature" size="mini" placeholder="请选择">
                    <el-option
                      v-for="(item,index) in optionsTemp"
                      :key="index"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </p>
              </el-col>
              <el-col :span="7" class="TongRight">
                <span>货号：</span>
                <p style="width:150px">
                  <el-input v-model="goodsCode" placeholder="请输入商品货号"></el-input>
                </p>
              </el-col>
            </el-row>
            <div class="konge"></div>
            <el-row style="white-space: nowrap;">
              <el-col :span="10">
                <span>
                  品
                  <em class="zanweiN"></em>名：
                </span>
                <p style="width: 219px;">
                  <el-input v-model="goodsName" placeholder="请输入商品名称"></el-input>
                </p>
              </el-col>
              <el-col :span="14" class="TongRight">
                <el-button class="theBtn queryButton" @click="goodsChaxun">查询</el-button>
                <el-button class="theBtn resetButton" @click="goodsReset">重置</el-button>
              </el-col>
            </el-row>
            <div class="konge"></div>
            <div class="chooseBox2">
              <el-table
                ref="multipleTable"
                :data="optionsGoods"
                tooltip-effect="dark"
                style="width: 100%"
                border
                @selection-change="handleSelectionChange2"
                @select-all="selectAll"
                :row-key="getGoodsCode"
                max-height="244"
              >
                <el-table-column
                  type="selection"
                  width="55"
                  align="center"
                  :reserve-selection="true"
                ></el-table-column>
                <el-table-column prop="code" label="货号" align="center"></el-table-column>
                <el-table-column prop="name" label="品名" align="center"></el-table-column>
                <el-table-column prop="unit" label="单位" align="center"></el-table-column>
                <el-table-column prop="spec" label="规格" align="center"></el-table-column>
                <el-table-column prop="temperature" label="温层" align="center"></el-table-column>
              </el-table>
              <div class="pageFenye">
                <div class="PromotBtn">
                  <el-button class="AllquedingBtn" @click="isSureGoods">确定</el-button>
                  <el-button class="theBtn resetButton" @click="dialogVisible2 = false">取消</el-button>
                </div>
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="pageNum"
                  :page-sizes="[20, 40, 60]"
                  :page-size="pageSize"
                  background
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total"
                  class="pagination"
                ></el-pagination>
              </div>
            </div>
          </div>
        </el-dialog>
        <!-- 选择供应商弹窗 -->
        <el-dialog title="选择供应商" :visible.sync="dialogVisible3" width="800px">
          <div class="wrapperKu">
            <div class="soListsupp">
              <el-row>
                <el-col :span="8">
                  <span>供应商编号：</span>
                  <p class="sotlname">
                    <el-input type="text" placeholder="请输入" v-model="suppCode"></el-input>
                  </p>
                </el-col>
                <el-col :span="8">
                  <span>供应商名称：</span>
                  <p class="sotlname">
                    <el-input type="text" placeholder="请输入" v-model="suppName"></el-input>
                  </p>
                </el-col>
                <el-col :span="8">
                  <span>采购中心：</span>
                  <p style="width:184px">
                    <el-select v-model="purchase" placeholder="请选择">
                      <el-option
                        v-for="(caiitem,index) in supPurchase"
                        :key="index"
                        :label="caiitem.name"
                        :value="caiitem.name"
                      ></el-option>
                    </el-select>
                  </p>
                </el-col>
              </el-row>
              <div class="konge"></div>
              <div id="SuppBtn">
                <el-button class="theBtn queryButton" @click="chaxunSupper">查询</el-button>
                <el-button class="theBtn resetButton" @click="resetingsupp">重置</el-button>
              </div>
            </div>

            <div class="konge"></div>
            <el-table
              :data="optionsArea"
              style="width: 100%;"
              max-height="244"
              border
              id="hiegLine"
              @row-click="SelectSuppCode"
            >
              <el-table-column align="center" width="55">
                <template slot-scope="scope">
                  <el-radio-group v-model="supperRow">
                    <el-radio :label="scope.row.code" @change="chooseSupper(scope.row.code)">1</el-radio>
                  </el-radio-group>
                </template>
              </el-table-column>
              <el-table-column prop="code" label="供应商编号" align="center"></el-table-column>
              <el-table-column prop="name" label="供应商名称" align="center"></el-table-column>
              <el-table-column prop="purchase" label="采购中心" align="center"></el-table-column>
              <el-table-column prop="arrivalCycle" label="到货周期（天）" align="center"></el-table-column>
              <el-table-column prop="logistics" label="物流中心" align="center"></el-table-column>
            </el-table>
            <div class="pageFenye">
              <div class="PromotBtn">
                <el-button class="AllquedingBtn" @click="clickSupp">确定</el-button>
                <el-button class="theBtn resetButton" @click="dialogVisible3 = false">取消</el-button>
              </div>
              <el-pagination
                @size-change="handleSizeChange3"
                @current-change="handleCurrentChange3"
                :current-page="pageNum3"
                :page-sizes="[20, 40, 60]"
                :page-size="pageSize3"
                background
                layout="total, sizes, prev, pager, next, jumper"
                :total="total3"
                class="pagination"
              ></el-pagination>
            </div>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "operaPurWareAdd",
  data() {
    return {
      hideK: false,
      hideG: false,
      hideSup: false,
      name: "",
      options: [],
      DeoptionList: [], //仓库列表
      optionsArea: [], //供应商列表
      dialogVisible: false,
      dialogVisible2: false,
      dialogVisible3: false,
      AreaCode: "",
      typeLevel1: "",
      typeLevel2: "",
      typeLevel3: "",
      goodsCode: "",
      goodsName: "",
      temperature: "",
      TypeLevel1: [], //商品类型
      TypeLevel2: [],
      TypeLevel3: [],
      optionsGoods: [], //商品列表
      optionsTemp: [], //温层下拉选
      multipleSelection2: [],
      goodsSet: [],
      count: "", //添加的数量
      regionId: "", //仓库id
      goodsCodeSet: [], //商品code
      radioList: "",
      supperRow: "", //单选
      suppName: "",
      suppCode: "",
      purchase: "",
      suppOnlyRow: "",
      suppOnlyCode: "",
      supPurchase: [], //采购下拉选
      pageNum: 1,
      pageSize: 20,
      total: 0,
      pageNum2: 1,
      pageSize2: 20,
      total2: 0,
      pageNum3: 1,
      pageSize3: 20,
      total3: 0
    };
  },
  created() {
    this.showGoods();
    this.suPurchase();
    this.showTemper();
  },
  // bug:228问题2未解决
  methods: {
    // 供应商
    // 采购中心下拉选supplier_purchase_select
    suPurchase() {
      let _this = this;
      let token = sessionStorage.getItem("token");
      let code = "supplier_purchase_select";
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
          if (res.data.code == "0000") {
            _this.supPurchase = res.data.data;
          }
        });
    },
    SelectSupp() {
      this.dialogVisible3 = true;
      this.showSupp();
    },
    showSupp(pageNum3, pageSize3) {
      this.$axios({
        url: "public/supplier/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: sessionStorage.getItem("token"),
          name: this.suppName,
          code: this.suppCode,
          purchase: this.purchase,
          pageNum: this.pageNum3,
          pageSize: this.pageSize3
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.optionsArea = res.data.data.list;
          this.total3 = res.data.data.total;
        }
      });
    },
    SelectSuppCode(row) {
      this.suppOnlyRow = row;
    },
    chooseSupper(val) {
      this.supperRow = val;
    },
    clickSupp() {
      // this.optionsGoods.forEach(row => {
      //   this.$refs.multipleTable.toggleRowSelection(row);
      // })
      if (this.optionsGoods.length > 0)
        this.$refs.multipleTable.clearSelection();
      if (!this.suppOnlyRow) {
        this.$message.error("请选择供应商信息");
      } else {
        this.dialogVisible3 = false;
        this.hideSup = true;
        this.hideG = false;
      }
    },
    // 供应商查询
    chaxunSupper() {
      this.showSupp();
    },
    resetingsupp() {
      this.suppCode = "";
      this.suppName = "";
      this.purchase = "";
      this.showSupp();
    },
    // 仓库列表
    SelectionArea() {
      this.dialogVisible = true;
      this.showArea();
      this.hideG = false;
    },
    showArea(pageNum2, pageSize2) {
      this.$axios({
        url: "public/warehouse/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: sessionStorage.getItem("token"),
          name: this.name,
          pageNum: this.pageNum2,
          pageSize: this.pageSize2
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.DeoptionList = res.data.data.list;
          this.total2 = res.data.data.total;
        }
      });
    },
    // 选择一行数据
    CAreaCode(row) {
      this.AreaCode = row;
    },
    changeRadio(val) {
      this.radioList = val;
      this.regionId = this.radioList;
    },
    // 确定
    nextclick() {
      if (!this.AreaCode) {
        this.$message.error("请选择库区信息");
      } else {
        this.dialogVisible = false;
        this.hideK = true;
      }
    },
    // 库区查询，重置
    chaxun() {
      this.showArea();
    },
    reseting() {
      this.name = "";
      this.showArea();
    },
    // 选择商品列表
    SelectionGoods() {
      this.dialogVisible2 = true;
      this.showAreaGoods(this.pageNum, this.pageSize);
    },
    showAreaGoods(pageNum, pageSize) {
      this.$axios({
        url: "/public/goods/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: sessionStorage.getItem("token"),
          typeLevel1: this.typeLevel1,
          typeLevel2: this.typeLevel2,
          typeLevel3: this.typeLevel3,
          goodsCode: this.goodsCode,
          goodsName: this.goodsName,
          temperature: this.temperature,
          supplierCode: this.supperRow,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.optionsGoods = res.data.data.list;
          this.total = res.data.data.total;
          if(this.$refs.multipleTable){
            this.optionsGoods.forEach((item,index)=>{
              this.goodsSet.forEach((i,index2)=>{
                if(item.code==i.code){
                  item.flag=true
                   this.$nextTick(() => {
                      this.$refs.multipleTable.toggleRowSelection(
                        this.optionsGoods[index],
                        true
                      );
                    });
                }
              })
            })
          }
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
    getGoodsCode(row) {
      return row.code;
    },
    // 选择一行数据
    handleSelectionChange2(val) {
      this.multipleSelection2 = val;
      // this.multipleSelection2 = val.map(item => {
      //     console.log(item)
      //     return item.code
      // })
    },
    // 多选
    selectAll(selection) {
      this.multipleSelection2 = selection;
    },
    // 点击确定
    isSureGoods() {
      if (this.multipleSelection2 == "")
        return this.$message.error("请选择商品信息");
      this.goodsSet = this.multipleSelection2;
      this.dialogVisible2 = false;
      this.hideG = true;
    },
    // 删除
    delRetuen(index,code) {
      this.goodsSet.splice(index, 1);
      this.toggleSelection();
    },
    // 删除完商品之后再次选择商品是应该取消掉之前记录的值
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 商品下拉选
    showGoods() {
      this.$axios({
        url: window.apiUrl + "goods/type/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          pcode: "0",
          token: sessionStorage.getItem("token")
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.TypeLevel1 = res.data.data;
        }
      });
    },
    // change事件
    choose(value) {
      this.typeLevel2 = "";
      this.typeLevel3 = "";
      this.TypeLevel3 = [];
      let token = sessionStorage.getItem("token");
      this.$axios({
        url: window.apiUrl + "goods/type/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          pcode: value,
          token: token
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.TypeLevel2 = res.data.data;
        }
      });
    },
    // 下拉change事件
    choose2(value) {
      this.typeLevel3 = "";
      let token = sessionStorage.getItem("token");
      this.$axios({
        url: window.apiUrl + "goods/type/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          pcode: value,
          token: token
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.TypeLevel3 = res.data.data;
        }
      });
    },
    //  温层下拉选
    showTemper() {
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
          if (res.data.code == "0000") {
            _this.optionsTemp = res.data.data;
          }
        });
    },
    // 商品查询，重置
    goodsChaxun() {
      this.showAreaGoods(this.pageNum, this.pageSize);
    },
    goodsReset() {
      this.typeLevel1 = "";
      this.typeLevel2 = "";
      this.typeLevel3 = "";
      this.goodsCode = "";
      this.goodsName = "";
      this.temperature = "";
      this.showAreaGoods(this.pageNum, this.pageSize);
    },
    // 商品分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.showAreaGoods(this.pageNum, val);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.showAreaGoods(val, this.pageSize);
    },
    // 仓库分页
    handleSizeChange2(val) {
      this.pageSize2 = val;
      this.showArea(this.pageNum2, val);
    },
    handleCurrentChange2(val) {
      this.pageNum2 = val;
      this.showArea(val, this.pageSize2);
    },
    // 供应商分页
    handleSizeChange3(val) {
      this.pageSize3 = val;
      this.showSupp(this.pageNum3, val);
    },
    handleCurrentChange3(val) {
      this.pageNum3 = val;
      this.showSupp(val, this.pageSize3);
    },
    // 提交 返回
    submitForm() {
      const goosCount = this.goodsSet.map(item => {
        return {
          goodsCode: item.code,
          count: item.count
        };
      });
      let goodCounts = '';
      goosCount.forEach((item,index) => {
        goodCounts = item.count;
        console.log(goodCounts)
      });
      if (!goodCounts) {
        this.$message.error("请添加入库数量");
        return;
      } else {
        this.$axios({
          url: window.apiUrl + "warehouse/purchase/add",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            token: sessionStorage.getItem("token"),
            warehouseCode: this.regionId,
            supplierCode: this.supperRow,
            goodsSet: JSON.stringify(goosCount)
          })
        }).then(res => {
          if (res.data.code == "0000") {
            this.$message({
              message: "新增成功",
              type: "success"
            });
            this.$router.push({ name: "operaPurWare" });
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
      }
    },
    resetForm() {
      this.$router.push({ name: "operaPurWare" });
    }
  }
};
</script>
<style scoped>
.storehousebox {
  height: 100%;
  min-width: 1700px;
  box-shadow: 0 2px 10px #ccc;
  background: #fff;
  font-size: 12px;
}
.storehouse_box .block .el-button {
  margin: 0;
  margin-right: 10px;
  font-size: 12px;
}
.storehouse_box {
  margin-left: 30px;
  margin-right: 30px;
  padding-bottom: 30px;
}
.nav {
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
.demonstration {
  padding-top: 20px;
  padding-bottom: 20px;
  font-size: 14px;
  font-weight: 900;
  display: inline-block;
}
.aaa {
  width: 40%;
}
.aaa p {
  width: 100%;
}
.cit,
.aaa p {
  display: inline-block;
}
.aaa .cit {
  width: 33.3%;
}
.aaa .cit p {
  width: 100%;
}
.aaa {
  margin-bottom: 30px;
}
.aaa,
.cit,
.shop2,
.bbb,
.bbb .typ,
.sotl,
.sotl p {
  display: inline-block;
}
.aaa .el-range-editor.el-input__inner {
  width: 100%;
}
.sotl2 {
  margin: 0 20px;
}
.suppN {
  margin: 0 11px;
}
.btn_flot,
#SuppBtn {
  width: 100%;
  text-align: right;
}
.colo {
  color: #f56c6c;
  margin: 10px 0;
}
.couShopSele p {
  display: inline-block;
  width: 20%;
}
.goodSty {
  margin: 0 3px;
}
.temperSty {
  margin-left: 33px;
}
.checkBtn {
  display: inline-block;
  position: absolute;
  right: -8px;
  bottom: -1px;
}
.zanweiN {
  display: inline-block;
  width: 21px;
}
.chooseBox3 {
  margin: 20px 0;
  position: relative;
}
.chooseBox3 p {
  display: inline-block;
  margin-right: 13px;
  width: 25%;
}
.hideBtn {
  text-align: center;
}
#SuppBtn .el-button {
  margin-left: 10px;
  margin-right: 0;
}
.chaxunBtn {
  background-color: #434444;
  color: #fff;
  border: none;
}

.chongzhiBtn {
  background-color: #fff;
  color: #444444;
  border: 1px solid #555555;
  margin-left: 10px;
}

.chaxunBtn,
.chongzhiBtn {
  width: auto;
  height: 32px;
  border-radius: 5px;
  line-height: 10px;
}

.chaxunBtn,
.chongzhiBtn:hover {
  cursor: pointer;
}
.pageFenye {
  height: 50px;
  line-height: 50px;
  position: relative;
}
.PromotBtn {
  position: absolute;
  left: 20px;
  bottom: 10px;
}
.soListsupp p {
  display: inline-block;
  width: 154px;
}
.choosestore p {
  display: inline-block;
}
.choosestore .widOne {
  width: 70.3px;
}
.choosestore .widOne:nth-child(3) {
  margin: 0 5px;
}
</style>


