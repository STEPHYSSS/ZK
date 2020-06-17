<template>
    <el-card shadow="never" class="box-card">
        <!-- <my-bread level1="考试分析" level2="考试分析" level3="选择试卷查看分析试题的统计情况。"></my-bread> -->
        <!-- <div class="new-padding-left font-weight-700 teacher-title"></div> -->
        <h3>试卷分析</h3>
        <previous-page goPreviousPage="/mpage"></previous-page>
        <table border="1">
            <tbody>
                <tr>
                    <td class="text-right td-blue">试卷名称:</td>
                    <td class="td-wid">
                        <input type="text" placeholder="请选择试卷" readonly v-model="examMc" />
                        <el-button class="haha search-btn" @click="getFindPaperStatistics">选择试卷</el-button>
                    </td>
                </tr>
                <tr v-show="showResult">
                    <td class="text-right td-blue">统计结果:</td>
                    <td>
                        <div>
                            <h4>分数统计</h4>
                            <el-row>
                                <el-col>
                                    <tr>
                                        <td class="text-center td-blue">最高分</td>
                                        <td class="td-wid-td">
                                            <!-- {{analysisResult.r11}} - {{analysisResult.r11_realname}}({{analysisResult.r11_username}}) -->
                                            {{analysisResult.max_score}}
                                        </td>
                                        <td class="text-center td-blue">最低分</td>
                                        <td class="td-wid-td">
                                            <!-- {{analysisResult.r12}} - {{analysisResult.r12_realname}}({{analysisResult.r12_username}}) -->
                                            {{analysisResult.min_score}}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="text-center td-blue">平均分</td>
                                        <td
                                            class="td-wid-td"
                                        >{{parseFloat(analysisResult.avg_score).toFixed(2)}}</td>
                                        <td class="text-center td-blue"></td>
                                        <td class="td-wid-td"></td>
                                    </tr>
                                </el-col>
                            </el-row>
                        </div>
                        <div>
                            <h4>用户统计</h4>
                            <el-row>
                                <el-col>
                                    <tr>
                                        <td class="text-center td-blue">及格人数</td>
                                        <td class="td-wid-td">{{analysisResult.pass_count}}</td>
                                        <td class="text-center td-blue">参与人数</td>
                                        <td class="td-wid-td">{{analysisResult.join_count}}</td>
                                    </tr>
                                    <tr>
                                        <td class="text-center td-blue">及格比例</td>
                                        <td class="td-wid-td">
                                            <!-- {{parseFloat(analysisResult.r31 / analysisResult.r32 * 100).toFixed(2)}}% -->
                                            <!-- {{analysisResult.pass_rate.toFixed(2)}}% -->
                                            {{analysisResult.pass_rate}}%
                                        </td>
                                        <!-- <td class="text-center td-blue">参加比例</td>
                    <td class="td-wid-td">
                      {{parseFloat(analysisResult.r32 / analysisResult.r51 * 100).toFixed(2)}}%
                                        </td>-->
                                    </tr>
                                    <tr>
                                        <!-- <td class="text-center td-blue">应参加数</td>
                    <td class="td-wid-td">
                      {{analysisResult.r51}}
                                        </td>-->
                                        <!-- <td class="text-center td-blue">缺考人数</td> -->
                                        <!-- <td class="td-wid-td">
                      {{analysisResult.r52}}
                                        </td>-->
                                    </tr>
                                </el-col>
                            </el-row>
                        </div>
                        <!-- <div>
              <h4>时间统计</h4>
              <el-row>
                <el-col>
                  <tr>
                    <td class="text-center td-blue">最早交卷</td>
                    <td class="td-wid">
                      {{analysisResult.r61}} - {{analysisResult.r61_realname}} ({{analysisResult.r61_username}})
                    </td>
                  </tr>
                  <tr>
                    <td class="text-center td-blue">最迟交卷</td>
                    <td class="td-wid">
                      {{analysisResult.r71}} - {{analysisResult.r71_realname}} ({{analysisResult.r71_username}})
                    </td>
                  </tr>
                  <tr>
                    <td class="text-center td-blue">最长耗时</td>
                    <td class="td-wid">
                      {{analysisResult.r81}} - {{analysisResult.r81_realname}} ({{analysisResult.r81_username}})
                    </td>
                  </tr>
                  <tr>
                    <td class="text-center td-blue">最短耗时</td>
                    <td class="td-wid">
                      {{analysisResult.r91}} - {{analysisResult.r91_realname}} ({{analysisResult.r91_username}})
                    </td>
                  </tr>
                </el-col>
              </el-row>
                        </div>-->
                    </td>
                </tr>
            </tbody>
        </table>
        <add-btn
            style="margin-left: 100px;"
            level1="开始统计"
            level2="取 消"
            @submitForm="startAnalysis"
            @cancelForm="papersAnalysis"
        ></add-btn>
        <!-- 选择试卷对话框 -->
        <!-- <el-dialog :visible.sync="dialogVisibleData" width="60%" class="analy-q" :show-close="false"> -->
        <choose-paper ref="choose" :paperList="tableData" @close="handleClose" @examRow="examRow"></choose-paper>
        <!-- </el-dialog> -->
    </el-card>
</template>

<script>
import choosePaper from "./testPaper";
import previousPage from "@/components/previousPage.vue";
import qs from "qs";
export default {
    data() {
        return {
            // 表格
            tableData: [],
            // 分析详情
            pid: "",
            // 显示统计结果
            showResult: false,
            // 统计数据
            analysisResult: {},
            // 试卷名称
            examMc: "",
            // 选择试卷对话框
            dialogVisibleData: false
        };
    },

    created() {
        // this.getFindPaperCategorys()
    },

    components: {
        choosePaper,
        "previous-page": previousPage
    },

    methods: {
        // 获取试卷分析列表
        getFindPaperStatistics() {
            this.$refs.choose.dialogVisibleData = true;
            return;
            const that = this;
            that.$utils
                .post(`exam/statistics/findPaperStatistics`)
                .then(res => {
                    const { list, code, msg } = res.data;
                    if (code === "00") {
                        that.tableData = list;
                        that.dialogVisibleData = true;
                    } else return this.$message(msg);
                });
        },

        // 选择试卷后
        examRow() {
            this.examMc = this.$refs.choose.dataRow.name;
        },

        // 开始统计
        startAnalysis() {
            if (!this.$refs.choose.exam_id)
                return this.$message.error("请选择试卷");
            this.examMc = this.$refs.choose.dataRow.name;
            this.$utils
                .post(
                    this.reqApi.shuiwuUrl + "/analysis/getTestpaperAys",
                    qs.stringify({
                        testpaper_id: this.$refs.choose.exam_id
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        if (res.data.testpaper_ays) {
                            this.analysisResult = res.data.testpaper_ays;
                            this.showResult = true;
                        }else{
                          this.$message('暂无数据')
                          this.analysisResult=[]
                          this.showResult=false
                        }
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });
        },

        papersAnalysis() {
            this.$router.push({ name: "papersAnalysis" });
        },

        // 关闭
        handleClose() {
            this.dialogVisibleData = false;
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
    padding: 5px 15px;
}
table tbody tr .td-blue {
    /* background-color: #a8e7f0; */
    /* width: 200px; */
    word-break: keep-all;
    white-space: nowrap;
}
table tbody tr .td-wid {
    width: 100%;
}
table tbody tr .td-wid-td {
    width: 50%;
}

.el-button.haha {
    /* border: 1px solid #31b5ff; */
    padding: 7px 7px;
    margin-left: 15px;
}

.inputWid {
    width: 100px;
}
</style>