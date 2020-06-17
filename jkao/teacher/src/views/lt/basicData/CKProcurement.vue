<template>
  <div id="procurementList">
    <!-- <div class="content">
      <h3>采购入库</h3>
      <el-row>
        <el-col :span="6">
          <div>
            <span class="textTitle70px">创建日期：</span>
            <span>
              <el-date-picker
                v-model="changeTime"
                type="daterange"
                class="input1"
                @input="change1"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </span>
          </div>
        </el-col>
        <el-col :span="6" class="textAlignCenter">
          <div>
            <span class="textTitle70px">入库状态：</span>
            <div class="TongYiInput">
              <el-select placeholder="请选择" v-model="ruleForm.status">
                <el-option label="待发货" value="F"></el-option>
                <el-option label="待收货" value="W"></el-option>
                <el-option label="已收货" value="S"></el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="6" class="textAlignCenter">
          <div>
            <span class="textTitle70px">订单编号：</span>
            <span>
              <el-input type="text" placeholder="请输入" class="input1" v-model="ruleForm.code"></el-input>
            </span>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <div class="textAlignRight">
              <el-button class="theBtn queryButton" @click="chaxun">查询</el-button>
              <el-button class="theBtn resetButton" @click="reset">重置</el-button>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <div class></div>
        </el-col>
        <el-col :span="8">
          <div style="margin-left: 25%; white-space:nowrap"></div>
        </el-col>
        <el-col :span="8">
          <div style="margin-left: 40%; white-space:nowrap"></div>
        </el-col>
        <el-col></el-col>
      </el-row>
    </div> -->
    <div class="textAlignRight">
        <router-link to="/CKOperaPurWareAdd">
          <el-button class="increase themeColor">
            <i class="el-icon-plus"></i>新增
          </el-button>
        </router-link>
      </div>
    <div class="content">
      <el-table :data="tableData" style="width: 100%;" height="650" border>
        <el-table-column label="仓库采购单号" prop="code" align="center" width="180"></el-table-column>
        <el-table-column label="供应商采购单号" prop="purchaseCode" width="180" align="center"></el-table-column>
        <el-table-column label="供应商编号" prop="supplierCode" align="center" width="120"></el-table-column>
        <el-table-column label="仓库编号" prop="warehouseCode" align="center"></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">{{scope.row.status|statusTip}}</template>
        </el-table-column>
        <el-table-column label="采购项数" prop="item" align="center"></el-table-column>
        <el-table-column label="采购数量" prop="count" align="center"></el-table-column>
        <el-table-column label="验收时间" prop="checkTime" align="center">
          <template slot-scope="scope" v-if="scope.row.checkTime != null">{{scope.row.checkTime | converTime('YYYY-MM-DD')}}</template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createTime" align="center">
          <template slot-scope="scope" v-if="scope.row.createTime != null">{{scope.row.createTime | converTime('YYYY-MM-DD')}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="查看" placement="bottom">
              <img
                src="@/assets/images/chaxun_icon.png"
                v-if="scope.row.status=='S'"
                class="codesty"
                @click="toDetail(scope.row.code)"
                alt
              />
            </el-tooltip>
            <el-tooltip class="tips" effect="dark" content="验收" placement="bottom">
              <img
                src="@/assets/images/present_icon_one.png"
                v-if="scope.row.status=='W'"
                @click="toDetail(scope.row.code)"
                alt
                class="codesty"
              />
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="bottom"
              v-if="scope.row.status == 'F'"
            >
              <img
                src="@/assets/images/shanchu_icon.png"
                @click="delPurWare(scope.row.code)"
                class="codesty"
              />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div class="pagesize">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="ruleForm.pageNum"
          :page-sizes="[20, 40, 60]"
          :page-size="ruleForm.pageSize"
          class="page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableDataTotal"
        ></el-pagination>
      </div> -->
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "procurementList",
  data() {
    return {
      changeTime: "",
      ruleForm: {
        token: sessionStorage.getItem("token"),
        pageNum: 1,
        pageSize: 20,
        createTimeStart: "",
        createTimeEnd: "",
        status: "",
        code: ""
      },
      tableDataTotal: 0,
      tableData: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    change1(e) {
      this.ruleForm.createTimeStart = this.$moment(e[0]).format("YYYY-MM-DD");
      this.ruleForm.createTimeEnd = this.$moment(e[1]).format("YYYY-MM-DD");
    },
    chaxun() {
      this.getList();
    },
    reset() {
      this.ruleForm.code = "";
      this.ruleForm.status = "";
      this.changeTime = "";
      this.ruleForm.createTimeStart = "";
      this.ruleForm.createTimeEnd = "";
      this.getList();
    },
    getList() {
      // this.$axios
      //   .post("/warehouse/purchase/list", qs.stringify(this.ruleForm))
      this.$axios
        .post(
          this.reqApi.xinls + `/exam/warehouse/purchase/list`,
          qs.stringify({
            token: sessionStorage.getItem("token"),
            questionCode: sessionStorage.getItem("questionUUid")
          })
        )
        .then(res => {
          if (res.data.code === "0000") {
            this.tableData = res.data.data;
            // this.tableDataTotal = res.data.data.total;
          } else if (res.data.code === "6666") {
            this.$message({
              showClose: true,
              message: "token异常，请重新登录",
              type: "error"
            });
          }else return this.$message.error(res.data.msg)
        });
    },
    // 删除
    delPurWare(code) {
       this.$axios
        .post(
          this.reqApi.xinls + `/exam/warehouse/purchase/delete`,
          qs.stringify({
            token: sessionStorage.getItem("token"),
            questionCode: sessionStorage.getItem("questionUUid"),
            code: code
          })
        ).then(res => {
        if (res.data.code == "0000") {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.getList();
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
    // purWareDetail(code) {
    //   sessionStorage.setItem("CKpurWareC", code);
    //   this.$router.push({
    //     name: "CKprocurementDetail",
    //     params: {
    //       code: code
    //     }
    //   });
    // },
    // 详情和验收
    toDetail(code) {
      sessionStorage.setItem("CKpurWareC", code);
      this.$router.push({
        name: "CKprocurementDetail",
        params: {
          code: code
        }
      });
    },
    handleSizeChange(val) {
      this.ruleForm.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.ruleForm.pageNum = val;
      this.getList();
    }
  },
  filters: {
    statusTip(value) {
      if (value == "S") {
        return "已收货";
      } else if (value == "W") {
        return "待收货";
      } else if (value == "F") {
        return "待发货";
      }
    }
  }
};
</script>
<style scoped>
#procurementList .nav {
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
#procurementList .content {
  box-sizing: border-box;
  /* margin-right: 20px; */
  /* background-color: #fff;
  padding: 0px 20px;
  height: 150px; */
}
#procurementList h4 {
  padding-bottom: 10px;
}
#procurementList .content .el-input__inner {
  border: 1px solid #dcdfe6;
  width: 80%;
}
#procurementList .pinName {
  text-align: right;
  /* margin-right: 20px; */
}
#procurementList .btnAdd {
  /* background-color: #01c8dc; */
  color: #fff;
  margin-bottom: 10px;
}
#procurementList .mg {
  margin-top: 25px;
}
#procurementList .pagesize {
  height: 60px;
}
h3 {
  padding: 20px 0 20px 0px;
}
.textAlignRight {
  text-align: right;
  margin-right: 1.8%;
  margin-bottom: 20px;
}
</style>

