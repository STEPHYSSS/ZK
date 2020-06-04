<template>
    <el-card class="new-class f-new box-card">
        <!-- <new-tabs :active="1" :level1="level" level2="管理班级" @callback2="findClasses"></new-tabs> -->
        <h3 v-if="this.$route.query.id">修改班级</h3>
        <h3 v-else>新增班级</h3>
        <previous-page goPreviousPage="/findClasses"></previous-page>
        <!-- <table border="1">
            <tbody>
                <tr>
                    <td class="txalign">班级名称:</td>
                    <td>
                        <input maxlength="50" type="text" v-model="form.name" />
                        <span>
                            <span class="redB">*</span>填写班级名称
                        </span>
                    </td>
                </tr>
                <tr>
                    <td class="txalign">状态:</td>
                    <td>
                        <el-select v-model="form.status" placeholder="请选择活动区域">
                            <el-option label="开放" value="1"></el-option>
                            <el-option label="关闭" value="0"></el-option>
                        </el-select>
                    </td>
                </tr>
                <tr>
                    <td class="txalign">班级备注:</td>
                    <td>
                        <input maxlength="50" type="text" v-model="form.remark" />
                    </td>
                </tr>
                <tr>
                    <td class="txalign">授课老师:</td>
                    <td>
                        <el-button @click="choice">请选择</el-button>
                    </td>
                </tr>
            </tbody>
        </table>-->
        <el-form
            ref="form"
            :model="form"
            :rules="rules"
            style="padding: 30px 100px;"
            label-width="80px"
        >
            <!-- <div> -->
            <el-form-item label="班级名称:" prop="class_name">
                <input maxlength="50" type="text" v-model="form.class_name" />
            </el-form-item>
            <!-- <el-form-item label="状态:" prop="status">
                <input maxlength="50" type="text" v-model="form.status" />
            </el-form-item>-->
            <el-form-item label="用户状态:" prop="status">
                <el-select style="width: 300px;" v-model="form.status" placeholder="请选择">
                    <el-option label="开放" :value="1"></el-option>
                    <el-option label="关闭" :value="2"></el-option>
                </el-select>
            </el-form-item>
            <!-- </div> -->
            <!-- <div> -->
            <el-form-item label="班级备注:" prop="remark">
                <input maxlength="50" type="text" v-model="form.remark" />
            </el-form-item>
            <el-form-item label="授课老师:" >
                <el-button @click="choice" class="teacherlabel">请选择</el-button>
            </el-form-item>
            <tableForm
                :teacher="teacher"
                :student="student"
                ref="laoshi"
                :dialogTitle="dialogTitle"
            ></tableForm>

            <!-- </div> -->

            <el-form-item label="学生:">
                <el-button @click="chooseStu">请选择</el-button>
            </el-form-item>
            <stutableForm :student="student" ref="xuesheng" :dialogTitle="dialogTitle"></stutableForm>
        </el-form>
        <add-btn
            style="margin-left: 120px;"
            level1="确 认"
            level2="取 消"
            @submitForm="submitForm('form')"
            @cancelForm="findClasses"
        ></add-btn>
    </el-card>
</template>

