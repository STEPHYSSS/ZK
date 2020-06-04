<template>
    <div class="tableBox1">
        <el-dialog :title="dialogTitle" center :visible.sync="dialogVisible" width="800px">
            <!-- 学生 -->
            <div class="tbBox">
                <el-form size="mini">
                    <el-row>
                        <el-form-item label="姓名:">
                             <el-input class="inputWidth" clearable v-model="form.stuname"></el-input>
                    <el-button class="search search-btn" @click="searchCX">搜索</el-button>
                        </el-form-item>
                    </el-row>
                </el-form>
                <!--  <div class="searchBox">
                    <span>姓名：</span>
                    <el-input class="inputWidth" clearable v-model="form.stuname"></el-input>
                    <el-button class="search search-btn" @click="searchCX">搜索</el-button>
                </div> -->
                <el-table
                    ref="multipleTable1"
                    :data="stuData"
                    tooltip-effect="dark"
                    style="width: 100%;"
                    @select="chooseTeacherfunc1"
                    @select-all="chooseTeacherAll1"
                    max-height="500px"
                    v-if="student"
                >
                    <el-table-column type="selection" width="55" align="center"></el-table-column>
                    <el-table-column prop="username" label="用户名" align="center"></el-table-column>
                    <el-table-column prop="realname" label="姓名" align="center"></el-table-column>
                    <el-table-column prop="email" label="电子邮箱" width="150px" :show-overflow-tooltip="true" align="center"></el-table-column>
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
        <!-- 选择的学生列表 -->
        <div v-if="stuTable" class="tableBox">
            <el-table
                :data="chooseStu"
                style="width: 100%"
                border
                max-height="500px"
                :header-cell-style="{background:'#DBE0E5'}"
            >
                <el-table-column prop="username" label="用户名" align="center"></el-table-column>
                <el-table-column prop="realname" label="姓名" align="center"></el-table-column>
                <el-table-column prop="email" label="电子邮箱" :show-overflow-tooltip="true"  align="center"></el-table-column>
                <el-table-column prop="phone" label="联系电话" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <!-- <el-tooltip class="item" effect="dark" content="删除" placement="bottom"> -->
                        <span
                            class="cur-point dis-inline-block"
                            @click="delStu(scope.$index,scope.row.id)"
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
            dialogVisible: false,
            chooseTeacher: [],
            delTeacher: [],
            stuData: [],
            chooseStu: [],
            teachTable: false,
            stuTable: false,
            teacher: false,
            delStuList: [],
            form: {
                stuname: "",
                withoutClass:1,
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
            this.stuList();
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
        // 获取学生列表
        stuList() {
            this.$utils
                .post(
                    this.reqApi.shuiwuUrl + "/student/listStudent",
                    qs.stringify(this.form)
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.stuData = res.data.students.list;
                        if (this.$refs.multipleTable1) {
                            this.stuData.forEach((item, index) => {
                                this.chooseStu.forEach((i, index2) => {
                                    if (item.id == i.id) {
                                        item.flag = true;
                                        this.$nextTick(() => {
                                            this.$refs.multipleTable1.toggleRowSelection(
                                                this.stuData[index],
                                                true
                                            );
                                        });
                                    }
                                });
                            });
                        }
                    }
                });
        },
        // 学生单选
        chooseTeacherfunc1(selection, row) {
            // this.selectGoodsList = row;
            if (row["flag"]) {
                row["flag"] = false;
            } else {
                row["flag"] = true;
            }
            if (row["flag"]) {
                this.chooseStu.forEach((item, index) => {
                    if (item.id == row.id) {
                        this.chooseStu.splice(index, 1);
                    }
                });
                this.chooseStu.push(row);
            } else {
                this.chooseStu.forEach((item, index) => {
                    if (item.id == row.id) {
                        this.chooseStu.splice(index, 1);
                    }
                });
            }
            // this.$emit("ChooseStuData", this.chooseStu);
        },
        //学生全选
        chooseTeacherAll1(selection) {
            this.stuData.forEach((item, index) => {
                if (selection.length == 0) {
                    item["flag"] = false;
                } else {
                    item["flag"] = true;
                }
            });
            this.chooseStu = selection;
        },
        delStu(index, id) {
            this.delStuList.push(id);
            this.chooseStu.splice(index, 1);
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
    /* width: 600px; */
    box-sizing: border-box;
    padding: 20px;
}
.searchBox {
    margin: 10px 0;
}
.inputWidth {
    width: 200px;
    margin-right: 15px;
}
.inline {
    display: inline-block;
}
</style>