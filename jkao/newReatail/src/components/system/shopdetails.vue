<template>
  <div class="caigouWaper">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
      <el-breadcrumb-item :to="{ path: '/suppIndex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item >订单管理</el-breadcrumb-item>
      <el-breadcrumb-item >采购单管理</el-breadcrumb-item>
    </el-breadcrumb> -->
    <div class="shopdetails">
      <p class="store_tit">采购单详情</p>
      <!-- <button class="OPBtnBack" @click="goback"> -->
        <img src="@/assets/Rbutton.png" @click="goback" class="CouponbtnbackC"/>
      <!-- </button> -->
      <el-row>
        <el-col :span="6"><span>订单编号:{{purchaseSheet.code}}</span></el-col>
        <el-col :span="6"><span>订购品项数:{{purchaseSheet.item}}</span></el-col>
        <el-col :span="6"><span>订购总数:{{purchaseSheet.count}}</span></el-col>
        <el-col :span="6"><span>订购总金额:{{purchaseSheet.amount}}</span></el-col>
      </el-row>
      <el-row>
        <el-col :span="6"><span>创建日期:{{purchaseSheet.createTime|fmtDate2}}</span></el-col>
        <el-col :span="6"><span>预计到店日期:{{purchaseSheet.estimatedArrivalTime|fmtDate2}}</span></el-col>
      </el-row>
      <div class="konge"></div>
      <el-table :data="tableData"  style="width: 100%" border>
          <el-table-column prop="code" label="货号" align='center'></el-table-column>
          <el-table-column prop="barcode" label="国际条码" align='center' width="150"></el-table-column>
          <el-table-column label="品名" align='center' width="160">
            <template scope="scope">
              <span class="codesty" @click="todocuments(scope.row.code)" v-if="flag">{{scope.row.name}}</span>
              <span v-else>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="spec" label="规格" align='center'></el-table-column>
          <el-table-column prop="unit" label="单位" align='center'></el-table-column>
          <el-table-column prop="purchasePrice" label="商品进价" align='center'></el-table-column>
          <el-table-column label="保质期" align='center'>
            <template scope="scope">
              <span>{{scope.row.period}}{{scope.row.periodUnit}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="temperature" label="温层" align='center'></el-table-column>
          <el-table-column prop="purchaseCount" label="订购总数" align='center'></el-table-column>
          <el-table-column prop="purchaseAmount" label="订购总金额" align='center'></el-table-column>
          <el-table-column prop="" label="实际发货数" align='center'>
            <template scope="scope">
              <span>{{scope.row.actualDelivery}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="" label="实际收货数" align='center'>
            <template scope="scope">
              <span>{{scope.row.actualReceipt}}</span>
            </template>
          </el-table-column>        
        </el-table>
        <div class="konge"></div>
        <div  class="paginStyle">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[20,40,60]"
            :page-size="pageSize"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            class="pagination">
          </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  data() {
    return {
      tableData: [],
      purchaseSheet:{},
      pageNum: 1,
      pageSize: 20,
      total: 0,
      flag:true
    };
  },
  created(){
    this.getlist()
  },
  methods:{
      getlist(){
      this.$axios({
        url:window.apiSuppli+'purchase/sub/list',
        method:'POST',
        headers:{'content-type': 'application/x-www-form-urlencoded'},
        data:qs.stringify({
          token:sessionStorage.getItem('token'),
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          purchaseCode:sessionStorage.getItem('purchaseCode')
        })
        }).then(res=>{
          if(res.data.code=='0000'){
            this.purchaseSheet=res.data.data.purchaseSheet
            if(this.purchaseSheet.warehousePurchase){
              this.flag=false
            } else {
              this.flag=true
            }
            this.tableData=res.data.data.pageInfo.list;
            this.total = res.data.data.pageInfo.total;
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
      handleSizeChange(val) {
       this.pageNum=val
       this.getlist()
      },
      handleCurrentChange(val) {
        this.pageNum=val
        this.getlist()
      },
      todocuments(e){
        sessionStorage.setItem('purchaseCode',this.purchaseSheet.code)
        sessionStorage.setItem('goodsCode',e)
        this.$router.push({
          name : 'documents',
        })
      },
      goback(){
          this.$router.go(-1)
      }
  }
}
</script>

<style scoped>
.caigouWaper{
  background-color: #fff;
  min-width: 1700px;
  height: 100%;
}
.shopdetails {
  border: 1px solid #ccc;
  box-shadow: 0px 2px 10px #ccc;
  padding: 0px 20px;
  max-height: 854px;
  height: 100%;
  border-radius: 4px;
  background: #fff;
  font-size: 12px;
}
.CouponbtnbackC{
  text-decoration: none;
  float: right;
  margin-top: 17px;
  cursor: pointer;
}
</style>
