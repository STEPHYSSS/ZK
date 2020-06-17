<template>
    <el-card shadow="never" class="box-card">
        <!-- <my-bread level1="成绩分析" level2="成绩分析" level3="选择试卷查看分析考试的统计情况。"></my-bread> -->
        <h3>成绩分析</h3>
        <previous-page goPreviousPage="/mpage"></previous-page>
        <table border="1">
            <tbody>
                <tr>
                    <td class="text-center lanse">考试名称:</td>
                    <td>
                        <input type="text" placeholder="请选择考试" readonly v-model="examMc" />
                        <el-button class="haha search-btn" @click="getFindPaperStatistics">选择考试</el-button>
                        <el-button class="hehe" @click="addRow" icon="el-icon-plus"></el-button>
                    </td>
                </tr>
                <tr>
                    <td class="text-center lanse">分数范围:</td>
                    <td>
                        <div
                            class="add-section"
                            v-for="(item, index) in analysisList.scoresIntervals"
                            :key="index"
                        >
                            从
                            <input class="add-row-wid" type="text" min="0" v-model="item.start" />
                            至
                            <input class="add-row-wid" type="text" maxlength="5" v-model="item.end" />
                            <span
                                class="del-row"
                                @click="delRow(analysisList.scoresIntervals, index)"
                            >❌</span>
                        </div>
                    </td>
                </tr>
                <tr v-show="showResult">
                    <td class="lanse"></td>
                    <td>
                        <div id="main" ref="main" :style="{width: '50%', height: '300px'}"></div>
                    </td>
                </tr>
            </tbody>
        </table>
        <add-btn
            style="margin-left: 130px;"
            level1="开始统计"
            level2="取 消"
            @submitForm="startAnalysis"
            @cancelForm="papersAnalysis"
        ></add-btn>

        <!-- 选择试卷对话框 -->
        <!-- <el-dialog :visible.sync="dialogVisibleData" width="60%" class="analy-q"> -->
        <choose-paper ref="choose" @getName="getName"></choose-paper>
        <!-- </el-dialog> -->
    </el-card>
</template>

<script>
import choosePaper from "./choosePaper";
import echarts from "echarts";
import previousPage from "@/components/previousPage.vue";
import qs from "qs";
export default {
    data() {
        return {
            // 表格
            tableData: [],
            // 分析详情
            analysisList: {
                scoresIntervals: [{ start: "", end: "" }]
            },
            // 显示区间图
            showResult: false,
            // 试卷名称
            examMc: "",
            // 选择试卷对话框
            dialogVisibleData: false,
            // 区间图
            series: {
                name: "",
                type: "pie",
                radius: ["0", "50%"],
                // color: ['#ee7738', '#51c2ee', '#fde14c'],
                data: [],
                list: []
            }
        };
    },

    created() {},

    components: {
        choosePaper,
        "previous-page": previousPage
    },

    methods: {
        getName() {
            this.examMc = this.$refs.choose.exam_name;
        },
        // 获取试卷分析列表
        getFindPaperStatistics() {
            this.$refs.choose.dialogVisibleData = true;
        },

        // 开始统计
        startAnalysis() {
            let exam_id = "";
            exam_id = this.$refs.choose.exam_id;
            if (!exam_id) return this.$message.error("请选择考试");
            if(this.analysisList.scoresIntervals.length==1){
                 if (
                !this.analysisList.scoresIntervals[0].start ||
                !this.analysisList.scoresIntervals[0].end
            ) {
                return this.$message.error("请输入分数范围");
            }
            }else{
               
            }
            
            this.analysisList.scoresIntervals.forEach(item => {
                item.start = Number(item.start);
                item.end = Number(item.end);
            });
            this.$utils
                .post(
                    this.reqApi.shuiwuUrl + "/analysis/getGradeAys",
                    qs.stringify({
                        exam_id: this.$refs.choose.exam_id,
                        intervals: JSON.stringify(
                            this.analysisList.scoresIntervals
                        )
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.list = res.data.gradeAys;
                        const jianzhi = this.list.map(item => {
                            return {
                                value: item.count,
                                name:
                                    item.interval +
                                    "分(人数" +
                                    item.count +
                                    ")" +
                                    ":" +
                                    (item.rate * 100).toFixed(2) +
                                    "%"
                            };
                        });
                        this.showResult = true;
                        this.series.data = jianzhi;
                        this.$nextTick(() => this.ehcharsT());
                    }
                });
        },

        papersAnalysis() {
            this.$router.push({ name: "papersAnalysis" });
        },

        // 加一行
        addRow() {
            let list = {
                start: "",
                end: ""
            };
            this.analysisList.scoresIntervals.push(list);
        },
        // 减一行
        delRow(row, index) {
            if (row.length > 1) return row.splice(index, 1);
        },

        /* 图表 */
        ehcharsT() {
            const that = this;
            const myChart = echarts.init(that.$refs.main);
            myChart.setOption({
                title: {
                    text: "成绩区间占比图",
                    left: "center"
                },
                tooltip: {
                    formatter: "{b} : {c} ({d}%)"
                },
                series: that.series
            });
        }
    }
};
</script>

<style scoped>
.search {
    margin-right: 0px !important;
}
/* 头部表格 */
table {
    border-color: #e4e9ec;
    border-collapse: collapse;
    border: 1px solid #e4e9ec;
    color: #777;
    margin-bottom: 20px;
    margin-top: 10px;
}
table tbody tr td {
    padding: 6px;
}
table tbody tr td.lanse {
    /* background-color: #a8e7f0; */
    width: 200px;
}
table tbody tr td:nth-child(2) {
    width: 90%;
}

.el-button.haha {
    /* border: 1px solid #31b5ff; */
    padding: 7px 7px;
    margin-left: 10px;
}

.el-button.hehe {
    border: 1px solid #e71517;
    color: #e71517;
    padding: 4px 4px;
    vertical-align: top;
    font-size: 19px;
    margin-left: 10px;
}
.del-row {
    cursor: pointer;
    display: inline-block;
    padding-left: 80px;
}
.add-row-wid {
    width: 50px;
    margin: 0 10px;
    /* border-radius: 25px;
    height: 20px;
    border: 1px solid #909399; */
}

.inputWid {
    width: 100px;
}
/* 选择试卷身体 */
.analyzeBody {
    /* padding: 30px; */
}
/* 选择试卷头部 */
.analyzeHead {
    padding: 7px 9px;
    background-color: #fff;
    color: #444;
    font-size: 16px;
    border-bottom: 1px solid #ccc;
}
.analyzeHead img {
    width: 25px;
    height: 25px;
    vertical-align: top;
}
.analyzeHead a {
    padding-top: 3px;
    font-size: 16px;
    color: #444;
    font-weight: 700;
}
.analyzeHead span:nth-child(3) {
    font-size: 24px;
    color: #fff;
    font-weight: 700;
}

.add-section {
    border: 1px solid #e4e9ec;
    border-bottom: 0px solid #e4e9ec;
    padding: 3px;
}
.add-section:last-child {
    border-bottom: 1px solid #e4e9ec;
}
input {
    height: 25px;
    line-height: 25px;
}
</style>