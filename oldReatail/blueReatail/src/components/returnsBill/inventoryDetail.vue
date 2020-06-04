<template>
  <div class="invendetail minimum minWidth1600">
    <div class="detailBackBtn">
      <img src="@/assets/returnbutton.png" alt class="codesty" @click="goback" />
    </div>
    <div class="PanBox">
      <h3>盘点详情</h3>
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
                  v-for="item in TypeLevel1"
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
            <span class="textTitle70px textTitleR">品名：</span>
            <el-input class="input1" type="text" v-model="ruleForm.pname" placeholder="请输入" />
          </div>
        </el-col>
        <el-col :span="6" class="textAlignCenter">
          <div>
            <span class="textTitle70px textTitleR">货号：</span>
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
        <el-col :span="6" class="colMleft75">
          <div>
            <div class="textAlignRight">
              <el-button class="theBtn queryButton" @click="pchaxun">查询</el-button>
              <el-button class="theBtn resetButton" @click="preset">重置</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="panDay" v-for="(item,index) in list" :key="index">
        <span>盘点日期：{{item.inventoryTime | converTime('YYYY-MM-DD')}}</span>
        <span class="creaT">创建时间：{{item.createTime | converTime('YYYY-MM-DD HH:mm:ss')}}</span>
        <span>盘点状态：{{item.status | panTip}}</span>
      </div>
    </div>
    <div class="PanBo2">
      <div class="pantabl">
        <el-table :data="tableData" style="width: 100%;">
          <el-table-column prop="name" label="品名" align="center" class="codesty"></el-table-column>
          <el-table-column label="商品分类" align="center">
            <template scope="scope">
              <span>{{scope.row.typeLevel1}}/{{scope.row.typeLevel2}}/{{scope.row.typeLevel3}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="code" label="货号" align="center" class="codesty"></el-table-column>
          <el-table-column prop="barcode" label="国际条码" align="center" class="codesty"></el-table-column>
          <el-table-column prop="unit" label="单位" align="center" class="codesty"></el-table-column>
          <el-table-column prop="paperCount" label="账面数量" align="center" class="codesty"></el-table-column>
          <el-table-column prop="inventoryCount" label="盘点数量" align="center" class="codesty"></el-table-column>
          <el-table-column prop="inventorySurplus" label="盘盈数量" align="center" class="codesty"></el-table-column>
          <el-table-column prop="inventoryLosses" label="盘亏数量" align="center" class="codesty"></el-table-column>
        </el-table>
        <div class="pageBox">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[20,40,60]"
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
</template>
<script>
import qs from "qs";
export default {
  name: "invendetail",
  data() {
    return {
      tableData: [],
      list: [],
      ruleForm: {
        typeLevel1: "",
        typeLevel2: "",
        typeLevel3: "",
        pname: "",
        hNum: "",
        Gcode: ""
      },
      code: sessionStorage.getItem("Pcode"),
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
    })
      .then(res => {
        if (res.data.code == "0000") {
          this.TypeLevel1 = res.data.data;
        }
      })
  },
  mounted() {},
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
          typeLevel1:this.ruleForm.typeLevel1,
          typeLevel2:this.ruleForm.typeLevel2,
          typeLevel3:this.ruleForm.typeLevel3,
          name:this.ruleForm.pname,
          goodsCode:this.ruleForm.hNum,
          barcode:this.ruleForm.Gcode,
          pageNum: this.pageNum,
          pageSize: this.pageSize
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
            this.tableData = res.data.data.subList.list;
            this.total = res.data.data.subList.total;
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
      this.ruleForm.typeLevel1 = ""
      this.ruleForm.typeLevel2 = ""
      this.ruleForm.typeLevel3 = ""
      this.ruleForm.pname = ""
      this.ruleForm.hNum = ""
      this.ruleForm.Gcode = ""
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
    }
  },
  filters: {
    panTip(value) {
      if (value == "1") {
        return "待确认";
      } else if (value == "2") {
        return "已确认";
      }
    }
  }
};
</script>
<style scoped>
.invendetail {
  /* background-color: #f1f6fa; */
  min-height: 647px;
  min-width: 1200px;
      padding-top: 15px;
}
.PanBox {
  margin: 0 25px;
}
.baocent {
  height: 50px;
  width: 45%;
  margin: 0 auto;
  text-align: center;
  line-height: 50px;
}
.panDay {
  margin-bottom: 5px;
}
.creaT {
  margin: 20px;
}
.pageBox {
  height: 50px;
  padding-bottom: 40px;
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
h3 {
  padding: 0px 0 20px 0px;
}
</style>
