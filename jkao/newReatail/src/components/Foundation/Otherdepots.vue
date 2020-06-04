<template>
  <div class="orDepots minimum minWidth1600">
    <div class="DepotsBox">
      <h3 class="demonstration">其他出库</h3>
      <el-row>
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
      </el-row>
    </div>
    <div class="DepotsInfo">
      <div class="rece_Box">
        <div class="wsListsearch">
          <div class="increaseBox">
            <div class="addBtnBox">
              <div class>
                <router-link to="/OtherdepotsAdd">
                  <el-button class="increase themeColor">
                    <i class="el-icon-plus"></i>新增
                  </el-button>
                </router-link>
              </div>
            </div>
          </div>
          <!-- <router-link to="/OtherdepotsAdd">
            <img src="@/assets/newlyincreased.png" alt />
          </router-link>-->
        </div>
        <el-table :data="tableData" style="width: 100%;" border max-height="600">
          <el-table-column label="单据编号" align="center" width="300">
            <template scope="scope">
              <span class="codesty" @click="checkCode(scope.row.code)">{{scope.row.code}}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" align="center">
            <template scope="scope">
              <span
                v-if="scope.row.createTime !=null"
              >{{scope.row.createTime | converTime('YYYY-MM-DD')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="单据状态" align="center">
            <template slot-scope="scope">{{scope.row.status | statusTip}}</template>
          </el-table-column>
          <el-table-column prop="item" label="出库品项数" align="center"></el-table-column>
          <el-table-column prop="count" label="出库总数" align="center"></el-table-column>
          <el-table-column prop="createName" label="创建人" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                <img
                  src="@/assets/shanchu_icon.png"
                  v-if="scope.row.status == 'W'"
                  @click="delCol(scope.row.code)"
                  alt
                  class="codesty"
                />
              </el-tooltip>
              <!-- <span
                class="codesty"
                v-if="scope.row.status == 'W'"
                @click="delCol(scope.row.code)"
              >删除</span>-->
            </template>
          </el-table-column>
        </el-table>
        <div style="height:50px">
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
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "orDepots",
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
      this.$axios({
        url: window.apiWare + "other/out/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: sessionStorage.getItem("token"),
          createTimeStart: this.createTimeStart,
          createTimeEnd: this.createTimeEnd,
          status: this.status,
          code: this.code,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.tableData = res.data.data.list;
          this.total = res.data.data.total;
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
    // 查看详情
    checkCode(val) {
      sessionStorage.setItem("depotCode", val); // 用户名
      this.$router.push({
        name: "OtherdepDetail",
        params: {
          otherOutCode: sessionStorage.getItem("depotCode")
        }
      });
    },
    delCol(code) {
      this.$confirm("删除出库单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            url: window.apiWare + "other/out/delete",
            method: "POST",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            data: qs.stringify({
              token: sessionStorage.getItem("token"),
              otherOutCode: code
            })
          }).then(res => {
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
      if (value == "W") {
        return "待审核";
      } else if (value == "S") {
        return "审核通过";
      } else if (value == "F") {
        return "审核不通过";
      }
    }
  }
};
</script>
<style scoped>
.orDepots {
  /* background-color: #f1f6fa; */
  min-height: 647px;
  min-width: 1200px;
}
.DepotsBox {
  height: 150px;
  padding: 0 20px;
}
.orDepots .nav {
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
.spacelet {
  letter-spacing: 6px;
}
.aaa {
  width: 66%;
}
.cit {
  width: 30%;
}
.shop2 {
  margin: 0 2px;
}
.bbb {
  width: 34%;
  text-align: right;
}
.bbb .typ {
  width: 58%;
}
.sotl {
  width: 33%;
}
.sotl p {
  width: 60%;
}
.aaa,
.cit,
.shop2,
.bbb,
.bbb .typ,
.sotl,
.sotl p {
  display: inline-block;
}
.sotl2 {
  text-align: right;
}
.sotl2 .sotlname {
  margin-right: 5px;
}
.soList {
  margin-bottom: 30px;
}
.soList .el-range-editor.el-input__inner {
  width: 100%;
}
.wsListsearch {
  text-align: right;
  margin-bottom: 10px;
}
.pageR {
  text-align: right;
}
h3 {
  padding: 20px 0 20px 0px;
}
</style>