<template>
  <div class="Choose" id="choose">
    <div class="xuanBox">
      <div class="xuan_Store_Box">
        <div class="tishi">
          <h3 class="xuan_tit">选品订购</h3>
          <span class="xuantip">您可以根据自己的需求订购商品</span>
        </div>
        <el-row style="white-space: nowrap; margin-bottom: 20px;">
          <el-col :span="6">
            <div class="classify">
              <span class="textMright textTitle textTitleR">商品分类:</span>
              <div class="classify1">
                <el-select
                  v-model="formInline.typeLevel1"
                  size="mini"
                  placeholder="请选择"
                  class="select1"
                  @change="choose"
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
          </el-col>
          <el-col :span="6" class="textAlignCenter">
            <div class="grid-content bg-purple-light">
              <span class="textTitle textTitleR">品名：</span>
              <el-input class="input1" type="text" placeholder="请输入" v-model="formInline.name" />
            </div>
          </el-col>
          <el-col :span="6" class="textAlignCenter">
            <div class="grid-content bg-purple">
              <span class="textTitle textTitleR">温层：</span>
              <p class="TongYi">
                <el-select v-model="formInline.temperature" size="mini" placeholder="请选择">
                  <el-option
                    v-for="item in tempera"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </p>
            </div>
          </el-col>
          <el-col :span="6" class="textAlignRight">
            <div class="grid-content bg-purple-light">
              <span class="textTitle70px">国际条码：</span>
              <p class="TongYi">
                <el-input class="input1" type="text" placeholder="请输入货号" v-model="formInline.barcode" />
              </p>
            </div>
          </el-col>
        </el-row>
        <el-row  >
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <span class="textTitle textTitleR textMright">货号:</span>
              <el-input class="input1" type="text" placeholder="请输入货号" v-model="formInline.code" />
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light"></div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple"></div>
          </el-col>
          <el-col :span="6" class="serchBox colMleft50">
            <div class="textAlignRight">
              <el-button @click="chaxun" class="queryButton theBtn">查询</el-button>
              <el-button @click="resetForm()" class="resetButton theBtn">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="tipcho">
        注意：1.输入订购倍数点击键盘回车键将自动保存至【叫货单管理-今日订购】，提交前可随时修改或删除。
        2.每个门店当天只能提交一次订购，商品提交后系统将生成对应的叫货单，只需等待供应商或者仓库配送即可。
      </div>
    </div>
    <!-- 表格 -->
    <div class="xuanInfo">
      <div class="chooseleft">
        <el-table
          :data="tableData"
          @row-click="detailInfo"
          highlight-current-row
          id="hiegLine"
          min-width="100%"
          height="100%"
        >
          <el-table-column prop="code" align="center" label="货号"></el-table-column>
          <el-table-column prop="name" align="center" label="品名"></el-table-column>
          <el-table-column label="订购倍数" align="center">
            <template scope="scope">
              <input
                :class="`input_enter${scope.$index}`"
                oninput="value=value.replace(/[^\d]/g, '').replace(/^0{1,}/g,'')"
                @keyup.enter="onSubmit(scope.row, scope.$index)"
                maxlength="10"
                class="number"
                type="text"
                v-model="scope.row['multiple']"
              />
            </template>
          </el-table-column>
          <el-table-column label="订购总数" align="center">
            <template scope="scope">{{scope.row.orderingUtil * scope.row['multiple'] || 0}}</template>
          </el-table-column>
          <el-table-column prop="ordermoney" label="订购总金额" align="center">
            <template scope="scope">{{(scope.row['multiple']*scope.row.salesPrice)| numFilter}}</template>
          </el-table-column>
          <el-table-column prop="spec" label="规格" align="center"></el-table-column>
          <el-table-column prop="salesPrice" label="单品售价" align="center"></el-table-column>
        </el-table>
      </div>
      <div class="chooseright">
        <div class="shang">
          <div class="shangleft">
            <ul>
              <li>当前库存:{{listInfo.stock}}</li>
              <li>基本订购单位:{{listInfo.orderingUtil}}</li>
              <li>最小订购倍数:{{listInfo.minOrderingMultiple}}</li>
              <li>最大订购倍数:{{listInfo.maxOrderingMultiple}}</li>
              <li>在途量:{{listInfo.onTheRoad}}</li>
            </ul>
            <!-- <p>当前库存:{{listInfo.stock}}</p>
            <p>基本订购单位:{{listInfo.orderingUtil}}</p>
            <p>最小订购倍数:{{listInfo.minOrderingMultiple}}</p>
            <p>最大订购倍数:{{listInfo.maxOrderingMultiple}}</p>
            <p>在途量:{{listInfo.onTheRoad}}</p> -->
          </div>
          <div class="shangright">
            <ul>
              <li>温层:{{listInfo.temperature}}</li>
              <li>保质期:{{listInfo.period}}{{listInfo.periodUnit}}</li>
              <li>预计到货日期:{{listInfo.estimatedArrivalTime | converTime('YYYY-MM-DD')}}</li>
              <li>销订比:{{listInfo.orderRatio}}</li>
              <li></li>
            </ul>
           
          </div>
        </div>
        <div class="xia"></div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  data() {
    return {
      formInline: {
        token: sessionStorage.getItem("token"),
        code: "",
        name: "", //商品名称
        typeLevel1: "", //	类型1
        typeLevel2: "", //	类型2
        typeLevel3: "", //	类型3
        barcode: "", //	国际条码
        temperature: "", //温层
        pageSize: 999
        // unit:'',//单位
        // status:'',//状态
        // spec:'',//规格
        // salesPrice:'',//售价
        // createTime:'',//创建时间
      },
      tempera: [],
      orderNum: "",
      goodsCode: "", //商品编号
      multiple: "", //倍数
      TypeLevel1: [],
      TypeLevel2: [],
      TypeLevel3: [],
      tableData: [],
      listInfo: {}
    };
  },
  created() {
    this.EnterInfo();
    this.showother();
  },
  mounted() {
    // 进入页面就执行商品类型列表
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
  methods: {
    EnterInfo() {
      let that = this;
      let token = sessionStorage.getItem("token");
      that
        .$axios({
          url: window.apiStore + "ordering/goods/list",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify(that.formInline)
        })
        .then(res => {
          if (res.data.code == "0000") {
            that.tableData = res.data.data.list;
            that.tableData.forEach((item, index) => {});
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
            that.$message(res.data.msg);
          }
        })
        .catch(err => {
          console.log("数据异常", err);
        });
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
            this.tempera = res.data.data;
          }else return this.$message.error(res.data.msg)
        })
        .catch(err => {
          console.log("数据异常", err);
        });
    },
    // 详情
    detailInfo(row) {
      let that = this;
      let token = sessionStorage.getItem("token");
      let goodsCode = row.code;
      that
        .$axios({
          url: window.apiStore + "ordering/goods/datail",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            token,
            goodsCode
          })
        })
        .then(res => {
          if (res.data.code == "0000") {
            that.listInfo = res.data.data;
          }
        })
        .catch(err => {
          console.log("数据异常", err);
        });
    },
    //回车新增
    onSubmit(row, i) {
      let goodsCode = row.code;
      let token = sessionStorage.getItem("token");
      let multiple = row.multiple;
      this.$axios({
        url: window.apiStore + "ordering/today/inset",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: token,
          multiple: multiple,
          goodsCode: goodsCode
        })
      })
        .then(res => {
          if (res.data.code == "0000") {
            this.tableData[i].multiple = '';
            const el = document.getElementsByClassName(`input_enter${i}`)[0];
            el.blur();
            this.$message({
              showClose: true,
              message: "订购成功",
              type: "success"
            });
            
            // this.$router.push({ name: "management" });
          }
        })
        .catch(err => {
          console.log("数据异常", err);
        });
    },
    // 查询
    chaxun() {
      this.EnterInfo();
    },
    // 重置
    resetForm() {
      this.formInline.code = "";
      this.formInline.name = ""; //商品名称
      this.formInline.typeLevel1 = ""; //	类型1
      this.formInline.typeLevel2 = ""; //	类型2
      this.formInline.typeLevel3 = ""; //	类型3
      this.formInline.barcode = ""; //	国际条码
      this.formInline.temperature = ""; //温层
      this.formInline.unit = ""; //单位
      this.formInline.status = ""; //状态
      this.formInline.spec = ""; //规格
      this.formInline.salesPrice = ""; //售价
      this.formInline.createTime = ""; //创建时间
      this.EnterInfo();
    },
    // change事件
    choose(value) {
      this.formInline.typeLevel2 = "";
      this.formInline.typeLevel3 = "";
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
    }
  },
  filters: {
    numFilter(value) {
      if (isNaN(value)) {
        return (value = 0);
      } else {
        let tempVal = parseFloat(value).toFixed(3);
        let realVal = tempVal.substring(0, tempVal.length - 1);
        return realVal;
      }
    }
  }
};
</script>
<style scoped>
#choose .classify {
  width: 100%;
  height: 32px;
}
#choose .textMl {
  margin-left: 22px;
}
#choose .textMright {
  margin-right: 10px;
}
#choose .classify1 {
  width: 300px;
  display: inline-block;
  box-sizing: border-box;
}
#choose .classify1 .el-select {
  width: 31%;
  margin-left: 10px;
}

