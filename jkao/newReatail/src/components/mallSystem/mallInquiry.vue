<template>
  <div class="mallInquiry">
    <div class="storeBox">
      <div class="store_Box">
        <p class="store_tit">库存查询</p>
        <el-row style="white-space: nowrap;">
          <el-col :span="6">
            <span>品名：</span>
            <p>
              <el-input class="input1" type="text" placeholder="请输入" v-model="goodsName"></el-input>
            </p>
          </el-col>
          <el-col :span="6" class="TongCenter">
            <span>货号：</span>
            <p>
              <el-input class="input1" type="text" placeholder="请输入" v-model="goodsCode"></el-input>
            </p>
          </el-col>
          <el-col :span="6" class="TongCenter">
            <span>国际条码：</span>
            <p>
              <el-input class="input1" type="text" placeholder="请输入" v-model="barcode"></el-input>
            </p>
          </el-col>
          <el-col :span="6" class="TongRight">
            <span>存放货位：</span>
            <p>
              <el-input class="input1" type="text" placeholder="请输入" v-model="locationCode"></el-input>
            </p>
          </el-col>
        </el-row>
        <div class="konge"></div>
        <el-row>
          <el-col class="TongRight">
            <el-button class="theBtn queryButton" @click="checkStock">查询</el-button>
            <el-button @click="resStock" class="theBtn resetButton">重置</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="storeInfo">
      <div class="store_Box1">
        <el-table :data="tableData" style="width: 100%;" max-height="600">
          <el-table-column prop="code" label="货号" align="center"></el-table-column>
          <el-table-column prop="name" label="品名" align="center" width="150"></el-table-column>
          <el-table-column prop="barcode" label="国际条码" align="center" width="150"></el-table-column>
          <el-table-column prop="spec" label="规格" align="center"></el-table-column>
          <el-table-column prop="unit" label="单位" align="center"></el-table-column>
          <el-table-column label="保质期" align="center">
            <template scope="scope">{{scope.row.period}}{{scope.row.periodUnit}}</template>
          </el-table-column>
          <el-table-column prop="temperature" label="温层" align="center"></el-table-column>
          <el-table-column prop="warehouseName" label="所在仓库" align="center" width="150"></el-table-column>
          <el-table-column prop="locationCode" label="存放货位" align="center"></el-table-column>
          <el-table-column prop="stock" label="现有数量" align="center"></el-table-column>
          <el-table-column prop="frozenStock" label="分配数量" align="center"></el-table-column>
        </el-table>
        <div class="konge"></div>
        <div class="paginStyle">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[20,40,60]"
            :page-size="pageSize"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            class="pagination"
          ></el-pagination>
        </div>
        <div class="konge"></div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  name: "mallInquiry",
  data() {
    return {
      goodsCode: "", //货号
      goodsName: "", //品名
      barcode: "", //国际条码
      locationCode: "", //存放货位
      tableData: [],
      pageNum: 1,
      pageSize: 20,
      total: 0
    };
  },
  created(){
    this.stockList();
  },
  methods:{
    stockList(pageNum,pageSize){
      this.$axios({
        url:window.apiMall+'stock/list',
        method:'POST',
        headers:{'content-type': 'application/x-www-form-urlencoded'},
        data:qs.stringify({
          token:sessionStorage.getItem('token'),
          goodsCode:this.goodsCode,
          goodsName:this.goodsName,
          barcode:this.barcode,
          locationCode:this.locationCode,
          pageNum:this.pageNum,
          pageSize:this.pageSize
        })  
      }).then(res=>{
        if(res.data.code=='0000'){
          this.tableData = res.data.data.list;
          this.total = res.data.data.total;  
        }else if(res.data.code=="6666"){
          this.$message({
          showClose: true,
          message: 'token异常，请重新登录',
          type: 'error'
        });
        const timer = setTimeout(() => {
          clearTimeout(timer)
          this.$router.push({name: "login"})}, 3000)
        }else{
          this.$message.error(res.data.msg);
        }
      })
    },
    // 查询 重置
    checkStock(){
      this.stockList();
    },
    resStock(){
      this.goodsCode = '';	//货号
      this.goodsName = '';	//品名
      this.barcode = '';	//国际条码
      this.locationCode = '';	//存放货位
      this.stockList();
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val
      this.stockList(this.pageNum, val)    
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.stockList(val, this.pageSize)            
    },
  }
};
</script>
<style scoped>
.mallInquiry {
  background-color: #fff;
  height: 100%;
  min-height: 647px;
  min-width: 1700px;
  box-shadow: 0px 2px 10px #ccc;
}
p {
  display: inline-block;
  width: 300px;
}
.mallInquiry .el-range-editor.el-input__inner {
  width: 100%;
}
.mallInquiry .el-select {
  width: 100%;
}
.storeBox222 {
  height: 150px;
}
.paginStyle {
  height: 50px;
  text-align: right;
}
</style>