<template>
  <div class="reviseManage">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
            <el-breadcrumb-item :to="{ path: '/suppIndex' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item >修正单管理</el-breadcrumb-item>
    </el-breadcrumb>-->
    <div class="storeBox">
      <div class="store_Box">
        <p class="store_tit">修正单管理</p>
        <el-row style="white-space: nowrap;">
          <el-col :span="6">
            <span>修正单类型：</span>
            <p>
              <el-select type="text" v-model="peisong.type" placeholder="请选择">
                <el-option
                  v-for="item in check1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </p>
          </el-col>
          <el-col :span="6" class="TongCenter">
            <span>修正单状态：</span>
            <p>
              <el-select type="text" v-model="peisong.status" placeholder="请选择">
                <el-option
                  v-for="item in check"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </p>
          </el-col>
          <el-col :span="6" class="TongCenter">
            <span>修正单编号：</span>
            <p>
              <el-input
                type="text"
                v-model="peisong.code"
                placeholder="请输入"
                oninput="value=value.replace(/[^\d]/g,'')"
              ></el-input>
            </p>
          </el-col>
          <el-col :span="6" class="TongRight">
            <span>配送单编号：</span>
            <p>
              <el-input
                type="text"
                v-model="peisong.deliveryCode"
                placeholder="请输入"
                oninput="value=value.replace(/[^\d]/g,'')"
              ></el-input>
            </p>
          </el-col>
        </el-row>
        <div class="konge"></div>
        <el-row>
          <el-col :span="6">
            <span class="lett">创建日期：</span>
            <p>
              <el-date-picker
                @change="change"
                v-model="tiems"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </p>
          </el-col>
          <el-col :span="18" class="TongRight">
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
            <el-table-column prop="code" label="修正单编号" align="center" width="235"></el-table-column>
            <el-table-column prop="type" label="修正单类型" align="center">
              <template scope="scope">
                <span v-if="scope.row.type == 'rejection'">拒收修正</span>
                <span v-else>缺货修正</span>
              </template>
            </el-table-column>
            <el-table-column prop="count" label="修正数量" align="center"></el-table-column>
            <el-table-column prop="storeName" label="门店" align="center" width="150"></el-table-column>
            <el-table-column label="修正单状态" align="center">
              <template scope="scope">{{scope.row.status|amendTip}}</template>
            </el-table-column>
            <el-table-column label="创建日期" align="center">
              <template scope="scope">
                <span>{{scope.row.createTime | converTime('YYYY-MM-DD')}}</span>
              </template>
            </el-table-column>
            <el-table-column label="配送单编号" align="center" prop="deliveryCode" width="220"></el-table-column>
            <el-table-column label="操作" align="center" fixed="right">
              <template scope="scope">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="审核"
                  placement="bottom"
                  v-if="scope.row.status==1"
                >
                  <div class="iconWit" @click="examine(scope.row.code)">
                    <img src="@/assets/present_icon_one.png" class="imgSize" />
                  </div>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="查看" placement="bottom" v-else>
                  <div class="iconWit" @click="check2(scope.row)">
                    <img src="@/assets/chaxun_icon.png" class="imgSize" />
                  </div>
                </el-tooltip>
                <!-- <span class="codesty" @click="examine(scope.row.code)" v-if="scope.row.status==1">审核</span>
                <span class="codesty" @click="check2(scope.row.code)" v-else>查看</span>-->
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
      peisong: {
        token: "",
        deliveryCode: "", //	配送单编号
        code: "", //	修正单编号
        type: "", //	修正单类型
        status: "", //修正单状态
        createTimeStart: "", //创建时间开始
        createTimeEnd: "" //创建时间结束
      },
      tiems: [],
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
      tableData: [],
      pageNum: 1,
      pageSize: 20,
      total: 0
    };
  },
  created() {
    this.getgoodsList(this.pageNum, this.pageSize);
  },
  methods: {
    getgoodsList(pageNum, pageSize) {
      let that = this;
      let token = sessionStorage.getItem("token");
      that.peisong.token = token;
      that
        .$axios({
          url: window.apiSuppli + "amendment/list",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            token: token,
            pageNum: that.pageNum,
            pageSize: that.pageSize,
            deliveryCode: that.peisong.deliveryCode,
            code: that.peisong.code,
            type: that.peisong.type,
            status: that.peisong.status,
            createTimeStart: that.peisong.createTimeStart,
            createTimeEnd: that.peisong.createTimeEnd
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
        });
    },
    // 跳转到配送单详情
    // Revisedetail(deliveryCode){
    //     let token = this.peisong.token;
    //     sessionStorage.setItem('deliveryCodeAb',deliveryCode)
    //     this.$router.push({
    //         name: 'reDetail',
    //         params: {
    //             deliveryCode : sessionStorage.getItem('deliveryCodeAb'),
    //             token:token
    //         }
    //     })
    // },
    // 审核
    examine(code) {
      let token = this.peisong.token;
      sessionStorage.setItem("amedCode", code);
      this.$router.push({
        name: "examine",
        params: {
          amendmentCode: sessionStorage.getItem("amedCode"),
          token: token
        }
      });
    },
    // 查看
    check2(code) {
      sessionStorage.setItem("amedCode", code.code);
      sessionStorage.setItem("shenheStaus",code.status)
      let token = this.peisong.token;
      this.$router.push({
        name: "check",
        params: {
          amendmentCode: sessionStorage.getItem("amedCode"),
          token: token,
          shenPass:sessionStorage.getItem("shenheStaus")
        }
      });
    },
    change(e) {
      this.peisong.createTimeStart = this.$moment(e[0]).format("YYYY-MM-DD");
      this.peisong.createTimeEnd = this.$moment(e[1]).format("YYYY-MM-DD");
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getgoodsList(this.pageNum, val);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getgoodsList(val, this.pageSize);
    },
    // 重置 查询
    reset() {
      this.peisong.deliveryCode = "";
      this.peisong.code = "";
      this.peisong.type = "";
      this.peisong.status = "";
      this.peisong.createTimeStart = "";
      this.peisong.createTimeEnd = "";
      this.tiems = [];
      this.getgoodsList();
    },
    chaxun() {
      this.getgoodsList();
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
.reviseManage {
  background-color: #fff;
  min-height: 647px;
  min-width: 1700px;
  box-shadow: 0px 2px 10px #ccc;
}
.store_Box1 {
  position: relative;
  overflow: hidden;
  height: 634px;
}
.scollHide {
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
.lett {
  letter-spacing: 2.3px;
}
</style>
