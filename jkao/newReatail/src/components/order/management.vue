<template>
  <div class="chooseManger minimum" id="chooseManger">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="今日订购" name="first">
        <div class="xuanBox">
          <el-row style="white-space: nowrap; margin-bottom: 20px;">
            <el-col :span="6">
              <div class>
                <div class="classify">
                  <span class="textMr textTitle">商品分类:</span>
                  <div class="classify1">
                    <el-select
                      v-model="formInline.typeLevel1"
                      size="mini"
                      placeholder="请选择"
                      @change="choose"
                      class="select1"
                    >
                      <el-option
                        v-for="(item,index) in TypeLevel1"
                        :key="index"
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
                        v-for="(item,index) in TypeLevel2"
                        :key="index"
                        :label="item.name"
                        :value="item.code"
                      ></el-option>
                    </el-select>
                    <el-select v-model="formInline.typeLevel3" size="mini" placeholder="请选择">
                      <el-option
                        v-for="(item,index) in TypeLevel3"
                        :key="index"
                        :label="item.name"
                        :value="item.code"
                      ></el-option>
                    </el-select>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="6" class="textAlignCenter">
              <div class>
                <span class="textTitle textTitleR">温层：</span>
                <p class="TongYiInput">
                  <el-select v-model="formInline.temperature" size="mini" placeholder="请选择">
                    <el-option
                      v-for="(item,index) in hot"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </p>
              </div>
            </el-col>
            <el-col :span="6" class="textAlignCenter">
              <div class>
                <span class="textTitle textTitleR">货号：</span>
                <p class="TongYiInput">
                  <el-input type="text" placeholder="请输入" v-model="formInline.code" />
                </p>
              </div>
            </el-col>
            <el-col :span="6" class="textAlignRight">
              <div class>
                <span class="textTitle textTitleR">品名：</span>
                <el-input class="input1" type="text" placeholder="请输入货号" v-model="formInline.code" />
              </div>
            </el-col>
          </el-row>
          <el-row class="rowSpacing">
            <el-col :span="6">
              <div class>
                <span class="textMl textMr textTitle">国际条码:</span>
                <el-input
                  class="input1"
                  type="text"
                  style="margin-left: 0px;"
                  placeholder="请输入"
                  v-model="formInline.barcode"
                />
              </div>
            </el-col>
            <el-col :span="6">
              <div class></div>
            </el-col>
            <el-col :span="6">
              <div class></div>
            </el-col>
            <el-col :span="6" class="serchBox">
              <div class="textAlignRight">
                <el-button class="theBtn queryButton" @click="chaxun">查询</el-button>
                <el-button class="theBtn resetButton" @click="resets()">重置</el-button>
              </div>
            </el-col>
          </el-row>
          <el-row class="manOrderInfo">
            <el-col :span="6">
              <div style="white-space: nowrap;">
                <span class="manOrderInfoOne">创建日期:{{todayTime|converTime('YYYY-MM-DD')}}</span>
                <span class>订购品项数：</span>
                <span class="textRed manOrderInfoOne">{{tableData.length}}</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div style="margin-left: 20px;">
                <span class>订购总数量：</span>
                <span class="textRed manOrderInfoOne">{{orderingCountSum}}</span>
                <span class>订购总金额：</span>
                <span class="textRed manOrderInfoOne">{{orderingAmountSum}}</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div></div>
            </el-col>
            <el-col :span="6" style="margin-left:25%">
              <div class="textAlignRight">
                <el-button :disabled="showSubmit" @click="subBtn" style="margin: 0 8px;padding: 8px 19px;">提交</el-button>
                <el-button :disabled="show" type="info" v-if="disabledBtn" id="deleteBtn">删除</el-button>
                <el-button
                  plain
                  v-if="showBtn"
                  id="deleteBtn"
                  @click="delRow"
                  :class="{a:deleteBtn1}"
                >删除</el-button>
                <!-- <el-button :class="{a:deleteBtn1}">好</el-button> -->
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="xuanInfo">
          <div class="chooseleft">
            <el-table
              :data="tableData"
              style="width: 100%"
              border
              max-height="600"
              @select-all="selectAll"
              @select="detailInfo"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <!-- <el-table-column type="selection" width="30"></el-table-column> -->
              <el-table-column prop="code" label="货号" align="center"></el-table-column>
              <el-table-column prop="name" label="品名" align="center"></el-table-column>
              <el-table-column label="订购倍数" align="center">
                <template slot-scope="scope">
                  <el-input
                    class="inputWidth"
                    oninput="value=value.replace(/[^\d]/g,'')"
                    v-model="scope.row.orderingMultiple"
                    @keyup.enter.native="editTodayOrder(scope.row.orderingId,scope.row.orderingMultiple)"
                    min="1"
                    max="999"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="orderingCount" label="订购总数" align="center"></el-table-column>
              <el-table-column prop="orderingAmount" label="订购总金额" align="center"></el-table-column>
              <el-table-column prop="spec" label="规格" align="center"></el-table-column>
              <el-table-column prop="salesPrice" label="单品售价" align="center"></el-table-column>
              <el-table-column label="保质期" align="center">
                <template scope="scope">{{scope.row.period}}{{scope.row.periodUnit}}</template>
              </el-table-column>
              <el-table-column prop="temperature" label="温层" align="center"></el-table-column>
              <el-table-column prop="orderingUtil" label="基本订购单位" align="center"></el-table-column>
              <el-table-column prop="minOrderingMultiple" label="最小订购倍数" align="center"></el-table-column>
              <el-table-column prop="maxOrderingMultiple" label="最大订购倍数" align="center"></el-table-column>
            </el-table>
            <div style="height:50px">
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
      </el-tab-pane>
      <el-tab-pane label="全部叫货单" name="second"></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import qs from "qs";
