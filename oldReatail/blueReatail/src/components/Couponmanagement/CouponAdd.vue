<template>
  <div class="couponAdd">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
      <el-breadcrumb-item :to="{ path: '/operatIndex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>优惠券管理</el-breadcrumb-item>
      <el-breadcrumb-item>新增</el-breadcrumb-item>
    </el-breadcrumb>-->
    <div class="couppAddHideS">
      <div class="couponAddBox">
        <h3>新增优惠券</h3>
        <div class="wrapper">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="活动名称" prop="name" class="demoAddC">
              <el-input v-model="ruleForm.name" maxlength="50"></el-input>
            </el-form-item>
            <el-form-item class="demoAddC" label="生效日期" prop="takeEffectTime">
              <el-date-picker
                v-model="ruleForm.takeEffectTime"
                @change="changeTime1"
                type="date"
                placeholder="生效日期"
                :picker-options="takeEffectTime"
              ></el-date-picker>
            </el-form-item>
            <el-form-item class="demoAddC" label="失效日期" prop="loseEffectTime">
              <el-date-picker
                v-model="ruleForm.loseEffectTime"
                @change="changeTime2"
                type="date"
                placeholder="失效日期"
                :picker-options="loseEffectTime"
              ></el-date-picker>
            </el-form-item>
            <el-form-item class="demoAddC" label="发放数量">
              <el-input v-model="ruleForm.num" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
            </el-form-item>
            <div class="dingwei">
              <i class="hidePer">*</i>
              <el-form-item class="demoAddC" label="优惠券名称">
                <el-input v-model="addCoupon.name"></el-input>
                <span style="font-size:12px" v-show="showremark2" class="hidePer">请输入优惠券名称</span>
              </el-form-item>
            </div>
            <div class="dingwei">
              <i class="hidePer">*</i>
              <el-form-item class="demoAddC" label="优惠券说明">
                <!-- <el-input type="textarea" v-model="addCoupon.remark"></el-input> -->
                <textarea name="suggestions-text" id="textarea" cols="30" rows="5" maxlength="100" v-on:keyup="write()" v-on:compositionstart="importStart()"
                 v-on:compositionend="importEnd()" v-model="addCoupon.remark"></textarea>
                <span class="counterNum">{{conterNum}}/100</span>
              </el-form-item> 
            </div>
            <div class="dingwei">
              <i class="hidePer">*</i>
              <el-form-item class="demoAddC" label="优惠券类型">
                <el-radio-group v-model="addCoupon.type">
                  <el-radio label="R">减免券</el-radio>
                  <el-radio label="D">折扣券</el-radio>
                </el-radio-group>
                <div v-if="addCoupon.type == 'R'">
                  优惠金额
                  <p class="lineMoney">
                    <el-input v-model="addCoupon.reduceMoney"></el-input>
                  </p>
                </div>
                <div v-else>
                  折扣幅度
                  <p class="lineMoney">
                    <el-input
                      v-model="addCoupon.discountMoney"
                      @blur="numdisCount"
                      placeholder="八折请输入0.8"
                      oninput="value=value.replace(/[^\d.]/g, '').replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')"
                    ></el-input>
                  </p>
                </div>
              </el-form-item>
            </div>
            <div class="dingwei">
              <i class="hidePer">*</i>
              <el-form-item class="demoAddC" label="优惠券期限">
                <el-radio-group v-model="addCoupon.termType">
                  <el-radio label="P">
                    有效期（天）
                    <p class="lineDay">
                      <el-input v-model="addCoupon.period"></el-input>
                    </p>
                  </el-radio>
                  <el-radio label="S">
                    开始时间
                    <p class="startTime">
                      <el-date-picker
                        v-model="addCoupon.startTime"
                        type="date"
                        placeholder="选择日期"
                        @change="chooseTime"
                        :picker-options="pickerOptionsStart"
                      ></el-date-picker>
                    </p>
                    <br />
                    <span class="endtie">结束时间</span>
                    <p class="endTime">
                      <el-date-picker
                        v-model="addCoupon.endTime"
                        type="date"
                        placeholder="选择日期"
                        @change="chooseTime2"
                        :picker-options="pickerOptionsEnd"
                      ></el-date-picker>
                    </p>
                  </el-radio>
                  <br />
                  <span style="font-size:12px" v-if="levelSetShow" class="hidePer">请填写优惠期限</span>
                </el-radio-group>
              </el-form-item>
            </div>
            <div class="dingwei">
              <i class="hidePer">*</i>
              <el-form-item class="demoAddC" label="线下门店">
                <el-radio-group v-model="addCoupon.offlineStore">
                  <el-radio label="A">全部门店</el-radio>
                  <el-radio label="B">部分门店</el-radio>
                </el-radio-group>
                <div v-if="addCoupon.offlineStore == 'B'">
                  <el-button @click="chooseStops" class="AllquedingBtn">选择门店</el-button>
                </div>
                <div v-show="xuanz" class="xuanze">已选择{{this.addCoupon.storeSet.length}}家</div>
              </el-form-item>
            </div>
            <div class="dingwei">
              <i class="hidePer">*</i>
              <el-form-item class="demoAddC" label="商品范围">
                <el-radio-group v-model="addCoupon.goodsScope">
                  <el-radio label="A">全部商品</el-radio>
                  <el-radio label="B">部分商品</el-radio>
                </el-radio-group>
                <div v-if="addCoupon.goodsScope == 'B'">
                  <el-button @click="chooseGood" class="AllquedingBtn">选择商品</el-button>
                </div>
                <div v-show="xuanz2" class="xuanze">已选择{{this.addCoupon.goodsSet.length}}种</div>
              </el-form-item>
            </div>
            <el-form-item>
              <el-button class="AllquedingBtn" @click="addYouHui('ruleForm')">添加优惠券</el-button>
              <el-table :data="couponListStr" style="width: 80%;" v-show="couponListStr">
                <el-table-column prop="id" type="index" label="优惠券ID" align="center"></el-table-column>
                <el-table-column prop="name" label="优惠券名称" align="center"></el-table-column>
                <el-table-column prop="type" label="优惠券类型" align="center"></el-table-column>
                <el-table-column prop="remark" label="优惠券说明" align="center"></el-table-column>
                <el-table-column label="门店范围" align="center">
                  <template scope="scope">{{scope.row.offlineStore|allStoreTip}}</template>
                </el-table-column>
                <el-table-column label="商品范围" align="center">
                  <template scope="scope">{{scope.row.goodsScope|allGoodsTip}}</template>
                </el-table-column>
                <el-table-column label="减免或折扣" align="center">
                  <template scope="scope">
                    <span>{{scope.row.reduceMoney }}</span>
                    <span>{{scope.row.discountMoney }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="period" label="使用有效期（天）" align="center"></el-table-column>
                <el-table-column prop="startTime" label="开始使用日期" align="center"></el-table-column>
                <el-table-column prop="endTime" label="结束使用时间" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                  <template scope="scope">
                    <span class="codesty" @click="delRetuen(scope.row.code)">删除</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
            <el-form-item>
              <el-button class="AllquedingBtn" @click="submitForm('ruleForm')">确定</el-button>
              <el-button class="theBtn resetButton" @click="resetForm('ruleForm')">返回</el-button>
            </el-form-item>
          </el-form>
          <div class="konge"></div>
        </div>
        <!-- 选择门店dailog -->
        <el-dialog title="选择门店" :visible.sync="dialogVisible" width="800px">
          <div class="choosestore">
            <div class="chooseBox">
              <span>门店名称</span>
              <p>
                <el-input v-model="storName" placeholder="请输入门店名称"></el-input>
              </p>
              <span>门店类型</span>
              <p>
                <el-select v-model="storType">
                  <el-option
                    v-for="item in storeType"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </p>
              <div class="diaBtn">
                <el-button class="theBtn queryButton" @click="storChaxun">查询</el-button>
                <el-button class="theBtn resetButton" @click="storReset">重置</el-button>
              </div>
            </div>
            <div class="konge"></div>
            <div class="chooseBox2">
              <el-table
                ref="multipleTable"
                :data="chooseStore"
                tooltip-effect="dark"
                style="width: 100%"
                height="290px"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="code" label="门店编号" width="120" align="center"></el-table-column>
                <el-table-column prop="name" label="门店名称" width="120" align="center"></el-table-column>
                <el-table-column label="所在区域" align="center">
                  <template
                    scope="scope"
                  >{{scope.row.province}}-{{scope.row.city}}-{{scope.row.area}}</template>
                </el-table-column>
                <el-table-column prop="type" label="门店类型"></el-table-column>
              </el-table>
            </div>
            <div class="wordCent">
              <el-button class="AllquedingBtn" @click="quedingMd">确定</el-button>
              <el-button class="theBtn resetButton" @click="quxiaoMd">取消</el-button>
            </div>
          </div>
        </el-dialog>
        <!-- 选择商品dailog-->
        <el-dialog title="选择商品" :visible.sync="dialogVisible2" width="800px">
          <div class="choosestore2">
            <el-row style="white-space:nowrap">
              <el-col :span="16">
                <span>商品分类：</span>
                <p class="widOne">
                  <el-select v-model="typeLevel1" size="mini" placeholder="请选择" @change="choose">
                    <el-option
                      v-for="item in TypeLevel1"
                      :key="item.value"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </p>
                <p class="widOne">
                  <el-select v-model="typeLevel2" size="mini" placeholder="请选择" @change="choose2">
                    <el-option
                      v-for="item in TypeLevel2"
                      :key="item.value"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </p>
                <p class="widOne">
                  <el-select v-model="typeLevel3" size="mini" placeholder="请选择">
                    <el-option
                      v-for="item in TypeLevel3"
                      :key="item.value"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </p>
              </el-col>
              <el-col :span="8" class="TongRight">
                <span>货号：</span>
                <p><el-input v-model="goodsCode" placeholder="请输入"></el-input></p>
              </el-col>
            </el-row>
            <div class="konge"></div>
            <el-row>
              <el-col :span="16">
                <span>品<em class="huoNumzan"></em>名：</span>
                <p style="width:300px"><el-input v-model="name" placeholder="请输入"></el-input></p>
              </el-col>
              <el-col :span="8" class="TongRight">
                <el-button class="theBtn queryButton" @click="goodsChaxun">查询</el-button>
                <el-button class="theBtn resetButton" @click="goodsReset">重置</el-button>
              </el-col>
            </el-row>
            <div class="konge"></div>
            <div class="chooseBox2">
              <el-table
                ref="multipleTable"
                :data="chooseGoods"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange2"
                height="290px"
              >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="code" label="货号" width="120" align="center"></el-table-column>
                <el-table-column prop="name" label="品名" width="120" align="center"></el-table-column>
                <el-table-column prop="unit" label="单位" align="center"></el-table-column>
                <el-table-column prop="spec" label="规格" align="center"></el-table-column>
                <el-table-column prop="salesPrice" label="单品售价" align="center"></el-table-column>
              </el-table>
            </div>
            <div class="wordCent issure">
              <el-button class="AllquedingBtn" @click="isSureGoods">确定</el-button>
              <el-button class="theBtn resetButton" @click="quxiaoGoods">取消</el-button>
            </div>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "couponAdd",
  data() {
    return {
      conterNum:0,
      chnlpt:false,
      token: sessionStorage.getItem("token"),
      ruleForm: {
        name: "",
        takeEffectTime: "",
        loseEffectTime: "",
        num: ""
      },
      takeEffectTime: {
        disabledDate: time => {
          let endDateVal = this.ruleForm.loseEffectTime;
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime();
          }
        }
      },
      loseEffectTime: {
        disabledDate: time => {
          let beginDateVal = this.ruleForm.takeEffectTime;
          if (beginDateVal) {
            return (
              time.getTime() <
              new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
            );
          }
        }
      },
      // 限制结束时间大于开始时间
      pickerOptionsStart: {
        disabledDate: time => {
          let endDateVal = this.addCoupon.endTime;
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime();
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          let beginDateVal = this.addCoupon.startTime;
          if (beginDateVal) {
            return (
              time.getTime() <
              new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
            );
          }
        }
      },
      multipleSelection: [],
      multipleSelection2: [],
      couponListStr: null, //添加优惠券
      addCoupon: {
        //优惠券集合
        // id:'3',
        name: "", //优惠券名称
        remark: "", //优惠券说明
        type: "R", //优惠券类型
        reduceMoney: "", //优惠金额
        discountMoney: "", //折扣幅度
        termType: "P", //优惠券期限
        period: "", //有效期
        startTime: "", //开始时间
        endTime: "", //结束时间
        offlineStore: "A", //线下门店
        goodsScope: "A", //商品范围
        storeSet: [], //门店
        goodsSet: [] //商品
      },
      levelSetShow: false,
      moneyShow: false,
      xuanz2: false,
      xuanz: false,
      rules: {
        name: [
          { required: true, message: "请输入", trigger: "blur" },
          { max: 50, message: "不超过50个字符", trigger: "blur" }
        ],
        takeEffectTime: [
          { required: true, message: "请选择生效日期", trigger: "blur" }
        ],
        loseEffectTime: [
          { required: true, message: "请选择失效日期", trigger: "blur" }
        ]
        // remark: [
        //     { required: true, message: '请填写活动形式', trigger: 'blur' },
        // ],
        // type: [
        //     { required: true, message: '请选择优惠券类型',trigger:'blur' }
        // ],
        // termType: [
        //     { required: true, message: '请选择优惠券期限',trigger:'blur' }
        // ],
        // offlineStore: [
        //     { required: true, message: '请选择门店', trigger: 'blur' }
        // ],
        // goodsScope: [
        //     { required: true, message: '请选择商品范围', trigger: 'blur' }
        // ]
      },
      typeLevel1: "",
      typeLevel2: "",
      typeLevel3: "",
      goodsCode: "",
      name: "",
      TypeLevel1: [], //商品类型
      TypeLevel2: [],
      TypeLevel3: [],
      storeType: [], //门店类型
      storName: "",
      storType: "",
      chooseStore: [], //选择门店
      chooseGoods: [], //选择商品
      dialogVisible: false,
      dialogVisible2: false,
      hidePer: false,
      showremark: false,
      showremark2: false
    };
  },
  created() {
    this.showother();
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
     // 文本域限制字数
    write() {
    let self = this;
    if (self.chnIpt == false) {
        self.conterNum = self.addCoupon.remark.length;
    }
    },
    importStart() {
        this.chnIpt = true;
    },
    importEnd() {
        this.chnIpt = false;
        this.write();
    },
    // 失效日期、生效日期
    changeTime1(e) {
      this.ruleForm.takeEffectTime = this.$moment(e).format("YYYY-MM-DD");
    },
    changeTime2(e) {
      this.ruleForm.loseEffectTime = this.$moment(e).format("YYYY-MM-DD");
    },
    chooseTime(e) {
      this.addCoupon.startTime = this.$moment(e).format("YYYY-MM-DD");
    },
    chooseTime2(e) {
      this.addCoupon.endTime = this.$moment(e).format("YYYY-MM-DD");
    },
    chooseStops() {
      //选择门店
      this.dialogVisible = true;
      this.storList();
      // this.xuanz = true
    },
    chooseGood() {
      this.dialogVisible2 = true;
      this.goodList();
      // this.xuanz2 = true
    },
    // 门店列表
    storList() {
      const _this = this;
      _this
        .$axios({
          url: window.apiUrl + "store/list",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            token: _this.token,
            type: _this.storType,
            name: _this.storName,
            pageSize: 9999
          })
        })
        .then(res => {
          if (res.data.code == "0000") {
            _this.chooseStore = res.data.data.list;
          }
        });
    },
    storChaxun() {
      this.storList();
    },
    storReset() {
      this.storName = "";
      this.storType = "";
      this.storList();
    },
    // change事件
    choose(value) {
      this.typeLevel2 = "";
      this.typeLevel3 = "";
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
      this.typeLevel3 = "";
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
    // 商品列表
    goodList() {
      const _this = this;
      _this
        .$axios({
          url: window.apiUrl + "goods/list",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            token: _this.token,
            typeLevel1: _this.typeLevel1,
            typeLevel2: _this.typeLevel2,
            typeLevel3: _this.typeLevel3,
            name: _this.name,
            goodsCode: _this.goodsCode,
            pageSize: 9999
          })
        })
        .then(res => {
          if (res.data.code == "0000") {
            _this.chooseGoods = res.data.data.list;
          }
        })
        .catch(err => {
          console.log("数据异常", err);
        });
    },
    goodsChaxun() {
      this.goodList();
    },
    goodsReset() {
      this.typeLevel1 = "";
      this.typeLevel2 = "";
      this.typeLevel3 = "";
      this.name = "";
      this.goodsCode = "";
      this.goodList();
    },
    quedingMd() {
      if (this.multipleSelection == "")
        return this.$message.error("请选择门店信息");
      this.addCoupon.storeSet = this.multipleSelection;
      this.dialogVisible = false;
      this.xuanz = true; //展示选择了几家门店记录
    },
    quxiaoMd() {
      this.dialogVisible = false;
    },
    isSureGoods() {
      if (this.multipleSelection2 == "")
        return this.$message.error("请选择商品信息");
      this.addCoupon.goodsSet = this.multipleSelection2;
      this.dialogVisible2 = false;
      this.xuanz2 = true;
    },
    quxiaoGoods() {
      this.dialogVisible2 = false;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val.map(item => {
        return item.code;
      });
      // console.log(this.multipleSelection)
    },
    handleSelectionChange2(val) {
      this.multipleSelection2 = val.map(item => {
        return item.code;
      });
      // console.log(this.multipleSelection2)
    },
    // 删除
    delRetuen(code) {
      this.couponListStr.splice(code, 1);
    },
    // 门店类型
    showother() {
      let _this = this;
      let code = "store_type_select";
      _this
        .$axios({
          url: window.apiUrl + "dictionary/list",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            token: _this.token,
            code: code
          })
        })
        .then(res => {
          if ((res.data.code === "0000")) {
            _this.storeType = res.data.data;
          } else if (res.data.code == "6666") {
            _this.$message({
              showClose: true,
              message: "token异常，请重新登录",
              type: "error"
            });
            const timer = setTimeout(() => {
              clearTimeout(timer);
              _this.$router.push({ name: "login" });
            }, 3000);
          }
        });
    },
    // 折扣金额限制输入的数字大于0小于1的
    numdisCount() {
      if (
        this.addCoupon.discountMoney < 0 ||
        this.addCoupon.discountMoney > 1
      ) {
        return this.$message.error("请输入大于0 小于1的数据");
      }
      this.addCoupon.discountMoney = parseFloat(
        this.addCoupon.discountMoney
      ).toFixed(2);
    },
    // 添加优惠券
    addYouHui() {
      if (this.ruleForm.name == "") {
        return this.$message.error("请输入活动名称");
      }
      if (this.ruleForm.takeEffectTime == "") {
        return this.$message.error("请输入生效日期");
      }
      if (this.ruleForm.loseEffectTime == "") {
        return this.$message.error("请输入失效日期");
      }
      // 优惠券名称
      if (this.addCoupon.name == "") {
        return this.$message.error("请输入优惠券名称");
      }
      // 优惠券备注
      if (this.addCoupon.remark == "") {
        return this.$message.error("请填写优惠说明,输入文字不超过100个字符");
      }
      // 优惠金额
      if (this.addCoupon.type == "R") {
        if (this.addCoupon.reduceMoney == "") {
          return this.$message.error("请输入优惠金额");
        }
      }
      if (this.addCoupon.type == "D") {
        if (this.addCoupon.discountMoney == "") {
          return this.$message.error("请输入优惠金额");
        }
      }
      //优惠券期限
      if (this.addCoupon.termType == "P") {
        if (this.addCoupon.period == "") {
          return this.$message.error("请输入优惠券期限");
        }
      }
      if (this.addCoupon.termType == "S") {
        if (this.addCoupon.startTime == "") {
          return this.$message.error("请输入优惠券期限");
        }
      }
      if (this.addCoupon.type == "") {
        return this.$message.error("请输入优惠方式");
      }
      if (this.addCoupon.termType == "") {
        return this.$message.error("请输入优惠期限");
      }
      if (this.addCoupon.offlineStore == "") {
        return this.$message.error("请选择门店");
      }
      if (this.addCoupon.goodsScope == "") {
        return this.$message.error("请选择商品范围");
      }
      if (!this.couponListStr) this.couponListStr = [];
      this.couponListStr.push(this.addCoupon);
      this.addCoupon = {
        name: "", //优惠券名称
        remark: "", //优惠券说明
        type: "R", //优惠券类型
        reduceMoney: "", //优惠金额
        discountMoney: "", //折扣幅度
        termType: "P", //优惠券期限
        period: "", //有效期
        startTime: "", //开始时间
        endTime: "", //结束时间
        offlineStore: "A", //线下门店
        goodsScope: "A", //商品范围
        storeSet: [], //门店
        goodsSet: [] //商品
      };
      this.addCoupon.storeSet = [];
      this.addCoupon.goodsSet = [];
      this.xuanz = false;
      this.xuanz2 = false;
    },
    // 提交确认
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let _this = this;
          if (!this.couponListStr) {
            this.$message.error("请添加优惠券信息");
            return false;
          }
          _this
            .$axios({
              url: window.apiUrl + "coupon/add",
              method: "POST",
              headers: { "content-type": "application/x-www-form-urlencoded" },
              data: qs.stringify({
                token: _this.token,
                couponList: JSON.stringify(_this.couponListStr),
                name: _this.ruleForm.name,
                takeEffectTime: _this.ruleForm.takeEffectTime,
                loseEffectTime: _this.ruleForm.loseEffectTime,
                num: _this.ruleForm.num
              })
            })
            .then(res => {
              if ((res.data.code = "0000")) {
                _this.$router.push({ name: "CouponMana" });
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
        } else {
          return false;
        }
      });
    },
    // 返回
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$router.go(-1);
    }
  },
  filters: {
    allGoodsTip(value) {
      if (value == "B") {
        return "部分商品";
      } else if (value == "A") {
        return "全部商品";
      }
    },
    allStoreTip(value) {
      if (value == "B") {
        return "部分门店";
      } else if (value == "A") {
        return "全部门店";
      }
    }
  },
  
};
</script>
<style scoped>
.couponAdd {
  background-color: #fff;
  min-height: 647px;
  position: relative;
  overflow: hidden;
  height: 100%;
  min-width: 1200px;
}
.couponAdd .el-dialog__body {
  padding: 0 20px;
}
.couppAddHideS {
  overflow: hidden;
  position: relative;
  height: 800px;
}
.couponAddBox {
  margin: 0px auto;
  background: #fff;
  border-radius: 10px;
  position: absolute;
  left: 0;
  top: 0;
  right: -17px;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: scroll;
}
.couponAddBox h3 {
  height: 50px;
  line-height: 50px;
  width: 97%;
  margin: 0 auto;
  font-size: 14px;
  font-weight: 900;
}
.wrapper {
  margin-left: 2%;
  position: absolute;
  left: 0;
  overflow-x: hidden;
  overflow-y: scroll;
}
.wrapper::-webkit-scrollbar {
  display: none;
}
.demoAddC {
  width: 66%;
}
.demoAddC .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
.lineMoney {
  display: inline-block;
  width: 72%;
    margin-left: 14%;
  /* width: 45%;
  margin-left: 10%; */
}
.lineDay {
  display: inline-block;
  /* width: 95%; */
  width: 102%;
  margin-left: 1.5%;
}
.startTime {
  margin-bottom: 20px;
  display: inline-block;
  width: 92%;
  margin-left: 33px;
  margin-top: 20px;
}
.endtie {
  display: inline-block;
  width: 27%;
  text-align: center;
  height: 23px;
  padding-left: 9px;
}
.endTime {
  display: inline-block;
  margin-left: 5%;
  width: 92%;
}
.chooseBox p {
  width: 200px;
  margin-left: 8px;
}
.chooseBox3 {
  margin: 10px 0;
}
.chooseBox3 p {
  width: 207px;
}
.chooseBox p,
.chooseBox3 p {
  display: inline-block;
  margin-right: 20px;
}
.couShopSele p {
  display: inline-block;
  width: 30%;
  margin: 0 3px;
}
.diaBtn {
  display: inline-block;
  height: 40px;
  text-align: right;
  width: 190px;
}
.issure {
  margin: 10px 0;
}
.xuanze,
.hidePer {
  color: #f56c6c;
}
.dingwei {
  position: relative;
}
.dingwei i {
  position: absolute;
  top: 10px;
  left: 8px;
}
.zanweiN {
  display: inline-block;
  width: 28px;
}
.wordCent {
  height: 50px;
  line-height: 65px;
  text-align: center;
}
.el-button {
  margin: 0 15px 0 0;
}
.choosestore2 p,.huoNumzan{
  display: inline-block;
}
#choosestore2 .widOne {
  width: 93.3px;
}
#choosestore2 .widOne:nth-child(3) {
  margin: 0 5px;
}
.huoNumzan {
  width: 28px;
}
.counterNum{
  position: absolute;
  bottom: 5px;
  right: 15px;
}
#textarea{
  width: 98%;
  border-radius: 5px;
}
</style>