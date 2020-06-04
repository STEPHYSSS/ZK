<template>
  <div id="pickingOrders">
    <div>
      <!-- <p class="inputStup">账套编号：<el-input v-model="questionCode" placeholder="请输入账套编号"></el-input></p> -->
      <el-table :data="tableData" style="width: 100%;" border>
          <el-table-column label="拣货单号" align="center" prop="code" width="220"></el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              {{scope.row.status|statusTip}}
            </template>
          </el-table-column>
          <el-table-column label="拣货品项数" align="center" prop="item"></el-table-column>
          <el-table-column label="拣货品项总数" align="center" prop="count"></el-table-column>
          <el-table-column label="创建时间" align="center" prop="createTime">
            <template slot-scope="scope">
              <span>{{scope.row.createTime | converTime('YYYY-MM-DD')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
           <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="详情" placement="bottom">
              <span class="cur-point dis-inline-block">
                <img src="@/assets/images/chaxun_icon.png" @click="detail(scope.row.code)">
              </span>
            </el-tooltip>
           </template>
          </el-table-column>
        </el-table>
    </div>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  name:'pickingOrders',
  data(){
    return{
      questionCode:'',
      tableData:[],
    }
  },
  created(){
    this.getPickg()
  },
  methods:{
    getPickg() {
      this.$axios.post(this.reqApi.xinls + `/exam/warehouse/picking/list`,
        qs.stringify({token:sessionStorage.getItem('token'), questionCode: sessionStorage.getItem("questionUUid")})
      ).then(res=>{
        if(res.data.code == '0000') {
          this.tableData = res.data.data;
        }else return this.$message(res.data.msg)
      })
    },
    detail(code){
      this.$router.push({
        name: "pickingOrdersDetail",
        query:{
          code:code
        }
      });
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
</style>
