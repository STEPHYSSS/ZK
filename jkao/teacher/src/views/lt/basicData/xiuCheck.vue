<template>
    <div class="XCheck">
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
      <el-breadcrumb-item :to="{ path: '/operatIndex' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item >门店单据管理</el-breadcrumb-item>
      <el-breadcrumb-item >修正单管理</el-breadcrumb-item>
        </el-breadcrumb>-->
         <img @click="back" class="backImg" src="@/assets/images/returnbutton.png" alt />
        <!-- <h3 class="store_tit">修正单管理</h3> -->
        <!-- <el-button class="XGBtnBack" @click="back">返回</el-button> -->
        <!-- <img src="@/assets/Rbutton.png" @click="back" class="XGBtnBack" /> -->
        <div class="detail1">
            <div class="scollHide">
                <div>
                    <div class="list">
                        <el-row>
                            <el-col :span="6">
                                <p>
                                    修正单编号：
                                    <span>{{checkList.code}}</span>
                                </p>
                            </el-col>
                            <el-col :span="6">
                                <p>
                                    创建日期：
                                    <span>{{checkList.createTime | fmtDate2('YYYY-MM-DD')}}</span>
                                </p>
                            </el-col>
                            <el-col :span="6">
                                <p>
                                    原配送单编号：
                                    <span>{{checkList.deliveryCode}}</span>
                                </p>
                            </el-col>
                            <el-col :span="6">
                                <p>
                                    验收日期：
                                    <span>{{checkList.createTime | fmtDate2('YYYY-MM-DD')}}</span>
                                </p>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">
                                <p>
                                    配送方：
                                    <span>{{checkList.supplierName}}</span>
                                </p>
                            </el-col>
                            <el-col :span="6">
                                <p>
                                    拒收品项总数：
                                    <span>{{checkList.item}}</span>
                                </p>
                            </el-col>
                            <el-col :span="6">
                                <p>
                                    拒收总数：
                                    <span>{{checkList.count}}</span>
                                </p>
                            </el-col>
                            <el-col :span="6">
                                <p>
                                    拒收总金额：
                                    <span>{{checkList.amount}}</span>
                                </p>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col>
                                <p>
                                    门店：
                                    <span>{{checkList.storeName}}</span>
                                </p>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="list_tab">
                        <el-table :data="checkTable" style="width: 100%;">
                            <el-table-column label="序号" align="center" type="index"></el-table-column>
                            <el-table-column prop="goodsCode" label="货号" align="center" width="100"></el-table-column>
                            <el-table-column prop="goodsName" label="品名" align="center" width="150"></el-table-column>
                            <el-table-column prop="spec" label="规格" align="center"></el-table-column>
                            <el-table-column prop="count" label="拒收数" align="center"></el-table-column>
                            <el-table-column prop="salesPrice" label="单品售价" align="center"></el-table-column>
                            <el-table-column prop="amount" label="拒收总金额" align="center"></el-table-column>
                            <el-table-column prop="reason" label="拒收原因" align="center"></el-table-column>
                            <el-table-column
                                prop="supplierAmendmentCount"
                                label="供应商确认拒收数"
                                width="154"
                                align="center"
                            ></el-table-column>
                            <el-table-column label="最终裁定数量" align="center">
                                <template slot-scope="scope">
                                    <el-input
                                    style="width:50px"
                                        type="text"
                                        oninput="value=value.replace(/[^\d]/g,'')"
                                        v-model="scope.row.finalRuleCount"
                                    ></el-input>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <div class="xiugaiImg_list">
                    <div class="G_upload optionG">
                        <div class="xiureasonBox">
                            <div class="xiugaiReasonLeft">
                                <span>
                                    <em class="option">*</em> 意见：
                                </span>
                            </div>
                            <div class="xiureason">
                                <textarea class="textInfo" v-model="title" placeholder="请输入意见"></textarea>
                                <!-- <textarea v-model="title" placeholder="编辑文本框"></textarea> -->
                                <!-- <el-input v-model="title"></el-input> -->
                                <span class="wowr">{{title.length}}/{{titleMaxLength}}</span>
                            </div>
                        </div>
                        <div class="wareShenhe">
                            <el-button class="chaxunBtn" @click="xiuBaocun">审核裁定</el-button>
                        </div>
                        <p class="allSta">全部动态</p>
                        <div class="AllstaBox1">
                            <p class="AllstaP1"></p>
                            <p class="AllstaP2"></p>
                            <span class="creatstore">{{checkList.storeName}}</span>
                            <span
                                class="creatstore2"
                            >{{checkList.createTime|converTime('YYYY-MM-DD HH:mm:ss')}}</span>
                            <br />
                            <span class="creatstore3">创建</span>
                        </div>
                        <!-- 供应商审核的意见 -->
                        <div class="AllstaBox1" v-if="checkList.supplierOpinion!=null">
                            <p class="AllstaP1"></p>
                            <p class="AllstaP2"></p>
                            <span class="creatstore">{{checkList.supplierName}}</span>
                            <span
                                class="creatstore2"
                                v-if="checkList.supplierCheckTime !=null"
                            >{{checkList.supplierCheckTime|converTime('YYYY-MM-DD HH:mm:ss')}}</span>
                            <br />
                            <span class="creatstore3" v-if="checkList.status!=4">审核不通过</span>
                            <span class="creatstore3" v-if="checkList.status==4">审核通过</span>
                            <br />
                            <p class="creatstore4">意见：{{checkList.supplierOpinion}}</p>
                        </div>
                        <!-- 门店审核的意见 -->
                        <div class="AllstaBox1" v-if="checkList.storeOpinion!=null">
                            <p class="AllstaP1"></p>
                            <p class="AllstaP2"></p>
                            <span class="creatstore">{{checkList.storeName}}</span>
                            <span
                                class="creatstore2"
                                v-if="checkList.storeUploadTime !=null"
                            >{{checkList.storeUploadTime|converTime('YYYY-MM-DD HH:mm:ss')}}</span>
                            <br />
                            <span class="creatstore3" v-if="checkList.status==3">已上传意见</span>
                            <span class="creatstore3" v-if="checkList.status!=3">上传意见</span>
                            <br />
                            <p class="creatstore4">意见：{{checkList.storeOpinion}}</p>
                        </div>
                        <!-- 总部意见审核的意见 -->
                        <div class="AllstaBox1">
                            <p class="Allcircle"></p>
                            <span class="creatPat">运营部</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import qs from "qs";
