<template>
    <el-card class="f-new box-card" id="new-question">
        <h3>选择账套</h3>
        <div class="outBox">
            <div class="left">
                <div class="searchBox">
                    <span>账套名称：</span>
                    <el-input v-model="name" clearable class="inputWidth1"></el-input>
                    <el-button class="btnStyle" @click="search">搜索</el-button>
                </div>
                <div class="btnbox444" v-if="$route.query.locked==2">
                    <el-button class="btnStyle" @click="clear" :disabled="flag">无账套</el-button>
                    <el-button class="btnStyle" @click="copy">复制账套</el-button>
                    <el-button @click="dialogVisible1=true" class="btnStyle">新建账套</el-button>
                    <el-tooltip content="清除选中账套" placement="bottom" effect="light"></el-tooltip>
                </div>

                <div>
                    <el-table
                        :data="tableData"
                        style="width:100%"
                        class="tableStyle"
                        max-height="500px"
                        id="zhangtao"
                        empty-text="暂无数据，请先设置试题账套"
                        @row-click="chooseone"
                    >
                        <el-table-column label="选择" align="center" width="60">
                            <template slot-scope="scope">
                                <el-radio
                                    :label="scope.row.code"
                                    v-model="code"
                                    @change.native="getCurrentRow(scope.row)"
                                >{{scope.$index+1}}</el-radio>
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="账套名称" align="center"></el-table-column>
                        <el-table-column prop="remark" label="备注" align="center"></el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="right">
                <div class="tree">
                    <span class="menuTitle">类目管理</span>
                    <el-tree
                        style="font-size:12px;"
                        highlight-current
                        :data="goodsTypeTree"
                        :props="defaultProps"
                        default-expand-all
                    ></el-tree>
                </div>
                <div class="tableBox">
                    <span class="menuTitle">商品管理</span>
                    <el-table :data="goodsList" style="width:70%" border max-height="250px">
                        <el-table-column prop="name" label="品名" align="center"></el-table-column>
                        <el-table-column prop="remark" label="商品分类" width="160px" align="center">
                            <template
                                slot-scope="scope"
                            >{{scope.row.typeLevel1}}/{{scope.row.typeLevel2}}/{{scope.row.typeLevel3}}</template>
                        </el-table-column>
                        <el-table-column prop="unit" label="单位" align="center"></el-table-column>
                        <el-table-column prop="spec" label="规格" align="center"></el-table-column>
                    </el-table>
                    <span class="menuTitle">仓库设置</span>
                    <el-table :data="warehouseList" style="width:70%" border max-height="250px">
                        <el-table-column label="序号" align="center">
                            <template slot-scope="{row,$index}">{{$index+1}}</template>
                        </el-table-column>
                        <el-table-column prop="name" label="仓库名称" align="center"></el-table-column>
                        <el-table-column label="所在区域" width="160px" align="center">
                            <template
                                slot-scope="scope"
                            >{{scope.row.province}}/{{scope.row.city}}/{{scope.row.area}}</template>
                        </el-table-column>
                        <el-table-column prop="attribute" label="仓库属性" align="center"></el-table-column>
                    </el-table>
                    <span class="menuTitle">库区设置</span>
                    <el-table :data="regionList" style="width:70%" border max-height="250px">
                        <el-table-column prop="name" label="库区名称" align="center"></el-table-column>
                        <el-table-column prop="warehouseCode" label="所属仓库" align="center"></el-table-column>
                        <el-table-column prop="shelves" label="货架数量" align="center"></el-table-column>
                        <el-table-column prop="capacity" label="库位容量" align="center"></el-table-column>
                    </el-table>
                    <span class="menuTitle">门店库存</span>
                    <el-table :data="storeStockList" style="width:70%" border max-height="250px">
                        <el-table-column label="序号" align="center">
                            <template slot-scope="{row,$index}">{{$index+1}}</template>
                        </el-table-column>
                        <el-table-column prop="goodsName" label="品名" align="center"></el-table-column>
                        <el-table-column prop="goodsCode" label="货号" align="center"></el-table-column>
                        <el-table-column prop="stock" label="库存数量" align="center"></el-table-column>
                    </el-table>
                    <span class="menuTitle">仓库库存</span>
                    <!-- <el-table :data="warehouseStockList" style="width:70%" border>
                        <el-table-column prop="name" label="账套名称"></el-table-column>
                        <el-table-column prop="remark" label="备注"></el-table-column>
                    </el-table>-->
                    <el-table
                        :data="warehouseStockList"
                        style="width:70%"
                        border
                        max-height="250px"
                    >
                        <el-table-column label="序号" align="center">
                            <template slot-scope="{row,$index}">{{$index+1}}</template>
                        </el-table-column>
                        <el-table-column prop="goodsName" label="品名" align="center"></el-table-column>
                        <el-table-column prop="warehouseCode" label="仓库名称" align="center"></el-table-column>
                        <el-table-column prop="stock" label="库存数量" align="center"></el-table-column>
                    </el-table>
                </div>
            </div>
            <!-- <el-button @click="back">上一步</el-button> -->
            <div class="BtnBoxs" style="margin-left:15px;">
                <el-button class="btnStyle" @click="pre">上一步</el-button>
                <el-button class="btnStyle" @click="next">下一步</el-button>

                <el-button class="btnStyle" @click="goBack">返回</el-button>
            </div>
        </div>
        <!-- 新建账套 -->
        <el-dialog title="提示" :visible.sync="dialogVisible1" width="450px">
            <el-form
                :model="ruleForm1"
                :rules="rules1"
                ref="ruleForm1"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-form-item label="账套名称" prop="name">
                    <el-input class="inputWidth" v-model="ruleForm1.name"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input class="inputWidth" v-model="ruleForm1.remark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="submit1('ruleForm1')" :disabled="subBtn">确 定</el-button>
                <el-button @click="dialogVisible1 = false">取 消</el-button>
            </span>
        </el-dialog>
        <!-- 复制账套 -->
        <el-dialog title="提示" :visible.sync="dialogVisible" width="450px">
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-form-item label="账套名称" prop="name">
                    <el-input class="inputWidth" v-model="ruleForm.name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="submit('ruleForm')">确 定</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
    </el-card>
