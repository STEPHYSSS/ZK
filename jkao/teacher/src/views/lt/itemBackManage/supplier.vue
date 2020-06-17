<template>
    <div class="suppWrapper" id="suppWrapper">
        <img src="@/assets/images/returnbutton.png" class="backImg" @click="goback" />
        <div class="supplier">
            <p class="store_tit" v-if="$route.query.code">商品编辑</p>
            <p class="store_tit" v-else>商品新增</p>
            <el-tabs v-model="activeName">
                <el-tab-pane name="first">
                    <span slot="label">
                        <i>1</i> 基本信息
                    </span>
                    <div id="supplieradd2">
                        <el-row class="elrow1" style="white-space: nowrap;">
                            <el-col :span="6">
                                <div class="box1">
                                    <span class="inlinBlock">
                                        <i class="start startpp">*</i>商品分类：
                                    </span>
                                    <div class="box2">
                                    <el-select
                                        v-model="tabForm.typeLevel1"
                                        placeholder="请选择"
                                        class="select30"
                                        @change="choose"
                                    >
                                        <el-option
                                            v-for="(item,index) in TypeLevel1"
                                            :key="index"
                                            :label="item.name"
                                            :value="item.code"
                                        ></el-option>
                                    </el-select>
                                    <el-select
                                        v-model="tabForm.typeLevel2"
                                        placeholder="请选择"
                                        class="select30"
                                        @change="choose2"
                                    >
                                        <el-option
                                            v-for="(item,index) in TypeLevel2"
                                            :key="index"
                                            :label="item.name"
                                            :value="item.code"
                                        ></el-option>
                                    </el-select>
                                    <el-select
                                        v-model="tabForm.typeLevel3"
                                        placeholder="请选择"
                                        class="select30"
                                    >
                                        <el-option
                                            v-for="(item,index) in TypeLevel3"
                                            :key="index"
                                            :label="item.name"
                                            :value="item.code"
                                        ></el-option>
                                    </el-select>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="box1">
                                    <span class="inlinBlock">
                                        <i class="start startpp">*</i>商品名称：
                                    </span>
                                    <el-input class="inputWidth" v-model="tabForm.name"></el-input>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="box1">
                                    <span class="inlinBlock">
                                        <i class="start startpp">*</i>单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：
                                    </span>
                                    <el-select v-model="tabForm.unit" placeholder="请选择" class="inputWidth">
                                        <el-option
                                            v-for="(item,index) in unitArr"
                                            :key="index"
                                            :label="item.name"
                                            :value="item.name"
                                        ></el-option>
                                    </el-select>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <span class="inlinBlock">
                                    <i class="start startpp">*</i>温&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;层：
                                </span>
                                <el-select v-model="tabForm.temperature" placeholder="请选择" class="inputWidth">
                                    <el-option
                                        v-for="(item,index) in options"
                                        :key="index"
                                        :label="item.name"
                                        :value="item.name"
                                    ></el-option>
                                </el-select>
                            </el-col>
                        </el-row>

                        <el-row style="white-space: nowrap;" class="elrow1">
                            <el-col :span="6" class="TongCenter">
                               <div class="box1">
                                    <span class="inlinBlock">
                                    <i class="start startpp">*</i>保&nbsp;&nbsp;质&nbsp;&nbsp;期：
                                </span>
                                    <el-input
                                        v-model="tabForm.period"
                                        style="width:47%"
                                        :disabled="tabForm.periodUnit=='永久'"
                                        oninput="value=value.replace(/[^\d]/g,'')"
                                    ></el-input>
                                    <el-select v-model="tabForm.periodUnit" @change="perment" style="width:22%">
                                        <el-option
                                            v-for="(item,index) in perUnit"
                                            :key="index"

                                            :label="item.label"
                                            :value="item.value"
                                        ></el-option>
                                    </el-select>
                               </div>
                            </el-col>
                            <el-col :span="6" class="TongCenter">
                               <div class="box1">
                                    <span class="inlinBlock">
                                    <i class="start startpp">*</i>规
                                    <em class="emStyle"></em>格：
                                </span>
                                    <el-input class="inputWidth" v-model="tabForm.spec"></el-input>
                               </div>
                            </el-col>
                        </el-row>
                        <el-row style="white-space: nowrap;">
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
                    <el-button class="AllquedingBtn" @click="chooseShow">选择供应商</el-button>
                    <div v-if="n1" class="bigshow">
                        <div class="show">
                            <div class="konge"></div>
                            <h3 class="chooseS">选择供应商</h3>
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
                                <el-table-column
                                    prop="type"
                                    label="类型"
                                    show-overflow-tooltip
                                    align="center"
                                ></el-table-column>
                            </el-table>
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
                                <el-table-column align="center" label="操作" fixed="right">
                                    <template slot-scope="scope">
                                        <!-- <p class="codesty" @click="del(scope.row.code)">删除</p> -->
                                        <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                                      <img
                                          src="@/assets/images/shanchu_icon.png"
                                          class="codesty"
                                          @click="del(scope.row.code)"
                                      />
                                </el-tooltip>
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
                        label-width="100px"
                        class="demo-ruleForm"
                    >
                        <el-row>
                            <el-col :span="6">
                               <div class="box1" style='white-space: nowrap;'>
                                    <el-form-item label="商品售价:" prop="salesPrice" >
                                        <el-input
                                            v-model="tabForm.salesPrice "
                                            class="fff"
                                            oninput="value=value.replace(/[^\d.]/g, '').replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')"
                                        ></el-input>
                                </el-form-item>
                               </div>
                            </el-col>
                            <el-col :span="6" class="TongCenter" style='white-space: nowrap;'>
                                <el-form-item label="商品进价:" prop="purchasePrice">
                                        <el-input
                                            v-model="tabForm.purchasePrice"
                                            class="fff"
                                            oninput="value=value.replace(/[^\d.]/g, '').replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')"
                                        ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6" class="TongCenter" style='white-space: nowrap;'>
                                <el-form-item label="基本订购单位:" prop="orderingUtil">
                                        <el-input
                                            v-model="tabForm.orderingUtil"
                                            class="fff"
                                            maxlength="2"
                                            oninput="this.value=this.value.replace(/\D/g,'')"
                                        ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6" class="TongRight" style='white-space: nowrap;'>
                                <el-form-item label="最小订购倍数:" prop="minOrderingMultiple">
                                        <el-input
                                            v-model="tabForm.minOrderingMultiple"
                                            class="fff"
                                            maxlength="2"
                                            oninput="value=value.replace(/[^\d]/g,'').replace(/^0{1,}/g,'')"
                                        ></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6" style='white-space: nowrap;'>
                                <el-form-item label="最大订购倍数:" prop="maxOrderingMultiple">
                                        <el-input
                                            v-model="tabForm.maxOrderingMultiple"
                                            class="fff"
                                            maxlength="2"
                                            oninput="value=value.replace(/[^\d]/g,'').replace(/^0{1,}/g,'')"
                                        ></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                    <el-row>
                        <el-col class="TongRight">
                            <el-button class="chaxunBtn" @click="success('ruleForm')">确定</el-button>
                            <el-button @click="backUp" class="chaxunBtn">上一步</el-button>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
