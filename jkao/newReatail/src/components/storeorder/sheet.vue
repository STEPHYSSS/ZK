<template>
  <div class="queryqq">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
      <el-breadcrumb-item :to="{ path: '/operatIndex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>门店单据管理</el-breadcrumb-item>
      <el-breadcrumb-item>修正单管理</el-breadcrumb-item>
    </el-breadcrumb>-->
    <div class="dingdanRece">
      <div class="dingdanflexBox">
        <!-- 查询框部分 -->
        <p class="store_tit">修正单管理</p>
        <el-row style="white-space: nowrap;">
          <el-col :span="6">
            <span>修正单类型：</span>
            <p>
              <el-select v-model="form.type" placeholder="请选择">
                <el-option label="拒收修正" value="rejection"></el-option>
                <el-option label="缺货修正" value="shortage"></el-option>
              </el-select>
            </p>
          </el-col>
          <el-col :span="6" class="TongCenter">
            <span>修正单状态：</span>
            <p>
              <el-select v-model="form.status" placeholder="请选择">
                <el-option label="待审核" value="1"></el-option>
                <el-option label="审核不通过" value="2"></el-option>
                <el-option label="已上传意见" value="3"></el-option>
                <el-option label="审核通过" value="4"></el-option>
                <el-option label="裁定通过" value="5"></el-option>
              </el-select>
            </p>
          </el-col>
          <el-col :span="6" class="TongCenter">
            <span>创建日期：</span>
            <p>
              <el-date-picker
                v-model="creatTim"
                @change="change"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </p>
          </el-col>
          <el-col :span="6" class="TongRight">
            <span>修正单编号：</span>
            <p>
              <el-input type="text" placeholder="请输入" v-model="form.code" />
            </p>
          </el-col>
        </el-row>
        <div class="konge"></div>
        <el-row>
          <el-col :span="6">
            <span class="lett">门店名称：</span>
            <p>
              <el-input type="text" placeholder="请输入" v-model="form.storeNameLike" />
            </p>
          </el-col>
          <el-col :span="6" class="TongCenter">
            <span class="sotretype">配送方：</span>
            <p>
              <el-input type="text" placeholder="请输入" v-model="form.supplierNameLike" />
            </p>
          </el-col>
          <el-col :span="12" class="TongRight">
            <el-button @click="submitForm" class="theBtn queryButton">查询</el-button>
            <el-button @click="resetForm" class="theBtn resetButton">重置</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="dingdanMain">
        <div class="hideQueryScoll">
          <el-table :data="tableData" border>
            <el-table-column label="修正单编号" prop="code" align="center" width="250"></el-table-column>
            <el-table-column label="修正单类型" align="center">
              <template scope="scope">{{scope.row.type | typeTip}}</template>
            </el-table-column>
            <el-table-column prop="count" label="修正数量" align="center"></el-table-column>
            <el-table-column prop="storeName" label="收货门店" align="center"></el-table-column>
            <el-table-column label="修正单状态" align="center">
              <template scope="scope">{{scope.row.status | sheetTip}}</template>
            </el-table-column>
            <el-table-column
              align="center"
              label="创建日期"
            >{{this.tableData.createTime|fmtDate2('YYYY-MM-DD')}}</el-table-column>
            <el-table-column prop="supplierName" label="配送方" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template scope="scope">
                <el-tooltip
                  class="item codesty"
                  effect="dark"
                  content="审核"
                  placement="bottom"
                  v-if="scope.row.status == 3"
                >
                  <img
                    src="@/assets/present_icon_one.png"
                    @click="xiuCheck(scope.row.code)"
                    class="imgSize"
                  />
                </el-tooltip>
                <el-tooltip
                  class="item codesty"
                  effect="dark"
                  content="查看"
                  placement="bottom"
                  v-else
                >
                  <img
                    src="@/assets/chaxun_icon.png"
                    @click="xiuDetial(scope.row.code,scope.row.type)"
                    class="imgSize"
                  />
                </el-tooltip>
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
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              class="pagination"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      value6: "",
      tableData: [],
      form: {
        token: sessionStorage.getItem("token"),
        status: "",
        type: "",
        code: "",
        supplierNameLike: "",
        storeNameLike: "",
        createTimeStart: "",
        createTimeEnd: ""
      },
      creatTim: [],
      pageNum: 1,
      pageSize: 20,
      total: 0
    };
  },
  created() {
    this.getList(this.pageNum, this.pageSize);
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList(this.pageNum, this.pageSize);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getList(this.pageNum, this.pageSize);
    },
    change(e) {
      this.form.createTimeStart = this.$moment(e[0]).format("YYYY-MM-DD");
      this.form.createTimeEnd = this.$moment(e[1]).format("YYYY-MM-DD");
    },
    getList(pageNum, pageSize) {
      this.$axios
        .post(
          "/sys/amendment/list",
          qs.stringify({
            status: this.form.status,
            type: this.form.type,
            code: this.form.code,
            supplierNameLike: this.form.supplierNameLike,
            storeNameLike: this.form.storeNameLike,
            createTimeStart: this.form.createTimeStart,
            createTimeEnd: this.form.createTimeEnd,
            token: this.form.token,
            pageNum: this.pageNum,
            pageSize: this.pageSize
          })
        )
        .then(res => {
          if (res.data.code == "0000") {
            this.tableData = res.data.data.list;
            this.total = res.data.data.total;
          } else if (res.data.code === "6666") {
            this.$message({
              showClose: true,
              message: "token异常，请重新登录",
              type: "error"
            });
          }else return this.$message.error(res.data.msg)
        });
    },
    submitForm() {
      this.getList();
    },
    resetForm() {
      this.form.status = "";
      this.form.type = "";
      this.form.code = "";
      this.form.supplierNameLike = "";
      this.form.storeNameLike = "";
      this.form.createTimeStart = "";
      this.form.createTimeEnd = "";
      this.creatTim = [];
      this.getList();
    },
    // 查看
    xiuDetial(code, type) {
      sessionStorage.setItem("xiuCode", code);
      sessionStorage.setItem("xiustatus", type);
      this.$router.push({
        name: "Cgrefuse",
        params: {
          code: code,
          status: type
        }
      });
    },
    // 审核
    xiuCheck(code) {
      sessionStorage.setItem("xiuCheckCode", code);
      this.$router.push({
        name: "xiuCheck",
        params: {
          code: code
        }
      });
    }
  },
  filters: {
    sheetTip(value) {
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
    },
    typeTip(value) {
      if (value == "rejection") {
        return "拒收修正";
      } else if (value == "shortage") {
        return "缺货修正";
      }
    }
  }
};
</script>
<style scoped>
.queryqq {
  background-color: #fff;
  min-height: 647px;
  min-width: 1700px;
  height: 100%;
  box-sizing: border-box;
  box-shadow: 0px 2px 10px #ccc;
}
.queryqq .dingdanRece {
  font-size: 12px;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.queryqq .dingdanflexBox {
  height: 200px;
  margin: 0 20px;
  box-sizing: border-box;
}
.queryqq .dingdanMain {
  flex: 1;
  -webkit-box-flex: 1;
  position: relative;
  overflow: hidden;
  height: 100%;
}
.hideQueryScoll{
  position: absolute;
	left: 0;
	top: 0;
	right: -17px;
	bottom: 0;
	overflow-x: hidden;
	overflow-y: scroll;
}
.queryqq .el-range-editor.el-input__inner {
  width: 100%;
}
p {
  display: inline-block;
  width: 300px;
}
.el-select {
  width: 100%;
}

.lett {
  letter-spacing: 2.4px;
}
.sotretype {
  letter-spacing: 5.6px;
}
</style>
