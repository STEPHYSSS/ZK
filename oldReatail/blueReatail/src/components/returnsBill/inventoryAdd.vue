<template>
  <div class="invenAdd minWidth1600 minimum">
     <div class="detailBackBtn">
        <img src="@/assets/returnbutton.png" @click="goback" alt="" class="codesty">
      </div>
    <div class="PanBox">
      <!-- <el-button class="theBtn resetButton" @click="goback">返回</el-button> -->
      <h3>新增盘点</h3>
      <div class="topBox">
        <el-row class="rowSpacing">
          <el-col :span="6">
            <div class="classify">
              <span class="textTitle70px">商品分类：</span>
              <div class="classify1">
                <el-select
                  v-model="ruleForm.typeLevel1"
                  size="mini"
                  placeholder="请选择"
                  class="select1"
                  @change="choose"
                >
                  <el-option
                    v-for="item in TypeLevels1"
                    :key="item.value"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
                <el-select
                  v-model="ruleForm.typeLevel2"
                  size="mini"
                  placeholder="请选择"
                  @change="choose2"
                >
                  <el-option
                    v-for="item in TypeLevels2"
                    :key="item.value"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
                <el-select v-model="ruleForm.typeLevel3" size="mini" placeholder="请选择">
                  <el-option
                    v-for="item in TypeLevels3"
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
              <span class="textTitle textTitleR">品名：</span>
                <el-input class="input1" type="text" v-model="ruleForm.pname" placeholder="请输入" />
            </div>
          </el-col>
          <el-col :span="6" class="textAlignCenter">
            <div>
              <span class="textTitle textTitleR">货号：</span>
                <el-input class="input1" type="text" v-model="ruleForm.hNum" placeholder="请输入" />
            </div>
          </el-col>
          <el-col :span="6" class="textAlignRight">
            <div>
              <span class="textTitle70px">国际条码：</span>
                <el-input class="input1" type="text" v-model="ruleForm.Gcode" placeholder="请输入" />
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div></div>
          </el-col>
          <el-col :span="6">
            <div></div>
          </el-col>
          <el-col :span="6">
            <div></div>
          </el-col>
          <el-col :span="6" style="margin-left:75%">
            <div class="textAlignRight">
                <el-button class="theBtn queryButton" @click="pchaxun">查询</el-button>
                <el-button class="theBtn resetButton" @click="preset">重置</el-button>
              </div>
          </el-col>
        </el-row>
      </div>
      <!-- <div class="konge"></div> -->
    </div>
    <!-- <div class="zanpan1"></div> -->
    <div class="PanBo2">
      <div class="panDay">
        <span class="titleBox">选择盘点日期：</span>
          <el-date-picker class="dataPickerInput" v-model="changeTime" @input="Panchange" type="date" placeholder="选择日期"></el-date-picker>
      
      </div>
      <div class="pantabl" v-if="showTab">
        <el-table :data="tableData" style="width: 100%;">
          <el-table-column prop="name" label="品名" align="center" class="codesty"></el-table-column>
          <el-table-column label="商品分类" align="center" width="220">
            <template scope="scope">
              <span>{{scope.row.typeLevel1}}/{{scope.row.typeLevel2}}/{{scope.row.typeLevel3}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="code" label="货号" align="center"></el-table-column>
          <el-table-column prop="barcode" label="国际条码" align="center" width="150"></el-table-column>
          <el-table-column prop="unit" label="单位" align="center"></el-table-column>
          <el-table-column prop="stock" label="账面数量" align="center"></el-table-column>
          <el-table-column label="盘点数量" align="center" prop="physicalNum">
            <template slot-scope="scope">
                <!-- <input type="text" oninput = "value=value.replace(/[^\d]/g,'')" v-model="scope.row.physicalNum"> -->
                <input
                  type="text"
                  oninput="value=value.replace(/[^\d]/g,'')"
                  v-model="scope.row.physicalNum"
                  class="inputStyle"
                />
            
            </template>
          </el-table-column>
          <el-table-column label="盘盈数量" align="center">
            <template scope="scope">
              <span
                v-if="scope.row.physicalNum - scope.row.stock >= 0"
              >{{scope.row.physicalNum - scope.row.stock}}</span>
            </template>
          </el-table-column>
          <el-table-column label="盘亏数量" align="center">
            <template scope="scope">
              <span v-if="scope.row.physicalNum - scope.row.stock < 0 ">0</span>
            </template>
          </el-table-column>
        </el-table>
        <div style="height:50px">
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
        <div class="baocent">
          <el-button class="theBtn queryButton" @click="invenSu">确定</el-button>
          
        </div>
        <div class="zanpan1"></div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "invenAdd",
  data() {
    return {
      changeTime: "",
      showTab: false,
      createTimeStart: "",
      tableData: [],
      ruleForm: {
        typeLevel1: "",
        typeLevel2: "",
        typeLevel3: "",
        pname: "",
        hNum: "",
        Gcode: ""
      },
      physicalNum: "", //盘点数量
      TypeLevels1: [], //商品类型
      TypeLevels2: [],
      TypeLevels3: [],
      pageNum: 1,
      pageSize: 20,
      total: 100,
      isNull: ""
    };
  },
  // mounted(){

  // },
  created() {
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
          this.TypeLevels1 = res.data.data;
        }
      })
      .catch(err => {
        console.log("数据异常", err);
      });
  },
  methods: {
    // 点击选择盘点日期，展示数据 选择时间
    Panchange(e) {
      this.showTab = true;
      this.createTimeStart = this.$moment(e).format("YYYY-MM-DD");
      this.panTabList();
    },
    // 点击选择盘点日期，展示数据
    panTabList(pageNum, pageSize) {
      let that = this;
      that
        .$axios({
          url: window.apiStore + "inventory/addDetail",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            token: sessionStorage.getItem("token"),
            time: this.createTimeStart,
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            typeLevel1: this.ruleForm.typeLevel1,
            typeLevel2: this.ruleForm.typeLevel2,
            typeLevel3: this.ruleForm.typeLevel3,
            name: this.ruleForm.pname,
            goodsCode: this.ruleForm.hNum,
            barcode: this.ruleForm.Gcode
          })
        })
        .then(res => {
          if (res.data.code == "0000") {
            that.tableData = res.data.data.list;
            that.tableData.forEach((item, index) => {
              that.tableData[index]["physicalNum"] = item.stock;
            });
            that.total = res.data.data.total;
          } else if (res.data.code == "6666") {
            that.$message({
              showClose: true,
              message: "token异常，请重新登录",
              type: "error"
            });
            const timer = setTimeout(() => {
              clearTimeout(timer);
              that.$router.push({ name: "login" });
            }, 3000);
          } else {
            that.$message.error(res.data.msg);
          }
        });
    },
    // change事件
    choose(value) {
      this.ruleForm.typeLevel2 = "";
      this.ruleForm.typeLevel3 = "";
      this.TypeLevels3 = "";
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
          this.TypeLevels2 = res.data.data;
        }
      });
    },
    // 下拉change事件
    choose2(value) {
      this.ruleForm.typeLevel3 = "";
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
          this.TypeLevels3 = res.data.data;
        }
      });
    },
    // 查询 重置
    pchaxun() {
      this.panTabList();
    },
    preset() {
      this.ruleForm = {};
      this.panTabList();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.panTabList(this.pageNum, val);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.panTabList(val, this.pageSize);
    },
    // 确定
    invenSu() {
      let that = this;
      that.tableData.forEach((item, index) => {
        if (item.physicalNum.length >= 0) {
          this.$message.error("请添加盘点数量");
          return;
        }
      });
      const aaa = this.tableData.map(item => {
        return {
          code: item.code,
          inventoryCount: item.physicalNum
        };
      });
      let token = sessionStorage.getItem("token");
      that
        .$axios({
          url: window.apiStore + "inventory/add",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            token: token,
            json: JSON.stringify(aaa),
            time: this.createTimeStart
          })
        })
        .then(res => {
          if (res.data.code == "0000") {
            that.$router.push({ name: "storeManagement" });
          }
        });
    },
    goback() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.invenAdd {
  /* background-color: #f1f6fa; */
  min-height: 647px;
  min-width: 1200px;
  padding-top: 15px;
}
.PanBox {
  padding: 0 20px;
}
.PanBox,
.PanBo2 {
  background: #fff;
  
}
.topBox{
  padding-top: 15px;
}
.panDay {
  height: 50px;
  line-height: 50px;
  padding-left: 20px;
  padding-bottom: 20px;
}
.baocent {
  height: 60px;
  width: 45%;
  margin: 0 auto;
  text-align: center;
}
.panNum,
.panNum input {
  width: 100%;
}
.invenAdd .cit {
  width: 29%;
}
.invenAdd .storeShopSty {
  margin: 0 2px;
}
.invenAdd .TongYi {
  width: 58%;
}
.invenAdd .sotlname {
  width: 58%;
}
.invenAdd .sotlname2 {
  width: 70%;
}
.invenAdd .colright {
  text-align: right;
}
.invenAdd .cit,
.invenAdd .TongYi,
.invenAdd .sotlname,
.invenAdd .sotlname2 {
  display: inline-block;
}
.invenAdd .store .el-range-editor.el-input__inner {
  width: 100%;
}
.store_tit {
  padding-top: 20px;
  padding-bottom: 20px;
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
.titleBox {
  display: inline-block;
  width: 100px;
}
.dataPickerInput {
  width: 270px;
  height:32px; 
}
h3 {
  padding: 0px 0 8px 0px;
}
.inputStyle{
  border: 1px solid #dbe0e5;
  border-radius: 5px;
  width: 50%;
  height: 27px;
}
</style>
