<template>
    <div class="outBox">
        <!-- 审批 -->
        <!-- <span v-if="$route.query.type==1">新建评分（普通员工）</span>
        <span v-if="$route.query.type==2">新建评分（部门经理）</span>-->

        <div class="outBox_one">
            <div class="outBox_top">
                <van-nav-bar
                    :title="$route.query.status=='S'?'已审核':'评分审核'"
                    left-arrow
                    fixed
                    @click-left="onClickLeft"
                    @click-right="submit"
                >
                    <template #right v-if="$route.query.status=='W'">
                        <div>
                            <img src="@/assets/images/tijiao_icon@2x.png" alt class="imgIcon" />
                            <span class="submit">提交</span>
                        </div>
                    </template>
                </van-nav-bar>
                <div>
                    <van-cell title="考评开始时间">
                        <template #default>
                            <span>{{form.startTime}}</span>
                        </template>
                    </van-cell>
                    <van-cell title="考评结束时间" value="请选择">
                        <template #default>
                            <span>{{form.endTime}}</span>
                        </template>
                    </van-cell>
                    <van-cell title="填表时间" value="请选择">
                        <template #default>
                            <span>{{form.createTime}}</span>
                        </template>
                    </van-cell>
                    <van-cell title="考评对象" value="请选择">
                        <template #default>
                            <span>{{form.personnelName}}</span>
                        </template>
                    </van-cell>
                    <!-- 11111 -->
                    <div v-if="$route.query.status=='S'">
                       <van-cell title="考核时间" value="请选择">
                        <template #default>
                            <span>{{form.checkTime|fmtDate1}}</span>
                        </template>
                    </van-cell>
                     <van-cell title="考评人" value="请选择">
                        <template #default>
                            <span>{{form.gradePersonnelName}}</span>
                        </template>
                    </van-cell>
                    </div>
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

                            </el-table-column>-->
                            <!-- <el-table-column
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
                            </el-table-column>-->
                            <!-- <el-table-column prop="selfScore" label="自评分" align="center"></el-table-column> -->
                            <el-table-column prop="selfScore" label="自评分" align="center">
                                <!-- <template slot-scope="scope">
                                <span>{{scope.row.selfScore}}</span>
                                </template>-->
                            </el-table-column>
                            <!-- <el-table-column prop="selfScore" label="自评分" align="center"> -->
                            <!-- <template slot-scope="scope">
                                    {{scope.row.selfScore}}
                            </template>-->
                            <!-- <template slot-scope="scope" v-if="manager==0">
                                    <input
                                        @blur="inputValue(scope.row.selfScore,100,scope.$index,scope.row)"
                                        type="number"
                                        class="inputWidth"
                                        max="100"
                                        maxlength="2"
                                        v-model="scope.row.selfScore"
                                    />
                            </template>-->
                            <!-- </el-table-column> -->
                            <el-table-column
                                prop="checkScore"
                                label="考核评价得分"
                                align="center"
                                v-if="$route.query.active==2&&$route.query.status=='W'"
                            >
                                <template slot-scope="scope">
                                    <input
                                        @blur="inputValue(scope.row.checkScore,100,scope.$index,scope.row)"
                                        type="number"
                                        class="inputWidth"
                                        max="100"
                                        maxlength="2"
                                        v-model="scope.row.checkScore"
                                    />
                                </template>
                            </el-table-column>
                        </el-table>
                        <van-field
                            v-if="$route.query.active==2&&$route.query.status=='W'"
                            v-model="form.remark"
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
            message: "",
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
                gradeDetailSet: [],
                remark: ""
            },
            gradeDetailSet: [],
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
        if (this.$route.query.code) return this.getDetail();
    },
    methods: {
      toDetail(){
        this.$router.push({
          name:'staffScoringDetails',
          query:{
            code:this.form.code
          }
        })
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
                        if (this.form.remark == null) {
                            this.form.remark = "";
                        }
                        // return
                        // this.form.gradeStandard.forEach(item=>{
                        //   item.checkScore=''
                        // })
                        this.form.createTime = this.$moment(
                            this.form.createTime
                        ).format("YYYY-MM-DD");
                        this.form.startTime = this.$moment(
                            this.form.startTime
                        ).format("YYYY-MM-DD");
                        this.form.endTime = this.$moment(
                            this.form.endTime
                        ).format("YYYY-MM-DD");
                    } else {
                        this.$toast(res.data.msg);
                    }
                });
        },
        chooseLevel(row, index) {
            this.tableIndex = index;
            this.show = true;
            // this.tableData[index].level=
        },
        submit() {
            for(let i=0;i<this.form.gradeStandard.length;i++){
              if(this.form.gradeStandard[i].checkScore === null){
                  return this.$toast("评分项不能为空");
              }
            }
            if (!this.form.remark) {
                return this.$toast("请填写评语");
            }
            this.gradeDetailSet=this.form.gradeStandard.map(item=>{
              return{
                detailId:item.detailId,
                checkScore:item.checkScore
              }
            })
            this.$utils
                .post(
                    this.reqApi.yiBSchool + "/mobile/grade/check",
                    qs.stringify({
                        code: this.form.code,
                        remark: this.form.remark,
                        gradeDetailSet: JSON.stringify(this.gradeDetailSet)
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.$toast("提交成功！");
                        this.$router.push({
                            name: "scroing",
                            query:{
                              active:this.$route.query.active
                            }
                        });
                    }else {
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

                        if (this.manager == 1) {
                            // 如果是部门经理 手动加个属性
                            // Grade 等级
                            this.tableData.forEach(item => {
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
                name: "scroing",
                query: {
                    active: this.$route.query.active
                }
            });
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
            this.tableData[this.tableIndex].grade = item.name;
            this.show = false;
        },
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = "合计";
                    return;
                }
                // if (this.manager == 1) {
                //     if (index === 1) {
                //         sums[index] = "";
                //         return;
                //     }
                // }
                if (index === 3) {
                    sums[index] = this.sumaaa;
                    return;
                }
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
            var regex = /^\d+$/;
            if (regex.test(number)) {
                if (number < max && number > 0) {
                } else {
                    this.$toast("请输入小于" + max + "的正整数！！");
                    return (this.form.gradeStandard[index].checkScore = "");
                }
            }
            this.form.gradeStandard[index].checkScore = number;
            this.$nextTick(() => {
                this.$set(this.form.gradeStandard, this.form.gradeStandard);
                this.sumaaa = 0;
                this.form.gradeStandard.forEach(item => {
                    this.sumaaa += Number(item.checkScore);
                });
                if (index === this.form.gradeStandard.length - 1) {
                    this.form.gradeStandard = this.form.gradeStandard;
                }
            });
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
    /* height: calc(100% - 176px); */
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
    /* padding: 0 15px; */
    overflow-y: scroll;
}
.outBox_top {
    /* height: 176px; */
}
.tableBox_1 {
    height: 100%;
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
    max-height: calc(100% - 88px);
}
.inputWidth {
    width: 60px;
    height: 20px;
    background-color: #dedede;
    border: 1px solid #dedede;
}
</style>