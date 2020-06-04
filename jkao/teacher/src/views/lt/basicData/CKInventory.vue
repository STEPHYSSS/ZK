<template>
  <div class="wareInvenStock">
    <!-- <div class="StockBox"> -->
      <!-- <p class="inputStup">
        创建日期：
        <el-date-picker
          type="daterange"
          v-model="timeArr"
          @input="change1"
          class="input1"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </p>
      <p class="inputStup">
        状态：
        <el-select placeholder="请选择" v-model="status">
          <el-option
            v-for="staItem in WareStatus"
            :key="staItem.value"
            :label="staItem.label"
            :value="staItem.value"
          ></el-option>
        </el-select>
      </p>
      <p class="inputStup">
        盘点仓库：
        <el-select placeholder="请选择" v-model="warehouseCode">
          <el-option v-for="item in options" :key="item.code" :label="item.name" :value="item.code"></el-option>
        </el-select>
      </p>
      <p class="inputStup">
        盘点单编号：
        <el-input class="input1" type="text" v-model="code" placeholder="请输入"></el-input>
      </p>
      <div class="textAlignRight">
        <el-button class="theBtn queryButton" @click="chaxun">查询</el-button>
        <el-button class="theBtn resetButton" @click="reset">重置</el-button>
      </div> -->
      <!-- <div class="textAlignRight">
        <router-link to="/CKwareInvenAdd">
          <el-button class="increase themeColor">
            <i class="el-icon-plus"></i>新增
          </el-button>
        </router-link>
      </div> -->
      <!-- <div class>
        <div class="addBtnBox ">

        </div>
      </div>-->
    <!-- </div> -->
    <div class="StockInfo">
      <div class="textAlignRight">
        <router-link to="/CKwareInvenAdd">
          <el-button class="increase themeColor">
            <i class="el-icon-plus"></i>新增
          </el-button>
        </router-link>
      </div>
      <div class="Stock_Box">
        <div class="wsListsearch">
          <el-table :data="tableData" style="width: 100%;" border max-height="600">
            <el-table-column prop="code" label="盘点单编号" align="center" width="190"></el-table-column>
            <el-table-column label="创建时间" align="center">
              <template slot-scope="scope">{{scope.row.createTime | converTime('YYYY-MM-DD')}}</template>
            </el-table-column>
            <el-table-column prop="warehouseCode" label="仓库名称" align="center"></el-table-column>
            <el-table-column label="盘点范围" align="center">
              <template slot-scope="scope">{{scope.row.scope | wareFan}}</template>
            </el-table-column>
            <el-table-column prop="status" label="状态" align="center">
              <template slot-scope="scope">{{scope.row.status | wareStatu}}</template>
            </el-table-column>
            <el-table-column prop label="操作" align="center">
              <template slot-scope="scope">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="录入"
                  placement="bottom"
                  v-if="scope.row.status =='I'"
                >
                  <div class="dis" @click="Entering(scope.row.code)">
                    <img src="@/assets/images/entering_iconC.png" class="codesty" />
                  </div>
                </el-tooltip>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="复核"
                  placement="bottom"
                  v-if="scope.row.status =='W'"
                >
                  <div class="dis" @click="reCheck(scope.row.code)">
                    <img src="@/assets/images/re-check_iconC.png" class="codesty" />
                  </div>
                </el-tooltip>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="作废"
                  placement="bottom"
                  v-if="scope.row.status =='I' || scope.row.status =='W'"
                >
                  <div class="dis" @click="cancellation(scope.row.code)">
                    <img src="@/assets/images/cancellation_icon.png" class="codesty" />
                  </div>
                </el-tooltip>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="查看"
                  placement="bottom"
                  v-if="scope.row.status =='S'|| scope.row.status =='F'"
                >
                  <div class="dis" @click="examine(scope.row.code)">
                    <img src="@/assets/images/chaxun_icon.png" class="codesty" />
                  </div>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- <div style="height:50px">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[20, 40, 60]"
            :page-size="pageSize"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            class="pagination"
          ></el-pagination>
        </div> -->
      </div>
      <el-dialog title="提示" :visible.sync="centerDialogVisible" width="360px" center>
        <div slot="title" class="auditBtn">
          <span class="el-icon-info"></span>
          <span class="auditBtn-1">提示</span>
        </div>
        <div class="title">
          <p>确定作废当前盘点单？</p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button class="theBtn themeColor textMright" @click="issureWare">确定</el-button>
          <el-button class="theBtn resetButton" @click="centerDialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "wareInvenStock",
  data() {
    return {
      timeArr: [],
      createTimeStart: "", //创建时间开始
      createTimeEnd: "", //创建时间结束
      code: "",
      status: "",
      warehouseCode: "",
      tableData: [],
      WareStatus: [
        {
          value: "I",
          label: "盘点中"
        },
        {
          value: "W",
          label: "待复核"
        },
        {
          value: "S",
          label: "已完成"
        },
        {
          value: "F",
          label: "已作废"
        }
      ],
      options: [],
      centerDialogVisible: false,
      pageNum: 1,
      pageSize: 20,
      total: 0
    };
  },
  created() {
    this.getWareInventory(this.pageNum, this.pageSize);
    this.showother();
  },
  methods: {
    getWareInventory(pageNum, pageSize) {
      this.$axios
        .post(
          this.reqApi.xinls + `/exam/warehouse/inventory/list`,
          qs.stringify({
            token: sessionStorage.getItem("token"),
            questionCode: sessionStorage.getItem("questionUUid")
          })
        )
        .then(res => {
          if (res.data.code == "0000") {
            this.tableData = res.data.data;
            this.total = res.data.data.total;
          } else {
            this.$message.error(res.data.msg);
          }
        });
    },
    // 所属仓库下拉选
    showother() {
      this.$axios
        .post(
          this.reqApi.xinls + `/exam/warehouse/list`,
          qs.stringify({
            token: sessionStorage.getItem("token"),
            questionCode: sessionStorage.getItem("questionUUid")
          })
        ).then(res => {
        if (res.data.code == "0000") {
          this.options = res.data.data;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    chaxun() {
      this.getWareInventory();
    },
    change1(e) {
      this.createTimeStart = this.$moment(e[0]).format("YYYY-MM-DD");
      this.createTimeEnd = this.$moment(e[1]).format("YYYY-MM-DD");
    },
    reset() {
      this.code = "";
      this.timeArr = [];
      this.createTimeStart = "";
      this.createTimeEnd = "";
      this.status = "";
      this.warehouseCode = "";
      this.getWareInventory();
    },
    // 录入
    Entering(code) {
      sessionStorage.setItem("WareInventoryCode", code);
      this.$router.push({
        name: "CKwareInvenEntry",
        query: {
          code: code
        }
      });
    },
    // 作废
    cancellation(code) {
      sessionStorage.setItem("WareInventoryCode", code);
      this.centerDialogVisible = true;
    },
    issureWare() {
      // this.$axios({
      //   url: "warehouse/inventory/scrap",
      //   method: "POST",
      //   headers: { "content-type": "application/x-www-form-urlencoded" },
      //   data: qs.stringify({
      //     token: sessionStorage.getItem("token"),
      //     inventoryCode: sessionStorage.getItem("WareInventoryCode")
      //   })
      // })
      this.$axios
        .post(
          this.reqApi.xinls + `/exam/warehouse/inventory/scrap`,
          qs.stringify({
            token: sessionStorage.getItem("token"),
            questionCode: sessionStorage.getItem("questionUUid"),
            code: sessionStorage.getItem("WareInventoryCode")
          })
        )
      .then(res => {
        if (res.data.code == "0000") {
          this.centerDialogVisible = false;
          this.getWareInventory();
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
    // 查看
    examine(code) {
      sessionStorage.setItem("WareInventoryCode", code);
      this.$router.push({
        name: "CKwareInvenDetail",
        query: {
          code: code
        }
      });
    },
    // 复核
    reCheck(code) {
      sessionStorage.setItem("WareInventoryCode", code);
      this.$router.push({
        name: "CKwareInvenCheck",
        query: {
          code: code
        }
      });
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getWareInventory(this.pageNum, val);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getWareInventory(val, this.pageSize);
    }
  },
  filters: {
    wareFan(value) {
      if (value == "A") {
        return "整仓盘点";
      } else if (value == "B") {
        return "指定商品";
      }
    },
    wareStatu(value) {
      if (value == "I") {
        return "盘点中";
      } else if (value == "W") {
        return "待复核";
      }else if (value == "S") {
        return "已完成";
      } else if (value == "F") {
        return "已作废";
      }
    }
  }
};
</script>
<style scoped>
.inputStup {
  width: 24%;
  display: inline-block;
  margin-bottom: 20px;
  padding: 0 5px;
}
.inputStup .el-date-editor--daterange.el-input__inner,
.inputStup .el-select,
.inputStup .el-input {
  width: 69%;
}
.textAlignRight {
  text-align: right;
  margin-right: 1.8%;
  margin-bottom: 20px;
}
.wareInvenStock {
  /* background-color: #f1f6fa; */
  min-height: 647px;
  /* min-width: 1200px; */
}
.StockBox {
  /* padding: 0 20px; */
  height: 166px;
  /* padding-bottom: 10px; */
}
.wareInvenStock .nav {
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
.wareInvenStock .StockTit {
  padding-top: 20px;
  padding-bottom: 20px;
}
.wareInvenStock .el-button {
  margin: 0;
  margin-left: 8px;
}

.wareInvenStock .auditBtn {
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
.wareInvenStock .el-icon-info {
  color: #ffab5a;
  font-size: 25px;
}
.wareInvenStock .auditBtn-1 {
  font-size: 16px;
  margin-left: 5px;
  vertical-align: top;
}
.wareInvenStock .title {
  text-align: center;
}
.wareInvenStock .title p {
  margin-top: 15px;
}
h3 {
  padding: 20px 0 20px 0px;
}
.dis {
    display: inline-block;
    width: 35px;
}
.wsListsearch{
  margin-right: 20px;
}
</style>

