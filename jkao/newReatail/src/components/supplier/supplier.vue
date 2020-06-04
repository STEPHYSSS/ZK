<template>
  <div class="suppWrapper">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
      <el-breadcrumb-item :to="{ path: '/operatIndex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>新增</el-breadcrumb-item>
    </el-breadcrumb>-->
    <!-- <button class="CouponbtnbackCC" @click="goback">返回</button> -->
    <img src="@/assets/Rbutton.png" @click="goback" class="CouponbtnbackC" />
    <div class="supplier">
      <p class="store_tit">新增</p>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane name="first">
          <span slot="label">
            <i>1</i> 基本信息
          </span>
          <div id="supplieradd2">
            <el-row style="white-space: nowrap;">
              <el-col :span="6">
                <span>
                  <i class="start startpp">*</i>商品分类：
                </span>
                <p class="widOne">
                  <el-select v-model="tabForm.typeLevel1" placeholder="请选择" @change="choose">
                    <el-option
                      v-for="(item,index) in TypeLevel1"
                      :key="index"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </p>
                <p class="widOne">
                  <el-select v-model="tabForm.typeLevel2" placeholder="请选择" @change="choose2">
                    <el-option
                      v-for="(item,index) in TypeLevel2"
                      :key="index"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </p>
                <p class="widOne">
                  <el-select v-model="tabForm.typeLevel3" placeholder="请选择">
                    <el-option
                      v-for="(item,index) in TypeLevel3"
                      :key="index"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </p>
              </el-col>
              <el-col :span="6" class="TongCenter">
                <span>
                  <i class="start startpp">*</i>商品名称：
                </span>
                <p>
                  <el-input v-model="tabForm.name"></el-input>
                </p>
              </el-col>
              <el-col :span="6" class="TongCenter">
                <span>国际条码：</span>
                <p>
                  <el-input v-model="tabForm.barcode" maxlength="22"></el-input>
                </p>
              </el-col>
              <el-col :span="6" class="TongRight">
                <span>
                  <i class="start startpp">*</i>单
                  <em class="emStyle"></em>位：
                </span>
                <p>
                  <el-select v-model="tabForm.unit" placeholder="请选择">
                    <el-option
                      v-for="(item,index) in unitArr"
                      :key="index"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </p>
              </el-col>
            </el-row>
            <div class="konge"></div>
            <el-row style="white-space: nowrap;">
              <el-col :span="6">
                <span>
                  <i class="start startpp">*</i>温
                  <em class="emStyle"></em>层：
                </span>
                <p>
                  <el-select v-model="tabForm.temperature" placeholder="请选择">
                    <el-option
                      v-for="(item,index) in options"
                      :key="index"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </p>
              </el-col>
              <el-col :span="6" class="TongCenter">
                <span class="lett">
                  <i class="start startpp">*</i>保质期：
                </span>
                <p class="baozhiq1">
                  <el-input
                    v-model="tabForm.period"
                    oninput="value=value.replace(/[^\d]/g,'')"
                  ></el-input>
                </p>
                <p class="baozhiq2">
                  <el-select v-model="tabForm.periodUnit" @change="perment">
                    <el-option
                      v-for="(item,index) in perUnit"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </p>
              </el-col>
              <el-col :span="6" class="TongCenter">
                <span>
                  <i class="start startpp">*</i>规
                  <em class="emStyle"></em>格：
                </span>
                <p>
                  <el-input v-model="tabForm.spec"></el-input>
                </p>
              </el-col>
              <el-col :span="6" class="TongRight">
                <span>
                  等
                  <em class="emStyle"></em>级：
                </span>
                <p>
                  <el-select v-model="tabForm.level" placeholder="请选择">
                    <el-option
                      v-for="(item,index) in goodsLevel"
                      :key="index"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </p>
              </el-col>
            </el-row>
            <div class="konge"></div>
            <el-row style="white-space: nowrap;">
              <el-col :span="6">
                <span>
                  <i class="start1">*</i>产
                  <em class="emStyle"></em>地：
                </span>
                <p>
                  <el-select v-model="tabForm.placeOfProduction">
                    <el-option
                      v-for="(item,index) in place"
                      :key="index"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </p>
              </el-col>
              <!-- <el-col :span="6" class="TongCenter">
                <span>
                  <i class="start startpp">*</i>上架商城：
                </span>
                <p class="mallradio">
                  <el-radio v-model="tabForm.shopUp" label="Y">是</el-radio>
                  <el-radio v-model="tabForm.shopUp" label="N">否</el-radio>
                </p>
              </el-col> -->
              <el-col :span="18" class="TongRight">
                <el-button @click="next('ruleForm')" class="chaxunBtn">下一步</el-button>
              </el-col>
            </el-row>
            <div class="konge"></div>
          </div>
        </el-tab-pane>
        <el-tab-pane name="second">
          <span slot="label">
            <i>2</i> 供应商信息
          </span>
          <el-button class="AllquedingBtn" @click="chooseShow">选择供应商</el-button>
          <div v-if="n1" class="bigshow">
            <div class="show">
              <div class="konge"></div>
              <h3 class="chooseS">选择供应商</h3>
              <el-row style="width: 95%;margin:0 auto">
                <el-col :span="9">
                  <el-form :inline="true" :model="supp" class="demo-form-inline">
                    <el-form-item label="供应商编码">
                      <p>
                        <el-input placeholder="请输入" v-model="supp.code" clearable></el-input>
                      </p>
                    </el-form-item>
                  </el-form>
                </el-col>
                <el-col :span="9">
                  <el-form :inline="true" :model="tabForm" class="demo-form-inline">
                    <el-form-item label="供应商名称">
                      <p>
                        <el-input placeholder="请输入" v-model="supp.name" clearable></el-input>
                      </p>
                    </el-form-item>
                  </el-form>
                </el-col>
                <el-col :span="6" class="TongRight">
                  <el-button class="theBtn queryButton" @click="chaxun">查询</el-button>
                  <el-button class="theBtn resetButton" @click="chongzhi">重置</el-button>
                </el-col>
              </el-row>
              <el-table
                highlight-current-row
                id="hiegLine"
                ref="multipleTable"
                :data="tableData3"
                height="243"
                border
                style="width: 95%;margin:0 auto"
                @current-change="handleSelectionChange"
              >
                <el-table-column label="供应商编号" prop="code" align="center"></el-table-column>
                <el-table-column prop="name" label="供应商名称" align="center"></el-table-column>
                <el-table-column prop="type" label="类型" show-overflow-tooltip align="center"></el-table-column>
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
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total"
                  class="pagination"
                ></el-pagination>
              </div>
              <div class="m">
                <el-button class="AllquedingBtn" @click="nextclick()">确定</el-button>
                <el-button class="theBtn resetButton" plain @click="fanhui">返回</el-button>
              </div>
            </div>
          </div>
          <div v-if="n2">
            <div class="top">
              <h4>供应商关联关系</h4>
              <el-table :data="arr" style="width: 70%">
                <el-table-column align="center" label="主供应商">
                  <template>是</template>
                </el-table-column>
                <el-table-column align="center" prop="code" label="供应商编号"></el-table-column>
                <el-table-column align="center" prop="name" label="供应商名称"></el-table-column>
                <el-table-column align="center" label="操作">
                  <template scope="scope">
                    <p class="codesty" @click="del(scope.row.code)">删除</p>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="bottom">
              <h4>供应商物流信息</h4>
              <el-table :data="arr" style="width: 70%">
                <el-table-column align="center" prop="date" label="主供应商">
                  <template>是</template>
                </el-table-column>
                <el-table-column align="center" prop="code" label="供应商编号"></el-table-column>
                <el-table-column align="center" prop="name" label="供应商名称"></el-table-column>
                <el-table-column align="center" prop="purchase" label="采购中心"></el-table-column>
                <el-table-column align="center" prop="logistics" label="物流中心"></el-table-column>
                <el-table-column align="center" prop="arrivalCycle" label="到货周期（天）"></el-table-column>
              </el-table>
              <div class="twobb">
                <el-button class="chaxunBtn" @click="next2()">下一步</el-button>
                <el-button class="chongzhiBtn" @click="back">上一步</el-button>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane name="third">
          <span slot="label">
            <i>3</i> 订购信息
          </span>
          <el-form
            :inline="true"
            :model="tabForm"
            :rules="rules"
            ref="ruleForm"
            label-width="110px"
            class="demo-ruleForm"
          >
            <el-row>
              <el-col :span="6">
                <el-form-item label="商品售价:" prop="salesPrice">
                  <p>
                    <el-input
                      v-model="tabForm.salesPrice "
                      class="fff"
                      oninput = "value=value.replace(/[^\d.]/g,'').replace(/\.{2,}/g,'.').replace(/^\./g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.').replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')"
                    ></el-input>
                  </p>
                </el-form-item>
              </el-col>
              <el-col :span="6" class="TongCenter">
                <el-form-item label="商品进价:" prop="purchasePrice">
                  <p>
                    <el-input
                    type="number"
                      v-model.number="tabForm.purchasePrice"
                      class="fff"
                      oninput = "value=value.replace(/[^\d.]/g,'').replace(/\.{2,}/g,'.').replace(/^\./g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.').replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')"
                    ></el-input>
                  </p>
                </el-form-item>
              </el-col>
              <el-col :span="6" class="TongCenter">
                <el-form-item label="基本订购单位:" prop="orderingUtil">
                  <p>
                    <el-input
                      v-model="tabForm.orderingUtil"
                      class="fff" maxlength="2"
                      oninput="value=value.replace(/[^\d]/g,'').replace(/^0{1,}/g,'')"
                    ></el-input>
                  </p>
                </el-form-item>
              </el-col>
              <el-col :span="6" class="TongRight">
                <el-form-item label="最小订购倍数:" prop="minOrderingMultiple">
                  <p>
                    <el-input
                      v-model="tabForm.minOrderingMultiple"
                      class="fff" maxlength="2"
                      oninput="value=value.replace(/[^\d]/g,'').replace(/^0{1,}/g,'')"
                    ></el-input>
                  </p>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="最大订购倍数:" prop="maxOrderingMultiple">
                  <p>
                    <el-input
                      v-model="tabForm.maxOrderingMultiple"
                      class="fff" maxlength="2"
                      oninput="value=value.replace(/[^\d]/g,'').replace(/^0{1,}/g,'')"
                    ></el-input>
                  </p>
                </el-form-item>
              </el-col>
              <el-col :span="18" class="TongRight">
                <!-- <el-button
                  type="primary"
                  class="AllquedingBtn"
                  @click="success('ruleForm')"
                >确&nbsp; 定</el-button> -->
                <!-- <el-button class="chaxunBtn" @click="next3()">下一步</el-button> -->
                <el-button type="primary" class="AllquedingBtn" @click="success('ruleForm')">确&nbsp; 定</el-button>
                <el-button type="primary" class="chongzhiBtn" @click="backUp">上一步</el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <!-- <el-tab-pane name="fourth">
          <span slot="label">
            <i>4</i> 商品详情
          </span>
          <div class="imgWrapper">
            <div class="img1">
              <div class="imgLeft">商城列表图</div>
              <div class="imgRight">
                <el-upload
                  :action="`${this.uploadUrl}/image/upload`"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview1"
                  :on-remove="handleRemove1"
                  :on-success="onSuccess1"
                  :before-upload="beforeUpload1"
                  :on-change="astrict1"
                  :data="data1"
                  name="files"
                  accept=".jpg, .jpeg, .png, .JPG, .JPEG"
                  :file-list="fileList1"
                  :show-file-list="true"
                  :limit="limitCount"
                  :class="{hide:hideUpload}"
                >
                  <i class="el-icon-plus"></i>                  
                </el-upload>
                <span style="color:red">图片(建议上传图片尺寸335×257，单张2M以内，仅限一张)</span>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt />
                </el-dialog>
              </div>              
            </div>
            <div class="img1">
              <div class="imgLeft">商城详情图</div>
              <div class="imgRight">
                <el-upload
                  :action="`${this.uploadUrl}/image/upload`"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview2"
                  :on-remove="handleRemove2"
                  :on-success="onSuccess2"
                  :before-upload="beforeUpload2"
                  :on-change="astrict2"
                  :data="data1"
                  name="files"
                  accept=".jpg, .jpeg, .png, .JPG, .JPEG"
                  :file-list="fileList2"
                  :show-file-list="true"
                  :limit="limitCount2"
                  :class="{hide:hideUpload2}"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
                <span style="color:red">图片(建议上传图片尺寸750×750，单张2M以内，最多五张)</span>
                <el-dialog :visible.sync="dialogVisible2">
                  <img width="100%" :src="dialogImageUrl2" alt />
                </el-dialog>
              </div>
            </div>
            <div class="img1">
              <div class="imgLeft">商品详情</div>
              <div class="imgRight" id="editor" style="max-width:50%;z-index:555;">
              </div>
            </div>
            <div class="konge"></div>
            <el-row>
              <el-col class="TongRight">
                <el-button
                  type="primary"
                  class="AllquedingBtn"
                  @click="success('ruleForm')"
                >确&nbsp; 定</el-button>
                <el-button type="primary" class="chongzhiBtn" @click="backUp3">上一步</el-button>
              </el-col>
            </el-row>
            <div class="konge"></div>
          </div>
        </el-tab-pane> -->
      </el-tabs>
    </div>
  </div>
