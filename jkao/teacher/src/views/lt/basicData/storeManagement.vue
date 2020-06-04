<template>
  <div class="inventoryM minWidth1600 minimum">
    <div class="billMa">
      <!-- <h3>盘点管理</h3> -->
      <div class="billMaList">
        <el-row style="white-space:nowrap">
          <el-col :span="6">
            <div>
              <span class="sotretype5">盘点单编号：</span>
              <el-input class="input1" type="text" v-model="ruleForm.code" placeholder="请输入"></el-input>
            </div>
          </el-col>
          <el-col :span="6" class="textAlignCenter">
            <div>
              <span class="textTitle70px">盘点日期：</span>
              <el-date-picker
                v-model="changeTime"
                type="daterange"
                style="width:70%;line-height: 35px;height: 35px;"
                @input="Panchange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </div>
          </el-col>
          <el-col :span="6" class="textAlignCenter">
            <div>
              <span class="textTitle70px">审核状态：</span>
              <p class="TongYiInput">
                <el-select type="text" v-model="ruleForm.status">
                  <el-option
                    v-for="(item,index) in Invertstatu"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    placeholder="请选择"
                  ></el-option>
                </el-select>
              </p>
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <div class="textAlignRight">
                <el-button class="theBtn queryButton" @click="chaxun">查询</el-button>
                <el-button @click="reset" class="theBtn resetButton">重置</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="inventinp pinName">
          <!-- <span>盘点单编号：</span>
          <p>
            <el-input type="text" v-model="ruleForm.code" placeholder="请输入"></el-input>
          </p>-->
        </div>
        <div class="inventinp huoNum">
          <!-- <span>盘点日期：</span>
          <p>
            <el-date-picker
              v-model="changeTime"
              type="daterange"
              @input="Panchange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </p>-->
        </div>
        <div class="inventinp barNum">
          <!-- <span>审核状态：</span>
          <p>
            <el-select type="text" v-model="ruleForm.status">
              <el-option
                v-for="(item,index) in Invertstatu"
                :key="index"
                :label="item.label"
                :value="item.value"
                placeholder="请选择"
              ></el-option>
            </el-select>
          </p>-->
        </div>
        <div class="zanpan"></div>
        <!-- <div class="billsearch">
          <el-button class="present-btn" @click="chaxun">查询</el-button>
          <el-button @click="reset" class="retunColol">重置</el-button>
        </div>-->
      </div>
    </div>
    <div class="billMa2">
      <div class="billMaList2">
        <!-- <div class="billsearch"> -->
        <!-- <router-link to="/inventoryadd">
            <img src="@/assets/newlyincreased.png" alt />
        </router-link>-->
        <div class="increaseBox">
          <!-- <div class="addBtnBox"> -->
            <div class="addStore">
              <el-button class="increase themeColor" @click="newIncrease">
                <i class="el-icon-plus"></i>新增
              </el-button>
            </div>
          <!-- </div> -->
        </div>
        <!-- </div> -->
        <el-table :data="tableData" style="width: 100%;" border>
          <el-table-column prop="code" label="盘点单编号" align="center" ></el-table-column>
          <el-table-column label="盘点日期" align="center">
            <template scope="scope">{{scope.row.inventoryTime | converTime('YYYY-MM-DD')}}</template>
          </el-table-column>
          <el-table-column label="更新时间" align="center">
            <template scope="scope">
              <span
                v-if="scope.row.updateTime !=null"
              >{{scope.row.updateTime | converTime('YYYY-MM-DD HH:mm:ss')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center">
            <template scope="scope">{{scope.row.status | statusTip}}</template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template scope="scope">
              <el-tooltip
                class="item"
                effect="dark"
                content="查看"
                v-if="scope.row.status=='2'"
                placement="bottom"
                
              >
                <img src="@/assets/images/chaxun_icon.png" @click="chakanP(scope.row.code)" class="codesty" alt />
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="编辑" placement="bottom" v-show="scope.row.status=='1'">
                <img src="@/assets/images/xiugai_icon.png" @click="editRow(scope.row.code)" class="codesty" alt />
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除" placement="bottom" v-show="scope.row.status=='1'">
                <img src="@/assets/images/shanchu_icon.png" @click="delPanRow(scope.row.code)" class="codesty" alt />
              </el-tooltip>
               <el-tooltip class="tips" effect="dark" content="验收" placement="bottom">
                                <img
                                    src="@/assets/images/present_icon_one.png"
                                    alt
                                     v-if="scope.row.status=='1'"
                                    @click="shenhe(scope.row.code)"
                                />
                            </el-tooltip>
              <!-- <p v-if="scope.row.status == '1'">
                <span class="codesty" @click="delPanRow(scope.row.code)">删除</span>
                <span class="codesty editrow" @click="editRow(scope.row.code)">编辑</span>
              </p>
              <span class="codesty" v-else @click="chakanP(scope.row.code)">查看</span>-->
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
  name: "inventoryM",
  data() {
    return {
      Invertstatu: [
        {
          value: "1",
          label: "待确认"
        },
        {
          value: "2",
          label: "已确认"
        }
      ],
      changeTime: [],
      ruleForm: {
        inventoryTimeStart: "", //创建时间开始
        inventoryTimeEnd: "", //创建时间结束
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
    this.inventoryList(this.pageNum, this.pageSize);
  },
  methods: {
    newIncrease() {
      this.$router.push({
        name: "inventoryadd"
      });
    },
    shenhe(code){
          this.$router.push({
        name: "operaInvenDetail",
        query:{
          code:code
        }
      });
    },
    inventoryList(pageNum, pageSize) {
      let that = this;
      that
        .$utils({
          url: this.reqApi.xinls + "/exam/inventory/list",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            inventoryTimeStart: this.ruleForm.inventoryTimeStart,
            inventoryTimeEnd: this.ruleForm.inventoryTimeEnd,
            status: this.ruleForm.status,
            code: this.ruleForm.code,
            token: this.ruleForm.token,
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            questionCode: sessionStorage.getItem("questionUUid"),
          })
        })
        .then(res => {
          if (res.data.code == "0000") {
            that.tableData = res.data.data;
            // that.total = res.data.data.total;
          }else {
            that.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log("数据异常", err);
        });
    },
    // 选择时间
    Panchange(e) {
      this.ruleForm.inventoryTimeStart = this.$moment(e[0]).format("YYYY-MM-DD");
      this.ruleForm.inventoryTimeEnd = this.$moment(e[1]).format("YYYY-MM-DD");
    },
    // 查看
    chakanP(code) {
      sessionStorage.setItem("Pcode", code);
      this.$router.push({
        name: "inventorydetail",
        query: {
          code: code
        }
      });
    },
    // 编辑
    editRow(code) {
      sessionStorage.setItem("Pcode", code);
      this.$router.push({
        name: "inventoryedit",
        query: {
          code: code
        }
      });
    },
    // inventoryadd
    // 删除
    delPanRow(code) {
      this.$utils({
        url: this.reqApi.xinls + "/exam/inventory/delete",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          code: code,
          questionCode: sessionStorage.getItem("questionUUid"),
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.inventoryList();
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
    // 查询 重置
    chaxun() {
      this.inventoryList();
    },
    reset() {
      this.changeTime = []; //创建日期
      this.ruleForm.status = "";
      this.ruleForm.code = "";
      this.ruleForm.inventoryTimeStart = "";
      this.ruleForm.inventoryTimeEnd = "";
      this.inventoryList();
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.inventoryList(this.pageNum, val);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.inventoryList(val, this.pageSize);
    }
  },
  filters: {
    statusTip(value) {
      if (value == "1") {
        return "待确认";
      } else if (value == "2") {
        return "已确认";
      }
    }
  }
};
</script>
<style scoped>
.inventoryM {
  /* background-color: #f1f6fa; */
  min-height: 647px;
  min-width: 1200px;
}
.billMa {
  height: 70px;
}
.billMa,
.billMa2 {
  background: #fff;
}
h3 {
  padding: 20px 0 8px 20px;
}
.billMaList {
  margin: 0 20px;
}
.billMaList2 {
  box-sizing: border-box;
  /* padding: 15px 30px 50px 35px; */
  padding-bottom: 50px;
}
.pagination {
  float: right;
  margin-top: 30px;
  margin-bottom: 30px;
}
.inventinp,
.inventinp p {
  display: inline-block;
}
.inventoryM .billMaList .huoNum {
  width: 40%;
  text-align: center;
}
.inventoryM .billMaList .huoNum p {
  width: 52%;
}
.billMaList .barNum {
  width: 30%;
  text-align: right;
}
.billMaList .pinName {
  width: 30%;
}
.billMaList .el-range-editor.el-input__inner {
  width: 100%;
}
.createDay {
  letter-spacing: 2.8px;
}
p {
  display: inline-block;
  width: 60%;
}
.btnfloat {
  float: right;
  margin-right: 8px;
}
.zanpan {
  height: 20px;
}
.editrow {
  display: inline-block;
  margin-left: 20px;
}
.addStore {
    text-align: right;
    margin-bottom: 20px;
}
</style>
