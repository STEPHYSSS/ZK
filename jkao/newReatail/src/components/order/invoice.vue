<template>
  <div class="invoice minimum" id="invoice">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="今日订购" name="first"></el-tab-pane>

      <el-tab-pane label="全部叫货单" name="second">
        <div class="order-head">
          <div class="box">
            <el-row>
              <el-col :span="6">
                <div class="classify">
                  <span class="Width">创建日期：</span>

                  <el-date-picker
                    v-model="aaa"
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
                  <span class="Width">叫货状态：</span>
                  <p class="TongYiInput">
                    <el-select v-model="ruleForm.status" placeholder="请选择">
                      <el-option
                        v-for="item in status2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </p>
                </div>
              </el-col>
              <el-col :span="6" class="textAlignCenter">
                <div>
                  <span class="sotretype5">叫货单编号：</span>
                  <el-input class="input1" v-model="ruleForm.code" placeholder="请输入"></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="textAlignRight">
                  <el-button class="theBtn queryButton" @click="chaxuninfo">查询</el-button>
                  <el-button class="theBtn resetButton" @click="resetinfo">重置</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      
      <div class="table">
        <div class="tab_1">
          <el-table :data="tableData" style="width: 100%" max-height="600">
            <el-table-column label="创建日期" align="center">
              <template scope="scope">
                <span>{{scope.row.createTime | converTime('YYYY-MM-DD')}}</span>
              </template>
            </el-table-column>
            <el-table-column label="叫货单编号" align="center">
              <template scope="scope">
                <span class="codesty" @click="detailC(scope.row.code)">{{scope.row.code}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="item" label="订购品数量" align="center"></el-table-column>
            <el-table-column prop="count" label="订购总数" align="center"></el-table-column>
            <el-table-column prop="amount" label="订购总金额" align="center"></el-table-column>
            <el-table-column label="叫货状态" align="center">
              <template scope="scope">
                <span v-if="scope.row.status =='1'">备货中</span>
                <span v-else-if="scope.row.status =='2'">待验收</span>
                <span v-else-if="scope.row.status =='3'">部分验收</span>
                <span v-else>全部验收</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template scope="scope">
                <!-- <span
                class="codesty"
                v-if="scope.row.status =='2'||scope.row.status =='3'"
                @click="skip"
                >验收</span>-->
                <el-tooltip class="tips" effect="dark" content="验收" placement="bottom">
                  <img
                    src="@/assets/present_icon_one.png"
                    alt
                    @click="skip"
                    v-if="scope.row.status =='2'||scope.row.status =='3'"
                  />
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
          <div style="height:50px">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="ruleForm.pageNum"
              :page-sizes="[20, 40, 60]"
              :page-size="ruleForm.pageSize"
              background
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              class="pagination"
            ></el-pagination>
          </div>
        </div>
      </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import qs from "qs";
export default {
  data() {
    return {
      aaa: [],
      activeName:'second',
      ruleForm: {
        createTimeStart: "",
        createTimeEnd: "",
        status: "",
        code: "",
        pageNum: 1,
        pageSize: 20,
        token: sessionStorage.getItem("token")
      },
      status2: [
        {
          value: "1",
          label: "备货中"
        },
        {
          value: "2",
          label: "待验收"
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
      tableData: [],
      total: 0
    };
  },
  created() {
    this.allOrderList();
  },
  methods: {
     handleClick(tab,event){
     if(this.activeName=='first'){
        this.$router.push({
          name:'management'
        })
      }
    },
    toInvoice(){
      this.$router.push({
        name:'management'
      })
    },
    // 今日订购
    todayOrder() {
      this.$router.push({ name: "management" });
    },
    // 叫货单详情
    detailC(code) {
      let code1 = this.$router.push({
        name: "goodsmanagement",
        params: {
          code: sessionStorage.setItem("code", code)
        }
      });
    },
    skip() {
      this.$router.push({
        name: "receiving"
      });
    },
    allOrderList() {
      let that = this;
      that
        .$axios({
          url: window.apiStore + "ordering/list",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify(that.ruleForm)
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
    },
    change1(e) {
      this.ruleForm.createTimeStart = this.$moment(e[0]).format("YYYY-MM-DD");
      this.ruleForm.createTimeEnd = this.$moment(e[1]).format("YYYY-MM-DD");
    },
    // 重置 查询
    resetinfo() {
      this.aaa = [];
      this.ruleForm.code = "";
      this.ruleForm.status = "";
      this.ruleForm.createTimeStart = "";
      this.ruleForm.createTimeEnd = "";
      this.allOrderList();
    },
    chaxuninfo() {
      this.allOrderList();
    },
    handleSizeChange(val) {
      this.ruleForm.pageSize = val;
      this.allOrderList();
    },
    handleCurrentChange(val) {
      this.ruleForm.pageNum = val;
      this.allOrderList();
    }
  }
};
</script>
<style scoped>
.invoice {
  /* background-color: #f1f6fa; */
  background-color: #fff;
   min-width: 1600px;
  /* min-height: 647px;
  min-width: 1200px; */
}
.order-head,
.table {
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
  /* min-height: 200px; */
}
.order-head {
  /* margin-bottom: 3%; */
  height: 100px;
}
.box {
  margin: 0 20px;
}
.tab_1 {
  /* width: 97%; */
  margin: 0 auto;
  /* padding-top: 1%; */
}
.twobutton {
  padding-top: 1.5%;
}
.demo-form-inline {
  margin-top: 20px;
}
/* .table{
   border: 1px solid #ccc;
  box-shadow:-1px 1px 3px #ccc;
  border-radius: 4px;
  margin-right: 20px;
  margin-left: 0px;
} */
.button {
  height: 60px;
  text-align: right;
}
.cit {
  width: 30%;
}
.shop2 {
  margin: 0 4px;
}
.sotlname {
  width: 60%;
}
.sotlname2 {
  width: 60.5%;
}
.colright {
  text-align: right;
}
.colright2 {
  text-align: center;
}
.cit,
.TongYi,
.sotlname,
.sotlname2 {
  display: inline-block;
}
.invoice .el-range-editor.el-input__inner {
  width: 100%;
}

.Width {
  width: 75px;
}
.sotretype5 {
  display: inline-block;
  width: 85px;
}
.serchBoxContent {
  text-align: center;
}
.el-tabs__content {
  margin: 0;
  padding: 0;
}
</style>
