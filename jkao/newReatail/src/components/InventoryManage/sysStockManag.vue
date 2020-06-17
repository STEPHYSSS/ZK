<template>
    <div class="wareStock minimum minWidth1700">
        <div class="StockBox">
            <h3>库存查询</h3>
            <el-row class="rowSpacing">
                <el-col :span="6">
                    <div>
                        <span class="textTitle textTitleR">品名：</span>
                        <el-input
                            class="input1"
                            type="text"
                            placeholder="请输入"
                            v-model="data.goodsName"
                        ></el-input>
                    </div>
                </el-col>
                <el-col :span="6" class="textAlignCenter">
                    <div>
                        <span class="textTitle textTitleR">货号：</span>
                        <el-input
                            class="input1"
                            type="text"
                            placeholder="请输入"
                            v-model="data.goodsCode"
                        ></el-input>
                    </div>
                </el-col>
                <el-col :span="6" class="textAlignCenter">
                    <div>
                        <span class="textTitle70px">国际条码：</span>
                        <el-input
                            class="input1"
                            type="text"
                            placeholder="请输入"
                            v-model="data.barcode"
                        ></el-input>
                    </div>
                </el-col>
                <el-col :span="6" class="textAlignRight">
                    <div>
                        <span class="textTitle70px">存放货位：</span>
                        <el-input
                            class="input1"
                            type="text"
                            placeholder="请输入"
                            v-model="data.locationCode"
                        ></el-input>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <div></div>
                </el-col>
                <el-col :span="6">
                    <div></div>
                </el-col>
                <el-col :span="6">
                    <div></div>
                </el-col>
                <el-col :span="6" class="colMleft75">
                    <div>
                        <div class="textAlignRight">
                            <el-button class="theBtn queryButton" @click="checkStock">查询</el-button>
                            <el-button class="theBtn resetButton" @click="resStock">重置</el-button>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="StockInfo">
            <div>
                <el-table :data="tableData" style="width: 100%;" max-height="600">
                    <el-table-column prop="code" label="货号" align="center"></el-table-column>
                    <el-table-column prop="name" label="品名" align="center" width="150"></el-table-column>
                    <el-table-column prop="barcode" label="国际条码" align="center" width="150"></el-table-column>
                    <el-table-column prop="spec" label="规格" align="center"></el-table-column>
                    <el-table-column prop="unit" label="单位" align="center"></el-table-column>
                    <el-table-column label="保质期" align="center">
                        <template scope="scope">{{scope.row.period}}{{scope.row.periodUnit}}</template>
                    </el-table-column>
                    <el-table-column prop="temperature" label="温层" align="center"></el-table-column>
                    <el-table-column prop="warehouseName" label="所在仓库" align="center" width="150"></el-table-column>
                    <el-table-column prop="locationCode" label="存放货位" align="center"></el-table-column>
                    <el-table-column prop="stock" label="现有数量" align="center"></el-table-column>
                    <el-table-column prop="frozenStock" label="分配数量" align="center"></el-table-column>
                </el-table>
                <div style="height:50px">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="data.pageNum"
                        :page-sizes="[20, 40, 60]"
                        :page-size="data.pageSize"
                        background
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="data.total"
                        class="pagination"
                    ></el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import qs from "qs";
export default {
    name: "wareStock",
    data() {
        return {
            data: {
                goodsCode: "", //货号
                goodsName: "", //品名
                barcode: "", //国际条码
                locationCode: "", //存放货位
                pageNum: 1,
                pageSize: 20,
                total: 0,
                token: sessionStorage.getItem("token")
            },
            tableData: []

        };
    },
    created() {
        this.stockList();
    },
    methods: {
        stockList(pageNum, pageSize) {
            this.$axios
                .post("/sys/stock/warehouse/list", qs.stringify(this.data))
                .then(res => {
                    if (res.data.code == "0000") {
                        this.tableData = res.data.data.list;
                        this.data.total = res.data.data.total;
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
        // 查询 重置
        checkStock() {
            this.stockList();
        },
        resStock() {
            this.data.goodsCode = ""; //货号
            this.data.goodsName = ""; //品名
            this.data.barcode = ""; //国际条码
            this.data.locationCode = ""; //存放货位
            this.stockList();
        },
        // 分页
        handleSizeChange(val) {
            this.data.pageSize = val;
            this.stockList(this.pageNum, val);
        },
        handleCurrentChange(val) {
            this.data.pageNum = val;
            this.stockList(val, this.pageSize);
        }
    }
};
</script>
<style scoped>
.wareStock {
    /* background-color: #f1f6fa; */
    min-height: 647px;
    min-width: 1700px;
}
.StockBox {
    height: 200px;
    padding: 0 20px;
}
.wareStock .Stock_Box {
    margin-left: 30px;
    margin-right: 30px;
    padding-bottom: 30px;
}
.wareStock .nav {
    display: inline-block;
    height: 50px;
    line-height: 50px;
}
.wareStock .StockTit {
    padding-top: 20px;
    padding-bottom: 20px;
}
.wareStock .el-button {
    margin: 0;
    margin-left: 8px;
}
.aaa {
    width: 66%;
}
.cit {
    width: 30%;
}
.shop2 {
    margin: 0 2px;
}
.bbb {
    width: 34%;
    text-align: right;
}
.bbb .typ {
    width: 58%;
}
.sotl,
.stokeBtn {
    width: 33%;
}
.sotl p,
.stokeBtn p {
    width: 60%;
}
.aaa,
.cit,
.shop2,
.bbb,
.bbb .typ,
.sotl,
.sotl p,
.stokeBtn,
.stokeBtn p {
    display: inline-block;
}
.sotl2 {
    text-align: right;
}
.sotl2 .sotlname {
    margin-right: 5px;
}
.zanweiN {
    display: inline-block;
    width: 28px;
}
h3 {
    padding: 20px 0 20px 0px;
}
</style>

