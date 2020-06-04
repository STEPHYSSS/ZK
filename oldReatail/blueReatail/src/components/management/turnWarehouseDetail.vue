<template>
  <div class="turnWarehouseDetail minimum minWidth1600" id="turnWarehouseDetail">
    <div class="billBox">
      <div class="detailBackBtn">
        <router-link :to="{ path: '/turnWarehouseList' }">
          <img src="@/assets/returnbutton.png" alt class="codesty" />
        </router-link>
      </div>
      <div class="billboxTab">
        <h3 class="billtit">转库详情</h3>

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
            <div>
              审核意见：
              <span v-if="list.checkOpinion!=null">{{list.checkOpinion}}</span>
              <span v-else>暂无意见</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div>转库品项数：{{list.item}}</div>
          </el-col>
          <el-col :span="6">
            <div>入库总数：{{list.count}}</div>
          </el-col>
          <el-col :span="6">
            <div>创建人：{{list.createName}}</div>
          </el-col>
        </el-row>
      </div>
      <div>
        <el-table :data="tableData" style="width: 100%" border max-height="600">
          <el-table-column prop="code" label="货号" align="center"></el-table-column>
          <el-table-column prop="name" label="品名" align="center"></el-table-column>
          <el-table-column prop="count" label="转库数量" align="center"></el-table-column>
          <el-table-column prop="spec" label="规格" align="center"></el-table-column>
          <el-table-column prop="unit" label="单位" align="center"></el-table-column>
          <el-table-column label="保质期" align="center">
            <template scope="scope">{{scope.row.period}}{{scope.row.periodUnit}}</template>
          </el-table-column>
          <el-table-column prop="temperature" label="温层" align="center"></el-table-column>
          <el-table-column prop="locationCodeOut" label="转出货位" align="center"></el-table-column>
          <el-table-column prop="locationCodeIn" label="转入货位" align="center"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "turnWarehouseDetail",
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
      this.$axios
        .post(
          "/warehouse/transfer/detail",
          qs.stringify({
            token: sessionStorage.getItem("token"),
            transferCode: sessionStorage.getItem("code")
          })
        )
        .then(res => {
          if (res.data.code === "0000") {
            this.list = res.data.data.transfer;
            this.tableData = res.data.data.subList;
          } else if (res.data.code === "6666") {
            this.$message({
              showClose: true,
              message: "token异常，请重新登录",
              type: "error"
            });
            const timer = setTimeout(() => {
              clearTimeout(timer);
              this.$router.push({ name: "login" });
            }, 3000);
          }
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
#turnWarehouseDetail {
  min-height: 647px;
  min-width: 1200px;
}
#turnWarehouseDetail .billBox {
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
  padding-top: 15px;
}
#turnWarehouseDetail .billboxTab {
  margin: 0 20px;
  padding-bottom: 10px;
}
#turnWarehouseDetail .billboxTab .billtit span {
  font-weight: 100;
  font-size: 16px;
}
#turnWarehouseDetail .deliveTab {
  position: relative;
  border-collapse: collapse;
  width: 100%;
  text-align: left;
}
#turnWarehouseDetail .deliveTab td {
  width: 29.5%;
  padding-bottom: 15px;
  font-size: 16px;
}
#turnWarehouseDetail .deliveTab tr {
  width: 100%;
}
/* 返回 */
#turnWarehouseDetail .nav {
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
#turnWarehouseDetail .btnback {
  text-decoration: none;
  width: 80px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  background-color: #fff;
  color: #fff;
  border: 1px solid #01c8dc;
  border-radius: 5px;
  float: right;
  margin-right: 2%;
  background-color: #01c8dc;
}
#turnWarehouseDetail .btnback:hover {
  background-color: #01c8dc;
  color: #fff;
}
#turnWarehouseDetail .inputBox {
  height: 70px;
  width: 300px;
  margin-bottom: 10px;
  resize: none;
  outline: none;
  line-height: 70px;
}
</style>


