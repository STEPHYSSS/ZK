<template>
  <div class="procurementDetail" id="procurementDetail">
    <div class="billBox">
      <div class="detailBackBtn">
        <router-link :to="{ path: '/CKotherWarehouseList' }">
          <img src="@/assets/images/returnbutton.png" alt class="codesty" />
        </router-link>
      </div>
      <div class="billboxTab">
        <h3 class="billtit">入库详情</h3>
        <el-row>
          <el-col :span="6">
            <div>创建日期：{{list.createTime|converTime('YYYY-MM-DD')}}</div>
          </el-col>
          <el-col :span="6">
            <div>单据编号：{{list.code}}</div>
          </el-col>
          <el-col :span="6">
            <div>单据状态：{{list.status |statusTip }}</div>
          </el-col>
          <el-col :span="6">
            <div>审核意见：{{list.checkOpinion}}</div>
          </el-col>
        </el-row>
        <div class="konge"></div>
        <el-row>
          <el-col :span="6">
            <div>仓库名称：{{list.warehouseCode}}</div>
          </el-col>
          <el-col :span="6">
            <div>入库品项数：{{list.item}}</div>
          </el-col>
          <el-col :span="6">
            <div>入库总数：{{list.count}}</div>
          </el-col>
          <el-col :span="6">
            <div>创建人：{{list.createName}}</div>
          </el-col>
        </el-row>
      </div>
      <div class="tableBOx">
        <el-table :data="tableData" style="width: 100%" border max-height="600">
          <!-- <el-table-column prop="goodsCode" label="货号" align="center"></el-table-column> -->
          <el-table-column prop="goodsCode" label="商品编号" align="center"></el-table-column>
          <el-table-column prop="count" label="数量" align="center"></el-table-column>
          <el-table-column prop="locationCode" label="货位编号" align="center"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "procurementDetail",
  data() {
    return {
      tableData: [],
      list: {}
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    //获取详情
    getlist() {
      // this.$axios
      //   .post(
      //     "/warehouse/other/in/detail",
      //     qs.stringify({
      //       token: sessionStorage.getItem("token"),
      //       otherInCode: sessionStorage.getItem("code")
      //     })
      //   )
      this.$axios
        .post(
          this.reqApi.xinls + `/exam/warehouse/other/in/detail`,
          qs.stringify({
            token: sessionStorage.getItem("token"),
            questionCode: sessionStorage.getItem("questionUUid"),
            code:sessionStorage.getItem("code")
          })
        )
        .then(res => {
          if (res.data.code === "0000") {
            this.list = res.data.data.info;
            this.tableData = res.data.data.subList;
          } else if (res.data.code === "6666") {
            this.$message({
              showClose: true,
              message: "token异常，请重新登录",
              type: "error"
            });
          }else return this.$message.error(res.data.msg)
        });
    }
  },
  filters: {
    statusTip(value) {
      if (value == "F") {
        return "审核不通过";
      } else if (value == "W") {
        return "待审核";
      } else if (value == "S") {
        return "审核通过";
      }
    }
  }
};
</script>
<style scoped>
#procurementDetail {
  min-height: 647px;
}
#procurementDetail .billBox {
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
}
.billboxTab{
  margin-bottom: 20px;
}
#procurementDetail .billboxTab .billtit {
  margin: 0;
  padding: 0;
}
#procurementDetail .billboxTab .billtit span {
  font-weight: 100;
  font-size: 16px;
}
#procurementDetail .deliveTab {
  position: relative;
  border-collapse: collapse;
  width: 100%;
  text-align: left;
}
#procurementDetail .deliveTab td {
  width: 25%;
  padding-bottom: 15px;
  font-size: 16px;
}
#procurementDetail .deliveTab tr {
  width: 100%;
}
#procurementDetail .deliveTab .rowwith {
  width: 30%;
}
/* 返回 */
#procurementDetail .nav {
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
#procurementDetail .btnback {
  text-decoration: none;
  width: 80px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  background-color: #fff;
  color: #fff;
  /* border: 1px solid #01c8dc; */
  border-radius: 5px;
  float: right;
  margin-right: 2%;
  /* background-color: #01c8dc; */
}
#procurementDetail .btnback:hover {
  /* background-color: #01c8dc; */
  color: #fff;
}
#procurementDetail .inputBox {
  height: 70px;
  width: 300px;
  margin-bottom: 10px;
  resize: none;
  outline: none;
  line-height: 70px;
}
.konge{
  height: 10px;
}
.tableBOx,.detailBackBtn{
  margin-right: 20px;
}
.detailBackBtn{
  text-align: right;
}
</style>