</template>
<script src="../../router/wangEditor.js"></script>
<script>
import qs from "qs";
import Editor from "wangeditor";
export default {
  data() {
    return {
      activeName: "first",
      editor: "",
      tabForm: {
        token: "",
        typeLevel1: "", //商品类型
        typeLevel2: "",
        typeLevel3: "",
        name: "",
        barcode: "", //国际条码
        unit: "", //单位
        temperature: "", //温层
        period: "", //保质期
        periodUnit: "", //保质期日期
        spec: "", //规格
        level: "", //等级
        placeOfProduction: "", //产地
        supplierCode: "", //供应商编码
        salesPrice: "", //售价
        purchasePrice: "", //进价
        orderingUtil: "", //订购单位
        minOrderingMultiple: "", //最小订购倍数
        maxOrderingMultiple: "", //最大订购倍数
        // listImage: "", //列表图片
        // detailImage:[],// 详情图片
        // shopUp: "N",
        // goodsDetail:""
      },
      dialogImageUrl: "", //图片
      dialogVisible: false,
      TypeLevel1: [], //商品类型
      TypeLevel2: [],
      TypeLevel3: [],
      options: [], //温层下拉选
      unitArr: [], //单位下拉选
      place: [], //产地下拉选
      perUnit: [
        {
          value: "小时",
          label: "小时"
        },
        {
          value: "天",
          label: "天"
        },
        {
          value: "月",
          label: "月"
        },
        {
          value: "年",
          label: "年"
        }
      ], //保质期日期
      goodsLevel: [],
      supp: {
        code: "",
        name: "",
        token: sessionStorage.getItem("token"),
        pageNum: 1,
        pageSize: 20,
        total: 0
      },
      arr: [],
      n1: false, //供应商弹框展示
      n2: false, //供应商关联表格展示
      tableData3: [],
      multipleSelection: [],
      checked: true,
      // 分页
      pageNum: 1,
      pageSize: 20,
      total: 0,
      rules: {
        salesPrice: [
          { required: true, message: "请输入商品售价", trigger: "change" }
        ],
        purchasePrice: [
          { required: true, message: "请输入商品进价", trigger: "change" }
        ],
        orderingUtil: [
          { required: true, message: "请输入订购数量", trigger: "change" }
        ],
        minOrderingMultiple: [
          { required: true, message: "请输入订购数量", trigger: "change" }
        ],
        maxOrderingMultiple: [
          { required: true, message: "请输入订购数量", trigger: "change" }
        ]
      },
      // 商城图片
      // data1: {
      //   token: sessionStorage.getItem("token")
      // },
      // limitCount: 1, //张数
      // hideUpload: false,
      // dialogImageUrl: "",
      // dialogVisible: false,
      // fileList1: [],
      // fileSizeIsSatisfy: true,
      // // 商品详情张数
      // limitCount2: 5, //张数
      // hideUpload2: false,
      // dialogImageUrl2: "",
      // dialogVisible2: false,
      // fileList2: [],
    };
  },
  created() {
    this.setTable();
    this.showother();
    this.Leavel();
    this.placeList();
    this.showUnit();
    // 进入页面就执行商品类型列表
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
  mounted() {
    // var E = window.wangEditor;
    // var editor = new Editor("#editor");
    // editor.customConfig.showLinkImg = false;
    // editor.create();
    // editor.txt.html(); //富文本内容

    this.editor = new Editor('#editor');
    this.editor.customConfig.uploadImgShowBase64 = true;
    this.editor.customConfig.showLinkImg = false;
    this.editor.customConfig.onchange = (html) => {
      this.tabForm.goodsDetail = html
    }
    this.editor.create()
  },
  methods: {
    handleClick(tab, event) {},
    perment() {
      if (this.tabForm.periodUnit == "永久") {
        this.tabForm.period = "";
      }
    },
    // 展示供应商列表
    suppierList(pageNum) {
      let token = sessionStorage.getItem("token");
      this.$axios({
        url: window.baseUrl+"public/supplier/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify(this.supp)
      })
        .then(res => {
          if (res.data.code == "0000") {
            this.tableData3 = res.data.data.list;
            this.total = res.data.data.total;
          }
        })
        .catch(err => {
          console.log("数据异常", err);
        });
    },
    chooseShow() {
      this.n1 = true;
      this.n2 = false;
      this.suppierList();
    },
    // 查询
    chaxun() {
      this.suppierList();
    },
    chongzhi() {
      this.supp.code = "";
      this.supp.name = "";
      this.suppierList();
    },
    // //供应商分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.suppierList(this.pageNum, val);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.suppierList(val, this.pageSize);
    },
    fanhui() {
      this.n1 = false;
    },
    // 温层下拉选
    showother() {
      let _this = this;
      let token = sessionStorage.getItem("token");
      let code = "goods_temperature";
      _this
        .$axios({
          url: window.apiUrl + "dictionary/list",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            token: token,
            code: code
          })
        })
        .then(res => {
          if ((res.data.code = "0000")) {
            _this.options = res.data.data;
          }
        })
        .catch(err => {
          console.log("数据异常", err);
        });
    },
    showUnit() {
      let code = "goods_unit";
      this.$axios({
        url: window.apiUrl + "dictionary/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: sessionStorage.getItem("token"),
          code: code
        })
      }).then(res => {
        if ((res.data.code = "0000")) {
          this.unitArr = res.data.data;
        }
      });
    },
    placeList() {
      let _this = this;
      let token = sessionStorage.getItem("token");
      let code = "goods_place_of_production";
      _this
        .$axios({
          url: window.apiUrl + "dictionary/list",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            token: token,
            code: code
          })
        })
        .then(res => {
          if ((res.data.code = "0000")) {
            this.place = res.data.data;
          }
        })
        .catch(err => {
          console.log("数据异常", err);
        });
    },
    // 等级下拉选
    Leavel() {
      let _this = this;
      let token = sessionStorage.getItem("token");
      let code = "goods_level";
      _this
        .$axios({
          url: window.apiUrl + "dictionary/list",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            token: token,
            code: code
          })
        })
        .then(res => {
          if ((res.data.code = "0000")) {
            this.goodsLevel = res.data.data;
          }
        })
        .catch(err => {
          console.log("数据异常", err);
        });
    },
    // change事件
    choose(value) {
      this.tabForm.typeLevel2 = "";
      this.tabForm.typeLevel3 = "";
      this.TypeLevel3 = [];
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
      this.tabForm.typeLevel3 = "";
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
    nextclick() {
      if (this.arr == "") {
        this.$message.error("请选择供应商信息");
      } else {
        this.n2 = true;
        this.n1 = false;
      }
    },
    //把element-ui里面的复选框改成单选框
    setTable() {
      let resdata = [];
      // 后台数据返回后,手动添加一个checked属性控制选中与否
      resdata.forEach(item => {
        item.checked = false;
      });
      this.tableData3 = resdata;
    },
    next(formName) {
      if (!this.tabForm.typeLevel1) return this.$message("请选择商品分类");
      if (!this.tabForm.name)
        return this.$message("请输入商品名称，不超过50个字");
      if (!this.tabForm.unit) return this.$message("请选择单位");
      if (!this.tabForm.temperature) return this.$message("请选择温层");
      // if(!this.tabForm.period) return this.$message('请选择保质期');
      if (!this.tabForm.spec) return this.$message("请输入规格，不超过20个字");
      this.activeName = "second";
    },
    next2() {
      this.activeName = "third";
    },
    next3() {
      this.activeName = "fourth";
    },
    // 返回第一个Tab
    back() {
      this.activeName = "first";
    },
    //返回第二个Tab
    backUp() {
      this.activeName = "second";
    },
    // backUp3(){
    //   this.activeName = "third";
    // },
    del(code) {
      this.n2 = false;
    },
    // 提交
    success(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.tabForm.supplierCode = this.arr[0].code;
          let token = sessionStorage.getItem("token");
          this.tabForm.token = token;
          this.$axios({
            url: window.apiUrl + "goods/insert",
            method: "POST",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            data: qs.stringify({
              token: this.tabForm.token,
              typeLevel1: this.tabForm.typeLevel1, //商品类型
              typeLevel2: this.tabForm.typeLevel2,
              typeLevel3: this.tabForm.typeLevel3,
              name: this.tabForm.name,
              barcode: this.tabForm.barcode, //国际条码
              unit: this.tabForm.unit, //单位
              temperature: this.tabForm.temperature, //温层
              period: this.tabForm.period, //保质期
              periodUnit: this.tabForm.periodUnit, //保质期日期
              spec: this.tabForm.spec, //规格
              level: this.tabForm.level, //等级
              placeOfProduction: this.tabForm.placeOfProduction, //产地
              supplierCode: this.tabForm.supplierCode, //供应商编码
              salesPrice: this.tabForm.salesPrice, //售价
              purchasePrice: this.tabForm.purchasePrice, //进价
              orderingUtil: this.tabForm.orderingUtil, //订购单位
              minOrderingMultiple: this.tabForm.minOrderingMultiple, //最小订购倍数
              maxOrderingMultiple: this.tabForm.maxOrderingMultiple //最大订购倍数
              // listImage: this.tabForm.listImage, //图片
              // detailImage:JSON.stringify(this.tabForm.detailImage),//详情图片
              // shopUp: this.tabForm.shopUp,
              // goodsDetail:this.tabForm.goodsDetail
            })
          })
            .then(res => {
              if (res.data.code == "0000") {
                this.$router.push({ name: "shopmanagement" });
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
            .catch(err => {
              console.log("数据异常", err);
            });
        } else {
          return false;
        }
      });
    },
    handleSelectionChange(val) {
      this.arr[0] = val;
    },
    goback() {
      this.$router.push({
        name:'shopmanagement'
      })
    },
    // 商城上传图片
    astrict1(file, fileList) {
      this.hideUpload = fileList.length >= this.limitCount;
    },
    handleRemove1(file, fileList) {
            this.hideUpload = fileList.length >= this.limitCount;
            if (file.response) {
                this.tabForm.listImage = file.response.data;
            }
        },
    handlePictureCardPreview1(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    onSuccess1(response, file, fileList) {
            if (file.response) {
                this.tabForm.listImage = file.response.data;
            }
        },
    beforeUpload1(file) {
      if (file.size > 2 * 1024 * 1024) {
        return this.$message.error(file.name + "图片超过2M 不允许上传");
      }
    },
    // 详情图片
    astrict2(file, fileList) {
      this.hideUpload2 = fileList.length >= this.limitCount2;
    },
    handleRemove2(file, fileList) {
      this.hideUpload2 = fileList.length >= this.limitCount2;
      this.tabForm.detailImage = [];
      if (fileList.length > 0) {
        fileList.forEach(item => {
          this.tabForm.detailImage.push(item.response.data);
        });
      }
    },
    handlePictureCardPreview2(file) {
      this.dialogImageUrl2 = file.url;
      this.dialogVisible2 = true;
    },
    onSuccess2(response, file, fileList) {
      this.tabForm.detailImage = [];
      fileList.forEach(item => {
        this.tabForm.detailImage.push(item.response.data);
      });
    },
    beforeUpload2(file) {
      if (file.size > 2 * 1024 * 1024) {
        return this.$message.error(file.name + "图片超过2M 不允许上传");
      }
    }
  }
};
</script>

