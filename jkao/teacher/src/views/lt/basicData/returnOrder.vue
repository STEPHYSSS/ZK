<template>
    <div class="billManagerment minWidth1600 minimum">
        <div class="billMa2">
            <div class="billMaList2">
                <div class="addStore">
                    <el-button class="increase themeColor" @click="newIncrease">
                        <i class="el-icon-plus"></i>新增
                    </el-button>
                </div>
                <el-table :data="tableData" style="width: 100%;" border>
                    <el-table-column label="退货单编号" align="center" class="codesty" width="220">
                        <template slot-scope="scope">
                            <span
                                class="codesty"
                                @click="billdetai(scope.row.code)"
                            >{{scope.row.code}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="创建日期" align="center">
                        <template slot-scope="scope">{{scope.row.createTime | converTime('YYYY-MM-DD')}}</template>
                    </el-table-column>
                    <el-table-column label="退货状态" align="center">
                        <template slot-scope="scope">{{scope.row.status | statusTip}}</template>
                    </el-table-column>
                    <el-table-column prop="item" label="退货品项数" align="center"></el-table-column>
                    <el-table-column prop="count" label="退货总数" align="center"></el-table-column>
                    <el-table-column prop="amount" label="退货总金额" align="center"></el-table-column>
                    <el-table-column label="操作" align="center" fixed="right">
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                                <img
                                    src="@/assets/images/shanchu_icon.png"
                                    @click="delbillRow(scope.row.code)"
                                    class="codesty"
                                    alt
                                />
                            </el-tooltip>
                            <el-tooltip class="tips" effect="dark" content="审核" placement="bottom">
                                <img
                                    src="@/assets/images/present_icon_one.png"
                                    alt
                                    v-if="scope.row.status=='1'"
                                    @click="shenhe(scope.row.code)"
                                />
                            </el-tooltip>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>
<script>
import qs from "qs";
export default {
    name: "billManagerment",
    data() {
        return {
            changeTime: [],
            // ruleForm: {
            //   createTimeStart: "", //创建时间开始
            //   createTimeEnd: "", //创建时间结束
            //   status: "",
            //   code: "",
            //   token: sessionStorage.getItem("token")
            // },
            tableData: []
        };
    },
    created() {
        this.billList();
    },
    methods: {
        shenhe(code) {
            this.$router.push({
                name: "returnDetails",
                query: {
                    code: code
                }
            });
        },
        newIncrease() {
            this.$router.push({
                name: "billAdd"
            });
        },
        billList(pageNum) {
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/return/list",
                    qs.stringify({
                        questionCode: sessionStorage.getItem("questionUUid")
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.tableData = res.data.data;
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });
        },
        // 删除
        delbillRow(code) {
            this.$confirm("删除后员工将无法登陆,确定提交?", "提示:", {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
            }).then(() => {
                this.$utils
                    .post(
                        this.reqApi.xinls + "/exam/return/delete",
                        qs.stringify({
                            questionCode: sessionStorage.getItem(
                                "questionUUid"
                            ),
                            code: code
                        })
                    )
                    .then(res => {
                        if (res.data.code === "0000") {
                            this.$message.success("删除成功！");
                            this.billList();
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    });
            });
            return;
            // return/delete
            this.$axios({
                url: window.apiStore + "return/delete",
                method: "POST",
                headers: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                data: qs.stringify({
                    code: code,
                    token: sessionStorage.getItem("token")
                })
            }).then(res => {
                if (res.data.code == "0000") {
                    this.$message({
                        type: "success",
                        message: "删除成功!"
                    });
                    this.billList();
                } else {
                    return this.$message.error(res.data.msg);
                }
            });
        },
        billdetai(code) {
            // sessionStorage.setItem("code", code); // 用户名
            // let codes = sessionStorage.getItem("code");
            this.$router.push({
                name: "billdetail",
                query: {
                    code: code
                }
            });
        }
    },
    filters: {
        statusTip(value) {
            if (value == "1") {
                return "待审核";
            } else if (value == "2") {
                return "审核通过";
            } else if (value == "3") {
                return "审核不通过";
            }
        }
    }
};
</script>
<style scoped>
.billManagerment {
    /* background-color: #f1f6fa; */
    min-height: 647px;
    /* min-width: 1200px; */
}
.billMa,
.billMa2 {
    background: #fff;
    /* border-radius: 10px;
  min-height: 200px; */
}
.billMa {
    /* height: 150px; */
}
.billMaList2 {
    box-sizing: border-box;
    padding-bottom: 30px;
}
.pagination {
    float: right;
    margin-top: 30px;
    margin-bottom: 30px;
}

#billInput {
    text-align: left;
    width: 100%;
    padding-bottom: 20px;
}
#billInput tr {
    width: 100%;
}
#billInput .huoNum {
    width: 30%;
}
#billInput .barNum {
    width: 30%;
    text-align: center;
}
#billInput .pinName {
    width: 30%;
    text-align: right;
}
#billInput .el-range-editor.el-input__inner {
    width: 300px;
}
.addStore {
    text-align: right;
    margin-bottom: 20px;
}
</style>
