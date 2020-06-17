<template>
  <div class="operaPurWareIn">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
      <el-breadcrumb-item :to="{ path: '/operatIndex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>仓库管理</el-breadcrumb-item>
      <el-breadcrumb-item>其他入库</el-breadcrumb-item>
    </el-breadcrumb> -->
    <div class="storeBox storeBox222">
      <div class="store_Box">
        <p class="store_tit">其他入库</p>
        <el-row style="white-space: nowrap;">
          <el-col :span="6">
            <span>创建日期：</span>
            <p>
              <el-date-picker
                v-model="createTime"
                @change="changeCreatT"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </p>
          </el-col>
          <el-col :span="6" class="TongCenter">
            <span>单据状态：</span>
            <p>
              <el-select placeholder="请选择" v-model="status">
                <el-option label="待审核" value="W"></el-option>
                <el-option label="审核通过" value="S"></el-option>
                <el-option label="审核不通过" value="F"></el-option>
              </el-select>
            </p>
          </el-col>
          <el-col :span="6" class="TongCenter">
            <span>单据编号：</span>
            <p>
              <el-input type="text" placeholder="请输入" v-model="code"></el-input>
            </p>
          </el-col>
          <el-col :span="6" class="TongRight">
            <el-button class="theBtn queryButton" @click="chaxun">查询</el-button>
            <el-button @click="reseting" class="theBtn resetButton">重置</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="storeInfo">
      <div class="store_Box1">
        <el-table :data="tableData" style="width: 100%;">
          <el-table-column prop="code" label="单据编号" align="center" width="250"></el-table-column>
          <el-table-column label="创建时间" align="center">
            <template scope="scope">
              <span
                v-if="scope.row.createTime !=null"
              >{{scope.row.createTime | converTime('YYYY-MM-DD')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="单据状态" align="center">
            <template scope="scope">{{scope.row.status | statusTip}}</template>
          </el-table-column>
          <el-table-column prop="item" label="入库品项数" align="center"></el-table-column>
          <el-table-column prop="count" label="入库总数" align="center"></el-table-column>
          <el-table-column prop="createName" label="创建人" align="center"></el-table-column>
          <el-table-column label="操作" align="center" fiexd="right">
            <template scope="scope">
              <!-- <span
                v-if="scope.row.status == 'W'"
                class="codesty"
                @click="auditing(scope.row.code)"
              >审核</span>
              <span class="codesty" v-else @click="auditing(scope.row.code)">查看</span> -->
              <el-tooltip class="item" effect="dark" content="审核" placement="bottom" v-if="scope.row.status == 'W'">
                <div @click="auditing(scope.row.code)">
                  <img src="@/assets/present_icon_one.png" class="imgSize" />
                </div>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="查看" placement="bottom" v-else>
                <div @click="auditing(scope.row.code)">
                  <img src="@/assets/chaxun_icon.png" class="imgSize" />
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <div class="konge"></div>
        <div class="paginStyle">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[20,40,60]"
            :page-size="pageSize"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            class="pagination"
          ></el-pagination>
        </div>
        <div class="konge"></div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "operaPurWareIn",
  data() {
    return {
      createTime: [],
      code: "",
      createTimeStart: "",
      createTimeEnd: "",
      status: "",
      tableData: [],
      pageNum: 1,
      pageSize: 20,
      total: 0
    };
  },
  created() {
    this.getOurWare(this.pageNum, this.pageSize);
  },
  methods: {
    changeCreatT(e) {
      this.createTimeStart = this.$moment(e[0]).format("YYYY-MM-DD");
      this.createTimeEnd = this.$moment(e[1]).format("YYYY-MM-DD");
    },
    getOurWare(pageNum, pageSize) {
      this.$axios({
        url: window.apiUrl + "warehouse/other/in/list",
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
    // 查询 重置
    chaxun() {
      this.getOurWare();
    },
    reseting() {
      this.code = "";
      this.status = "";
      this.createTimeStart = "";
      this.createTimeEnd = "";
      this.createTime = [];
      this.getOurWare();
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getOurWare(this.pageNum, val);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getOurWare(val, this.pageSize);
    },
    // 查看审核
    auditing(code) {
      sessionStorage.setItem("purWareAudit", code);
      this.$router.push({
        name: "OtherInWareCheck",
        params: {
          code: code
        }
      });
    }
  },
  filters: {
    statusTip(value) {
      if (value == "F") {
        return "审核不通过";
      } else if (value == "W") {
        return "待审核";
      } else if (value == "S") {
        return "审核通过";
      }
    }
  }
};
</script>
<style scoped>
.operaPurWareIn {
  background-color: #fff;
  height: 100%;
  min-height: 647px;
  min-width: 1700px;
  box-shadow: 0px 2px 10px #ccc;
}
p {
  display: inline-block;
  width: 300px;
}
.operaPurWareIn .el-range-editor.el-input__inner {
  width: 100%;
}
.operaPurWareIn .el-select {
  width: 100%;
}
.storeBox222 {
  height: 150px;
}
.paginStyle {
    height: 50px;
    text-align: right;
}
</style>
