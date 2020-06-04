<template>
  <div class="OtherOutboundDetail" id="OtherOutboundDetail">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
      <el-breadcrumb-item :to="{ path: '/operatIndex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>其他出库</el-breadcrumb-item>
      <el-breadcrumb-item>详情</el-breadcrumb-item>
    </el-breadcrumb>-->
    <div class="billBox">
      <div class="billboxTab">
        <p class="billtit store_tit" v-if="list.status =='W'">出库审核</p>
        <p class="billtit store_tit" v-else>出库详情</p>
        <router-link :to="{ path: '/OtherOutboundList' }" class="othertBtnBack">
          <img src="@/assets/Rbutton.png" />
        </router-link>
        <el-row>
          <el-col :span="6">
            <p>创建日期：{{list.createTime|converTime('YYYY-MM-DD')}}</p>
          </el-col>
          <el-col :span="6">
            <p>单据编号：{{list.code}}</p>
          </el-col>
          <el-col :span="6">
            <p>单据状态：{{list.status |statusTip }}</p>
          </el-col>
          <el-col :span="6">
            <p v-if="list.status =='W'">审核意见：无</p>
            <p v-else>审核意见：{{list.checkOpinion}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <p>仓库名称：{{list.warehouseCode}}</p>
          </el-col>
          <el-col :span="6">
            <p>出库品项数：{{list.item}}</p>
          </el-col>
          <el-col :span="6">
            <p>出库总数：{{list.count}}</p>
          </el-col>
          <el-col :span="6">
            <p>创建人：{{list.createName}}</p>
          </el-col>
        </el-row>
        <div style="text-align:right">
          <el-button class="btnAdd" @click="centerDialogVisible = true" v-if="list.status=='W'">审核</el-button>
        </div>
      </div>
      <div class="billboxTab">
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column prop="code" label="货号" align="center"></el-table-column>
          <el-table-column prop="name" label="品名" align="center"></el-table-column>
          <el-table-column prop="barcode" label="国际条码" align="center"></el-table-column>
          <el-table-column prop="count" label="出库数量" align="center"></el-table-column>
          <el-table-column prop="spec" label="规格" align="center"></el-table-column>
          <el-table-column prop="unit" label="单位" align="center"></el-table-column>
          <el-table-column label="保质期" align="center">
            <template scope="scope">{{scope.row.period}}{{scope.row.periodUnit}}</template>
          </el-table-column>
          <el-table-column prop="temperature" label="温层" align="center"></el-table-column>
          <el-table-column prop="locationCode" label="出库货位" align="center"></el-table-column>
          <!-- <el-table-column prop="locationCodeIn" label="转入货位" align="center"></el-table-column> -->
        </el-table>
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
              maxlength="20"
              v-model="ruleForm.checkOpinion"
            ></textarea>
            <br />
            <el-radio v-model="ruleForm.isPass" label="Y">通过</el-radio>
            <el-radio v-model="ruleForm.isPass" label="N">不通过</el-radio>
          </div>

          <span slot="footer" class="dialog-footer">
            <el-button class="theBtn queryButton" @click="SubmitAduit">确定</el-button>
            <el-button class="theBtn resetButton" @click="centerDialogVisible = false">取 消</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "OtherOutboundDetail",
  data() {
    return {
      content: "意见必填，限20个字",
      tableData: [],
      list: {},
      centerDialogVisible: false,
      ruleForm: {
        token: sessionStorage.getItem("token"),
        otherOutCode: sessionStorage.getItem("code"),
        isPass: "Y",
        checkOpinion: ""
      }
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    //审核
    SubmitAduit() {
      if (!this.ruleForm.checkOpinion)
        return this.$message.error("请填写审核意见！！");
      if (!this.ruleForm.isPass)
        return this.$message.error("请选择审核意见！！");
      this.$axios
        .post("/sys/warehouse/other/out/check", qs.stringify(this.ruleForm))
        .then(res => {
          if (res.data.code === "0000") {
            this.$router.push({
              name: "OtherOutboundList"
            });
            this.centerDialogVisible = false;
          } else {
            this.$message.error(res.data.msg);
          }
        });
    },
    //获取详情
    getlist() {
      this.$axios
        .post(
          "/sys/warehouse/other/out/detail",
          qs.stringify({
            token: sessionStorage.getItem("token"),
            otherOutCode: sessionStorage.getItem("code")
          })
        )
        .then(res => {
          if (res.data.code === "0000") {
            this.list = res.data.data.otherOut;
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
#OtherOutboundDetail {
  background-color: #fff;
  height: 100%;
  min-height: 647px;
  min-width: 1700px;
}
#OtherOutboundDetail .billBox {
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
}
#OtherOutboundDetail .billboxTab {
  margin: 0 20px;
  padding-bottom: 20px;
}
#OtherOutboundDetail .billboxTab .billtit {
  /* padding-top: 20px; */
  display: inline-block;
}
#OtherOutboundDetail .billboxTab .billtit span {
  font-weight: 100;
  font-size: 12px;
}
/* 返回 */
#OtherOutboundDetail .nav {
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
#OtherOutboundDetail .othertBtnBack {
  text-decoration: none;
  width: 69px;
  float: right;
  cursor: pointer;
  margin-top: 13px;
}
#OtherOutboundDetail .othertBtnBack:hover {
  color: #444444;
}
#OtherOutboundDetail .inputBox {
  height: 70px;
  width: 300px;
  margin-bottom: 10px;
  resize: none;
  outline: none;
  line-height: 70px;
  margin-top: 15px;
}
#OtherOutboundDetail .btnAdd {
  background-color: #434444;
  height: 32px;
  padding: 0;
  color: #fff;
  margin: 0;
  border-radius: 5px;
  width: 69px;
}
#OtherOutboundDetail .auditBtn {
  position: absolute;
  left: 0;
  top: -1px;
  padding-top: 20px;
  /* border-bottom: 3px solid #e6000b; */
  width: 100%;
  text-align: left;
  padding-left: 14px;
  box-sizing: border-box;
}
#OtherOutboundDetail .el-icon-info {
  color: #ffab5a;
  font-size: 25px;
}
#OtherOutboundDetail .auditBtn-1 {
  font-size: 16px;
  margin-left: 5px;
  vertical-align: top;
}
#OtherOutboundDetail .fixationCenter {
  width: 360px;
}
#OtherOutboundDetail .btn-1 {
  margin-bottom: 15px;
}
#OtherOutboundDetail .inputBox {
  height: 70px;
  width: 300px;
  margin-bottom: 10px;
  resize: none;
  outline: none;
  line-height: 70px;
}
#OtherOutboundDetail .title {
  text-align: center;
}
.rowCen {
  text-align: center;
}
.rowCen2 {
  text-align: right;
}
</style>


