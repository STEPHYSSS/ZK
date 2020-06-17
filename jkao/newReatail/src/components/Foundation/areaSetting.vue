<template>
  <div class="areaSettings">
    <div class="areaBox">
      <div class="rece_Box">
        <div class="block">
          <h3>库区设置</h3>
          <div class="soList">
            <el-row>
              <el-col :span="6">
                <div>
                  <span class="textTitle70px">库区编号：</span>
                  <el-input class="input1" type="text" placeholder="请输入" v-model="itemCode"></el-input>
                </div>
              </el-col>
              <el-col :span="6" class="textAlignCenter">
                <div>
                  <span class="textTitle70px">库区名称：</span>
                  <el-input class="input1" type="text" placeholder="请输入" v-model="name"></el-input>
                </div>
              </el-col>
              <el-col :span="6" class="textAlignCenter">
                <div>
                  <span class="textTitle70px textTitleR">状态：</span>
                  <p class="TongYiInput">
                    <el-select placeholder="请选择" v-model="status">
                      <el-option
                        v-for="staItem in statu"
                        :key="staItem.value"
                        :label="staItem.label"
                        :value="staItem.value"
                      ></el-option>
                    </el-select>
                  </p>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="textAlignRight">
                  <el-button class="theBtn queryButton" @click="chaxun">查询</el-button>
                  <el-button class="theBtn resetButton" @click="reseting">重置</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <div class="areainfo">
      <div class style="padding-top: 20px;">
        <div class="wsListsearch">
          <!-- <router-link to="/reservoirAdd">
            <img src="@/assets/newlyincreased.png" alt />
          </router-link>-->
          <div class="increaseBox">
            <div class="addBtnBox">
              <div class="serchBoxBtn70">
                <el-button class="increase themeColor" @click="newIncrease">
                  <i class="el-icon-plus"></i>新增
                </el-button>
              </div>
            </div>
          </div>
        </div>
        <el-table :data="tableData" style="width: 100%;" max-height="600">
          <el-table-column prop="item" label="库区编号" align="center"></el-table-column>
          <el-table-column prop="name" label="库区名称" align="center"></el-table-column>
          <el-table-column prop="warehouseName" label="所属仓库" align="center"></el-table-column>
          <el-table-column label="货架数量" align="center">
            <template scope="scope">
              <span class="codesty" @click="sheNum(scope.row.id)">{{scope.row.shelves}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="capacity" label="库位容量" align="center"></el-table-column>
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
                  <img src="@/assets/xiugai_icon.png" class="codesty" @click="editRow(scope.row.id)" />
                </div>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="启用"
                placement="bottom"
                v-if="scope.row.status=='0'"
              >
                <div class="dis">
                  <img
                    src="@/assets/jinyong_icon.png"
                    @click="modify(scope.row.status,scope.row.id)"
                    class="codesty"
                  />
                </div>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="禁用" placement="bottom" v-else>
                <div class="dis">
                  <img
                    src="@/assets/qiyong_icon.png"
                    @click="modify(scope.row.status,scope.row.id)"
                  />
                </div>
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
      <!-- 编辑 -->
      <el-dialog title="编辑" :visible.sync="dialogFormVisible" :show-close="false">
        <el-form :model="ruleForm" label-width="110px" :rules="rules" ref="ruleForm">
          <el-form-item label="库区名称：" prop="name">
            <p class="kuquname">
              <el-input v-model="ruleForm.name" auto-complete="off" maxlength="50"></el-input>
            </p>
          </el-form-item>
          <el-form-item label="所属仓库：" prop="warehouseCode">
            <p class="kuquname">
              <el-select placeholder="请选择" v-model="ruleForm.warehouseCode" :disabled="isfalse">
                <el-option
                  v-for="item in options"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </p>
          </el-form-item>
          <el-form-item label="单个货位容积:" prop="locationVolume">
            <p class="kuquname">
              <el-input
                type="text"
                placeholder="请输入"
                v-model="ruleForm.locationVolume"
                :disabled="isfalse"
              ></el-input>
            </p>
          </el-form-item>
        </el-form>
        <div class="btnCent">
          <el-button class="theBtn themeColor textMright" @click="isSure">确定</el-button>
          <el-button class="theBtn resetButton" @click="fanhui">返 回</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "areaSettings",
  data() {
    return {
      itemCode: "",
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
        id: ""
      },
      ruleForm: {
        name: "",
        warehouseCode: "",
        locationVolume: ""
      },
      options: [],
      tableData: [],
      rules: {
        name: [{ required: true, message: "请输入仓库名称", trigger: "blur" }],
        warehouseCode: [
          { required: true, message: "请选择所属仓库", trigger: "blur" }
        ],
        locationVolume: [
          { required: true, message: "请输入单个货位容积", trigger: "blur" }
        ]
      },
      dialogFormVisible: false,
      isfalse: false,
      pageNum: 1,
      pageSize: 20,
      total: 0
    };
  },
  created() {
    this.areaSetting(this.pageNum, this.pageSize);
    this.showother();
  },
  methods: {
    newIncrease() {
      this.$router.push({
        name: "reservoirAdd"
      });
    },
    areaSetting(pageNum, pageSize) {
      this.$axios({
        url: window.apiWare + "region/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: sessionStorage.getItem("token"),
          name: this.name,
          status: this.status,
          item: this.itemCode,
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
      this.areaSetting();
    },
    reseting() {
      this.itemCode = "";
      this.name = "";
      this.status = "";
      this.areaSetting();
    },
    // 编辑
    editRow(id) {
      sessionStorage.setItem("areasetCode", id);
      this.dialogFormVisible = true;
      this.$axios({
        url: window.apiWare + "region/detail",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: sessionStorage.getItem("token"),
          id: id
        })
      }).then(res => {
        if (res.data.code == "0000") {
          if (res.data.data.changeWarehouse == false) {
            this.isfalse = true;
          } else {
            this.isfalse = false;
          }
          this.ruleForm = res.data.data;
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
    // 提交编辑
    isSure() {
      this.$axios({
        url: window.apiWare + "region/update",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: sessionStorage.getItem("token"),
          id: sessionStorage.getItem("areasetCode"),
          name: this.ruleForm.name,
          warehouseCode: this.ruleForm.warehouseCode,
          locationVolume: this.ruleForm.locationVolume
        })
      }).then(res => {
        if ((res.data.code = "0000")) {
          this.$message({
            type: "success",
            message: "修改成功"
          });
          this.dialogFormVisible = false;
          this.areaSetting();
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
    fanhui() {
      this.dialogFormVisible = false;
      this.areaSetting();
    },
    // 货架详情
    sheNum(id) {
      sessionStorage.setItem("shelvId", id);
      this.$router.push({
        name: "shelvesAdd",
        query: {
          id: id
        }
      });
    },
    // 所属仓库下拉选
    showother() {
      this.$axios({
        url: "public/warehouse/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: sessionStorage.getItem("token")
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.options = res.data.data.list;
        }
      });
    },
    // 启用1、禁用0
    modify(status, id) {
      let _this = this;
      _this.Info.id = id;
      _this
        .$axios({
          url: window.apiWare + "region/status/modify",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify(_this.Info)
        })
        .then(res => {
          if (res.data.code == "0000") {
            this.areaSetting();
          }
        });
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.areaSetting(this.pageNum, val);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.areaSetting(val, this.pageSize);
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
.areaSettings {
  /* background-color: #f1f6fa; */
  /* min-height: 647px;
  min-width: 1200px; */
}
.areaBox,
.areainfo {
  background: #fff;
}
.areaSettings .rece_Box {
  /* margin-left: 30px;
  margin-right: 30px; */
  margin: 0 20px;
}
.areaSettings .nav {
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
.block {
  height: 150px;
}
.spacelet {
  letter-spacing: 6px;
}
.aaa {
  width: 66%;
}
.cit {
  width: 30%;
}
.shop2 {
  margin: 0 2px;
}
.bbb {
  width: 34%;
  text-align: right;
}
.bbb .typ {
  width: 58%;
}
.sotl {
  width: 33%;
}
.sotl p {
  width: 60%;
}
.aaa,
.cit,
.shop2,
.bbb,
.bbb .typ,
.sotl,
.sotl p {
  display: inline-block;
}
.sotl2 {
  text-align: right;
}
.sotl2 .sotlname {
  margin-right: 5px;
}
.soList {
  margin-bottom: 30px;
}
.soList .el-range-editor.el-input__inner {
  width: 100%;
}
.btn_flot {
  width: 100%;
  text-align: right;
}
.kuquname {
  width: 90%;
  display: inline-block;
}
.btnCent {
  text-align: center;
}
.areainfo .el-dialog {
  width: 500px;
}
h3 {
  padding: 20px 0 20px 0px;
}
</style>


