<template>
  <div class="couponManager">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
      <el-breadcrumb-item :to="{ path: '/operatIndex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>优惠券管理</el-breadcrumb-item>
    </el-breadcrumb>-->
    <div class="storeBox storeBox222">
      <div class="store_Box">
        <p class="store_tit">优惠券管理</p>
        <el-row style="white-space: nowrap;">
          <el-col :span="6">
            <span>活动名称：</span>
            <p>
              <el-input type="text" v-model="coupForm.name" placeholder="请输入"></el-input>
            </p>
          </el-col>
          <el-col :span="6" class="TongCenter">
            <span>状态：</span>
            <p>
              <el-select type="text" v-model="coupForm.status">
                <el-option
                  v-for="(item,index) in statusList"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  placeholder="请选择"
                ></el-option>
              </el-select>
            </p>
          </el-col>
          <el-col :span="6" class="TongCenter">
            <span>启动状态：</span>
            <p>
              <el-select type="text" v-model="coupForm.openStatus">
                <el-option
                  v-for="(item,index) in openStatuList"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  placeholder="请选择"
                ></el-option>
              </el-select>
            </p>
          </el-col>
          <el-col :span="6" class="TongRight">
            <el-button class="theBtn queryButton" @click="chaxunCoupon">查询</el-button>
            <el-button @click="resetCoupon" class="theBtn resetButton">重置</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="storeInfo">
      <div class="store_Box1">
        <div class="CouHide">
          <!-- <div class="addStore">
            <img src="@/assets/addBtn.png" @click="addCoup" />
          </div> -->
          <div class="addStore">
            <el-button class="increase themeColor" @click="addCoup">
              <i class="el-icon-plus"></i>新增
            </el-button>
          </div>
          <el-table :data="tableData" style="width: 100%;" border>
            <el-table-column label="活动名称" align="center">
              <template scope="scope">
                <span class="codesty" @click="detailsRow(scope.row.id)">{{scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column label="生效日期" align="center">
              <template scope="scope">
                <span
                  v-if="scope.row.takeEffectTime !=null"
                >{{scope.row.takeEffectTime | converTime('YYYY-MM-DD')}}</span>
              </template>
            </el-table-column>
            <el-table-column label="失效日期" align="center">
              <template scope="scope">
                <span
                  v-if="scope.row.loseEffectTime !=null"
                >{{scope.row.loseEffectTime | converTime('YYYY-MM-DD')}}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" align="center">
              <template scope="scope">{{scope.row.status | useStatusTip}}</template>
            </el-table-column>
            <el-table-column label="启用状态" align="center">
              <template scope="scope">{{scope.row.openStatus | openStatusTip}}</template>
            </el-table-column>
            <el-table-column label="更新时间" align="center">
              <template scope="scope">
                <span
                  v-if="scope.row.updateTime !=null"
                >{{scope.row.updateTime | converTime('YYYY-MM-DD HH:mm:ss')}}</span>
              </template>
            </el-table-column>
            <el-table-column label="数量" align="center">
              <template slot-scope="scope">{{scope.row.issuedNum}}/{{scope.row.num}}</template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template scope="scope">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="启用"
                  placement="bottom"
                  v-if="scope.row.openStatus=='N'"
                >
                  <img
                    src="@/assets/jinyong_icon.png"
                    @click="modifyship(scope.row.id)"
                    class="imgSize"
                  />
                </el-tooltip>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="禁用"
                  placement="bottom"
                  v-else-if="scope.row.openStatus=='Y'"
                >
                  <img
                    src="@/assets/qiyong_icon.png"
                    @click="modifyship(scope.row.id)"
                    class="imgSize"
                  />
                </el-tooltip>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="推券"
                  placement="bottom"
                  v-if="scope.row.status == '3'"
                >
                  <img src="@/assets/icon.png" class="imgSize" />
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="推券" placement="bottom" v-else>
                  <img
                    src="@/assets/coupon_icon.png"
                    @click="tuiShip(scope.row.id)"
                    class="imgSize"
                  />
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
  name: "couponManager",
  data() {
    return {
      statusList: [
        {
          value: "1",
          label: "待生效"
        },
        {
          value: "2",
          label: "生效中"
        },
        {
          value: "3",
          label: "已失效"
        }
      ],
      openStatuList: [
        {
          //开启状态
          value: "Y",
          label: "已启用"
        },
        {
          value: "N",
          label: "已禁用"
        }
      ],
      coupForm: {
        name: "",
        status: "",
        openStatus: "",
        token: sessionStorage.getItem("token")
      },
      tableData: [],
      dialogFormVisible: false,
      // 分页
      pageNum: 1,
      pageSize: 20,
      total: 0
    };
  },
  created() {
    this.getCouponInfo(this.pageNum, this.pageSize);
  },
  methods: {
    getCouponInfo(pageNum, pageSize) {
      this.$axios({
        url: window.apiUrl + "coupon/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          name: this.coupForm.name,
          status: this.coupForm.status,
          openStatus: this.coupForm.openStatus,
          token: this.coupForm.token,
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
    // 新增
    addCoup() {
      this.$router.push({ name: "addCoupon" });
    },
    //禁用(N、Y)、推券
    modifyship(id) {
      this.$axios({
        url: window.apiUrl + "coupon/modify",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: sessionStorage.getItem("token"),
          packageId: id
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.getCouponInfo();
        }
      });
    },
    tuiShip(id) {
      sessionStorage.setItem("packageId", id);
      this.$router.push({
        name: "pushCoupon",
        params: {
          packageId: id
        }
      });
    },
    // 详情
    detailsRow(id) {
      sessionStorage.setItem("packageId", id);
      this.$router.push({
        name: "detaiCo",
        params: {
          packageId: id
        }
      });
    },
    // 选择时间
    // Panchange (e) {
    //     this.ruleForm.createTimeStart=this.$moment(e[0]).format('YYYY-MM-DD');
    //     this.ruleForm.createTimeEnd=this.$moment(e[1]).format('YYYY-MM-DD');
    // },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getCouponInfo(this.pageNum, val);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getCouponInfo(val, this.pageSize);
    },
    chaxunCoupon() {
      this.getCouponInfo();
    },
    resetCoupon() {
      this.coupForm.name = "";
      this.coupForm.status = "";
      this.coupForm.openStatus = "";
      this.getCouponInfo();
    }
  },
  filters: {
    useStatusTip(value) {
      if (value == "1") {
        return "待生效";
      } else if (value == "2") {
        return "生效中";
      } else if (value == "3") {
        return "已失效";
      }
    },
    openStatusTip(value) {
      if (value == "Y") {
        return "已启用";
      } else if (value == "N") {
        return "已禁用";
      }
    },
    statusName(value) {
      if (value == "Y") {
        return "禁用";
      } else if (value == "N") {
        return "启用";
      }
    }
  }
};
</script>
<style scoped>
.couponManager {
  background-color: #fff;
  min-height: 647px;
  height: 100%;
  min-width: 1700px;
  box-shadow: 0px 2px 10px #ccc;
}
p {
  display: inline-block;
  width: 300px;
}
.couponManager .el-range-editor.el-input__inner {
  width: 100%;
}
.couponManager .el-select {
  width: 100%;
}
.storeBox222 {
  height: 150px;
}
/* .addStore button {
  margin-right: 20px;
} */
.store_Box1 {
  position: relative;
  overflow: hidden;
  height: 634px;
}
.CouHide {
  position: absolute;
  left: 0;
  top: 0;
  right: -17px;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
