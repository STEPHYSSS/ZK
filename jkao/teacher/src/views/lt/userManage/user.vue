<template>
    <el-card id="user-exam" class="f-new box-card">
        <!-- <new-tabs :active="2" level1="新增用户" level2="管理用户" level3="批量导入用户" @callback1="addUsers" @callback3="ImportingUsers"></new-tabs> -->
        <h3>学生管理</h3>
        <previous-page goPreviousPage="/mpage"></previous-page>

        <!-- 搜索框 -->
        <el-form
            :inline="true"
            :model="formInline"
            size="mini"
            style="padding: 20px 20px 0 20px;"
            class="f-new-inp demo-form-inline"
        >
            <el-row>
                <el-col :span="6">
                    <!-- <el-form-item label="用户名:">
                        <el-input clearable v-model="formInline.username" placeholder="用户名"></el-input>
                    </el-form-item> -->
                     <el-form-item label="真实姓名:">
                        <el-input clearable v-model="formInline.stuname" placeholder="真实姓名"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                      <el-form-item label="学号:">
                        <el-input clearable v-model="formInline.num" placeholder="学号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" style="text-align:right">
                     <el-form-item label="用户状态:">
                        <el-select clearable v-model="formInline.status" placeholder="用户状态">
                            <!-- <el-option label="全部" value="2"></el-option> -->
                            <el-option label="关闭" value="2"></el-option>
                            <el-option label="开放" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6" style="text-align:right">
                   <el-form-item label="所属班级:">
                        <el-select clearable v-model="formInline.class_id" placeholder="所属班级">
                            <el-option
                                v-for="(item, index) in list"
                                :key="index"
                                :label="item.class_name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    
                </el-col>
                <el-col class="fr txalign-c" :span="6">
                    <el-form-item>
                        <el-button class="search search-btn" @click="searchCX">搜索</el-button>
                        <el-button class="search search-btn" @click="clear">重置</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form> 
        <div class="addBox">
            <el-button @click="addUsers">新增</el-button>
            <el-button @click="delAll">批量删除</el-button>
        </div>
        <!-- 表格 -->
        <el-table :data="stuList" style="width: 100%" @selection-change="chooseStu">
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="username" label="用户名" align="center" width="180"></el-table-column>
            <el-table-column prop="realname" label="真实姓名" align="center" width="180"></el-table-column>
            <el-table-column prop="num" align="center" width="170" label="学号"></el-table-column>
            <el-table-column prop="user_photo" align="center" label="学员照片">
                <template slot-scope="scope">
                    <img
                        v-if="scope.row.user_photo"
                        class="img-wid-table"
                        :src="reqApi.shuiwuUrl+scope.row.user_photo"
                        alt
                    />
                </template>
            </el-table-column>
            <el-table-column prop="class_name" align="center" label="所属班级" width="250px" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="status" align="center" label="学员状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.status == 1">开放</span>
                    <span v-if="scope.row.status == 2">关闭</span>
                </template>
            </el-table-column>
            <el-table-column prop="last_login_time" align="center" label="最后登录时间" width="210">
                <template slot-scope="scope">
                    <span v-if="scope.row.last_login_time">{{scope.row.last_login_time|fmtDate}}</span>
                    <span v-else>未登录</span>
                </template>
            </el-table-column>
            <el-table-column prop="class_name" align="center" label="操作" width="180">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" content="考试记录" placement="bottom">
                        <span class="cur-point dis-inline-block" @click="handleExam(scope.row)">
                            <img src="@/assets/images/zicejilu_icon.png" alt />&nbsp;&nbsp;&nbsp;
                        </span>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="自测记录" placement="bottom">
                        <span class="cur-point dis-inline-block" @click="handleRecord(scope.row)">
                            <img src="@/assets/images/ziceliebiao_icon.png" alt />&nbsp;&nbsp;&nbsp;
                        </span>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
                        <span class="cur-point dis-inline-block" @click="handlePut(scope.row)">
                            <img src="@/assets/images/xiugai_icon.png" alt />
                        </span>
                    </el-tooltip>&nbsp;&nbsp;&nbsp;
                    <span
                        class="cur-point dis-inline-block"
                        @click="open(scope.row)"
                    >
                        <img src="@/assets/images/shanchu_icon.png" alt />
                    </span>&nbsp;&nbsp;&nbsp;
                    <el-tooltip class="item" effect="dark" content="重置密码" placement="bottom">
                        <span
                            class="cur-point dis-inline-block"
                            @click="reset(scope.row)"
                            v-if="role_id !=4"
                        >
                            <img src="@/assets/images/chongzhi_icon.png" alt />
                        </span>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <!-- 考试记录对话框 -->
        <el-dialog
            :visible.sync="dialogVisibleExam"
            :close-on-press-escape="false"
            :show-close="false"
            width="750px"
        >
            <div class="analyzeHead">
                <img src="@/assets/images/icon_news.png" alt />
                <span>考试记录</span>
                <a href="javacript:;" @click="handleClose" class="fr el-icon-close"></a>
            </div>
            <div class="analyzeBody">
                <!-- <div class="topPadding">
                    <h4>他的考试记录</h4>
                </div>-->
                <template>
                    <el-table
                        :data="tableDataExam"
                        class="topBorder"
                        :header-cell-style="{color:'#444'}"
                        style="width: 100%"
                        max-height="600px"
                    >
                        <el-table-column align="center" prop="exam_name" label="试卷名"></el-table-column>
                        <el-table-column align="center" width="150" label="考试时间">
                            <template slot-scope="scope">
                                {{scope.row.start_time|fmtDate1}}
                                <br />
                                {{scope.row.end_time|fmtDate1}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" prop="score" label="试卷得分">
                            <template slot-scope="scope">{{scope.row.user_score || 0}}</template>
                        </el-table-column>
                        <el-table-column align="center" prop="total_score" label="卷面总分"></el-table-column>
                        <!-- <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <a href="javascript:;" @click="openExam(scope.row)">删除</a>
              </template>
                        </el-table-column>-->
                    </el-table>
                </template>
                <!-- 分页 -->
                <el-pagination
                    small
                    background
                    layout="total, sizes, prev, pager, next, jumper"
                    @size-change="handleSizeChangeExam"
                    @current-change="handleCurrentChangeExam"
                    :page-size="pagesizeExam"
                    :page-sizes="[10, 20, 30, 40]"
                    :current-page="pagenumExam"
                    :total="totalExam"
                ></el-pagination>
            </div>
        </el-dialog>

        <!-- 自测列表对话框 -->
        <el-dialog
            :visible.sync="dialogVisibleRecord"
            :close-on-press-escape="false"
            :show-close="false"
            width="750px"
        >
            <div class="analyzeHead">
                <img src="@/assets/images/icon_news.png" alt />
                <span>自测列表</span>
                <a href="javacript:;" @click="handleClose" class="fr el-icon-close"></a>
            </div>
            <div class="analyzeBody">
                <!-- <div class="topPadding">
                    <h4>他的自测列表</h4>
                </div>-->
                <template>
                    <el-table
                        :data="tableDataRecord"
                        stripe
                        class="topBorder"
                        :header-cell-style="{color:'#444'}"
                        style="width: 100%"
                        max-height="600px"
                    >
                        <el-table-column align="center" prop="name" label="自测名称"></el-table-column>
                        <!-- <el-table-column align="center" prop="duration" label="总时长"></el-table-column> -->
                        <el-table-column align="center" prop="timecost" label="耗时"></el-table-column>
                        <el-table-column align="center" width="140" label="自测时间">
                            <template slot-scope="scope">
                                {{scope.row.start_time|fmtDate1}}
                                <br />
                                {{scope.row.end_time|fmtDate1}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" prop="get_score" label="用户得分"></el-table-column>
                        <el-table-column align="center" prop="total_score" label="总分"></el-table-column>
                        <el-table-column align="center" label="操作">
                            <template slot-scope="scope">
                                <a href="javascript:;" @click="openTest(scope.row)">删除</a>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
                <!-- 分页 -->
                <el-pagination
                    small
                    background
                    layout="total, sizes, prev, pager, next, jumper"
                    @size-change="handleSizeChangeRecord"
                    @current-change="handleCurrentChangeRecord"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="pagesizeRecord"
                    :current-page="pagenumRecord"
                    :total="totalRecord"
                ></el-pagination>
            </div>
        </el-dialog>
        <!-- 分页 学生列表 -->
        <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="formInline.pageNum"
                :page-sizes="pagesizes"
                :page-size="formInline.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
        </div>
    </el-card>
</template>

<script>
// import newTabs from "@/components/newTabs";
import previousPage from "@/components/previousPage.vue";
import qs from "qs";
export default {
    data() {
        return {
            // 数据分析对话框
            dialogVisibleExam: false,
            dialogVisibleRecord: false,

            // 搜索框
            formInline: {
                username: "",
                stuname: "",
                num: "",
                phone: "",
                class_id: "",
                status: "",
                // timeOrder: "0",
                pageNum: 1,
                pageSize: 10
            },
            role_id: sessionStorage.getItem("role_id"),
            // 表格
            tableData: [],
            stuList: [],
            tableDataExam: [],
            tableDataRecord: [],
            list: [],
            classList: [],
            // 自测
            recordList: [],
            // 考试记录
            examList: [],
            // 分页数据
            total: 10,
            pagesize: 10,
            pagesizes: [10, 20, 30, 40],
            pagenum: 1,
            // 分页数据
            totalExam: 10,
            pagesizeExam: 10,
            pagenumExam: 1,
            // 分页数据
            totalRecord: 0,
            pagesizeRecord: 10,
            pagenumRecord: 1,
            delStu: [],
            exam_id: "",
            testId: ""
        };
    },

    created() {
        this.findAllUser();
        this.getfindClasses();
    },
    components: {
        // newTabs,
        "previous-page": previousPage
    },
    methods: {
        clear(){
                this.formInline.stuname=''
                this.formInline.num=''
                this.formInline.status=''
                this.formInline.class_id=''
                this.findAllUser();
                // this.formInline.stuname=''
        },
        //批量删除学生
        delAll() {
            if (this.delStu.length == 0) {
                return this.$message.error("请选择需要删除的学生！！");
            }
            this.$utils
                .post(
                    this.reqApi.shuiwuUrl + "/student/deleteList",
                    qs.stringify({
                        user_ids: JSON.stringify(this.delStu)
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.$message.success("删除成功！！");
                        this.findAllUser();
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });
        },
        chooseStu(selection) {
            this.delStu = [];
            selection.forEach(item => {
                this.delStu.push(item.id);
            });
        },
        // 学生列表
        findAllUser() {
            //   if (sessionStorage.getItem("currentPage")) {
            //     this.formInline.pageNum = sessionStorage.getItem("currentPage");
            //   }
            // if (this.$route.query) {
            //   this.formInline.pageNum = this.$route.query.page
            //     ? Number(this.$route.query.page)
            //     : 1;
            //   this.formInline.pageSize = this.$route.query.pageSize
            //     ? Number(this.$route.query.pageSize)
            //     : 10;
            // }
            this.$utils
                .post(
                    this.reqApi.shuiwuUrl + "/student/listStudent",
                    qs.stringify(this.formInline)
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.stuList = res.data.students.list;
                        this.total = res.data.students.total;
                    }
                    // this.stuList = res.data.students.list;
                });
        },

        // 班级列表
        getfindClasses() {
            this.$utils
                .post(
                    this.reqApi.shuiwuUrl + "/class/list",
                    qs.stringify({
                        pageSize: "99999"
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.list = res.data.classes.list;
                    } else {
                        this.$message(res.data.msg);
                    }
                });
        },
        searchCX() {
            this.findAllUser();
        },

        // addUsers
        addUsers() {
            this.$router.push({ name: "addUsers" });
        },
        examRecord() {
            this.$utils
                .post(
                    this.reqApi.shuiwuUrl + "/analysis/getStuExamAys",
                    qs.stringify({
                        user_id: this.exam_id,
                        pageSize: this.pagesizeExam,
                        pageNum: this.pagenumExam
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.tableDataExam = res.data.stuAys.list;
                        this.totalExam = res.data.stuAys.total;
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });
        },
        // 考试记录
        handleExam(info) {
            this.exam_id = info.id;
            this.dialogVisibleExam = true;
            this.examRecord();
        },
        getTestRecord() {
            this.$utils
                .post(
                    this.reqApi.shuiwuUrl + "/selfExam/listForTeacher",
                    qs.stringify({
                        stu_id: this.testId,
                        pageNum: this.pagenumRecord,
                        pageSize: this.pagesizeRecord
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.recordList = res.data.selfExams.list;
                        this.tableDataRecord = res.data.selfExams.list;
                        this.totalRecord = res.data.selfExams.total;
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });
        },
        handleRecord(info) {
            this.testId = info.id;
            this.dialogVisibleRecord = true;
            this.getTestRecord();
        },

        // 关闭
        handleClose() {
            this.dialogVisibleExam = false;
            this.dialogVisibleRecord = false;
        },

        //改
        handlePut(info) {
            this.$router.push({
                name: "addUsers",
                query: { id: info.id }
            });
        },

        // 删
        open(info) {
            const that = this;
            that.$confirm("删除操作无法恢复，确定删除吗?", "来自网页的消息", {
                cancelButtonText: "取消",
                confirmButtonText: "确定"
            })
                .then(() => {
                    that.$utils
                        .post(
                            this.reqApi.shuiwuUrl + "/student/delete",
                            qs.stringify({
                                user_id: info.id
                            })
                        )
                        .then(res => {
                            if (res.data.code === "0000") {
                                this.$message.success("删除成功！");
                                this.findAllUser();
                            }
                        });
                })
                .catch(() => {});
        },

        // 删自测记录
        openTest(info) {
            this.$confirm("删除操作无法恢复，确定删除吗?", "来自网页的消息", {
                cancelButtonText: "取消",
                confirmButtonText: "确定"
            })
                .then(() => {
                    this.$utils
                        .post(
                            this.reqApi.shuiwuUrl + "/selfExam/delete",
                            qs.stringify({
                                self_exam_id: info.id
                            })
                        )
                        .then(res => {
                            if (res.data.code === "0000") {
                                this.$message.success("删除成功");
                                this.getTestRecord();
                            } else {
                                this.$message.error(res.data.msg);
                            }
                        });
                })
                .catch(() => {});
        },

        // 删考试记录
        // openExam(info) {
        //   const that = this
        //   that.$confirm('删除操作无法恢复，确定删除吗?', '来自网页的消息', {
        //     cancelButtonText: '取消',
        //     confirmButtonText: '确定',
        //   }).then(() => {
        //     console.log(info)
        //     that.$utils.post(`/exam/test/delUserExam/${info.pid}`).then(res => {
        //       const {code, msg} = res.data
        //       if (code === '00') {
        //         that.$message.success(msg)
        //         that.handleExam(info)
        //       }
        //       else return that.$message(msg)
        //     })
        //   }).catch(() => {})
        // },

        ImportingUsers() {
            this.$router.push({ name: "ImportingUsers" });
        },

        // 分页
        handleSizeChange(val) {
            this.formInline.pageSize=val
            this.$router.replace({
                path: this.$route.path,
                query: {
                    page: this.$route.query.page ? this.$route.query.page : "1",
                    pageSize: val
                }
            });
            this.findAllUser();
        },

        handleCurrentChange(val) {
            this.formInline.pageNum=val
            this.$router.replace({
                path: this.$route.path,
                query: {
                    page: val,
                    pageSize: this.$route.query.pageSize
                        ? this.$route.query.pageSize
                        : 10
                }
            });
            this.findAllUser();
        },

        // 分页
        handleSizeChangeExam(val) {
            this.pagesizeExam = val;
            this.examRecord();
        },

        handleCurrentChangeExam(val) {
            this.pagenumExam = val;
            this.examRecord();
        },
        //重置
        reset(info) {
            this.$confirm("确认将密码重置为123456吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
                // type: 'warning'
            })
                .then(() => {
                    this.$utils
                        .post(
                            this.reqApi.shuiwuUrl + "/student/resetPWD",
                            qs.stringify({ user_id: JSON.stringify(info.id) })
                        )
                        .then(res => {
                            const { code, msg } = res.data;
                            if (code === "0000") {
                                this.$message.success("重置成功");
                                this.getAdminList();
                            } else {
                                this.$message(msg);
                            }
                        });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消重置"
                    });
                });
        },
        // 分页
        handleSizeChangeRecord(val) {
            this.pagesizeRecord = val;
            this.getTestRecord();
        },

        handleCurrentChangeRecord(val) {
            this.pagenumRecord = val;
            this.getTestRecord();
        }
    }
};
</script>

<style scoped>
/* 数据分析头部 */
.analyzeHead {
    padding: 8px 7px;
    border-bottom: 1px solid #ccc;
    color: #444;
    font-size: 16px;
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
    color: #ccc;
    font-weight: 700;
}

/* 数据分析身体 */
.analyzeBody {
    /* padding: 10px 30px; */
}

.el-dialog {
    width: 60% !important;
}

.analyzeBody div.el-table {
    border: 1px solid #ebeef5;
    border-bottom: 0px solid #ccc;
}
</style>