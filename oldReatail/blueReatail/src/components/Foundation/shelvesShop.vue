<template>
  <div class="sheShops minWidth1600">
    <div class="areaBox">
      <div class="rece_Box">
        <h3 class="demonstration">货位商品关联</h3>
        <el-row class="rowSpacing">
          <el-col :span="6">
            <div>
              <span class="textTitle70px">货位编号：</span>
              <el-input class="input1" type="text" placeholder="请输入" v-model="locationCode"></el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <span class="textTitle70px">库区名称：</span>
              <el-input class="input1" type="text" placeholder="请输入" v-model="regionName"></el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <span class="textTitle70px textTitleR">品名：</span>
              <el-input class="input1" type="text" v-model="goodsNameLike" placeholder="请输入"></el-input>
            </div>
          </el-col>
          <el-col :span="6" class="textAlignRight">
            <div>
              <span class="textTitle70px textTitleR">货号：</span>
              <el-input class="input1" type="text" placeholder="请输入" v-model="goodsCode"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row class="rowSpacing">
          <el-col :span="6">
            <div>
              <span class="textTitle70px">所属仓库：</span>
              <p class="TongYiInput">
                <el-select placeholder="请选择" v-model="warehouseCode">
                  <el-option
                    v-for="item in options"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </p>
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
              <el-button class="theBtn resetButton" @click="reseting">重置</el-button>
            </div>
          </el-col>
        </el-row>
            <div class="addBtnBox">
              <div class="serchBoxBtn70 ">
                <el-button class="increase themeColor textMright" @click="newIncrease">
                  <i class="el-icon-plus"></i>新增
                </el-button>
                <el-button class="increase themeColor" @click="delRow">
                  <i class="el-icon-delete"></i>&nbsp;删除
                </el-button>
              </div>
          </div>
      </div>
      <div class="areainfo">
          <el-table
            :data="tableData"
            style="width: 100%;"
            @selection-change="handleSelectionChange2"
            @select-all="selectAll"
            border
            max-height="600"
          >
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="locationCode" label="货位编号" align="center"></el-table-column>
            <el-table-column prop="regionName" label="库区名称" align="center"></el-table-column>
            <el-table-column prop="name" label="品名" align="center"></el-table-column>
            <el-table-column prop="code" label="货号" align="center"></el-table-column>
            <el-table-column prop="unit" label="单位" align="center"></el-table-column>
            <el-table-column prop="spec" label="规格" align="center"></el-table-column>
            <el-table-column label="保质期" align="center">
              <template scope="scope">{{scope.row.period}}{{scope.row.periodUnit}}</template>
            </el-table-column>
            <el-table-column label="创建时间" align="center">
              <template scope="scope">
                <span
                  v-if="scope.row.bindTime !=null"
                >{{scope.row.bindTime | converTime('YYYY-MM-DD')}}</span>
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
  name: "sheShops",
  data() {
    return {
      locationCode: "",
      regionName: "",
      goodsNameLike: "",
      goodsCode: "",
      warehouseCode: "",
      options: [],
      tableData: [],
      multipleSelection2: [],
      pageNum: 1,
      pageSize: 20,
      total: 0
    };
  },
  created() {
    this.getSheShop();
    this.showother();
  },
  methods: {
    newIncrease() {
      this.$router.push({
        name: "shelveshopAdd"
      });
    },
    getSheShop() {
      this.$axios({
        url: window.apiWare + "shelves/location/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: sessionStorage.getItem("token"),
          locationCode: this.locationCode,
          regionName: this.regionName,
          goodsNameLike: this.goodsNameLike,
          goodsCode: this.goodsCode,
          warehouseCode: this.warehouseCode,
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
        if ((res.data.code = "0000")) {
          this.options = res.data.data.list;
        }
      });
    },
    // 查询 重置
    chaxun() {
      this.getSheShop();
    },
    reseting() {
      this.locationCode = "";
      this.regionName = "";
      this.goodsNameLike = "";
      this.goodsCode = "";
      this.warehouseCode = "";
      this.getSheShop();
    },
    //单条 和 全选
    handleSelectionChange2(val) {
      this.multipleSelection2 = val.map(item => {
        return item.shelvesId;
      });
    },
    selectAll(selection) {
      this.multipleSelection2 = selection.map(item => {
        return item.shelvesId;
      });
    },
    // 删除
    delRow() {
      if (this.multipleSelection2.length === 0) {
        this.$message.error("请勾选需要删除的信息");
        return false;
      }
      this.$axios({
        url: window.apiWare + "shelves/location/delete",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: sessionStorage.getItem("token"),
          idSet: JSON.stringify(this.multipleSelection2)
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.getSheShop();
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
     // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getSheShop(this.pageNum, val);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getSheShop(val, this.pageSize);
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
.sheShops {
  /* background-color: #f1f6fa; */
  min-height: 647px;
  min-width: 1200px;
}
.areainfo {
   padding-bottom: 40px;
   padding-top: 10px;
 }
.areaBox,
.areainfo {
  background: #fff;
}
.sheShops .rece_Box {
  margin: 0 20px;
  height: 200px;
}
.sheShops .nav {
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
.sheShops .demonstration {
  padding-top: 20px;
  padding-bottom: 20px;
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
.wsListsearch {
  text-align: right;
  margin-bottom: 10px;
}
.areainfo .el-dialog {
  width: 500px;
}
.zanweiN {
  display: inline-block;
  width: 28px;
}
#delShop {
  background-color: #fff;
  border: 1px solid #01c8dc;
  color: #01c8dc;
  float: right;
  margin: 0;
  height: 30px;
  line-height: 10px;
  width: 90px;
  margin-left: 10px;
  text-align: right;
}
.posi {
  position: relative;
  display: inline-block;
}
.delicon {
  position: absolute;
  top: 7px;
  left: 27px;
  width: 17px;
}
</style>

