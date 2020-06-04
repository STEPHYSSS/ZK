<template>
  <div class="strongDelivery">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
      <el-breadcrumb-item :to="{ path: '/operatIndex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>门店单据管理</el-breadcrumb-item>
      <el-breadcrumb-item>强配单管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="billMa">
      <h3>强配单管理</h3>
      <div class="billMaList">
        <table id="billInput">
          <tr>
            <td class="huoNum">
              <span>创建日期：</span>
              <p>
                <el-date-picker
                  v-model="changeTime"
                  type="daterange"
                  @input="change1"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </p>
            </td>
            <td class="barNum">
              <span>状态：</span>
              <p>
                <el-select type="text" v-model="ruleForm.status">
                  <el-option
                    v-for="(item,index) in statu"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    placeholder="请选择"
                  ></el-option>
                </el-select>
              </p>
            </td>
            <td class="pinName">
              <span>强配单编号：</span>
              <p>
                <el-input
                  type="text"
                  v-model="ruleForm.matchCode"
                  placeholder="请输入"
                  maxlength="24"
                  onkeyup="this.value=this.value.replace(/\D/g,'')"
                ></el-input>
              </p>
            </td>
          </tr>
        </table>
        <div class="billsearch">
          <el-button class="present-btn btnAdd" @click="chaxun">查询</el-button>
          <el-button class="reset" @click="reset">重置</el-button>
        </div>
      </div>
    </div>
    <div class="billMa2">
      <div class="billMaList2">
        <div class="billsearch">
          <el-button @click="disabled" :disabled="btnStatus" class="btnAdd">新增</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%;">
          <el-table-column label="创建日期" align="center">
            <template scope="scope">{{scope.row.createTime | converTime('YYYY-MM-DD')}}</template>
          </el-table-column>
          <el-table-column label="强配单编号" align="center" class="codesty">
            <template scope="scope">
              <span>{{scope.row.code}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="item" label="订购品项数" align="center"></el-table-column>
          <el-table-column prop="count" label="订购总数" align="center"></el-table-column>
          <el-table-column prop="amount" label="订购总金额" align="center"></el-table-column>
          <el-table-column label="状态" align="center">
            <template scope="scope">
              {{scope.row.status | statusTip}}
              <!-- <span v-show="scope.row.status==1">待提交</span>
              <span v-show="scope.row.status==2">备货中</span>
              <span v-show="scope.row.status==3">部分验收</span>
              <span v-show="scope.row.status==4">全部验收</span>-->
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center">
            <template scope="scope">
              <span class="codesty" @click="strongDetails(scope.row.code)">查看</span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <el-button
                class="codesty btn55"
                @click="delBefore(scope.row.code)"
                v-show="scope.row.status==1"
              >删除</el-button>
              <el-button
                class="codesty btn55"
                @click="centerDialogVisible = true"
                v-show="scope.row.status!=1"
                disabled
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog title="提示" :visible.sync="centerDialogVisible" width="25%" center>
          <div slot="title" class="auditBtn">
            <span class="el-icon-info"></span>
            <span class="auditBtn-1">提示</span>
          </div>
          <div style="text-align: center">确定删除当前强配单?</div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="delList(code)">确 定</el-button>
          </span>
        </el-dialog>
        <div style="height:50px">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="ruleForm.pageNum"
            :page-sizes="[20, 40, 60,80]"
            :page-size="ruleForm.pageSize"
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
  name: "strongDelivery",
  data() {
    return {
      statu: [
        {
          value: "1",
          label: "待提交"
        },
        {
          value: "2",
          label: "备货中"
        },
        {
          value: "3",
          label: "部分验收"
        },
        {
          value: "4",
          label: "全部验收"
        }
      ],
      changeTime: [],
      centerDialogVisible: false,
      ruleForm: {
        createTimeStart: "", //创建时间开始
        createTimeEnd: "", //创建时间结束
        status: "",
        code: "",
        token: sessionStorage.getItem("token"),
        pageNum: 1,
        pageSize: 20,
        matchCode: ""
      },
      tableData: [],
      btnStatus: false,
      total: 0,
      code: ""
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    // 页面加载获取列表
    getlist() {
      this.$axios
        .post("/sys/match/list", qs.stringify(this.ruleForm))
        .then(res => {
          if (res.data.code === "0000") {
            this.total = res.data.data.total;
            this.tableData = res.data.data.list;
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
    //跳转查看详情
    strongDetails(code) {
      sessionStorage.setItem("code", code);
      let codes = sessionStorage.getItem("code");
      this.$router.push({
        name: "strongDetails",
        params: {
          code: codes
        }
      });
    },
    delBefore(code) {
      this.centerDialogVisible = true;
      this.code = code;
    },
    // 删除
    delList(code) {
      this.$axios
        .post(
          "/sys/match/delete",
          qs.stringify({
            matchCode: code,
            token: sessionStorage.getItem("token")
          })
        )
        .then(res => {
          if (res.data.code == "0000") {
            this.centerDialogVisible = false;
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          }
        });

      this.getlist();
    },
    change1(e) {
      this.ruleForm.createTimeStart = this.$moment(e[0]).format("YYYY-MM-DD");
      this.ruleForm.createTimeEnd = this.$moment(e[1]).format("YYYY-MM-DD");
    },

    // 查询 重置
    chaxun() {
      this.getlist();
    },
    reset() {
      this.changeTime = ""; //创建日期
      this.ruleForm.status = "";
      this.ruleForm.matchCode = "";
      this.ruleForm.createTimeStart = "";
      this.ruleForm.createTimeEnd = "";
      this.getlist();
    },
    // 每页的数据
    handleSizeChange(val) {
      this.ruleForm.pageSize = val;
      this.getlist(); //
      //this.tableData 存放所有的数据
    },
    // 当前页码
    handleCurrentChange(val) {
      this.ruleForm.pageNum = val;
      this.getlist();
    },
    //超过十点不允许用户点击新增
    disabled() {
      /*  00:00~22:00可编辑或删除当日创建的强配单，22:00~24:00不可新增、编辑和删除；*/
      let newTime = new Date().getTime();
      let newDay = new Date();
      let y = newDay.getFullYear();
      let m = newDay.getMonth() + 1;
      let d = newDay.getDate();
      let min = y + "-" + m + "-" + d + " " + "22:00:00";
      let max = y + "-" + m + "-" + d + " " + "23:59:59";
      let minTime = new Date(min).getTime();
      let maxTime = new Date(max).getTime();

      if (newTime >= minTime && newTime <= maxTime) {
        this.$message({
          showClose: true,
          message: "每天22:00-24:00不允许新增强配单",
          type: "warning"
        });
        this.btnStatus = true;
        return;
      } else {
        this.$router.push({
          name: "strongAdd"
        });
      }
    }
  },
  filters: {
    statusTip(value) {
      if (value == "1") {
        return "待提交";
      } else if (value == "2") {
        return "备货中";
      } else if (value == "3") {
        return "部分验收";
      } else if (value == "4") {
        return "全部验收";
      }
    }
  }
};
</script>
<style scoped>
.strongDelivery {
  background-color: #f1f6fa;
  min-height: 647px;
  min-width: 1700px;
}
.billMa,
.billMa2 {
  margin: 0px auto;
  background: #fff;
  border-radius: 10px;
  min-height: 200px;
}
.billMa2 {
  margin-top: 30px;
}
h3 {
  padding: 20px 0 20px 35px;
}
.billMaList {
  padding-left: 35px;
  padding-right: 30px;
}
.billMaList2 {
  box-sizing: border-box;
  padding: 15px 30px 50px 35px;
}
.pagination {
  float: right;
  margin-top: 30px;
  margin-bottom: 30px;
}
#billInput {
  text-align: left;
  width: 100%;
  padding-bottom: 20px;
}
#billInput tr {
  width: 100%;
}
#billInput .huoNum {
  width: 30%;
}
#billInput .barNum {
  width: 30%;
  text-align: center;
}
#billInput .pinName {
  width: 30%;
  text-align: right;
}
#billInput .el-range-editor.el-input__inner {
  width: 300px;
}
.createDay {
  letter-spacing: 2.8px;
}
p {
  display: inline-block;
  width: 67%;
}
.btnfloat {
  float: right;
  margin-right: 8px;
}
.auditBtn {
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
.btn55 {
  border: none;
  margin-left: 0px;
}
.btnAdd {
  background-color: #01c8dc;
  color: #fff;
  margin-bottom: 10px;
}
.el-icon-info {
  color: #ffab5a;
  font-size: 25px;
}
.auditBtn-1 {
  font-size: 16px;
  margin-left: 5px;
  vertical-align: top;
}
.nav {
  height: 50px;
  line-height: 50px;
}
.billsearch {
  padding-right: 3px;
}
</style>
