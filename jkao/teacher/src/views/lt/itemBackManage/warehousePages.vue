<template>
    <div class="wsetting minWidth1600" id="warehousePages">

        <div class="addStore">
                    <!-- <span class="titleText">仓库设置</span> -->
                    <!-- <router-link to="/supplier"> -->
                        <el-button class="increase themeColor" @click="newIncrease">
                            <i class="el-icon-plus"></i>新增
                        </el-button>
                    <!-- </router-link> -->
                </div>
     
        <div class="wsettingB2">
            <div class="wsettingBList2">
                <el-table :data="tableData" style="width: 100%;" border max-height="700px">
                    <el-table-column prop="code" label="仓库编号" align="center"></el-table-column>
                    <el-table-column prop="name" label="仓库名称" align="center"></el-table-column>
                    <el-table-column label="所在区域" align="center" width="180">
                        <template
                            slot-scope="scope"
                        >{{scope.row.province}}-{{scope.row.city}}-{{scope.row.area}}</template>
                    </el-table-column>
                    <el-table-column prop="attribute" label="仓库属性" align="center" width="190"></el-table-column>
                    <el-table-column label="创建时间" align="center">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.createTime !=null"
                            >{{scope.row.createTime | converTime('YYYY-MM-DD')}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="状态" align="center">
                        <template slot-scope="scope">{{scope.row.status | statusTip}}</template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
                                <!-- <div class="dis"> -->
                                <img
                                    src="@/assets/images/xiugai_icon.png"
                                    class="codesty"
                                    @click="editRow(scope.row.code)"
                                />
                                <!-- </div> -->
                            </el-tooltip>&nbsp;&nbsp;
                            <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                                <!-- <div class="dis"> -->
                                <img
                                    src="@/assets/images/shanchu_icon.png"
                                    class="codesty"
                                    @click="del(scope.row.code)"
                                />
                                <!-- </div> -->
                            </el-tooltip>&nbsp;&nbsp;
                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog title="提示" :visible.sync="dialogVisible" width="400px">
                    <div class="styleBox">
                      <span>删除仓库会关联删除该仓库的库区货架、仓库库存，是否确定删除？</span>
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
    name: "wsetting",
    data() {
        return {
            name: "",
            status: "",
            code: "",
            dialogVisible: false,
            statu: [
                {
                    value: "0",
                    label: "已禁用"
                },
                {
                    value: "1",
                    label: "已启用"
                }
            ],
            Info: {
                token: sessionStorage.getItem("token"),
                code: ""
            },
            tableData: [],
           
        };
    },
    created() {
        this.settingWare(this.pageNum, this.pageSize);
    },
    methods: {
        sure() {
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/warehouse/delete",
                    qs.stringify({
                        questionCode: sessionStorage.getItem("questionUUid"),
                        code: this.code
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.$message.success("删除成功！");
                        this.settingWare();
                        this.dialogVisible=false
                    }
                });
        },
        del(code) {
            this.code = code;
            this.dialogVisible = true;
            return;
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {})
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        newIncrease() {
            this.$router.push({
                name: "storehouseAdd"
            });
        },

        settingWare() {
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/warehouse/list",
                    qs.stringify({
                        questionCode: sessionStorage.getItem("questionUUid")
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.tableData = res.data.data;
                    }
                });
        },
        // 编辑
        editRow(code) {
            sessionStorage.setItem("editwareCode", code);
            this.$router.push({
                name: "storehouseAdd",
                query: {
                    code: code
                }
            });
        },
     
    },
    filters: {
        statusTip(value) {
            if (value == "1") {
                return "启用";
            } else if (value == "0") {
                return "禁用";
            }
        }
    }
};
</script>
<style scoped>
.wsetting {
    /* background-color: #f1f6fa; */
    min-height: 647px;
    min-width: 1200px;
}

.wsettingB,
.wsettingB2 {
    background: #fff;
}
.wsettingB {
    /* padding-bottom: 15px; */
    height: 150px;
}
h3 {
    padding: 20px 0 8px 20px;
}
.wsettingBList {
    margin: 0 20px;
}
.wsettingBList2 {
    box-sizing: border-box;
    padding-bottom: 50px;
}
.pagination {
    float: right;
    margin-top: 30px;
    margin-bottom: 30px;
}
.wsList,
.wsList p {
    display: inline-block;
}
.wsettingBList .wsList_pinName2 {
    width: 40%;
    text-align: center;
}
.wsettingBList .wsList_pinName3 {
    width: 30%;
    text-align: right;
}
.wsettingBList .wsList_pinName {
    width: 30%;
}
.wsettingBList .el-range-editor.el-input__inner {
    width: 300px;
}
.createDay {
    letter-spacing: 2.8px;
}
p {
    display: inline-block;
    width: 67%;
}
.btnfloat {
    float: right;
    margin-right: 8px;
}
.editrow {
    display: inline-block;
    margin-left: 20px;
}
.wsListsearch {
    text-align: right;
    margin-bottom: 10px;
}
.codesty {
    cursor: pointer;
}
.el-table td,
.el-table th {
    padding: auto;
    padding: 0 !important;
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
}
.styleBox {
    text-align: center;
    height: 70px;
    padding: 0 20px;
}
/* .el-message-box__content {
    text-align: left;
    padding: 42px 39px;
} */
</style>
