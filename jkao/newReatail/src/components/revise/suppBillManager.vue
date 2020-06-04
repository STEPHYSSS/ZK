<template>
  <div class="billManagerment">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
            <el-breadcrumb-item :to="{ path: '/suppIndex' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item >退货单管理</el-breadcrumb-item>
    </el-breadcrumb>-->
    <div class="storeBox">
      <div class="store_Box">
        <p class="store_tit">退货单管理</p>
        <el-row style="white-space: nowrap;">
          <el-col :span="6">
            <span>退货日期：</span>
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
          </el-col>
          <el-col :span="6" class="TongCenter">
            <span>门店编号：</span>
            <p>
              <el-input type="text" v-model="ruleForm.storeCode" placeholder="请输入"></el-input>
            </p>
          </el-col>
          <el-col :span="6" class="TongCenter">
            <span>退货单编号：</span>
            <p>
              <el-input type="text" v-model="ruleForm.code" placeholder="请输入"></el-input>
            </p>
          </el-col>
          <el-col :span="6" class="TongRight">
            <span>门店名称：</span>
            <p>
              <el-input type="text" v-model="ruleForm.name" placeholder="请输入"></el-input>
            </p>
          </el-col>
        </el-row>
        <div class="konge"></div>
        <el-row>
          <el-col class="TongRight">
            <el-button class="theBtn queryButton" @click="chaxun">查询</el-button>
            <el-button class="theBtn resetButton" @click="suppreset">重置</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="storeInfo">
      <div class="store_Box1">
        <div class="scrollHide">
          <el-table :data="tableData" style="width: 100%;" border>
          <el-table-column label="退货单编号" align="center" class="codesty" width="220">
            <template scope="scope">
              <span class="codesty" @click="billdetai(scope.row.code)">{{scope.row.code}}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建日期" align="center">
            <template scope="scope">{{scope.row.createTime | converTime('YYYY-MM-DD')}}</template>
          </el-table-column>
          <el-table-column prop="name" label="门店" align="center"></el-table-column>
          <el-table-column prop="item" label="退货品项数" align="center"></el-table-column>
          <el-table-column prop="count" label="退货总数" align="center"></el-table-column>
          <el-table-column prop="amount" label="退货总金额" align="center"></el-table-column>
        </el-table>
        <div class="konge"></div>
        <div class="paginStyle">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="ruleForm.pageNum"
            :page-sizes="[20,40,60]"
            :page-size="ruleForm.pageSize"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            class="pagination"
          ></el-pagination>
        </div>
        <div class="konge"></div>
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
        storeCode: "",
        code: "",
        name: "",
        token: sessionStorage.getItem("token"),
        pageNum: 1,
      pageSize: 10,
      },
      tableData: [],
      total: 0
    };
  },
  created() {
    this.suppBillList();
    // this.suppBillList(this.pageNum);
  },
  methods: {
    suppBillList(pageNum) {
      let that = this;
      let token = sessionStorage.getItem("token");
      // if (token) {
        that
          .$axios({
            url: window.apiSuppli + "return/list",
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
      sessionStorage.setItem("suppcode", code); // 用户名
      // let codes = sessionStorage.getItem("stocode");
      this.$router.push({
        name: "GbDetail",
        params: {
          code: code
        }
      });
    },

    // 查询 重置
    chaxun() {
      this.suppBillList();
    },
    suppreset() {
      this.changeTime = ""; //创建日期
      this.ruleForm.storeCode = "";
      this.ruleForm.code = "";
      this.ruleForm.name = "";
      this.ruleForm.createTimeStart = "";
      this.ruleForm.createTimeEnd = "";
      this.suppBillList();
    },
    // 分页
    handleSizeChange(val) {
      this.ruleForm.pageSize = val;
      this.suppBillList();
    },
    handleCurrentChange(val) {
      this.ruleForm.pageNum = val;
      this.suppBillList();
    }
  }
};
</script>
<style scoped>
.billManagerment {
  background-color: #fff;
  min-height: 647px;
  min-width: 1700px;
  box-sizing: border-box;
  box-shadow: 0px 2px 10px #ccc;
}
.store_Box1{
    position: relative;
    overflow: hidden;
    height: 634px;
}
.scrollHide{
  position: absolute;
	left: 0;
	top: 0;
	right: -17px;
	bottom: 0;
	overflow-x: hidden;
  overflow-y: scroll;
  height: 100%;
}
p {
  display: inline-block;
  width: 300px;
}
.billManagerment .el-range-editor.el-input__inner {
  width: 100%;
}
</style>
