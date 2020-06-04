<template>
  <div id="pickingOrdersDetail">
    <div class="detailBackBtn">
          <router-link :to="{ path: '/pickingOrders' }">
            <img src="@/assets/images/returnbutton.png" alt class="codesty" />
          </router-link>
        </div>
    <div>
      <div class="marTop">
         <el-row>
          <el-col :span="6">
            <div>拣货单号：{{info.code}}</div>
          </el-col>
          <el-col :span="6">
            <div>状态：{{info.scope | statusTip}}</div>
          </el-col>
          <el-col :span="6">
            <div>拣货品项数：{{info.item}}</div>
          </el-col>
          <el-col :span="6">
             <div>拣货品总数：{{info.count}}</div>
          </el-col>
        </el-row>
        <div class="konge"></div>
        <el-row>
          <el-col :span="6">
            <div>创建时间：{{info.createTime | converTime('YYYY-MM-DD')}}</div>
          </el-col>
        </el-row>
      </div>
      <el-table :data="tableData" style="width: 100%;" border>
          <el-table-column label="子订单编号" align="center" prop="id"></el-table-column>
          <el-table-column label="商品编号" align="center" prop="goodsCode"></el-table-column>
          <el-table-column label="拣货数量" align="center" prop="count"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  name:'pickingOrdersDetail',
  data(){
    return{
      info:{},
      tableData:[],
    }
  },
  created(){
    this.getPickg()
  },
  methods:{
    getPickg() {
      this.$axios.post(this.reqApi.xinls + `/exam/warehouse/picking/detail`,
        qs.stringify({
          token:sessionStorage.getItem('token'),
          questionCode: sessionStorage.getItem("questionUUid"),
          code:this.$route.query.code
        })
      ).then(res=>{
        if(res.data.code == '0000') {
          this.tableData = res.data.data.subList;
          this.info = res.data.data.info;
        }else return this.$message(res.data.msg)
      })
    }
  },
  filters:{
    statusTip(val) {
      if(val === 'N') {
        return '新建'
      }else return '拣货完成'

    }
  }
}
</script>
<style scoped>
.inputStup{
  margin-bottom: 15px;
}
.inputStup .el-input{
  width: 13%;
}
.marTop{
  margin: 10px 0;
}
.detailBackBtn {
  text-align: right;
  /* float: right; */
  margin-right: 20px;
}
.konge{
  height: 20px;
}
</style>
