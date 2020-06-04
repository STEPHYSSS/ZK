<template>
    <div>
        <el-dialog :visible.sync="dialogVisibleData" width="900px">
            <h3>选择考试</h3>
            <div class="analyzeHead">
                <!-- <img src="@/assets/images/icon_news.png" alt /> -->
                <!-- <span>选择考试</span> -->
                <!-- <a href="javacript:;" @click="$emit('close')" class="fr el-icon-close"></a> -->
            </div>
            <div class="analyzeBody">
                <!-- 搜索框 -->
                <el-form :inline="true" :model="form" size="mini" class="demo-form-inline">
                    <el-form-item label="考试名称:">
                        <el-input v-model="form.exam_name" clearable></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="试卷分类:">
                        <el-select v-model="form.type_id" placeholder="请选择" class="searchWid-2">
                            <el-option
                                v-for="(item,index) in paperListCategorys"
                                :key="index"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>-->
                    <!-- <el-form-item label="考试名称:">
                        <el-input v-model="form.exam_name" clearable></el-input>
                    </el-form-item>-->
                    <!-- <el-form-item label="试卷类型:">
          <el-select v-model="form.ppapertype" placeholder="请选择" class="searchWid-1">
            <el-option label="全部" value="2"></el-option>
            <el-option label="普通试卷" value="0"></el-option>
            <el-option label="随机试卷" value="1"></el-option>
          </el-select>
                    </el-form-item>-->
                    <el-form-item class="search">
                        <el-button @click="searchCX">搜索</el-button>
                    </el-form-item>
                </el-form>

                <!-- 表格 -->
                <template>
                    <el-table
                        :data="tableData"
                        max-height="600px"
                        border
                        ref="Table"
                        style="width: 100%"
                        @row-click="chooseOne"
                    >
                        <el-table-column label width="65">
                            <template slot-scope="scope">
                                <el-radio
                                    class="radio"
                                    v-model="radioList"
                                    :label="scope.row.id"
                                    @change="changeRadio(scope.row)"
                                >&nbsp;</el-radio>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="考试名称">
                            <template slot-scope="scope">{{ scope.row.name }}</template>
                        </el-table-column>
                        <el-table-column align="center" label="开始时间">
                            <template slot-scope="scope">{{ scope.row.start_time | fmtDate() }}</template>
                        </el-table-column>
                        <el-table-column align="center" label="结束时间">
                            <template slot-scope="scope">{{ scope.row.end_time | fmtDate()}}</template>
                        </el-table-column>
                        <el-table-column prop="duration" align="center" label="考试时长"></el-table-column>
                        <el-table-column prop="description" align="center" label="考试说明"></el-table-column>
                    </el-table>
                </template>
                <el-button class="btnstyle" @click="sure">确定</el-button>
                <!-- 分页 -->
                <div class="block">
                    <el-pagination
                        small
                        background
                        layout="prev, pager, next"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-size="form.pageSize"
                        :page-sizes="pagesizes"
                        :current-page="form.pageNum"
                        :total="total"
                    ></el-pagination>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getTypePapers } from "@/api/taxUrl/testpaper";
import qs from "qs";
export default {
    data() {
        return {
            // 表格
            tableData: [],
            paperListCategorys: [],
            form: {
                // testpaper_name: "",
                // type_id: "",
                exam_name: "",
                pageSize: 10,
                pageNum: 1
            },
            radioList: '',
            currentSelectItem: {}, //当前选中的值
            dialogVisibleData: false,
            // 选择试卷对话框
            list: [],
            // 分页数据
            total: 10,
            // pagesize: 5,
            pagesizes: [1, 2, 3, 4],
            exam_id: "",
            exam_name: ""
            // pagenum: 1,
        };
    },

    created() {
        this.getFindPaperStatistics();
        this.getTypePapers();
        this.getExamList();
    },

    props: {
        paperList: {
            type: Array,
            default: function() {
                return [];
            }
        },
        formData: {
            type: Object,
            default: function() {
                return {};
            }
        }
    },

    methods: {
        chooseOne(row){
            this.radioList = row.id
            this.exam_id = row.id;
            this.exam_name=row.name
            // this.$refs.Table.toggleRowSelection(row)
        },
        sure() {
            if (!this.exam_id) return this.$message.error("请选择试卷！");
            this.dialogVisibleData = false;
            this.$emit("getStuExamAys");
            this.$emit('getName')
        },
        changeRadio(row) {
            this.exam_id = row.id;
            this.exam_name = row.name;

        },
        getExamList() {
            this.$utils
                .post(
                    this.reqApi.shuiwuUrl + "/exam/list",
                    qs.stringify(this.form)
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.tableData = res.data.exams.list;
                        this.total = res.data.exams.total;
                    }
                });
        },
        // 获取试卷分析列表
        getFindPaperStatistics() {
            const that = this;
            that.list = this.paperList;
            that.total = this.paperList.length;
            that.tableData = [];
            this.paperList.forEach((item, index) => {
                if (index < that.pagesize) return that.tableData.push(item);
            });
        },
        // 获取试卷分类
        getTypePapers() {
            this.$utils
                .post(
                    this.reqApi.shuiwuUrl + "/testpaper/listType",
                    qs.stringify({
                        pageSize: 99999
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.paperListCategorys = res.data.types.list;
                    }
                });
            return;
            const that = this;
            const {
                data: { types, code }
            } = getTypePapers();
            if (code === "0000") return (that.paperListCategorys = types.list);
        },
        searchCX() {
            this.getExamList();
            return;
            const that = this;
            that.$utils
                .post("exam/statistics/findPaperStatisticsSearch", that.form)
                .then(res => {
                    const { code, msg, list } = res.data;
                    if (code === "00") {
                        that.list = list;
                        that.tableData = [];
                        list.forEach((item, index) => {
                            if (index < that.pagesize)
                                return that.tableData.push(item);
                        });
                        that.total = list.length;
                    } else return that.$message(msg);
                });
        },

        // 分页
        handleSizeChange(val) {
            this.form.pageSize = val;
            this.getExamList();
            return;
            this.pagesize = val;
            this.tableData = [];
            this.pagenum = 1;
            this.list.forEach((item, index) => {
                if (index < this.pagesize) return this.tableData.push(item);
            });
        },

        handleCurrentChange(val) {
            this.form.pageNum = val;
            this.getExamList();
            return;
            this.pagenum = val;
            this.tableData = [];
            const currentIndex = this.pagesize * val;
            this.list.forEach((item, index) => {
                let result = [];
                if (index < currentIndex) {
                    result.push(item);
                    if (index >= this.pagesize * (val - 1))
                        return this.tableData.push(item);
                }
            });
        }
    },
    watch: {
        paperList: function(val) {
            this.getFindPaperStatistics();
        }
    }
};
</script>

<style scoped>
.btnstyle {
    float: left;
    margin-top: 10px;
    /* margin-left: 15px; */
}
.analyzeBody {
    padding: 0 20px;
}
</style>