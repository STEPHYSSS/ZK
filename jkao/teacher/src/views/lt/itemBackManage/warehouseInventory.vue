<template>
    <div class="wareStock minimum minWidth1600">
        <!-- <h3>仓库库存</h3>
        <el-button @click="newIncrease">
            <i class="el-icon-plus"></i>新增
        </el-button> -->
         <div class="addStore">
                <!-- <span class="titleText">仓库库存</span> -->
                <el-button class="increase themeColor" @click="newIncrease">
                    <i class="el-icon-plus"></i>新增
                </el-button>
            </div>
        <div class="StockInfo">
            <div>
                <el-table :data="tableData" style="width: 100%;" border max-height="600">
                    <el-table-column prop="goodsName" label="商品名称" align="center"></el-table-column>
                    <el-table-column prop="goodsCode" label="商品编号" align="center"></el-table-column>
                    <el-table-column prop="warehouseCode" label="仓库名称" align="center"></el-table-column>
                    <!-- <el-table-column prop="stock" label="库存数量" align="center"></el-table-column> -->
                     <el-table-column align="center" prop="stock" label="库存数量">
                        <template slot-scope="scope">
                            <el-input
                                v-model="scope.row.stock"
                                @keyup.enter.native="submit(scope.row)"
                            ></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="操作" fixed="right">
                      <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                            <!-- <div class="dis"> -->
                            <img
                                src="@/assets/images/shanchu_icon.png"
                                class="codesty"
                                @click="del(scope.row.id)"
                            />
                            <!-- </div> -->
                        </el-tooltip>&nbsp;&nbsp;
                      </template>
                    </el-table-column>
                    <!-- <el-table-column prop="unit" label="单位" align="center"></el-table-column> -->
                    <!-- <el-table-column label="保质期" align="center">
                        <template slot-scope="scope">{{scope.row.period}}{{scope.row.periodUnit}}</template>
                    </el-table-column> -->
                    <!-- <el-table-column prop="temperature" label="温层" align="center"></el-table-column> -->
                    <!-- <el-table-column prop="warehouseName" label="所在仓库" align="center" width="150"></el-table-column> -->
                    <!-- <el-table-column prop="locationCode" label="存放货位" align="center"></el-table-column> -->
                    <!-- <el-table-column prop="stock" label="现有数量" align="center"></el-table-column> -->
                    <!-- <el-table-column prop="frozenStock" label="分配数量" align="center"></el-table-column> -->
                </el-table>
                <el-dialog title="提示" :visible.sync="dialogVisible" width="300px">
                    <div style="text-align:center;height:50px;">
                        <span>确定删除？</span>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="sure">确 定</el-button>
                        <el-button @click="dialogVisible = false">取 消</el-button>
                    </span>
                </el-dialog>
               <!--  <div style="height:50px">
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
                </div> -->
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
          dialogVisible:false,
            goodsCode: "", //货号
            goodsName: "", //品名
            barcode: "", //国际条码
            locationCode: "", //存放货位
            tableData: [],
            pageNum: 1,
            pageSize: 20,
            total: 0
        };
    },
    created() {
        this.stockList();
    },
    methods: {
      sure() {
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/warehouse/stock/delete",
                    qs.stringify({
                        questionCode: sessionStorage.getItem("questionUUid"),
                        id: this.id
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.dialogVisible = false;
                        this.$message.success("删除成功！");
                        this.stockList();
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });
        },
        del(id) {
            this.id = id;
            this.dialogVisible = true;
        },
      submit(row) {
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/warehouse/stock/update",
                    qs.stringify({
                        questionCode: row.questionCode,
                        id: row.id,
                        count: row.stock
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.$message.success("修改成功！");
                        this.getInventory();
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });
        },
      newIncrease() {
            this.$router.push({
                name: "warehouseInventoryAdd"
            });
        },
        stockList(pageNum, pageSize) {
          this.$utils.post(this.reqApi.xinls+'/exam/warehouse/stock/list',qs.stringify({
            questionCode:sessionStorage.getItem("questionUUid"),
          })).then(res=>{
            if(res.data.code==='0000'){
              this.tableData = res.data.data
            }else {
            }
          })
          return
            this.$axios({
                url: window.apiWare + "stock/list",
                method: "POST",
                headers: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                data: qs.stringify({
                    token: sessionStorage.getItem("token"),
                    goodsCode: this.goodsCode,
                    goodsName: this.goodsName,
                    barcode: this.barcode,
                    locationCode: this.locationCode,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                })
            }).then(res => {
                if (res.data.code == "0000") {
                    this.tableData = res.data.data.list;
                    this.total = res.data.data.total;
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
            this.goodsCode = ""; //货号
            this.goodsName = ""; //品名
            this.barcode = ""; //国际条码
            this.locationCode = ""; //存放货位
            this.stockList();
        },
        // 分页
        handleSizeChange(val) {
            this.pageSize = val;
            this.stockList(this.pageNum, val);
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.stockList(val, this.pageSize);
        }
    }
};
</script>
<style scoped>
.wareStock {
    /* background-color: #f1f6fa; */
    min-height: 647px;
    min-width: 1200px;
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
.titleText {
    display: inline-block;
    float: left;
    font-size: 14px;
    font-weight: 700;
}
.addStore {
    text-align: right;
    margin-bottom: 20px;
    width: 100%;
}
</style>

