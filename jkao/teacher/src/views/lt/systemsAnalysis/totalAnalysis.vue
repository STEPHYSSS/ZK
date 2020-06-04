<template>
    <el-card shadow="never" class="box-card">
        <div class="contentBox">
            <div class="top">
                <div class="topTextBox">
                    <span class="leftBorder"></span>
                    <span class="titleTextStyle">
                        考试分析报告
                        <!-- {{form.name}} -->
                    </span>
                </div>
                <el-form ref="form" :model="form" label-width="80px" size="mini" class="formStyle">
                    <el-row>
                        <el-col>
                            <el-form-item label="选择考试:">
                                <!-- <el-input class="inputWidth" v-model="form.name" placeholder="请选择考试"></el-input> -->
                                <el-select
                                    v-model="form.name"
                                    placeholder="请选择"
                                    @change="checkOption"
                                >
                                    <el-option
                                        v-for="(item,index) in examList"
                                        :key="index"
                                        :label="item.name"
                                        :value="item.id"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div class="analysis" v-if="flag">
                    <!-- 饼图 -->
                    <div class="pieChart">
                        <h4 class="pieChartText">分数段构成图</h4>
                        <div id="main" ref="main" :style="{ height: '400px'}"></div>
                    </div>
                    <!-- 班级成绩分布图 -->
                    <div class="classGrade">
                        <h4 class="pieChartText">班级成绩分布图</h4>
                        <!-- 班级成绩数据 -->
                        <div id="histogram" ref="histogram" :style="{ height: '400px'}"></div>
                        <table border="1px solid #eee" class="analysisTable">
                            <!-- <body> -->
                            <tr>
                                <td style="width:10%">{{intervals.class_name}}</td>
                                <td style="width:10%">{{intervals.avgScore}}</td>
                                <td style="width:10%">{{intervals.interval_1}}分人数</td>
                                <td style="width:10%">{{intervals.interval_2}}分人数</td>
                                <td style="width:10%">{{intervals.interval_3}}分人数</td>
                                <td style="width:10%">{{intervals.interval_4}}分人数</td>
                                <td style="width:10%">{{intervals.interval_5}}分人数</td>
                                <td style="width:10%">{{intervals.maxScore}}</td>
                                <td style="width:10%">{{intervals.minScore}}</td>
                            </tr>
                            <tr
                                v-for="(item, index) in classGread"
                                :key="index"
                                @click="classRate(item)"
                            >
                                <td>{{item.class_name}}</td>
                                <td>{{item.avgScore}}</td>
                                <td>{{item.interval_1}}</td>
                                <td>{{item.interval_2}}</td>
                                <td>{{item.interval_3}}</td>
                                <td>{{item.interval_4}}</td>
                                <td>{{item.interval_5}}</td>
                                <td>{{item.maxScore}}</td>
                                <td>{{item.minScore}}</td>
                            </tr>
                            <!-- </body> -->
                        </table>
                    </div>
                    <!-- 第二个大盒子 -->
                    <div class="center top">
                        <div class="topTextBox">
                            <span class="leftBorder"></span>
                            <span class="titleTextStyle">客观题知识点得分率表</span>
                        </div>
                        <!-- 客观题知识点得分率表右侧柱状图 -->
                        <div class="scoringRateBox">
                            <!-- 分割线 -->
                            <div class="left">
                                <div id="histogram1" ref="scoringRate" :style="{ height: '300px'}"></div>
                            </div>
                            <div class="right">
                                <el-table border :data="scoreData" style="width: 100%">
                                    <el-table-column label="编辑" align="center">
                                        <template slot-scope="{row,$index}">{{$index+1}}</template>
                                    </el-table-column>
                                    <el-table-column prop="type" label="知识点" align="center"></el-table-column>
                                    <el-table-column prop="total_score" label="总分" align="center"></el-table-column>
                                    <el-table-column prop="get_score" label="得分" align="center"></el-table-column>
                                    <el-table-column prop="rate" label="得分率" align="center"></el-table-column>
                                </el-table>
                            </div>
                        </div>
                        <div class="classGrade">
                            <!-- <h4 class="pieChartText">班级成绩分布图</h4> -->
                            <!-- 交卷时间 -->
                            <div id="histogram" ref="jiaojuan" :style="{ height: '400px'}"></div>
                            <el-table :data="timerIntervalsArray" style="width: 100%" border>
                                <el-table-column
                                    prop="missExam"
                                    label="缺考"
                                    align="center"
                                    width="180px"
                                ></el-table-column>
                                <el-table-column
                                    prop="timeInterval_1"
                                    label="30分钟以内"
                                    align="center"
                                    width="180px"
                                ></el-table-column>
                                <el-table-column prop="timeInterval_2" label="30分钟-1小时"></el-table-column>
                                <el-table-column
                                    prop="interval_3"
                                    label="1小时-1小时30分钟"
                                    align="center"
                                    width="180px"
                                ></el-table-column>
                                <el-table-column prop="timeInterval_3" label="1小时30分钟-2小时"></el-table-column>
                                <el-table-column
                                    prop="timeInterval_4"
                                    label="2小时-2小时30分钟"
                                    align="center"
                                    width="180px"
                                ></el-table-column>
                                <el-table-column prop="timeInterval_5" label="2小时30分钟-3小时"></el-table-column>
                                <el-table-column
                                    prop="timeInterval_6"
                                    label="3小时以上"
                                    align="center"
                                    width="180px"
                                ></el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <div class="center top">
                        <div class="topTextBox">
                            <span class="leftBorder"></span>
                            <span class="titleTextStyle">试题得分率</span>
                        </div>
                        <div class="outBox" v-for="(item,index) in tqRateData" :key="index+'a'">
                            <!-- <div class="a"> -->
                            <div class="son">
                                <span v-if="item.question_datas.length>0">{{item.question_type}}</span>
                            </div>
                            <!-- </div> -->
                            <div class="table_rate" v-if="item.question_datas.length>0">
                                <el-table
                                    border
                                    :show-header="false"
                                    :data="item.question_datas"
                                    style="width: 100%;border-top:none"
                                >
                                    <el-table-column width="100" align="center">
                                        <template slot-scope="scope">第{{scope.$index+1}}题</template>
                                    </el-table-column>
                                    <el-table-column prop="question_content" align="center"></el-table-column>
                                    <el-table-column align="center">
                                        <template slot-scope="scope">
                                            <el-progress :percentage="scope.row.rate"></el-progress>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <!--  <table border="1">
                                <tr v-for="(data,i) in item.question_datas" :key="i+'a'">
                                    <td>{{i+1}}道题</td>
                                    <td>{{data.question_content}}</td>
                                    <td style="width:300px">
                                        <el-progress :percentage="data.rate"></el-progress>
                                    </td>
                                </tr>
                                </table>-->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </el-card>