<script>
import newTabs from "@/components/newTabs";
import previousPage from "@/components/previousPage.vue";
import qs from "qs";
import tableForm from "./commonTable.vue";
import stutableForm from "./commonTable1.vue";
export default {
    data() {
        return {
            form: {
                // modifyor: sessionStorage.getItem("realName"),
                // name: "",
                // xh: 1,
                // pid: "1",
                // poster: sessionStorage.getItem("realName"),
                // remark: "",
                // status: "1"
                class_name: "",
                remark: "",
                status: 1
                // teacher_ids:[],//老师
                // student_ids:[], //学生
            },
            teacher_ids: [], //老师
            student_ids: [], //学生
            teachTable: false,
            chooseTeacherlist: [],
            delTeacher: [],
            dialogVisible: false,
            dialogVisible1: false,
            teacherDia: false,
            tableData: [],
            stuTable: false,
            teacher: false,
            delteaList: [],
            delStuList: [],
            dialogTitle: "",
            student: false,
            chooseStuList: [],
            rules: {
                class_name: [
                    {
                        required: true,
                        message: "请输入班级名称",
                        trigger: "change"
                    }
                ],
                status: [
                    {
                        required: true,
                        message: "请选择",
                        trigger: "change"
                    }
                ]
            }
        };
    },
    computed: {
        level: {
            get: function() {
                return (this.level = !this.$route.query.id
                    ? "新增班级"
                    : "修改班级");
            },
            set: function() {}
        }
    },
    components: {
        newTabs,
        "previous-page": previousPage,
        tableForm,
        stutableForm
    },

    created() {
        if (this.$route.query.id) return this.getClassInfo();
        // this.getTeacherList()
    },
    mounted() {},
    methods: {
        chooseStu() {
            this.student = true;

            this.$refs.xuesheng.dialogVisible = true;
            this.dialogTitle = "选择学生";
            // this.$refs.xuesheng.student=true
            this.$refs.xuesheng.stuList("3");
        },
        // getTeacherList() {
        //     this.$utils
        //         .post(
        //             this.reqApi.shuiwuUrl + "/teacher/list",
        //             qs.stringify({
        //                 pageSize: "999999"
        //             })
        //         )
        //         .then(res => {
        //             if (res.data.code === "0000") {
        //                 this.tableData = res.data.teachers.list;
        //                 if (this.$refs.multipleTable) {
        //                     this.tableData.forEach((item, index) => {
        //                         this.chooseTeacher.forEach((i, index2) => {
        //                             if (item.id == i.id) {
        //                                 item.flag = true;
        //                                 this.$nextTick(() => {
        //                                     this.$refs.multipleTable.toggleRowSelection(
        //                                         this.tableData[index],
        //                                         true
        //                                     );
        //                                 });
        //                             }
        //                         });
        //                     });
        //                 }
        //             }
        //         });
        // },
        choice() {
            this.teacher = true;
            this.$refs.laoshi.dialogVisible = true;
            this.dialogTitle = "选择授课老师";
            this.$refs.laoshi.teacher = true;
            this.$refs.laoshi.getTeacherList();
            this.dialogVisible = true;
        },
        getClassInfo() {
            this.$utils
                .post(
                    this.reqApi.shuiwuUrl + "/class/detail",
                    qs.stringify({
                        class_id: this.$route.query.id
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.form = res.data.class;
                        Number(this.form.status);
                        this.$refs.xuesheng.chooseStu = res.data.students;
                        this.$refs.laoshi.chooseTeacher = res.data.teachers;
                        if (this.$refs.laoshi.chooseTeacher.length > 0) {
                            this.$refs.laoshi.teachTable = true;
                        }
                        if (this.$refs.xuesheng.chooseStu.length > 0) {
                            this.$refs.xuesheng.stuTable = true;
                        }
                    }
                });
            // const that = this;
            // that.$utils
            //     .post(`exam/sys/findOneClass/${that.$route.query.id}`)
            //     .then(res => {
            //         const { code, object } = res.data;
            //         if (code === "00") {
            //             that.form = object;
            //             that.form.status = object.status + "";
            //             that.form.modifyor = sessionStorage.getItem("realName");
            //         }
            //     });
        },

        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.chooseTeacherlist = this.$refs.laoshi.chooseTeacher;
                    this.chooseStuList = this.$refs.xuesheng.chooseStu;
                    this.teacher_ids = [];
                    this.student_ids = [];

                    this.chooseTeacherlist.forEach(item => {
                        this.teacher_ids.push(item.id);
                    });
                    this.chooseStuList.forEach(item => {
                        this.student_ids.push(item.id);
                    });
                    if(this.teacher_ids.length==0){
                        return this.$message.error('请选择老师')
                    }
                    // 编辑
                    if (this.$route.query.id) {
                        this.form.create_time = null;
                        this.form.update_time = null;
                        if (this.form.status == "开放") {
                            this.form.status = 1;
                        } else if (this.form.status == "关闭") {
                            this.form.status = 2;
                        }
                        this.$utils
                            .post(
                                this.reqApi.shuiwuUrl + "/class/update",
                                qs.stringify({
                                    class: JSON.stringify(this.form),
                                    teacher_ids: JSON.stringify(
                                        this.teacher_ids
                                    ),
                                    student_ids: JSON.stringify(
                                        this.student_ids
                                    )
                                })
                            )
                            .then(res => {
                                if (res.data.code === "0000") {
                                    this.$message.success("修改成功！");
                                    this.$router.push({
                                        name: "findClasses"
                                    });
                                } else {
                                    this.$message.error(res.data.msg);
                                }
                            });
                    } else {
                        this.$utils
                            .post(
                                this.reqApi.shuiwuUrl + "/class/create",
                                qs.stringify({
                                    class: JSON.stringify(this.form),
                                    teacher_ids: JSON.stringify(
                                        this.teacher_ids
                                    ),
                                    student_ids: JSON.stringify(
                                        this.student_ids
                                    )
                                })
                            )
                            .then(res => {
                                if (res.data.code === "0000") {
                                    this.$message.success("新增成功！");
                                    this.$router.push({
                                        name: "findClasses"
                                    });
                                } else {
                                    this.$message.error(res.data.msg);
                                }
                            });
                    }
                } else {
                    return false;
                }
            });
        },

        // findClasses
        findClasses() {
            this.$router.push({ name: "findClasses" });
        }
    }
};
</script>

<style scoped>
/* 头部表格 */
table {
    border-color: #e4e9ec;
    border-collapse: collapse;
    border: 1px solid #e4e9ec;
    color: #777;
    margin: 20px 0 20px 0;
}
table tbody tr td {
    padding: 5px 15px;
}
table tbody tr td:nth-child(1) {
    /* background-color: #a8e7f0; */
    width: 200px;
}
table tbody tr td:nth-child(2) {
    width: 90%;
}

input {
    width: 300px;
}

.el-button.haha {
    border: 1px solid #31b5ff;
    color: #fff;
    background-color: #31b5ff;
    padding: 7px 7px;
    margin-left: 15px;
}
.redB {
    color: #ef6f6e;
    vertical-align: middle;
    padding: 0 5px 0 20px;
}
.tableBox {
    width: 700px;
    margin: 20px;
    text-align: center;
    /* border: 1px solid #eee; */
}
.wushi {
    display: inline-block;
}
.teacherlabel::before{
    content: '*';
    color: #F56C6C;
    margin-right: 4px;
    position: absolute;
    left: -73px;
    top: 14px;
}

</style>