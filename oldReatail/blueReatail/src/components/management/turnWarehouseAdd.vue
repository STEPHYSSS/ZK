<template>
  <div id="turnWarehouseAdd" class="minimum minWidth1600">
    <div class="content">
      <div class="detailBackBtn">
        <router-link :to="{ path: '/turnWarehouseList' }">
          <img src="@/assets/returnbutton.png" alt class="codesty" />
        </router-link>
      </div>
      <h3>新增</h3>
      <el-row>
        <el-col :span="16">
          <div class="three">
            <el-button class="themeColor increase" @click="out">出库仓库</el-button>&nbsp;&nbsp;
            <span>{{comeName}}</span>
          </div>
          <div class="three">
            <el-button class="resetButton blcakBtn" @click="comeIn">入库仓库</el-button>&nbsp;&nbsp;
            <span>{{inComeName}}</span>
          </div>
          <div class="three">
            <el-button class="resetButton blcakBtn" @click="chooseGoods">选择商品</el-button>
          </div>
        </el-col>
      </el-row>
      <!-- 出库 -->
      <el-dialog title="选择出库仓库" :visible.sync="dialogTableVisible" width="850px">
        <div class="billMaList">
          <table id="billInput">
            <tr>
              <td class="pinName1">
                <span>仓库名称：</span>
                <el-input type="text" v-model="warehouseData.name" placeholder="请输入" class="input1"></el-input>
              </td>
              <div class="billsearch">
                <el-button @click="search" class="theBtn queryButton">查询</el-button>
                <el-button class="theBtn resetButton" @click="reset1">重置</el-button>
              </div>
            </tr>
            <tr class="lt">
              <!-- <el-button class="theBtn queryButton" @click="chooseWarehouse">确定</el-button> -->
            </tr>
          </table>
          <el-table
            ref="multipleTable"
            :data="warehouseList"
            style="width: 100%;"
            max-height="500"
            border
          >
            <el-table-column label="选择" width="100" align="center">
              <template scope="scope">
                <el-radio class="radio" v-model="warehouseCode" :label="scope.row.code">&nbsp;</el-radio>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="仓库名称" align="center" width="150"></el-table-column>
            <el-table-column label="所在区域" align="center">
              <template scope="scope">{{scope.row.province}}-{{scope.row.city}}-{{scope.row.area}}</template>
            </el-table-column>
            <el-table-column prop="address" label="仓库名称" align="center"></el-table-column>
          </el-table>
          <div>
            <div class="dialogSureBox">
            <el-button class="theBtn themeColor textMright" @click="chooseWarehouse">确定</el-button>
            <el-button class="theBtn resetButton" @click="dialogTableVisible=false">取消</el-button>
          </div>
          <div class="dialog_pagination">
            <el-pagination
              @size-change="handleSizeChange1"
              @current-change="handleCurrentChange1"
              :current-page="warehouseData.pageNum"
              :page-sizes="[20, 40, 60, 80]"
              :page-size="warehouseData.pageSize"
              background
              layout="total, sizes, prev, pager, next, jumper"
              :total="warehouseTotal"
              class="pagination"
            ></el-pagination>
          </div>

          </div>
          
          
        </div>
      </el-dialog>
      <!-- 入库 -->
      <el-dialog title="选择入库仓库" :visible.sync="dialogTableVisible1" width="850px">
        <div class="billMaList">
          <table id="billInput">
            <tr>
              <td class="pinName1">
                <span>仓库名称：</span>

                <el-input type="text" v-model="warehouseData.name" placeholder="请输入" class="input1"></el-input>
              </td>
              <div class="billsearch">
                <el-button @click="search" class="theBtn queryButton">查询</el-button>
                <el-button class="theBtn resetButton" @click="reset1">重置</el-button>
              </div>
            </tr>
            <tr class="lt"></tr>
          </table>
          <el-table
            ref="multipleTable"
            :data="warehouseList"
            style="width: 100%;"
            max-height="300"
            border
          >
            <el-table-column label="选择" width="100" align="center">
              <template scope="scope">
                <el-radio class="radio" v-model="warehouseCode1" :label="scope.row.code">&nbsp;</el-radio>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="仓库名称" align="center" width="150"></el-table-column>
            <el-table-column label="所在区域" align="center">
              <template scope="scope">{{scope.row.province}}-{{scope.row.city}}-{{scope.row.area}}</template>
            </el-table-column>
            <el-table-column prop="address" label="仓库名称" align="center"></el-table-column>
          </el-table>
          <div>
            <div class="dialogSureBox">
            <el-button class="theBtn themeColor textMright" @click="chooseWarehouse1">确定</el-button>
            <el-button class="theBtn resetButton" @click="dialogTableVisible1=false">取消</el-button>
          </div>
          <div class="dialog_pagination">
            <el-pagination
              @size-change="handleSizeChange2"
              @current-change="handleCurrentChange2"
              :current-page="warehouseData.pageNum"
              :page-sizes="[20, 40, 60, 80]"
              :page-size="warehouseData.pageSize"
              background
              layout="total, sizes, prev, pager, next, jumper"
              :total="warehouseTotal"
              class="pagination"
            ></el-pagination>
          </div>

          </div>
          
          
        </div>
      </el-dialog>
      <!-- 商品 -->
      <el-dialog title="选择商品" :visible.sync="dialogVisible" width="950px">
        <div class="right" style="width:100%;">
          <el-row class="rowSpacing">
            <el-col :span="12">
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
            <el-col :span="12" class="textAlignRight">
              <div>
                <span>温层：</span>
                <div class="TongYiInput">
                  <!-- <el-input type="text" placeholder="请输入" v-model="formInline.goodsCode"/> -->
                  <el-select type="text" v-model="formInline.temperature">
                    <el-option
                      v-for="(item,index) in statu"
                      :key="index"
                      :label="item.name"
                      :value="item.name"
                      placeholder="请选择"
                    ></el-option>
                  </el-select>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div>
                <span class="textTitle70px textTitleR">品名：</span>
                <el-input
                  class="dialogInput"
                  type="text"
                  placeholder="请输入"
                  v-model="formInline.goodsName"
                />
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <span class="textTitle textTitleR">货号：</span>
                <el-input
                  class="dialogInput"
                  type="text"
                  placeholder="请输入"
                  v-model="formInline.goodsCode"
                />
              </div>
            </el-col>
            <el-col :span="8" class="textAlignRight">
              <div>
                <div class>
                  <el-button @click="queryList" class="theBtn queryButton">查询</el-button>
                  <el-button class="theBtn resetButton" @click="resetCommodity">重置</el-button>
                </div>
              </div>
            </el-col>
          </el-row>
          <div class="shopInp">
            <div class="shopInp" style="margin:20px 0">
              <div style="margin-top:10px"></div>
            </div>
          </div>
          <div class="tab">
            <el-table
              :data="clist"
              border
              style="width: 100%"
              max-height="250"
              ref="multipleTable1"
              @select-all="selectAllProduct"
              @select="commodityList"
            >
              <!-- selection-change -->
              <!-- @select="commodityList" -->
              <el-table-column type="selection" width="55" class="leftTitle"></el-table-column>
              <el-table-column align="center" prop="code" label="货号"></el-table-column>
              <el-table-column align="center" prop="name" label="品名"></el-table-column>
              <el-table-column align="center" prop="unit" label="单位"></el-table-column>
              <el-table-column align="center" prop="spec" label="规格"></el-table-column>
              <el-table-column align="center" prop="temperature" label="温层"></el-table-column>
            </el-table>
          </div>
          <!-- 分页 -->
          <div>
            <div class="dialogSureBox">
              <el-button class="theBtn themeColor textMright" @click="shopSure">确定</el-button>
              <el-button class="theBtn resetButton" @click="dialogVisible=false">取消</el-button>
            </div>
            <div class="dialog_pagination">
              <el-pagination
                @size-change="handleSizeChange2"
                @current-change="handleCurrentChange2"
                :current-page="currentPage"
                :page-sizes="[20,40,60,80]"
                :page-size="formInline.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="clistTotal"
              ></el-pagination>
            </div>
          </div>
        </div>
      </el-dialog>
      <!-- 选择商品后渲染到页面 -->
      <div class="tab" v-if="flag1">
        <el-table
          :data="selectGoodsList"
          style="width: 100%"
          @row-click="getRow"
          border
          max-height="600"
        >
          <el-table-column align="center" prop="code" label="货号"></el-table-column>
          <el-table-column align="center" prop="name" label="品名"></el-table-column>
          <el-table-column align="center" prop="salesPrice" label="单品售价"></el-table-column>
          <el-table-column align="center" prop="count" label="转库数量">
            <template slot-scope="scope">
              <input
                type="text"
                onkeyup="this.value=this.value.replace(/\D/g,'')"
                class="number"
                maxlength="10"
                v-model="scope.row.count"
              />
            </template>
          </el-table-column>
          <el-table-column align="center" prop="spec" label="规格"></el-table-column>
          <el-table-column align="center" prop="unit" label="单位"></el-table-column>
          <el-table-column align="center" label="保质期">
            <template scope="scope">{{scope.row.period}}{{scope.row.periodUnit}}</template>
          </el-table-column>
          <el-table-column align="center" prop="temperature" label="温层"></el-table-column>
          <el-table-column label="操作" align="center">
            <template scope="scope">
              <span class="codesty" @click="shopDel(scope.$index,scope.row.code)">删除</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="billsearch1" v-if="flag1">
        <el-button class="theBtn themeColor textMright" @click="queding">确定</el-button>&nbsp;&nbsp;
        <el-button class="theBtn resetButton" @click="returnPage">返回</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "turnWarehouseAdd",
  data() {
    return {
      dialogTableVisible: false,
      dialogTableVisible1: false,
      dialogVisible: false,
      warehouseCode: "",
      warehouseCode1: "",
      token: sessionStorage.getItem("token"),
      warehouseData: {
        pageNum: 1,
        pageSize: 20,
        name: ""
      },
      comeName: "",
      inComeName: "",
      warehouseTotal: 0,
      warehouseList: [],
      //商品模块
      formInline: {
        typeLevel1: "",
        typeLevel2: "",
        typeLevel3: "",
        goodsCode: "", //货号
        goodsName: "", //品名
        temperature: "", //温层
        pageNum: 1,
        pageSize: 20
      },
      //商品分类下拉选
      TypeLevel1: [],
      TypeLevel2: [],
      TypeLevel3: [],
      statu: [], // 温层
      clist: [],
      clistTotal: 0,
      currentPage: 1,
      flag1: false,
      selectGoodsList: [],
      delList: [],
      goodsSet: []
    };
  },
  created() {
    this.getWarehouseList();
    this.query();
    this.getGoodsList();
    this.temperature();
  },
  computed: {
    newClist() {
      return this.clist.filter(item => {
        return this.delList.find(i => item.code === i.code);
      });
    }
  },
  methods: {
    getRow() {},
    // 出库
    out() {
      this.dialogTableVisible = true;
    },
    search() {
      this.getWarehouseList();
    },
    reset1() {
      this.warehouseData.name = "";
      this.getWarehouseList();
    },
    chooseWarehouse() {
      if (this.warehouseCode1 == this.warehouseCode) {
        return this.$message.error("出库和入库不能相同");
      }
      if (this.warehouseCode) {
        this.warehouseList.forEach(item => {
          if (this.warehouseCode == item.code) {
            this.comeName = item.name;
          }
        });
        this.dialogTableVisible = false;
      } else {
        return this.$message.error("请选择仓库！！");
      }
    },
    // 入库
    comeIn() {
      this.dialogTableVisible1 = true;
    },
    chooseWarehouse1() {
      if (this.warehouseCode1 == this.warehouseCode) {
        return this.$message.error("出库和入库不能相同");
      }
      if (this.warehouseCode1) {
        this.warehouseList.forEach(item => {
          if (this.warehouseCode1 == item.code) {
            this.inComeName = item.name;
          }
        });
        this.dialogTableVisible1 = false;
      } else {
        return this.$message.error("请选择仓库！！");
      }
    },
    getWarehouseList() {
      this.$axios
        .post("/public/warehouse/list", qs.stringify(this.warehouseData))
        .then(res => {
          if (res.data.code === "0000") {
            this.warehouseList = res.data.data.list;
            this.warehouseTotal = res.data.data.total;
          }
        });
    },
    handleSizeChange1(val) {
      this.warehouseData.pageSize = val;
      this.getWarehouseList();
    },
    handleCurrentChange1(val) {
      this.warehouseData.pageNum = val;
      this.getWarehouseList();
    },
    // 商品
    //商品分类
    getGoodsList() {
      this.$axios
        .post(
          "/sys/goods/type/list",
          qs.stringify({
            pcode: "0"
            // token: this.token
          })
        )
        .then(res => {
          if (res.data.code === "0000") {
            this.TypeLevel1 = res.data.data;
          }
        });
    },
    // 商品分类下拉选1
    choose(value) {
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
          } else {
            console.log(res.data.msg);
          }
        });
    },
    // 商品分类下拉选2
    choose2(value) {
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
          } else {
            console.log(res.data.msg);
          }
        });
    },
    // 获取温层类别
    temperature() {
      this.$axios
        .post(
          "/sys/dictionary/list",
          qs.stringify({
            code: "goods_temperature"
          })
        )
        .then(res => {
          if (res.data.code === "0000") {
            this.statu = res.data.data;
          }
        });
    },
    // 查询商品列表
    queryList() {
      this.query();
    },
    // 重置商品列表
    resetCommodity() {
      this.formInline.typeLevel1 = "";
      this.formInline.typeLevel2 = "";
      this.formInline.typeLevel3 = "";
      this.formInline.goodsCode = "";
      this.formInline.goodsName = "";
      this.formInline.temperature = "";
      this.query();
    },
    shopSure() {
      this.dialogVisible = false;
      this.flag1 = true;
    },
    //商品全选
    selectAllProduct(selection) {
      this.clist.forEach((item, index) => {
        if (selection.length == 0) {
          item["flag"] = false;
        } else {
          item["flag"] = true;
        }
      });
      this.selectGoodsList = selection;
    },
    // 获取选择商品当前的行
    commodityList(selection, row) {
      // 勾选的就是true  未勾选就是false
      if (row["flag"]) {
        // 为true 表示选中状态，点击的话就变成false
        row["flag"] = false;
      } else {
        row["flag"] = true;
      }
      if (row["flag"]) {
        this.selectGoodsList.forEach((item, index) => {
          if (item.code == row.code) {
            this.selectGoodsList.splice(index, 1);
          }
        });
        this.selectGoodsList.push(row);
      } else {
        this.selectGoodsList.forEach((item, index) => {
          if (item.code == row.code) {
            this.selectGoodsList.splice(index, 1);
          }
        });
      }
    },
    //商品分类当前页码
    handleCurrentChange2(val) {
      this.formInline.pageNum = val;
      this.query();
    },
    // 选择商品每页数据
    handleSizeChange2(val) {
      this.formInline.pageSize = val;
      this.query();
    },
    //拿到所有的商品数据
    query() {
      this.$axios
        .post("/public/goods/list", qs.stringify(this.formInline))
        .then(res => {
          if (res.data.code === "0000") {
            //把拿到的商品存放到数组里面,分页需要tatal
            this.clistTotal = res.data.data.total;
            this.clist = res.data.data.list;
            this.clist.forEach((item, index) => {
              this.clist[index]["count"] = null;
            });
            if (this.$refs.multipleTable1) {
              this.clist.forEach((item, index) => {
                this.selectGoodsList.forEach((i, index2) => {
                  if (item.code == i.code) {
                    item.flag = true;
                    this.$nextTick(() => {
                      this.$refs.multipleTable1.toggleRowSelection(
                        this.clist[index],
                        true
                      );
                    });
                  }
                });
              });
            }
          } else if (res.data.code === "6666") {
            this.$message({
              showClose: true,
              message: "token异常，请重新登录",
              type: "error"
            });
            const timer = setTimeout(() => {
              clearTimeout(timer);
              this.$router.push({ name: "login" });
            }, 3000);
          }
        });
    },
    shopDel(index, code) {
      this.delList.push(code);
      this.selectGoodsList.splice(index, 1);
    },
    // 商品弹窗
    chooseGoods() {
      this.query();
      /* this.clist
        .filter(item => {
          return this.delList.find(i => item.code === i.code)
        })
        .forEach(item =>
          this.$nextTick(() => {
            this.$refs.multipleTable1.toggleRowSelection(item, false);

          })
        ); */
      this.newClist.forEach(item =>
        this.$nextTick(() => {
          this.$refs.multipleTable1.toggleRowSelection(item, false);
        })
      );

      this.delList = [];
      // 商品弹窗
      this.dialogVisible = true;
      this.clist.forEach((item, index) => {
        this.selectGoodsList.forEach((i, index2) => {
          if (item.code == i.code) {
            item.flag = true;
            this.$nextTick(() => {
              this.$refs.multipleTable1.toggleRowSelection(
                this.clist[index],
                true
              );
            });
          }
        });
      });
    },
    returnPage() {
      this.$router.push({
        name: "turnWarehouseList"
      });
    },
    queding() {
      if (this.selectGoodsList.length > 0) {
        this.goodsSet = this.selectGoodsList.map(item => {
          return {
            goodsCode: item.code,
            count: item.count
          };
        });
      }
      if (this.goodsSet.length > 0) {
        for (const i of this.goodsSet) {
          if (!i.count) {
            return this.$message.error("请输入转库数量");
          }
        }
      } else {
        return this.$message.error("请选择商品！！");
      }
      if (!this.warehouseCode) {
        return this.$message.error("请选择出库仓库");
      }
      if (!this.warehouseCode1) {
        return this.$message.error("请选择入库仓库");
      }
      this.$axios
        .post(
          "/warehouse/transfer/add",
          qs.stringify({
            token: this.token,
            warehouseCodeIn: this.warehouseCode1,
            warehouseCodeOut: this.warehouseCode,
            goodsSet: JSON.stringify(this.goodsSet)
          })
        )
        .then(res => {
          if (res.data.code === "0000") {
            this.$router.push({
              name: "turnWarehouseList"
            });
          } else {
            return this.$message.error(res.data.msg);
          }
        });
    }
  }
};
</script>
<style scoped>
#turnWarehouseAdd .nav {
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
#turnWarehouseAdd .content {
  box-sizing: border-box;
  background-color: #fff;
  padding: 0px 20px;
}

