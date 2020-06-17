<template>
  <div class="callgoods">
    <div class="topspan">
      <span>创建日期:2019-03-05</span>
      <span>叫货单编号:213013881</span>
      <span>叫货状态:备货中</span>
      <span>门店:岳家嘴地跌一号店</span>
      <span>实际发货总量:33</span>
      <span class="red"> 实际收货总量:32</span>
      <el-button type="primary" plain>返回</el-button>
    </div>
    <el-table
      :data="tableData"
      @selection-change="handleSelectionChange"
      style="width: 60%">
      <el-table-column
        prop="date"
        label="供应商编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="date"
        label="供应商编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="供应商类型">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
    data(){
      return{
        tableData: [{
            number: '1111111',
            name: 'today现磨豆浆',
            order: ' 1518 ',
            ordernumber:'2',
            ordermoney:'1000',
            standard:'350ml',
            price:'30.00'
          }, {
            number: '22222222',
            name: 'today现磨豆浆',
            order: ' 1517 ',
            ordernumber:'2',
            ordermoney:'1000',
            standard:'350ml',
            price:'30.00'
          }, {
            number: '33333333',
            name: 'today现磨豆浆',
            order: ' 1519 ',
            ordernumber:'2',
            ordermoney:'1000',
            standard:'350ml',
             price:'30.00'
          }, {
            number: '44444444',
            name: 'today现磨豆浆',
            order: ' 1516 ',
            ordernumber:'2',
            ordermoney:'1000',
            standard:'350ml',
            price:'30.00'
          }],
      }
    }
}
</script>

<style scoped>
  .topspan span{
    margin-right: 20px;
    font-weight: 200;
    font-size: 14px;
  }
  .topspan .red{
    color: red;
  }
  .topspan button{
    float: right;
  }
  .topspan{
    margin:20px 0;
    height: 30px;
  }
  .el-button{
    margin: 0;
  }
</style>
