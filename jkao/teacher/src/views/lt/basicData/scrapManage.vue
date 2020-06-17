<template>
    <div class="scrapManage minWidth1600 minimum">
        <div class="billMa">
            <!-- <h3>报废单管理</h3> -->
            <div class="billMaList">
                <el-row>
                    <el-col :span="6">
                        <div>
                            <span class="textTitle70px">报废日期：</span>
                            <el-date-picker
                                v-model="scrapTime"
                                class="input1"
                                type="daterange"
                                @input="scrapchange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                            ></el-date-picker>
                        </div>
                    </el-col>
                    <el-col :span="6" class="textAlignCenter">
                        <div>
                            <span class="textTitle70px">报废状态：</span>
                            <p class="TongYiInput">
                                <el-select type="text" v-model="ruleForm.status">
                                    <el-option
                                        v-for="(item,index) in statusList"
                                        :key="index"
                                        :label="item.label"
                                        :value="item.value"
                                        placeholder="请选择"
                                    ></el-option>
                                </el-select>
                            </p>
                        </div>
                    </el-col>
                    <el-col :span="6" class="textAlignCenter">
                        <div>
                            <span class="sotretype5">报废单编号：</span>
                            <!-- <p> -->
                            <el-input
                                class="input1"
                                type="text"
                                placeholder="请输入"
                                v-model="ruleForm.code"
                            ></el-input>
                            <!-- </p> -->
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div>
                            <div class="textAlignRight">
                                <el-button class="theBtn queryButton" @click="chaxun">查询</el-button>
                                <el-button @click="reset" class="theBtn resetButton">重置</el-button>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="billMa2">
            <div class="billMaList2">
                <div class="addStore">
                    <el-button class="increase themeColor" @click="newIncrease">
                        <i class="el-icon-plus"></i>新增
                    </el-button>
                </div>

                <!-- <div class="billsearch">
            <div class="increaseBox">
          <div class="addBtnBox">
            <div class="serchBoxBtn60">
              <el-button class="increase themeColor" @click="newIncrease">
                <i class="el-icon-plus"></i>新增
              </el-button>
            </div>
          </div>
        </div>
                </div>-->
                <el-table :data="tableData" style="width: 100%;" border>
                    <el-table-column label="报废单编号" align="center" width="220">
                        <template slot-scope="scope">
                            <span
                                class="codesty"
                                @click="scrapdetai(scope.row.code)"
                            >{{scope.row.code}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="创建日期" align="center">
                        <template slot-scope="scope">{{scope.row.createTime|converTime('YYYY-MM-DD')}}</template>
                    </el-table-column>
                    <el-table-column label="报废状态" align="center">
                        <template slot-scope="scope">{{scope.row.status| scrapStatus }}</template>
                    </el-table-column>
                    <el-table-column prop="item" label="报废品项数" align="center"></el-table-column>
                    <el-table-column prop="count" label="报废总数" align="center"></el-table-column>
                    <el-table-column prop="amount" label="报废总金额" align="center"></el-table-column>
                    <el-table-column label="操作" align="center" fixed="right">
                        <!-- <template slot-scope="scope">
                            <span
                                class="codesty"
                                v-if="scope.row.status=='1'"
                                @click="delbillRow(scope.row.code)"
                            >删除</span>
                        </template> -->
                         <template slot-scope="scope">
                            <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                                <img
                                    src="@/assets/images/shanchu_icon.png"
                                    @click="delbillRow(scope.row.code)"
                                    class="codesty"
                                    alt
                                />
                            </el-tooltip>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="height:50px">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageNum"
                        :page-sizes="[20,40,60]"
                        :page-size="pageSize"
                        background
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total"
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
    name: "scrapManage",
    data() {
        return {
            scrapTime: [],
            statusList: [
                {
                    value: "1",
                    label: "待审核"
                },
                {
                    value: "2",
                    label: "审核通过"
                },
                {
                    value: "3",
                    label: "审核不通过"
                }
            ],
            ruleForm: {
                createTimeStart: "", //创建时间开始
                createTimeEnd: "", //创建时间结束
                status: "",
                code: "",
                token: sessionStorage.getItem("token")
            },
            tableData: [],
            pageNum: 1,
            pageSize: 20,
            total: 0
        };
    },
    created() {
        this.scrapList(this.pageNum, this.pageSize);
    },
    methods: {
        shenhe(code) {
            this.$router.push({
                name: "scrapDetails",
                query: {
                    code: code
                }
            });
        },
        newIncrease() {
            this.$router.push({
                name: "scrapadd"
            });
        },
        scrapList(pageNum, pageSize) {
            this.$utils({
                url: this.reqApi.xinls + "/exam/scrap/list",
                method: "POST",
                headers: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                data: qs.stringify({
                    createTimeStart: this.ruleForm.createTimeStart, //创建时间开始
                    createTimeEnd: this.ruleForm.createTimeEnd, //创建时间结束
                    status: this.ruleForm.status,
                    code: this.ruleForm.code,
                    token: sessionStorage.getItem("token"),
                    pageNum: 1,
                    pageSize: 20,
                    total: 0,
                    questionCode: sessionStorage.getItem("questionUUid")
                })
            }).then(res => {
                if (res.data.code == "0000") {
                    this.tableData = res.data.data;
                    // this.total = res.data.data.total;
                } else if (res.data.code == "6666") {
                    this.$message({
                        showClose: true,
                        message: "token异常，请重新登录",
                        type: "error"
                    });
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
                        this.reqApi.xinls + "/exam/scrap/delete",
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
                            this.scrapList()
                        }else {
                          return this.$message.error(res.data.msg)
                        }
                    });
            });
        },
        // 详情
        scrapdetai(code) {
            sessionStorage.setItem("code", code);
            let codes = sessionStorage.getItem("code");
            this.$router.push({
                name: "scrapdetail",
                params: {
                    code: codes
                }
            });
        },
        // 查询 重置
        chaxun() {
            this.scrapList();
        },
        reset() {
            this.scrapTime = ""; //创建日期
            this.ruleForm.status = "";
            this.ruleForm.code = "";
            this.ruleForm.createTimeStart = "";
            this.ruleForm.createTimeEnd = "";
            this.scrapList();
        },
        // 分页
        handleSizeChange(val) {
            this.pageSize = val;
            this.billList(this.pageNum, val);
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.billList(val, this.pageSize);
        },
        scrapchange(e) {
            this.ruleForm.createTimeStart = this.$moment(e[0]).format(
                "YYYY-MM-DD"
            );
            this.ruleForm.createTimeEnd = this.$moment(e[1]).format(
                "YYYY-MM-DD"
            );
        }
    },
    filters: {
        scrapStatus(value) {
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
.scrapManage {
    min-height: 647px;
    min-width: 1200px;
}
.billMa {
    height: 43px;
}
.billMa,
.billMa2 {
    margin: 0px auto;
    background: #fff;
}
h3 {
    padding: 20px 0 20px 20px;
}
.billMaList {
    margin: 0 20px;
}
.billMaList2 {
    box-sizing: border-box;
    padding: 0px 0px 50px 0px;
}
.pagination {
    float: right;
    margin-top: 30px;
    margin-bottom: 30px;
}
.baofeiDay {
    width: 33%;
}
#billInput {
    text-align: left;
    width: 100%;
    padding-bottom: 20px;
}
#billInput tr {
    width: 100%;
}
#billInput .barNum {
    width: 30%;
    text-align: center;
}
#billInput .pinName {
    width: 30%;
    text-align: right;
}
/* .billsearch{
    height: 60px;
    text-align: right;
    line-height: 60px;
} */
#billInput .el-range-editor.el-input__inner {
    width: 300px;
}
.createDay {
    letter-spacing: 2.8px;
}
p {
    display: inline-block;
    width: 56%;
}
.btnfloat {
    float: right;
    margin-right: 8px;
}
.input1 {
    width: 70%;
}
.addStore {
    text-align: right;
    margin-bottom: 20px;
}
</style>
