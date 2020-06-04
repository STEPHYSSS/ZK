<template>
    <div class="wareCheck minWidth1600">
        <div class="DepotsBox">
            <div class="rece_Box">
                <div class="block">
                    <h3 class="demonstration">盘点复核</h3>
                    <!-- <div style="text-align:center"> 
                        <img class="imgPosition" src="@/Uimage/Inventoryplanning_icon.png" alt />
                        <span class="marginRight">盘点计划</span>
                        <img class="imgPosition" src="@/Uimage/re-check_icon.png" alt />
                        <span class="marginRight" style="vertical:middle">实盘录入</span>
                        <img class="imgPosition" src="@/Uimage/entering_pitchon_icon -1.png" alt />
                        <span class="marginRight">盘点复核</span>
                    </div>-->
                    <div class="centerBox">
                        <div class="fuhezi">
                            <img class="centerImg" src="@/Uimage/Inventoryplanning_icon2.png" alt />
                            <span class="textposi">盘点计划</span>
                        </div>
                        <div class="fuhezi">
                            <img class="centerImg" src="@/Uimage/entering_icon2.png" alt />
                            <span class="textposi2">实盘录入</span>
                        </div>
                        <div class="fuhezi">
                            <img class="centerImg" src="@/Uimage/re-check_icon2.png" alt />
                            <span class="textposi3">盘点复核</span>
                        </div>
                    </div>
                    <div class="konge"></div>
                    <p class="enterInfo">仓库：{{inventory.warehouseCode}}</p>
                    <p class="enterInfo">盘点范围：{{inventory.scope | wareFan}}</p>
                    <p class="enterInfo">创建时间：{{inventory.createTime | converTime('YYYY-MM-DD')}}</p>
                    <div class="konge"></div>
                    <el-table :data="tableData" style="width: 100%;">
                        <el-table-column prop="code" label="货号" align="center"></el-table-column>
                        <el-table-column prop="name" label="品名" align="center" width="150"></el-table-column>
                        <el-table-column label="商品分类" align="center" width="220">
                            <template scope="scope">
                                <span>{{scope.row.typeLevel1}}/{{scope.row.typeLevel2}}/{{scope.row.typeLevel3}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="barcode" label="国际条码" align="center" width="150"></el-table-column>
                        <el-table-column prop="unit" label="单位" align="center"></el-table-column>
                        <el-table-column prop="spec" label="规格" align="center"></el-table-column>
                        <el-table-column prop="paperCount" label="账面数量" align="center"></el-table-column>
                        <el-table-column label="实盘数量" align="center" prop="physicalNum">
                            <template slot-scope="scope">
                                <p class="WarepanNum">
                                    <input
                                        type="text"
                                        oninput="value=value.replace(/[^\d]/g,'')"
                                        v-model="scope.row.physicalNum"
                                    />
                                </p>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="konge"></div>
                    <div class="hideBtn">
                        <el-button
                            class="theBtn themeColor textMright"
                            type="primary"
                            @click="submitForm"
                        >确定</el-button>
                        <el-button class="theBtn resetButton" @click="resetForm">返回</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import qs from "qs";
export default {
    name: "wareCheck",
    data() {
        return {
            physicalNum: "", //盘点数量
            tableData: [],
            inventory: {}
        };
    },
    created() {
        this.getWareInventry();
    },
    methods: {
        // 详情
        getWareInventry() {
            this.$axios({
                url: "warehouse/inventory/detail",
                method: "POST",
                headers: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                data: qs.stringify({
                    token: sessionStorage.getItem("token"),
                    inventoryCode: sessionStorage.getItem("WareInventoryCode")
                })
            }).then(res => {
                if (res.data.code == "0000") {
                    this.tableData = res.data.data.subList;
                    this.inventory = res.data.data.inventory;
                    this.tableData.forEach((item, index) => {
                        this.tableData[index]["physicalNum"] =
                            item.inventoryCount;
                    });
                } else if (res.data.code == "6666") {
                    this.$message({
                        showClose: true,
                        message: "token异常，请重新登录",
                        type: "error"
                    });
                    const timer = setTimeout(() => {
                        clearTimeout(timer);
                        that.$router.push({ name: "login" });
                    }, 3000);
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        },
        // 返回
        resetForm() {
            this.$router.push({ name: "wareInventory" });
        },
        submitForm() {
            for (const i of this.tableData) {
                if (i.physicalNum === "") {
                    this.$message("请填写盘点数量");
                    return false;
                }
            }
            this.goodsCodeSet = this.tableData.map(item => {
                return {
                    subId: item.subId,
                    count: item.physicalNum
                };
            });

            this.$axios({
                url: window.apiWare + "inventory/check",
                method: "POST",
                headers: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                data: qs.stringify({
                    token: sessionStorage.getItem("token"),
                    inventoryCode: sessionStorage.getItem("WareInventoryCode"),
                    subSet: JSON.stringify(this.goodsCodeSet)
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
        }
    },
    filters: {
        wareFan(value) {
            if (value == "A") {
                return "整仓盘点";
            } else if (value == "B") {
                return "指定商品";
            }
        },
        wareStatu(value) {
            if (value == "I") {
                return "盘点中";
            } else if (value == "W") {
                return "待复核";
            } else if (value == "S") {
                return "已完成";
            } else if (value == "F") {
                return "已作废";
            }
        }
    }
};
</script>
<style scoped>
.wareCheck {
    /* background-color: #f1f6fa; */
    min-height: 647px;
    min-width: 1200px;
}
.DepotsBox {
    margin: 0 auto;
    background: #fff;
    border-radius: 10px;
}
.DepotsBox .rece_Box {
    margin-left: 30px;
    margin-right: 30px;
    padding-bottom: 30px;
    padding-top: 20px;
}
.wareCheck .nav {
    display: inline-block;
    height: 50px;
    line-height: 50px;
}
.wareCheck .demonstration {
    padding-top: 20px;
    padding-bottom: 20px;
}
.plan3 {
    text-align: center;
    margin-bottom: 15px;
}
.wareCheck .block h4 {
    letter-spacing: 2px;
    margin-bottom: 6px;
}
.wareCheck .block hr {
    border: 1px solid #e8e8e8;
}
.enterInfo {
    width: 30%;
}
.figSty,
.enterInfo {
    display: inline-block;
}
.figplan3 img,
.figEnter2 img {
    height: 52px;
}
.figplan3 {
    margin-right: 15px;
}
.figplan3,
.figEnter2 {
    text-align: left;
}
.figCheck3 img {
    height: 53px;
}
.figCheck3 {
    text-align: right;
}
.WarepanNum {
    width: 120px;
    margin: 0 auto;
}
.WarepanNum input {
    width: 100%;
    border-radius: 5px;
    border: 1px solid #ccc;
    line-height: 25px;
}
.hideBtn {
    text-align: center;
}
.imgPosition {
    vertical-align: middle;
}
.marginRight {
    margin: 0 30px;
}
.fuhezi {
    display: inline-block;
    position: relative;
    height: 70px;
}
.textposi {
    position: absolute;
    left: 0px;
    bottom: -23px;
    font-size: 14px;
    font-weight: 700;
}
.textposi2 {
    position: absolute;
    right: -6px;
    bottom: -23px;
    font-size: 14px;
    font-weight: 700;
}
.textposi3 {
    position: absolute;
    right: 0px;
    bottom: -27px;
    font-size: 14px;
    font-weight: 700;
}
.centerBox {
    text-align: center;
    height: 95px;
}
.centerImg {
    vertical-align: middle;
    /* margin: 0 20px; */
}
</style>
