<template>
    <div class="amendment minWidth1600 minimum">
        <flow-chart :flowChart="flowChart"></flow-chart>
        <!-- <div class="amendBox">
            <div class="amend_Box">
                <div class="block">
                    <el-row class="rowSpacing">
                        <el-col :span="6">
                            <div>
                                <span class="sotretype5">修正单状态：</span>
                                <el-select class="input1" v-model="form.status" placeholder="请选择">
                                    <el-option label="待审核" value="1"></el-option>
                                    <el-option label="审核不通过" value="2"></el-option>
                                    <el-option label="已上传意见" value="3"></el-option>
                                    <el-option label="审核通过" value="4"></el-option>
                                    <el-option label="裁定通过" value="5"></el-option>
                                </el-select>
                            </div>
                        </el-col>
                        <el-col :span="6" class="textAlignCenter">
                            <div>
                                <span class="sotretype5">修正单类型：</span>
                                <el-select class="input1" v-model="form.type" placeholder="请选择">
                                    <el-option label="拒收修正" value="rejection"></el-option>
                                    <el-option label="缺货修正" value="shortage"></el-option>
                                </el-select>
                            </div>
                        </el-col>
                        <el-col :span="6" class="textAlignCenter">
                            <div>
                                <span class="sotretype5">修正单编号：</span>
                                <el-input
                                    class="input1"
                                    type="text"
                                    placeholder="请输入内容"
                                    v-model="form.code"
                                ></el-input>
                            </div>
                        </el-col>
                        <el-col :span="6" class="textAlignRight">
                            <div>
                                <span class="sotretype5">配送单编号：</span>

                                <el-input
                                    class="input1"
                                    type="text"
                                    placeholder="请输入内容"
                                    v-model="form.deliveryCode"
                                ></el-input>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row class>
                        <el-col :span="6">
                            <div>
                                <span class="sotretype5 textTitleC">创建日期：</span>
                                <el-date-picker
                                    style="width: 260px;line-height: 35px; height: 35px;"
                                    v-model="create_time"
                                    @change="change($event, 'data2')"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                ></el-date-picker>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div></div>
                        </el-col>
                        <el-col :span="6">
                            <div></div>
                        </el-col>
                        <el-col :span="6" style="margin-left:50%">
                            <div class="textAlignRight">
                                <el-button class="theBtn queryButton" @click="inquiry">查询</el-button>
                                <el-button @click="reset" class="theBtn resetButton">重置</el-button>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div> -->
        <div class="amendInfo">
            <div class="amend_Box">
                <el-table :data="list" style="width: 100%;" border>
                    <el-table-column prop="code" label="修正单编号" align="center"></el-table-column>
                    <el-table-column label="修正单类型" align="center">
                        <template slot-scope="scope">{{scope.row.type | typeTip}}</template>
                    </el-table-column>
                    <el-table-column prop="count" label="修正数量" align="center"></el-table-column>
                    <el-table-column prop="amount" label="修正金额（元）" align="center"></el-table-column>
                    <el-table-column label="修正单状态" align="center">
                        <template slot-scope="scope">{{scope.row.status | statusTips}}</template>
                    </el-table-column>
                    <el-table-column label="创建日期" align="center">
                        <template slot-scope="scope">{{scope.row.createTime | converTime('YYYY-MM-DD')}}</template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-tooltip class="tips" effect="dark" content="一审" placement="bottom">
                                <img
                                    src="@/assets/images/present_icon_one.png"
                                    class="codesty"
                                    v-if="scope.row.status==1"
                                    @click="yishen(scope.row.code)"
                                    alt
                                />
                            </el-tooltip>
                            <el-tooltip class="tips" effect="dark" content="二审" placement="bottom">
                                <img
                                    src="@/assets/images/present_icon_one.png"
                                    class="codesty"
                                    v-if="scope.row.status==2"
                                    @click="ershen(scope.row.code)"
                                    alt
                                />
                            </el-tooltip>
                            <el-tooltip class="tips" effect="dark" content="终审" placement="bottom">
                                <img
                                    src="@/assets/images/present_icon_one.png"
                                    class="codesty"
                                    v-if="scope.row.status==3"
                                    @click="zhongshen(scope.row.code)"
                                    alt
                                />
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="查看" placement="bottom">
                                <img
                                    src="@/assets/images/chaxun_icon.png"
                                    class="codesty"
                                    @click="kanDetail(scope.row.code,scope.row.status)"
                                    alt
                                />
                            </el-tooltip>
                             <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                                <img
                                    src="@/assets/images/shanchu_icon.png"
                                    @click="delPanRow(scope.row.code)"
                                    class="codesty"
                                    alt
                                />
                            </el-tooltip>
                            <!-- <span v-if="scope.row.status == 2" class="codesty" @click="ershen(scope.row.code)">审核</span>
                            <span v-else class="codesty" @click="kanDetail(scope.row.code,scope.row.status)">查看</span>-->
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
                <div class="kongge"></div>
            </div>
        </div>
    </div>