import { fail } from "assert";
export default {
    name: "XCheck",
    data() {
        return {
            checkList: {},
            checkTable: [],
            queNum: 0,
            panduan: 0,
            list: [],
            titleMaxLength: 100,
            title: "" //意见
        };
    },
    created() {
        this.getCheckInfo();
    },
    methods: {
        // 获取详情
        getCheckInfo() {
            this.$utils({
                url: this.reqApi.xinls + "/exam/amendent/detail",
                method: "POST",
                headers: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                data: qs.stringify({
                    questionCode: sessionStorage.getItem("questionUUid"),
                    code: this.$route.query.code
                })
            }).then(res => {
                const {
                    code,
                    data: { subList, info }
                } = res.data;
                if (code == "0000") {
                    this.checkTable = subList;
                    this.checkList = info;
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
        xiuBaocun() {
            let _this = this;
            _this.list = [];
            if (_this.title == "") {
                return _this.$message.error("请输入意见！");
            }
            _this.checkTable.forEach((item, index) => {
                if (item.finalRuleCount) {
                    _this.list.push({
                        id: item.id,
                        number: item.finalRuleCount
                    });
                } else {
                    return _this.$message.error("请输入裁定数量！");
                }
            });

            _this
                .$utils({
                    url: this.reqApi.xinls + "/exam/amendent/sys/check",
                    method: "POST",
                    headers: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    data: qs.stringify({
                        questionCode: sessionStorage.getItem("questionUUid"),
                        code: this.$route.query.code,
                        opinion: _this.title,
                        subSet: JSON.stringify(_this.list)
                    })
                })
                .then(res => {
                    if (res.data.code == "0000") {
                        _this.$router.push({ name: "amendment" });
                    }
                });
        },
        back() {
            this.$router.go(-1);
        }
    },
    watch: {
        title() {
            if (this.title.length > this.titleMaxLength) {
                this.title = String(this.title).slice(0, this.titleMaxLength);
            }
        }
    }
};
</script>
<style scoped>
.XCheck {
    background-color: #fff;
    height: 98%;
    min-height: 647px;
    /* min-width: 1700px; */
    position: relative;
    padding-bottom: 20px;
}
.detail1 {
    margin: 0 20px;
    padding-bottom: 40px;
    padding-top: 10px;
    position: relative;
    overflow: hidden;
    height: 700px;
}
.scollHide {
    position: absolute;
    left: 0;
    top: 0;
    right: -17px;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: scroll;
}
.detail1,
.xiugaiImg_list {
    background: #fff;
    border-radius: 10px;
}
.store_tit {
    margin-left: 20px;
}
.xiugaiImg_list {
    padding-bottom: 30px;
    width: 100%;
}
.xiugaiImg_list,
.M_upload {
    margin-top: 30px;
}
.optionG {
    margin: 0 9px;
}
.re_detail {
    margin-top: 18px;
    margin-bottom: 15px;
}
.tip_detail {
    margin-bottom: 15px;
    color: #b6b6b6;
}
.list {
    margin-bottom: 20px;
    font-size: 12px;
}
.list p {
    width: 100%;
}
.list_tab {
    margin-top: 30px;
}
.table1 {
    border-collapse: collapse;
    clear: both;
}
.menu {
    font: 12px verdana, arial, sans-serif;
}
.menu,
.menu li {
    list-style: none;
    padding: 0;
    margin: 0;
    float: left;
    margin-left: 25px;
    margin-bottom: 20px;
    margin-top: 20px;
}
.menu li img {
    width: 210px;
}
.shop_upload {
    height: 50px;
    background: #dcf9fc;
    line-height: 50px;
    padding-left: 10px;
}
.allSta .G_upload {
    padding-top: 0px;
}
.opinion {
    text-align: center;
    height: 50px;
    line-height: 50px;
    margin: 20px auto;
}
/* 表格样式 */
table {
    text-align: center;
}
.tab_tr {
    height: 50px;
}
.tab_tr2 {
    height: 100px;
}
/* 返回 */
.nav {
    display: inline-block;
    height: 50px;
    line-height: 50px;
}
.XGBtnBack {
    text-decoration: none;
    float: right;
    margin-right: 20px;
    cursor: pointer;
    margin-top: 13px;
}
.pbox {
    height: 99px;
}
.textInfo {
    float: left;
    height: 70px;
    border: 1px solid #c8c8c8;
    resize: none;
    font-size: 15px;
    letter-spacing: 1px;
    width: 99.5%;
    font: 14px/25px "\5FAE\8F6F\96C5\9ED1", Arial, Helvetica, sans-serif;
}
.option {
    color: red;
}
.option2 {
    color: red;
    text-align: left;
    display: inherit;
    position: absolute;
}
.wareShenhe {
    margin: 20px 0;
    text-align: right;
}
.xiureasonBox {
    display: flex;
    width: 100%;
}
.xiugaiReasonLeft {
    width: 55px;
    line-height: 70px;
}
.xiureason {
    flex: 1;
    position: relative;
}
.wowr {
    position: absolute;
    bottom: 0;
    right: 10px;
}
.creatstore {
    margin-left: 14px;
    font-weight: 800;
}
.creatstore2 {
    margin-left: 20%;
}
.creatstore3,
.creatPat {
    margin-left: 27px;
}
.creatstore4 {
    width: 78%;
}
.creatPat {
    font-weight: 800;
}
.allSta,
.creatstore3 {
    color: #e6000b;
}
.allSta {
    font-weight: 800;
    font-size: 16px;
    margin-bottom: 10px;
}
.AllstaBox1 {
    position: relative;
    margin-bottom: 10px;
    position: relative;
}
.AllstaP1,
.AllstaP2 {
    display: inline-block;
}
.AllstaP1 {
    height: 14px;
    display: inline-block;
    width: 14px;
    border-radius: 20px;
    background: #e6000b;
}
.Allcircle {
    height: 14px;
    display: inline-block;
    width: 14px;
    border-radius: 20px;
    border: 1px solid #e6000b;
    position: absolute;
    top: 5px;
}
.AllstaP2 {
    /* height: 50px; */
    height: 84%;
    background: #c8c8c8;
    display: inline-block;
    width: 2px;
    position: absolute;
    top: 20px;
    left: 6px;
}
.creatstore {
    margin-left: 14px;
    font-weight: 800;
}
.creatstore2 {
    position: absolute;
    left: 50%;
}
.creatstore3,
.creatstore4 {
    margin-left: 27px;
}
.chaxunBtn {
    background-color: #434444;
    color: #fff;
    border: none;
    width: 96px;
    height: 32px;
    border-radius: 5px;
    line-height: 10px;
}
.chaxunBtn:hover {
    cursor: pointer;
    background-color: rgba(68, 68, 68, 0.8);
    color: #fff;
    /* transform: scale(0.9); */
    border-color: #444;
}
.backImg {
    position: absolute;
    right: 20px;
    top: 0px;
    cursor: pointer;
    z-index: 55;
}
</style>