<style scoped>
.suppWrapper {
  background-color: #fff;
  min-height: 647px;
  min-width: 1700px;
  height: 100%;
  box-shadow: 0px 2px 10px #ccc;
}
.suppWrapper .supplier {
  padding: 0px 20px;
  background: #fff;
  font-size: 12px;
  border-radius: 4px;
  min-height: 647px;
  box-sizing: border-box;
}
.el-tabs__nav-wrap::after {
  width: 330px;
}
.el-tabs__item i {
  background-color: #c2c2c2;
  padding: 0 5px;
  border-radius: 50%;
}
.show {
  width: 95%;
  margin: 0 auto;
  border: 1px solid #ccc;
  box-shadow: 0px 2px 10px #ccc;
  border-radius: 4px;
}
.m {
  text-align: center;
  margin-bottom: 20px;
}
.show .el-button--success {
  margin-top: 5px;
}
.show .el-row {
  height: 40px;
}
.twob {
  padding-left: 70px;
  text-align: right;
}
.bigshow {
  margin: 20px auto;
  width: 70%;
}
.top h4,
.bottom h4 {
  font-size: 14px;
  margin-bottom: 20px;
}
.top {
  margin-bottom: 20px;
  margin-top: 20px;
}
.supplier .el-form-item {
  width: 100%;
}
.textBtnCenter {
  text-align: center;
}
#supplieradd2 .el-select .el-input .el-select__caret {
  margin-top: 5px;
}
#supplieradd2 .el-select {
  width: 100%;
}
.store_tit {
  padding-top: 20px;
  padding-bottom: 20px;
  font-size: 14px;
  font-weight: 900;
}
p {
  display: inline-block;
  width: 300px;
}
.widOne {
  width: 93.3px;
}
.widOne:nth-child(3) {
  margin: 0 10px;
}

