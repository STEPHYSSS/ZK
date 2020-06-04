<template>
    <!-- <el-card shadow="never" class="box-card"> -->
    <!-- <div class="contentBox"> -->
    <!-- <div class="top"> -->
    <!-- <div class="topTextBox">
                    <span class="leftBorder"></span>
                    <span class="titleTextStyle">
                        考试分析报告
                    </span>
    </div>-->
    <!--             <el-form ref="form" :model="form" label-width="80px" size="mini" class="formStyle">
                    <el-row>
                        <el-col>
                            <el-form-item label="选择考试:">
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
    </el-form>-->
    <div class="analysis">
        <div class="scoringRateBox1">
            <!-- 饼图 -->
            <div class="piechat">
                <h4 class="pieChartText">分数段构成图</h4>
                <div id="main" ref="main" :style="{ height: '300px',width:'100%'}"></div>
            </div>
            <div class="zhu">
                <h4 class="pieChartText">班级成绩分布图</h4>
                <!-- 班级成绩数据 -->
                <div id="histogram" ref="histogram" :style="{  height: '300px',width:'90%'}"></div>
            </div>
        </div>
        <!-- 班级成绩分布图 -->
        <div class="classGrade">
            <table class="analysisTable">
                <!-- <body> -->
                <tr style="background-color:#f7f9fd">
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
                <tr v-for="(item, index) in classGread" :key="index" @click="classRate(item)">
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
                <span class="titleTextStyle">得分率分析</span>
            </div>
            <!-- 客观题知识点得分率表右侧柱状图 -->
            <div class="scoringRateBox">
                <!-- 分割线 -->
                <div class="left">
                    <div class="tixing">
                        <h4 class="pieChartText">题型得分率表</h4>
                    </div>
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
                        <el-table-column label="得分率" align="center">
                            <template slot-scope="scope">
                                <span>{{scope.row.rate*100}}%</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="classGrade">
                <div style="text-align:center">
                    <h4 class="pieChartText">交卷时间分布图</h4>
                </div>
                <!-- 交卷时间 -->
                <div style="height:300px">
                    <div id="histogram" ref="jiaojuan" :style="{ height: '400px'}"></div>
                </div>
                <el-table :data="timerIntervalsArray" style="width: 100%" border>
                    <el-table-column prop="missExam" label="缺考" align="center"></el-table-column>
                    <el-table-column prop="timeInterval_1" label="30分钟以内" align="center"></el-table-column>
                    <el-table-column prop="timeInterval_2" label="30分钟-1小时" align="center"></el-table-column>
                    <el-table-column prop="timeInterval_3" label="1小时-1小时30分钟" align="center"></el-table-column>
                    <el-table-column prop="timeInterval_3" label="1小时30分钟-2小时" align="center"></el-table-column>
                    <el-table-column prop="timeInterval_4" label="2小时-2小时30分钟" align="center"></el-table-column>
                    <el-table-column prop="timeInterval_5" label="2小时30分钟-3小时" align="center"></el-table-column>
                    <el-table-column prop="timeInterval_6" label="3小时以上" align="center"></el-table-column>
                </el-table>
            </div>
        </div>
        <div class="center top">
            <div class="topTextBox">
                <span class="leftBorder"></span>
                <span class="titleTextStyle">试题得分率</span>
            </div>
            <div class="outBox" v-for="(item,index) in tqRateData" :key="index+'a'" v-show="item.question_datas.length>0">
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
                        <el-table-column
                            prop="question_content"
                            align="center"
                            :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column align="center">
                            <template slot-scope="scope">
                                <el-progress :percentage="(scope.row.rate*100)"></el-progress>
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
        <div class="center top">
            <div class="topTextBox">
                <span class="leftBorder"></span>
                <span class="titleTextStyle">考生成绩表</span>
                <span>{{}}</span>
            </div>
            <el-table :data="stuList" style="width: 100%">
                <el-table-column label="序号" width="50" align="center">
                    <template slot-scope="scope">{{scope.$index+1}}</template>
                </el-table-column>
                <el-table-column prop="class_name" label="班级" width="150" align="center"></el-table-column>
                <el-table-column prop="realname" label="姓名" align="center"></el-table-column>
                <el-table-column prop="user_num" label="学号" align="center"></el-table-column>
                <el-table-column prop="username" label="用户名" align="center"></el-table-column>
                <el-table-column prop="single_score" label="单选题得分" align="center"></el-table-column>
                <el-table-column prop="multi_score" label="多选题得分" align="center"></el-table-column>
                <el-table-column prop="judge_score" label="判断题得分" align="center"></el-table-column>
                <el-table-column prop="norprc_score" label="普通实训题得分" align="center"></el-table-column>
                <el-table-column prop="synprc_score" label="综合实训题得分" align="center"></el-table-column>
                <el-table-column prop="user_score" label="学生得分" align="center"></el-table-column>
                <el-table-column prop="total_score" label="试卷总分" align="center"></el-table-column>
                <el-table-column prop="duration" label="答题时间" align="center"></el-table-column>
                <el-table-column prop="address" label="考卷详情" align="center">
                    <template slot-scope="scope">
                        <span style="cursor:pointer" @click="toDetail(scope.row)">答卷详情</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
    <!-- </div> -->
    <!-- </div> -->
    <!-- </el-card> -->