</template>
<script>
import qs from "qs";
import flowChart from "./flowChart";
export default {
    name: "amendment",
    data() {
        return {
            list: [],
            create_time: [],
            form: {
                status: "",
                type: "",
                deliveryCode: "",
                code: "",
                createTimeStart: "",
                createTimeEnd: ""
            },
            pageNum: 1,
            pageSize: 20,
            total: 0,
            flowChart: {
                name: "门店修正",
                type: 4
            },
        };
    },
    created() {
        this.getlist(this.pageNum, this.pageSize);
    },
     components: {
        flowChart
    },
    methods: {
         // 删除
        delPanRow(code) {
            this.$confirm("删除后员工将无法登陆,确定提交?", "提示:", {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
            }).then(()=>{
                 this.$utils({
                url: this.reqApi.xinls + "/exam/amendent/delete",
                method: "POST",
                headers: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                data: qs.stringify({
                    code: code,
                    questionCode: sessionStorage.getItem("questionUUid")
                })
            }).then(res => {
                if (res.data.code == "0000") {
                    this.$message({
                        type: "success",
                        message: "删除成功!"
                    });
                    this.getlist();
                } else {
                    this.$message.error(res.data.msg);
                }
            });
            })

        },
      zhongshen(code){
        this.$router.push({
                name: "xiuCheck",
                query: {
                    code
                }
            });
      },
        yishen(code) {
            this.$router.push({
                name: "examine",
                query: {
                    code
                }
            });
        },
        inquiry() {
            this.getlist();
        },
        reset() {
            this.form.status = "";
            this.form.type = "";
            this.form.deliveryCode = "";
            this.form.code = "";
            this.form.createTimeStart = "";
            this.form.createTimeEnd = "";
            this.create_time = [];
            this.getlist();
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getlist(this.pageNum, val);
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.getlist(this.pageSize, val);
        },
        change(e, name) {
            this.form.createTimeStart = this.$moment(e[0]).format("YYYY-MM-DD");
            this.form.createTimeEnd = this.$moment(e[1]).format("YYYY-MM-DD");
        },
        getlist(pageNum, pageSize) {
            this.$utils({
                url: this.reqApi.xinls + "/exam/amendent/list",
                method: "POST",
                headers: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                data: qs.stringify({
                    questionCode: sessionStorage.getItem("questionUUid"),
                    status: this.form.status,
                    type: this.form.type,
                    deliveryCode: this.form.deliveryCode,
                    code: this.form.code,
                    createTimeStart: this.form.createTimeStart,
                    createTimeEnd: this.form.createTimeEnd,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                })
            }).then(res => {
                if (res.data.code == "0000") {
                    this.list = res.data.data;
                    // this.total = res.data.data.total;
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        },
        // 查看审核详情，待审核详情
        kanDetail(code, status) {
            this.$router.push({
                name: "refuse",
                query: {
                    code: code,
                    status: status
                }
            });
        },
        // 审核上传意见
        ershen(code) {
            this.$router.push({
                name: "upload",
                query: {
                    code: code
                }
            });
        }
    },
    filters: {
        typeTip(value) {
            if (value == "rejection") {
                return "拒收修正";
            } else if (value == "shortage") {
                return "缺货修正";
            }
        },
        statusTips(value) {
            if (value == "1") {
                return "待审核";
            } else if (value == "2") {
                return "审核不通过";
            } else if (value == "3") {
                return "已上传意见";
            } else if (value == "4") {
                return "审核通过";
            } else if (value == "5") {
                return "裁定通过";
            }
        }
    }
};
</script>
<style scoped>
.amendment {
    min-height: 647px;
    /* min-width: 1200px; */
}
.amendBox,
.amendInfo {
    margin: 0 auto;
    background: #fff;
    /* border-radius: 10px; */
}
.amend_Box {
    padding-bottom: 20px;
    /* margin-left: 30px;
  margin-right: 30px;
  padding-bottom: 30px; */
}
.block {
    height: 120px;
    padding-top: 20px;
    margin: 0 20px;
}
.nav {
    display: inline-block;
    height: 50px;
    line-height: 50px;
}
.amendCheck {
    padding-top: 20px;
    padding-bottom: 20px;
}
.tableHeader {
    background-color: #01c8dc;
    color: #fff;
}
.tableHeader th {
    font-weight: 400;
}
.List {
    width: 100%;
}
.cit {
    width: 30%;
}
.shop2 {
    margin: 0 4px;
}
.amendment .TongYi {
    width: 56%;
}
.amendment .sotlnameTime {
    width: 56%;
}
.sotlnameTime2 {
    width: 60.5%;
}
.colright {
    text-align: right;
}
.cit,
.TongYi,
.sotlnameTime,
.sotlnameTime2 {
    display: inline-block;
}
h3 {
    padding: 0px 0 20px 0px;
}
/* .aaa{
  width: 66%;
}
 .cit{
  width: 30%;
}
 .shop2{
  margin: 0 2px;
}
.bbb{
  width: 34%;
  text-align: right;
}
.bbb .typ{
  width: 58%;
}
.sotl{
  width: 33%;
}
.sotl p{
  width: 60%;
}
.aaa,.cit,.shop2,.bbb,.bbb .typ,.sotl,.sotl p{
  display: inline-block;
}
.sotl2{
  text-align: right;
}
.sotl2 .sotlname{
  margin-right: 5px;
}
.soList{
    margin-bottom: 30px;
}
.soList .el-range-editor.el-input__inner {
  width: 100%;
} */
.rece_btn_flot {
    width: 100%;
    text-align: right;
}
.amendInfo {
    clear: both;
    /* margin-top: 30px; */
}
.colWiths {
    text-align: center;
}
.peiWidth {
    letter-spacing: 3px;
}
/* .amendInfo_box table th {
  color: #444444;
} */
/* .pagin {
  margin: 20px;
  position: relative;
  height: 20px;
}
.pagin_p {
  position: absolute;
  right: 0;
} */
/* .page {
  margin-top: -1px;
} */
/* @import "../../styles/regular.css"; */
</style>


