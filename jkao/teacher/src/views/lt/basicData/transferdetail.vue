<template>
  <div class="slipInfo minWidth1600 minimum">
    <img @click="goback" class="backImg" src="@/assets/images/returnbutton.png" alt />
    <div class="billBox">
      <div class="billboxTab1">
        <!-- <div class="detailBackBtn">
          <router-link :to="{ path: '/transferSlip' }">
            <img src="@/assets/images/returnbutton.png" alt class="codesty" />
          </router-link>
        </div> -->
        <!-- <h3 class="billtit">转移单详情</h3> -->

        <div>
          <el-row class="rowSpacing">
          <el-col :span="6">
            <div>创建日期：{{slipList.createTime|converTime('YYYY-MM-DD')}}</div>
          </el-col>
          <el-col :span="6">
            <div>转移单编号：{{slipList.code}}</div>
          </el-col>
          <el-col :span="6">
            <div>转移状态：{{slipList.status | statusTip}}</div>
          </el-col>
          <el-col :span="6">
            <div>转出门店编号：{{slipList.turnOutStore}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div>转入门店编号：{{slipList.turnInStore}}</div>
          </el-col>
        </el-row>
        </div>
        <div class="backImg1">
           <el-button v-if="$route.query.ids=='2'" class="themeColor increase" @click="sureYs(slipList.code,slipList.status)">确认验收</el-button>
        </div>
        <!-- <table class="deliveTab" v-for="(item,index) in slipList" :key="'i'+index">
          <tr>
            <td class="rowWith"></td>
          </tr>
          <tr v-if="flags==2">
            <el-button class="themeColor increase" @click="sureYs(item.code,item.status)">确认验收</el-button>
          </tr>
        </table> -->
      </div>
      <div class="billboxTab">
        <el-table :data="tableData" style="width: 100%" max-height="600">
          <el-table-column prop="goodsCode" label="货号" align="center"></el-table-column>
          <!-- <el-table-column prop="goodsName" label="品名" align="center"></el-table-column> -->
          <!-- <el-table-column prop="spec" label="规格" align="center"></el-table-column> -->
          <!-- <el-table-column prop="unit" label="单位" align="center"></el-table-column> -->
          <!-- <el-table-column label="保质期" align="center">
            <template scope="scope">{{scope.row.period}}{{scope.row.periodUnit}}</template>
          </el-table-column> -->
          <!-- <el-table-column prop="temperature" label="温层" align="center"></el-table-column> -->
          <el-table-column prop="turnOutCount" label="转出数量" align="center"></el-table-column>
          <el-table-column prop="turnInCount" label="转入数量" align="center"></el-table-column>
          <el-table-column prop="turnOutPrice" label="转出售价" align="center"></el-table-column>
          <el-table-column prop="turnInPrice" label="转入售价" align="center"></el-table-column>
          <el-table-column prop="turnOutAmount" label="转出总金额" align="center"></el-table-column>
          <el-table-column prop="turnInAmount" label="转入总金额" align="center"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "slipInfo",
  data() {
    return {
      tableData: [],
      slipList: [],
      flags: this.$route.query.ids
    };
  },
  created() {
    this.getSlipDetail();
  },
  methods: {
    goback(){
      this.$router.push('/transferSlip')
    },
    getSlipDetail() {
      this.$utils({
        url: this.reqApi.xinls + "/exam/transfer/detail",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          code: sessionStorage.getItem("code"),
           questionCode: sessionStorage.getItem("questionUUid")
        })
      }).then(res => {
        const {
          code,
          data: { info, subList }
        } = res.data;
        if (code == "0000") {
          this.slipList = info;
          this.tableData = subList;
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
    // 验收
    sureYs(code, status) {
      this.$confirm("验收后数量无法更改, 是否提交?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.$utils({
            url: this.reqApi.xinls + "/exam/transfer/check",
            method: "POST",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            data: qs.stringify({
              code: code,
              status: status,
             questionCode: sessionStorage.getItem("questionUUid")
            })
          }).then(res => {
            if (res.data.code == "0000") {
              this.$message({
                type: "success",
                message: "提交成功!"
              });
              this.$router.push('/transferSlip');
            }else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消提交"
          });
        });
    }
  },
  filters: {
    statusTip(value) {
      if (value == "1") {
        return "待验收";
      } else if (value == "2") {
        return "已验收";
      }
    }
  }
};
</script>
<style scoped>
.slipInfo {
  /* background-color: #f1f6fa; */
  min-height: 647px;
  /* min-width: 1200px; */
  position: relative;
}
.billBox {
  background: #fff;
  padding-top: 15px;
}
.billboxTab {
  margin-left: 20px;
  margin-right: 22px;
  padding-bottom: 30px;
  padding-top: 40px;
}
.billboxTab .billtit {
  /* padding-top: 20px; */
}
.billboxTab1 {
  margin: 0 20px;
}
.billboxTab .billtit span {
  font-weight: 100;
}
.deliveTab {
  border-collapse: collapse;
  width: 100%;
  text-align: left;
}
.deliveTab td {
  width: 19%;
  padding-bottom: 15px;
}
.deliveTab tr {
  width: 100%;
}
.deliveTab .rowwith {
  width: 30%;
}
/* 返回 */
.nav {
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
.btnback {
  text-decoration: none;
  width: 80px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  background-color: #fff;
  color: #01c8dc;
  border: 1px solid #01c8dc;
  border-radius: 5px;
  float: right;
  margin-right: 2%;
}
.btnback:hover {
  background-color: #01c8dc;
  color: #fff;
}
.backBtn {
  width: 100%;
  text-align: right;
  padding-top: 15px;
}
.backImg {
    position: absolute;
    right: 20px;
    top: 0px;
    cursor: pointer;
    z-index: 55;
}
.backImg1 {
    position: absolute;
    right: 20px;
    cursor: pointer;
}
</style>

