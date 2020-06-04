<template>
  <div class="TurnLibraryWorkDetail" id="TurnLibraryWorkDetail">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
      <el-breadcrumb-item :to="{ path: '/operatIndex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>转库作业</el-breadcrumb-item>
      <el-breadcrumb-item>详情</el-breadcrumb-item>
    </el-breadcrumb> -->
    <router-link :to="{ path: '/TurnLibraryWorkList' }" class="btnback"><img src="@/assets/Rbutton.png" /></router-link>
    <div class="billBox">
      <div class="billboxTab">
        <h3 class="store_tit" v-if="list.status =='W'">转库审核</h3>
        <h3 class="store_tit" v-else>转库详情</h3>
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
      </div>
      <div class="billboxTab2">
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column prop="code" label="货号" align="center"></el-table-column>
          <el-table-column prop="name" label="品名" align="center"></el-table-column>
          <el-table-column prop="count" label="转库数量" align="center"></el-table-column>
          <!-- <el-table-column prop="count" label="入库数量" align="center"></el-table-column> -->
          <el-table-column prop="spec" label="规格" align="center"></el-table-column>
          <el-table-column prop="unit" label="单位" align="center"></el-table-column>
          <el-table-column label="保质期" align="center">
            	<template scope="scope">
							{{scope.row.period}}{{scope.row.periodUnit}} 
						</template>
          </el-table-column>
          <el-table-column prop="temperature" label="温层" align="center"></el-table-column>
          <el-table-column prop="locationCodeOut" label="转出货位" align="center"></el-table-column>
          <el-table-column prop="locationCodeIn" label="转入货位" align="center"></el-table-column>
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
            <br>
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
      if(!this.ruleForm.checkOpinion) return this.$message.error('请填写审核意见！！')
			if(!this.ruleForm.isPass) return this.$message.error('请选择审核意见！！')
      this.$axios
        .post("/sys/warehouse/transfer/check", qs.stringify(this.ruleForm))
        .then(res => {
          if (res.data.code === "0000") {
            this.$router.push({
              name: "TurnLibraryWorkList"
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
          "/sys/warehouse/transfer/detail",
          qs.stringify({
            token: sessionStorage.getItem("token"),
            transferCode: sessionStorage.getItem("code")
          })
        )
        .then(res => {
          if (res.data.code === "0000") {
            this.list = res.data.data.transfer;
            this.tableData = res.data.data.subList;
          } else if (res.data.code === "6666") {
            this.$message({
              showClose: true,
              message: "token异常，请重新登录",
              type: "error"
            });
            const timer = setTimeout(() => {
              clearTimeout(timer);
              this.$router.push({ name: "login" });
            }, 3000);
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
#TurnLibraryWorkDetail {
  background-color: #fff;
  min-height: 647px;
  height: 100%;
  min-width: 1200px;
}
#TurnLibraryWorkDetail .billBox {
  margin: 0 auto;
  background: #fff;
  font-size: 12px;
}
#TurnLibraryWorkDetail .billboxTab {
  margin: 0 20px;
  padding-bottom: 20px;
}
#TurnLibraryWorkDetail .billboxTab .billtit {
  padding-top: 20px;
}
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
  width: 300px;
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
  border-bottom: 3px solid #01c8dc;
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
  width: 300px;
  margin-bottom: 10px;
  resize: none;
  outline: none;
  line-height: 70px;
}
#TurnLibraryWorkDetail .title {
  text-align: center;
}
.rowCen{
  text-align: center;
}
.rowCen2{
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
</style>


