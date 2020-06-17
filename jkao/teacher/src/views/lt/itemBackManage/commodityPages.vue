<template>
    <div class="shopmanagement">
        <div class="dingdanRece">
            <div class="dingdanMain">
                <div class="addStore">
                    <!-- <span class="titleText">商品管理</span> -->
                    <router-link to="/supplier">
                        <el-button class="increase themeColor">
                            <i class="el-icon-plus"></i>新增
                        </el-button>
                    </router-link>
                </div>
                <el-table :data="tableData" style="width: 100%" border max-height="700px">
                    <el-table-column prop="code" label="货号" align="center"></el-table-column>
                    <el-table-column prop="name" label="品名" align="center">
                        <template slot-scope="scope">
                            <span>{{scope.row.name}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="typeLevel" label="商品分类" align="center">
                        <template
                            slot-scope="scope"
                        >{{scope.row.typeLevel1}}/{{scope.row.typeLevel2}}/{{scope.row.typeLevel3}}</template>
                    </el-table-column>
                    <el-table-column prop="unit" label="单位" align="center"></el-table-column>
                    <el-table-column prop="spec" label="规格" align="center"></el-table-column>
                    <el-table-column label="门店状态" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.status == 1">已上架</span>
                            <span v-else>已下架</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="更新时间" align="center">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.updateTime !=null"
                            >{{scope.row.updateTime | converTime('YYYY-MM-DD')}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" fixed="right">
                        <template slot-scope="scope">
                            <el-tooltip
                                class="item codesty"
                                effect="dark"
                                content="编辑"
                                placement="bottom"
                            >
                                <img
                                    src="@/assets/images/xiugai_icon.png"
                                    @click="editShop(scope.row.code)"
                                    class="imgSize"
                                />
                            </el-tooltip>&nbsp;&nbsp;
                            <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                                <!-- <div class="dis"> -->
                                <img
                                    src="@/assets/images/shanchu_icon.png"
                                    class="codesty"
                                    @click="del(scope.row.code)"
                                />
                            </el-tooltip>
                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog title="提示" :visible.sync="dialogVisible" width="400px">
                    <div class="styleBox">
                        <span>删除商品会关联删除该商品的门店库存、仓库库存、货架商品关系，是否确定删除?</span>
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
            code: "",
            formInline: {
                token: sessionStorage.getItem("token"),
                typeLevel1: "",
                typeLevel2: "",
                typeLevel3: "",
                status: "",
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
            n1: false,
            n2: true,
            n3: true,
            n4: false
        };
    },
    created() {
        this.getList();
    },
    methods: {
        sure() {
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/goods/delete",
                    qs.stringify({
                        questionCode: sessionStorage.getItem("questionUUid"),
                        id: this.id
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.dialogVisible = false;
                        this.$message.success("删除成功！");
                        this.getList();
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });
        },
        del(code) {
            this.code = code;
            this.dialogVisible = true;
        },
        getList() {
            let questionCode=sessionStorage.getItem("questionUUid")
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/goods/list",
                    qs.stringify({
                        questionCode: questionCode
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.tableData = res.data.data;
                    }
                });
        },
        // 编辑
        editShop(code) {
            this.$router.push({
                name: "supplier",
                query: {
                    code: code
                }
            });
        },
    }
};
</script>

<style scoped>
.shopmanagement {
        margin-bottom: 15px;
    min-height: 650px;
    /* background-color: #fff;
    min-height: 647px;
    min-width: 1700px;
    height: 100%;
    box-sizing: border-box; */
    /* box-shadow: 0px 2px 10px #ccc; */
}
/* .shopmanagement .dingdanRece {
    font-size: 12px;
    height: 100%;
    display: flex;
    flex-direction: column;
} */
/* .dingdanflexBox {
    height: 200px;
    margin: 0 20px;
    box-sizing: border-box;
} */
/* .dingdanMain {
    flex: 1;
    -webkit-box-flex: 1;
    position: relative;
    margin-bottom: 90px;
    max-height: 600px;
} */
/* .fenyedignwei {
    position: absolute;
    bottom: -90px;
    right: 0;
} */
/* .shopmanagement .el-range-editor.el-input__inner {
    width: 100%;
} */
/* .shopmanagement .el-select {
    width: 100%;
} */
/* p {
    display: inline-block;
    width: 300px;
} */
/* .shopmanagement .emSpace {
    display: inline-block;
    width: 29px;
} */
/* .widOne {
    width: 93.3px;
} */
/* .widOne:nth-child(3) {
    margin: 0 10px;
} */
/* .imgSize {
    cursor: pointer;
} */
.addStore {
    text-align: right;
    margin-bottom: 20px;
    margin-right: 20px;
}
.el-table--border,
.el-table--group {
    border-right: none;
    border-bottom: none;
}
.titleText {
    display: inline-block;
    float: left;
    font-size: 14px;
    font-weight: 700;
}
.styleBox {
    text-align: center;
    height: 70px;
    padding: 0 20px;
}
</style>
