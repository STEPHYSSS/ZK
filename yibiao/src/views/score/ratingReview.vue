<template>
    <div class="outBox">
        <!-- 审批 -->
        <div class="outBox_one">
            <div class="outBox_top">
                <van-nav-bar
                    title="新建评分"
                    left-arrow
                    fixed
                    @click-left="onClickLeft"
                    @click-right="submit"
                >
                    <template #right>
                        <div>
                            <img src="@/assets/images/tijiao_icon@2x.png" alt class="imgIcon" />
                            <span class="submit">提交</span>
                        </div>
                    </template>
                </van-nav-bar>
                <div>
                    <van-cell title="考评开始时间" @click="showStartTime">
                        <template #default>
                            <span v-if="form.startTime">{{form.startTime|fmtDate1}}</span>
                            <span v-else>请选择</span>
                        </template>
                    </van-cell>
                    <van-cell title="考评结束时间" value="请选择" @click="showEndTime">
                        <template #default>
                            <span v-if="form.endTime">{{form.endTime|fmtDate1}}</span>
                            <span v-else>请选择</span>
                        </template>
                    </van-cell>
                </div>
            </div>
            <div class="tableBox">
                <div class="tableBox_1">
                    <div class="tableBox_2">
                        <div class="tableBox_2_1">
                            <div class="tableBox_title">考核内容</div>
                            <div class="detailTitle">
                                详情
                                <img src="@/assets/images/gengduo_icon@2x.png" alt />
                            </div>
                        </div>
                    </div>
                    <div class="contentBox">
                        <!-- :header-cell-style="{background:'#70A5FFFF',color:'#fff'}" -->
                        <el-table
                            :data="scoringCriteria"
                            stripe
                            
                            border
                            height="100%"
                            class="table_box"
                            :summary-method="getSummaries"
                            show-summary
                            @row-click="choose"
                            style="width: 100%;"
                        > 
                            <el-table-column prop="name" label="指标" align="center"></el-table-column>
                            <el-table-column
                                prop="score"
                                label="权重（分)"
                                align="center"
                                v-if="manager==0||$route.query.active==2"
                            ></el-table-column>
                            
                            <!-- <el-table-column prop="detailLevel" label="自评等级" v-show="$route.query.active==2">

                            </el-table-column> -->
                            <el-table-column
                                prop="level"
                                label="自评等级"
                                align="center"
                                v-if="manager==1&&$route.query.add==1"
                            >
                                <template slot-scope="scope">
                                    <span
                                        v-if="scope.row.grade"
                                        @click="chooseLevel(scope.row,scope.$index)"
                                    >{{scope.row.grade}}</span>
                                    <van-button
                                        v-else
                                        round
                                        type="info"
                                        size="mini"
                                        @click="chooseLevel(scope.row,scope.$index)"
                                    >请选择</van-button>

                                    <van-action-sheet
                                        v-model="show"
                                        :actions="actions"
                                        @select="onSelect"
                                    />
                                </template>
                            </el-table-column>
                              <!-- <el-table-column prop="selfScore" label="自评分" align="center"></el-table-column> -->
                            <el-table-column prop="selfScore" label="自评分" align="center">
                                <!-- <template slot-scope="scope">
                                    {{scope.row.selfScore}}
                                </template> -->
                                <template slot-scope="scope" >
                                    <input
                                        @change="inputValue(scope.row.selfScore,scope.row.score,scope.$index,scope.row)"
                                        type="number"
                                        class="inputWidth"
                                        max="100"
                                        maxlength="2"
                                        v-model="scope.row.selfScore"
                                    />
                                </template>
                            </el-table-column>
                            <el-table-column prop="totalScore" label="考核评价得分" align="center" v-if="$route.query.active==2">
                                <template slot-scope="scope">
                                    <input
                                        @blur="inputValue(scope.row.selfScore,100,scope.$index,scope.row)"
                                        type="number"
                                        class="inputWidth"
                                        max="100"
                                        maxlength="2"
                                        v-model="scope.row.selfScore"
                                    />
                                </template>
                            </el-table-column>
                        </el-table>
                        <van-field
                        v-if="$route.query.active==2"
                        v-model="message"
                        rows="2"
                        autosize
                        label="评语"
                        type="textarea"
                        maxlength="200"
                        placeholder="请输入留言"
                        show-word-limit
                    />
                    </div>
                    
                </div>
            </div>
        </div>
        <van-popup v-model="dateShowStart" position="bottom" :style="{ height: '40%' }">
            <van-datetime-picker
                v-model="startTime"
                type="date"
                title="选择年月日"
                @confirm="getstartTime"
                @cancel="closeDate1"
            />
        </van-popup>
        <van-popup v-model="dateShowEnd" position="bottom" :style="{ height: '40%' }">
            <van-datetime-picker
                v-model="endTime"
                type="date"
                title="选择年月日"
                @confirm="getEndTime"
                @cancel="closeDate2"
            />
        </van-popup>
    </div>
