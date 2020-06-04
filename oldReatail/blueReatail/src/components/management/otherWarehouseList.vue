<template>
  <div id="otherWarehouseList" class="minimum minWidth1600">
    <div class="content">
      <h3>其他入库</h3>
      <el-row class="rowSpacing">
        <el-col :span="6">
          <div>
            <span class="textTitle70px">创建日期：</span>
            <el-date-picker
              v-model="changeTime"
              type="daterange"
              @input="change1"
              class="input1"
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
              <el-select placeholder="请选择" v-model="ruleForm.status" class="input1">
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
      <div class="newAdd">
        <el-button class="increase themeColor" @click="newAdd">
          <i class="el-icon-plus"></i>新增
        </el-button>
      </div>
    </div>
    <div>
      <el-table :data="tableData" style="width: 100%;" border>
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
        <el-table-column label="入库品项数" align="center" width="150">
          <template scope="scope">
            <span>{{scope.row.item}}</span>
          </template>
        </el-table-column>
        <el-table-column label="入库总数" align="center" width="150">
          <template scope="scope">
            <span>{{scope.row.count}}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建人" align="center">
          <template scope="scope">
            <span>{{scope.row.createName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="scope">
            <!-- <span class="codesty" @click="toDel(scope.row.code)" v-if="scope.row.status=='W'">删除</span> -->
            <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
              <img
                src="@/assets/shanchu_icon.png"
                @click="toDel(scope.row.code)"
                v-if="scope.row.status=='W'"
                alt
                class="codesty"
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
          <el-button class="theBtn themeColor textMright" @click="del">确定</el-button>
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
      <el-dialog title="选择入库仓库" :visible.sync="dialogTableVisible" width="950px">
        <div class="billMaList">
          <table id="billInput">
            <tr>
              <td class="pinName1">
                <span>仓库名称：</span>

                <el-input type="text" v-model="warehouseData.name" placeholder="请输入" class="input1"></el-input>
              </td>
              <div class="billsearch">
                <el-button @click="search" class="theBtn queryButton">查询</el-button>
                <el-button class="theBtn resetButton" @click="reset1">重置</el-button>
              </div>
            </tr>
            <tr class="lt">
              <!-- <el-button class="theBtn queryButton" @click="chooseWarehouse">确定</el-button> -->
            </tr>
          </table>
          <el-table
            ref="multipleTable"
            :data="warehouseList"
            style="width: 100%;"
            max-height="300"
            border
          >
            <el-table-column label="选择" width="100" align="center">
              <template scope="scope">
                <el-radio class="radio" v-model="warehouseCode" :label="scope.row.code">&nbsp;</el-radio>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="仓库名称" align="center" width="150"></el-table-column>
            <el-table-column label="所在区域" align="center">
              <template scope="scope">{{scope.row.province}}-{{scope.row.city}}-{{scope.row.area}}</template>
            </el-table-column>
            <el-table-column prop="address" label="仓库名称" align="center"></el-table-column>
          </el-table>
          <div>
            <div class="dialogSureBox">
            <el-button class="theBtn themeColor textMright" @click="chooseWarehouse">确定</el-button>
            <el-button class="theBtn resetButton" @click="dialogTableVisible=false">取消</el-button>
          </div>
          <div class="dialog_pagination">
            <el-pagination
             @size-change="handleSizeChange1"
              @current-change="handleCurrentChange1"
              :current-page="warehouseData.pageNum"
              :page-sizes="[20, 40, 60, 80]"
              :page-size="warehouseData.pageSize"
              background
              layout="total, sizes, prev, pager, next, jumper"
              :total="warehouseTotal"
              class="pagination"
            ></el-pagination>




              <!-- @size-change="handleSizeChange1"
              @current-change="handleCurrentChange1"
              :current-page="warehouseData.pageNum"
              :page-sizes="[20, 40, 60, 80]"
              :page-size="warehouseData.pageSize"
              background
              layout="total, sizes, prev, pager, next, jumper"
              :total="warehouseTotal"
              
            ></el-pagination> -->
          </div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "otherWarehouseList",
  data() {
    return {
      warehouseCode: "",
      dialogTableVisible: false,
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
      warehouseData: {
        pageNum: 1,
        pageSize: 20,
        name: ""
      },
      warehouseTotal: 0,
      warehouseList: [],
      tableDataTotal: 0,
      tableData: [],
      delCode: ""
    };
  },
  created() {
    this.getList();
    this.getWarehouseList();
  },
  methods: {
    chooseWarehouse() {
      if (!this.warehouseCode) {
        return this.$message.error("请选择仓库！！！");
      } else {
        this.$router.push({
          name: "otherWarehouseAdd",
          query: {
            code: this.warehouseCode
          }
        });
      }
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
    reset1() {
      this.warehouseData.name = "";
      this.getWarehouseList();
    },
    change1(e) {
      this.ruleForm.createTimeStart = this.$moment(e[0]).format("YYYY-MM-DD");
      this.ruleForm.createTimeEnd = this.$moment(e[1]).format("YYYY-MM-DD");
    },
    search() {
      this.getWarehouseList();
    },
    getWarehouseList() {
      this.$axios
        .post("/public/warehouse/list", qs.stringify(this.warehouseData))
        .then(res => {
          if (res.data.code === "0000") {
            this.warehouseList = res.data.data.list;
            this.warehouseTotal = res.data.data.total;
          }
        });
    },
    getList() {
      this.$axios
        .post("/warehouse/other/in/list", qs.stringify(this.ruleForm))
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
    newAdd() {
      this.dialogTableVisible = true;
    },
    toDetail(code) {
      let codes = sessionStorage.setItem("code", code);
      this.$router.push({
        name: "otherWarehouseDetail",
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
          "/warehouse/other/in/delete",
          qs.stringify({
            otherInCode: this.delCode,
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
    handleSizeChange1(val) {
      this.warehouseData.pageSize = val;
      this.getWarehouseList();
    },
    handleCurrentChange1(val) {
      this.warehouseData.pageNum = val;
      this.getWarehouseList();
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
#otherWarehouseList .nav {
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
#otherWarehouseList .content {
  box-sizing: border-box;
  background-color: #fff;
  padding: 0px 20px;
  height: 160px;
}
#otherWarehouseList h4 {
  padding-bottom: 10px;
}
#otherWarehouseList .pinName {
  text-align: right;
  /* margin-right: 20px; */
}
#otherWarehouseList .btnAdd {
  /* background-color: #01c8dc; */
  color: #fff;
  margin-bottom: 10px;
}
#otherWarehouseList .mg {
  margin-top: 25px;
}
#otherWarehouseList .pagesize {
  height: 60px;
}
#otherWarehouseList .page {
  margin-top: 20px;
}

#otherWarehouseList .auditBtn {
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
#otherWarehouseList .el-icon-info {
  color: #ffab5a;
  font-size: 25px;
}
#otherWarehouseList .auditBtn-1 {
  font-size: 16px;
  margin-left: 5px;
  vertical-align: top;
}
#otherWarehouseList .title {
  text-align: center;
}
#otherWarehouseList .title p {
  margin-top: 15px;
}
#otherWarehouseList .newAdd {
  text-align: right;
  margin-bottom: 5px;
}
#otherWarehouseList .billMaList {
  padding-left: 35px;
  padding-right: 30px;
}
#otherWarehouseList #billInput {
  width: 100%;
}
#otherWarehouseList .pinName1 {
  text-align: left;
}
#otherWarehouseList .submit {
  background-color: #01c8dc;
  color: #fff;
}
#otherWarehouseList .submit1 {
  margin-left: 0px;
}
#otherWarehouseList .lt {
  text-align: left;
}
h3 {
  padding: 20px 0 20px 0px;
}
</style>

