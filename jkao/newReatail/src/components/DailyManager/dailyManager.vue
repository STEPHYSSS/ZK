<template>
  <div class="dailyDetail minWidth1600">
    <div class="detail_box">
      <div class="topHeight">
        <h3>日结明细</h3>
        <el-row class="margin">
          <el-col :span="6">
            <div>
              <span class="textTitle70px">营业日期:</span>
              <el-date-picker
                class="input1"
                v-model="daily"
                @change="changeTime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </div>
          </el-col>
          <el-col :span="6" class="colMleft50">
            <div>
              <div class="textAlignRight">
                <el-button class="theBtn queryButton" @click="chaxun">查询</el-button>
                <el-button @click="reset" class="theBtn resetButton">重置</el-button>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div></div>
          </el-col>
          <el-col :span="6">
            <div></div>
          </el-col>
        </el-row>
      </div>

      <el-tabs class="detai_mar">
        <el-table :data="tableData" style="width: 100%;" border max-height="600">
          <el-table-column label="营业日期" align="center">
            <template scope="scope">{{scope.row.createTime | converTime('YYYY-MM-DD')}}</template>
          </el-table-column>
          <el-table-column prop="totalTurnover" label="营业额" align="center"></el-table-column>
          <el-table-column prop="refund" label="退回金额" align="center"></el-table-column>
          <el-table-column prop="cash" label="现金" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-tooltip
                class="item"
                effect="dark"
                content="查看"
                placement="bottom"
              >
                <img src="@/assets/chaxun_icon.png" class="codesty" @click="checkDaily(scope.row.createTime)" alt />
              </el-tooltip>
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
      </el-tabs>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "dailyDetail",
  data() {
    return {
      tableData: [],
      daily: [],
      createTime: "",
      createTimeEnd: "",
      pageNum: 1,
      pageSize: 20,
      total: 0
    };
  },
  created() {
    this.getDailyList(this.pageNum);
  },
  methods: {
    getDailyList(pageNum, pageSize) {
      let that = this;
      let token = sessionStorage.getItem("token");
      that
        .$axios({
          url: window.apiStore + "dailysummary/list",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            token: token,
            pageNum: that.pageNum,
            pageSize: that.pageSize,
            createTimeStart: that.createTime,
            createTimeEnd: that.createTimeEnd
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
    //按照时间查询
    changeTime(e) {
      this.createTime = this.$moment(e[0]).format("YYYY-MM-DD");
      this.createTimeEnd = this.$moment(e[1]).format("YYYY-MM-DD");
    },
    checkDaily(createTime) {
      let time = this.$moment(createTime).format("YYYY-MM-DD");
      sessionStorage.setItem("times", time);
      this.$router.push({ name: "dailyDetail", params: { createTime: time } });
    },
    // 查询
    chaxun() {
      this.getDailyList();
    },
    reset() {
      this.daily = [];
      this.createTime = "";
      this.createTimeEnd = "";
      this.getDailyList();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getDailyList(this.pageNum, val);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getDailyList(val, this.pageSize);
    }
  }
};
</script>
<style scoped>
.dailyDetail {
  /* background-color: #f1f6fa; */
  min-height: 647px;
  min-width: 1200px;
}
.detail_box {
  /* margin: 0px auto; */
  background: #fff;
  /* border-radius: 10px; */
}
h3 {
  padding: 20px 0 20px 20px;
}
.business {
  padding-left: 20px;
  padding-right: 10px;
}
.pagination {
  float: right;
  margin-top: 20px;
  margin-bottom: 30px;
}
.btnflo {
  display: inline-block;
  margin-left: 90px;
  /* float: right;
    margin-right: 3%; */
}
.topHeight {
  height: 150px;
}
</style>
