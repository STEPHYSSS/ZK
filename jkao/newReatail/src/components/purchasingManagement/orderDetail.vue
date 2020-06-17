<template>
    <div class="orderDetail">
        <!--<el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
             <el-breadcrumb-item :to="{ path: '/operatIndex' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item >采购单管理</el-breadcrumb-item>
            <el-breadcrumb-item >采购单详情</el-breadcrumb-item>
        </el-breadcrumb> -->
        <h3 class="store_tit">采购单详情</h3>
        <!-- <button class="OrBack" @click="Back">返回</button> -->
         <img src="@/assets/Rbutton.png" @click="Back" class="OrBack" />
        <div style="margin:0 20px;">
            <p class="titInfo">创建日期：{{purchaseSheet.createTime|fmtDate2('YYYY-MM-DD')}}</p>
            <p class="titInfo titInfo22">采购单编号：{{purchaseSheet.code}}</p>
            <!-- <p class="titInfo">叫货状态：<span>{{purchaseSheet.status|yanTip}}</span>
            </p> -->
            <p class="titInfo">供应商：{{purchaseSheet.supplierName}}</p>
            <p class="titInfo">实际发货总量：{{actualShipment}}</p>
            <p class="titInfo titInRed">实际收货总量：{{actualReceipt}}</p>
        </div>
        <div class="warpper">
            <div class="tables">
                <div class="tabmargin">
                    <el-table :data="tableData" style="width: 100%;">
                        <el-table-column prop="code" label="货号" align='center'></el-table-column>
                        <el-table-column prop="name" label="品名" align='center'></el-table-column>
                        <el-table-column prop="orderingCount" label="订购总数" align='center'></el-table-column>
                        <el-table-column prop="orderingAmount" label="订购总金额" align='center'></el-table-column>
                        <el-table-column prop="spec" label="规格" align='center'></el-table-column>
                        <el-table-column prop="purchasePrice" label="进价" align='center'></el-table-column>
                        <el-table-column label="保质期" align='center'>
                            <template scope="scope">{{scope.row.period}}{{scope.row.periodUnit}}</template>
                        </el-table-column>
                        <el-table-column prop="temperature" label="温层" align='center'></el-table-column>
                        <el-table-column label="预计到货日期" align='center'>
                            <template scope="scope"><span v-if="scope.row.estimatedArrivalTime != null">{{scope.row.estimatedArrivalTime | converTime('YYYY-MM-DD')}}</span></template>
                        </el-table-column>
                        <el-table-column prop="actualDelivery" label="实际发货数" align='center'></el-table-column>
                        <el-table-column prop="actualReceipt" label="实际收货数" align='center'></el-table-column>
                    </el-table>
                    <div class="paginStyle">
                        <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageNum"
                        :page-sizes="[20,40,60]"
                        :page-size="pageSize"
                        background
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total"
                        class="pagination"></el-pagination>
                    </div>
                </div>
            </div>  
        </div>
    </div>  
</template>
<script>
import qs from 'qs'
export default {
    data(){
        return{
            tableData:[],
            purchaseSheet:{},
            actualShipment:0,
            actualReceipt:0,
            pageNum: 1,
            pageSize: 20,
            total: 0,
            show:false,
            code:this.$route.query.code
        }
    },
    created(){
        this.getpurchase(this.pageNum,this.pageSize)
    },
    methods:{
         handleSizeChange(val) {
        this.pageSize=val
        this.getpurchase()
      },
      handleCurrentChange(val) {
        this.pageNum=val
        this.getpurchase()
      },
        Back(){
            this.$router.go(-1)
        },
        getpurchase(pageNum,pageSize){
            this.$axios({
            url:window.apiUrl+'purchase/sub/list',
            method:'POST',
            headers:{'content-type': 'application/x-www-form-urlencoded'},
            data:qs.stringify({
                token:sessionStorage.getItem('token'),
                purchaseCode:this.code,
                pageNum:this.pageNum,
                pageSize:this.pageSize
            })
            }).then(res=>{
                if(res.data.code=="0000"){
                    this.tableData=res.data.data.pageInfo.list;
                    this.purchaseSheet = res.data.data.purchaseSheet;
                    this.total = res.data.data.pageInfo.total;
                    this.tableData.forEach(item => {
                        this.actualShipment += item.actualDelivery
                        this.actualReceipt += item.actualReceipt
                    })
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
        onSubmit () {},
        showing(){
            this.show = !this.show;
        }
    },
    filters:{
        yanTip(value){
            if(value == '1'){
                return '备货中'
            }else if(value == '2'){
                return '待验收'
            }else if(value == '3'){
                return '部分验收'
            }else if(value == '4'){
                return '全部验收'
            }
        }
    }
}
</script>
<style scoped>
.orderDetail{
    background-color: #fff;
    min-height: 647px;
    min-width: 1700px;
    height: 100%;
}
.warpper{
    display: flex;
    clear: both;
}
.tables{
    width: 100%;
    background-color: #fff;
    border-radius: 5px;
}
.tabmargin{
    margin: 30px 20px;
}
.titInfo{
    display: inline-block;
    margin-right: 25px;
    width: 150px;
    font-size: 12px;
}
.titInfo22{
    width: 280px;
}
.titInRed{
    color: red;
}
.block{
    float: right;
    margin-right: 12px;
    margin-top: 30px;
}
table th{
    height: 35px;
}
.order{
  border-collapse:collapse;
}
.orderHove{
  border-top: 1px solid #ccd3df;
  border-bottom: 1px solid #ccd3df;
  height: 40px;
}
.orderHove:hover{
  background-color: #dcf9fc;
}
.tables{
    clear: both;
    padding-bottom: 30px;
}
.OrBack{
    text-decoration: none;
    float: right;
    margin-right: 20px;
    cursor: pointer;
    margin-top: 13px;
}
OrBack:hover{
    color: #444444;
}
.paginStyle{
  height: 50px;
  text-align: right;
}
.store_tit {
  margin-left: 20px;
}
</style>
