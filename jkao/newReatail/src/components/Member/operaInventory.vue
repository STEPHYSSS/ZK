<template>
  <div class="operainventory">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
      <el-breadcrumb-item :to="{ path: '/operatIndex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>门店盘点</el-breadcrumb-item>
    </el-breadcrumb>-->
    <div class="storeBox">
      <div class="store_Box">
        <p class="store_tit">门店盘点</p>
        <el-row style="white-space: nowrap;">
          <el-col :span="6">
            <span>盘点单编号：</span>
            <p>
              <el-input type="text" v-model="ruleForm.code" placeholder="请输入"></el-input>
            </p>
          </el-col>
          <el-col :span="6" class="TongCenter">
            <span>盘点日期：</span>
            <p>
              <el-date-picker
                v-model="changeTime"
                type="daterange"
                @input="Panchange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </p>
          </el-col>
          <el-col :span="6" class="TongCenter">
            <span>盘点状态：</span>
            <p>
              <el-select type="text" v-model="ruleForm.status">
                <el-option
                  v-for="(item,index) in Invertstatu"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  placeholder="请选择"
                ></el-option>
              </el-select>
            </p>
          </el-col>
          <el-col :span="6" class="TongRight">
            <span>门店名称：</span>
            <p>
              <el-input type="text" v-model="ruleForm.name" placeholder="请输入"></el-input>
            </p>
          </el-col>
        </el-row>
        <div class="konge"></div>
        <el-row>
          <el-col :span="6">
            <span class="lett">门店编号：</span>
            <p>
              <el-input type="text" v-model="ruleForm.storeCode" placeholder="请输入"></el-input>
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
      <div class="store_Box2">
        <el-table :data="tableData" style="width: 100%;">
          <el-table-column label="盘点单编号" align="center" prop="code" width="250"></el-table-column>
          <el-table-column label="门店名称" prop="name" align="center"></el-table-column>
          <el-table-column label="门店编号" prop="storeCode" align="center"></el-table-column>
          <el-table-column label="盘点日期" align="center">
            <template scope="scope">{{scope.row.inventoryTime | converTime('YYYY-MM-DD')}}</template>
          </el-table-column>
          <el-table-column label="更新时间" align="center">
            <template scope="scope">
              <span
                v-if="scope.row.createTime !=null"
              >{{scope.row.createTime | converTime('YYYY-MM-DD HH:mm:ss')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center">
            <template scope="scope">{{scope.row.status | statusTip}}</template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template scope="scope">
              <el-tooltip
                class="item"
                effect="dark"
                content="确认"
                placement="bottom"
                v-if="scope.row.status == '1'"
              >
                <div @click="detransfedetai(scope.row.code,'1')">
                  <img src="@/assets/present_icon_one.png" class="imgSize" />
                </div>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="查看"
                placement="bottom"
                v-else-if="scope.row.status == '2'"
              >
                <div @click="detransfedetai(scope.row.code,'2')">
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
  name: "operainventory",
  data() {
    return {
      Invertstatu: [
        {
          value: "1",
          label: "待确认"
        },
        {
          value: "2",
          label: "已确认"
        }
      ],
      changeTime: [],
      ruleForm: {
        inventoryTimeStart: "", //创建时间开始
        inventoryTimeEnd: "", //创建时间结束
        status: "",
        code: "",
        name: "",
        storeCode: "",
        token: sessionStorage.getItem("token")
      },
      tableData: [],
      pageNum: 1,
      pageSize: 20,
      total: 0
    };
  },
  created() {
    this.operaList(this.pageNum, this.pageSize);
  },
  methods: {
    operaList(pageNum, pageSize) {
      this.$axios({
        url: window.apiUrl + "inventory/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          inventoryTimeStart: this.ruleForm.inventoryTimeStart,
          inventoryTimeEnd: this.ruleForm.inventoryTimeEnd,
          status: this.ruleForm.status,
          code: this.ruleForm.code,
          name: this.ruleForm.name,
          storeCode: this.ruleForm.storeCode,
          token: this.ruleForm.token,
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
    // 选择时间
    Panchange(e) {
      this.ruleForm.inventoryTimeStart = this.$moment(e[0]).format(
        "YYYY-MM-DD"
      );
      this.ruleForm.inventoryTimeEnd = this.$moment(e[1]).format("YYYY-MM-DD");
    },
    // 查看详情(2) 、验收(1)
    detransfedetai(code, ids) {
      sessionStorage.setItem("opicode", code);
      this.$router.push({
        name: "operaInvenDetail",
        params: {
          code: sessionStorage.getItem("opicode"),
          ids: ids
        }
      });
    },
    // 查询 重置
    chaxun() {
      this.operaList();
    },
    reset() {
      this.ruleForm.inventoryTimeStart = ""; //创建时间开始
      this.ruleForm.inventoryTimeEnd = ""; //创建时间结束
      this.ruleForm.status = "";
      this.ruleForm.code = "";
      this.ruleForm.name = "";
      this.ruleForm.storeCode = "";
      this.changeTime = [];
      this.operaList();
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.operaList(this.pageNum, val);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.operaList(val, this.pageSize);
    }
  },
  filters: {
    statusTip(value) {
      if (value == "1") {
        return "待确认";
      } else if (value == "2") {
        return "已确认";
      }
    },
    statusName(value) {
      if (value == "1") {
        return "确认";
      } else if (value == "2") {
        return "查看";
      }
    }
  }
};
</script>
<style scoped>
.operainventory {
  background-color: #fff;
  height: 100%;
  min-height: 647px;
  min-width: 1700px;
  box-shadow: 0px 2px 10px #ccc;
  position: relative;
  overflow: hidden;
}
p {
  display: inline-block;
  width: 300px;
}
.operainventory .el-range-editor.el-input__inner {
  width: 100%;
}
.operainventory .el-select {
  width: 100%;
}
.lett{
    letter-spacing: 2.3px;
}
.storeBox,
.storeInfo {
    margin: 0 auto;
    background: #fff;
    font-size: 12px;
}

.storeBox {
    /* border-bottom: 1px solid #555555; */
    height: 200px;
    box-sizing: border-box;
}

.store_Box{
    margin-left: 20px;
    margin-right: 20px;
}

.store_tit {
    padding-top: 20px;
    padding-bottom: 20px;
    font-size: 14px;
    font-weight: 900;
}

.addStore {
    display: inline-block;
    box-sizing: border-box;
    margin-bottom: 16px;
    text-align: right;
    width: 100%;
    padding-right: 20px;
  }
  
  .addStore img {
    width: 69px;
  }

.imgSize {
    width: 14px;
    margin: 0 5px;
}

.TongCenter {
    text-align: center;
}

.TongRight {
    text-align: right;
}
.paginStyle {
    height: 50px;
    text-align: right;
}
.el-button{
    margin: 0 0 0 15px;
  }
  .widOne{
    width: 93.3px;
  }
  .widOne:nth-child(3){
    margin: 0 10px;
  }
</style>
