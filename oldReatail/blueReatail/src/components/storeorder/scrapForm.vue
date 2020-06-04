<template>
  <div class="ReturnManagement" id="scrapForm">
    <!-- ReturnManagement -->
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
      <el-breadcrumb-item :to="{ path: '/operatIndex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>门店单据管理</el-breadcrumb-item>
      <el-breadcrumb-item>报废单管理</el-breadcrumb-item>
    </el-breadcrumb>-->
    <div class="storeBox">
      <div class="store_Box">
        <p class="store_tit">报废单管理</p>
        <el-row style="white-space: nowrap;">
          <el-col :span="6">
            <span>报废日期：</span>
            <p>
              <el-date-picker
                v-model="changeTime"
                type="daterange"
                @input="change1"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </p>
          </el-col>
          <el-col :span="6" class="TongCenter">
            <span>报废状态：</span>
            <p>
              <el-select type="text" v-model="ruleForm.status">
                <el-option
                  v-for="(item,index) in statu"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  placeholder="请选择"
                ></el-option>
              </el-select>
            </p>
          </el-col>
          <el-col :span="6" class="TongCenter">
            <span>报废单编号：</span>
            <p>
              <el-input
                type="text"
                v-model="ruleForm.code"
                placeholder="请输入"
                maxlength="24"
                onkeyup="this.value=this.value.replace(/\D/g,'')"
              ></el-input>
            </p>
          </el-col>
          <el-col :span="6" class="TongRight">
            <span>门店编号：</span>
            <p>
              <el-input
                type="text"
                v-model="ruleForm.storeCode"
                placeholder="请输入"
                maxlength="8"
                onkeyup="this.value=this.value.replace(/\D/g,'')"
              ></el-input>
            </p>
          </el-col>
        </el-row>
        <div class="konge"></div>
        <el-row>
          <el-col :span="6">
            <span>门店名称：</span>
            <p>
              <el-input type="text" v-model="ruleForm.name" placeholder="请输入"></el-input>
            </p>
          </el-col>
          <el-col :span="18" class="TongRight">
            <el-button class="theBtn queryButton" @click="query">查询</el-button>
            <el-button class="theBtn resetButton" @click="reset">重置</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="storeInfo">
      <div class="store_Box12">
        <div class="hideScool">
          <el-table :data="tableData" style="width: 100%;" border>
          <el-table-column label="创建日期" align="center">
            <template scope="scope">{{scope.row.createTime | converTime('YYYY-MM-DD')}}</template>
          </el-table-column>
          <el-table-column label="报废单编号" align="center" width="250">
            <template scope="scope">
              <span>{{scope.row.code}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="门店" align="center"></el-table-column>
          <el-table-column label="报废状态" align="center">
            <template scope="scope">{{scope.row.status | statusTip}}</template>
          </el-table-column>
          <el-table-column prop="item" label="报废品项数" align="center"></el-table-column>
          <el-table-column prop="count" label="报废总数" align="center"></el-table-column>
          <el-table-column prop="amount" label="报废总金额" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template scope="scope">
              <el-tooltip
                class="item"
                effect="dark"
                content="审核"
                placement="bottom"
                v-if="scope.row.status==1"
              >
                <div class="iconWit" @click="returnDetails(scope.row.code)">
                  <img src="@/assets/present_icon_one.png" class="imgSize" />
                </div>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="查看"
                placement="bottom"
                v-if="scope.row.status !=1"
              >
                <div class="iconWit" @click="returnDetails(scope.row.code)">
                  <img src="@/assets/chaxun_icon.png" class="imgSize" />
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <div class="paginStyle">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[20, 40, 60]"
            :page-size="ruleForm.pageSize"
            class="page"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableDataTotal"
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
  name: "scrapForm",
  data() {
    return {
      statu: [
        {
          value: "1",
          label: "待审核"
        },
        {
          value: "2",
          label: "审核通过"
        },
        {
          value: "3",
          label: "审核不通过"
        }
      ],
      currentPage4: 1,
      changeTime: [],
      ruleForm: {
        createTimeStart: "", //创建时间开始
        createTimeEnd: "", //创建时间结束
        status: "",
        code: "",
        storeCode: "",
        name: "",
        token: sessionStorage.getItem("token"),
        pageNum: 1,
        pageSize: 20
      },
      total: "",
      tableData: [],
      tableDataTotal: 0
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    change(e, name) {
      this.form.createTimeStart = this.$moment(e[0]).format("YYYY-MM-DD");
      this.form.createTimeEnd = this.$moment(e[1]).format("YYYY-MM-DD");
    },

    // 页面加载获取列表
    getlist() {
      this.$axios
        .post("/sys/scrap/list", qs.stringify(this.ruleForm))
        .then(res => {
          if (res.data.code === "0000") {
            this.tableDataTotal = res.data.data.total;
            this.tableData = res.data.data.list;
          } else if (res.data.code === "6666") {
            this.$message({
              showClose: true,
              message: "token异常，请重新登录",
              type: "error"
            });
            const timer = setTimeout(() => {
              clearTimeout(timer);
              this.$router.push({ name: "login" });
            }, 3000);
          }
        });
    },
    //查询
    query() {
      this.getlist();
    },
    //重置
    reset() {
      this.ruleForm.status = "";
      this.ruleForm.code = "";
      this.ruleForm.name = "";
      this.ruleForm.storeCode = "";
      this.changeTime = "";
      this.ruleForm.createTimeStart = "";
      this.ruleForm.createTimeEnd = "";
      this.getlist();
    },
    // 每页的数据
    handleSizeChange(val) {
      this.ruleForm.pageSize = val;
      this.getlist(); //
      //this.tableData 存放所有的数据
    },
    // 当前页码
    handleCurrentChange(val) {
      this.ruleForm.pageNum = val;
      this.getlist();
    },
    change1(e) {
      this.ruleForm.createTimeStart = this.$moment(e[0]).format("YYYY-MM-DD");
      this.ruleForm.createTimeEnd = this.$moment(e[1]).format("YYYY-MM-DD");
    },
    returnDetails(code) {
      let codes = sessionStorage.setItem("code", code);
      this.$router.push({
        name: "scrapDetails",
        params: {
          code: codes
        }
      });
    }
  },
  filters: {
    statusTip(value) {
      if (value == "1") {
        return "待审核";
      } else if (value == "2") {
        return "审核通过";
      } else if (value == "3") {
        return "审核不通过";
      }
    }
  }
};
</script>
<style scoped>
#scrapForm {
  min-width: 1700px;
  box-shadow: 0px 2px 10px #ccc;
  box-sizing: border-box;
  height: 100%;
  background: #fff;
}
p {
  display: inline-block;
  width: 300px;
}
#scrapForm .el-range-editor.el-input__inner {
  width: 100%;
}
#scrapForm .el-select {
  width: 100%;
}
#scrapForm .store_Box12{
  position: relative;
  overflow: hidden;
  height: 634px;
}
#scrapForm .hideScool{
  position: absolute;
	left: 0;
	top: 0;
	right: -17px;
	bottom: 0;
	overflow-x: hidden;
	overflow-y: scroll;
}
</style>