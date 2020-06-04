<template>
    <div class="reviseDetail">
        <!--  -->
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
            <el-breadcrumb-item :to="{ path: '/suppIndex' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item >订单管理</el-breadcrumb-item>
            <el-breadcrumb-item >配送单详情</el-breadcrumb-item>
        </el-breadcrumb> -->
        <div class="deliveBox">
            <div class="delive_Box">
                <p class="store_tit">配送单详情</p>
                <router-link :to="{ path: '/revise' }" class="peisongBtnBack">
                    <img src="@/assets/Rbutton.png"/>
                </router-link>
                <div class="list ">
                    <div class="list_l">
                        <p>配送单编号：<span>{{detaiInfo.code}}</span></p>
                        <p>验收状态：<span>{{detaiInfo.checkStatus | revisTip}}</span></p>
                    </div>
                    <div class="list_c">
                        <p>配送方：<span>{{detaiInfo.supplierName}}</span></p>
                        <p>验收日期：<span v-if="detaiInfo.receivingTime!=null">
                            {{detaiInfo.receivingTime | converTime('YYYY-MM-DD')}}</span></p>
                    </div>
                    <div class="list_r">
                        <p>配送方联系电话：<span>{{detaiInfo.supplierContactsPhone}}</span></p>
                        <p>配送品项总数：<span>{{detaiInfo.item}}</span></p>
                    </div>
                    <div class="list_r">
                        <p>关联采购单编号：<span>{{detaiInfo.purchaseCode}}</span></p>
                        <p>配送总数量：<span>{{detaiInfo.count}}</span></p>
                    </div>
                </div>
                <div class="konge"></div>
                <el-table :data="tableData2" style="width: 100%;" border>
                    <el-table-column prop="goodsCode" label="货号" align='center' width="120"></el-table-column>
                    <el-table-column prop="barcode" label="国际条码" align='center'> </el-table-column>
                    <el-table-column prop="goodsName" label="品名" align='center' width="160"> </el-table-column> 
                    <el-table-column prop="barcode" label="规格" align='center'> </el-table-column>  
                    <el-table-column prop="unit" label="单位" align='center'> </el-table-column>
                    <el-table-column prop="temperature" label="温层" align='center'> </el-table-column> 
                    <el-table-column  label="保质期" align='center'>
                        <template scope="scope">
                            {{scope.row.period}}{{scope.row.periodUnit}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="count" label="订购总数" align='center'> </el-table-column> 
                    <el-table-column prop="actualDelivery" label="实际发货数" align='center'> </el-table-column>
                    <el-table-column prop="actualReceipt" label="实际收货数" align='center'> </el-table-column>
                    <el-table-column prop="shortage" label="缺货数" align='center'> </el-table-column>
                    <el-table-column prop="rejection" label="拒收数" align='center'> </el-table-column>
                    <el-table-column prop="rejectionReason" label="拒收原因" align='center'> </el-table-column>
                    <el-table-column label="操作" align='center'>
                        <template scope="scope">
                           <span v-if="detaiInfo.checkStatus == '1'"></span>
                           <span v-if="detaiInfo.checkStatus == '2' && scope.row.actualDelivery === scope.row.actualReceipt"></span>
                           <span v-else-if ="detaiInfo.checkStatus == '2' && scope.row.actualDelivery != scope.row.actualReceipt" @click="checkOrder" class="codesty">查看修正单</span>
                        </template>
                    </el-table-column>  
                </el-table>
                <div class="konge"></div>
            </div>
        </div>
    </div>
</template>
<script>
import qs from 'qs'
export default {
    name:'reviseDetail',
     data() {
      return {
          detaiInfo:{},
          tableData2: [],
          currentPage:1
      };
    },
    created(){
        this.getReviseDetail();
    },
    methods:{
        getReviseDetail(){
            let that = this;
            that.$axios({
            url:window.apiSuppli+'delivery/detail',
            method:'POST',
            headers:{'content-type': 'application/x-www-form-urlencoded'},
            data:qs.stringify({
                token:sessionStorage.getItem('token'),
                deliveryCode:sessionStorage.getItem('deliveryCodeAb')
            })
            }).then(res=>{
                const {code,data:{deliverySheetVo,subList}} = res.data
                if(code == '0000'){
                    that.detaiInfo=deliverySheetVo;
                    that.tableData2=subList
                }else if(res.data.code=="6666"){
                    that.$router.push({name:'login'})
                }else{
                    that.$message.error(res.data.msg);
                }
            }).catch(err=>{
                console.log('数据异常',err)
            })
        },
        checkOrder(){
            this.$router.push({
                name: 'amendList'
            })
        }
    },
    filters:{
        revisTip(value){
            // 验收状态
            if(value == '1'){
                return '待验收'
            }else if(value == '2'){
                return '已验收'
            }
        },
        numFilter (value) {
            // 截取当前数据到小数点后两位
            let realVal = parseFloat(value).toFixed(2)
            return realVal
        }
    }
}
</script>
<style scoped>
.reviseDetail{
  background-color: #fff;
  min-height: 647px;
  min-width: 1700px;
  height: 100%;
}
.deliveBox,.deliveBox2{
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
  font-size: 12px;
}
.deliveBox2{
    margin-top: 30px;
}
.delive_Box{
    width: 98%;
    margin: 0 auto;
    padding-bottom: 30px;
}
.delive_Box .title{
    padding-top: 20px;
}
.delive_Box .title span{
    font-weight: 100;
    font-size: 16px;
}
.tip{
    margin: 0 0 20px 0px;
    color: #c2c2c2;
}
.deliveBox2 .delive_Box{
    padding-top: 30px;
}
.check th{
    width: 8%;
    background: #dcf9fc;
    color: #444444;
    font-family: '微软雅黑'
}
.check td{
    text-align: center;
    width: 8%;
    height: 50px;
}
.checkInfo tr{
    height: 40px;
}
.checkInfo th{
    background-color: #01c8dc;
}
 /* 返回 */
 .nav{
    display: inline-block;
    height: 50px;
    line-height: 50px;
}
 .peisongBtnBack{
    text-decoration: none;
    float: right;
    cursor: pointer;
    margin-top: 13px;
}
.list{
    display: flex;
}
.list_tab{
    margin-top: 30px;
}
.list_l,.list_c,.list_r{
    flex: 1
}
</style>