import qs from "qs";
// import Editor from "wangeditor";
import previousPage from "@/components/previousPage.vue";
export default {
    data() {
        return {
            activeName: "first",
            // editor: "",
            tabForm: {
                questionCode: sessionStorage.getItem("questionUUid"),
                typeLevel1: "", //商品类型
                typeLevel2: "",
                typeLevel3: "",
                name: "",
                // barcode: "", //国际条码
                unit: "", //单位
                temperature: "", //温层
                period: "", //保质期
                periodUnit: "", //保质期日期
                spec: "", //规格
                // level: "", //等级
                // placeOfProduction: "", //产地
                supplierCode: "", //供应商编码
                salesPrice: "", //售价
                purchasePrice: "", //进价
                orderingUtil: "", //订购单位
                minOrderingMultiple: "", //最小订购倍数
                maxOrderingMultiple: "" //最大订购倍数
                // listImage: "", //列表图片
                // detailImage:[],// 详情图片
                // shopUp: "N",
                // goodsDetail:""
            },
            // dialogImageUrl: "", //图片
            // dialogVisible: false,
            TypeLevel1: [], //商品类型
            TypeLevel2: [],
            TypeLevel3: [],
            options: [], //温层下拉选
            unitArr: [], //单位下拉选
            // place: [], //产地下拉选
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
                    {
                        required: true,
                        message: "请输入商品售价",
                        trigger: "blur"
                    }
                ],
                purchasePrice: [
                    {
                        required: true,
                        message: "请输入商品进价",
                        trigger: "blur"
                    }
                ],
                orderingUtil: [
                    {
                        required: true,
                        message: "请输入订购数量",
                        trigger: "blur"
                    }
                ],
                minOrderingMultiple: [
                    {
                        required: true,
                        message: "请输入订购数量",
                        trigger: "change"
                    }
                ],
                maxOrderingMultiple: [
                    {
                        required: true,
                        message: "请输入订购数量",
                        trigger: "change"
                    }
                ]
            }

            // dialogImageUrl: "",
            // dialogVisible: false,
            // fileList1: [],
            // fileSizeIsSatisfy: true,

            // fileList2: []
        };
    },
    created() {
        this.setTable();
        this.showother();
        // this.Leavel();
        this.showUnit();
        if (this.$route.query.code) this.getDetail();
        // 进入页面就执行商品类型列表
        // let token = sessionStorage.getItem("token");
        // this.$axios({
        //     url: window.apiUrl + "goods/type/list",
        //     method: "POST",
        //     headers: { "content-type": "application/x-www-form-urlencoded" },
        //     data: qs.stringify({
        //         pcode: "0",
        //         token: token
        //     })
        // })
        //     .then(res => {
        //         if (res.data.code == "0000") {
        //             this.TypeLevel1 = res.data.data;
        //         }
        //     })
        //     .catch(err => {
        //         console.log("数据异常", err);
        //     });
        this.getGoodClassification();
    },

    methods: {
        // 获取详情
        getDetail() {
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/goods/detail",
                    qs.stringify({
                        questionCode: sessionStorage.getItem("questionUUid"),
                        code: this.$route.query.code
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {

                        this.tabForm = res.data.data.goods;
                        console.log(this.tabForm,'this.tabForm')
                        this.choose(this.tabForm.typeLevel1)
                        this.choose2(this.tabForm.typeLevel2)
                        this.arr.push(res.data.data.supplier);
                        // console.log(this.arr)
                        this.n2 = true;
                    } else {
                        this.$message(res.data.msg);
                    }
                });
        },
        // 获取分类列表
        getGoodClassification() {
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/goods/type/list",
                    qs.stringify({
                        pcode: "0",
                        questionCode: sessionStorage.getItem("questionUUid")
                    })
                )
                .then(res => {
                    if (res.data.code == "0000") {
                        this.TypeLevel1 = res.data.data;
                    }
                });
        },

        routeBack() {
            this.$router.push({ name: "commodityPages" });
        },
        perment() {
            if (this.tabForm.periodUnit == "永久") {
                this.tabForm.period = "";
            }
        },
        // 展示供应商列表
        suppierList(pageNum) {
            this.$utils
                .post(this.reqApi.xinls + "/exam/goods/supplier/list",qs.stringify({
                    questionCode: sessionStorage.getItem("questionUUid")
                }))
                .then(res => {
                    if (res.data.code == "0000") {
                        this.tableData3 = res.data.data;
                        this.total = res.data.data.total;
                    } else {
                        this.$message(res.data.msg);
                    }
                });
        },
        chooseShow() {
            this.n1 = true;
            this.n2 = false;
            this.suppierList();
        },
        fanhui() {
            this.n1 = false;
            this.n2 = true;
        },
        // 温层下拉选
        showother() {
            let code = "goods_temperature";
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/dictionary/list",
                    qs.stringify({
                        code: code,
                        questionCode: sessionStorage.getItem("questionUUid")
                    })
                )
                .then(res => {
                    if ((res.data.code = "0000")) {
                        this.options = res.data.data;
                    }
                });
        },
        // 单位下拉选
        showUnit() {
            let code = "goods_unit";
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/dictionary/list",
                    qs.stringify({
                        code: code,
                        questionCode: sessionStorage.getItem("questionUUid")
                    })
                )
                .then(res => {
                    if ((res.data.code = "0000")) {
                        this.unitArr = res.data.data;
                    }
                });
        },
        // 等级下拉选
        // Leavel() {
        //     let _this = this;
        //     let token = sessionStorage.getItem("token");
        //     let code = "goods_level";
        //     _this
        //         .$axios({
        //             url: this.reqApi.xinls + "/exam/goods/type/list",
        //             method: "POST",
        //             headers: {
        //                 "content-type": "application/x-www-form-urlencoded"
        //             },
        //             data: qs.stringify({
        //                 token: token,
        //                 code: code
        //             })
        //         })
        //         .then(res => {
        //             if ((res.data.code = "0000")) {
        //                 this.goodsLevel = res.data.data;
        //             }
        //         })
        //         .catch(err => {
        //             console.log("数据异常", err);
        //         });
        // },
        // change事件
        choose(value) {
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/goods/type/list",
                    qs.stringify({
                        pcode: value,
                        questionCode: sessionStorage.getItem("questionUUid")
                    })
                )
                .then(res => {
                    if (res.data.code == "0000") {
                        this.TypeLevel2 = res.data.data;
                    } else {
                        console.log(res.data.msg);
                    }
                })
                .catch(err => {
                    console.log("数据异常", err);
                });
        },
        // 下拉change事件
        choose2(value) {
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/goods/type/list",
                    qs.stringify({
                        pcode: value,
                        questionCode: sessionStorage.getItem("questionUUid")
                    })
                )
                .then(res => {
                    if (res.data.code == "0000") {
                        this.TypeLevel3 = res.data.data;
                    } else {
                        console.log(res.data.msg);
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
            if (!this.tabForm.typeLevel1)
                return this.$message("请选择商品分类");
            if (!this.tabForm.name)
                return this.$message("请输入商品名称，不超过50个字");
            if (!this.tabForm.unit) return this.$message("请选择单位");
            if (!this.tabForm.temperature) return this.$message("请选择温层");
            // if(!this.tabForm.period) return this.$message('请选择保质期');
            if (!this.tabForm.spec)
                return this.$message("请输入规格，不超过20个字");
            this.activeName = "second";
        },
        next2() {
            this.activeName = "third";
        },
        // 返回第一个Tab
        back() {
            this.activeName = "first";
        },
        //返回第二个Tab
        backUp() {
            this.activeName = "second";
        },
        del(code) {
            this.n2 = false;
        },
        // 提交
        success(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.tabForm.supplierCode = this.arr[0].code;
                    this.$utils
                        .post(
                            this.reqApi.xinls + "/exam/goods/add",
                            qs.stringify(this.tabForm)
                        )
                        .then(res => {
                            if (res.data.code === "0000") {
                                // this.$message.success("新增成功！");
                                this.$router.push({
                                    name: "commodityPages"
                                });
                            }else{
                                this.$message.error(res.data.msg)
                            }
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
                name: "commodityPages"
            });
        }
    },
    component: {
        "previous-page": previousPage
    }
};
</script>

<style scoped>
.suppWrapper {
    position: relative;
    /* border: 1px solid #eee; */
    padding: 5px;
    /* background-color: #fff; */
    /* min-height: 647px;
    min-width: 1200px;
    height: 100%;
    position: relative;
    overflow: auto; */
    /* box-shadow: 0px 2px 10px #ccc; */
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
    /* width: 100%; */
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
.elrow1 {
    margin-bottom: 20px;
}
.backImg {
    position: absolute;
    right: 0px;
    top: 0px;
    cursor: pointer;
}
.box1 {
    width: 100%;
}
.select30 {
    width: 32.6%;
}
.inputWidth{
    /* width: 300px; */
    width: 70%;
}
.inlinBlock{
    display: inline-block;
    width: 65px;
}
.box2{
    /* width: 300px; */
    width: 70%;
    display: inline-block;
}

</style>
