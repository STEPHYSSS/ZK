<template>
    <div class="tableBox1">
        <el-dialog :title="dialogTitle" center :visible.sync="dialogVisible" width="800px">
            <!-- 老师 -->

            <div class="tbBox">
                <el-form size="mini">
                    <el-row>
                        <el-form-item label="姓名:">
                            <el-input class="inputWidth" clearable v-model="form.tname"></el-input>
                            <el-button class="search search-btn" @click="searchCX">搜索</el-button>
                        </el-form-item>
                    </el-row>
                </el-form>
               <!--  <div class="searchBox">
                    <span>姓名：</span>
                    <el-input class="inputWidth" clearable v-model="form.tname"></el-input>
                    <el-button class="search search-btn" @click="searchCX">搜索</el-button>
                </div> -->
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%;"
                    @select="chooseTeacherfunc"
                    @select-all="chooseTeacherAll"
                    max-height="500px"
                    v-if="teacher"
                >
                    <el-table-column type="selection" width="55" align="center"></el-table-column>
                    <el-table-column prop="username" label="用户名" align="center"></el-table-column>
                    <el-table-column prop="realname" label="姓名" align="center"></el-table-column>
                    <el-table-column prop="email" label="电子邮箱" align="center" width="150px"></el-table-column>
                    <el-table-column prop="phone" label="联系电话" align="center"></el-table-column>
                </el-table>
            </div>

            <span slot="footer" class="dialog-footer">
                <div class="btn00">
                    <el-button @click="sureTeach">确 定</el-button>
                    <el-button @click="dialogVisible = false">取 消</el-button>
                </div>
            </span>
        </el-dialog>
        <!-- 选择的老师列表 -->
        <div v-if="teachTable" class="tableBox">
            <el-table
                :data="chooseTeacher"
                style="width: 100%"
                border
                max-height="500px"
                :header-cell-style="{background:'#DBE0E5'}"
            >
                <el-table-column prop="username" label="用户名" align="center"></el-table-column>
                <el-table-column prop="realname" label="姓名" align="center"></el-table-column>
                <el-table-column prop="email" label="电子邮箱" align="center"></el-table-column>
                <el-table-column prop="phone" label="联系电话" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <!-- <el-tooltip class="item" effect="dark" content="删除" placement="bottom"> -->
                        <span
                            class="cur-point dis-inline-block"
                            @click="delTea(scope.$index,scope.row.id)"
                        >
                            <img src="@/assets/images/shanchu_icon.png" alt />
                        </span>
                        <!-- </el-tooltip> -->
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import qs from "qs";
export default {
    data() {
        return {
            tableData: [],
            dialogVisible: false,
            chooseTeacher: [],
            delTeacher: [],
            stuData: [],
            chooseStu: [],
            teachTable: false,
            stuTable: false,
            teacher: false,
            delteaList: [],
            form: {
                tname: "",
                pageSize: 999999
            }
            // student:false
        };
    },
    created() {},
    mounted() {},
    props: ["dialogTitle", "student"],
    methods: {
        searchCX() {
            this.getTeacherList();
        },
        sureTeach() {
            this.dialogVisible = false;
            if (this.teacher) {
                this.teachTable = true;
            }
            if (this.student) {
                this.stuTable = true;
            }
        },
        // 获取选择老师当前的行
        chooseTeacherfunc(selection, row) {
            if (row["flag"]) {
                row["flag"] = false;
            } else {
                row["flag"] = true;
            }
            if (row["flag"]) {
                this.chooseTeacher.forEach((item, index) => {
                    if (item.id == row.id) {
                        this.chooseTeacher.splice(index, 1);
                    }
                });
                this.chooseTeacher.push(row);
            } else {
                this.chooseTeacher.forEach((item, index) => {
                    if (item.id == row.id) {
                        this.chooseTeacher.splice(index, 1);
                    }
                });
            }
            // this.$emit('ChooseData', this.chooseTeacher)
        },
        //老师全选
        chooseTeacherAll(selection) {
            this.tableData.forEach((item, index) => {
                if (selection.length == 0) {
                    item["flag"] = false;
                } else {
                    item["flag"] = true;
                }
            });
            this.chooseTeacher = selection;
        },
        // 获取老师列表
        getTeacherList() {
            this.$utils
                .post(
                    this.reqApi.shuiwuUrl + "/teacher/list",
                    qs.stringify(this.form)
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.tableData = res.data.teachers.list;
                        if (this.$refs.multipleTable) {
                            this.tableData.forEach((item, index) => {
                                this.chooseTeacher.forEach((i, index2) => {
                                    if (item.id == i.id) {
                                        item.flag = true;
                                        this.$nextTick(() => {
                                            this.$refs.multipleTable.toggleRowSelection(
                                                this.tableData[index],
                                                true
                                            );
                                        });
                                    }
                                });
                            });
                        }
                        // 对比删除的数据跟
                    }
                });
        },
        delTea(index, id) {
            this.delteaList.push(id);
            this.chooseTeacher.splice(index, 1);
        },
        delStu(index, id) {
            this.delStuList.push(id);
            this.chooseStuList.splice(index, 1);
        }
    }
};
</script>
<style scoped>
.btn00 {
    text-align: center;
}
.tableBox1 {
    padding-bottom: 20px;
}
.tableBox {
    width: 700px;
    margin: 20px;
    text-align: center;
    /* border: 1px solid #eee; */
}
.tbBox {
    /* width: 540px; */
    box-sizing: border-box;
    padding: 20px;
}
.inputWidth {
    width: 200px;
    margin-right: 15px;
    
}
.inputWidth .el-input--suffix .el-input__inner {
    height: 28px;
}
.inline {
    display: inline-block;
}
.searchBox {
    margin: 10px 0;
}
</style>