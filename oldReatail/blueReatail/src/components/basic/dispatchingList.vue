<template>
  <div id="dispatchingList" class="minimum minWidth1600">
    <div class="content">
      <h3>配送路线</h3>
      <el-row>
        <el-col :span="8">
          <div>
            <span class="textTitle70px">路线名称：</span>
              <el-input class="input1" type="text" placeholder="请输入"  v-model="ruleForm.name"></el-input>

          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <span class="textTitle70px textTitleR">状态：</span>
            <span>
              <el-select placeholder="请选择" v-model="ruleForm.status" class="input1">
                <el-option label="已启用" value="1"></el-option>
                <el-option label="已禁用" value="0"></el-option>
              </el-select>
            </span>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <div class="textAlignRight">
            <el-button class="theBtn queryButton" @click="chaxun">查询</el-button>
            <el-button class="theBtn resetButton" @click="reset">重置</el-button>
          </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="boxContent">
       <div class="increaseBox">
          <div class="addBtnBox">
            <div style="text-align: right;">
              <el-button class="increase themeColor" @click="newAdd">
                <i class="el-icon-plus"></i>新增
              </el-button>
            </div>
          </div>
        </div>
      <el-table :data="tableData" style="width: 100%;" border>
        <el-table-column label="路线编号" align="center">
          <template slot-scope="{row,$index}">
            <span>{{$index+1}}</span>
          </template>
        </el-table-column>
        <el-table-column label="路线名称" align="center" prop="name" width="200"></el-table-column>
        <el-table-column label="仓库名称" align="center" prop="warehouseCode"></el-table-column>
        <el-table-column label="门店数量" align="center">
          <template scope="scope">
            <span class="codesty" @click="toDel">{{scope.row.storeCount}}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template scope="scope">
            <span>{{scope.row.createTime|fmtDate2}}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template scope="scope">
            <span>{{scope.row.status|statusTip}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
              <p class="dis">
                <img src="@/assets/xiugai_icon.png" @click="toDetail(scope.row.id)" class="codesty" />
              </p>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="禁用"
              placement="bottom"
              v-if="scope.row.status =='1'"
            >
              <p class="dis">
                <img src="@/assets/qiyong_icon.png" @click="modify(scope.row.id)" class="codesty"/>
              </p>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="启用" placement="bottom" v-else>
              <p class="dis">
                <img src="@/assets/jinyong_icon.png" @click="modify(scope.row.id)" class="codesty" />
              </p>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="门店数量" :visible.sync="centerDialogVisible" width="50%" center>
        <div slot="title" class="auditBtn">
          <span class="el-icon-info"></span>
          <span class="auditBtn-1">提示</span>
        </div>
        <div class="title">
          <img src="../../images/map.png" alt />
        </div>
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
  name: "dispatchingList",
  data() {
    return {
      centerDialogVisible: false,
      changeTime: "",
      ruleForm: {
        token: sessionStorage.getItem("token"),
        pageNum: 1,
        pageSize: 20,
        status: "",
        name: ""
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
      this.ruleForm.name = "";
      this.ruleForm.status = "";
      this.getList();
    },

    change1(e) {
      this.ruleForm.createTimeStart = this.$moment(e[0]).format("YYYY-MM-DD");
      this.ruleForm.createTimeEnd = this.$moment(e[1]).format("YYYY-MM-DD");
    },
    getList() {
      this.$axios
        .post("/warehouse/route/list", qs.stringify(this.ruleForm))
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
      this.$router.push({
        name: "dispatchingAdd"
      });
    },
    toDetail(id) {
      this.$router.push({
        name: "dispatchingAdd",
        query: {
          id: id
        }
      });
    },
    toDel(code) {
      this.centerDialogVisible = true;
      this.delCode = code;
    },
    modify(id) {
      this.$axios
        .post(
          "/warehouse/route/status/modify",
          qs.stringify({
            token: sessionStorage.getItem("token"),
            id: id
          })
        )
        .then(res => {
          if (res.data.code == "0000") {
            this.getList();
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
      if (value == "0") {
        return "已禁用";
      } else if (value == "1") {
        return "已启用";
      }
    }
  }
};
</script>
<style scoped>
#dispatchingList .nav {
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
#dispatchingList .content {
  box-sizing: border-box;
  background-color: #fff;
  padding: 0px 20px;
  height: 150px;
}
#dispatchingList h4 {
  padding-bottom: 10px;
}
#dispatchingList .content .el-input__inner {
  border: 1px solid #dcdfe6;
  width: 80%;
}
#dispatchingList .pinName {
  text-align: right;
  margin-right: 20px;
}
#dispatchingList .btnAdd {
  background-color: #e50109;
  color: #fff;
  margin-bottom: 10px;
}
#dispatchingList .pagesize {
  height: 60px;
}
#dispatchingList .page {
  margin-top: 20px;
}

#dispatchingList .auditBtn {
  position: absolute;
  left: 0;
  top: -1px;
  padding-top: 20px;
  border-bottom: 3px solid #dbe0e5;
  /* background-color: pink; */
  width: 100%;
  text-align: left;
  padding-left: 14px;
  box-sizing: border-box;
}
#dispatchingList .el-icon-info {
  color: #ffab5a;
  font-size: 25px;
}
#dispatchingList .auditBtn-1 {
  font-size: 16px;
  margin-left: 5px;
  vertical-align: top;
}
#dispatchingList .title {
  width: 100%;
  height: 100%;
  text-align: center;
  padding-top: 17px;
}
#dispatchingList .title p {
  margin-top: 15px;
}
#dispatchingList .newAdd {
  text-align: right;
  margin-right: 4px;
}
#dispatchingList .billMaList {
  padding-left: 35px;
  padding-right: 30px;
}
#dispatchingList #billInput {
  width: 100%;
}
#dispatchingList .pinName1 {
  text-align: left;
}
#dispatchingList .submit {
  background-color: #01c8dc;
  color: #fff;
}
#dispatchingList .submit1 {
  margin-left: 0px;
}
#dispatchingList .lt {
  text-align: left;
}
#dispatchingList .content .el-icon-plus {
  font-size: 16px;
  font-weight: 700;
}
.boxContent {
  background-color: #fff;
}
h3 {
  padding: 20px 0 20px 0px;
}
</style>

