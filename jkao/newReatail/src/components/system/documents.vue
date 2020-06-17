<template>
  <div class="caigouWaper">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
      <el-breadcrumb-item :to="{ path: '/suppIndex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item >采购单管理</el-breadcrumb-item>
    </el-breadcrumb> -->
    <h3 class="store_tit">采购单管理</h3>
    <!-- <button class="Couponbtnback" @click="goback">返回</button> -->
    <img src="@/assets/Rbutton.png" @click="goback" class="CouponbtnbackC"/>
    <div class="documents">
      <el-row :gutter="24">
        <el-col :span="6"><span>货号:{{goods.code}}</span></el-col>
        <el-col :span="6"><span>国际条码:{{goods.barcode}}</span></el-col>
        <el-col :span="6"><span>品名:{{goods.name}}</span></el-col>
        <el-col :span="6"><span>订购总金额:{{purchaseSheet.amount}}</span></el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="6"><span>创建日期:{{purchaseSheet.createTime|fmtDate2}}</span></el-col>
        <el-col :span="6"><span>预计到店日期:{{purchaseSheet.estimatedArrivalTime|fmtDate2}}</span></el-col>
        <el-col :span="6"><span>订购总数:{{purchaseSheet.count}}</span></el-col>
      </el-row>
      <div class="konge"></div>
      <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column label="序号" align="center">
            <template scope="scope">
              <span>{{scope.$index+1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="storeName" label="门店" align="center"></el-table-column>
          <el-table-column prop="orderingCode" label="叫货单编号" align="center" width="220"></el-table-column>
          <el-table-column prop="orderingCount" label="订购总数" align="center"></el-table-column>
          <el-table-column prop="orderingAmount" label="订购总金额" align="center">
          </el-table-column>
          <el-table-column prop="" label="实际发货数" align="center">
            <template scope="scope">
              <span v-if="scope.row.actualDelivery >0">{{scope.row.actualDelivery}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="" label="实际收货数" align="center">
            <template scope="scope">
              <span v-if="scope.row.actualReceipt>0">{{scope.row.actualReceipt}}</span>
            </template>
          </el-table-column>
          <el-table-column  label="差异值" align="center">
            <template scope="scope">
              <span v-if="Math.abs(scope.row.actualDelivery-scope.row.actualReceipt)>0">{{Math.abs(scope.row.actualDelivery-scope.row.actualReceipt)}}</span>
            </template>
          </el-table-column>
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
            class="pagination">
          </el-pagination>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      purchaseSheet:{},
      goods:{},
      pageNum: 1,
      pageSize: 20,
      total: 0
    };
  },
  created(){
    this.getlist(this.pageNum)
  },
  methods:{
      handleSizeChange(val) {
        this.pageNum=val
        this.getlist()
      },
      handleCurrentChange(val) {
        this.pageNum=val
        this.getlist()
      },
      getlist(pageNum){
        var codelist=[]
           codelist.token=sessionStorage.getItem('token')
           codelist.goodsCode=sessionStorage.getItem('goodsCode')
           codelist.purchaseCode=sessionStorage.getItem('purchaseCode')
           codelist.pageNum=this.pageNum
           let formData = new FormData();
            const obj =codelist
            Object.keys(obj).forEach(key => {
                formData.append(key, obj[key])
            })
            this.$axios.post('/supplier/purchase/store/list',formData).then(res=>{
                if(res.data.code=='0000'){
                  this.purchaseSheet=res.data.data.purchaseSheet
                  this.goods=res.data.data.goods
                  this.tableData=res.data.data.pageInfo.list
                  this.total = res.data.data.pageInfo.total
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
      goback(){
          this.$router.go(-1)
      }
      
  }
}
</script>

<style scoped>
.caigouWaper{
  background-color: #fff;
  min-height: 647px;
   box-shadow: 0px 2px 10px #ccc;
  min-width: 1700px;
  height: 100%;
}
.documents { 
  padding: 0px 20px;
  border-radius: 4px;
  background: #fff;  
  font-size: 12px;
}
.store_tit{
  margin-left: 20px;
}
.CouponbtnbackC{
  text-decoration: none;
  float: right;
  margin-right: 20px;
  margin-top: 17px;
  cursor: pointer;
}
</style>