#choose .classify1 .select1 {
  margin-left: 0;
}

#choose .input1 .el-input__inner {
  height: 32px;
}
#choose .input1 > .el-input__inner:focus {
  border-color: #5f5f5f;
}
.serchBox {
  /* position: absolute;
  right: 49px; */
}
.theBtn {
  margin: 0;
  width: 69px;
  height: 32px;
  padding: 0px 20px;
  box-sizing: border-box;
}
.serchBoxContent {
  text-align: right;
  width: 370px;
}
.Choose {
  width: 100%;
  height: 100%;
  display: flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  flex-direction: column;
  box-sizing: border-box;
  min-width: 1600px;
  min-height: 850px;
  overflow: auto;
}
.xuanBox {
  /* margin: 0 auto; */
  background: #fff;
  /* border-radius: 10px; */
  height: 200px;
  box-sizing: border-box;
  /* border-bottom: 1px solid #444; */
  padding-bottom: 3px;
}
.xuanInfo {
  flex: 1;
  box-sizing: border-box;
  position: relative;
}
.xuan_Store_Box {
  margin: 0 20px;
}
.cit {
  width: 30%;
}
.shop2 {
  margin: 0 4px;
}
.TongYi {
  width: 300px;
}
.sotlname {
  width: 300px;
  height: 32px;
}
.sotlname2 {
  width: 75%;
}
.colright {
  text-align: right;
}
.cit,
.TongYi,
.sotlname,
.sotlname2 {
  display: inline-block;
}
.Choose .el-range-editor.el-input__inner {
  width: 100%;
}
.tishi {
  padding-top: 20px;
  padding-bottom: 10px;
}
.xuan_Store_Box .tishi .xuan_tit {
  margin-bottom: 5px;
}
.xuantip {
  color: #c8c8c8;
}
.zhanwei {
  display: inline-block;
  width: 20px;
}
.zhanwei2 {
  display: inline-block;
  width: 30px;
}
.jianju {
  margin-right: 5px;
}
.chooseleft,
.chooseright {
  position: absolute;
}
.chooseleft {
  top: 0;
  left: 0;
  /* float: left; */
  width: 66%;
  /* box-shadow: 0px 2px 10px #ccc; */
  height: 100%;
  /* overflow: auto; */
  box-sizing: border-box;
}
/* 滚动条 */
/* .chooseleft::-webkit-scrollbar {
  width: 10px;
}

.chooseleft::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.2);
}

.chooseleft::-webkit-scrollbar-track {
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
} */

.chooseright {
  right: 0;
  top: 0;
}
.xuanInfo .chooseright {
  /* float: right; */
  width: 33%;
}
.chooseleft .number {
  outline: none;
  border: 1px solid #ccc;
  width: 50px;
  height: 28px;
  text-align: center;
  border-radius: 5px;
}
.chooseright .shang {
  height: 158px;
  width: 100%;
}
.two {
  padding: 0 20px;
}
.shang .shangleft,
.shang .shangright {
  display: inline-block;
  /* float: left; */
  line-height: 25px;
  
}
.shang .shangright {
  /* margin: 20px 0 0 0; */
}
.shang .shangleft {
  margin: 20px 70px 0 25px;
}
.tipcho {
  color: red;
  margin-left: 20px;
  margin-top: 5px;
}
</style>
