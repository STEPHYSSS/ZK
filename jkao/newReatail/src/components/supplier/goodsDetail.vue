<template>
  <div class="goodsDetail">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
            <el-breadcrumb-item :to="{ path: '/operatIndex' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>详情</el-breadcrumb-item>
    </el-breadcrumb>-->
    <img src="@/assets/Rbutton.png" @click="goback" class="CouponbtnbackC" />
    <div class="detail_box">
      <div class="foodsBox">
        <el-tabs @tab-click="handleClick" v-model="activeName">
          <el-tab-pane label="1基本信息" name="first">
            <div style="width:100%">
              <el-row>
                <el-col :span="6">
                  <i>*</i>
                  <span>商品分类：</span>
                  <p>{{detailInfo.typeLevel1}}/{{detailInfo.typeLevel2}}/{{detailInfo.typeLevel3}}</p>
                </el-col>
                <el-col :span="6">
                  <i>*</i>
                  <span>商品名称：</span>
                  <p>{{detailInfo.name}}</p>
                </el-col>
                <el-col :span="6">
                  <i class="red">*</i>
                  <span>国际条码：</span>
                  <p>{{detailInfo.barcode}}</p>
                </el-col>
                <el-col :span="6">
                  <span>
                    <i>*</i>单位：
                  </span>
                  <p>{{detailInfo.unit}}</p>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <i>*</i>
                  <span>
                    温
                    <em></em>层：
                  </span>
                  <p class="firstP">{{detailInfo.temperature}}</p>
                </el-col>
                <el-col :span="6">
                  <i>*</i>
                  <span>保质期：</span>
                  <p v-if="detailInfo.periodUnit == '永久'">{{detailInfo.periodUnit}}</p>
                  <p v-else>{{detailInfo.period}}{{detailInfo.periodUnit}}</p>
                </el-col>
                <el-col :span="6">
                  <i>*</i>
                  <span>
                    规
                    <em></em>格：
                  </span>
                  <p style="width:205px">{{detailInfo.spec}}</p>
                </el-col>
                <el-col :span="6">
                  <span>
                    <i class="red">*</i>等级：
                  </span>
                  <p>{{detailInfo.level}}</p>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <!-- <i class="red">*</i><span>产<em></em>地:</span> -->
                  <i class="red">*</i>
                  <span>
                    产
                    <em></em>地：
                  </span>
                  <p>{{detailInfo.placeOfProduction}}</p>
                </el-col>
                <!-- <el-col :span="6">
                  <span>
                    <i class="start startpp">*</i>上架商城：
                  </span>
                  <p class="mallradio">
                    <span v-if="detailInfo.shopUp =='Y'">是</span>
                    <span v-else-if="detailInfo.shopUp =='N'">否</span>
                  </p>
                </el-col> -->
              </el-row>
            </div>
          </el-tab-pane>
          <el-tab-pane label="2供应商信息" name="second">
            <div>
              <h3>供应商关联关系</h3>
              <el-table :data="tableData" border style="width: 45.3%">
                <el-table-column align="center" prop label="主供应商">
                  <template>是</template>
                </el-table-column>
                <el-table-column align="center" prop="code" label="供应商编号"></el-table-column>
                <el-table-column align="center" prop="name" label="供应商名称"></el-table-column>
              </el-table>
            </div>
            <div>
              <h3>供应商物流信息</h3>
              <el-table :data="tableData2" style="width: 90%" border>
                <el-table-column align="center" prop="date" label="主供应商">
                  <template>是</template>
                </el-table-column>
                <el-table-column align="center" prop="code" label="供应商编号"></el-table-column>
                <el-table-column align="center" prop="name" label="供应商名称"></el-table-column>
                <el-table-column align="center" prop="purchase" label="采购中心"></el-table-column>
                <el-table-column align="center" prop="logistics" label="物流中心"></el-table-column>
                <el-table-column align="center" prop="arrivalCycle" label="到货周期（天）"></el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="3订购信息" name="third">
            <div class="tabList">
              <el-table :data="tableData3" border style="width: 90%">
                <el-table-column align="center" prop="salesPrice" label="商品售价"></el-table-column>
                <el-table-column align="center" label="生效日期">
                  <template scope="scope">{{scope.row.createTime|converTime('YYYY-MM-DD')}}</template>
                </el-table-column>
                <el-table-column align="center" prop="expirationDate" label="失效日期">
                  <template>永久</template>
                </el-table-column>
              </el-table>
              <el-table :data="tableData3" border style="width: 90%">
                <el-table-column align="center" prop="purchasePrice" label="商品进价"></el-table-column>
                <el-table-column align="center" label="生效日期">
                  <template scope="scope">{{scope.row.createTime|converTime('YYYY-MM-DD')}}</template>
                </el-table-column>
                <el-table-column align="center" prop="expirationDate" label="失效日期">
                  <template>永久</template>
                </el-table-column>
              </el-table>
              <el-table :data="tableData3" border style="width: 90%">
                <el-table-column align="center" prop="orderingUtil" label="基本订购单位"></el-table-column>
                <el-table-column align="center" prop="minOrderingMultiple" label="最小订倍数"></el-table-column>
                <el-table-column align="center" prop="maxOrderingMultiple" label="最大订购倍数"></el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <!-- <el-tab-pane label="4商品详情" name="fourth">
            <div class="imgInfoBox">
              <div class="img1">
                <div class="imgLeft">
                  <p>商城列表图:</p>
                </div>
                <div class="imgRight">
                  <ul>
                      <img :src="listImg" class="imgWit"  @click="readImageList(listImg)"/>
                    <el-dialog
                      :visible.sync="dialogVisible"
                      :modal-append-to-body="false"
                      center
                      width="800px"
                      style="z-index: 99999"
                    >
                      <img width="100%" :src="dialogImageUrl" />
                    </el-dialog>
                  </ul>
                </div>
              </div>
              <div class="img1">
                <div class="imgLeft">
                  <p>商城详情图:</p>
                </div>
                <div class="imgRight imgRight2">
                  <ul>
                    <li v-for="(item,index) in listDetailImg" :key="index" class="inline">
                      <img :src="item" alt @click="readImage(index,item)" class="detialList" />
                    </li>
                    <el-dialog
                      :visible.sync="dialogVisible1"
                      :modal-append-to-body="false"
                      center
                      width="800px"
                      style="z-index: 99999"
                    >
                      <img width="100%" :src="dialogImageUrl"/>
                    </el-dialog>
                  </ul>
                </div>
              </div>
              <div class="konge"></div>
              <div class="img1">
                <div class="imgLeft">
                  <p>商品详情:</p>
                </div>
                <div class="imgRight" style="max-width:50%;z-index:555;">
                  <p v-html="detailInfo.goodsDetail"></p>
                </div>
              </div>
            </div>
          </el-tab-pane> -->
        </el-tabs>

        <!-- <el-button style="margin-top: 12px;" @click="next">下一步</el-button> -->
      </div>
    </div>
  </div>
