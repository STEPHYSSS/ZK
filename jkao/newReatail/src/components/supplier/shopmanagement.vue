<template>
  <div class="shopmanagement">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
        <el-breadcrumb-item :to="{ path: '/operatIndex' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item >商品管理</el-breadcrumb-item>
    </el-breadcrumb>-->
    <div class="dingdanRece">
      <div class="dingdanflexBox">
        <!-- 查询框部分 -->
        <p class="store_tit">商品管理</p>
        <el-row style="white-space: nowrap;">
          <el-col :span="6">
            <span>商品分类：</span>
            <p class="widOne">
              <el-select
                v-model="formInline.typeLevel1"
                size="mini"
                placeholder="请选择"
                @change="choose"
              >
                <el-option
                  v-for="item in TypeLevel1"
                  :key="item.value"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </p>
            <p class="widOne">
              <el-select
                v-model="formInline.typeLevel2"
                size="mini"
                placeholder="请选择"
                @change="choose2"
              >
                <el-option
                  v-for="item in TypeLevel2"
                  :key="item.value"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </p>
            <p class="widOne">
              <el-select v-model="formInline.typeLevel3" size="mini" placeholder="请选择">
                <el-option
                  v-for="item in TypeLevel3"
                  :key="item.value"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </p>
          </el-col>
          <el-col :span="6" class="TongCenter">
            <span>
              状
              <em class="emSpace"></em>态：
            </span>
            <p>
              <el-select v-model="formInline.status" size="mini" placeholder="请选择">
                <el-option
                  v-for="item in check"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </p>
          </el-col>
          <el-col :span="6" class="TongCenter">
            <span>
              货
              <em class="emSpace"></em>号：
            </span>
            <p>
              <el-input type="text" placeholder="请输入货号" v-model="formInline.goodsCode" />
            </p>
          </el-col>
          <el-col :span="6" class="TongRight">
            <span>
              品
              <em class="emSpace"></em>名：
            </span>
            <p>
              <el-input type="text" placeholder="请输入" v-model="formInline.goodsName" />
            </p>
          </el-col>
        </el-row>
        <div class="konge"></div>
        <el-row>
          <el-col :span="6">
            <span>国际条码：</span>
            <p>
              <el-input type="text" placeholder="请输入" v-model="formInline.barcode" />
            </p>
          </el-col>
          <el-col :span="6" class="TongCenter">
            <span>供应商编号：</span>
            <p>
              <el-input type="text" placeholder="请输入" v-model="formInline.supplierCode" />
            </p>
          </el-col>
          <el-col :span="6" class="TongCenter">
            <span>供应商名称：</span>
            <p>
              <el-input type="text" placeholder="请输入" v-model="formInline.supplierName" />
            </p>
          </el-col>
          <el-col :span="6" class="TongRight">
            <el-button class="theBtn queryButton" @click="selection">查询</el-button>
            <el-button class="theBtn resetButton" @click="resetForm">重置</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="dingdanMain">
        <div class="addStore">
          <router-link to="/supplier">
            <!-- <img src="@/assets/addBtn.png" alt /> -->
            <el-button class="increase themeColor">
              <i class="el-icon-plus"></i>新增
            </el-button>
          </router-link>
        </div>
        <el-table :data="tableData" style="width: 100%" border height="100%">
          <el-table-column prop="code" label="货号" align="center"></el-table-column>
          <el-table-column prop="barcode" label="国际条码" align="center"></el-table-column>
          <el-table-column prop="name" label="品名" align="center">
            <template slot-scope="scope">
              <span class="codesty" @click="nameDetail(scope.row.code)">{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="typeLevel" label="商品分类" align="center">
            <template
              slot-scope="scope"
            >{{scope.row.typeLevel1}}/{{scope.row.typeLevel2}}/{{scope.row.typeLevel3}}</template>
          </el-table-column>
          <el-table-column prop="unit" label="单位" align="center"></el-table-column>
          <el-table-column prop="spec" label="规格" align="center"></el-table-column>
          <el-table-column label="门店状态" align="center">
            <template scope="scope">
              <span v-if="scope.row.status == 1">已上架</span>
              <span v-else>已下架</span>
            </template>
          </el-table-column>
          <el-table-column label="更新时间" align="center">
            <template scope="scope">
              <span
                v-if="scope.row.updateTime !=null"
              >{{scope.row.updateTime | converTime('YYYY-MM-DD')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template scope="scope">
              <el-tooltip class="item codesty" effect="dark" content="编辑" placement="bottom">
                <img
                  src="@/assets/xiugai_icon.png"
                  @click="editShop(scope.row.code)"
                  class="imgSize"
                />
              </el-tooltip>
              <el-tooltip
                class="item codesty"
                effect="dark"
                content="上架"
                placement="bottom"
                v-if="scope.row.status=='0'"
              >
                <img src="@/assets/derive_icon.png" @click="up(scope.row.code)" class="imgSize" />
              </el-tooltip>
              <el-tooltip
                class="item codesty"
                effect="dark"
                content="下架"
                placement="bottom"
                v-else-if="scope.row.status=='1'"
              >
                <img src="@/assets/shangjia_icon.png" @click="up(scope.row.code)" class="imgSize" />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <div class="paginStyle fenyedignwei">
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
  data() {
    return {
      formInline: {
        token: sessionStorage.getItem("token"),
        typeLevel1: "",
        typeLevel2: "",
        typeLevel3: "",
        status: "",
        goodsCode: "",
        goodsName: "",
        barcode: "",
        supplierCode: "",
        supplierName: "",
        pageNum: 1,
        pageSize: 20,
        total: 0
      },
      check: [
        {
          label: "已上架",
          value: "1"
        },
        {
          label: "已下架",
          value: "0"
        }
      ], //商品状态
      TypeLevel1: [], //商品类型
      TypeLevel2: [],
      TypeLevel3: [],
      currentPage4: 4,
      tableData: [],
      n1: false,
      n2: true,
      n3: true,
      n4: false,
      // 分页
      pageNum: 1,
      pageSize: 20,
      total: 0
    };
  },
  created() {
    this.getenter(this.pageNum);
  },
  mounted() {
    // 进入页面就执行商品类型列表
    let that = this;
    let token = sessionStorage.getItem("token");
    this.$axios({
      url: window.apiUrl + "goods/type/list",
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify({
        pcode: "0",
        token: token
      })
    })
      .then(res => {
        if (res.data.code == "0000") {
          this.TypeLevel1 = res.data.data;
        }
      })
      .catch(err => {
        console.log("数据异常", err);
      });
  },
  methods: {
    getenter(pageNum) {
      const _this = this;
      _this
        .$axios({
          url: window.apiUrl + "goods/list",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify(_this.formInline)
        })
        .then(res => {
          if (res.data.code == "0000") {
            _this.tableData = res.data.data.list;
            _this.total = res.data.data.total;
            const { list } = res.data.data;
            for (let i = 0; i < list.length; i++) {
              _this.typeLevel = list[i];
            }
          } else if (res.data.code == "6666") {
            this.$message({
              showClose: true,
              message: "token异常，请重新登录",
              type: "error"
            });
          } else {
            this.$message.error(res.data.msg);
          }
        })
    },
    // change事件
    choose(value) {
      this.formInline.typeLevel2 = "";
      this.formInline.typeLevel3 = "";
      let token = sessionStorage.getItem("token");
      this.$axios({
        url: window.apiUrl + "goods/type/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          pcode: value,
          token: token
        })
      })
        .then(res => {
          if (res.data.code == "0000") {
            this.TypeLevel2 = res.data.data;
          }
        })
        .catch(err => {
          console.log("数据异常", err);
        });
    },
    // 下拉change事件
    choose2(value) {
      this.formInline.typeLevel3 = "";
      let token = sessionStorage.getItem("token");
      this.$axios({
        url: window.apiUrl + "goods/type/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          pcode: value,
          token: token
        })
      })
        .then(res => {
          if (res.data.code == "0000") {
            this.TypeLevel3 = res.data.data;
          }
        })
        .catch(err => {
          console.log("数据异常", err);
        });
    },
    // 查询
    selection() {
      this.getenter();
    },
    // 重置
    resetForm() {
      this.formInline.typeLevel1 = "";
      this.formInline.typeLevel1 = "";
      this.formInline.typeLevel2 = "";
      this.formInline.typeLevel3 = "";
      this.formInline.status = "";
      this.formInline.goodsCode = "";
      this.formInline.goodsName = "";
      this.formInline.barcode = "";
      this.formInline.supplierCode = "";
      this.formInline.supplierName = "";
      this.getenter();
    },
    // 详情
    nameDetail(code) {
      let token = sessionStorage.getItem("token");
      sessionStorage.setItem("shopDeCo", code);
      this.$router.push({
        name: "goodsDetail",
        params: {
          code: sessionStorage.getItem("shopDeCo"),
          token: token
        }
      });
    },
    // 上架下架
    up(code) {
      let token = sessionStorage.getItem("token");
      this.$axios({
        url: window.apiUrl + "goods/status/modify",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          code: code,
          token: token
        })
      })
        .then(res => {
          if (res.data.code == "0000") {
            this.getenter();
          } else if (res.data.code == "6666") {
            this.$message({
              showClose: true,
              message: "token异常，请重新登录",
              type: "error"
            });
          } else {
            this.$message.error(res.data.msg);
          }
        })
    },
    // 编辑
    editShop(code) {
      this.$router.push({
        name: "newseditor",
        query: {
          code: code
        }
      });
    },
    handleSizeChange(val) {
      this.formInline.pageSize = val;
      this.getenter(this.pageNum, val);
    },
    handleCurrentChange(val) {
      this.formInline.pageNum = val;
      this.getenter(val, this.pageSize);
    },
    enter() {
      this.n1 = true;
      this.n4 = true;
    },
    leave() {
      this.n1 = false;
      this.n4 = false;
    },
    click(index, row) {
      this.n3 = this.n3 ? false : true;
      this.n4 = true;
    },
    enter2() {
      this.n2 = true;
    },
    leave2() {
      this.n2 = false;
    }
  }
};
</script>

<style scoped>
.shopmanagement {
  background-color: #fff;
  min-height: 647px;
  min-width: 1700px;
  height: 100%;
  box-sizing: border-box;
  box-shadow: 0px 2px 10px #ccc;
}
.shopmanagement .dingdanRece {
  font-size: 12px;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.dingdanflexBox {
  height: 200px;
  margin: 0 20px;
  box-sizing: border-box;
}
.dingdanMain {
  flex: 1;
  -webkit-box-flex: 1;
  position: relative;
  margin-bottom: 90px;
  max-height: 600px;
}
.fenyedignwei {
  position: absolute;
  bottom: -90px;
  right: 0;
}
.shopmanagement .el-range-editor.el-input__inner {
  width: 100%;
}
.shopmanagement .el-select {
  width: 100%;
}
p {
  display: inline-block;
  width: 300px;
}
.shopmanagement .emSpace {
  display: inline-block;
  width: 29px;
}
.widOne {
  width: 93.3px;
}
.widOne:nth-child(3) {
  margin: 0 10px;
}
</style>
