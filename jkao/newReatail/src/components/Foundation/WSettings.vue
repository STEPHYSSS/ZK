<template>
  <div class="wsetting">
    <div class="wsettingB">
      <h3>仓库设置</h3>
      <div class="wsettingBList">
        <el-row>
          <el-col :span="8">
            <div>
              <span>仓库名称：</span>
              <el-input class="input1" type="text" placeholder="请输入" v-model="name"></el-input>
            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <span>状态：</span>
              <el-select class="input1" placeholder="请选择" v-model="status">
                <el-option
                  v-for="staItem in statu"
                  :key="staItem.value"
                  :label="staItem.label"
                  :value="staItem.value"
                ></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="textAlignRight">
              <el-button class="theBtn queryButton" @click="chaxun">查询</el-button>
              <el-button class="theBtn resetButton" @click="reseting">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="wsettingB2">
      <div class="wsettingBList2">
        <div class="wsListsearch">
          <div class="increaseBox">
            <div class="addBtnBox">
              <div class="">
                <el-button class="increase themeColor" @click="newIncrease">
                  <i class="el-icon-plus"></i>新增
                </el-button>
              </div>
            </div>
          </div>
        </div>
        <el-table :data="tableData">
          <el-table-column prop="code" label="仓库编号" align="center"></el-table-column>
          <el-table-column prop="name" label="仓库名称" align="center"></el-table-column>
          <el-table-column label="所在区域" align="center" width="180">
            <template scope="scope">{{scope.row.province}}-{{scope.row.city}}-{{scope.row.area}}</template>
          </el-table-column>
          <el-table-column prop="address" label="详细地址" align="center" width="190"></el-table-column>
          <el-table-column label="创建时间" align="center">
            <template scope="scope">
              <span
                v-if="scope.row.createTime !=null"
              >{{scope.row.createTime | converTime('YYYY-MM-DD')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center">
            <template scope="scope">{{scope.row.status | statusTip}}</template>
          </el-table-column>
          <el-table-column label="操作" align="center" fixed="right">
            <template scope="scope">
              <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
                <div class="dis">
                  <img
                    src="@/assets/xiugai_icon.png"
                    class="codesty"
                    @click="editRow(scope.row.code)"
                  />
                </div>
              </el-tooltip>&nbsp;&nbsp;
              <el-tooltip
                class="item"
                effect="dark"
                content="启用"
                placement="bottom"
                v-if="scope.row.status=='0'"
              >
                <img
                  src="@/assets/jinyong_icon.png"
                  @click="modify(scope.row.status,scope.row.code)"
                  class="codesty"
                />
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="禁用" placement="bottom" v-else>
                  <img
                    src="@/assets/qiyong_icon.png"
                    @click="modify(scope.row.status,scope.row.code)"
                    class="codesty"
                  />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <div style="height:50px">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[20, 40, 60]"
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
<script>
import qs from "qs";
export default {
  name: "wsetting",
  data() {
    return {
      name: "",
      status: "",
      statu: [
        {
          value: "0",
          label: "已禁用"
        },
        {
          value: "1",
          label: "已启用"
        }
      ],
      Info: {
        token: sessionStorage.getItem("token"),
        code: ""
      },
      tableData: [],
      pageNum: 1,
      pageSize: 20,
      total: 0
    };
  },
  created() {
    this.settingWare(this.pageNum, this.pageSize);
  },
  methods: {
    newIncrease() {
      this.$router.push({
        name: "storehouseAdd"
      });
    },

    settingWare(pageNum, pageSize) {
      this.$axios({
        url: window.apiWare + "index/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: sessionStorage.getItem("token"),
          name: this.name,
          status: this.status,
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
      this.settingWare();
    },
    reseting() {
      this.name = "";
      this.status = "";
      this.settingWare();
    },
    // 编辑
    editRow(code) {
      sessionStorage.setItem("editwareCode", code);
      this.$router.push({
        name: "storehouseEdit",
        query: {
          code: sessionStorage.getItem("editwareCode")
        }
      });
    },
    // 启用1、禁用0
    modify(status, code) {
      let _this = this;
      _this.Info.code = code;
      _this
        .$axios({
          url: window.apiWare + "index/status/modify",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify(_this.Info)
        })
        .then(res => {
          if (res.data.code == "0000") {
            this.settingWare();
          }
        });
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.settingWare(this.pageNum, val);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.settingWare(val, this.pageSize);
    }
  },
  filters: {
    statusTip(value) {
      if (value == "1") {
        return "启用";
      } else if (value == "0") {
        return "禁用";
      }
    }
  }
};
</script>
<style scoped>
.wsetting {
  /* background-color: #f1f6fa; */
  min-height: 647px;
  /* min-width: 1200px; */
}

.wsettingB,
.wsettingB2 {
  background: #fff;
}
.wsettingB {
  /* padding-bottom: 15px; */
  height: 150px;
}
h3 {
  padding: 20px 0 8px 20px;
}
.wsettingBList {
  margin: 0 20px;
}
.wsettingBList2 {
  box-sizing: border-box;
  padding-bottom: 50px;
}
.pagination {
  float: right;
  padding-right: 20px;
  /* margin-top: 30px;
  margin-bottom: 30px; */
}
.wsList,
.wsList p {
  display: inline-block;
}
/* .wsettingBList .wsList_pinName2 {
  width: 40%;
  text-align: center;
} 
.wsettingBList .wsList_pinName3 {
  width: 30%;
  text-align: right;
}
.wsettingBList .wsList_pinName {
  width: 30%;
} */

/* .wsettingBList .el-range-editor.el-input__inner {
  width: 300px;
} */
.createDay {
  letter-spacing: 2.8px;
}
p {
  display: inline-block;
  width: 67%;
}
.btnfloat {
  float: right;
  margin-right: 8px;
}
.editrow {
  display: inline-block;
  margin-left: 20px;
}
.wsListsearch {
  text-align: right;
  margin-bottom: 10px;
}
</style>