</template> 
<script>
import echarts from "echarts";
import qs from "qs";
export default {
    data() {
        return {
            // flag: true,
            cexamId: "",
            // 班级分数段区间数据
            interval: {
                interval_3: "20-30",
                interval_2: "10-20",
                interval_5: "40-50",
                interval_4: "30-40",
                interval_1: "0-10"
            },
            // 学生成绩
            stuList: [],
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
            timerIntervalsArray: [],
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
                center: ["60%", "50%"],
                radius: ["0", "50%"],
                // color: ['#ee7738', '#51c2ee', '#fde14c'],
                color: ["#8085E9", "#90ED7D", "#F7A35C"],
                data: [],
                // list: ["q", "2"],
                label: {
                    normal: {
                        textStyle: {
                            color: "#000", // 改变标示文字的颜色
                            fontSize: 12
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
                    left: "400",
                    // right: "5%",
                    height: "300",
                    width: "300"
                },
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
                    data: []
                },
                series: [
                    // 鼠标放上去显示的数据
                    {
                        // name: '',
                        type: "bar",
                        barWidth: "20%",
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
                gird: {
                    // height: "66%"
                },
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
                        show: true
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
                        // rotate: 45, //文字逆时针旋转45°
                        rotate: 0,
                        textStyle: {
                            //文字样式
                            color: "black",
                            fontSize: 12,
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
                        show: true
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
    props: ["examId", "flag"],
    created() {
        this.cexamId = this.examId;
        this.scoreData = [];
    /*     this.scoreData = [
            {
                get_score: 5,
                rate: 0.5,
                total_score: 2,
                type: "普通实训题"
            },
            {
                get_score: 35,
                rate: 0.8,
                total_score: 2,
                type: "综合实训题"
            },
            {
                get_score: 20,
                rate: 0.45,
                total_score: 2,
                type: "客观题"
            },
            {
                get_score: 8,
                rate: 0.6,
                total_score: 2,
                type: "判断题"
            }
        ]; */
    },
    methods: {
        toDetail(row) {
            sessionStorage.setItem("examId", this.examId);
            this.$router.push({
                name: "specificAnalysis",
                query: {
                    exam_id: this.examId,
                    testpaper_id: row.stu_id
                }
            });
        },
        // 选择考试查看分析数据
        check(val) {
            this.examId = val;
            this.$utils
                .post(
                    this.reqApi.shuiwuUrl + "/analysis/totalAys",
                    qs.stringify({
                        exam_id: this.examId
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        // this.flag=true
                        this.pieChartList = res.data.intervals;
                        // 学生成绩
                        this.stuList = res.data.stu_datas;
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
                        }); //ok
                        this.classGread = res.data.classIntervals; //班级成绩分布
                        this.timerIntervals = res.data.timeInterval; //考试时间分布
                        this.timerIntervalsArray = [];
                        this.timerIntervalsArray.push(this.timerIntervals); // 表格数据
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
                        this.classGreadEchart(this.classGread); //班级成绩分布

                        this.scoringRate(); // 得分率柱状图
                        this.timerFn(); //交卷时间
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });
        },
        classRate(row) {
            this.$nextTick(() => {
                this.classGreadEchart(row);
            });
        },
        // 交卷时间
        timerFn() {
            let myChart = echarts.init(this.$refs.jiaojuan, "light");
            // window.onresize = () => {
            //     myChart.resize();
            // };
            window.addEventListener("resize", function() {
                myChart.resize();
            });
            // 设置x轴的文字
            // this.timerInit.xAxis.data = [

            // ];
            // for (const i of this.timerIntervals) {
            this.timerInit.series[0].data = [
                this.timerIntervals.missExam,
                this.timerIntervals.timeInterval_1,
                this.timerIntervals.timeInterval_2,
                this.timerIntervals.timeInterval_3,
                this.timerIntervals.timeInterval_4,
                this.timerIntervals.timeInterval_5,
                this.timerIntervals.timeInterval_6,
                this.timerIntervals.timeInterval_7
            ];
            // this.classGreadInit.series[0].data.push(i);
            // }
            myChart.setOption(this.timerInit);
        },
        // 班级成绩分布
        classGreadEchart(val) {
            let myChart = echarts.init(this.$refs.histogram, "light");
            // window.addEventListener("resize", function() {
            //     myChart.resize();
            // });
            // 设置x轴的文字
            this.classGreadInit.xAxis.data = [
                this.intervals.avgScore,
                this.intervals.interval_1 + "分",
                this.intervals.interval_2 + "分",
                this.intervals.interval_3 + "分",
                this.intervals.interval_4 + "分",
                this.intervals.interval_5 + "分",
                this.intervals.maxScore,
                this.intervals.minScore
            ];
            if (val instanceof Array) {
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
            } else {
                this.classGreadInit.series[0].data = [
                    val.avgScore,
                    val.interval_1,
                    val.interval_2,
                    val.interval_3,
                    val.interval_4,
                    val.interval_5,
                    val.maxScore,
                    val.minScore
                ];
            }

            this.$nextTick(() => {
                myChart.setOption(this.classGreadInit);
            });
        },
        // 题型得分率
        scoringRate() {
            this.scoringRateInit.yAxis.data = [];
            this.scoringRateInit.series[0].data = [];
            let myChart = echarts.init(this.$refs.scoringRate, "light");
            window.addEventListener("resize", function() {
                myChart.resize();
            });
            for (const i of this.scoreData) {
                this.scoringRateInit.yAxis.data.push(i.type);
                this.scoringRateInit.series[0].data.push(i.rate*100);
            }
            /*  for (const i of this.scoreData) {
                console.log(i);
                var ydata = [];
                ydata.push(i.type);
                var rate = [];
                rate.push((i.rate * 100).toFixed(2));
                console.log(rate);
            } */

            this.$nextTick(() => {
                myChart.setOption(this.scoringRateInit);
                return;
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
                    gird: {
                        left: "400",
                        // right: "5%",
                        height: "300",
                        width: "300"
                    },
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
                        data: ydata
                    },
                    series: [
                        // 鼠标放上去显示的数据
                        {
                            // name: '',
                            type: "bar",
                            barWidth: "20%",
                            data: rate,
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
                });
            });
        },
        // 饼图
        startAnalysis() {
            /*  this.list = [
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
                        (item.rate * 100).toFixed(2) +
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
    padding: 0 20px;
    border: 1px solid #eee;
    border-top: 1px solid #444;
    margin-top: 20px;
    box-sizing: border-box;
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
    width: 20%;
    display: inline-block;
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
    width: 47%;
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
    border: 1px solid #dbe0e5;
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
.scoringRateBox1 {
    position: relative;
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 15px;
}
.classanls {
    width: 80%;
    display: inline-block;
}
.piechat {
    height: 300px;
    width: 30%;
    /* background-color: pink; */
    display: inline-block;
    margin-left: 20px;
}
.zhu {
    height: 300px;
    width: 60%;
    /* background-color: deeppink; */
    display: inline-block;
    position: absolute;
    right: 0;
    box-sizing: border-box;
}
.classHistorm {
    width: 50%;
    margin-top: 41px;
    padding-left: 20px;
    position: absolute;
    right: 0;
}
.classGrade {
    /* padding: 0 20px; */
    border-top: 1px solid #dbe0e5;
    margin-top: 10px;
}
.tixing {
    margin-right: 30px;
    text-align: right;
}
.el-tooltip__popper {
    max-width: 100px;
    line-height: 180%;
}
</style>