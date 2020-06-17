<template>
  <div class="reviseManage">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
            <el-breadcrumb-item :to="{ path: '/suppIndex' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item >订单管理</el-breadcrumb-item>
            <el-breadcrumb-item >配送单管理</el-breadcrumb-item>
    </el-breadcrumb>-->
    <div class="storeBox">
      <div class="store_Box">
        <p class="store_tit">配送单管理</p>
        <el-row style="white-space: nowrap;">
          <el-col :span="6">
            <span>配送单编号：</span>
            <p>
              <el-input type="text" placeholder="请输入" v-model="peiso.code"></el-input>
            </p>
          </el-col>
          <el-col :span="6" class="TongCenter">
            <span>门店：</span>
            <p>
              <el-input type="text" placeholder="请输入" v-model="peiso.storeNameLike"></el-input>
            </p>
          </el-col>
          <el-col :span="6" class="TongCenter">
            <span>创建日期：</span>
            <p>
              <el-date-picker
                v-model="tiems"
                @change="change"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </p>
          </el-col>
          <el-col :span="6" class="TongRight">
            <span>验收状态：</span>
            <p>
              <el-select placeholder="请选择" v-model="value">
                <el-option
                  v-for="(item,index) in check"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </p>
          </el-col>
        </el-row>
        <div class="konge"></div>
        <el-row>
          <el-col class="TongRight">
            <el-button class="theBtn queryButton" @click="chaxun">查询</el-button>
            <el-button class="theBtn resetButton" @click="reset">重置</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="storeInfo">
      <div class="store_Box1">
        <div class="scollHide">
          <el-table :data="tableData" style="width: 100%;">
          <el-table-column label="创建日期" align="center">
            <template scope="scope">
              <span>{{scope.row.createTime | converTime('YYYY-MM-DD')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="配送单编号" align="center" width="220">
            <template scope="scope">
              <span class="codesty" @click="Revisedetail(scope.row.code)">{{scope.row.code}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="supplierName" label="配送方" align="center"></el-table-column>
          <el-table-column prop="checkStatus" label="验收状态" align="center">
            <template scope="scope">{{scope.row.checkStatus|revisTip}}</template>
          </el-table-column>
          <el-table-column prop="storeName" label="门店" align="center"></el-table-column>
          <el-table-column label="验收日期" align="center">
            <template scope="scope">
              <span
                v-if="scope.row.receivingTime!=null"
              >{{scope.row.receivingTime | converTime('YYYY-MM-DD')}}</span>
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
  name: "reviseManage",
  data() {
    return {
      peiso: {
        token: "",
        code: "",
        // checkStatus:'',//验收
        storeNameLike: "", //门店名称
        createTimeStart: "", //创建开始时间
        createTimeEnd: "" //结束时间
      },
      tiems: [],
      value: "",
      check: [
        {
          value: "1",
          label: "待验收"
        },
        {
          value: "2",
          label: "已验收"
        }
      ],
      tableData: [],
      daily: "",
      pageNum: 1,
      pageSize: 20,
      total: 0
    };
  },
  created() {
    this.getRevise(this.pageNum, this.pageSize);
  },
  methods: {
    change(e) {
      this.peiso.createTimeStart = this.$moment(e[0]).format("YYYY-MM-DD");
      this.peiso.createTimeEnd = this.$moment(e[1]).format("YYYY-MM-DD");
    },
    getRevise(pageNum, pageSize) {
      let that = this;
      let token = sessionStorage.getItem("token");
      that.peiso.token = token;
      that
        .$axios({
          url: window.apiSuppli + "delivery/list",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            token: token,
            pageNum: that.pageNum,
            pageSize: that.pageSize,
            code: that.peiso.code,
            checkStatus: that.value,
            storeNameLike: that.peiso.storeNameLike,
            createTimeStart: that.peiso.createTimeStart,
            createTimeEnd: that.peiso.createTimeEnd
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
    },
    // 跳转详情
    Revisedetail(code) {
      sessionStorage.setItem("deliveryCodeAb", code);
      this.$router.push({
        name: "reDetail",
        params: {
          deliveryCode: code
        }
      });
    },
    // 查询
    chaxun() {
      this.getRevise();
    },
    reset() {
      this.peiso.storeNameLike = "";
      this.peiso.code = "";
      this.peiso.createTimeStart = "";
      this.peiso.createTimeEnd = "";
      this.value = "";
      this.tiems = [];
      this.getRevise();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getRevise(this.pageNum, val);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getRevise(val, this.pageSize);
    }
  },
  filters: {
    revisTip(value) {
      // 验收状态
      if (value == "1") {
        return "待验收";
      } else if (value == "2") {
        return "已验收";
      }
    }
  }
};
</script>
<style scoped>
.reviseManage {
  background-color: #f1f6fa;
  min-width: 1700px;
  min-height: 647px;
  height: 100%;
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
.reviseManage .el-range-editor.el-input__inner {
  width: 100%;
}
.reviseManage .el-select {
  width: 100%;
}
.paginStyle {
    height: 50px;
    text-align: right;
}
</style>
