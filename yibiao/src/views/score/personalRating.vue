<template>
    <div class="outBox">
        <!-- <span v-if="$route.query.type==1">新建评分（普通员工）</span>
        <span v-if="$route.query.type==2">新建评分（部门经理）</span>-->

        <div class="outBox_one">
            <div class="outBox_top">
                <van-nav-bar
                    :title="$route.query.status|filtersType"
                    left-arrow
                    fixed
                    @click-left="onClickLeft"
                    @click-right="del"
                >
                    <!-- 普通员工进来，可以查看详情如果状态W则可以删除 -->
                    <!-- <template #right>
                        <div v-if="$route.query.status=='W'" @click="del">
                            <img src="@/assets/images/delete_icon@2x.png" alt class="imgIcon" />
                            <span class="delText">删除</span>
                        </div>
                    </template>-->
                </van-nav-bar>
                <div>
                    <van-cell title="考评开始时间">
                        <template #default>
                            <span v-if="form.startTime">{{form.startTime|fmtDate1}}</span>
                            <span v-else>请选择</span>
                        </template>
                    </van-cell>
                    <van-cell title="考评结束时间" value="请选择">
                        <template #default>
                            <span v-if="form.endTime">{{form.endTime|fmtDate1}}</span>
                            <span v-else>请选择</span>
                        </template>
                    </van-cell>
                    <van-cell title="填表时间" value="请选择">
                        <template #default>
                            <span>{{form.createTime|fmtDate1}}</span>
                        </template>
                    </van-cell>
                    <van-cell title="考评对象" value="请选择">
                        <template #default>
                            <span>{{form.personnelName}}</span>
                        </template>
                    </van-cell>
                </div>
            </div>
            <div class="tableBox">
                <div class="tableBox_1">
                    <div class="tableBox_2">
                        <div class="tableBox_2_1">
                            <div class="tableBox_title">考核内容</div>
                            <div class="detailTitle" @click="toDetail">
                                详情
                                <img src="@/assets/images/gengduo_icon@2x.png" alt />
                            </div>
                        </div>
                    </div>
                    <div class="contentBox">
                        <el-table
                            :data="form.gradeStandard"
                            stripe
                            :header-cell-style="{background:'#70A5FFFF',color:'#fff'}"
                            border
                            height="100%"
                            class="table_box"
                            :summary-method="getSummaries"
                            show-summary
                            @row-click="choose"
                            style="width: 100%;"
                        >
                            <!-- <el-table-column prop="id" label="ID"></el-table-column> -->
                            <el-table-column prop="name" label="指标" align="center"></el-table-column>
                            <el-table-column
                                prop="score"
                                label="权重（分)"
                                align="center"
                                v-if="manager==0"
                            ></el-table-column>
                            <el-table-column
                                prop="detailLevel"
                                label="自评等级"
                                align="center"
                                v-if="manager==1"
                            >
                                <!-- <template>
                                <span></span>-->
                                <!-- <van-button round type="info" size="mini" @click="show=true">请选择</van-button> -->
                                <!-- <van-action-sheet
                                        v-model="show"
                                        :actions="actions"
                                        @select="onSelect"
                                />-->
                                <!-- </template> -->
                            </el-table-column>
                            <el-table-column prop="selfScore" label="自评分" align="center">
                                <template slot-scope="scope">
                                    <span>{{scope.row.selfScore}}</span>
                                    <!-- <input
                                        @blur="inputValue(scope.row.selfScore,100,scope.$index,scope.row)"
                                        type="number"
                                        class="inputWidth"
                                        readonly
                                        max="100"
                                        maxlength="2"
                                        v-model="scope.row.selfScore"
                                    />-->
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
        <!-- <van-popup v-model="dateShowStart" position="bottom" :style="{ height: '30%' }">
            <van-datetime-picker
                v-model="startTime"
                type="date"
                title="选择年月日"
                @confirm="getstartTime"
                @cancel="closeDate1"
            />
        </van-popup>
        <van-popup v-model="dateShowEnd" position="bottom" :style="{ height: '30%' }">
            <van-datetime-picker
                v-model="endTime"
                type="date"
                title="选择年月日"
                @confirm="getEndTime"
                @cancel="closeDate2"
            />
        </van-popup>-->
    </div>