</template>
<script>
import qs from "qs";
export default {
    data() {
        return {
            tableData: [],
            flag: true,
            radio: "",
            name: "",
            questionCode: sessionStorage.getItem("tihaoUUID"),
            dialogVisible: false,
            goodsList: [],
            warehouseList: [],
            regionList: [],
            storeStockList: [],
            warehouseStockList: [],
            goodsTypeTree: [],
            detailData: {},
            subBtn: false,
            defaultProps: {
                children: "children",
                dialogVisible: false,
                label: "label"
            },
            code: "",
            ruleForm: {
                name: "",
                type: "C",
                remark: ""
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入账套名称",
                        trigger: "change"
                    }
                ]
            },
            ruleForm1: {
                name: "",
                type: "C",
                remark: "",
                questionCode: ""
            },
            dialogVisible1: false,
            rules1: {
                name: [
                    {
                        required: true,
                        message: "请输入账套名称",
                        trigger: "change"
                    }
                ]
            }
        };
    },
    created() {
        this.getList();
    },
    methods: {
        chooseone(row) {
            this.code = row.code;
            if (this.flag) {
                this.flag = !this.flag;
            }
            this.getAccountData();
        },
        pre() {
            this.$router.push({
                name: "newQuestion",
                query: {
                    qid: this.$route.query.qid,
                    flag1: this.$route.query.flag1
                }
            });
            return;
            this.$router.go(-1);
        },
        clear() {
            this.flag = true;
            this.code = "";
            this.goodsTypeTree = [];
            this.goodsList = [];
            this.warehouseList = [];
            this.regionList = [];
            this.storeStockList = [];
            this.warehouseStockList = [];
        },
        submit1(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.subBtn = true;
                    setInterval(() => {
                        this.subBtn = false;
                    }, 3000);
                    if (sessionStorage.getItem("tihaoUUID")) {
                        this.ruleForm1.questionCode = sessionStorage.getItem(
                            "tihaoUUID"
                        );
                    }
                    this.$utils
                        .post(
                            this.reqApi.xinls + "/exam/account/add",
                            qs.stringify(this.ruleForm1)
                        )
                        .then(res => {
                            if (res.data.code === "0000") {
                                this.dialogVisible1 = false;
                                this.$message.success("提交成功！！");
                                // 基础数据账套编号
                                sessionStorage.setItem(
                                    "questionUUid",
                                    res.data.data
                                );
                                this.$router.push({
                                    name: "dictionary"
                                });
                            } else {
                                this.$message.error(res.data.msg);
                            }
                        });
                } else {
                    return false;
                }
            });
        },
        submit(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$utils
                        .post(
                            this.reqApi.xinls + "/exam/account/copy",
                            qs.stringify({
                                code: this.code,
                                questionCode: sessionStorage.getItem(
                                    "tihaoUUID"
                                ),
                                name: this.ruleForm.name
                            })
                        )
                        .then(res => {
                            if (res.data.code === "0000") {
                                this.dialogVisible = false;
                                this.$message.success("提交成功！！");
                                sessionStorage.setItem(
                                    "questionUUid",
                                    res.data.data
                                ); // 基础数据账套编号
                                // this.getList()
                                this.$router.push({
                                    name: "dictionary",
                                    query: {
                                        source: "accountSetList"
                                    }
                                });
                            } else {
                                return this.$message.error(res.data.msg);
                            }
                        });
                } else {
                    return false;
                }
            });
        },
        copy() {
            if (!this.code) {
                return this.$message.error("请选择账套");
            }
            this.dialogVisible = true;
            // this.submit();
            // this.dialogVisible = true;
        },
        goBack() {
            // this.$router.go(-1);
            sessionStorage.removeItem("tihaoUUID");
            this.$router.push({
                name: "practicalTraining"
            });
        },
        search() {
            this.getList();
        },
        back() {
            this.$router.push({
                name: ""
            });
        },
        next() {
            // if (!this.code) return this.$message.error("请选择账套！！");

            if (this.$route.query.locked == 1) {
                //锁定状态
                this.$router.push({
                    name: "setAnswer",
                    query: {
                        qid: this.$route.query.qid,
                        flag1: this.$route.query.flag1,
                        locked:this.$route.query.locked
                    }
                });
            } else {
                this.$utils
                    .post(
                        this.reqApi.xinls + "/exam/account/selection",
                        qs.stringify({
                            code: this.code,
                            questionCode: sessionStorage.getItem("tihaoUUID")
                        })
                    )
                    .then(res => {
                        if (res.data.code === "0000") {
                            this.$router.push({
                                name: "setAnswer",
                                query: {
                                    qid: this.$route.query.qid,
                                    flag1: this.$route.query.flag1,
                                    locked:this.$route.query.locked
                                }
                            });
                        } else {
                            return this.$message.error(res.data.msg);
                        }
                    });
            }
        },
        getList() {
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/account/list",
                    qs.stringify({
                        name: this.name,
                        questionCode: sessionStorage.getItem("tihaoUUID"),
                        pageSize: 9999999
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.tableData = res.data.data.list;
                        for (const i of this.tableData) {
                            if (i.selection == 1) {
                                this.flag = false;
                                this.code = i.code;
                                this.getAccountData();
                            }
                        }
                    }
                });
        },
        getCurrentRow(data) {
            if (this.flag) {
                this.flag = !this.flag;
            }
            this.code = data.code;
            this.ruleForm.name = data.name;
            this.ruleForm.remark = data.remark;
            this.getAccountData();
        },
        getAccountData() {
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/account/data",
                    qs.stringify({
                        code: this.code
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.goodsTypeTree = res.data.data.goodsTypeTree;
                        this.goodsList = res.data.data.goodsList;
                        this.warehouseList = res.data.data.warehouseList;
                        this.regionList = res.data.data.regionList;
                        this.storeStockList = res.data.data.storeStockList;
                        this.warehouseStockList =
                            res.data.data.warehouseStockList;
                        // goodsTypeTree
                        // goodsList
                        // warehouseList
                        // regionList
                        // storeStockList
                        // warehouseStockList
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });
        }
    }
};
</script>
<style scoped>
.box-card {
    overflow: hidden;
}
.left {
    width: 355px;
    /* background-color: pink; */
    display: inline-block;
    height: 750px;
    /* float: left; */
    border: 1px solid #eee;
    box-sizing: border-box;
    padding: 10px 18px;
    /* box-shadow: 7px 7px 7px #eee; */
    /* box-shadow: 2px 0px 10px #eee; */
    box-shadow: 2px 0 8px #eee;
    position: absolute;
    left: 0;
}
.right {
    width: 76%;
    /* background-color: yellow; */
    display: inline-block;
    height: 750px;
    /* float: right; */
    position: absolute;
    left: 400px;
    /* box-shadow: -7px 7px 7px #eee; */
    box-shadow: -2px 0px 7px 1px #eee;
}
.inputWidth1 {
    width: 171px;
}
.tree {
    float: left;
    height: 100%;
    width: 30%;
    display: inline-block;
    /* background-color: pink; */
    border: 1px solid #eee;
    font-size: 12px;
}
.tableBox {
    float: right;
    display: inline-block;
    width: 65%;
    border: 1px solid #eee;
    padding-left: 15px;
    height: 100%;
}
.tableStyle {
    border: 1px solid #eee;
    margin-top: 10px;
}
.searchBox {
    white-space: nowrap;
    box-sizing: border-box;
}
.menuTitle {
    font-size: 16px;
    margin: 5px 10px;
    display: inline-block;
}
.inputWidth {
    width: 250px;
}
.outBox {
    /* display: flex; */
    position: relative;
    /* height: 800px; */
    height: 735px;
}
.BtnBoxs {
    position: absolute;
    /* bottom: 0; */
    top: -43px;
    right: 20px;
}
.btnbox444 {
    padding: 5px 0;
    text-align: right;
    font-size: 12px;
}
#new-questionn .el-tree-node__label {
    font-size: 12px;
}
</style>
