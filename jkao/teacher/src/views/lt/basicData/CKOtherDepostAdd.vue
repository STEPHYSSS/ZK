<template>
  <div class="depotsAdd">
    <div class="depotsAddBox">
      <div class="detailBackBtn">
        <router-link :to="{ path: '/CKOtherdepots' }">
          <img src="@/assets/images/returnbutton.png" alt class="codesty" />
        </router-link>
      </div>
      <div class="depotsAdd_Box">
        <div class="block">
          <h3 class="depotsmonstration">
            <el-button class="themeColor" @click="SelectionArea">选择出库仓库</el-button>
          </h3>
          <p class="colo" v-show="hideK">仓库名称：{{AreaCode.name}}</p>
          <div v-if="showAdd">
            <table class="tableLlist" border="0" cellspacing="0" cellpadding="0">
              <thead>
                <th style="width:9%">货号</th>
                <th style="width:10%">品名</th>
                <th style="width:5%">单品售价</th>
                <th style="width:8%">出库数量</th>
                <th style="width:5%">规格</th>
                <th style="width:5%">单位</th>
                <th style="width:5%">保质期</th>
                <th style="width:5%">温层</th>
                <th style="width:5%">操作</th>
              </thead>
              <tbody>
                <tr v-for="(item, index) in tableData" :key="index">
                  <td>
                    <input
                      type="text"
                      class="inputTd"
                      v-model="item.code"
                      @keydown.enter="searthData(item.code, index)"
                    />
                  </td>
                  <td>{{item.name}}</td>
                  <td>{{item.salesPrice}}</td>
                  <td>
                    <input
                      type="text"
                      class="inputTd"
                      v-model="item.count"
                      maxlength="10"
                      oninput="value=value.replace(/[^\d]/g, '').replace(/^0{1,}/g,'')"
                    />
                  </td>
                  <td>{{item.spec}}</td>
                  <td>{{item.unit}}</td>
                  <td>{{item.period}}{{item.periodUnit}}</td>
                  <td>{{item.temperature}}</td>
                  <td class="codesty" @click="delRetuen(index)">删除</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td class="codesty" @click="addRetuen">添加</td>
                </tr>
              </tbody>
            </table>
            <div class="konge"></div>
            <div class="addButt">
              <el-button class="theBtn themeColor textMright" @click="sure">确定</el-button>
              <el-button class="theBtn resetButton" @click="retuBack">返回</el-button>
            </div>
          </div>
          <!-- 选择库区弹窗 -->
          <el-dialog title="选择库区" :visible.sync="dialogVisible" width="50%">
            <div class="wrapperKu">
              <div class="soList">
                <!-- <p class="inputStup">
                  仓库名称：
                  <el-input
                    class="input1"
                    type="text"
                    v-model="itemCode"
                    placeholder="请输入"
                  ></el-input>
                </p>
                <el-button class="theBtn queryButton" @click="chaxun">查询</el-button>
                  <el-button class="theBtn resetButton" @click="reseting">重置</el-button> -->
              </div>
              <div class="tableBox">
                <el-table
                :data="DeoptionList"
                style="width: 100%;"
                id="hiegLine"
                @row-click="CAreaCode"
                border
                max-height="600"
              >
                <el-table-column width="55" align="center">
                  <template slot-scope="scope">
                    <el-radio-group v-model="radioList">
                      <el-radio :label="scope.row.code" @change="changeRadio(scope.row.code)">&nbsp;</el-radio>
                    </el-radio-group>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="仓库名称" align="center"></el-table-column>
                <el-table-column label="所在区域" align="center" width="180">
                  <template
                    slot-scope="scope"
                  >{{scope.row.province}}-{{scope.row.city}}-{{scope.row.area}}</template>
                </el-table-column>
                <el-table-column prop="address" label="详细地址" align="center"></el-table-column>
              </el-table>
              <div class="konge"></div>
              <div>
                <div class="dialogSureBox">
                  <el-button class="theBtn themeColor textMright" @click="nextclick()">确定</el-button>
                  <el-button class="theBtn resetButton" @click="dialogVisible=false">取消</el-button>
                </div>
                <div class="konge"></div>
                <!-- <div class="dialog_pagination">
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
                </div> -->
              </div>
              </div>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