</template>
<script>
import qs from "qs";
export default {
    data() {
        return {
            message:'',
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
            tableIndex: "",
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
            },
            scoringCriteria:[],
            
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
       
        this.getStandardAssessment();
      
    },
    methods: {
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
                        this.$toast(res.data.msg);
                    }
                });
        },
        chooseLevel(row, index) {
            this.tableIndex = index;
            this.show = true;
        },
        submit() {
            
            if (this.manager == 0) {
                //员工
                this.form.gradeDetailSet = this.scoringCriteria.map(item => {
                    return {
                        standardId: item.id,
                        selfScore: item.selfScore
                    };
                });
            } else if (this.manager == 1) {
                this.form.gradeDetailSet = this.scoringCriteria.map(item => {
                    return {
                        standardId: item.id,
                        level: item.grade,
                        selfScore: item.selfScore
                    };
                });
            }
            if (!this.form.startTime) return this.$toast.fail("请选择开始时间");
            if (!this.form.endTime) return this.$toast.fail("请选择结束时间");
            this.form.gradeDetailSet.forEach(item => {
                if (item.selfScore == null) {
                    return this.$toast.fail("评分项不能为空");
                }
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
                    }else{
                        return this.$toast(res.data.msg)
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
                        //拿到children
                        this.scoringCriteria = this.tableData.map(r => r.children).flat()
                        this.scoringCriteria.forEach(item=>{
                            item.selfScore=item.score
                        })
                        if (this.manager == 1) {
                            // 如果是部门经理 手动加个属性
                            // Grade 等级
                            this.scoringCriteria.forEach(item => {
                                item.grade = "";
                            });
                        }
                    } else {
                        return this.$toast(res.data.msg);
                    }
                });
        },
        onClickLeft() {
            this.$router.push({
                name:'scroing',
                query:{
                    active:this.$route.query.active
                }
            })
        },
        onClickRight() {
            // this.$router.push("/scroing");
            // this.$router.push({
            //     name: "newScore",
            //     query: {
            //         add: 1
            //     }
            // });
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
        onSelect(item, actions) {
            this.scoringCriteria[this.tableIndex].grade = item.name;
            this.show = false;
        },
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            console.log(param,'param')
            columns.forEach((column, index) => {
                console.log(123)
                if (index === 0) {
                    console.log(index,'index')
                    sums[index] = "合计";
                    return;
                }
                if (this.manager == 1) {
                    if (index === 1) {
                        sums[index] = "";
                        return;
                    }
                }
                if (index === 2) {
                    console.log(index,'2')
                    console.log(sums,'sums')
                    sums[index] = this.sumaaa;
                    return;
                }
                console.log(this.sumaaa,'this.sumaaa')
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
                    sums[index] = "N/A";
                }
            });

            return sums;
        },
        choose(row) {},
        inputValue(number, max, index, row) {
            // let temp = Object.assign({}, this.tableData);
            this.scoringCriteria[index].selfScore = number;
            this.$nextTick(() => {
                this.$set(this.scoringCriteria, this.scoringCriteria);
                this.sumaaa = 0;
                this.scoringCriteria.forEach(item => {
                    this.sumaaa += Number(item.selfScore);
                });
            });
            if (index === this.scoringCriteria.length - 1) {
                this.scoringCriteria = this.scoringCriteria;
            }
            // var regex = /^\d+$/;
            // if (regex.test(number)) {
                if (number <= max && number >= 0) {
                } else {
                    this.$toast("请输入小于" + max + "大于0的正整数！！");
                    this.scoringCriteria[index].selfScore = "";
                }
            // }
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
    height: calc(100% - 88px);
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
    height: 100%;
    /* max-height: 430px; */
    /* overflow-y: auto; */
    /* height: calc(100% - 52px); */
    /* height: calc(100% - 88px - 43px); */
    /* background-color: skyblue; */
    box-sizing: border-box;
    /* padding: 0 15px; */
    /* overflow-y: auto; */
}
.outBox_top {
    /* height: 132px; */
    height: 88px;
}
.tableBox_1 {
    /* height: 100%; */
    height: calc(100% - 88px);
    /* background-color: orange; */
}
.tableBox_2 {
    height: 43px;
}
.el-table{
overflow:visible !important;
}
.el-table__footer-wrapper{
position: fixed;
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
    max-height: 100%;
}
.inputWidth {
    width: 60px;
    height: 20px;
    background-color: #dedede;
    border: 1px solid #dedede;
}
</style>