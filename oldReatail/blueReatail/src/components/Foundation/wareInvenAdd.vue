<template>
    <div class="orDepots minWidth1600 minimum">
        <div class="DepotsBox">
            <div class="rece_Box">
                <div class="block">
                    <h3 class="demonstration">新增计划</h3>
                    <div class="centerBox">
                        <div class="fuhezi">
                            <img class="centerImg" src="@/Uimage/Inventoryplanning_icon.png" alt />
                            <span class="textposi">盘点计划</span>
                        </div>
                        <div class="fuhezi">
                            <img class="centerImg" src="@/Uimage/entering_icon.png" alt />
                            <span class="textposi2">实盘录入</span>
                        </div>
                        <div class="fuhezi">
                            <img class="centerImg" src="@/Uimage/re-check_icon.png" alt />
                            <span class="textposi3">盘点复核</span>
                        </div>
                    </div>
                    <h4>盘点基础信息</h4>
                    <div>
                        <el-button class="themeColor" @click="SelectionGoods" v-if="hideGood">选择商品</el-button>
                    </div>
                    <hr />
                    <div class="konge"></div>
                    <div class="soList">
                        <div class="sotl">
                            <span>仓库：</span>
                            <p class="sotlname">
                                <el-select placeholder="请选择" v-model="wareKu">
                                    <el-option
                                        v-for="item in options"
                                        :key="item.code"
                                        :label="item.name"
                                        :value="item.code"
                                    ></el-option>
                                </el-select>
                            </p>
                        </div>
                        <div class="sotl sotl2">
                            <span>盘点范围：</span>
                            <p class="sotlname">
                                <el-select placeholder="请选择" v-model="invenFan" @change="changeFan">
                                    <el-option
                                        v-for="item in fanwei"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </p>
                        </div>
                    </div>
                    <!-- 整仓盘点 -->
                    <div v-if="hideAll">
                        <el-table :data="tableData" style="width: 100%;" border max-height="600">
                            <el-table-column prop="code" label="货号" align="center"></el-table-column>
                            <el-table-column prop="name" label="品名" align="center" width="150"></el-table-column>
                            <el-table-column label="商品分类" align="center" width="180">
                                <template
                                    scope="scope"
                                >{{scope.row.typeLevel1}}/{{scope.row.typeLevel2}}/{{scope.row.typeLevel3}}</template>
                            </el-table-column>
                            <el-table-column prop="barcode" label="国际条码" align="center" width="150"></el-table-column>
                            <el-table-column prop="unit" label="单位" align="center"></el-table-column>
                            <el-table-column prop="spec" label="规格" align="center"></el-table-column>
                            <el-table-column prop="paperCount" label="账面数量" align="center"></el-table-column>
                        </el-table>
                    </div>
                    <!-- 指定商品 -->
                    <div v-if="hideG">
                        <el-table :data="goodsSet" style="width: 100%;">
                            <el-table-column prop="code" label="货号" align="center"></el-table-column>
                            <el-table-column prop="name" label="品名" align="center" width="150"></el-table-column>
                            <el-table-column label="商品分类" align="center" width="220">
                                <template
                                    scope="scope"
                                >{{scope.row.typeLevel1}}/{{scope.row.typeLevel2}}/{{scope.row.typeLevel3}}</template>
                            </el-table-column>
                            <el-table-column prop="barcode" label="国际条码" align="center" width="150"></el-table-column>
                            <el-table-column prop="unit" label="单位" align="center"></el-table-column>
                            <el-table-column prop="spec" label="规格" align="center"></el-table-column>
                            <el-table-column prop="paperCount" label="账面数量" align="center"></el-table-column>
                            <!-- <el-table-column label="操作" align='center'>
                        <template scope="scope">
                            <span class="codesty" @click="delRetuen(scope.row)">删除</span>
                        </template>
                            </el-table-column>-->
                        </el-table>
                    </div>
                    <div class="konge"></div>
                    <!-- 判断选择仓库和盘点范围 -->
                    <div class="hideBtn">
                        <el-button class="theBtn themeColor textMright" @click="submitForm">确定</el-button>
                        <el-button class="theBtn resetButton" @click="resetForm">返回</el-button>
                    </div>
                    <!-- 选择商品弹窗 -->
                    <el-dialog title="选择商品" :visible.sync="dialogVisible2" width="950px">
                        <div class="choosestore">
                            <el-row class="rowSpacing">
                                <el-col :span="12">
                                    <div class="classify">
                                        <span>商品分类：</span>
                                        <div class="classify1">
                                            <el-select
                                                v-model="typeLevel1"
                                                size="mini"
                                                placeholder="请选择"
                                                @change="choose"
                                                style="margin-left:0"
                                            >
                                                <el-option
                                                    v-for="item in TypeLevel1"
                                                    :key="item.value"
                                                    :label="item.name"
                                                    :value="item.code"
                                                ></el-option>
                                            </el-select>

                                            <el-select
                                                v-model="typeLevel2"
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
                                            <el-select
                                                v-model="typeLevel3"
                                                size="mini"
                                                placeholder="请选择"
                                            >
                                                <el-option
                                                    v-for="item in TypeLevel3"
                                                    :key="item.value"
                                                    :label="item.name"
                                                    :value="item.code"
                                                ></el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                </el-col>
                                <el-col :span="12" class="textAlignRight">
                                    <div>
                                        <span class="temperSty">温层：</span>
                                        <el-select
                                            class="TongYiInput"
                                            v-model="temperature"
                                            size="mini"
                                            placeholder="请选择"
                                        >
                                            <el-option
                                                v-for="(item,index) in optionsTemp"
                                                :key="index"
                                                :label="item.name"
                                                :value="item.name"
                                            ></el-option>
                                        </el-select>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="8">
                                    <div>
                                        <span class="textTitle70px textAlignRight">货号：</span>
                                        <el-input
                                            class="dialogInput"
                                            v-model="goodsCode"
                                            placeholder="请输入商品货号"
                                        ></el-input>
                                    </div>
                                </el-col>
                                <el-col :span="8" class="textAlignCenter">
                                    <div>
                                        <span class="textTitle">品名：</span>
                                        <el-input
                                            class="dialogInput"
                                            v-model="goodsName"
                                            placeholder="请输入商品名称"
                                        ></el-input>
                                    </div>
                                </el-col>
                                <el-col :span="8" class="textAlignRight">
                                    <div>
                                        <div class>
                                            <el-button
                                                class="theBtn queryButton"
                                                @click="goodsChaxun"
                                            >查询</el-button>
                                            <el-button
                                                class="theBtn resetButton"
                                                @click="goodsReset"
                                            >重置</el-button>
                                        </div>
                                    </div>
                                </el-col>
                            </el-row>

                            <div class="konge"></div>
                            <div class="chooseBox2">
                                <el-table
                                    ref="multipleTable"
                                    :data="optionsGoods"
                                    tooltip-effect="dark"
                                    style="width: 100%"
                                    @selection-change="handleSelectionChange2"
                                    @select-all="selectAll"
                                    :row-key="getGoodsCode"
                                >
                                    <el-table-column
                                        type="selection"
                                        width="55"
                                        align="center"
                                        :reserve-selection="true"
                                    ></el-table-column>
                                    <el-table-column prop="code" label="货号" align="center"></el-table-column>
                                    <el-table-column prop="name" label="品名" align="center"></el-table-column>
                                    <el-table-column prop="unit" label="单位" align="center"></el-table-column>
                                    <el-table-column prop="spec" label="规格" align="center"></el-table-column>
                                    <el-table-column prop="temperature" label="温层" align="center"></el-table-column>
                                </el-table>
                                <div>
                                    <div class="dialogSureBox">
                                        <el-button
                                            class="theBtn themeColor textMright"
                                            @click="isSureGoods"
                                        >确定</el-button>
                                        <el-button
                                            class="theBtn resetButton"
                                            @click="isSureGoods"
                                        >取消</el-button>
                                    </div>
                                    <div class="dialog_pagination">
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
                    </el-dialog>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import qs from "qs";
