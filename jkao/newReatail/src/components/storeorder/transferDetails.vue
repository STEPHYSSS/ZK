<template>
  <div class="billdetailInfo">
    <!--<el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
       <el-breadcrumb-item :to="{ path: '/operatIndex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>门店单据管理</el-breadcrumb-item>
      <el-breadcrumb-item>转移单管理</el-breadcrumb-item>
    </el-breadcrumb>-->
    <h3 class="store_tit">转移单详情</h3>
    <router-link :to="{ path: '/transferSingle' }" class="TBtnBack">
      <img src="@/assets/Rbutton.png" />
    </router-link>
    <div class="billBox">
      <div class="billboxTab">
        <table class="deliveTab" v-for="(item,index) in list" :key="index">
          <tr>
            <td class="rowWith">
              <span>创建日期：</span>
              {{item.createTime|converTime('YYYY-MM-DD')}}
            </td>
            <td class="rowwith1">
              <span>转移单编号：</span>
              {{item.code}}
            </td>
            <!-- <td class="rowWith"><span>门店：</span>{{item.name}}</td> -->
            <td class="rowwith">
              <span>转移状态：</span>
              {{item.status |statusTip }}
            </td>
            <!-- (对应的是后台的123代码 1待审核2 审核通过 3 审核不通过) -->
            <td class="rowwith">
              <span>转出门店:</span>
              {{item.nameOut}}
            </td>
            <td class="rowwith">
              <span>转入门店：</span>
              {{item.nameIn}}
            </td>
          </tr>
        </table>
      </div>
      <div class="billboxTab">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="goodsCode" label="货号" align="center"></el-table-column>
          <el-table-column prop="goodsName" label="品名" align="center"></el-table-column>
          <el-table-column prop="spec" label="规格" align="center"></el-table-column>
          <el-table-column prop="unit" label="单位" align="center"></el-table-column>
          <el-table-column label="保质期" align="center">
            <template scope="scope">{{scope.row.period}}{{scope.row.periodUnit}}</template>
          </el-table-column>
          <el-table-column prop="temperature" label="温层" align="center"></el-table-column>
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
  name: "billdetailInfo",
  data() {
    return {
      centerDialogVisible: false,
      tableData: [],
      list: [],
      ruleForm: {
        token: sessionStorage.getItem("token"),
        code: sessionStorage.getItem("code")
      },
      flag: true
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    //获取详情
    getlist() {
      this.$axios
        .post("/sys/transfer/detail", qs.stringify(this.ruleForm))
        .then(res => {
          if (res.data.code === "0000") {
            this.list = res.data.data.list;
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
.billdetailInfo {
  background-color: #fff;
  min-height: 647px;
  min-width: 1700px;
  height: 100%;
}
.billBox {
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
}
.billboxTab {
  margin: 0 20px;
  padding-bottom: 30px;
}
.billboxTab .billtit {
  padding-top: 20px;
}
.billboxTab .billtit span {
  font-weight: 100;
  font-size: 16px;
}
.deliveTab {
  position: relative;
  border-collapse: collapse;
  width: 100%;
  text-align: left;
}
.deliveTab td {
  width: 15%;
  font-size: 12px;
}
.deliveTab tr {
  width: 100%;
}
.deliveTab .rowwith1 {
  width: 25%;
}
/* 返回 */
.nav {
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
.TBtnBack {
  text-decoration: none;
  float: right;
  margin-right: 20px;
  cursor: pointer;
  margin-top: 13px;
}
.store_tit {
  margin-left: 20px;
}
.btn {
  position: absolute;
  right: 90px;
}
.inputBox {
  height: 70px;
  width: 300px;
  margin-bottom: 10px;
  resize: none;
  outline: none;
  line-height: 70px;
}
.title {
  text-align: center;
  margin-top: 20px;
}
.el-dialog__header {
  padding-top: 20px;
  border-bottom: 1px solid #01c8dc;
}
.auditBtn {
  position: absolute;
  left: 0;
  top: -1px;
  padding-top: 20px;
  border-bottom: 3px solid #01c8dc;
  width: 100%;
  text-align: left;
  padding-left: 14px;
  box-sizing: border-box;
}
.el-icon-info {
  color: #ffab5a;
  font-size: 25px;
}
.auditBtn-1 {
  font-size: 16px;
  margin-left: 5px;
  vertical-align: top;
}
</style>