import { constants } from "fs";
export default {
  name: "depotsAdd",
  data() {
    return {
      hideK: false,
      showAdd: false,
      itemCode: "",
      name: "",
      warehouseCode: "",
      options: [],
      DeoptionList: [], //库区列表
      tableData: [], //新增仓库列表
      dialogVisible: false,
      AreaCode: "",
      radioList: "",
      regionId: "",
      pageNum: 1,
      pageSize: 20,
      total: 0
    };
  },
  created() {},
  methods: {
    // 库区列表
    SelectionArea() {
      this.dialogVisible = true;
      this.settingWare(this.pageNum, this.pageSize);
    },
    settingWare(pageNum, pageSize) {
      // this.$axios({
      //   url: "public/warehouse/list",
      //   method: "POST",
      //   headers: { "content-type": "application/x-www-form-urlencoded" },
      //   data: qs.stringify({
      //     token: sessionStorage.getItem("token"),
      //     name: this.itemCode,
      //     pageNum: this.pageNum,
      //     pageSize: this.pageSize
      //   })
      // })
      this.$axios
        .post(
          this.reqApi.xinls + `/exam/warehouse/list`,
          qs.stringify({
            token: sessionStorage.getItem("token"),
            questionCode: sessionStorage.getItem("questionUUid")
          })
        )
      .then(res => {
        if (res.data.code == "0000") {
          this.DeoptionList = res.data.data;
          // this.total = res.data.data.total;
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
        this.showAdd = true;
      }
    },
    // 库区查询，重置
    chaxun() {
      this.settingWare();
    },
    reseting() {
      this.itemCode = "";
      this.name = "";
      this.warehouseCode = "";
      this.settingWare();
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.settingWare(this.pageNum, val);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.settingWare(val, this.pageSize);
    },
    // 添加按钮
    addRetuen() {
      this.tableData.push({
        code: "",
        unit: "",
        name: "",
        spec: "",
        temperature: "",
        salesPrice: "",
        period: ""
      });
    },
    // 输入货号回车事件
    searthData(code, index) {
      // this.$axios({
      //   url: "public/goods/info",
      //   method: "POST",
      //   headers: { "content-type": "application/x-www-form-urlencoded" },
      //   data: qs.stringify({
      //     token: sessionStorage.getItem("token"),
      //     goodsCode: code
      //   })
      // })
      this.$axios
        .post(
          this.reqApi.xinls + `/exam/goods/detail`,
          qs.stringify({
            token: sessionStorage.getItem("token"),
            questionCode: sessionStorage.getItem("questionUUid"),
            code:code
          })
        ).then(res => {
        if (res.data.code == "0000") {
          this.tableData[index] = res.data.data.goods;

          this.$set(this.tableData, index, res.data.data.goods);
          console.log(this.tableData)
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
    // 删除
    delRetuen(index) {
      this.tableData.splice(index, 1);
    }, // 确定
    sure() {
      for (const i of this.tableData) {
        if (i.number === "") {
          this.$message.error("请输入货号");
          return false;
        }
      }
      const otherDep = this.tableData.map(item => {
        return {
          goodsCode: item.code,
          number: item.count
        };
      });
      for (const cou of otherDep) {
        if (cou.number === undefined) {
          this.$message.error("请输入出库数量");
          return false;
        }
      }
      if (otherDep == "") {
        this.$message.error("请添加出库信息");
        return false;
      }
      if (!this.AreaCode) {
        this.$message.error("请选择库区信息");
        return false;
      }
      // this.$axios({
      //   url: "warehouse/other/out/add",
      //   method: "POST",
      //   headers: { "content-type": "application/x-www-form-urlencoded" },
      //   data: qs.stringify({
      //     token: sessionStorage.getItem("token"),
      //     warehouseCode: this.regionId,
      //     goodsSet: JSON.stringify(otherDep)
      //   })
      // })
       this.$axios
        .post(
          this.reqApi.xinls + `/exam/warehouse/other/out/insert`,
          qs.stringify({
            token: sessionStorage.getItem("token"),
            questionCode: sessionStorage.getItem("questionUUid"),
            warehouseCode: this.regionId,
            goodsSet: JSON.stringify(otherDep)
          })
        ).then(res => {
        if (res.data.code == "0000") {
          this.$router.push({ name: "CKOtherdepots" });
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
    // 返回
    retuBack() {
      this.$router.push({ name: "CKOtherdepots" });
    }
  }
};
</script>
<style scoped>
.depotsAdd {
  /* background-color: #f1f6fa; */
}
.depotsAddBox {
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
}
.detailBackBtn{
  text-align: right;
  margin-right: 20px;
}
.depotsAdd_Box .block .el-button {
  margin: 0;
  margin-right: 10px;
}
.depotsAdd .nav {
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
.depotsAdd .depotsmonstration {
  padding: 0;
  margin: 0;
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
.addButt {
  height: 50px;
  text-align: center;
}
.soList {
  margin:0 20px;
}
.tableLlist {
  width: 100%;
  text-align: center;
}
.tableLlist th {
  background: #fff;
  color: #444;
  font-weight: 700;
  padding-left: 10px;
  padding-right: 10px;
  line-height: 23px;
  border: none;
  padding: 8px 0;
  text-align: center;
  border: 1px solid #dbe0e5;
  border-top: 1px solid #444;
}
.tableLlist tr {
  border-left: 1px solid #dbe0e5;
  border-right: 1px solid #dbe0e5;
}
table {
  border-collapse: collapse;
  font-size: 12px;
  /* font: 12px/25px '微软雅黑' '\5FAE\8F6F\96C5\9ED1', Arial, Helvetica, sans-serif;
  font-size: 14px;
  color: #444; */
}
.tableLlist tbody td {
  padding-left: 10px;
  padding-right: 10px;
  line-height: 23px;
  padding: 8px 0;
  text-align: center;
  font-size: 12px;
  color: #444;
  border: 1px solid #dbe0e5;
}
.tableLlist tbody tr:hover,
.tableLlist tbody tr:focus {
  background-color: #f0f3f5;
}
.inputTd {
  outline: none;
  border: 1px solid #dbe0e5;
  width: 80%;
  height: 28px;
  border-radius: 8px;
  line-height: 28px;
  /* padding-left: 16px; */
  text-align: center;
  box-sizing: content-box;
  color: #444;
}
.inputSelect {
  width: 80%;
  height: 32px;
}
.inputStup {
  width: 50%;
  display: inline-block;
  margin-bottom: 20px;
  padding: 0 5px;
}
.inputStup .el-input {
  width: 69%;
}
.tableBox{
  margin:0 20px;
}
.konge{
  height: 25px;
}
.dialogSureBox{
  text-align: center;
}
</style>


