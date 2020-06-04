<template>
  <div class="editWrapper">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
      <el-breadcrumb-item :to="{ path: '/operatIndex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item >商品管理</el-breadcrumb-item>
      <el-breadcrumb-item >编辑</el-breadcrumb-item>
    </el-breadcrumb>-->
    <div class="editInfo">
      <el-button class="theBtn resetButton" @click="goback">返回</el-button>
      <div class="margingBo"></div>
      <el-button class="AllquedingBtn" @click="success('ruleForm')">保存</el-button>
    </div>
    <div class="supplier">
      <el-tabs v-model="activeName">
        <el-tab-pane name="first">
          <span slot="label">
            <i>1</i> 基本信息
          </span>
          <div id="supplieradd">
            <el-row style="white-space: nowrap;">
              <el-col :span="6">
                <span>
                  <i class="start startpp">*</i>商品分类：
                </span>
                <p class="widOne">
                  <el-select v-model="ruleForm.typeLevel1" placeholder="请选择" @change="choose">
                    <el-option
                      v-for="(item,index) in TypeLevel1"
                      :key="index"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </p>
                <p class="widOne">
                  <el-select v-model="ruleForm.typeLevel2" placeholder="请选择" @change="choose2">
                    <el-option
                      v-for="(item,index) in TypeLevel2"
                      :key="index"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </p>
                <p class="widOne">
                  <el-select v-model="ruleForm.typeLevel3" placeholder="请选择">
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
                  <el-input v-model="ruleForm.name"></el-input>
                </p>
              </el-col>
              <el-col :span="6" class="TongCenter">
                <span>国际条码：</span>
                <p>
                  <el-input v-model="ruleForm.barcode"></el-input>
                </p>
              </el-col>
              <el-col :span="6" class="TongRight">
                <span>
                  <i class="start startpp">*</i>单
                  <em class="emStyle"></em>位：
                </span>
                <p>
                  <el-select v-model="ruleForm.unit" placeholder="请选择">
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
                  <el-select v-model="ruleForm.temperature" placeholder="请选择">
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
                    v-model="ruleForm.period"
                    :disabled="ruleForm.periodUnit=='永久'"
                    oninput="value=value.replace(/[^\d]/g,'')"
                  ></el-input>
                </p>
                <p class="baozhiq2">
                  <el-select v-model="ruleForm.periodUnit" @change="perment">
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
                  <el-input v-model="ruleForm.spec"></el-input>
                </p>
              </el-col>
              <el-col :span="6" class="TongRight">
                <span>
                  等
                  <em class="emStyle"></em>级：
                </span>
                <p>
                  <el-select v-model="ruleForm.level" placeholder="请选择">
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
                  <el-select v-model="ruleForm.placeOfProduction">
                    <el-option
                      v-for="(item,index) in place"
                      :key="index"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </p>
              </el-col>
              <el-col :span="6" class="TongCenter">
                <span>
                  <i class="start startpp">*</i>上架商城：
                </span>
                <p class="mallradio">
                  <el-radio v-model="ruleForm.shopUp" label="Y">是</el-radio>
                  <el-radio v-model="ruleForm.shopUp" label="N">否</el-radio>
                </p>
              </el-col>
              <el-col :span="12" class="TongRight">
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
          <el-button type="success" @click="clickshow" v-if="hide">选择供应商</el-button>
          <div v-if="showTab" class="bigshow">
            <div class="show">
              <el-row style="width: 100%;margin:0 auto">
                <el-col :span="6">
                  <el-form :inline="true" :model="supp" class="demo-form-inline">
                    <el-form-item label="供应商编码">
                      <el-input placeholder="请输入内容" v-model="supp.code" clearable></el-input>
                    </el-form-item>
                  </el-form>
                </el-col>
                <el-col :span="6">
                  <el-form :inline="true" :model="ruleForm" class="demo-form-inline">
                    <el-form-item label="供应商名称">
                      <el-input placeholder="请输入内容" v-model="supp.name" clearable></el-input>
                    </el-form-item>
                  </el-form>
                </el-col>
                <el-col :span="4">
                  <el-button class="theBtn queryButton">查询</el-button>
                </el-col>
              </el-row>
            </div>
            <el-table
              ref="multipleTable"
              :data="tableData3"
              highlight-current-row
              id="hiegLine"
              style="width: 100%;"
              border
              height="500"
              @current-change="handleSelectionChange"
            >
              <el-table-column label="供应商编号" prop="code" align="center"></el-table-column>
              <el-table-column prop="name" label="供应商名称" align="center"></el-table-column>
              <el-table-column prop="type" label="类型" show-overflow-tooltip align="center"></el-table-column>
            </el-table>
            <div class="konge"></div>
            <div class="storepagebtn">
              <el-button type="primary" class="AllquedingBtn" @click="nextclick">确定</el-button>
              <el-button class="theBtn resetBotton" plain @click="fanhui">返回</el-button>
            </div>
            <div class="konge"></div>
          </div>
          <!-- 进来就展示的 -->
          <div v-if="hide2">
            <div>
              <h3>供应商关联关系</h3>
              <el-table :data="tableData" style="width: 70%">
                <el-table-column align="center" label="主供应商">
                  <template>是</template>
                </el-table-column>
                <el-table-column align="center" prop="code" label="供应商编号"></el-table-column>
                <el-table-column align="center" prop="name" label="供应商名称"></el-table-column>
                <el-table-column align="center" label="操作">
                  <template scope="scope">
                    <p @click="del(scope.row.code)" class="codesty">删除</p>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div>
              <h3>供应商物流信息</h3>
              <el-table :data="tableData" style="width: 90%">
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
          </div>
          <div class="konge"></div>
          <div class="twobb">
            <el-button class="chaxunBtn" @click="next2()">下一步</el-button>
            <el-button class="chongzhiBtn" @click="back">上一步</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane name="third">
          <span slot="label">
            <i>3</i> 订购信息
          </span>
          <el-form
            :inline="true"
            :model="ruleForm"
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
                      v-model="ruleForm.salesPrice "
                      class="fff"
                      oninput="value=value.replace(/[^\d.]/g, '').replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')"
                    ></el-input>
                  </p>
                </el-form-item>
              </el-col>
              <el-col :span="6" class="TongCenter">
                <el-form-item label="商品进价:" prop="purchasePrice">
                  <p>
                    <el-input
                      v-model="ruleForm.purchasePrice"
                      class="fff"
                      oninput="value=value.replace(/[^\d.]/g, '').replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')"
                    ></el-input>
                  </p>
                </el-form-item>
              </el-col>
              <el-col :span="6" class="TongCenter">
                <el-form-item label="基本订购单位:" prop="orderingUtil">
                  <p>
                    <el-input
                      v-model="ruleForm.orderingUtil"
                      class="fff"
                      oninput="value=value.replace(/[^\d]/g,'')"
                    ></el-input>
                  </p>
                </el-form-item>
              </el-col>
              <el-col :span="6" class="TongRight">
                <el-form-item label="最小订购倍数:" prop="minOrderingMultiple">
                  <p>
                    <el-input
                      v-model="ruleForm.minOrderingMultiple"
                      maxlength="2"
                      class="fff"
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
                      v-model="ruleForm.maxOrderingMultiple"
                      maxlength="2"
                      class="fff"
                      oninput="value=value.replace(/[^\d]/g,'').replace(/^0{1,}/g,'')"
                    ></el-input>
                  </p>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="textBtnCenter">
              <el-button class="chaxunBtn" @click="next3()">下一步</el-button>
              <el-button type="primary" class="chongzhiBtn" @click="backUp">上一步</el-button>
              <!-- <el-button type="primary" @click="success('ruleForm')">确&nbsp; 定</el-button> -->
              <!-- <el-button type="primary" plain @click="backUp">上一步</el-button> -->
            </div>
          </el-form>
        </el-tab-pane>
        <el-tab-pane name="fourth">
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
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  :on-success="onSuccess"
                  :before-upload="beforeUpload"
                  :on-change="astrict"
                  :data="data1"
                  name="files"
                  accept=".jpg, .jpeg, .png, .JPG, .JPEG"
                  :file-list="fileList"
                  :show-file-list="true"
                  :limit="limitCount"
                  :class="{hide:hideUpload}"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
                <span style="color:red">图片(建议上传图片尺寸335×257，单张2M以内，仅限一张)</span>
                <el-dialog :visible.sync="dialogVisible" style="z-index:99999">
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
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script src="../../router/wangEditor.js"></script>
<script>
import qs from "qs";
import { log } from "util";
import Editor from "wangeditor";
export default {
  data() {
    return {
      activeName: "first",
      ruleForm: {
        token: sessionStorage.getItem("token"),
        code: this.$route.query.code,
        typeLevel1: "", //商品类型
        typeLevel2: "",
        typeLevel3: "",
        name: "",
        barcode: "", //国际条码
        unit: "", //单位
        temperature: "", //温层
        period: "", //保质期
        periodUnit: "", //保质期单位
        spec: "", //规格
        level: "", //等级
        placeOfProduction: "", //产地
        supplierCode: "", //供应商编码
        salesPrice: "", //售价
        purchasePrice: "", //进价
        orderingUtil: "", //订购单位
        minOrderingMultiple: "", //最小订购倍数
        maxOrderingMultiple: "", //最大订购倍数
        listImage: "", //列表图片
        detailImage: [], // 详情图片
        shopUp: "N",
        goodsDetail: ""
      },
      // 商城图片
      data1: {
        token: sessionStorage.getItem("token")
      },
      limitCount: 1,
      hideUpload: false,
      fileList: [],
      fileSizeIsSatisfy: true,
      dialogImageUrl: "",
      dialogVisible: false,
      // 详情图片
      limitCount2: 5,
      hideUpload2: false,
      fileList2: [],
      fileSizeIsSatisfy: true,
      dialogImageUrl2: "",
      dialogVisible2: false,
      // 商城图片结束
      tableData: [],
      tableData3: [], //选择供应商
      TypeLevel1: [], //商品类型
      TypeLevel2: [],
      TypeLevel3: [],
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
        },
        {
          value: "永久",
          label: "永久"
        }
      ], //保质期日期
      goodsLevel: [],
      // 分页
      pageNum: 1,
      pageSize: 10,
      total: 100,
      rules: {
        salesPrice: [
          { required: true, message: "请输入商品售价", trigger: "blur" }
        ],
        purchasePrice: [
          { required: true, message: "请输入商品进价", trigger: "blur" }
        ],
        orderingUtil: [
          { required: true, message: "请输入订购数量", trigger: "change" }
        ],
        minOrderingMultiple: [
          { required: true, message: "请输入订购数量", trigger: "change" }
          // { min: 1, max: 99, trigger: "blur" }
        ],
        maxOrderingMultiple: [
          { required: true, message: "请输入订购数量", trigger: "change" }
          // { min: 1, max: 99, trigger: "blur" }
        ]
      },
      supp: {
        name: "",
        code: "",
        token: sessionStorage.getItem("token"),
        pageSize: 400
      },
      // 显示与隐藏
      hide: false, //新增供应商
      hide2: true,
      showTab: false
    };
  },
  created() {
    this.getDetail();
    this.showother();
    this.Leavel();
    this.showUnit();
    this.placeList();
  },
  mounted() {
    this.editor = new Editor("#editor");
    this.editor.customConfig.uploadImgShowBase64 = true;
    this.editor.customConfig.showLinkImg = false;
    this.editor.customConfig.onchange = html => {
      this.ruleForm.goodsDetail = html;
    };
    this.editor.create();
  },
  methods: {
    aaa() {
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
            this.choose(this.ruleForm.typeLevel1, "Y");
          }
        })
        .catch(err => {
          console.log("数据异常", err);
        });
    },
    // 进入页面调用详情
    getDetail() {
      const _this = this;
      _this
        .$axios({
          url: window.apiUrl + "goods/detail",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify(_this.ruleForm)
        })
        .then(res => {
          if (res.data.code === "0000") {
            this.ruleForm = res.data.data.goods;
            if (_this.ruleForm.periodUnit == "永久") {
              _this.ruleForm.period = null;
            }
            this.editor.txt.html(res.data.data.goods.goodsDetail);
            this.tableData.push(res.data.data.supplier);
            this.aaa();
            if (this.ruleForm.listImage) {
              this.fileList = [];
              // let url="http://192.168.1.168:8080"
              let url = "";
              this.fileList.push({
                url: this.uploadUrl + this.ruleForm.listImage
              });
              this.hideUpload = this.fileList.length >= this.limitCount;
              // this.ruleForm.listImage = JSON.parse(this.ruleForm.listImage);
              // if (this.ruleForm.listImage.length > 0) {
              //   let url = "";
              //   for (const i of this.ruleForm.listImage) {
              //     i = {
              //       url: url + i
              //     };
              //     this.fileList.push(i);
              //     this.hideUpload = this.fileList.length >= this.limitCount;
              //   }
              // }
            }
            //商品详情图片
            if (this.ruleForm.detailImage != null) {
              this.fileList2 = [];
              this.ruleForm.detailImage = JSON.parse(this.ruleForm.detailImage);
              if (this.ruleForm.detailImage.length > 0) {
                // let url = "http://192.168.1.168:8080";
                let url = "";
                for (const i of this.ruleForm.detailImage) {
                  i = {
                    url: this.uploadUrl + i
                    // name: "营业执照" + index + ".jpg",
                    // size: 1*1024*1024
                  };

                  this.fileList2.push(i);
                  this.hideUpload = this.fileList.length >= this.limitCount;
                }
              }
            }
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
        .catch(err => {});
    },
    choose(value, isY) {
      if (isY === "N") {
        this.ruleForm.typeLevel2 = "";
        this.ruleForm.typeLevel3 = "";
        this.TypeLevel3 = "";
      }
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
            if (isY !== "N") return this.choose2(this.ruleForm.typeLevel2, "Y");
          }
        })
        .catch(err => {
          console.log("数据异常", err);
        });
    },
    // 下拉change事件
    choose2(value, isY) {
      if (isY === "N") {
        this.ruleForm.typeLevel3 = "";
      }
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
            this.options = res.data.data;
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
    // 基本信息下一步
    // next(){
    //   this.activeName = 'second'
    // },
    next(formName) {
      if (!this.ruleForm.typeLevel1) return this.$message("请选择商品分类");
      if (!this.ruleForm.name)
        return this.$message("请输入商品名称，不超过50个字");
      if (!this.ruleForm.unit) return this.$message("请选择单位");
      if (!this.ruleForm.temperature) return this.$message("请选择温层");
      // if (!this.ruleForm.period) return this.$message("请选择保质期");
      if (!this.ruleForm.period && this.ruleForm.periodUnit != "永久")
        return this.$message("请选择保质期");
      if (!this.ruleForm.spec) return this.$message("请输入规格，不超过20个字");
      this.activeName = "second";
    },
    // 取消
    cancel() {
      this.$router.push({ name: "shopmanagement" });
    },
    next2() {
      this.activeName = "third";
    },
    next3() {
      this.activeName = "fourth";
    },
    back() {
      this.activeName = "first";
    },
    //返回第二个Tab
    backUp() {
      this.activeName = "second";
    },
    backUp3() {
      this.activeName = "third";
    },
    del() {
      this.hide = true;
      this.hide2 = false;
    },
    fanhui() {
      this.showTab = false;
    },
    perment() {
      if (this.ruleForm.periodUnit == "永久") {
        this.ruleForm.period = "";
      }
    },
    // 选择供应商
    clickshow() {
      this.showTab = true;
      this.$axios({
        url: window.apiUrl + "supplier/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify(this.supp)
      })
        .then(res => {
          this.tableData3 = res.data.data.list;
          this.total = res.data.data.total;
        })
        .catch(err => {
          console.log("数据异常", err);
        });
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
    nextclick() {
      if (this.tableData == "") {
        this.$message.error("请选择供应商信息");
      } else {
        this.showTab = false;
        this.hide2 = true;
      }
    },
    // 提交
    success(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.supplierCode = this.tableData[0].code;
          let token = sessionStorage.getItem("token");
          this.ruleForm.token = token;
          this.$axios({
            url: window.apiUrl + "goods/update",
            method: "POST",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            data: qs.stringify({
              token: this.ruleForm.token,
              code: this.$route.query.code,
              typeLevel1: this.ruleForm.typeLevel1, //商品类型
              typeLevel2: this.ruleForm.typeLevel2,
              typeLevel3: this.ruleForm.typeLevel3,
              name: this.ruleForm.name,
              barcode: this.ruleForm.barcode, //国际条码
              unit: this.ruleForm.unit, //单位
              temperature: this.ruleForm.temperature, //温层
              period: this.ruleForm.period, //保质期
              periodUnit: this.ruleForm.periodUnit, //保质期日期
              spec: this.ruleForm.spec, //规格
              level: this.ruleForm.level, //等级
              placeOfProduction: this.ruleForm.placeOfProduction, //产地
              supplierCode: this.ruleForm.supplierCode, //供应商编码
              salesPrice: this.ruleForm.salesPrice, //售价
              purchasePrice: this.ruleForm.purchasePrice, //进价
              orderingUtil: this.ruleForm.orderingUtil, //订购单位
              minOrderingMultiple: this.ruleForm.minOrderingMultiple, //最小订购倍数
              maxOrderingMultiple: this.ruleForm.maxOrderingMultiple, //最大订购倍数
              listImage: this.ruleForm.listImage, //图片
              detailImage: JSON.stringify(this.ruleForm.detailImage), //详情图片
              shopUp: this.ruleForm.shopUp,
              goodsDetail: this.ruleForm.goodsDetail
            })
          })
            .then(res => {
              if (res.data.code == "0000") {
                this.$message({
                  type: "success",
                  message: "保存成功"
                });
                this.$router.push({ name: "shopmanagement" });
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
      // this.multipleSelection=val
      this.tableData[0] = val;
    },
    goback() {
      this.$router.push({
        name:'shopmanagement'
      })
    },
    // 折扣金额限制输入的数字大于0小于1的
    numdisCount() {
      if (this.ruleForm.salesPrice < 0 || this.ruleForm.salesPrice > 1) {
        return this.$message.error("请输入大于0 小于1的数据");
      }
      this.ruleForm.salesPrice = parseFloat(this.ruleForm.salesPrice).toFixed(
        2
      );
    },
    // 折扣金额限制输入的数字大于0小于1的
    numdisCount2() {
      if (this.ruleForm.purchasePrice < 0 || this.ruleForm.purchasePrice > 1) {
        return this.$message.error("请输入大于0 小于1的数据");
      }
      this.ruleForm.purchasePrice = parseFloat(
        this.ruleForm.purchasePrice
      ).toFixed(2);
    },
    // handleSelectionChange (row) {
    //   this.tableData3.forEach(item => {
    //     // 排他,每次选择时把其他选项都清除
    //     if (item.id !== row.id) {
    //       item.checked = false
    //     }
    //   })
    //   this.arr.push(row)
    // }
    // 商城图片
    astrict(file, fileList) {
      this.hideUpload = fileList.length >= this.limitCount;
    },
    // 第二种图片上传的方式
    // handleRemove(file, fileList) {
    //   this.hideUpload = fileList.length >= this.limitCount;
    //   this.ruleForm.listImage = [];
    //   fileList.forEach(item => {
    //     if (item.response) {
    //       this.ruleForm.listImage.push(item.response.data);
    //     } else {
    //       this.ruleForm.listImage.push(item.url);
    //     }
    //   });
    // },
    handleRemove(file, fileList) {
      this.hideUpload = fileList.length >= this.limitCount;
      if (file.response) {
        this.ruleForm.listImage = file.response.data;
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // onSuccess(response, file, fileList) {
    //   this.ruleForm.listImage = [];
    //   fileList.forEach(item => {
    //     if (item.response) {
    //       this.ruleForm.listImage.push(item.response.data);
    //     } else {
    //       this.ruleForm.listImage.push(item.url);
    //     }
    //   });
    // },
    onSuccess(response, file, fileList) {
      if (file.response) {
        this.ruleForm.listImage = file.response.data;
      }
    },
    beforeUpload(file) {
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
      this.ruleForm.detailImage = [];
      if (fileList.length > 0) {
        fileList.forEach(item => {
          this.ruleForm.detailImage.push(item.response.data);
        });
      }
    },
    handlePictureCardPreview2(file) {
      this.dialogImageUrl2 = file.url;
      this.dialogVisible2 = true;
    },
    onSuccess2(response, file, fileList) {
      this.ruleForm.detailImage = [];
      fileList.forEach(item => {
        if (item.response) {
          this.ruleForm.detailImage.push(item.response.data);
        } else {
          this.ruleForm.detailImage.push(item.url);
        }
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
.editWrapper {
  background-color: #fff;
  min-height: 647px;
  min-width: 1700px;
  box-sizing: border-box;
  height: 100%;
  box-shadow: 0px 2px 10px #ccc;
}
.supplier {
  padding: 0px 20px;
  background: #fff;
  font-size: 12px;
  border-radius: 4px;
  min-height: 647px;
  box-sizing: border-box;
}
.editWrapper .el-select {
  width: 100%;
}
.el-tabs__nav-wrap::after {
  width: 330px;
}
.el-tabs__item i {
  background-color: #c2c2c2;
  padding: 0 5px;
  border-radius: 50%;
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
/* .TongCenter {
  text-align: center;
}
.TongRight {
  text-align: right;
} */
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
.chaxunBtn22 {
  text-decoration: none;
  width: 69px;
  background-color: #434444;
  text-align: center;
  height: 32px;
  line-height: 32px;
  color: #fff;
  border-radius: 5px;
  float: right;
  margin-right: 2%;
  cursor: pointer;
  /* background-color: #fff; */
  color: #fff;
  border: 1px solid #555555;
  margin-top: 13px;
}
.chaxunBtn {
  background-color: #434444;
  color: #fff;
  border: none;
}
.chaxunBtn,
.chongzhiBtn {
  width: 69px;
  height: 32px;
  border-radius: 5px;
}
.chaxunBtn:hover {
  cursor: pointer;
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
.mallradio {
  text-align: left;
}
.chongzhiBtn {
  background-color: #fff;
  color: #444444;
  border: 1px solid #555555;
  margin-left: 10px;
}
/* 弹窗部分样式 */
.chooseS {
  margin-left: 30px;
}
.el-button {
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
  width: 800px;
  text-align: left;
  margin-bottom: 20px;
}
.editInfo {
  height: 50px;
  line-height: 50px;
  text-align: right;
}
.editWrapper .editInfo .margingBo {
  width: 15px;
  display: inline-block;
}
.storepagebtn {
  text-align: center;
}
.bigshow {
  margin-top: 20px;
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
