<template>
  <div class="chooseShelv minWidth1600">
    <div class="storehousebox">
      <div class="storehouse_box">
        <div class="detailBackBtn">
        <router-link to="/shelvesShop"><img src="@/assets/returnbutton.png" alt="" class="codesty"></router-link>
      </div>
        <div class="block">
          <h3>新增</h3>
          <el-button class="themeColor" @click="SelectionArea">选择库区</el-button>
          <el-button class="resetButton choosesGoods" @click="SelectionGoods">选择商品</el-button>
          <p class="colo" v-show="hideK">关联库区：{{AreaCode.name}}-{{AreaCode.warehouseName}}</p>
          <div class="konge"></div>
          </div>
          <el-table :data="goodsSet" style="width: 100%;" v-show="hideG" border max-height="600">
            <el-table-column prop="code" label="货号" align="center"></el-table-column>
            <el-table-column prop="name" label="品名" align="center"></el-table-column>
            <el-table-column prop="unit" label="单位" align="center"></el-table-column>
            <el-table-column prop="spec" label="规格" align="center"></el-table-column>
            <el-table-column prop="temperature" label="温层" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template scope="scope">
                <span class="codesty" @click="delRetuen(scope.$index,scope.row.code)">删除</span>
              </template>
            </el-table-column>
          </el-table>
          <div class="konge"></div>
          <div class="hideBtn" v-if="this.AreaCode !='' && this.goodsSet !=''">
            <el-button class="theBtn queryButton" @click="submitForm">确定</el-button>
            <el-button class="theBtn resetButton" @click="resetForm">返回</el-button>
          </div>
          <!-- 选择库区弹窗 -->
          <el-dialog title="选择库区" :visible.sync="dialogVisible" width="950px">
            <div class="wrapperKu">
              <div class="soList">
                <el-row class="rowSpacing">
                  <el-col :span="8">
                    <div>
                      <span class="textTitle70px">库区编号：</span>
                      <el-input class="dialogInput" type="text" placeholder="请输入" v-model="itemCode"></el-input>
                    </div>
                  </el-col>
                  <el-col :span="8" class="textAlignCenter">
                    <div>
                      <span class="textTitle70px">库区名称：</span>
                      <el-input class="dialogInput" type="text" placeholder="请输入" v-model="name"></el-input>
                    </div>
                  </el-col>
                  <el-col :span="8" class="textAlignRight">
                    <div class="btnbox11">
                      <span class="textTitle70px">所属仓库：</span>
                      <!-- <div class="btnbox11_1"> -->
                        <el-select placeholder="请选择" class="dialogInput" v-model="warehouseCode">
                          <el-option
                            v-for="item in options"
                            :key="item.code"
                            :label="item.name"
                            :value="item.name"
                          ></el-option>
                        </el-select>
                      <!-- </div> -->
                    </div>
                  </el-col>
                </el-row>
                <el-row class="rowSpacing">
                  <el-col :span="24" class="textAlignRight">
                      <div class="textAlignRight">
                        <el-button class="theBtn queryButton" @click="chaxun">查询</el-button>
                        <el-button class="theBtn resetButton" @click="reseting">重置</el-button>
                      </div>
                  </el-col>
                </el-row>
              </div>
              <el-table
                :data="optionsArea"
                style="width: 100%;"
                max-height="250"
                id="hiegLine"
                @row-click="CAreaCode"
                border
              >
                <el-table-column align="center" width="80">
                  <template slot-scope="scope">
                    <el-radio-group v-model="radioList">
                      <el-radio :label="scope.row.id" @change="changeRadio(scope.row.id)">1</el-radio>
                    </el-radio-group>
                  </template>
                </el-table-column>
                <el-table-column prop="item" label="库区编号" align="center"></el-table-column>
                <el-table-column prop="name" label="库区名称" align="center"></el-table-column>
                <el-table-column prop="warehouseName" label="所属仓库" align="center"></el-table-column>
                <el-table-column prop="capacity" label="货位数量" align="center"></el-table-column>
                <el-table-column prop="surplusCount" label="可使用数量" align="center"></el-table-column>
              </el-table>
              <div  style="margin-top:10px;">
                <el-button class="theBtn themeColor textMright" @click="nextclick()">确定</el-button>
                <el-button class="theBtn resetButton " @click="dialogVisible=false">取消</el-button>
              </div>
            </div>
          </el-dialog>
          <!-- 选择商品弹窗 -->
          <el-dialog title="选择商品" :visible.sync="dialogVisible2" width="950px">
            <div class="choosestore">
              <div class="couShopSele">
                <el-row class="rowSpacing">
                   <el-col :span="8">
                    <div>
                      <span class="textTitle70px textTitleR">货号：</span>
                      <el-input class="input2" v-model="goodsCode" placeholder="请输入商品货号"></el-input>
                    </div>
                  </el-col>
                  <el-col :span="8" style="text-align:center">
                    <div>
                      <span class="textTitle70px textTitleR">品名：</span>
                      <el-input class="dialogInput" v-model="goodsName" placeholder="请输入商品名称"></el-input>
                    </div>
                  </el-col>
                  <el-col :span="8" class="textAlignRight">
                    <div class="btnbox11">
                      <span class="textTitle70px textTitleR">温层：</span>
                      <div class="btnbox11_1">
                        <el-select  v-model="temperature" size="mini" placeholder="请选择">
                          <el-option
                            v-for="(item,index) in optionsTemp"
                            :key="index"
                            :label="item.name"
                            :value="item.name"
                          ></el-option>
                        </el-select>
                      </div>
                    </div>
                  </el-col>
                 
                </el-row>
                  <el-row>
                  <el-col :span="12" >
                    <div class="classify">
                      <span class="textTitle70px">商品分类：</span>
                      <div class="classify1">
                        <el-select
                          v-model="typeLevel1"
                          size="mini"
                          style="margin-left:0"
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
                          v-model="typeLevel2"
                          size="mini"
                          
                          @change="choose2"
                        >
                          <el-option
                            v-for="item in TypeLevel2"
                            :key="item.value"
                            :label="item.name"
                            :value="item.code"
                          ></el-option>
                        </el-select>
                        <el-select v-model="typeLevel3" size="mini" >
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
                    <div class="btnbox11" style="text-align:right">
                      <el-button class="theBtn queryButton" @click="goodsChaxun">查询</el-button>
                      <el-button class="theBtn resetButton" @click="goodsReset">重置</el-button>
                    </div>
                  </el-col>
                  <!-- <el-col :span="8" class="textAlignRight">
                    <div class="btnbox11">
                      <span class="textTitle70px textTitleR">温层：</span>
                      <div class="btnbox11_1">
                        <el-select  v-model="temperature" size="mini" placeholder="请选择">
                          <el-option
                            v-for="(item,index) in optionsTemp"
                            :key="index"
                            :label="item.name"
                            :value="item.name"
                          ></el-option>
                        </el-select>
                      </div>
                    </div>
                  </el-col> -->
                 
                  
                </el-row>
              </div>
              <div>
                <!-- <el-button class="theBtn queryButton" @click="isSureGoods">确定</el-button> -->
              </div>
              <div class="konge"></div>
              <div class="chooseBox2">
                <el-table
                  ref="multipleTable"
                  :data="optionsGoods"
                  tooltip-effect="dark"
                  style="width: 100%"
                  max-height="250"
                  @selection-change="handleSelectionChange2"
                  @select-all="selectAll"
                  :row-key="getGoodsCode"
                  border
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
                <div>
                  <div class="dialogSureBox">
                  <el-button class="theBtn themeColor textMright" @click="isSureGoods">确定</el-button>
                  <el-button class="theBtn resetButton" @click="dialogVisible2=false">取消</el-button>
                </div>
                  <div class="dialog_pagination">
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
            </div>
          </el-dialog>
        
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "chooseShelv",
  data() {
    return {
      hideK: false,
      hideG: false,
      itemCode: "",
      name: "",
      warehouseCode: "",
      options: [],
      optionsArea: [], //库区列表
      dialogVisible: false,
      dialogVisible2: false,
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
      regionId: "", //库区id
      goodsCodeSet: [], //商品code
      radioList: "",
      pageNum: 1,
      pageSize: 20,
      total: 0
    };
  },
  created() {
    // this.enterCity();
    this.showother();
    this.showGoods();
    this.showTemper();
  },
  methods: {
    // 所属仓库下拉选
    showother() {
      this.$axios({
        url: "public/warehouse/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: sessionStorage.getItem("token")
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.options = res.data.data.list;
        }
      });
    },
    // 库区列表
    SelectionArea() {
      this.dialogVisible = true;
      this.showArea();
    },
    showArea() {
      this.$axios({
        url: "/public/region/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: sessionStorage.getItem("token"),
          item: this.itemCode,
          name: this.name,
          warehouseName: this.warehouseCode
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.optionsArea = res.data.data.list;
        }
      });
    },
    // 选择一行数据
    CAreaCode(row) {
      this.AreaCode = row;
      // this.regionId = this.AreaCode.id;
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
      this.itemCode = "";
      this.name = "";
      this.warehouseCode = "";
      this.showArea();
    },
    // 选择商品列表
    SelectionGoods() {
      this.showAreaGoods(this.pageNum, this.pageSize);
      this.dialogVisible2 = true;
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
      // this.multipleSelection2 = selection.map(item =>{
      //     console.log(item)
      //     return item.code
      // })
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
      console.log(index,'index')
      console.log(code,'code')
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
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.showAreaGoods(this.pageNum, val);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.showAreaGoods(val, this.pageSize);
    },
    // 提交 返回
    submitForm() {
      this.goodsCodeSet = this.goodsSet.map(item => {
        return item.code;
      });
      this.$axios({
        url: window.apiWare + "shelves/location/add",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: sessionStorage.getItem("token"),
          regionId: this.regionId,
          goodsCodeSet: JSON.stringify(this.goodsCodeSet)
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.$message({
            message: "新增成功",
            type: "success"
          });
          this.$router.push({ name: "shelvesShop" });
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    resetForm() {
      this.$router.push({ name: "shelvesShop" });
    }
  }
};
</script>
<style scoped>
.chooseShelv {
  /* background-color: #f1f6fa; */
  min-height: 647px;
  min-width: 1200px;
}
.storehousebox {
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
}
.storehouse_box .block .el-button {
  margin: 0;
  margin-right: 10px;
}
.chooseShelv .storehouse_box {
  /* margin-left: 20px; */
  /* margin-right: 30px; */
  padding-bottom: 30px;
  padding-top: 15px;
}
.chooseShelv .nav {
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
.chooseShelv .demonstration {
  padding-top: 20px;
  padding-bottom: 0;
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
.btn_flot {
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
.block {
  margin: 0 20px;
}
.goodSty {
  margin: 0 3px;
}
.checkBtn {
  display: inline-block;
  position: absolute;
  right: -8px;
  bottom: -1px;
}
.zanweiN {
  display: inline-block;
  width: 28px;
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
/* .el-button:focus, .el-button:hover {
    color: #fff;
} */
/* .choosesGoods:hover,
.choosesGoods:focus {
  color: #fff;
  background-color: #e50109;
  border-color: #e50109;
  transform: scale(0.95);
} */
.input2 {
  width: 250px;
}
.btnbox11 {
  box-sizing: border-box;
}
.btnbox11_1 {
  display: inline-block;
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
  width: 30%;
  margin-left: 10px;
}
.classify1 .select1 {
  margin-left: 0;
}
h3 {
  padding-bottom: 15px;
}
</style>


