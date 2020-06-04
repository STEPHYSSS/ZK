<template>
  <div class="purWareCheck" id="purWareCheck">
    <div class="billBox">
      <div class="billboxTab">
        <p class="store_tit billtit" v-if="list.status =='W'">入库审核</p>
        <p class="store_tit billtit" v-else>入库详情</p>
        <router-link :to="{ path: '/operaOtherInWare' }" class="opWBtnBack">
          <img src="@/assets/Rbutton.png" />
        </router-link>
        <table class="deliveTab">
          <tr>
            <td class="rowWith">
              <span>创建日期：</span>
              {{list.createTime|converTime('YYYY-MM-DD')}}
            </td>
            <td class="rowwith">
              <span>单据编号：</span>
              {{list.code}}
            </td>
            <td class="rowwith">
              <span>单据状态：</span>
              {{list.status |statusTip }}
            </td>
            <td class="rowWith" v-if="list.status !='W'">
              <span>审核意见：</span>
              {{list.checkOpinion}}
            </td>
          </tr>
          <tr>
            <td class="rowwith">
              <span>仓库名称：</span>
              {{list.warehouseCode}}
            </td>
            <td class="rowwith">
              <span>入库品项数：</span>
              {{list.item}}
            </td>
            <td class="rowwith">
              <span>入库总数：</span>
              {{list.count}}
            </td>
            <td class="rowWith">
              <span>创建人：</span>
              {{list.createName}}
            </td>
          </tr>
          <!-- 修改样式rowWith意见宽度 -->
          <tr>
            <td class="rowwith"></td>
            <td class="rowwith"></td>
            <td class="rowwith"></td>
            <div style="text-align:right">
              <el-button
                class="btnAdd"
                @click="centerDialogVisible = true"
                v-if="list.status=='W'"
              >审核</el-button>
            </div>
          </tr>
        </table>
      </div>
      <div class="billboxTab">
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column prop="code" label="货号" align="center"></el-table-column>
          <el-table-column prop="name" label="品名" align="center"></el-table-column>
          <el-table-column prop="barcode" label="国际条码" align="center"></el-table-column>
          <el-table-column prop="count" label="入库数量" align="center"></el-table-column>
          <el-table-column prop="spec" label="规格" align="center"></el-table-column>
          <el-table-column prop="unit" label="单位" align="center"></el-table-column>
          <el-table-column label="保质期" align="center">
            <template scope="scope">{{scope.row.period}}{{scope.row.periodUnit}}</template>
          </el-table-column>
          <el-table-column prop="temperature" label="温层" align="center"></el-table-column>
          <el-table-column prop="locationCode" label="入库货位" align="center"></el-table-column>
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
            <el-button type="primary" @click="SubmitAduit">确定</el-button>
            <el-button @click="centerDialogVisible = false">取 消</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "purWareCheck",
  data() {
    return {
      content: "意见必填，限20个字",
      tableData: [],
      list: {},
      centerDialogVisible: false,
      ruleForm: {
        token: sessionStorage.getItem("token"),
        otherInCode: sessionStorage.getItem("purWareAudit"),
        isPass: "",
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
        .post("sys/warehouse/other/in/check", qs.stringify(this.ruleForm))
        .then(res => {
          if (res.data.code === "0000") {
            this.$router.push({
              name: "operaOtherInWare"
            });
            this.centerDialogVisible = false;
          } else {
            this.$message.error(res.data.msg);
          }
        });
    },
    //获取详情
    getlist() {
      this.$axios({
        url: window.apiUrl + "warehouse/other/in/detail",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: sessionStorage.getItem("token"),
          otherInCode: sessionStorage.getItem("purWareAudit")
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.list = res.data.data.otherIn;
          this.tableData = res.data.data.subList;
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
#purWareCheck {
  background-color: #fff;
  height: 100%;
  min-height: 647px;
  min-width: 1700px;
}
#purWareCheck .billBox {
  margin: 0 auto;
  background: #fff;
}
#purWareCheck .billboxTab {
  margin: 0 20px;
  padding-bottom: 20px;
}
#purWareCheck .billboxTab .billtit {
  padding-top: 20px;
  display: inline-block;
}
#purWareCheck .billboxTab .billtit span {
  font-weight: 100;
  font-size: 12x;
}
#purWareCheck .deliveTab {
  position: relative;
  border-collapse: collapse;
  width: 100%;
  text-align: left;
}
#purWareCheck .deliveTab td {
  width: 28%;
  font-size: 12px;
}
#purWareCheck .deliveTab tr {
  width: 100%;
}
/* 返回 */
#purWareCheck .nav {
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
.opWBtnBack {
  text-decoration: none;
  width: 69px;
  float: right;
  cursor: pointer;
  margin-top: 13px;
}
.opWBtnBack:hover {
  /* background-color:#01c8dc; */
  color: #444444;
}
#purWareCheck .inputBox {
  height: 70px;
  width: 300px;
  margin-bottom: 10px;
  resize: none;
  outline: none;
  line-height: 70px;
  margin-top: 15px;
}
#purWareCheck .btnAdd {
  background-color: #444444;
  color: #fff;
  height: 32px;
  padding:0;
  margin: 0;
  width: 69px;
}
#purWareCheck .auditBtn {
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
#purWareCheck .el-icon-info {
  color: #ffab5a;
  font-size: 25px;
}
#purWareCheck .auditBtn-1 {
  font-size: 16px;
  margin-left: 5px;
  vertical-align: top;
}
#purWareCheck .fixationCenter {
  width: 360px;
}
#purWareCheck .btn-1 {
  margin-bottom: 15px;
}
#purWareCheck .inputBox {
  height: 70px;
  width: 300px;
  margin-bottom: 10px;
  resize: none;
  outline: none;
  line-height: 70px;
}
#purWareCheck .title {
  text-align: center;
}
.marStore {
  margin-left: 20px;
}
</style>


