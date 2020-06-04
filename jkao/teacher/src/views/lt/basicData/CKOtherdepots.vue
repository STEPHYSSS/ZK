<template>
  <div id="CKOtherdepots">
    <!-- <el-row>
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
              <el-select placeholder="请选择" v-model="status">
                <el-option
                  v-for="(item,index) in depStatus"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="6" class="textAlignCenter">
          <div>
            <span class="textTitle70px">单据编号：</span>
            <el-input class="input1" type="text" v-model="code" placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="textAlignRight">
            <el-button class="theBtn queryButton" @click="chaxun">查询</el-button>
            <el-button class="theBtn resetButton" @click="reseting">重置</el-button>
          </div>
        </el-col>
      </el-row> -->
    <div class="boxs">
      <div class="newAdd">
        <el-button class="increase themeColor" @click="newAdd">
          <i class="el-icon-plus"></i>新增
        </el-button>
      </div>
      <el-table :data="tableData" style="width: 100%;" border>
        <el-table-column label="出库单号" prop="code" width="180" align="center">
        </el-table-column>
        <el-table-column label="仓库编号" prop="warehouseCode" align="center"></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.status|statusTip}}</span>
          </template>
        </el-table-column>
        <el-table-column label="出库品项数" prop="item" align="center"></el-table-column>
        <el-table-column label="出库总数" prop="count" align="center"></el-table-column>
        <el-table-column label="审核意见" prop="checkOpinion" align="center"></el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.createTime|fmtDate2}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="审核" placement="bottom">
              <img
                src="@/assets/images/present_icon_one.png"
                @click="checkCode(scope.row.code)"
                v-if="scope.row.status=='W'"
                alt
                class="codesty"
              />
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
              <img
                src="@/assets/images/shanchu_icon.png"
                @click="delCol(scope.row.code)"
                v-if="scope.row.status=='W'"
                alt
                class="codesty"
              />
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="查看" placement="bottom">
              <img
                src="@/assets/images/chaxun_icon.png"
                @click="checkCode(scope.row.code)"
                v-if="scope.row.status=='S'"
                alt
                class="codesty"
              />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "CKOtherdepots",
  data() {
    return {
      tableData: [],
      depStatus: [
        {
          value: "W",
          label: "待审核"
        },
        {
          value: "S",
          label: "审核通过"
        },
        {
          value: "F",
          label: "审核不通过"
        }
      ],
      changeTime: [],
      createTimeStart: "",
      createTimeEnd: "",
      status: "",
      code: "",
      pageNum: 1,
      pageSize: 20,
      total: 0,
      createTimeStart: {
        disabledDate: time => {
          let endDateVal = this.ruleForm.createTimeEnd;
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime();
          }
        }
      },
      createTimeEnd: {
        disabledDate: time => {
          let beginDateVal = this.ruleForm.createTimeStart;
          if (beginDateVal) {
            return (
              time.getTime() <
              new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
            );
          }
        }
      }
    };
  },
  created() {
    this.getDepotsList(this.pageNum, this.pageSize);
  },
  methods: {
    getDepotsList(pageNum, pageSize) {
      // this.$axios({
      //   url: window.apiWare + "other/out/list",
      //   method: "POST",
      //   headers: { "content-type": "application/x-www-form-urlencoded" },
      //   data: qs.stringify({
      //     token: sessionStorage.getItem("token"),
      //     createTimeStart: this.createTimeStart,
      //     createTimeEnd: this.createTimeEnd,
      //     status: this.status,
      //     code: this.code,
      //     pageNum: this.pageNum,
      //     pageSize: this.pageSize
      //   })
      // })
      this.$axios
        .post(
          this.reqApi.xinls + `/exam/warehouse/other/out/list`,
          qs.stringify({
            token: sessionStorage.getItem("token"),
            questionCode: sessionStorage.getItem("questionUUid")
          })
        ).then(res => {
        if (res.data.code == "0000") {
          this.tableData = res.data.data;
          // this.total = res.data.data.total;
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
    // 新增
    newAdd() {
      this.$router.push({
        name: "CKOtherDepostAdd",
      });
    },
    chaxun() {
      this.getDepotsList();
    },
    reseting() {
      this.changeTime = [];
      this.createTimeStart = "";
      this.createTimeEnd = "";
      this.status = "";
      this.code = "";
      this.createTime = [];
      this.getDepotsList();
    },
    change1(e) {
      this.createTimeStart = this.$moment(e[0]).format("YYYY-MM-DD");
      this.createTimeEnd = this.$moment(e[1]).format("YYYY-MM-DD");
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getDepotsList(this.pageNum, val);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getDepotsList(val, this.pageSize);
    },
    // 查看详情和审核页面
    checkCode(val) {
      sessionStorage.setItem("depotCode", val);
      this.$router.push({
        name: "CKOtherdepotCheck",
        params: {
          otherOutCode: sessionStorage.getItem("depotCode")
        }
      });
    },
    // 删除
    delCol(code) {
      this.$confirm("删除出库单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        // type: "warning"
      })
        .then(() => {
        this.$axios
        .post(
          this.reqApi.xinls + `/exam/warehouse/other/out/delete`,
          qs.stringify({
            token: sessionStorage.getItem("token"),
            questionCode: sessionStorage.getItem("questionUUid"),
            code: code
          })
        ).then(res => {
            if (res.data.code == "0000") {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getDepotsList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
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
#CKOtherdepots .nav {
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
#CKOtherdepots .boxs {
  margin-right: 20px;
}
/* #CKOtherdepots .content {
  box-sizing: border-box;
  background-color: #fff;
  padding: 0px 20px;
  height: 160px;
} */
.inputStup {
  width: 50%;
  display: inline-block;
  margin-bottom: 20px;
  padding: 0 5px;
}
.inputStup .el-input {
  width: 69%;
}
#CKOtherdepots h4 {
  padding-bottom: 10px;
}
#CKOtherdepots .pinName {
  text-align: right;
  /* margin-right: 20px; */
}
#CKOtherdepots .btnAdd {
  /* background-color: #01c8dc; */
  color: #fff;
  margin-bottom: 10px;
}
#CKOtherdepots .mg {
  margin-top: 25px;
}
#CKOtherdepots .pagesize {
  height: 60px;
}
#CKOtherdepots .page {
  margin-top: 20px;
}

#CKOtherdepots .auditBtn {
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
#CKOtherdepots .el-icon-info {
  color: #ffab5a;
  font-size: 25px;
}
#CKOtherdepots .auditBtn-1 {
  font-size: 16px;
  margin-left: 5px;
  vertical-align: top;
}
#CKOtherdepots .title {
  text-align: center;
}
#CKOtherdepots .title p {
  margin-top: 15px;
}
#CKOtherdepots .newAdd {
  text-align: right;
  margin-bottom: 15px;
}
#CKOtherdepots .billMaList {
  padding-left: 35px;
  padding-right: 30px;
}
#CKOtherdepots #billInput {
  width: 100%;
}
#CKOtherdepots .pinName1 {
  text-align: left;
}
#CKOtherdepots .submit {
  background-color: #01c8dc;
  color: #fff;
}
#CKOtherdepots .submit1 {
  margin-left: 0px;
}
#CKOtherdepots .lt {
  text-align: left;
}
h3 {
  padding: 20px 0 20px 0px;
}
.konge{height: 25px;}
</style>