export default {
    name: "orDepots",
    data() {
        return {
            options: [],
            wareKu: "",
            invenFan: "",
            hideAll: false,
            hideGood: false,
            hideG: false,
            // hideAssign:false,
            dialogVisible2: false,
            fanwei: [
                {
                    label: "请选择",
                    value: "请选择"
                },
                {
                    label: "整仓盘点",
                    value: "A"
                },
                {
                    label: "指定商品",
                    value: "B"
                }
            ],
            tableData: [], //整仓列表
            typeLevel1: "",
            typeLevel2: "",
            typeLevel3: "",
            goodsCode: "",
            goodsName: "",
            temperature: "",
            TypeLevel1: [], //商品类型
            TypeLevel2: [],
            TypeLevel3: [],
            optionsGoods: [], //商品列表
            optionsTemp: [], //温层下拉选
            multipleSelection2: [],
            goodsSet: [], //选择商品之后存放的列表
            goodsCodeSet: [], //商品code
            radioList: "",
            optionCode: "", //仓库选择后的code
            pageNum: 1,
            pageSize: 20,
            total: 0
        };
    },
    created() {
        // this.enterCity();
        this.showother();
        this.showGoods();
        this.showTemper();
    },
    methods: {
        // 盘点范围判断
        changeFan() {
            if (this.invenFan == "请选择") {
                this.hideAll = false;
                this.hideGood = false;
            }
            if (this.invenFan == "A") {
                this.hideAll = true;
                this.hideGood = false;
                this.hideG = false;
                // 调接口
                this.showAreaGoods();
            }
            if (this.invenFan == "B") {
                this.hideGood = true;
                this.hideAll = false;
                this.hideG = !this.hideG;
            }
        },
        showother() {
            this.$axios({
                url: "public/warehouse/list",
                method: "POST",
                headers: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                data: qs.stringify({
                    token: sessionStorage.getItem("token")
                })
            }).then(res => {
                if (res.data.code == "0000") {
                    this.options = res.data.data.list;
                }
            });
        },
        // 选择商品列表
        SelectionGoods() {
            this.dialogVisible2 = true;
            this.showAreaGoods(this.pageNum, this.pageSize);
        },
        showAreaGoods(pageNum, pageSize) {
            this.$axios({
                url: "public/inventory/goods/list",
                method: "POST",
                headers: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                data: qs.stringify({
                    token: sessionStorage.getItem("token"),
                    typeLevel1: this.typeLevel1,
                    typeLevel2: this.typeLevel2,
                    typeLevel3: this.typeLevel3,
                    goodsCode: this.goodsCode,
                    goodsName: this.goodsName,
                    temperature: this.temperature,
                    warehouseCode: this.wareKu,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                })
            }).then(res => {
                if (res.data.code == "0000") {
                    this.tableData = res.data.data.list;
                    this.optionsGoods = res.data.data.list;
                    this.total = res.data.data.total;
                }
            });
        },
        // 选择一行数据
        handleSelectionChange2(val) {
            this.multipleSelection2 = val;
            // this.multipleSelection2 = val.map(item => {
            //     console.log(item)
            //     return item.code
            // })
        },
        // 多选
        selectAll(selection) {
            this.multipleSelection2 = selection;
            // this.multipleSelection2 = selection.map(item =>{
            //     console.log(item)
            //     return item.code
            // })
        },
        getGoodsCode(row) {
            return row.code;
        },
        // 点击确定
        isSureGoods() {
            if (this.multipleSelection2 == "")
                return this.$message.error("请选择商品信息");
            this.goodsSet = this.multipleSelection2;
            this.dialogVisible2 = false;
            this.hideG = true; //选择后的列表展示
        },
        // 删除
        delRetuen(code) {
            this.goodsSet.splice(code, 1);
        },
        // 商品下拉选
        showGoods() {
            this.$axios({
                url: window.apiUrl + "goods/type/list",
                method: "POST",
                headers: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                data: qs.stringify({
                    pcode: "0",
                    token: sessionStorage.getItem("token")
                })
            }).then(res => {
                if (res.data.code == "0000") {
                    this.TypeLevel1 = res.data.data;
                }
            });
        },
        // change事件
        choose(value) {
            this.typeLevel2 = "";
            this.typeLevel3 = "";
            this.TypeLevel3 = [];
            let token = sessionStorage.getItem("token");
            this.$axios({
                url: window.apiUrl + "goods/type/list",
                method: "POST",
                headers: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                data: qs.stringify({
                    pcode: value,
                    token: token
                })
            }).then(res => {
                if (res.data.code == "0000") {
                    this.TypeLevel2 = res.data.data;
                }
            });
        },
        // 下拉change事件
        choose2(value) {
            this.typeLevel3 = "";
            let token = sessionStorage.getItem("token");
            this.$axios({
                url: window.apiUrl + "goods/type/list",
                method: "POST",
                headers: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                data: qs.stringify({
                    pcode: value,
                    token: token
                })
            }).then(res => {
                if (res.data.code == "0000") {
                    this.TypeLevel3 = res.data.data;
                }
            });
        },
        //  温层下拉选
        showTemper() {
            let _this = this;
            let token = sessionStorage.getItem("token");
            let code = "goods_temperature";
            _this
                .$axios({
                    url: window.apiUrl + "dictionary/list",
                    method: "POST",
                    headers: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    data: qs.stringify({
                        token: token,
                        code: code
                    })
                })
                .then(res => {
                    if (res.data.code == "0000") {
                        _this.optionsTemp = res.data.data;
                    }
                });
        },
        // 商品查询，重置
        goodsChaxun() {
            this.showAreaGoods(this.pageNum, this.pageSize);
        },
        goodsReset() {
            this.typeLevel1 = "";
            this.typeLevel2 = "";
            this.typeLevel3 = "";
            this.goodsCode = "";
            this.goodsName = "";
            this.temperature = "";
            this.showAreaGoods();
        },
        // 分页
        handleSizeChange(val) {
            this.pageSize = val;
            this.showAreaGoods(this.pageNum, val);
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.showAreaGoods(val, this.pageSize);
        },
        // 提交 返回
        submitForm() {
            this.goodsCodeSet = this.goodsSet.map(item => {
                return item.code;
            });
            this.$axios({
                url: window.apiWare + "inventory/add",
                method: "POST",
                headers: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                data: qs.stringify({
                    token: sessionStorage.getItem("token"),
                    warehouseCode: this.wareKu,
                    goodsSet: JSON.stringify(this.goodsCodeSet),
                    scope: this.invenFan
                })
            }).then(res => {
                if (res.data.code == "0000") {
                    this.$message({
                        message: "新增成功",
                        type: "success"
                    });
                    this.$router.push({ name: "wareInventory" });
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
        resetForm() {
            this.$router.push({ name: "wareInventory" });
        }
    },
    filters: {
        statusTip(value) {
            if (value == "W") {
                return "待审核";
            } else if (value == "S") {
                return "审核通过";
            } else if (value == "F") {
                return "审核不通过";
            }
        }
    }
};
</script>
<style scoped>
.orDepots {
    /* background-color: #f1f6fa; */
    min-height: 647px;
    min-width: 1200px;
}
.DepotsBox {
    background: #fff;
}
.orDepots .rece_Box {
    margin: 0 20px;
    padding-bottom: 30px;
}
.orDepots .nav {
    display: inline-block;
    height: 50px;
    line-height: 50px;
}
.orDepots .demonstration {
    padding-top: 20px;
    padding-bottom: 20px;
}
.plan {
    text-align: center;
    margin-bottom: 15px;
}
.orDepots .block h4 {
    letter-spacing: 2px;
    margin-bottom: 6px;
}
.orDepots .block hr {
    border: 1px solid #e8e8e8;
}
.sotl {
    width: 33%;
}
.sotl p {
    width: 60%;
}
.sotl,
.sotl p {
    display: inline-block;
}
.soList {
    margin-bottom: 30px;
}
.soList .el-range-editor.el-input__inner {
    width: 100%;
}
.couShopSele p {
    display: inline-block;
    width: 20%;
}
.goodSty {
    margin: 0 3px;
}
.temperSty {
    margin-left: 33px;
}
.panAddBtn {
    display: inline-block;
    position: absolute;
    top: -20px;
    right: 0;
}
.zanweiN {
    display: inline-block;
    width: 28px;
}
.chooseBox3 {
    margin: 20px 0;
    position: relative;
}
.chooseBox3 p {
    display: inline-block;
    margin-right: 13px;
    width: 25%;
}
.hideBtn {
    text-align: center;
}
.centerBox {
    text-align: center;
}
.centerImg {
    vertical-align: middle;
    /* margin: 0 20px; */
}
.classify {
    width: 100%;
    height: 32px;
}
.classify1 {
    width: 300px;
    display: inline-block;
    box-sizing: border-box;
}
.classify1 .el-select {
    width: 31%;
    margin-left: 10px;
}
.classify1 .select1 {
    margin-left: 0;
}
.fuhezi{
  display: inline-block;
  position: relative;
  height: 70px;
}
.textposi{
  position: absolute;
    left: 7px;
    bottom: -28px;
    font-size: 14px;
    font-weight: 700;
}
.textposi2{
      position: absolute;
    right: -6px;
    bottom: -18px;
    font-size: 14px;
    font-weight: 700;
}
.textposi3{
   position: absolute;
    right: -5px;
    bottom: -18px;
    font-size: 14px;
    font-weight: 700;
}
</style>
