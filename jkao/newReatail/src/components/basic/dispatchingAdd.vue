<template>
  <div id="dispatchingAdd" class="minWidth1600 minimum">
    <div class="content1">
       <div class="detailBackBtn" v-show="!this.$route.query.id">
        <router-link :to="{ path: '/dispatchingList' }">
          <img src="@/assets/returnbutton.png" alt />
        </router-link>
      </div>
      <h3 v-if="this.$route.query.id">路线编辑</h3>
      <h3 v-else>路线新增</h3>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        label-position="right"
        class="demoRuleForm"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="路线名称：" prop="name">
              <el-input class="input1" v-model="ruleForm.name" maxlength="50"></el-input>
            </el-form-item>
            <el-form-item label="仓库名称：" prop="warehouseCode">
              <el-select type="text" v-model="ruleForm.warehouseCode" class="input1">
                <el-option
                  v-for="(item,index) in warwHouseData"
                  :key="index"
                  :label="item.name"
                  :value="item.code"
                  placeholder="请选择门店类型"
                ></el-option>
              </el-select>
              <!-- <el-select placeholder="请选择" class="input1">
                <el-option label="所有仓库" value="1"></el-option>
              </el-select>-->
            </el-form-item>
            <el-form-item label="负责人：" text-align="right">
              <el-input class="input1" v-model="ruleForm.contacts" maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="联系方式：">
              <el-input
                v-model="ruleForm.contactPhone"
                type="text"
                maxlength="11"
                class="input1"
                onkeyup="this.value=this.value.replace(/\D/g,'')"
              ></el-input>
            </el-form-item>
            <el-button class="themeColor" @click="choosestore">配送门店</el-button>
          </el-col>
        </el-row>
      </el-form>
      <!-- 选择门店 -->
      <div class="tab" v-if="flag1">
        <el-table :data="selectGoodsList" max-height="450" style="width: 100%" border>
          <el-table-column align="center" prop="code" label="门店编号"></el-table-column>
          <el-table-column align="center" prop="name" label="门店名称"></el-table-column>
          <el-table-column align="center" label="所在区域">
            <template scope="scope">
              <span>{{scope.row.province}}-{{scope.row.city}}-{{scope.row.area}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="配送顺序">
            <template slot-scope="{row, $index}">
              <input
                @input="oninput1(row['orderBy'], $index)"
                onkeyup="this.value=this.value.replace(/\D/g,'')"
                class="inputStyle"
                maxlength="5"
                v-model="row['orderBy']"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template scope="scope">
              <span class="codesty" @click="shopDel(scope.$index,scope.row.code)">删除</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="billsearch1">
          <el-button class="theBtn queryButton" @click="queding('ruleForm')">确定</el-button>
          <el-button class="theBtn resetButton" @click="returnPage">返回</el-button>
        </div>
      </div>
      <el-dialog title="选择门店" :visible.sync="dialogTableVisible" width="950px">
        <div class="billMaList">
          <el-row class="rowSpacing">
            <el-col :span="8">
              <div>
                <span class="textTitle70px">门店名称：</span>
                <el-input class="dialogInput"  type="text" v-model="shopList.name" placeholder="请输入"></el-input>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <span class="textTitle70px">门店编号：</span> 
                <el-input class="dialogInput"  type="text" v-model="shopList.code" placeholder="请输入"></el-input>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="textAlignRight">
                <el-button @click="chaxun" class="theBtn queryButton">查询</el-button>
                <el-button class="theBtn resetButton" @click="reset">重置</el-button>
              </div>
            </el-col>
          </el-row>
          

          <el-table
            :data="shopData"
            ref="multipleTable"
            style="width: 100%;"
            max-height="250"
            @select="sOption"
            @select-all="selectAll"
            border
          >
            <el-table-column type="selection" width="55" class="leftTitle"></el-table-column>
            <el-table-column label="门店编号" align="center" class="codesty">
              <template scope="scope">
                <span>{{scope.row.code}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="门店名称" align="center"></el-table-column>
            <el-table-column label="所在区域" align="center">
              <template scope="scope">{{scope.row.province}}-{{scope.row.city}}-{{scope.row.area}}</template>
            </el-table-column>
            <el-table-column label="详细地址" align="center" prop="address"></el-table-column>
          </el-table>
          <div class="dialogSureBox textAlignRight">
            <el-button class="theBtn themeColor textMright" @click="amountShop">确定</el-button>
            <el-button class="theBtn resetButton " @click="dialogTableVisible=false">取消</el-button>
          </div>
          <div class="dialog_pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="shopList.pageNum"
              :page-sizes="[20, 40, 60, 80]"
              :page-size="shopList.pageSize"
              background
              layout="total, sizes, prev, pager, next, jumper"
              :total="shopDataTotal"
              class="pagination"
            ></el-pagination>
          </div>
          
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  data() {
    return {
      ruleForm: {
        warehouseCode: "",
        name: "",
        contacts: "",
        contactPhone: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请填写路线名称",
            trigger: "blur"
          }
        ],
        warehouseCode: [
          { required: true, message: "请选择仓库", trigger: "change" }
        ]
      },
      dialogTableVisible: false,
      warwHouseData: [],

      shopData: [], // 门店数组
      shopDataTotal: 0,
      dialogTableVisible: false,
      shopList: {
        pageNum: 1,
        pageSize: 20,
        code: "",
        name: ""
      },
      flag1: false,
      selectGoodsList: [],
      delList: [],
      orderByList: [],
      storeSet: []
    };
  },
  created() {
    this.getWareHouseList();
    this.getlist();
    this.getDetail();
  },
  computed: {
    newClist() {
      return this.shopData.filter(item => {
        return this.delList.find(i => item.code === i);
      });
    }
  },
  methods: {
    //编辑请求数据
    getDetail() {
      this.$axios
        .post(
          "/warehouse/route/detail",
          qs.stringify({
            token: sessionStorage.getItem("token"),
            id: this.$route.query.id
          })
        )
        .then(res => {
          if (res.data.code == "0000") {
            this.ruleForm = res.data.data.route;
            this.selectGoodsList = res.data.data.storeSet.map(item => {
              return {
                code: item.storeCode,
                name: item.storeName,
                province: item.province,
                city: item.city,
                area: item.area,
                orderBy: item.orderBy
              };
            });
            this.flag1 = true;
          }
        });
    },
    getWareHouseList() {
      this.$axios
        .post(
          "/public/warehouse/list",
          qs.stringify({
            pageSize: 999999999
          })
        )
        .then(res => {
          if (res.data.code == "0000") {
            this.warwHouseData = res.data.data.list;
          }
        });
    },
    queding() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.selectGoodsList.length < 1)
            return this.$message.error("请选择配送门店");
          for (const i of this.selectGoodsList) {
            if (!i.orderBy) {
              return this.$message.error("请输入配送顺序");
            }
          }
          this.storeSet = this.selectGoodsList.map(item => {
            return {
              storeCode: item.code,
              orderBy: item.orderBy
            };
          });
          if (this.$route.query.id) {
            this.$axios
              .post(
                "/warehouse/route/update",
                qs.stringify({
                  token: sessionStorage.getItem("token"),
                  id: this.$route.query.id,
                  warehouseCode: this.ruleForm.warehouseCode,
                  name: this.ruleForm.name,
                  storeSet: JSON.stringify(this.storeSet),
                  contacts: this.ruleForm.contacts,
                  contactPhone: this.ruleForm.contactPhone
                })
              )
              .then(res => {
                if (res.data.code == "0000") {
                  this.$router.push({
                    name: "dispatchingList"
                  });
                } else {
                  this.$message.error(res.data.msg);
                }
              });
          } else {
            this.$axios
              .post(
                "/warehouse/route/add",
                qs.stringify({
                  token: sessionStorage.getItem("token"),
                  warehouseCode: this.ruleForm.warehouseCode,
                  name: this.ruleForm.name,
                  storeSet: JSON.stringify(this.storeSet),
                  contacts: this.ruleForm.contacts,
                  contactPhone: this.ruleForm.contactPhone
                })
              )
              .then(res => {
                if (res.data.code == "0000") {
                  this.$router.push({
                    name: "dispatchingList"
                  });
                } else {
                  this.$message.error(res.data.msg);
                }
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    returnPage() {
      this.$router.push({
        name: "dispatchingList"
      });
    },
    chaxun() {
      this.getlist();
    },
    reset() {
      this.shopList.name = "";
      this.shopList.code = "";
      this.getlist();
    },
    amountShop() {
      this.dialogTableVisible = false;
      this.flag1 = true;
    },

    getlist() {
      this.$axios
        .post("/public/store/list", qs.stringify(this.shopList))
        .then(res => {
          if (res.data.code == "0000") {
            this.shopData = res.data.data.list;
            this.shopDataTotal = res.data.data.total;
            this.shopData.forEach((item, index) => {
              this.shopData[index]["orderBy"] = null;
            });
            if (this.$refs.multipleTable) {
              this.shopData.forEach((item, index) => {
                this.selectGoodsList.forEach((i, index2) => {
                  if (item.code == i.code) {
                    item.flag = true;
                    this.$nextTick(() => {
                      this.$refs.multipleTable.toggleRowSelection(
                        this.shopData[index],
                        true
                      );
                    });
                  }
                });
              });
            }
          } else if (res.data.code == "6666") {
            this.$message({
              showClose: true,
              message: "token异常，请重新登录",
              type: "error"
            });
          }else return this.$message.error(res.data.msg)
        });
    },
    oninput1(orderBy, index) {
      let count = 0;
      if (orderBy) {
        this.selectGoodsList.forEach((item, index) => {
          if (item.orderBy == orderBy) {
            count++;
          }
        });
        if (count === 2) {
          this.$message.error("请重新输入顺序");
        }
      }
    },
    choosestore() {
      this.dialogTableVisible = true;
      this.getlist();
      // console.log(this.delList);
      this.newClist.forEach(item =>
        this.$nextTick(() => {
          item.flag = false;
          this.$refs.multipleTable.toggleRowSelection(item, false);
        })
      );
      this.delList = [];
    },
    shopDel(index, code) {
      this.delList.push(code);
      this.selectGoodsList.splice(index, 1);
    },
    // 获取门店当前选择的行
    sOption(selection, row) {
      if (row.flag) {
        row.flag = false;
      } else {
        row.flag = true;
      }
      if (row.flag) {
        this.selectGoodsList.forEach((item, index) => {
          if (item.code == row.code) {
            this.selectGoodsList.splice(index, 1);
          }
        });
        this.selectGoodsList.push(row);
      } else {
        this.selectGoodsList.forEach((item, index) => {
          if (item.code == row.code) {
            this.selectGoodsList.splice(index, 1);
          }
        });
      }
    },
    //门店全选
    selectAll(selection) {
      this.shopData.forEach((item, index) => {
        if (selection.length == 0) {
          item["flag"] = false;
        } else {
          item["flag"] = true;
        }
      });
      this.selectGoodsList = selection;
    },
    // 查询门店每页的数据
    handleSizeChange(val) {
      this.shopList.pageSize = val;
      this.getlist(); //
    },
    // // 门店当前页码
    handleCurrentChange(val) {
      this.shopList.pageNum = val;
      this.getlist();
    }
  }
};
</script>
<style scoped>
#dispatchingAdd .nav {
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
#dispatchingAdd .content1 {
  background-color: #fff;
  min-height: 600px;
  padding-top: 15px;
}
.demoRuleForm {
  padding: 0px 20px;
}
.tab {
  padding: 10px 0;
}
#dispatchingAdd .billsearch1 {
  text-align: center;
  margin-top: 15px;
}
#dispatchingAdd .billMaList {
  padding-left: 35px;
  padding-right: 30px;
}
#dispatchingAdd #billInput {
  width: 100%;
}
#dispatchingAdd .pinName {
  text-align: left;
}
#dispatchingAdd .inputConent {
  display: inline-block;
}
#dispatchingAdd .billsearch {
  text-align: right;
}
#dispatchingAdd .number {
  border-radius: 5px;
  border: 1px solid #b5adad;
  height: 20px;
  width: 55px;
  outline: none;
}
h3 {
  padding: 0px 0 20px 20px;
}
</style>