</template>
<script src="../../router/wangEditor.js"></script>
<script>
import qs from "qs";
import { log } from "util";
import Editor from "wangeditor";
export default {
  name: "addGoods",
  data() {
    return {
      active: 0,
      activeName: "first",
      detailInfo: {},
      tableData: [],
      tableData2: [],
      tableData3: [],
      dialogVisible: false,
      dialogVisible1: false,
      // dialogImageUrl: "",
      // listImg: "",
      // listDetailImg: []
    };
  },
  created() {
    this.detail();
  },
  mounted() {
    this.editor = new Editor("#editor");
    this.editor.customConfig.uploadImgShowBase64 = true;
    this.editor.customConfig.showLinkImg = false;
    // this.editor.customConfig.onchange = html => {
    //  this.Editor.txt.html(_this.detailInfo.goodsDetail);
    // };
    this.editor.create();
  },
  methods: {
    handleClick(tab, event) {},
    // 详情
    detail() {
      const _this = this;
      let token = _this.$route.params.token;
      let code = _this.$route.params.code;
      _this
        .$axios({
          url: window.apiUrl + "goods/info",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            token: sessionStorage.getItem("token"),
            code: sessionStorage.getItem("shopDeCo")
          })
        })
        .then(res => {
          const {
            code,
            data: { goods, supplier }
          } = res.data;
          if (code == "0000") {
            _this.detailInfo = goods;
            // if (_this.detailInfo.listImage != null) {
            //   _this.listImg = JSON.parse(_this.detailInfo.listImage);
            // }
            // let url = "http://192.168.1.168:8080"
            // _this.listImg = url +  _this.detailInfo.listImage;
            // _this.listImg = _this.uploadUrl + _this.detailInfo.listDetailImg;
            // if (_this.detailInfo.detailImage != null || _this.detailInfo.detailImage !="") {
            //   _this.listDetailImg = JSON.parse(_this.detailInfo.detailImage);
            // }
            // this.editor.txt.html(res.data.data.goods.goodsDetail)
            _this.tableData.push(supplier);
            _this.tableData2.push(supplier);
            _this.tableData3.push(goods);
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
        .catch(err => {});
    },
    goback() {
      this.$router.push({
        name:'shopmanagement'
      })
    },
    //查看大图
    readImage(index, item) {
      this.dialogVisible1 = true;
      this.dialogImageUrl = item;
    },
    readImageList(listImg){
      this.dialogVisible = true;
      this.dialogImageUrl = listImg;
    }
  }
};
</script>
<style scoped>
.goodsDetail {
  background-color: #fff;
  min-height: 647px;
  min-width: 1700px;
  height: 100%;
}
.goodsDetail h3 {
  margin-top: 10px;
  font-size: 14px;
  margin-bottom: 20px;
}
.nav {
  display: inline-block;
}
.btnback {
  width: 80px;
  height: 30px;
}
.btnback {
  text-decoration: none;
  /* display: inline-block; */
  width: 80px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  background-color: #fff;
  color: #01c8dc;
  border: 1px solid #01c8dc;
  border-radius: 5px;
  float: right;
  margin-right: 2%;
}
.btnback:hover {
  background-color: #01c8dc;
  color: #fff;
}
.detail_box {
  background: #fff;
  border-radius: 10px;
}
.foodsBox {
  margin-left: 30px;
  margin-right: 30px;
  padding: 20px 0px;
  box-sizing: border-box;
}
table,
table tr th,
table tr td {
  border: 1px solid #c6c6c6;
}
table {
  border-collapse: collapse;
}
table th {
  background-color: #01c8dc;
  color: #fff;
}

.info,
span,
p {
  display: inline-block;
  height: 32px;
}
.mallradio {
  text-align: left;
}
em {
  display: inherit;
  width: 24px;
}
i {
  color: red;
}
.red {
  color: #fff;
}
.tabList {
  margin-left: 100px;
}
.CouponbtnbackC {
  text-decoration: none;
  margin-right: 20px;
  float: right;
  cursor: pointer;
  margin-top: 13px;
}
/* 商城上传图片样式 */
.img1 {
  display: flex;
  margin-bottom: 10px;
  justify-content: flex-start;
}
.imgLeft {
  /* flex: 1; */
  width: 150px;
  text-align: center;
}
.imgRight2{
  width: 650px;
}
.imgRight ul li {
  float: left;
  width: 150px;
  height: 150px;
  margin-right: 10px;
  /* border: 1px solid #01c8dc; */
}
.imgWit{
  /* width: 32%;
  height: 100%; */
  width: 150px;
  height: 150px;
}
.detialList{
  width: 100%;
  cursor: pointer;
}
</style>


