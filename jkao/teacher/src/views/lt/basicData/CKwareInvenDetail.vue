<template>
  <div class="wareCheck minWidth1600">
    <div class="DepotsBox">
      <div class="detailBackBtn">
        <img src="@/assets/images/returnbutton.png" alt="" @click="resetForm" class="codesty">
      </div>
      <div class="rece_Box">
        <div class="block">
          <h3>盘点详情</h3>

          <el-row>
            <el-col :span="6">
              <div>仓库：{{inventory.warehouseCode}}</div>
            </el-col>
            <el-col :span="6">
              <div>盘点范围：{{inventory.scope | wareFan}}</div>
            </el-col>
            <el-col :span="6">
              <div>创建时间：{{inventory.createTime | converTime('YYYY-MM-DD')}}</div>
            </el-col>
            <el-col :span="6">
              <div></div>
            </el-col>
          </el-row>
          <div class="konge"></div>
          <div class="tablBox">
            <el-table :data="tableData" style="width: 100%;" border max-height="600">
              <el-table-column prop="id" label="编号" align="center"></el-table-column>
              <el-table-column prop="goodsCode" label="商品编号" align="center"></el-table-column>
              <el-table-column prop="paperCount" label="账面数量" align="center"></el-table-column>
              <el-table-column prop="profitLoss" label="盈亏数量" align="center"></el-table-column>
              <el-table-column label="实盘数量" align="center" prop="inventoryCount"></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "wareCheck",
  data() {
    return {
      tableData: [],
      inventory: {}
    };
  },
  created() {
    this.getWareInventry();
  },
  methods: {
    getWareInventry() {
      this.$axios
        .post(
          this.reqApi.xinls + `/exam/warehouse/inventory/detail`,
          qs.stringify({
            token: sessionStorage.getItem("token"),
            questionCode: sessionStorage.getItem("questionUUid"),
            code: sessionStorage.getItem("WareInventoryCode")
          })
        )
        .then(res => {
          if (res.data.code == "0000") {
            this.tableData = res.data.data.subList;
            this.inventory = res.data.data.info;
          } else if (res.data.code == "6666") {
            this.$message({
              showClose: true,
              message: "token异常，请重新登录",
              type: "error"
            });
            const timer = setTimeout(() => {
              clearTimeout(timer);
              that.$router.push({ name: "login" });
            }, 3000);
          } else {
            this.$message.error(res.data.msg);
          }
        });
    },
    // 返回
    resetForm() {
      this.$router.push({ name: "CKInventory" });
    }
  },
  filters: {
    wareFan(value) {
      if (value == "A") {
        return "整仓盘点";
      } else if (value == "B") {
        return "指定商品";
      }
    }
  }
};
</script>
<style scoped>
.wareCheck {
  /* background-color: #f1f6fa; */
  min-height: 647px;
}
.DepotsBox {
  background: #fff;
  /* padding-top: 15px; */
}
.wareCheck .nav {
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
.wareCheck .demonstration {
  padding-top: 20px;
  padding-bottom: 20px;
}
.plan3 {
  text-align: center;
  margin-bottom: 15px;
}
.wareCheck .block h4 {
  letter-spacing: 2px;
  margin-bottom: 6px;
}
.wareCheck .block hr {
  border: 1px solid #e8e8e8;
}
.enterInfo {
  width: 30%;
}
.figSty,
.enterInfo {
  display: inline-block;
}
.figplan3 img,
.figEnter2 img {
  height: 52px;
}
.figplan3 {
  margin-right: 15px;
}
.figplan3,
.figEnter2 {
  text-align: left;
}
.figCheck3 img {
  height: 53px;
}
.figCheck3 {
  text-align: right;
}
h3 {
  padding: 0;
  margin: 0 0 10px 0;
}
.konge {
  height: 25px;
}
.detailBackBtn{
  float: right;
  margin-right: 20px;
}
</style>
