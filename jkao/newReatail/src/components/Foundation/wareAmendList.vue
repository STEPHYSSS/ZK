<template>
  <div class="wareAmend minimum minWidth1600">
    <div class="wareAmendBox">
      <h3>修正单管理</h3>
      <el-row class="rowSpacing">
        <el-col :span="6">
          <div>
            <span class="sotretype5">修正单类型：</span>
            <div class="TongYiInput">
              <el-select type="text" v-model="type" placeholder="请选择">
                <el-option
                  v-for="item in check1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="6" class="textAlignCenter">
          <div>
            <span class="sotretype5">修正单状态：</span>
            <div class="TongYiInput">
              <el-select type="text" v-model="status" placeholder="请选择">
                <el-option
                  v-for="item in check"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="6" class="textAlignCenter">
          <div>
            <span class="sotretype5">修正单编号：</span>
            <el-input
              class="input1"
              type="text"
              v-model="code"
              placeholder="请输入"
              oninput="value=value.replace(/[^\d]/g,'')"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="6" class="textAlignRight">
          <div>
            <span class="sotretype5">配送单编号：</span>
            <el-input
              class="input1"
              type="text"
              placeholder="请输入"
              v-model="deliveryCode"
              oninput="value=value.replace(/[^\d]/g,'')"
            ></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div>
            <span class="sotretype5">创建日期：</span>
            <el-date-picker
              class="input1"
              type="daterange"
              @change="changeWareTime"
              v-model="tiems"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-col>
        <el-col :span="6">
          <div></div>
        </el-col>
        <el-col :span="6">
          <div></div>
        </el-col>
        <el-col :span="6" class="colMleft50">
          <div>
            <div class="textAlignRight">
              <el-button class="theBtn queryButton" @click="chaxun">查询</el-button>
              <el-button class="theBtn resetButton" @click="reset">重置</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="wareAmendInfo">
      <el-table :data="tableData" style="width: 100%;" border max-height="600">
        <el-table-column prop="code" label="修正单编号" align="center"></el-table-column>
        <el-table-column prop="type" label="修正单类型" align="center">
          <template scope="scope">
            <span v-if="scope.row.type == 'rejection'">拒收修正</span>
            <span v-else>缺货修正</span>
          </template>
        </el-table-column>
        <el-table-column prop="count" label="修正数量" align="center"></el-table-column>
        <el-table-column prop="storeName" label="门店" align="center"></el-table-column>
        <el-table-column label="修正单状态" align="center">
          <template scope="scope">{{scope.row.status|amendTip}}</template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template scope="scope">
            <span>{{scope.row.createTime | converTime('YYYY-MM-DD')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="deliveryCode" label="配送单编号" align="center"></el-table-column>
        <el-table-column prop label="操作" align="center">
          <template scope="scope">
           
            <el-tooltip class="tips" effect="dark" content="审核" placement="bottom" v-if="scope.row.status==1">
              <img src="@/assets/present_icon_one.png" @click="examineWare(scope.row.code)"  alt />
            </el-tooltip>
             <el-tooltip class="item" effect="dark" content="查看" placement="bottom"  v-else>
              <img src="@/assets/chaxun_icon.png" @click="lookUpWare(scope.row.code)" class="codesty" alt />
            </el-tooltip>
            <!-- <span class="codesty" @click="examineWare(scope.row.code)" v-if="scope.row.status==1">审核</span>
            <span class="codesty" @click="lookUpWare(scope.row.code)" v-else>查看</span>-->
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
</template>
<script>
import qs from "qs";
export default {
  name: "wareAmend",
  data() {
    return {
      deliveryCode: "", //	配送单编号
      code: "", //	修正单编号
      type: "", //	修正单类型
      status: "", //修正单状态
      createTimeStart: "", //创建时间开始
      createTimeEnd: "", //创建时间结束
      tableData: [],
      check1: [
        {
          value: "rejection",
          label: "拒收修正"
        },
        {
          value: "shortage",
          label: "缺货修正"
        }
      ],
      check: [
        {
          value: "1",
          label: "待审核"
        },
        {
          value: "4",
          label: "审核通过"
        },
        {
          value: "2",
          label: "审核不通过"
        }
      ],
      tiems: [],
      pageNum: 1,
      pageSize: 20,
      total: 0
    };
  },
  created() {
    this.getWareList(this.pageNum, this.pageSize);
  },
  methods: {
    getWareList(pageNum, pageSize) {
      this.$axios({
        url: window.apiWare + "amendment/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: sessionStorage.getItem("token"),
          deliveryCode: this.deliveryCode,
          code: this.code,
          type: this.type,
          status: this.status,
          createTimeStart: this.createTimeStart,
          createTimeEnd: this.createTimeEnd,
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
    changeWareTime(e) {
      this.createTimeStart = this.$moment(e[0]).format("YYYY-MM-DD");
      this.createTimeEnd = this.$moment(e[1]).format("YYYY-MM-DD");
    },
    // 审核
    examineWare(code) {
      sessionStorage.setItem("WareInCode", code);
      this.$router.push({
        name: "wareAmendCheck",
        params: {
          amendmentCode: sessionStorage.getItem("WareInCode")
        }
      });
    },
    // 查看
    lookUpWare(code) {
      sessionStorage.setItem("WareInCode", code);
      this.$router.push({
        name: "wareAmendDetail",
        params: {
          amendmentCode: sessionStorage.getItem("WareInCode")
        }
      });
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getWareList(this.pageNum, val);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getWareList(val, this.pageSize);
    },
    // 重置 查询
    reset() {
      this.deliveryCode = "";
      this.code = "";
      this.type = "";
      this.status = "";
      this.createTimeStart = "";
      this.createTimeEnd = "";
      this.tiems = [];
      this.getWareList();
    },
    chaxun() {
      this.getWareList();
    }
  },
  filters: {
    amendTip(value) {
      if (value == "1") {
        return "待审核";
      } else if (value == "2") {
        return "审核不通过";
      } else if (value == "3") {
        return "已上传意见";
      } else if (value == "4") {
        return "审核通过";
      } else if (value == "5") {
        return "裁定通过";
      }
    }
  }
};
</script>
<style scoped>
.wareAmend {
  /* background-color: #f1f6fa; */
  min-height: 647px;
  min-width: 1200px;
}
.wareAmendBox {
  height: 200px;
  padding: 0 20px;
  box-sizing: border-box;
}
.wareAmend .wareAmend_Box {
  margin-left: 30px;
  margin-right: 30px;
  padding-bottom: 30px;
}
.wareAmend .nav {
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
.wareAmend .waretitle {
  padding-top: 20px;
  padding-bottom: 20px;
}
.spacelet {
  letter-spacing: 6px;
}
.wsListsearch {
  text-align: right;
  margin-bottom: 10px;
}
.wareAmendInfo .el-dialog {
  width: 500px;
}
.zanweiN {
  display: inline-block;
  width: 28px;
}
#delShop {
  background-color: #fff;
  border: 1px solid #01c8dc;
  color: #01c8dc;
  float: right;
  margin: 0;
  height: 30px;
  line-height: 10px;
  width: 90px;
  margin-left: 10px;
  text-align: right;
}
.posi {
  position: relative;
  display: inline-block;
}
.delicon {
  position: absolute;
  top: 7px;
  left: 27px;
  width: 17px;
}
h3 {
  padding: 20px 0 20px 0px;
}
</style>

