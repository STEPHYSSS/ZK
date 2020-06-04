<template>
    <div class="inventoryM minWidth1600 minimum">
        <!-- <h4 style="margin-left:20px;font-size:14px;font-weight:700">盘点管理</h4> -->
        <div class="addStore">
            <el-button class="increase themeColor" @click="newIncrease">
                <i class="el-icon-plus"></i>新增
            </el-button>
        </div>
        <div class="billMa2">
            <div class="billMaList2">
                <el-table :data="tableData" style="width: 100%;" border>
                    <el-table-column prop="code" label="门店编号" align="center"></el-table-column>
                    <el-table-column prop="name" label="门店名称" align="center"></el-table-column>
                    <el-table-column label="所在区域" align="center">
                        <template
                            slot-scope="scope"
                        >{{scope.row.province}}-{{scope.row.city}}-{{scope.row.area}}</template>
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="详细地址"
                        align="center"
                        :show-overflow-tooltip="true"
                    ></el-table-column>
                    <el-table-column label="开店时间" align="center">
                        <template slot-scope="scope">
                            <span>{{scope.row.openTime | converTime('YYYY-MM-DD')}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="停业时间" align="center">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.shutdownTime!=null"
                            >{{scope.row.shutdownTime | converTime('YYYY-MM-DD')}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="状态" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.status =='1'">待开业</span>
                            <span v-else-if="scope.row.status =='2'">营业中</span>
                            <span v-else-if="scope.row.status =='0'">已停业</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="contactsName" label="联系人" align="center"></el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
                                <img
                                    src="@/assets/images/xiugai_icon.png"
                                    @click="editRow(scope.row.code)"
                                    class="codesty"
                                    alt
                                />
                            </el-tooltip>&nbsp;&nbsp;
                            <!-- <el-tooltip
                                class="item"
                                effect="dark"
                                content="重置密码"
                                placement="bottom"
                            >
                                <img
                                    src="@/assets/resetpasswords_icon.png"
                                    @click="open(scope.row.code)"
                                    class="imgSize"
                                />
                            </el-tooltip> -->
                        </template>
                    </el-table-column>
                </el-table>

                <!-- <el-table :data="tableData" style="width: 100%;" border>
                    <el-table-column prop="code" label="盘点单编号" align="center"></el-table-column>
                    <el-table-column label="盘点日期" align="center">
                        <template
                            slot-scope="scope"
                        >{{scope.row.inventoryTime | converTime('YYYY-MM-DD')}}</template>
                    </el-table-column>
                    <el-table-column label="更新时间" align="center">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.updateTime !=null"
                            >{{scope.row.updateTime | converTime('YYYY-MM-DD HH:mm:ss')}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="状态" align="center">
                        <template slot-scope="scope">{{scope.row.status | statusTip}}</template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="dark" content="查看" placement="bottom">
                                <img src="@/assets/images/chaxun_icon.png" @click="chakanP(scope.row.code)" class="codesty" alt />
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
                                <img
                                    src="@/assets/images/xiugai_icon.png"
                                    @click="editRow(scope.row.code)"
                                    class="codesty"
                                    alt
                                />
                            </el-tooltip>&nbsp;&nbsp;
                            <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                                <img
                                    src="@/assets/images/shanchu_icon.png"
                                    @click="delPanRow(scope.row.code)"
                                    class="codesty"
                                    alt
                                />
                            </el-tooltip>
                        </template>
                    </el-table-column>
                </el-table> -->
            </div>
        </div>
    </div>
</template>
<script>
import qs from "qs";
export default {
    name: "inventoryM",
    data() {
        return {
            Invertstatu: [
                {
                    value: "1",
                    label: "待确认"
                },
                {
                    value: "2",
                    label: "已确认"
                }
            ],
            changeTime: [],
            ruleForm: {
                inventoryTimeStart: "", //创建时间开始
                inventoryTimeEnd: "", //创建时间结束
                status: "",
                code: "",
                token: sessionStorage.getItem("token")
            },
            tableData: []
        };
    },
    created() {
        this.getList();
    },
    methods: {
        getList() {
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/store/list",
                    qs.stringify({
                        questionCode: sessionStorage.getItem("questionUUid")
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.tableData = res.data.data;
                    } else {
                        return this.$message.error(res.data.msg);
                    }
                });
        },
        newIncrease() {
            this.$router.push({
                name: "addStore"
            });
        },
        // 选择时间
        Panchange(e) {
            this.ruleForm.inventoryTimeStart = this.$moment(e[0]).format(
                "YYYY-MM-DD"
            );
            this.ruleForm.inventoryTimeEnd = this.$moment(e[1]).format(
                "YYYY-MM-DD"
            );
        },
        // 查看
        chakanP(code) {
            sessionStorage.setItem("Pcode", code);
            this.$router.push({
                name: "inventorydetail",
                params: {
                    code: code
                }
            });
        },
        // 编辑
        editRow(code) {
            sessionStorage.setItem("Pcode", code);
            this.$router.push({
                name: "addStore",
                query: {
                    code: code
                }
            });
        },
        // inventoryadd
        // 删除
        delPanRow(code) {
            this.$confirm("确定删除?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
            })
                .then(() => {
                    this.$utils
                        .post(
                            this.reqApi.xinls + "/exam/inventory/delete",
                            qs.stringify({
                                code: code,
                                questionCode: sessionStorage.getItem(
                                    "questionUUid"
                                )
                            })
                        )
                        .then(res => {
                            if (res.data.code === "0000") {
                                this.$message.success("删除成功");
                                this.getList();
                            } else {
                                return this.$message.error(res.data.msg);
                            }
                        });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        // 查询 重置
        chaxun() {
            this.inventoryList();
        },
        reset() {
            this.changeTime = []; //创建日期
            this.ruleForm.status = "";
            this.ruleForm.code = "";
            this.ruleForm.inventoryTimeStart = "";
            this.ruleForm.inventoryTimeEnd = "";
            this.inventoryList();
        },
        // 分页
        handleSizeChange(val) {
            this.pageSize = val;
            this.inventoryList(this.pageNum, val);
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.inventoryList(val, this.pageSize);
        }
    },
    filters: {
        statusTip(value) {
            if (value == "1") {
                return "待确认";
            } else if (value == "2") {
                return "已确认";
            }
        }
    }
};
</script>
<style scoped>
.inventoryM {
    /* background-color: #f1f6fa; */
}
.billMa {
    height: 150px;
}
.billMa,
.billMa2 {
    background: #fff;
}
h3 {
    padding: 20px 0 8px 20px;
}
.billMaList {
    margin: 0 20px;
}
.billMaList2 {
    box-sizing: border-box;
    /* padding: 15px 30px 50px 35px; */
    padding-bottom: 50px;
}
.pagination {
    float: right;
    margin-top: 30px;
    margin-bottom: 30px;
}
.inventinp,
.inventinp p {
    display: inline-block;
}
.inventoryM .billMaList .huoNum {
    width: 40%;
    text-align: center;
}
.inventoryM .billMaList .huoNum p {
    width: 52%;
}
.billMaList .barNum {
    width: 30%;
    text-align: right;
}
.billMaList .pinName {
    width: 30%;
}
.billMaList .el-range-editor.el-input__inner {
    width: 100%;
}
.createDay {
    letter-spacing: 2.8px;
}
p {
    display: inline-block;
    width: 60%;
}
.btnfloat {
    float: right;
    margin-right: 8px;
}
.zanpan {
    height: 20px;
}
.editrow {
    display: inline-block;
    margin-left: 20px;
}
.addStore {
    text-align: right;
    margin-bottom: 20px;
}
</style>
