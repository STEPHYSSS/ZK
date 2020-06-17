<template>
  <div class="mallPurchaseInfo" id="mallPurchaseInfo">
    <h3 class="store_tit">采购入库详情</h3>
    <router-link :to="{ path: '/mallPurchase' }" class="opWBtnBack">
      <img src="@/assets/Rbutton.png" />
    </router-link>
    <div class="billBox">
      <div class="billboxTab">
        <el-row>
          <el-col :span="6">
            <span>创建日期：{{list.createTime|converTime('YYYY-MM-DD')}}</span>
          </el-col>
          <el-col :span="6">
            <span>单据编号：</span>
            {{list.code}}
          </el-col>
          <el-col :span="6">
            <span>入库状态：</span>
            {{list.status |statusTip }}
          </el-col>
          <el-col :span="6">
            <span>供应商：</span>
            {{list.supplierCode}}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <span>入库品项数：</span>
            {{list.item}}
          </el-col>
          <el-col :span="6">
            <span>入库总数：</span>
            {{list.count}}
          </el-col>
          <el-col :span="6">
            <span>创建人：</span>
            {{list.createName}}
          </el-col>
          <el-col :span="6">
            <p v-if="list.acceptance!=null">
              <span>验收人：</span>
              {{list.acceptance}}
            </p>
            <p v-else>
              <span>验收人：无</span>
            </p>
          </el-col>
        </el-row>
      </div>
      <!-- <div class="sureCheck">
        <el-button
          class="themeColor increase"
          @click="centerDialogVisible = true"
          v-if="list.status=='W'"
        >确认验收</el-button>
      </div> -->
      <div class="fixationCenter">
        <el-dialog title="提示" :visible.sync="centerDialogVisible" width="360px" center>
          <div slot="title" class="auditBtn">
            <span class="el-icon-info"></span>
            <span class="auditBtn-1">提示</span>
          </div>

          <div class="title">
            <p>确定按照当前数量进行验收入库？</p>
          </div>

          <span slot="footer" class="dialog-footer">
            <el-button class="theBtn themeColor textMright" @click="SubmitAduit">确定</el-button>
            <el-button class="theBtn resetButton" @click="centerDialogVisible = false">取 消</el-button>
          </span>
        </el-dialog>
      </div>
      <div class="billboxTab">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="code" label="货号" align="center"></el-table-column>
          <el-table-column prop="name" label="品名" align="center"></el-table-column>
          <el-table-column prop="purchaseCount" label="采购数量" align="center"></el-table-column>
          <el-table-column prop="deliverCount" label="发货数量" align="center"></el-table-column>
          <el-table-column prop="warehouseCount" label="入库数量" align="center" width="80">
            <!-- <template slot-scope="scope">
              <el-input
                type="text"
                v-model="scope.row.warehouseCount"
                onkeyup="this.value=this.value.replace(/\D/g,'')"
                maxlength="10"
                v-if="list.status=='W'"
              ></el-input>
              <span v-if="list.status=='S'">{{scope.row.warehouseCount}}</span>
            </template> -->
          </el-table-column>
          <el-table-column prop="spec" label="规格" align="center"></el-table-column>
          <el-table-column prop="unit" label="单位" align="center"></el-table-column>
          <el-table-column label="保质期" align="center">
            <template scope="scope">{{scope.row.period}}{{scope.row.periodUnit}}</template>
          </el-table-column>
          <el-table-column prop="temperature" label="温层" align="center"></el-table-column>
          <el-table-column prop="locationCode" label="存放货位" align="center"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "mallPurchaseInfo",
  data() {
    return {
      tableData: [],
      list: {},
      subSet: [],
      purchaseCode: this.$route.query.code,
      centerDialogVisible: false
    };
  },
  created() {
    this.getPurInfo();
  },
  methods: {
    //获取详情
    getPurInfo() {
      this.$axios({
        url: window.apiMall + "purchase/detail",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: sessionStorage.getItem("token"),
          purchaseCode: this.purchaseCode
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.tableData = res.data.data.subList;
          this.list = res.data.data.purchase;
          // this.tableData.forEach(item => {
          //   item.warehouseCount = item.deliverCount;
          // });
          this.subSet = this.tableData.map(item => {
            return {
              subId: item.subId,
              count: item.count
            };
          });
        } else if (res.data.code == "6666") {
          this.$message({
            showClose: true,
            message: "token异常，请重新登录",
            type: "error"
          });
          const timer = setTimeout(() => {
            clearTimeout(timer);
            this.$router.push({ name: "login" });
          }, 3000);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //  订单审核
    SubmitAduit() {
      this.subSet = this.tableData.map(item => {
        return {
          subId: item.subId,
          count: item.warehouseCount
        };
      });
      this.$axios
        .post(
          "mall/purchase/check",
          qs.stringify({
            token: sessionStorage.getItem("token"),
            purchaseCodes: this.purchaseCode,
            subSet: JSON.stringify(this.subSet)
          })
        )
        .then(res => {
          if (res.data.code === "0000") {
            this.centerDialogVisible = false;
            this.$router.push({
              name: "mallPurchase"
            });
          } else {
            this.$message({
              message: res.data.msg,
              type: "warning"
            });
          }
        });
    }
  },
  filters: {
    statusTip(value) {
      if (value == "F") {
        return "待发货";
      } else if (value == "W") {
        return "待收货";
      } else if (value == "S") {
        return "已收货";
      }
    }
  }
};
</script>
<style scoped>
#mallPurchaseInfo {
  background-color: #ffffff;
  height: 100%;
  min-height: 647px;
  min-width: 1700px;
}
#mallPurchaseInfo .billBox {
  font-size: 12px;
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
}
#mallPurchaseInfo .billboxTab {
  margin: 5px 20px;
}
.billboxTab p {
  display: inline-block;
}

/* 返回 */
.opWBtnBack {
  text-decoration: none;
  float: right;
  margin-right: 20px;
  cursor: pointer;
  margin-top: 13px;
}
#mallPurchaseInfo .btn {
  position: absolute;
  right: -7px;
}
#mallPurchaseInfo .inputBox {
  height: 70px;
  width: 300px;
  margin-bottom: 10px;
  resize: none;
  outline: none;
  line-height: 70px;
}
#mallPurchaseInfo .fixationCenter {
  width: 360px;
}
#mallPurchaseInfo .el-dialog__header {
  padding-top: 20px;
  border-bottom: 1px solid #ccc;
}
#mallPurchaseInfo .auditBtn {
  position: absolute;
  left: 0;
  top: -1px;
  padding-top: 20px;
  border-bottom: 3px solid #ccc;
  width: 100%;
  text-align: left;
  padding-left: 14px;
  box-sizing: border-box;
}
#mallPurchaseInfo .el-icon-info {
  color: #ffab5a;
  font-size: 25px;
}
#mallPurchaseInfo .store_tit {
  margin-left: 20px;
}
.sureCheck{
    text-align: right;
    margin-right: 20px;
    margin-bottom: 10px;
}
</style>


