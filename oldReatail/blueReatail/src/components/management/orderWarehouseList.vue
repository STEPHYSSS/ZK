<template>
  <div id="orderWarehouseList" class="minimum minWidth1600">
    <div class="content">
      <h3>订购出库</h3>
      <el-row class="rowSpacing">
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
            <span class="textTitle70px">单据状态：</span>
            <div class="TongYiInput">
              <el-select placeholder="请选择" v-model="ruleForm.status" class="input1">
                <el-option label="新建" value="N"></el-option>
                <el-option label="待审核" value="W"></el-option>
                <el-option label="已出库" value="S"></el-option>
                <el-option label="拣货完成" value="J"></el-option>
                <el-option label="分配完成" value="F"></el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="6" class="textAlignCenter">
          <div>
            <span class="textTitle70px">单据编号：</span>
            <el-input type="text" placeholder="请输入" class="input1" v-model="ruleForm.code"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="textAlignRight">
            <el-button class="theBtn queryButton" @click="chaxun">查询</el-button>
            <el-button class="theBtn resetButton" @click="reset">重置</el-button>
          </div>
        </el-col>
      </el-row>
      <div class="newAdd">
        <el-button class="themeColor increase marginRight" @click="create">生成 波次</el-button>
        <el-button class="resetButton btnAdd2 marginRight" @click="createSorting">生成拣货</el-button>
        <el-button class="resetButton btnAdd2" @click="reCheck">复核出库</el-button>
      </div>
    </div>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%;"
        :row-key="getRowKeys"
        @selection-change="handleSelectionChange"
        max-height="620"
        border
      >
        <el-table-column type="selection" width="55" :reserve-selection="true" class="leftTitle"></el-table-column>
        <el-table-column label="出库单编号" align="center" width="250">
          <template scope="scope">
            <span class="codesty" @click="toDetail(scope.row.code,scope.row)">{{scope.row.code}}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template scope="scope">
            <span>{{scope.row.createTime|fmtDate2}}</span>
          </template>
        </el-table-column>
        <el-table-column label="门店编号" prop="storeCode" align="center" width="150"></el-table-column>
        <el-table-column label="门店名称" prop="storeName" align="center" width="240"></el-table-column>
        <el-table-column label="订购品项数" prop="item" align="center" width="110"></el-table-column>
        <el-table-column label="订购总数" prop="count" align="center" width="110"></el-table-column>
        <el-table-column label="出库状态" align="center">
          <template scope="scope">
            <span>{{scope.row.status| statusTip}}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 生成波次 -->
      <el-dialog title="提示" :visible.sync="centerDialogVisible" width="20%" center>
        <div slot="title" class="auditBtn">
          <span class="el-icon-info"></span>
          <span class="auditBtn-1">提示</span>
        </div>
        <div class="title">
          <p v-if="flag">组波成功</p>
          <p v-if="flag1">组波失败{{contentText}}</p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button class="theBtn themeColor textMright" @click="sure">确定</el-button>
          <!-- <el-button @click="centerDialogVisible = false">取 消</el-button> -->
        </span>
      </el-dialog>
      <!-- 拣货 -->
      <el-dialog title="提示" :visible.sync="centerDialogVisible1" width="20%" center>
        <div slot="title" class="auditBtn">
          <span class="el-icon-info"></span>
          <span class="auditBtn-1">提示</span>
        </div>
        <div class="title">
          <p v-if="flag">{{contentText1}}</p>
          <p v-if="flag1">{{contentText1}}</p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button class="queryButton increase" @click="createSortingSure" v-model="goOn">继续拣货</el-button>
          <el-button class="resetButton btnAdd3 btnAdd2" @click="centerDialogVisible1 = false">取消拣货</el-button>
        </span>
      </el-dialog>
      <!-- 复核出库 -->
      <el-dialog title="提示" :visible.sync="centerDialogVisible2" width="480px" center>
        <div slot="title" class="auditBtn">
          <span class="el-icon-info"></span>
          <span class="auditBtn-1">提示</span>
        </div>
        <div class="title">
          <el-form
            :model="formData"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
            align="center"
          >
            <el-form-item label="复核人员" prop="reviewName">
              <el-input v-model="formData.reviewName" placeholder="请输入"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button class="theBtn themeColor textMright" @click="reCheckSure('ruleForm')">确定</el-button>
          <el-button class="theBtn resetButton" @click="centerDialogVisible2 = false">取消</el-button>
        </span>
      </el-dialog>
      <div class="pagesize">
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
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "orderWarehouseList",
  data() {
    return {
      getRowKeys(row) {
        return row.code;
      },
      centerDialogVisible: false,
      centerDialogVisible1: false,
      centerDialogVisible2: false,
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
      record: true,
      options: [],
      warhouseData: {
        pageNum: 1,
        pageSize: 99999,
        name: ""
      },
      contentText: "",
      contentText1: "",
      flag: false,
      flag1: false,
      tableDataTotal: 0,
      tableData: [],
      checkoutSet: [],
      goOn: "Y",
      reviewName: "",
      formData: {
        reviewName: ""
      },
      rules: {
        reviewName: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    handleSelectionChange(selection) {
      this.checkoutSet = [];
      selection.forEach(item => {
        this.checkoutSet.push(item.code);
      });
    },
    sure() {
      this.centerDialogVisible = false;
      // location.reload()

      this.getList();
    },
    create() {
      if (this.checkoutSet.length == 0)
        return this.$message.error("请选择出库单！！");
      this.$axios
        .post(
          "/warehouse/checkout/formation",
          qs.stringify({
            token: sessionStorage.getItem("token"),
            checkoutSet: JSON.stringify(this.checkoutSet)
          })
        )
        .then(res => {
          if (res.data.code == "0000") {
            this.getList();
            this.centerDialogVisible = true;
            this.flag = true;
          } else {
            this.centerDialogVisible = true;
            this.flag1 = true;
            this.contentText = res.data.msg;
          }
        });
    },
    //拣货
    createSorting() {
      if (this.checkoutSet.length == 0) {
        return this.$message.error("请选择出库单！！");
      }
      this.$axios
        .post(
          "/warehouse/checkout/sorting",
          qs.stringify({
            token: sessionStorage.getItem("token"),
            checkoutSet: JSON.stringify(this.checkoutSet)
          })
        )
        .then(res => {
          if (res.data.code == "0000") {
            this.$message.success("生成拣货成功");
            this.getList();
          } else if (res.data.code == "6006") {
            this.centerDialogVisible1 = true;
            this.flag1 = true;
            this.contentText1 = res.data.msg;
          } else {
            //  this.flag=true
            //  this.contentText=res.data.msg
            this.$message.error(res.data.msg);
          }
        });
    },
    createSortingSure() {
      this.$axios
        .post(
          "/warehouse/checkout/sorting",
          qs.stringify({
            token: sessionStorage.getItem("token"),
            checkoutSet: JSON.stringify(this.checkoutSet),
            goOn: this.goOn
          })
        )
        .then(res => {
          if (res.data.code == "0000") {
            this.centerDialogVisible1 = false;
            this.getList();
            this.$message.success("拣货成功！");
          } else {
            this.$message.error(res.data.msg);
          }
        });
    },
    //复核出库
    reCheck() {
      if (this.checkoutSet.length == 0) {
        return this.$message.error("请选择出库单！！");
      }
      this.centerDialogVisible2 = true;
    },
    reCheckSure(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post(
              "/warehouse/checkout/review",
              qs.stringify({
                token: sessionStorage.getItem("token"),
                checkoutSet: JSON.stringify(this.checkoutSet),
                reviewName: this.formData.reviewName
              })
            )
            .then(res => {
              if (res.data.code == "0000") {
                this.centerDialogVisible2 = false;
                this.getList();
              } else {
                this.$message.error(res.data.msg);
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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

    change1(e) {
      this.ruleForm.createTimeStart = this.$moment(e[0]).format("YYYY-MM-DD");
      this.ruleForm.createTimeEnd = this.$moment(e[1]).format("YYYY-MM-DD");
    },
    getList() {
      this.$axios
        .post("/warehouse/checkout/list", qs.stringify(this.ruleForm))
        .then(res => {
          if (res.data.code === "0000") {
            this.tableData = res.data.data.list;
            this.tableDataTotal = res.data.data.total;
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
    },
    toDetail(code, row) {
      //状态为j的时候跳到集装箱页面
      let codes = sessionStorage.setItem("code", code);
      if (row.status == "J") {
        this.$router.push({
          name: "orderEncasement",
          params: {
            code: codes
          }
        });
      } else {
        this.$router.push({
          name: "orderWarehouseDetail",
          params: {
            code: codes
          }
        });
      }
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
      if (value == "N") {
        return "新建";
      } else if (value == "F") {
        return "分配完成";
      } else if (value == "J") {
        return "拣货完成";
      } else if (value == "W") {
        return "待复核";
      } else if (value == "S") {
        return "已出库";
      }
    }
  }
};
</script>
<style scoped>
#orderWarehouseList .nav {
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
#orderWarehouseList .content {
  box-sizing: border-box;
  background-color: #fff;
  padding: 0px 20px;
  height: 170px;
}
#orderWarehouseList h4 {
  padding-bottom: 10px;
}
#orderWarehouseList .pinName {
  text-align: right;
}
#orderWarehouseList .btnAdd {
  background-color: #01c8dc;
  color: #fff;
  margin-bottom: 10px;
}
#orderWarehouseList .pagesize {
  height: 60px;
}
#orderWarehouseList .page {
  margin-top: 20px;
}

#orderWarehouseList .auditBtn {
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
.btnAdd2 {
  margin: 0;
  padding: 8px 18px;
  border-radius: 6px;
  color: #444;
}
#orderWarehouseList .marginRight {
  margin-right: 5px;
}
.btnAdd2:hover,
.btnAdd2:focus {
  background-color: #e50109;
  color: #fff;
  transform: scale(1.01);
  border-color: #e50109;
}
.btnAdd3 {
  margin-left: 10px;
}
.btnAdd3:hover,
.btnAdd3:focus {
  background-color: #444;
  color: #fff;
  transform: scale(1.01);
  border-color: #444;
}

#orderWarehouseList .el-icon-info {
  color: #ffab5a;
  font-size: 25px;
}
#orderWarehouseList .auditBtn-1 {
  font-size: 16px;
  margin-left: 5px;
  vertical-align: top;
}
#orderWarehouseList .title {
  text-align: center;
  margin-top: 15px;
}
#orderWarehouseList .title p {
  margin-top: 15px;
}
#orderWarehouseList .newAdd {
  /* text-align: right; */
  margin-right: 4px;
}
#orderWarehouseList .billMaList {
  padding-left: 35px;
  padding-right: 30px;
}
#orderWarehouseList #billInput {
  width: 100%;
}
#orderWarehouseList .pinName1 {
  text-align: left;
}
#orderWarehouseList .submit {
  background-color: #01c8dc;
  color: #fff;
}
#orderWarehouseList .submit1 {
  margin-left: 0px;
}
#orderWarehouseList .lt {
  text-align: left;
}
h3 {
  padding: 20px 0 20px 0px;
}
</style>

