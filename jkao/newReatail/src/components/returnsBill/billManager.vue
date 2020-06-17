<template>
  <div class="billManagerment minWidth1600 minimum">
    <div class="billMa">
      <h3>退货单管理</h3>
      <div class="billMaList">
        <el-row>
          <el-col :span="6">
            <div>
              <span class="textTitle70px">退货日期：</span>
              <p>
                <el-date-picker
                  v-model="changeTime"
                  type="daterange"
                  @input="change1"
                  class="input1"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </p>
            </div>
          </el-col>
          <el-col :span="6" class="textAlignCenter">
            <div>
              <span class="textTitle70px">退货状态：</span>
              <p class="TongYiInput">
                <el-select type="text" v-model="ruleForm.status">
                  <el-option
                    v-for="(item,index) in statu"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                    placeholder="请选择"
                  ></el-option>
                </el-select>
              </p>
            </div>
          </el-col>
          <el-col :span="6" class="textAlignCenter">
            <div>
              <span class="sotretype5">退货单编号：</span>
              <el-input class="input1" type="text" v-model="ruleForm.code" placeholder="请输入"></el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="textAlignRight">
              <el-button class="theBtn queryButton" @click="chaxun">查询</el-button>
              <el-button @click="reset" class="theBtn resetButton">重置</el-button>
            </div>
          </el-col>
        </el-row>

        <table id="billInput">
          <tr>
            <td class="huoNum">
              <!-- <span>退货日期：</span>
              <p>
                <el-date-picker
                  v-model="changeTime"
                  type="daterange"
                  @input="change1"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </p>-->
            </td>
            <td class="barNum">
              <!-- <span>退货状态：</span>
              <p>
                <el-select type="text" v-model="ruleForm.status">
                  <el-option
                    v-for="(item,index) in statu"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                    placeholder="请选择"
                  ></el-option>
                </el-select>
              </p>-->
            </td>
            <td class="pinName">
              <!-- <span>退货单编号：</span>
              <p>
                <el-input type="text" v-model="ruleForm.code" placeholder="请输入"></el-input>
              </p>-->
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="billMa2">
      <div class="billMaList2">
        <div class="increaseBox">
          <div class="addBtnBox">
            <div class="serchBoxBtn60">
              <el-button class="increase themeColor" @click="newIncrease">
                <i class="el-icon-plus"></i>新增
              </el-button>
            </div>
          </div>
        </div>
        <el-table :data="tableData" style="width: 100%;">
          <el-table-column label="退货单编号" align="center" class="codesty" width="220">
            <template scope="scope">
              <span class="codesty" @click="billdetai(scope.row.code)">{{scope.row.code}}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建日期" align="center">
            <template scope="scope">{{scope.row.createTime | converTime('YYYY-MM-DD')}}</template>
          </el-table-column>
          <el-table-column label="退货状态" align="center">
            <template scope="scope">{{scope.row.status | statusTip}}</template>
          </el-table-column>
          <el-table-column prop="item" label="退货品项数" align="center"></el-table-column>
          <el-table-column prop="count" label="退货总数" align="center"></el-table-column>
          <el-table-column prop="amount" label="退货总金额" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template scope="scope">
              <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                <img
                  src="@/assets/shanchu_icon.png"
                  v-if="scope.row.status=='1'"
                  @click="delbillRow(scope.row.code)"
                  class="codesty"
                  alt
                />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <div style="height:50px">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[20,40,60]"
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
  name: "billManagerment",
  data() {
    return {
      statu: [],
      changeTime: [],
      ruleForm: {
        createTimeStart: "", //创建时间开始
        createTimeEnd: "", //创建时间结束
        status: "",
        code: "",
        token: sessionStorage.getItem("token")
      },
      tableData: [],
      pageNum: 1,
      pageSize: 20,
      total: 0
    };
  },
  created() {
    this.billList(this.pageNum);
    this.showother();
  },
  methods: {
    newIncrease() {
      this.$router.push({
        name: "billAdd"
      });
    },
    billList(pageNum) {
      let that = this;
      let token = sessionStorage.getItem("token");
      if (token) {
        that
          .$axios({
            url: window.apiStore + "return/list",
            method: "POST",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            data: qs.stringify({
              createTimeStart: this.ruleForm.createTimeStart, //创建时间开始
              createTimeEnd: this.ruleForm.createTimeEnd, //创建时间结束
              status: this.ruleForm.status,
              code: this.ruleForm.code,
              token: sessionStorage.getItem("token"),
              pageNum: this.pageNum,
              pageSize: this.pageSize
            })
          })
          .then(res => {
            if (res.data.code == "0000") {
              that.tableData = res.data.data.list;
              that.total = res.data.data.total;
            } else if (res.data.code == "6666") {
              that.$message({
                showClose: true,
                message: "token异常，请重新登录",
                type: "error"
              });
              const timer = setTimeout(() => {
                clearTimeout(timer);
                that.$router.push({ name: "login" });
              }, 3000);
            } else {
              that.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            console.log("数据异常", err);
          });
      } else {
        that.$message({
          showClose: true,
          message: "token异常，请重新登录",
          type: "error"
        });
        const timer = setTimeout(() => {
          clearTimeout(timer);
          that.$router.push({ name: "login" });
        }, 3000);
      }
    },
    // 删除
    delbillRow(code) {
      // return/delete
      this.$axios({
        url: window.apiStore + "return/delete",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          code: code,
          token: sessionStorage.getItem("token")
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.billList();
        }
      });
    },
    // 状态下拉选
    showother() {
      let _this = this;
      let token = sessionStorage.getItem("token");
      let code = "return_sheet_status";
      _this
        .$axios({
          url: window.apiUrl + "dictionary/list",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            token: token,
            code: code
          })
        })
        .then(res => {
          if ((res.data.code = "0000")) {
            this.statu = res.data.data;
          }
        })
        .catch(err => {
          console.log("数据异常", err);
        });
    },
    change1(e) {
      this.ruleForm.createTimeStart = this.$moment(e[0]).format("YYYY-MM-DD");
      this.ruleForm.createTimeEnd = this.$moment(e[1]).format("YYYY-MM-DD");
    },
    billdetai(code) {
      sessionStorage.setItem("code", code); // 用户名
      let codes = sessionStorage.getItem("code");
      this.$router.push({
        name: "billdetail",
        params: {
          code: codes
        }
      });
    },

    // 查询 重置
    chaxun() {
      this.billList();
    },
    reset() {
      this.changeTime = []; //创建日期
      this.ruleForm.status = "";
      this.ruleForm.code = "";
      this.ruleForm.createTimeStart = "";
      this.ruleForm.createTimeEnd = "";
      this.billList();
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.billList(this.pageNum, val);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.billList(val, this.pageSize);
    }
  },
  filters: {
    statusTip(value) {
      if (value == "1") {
        return "待审核";
      } else if (value == "2") {
        return "审核通过";
      } else if (value == "3") {
        return "审核不通过";
      }
    }
  }
};
</script>
<style scoped>
.billManagerment {
  /* background-color: #f1f6fa; */
  min-height: 647px;
  min-width: 1200px;
}
.billMa,
.billMa2 {
  background: #fff;
  /* border-radius: 10px;
  min-height: 200px; */
}
.billMa {
  height: 150px;
}
h3 {
  padding: 20px 0 20px 20px;
}
.billMaList {
  margin: 0 20px;
}
.billMaList2 {
  box-sizing: border-box;
  padding-bottom: 30px;
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
  width: 54%;
}
.btnfloat {
  float: right;
  margin-right: 8px;
}
.addBtn > .el-button {
  margin: 0;
  padding: 8px 18px;
  border-radius: 6px;
}
</style>