</template>
<script>
import qs from "qs";
export default {
    data() {
        return {
            manager: sessionStorage.getItem("manager"),
            // minDate: new Date(2020, 0, 1),
            tableData: [],
            show: false,
            dateShowStart: false,
            dateShowEnd: false,
            show2: false,
            currentDate: new Date(),
            startTime: "",
            endTime: "",
            input: "",
            sumaaa: 0,
            actions: [
                { name: "A" },
                { name: "B" },
                { name: "C" },
                { name: "D" },
                { name: "取消" }
            ],
            form: {
                startTime: "",
                endTime: "",
                gradeDetailSet: []
            }
        };
    },
    watch: {
        startTime(val) {
            this.form.startTime = this.$moment(val).format("YYYY-MM-DD");
        },
        endTime(val) {
            this.form.endTime = this.$moment(val).format("YYYY-MM-DD");
        }
    },
    created() {
        // 给table表格添加自定义属性
        // this.tableData.map(item => {
        //     item.totalScore = "";
        // });
        this.getStandardAssessment(); //获取评分标准
        this.getDetail();
    },
    methods: {
        toDetail() {
            this.$router.push({
                name: "scoringDetails",
                query: {
                    code: this.form.code
                }
            });
        },
        getDetail() {
            this.$utils
                .post(
                    this.reqApi.yiBSchool + "/mobile/grade/detail",
                    qs.stringify({
                        code: this.$route.query.code
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.form = res.data.data;
                    } else {
                        return this.$toast(res.data.msg);
                    }
                });
        },
        del() {
            this.$dialog
                .confirm({
                    message: "确定删除吗？"
                })
                .then(() => {
                    this.$utils
                        .post(
                            this.reqApi.yiBSchool + "/mobile/grade/delete",
                            qs.stringify({
                                code: this.form.code
                            })
                        )
                        .then(res => {
                            if (res.data.code === "0000") {
                                this.$toast("删除成功");
                                this.$router.push({
                                    name: "scroing",
                                    query: {
                                        active: this.$route.query.active
                                    }
                                });
                            } else {
                                this.$toast(res.data.msg);
                            }
                            instance.close();
                        });
                });
        },
        submit() {
            this.form.gradeDetailSet = this.tableData.map(item => {
                return {
                    standardId: item.id,
                    level: item.level,
                    selfScore: item.selfScore
                };
            });
            this.$utils
                .post(
                    this.reqApi.yiBSchool + "/mobile/grade/insert",
                    qs.stringify({
                        startTime: this.form.startTime,
                        endTime: this.form.endTime,
                        gradeDetailSet: JSON.stringify(this.form.gradeDetailSet)
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.$toast("提交成功！");
                        this.$router.push({
                            name: "scroing"
                        });
                    } else {
                        return this.$toast(res.data.msg);
                    }
                });
        },
        // 获取考核标准
        getStandardAssessment() {
            this.$utils
                .post(this.reqApi.yiBSchool + "/mobile/grade/standard/get")
                .then(res => {
                    if (res.data.code === "0000") {
                        this.tableData = res.data.data;
                    } else {
                        return this.$toast(res.data.msg);
                    }
                });
        },
        onClickLeft() {
            // this.$router.go(-1);
            this.$router.push({
                name: "scroing",
                query: {
                    active: this.$route.query.active
                }
            });
        },
        onClickRight() {
            // this.$router.push("/scroing");
            this.$router.push({
                name: "newScore",
                query: {
                    add: 1
                }
            });
        },
        currentRow() {},
        //开始时间
        getstartTime(val) {
            this.form.startTime = this.$moment(val).format("YYYY-MM-DD");
            this.dateShowStart = false;
        },
        // 结束时间
        getEndTime(val) {
            this.form.endTime = this.$moment(val).format("YYYY-MM-DD");
            this.dateShowEnd = false;
        },

        showStartTime() {
            this.dateShowStart = true;
        },
        showEndTime() {
            this.dateShowEnd = true;
        },
        closeDate1() {
            this.dateShowStart = false;
        },
        closeDate2() {
            this.dateShowEnd = false;
        },
        onSelect(item) {
            if (item.name == "取消") {
                this.show = false;
            }
        },
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = "合计";
                    return;
                }
                // if (index === 2) {
                //     sums[index] = this.sumaaa;
                //     return;
                // }
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                    }, 0);
                    // sums[index] += " 元";
                } else {
                    // sums[index] = "N/A";
                    sums[index] = "";
                }
            });
            return sums;
        },
        choose(row) {},
        inputValue(number, max, index, row) {
            // let temp = Object.assign({}, this.tableData);
            this.tableData[index].selfScore = number;
            this.$nextTick(() => {
                this.$set(this.tableData, this.tableData);
                this.sumaaa = 0;
                this.tableData.forEach(item => {
                    this.sumaaa += Number(item.selfScore);
                });
            });
            if (index === this.tableData.length - 1) {
                this.tableData = this.tableData;
            }
            var regex = /^\d+$/;
            if (regex.test(number)) {
                if (number < max && number > 0) {
                } else {
                    this.$toast("请输入小于" + max + "的正整数！！");
                    this.tableData[index].selfScore = "";
                }
            }
        }
    },
    filters: {
        filtersType(val) {
            if (val == "W") {
                return "待审核";
            } else if (val == "F") {
                return "不通过";
            } else if (val == "S") {
                return "通过";
            }
        }
    }
};
</script>
<style scoped>
table {
    table-layout: fixed;
    border-collapse: collapse;
    max-height: 150px;
}
.outBox {
    height: 100vh;
}
.outBox_one {
    height: 100vh;
    padding-top: 46px;
    height: 100%;
    box-sizing: border-box;
}
.one {
    width: 30%;
    height: 30px;
}
.two {
    width: 30%;
    height: 30px;
}
.theadBox {
    position: absolute;
}
.tableBox {
    position: relative;
    height: calc(100% - 230px);
    /* background-color: pink; */
    box-sizing: border-box;
}
.titleText {
    width: 98%;
    height: 30px;
    background-color: #70a5ffff;
    display: inline-block;
    color: #fff;
    font-weight: 700;
    font-size: 14px;
    text-align: center;
    line-height: 30px;
    border: 1px solid #dededeff;
}
.contentText {
    font-size: 14px;
    width: 98%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #dededeff;
}
.textColor {
    background-color: #e9f8f8;
}
.contentBox {
    /* max-height: 430px; */
    /* overflow-y: auto; */
    height: calc(100% - 43px);
    /* background-color: skyblue; */
    box-sizing: border-box;
    /* height: 100%; */
    /* padding: 0 15px; */
    /* overflow-y: scroll; */
}
.outBox_top {
    height: 176px;
    /* height: 88px; */
}
.tableBox_1 {
    height: 100%;
    /* height: calc(100% - 176px); */
    /* background-color: orange; */
}
.tableBox_2 {
    height: 43px;
}
.tableBox_title {
    font-size: 15px;
    color: #444;
    text-algin: center;
    text-align: center;
    /* height: 43px; */
    line-height: 43px;
    font-weight: 700;
}
.detailTitle {
    font-size: 12px;
    color: #14c25a;
    position: absolute;
    right: 15px;
    top: 13px;
}
.detailTitle > img {
    width: 10px;
    height: 10px;
}
.tableBox_2_1 {
    position: relative;
}
.table_box {
    /* max-height: 100%; */
}
.inputWidth {
    width: 60px;
    height: 20px;
    background-color: #dedede;
    border: 1px solid #dedede;
}

.el-table__footer-wrapper /deep/{
    
position: fixed;
}
.el-table {
    overflow: visible !important;
    /* height: calc(100% - 43px); */
}
</style>