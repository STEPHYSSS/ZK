<template>
  <div class="transferManage minWidth1600" id="transferManage">
    <div class="billMa">
      <h3>转移单管理</h3>
      <div class="billMaList">
        <el-row class="rowSpacing">
          <el-col :span="6">
            <div>
              <span class="textTitle70px">转移日期：</span>
              <p class="sotlname">
                <el-date-picker
                  v-model="scrapTime"
                  type="daterange"
                  class="input1"
                  @input="scrapchange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </p>
            </div>
          </el-col>
          <el-col :span="6" class="textAlignCenter">
            <div>
              <span class="textTitle70px">转移状态：</span>
              <p class="TongYiInput">
                <el-select type="text" v-model="ruleForm.status">
                  <el-option
                    v-for="(item,index) in statusList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    placeholder="请选择"
                  ></el-option>
                </el-select>
              </p>
            </div>
          </el-col>
          <el-col :span="6" class="textAlignCenter">
            <div>
              <span class="sotretype5">转移单编号：</span>
              <!-- <p class="TongYi"> -->
              <el-input class="input1" type="text" placeholder="请输入" v-model="ruleForm.code"></el-input>
              <!-- </p> -->
            </div>
          </el-col>
          <el-col :span="6" class="textAlignRight">
            <div>
              <span class="textTitle70px">转出门店：</span>
              <el-input
                class="input1"
                type="text"
                placeholder="请输入"
                v-model="ruleForm.turnOutStoreName"
              ></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div>
              <span class="textTitle70px">转入门店：</span>
              <el-input
                class="input1"
                type="text"
                placeholder="请输入"
                v-model="ruleForm.turnInStoreName"
              ></el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div></div>
          </el-col>
          <el-col :span="6">
            <div></div>
          </el-col>
          <el-col :span="6" class="colMleft50">
            <div class="textAlignRight">
              <el-button class="theBtn queryButton" @click="chaxun">查询</el-button>
              <el-button @click="reset" class="theBtn resetButton">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="billMa2">
      <div class="billMaList2">
        <div class="billMaList">
          <div class="addBtnBox">
            <div class="serchBoxBtn70 addBtn">
              <el-button class="themeColor" @click="addSlip">新增转出</el-button>
            </div>
          </div>

          <!-- 点击新增弹框 -->
          <el-dialog title :visible.sync="dialogTableVisible" width="950px" height="500px">
            <div class="boxshow">
              <h4 class="chooseStor">选择门店</h4>
              <div class="listInfo">
                <el-row>
                  <el-col :span="10">
                    <div>
                      <span class="textTitle70px">门店名称：</span>
                      <el-input class="dialogInput" placeholder="请输入" v-model="storeName"></el-input>
                    </div>
                  </el-col>
                  <el-col :span="10">
                    <div>
                      <span class="textTitle70px">门店编号:</span>
                      <el-input class="dialogInput" placeholder="请输入" v-model="storeCode"></el-input>
                    </div>
                  </el-col>
                  <!-- <el-col :span="8"> -->
                  <!-- <div class="serchBoxBtn60"> -->
                  <el-button class="theBtn queryButton" @click="chaxun2">查询</el-button>
                  <el-button class="theBtn resetButton" @click="chongzhi">重置</el-button>
                  <!-- </div> -->
                  <!-- </el-col> -->
                </el-row>

                <div class="listSty"></div>
              </div>

              <div>
                <el-table
                  :data="showdalogList"
                  style="width: 100%;"
                  id="hiegLine"
                  border
                  height="240px"
                >
                  <el-table-column width="60" align="center">
                    <template slot-scope="scope">
                      <!-- <el-radio-group v-model="radio">
                                        <el-radio :label="scope.row.code">1</el-radio>
                      </el-radio-group>-->
                      <el-radio
                        class="radio"
                        v-model="nideform.nidecode"
                        @change="selectItem(scope.row.code,scope.row.name)"
                        :label="scope.row.code"
                      >&nbsp;</el-radio>
                    </template>
                  </el-table-column>
                  <el-table-column prop="code" label="门店编号" align="center"></el-table-column>
                  <el-table-column prop="name" label="名店名称" align="center"></el-table-column>
                  <el-table-column label="所在区域" align="center" width="180">
                    <template
                      scope="scope"
                    >{{scope.row.province}}-{{scope.row.city}}-{{scope.row.area}}</template>
                  </el-table-column>
                  <el-table-column prop="type" label="门店类型" align="center"></el-table-column>
                </el-table>
              </div>
              <div>
                <div class="dialogSureBox">
                  <el-button class="theBtn themeColor textMright" @click="sureTrans">确定</el-button>
                  <el-button class="theBtn resetButton" @click="dialogTableVisible=false">取消</el-button>
                </div>
                <div class="dialog_pagination">
                  <el-pagination
                    @size-change="handleSizeChange1"
                    @current-change="handleCurrentChange1"
                    :current-page="pageNum1"
                    :page-sizes="[20,40,60]"
                    :page-size="pageSize1"
                    background
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total1"
                    class="pagination"
                  ></el-pagination>
                </div>
              </div>
            </div>
          </el-dialog>
        </div>
        <el-table :data="tableData" style="width: 100%;" border>
          <el-table-column label="转移单编号" align="center" width="220">
            <template scope="scope">
              <span class="codesty" @click="detransfedetai(scope.row.code,'1')">{{scope.row.code}}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建日期" align="center">
            <template scope="scope">{{scope.row.createTime|converTime('YYYY-MM-DD')}}</template>
          </el-table-column>
          <el-table-column label="转移状态" align="center">
            <template scope="scope">{{scope.row.status| scrapStatus }}</template>
          </el-table-column>
          <el-table-column prop="nameIn" label="转入门店" align="center"></el-table-column>
          <el-table-column prop="nameOut" label="转出门店" align="center"></el-table-column>
          <el-table-column prop="item" label="转出品项数" align="center"></el-table-column>
          <el-table-column prop="count" label="转出总数" align="center"></el-table-column>
          <el-table-column prop="amount" label="转出总金额" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template scope="scope">
              <!-- <span
                class="codesty"
                v-if="scope.row.status=='1' && scope.row.nameOut == mendianName"
                @click="detransferRow(scope.row.code)"
              >删除</span>-->
              <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                <img
                  src="@/assets/shanchu_icon.png"
                  v-show="scope.row.status=='1' && scope.row.nameOut == mendianName"
                  @click="detransferRow(scope.row.code)"
                  alt
                />
              </el-tooltip>
              <el-tooltip class="tips" effect="dark" content="验收" placement="bottom">
                <img
                  src="@/assets/present_icon_one.png"
                  v-show="scope.row.status=='1' && scope.row.nameOut != mendianName"
                  @click="detransfedetai(scope.row.code,'2')"
                  alt
                />
              </el-tooltip>
              <!-- <span
                class="codesty"
                v-else-if="scope.row.status=='1' && scope.row.nameOut != mendianName "
                @click="detransfedetai(scope.row.code,'2')"
              >验收</span>-->
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
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "transferManage",
  data() {
    return {
      mendianName: sessionStorage.getItem("shopName"),
      nideform: {
        nidecode: "",
        nidename: ""
      },
      scrapTime: [],
      statusList: [
        {
          value: "1",
          label: "待验收"
        },
        {
          value: "2",
          label: "已验收"
        }
      ],
      ruleForm: {
        createTimeStart: "", //创建时间开始
        createTimeEnd: "", //创建时间结束
        status: "",
        code: "",
        turnOutStoreName: "",
        turnInStoreName: ""
      },
      ids: "",
      dialogTableVisible: false,
      radio: "1",
      storeName: "",
      storeCode: "",
      showdalogList: [], //弹出框表数据
      tableData: [],
      pageNum: 1,
      pageSize: 20,
      total: 0,
      pageNum1: 1,
      pageSize1: 20,
      total1: 0
    };
  },
  created() {
    this.transferList(this.pageNum, this.pageSize);
  },
  methods: {
    selectItem(code, name) {
      this.nideform.nidecode = code;
      this.nideform.nidename = name;
    },
    transferList(pageNum, pageSize) {
      this.$axios({
        url: window.apiStore + "transfer/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          createTimeStart: this.ruleForm.createTimeStart,
          createTimeEnd: this.ruleForm.createTimeEnd,
          status: this.ruleForm.status,
          code: this.ruleForm.code,
          turnOutStoreName: this.ruleForm.turnOutStoreName,
          turnInStoreName: this.ruleForm.turnInStoreName,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          token: sessionStorage.getItem("token")
        })
      })
        .then(res => {
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
        })
        .catch(err => {
          console.log("数据异常", err);
        });
    },
    // 删除
    detransferRow(code) {
      this.$axios({
        url: window.apiStore + "transfer/delete",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          code: code,
          token: sessionStorage.getItem("token")
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.transferList();
        }
      });
    },
    // 详情 、验收
    detransfedetai(code, ids) {
      sessionStorage.setItem("code", code);
      this.$router.push({
        name: "transferdetail",
        params: {
          code: code,
          ids: ids
        }
      });
    },
    // 查询 重置
    chaxun() {
      this.transferList();
    },
    reset() {
      this.scrapTime = ""; //创建日期
      this.ruleForm.createTimeStart = "";
      this.ruleForm.createTimeEnd = "";
      this.ruleForm.turnOutStoreName = "";
      this.ruleForm.turnInStoreName = "";
      this.ruleForm.status = "";
      this.ruleForm.code = "";
      this.transferList();
    },
    // 分页
    handleSizeChange(val) {
      this.ruleForm.pageSize = val;
      this.transferList(this.pageNum, val);
    },
    handleCurrentChange(val) {
      this.ruleForm.pageNum = val;
      this.transferList(val, this.pageSize);
    },
    scrapchange(e) {
      this.ruleForm.createTimeStart = this.$moment(e[0]).format("YYYY-MM-DD");
      this.ruleForm.createTimeEnd = this.$moment(e[1]).format("YYYY-MM-DD");
    },
    // 新增弹出
    addSlip(pageNum1, pageSize1) {
      this.dialogTableVisible = true;
      this.$axios({
        url: window.apiStore + "transfer/store",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: sessionStorage.getItem("token"),
          pageNum: this.pageNum1,
          pageSize: this.pageSize1,
          name: this.storeName,
          storeCode: this.storeCode
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.showdalogList = res.data.data.list;
          this.total1 = res.data.data.total;
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
    // 查询重置
    chaxun2() {
      this.addSlip();
    },
    chongzhi() {
      this.storeName = "";
      this.storeCode = "";
      this.addSlip();
    },
    // 点击确定新增到新增转出页面
    sureTrans() {
      if (this.nideform.nidecode == "") {
        this.$message("请选择门店");
      } else {
        let Zcode = this.nideform.nidecode;
        let Zname = this.nideform.nidename;
        this.$router.push({
          name: "transferadd",
          params: {
            code: sessionStorage.setItem("code", Zcode),
            name: sessionStorage.setItem("name", Zname)
          }
        });
      }
    },

    handleSizeChange1(val) {
      this.pageSize1 = val;
      this.addSlip(this.pageNum1, val);
    },
    handleCurrentChange1(val) {
      this.pageNum1 = val;
      this.addSlip(val, this.pageSize1);
    }
  },
  filters: {
    scrapStatus(value) {
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
.transferManage {
  /* background-color: #f1f6fa; */
  min-height: 647px;
  min-width: 1200px;
}
.billMa,
.billMa2 {
  /* margin: 0px auto; */
  background: #fff;
  /* border-radius: 10px;
  min-height: 200px; */
}
.billMa {
  height: 200px;
}
h3 {
  padding: 20px 0 20px 15px;
}
.billMaList {
  padding: 0 20px;
}
.billMaList2 {
  box-sizing: border-box;
}
.cit {
  width: 30%;
}
.shop2 {
  margin: 0 4px;
}
.transferManage .TongYi {
  width: 55%;
}
.transferManage .sotlname {
  width: 54%;
}
.sotlname2 {
  width: 55.5%;
}
.colright2 {
  text-align: center;
}
.colright {
  text-align: right;
}
.cit,
.TongYi,
.sotlname,
.sotlname2 {
  display: inline-block;
}
.transferManage .el-range-editor.el-input__inner {
  width: 100%;
}
/* #billInput{
    text-align: left;
    width: 100%;
    padding-bottom: 20px;
} */
/* #billInput tr{
    width: 100%;
}
#billInput .barNum{
    width: 30%;
    text-align: center;
}
#billInput .pinName{
    width: 30%;
    text-align: right;
}
#billInput .el-range-editor.el-input__inner{
    width: 300px;
} */
.createDay {
  letter-spacing: 2.8px;
}
.storinp {
  width: 56%;
}
p {
  display: inline-block;
  width: 67%;
}
.btnfloat {
  float: right;
  margin-right: 8px;
}
.zanweis {
  height: 20px;
}
/*弹出框样式*/
.boxshow {
  width: 100%;
}
.chooseStor {
  text-align: left;
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 15px;
}
.listInfo {
  text-align: left;
  width: 100%;
}
.listInfo .listSty,
.listInfo .listSty2 {
  display: inline-block;
}
.listInfo .listSty {
  width: 40%;
}
.ceng .QUE {
  /* background: #3acd59;
  color: #fff; */
}
.ceng .QUE:hover {
  /* background: #ecf5ff;
  color: #3acd59; */
}
.dalogTab {
  width: 100%;
}

.dalogTab tbody tr:hover {
  background: #dcf9fc;
}
.addBtn > .el-button {
  margin: 0;
  padding: 8px 18px;
  border-radius: 6px;
  color: #fff;
}
#transferManage .el-radio__inner {
  border: 1px solid #8a8484;
}
</style>