// import invoice from "./invoice";
export default {
  data() {
    return {
      orderingCountSum: 0,
      orderingAmountSum: 0,
      formInline: {
        typeLevel1: "",
        typeLevel2: "",
        typeLevel3: "",
        barcode: "", //国际条形码
        temperature: "", //	温层
        code: "", //	商品编码(货号)
        name: "" //	商品名
      },
      todayTime: new Date(),
      tableData: [],
      TypeLevel1: [],
      TypeLevel2: [],
      TypeLevel3: [],
      todayList: [],
      hot: [], //温层下拉选
      pageNum: 1,
      pageSize: 20,
      total: 0,
      delCode: "",
      idsetArr: [],
      show: true,
      deleteBtn1: false,
      disabledBtn: true,
      showBtn: false,
      activeName: "first",
      showSubmit:false
    };
  },
  // components: {
  //   invoice: invoice
  // },
  created() {
    this.orderInfoList(this.pageNum, this.pageSize);
    this.showother();
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
      .catch(err => {
        console.log("数据异常", err);
      });
  },
  mounted: function() {
    var orderHeight = document.body.clientHeight;
    // document.getElementById("order-list").style.height = orderHeight + "px";
    let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(() => {
      _this.todayTime = new Date(); // 修改数据date
    }, 1000);
  },
  methods: {
    handleClick(tab, event) {
      if (this.activeName == "second") {
        this.$router.push({
          name: "invoice"
        });
      }
      /*  if(tab.$options.propsData.label==='全部叫货单'){
         return this.toInvoice()
      }else {
        this.$router.push({
          name:'management'
        })
      } */
    },
    toInvoice() {
      this.$router.push({
        name: "invoice"
      });
    },
    detailInfo(selection, row) {
      this.idsetArr = [];
      selection.forEach(item => {
        this.idsetArr.push(item.orderingId);
      });
      if (this.idsetArr.length > 0) {
        this.show = false;
        this.disabledBtn = false;
        this.showBtn = true;
        this.deleteBtn1 = true;
      } else {
        this.show = true;
        this.disabledBtn = true;
        this.deleteBtn1 = false;
        this.showBtn = false;
      }
    },
    selectAll(selection) {
      this.idsetArr = [];
      selection.forEach(item => {
        this.idsetArr.push(item.orderingId);
      });
      if (this.idsetArr.length > 0) {
        this.show = false;
        this.disabledBtn = false;
        this.showBtn = true;
        this.deleteBtn1 = true;
      } else {
        this.show = true;
        this.disabledBtn = true;
        this.deleteBtn1 = false;
        this.showBtn = false;
      }
    },
    delRow() {
      if (this.idsetArr.length == 0) {
        this.$message.error("请选择要删除的信息");
      } else {
        this.$axios({
          url: window.apiStore + "ordering/today/delete",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            token: sessionStorage.getItem("token"),
            idSet: JSON.stringify(this.idsetArr)
          })
        }).then(res => {
          if (res.data.code == "0000") {
            this.$message({
              type: "success",
              message: "删除成功"
            });
            this.idsetArr = [];
            this.orderInfoList();
            if (this.idsetArr.length == 0) {
              this.show = true;
              this.disabledBtn = true;
              this.deleteBtn1 = false;
              this.showBtn = false;
            }
          }
        });
      }
    },
    subBtn() {
      if (this.tableData.length <= 0) {
        this.showSubmit = true;
      } else {
        this.$axios({
            url: window.apiStore + "ordering/today/submit",
            method: "POST",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            data: qs.stringify({
              token: sessionStorage.getItem("token"),
            })
          }).then(res => {
            if (res.data.code == "0000") {
              this.$message({
                type: "success",
                message: "提交成功"
              });
              this.orderInfoList();
            }else return this.$message.error(res.data.msg)
          });
      }
    },
    // 温层下拉选
    showother() {
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
          if ((res.data.code = "0000")) {
            this.hot = res.data.data;
          }
        })
        .catch(err => {
          console.log("数据异常", err);
        });
    },
    // 全部叫货单
    Allorder() {
      this.$router.push({ name: "invoice" });
    },
    orderInfoList(pageNum, pageSize) {
      let that = this;
      let token = sessionStorage.getItem("token");
      that
        .$axios({
          url: window.apiStore + "ordering/today/list",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            token: token,
            pageNum: that.pageNum,
            pageSize: that.pageSize,
            typeLevel1: that.formInline.typeLevel1,
            typeLevel2: that.formInline.typeLevel2,
            typeLevel3: that.formInline.typeLevel3,
            barcode: that.formInline.barcode,
            temperature: that.formInline.temperature,
            code: that.formInline.code,
            name: that.formInline.name
          })
        })
        .then(res => {
          if (res.data.code == "0000") {
            that.tableData = res.data.data.list;
            that.total = res.data.data.total;
            that.orderingCountSum = 0;
            that.orderingAmountSum = 0;
            for (const iterator of that.tableData) {
              that.orderingCountSum += iterator.orderingCount - 0;
              that.orderingAmountSum += iterator.orderingAmount - 0;
            }
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
        })
        .catch(err => {
          console.log("数据异常", err);
        });
    },
    // 修改
    editTodayOrder(orderingId, orderingMultiple) {
      let that = this;
      let id = orderingId;
      let multiple = orderingMultiple;
      let token = sessionStorage.getItem("token");
      that
        .$axios({
          url: window.apiStore + "ordering/today/update",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            token: token,
            id: id,
            multiple: multiple
          })
        })
        .then(res => {
          if (res.data.code == "0000") {
            this.$message({
              type: "success",
              message: "修改成功"
            });
            this.orderInfoList();
          }
        })
        .catch(err => {
          console.log("数据异常", err);
        });
    },
    // change事件
    choose(value) {
      this.formInline.typeLevel2 = "";
      this.formInline.typeLevel3 = "";
      let token = sessionStorage.getItem("token");
      this.$axios({
        url: window.apiUrl + "goods/type/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          pcode: value,
          token: token
        })
      })
        .then(res => {
          if (res.data.code == "0000") {
            this.TypeLevel2 = res.data.data;
          }
        })
        .catch(err => {
          console.log("数据异常", err);
        });
    },
    // 下拉change事件
    choose2(value) {
      this.formInline.typeLevel3 = "";
      let token = sessionStorage.getItem("token");
      this.$axios({
        url: window.apiUrl + "goods/type/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          pcode: value,
          token: token
        })
      })
        .then(res => {
          if (res.data.code == "0000") {
            this.TypeLevel3 = res.data.data;
          }
        })
        .catch(err => {
          console.log("数据异常", err);
        });
    },
    // 查询 重置
    chaxun() {
      this.orderInfoList();
    },
    resets() {
      this.formInline.typeLevel1 = "";
      this.formInline.typeLevel2 = "";
      this.formInline.typeLevel3 = "";
      this.formInline.barcode = "";
      this.formInline.temperature = "";
      this.formInline.name = "";
      this.formInline.code = "";
      this.orderInfoList();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.orderInfoList(this.pageNum, val);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.orderInfoList(val, this.pageSize);
    }
  }
};
</script>
<style scoped>
.chooseManger {
  /* min-height: 647px; */
  min-width: 1600px;
  overflow: auto;
}
#chooseManger .classify {
  width: 100%;
  height: 32px;
}
#chooseManger .classify1 {
  width: 300px;
  display: inline-block;
  box-sizing: border-box;
}
#chooseManger .classify1 .el-select {
  width: 31%;
  margin-left: 10px;
}
#chooseManger .textMr {
  margin-right: 10px;
}
#chooseManger .classify1 .select1 {
  margin-left: 0;
}
#chooseManger .serchBox {
  margin-left: 50%;
}
#chooseManger .serchBoxContent {
  width: 360px;
  text-align: right;
}
#chooseManger .input1 > .el-input__inner:focus {
  border-color: #5f5f5f;
}
.el-button.is-plain:focus,
.el-button.is-plain:hover {
  background-color: rgba(229, 1, 9, 0.9);
  transform: scale(1.01);
  /* background-color: #e50109; */
  color: #fff;
  border-color: #e50109;
}
#deleteBtn {
  margin: 0;
  padding: 8px 19px;
}
.xuanBox {
  margin: 0 20px;
  margin-bottom: 10px;
}
.manOrderInfoOne {
  margin-right: 70px;
}
.textRed {
  color: #e50109;
}
.a {
  background-color: #e50109;
  color: #fff;
  border-color: #e50109;
}
.xuanBox,
.xuanInfo {
  background: #fff;
}
.colright {
  text-align: right;
}
.manOrderInfo {
  height: 40px;
  font-size: 16px;
  line-height: 40px;
}
.el-tabs--border-card {
  box-shadow: none;
  border: none;
}
.inputWidth {
  width: 70%;
}
/* tab stylestart */
.el-card {
  display: inline-block;
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  width: 98px;
  height: 40px;
  box-shadow: none;
}
#chooseManger .today {
  text-align: center;
  padding: auto;
  padding: 10px 0;
  height: 46px;
}
</style>
