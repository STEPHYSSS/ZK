<template>
    <div class="inventory minimum minWidth1600">
        <div class="inventoryBox">
            <div class="addStore">
                <!-- <span class="titleText">门店库存</span> -->
                <el-button class="increase themeColor" @click="newIncrease">
                    <i class="el-icon-plus"></i>新增
                </el-button>
            </div>
        </div>
        <div class="storeInfo">
            <div class="inventory_Box">
                <el-table :data="tableData" style="width: 100%" border max-height="600">
                    <el-table-column align="center" prop="storeName" label="门店名称"></el-table-column>
                    <el-table-column align="center" prop="goodsCode" label="商品编号"></el-table-column>
                    <el-table-column align="center" prop="goodsName" label="品名"></el-table-column>
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
            </div>
        </div>
    </div>
</template>
<script>
import qs from "qs";
export default {
    data() {
        return {
            dialogVisible: false,
            id: "",
            formInline: {
                token: "",
                typeLevel1: "",
                typeLevel2: "",
                typeLevel3: "",
                temperature: "",
                goodsCode: "",
                goodsName: "",
                barcode: "",
                supplierCode: "",
                supplierName: ""
            },
            TypeLevel1: [], //商品类型
            TypeLevel2: [],
            TypeLevel3: [],
            tableData: [],
            options: [],
            pageNum: 1,
            pageSize: 20,
            total: 0
        };
    },
    created() {
        this.getInventory(this.pageNum);
        // this.showother();
    },
    methods: {
        sure() {
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/store/stock/delete",
                    qs.stringify({
                        questionCode: sessionStorage.getItem("questionUUid"),
                        id: this.id
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.dialogVisible = false;
                        this.$message.success("删除成功！");
                        this.areaSetting();
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });
        },
        del(id) {
            this.id = id;
            this.dialogVisible = true;
            this.getInventory();
        },
        submit(row) {
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/store/stock/update",
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
                name: "shopStock"
            });
        },
        getInventory() {
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/store/stock/list",
                    qs.stringify({
                        questionCode: sessionStorage.getItem("questionUUid")
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.tableData = res.data.data;
                    }
                });
        }
    }
};
</script>
<style scoped>
.inventory {
    /* background-color: #f1f6fa; */
    min-height: 647px;
    min-width: 1200px;
}
.inventoryBox,
.storeInfo {
    margin: 0 auto;
    background: #fff;
    /* border-radius: 10px; */
}
.inventory_Box1 {
    margin-left: 20px;
    margin-right: 20px;
    padding-bottom: 30px;
}
.inventory_Box {
    padding-bottom: 30px;
}
.inventory .cit {
    width: 31%;
}
#colstyleF {
    white-space: nowrap;
}
.shop2 {
    margin: 0 4px;
}
.TongYi {
    width: 65%;
}
.sotlname {
    width: 60%;
}
.sotlname2 {
    width: 60.5%;
}
.colright {
    text-align: right;
}
.cit,
.TongYi,
.sotlname,
.sotlname2 {
    display: inline-block;
}
.inventory .el-range-editor.el-input__inner {
    width: 100%;
}
.invenBtn {
    width: 100%;
    text-align: right;
}
.but_flot {
    height: 50px;
    float: right;
    margin-top: 20px;
    margin-right: 2%;
}
.tishi {
    padding: 20px 0;
}
.zhanwei {
    display: inline-block;
    width: 21px;
}
.jianju {
    margin-right: 5px;
}
.xuan_Store_Box .tishi .xuan_tit {
    padding: 0;
}
.xuantip {
    color: #c8c8c8;
}
.xuanList {
    margin-bottom: 30px;
}
.nav {
    display: inline-Block;
    height: 50px;
    line-height: 50px;
}
.inventory_tit {
    padding-top: 20px;
    padding-bottom: 20px;
}
.first {
    margin-bottom: 30px;
}
.inquiry,
.reset {
    width: 80px;
    height: 30px;
    border: none;
    border-radius: 5px;
    float: right;
}
.reset {
    border: 1px solid #01c8dc;
    color: #01c8dc;
    background-color: #fff;
    margin-left: 20px;
    margin-right: 16px;
}
.inquiry {
    color: #fff;
    background-color: #01c8dc;
}
.inquiry:hover {
    opacity: 0.7;
    cursor: pointer;
}
.storeInfo {
    /* clear: both;
  margin-top: 30px; */
}
table,
table tr th,
table tr td {
    border: 1px solid #c6c6c6;
}
table {
    border-collapse: collapse;
}
.listTab th {
    background-color: #01c8dc;
    color: #fff;
}
.hove {
    border-top: 1px solid #ccd3df;
    border-bottom: 1px solid #ccd3df;
    height: 40px;
}
.resule {
    padding-left: 10px;
    display: inline-block;
}
.resule:hover {
    color: #01c8dc;
    cursor: pointer;
}
.hove:hover {
    background-color: #dcf9fc;
}
.addStore {
    display: inline-block;
    margin-bottom: 16px;
}
.pagin {
    margin: 20px;
    position: relative;
    height: 20px;
}
.pagin_p {
    position: absolute;
    right: 0;
}
.mard {
    letter-spacing: 2px;
}
.distpicker-address-wrapper select {
    width: 245px;
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




