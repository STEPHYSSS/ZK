<template>
  <div class="TurnLibraryWorkDetail" id="TurnLibraryWorkDetail">
    <div class="billBox">
      <!-- <div class="billboxTab">
        <h3 class="store_tit" v-if="list.status =='W'">转库审核</h3>
        <h3 class="store_tit" v-else>转库详情</h3>
        <div class="detailBackBtn">
        <router-link :to="{ path: '/CKotherWarehouseList' }">
          <img src="@/assets/images/returnbutton.png" alt class="codesty" />
        </router-link></div>
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
            <p>转库品项数：{{list.item}}</p>
          </el-col>
          <el-col :span="6">
            <p>转库总数：{{list.count}}</p>
          </el-col>
          <el-col :span="6">
            <p>创建人：{{list.createName}}</p>
          </el-col>
          <el-col :span="6">
            <p></p>
          </el-col>
        </el-row>
        <div style="text-align:right">
              <el-button
                class="chaxunBtn"
                @click="centerDialogVisible = true"
                v-if="list.status=='W'"
              >审核</el-button>
            </div>
      </div>-->
      <div class="billboxTab">
        <h3 class="store_tit billtit" v-if="list.status =='W'">转移审核</h3>
        <h3 class="store_tit billtit" v-else>转移详情</h3>
        <div class="detailBackBtn">
          <router-link :to="{ path: '/CKTurnWarehouseList' }">
            <img src="@/assets/images/returnbutton.png" alt class="codesty" />
          </router-link>
        </div>
        <div class="konge"></div>
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
        </table>-->
        <el-row>
          <!-- <el-col :span="6">
            <div>创建日期：{{list.createTime|converTime('YYYY-MM-DD')}}</div>
          </el-col>
          <el-col :span="6">
            <div>单据编号：{{list.code}}</div>
          </el-col>
          <el-col :span="6">
            <div>单据状态：{{list.status |statusTip }}</div>
          </el-col>
          <el-col :span="6">
            <div>审核意见：{{list.checkOpinion}}</div>
          </el-col> -->
          <el-col :span="6">
            <span>转移单号:{{list.code}}</span>
          </el-col>
          <el-col :span="6">
            <span>状态:{{list.status |statusTip }}</span>
          </el-col>
          <el-col :span="6">
            <span>转出仓库编号:{{list.warehouseCodeOut}}</span>
          </el-col>
          <el-col :span="6">
            <span>转入仓库编号:{{list.warehouseCodeIn}}</span>
          </el-col>
        </el-row>
        <div class="konge"></div>
        <el-row>
          <el-col :span="6">
            <span>转移品项数:{{list.item}}</span>
          </el-col>
          <el-col :span="6">
            <span>转移总数:{{list.count}}</span>
          </el-col>
          <el-col :span="6">
            <span v-if="list.checkOpinion!=null">审核意见:{{list.checkOpinion}}</span>
            <span v-else>审核意见:{{list.checkOpinion}}</span>
          </el-col>
          <el-col :span="6">
            <span>创建时间:{{list.createTime | converTime('YYYY-MM-DD')}}</span>
          </el-col>
          <!-- <el-col :span="6">
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
          </el-col> -->
        </el-row>
        <!-- 审核按钮 -->
        <div class="checkBox">
          <el-button class="btnAdd" @click="centerDialogVisible = true" v-if="list.status=='W'">审核</el-button>
        </div>
      </div>
      <div class="billboxTab2">
        <div class="tabBox">
          <el-table :data="tableData" style="width: 100%" border>
            <el-table-column prop="goodsCode" label="商品编号" align="center"></el-table-column>
            <el-table-column prop="count" label="数量" align="center"></el-table-column>
            <el-table-column prop="locationCodeOut" label="转出货位编号" align="center"></el-table-column>
            <el-table-column prop="locationCodeIn" label="转入货位编号" align="center"></el-table-column>
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
              <el-button class="AllquedingBtn" @click="SubmitAduit">确定</el-button>
              <el-button class="theBtn resetButton" @click="centerDialogVisible = false">取 消</el-button>
            </span>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "TurnLibraryWorkDetail",
  data() {
    return {
      content: "意见必填，限20个字",
      tableData: [],
      list: {},
      centerDialogVisible: false,
      ruleForm: {
        token: sessionStorage.getItem("token"),
        transferCode: sessionStorage.getItem("code"),
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
      // this.$axios
      //   .post("/sys/warehouse/transfer/check", qs.stringify(this.ruleForm))
      this.$axios
        .post(
          this.reqApi.xinls + `/exam/warehouse/transfer/check`,
          qs.stringify({
            token: sessionStorage.getItem("token"),
            questionCode: sessionStorage.getItem("questionUUid"),
            code: sessionStorage.getItem("code"),
            flag: this.ruleForm.isPass,
            checkOpinion: this.ruleForm.checkOpinion
          })
        )
        .then(res => {
          if (res.data.code === "0000") {
            this.$router.push({
              name: "CKTurnWarehouseList"
            });
            this.centerDialogVisible = false;
          } else {
            this.$message.error(res.data.msg);
          }
        });
    },
    //获取详情
    getlist() {
      // this.$axios
      //   .post(
      //     "/sys/warehouse/transfer/detail",
      //     qs.stringify({
      //       token: sessionStorage.getItem("token"),
      //       transferCode: sessionStorage.getItem("code")
      //     })
      //   )
      this.$axios
        .post(
          this.reqApi.xinls + `/exam/warehouse/transfer/detail`,
          qs.stringify({
            token: sessionStorage.getItem("token"),
            questionCode: sessionStorage.getItem("questionUUid"),
            code: sessionStorage.getItem("code")
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
          } else return this.$message.error(res.data.msg);
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
#TurnLibraryWorkDetail {
  background-color: #fff;
  min-height: 647px;
  height: 100%;
}
#TurnLibraryWorkDetail .billBox {
  margin: 0 auto;
  background: #fff;
  font-size: 12px;
}
/* #TurnLibraryWorkDetail .billboxTab {
  margin: 0 20px;
  padding-bottom: 20px;
}
#TurnLibraryWorkDetail .billboxTab .billtit {
  padding-top: 20px;
} */
#TurnLibraryWorkDetail .billboxTab .billtit span {
  font-weight: 100;
  font-size: 16px;
}
#TurnLibraryWorkDetail .deliveTab {
  position: relative;
  border-collapse: collapse;
  width: 100%;
  text-align: left;
}
#TurnLibraryWorkDetail .deliveTab td {
  width: 28%;
  font-size: 12px;
}
#TurnLibraryWorkDetail .deliveTab tr {
  width: 100%;
}
/* 返回 */
#TurnLibraryWorkDetail .nav {
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
#TurnLibraryWorkDetail .btnback {
  text-decoration: none;
  width: 69px;
  float: right;
  margin-right: 20px;
  margin-top: 17px;
}
#TurnLibraryWorkDetail .btnback:hover {
  background-color: #fff;
  color: #444444;
}
#TurnLibraryWorkDetail .inputBox {
  height: 70px;
  width: 260px;
  margin-bottom: 10px;
  resize: none;
  outline: none;
  line-height: 70px;
  margin-top: 15px;
}
#TurnLibraryWorkDetail .auditBtn {
  position: absolute;
  left: 0;
  top: -1px;
  padding-top: 20px;
  border-bottom: 3px solid #ced5d6;
  width: 100%;
  text-align: left;
  padding-left: 14px;
  box-sizing: border-box;
}
#TurnLibraryWorkDetail .el-icon-info {
  color: #ffab5a;
  font-size: 25px;
}
#TurnLibraryWorkDetail .auditBtn-1 {
  font-size: 16px;
  margin-left: 5px;
  vertical-align: top;
}
#TurnLibraryWorkDetail .fixationCenter {
  width: 360px;
}
#TurnLibraryWorkDetail .btn-1 {
  margin-bottom: 15px;
}
#TurnLibraryWorkDetail .inputBox {
  height: 70px;
  width: 260px;
  margin-bottom: 10px;
  resize: none;
  outline: none;
  line-height: 70px;
}
#TurnLibraryWorkDetail .title {
  text-align: center;
}
.rowCen {
  text-align: center;
}
.rowCen2 {
  text-align: right;
}
.chaxunBtn {
  background-color: #434444;
  color: #fff;
  border: none;
}
.chaxunBtn:hover {
  cursor: pointer;
}
.store_tit {
  margin: 0;
  padding: 0;
}
.konge {
  height: 15px;
}
.detailBackBtn {
  float: right;
  margin-right: 20px;
}
.billboxTab2 {
  margin-top: 20px;
}
.tabBox{
  margin-right: 20px;
}
.checkBox{
  margin-right: 20px;
  text-align: right;
}
</style>


