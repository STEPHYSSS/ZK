<template>
  <div class="inventoryEdit minWidth1600 minimum">
    <div class="PanBox">
      <h3 class="addPan">编辑盘点</h3>
      <div>
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
                    v-for="item in typeLevel1"
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
                    v-for="item in TypeLevel2"
                    :key="item.value"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
                <el-select v-model="ruleForm.typeLevel3" size="mini" placeholder="请选择">
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
    </div>
    <div class="PanBo2">
      <div class="panDay" v-for="(item,index) in list" :key="index">
        <span>选择盘点日期：{{item.inventoryTime | converTime('YYYY-MM-DD')}}</span>
      </div>
      <div class="pantabl">
        <el-table :data="tableData2" style="width: 100%;" max-height="600">
          <el-table-column prop="name" label="品名" align="center"></el-table-column>
          <el-table-column label="商品分类" align="center" width="280">
            <template scope="scope">
              <span>{{scope.row.typeLevel1}}/{{scope.row.typeLevel2}}/{{scope.row.typeLevel3}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="code" label="货号" align="center"></el-table-column>
          <el-table-column prop="barcode" label="国际条码" align="center"></el-table-column>
          <el-table-column prop="unit" label="单位" align="center"></el-table-column>
          <el-table-column prop="paperCount" label="账面数量" align="center"></el-table-column>
          <el-table-column label="盘点数量" align="center">
            <template scope="scope">
              <!-- replace(/\s+/g,'')禁止空格 -->
              <input
                type="text"
                oninput="value=value.replace(/[^\d]/g,'').replace(/\s+/g,'')"
                v-model="scope.row.inventoryCount"
                class="inputStyle"
              />
            </template>
          </el-table-column>
          <el-table-column prop="inventorySurplus" label="盘盈数量" align="center"></el-table-column>
          <el-table-column prop="inventoryLosses" label="盘亏数量" align="center"></el-table-column>
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
          <el-button class="theBtn themeColor textMright" @click="editSure">确定</el-button>
          <el-button class="theBtn resetButton" @click="goback">返回</el-button>
        </div>
        <div class="zanpan1"></div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "inventoryEdit",
  data() {
    return {
      changeTime: "",
      createTimeStart: "",
      tableData2: [],
      code: sessionStorage.getItem("Pcode"),
      ruleForm: {
        typeLevel1: "",
        typeLevel2: "",
        typeLevel3: "",
        pname: "",
        hNum: "",
        Gcode: ""
      },
      list: [], //盘点数量
      TypeLevel1: [], //商品类型
      TypeLevel2: [],
      TypeLevel3: [],
      pageNum: 1,
      pageSize: 20,
      total: 0
    };
  },
  created() {
    this.pandetail(this.pageNum, this.pageSize);
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
    }).then(res => {
      if (res.data.code == "0000") {
        this.typeLevel1 = res.data.data;
      }
    });
  },
  methods: {
    pandetail(pageNum, pageSize) {
      let token = sessionStorage.getItem("token");
      this.$axios({
        url: window.apiStore + "inventory/detail",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: token,
          code: this.code,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          typeLevel1: this.ruleForm.typeLevel1,
          typeLevel2: this.ruleForm.typeLevel2,
          typeLevel3: this.ruleForm.typeLevel3,
          name: this.ruleForm.pname,
          goodsCode: this.ruleForm.hNum,
          barcode: this.ruleForm.Gcode
        })
      }).then(res => {
        if (res.data.code == "0000") {
          const {
            code,
            data: { list, subList },
            total
          } = res.data;
          if (code == "0000") {
            this.list = list;
            this.tableData2 = res.data.data.subList.list;
            this.total = res.data.data.subList.total;
          } else if (res.data.code == "6666") {
            this.$message({
              showClose: true,
              message: "token异常，请重新登录",
              type: "error"
            });
          } else {
            this.$message.error(res.data.msg);
          }
        }
      });
    },
    // change事件
    choose(value) {
      this.ruleForm.typeLevel2 = "";
      this.ruleForm.typeLevel3 = "";
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
      }).then(res => {
        if (res.data.code == "0000") {
          this.TypeLevel2 = res.data.data;
        }
      });
    },
    // 下拉change事件
    choose2(value) {
      this.ruleForm.typeLevel3 = "";
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
      }).then(res => {
        if (res.data.code == "0000") {
          this.TypeLevel3 = res.data.data;
        }
      });
    },
    // 查询 重置
    pchaxun() {
      this.pandetail();
    },
    preset() {
      this.ruleForm = {};
      this.pandetail();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.pandetail(this.pageNum, val);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.pandetail(val, this.pageSize);
    },
    goback() {
      this.$router.go(-1);
    },
    // 确定
    editSure() {
      for (const i of this.tableData2) {
        if (i.inventoryCount === "") {
          this.$message("请填写盘点数量");
          return false;
        }
      }
      const aaa = this.tableData2.map(item => {
        return {
          code: item.code,
          inventoryCount: item.inventoryCount
        };
      });
      let token = sessionStorage.getItem("token");
      this.$axios({
        url: window.apiStore + "inventory/update",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: token,
          json: JSON.stringify(aaa),
          inventoryCode: this.code
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.$router.push({ name: "storeManagement" });
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
  }
};
</script>
<style scoped>
.inventoryEdit {
  min-height: 647px;
  min-width: 1200px;
}
.PanBox {
  height: 200px;
  padding: 0 20px;
}
.PanBox,
.PanBo2 {
  background: #fff;
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
.inventoryEdit .cit {
  width: 29%;
}
.inventoryEdit .storeShopSty {
  margin: 0 2px;
}
.inventoryEdit .TongYi {
  width: 58%;
}
.inventoryEdit .sotlname {
  width: 58%;
}
.inventoryEdit .sotlname2 {
  width: 70%;
}
.inventoryEdit .colright {
  text-align: right;
}
.inventoryEdit .cit,
.inventoryEdit .TongYi,
.inventoryEdit .sotlname,
.inventoryEdit .sotlname2 {
  display: inline-block;
}
.inventoryEdit .store .el-range-editor.el-input__inner {
  width: 100%;
}
.zanpan1 {
  height: 35px;
}
.panscha {
  text-align: right;
  height: 50px;
}
.addPan {
  height: 50px;
  line-height: 50px;
  padding-bottom: 0px;
  margin-bottom: 0px;
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
  height: 32px;
}
h3 {
  padding: 20px 0 8px 0px;
}
</style>
