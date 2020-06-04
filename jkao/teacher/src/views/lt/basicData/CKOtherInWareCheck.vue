<template>
  <div class="purWareCheck" id="purWareCheck">
    <div class="billBox">
      <div class="billboxTab">
        <h3 class="store_tit billtit" v-if="list.status =='W'">入库审核</h3>
        <h3 class="store_tit billtit" v-else>入库详情</h3>
         <div class="detailBackBtn">
          <router-link :to="{ path: '/CKotherWarehouseList' }">
            <img src="@/assets/images/returnbutton.png" alt class="codesty" />
          </router-link>
        </div>
        <div class="konge"></div>
        <!-- <router-link :to="{ path: '/CKotherWarehouseList' }" class="opWBtnBack">
          <img src="@/assets/images/returnbutton.png" />
        </router-link> -->
        <!-- <table class="deliveTab">
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
        </table> -->
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
            <div v-if="list.checkOpinion !=null ">审核意见：{{list.checkOpinion}}</div>
            <div v-else>审核意见：无</div>
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
        <!-- 审核按钮 -->
        <div class="checkBox">
          <el-button
            class="btnAdd"
            @click="centerDialogVisible = true"
            v-if="list.status=='W'"
          >审核</el-button>
        </div>
      </div>
      <div>
        <div class="tableBOx">
          <el-table :data="tableData" style="width: 100%" border max-height="600">
          <!-- <el-table-column prop="goodsCode" label="货号" align="center"></el-table-column> -->
            <el-table-column prop="goodsCode" label="商品编号" align="center"></el-table-column>
            <el-table-column prop="count" label="数量" align="center"></el-table-column>
            <el-table-column prop="locationCode" label="货位编号" align="center"></el-table-column>
          </el-table>
        </div>
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
      <!-- <div class="billboxTab">
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
      </div> -->
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
      // this.$axios
      //   .post("sys/warehouse/other/in/check", qs.stringify(this.ruleForm))
      this.$axios
        .post(
          this.reqApi.xinls + `/exam/warehouse/other/in/check`,
          qs.stringify({
            token: sessionStorage.getItem("token"),
            questionCode: sessionStorage.getItem("questionUUid"),
            code:this.$route.query.code,
            flag:this.ruleForm.isPass,
            checkOpinion:this.ruleForm.checkOpinion
          })
        )
        .then(res => {
          if (res.data.code === "0000") {
            this.$router.push({
              // name: "operaOtherInWare"
              name:'CKotherWarehouseList'
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
          this.reqApi.xinls + `/exam/warehouse/other/in/detail`,
          qs.stringify({
            token: sessionStorage.getItem("token"),
            questionCode: sessionStorage.getItem("questionUUid"),
            code:this.$route.query.code
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
#purWareCheck {
  background-color: #fff;
  height: 100%;
  min-height: 647px;
}
#purWareCheck .billBox {
  margin: 0 auto;
  background: #fff;
}
#purWareCheck .billboxTab {
  /* margin: 0 20px; */
  padding-bottom: 20px;
}
#purWareCheck .billboxTab .billtit {
  /* padding-top: 20px; */
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
  width: 260px;
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
  border-bottom: 3px solid #bcbfbf;
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
  width: 260px;
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
.konge {
  height: 15px;
}
.detailBackBtn {
  float: right;
  margin-right: 20px;
}
.billtit{
  margin: 0;
  padding: 0;
}
.checkBox{
  text-align: right;
  margin-right: 20px;
}
.tableBOx{
  margin-right: 20px;
}
</style>


