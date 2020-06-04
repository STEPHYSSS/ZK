<template>
  <div class="billdetailInfo">
    <!--<el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
       <el-breadcrumb-item :to="{ path: '/operatIndex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>门店单据管理</el-breadcrumb-item>
      <el-breadcrumb-item>退货单管理</el-breadcrumb-item>
    </el-breadcrumb>-->
    <h4 style="display:inline-block;margin: 20px;">退货单审核</h4>
    <router-link :to="{ path: '/returnManagement' }" class="btnback"><img src="@/assets/Rbutton.png"> </router-link>
    <div class="billBox">
      <div class="billboxTab">
        <table class="deliveTab" v-for="(item,index) in list" :key="index">
          <tr>
            <td class="rowWith">
              <span>创建日期：</span>
              {{item.createTime|converTime('YYYY-MM-DD')}}
            </td>
            <td class="rowwith">
              <span>退货单编号：</span>
              {{item.code}}
            </td>
            <td class="rowWith">
              <span>门店：</span>
              {{item.name}}
            </td>
            <td class="rowwith">
              <span>退货状态：</span>
              {{item.status |statusTip }}
            </td>
            <!-- (对应的是后台的123代码 1待审核2 审核通过 3 审核不通过) -->
          </tr>
          <tr>
            <td class="rowWith">
              <span>退货品项数：</span>
              {{item.item}}
            </td>
            <td class="rowwith">
              <span>退货总数：</span>
              {{item.count}}
            </td>
            <td class="rowWith">
              <span>退货总金额：</span>
              {{item.amount}}
            </td>
            <td class="rowWith" v-if="item.checkOpinion">
              <span>审核意见：</span>
              {{item.checkOpinion}}
            </td>
          </tr>
          <div class="btn-1">
            <el-button
              type="text"
              class="theBtn queryButton"
              @click="centerDialogVisible = true"
              v-if="item.status==1"
            >审核</el-button>

            <!-- <button class="informationBtn btn" @click="audit(ruleForm.code)">审核</button> -->
          </div>
          <div class="konge"></div>
          <div class="fixationCenter">
            <el-dialog title="审核" :visible.sync="centerDialogVisible" width="360px" center>
              <div slot="title" class="auditBtn">
                <span class="el-icon-info"></span>
                <span class="auditBtn-1">审核</span>
              </div>

              <div class="title">
                <textarea
                  rows="1"
                  :placeholder="content"
                  class="inputBox"
                  v-model="ruleForm.checkOpinion"
                ></textarea>
                <br />
                <el-radio v-model="ruleForm.status" label="2">通过</el-radio>
                <el-radio v-model="ruleForm.status" label="3">不通过</el-radio>
              </div>

              <span slot="footer" class="dialog-footer">
                <el-button type="primary" class="AllquedingBtn" @click="SubmitAduit">确定</el-button>
                <el-button @click="centerDialogVisible = false">取 消</el-button>
              </span>
            </el-dialog>
          </div>
        </table>
      </div>
      <div class="billboxTab">
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column prop="goodsCode" label="货号" align="center"></el-table-column>
          <el-table-column prop="name" label="品名" align="center"></el-table-column>
          <el-table-column prop="salePrice" label="单品售价" align="center"></el-table-column>
          <el-table-column prop="count" label="退货数量" align="center"></el-table-column>
          <el-table-column prop="amount" label="退货总金额" align="center"></el-table-column>
          <el-table-column prop="spec" label="规格" align="center"></el-table-column>
          <el-table-column prop="unit" label="单位" align="center"></el-table-column>
          <el-table-column label="保质期" align="center">
            <template scope="scope">{{scope.row.period}}{{scope.row.periodUnit}}</template>
          </el-table-column>
          <el-table-column prop="temperature" label="温层" align="center"></el-table-column>
          <el-table-column prop="reason" label="退货原因" align="center"></el-table-column>
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
      content: "意见必填，限20个字",
      radio: "3",
      centerDialogVisible: false,
      tableData: [],
      list: [],
      ruleForm: {
        token: sessionStorage.getItem("token"),
        code: sessionStorage.getItem("code"),
        checkOpinion: "",
        status: "2"
      },
      flag: true
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    //获取退货单详情
    getlist() {
      this.$axios
        .post("/sys/return/detail", qs.stringify(this.ruleForm))
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
    },
    //  订单审核
    SubmitAduit() {
      this.$axios
        .post("/sys/return/check", qs.stringify(this.ruleForm))
        .then(res => {
          if (res.data.code === "0000") {
            this.$router.push({
              name: "returnManagement"
            });
            this.getlist();
            this.centerDialogVisible = false;
          } else {
            this.$message.error(res.data.msg);
          }
        });
    }
  },
  filters: {
    statusTip(value) {
      if (value == "1") {
        return "待审核";
      } else if (value == "2") {
        return "审核通过";
      } else if (value == "3") {
        return "审核不通过";
      }
    }
  }
};
</script>
<style scoped>
.billdetailInfo {
  background-color: #fff;
  height: 100%;
  min-height: 647px;
  min-width: 1700px;
  box-shadow: 0px 2px 10px #ccc;
}
.billBox {
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
  font-size: 12px;
}
.billboxTab {
  margin: 0 20px;
  padding-bottom: 30px;
}
.billboxTab .billtit {
  display: inline-block;
}
.billboxTab .billtit span {
  font-weight: 100;
  font-size: 12px;
}
.deliveTab {
  position: relative;
  border-collapse: collapse;
  width: 100%;
  text-align: left;
}
.deliveTab .btn-1{
  position: absolute;
  right: -10px;
}
.deliveTab td {
  width: 28%;
  font-size: 12px;
}
.deliveTab tr {
  width: 100%;
}
.deliveTab .rowwith {
  width: 30%;
  font-size: 12px;
}
/* 返回 */
.nav {
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
.btnback {
  text-decoration: none;
  float: right;
  margin-right: 20px;
  cursor: pointer;
  margin-top: 13px;
}
.btn {
  position: absolute;
  right: 43px;
}
.inputBox {
  height: 70px;
  width: 300px;
  margin-bottom: 10px;
  resize: none;
  outline: none;
  line-height: 70px;
  margin-top: 15px;
}
.title {
  text-align: center;
  margin-top: 20px;
}
.el-dialog__header {
  padding-top: 20px;
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
.fixationCenter {
  width: 360px;
}
</style>


