<template>
    <div>
        <el-row style="padding-bottom: 15px;">
            <el-col :span="12">
                选择门店：
                <el-select style="width:300px" type="text" v-model="storeCode" placeholder="请选择">
                    <el-option v-for="i in options1" :key="i.code" :label="i.name" :value="i.code"></el-option>
                </el-select>
            </el-col>
            <el-col :span="12">
                <div>
                    <el-button class="AllquedingBtn" @click="chooseGoods">选择商品</el-button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
            </el-col>
        </el-row>
        <el-dialog title="选择商品" :visible.sync="dialogVisible" width="950px">
            <div class="right" style="width:100%;">
                <div class="shopsto">
                    <!-- <el-row style="white-space: nowrap;">
                            <el-col :span="10">
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
                                    <el-select
                                        v-model="formInline.typeLevel3"
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
                                </p>
                            </el-col>
                            <el-col :span="7" class="TongRight">
                                <span>温层：</span>
                                <p>
                                    <el-select type="text" v-model="formInline.temperature">
                                        <el-option
                                            v-for="(item,index) in statu"
                                            :key="index"
                                            :label="item.name"
                                            :value="item.name"
                                            placeholder="请选择"
                                        ></el-option>
                                    </el-select>
                                </p>
                            </el-col>
                            <el-col :span="7" class="TongRight">
                                <span>品名：</span>
                                <p>
                                    <el-input
                                        type="text"
                                        placeholder="请输入"
                                        v-model="formInline.goodsName"
                                    />
                                </p>
                            </el-col>
                    </el-row>-->
                    <!-- <div class="konge"></div> -->
                    <!-- <el-row style="white-space: nowrap;">
                            <el-col :span="18">
                                <span>
                                    货
                                    <em class="huoNumzan"></em>号：
                                </span>
                                <p style="width: 290px;">
                                    <el-input
                                        type="text"
                                        placeholder="请输入"
                                        v-model="formInline.goodsCode"
                                    />
                                </p>
                            </el-col>
                            <el-col :span="6" class="TongRight">
                                <el-button @click="queryList" class="theBtn queryButton">查询</el-button>
                                <el-button class="theBtn resetButton" @click="resetCommodity">重置</el-button>
                            </el-col>
                    </el-row>-->
                </div>
                <div class="tab">
                    <el-table
                        :data="clist"
                        border
                        style="width: 100%"
                        max-height="247"
                        ref="multipleTable1"
                        @select-all="selectAllProduct"
                        @select="commodityList"
                        @row-click="clickRow"
                    >
                        <el-table-column
                            type="selection"
                            width="55"
                            align="center"
                            class="leftTitle"
                        ></el-table-column>
                        <el-table-column align="center" prop="code" label="货号"></el-table-column>
                        <el-table-column align="center" prop="name" label="品名"></el-table-column>
                        <el-table-column align="center" prop="unit" label="单位"></el-table-column>
                        <el-table-column align="center" prop="spec" label="规格"></el-table-column>
                        <el-table-column align="center" prop="salesPrice" label="单品售价"></el-table-column>
                    </el-table>
                </div>
                <div class="pageFenye">
                    <div class="PromotBtn">
                        <el-button class="AllquedingBtn" @click="shopSure">确定</el-button>
                        <el-button class="theBtn resetButton" @click="dialogVisible = false">取消</el-button>
                    </div>
                    <!-- <el-pagination
                            @size-change="handleSizeChange1"
                            @current-change="handleCurrentChange1"
                            :current-page="currentPage"
                            :page-sizes="[20,40,60,80]"
                            :page-size="formData.pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="clistTotal"
                    ></el-pagination>-->
                </div>
            </div>
        </el-dialog>
        <div class="tab" v-if="flag">
            <el-table :data="selectGoodsList" style="width: 90%" border max-height="300">
                <el-table-column align="center" prop="code" label="货号"></el-table-column>
                <el-table-column align="center" prop="name" label="品名"></el-table-column>
                <el-table-column align="center" prop="salesPrice" label="单品售价"></el-table-column>
                <el-table-column align="center" prop="orderingUtil" label="基本订购单位"></el-table-column>

                <el-table-column align="center" label="数量">
                    <template slot-scope="scope">
                        <!-- <span>{{}}</span> -->
                        <input
                            type="number"
                            class="inputTd"
                            @input="getTotal(scope.row,scope.$index)"
                            v-model="scope.row.number"
                        />
                        <!-- <el-input v-model="scope.row.number"></el-input> -->
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="salesPrice" label="总订购量">
                    <template slot-scope="scope">{{scope.row.totalNumber}}</template>
                </el-table-column>
                <!-- <input class="inputTd" type="text"  /> -->
                <!-- <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <span class="codesty" @click="shopDel(scope.$index,scope.row.code)">删除</span>
                    </template>
                </el-table-column>-->
            </el-table>
        </div>
        <div class="PromotBtn">
            <el-button class="AllquedingBtn" @click="submit" :disabled="disabled">确定</el-button>
            <el-button class="theBtn resetButton" @click="goBack">取消</el-button>
        </div>
    </div>