#turnWarehouseAdd .billMaList {
  padding-left: 35px;
  padding-right: 30px;
}
#turnWarehouseAdd #billInput {
  width: 100%;
}
#turnWarehouseAdd .pinName1 {
  text-align: left;
}

#turnWarehouseAdd .lt {
  text-align: left;
}
#turnWarehouseAdd .three {
  width: 30%;
  display: inline-block;
}

#turnWarehouseAdd .shopSel,
.shopSta,
.shopSelect {
  display: inline-block;
}
/*商品分类第二个下拉选*/
#turnWarehouseAdd .shopSel .shopSel1 {
  margin: 0 5px;
}
#turnWarehouseAdd .shopInp {
  width: 100%;
}
#turnWarehouseAdd .shopInp .shopSel {
  width: 100%;
}
#turnWarehouseAdd .shopSel .shopSelect {
  width: 20%;
}
#turnWarehouseAdd .shopList2 {
  width: 30%;
  text-align: left;
  display: inline-block;
  margin-left: auto;
}
#turnWarehouseAdd .shopList2 .shopscan2 {
  width: 75%;
  margin-right: 9px;
  display: inline-block;
}
#turnWarehouseAdd .shopscan2 {
  margin-left: 10px;
  display: inline-block;
  width: 80%;
}
#turnWarehouseAdd .pr {
  display: inline-block;
}
#turnWarehouseAdd .tab {
  clear: both;
  margin-top: 10px;
  margin-bottom: 15px;
}
#turnWarehouseAdd .pagination {
  /* float: right;
  margin-top: 30px;
  margin-bottom: 30px; */
}
#turnWarehouseAdd .block {
  overflow: hidden;
}
#turnWarehouseAdd .number {
  border-radius: 7px;
  border: 1px solid #bbb;
  height: 26px;
  width: 70%;
}
#turnWarehouseAdd .billsearch1 {
  text-align: center;
}

h3 {
  padding: 0px 0 20px 0px;
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

