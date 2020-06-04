<template>
  <div class="procurementDetail" id="procurementDetail">
    <div class="billBox">
      <div class="detailBackBtn">
        <router-link :to="{ path: '/CKProcurement' }">
          <img src="@/assets/images/returnbutton.png" alt class="codesty" />
        </router-link>
      </div>
      <div class="billboxTab">
        <h3 v-if="list.status=='W'">采购入库待验收</h3>
        <h3 v-if="list.status=='S'">采购入库详情</h3>
        <el-row class="rowSpacing">
          <el-col :span="6">
            <div>仓库采购单号：{{list.code}}</div>
          </el-col>
          <el-col :span="6">
            <div>供应商采购单号：{{list.purchaseCode}}</div>
          </el-col>
          <el-col :span="6">
            <div>供应商编号：{{list.supplierCode}}</div>
          </el-col>
          <el-col :span="6">
            <div>仓库编号：{{list.warehouseCode}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div>采购项数：{{list.item}}</div>
          </el-col>
          <el-col :span="6">
            <div>
              <span v-if="list.status=='S'">采购数量：{{totalCount}}</span>
              <span v-else>采购数量：{{list.count}}</span>
            </div>

          </el-col>
          <el-col :span="6">
            <div>验收时间：<span v-if="list.checkTime !=null">{{list.checkTime|converTime('YYYY-MM-DD')}}</span></div>
          </el-col>
          <el-col :span="6">
            <div>创建时间：<span v-if="list.createTime !=null">{{list.createTime|converTime('YYYY-MM-DD')}}</span></div>
          </el-col>
        </el-row>
        <table class="deliveTab">
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
        </table>
        <div class="sureCheck">
          <el-button
            class="themeColor increase"
            @click="centerDialogVisible = true"
            v-if="list.status=='W'"
          >确认验收</el-button>
        </div>
      </div>
      <div class="tablBox">
        <el-table :data="tableData" style="width: 100%" border max-height="600">
          <el-table-column prop="goodsCode" label="商品编号" align="center"></el-table-column>
          <!-- <el-table-column prop="name" label="品名" align="center"></el-table-column> -->
          <el-table-column prop="purchaseCount" label="采购数量" align="center"></el-table-column>
          <el-table-column prop="deliverCount" label="发货数量" align="center"></el-table-column>
          <el-table-column label="入库数量" align="center" width="80">
            <template slot-scope="scope">
              <el-input
                type="text"
                v-model="scope.row.warehouseCount"
                onkeyup="this.value=this.value.replace(/\D/g,'')"
                maxlength="10"
                v-if="list.status=='W'"
              ></el-input>
              <span v-if="list.status=='S'">{{scope.row.warehouseCount}}</span>
            </template>
          </el-table-column>
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
      centerDialogVisible: false,
      tableData: [],
      list: {},
      subSet: [],
      totalCount:0
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
          this.reqApi.xinls + `/exam/warehouse/purchase/detail`,
          qs.stringify({
            token: sessionStorage.getItem("token"),
            questionCode: sessionStorage.getItem("questionUUid"),
            code: sessionStorage.getItem("CKpurWareC")
          })
        )
        .then(res => {
          if (res.data.code === "0000") {
            this.list = res.data.data.info;
            this.tableData = res.data.data.subList;
            if(this.list.status=="S"){
              this.tableData.forEach(item=>{
                this.totalCount+=item.warehouseCount
              })
            }
            if (this.list.status != "S") {
              this.tableData.forEach(item => {
                item.warehouseCount = item.deliverCount;
              });
            }

            this.subSet = this.tableData.map(item => {
              return {
                subId: item.subId,
                count: item.count
              };
            });
          } else if (res.data.code === "6666") {
            this.$message({
              showClose: true,
              message: "token异常，请重新登录",
              type: "error"
            });
          }else return this.$message.error(res.data.msg)
        });
    },
    //  订单审核
    SubmitAduit() {
      this.subSet = this.tableData.map(item => {
        return {
          id: item.id,
          number: item.warehouseCount
        };
      });
      // this.$axios
      //   .post(
      //     "/warehouse/purchase/check",
      //     qs.stringify({
      //       token: sessionStorage.getItem("token"),
      //       purchaseCodes: sessionStorage.getItem("code"),
      //       subSet: JSON.stringify(this.subSet)
      //     })
      //   )
      this.$axios
        .post(
          this.reqApi.xinls + `/exam/warehouse/purchase/check`,
          qs.stringify({
            token: sessionStorage.getItem("token"),
            questionCode: sessionStorage.getItem("questionUUid"),
            code: sessionStorage.getItem("CKpurWareC"),
            subSet: JSON.stringify(this.subSet)
          })
        )
        .then(res => {
          if (res.data.code === "0000") {
            this.centerDialogVisible = false;
            this.$router.push({
              name: "CKProcurement"
            });
          } else {
            this.$message.error(res.data.msg);
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
#procurementDetail {
  min-height: 647px;
}
#procurementDetail .billBox {
  margin: 0 auto;
  background: #fff;
}
/* #procurementDetail .billboxTab {
  margin: 0 20px;
} */
#procurementDetail .billboxTab .billtit {
  padding-top: 20px;
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
#procurementDetail .btn {
  position: absolute;
  right: -7px;
}
#procurementDetail .inputBox {
  height: 70px;
  width: 300px;
  margin-bottom: 10px;
  resize: none;
  outline: none;
  line-height: 70px;
}
#procurementDetail .title {
  text-align: center;
  margin-top: 20px;
}
#procurementDetail .fixationCenter {
  width: 360px;
}
#procurementDetail .el-dialog__header {
  padding-top: 20px;
  border-bottom: 1px solid #01c8dc;
}
#procurementDetail .auditBtn {
  position: absolute;
  left: 0;
  top: -1px;
  padding-top: 20px;
  border-bottom: 3px solid #dbe0e5;
  width: 100%;
  text-align: left;
  padding-left: 14px;
  box-sizing: border-box;
}
#procurementDetail .el-icon-info {
  color: #ffab5a;
  font-size: 25px;
}
#procurementDetail .auditBtn-1 {
  font-size: 16px;
  margin-left: 5px;
  vertical-align: top;
}
#procurementDetail .btn-1 {
  margin-bottom: 15px;
  text-align: right;
}
.sureCheck {
  text-align: right;
  margin:15px 20px;
}
/*  */
.billboxTab h3{
  margin: 0;
  padding: 0;
}
.detailBackBtn{
  float: right;
  margin-right: 20px;
}
.rowSpacing{
  margin: 10px 0;
}
.tablBox{
  margin-right: 20px;
}
</style>