</template>
<script>
import qs from "qs";
export default {
    data() {
        return {
            options1: [],
            storeCode: "",
            dialogVisible: false,
            clist: [],
            goodsSet: [],
            selectGoodsList: [],
            flag: false,
            disabled: false
        };
    },
    created() {
        this.showother();
        this.getList();
    },
    methods: {
        clickRow(row) {
            this.$refs.multipleTable1.toggleRowSelection(row);
             if (!row.flag) {
                row.flag = true;
                row.number = "";
                row.totalNumber = "";
            } else {
                row.flag = false;
            }
            if (row.flag) {
                this.selectGoodsList.push(row);
            }
            this.selectGoodsList.forEach((item, index) => {
                if (!item.flag) {
                    this.selectGoodsList.splice(index, 1);
                }
            });
        },
        commodityList(selection, row) {
            if (!row.flag) {
                row.flag = true;
                row.number = "";
                row.totalNumber = "";
            } else {
                row.flag = false;
            }
            if (row.flag) {
                this.selectGoodsList.push(row);
            }
            this.selectGoodsList.forEach((item, index) => {
                if (!item.flag) {
                    this.selectGoodsList.splice(index, 1);
                }
            });
        },
        getTotal(row, index) {
            this.$nextTick(() => {
                this.selectGoodsList[index].totalNumber =
                    this.selectGoodsList[index].orderingUtil *
                    this.selectGoodsList[index].number;
            });
            this.$set(this.selectGoodsList, index, row);
        },
        goBack() {
            this.$router.push("/invoice");
        },
        submit() {
            this.disabled = true;
            setInterval(() => {
                this.disabled = false;
            }, 3000);
            if (!this.storeCode) return this.$message.error("请选择门店");
            this.goodsSet = this.selectGoodsList.map(item => {
                return {
                    goodsCode: item.code,
                    number: item.number
                };
            });
            for (let i = 0; i < this.goodsSet.length; i++) {
                if (!this.goodsSet[i].number) {
                    return this.$message.error("请输入数量");
                }
            }
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/ordering/insert",
                    qs.stringify({
                        questionCode: sessionStorage.getItem("questionUUid"),
                        storeCode: this.storeCode,
                        goodsSet: JSON.stringify(this.goodsSet)
                    })
                )
                .then(res => {
                    if (res.data.code == "0000") {
                        this.$message.success("新增成功！");
                        this.$router.push("/invoice");
                    } else {
                        return this.$message.error(res.data.msg);
                    }
                });
        },
        shopSure() {
            this.dialogVisible = false;
            this.flag = true;
        },
        selectAllProduct(selection) {
            this.clist.forEach((item, index) => {
                if (selection.length == 0) {
                    item["flag"] = false;
                } else {
                    item["flag"] = true;
                }
            });
            this.selectGoodsList = selection;
            // this.selectGoodsList = data;
            // this.selectGoodsList.forEach(item => {
            //     (item.number = ""), (item.totalNumber = "");
            // });
        },
        chooseGoods() {
            this.dialogVisible = true;
        },
        getList() {
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/goods/list",
                    qs.stringify({
                        questionCode: sessionStorage.getItem("questionUUid")
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.clist = res.data.data;
                        this.clist.forEach(item => {
                            item.flag = false;
                        });
                    }else{
                         return this.$message.error(res.data.msg);
                    }
                });
        },
        showother() {
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/store/list",
                    qs.stringify({
                        questionCode: sessionStorage.getItem("questionUUid")
                    })
                )
                .then(res => {
                    if ((res.data.code = "0000")) {
                        this.options1 = res.data.data;
                    }else {
                         return this.$message.error(res.data.msg);
                    }
                });
        }
    }
};
</script>
<style scoped>
.tab {
    padding: 0 20px;
}
.PromotBtn {
    padding: 10px 20px;
    text-align: center;
}
.inputWidth {
    width: 60px;
}
.inputTd {
    outline: none;
    border: 1px solid #dbe0e5;
    width: 80%;
    height: 28px;
    border-radius: 8px;
    line-height: 28px;
    /* padding-left: 16px; */
    text-align: center;
    box-sizing: content-box;
    color: #444;
}
</style>