</template> 
<script>
import echarts from "echarts";
import qs from "qs";
export default {
    data() {
        return {
            flag: true,
            // 班级分数段区间数据
            interval: {
                interval_3: "20-30",
                interval_2: "10-20",
                interval_5: "40-50",
                interval_4: "30-40",
                interval_1: "0-10"
            },
            //班级区间数
            intervals: {
                class_name: "班级",
                avgScore: "班级平均分",
                interval_1: "",
                interval_2: "",
                interval_3: "",
                interval_4: "",
                interval_5: "",
                maxScore: "最高分",
                minScore: "最低分"
            },
            form: {
                name: "",
                className: ""
            },
            timerIntervalsArray:[],
            timerIntervals: {},
            tqRateData: [],
            // 班级成绩数据
            classGread: [],
            examList: [], //考试数据
            scoreData: [], //得分率数据
            pieChartList: [], //饼图的数据
            // 饼图数据初始化
            series: {
                name: "",
                type: "pie",
                radius: ["0", "50%"],
                // color: ['#ee7738', '#51c2ee', '#fde14c'],
                color: ["#8085E9", "#90ED7D", "#F7A35C"],
                data: [],
                // list: ["q", "2"],
                label: {
                    normal: {
                        textStyle: {
                            color: "#000", // 改变标示文字的颜色
                            fontSize: 14
                        }
                    }
                }
            },
            // 题型得分率初始化
            scoringRateInit: {
                title: {
                    // text: "班级成绩分布图",
                    textStyle: {
                        fontSize: 12
                    }
                },
                tooltip: {
                    trigger: "axis",
                    formatter: "{b} : {c} %"
                },
                gird: {
                    right: "5%",
                    left: "10%",
                    height: "300",
                    width: "300"
                    /*  // left: "50%",
                    // right: "200",
                    // bottom: "50",
                    width: "400",
                    height: "300",
                    containLabel: true */
                    // x: '20%', y: '17%', width: '28%', height: '8%',
                },
                xAxis: {
                    // 横坐标数据
                    // data: [],
                    //  axisLine: {
                    //     lineStyle: {
                    //         color: "#7BB6EE"//坐标轴的颜色
                    //     }
                    // },
                    axisLabel: {
                        // x坐标轴以百分比显示
                        // show: true,
                        interval: "auto",
                        formatter: "{value}%"
                    }
                    // data: ["10%", "20%", "30%", "40%"]
                },
                yAxis: {
                    // type: "value",
                    type: "category",
                    splitLine: {
                        //去掉横坐标的线
                        show: false
                    },

                    axisLabel: {
                        formatter: function(value) {
                            var texts = value;
                            if (texts.length > 15) {
                                // 具体多少字就看自己了
                                texts = texts.substr(0, 15) + "...";
                            }
                            return texts;
                        }
                    },
                    offset: 0, // 设置y轴的偏移
                    show: true,
                    data: []
                },
                series: [
                    // 鼠标放上去显示的数据
                    {
                        // name: '',
                        type: "bar",
                        barWidth: "30%",
                        data: [],
                        label: {
                            show: true,
                            position: "insideRight",
                            formatter: "{c}%",
                            color: "#000",
                            position: ["102%", "0%"]
                        },
                        itemStyle: {
                            // color:'#000'
                        }
                    }
                ]
            },
            // 班级柱状图初始化
            classGreadInit: {
                title: {
                    // text: "班级成绩分布图",
                    textStyle: {
                        fontSize: 14
                    }
                },
                tooltip: {},
                xAxis: {
                    data: [
                        // "班级平均分",
                        // "0-20分人数",
                        // "20-40分人数",
                        // "40-60分人数",
                        // "60-80分人数",
                        // "80-100分人数"
                    ]
                    // data: ["10%", "20%", "30%", "40%"]
                },
                yAxis: {
                    // type: 'category',
                    type: "value",
                    splitLine: {
                        //去掉横坐标的线
                        show: false
                    },
                    show: true
                    // data: ['班级平均分', '0-20分人数', '20-40分人数', '40-60分人数', '60-80分人数', '80-100分人数']
                    // data:[0,50,100]
                    // data: ["10%", "30%", "50%", "100%"]
                    // data:[10,30,50,60,80]
                },
                series: [
                    {
                        // name: '销量',
                        type: "bar",
                        barWidth: "20%",
                        data: []
                        //  [1, 2, 36, 10, 5, 9]
                    }
                ]
            },
            timerInit: {
                title: {
                    // text: "班级成绩分布图",
                    textStyle: {
                        fontSize: 14
                    }
                },
                grid: {
                    // 控制图的大小，调整下面这些值就可以，
                    x: 100, //控制x轴文字与底部的距离
                    y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
                },
                tooltip: {
                    formatter: "{c}" + "人"
                },
                xAxis: {
                    data: [
                        "缺考",
                        "30分钟以内",
                        "30分钟-1小时",
                        "1小时-1小时30分钟",
                        "1小时30分钟-2小时",
                        "2小时-2小时30分钟",
                        "2小时30分钟-三小时",
                        "3小时以上"
                    ],
                    axisLabel: {
                        interval: 0, //强制文字产生间隔
                        rotate: 0, //文字逆时针旋转45°
                        textStyle: {
                            //文字样式
                            color: "black",
                            fontSize: 14,
                            fontFamily: "Microsoft YaHei"
                        }
                    }
                    // data: ["10%", "20%", "30%", "40%"]
                },
                yAxis: {
                    // type: 'category',
                    type: "value",
                    splitLine: {
                        //去掉横坐标的线
                        show: false
                    },
                    show: true
                    // data: ['班级平均分', '0-20分人数', '20-40分人数', '40-60分人数', '60-80分人数', '80-100分人数']
                    // data:[0,50,100]
                    // data: ["10%", "30%", "50%", "100%"]
                    // data:[10,30,50,60,80]
                },
                series: [
                    {
                        // name: '销量',
                        type: "bar",
                        barWidth: "20%",
                        data: []

                        //  [1, 2, 36, 10, 5, 9]
                    }
                ]
            }
        };
    },
    created() {
        this.getExamList();
        this.scoreData = [
            /*  {
                type: "测试题目1", // 题目名称知识点
                total_score: 50, //总分
                get_score: 74, //得分
                rate: 75 // 得分率
            },
            {
                type: "测试题目2",
                total_score: 100,
                get_score: 70,
                rate: 25
            },
            {
                type: "测试题目2",
                total_score: 100,
                get_score: 56,
                rate: 10
            },
            {
                type: "测试题目3",
                total_score: 100,
                get_score: 35,
                rate: 40
            },
            {
                type: "测试题目4",
                total_score: 100,
                get_score: 20,
                rate: 50
            },
            {
                type: "测试题目5",
                total_score: 100,
                get_score: 30,
                rate: 35
            },
            {
                type: "测试题目6",
                total_score: 100,
                get_score: 40,
                rate: 20
            } */
        ];
    },
    methods: {
        //获取考试列表
        getExamList() {
            this.$utils
                .post(
                    this.reqApi.shuiwuUrl + "/exam/list",
                    qs.stringify({
                        finished: 1
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.examList = res.data.exams.list;
                    }
                });
        },
        // 选择考试查看分析数据
        checkOption(val) {
            this.examId = val;
            this.$utils
                .post(
                    this.reqApi.shuiwuUrl + "/analysis/totalAys",
                    qs.stringify({
                        exam_id: val
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.flag=true
                        this.pieChartList = res.data.intervals;//ok
                        // 表格区间数据
                        // this.intervals=res.data.intervals
                        res.data.intervals.forEach((item, index) => {
                            if (index == 0) {
                                this.intervals.interval_1 =
                                    item.start + "-" + item.end;
                            } else if (index == 1) {
                                this.intervals.interval_2 =
                                    item.start + "-" + item.end;
                            } else if (index == 2) {
                                this.intervals.interval_3 =
                                    item.start + "-" + item.end;
                            } else if (index == 3) {
                                this.intervals.interval_4 =
                                    item.start + "-" + item.end;
                            } else if (index == 4) {
                                this.intervals.interval_5 =
                                    item.start + "-" + item.end;
                            }
                        });//ok
                        this.classGread = res.data.classIntervals; //班级成绩分布
                        this.timerIntervals = res.data.timeInterval; //考试时间分布
                        this.timerIntervalsArray=[]
                        this.timerIntervalsArray.push(this.timerIntervals)
                        this.scoreData = res.data.question_type_datas;
                        this.tqRateData = res.data.question_datas_by_type;
                        this.tqRateData.forEach(item => {
                            item.question_datas.forEach(i => {
                                i.question_content = i.question_content
                                    .replace(/<[^>]+>|&[^>]+;/g, "")
                                    .trim();
                            });
                        });
                        this.startAnalysis(); //饼图调用方法
                        this.classGreadEchart(); //班级成绩分布

                        this.scoringRate(); // 得分率柱状图
                        this.timerFn(); //交卷时间
                        
                    }else {
                        this.$message.error(res.data.msg)
                    }
                });
        },
        classRate(row) {
        },
        // 交卷时间
        timerFn() {
            let myChart = echarts.init(this.$refs.jiaojuan, "light");
            window.onresize = () => {
                myChart.resize();
            };
            // 设置x轴的文字
            // this.timerInit.xAxis.data = [

            // ];
            // for (const i of this.timerIntervals) {
            this.timerInit.series[0].data = [
                this.timerIntervals.missExam,
                this.timerIntervals.interval_1,
                this.timerIntervals.interval_2,
                this.timerIntervals.interval_3,
                this.timerIntervals.interval_4,
                this.timerIntervals.interval_5
            ];
            // this.classGreadInit.series[0].data.push(i);
            // }
            myChart.setOption(this.timerInit);
        },
        // 班级成绩分布
        classGreadEchart() {
            let myChart = echarts.init(this.$refs.histogram, "light");
            window.addEventListener("resize", function() {
                myChart.resize();
            });
            // 设置x轴的文字
            this.classGreadInit.xAxis.data = [
                this.intervals.avgScore,
                this.intervals.interval_1 + "分人数",
                this.intervals.interval_2 + "分人数",
                this.intervals.interval_3 + "分人数",
                this.intervals.interval_4 + "分人数",
                this.intervals.interval_5 + "分人数",
                this.intervals.maxScore,
                this.intervals.minScore
            ];
            for (const i of this.classGread) {
                this.classGreadInit.series[0].data = [
                    i.avgScore,
                    i.interval_1,
                    i.interval_2,
                    i.interval_3,
                    i.interval_4,
                    i.interval_5,
                    i.maxScore,
                    i.minScore
                ];
            }
            this.$nextTick(()=>{

                myChart.setOption(this.classGreadInit);
            })
        },
        // 题型得分率
        scoringRate() {
            this.scoringRateInit.yAxis.data = [];
            this.scoringRateInit.series[0].data = [];
            let myChart = echarts.init(this.$refs.scoringRate, "light");
            window.addEventListener("resize", function() {
                myChart.resize();
            });
           /*  for (const i of this.scoreData) {
                this.scoringRateInit.yAxis.data.push(i.type);
                this.scoringRateInit.series[0].data.push(parseInt(i.rate));
            } */
            for(const i of this.scoreData){
                var ydata=[]
                ydata.push(i.type)
                var rate=[]
                rate.push(parseInt(i.rate))
            }
            this.$nextTick(()=>{

                // myChart.setOption(this.scoringRateInit);
                myChart.setOption({
                title: {
                    // text: "班级成绩分布图",
                    textStyle: {
                        fontSize: 12
                    }
                },
                tooltip: {
                    trigger: "axis",
                    formatter: "{b} : {c} %"
                },
                // gird: {
                //     right: "5%",
                //     left: "10%",
                //     height: "300",
                //     width: "300"
                // },
                xAxis: {
                    axisLabel: {
                        // x坐标轴以百分比显示
                        // show: true,
                        interval: "auto",
                        formatter: "{value}%"
                    }
                },
                yAxis: {
                    type: "category",
                    splitLine: {
                        //去掉横坐标的线
                        show: false
                    },
                    axisLabel: {
                        formatter: function(value) {
                            var texts = value;
                            if (texts.length > 15) {
                                // 具体多少字就看自己了
                                texts = texts.substr(0, 15) + "...";
                            }
                            return texts;
                        }
                    },
                    offset: 0, // 设置y轴的偏移
                    show: true,
                    // data: []
                    data:ydata
                },
                series: [
                    // 鼠标放上去显示的数据
                    {
                        // name: '',
                        type: "bar",
                        barWidth: "30%",
                        // data: [],
                        data:rate,
                        label: {
                            show: true,
                            position: "insideRight",
                            formatter: "{c}%",
                            color: "#000",
                            position: ["102%", "0%"]
                        },
                        itemStyle: {
                            // color:'#000'
                        }
                    }
                ]
            },)
            })
        },
        // 饼图
        startAnalysis() {
            /* this.list = [
                // 饼图数据
                { avg_score: 0, count: 3, interval: "0 - 20", rate: 1 },
                { avg_score: 0, count: 1, interval: "20 - 40", rate: 1 },
                { avg_score: 0, count: 3, interval: "40 - 60", rate: 6 },
                { avg_score: 0, count: 4, interval: "60 - 80", rate: 5 },
                { avg_score: 0, count: 5, interval: "80 - 100", rate: 3 }
            ]; */
            const jianzhi = this.pieChartList.map(item => {
                // const jianzhi = this.list.map(item => {
                return {
                    value: item.count,
                    name:
                        // item.interval +
                        item.start +
                        "-" +
                        item.end +
                        "分(人数" +
                        item.count +
                        ")" +
                        ":" +
                        item.rate +
                        "%",
                    selected: false
                };
            });
            this.series.data = jianzhi;
            this.series.data[0].selected = true;
            this.$nextTick(() => this.ehcharsT());
            // }
            // })
        },
        /* 图表 */
        ehcharsT() {
            const that = this;
            const myChart = echarts.init(that.$refs.main);
            window.onresize = () => {
                myChart.resize();
            };
            myChart.setOption({
                title: {
                    // text: '成绩区间占比图',
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
.contentBox {
    /* width: 100%; */
    min-width: 1200px;
    overflow: auto;
    background-color: #fdfcfa;
}
.top,
.center,
.bottom {
    /* height: 500px; */
    /* width: 100%; */
    background-color: #fff;
}
.top {
    background-color: #fff;
    margin: 0 20px;
    border: 1px solid #eee;
    border-top: 1px solid #444;
    margin-top: 20px;
}
.top .topTextBox {
    height: 30px;
    line-height: 30px;
    background-color: #eee;
    padding-left: 10px;
}
.center {
    /* background-color: #eee; */
    overflow: hidden;
}
.bottom {
    /* background-color: lightgreen; */
}
.inputWidth {
    width: 300px;
}
.inputWidth input {
    height: 28px;
}
.formStyle {
    margin-top: 20px;
}
.pieChart {
    /* width: 100%; */
    /* background-color: #fff; */
}
.Histogram1 {
    /* background-color: ; */
}
.leftBorder {
    width: 5px;
    border-left: 5px solid #ff0000;
}
.titleTextStyle {
    font-size: 14px;
    font-weight: 700;
    margin-left: 10px;
}
.pieChartText {
    font-size: 14px;
    font-weight: 700;
    margin-left: 15px;
}
/* 第二个盒子 */
.left,
.right {
    /* width: 700px; */
    /* height: 400px; */
    /* max-height: 600px;
  min-height: 500px; */
    display: inline-block;
}
.left {
    width: 50%;
    height: 300px;
}
.right {
    /* height: 200px; */
    /* float: right; */
    width: 50%;
    /* height: 500px; */
    margin-top: 41px;
    padding-left: 20px;
    position: absolute;
    right: 0;
}
.scoringRateBox {
    width: 100%;
    /* height: 500px; */
    position: relative;
}
.scoringRate {
    width: 600px;
}
.one,
.two,
.three {
    overflow: hidden;
    border: 1px solid #eee;
    background-color: #fdfcfa;
}
.analysisTable {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
}
.analysisTable tr {
    height: 40px;
}
.analysisTable td {
    border-bottom: 1px solid #dbe0e5;
    height: 40px !important;
    padding: 0 !important;
    text-align: center;
}
.tqRate {
    width: 50%;
}
.tqtype {
    width: 100%;
    height: 300px;
    background-color: #eee;
    display: inline-block;
    position: relative;
}
.tqStem {
    width: 85%;
    height: 30px;
    background-color: pink;
    display: inline-block;
    position: absolute;
    right: 0;
}
.tpType_title {
    position: absolute;
    left: 0;
    width: 15%;
}
.a {
    display: inline-block;
    /* display: flex; */
}
.son {
    /* display: flex;
  justify-content: center;
  align-items: center; */
}
.table_rate {
    display: inline-block;
    width: 85%;
}
.div_box {
    display: flex;
}
.la {
    display: flex;
    align-items: center;
    justify-content: center;
}
.outBox {
    display: flex;
}
.son {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 15%;
    border: 1px solid #ebeef5;
    margin-right: -1px;
    margin-bottom: -1px;
    /* margin-left: 1px; */
    border-left: none;
}
</style>