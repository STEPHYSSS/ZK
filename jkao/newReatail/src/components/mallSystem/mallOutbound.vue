<template>
  <div class="mallOutbound">
    <div class="storeBox storeBox222">
      <div class="store_Box">
        <p class="store_tit">商城出库</p>
        <el-row style="white-space: nowrap;">
          <el-col :span="6">
            <span>创建日期：</span>
            <p>
              <el-date-picker
                v-model="Time"
                @input="Panchange"
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
                <el-option label="待发货" value="WD"></el-option>
                <el-option label="已发货" value="AD"></el-option>
                <el-option label="已验收" value="AR"></el-option>
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
    <div class="storeInfo234">
      <div class="store_Box1">
        <el-table :data="tableData" style="width: 100%;" border>
          <el-table-column label="单据编号" align="center" width="250">
            <template scope="scope">
              <router-link
                :to="{path:'mallOutboundInfo',query:{code:scope.row.code}}"
                class="codesty"
              >{{scope.row.code}}</router-link>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" align="center">
            <template scope="scope">
              <span
                v-if="scope.row.createTime !=null"
              >{{scope.row.createTime | converTime('YYYY-MM-DD')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="单据状态" align="center">
            <template scope="scope">{{scope.row.status | stockStatus}}</template>
          </el-table-column>
          <el-table-column prop="item" label="出库品项数" align="center"></el-table-column>
          <el-table-column prop="count" label="出库总数" align="center"></el-table-column>
          <el-table-column prop="orderCode" label="关联订单" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template scope="scope">
              <el-tooltip
                class="item"
                effect="dark"
                content="查看物流"
                placement="bottom"
                v-if="scope.row.status =='AR'"
              >
                <img
                  src="@/assets/chaxun_icon.png"
                  class="imgSize"
                  @click="showWL(scope.row.logisticsDatail)"
                />
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="编辑物流"
                placement="bottom"
                v-if="scope.row.status =='AD'"
              >
                <img src="@/assets/entering_icon.png" class="imgSize" @click="eidtWL(scope.row)" />
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
        <el-dialog
          title="物流详情"
          :visible.sync="dialogVisible"
          width="800px"
          :before-close="handleClose"
        >
          <p style="height:350px">{{stockInfo}}</p>
        </el-dialog>
        <el-dialog title="物流详情" :visible.sync="centerDialogVisible" width="800px" center close-on-click-modal>
          <div slot="title" class="auditBtn">
            <span class="el-icon-info"></span>
            <span class="auditBtn-1">物流详情</span>
          </div>
          <div style="position: relative;">
            <textarea class="textInfo" v-model="title" placeholder="请输入物流信息" style="width:100%;height:150px"></textarea>
            <span class="wowr">{{title.length}}/{{titleMaxLength}}</span>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button class="theBtn queryButton" @click="eidtSure">确定</el-button>
            <el-button class="theBtn resetButton" @click="centerDialogVisible = false">取 消</el-button>
          </span>
        </el-dialog>
        <div class="konge"></div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "mallOutbound",
  data() {
    return {
      tableData: [],
      token: sessionStorage.getItem("token"),
      status: "",
      code: "",
      pageNum: 1,
      pageSize: 20,
      total: 0,
      createTimeStart: "",
      createTimeEnd: "",
      Time: [],
      dialogVisible: false,
      centerDialogVisible: false,
      stockInfo: "", //物流详情
      textarea: "",
      outCode: "",
      titleMaxLength: 255,
      title: ""
    };
  },
  created() {
    this.getStockList();
  },
  methods: {
    getStockList() {
      this.$axios({
        url: "mall/out/stock/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: this.token,
          code: this.code,
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
    //查询重置
    chaxun() {
      this.getStockList();
    },
    reseting() {
      this.status = "";
      this.code = "";
      this.createTimeStart = "";
      this.createTimeEnd = "";
      this.Time = [];
      this.getStockList();
    },
    // 编辑和查看
    showWL(stockInfo) {
      this.dialogVisible = true;
      this.stockInfo = stockInfo;
    },
    eidtWL(logistiInfo) {
      this.centerDialogVisible = true;
      this.outCode = logistiInfo.code;
      this.logisticsDatail = logistiInfo.logisticsDatail;
    },
    // 编辑确认
    eidtSure() {
      if(this.title === ""){
        return  this.$message.error("请输入物流信息")
      }else{
         this.$axios({
        url: "mall/out/stock/logistics/update",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: this.token,
          outCode: this.outCode,
          logisticsDatail: this.title
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.centerDialogVisible = false;
          this.getStockList();
        } else {
          this.$message.error(res.data.msg);
        }
      });
      }
     
    },
    handleClose() {
      this.dialogVisible = false;
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getStockList(this.pageNum, val);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getStockList(val, this.pageSize);
    },
    Panchange(e) {
      this.createTimeStart = this.$moment(e[0]).format("YYYY-MM-DD");
      this.createTimeEnd = this.$moment(e[1]).format("YYYY-MM-DD");
    }
  },
  watch: {
    title() {
      if (this.title.length > this.titleMaxLength) {
        this.title = String(this.title).slice(0, this.titleMaxLength);
      }
    }
  },
  filters: {
    stockStatus(value) {
      if (value == "WD") {
        return "待发货";
      } else if (value == "AD") {
        return "已发货";
      } else if (value == "AR") {
        return "已验收";
      }
    }
  }
};
</script>
<style scoped>
.mallOutbound {
  background-color: #fff;
  height: 100%;
  min-height: 647px;
  min-width: 1700px;
  box-shadow: 0px 2px 10px #ccc;
}
.mallOutbound .el-textarea {
  height: 200px;
}
.mallOutbound .el-icon-info {
  color: #ffab5a;
  font-size: 25px;
}
.mallOutbound .auditBtn {
  text-align: left;
}
.mallOutbound .auditBtn-1 {
  font-size: 16px;
  margin-left: 5px;
  vertical-align: top;
}
p {
  display: inline-block;
  width: 300px;
}
.mallOutbound .el-range-editor.el-input__inner {
  width: 100%;
}
.mallOutbound .el-select {
  width: 100%;
}
.storeBox222 {
  height: 150px;
}
.paginStyle {
  height: 50px;
  text-align: right;
}
.wowr {
  position: absolute;
  bottom: 6px;
  right: 6px;
}
</style>