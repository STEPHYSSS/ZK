<template>
    <div class="billdetailInfo">
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
            <el-breadcrumb-item :to="{ path: '/suppIndex' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item >退货单详情</el-breadcrumb-item>
            <el-breadcrumb-item >详情</el-breadcrumb-item>
        </el-breadcrumb> -->
       
        <div class="billBox">
            <div class="billboxTab">
                <p class="store_tit">退货单详情</p>
                <img src="@/assets/Rbutton.png" @click="goback" class="tuihuoBack"/>
                <table  class="deliveTab" v-for="(item,index) in detaillist" :key="index">
                    <tr>
                        <td class="rowWith">创建日期：{{item.createTime|converTime('YYYY-MM-DD')}}</td>
                        <td class="rowwith">退货单编号：{{item.code}}</td>
                        <td class="rowWith">门店：{{item.name}}</td>
                        <td class="rowWith">退货状态：{{item.status | statusTip}}</td>
                    </tr>
                    <tr>
                        <td class="rowWith">退货品项数：{{item.item}}</td>
                        <td class="rowwith">退货总数：{{item.count}}</td>
                        <td class="rowWith">退货总金额：{{item.amount}}</td> 
                        <td class="rowwith">审核意见：{{item.checkOpinion}}</td>
                    </tr>
                </table>
            </div>
            <div class="billboxTab">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="goodsCode" label="货号" align='center'>
                    </el-table-column>
                    <el-table-column prop="name" label="品名" align='center' width="160">
                    </el-table-column>
                    <el-table-column prop="salePrice" label="进价" align='center'>
                    </el-table-column>
                    <el-table-column prop="count" label="退货数量" align='center'>
                    </el-table-column>
                    <el-table-column prop="amount" label="退货总金额" align='center'>
                    </el-table-column>
                    <el-table-column prop="spec" label="规格" align='center'>
                    </el-table-column>
                    <el-table-column prop="unit" label="单位" align='center'>
                    </el-table-column>
                    <el-table-column label="保质期" align='center'>
                        <template scope="scope">{{scope.row.period}}{{scope.row.periodUnit}}</template>
                    </el-table-column>
                    <el-table-column prop="temperature" label="温层" align='center'>
                    </el-table-column>
                    <el-table-column prop="reason" label="退货原因" align='center' width="220">
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>
<script>
import qs from 'qs'
export default {
    name:'billdetailInfo',
    data() {
      return {
          tableData:[],
          detaillist:[]
      };
    },
    created(){
        this.getBillDetail()
    },
    methods:{
        getBillDetail(){
            this.$axios({
                url:window.apiSuppli+'return/detail',
                method:'POST',
                headers:{'content-type': 'application/x-www-form-urlencoded'},
                data:qs.stringify({
                    code:sessionStorage.getItem('suppcode'),
                    token:sessionStorage.getItem('token')
                })
                }).then(res=>{
                    const {code,data:{list,subList}} = res.data
                    if(code=="0000"){
                       this.detaillist=list;
                       this.tableData=subList
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
    },
    filters:{
        statusTip(value){
            if(value=='1'){
                return '待审核'
            }else if(value=='2'){
                return '审核通过'
            }else if(value=='3'){
                return '审核不通过'
            }
        }
    }
}
</script>
<style scoped>
.billdetailInfo{
  background-color: #fff;
  height: 100%;
  min-height: 647px;
  min-width: 1700px;
  box-shadow: 0 2px 10px #ccc;
}
.billBox{
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
}
.billboxTab{
    margin: 0 20px;
}
.billboxTab .billtit{
    padding-top: 20px;
}
.billboxTab .billtit span{
    font-weight: 100;
    font-size: 16px;
}
.deliveTab{
  border-collapse:collapse;
  width: 100%;
  text-align: left
}
.deliveTab td{
    width: 19%;
    padding-bottom: 15px;
    font-size: 16px;
 }
.deliveTab tr{
    width: 100%;
}
.deliveTab .rowwith{
    width: 30%
}
 /* 返回 */
 .nav{
    display: inline-block;
    height: 50px;
    line-height: 50px;
}
.tuihuoBack{
    text-decoration: none;
    float: right;
    cursor: pointer;
    margin-top: 13px;
}
</style>

