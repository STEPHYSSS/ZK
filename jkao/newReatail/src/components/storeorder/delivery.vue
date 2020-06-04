<template>
  <div class="deliery">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
      <el-breadcrumb-item :to="{ path: '/operatIndex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>门店单据管理</el-breadcrumb-item>
      <el-breadcrumb-item>叫货单管理</el-breadcrumb-item>
    </el-breadcrumb>-->
    <div class="dingdanRece">
      <div class="dingdanflexBox">
        <!-- 查询框部分 -->
        <p class="store_tit">叫货单管理</p>
        <el-row style="white-space: nowrap;">
          <el-col :span="6">
            <span>叫货日期：</span>
            <p>
              <el-date-picker
                v-model="changeTi"
                @input="changeTime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </p>
          </el-col>
          <el-col :span="6" class="TongCenter">
            <span>叫货状态：</span>
            <p>
              <el-select v-model="form.status" placeholder="请选择">
                <el-option label="备货中" value="1"></el-option>
                <el-option label="待验收" value="2"></el-option>
                <el-option label="部分验收" value="3"></el-option>
                <el-option label="全部验收" value="4"></el-option>
              </el-select>
            </p>
          </el-col>
          <el-col :span="6" class="TongCenter">
            <span>叫货单编号：</span>
            <p>
              <el-input v-model="form.code" placeholder="请输入"></el-input>
            </p>
          </el-col>
          <el-col :span="6" class="TongRight">
            <span>门店编号：</span>
            <p class="sotlname">
              <el-input type="text" placeholder="请输入" v-model="form.storeCode" />
            </p>
          </el-col>
        </el-row>
        <div class="konge"></div>
        <el-row style="white-space: nowrap;">
          <el-col :span="6">
            <span>门店名称：</span>
            <p>
              <el-input type="text" placeholder="请输入" v-model="form.storeNameLike" />
            </p>
          </el-col>
          <el-col :span="18" class="TongRight">
            <el-button @click="submitForm" class="theBtn queryButton">查询</el-button>
            <el-button @click="resetForm" class="theBtn resetButton">重置</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="dingdanMain">
        <el-table :data="tableData" style="width: 100%" border height="100%">
          <el-table-column align="center" label="创建日期" prop="createTime">
            <template scope="scope">{{scope.row.createTime | fmtDate2('YYYY-MM-DD')}}</template>
          </el-table-column>
          <el-table-column align="center" prop="code" label="叫货单编号" width="250">
            <template scope="scope">
              <span class="codesty" @click="getparams(scope.row.code)">{{scope.row.code}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="storeCode" label="门店编号"></el-table-column>
          <el-table-column align="center" prop="storeName" label="门店名称"></el-table-column>
          <el-table-column align="center" prop="item" label="订购品项数"></el-table-column>
          <el-table-column align="center" prop="count" label="订购总数"></el-table-column>
          <el-table-column align="center" prop="amount" label="订购总金额"></el-table-column>
          <el-table-column align="center" label="叫货状态">
            <template scope="scope">
              <span v-if="scope.row.status==1">备货中</span>
              <span v-if="scope.row.status==2">待验收</span>
              <span v-if="scope.row.status==3">部分验收</span>
              <span v-if="scope.row.status==4">全部验收</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="paginStyle fenyedignwei">
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

<script >
import qs from "qs";
export default {
  data() {
    return {
      tableData: [],
      changeTi: [],
      form: {
        createTimeStart: "",
        createTimeEnd: "",
        status: "",
        code: "",
        storeNameLike: "",
        storeCode: "",
        token: sessionStorage.getItem("token")
      },
      pageNum: 1,
      pageSize: 20,
      total: 0
    };
  },
  created() {
    this.getlist(this.pageNum, this.pageSize);
  },
  methods: {
    resetForm() {
      this.form.createTimeStart = "";
      this.form.createTimeEnd = "";
      this.form.status = "";
      this.form.code = "";
      this.form.storeNameLike = "";
      this.form.storeCode = "";
      this.changeTi = [];
      this.getlist();
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getlist(this.pageNum, val);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getlist(val, this.pageSize);
    },
    submitForm() {
      this.getlist();
    },
    changeTime(e) {
      this.form.createTimeStart = this.$moment(e[0]).format("YYYY-MM-DD");
      this.form.createTimeEnd = this.$moment(e[1]).format("YYYY-MM-DD");
    },
    getparams(code) {
      sessionStorage.setItem("jiaoCode", code);
      this.$router.push({
        name: "querystore",
        params: {
          code: code
        }
      });
    },
    getlist() {
      this.$axios({
        url:window.apiUrl + "ordering/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data:qs.stringify({
            createTimeStart: this.form.createTimeStart,
            createTimeEnd: this.form.createTimeEnd,
            status: this.form.status,
            code: this.form.code,
            storeNameLike: this.form.storeNameLike,
            storeCode: this.form.storeCode,
            token: this.form.token,
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
          } else {
            this.$message.error(res.data.msg);
          }
        });
    }
  }
};
</script>

<style scoped>
.deliery {
  background-color: #fff;
  min-height: 647px;
  min-width: 1700px;
  height: 100%;
  box-sizing: border-box;
  box-shadow: 0px 2px 10px #ccc;
}
.deliery .dingdanRece {
  font-size: 12px;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.deliery .dingdanflexBox {
  height: 200px;
  margin: 0 20px;
  box-sizing: border-box;
}
.deliery .dingdanMain {
  flex: 1;
  -webkit-box-flex: 1;
  position: relative;
  max-height: 600px;
  margin-bottom: 50px;
}
.fenyedignwei {
  position: absolute;
  bottom: -50px;
  right: 0;
}
p {
  display: inline-block;
  width: 300px;
}
.deliery .el-range-editor.el-input__inner {
  width: 100%;
}
.deliery .el-select{
  width: 100%;
}
</style>