.emStyle {
  display: inline-block;
  width: 21px;
}
.lett {
  letter-spacing: 2.5px;
}
.baozhiq1 {
  width: 210px;
  padding-right: 10px;
}
.baozhiq2 {
  width: 80px;
}
.start {
  color: red;
}
.startpp {
  margin-left: -1px;
}

.start1 {
  color: #fff;
}
.CouponbtnbackC {
  margin-right: 20px;
  text-decoration: none;
  border-radius: 5px;
  float: right;
  cursor: pointer;
  margin-top: 13px;
}
/* 弹窗部分样式 */
.chooseS {
  margin-left: 30px;
}
.suppWrapper .el-button {
  /* margin: 0 10px 0 0; */
  padding: 10px 14px;
}
.suppWrapper .paginStyle {
  height: 50px;
  text-align: right;
  width: 95%;
  margin: 0 auto;
}
.bottom .twobb {
  text-align: left;
  margin-top: 20px;
}
.chaxunBtn {
  background-color: #434444;
  color: #fff;
  border: none;
}

.chongzhiBtn {
  background-color: #fff;
  color: #444444;
  border: 1px solid #555555;
  margin-left: 10px;
}

.chaxunBtn,
.chongzhiBtn {
  width: 69px;
  height: 32px;
  border-radius: 5px;
  line-height: 10px;
}

.chaxunBtn,
.chongzhiBtn:hover {
  cursor: pointer;
}
.mallradio {
  text-align: left;
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
.imgRight {
  /* flex: 12; */
}
</style>
