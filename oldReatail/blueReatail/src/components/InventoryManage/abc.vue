<template>
  <div class="KinventorManager">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>库存管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="inverBox">
      <div class="manger">
        <h3 class="kmanager">库存管理</h3>
        <table width="100%">
          <tr>
            <td colspan="3" width="45%" class="inleft">
              城市：
              <!-- 省市区 -->
              <el-select v-model="from.inProvince" placeholder="请选择" @change="chooseProvince">
                <el-option
                  v-for="item in province"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>

              <el-select v-model="from.inCity" placeholder="请选择" @change="chooseCity">
                <el-option
                  v-for="item in city"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>

              <el-select v-model="from.inArea" placeholder="请选择" @change="chooseArea">
                <el-option
                  v-for="item in area"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </td>
            <td width="22.5%">
              门店编号：
              <el-input type="text" placeholder="请输入" v-model="from.code"></el-input>
            </td>
            <td width="22.5%">
              门店名称：
              <el-input type="text" placeholder="请输入" v-model="from.name"></el-input>
            </td>
          </tr>
        </table>
      </div>
      <div class="btn">
        <button class="seach" @click="seach">查询</button>
        <button class="result" @click="result">重置</button>
      </div>
    </div>
    <div class="warpper">
      <div class="left">
        <div class="left_list">
          <h3 class="same">门店列表</h3>
          <div class="searchList">
            <table table-bordered width="100% ">
              <tr>
                <th>门店编号</th>
                <th>门店名称</th>
              </tr>
              <tr class="hove" v-for="item in list" :key="item.code" @click="stock(item.code)">
                <td>{{item.code}}</td>
                <td>{{item.name}}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="tab">
          <div class="shopList">
            <h3 class="same1">商品列表</h3>
            <p>
              时间：
              <el-date-picker
                @change="change($event, 'data1')"
                v-model="date1"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </p>
          </div>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="goodsCode" label="货号" width="180"></el-table-column>
            <el-table-column prop="goodsName" label="商品名称" width="180"></el-table-column>
            <el-table-column prop="spec" label="规格"></el-table-column>
            <el-table-column prop="unit" label="单位"></el-table-column>
            <el-table-column prop="stock" label="库存量"></el-table-column>
          </el-table>
        </div>
        <!-- 分页 -->
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagenum"
            :page-sizes="pagesizes"
            :page-size="pagesize"
            layout="prev, pager, next, jumper,total, sizes"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  data() {
    return {
      list: [],
      from: {
        inProvince: "", //省
        inCity: "", // 市
        inArea: "", // 区
        code: "",
        name: ""
      },
      province: [], //下拉遍历省
      city: [], //下拉遍历市
      area: [], //下拉遍历区
      input: "",
      input2: "",
      inputnum: "",
      inputname: "",
      date1: "",
      value: "",
      value1: "",
      value2: "",
      value3: "",
      form: {
        token: sessionStorage.getItem("token"),
        pageNum: 1,
        storeCode: "",
        time: ""
      },

      tableData: [],
      total: 10,
      pagesize: 2,
      pagesizes: [1, 2, 3, 4],
      pagenum: 1
    };
  },
  created() {
    this.getcode();
  },
  mounted() {
    // 进入页面就执行城市列表
    let that = this;
    that.$axios
      .post("/sys/city/list")
      .then(res => {
        if (res.data.code == "0000") {
          that.province = res.data.data;
        }
      })
      .catch(err => {
        console.log("数据异常", err);
      });
  },
  methods: {
    handleSizeChange(val) {
      this.form.pageNum = val;
      var stock = [];
      stock.storeCode = sessionStorage.getItem("storeCode");
      stock.pageNum = val ;
      stock.token = sessionStorage.getItem("token");
      let formData = new FormData();
      const obj = stock;
      Object.keys(obj).forEach(key => {
        formData.append(key, obj[key]);
      });
      this.$axios.post("/sys/stock/list", formData).then(res => {
        if (res.data.code == "0000") {
          this.tableData = res.data.data.list;
        }
      });
    },
    handleCurrentChange(val) {
      this.form.pageNum = val;
      var stock = [];
       stock.storeCode = sessionStorage.getItem("storeCode");
      stock.pageNum = val ;
      stock.token = sessionStorage.getItem("token");
      let formData = new FormData();
      const obj = stock;
      Object.keys(obj).forEach(key => {
        formData.append(key, obj[key]);
      });
      this.$axios.post("/sys/stock/list", formData).then(res => {
        if (res.data.code == "0000") {
          this.tableData = res.data.data.list;
        }
      });
    },
    seach() {
      this.getcode();
    },
    result() {
      this.from.inProvince = "";
      this.from.inCity = "";
      this.from.inArea = "";
      this.from.code = "";
      this.from.name = "";
    },
    onSubmit() {},
    change(e,name) {
      this.form.time = this.$moment(e[0]).format("YYYY-MM-DD");
        var stock = [];
      stock.time = this.form.time;
        stock.storeCode = sessionStorage.getItem("storeCode");
      stock.token = sessionStorage.getItem("token");
      let formData = new FormData();
      const obj = stock;
      Object.keys(obj).forEach(key => {
        formData.append(key, obj[key]);
      });
      this.$axios.post("/sys/stock/list", formData).then(res => {
        if (res.data.code == "0000") {
          this.tableData = res.data.data.list;
        }
      });
    },
    getcode() {
      var bianji = [];
      bianji.token = sessionStorage.getItem("token");
      bianji.pageSize = 9999999;
      bianji.inProvince = this.from.inProvince;
      bianji.inCity = this.from.inCity;
      bianji.inArea = this.from.inArea;
      bianji.code = this.from.code;
      bianji.name = this.from.name;
      let formData = new FormData();
      const obj = bianji;
      Object.keys(obj).forEach(key => {
        formData.append(key, obj[key]);
      });
      this.$axios.post("/sys/store/list", formData).then(res => {
        if (res.data.code == "0000") {
          this.list = res.data.data.list;
        }
      });
    },
    chooseProvince(value) {
      for (const key in this.from.inProvince) {
        if (this.from.inProvince[key].id == value)
          this.province = this.from.inProvince[key].name;
      }
      this.from.inCity = "";
      this.from.inArea = "";
      this.$axios({
        url: "/sys/city/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          pid: value
        })
      })
        .then(res => {
          if (res.data.code == "0000") {
            this.city = res.data.data;
          }
        })
        .catch(err => {
          console.log("数据异常", err);
        });
    },
    // 市下拉change事件
    chooseCity(value) {
      for (const key in this.from.inCity) {
        if (this.from.inCity[key].id == value)
          this.city = this.from.inCity[key].name;
      }
      this.inArea = "";
      this.$axios({
        url: "/sys/city/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          pid: value
        })
      })
        .then(res => {
          if (res.data.code == "0000") {
            this.area = res.data.data;
          }
        })
        .catch(err => {
          console.log("数据异常", err);
        });
    },
    chooseArea(value) {
      for (const key in this.from.inArea) {
        if (this.from.inArea[key].id == value)
          this.ruleForm.area = this.from.inArea[key].name;
      }
    },
    stock(e) {
        sessionStorage.setItem('storeCode',e)
      var stock = [];
      stock.storeCode = e;
      stock.token = sessionStorage.getItem("token");
      let formData = new FormData();
      const obj = stock;
      Object.keys(obj).forEach(key => {
        formData.append(key, obj[key]);
      });
      this.$axios.post("/sys/stock/list", formData).then(res => {
        if (res.data.code == "0000") {
          this.tableData = res.data.data.list;
        }
      });
    }
  }
};
</script>
<style scoped>
.KinventorManager {
  background-color: #f1f6fa;
  min-height: 647px;
  min-width: 1240px;
}
.inverBox {
  margin-bottom: 20px;
  height: 150px;
  background-color: #fff;
  border-radius: 10px;
}
.manger {
  margin: 0 20px;
  line-height: 38px;
}
.kmanager{
  margin-bottom: 0px;
  padding-bottom: 0px;
}
.inverBox .el-select {
  width: 176px;
  margin: 0 3px;
}
.inverBox .el-input {
  width: 222px;
}
.inleft {
  text-align: left;
}
.warpper {
  display: flex;
  clear: both;
}
.left {
  flex: 1.4;
  background-color: #fff;
  border-radius: 5px;
  margin-right: 30px;
}
.left_list {
  margin: 0px 20px;
}
.search {
  position: relative;
  height: 30px;
  margin-bottom: 15px;
}
.search input {
  border-radius: 0;
  width: 80%;
}
.search .search-btn {
  width: 20%;
  height: 30px;
  position: absolute;
  top: 0px;
  color: #fff;
  background-color: #31b5ff;
  border: none;
}
.search-btn:hover {
  cursor: pointer;
  opacity: 0.7;
}
.searchList {
  border: 1px solid #c2cad8;
  padding: 5px;
  max-height: 550px;
  overflow-y: scroll;
}
.searchList table tr:last-child {
  border-bottom: none;
}
/* 右边表格部分 */
.right {
  flex: 3;
  background-color: #fff;
  border-radius: 5px;
}
.btn {
  margin: 20px 10px;
  float: right;
}
.btn button {
  width: 80px;
  height: 30px;
  border: 1px solid #31b5ff;
  margin-left: 15px;
  border-radius: 5px;
}
.seach {
  background-color: #31b5ff;
  color: #fff;
}
.seach:hover {
  opacity: 0.7;
}
.result {
  background: #ffffff;
  color: #31b5ff;
}
.result:hover {
  background-color: #31b5ff;
  opacity: 0.7;
  color: #fff;
}
.tab {
  margin: 0 25px 40px;
  clear: both;
}
.block {
  float: right;
  margin-right: 18px;
}
.same,
.same1 {
  border-left: 3px solid #01c8dc;
  padding-left: 8px;
  color: #888888;
  margin-bottom: 0;
  padding-bottom: 0;
}
/* .same {
  margin: 20px 0;
} */
.shopList {
  margin-top: 20px;
}
.shopList .same1,
.shopList p {
  display: inline-block;
}
.shopList p {
  float: right;
}
.hove{
  border-top: 1px solid #ccd3df;
  border-bottom: 1px solid #ccd3df;
  height: 40px;
  overflow-y: scroll;
}
.hove:hover{
  background-color: #dcf9fc;
  cursor: pointer;
} 
</style>
