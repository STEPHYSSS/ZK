<template>
  <div id="turnWarehouseList" class="minimum minWidth1600">
    <div class="content">
      <h3>转库作业</h3>
      <el-row class="rowSpacing">
        <el-col :span="6">
          <div>
            <span class="textTitle70px">创建日期：</span>
            <el-date-picker
              v-model="changeTime"
              type="daterange"
              class="input1"
              @input="change1"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-col>
        <el-col :span="6" class="textAlignCenter">
          <div>
            <span class="textTitle70px">单据状态：</span>
            <div class="TongYiInput">
              <el-select placeholder="请选择" v-model="ruleForm.status">
                <el-option label="待审核" value="W"></el-option>
                <el-option label="审核通过" value="S"></el-option>
                <el-option label="审核不通过" value="F"></el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="6" class="textAlignCenter">
          <div>
            <span class="textTitle70px">单据编号：</span>
            <el-input class="input1" type="text" placeholder="请输入" v-model="ruleForm.code"></el-input>
          </div>
        </el-col>
        <el-col :span="6" class="textAlignRight">
          <div>
            <el-button class="theBtn queryButton" @click="chaxun">查询</el-button>
            <el-button class="theBtn resetButton" @click="reset">重置</el-button>
          </div>
        </el-col>
      </el-row>
      <div class="newAdd">
        <el-button class="increase themeColor" @click="newAdd">
          <i class="el-icon-plus"></i>新增
        </el-button>
      </div>
    </div>
    <div>
      <el-table :data="tableData" style="width: 100%;" max-height="650">
        <el-table-column label="单据编号" align="center">
          <template scope="scope">
            <span class="codesty" @click="toDetail(scope.row.code)">{{scope.row.code}}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建日期" align="center">
          <template scope="scope">
            <span>{{scope.row.createTime|fmtDate2}}</span>
          </template>
        </el-table-column>
        <el-table-column label="单据状态" align="center" width="150">
          <template scope="scope">
            <span>{{scope.row.status|statusTip}}</span>
          </template>
        </el-table-column>
        <el-table-column label="转库品项数" align="center" width="150" prop="item">
          <!-- <template scope="scope">
            <span>{{scope.row.item}}</span>
          </template>-->
        </el-table-column>
        <el-table-column label="转库总数" align="center" width="150" prop="count">
          <!-- <template scope="scope">
            <span>{{scope.row.count}}</span>
          </template>-->
        </el-table-column>
        <el-table-column label="创建人" align="center" prop="createName">
          <!-- <template scope="scope">
            <span>{{scope.row.createName}}</span>
          </template>-->
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="scope">
            <!-- <span class="codesty" @click="toDel(scope.row.code)" v-if="scope.row.status=='W'">删除</span> -->
            <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
              <img
                src="@/assets/shanchu_icon.png"
                alt
                class="codesty"
                @click="toDel(scope.row.code)" v-if="scope.row.status=='W'"
              />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="提示" :visible.sync="centerDialogVisible" width="360px" center>
        <div slot="title" class="auditBtn">
          <span class="el-icon-info"></span>
          <span class="auditBtn-1">提示</span>
        </div>
        <div class="title">
          <p>确定删除入库单？</p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button class="themeColor theBtn textMright" @click="del">确定</el-button>
          <el-button class="theBtn resetButton" @click="centerDialogVisible = false">取 消</el-button>
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
  name: "turnWarehouseList",
  data() {
    return {
      centerDialogVisible: false,
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
      tableData: [],
      delCode: ""
    };
  },
  created() {
    this.getList();
  },
  methods: {
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
        .post("/warehouse/transfer/list", qs.stringify(this.ruleForm))
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
          }else return this.$message.error(res.data.msg)
        });
    },
    newAdd() {
      this.$router.push({
        name: "turnWarehouseAdd"
      });
    },
    toDetail(code) {
      let codes = sessionStorage.setItem("code", code);
      this.$router.push({
        name: "turnWarehouseDetail",
        params: {
          code: codes
        }
      });
    },
    toDel(code) {
      this.centerDialogVisible = true;
      this.delCode = code;
    },
    del() {
      this.$axios
        .post(
          "/warehouse/transfer/delete",
          qs.stringify({
            transferCode: this.delCode,
            token: sessionStorage.getItem("token")
          })
        )
        .then(res => {
          if (res.data.code === "0000") {
            this.getList();
            this.centerDialogVisible = false;
          } else {
            this.$message.error(res.data.msg);
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
        return "审核通过";
      } else if (value == "W") {
        return "待审核";
      } else if (value == "F") {
        return "审核不通过";
      }
    }
  }
};
</script>
<style scoped>
#turnWarehouseList .nav {
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
#turnWarehouseList .content {
  box-sizing: border-box;
  background-color: #fff;
  padding: 0px 20px;
  height: 160px;
}
#turnWarehouseList h4 {
  padding-bottom: 10px;
}
#turnWarehouseList .pinName {
  text-align: right;
}
#turnWarehouseList .mg {
  margin-top: 25px;
}
#turnWarehouseList .pagesize {
  height: 60px;
}
#turnWarehouseList .page {
  margin-top: 20px;
}

#turnWarehouseList .auditBtn {
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
#turnWarehouseList .el-icon-info {
  color: #ffab5a;
  font-size: 25px;
}
#turnWarehouseList .auditBtn-1 {
  font-size: 16px;
  margin-left: 5px;
  vertical-align: top;
}
#turnWarehouseList .title {
  text-align: center;
}
#turnWarehouseList .title p {
  margin-top: 15px;
}
#turnWarehouseList .newAdd {
  text-align: right;
}
#turnWarehouseList .billMaList {
  padding-left: 35px;
  padding-right: 30px;
}
#turnWarehouseList #billInput {
  width: 100%;
}
#turnWarehouseList .pinName1 {
  text-align: left;
}
#turnWarehouseList .submit {
  background-color: #01c8dc;
  color: #fff;
}
#turnWarehouseList .submit1 {
  margin-left: 0px;
}
#turnWarehouseList .lt {
  text-align: left;
}
#turnWarehouseList .content .el-icon-plus {
  font-size: 16px;
  font-weight: 700;
}
h3 {
  padding: 20px 0 20px 0px;
}
</style>

