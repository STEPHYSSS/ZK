<template>
    <div id="storeOutletList" class="minimum">
        <div class="content">
            <h3>商城出库</h3>
            <el-row>
                <el-col :span="6">
                    <div>
                        <span class="textTitle70px">创建日期：</span>
                        <span>
                            <el-date-picker
                                v-model="changeTime"
                                type="daterange"
                                class="input1"
                                @input="change1"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                            ></el-date-picker>
                        </span>
                    </div>
                </el-col>
                <el-col :span="6" class="textAlignCenter">
                    <div>
                        <span class="textTitle70px">单据状态：</span>
                        <div class="TongYiInput">
                            <!-- 入库状态： -->
                            <el-select placeholder="请选择" v-model="ruleForm.status">
                                <el-option label="待发货" value="WD"></el-option>
                                <el-option label="已验收" value="AR"></el-option>
                                <el-option label="已发货" value="AD"></el-option>
                            </el-select>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6" class="textAlignCenter">
                    <div>
                        <span class="textTitle70px">订单编号：</span>
                        <span>
                            <el-input
                                type="text"
                                placeholder="请输入"
                                class="input1"
                                v-model="ruleForm.code"
                            ></el-input>
                        </span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div>
                        <div class="textAlignRight">
                            <el-button class="theBtn queryButton" @click="chaxun">查询</el-button>
                            <el-button class="theBtn resetButton" @click="reset">重置</el-button>
                        </div>
                    </div>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="8">
                    <div class></div>
                </el-col>
                <el-col :span="8">
                    <div style="margin-left: 25%; white-space:nowrap"></div>
                </el-col>
                <el-col :span="8">
                    <div style="margin-left: 40%; white-space:nowrap"></div>
                </el-col>
                <el-col></el-col>
            </el-row>
        </div>
        <div>
            <el-table :data="tableData" style="width: 100%;" max-height="600">
                <el-table-column prop="code" label="单据编号" align="center"></el-table-column>
                <el-table-column label="创建日期" align="center">
                    <template scope="scope">
                        <span>{{scope.row.createTime|fmtDate2}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="单据状态" align="center" width="150">
                    <template scope="scope">
                        <span>{{scope.row.status|statusTip}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="item" label="出库品项数" align="center"></el-table-column>
                <el-table-column prop="count" label="出库总数" align="center"></el-table-column>

                <el-table-column prop="orderCode" label="关联订单" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                        <el-tooltip class="tips" effect="dark" content="出库" placement="bottom">
                            <img
                                src="@/images/chuku1_icon.png"
                                v-if="scope.row.status=='WD'"
                                @click="toDetail(scope.row.code)"
                                alt
                            />
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="查看" placement="bottom">
                            <img
                                src="@/assets/chaxun_icon.png"
                                v-if="scope.row.status=='AD'"
                                class="codesty"
                                @click="toDetail(scope.row.code)"
                                alt
                            />
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagesize">
                <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="ruleForm.pageNum"
                    :page-sizes="[20, 40, 60]"
                    :page-size="ruleForm.pageSize"
                    class="page"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="tableDataTotal"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import qs from "qs";
export default {
    name: "procurementList",
    data() {
        return {
            changeTime: "",
            ruleForm: {
                token: sessionStorage.getItem("token"),
                pageNum: 1,
                pageSize: 20,
                createTimeStart: "",
                createTimeEnd: "",
                status: "",
                code: ""
            },
            tableDataTotal: 0,
            tableData: []
        };
    },
    created() {
        this.getList();
    },
    methods: {
        change1(e) {
            this.ruleForm.createTimeStart = this.$moment(e[0]).format(
                "YYYY-MM-DD"
            );
            this.ruleForm.createTimeEnd = this.$moment(e[1]).format(
                "YYYY-MM-DD"
            );
        },
        chaxun() {
            this.getList();
        },
        reset() {
            this.ruleForm.code = "";
            this.ruleForm.status = "";
            this.changeTime = "";
            this.ruleForm.createTimeStart = "";
            this.ruleForm.createTimeEnd = "";
            this.getList();
        },
        getList() {
            this.$axios
                .post("/warehouse/out/stock/list", qs.stringify(this.ruleForm))
                .then(res => {
                    if (res.data.code === "0000") {
                        this.tableData = res.data.data.list;
                        this.tableDataTotal = res.data.data.total;
                    } else if (res.data.code === "6666") {
                        this.$message({
                            showClose: true,
                            message: "token异常，请重新登录",
                            type: "error"
                        });
                        const timer = setTimeout(() => {
                            clearTimeout(timer);
                            this.$router.push({ name: "login" });
                        }, 3000);
                    }
                });
        },
        toDetail(code) {
          console.log(code)
            let codes = sessionStorage.setItem("code", code);
            this.$router.push({
                name: "outOfStockDetail",
                params: {
                    code: codes
                }
            });
        },
        handleSizeChange(val) {
            this.ruleForm.pageSize = val;
            this.getList();
        },
        handleCurrentChange(val) {
            this.ruleForm.pageNum = val;
            this.getList();
        }
    },
    filters: {
        statusTip(value) {
            if (value == "WD") {
                return "待发货";
            } else if (value == "AD") {
                return "已发货";
            } else if (value == "AR") {
                return "已验收";
            }
        }
    }
};
</script>
<style scoped>
#storeOutletList .nav {
    display: inline-block;
    height: 50px;
    line-height: 50px;
}
#storeOutletList .content {
    box-sizing: border-box;
    background-color: #fff;
    padding: 0px 20px;
    height: 150px;
}
#storeOutletList h4 {
    padding-bottom: 10px;
}
#storeOutletList .content .el-input__inner {
    border: 1px solid #dcdfe6;
    width: 80%;
}
#storeOutletList .pinName {
    text-align: right;
    /* margin-right: 20px; */
}
#storeOutletList .btnAdd {
    /* background-color: #01c8dc; */
    color: #fff;
    margin-bottom: 10px;
}
#storeOutletList .mg {
    margin-top: 25px;
}
#storeOutletList .pagesize {
    height: 60px;
}
#storeOutletList .page {
    margin-top: 20px;
}
h3 {
    padding: 20px 0 20px 0px;
}
</style>
