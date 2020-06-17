<template>
  <div class="slipInfo">
     <img src="@/assets/images/returnbutton.png" alt class="backImg" @click="goback" />
    <!-- <div class="storeBox storeBox222">
      <div class="store_Box">

        <el-row style="white-space: nowrap;">
          <el-col :span="6">
            <span>商品分类：</span>
            <p class="widOne">
              <el-select
                v-model="ruleForm.typeLevel1"
                size="mini"
                placeholder="请选择"
                @change="choose"
              >
                <el-option
                  v-for="item in TypeLevel1"
                  :key="item.value"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </p>
            <p class="widOne">
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
            </p>
            <p class="widOne">
              <el-select v-model="ruleForm.typeLevel3" size="mini" placeholder="请选择">
                <el-option
                  v-for="item in TypeLevel3"
                  :key="item.value"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </p>
          </el-col>
          <el-col :span="6" class="TongCenter">
            <span>品名：</span>
            <p>
              <el-input type="text" v-model="ruleForm.pname" placeholder="请输入" />
            </p>
          </el-col>
          <el-col :span="6" class="TongCenter">
            <span>货号：</span>
            <p>
              <el-input type="text" v-model="ruleForm.hNum" placeholder="请输入" />
            </p>
          </el-col>
          <el-col :span="6" class="TongRight">
            <span>国际条码：</span>
            <p>
              <el-input type="text" v-model="ruleForm.Gcode" placeholder="请输入" />
            </p>
          </el-col>
        </el-row>
      </div>
    </div> -->
    <!-- <p class="store_tit">门店盘点</p> -->
        <!-- <router-link :to="{ path: '/storeManagement' }" class="OPBtnBack">
          <img src="@/assets/images/returnbutton.png"/>
        </router-link> -->
    <div class="storeInfo">
      <div class="store_Box">
        <!-- <div v-for="(item,index) in slipList" :key="index">
          <el-row>
            <el-col :span="6">
              <span>盘点日期：{{item.inventoryTime|converTime('YYYY-MM-DD')}}</span>
            </el-col>
            <el-col :span="6">
              <span>创建时间：{{item.createTime|converTime('YYYY-MM-DD HH:mm:ss')}}</span>
            </el-col>
            <el-col :span="6">
              <span>盘点状态：{{item.status | statusTip}}</span>
            </el-col>
            <el-col :span="6">
              <span>门店：{{item.name}}</span>
            </el-col>
          </el-row>
          <div class="konge"></div>
          <el-row v-if="flags == 1">
            <el-col class="TongRight">
              <el-button class="yangshi" @click="sureYs(item.code,item.status)">确认验收</el-button>
            </el-col>
          </el-row>
          <div class="konge"></div>
        </div> -->
          <el-row >
            <el-col class="TongRight">
              <el-button class="yangshi" @click="sureYs">确认验收</el-button>
            </el-col>
          </el-row>
        <el-table :data="tableData" style="width: 100%">
          <!-- <el-table-column prop="name" label="品名" align="center"></el-table-column> -->
          <!-- <el-table-column label="商品分类" align="center" width="300">
            <template slot-scope="scope">
              <span>{{scope.row.typeLevel1}}/</span>
              <span>{{scope.row.typeLevel2}}/</span>
              <span>{{scope.row.typeLevel3}}</span>
            </template>
          </el-table-column> -->
          <el-table-column prop="goodsCode" label="货号" align="center"></el-table-column>
          <!-- <el-table-column prop="barcode" label="国际条码" align="center"></el-table-column> -->
          <!-- <el-table-column prop="unit" label="单位" align="center"></el-table-column> -->
          <el-table-column prop="paperCount" label="账面数量" align="center"></el-table-column>
          <el-table-column prop="inventoryCount" label="盘点数量" align="center"></el-table-column>
          <el-table-column prop="inventorySurplus" label="盘盈数量" align="center"></el-table-column>
          <el-table-column prop="inventoryLosses" label="盘亏数量" align="center"></el-table-column>
        </el-table>
        <div class="konge"></div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "slipInfo",
  data() {
    return {
      tableData: [],
      slipList: [],
      flags: this.$route.params.ids,
      ruleForm: {
        typeLevel1: "",
        typeLevel2: "",
        typeLevel3: "",
        pname: "",
        hNum: "",
        Gcode: ""
      },
      TypeLevel1: [], //商品类型
      TypeLevel2: [],
      TypeLevel3: []
    };
  },
  mounted() {
    // 进入页面就执行商品类型列表
   /*  let that = this;
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
      .catch(err => {}); */
  },
  created() {
    this.getSlipDetail();
  },
  methods: {
    goback() {
      this.$router.push('/storeManagement');
    },
    getSlipDetail() {
      this.$utils({
        url: this.reqApi.xinls + "/exam/inventory/detail",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          code: this.$route.query.code,
          token: sessionStorage.getItem("token"),
          typeLevel1: this.ruleForm.typeLevel1,
          typeLevel2: this.ruleForm.typeLevel2,
          typeLevel3: this.ruleForm.typeLevel3,
          name: this.ruleForm.pname,
          goodsCode: this.ruleForm.hNum,
          barcode: this.ruleForm.Gcode,
          questionCode: sessionStorage.getItem("questionUUid"),
        })
      }).then(res => {
        const {
          code,
          data: { info, subList }
        } = res.data;
        if (code == "0000") {
          this.slipList = info;
          this.tableData = subList;
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
    // 验收
    sureYs(code, status) {
      this.$confirm("验收后数量无法更改, 是否提交?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.$utils({
            url: this.reqApi.xinls + "/exam/inventory/check",
            method: "POST",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            data: qs.stringify({
              code: this.$route.query.code,
              status: status,
              questionCode: sessionStorage.getItem("questionUUid"),
            })
          }).then(res => {
            if (res.data.code == "0000") {
              this.$message({
                type: "success",
                message: "提交成功!"
              });
              this.$router.push({ name: "storeManagement" });
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消提交"
          });
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
      this.getSlipDetail();
    },
    preset() {
      this.ruleForm = {};
    }
  },
  filters: {
    statusTip(value) {
      if (value == "1") {
        return "待验收";
      } else if (value == "2") {
        return "已验收";
      }
    }
  }
};
</script>
<style scoped>
.slipInfo {
  background-color: #fff;
  height: 100%;
  min-height: 647px;
  position: relative;
  /* min-width: 1700px; */
}
.OPBtnBack {
  text-decoration: none;
  float: right;
  margin-right: 20px;
  margin-top: 17px;
}
.OPBtnBack:hover {
   background-color: #fff;
  color: #444444;
}
.storeBox222 {
  height: 150px;
}
.widOne {
  width: 93.3px;
}
.widOne:nth-child(3) {
  margin: 0 10px;
}
.slipInfo .el-range-editor.el-input__inner {
  width: 100%;
}
p {
  display: inline-block;
  width: 300px;
}
.yangshi {
  background-color: #e6000b;
  color: #fff;
  border: none;
  /* width: 69px; */
  height: 32px;
  border-radius: 5px;
}
.store_tit{
  margin-left: 20px;
}
.slipInfo .el-button{
  padding: 0 20px;
}
.backImg {
    position: absolute;
    right: 20px;
    top: 0px;
    cursor: pointer;
    z-index: 55;
}
</style>

