<template>
    <el-card shadow="never" class="box-card">
        <h3>学生成绩</h3>
        <!-- <div class="new-padding-left font-weight-700 teacher-title">学生成绩</div> -->
        <previous-page goPreviousPage="/mpage"></previous-page>
        <div class="btnBox">
            <el-button class="haha search-btn" @click="getFindPaperStatistics">选择考试</el-button>
            <el-button class="haha search-btn" @click="exportExcel">导出</el-button>&nbsp;&nbsp;&nbsp;
            <span v-if="$refs.choose">{{$refs.choose.exam_name}}</span>
        </div>
        <!-- 搜索框 -->
        <el-form
            :inline="true"
            :model="form"
            size="mini"
            style="padding: 20px 0 0 20px;"
            class="f-new-inp demo-form-inline"
        >
            <el-row>
                <el-col :span="6">
                    <!-- <el-form-item label="用户名:">
            <el-input clearable v-model="form.username"></el-input>
                    </el-form-item>-->
                </el-col>
                <el-col :span="6">
                    <el-form-item label="真实姓名:">
                        <el-input clearable v-model="form.realname"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <!-- <el-form-item label="分数排序:">
            <el-select v-model="form.score" placeholder="请选择">
              <el-option label="默认" value="0"></el-option>
              <el-option label="降序" value="1"></el-option>
              <el-option label="升序" value="2"></el-option>
            </el-select>
                    </el-form-item>-->
                </el-col>
                <el-col :span="6">
                    <!-- <el-form-item label="时间排序:">
            <el-select v-model="form.timeOrder" placeholder="请选择">
              <el-option label="默认" value="0"></el-option>
              <el-option label="降序" value="1"></el-option>
              <el-option label="升序" value="2"></el-option>
            </el-select>
                    </el-form-item>-->
                </el-col>
                <el-col :span="6">
                    <el-form-item label="所在班级:">
                        <el-select v-model="form.class_id" placeholder="全部" clearable>
                            <el-option
                                v-for="(item,index) in classList"
                                :key="index"
                                :label="item.class_name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col class="fr txalign-c" style="padding-right: 20px;" :span="6">
                    <el-form-item>
                        <el-button @click="searchCX" class="search search-btn">搜索</el-button>
                        <el-button class="search search-btn" @click="clear">重置</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <!-- 表格 -->
        <el-table
            :data="tableData"
            class="topBorder"
            style="width: 100%"
            :header-cell-style="{backgroundColor:'#f7f9fd'}"
        >
            <el-table-column align="center" prop="realname" label="学生姓名"></el-table-column>
            <el-table-column align="center" prop="class_name" label="所在班级"></el-table-column>
            <el-table-column align="center" prop="user_num" label="学号"></el-table-column>
            <el-table-column align="center" label="考试时间">
                <template slot-scope="scope">
                    {{ scope.row.start_time | fmtDate()}}
                    <br />

                    {{ scope.row.end_time | fmtDate()}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="耗时(分钟)">
                <template slot-scope="scope">
                    {{scope.row.duration}}
                    <!-- {{parseFloat((new Date(scope.row.endtime).getTime() - new Date(scope.row.starttime).getTime()) / 1000 / 60).toFixed(2)}}分钟 -->
                </template>
            </el-table-column>
            <el-table-column align="center" label="批改状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.exam_finished == 2">未提交</span>
                    <span v-if="scope.row.exam_finished == 1">已完成</span>
                    <!-- {{scope.row.exam_finished}} -->
                </template>
            </el-table-column>
            <el-table-column align="center" prop="user_score" label="得分"></el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="form.pageNum"
                :page-sizes="pagesizes"
                :page-size="form.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
        </div>

        <!-- 选择试卷对话框 -->
        <!-- <el-dialog :visible.sync="dialogVisibleData" width="60%" class="analy-q" :show-close="false"> -->
        <choose-paper
            ref="choose"
            :formData="form"
            :paperList="paperList"
            @getStuExamAys="getStuExamAys"
            @close="handleClose"
            @examRow="examRow"
        ></choose-paper>
        <!-- </el-dialog> -->
    </el-card>
</template>

<script>
import { export2Excel } from "@/api/taxUrl/base";
import choosePaper from "./choosePaper";
import previousPage from "@/components/previousPage.vue";
import qs from "qs";
export default {
    data() {
        return {
            classList: [],
            // 表格
            tableData: [],
            paperList: [],
            form: {
                // pid: '',
                username: "",
                realname: "",
                class_id: "",
                pageSize: 10,
                pageNum: 1,
                exam_id: ""
                // score: '0',
                // timecost: '0',
                // timeOrder: '0'
            },
            // 选择试卷对话框
            dialogVisibleData: false,

            list: [],
            // 分页数据
            total: 0,
            pagesize: 10,
            pagesizes: [10, 20, 30, 40],
            pagenum: 1
        };
    },

    created() {
        this.getfindClasses();
        // this.getStuExamAys();
    },

    components: {
        choosePaper,
        "previous-page": previousPage
    },

    methods: {
        clear(){
            this.form.realname=''
            this.form.class_id=''
            this.getStuExamAys()
        },
        getStuExamAys() {
            // if(this.$refs.choose.exam_id){
            //   this.form.exam_id=this.$refs.choose.exam_id
            // } else {

            // }
            this.form.exam_id = this.$refs.choose.exam_id;
            this.$utils
                .post(
                    this.reqApi.shuiwuUrl + "/analysis/getStuExamAys",
                    qs.stringify(this.form)
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.tableData = res.data.stuAys.list;
                        this.total = res.data.stuAys.total;
                    }
                });
        },
        // 获取试卷分析列表
        getFindPaperStatistics() {
            this.$refs.choose.dialogVisibleData = true;
        },
        // banji
        getfindClasses() {
            this.$utils
                .post(
                    this.reqApi.shuiwuUrl + "/class/list",
                    qs.stringify({
                        pageSize: 9999999
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.classList = res.data.classes.list;
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });
        },
        searchCX() {
            this.getStuExamAys();
        },

        // 导出excel
        exportExcel() {
            const columns = [
                { title: "用户名", key: "username" },
                { title: "学生姓名", key: "realname" },
                { title: "所在班级", key: "class_name" },
                { title: "证件编号", key: "user_num" },
                { title: "得分", key: "user_score" }
            ];
            export2Excel(columns, this.tableData, "学生成绩");
        },

        // 选择试卷后
        examRow(row) {
            const that = this;
            this.form.pid = row.pid;
            that.$utils.post(`exam/oneExamRecord/${row.pid}`).then(res => {
                this.dialogVisibleData = false;
                const { list, list2 } = res.data;
                if (!list || list == "") return that.$message("无考试记录");
                that.list = list;
                that.total = list.length;
                that.tableData = [];
                list.forEach((item, index) => {
                    if (index < that.pagesize) return that.tableData.push(item);
                });
            });
        },
        // 分页
        handleSizeChange(val) {
            this.form.pageSize = val;
            this.getStuExamAys();
        },

        handleCurrentChange(val) {
            this.form.pageNum = val;
            this.getStuExamAys();
        },

        // 关闭
        handleClose() {
            this.dialogVisibleData = false;
        }
    }
};
</script>

<style scoped>
.btnBox {
    margin-left: 20px;
}
</style>