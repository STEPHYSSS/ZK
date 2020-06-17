<template>
    <el-card class="f-new box-card" id="setAnswer">
        <h3>设置答案</h3>
        <div class="fatherbox">
            <div class="leftBox">
                <el-tree
                    :data="data"
                    :props="defaultProps"
                    :expand-on-click-node="false"
                    default-expand-all
                    :highlight-current="true"
                    @node-click="handleNodeClick"
                ></el-tree>
            </div>
            <div class="rightBox">
                <el-table
                    :data="tableData"
                    style="width: 100%"
                    border
                    max-height="250px"
                    highlight-current-row
                >
                    <el-table-column prop="name" label="评分点" width="180" align="center"></el-table-column>
                    <el-table-column prop="sumScore" label="权值" width="180" align="center"></el-table-column>
                    <el-table-column prop="remark" label="描述" align="center"></el-table-column>
                    <el-table-column label="操作" align="center" fixed="right">
                        <template slot-scope="scope">
                            <!-- <el-tooltip class="item" effect="dark" content="编辑" placement="bottom"> -->
                            <span
                                class="cur-point dis-inline-block"
                                @click="questionPut(scope.row)"
                            >
                                <img src="@/assets/images/xiugai_icon.png" alt />&nbsp;&nbsp;&nbsp;
                            </span>
                            <!-- </el-tooltip> -->
                            <!-- <el-tooltip class="item" effect="dark" content="删除" placement="bottom"> -->
                            <!-- <div class="dis"> -->
                            <img
                                src="@/assets/images/shanchu_icon.png"
                                class="codesty"
                                @click="del(scope.row)"
                            />
                            <!-- </div> -->
                            <!-- </el-tooltip> -->
                        </template>
                    </el-table-column>
                </el-table>
                <div class="formBox" v-if="showBox">
                    <div class="titleBox">
                        <span class="scoreTitle">评分设置</span>
                        <span>
                            当前权值是：
                            <span style="color:red">{{totalScore}}</span>，勾选复选框表示添加对应评分点
                        </span>
                    </div>
                    <el-form label-width="100px" class="formBoxchild">
                        <el-row>
                            <!-- <el-col :span="8"> -->
                            <div v-for="(item,index) in form" :key="index">
                                <div class="inline">
                                    <el-checkbox-group
                                        class="inline"
                                        v-model="item.checkForm"
                                        @change="checkFormData($event,item)"
                                    >
                                        <el-checkbox>
                                            <el-tooltip
                                                class="item"
                                                effect="dark"
                                                :content="item.remark"
                                                placement="top"
                                            >
                                                <span class="overFlow">
                                                    <span>{{item.remark}}</span>
                                                </span>
                                            </el-tooltip>
                                        </el-checkbox>
                                    </el-checkbox-group>
                                    <!-- {{item.dropDown}} -->
                                    <!-- <div class="inline" v-if="item.foreignKey!=0">
                                        <i
                                            v-if="!item.dropDown"
                                            class="el-icon-arrow-down el-icon--right cursor"
                                            @click="showDropDown(item,index)"
                                        ></i>
                                        <i
                                            v-if="item.dropDown"
                                            class="el-icon-arrow-up el-icon--right cursor"
                                            @click="showDropDown(item,index)"
                                        ></i>
                                    </div>-->
                                </div>
                                <el-select
                                    v-model="item.answer"
                                    placeholder="请选择"
                                    class="inputWidth1"
                                    :disabled="!item.checkForm"
                                    style="line-height:35px"
                                    v-if="item.isSelected==1"
                                    @change="getValue(item,item.answer,index)"
                                >
                                    <el-option
                                        v-for="i in item.selectedArray"
                                        :key="i.value"
                                        :label="i.name"
                                        :value="i.value"
                                    ></el-option>
                                </el-select>
                                <!--可下拉可输入的数据 -->
                                <el-select
                                    v-model="item.answer"
                                    v-if="item.foreignKey!=0"
                                    :disabled="!item.checkForm"
                                    filterable
                                    class="inputWidth1"
                                    allow-create
                                    default-first-option
                                    @blur="selectBlur"
                                    placeholder="请输入/选择"
                                >
                                    <el-option
                                        v-for="i in item.accountData"
                                        :key="i"
                                        :label="i"
                                        :value="i"
                                    ></el-option>
                                </el-select>

                                <el-input
                                    v-if="item.isSelected!=1&&item.foreignKey==0&&item.fieldType!='Date'"
                                    class="inputWidth"
                                    maxlength="50"
                                    :disabled="!item.checkForm"
                                    v-model="item.answer"
                                ></el-input>
                                <!-- 日期picker -->
                                <el-date-picker
                                @change="getTime(item,index)"
                                    class="inputWidth1"
                                    v-model="item.answer"
                                    :disabled="!item.checkForm"
                                    type="date"
                                    placeholder="选择日期"
                                    v-if="item.fieldType=='Date'"
                                ></el-date-picker>
                                <!-- 中间占位符 -->
                                <!-- <div v-if="item.foreignKey!=0" class="inline inputWidth2"> -->
                                <!-- <select v-model="selectValue">
                                        <option></option>
                                    </select>
                                <input type="text" class :value="inputValue" />-->
                                <!-- </div> -->
                                <el-form-item class="inline" label="分值">
                                    <el-input
                                        class="inputWidth"
                                        type="text"
                                        maxlength="5"
                                        :disabled="!item.checkForm"
                                        v-model="item.score"
                                    ></el-input>
                                </el-form-item>
                                <!-- <div class="foreignSetBox" v-if="item.dropDown">
                                    <div
                                        v-for="(i,j) in item.foreignSet"
                                        :key="j+'1'"
                                        class="inline"
                                    >
                                        <el-form-item :label="i.remark">
                                            <el-input
                                                class="inputWidth"
                                                maxlength="50"
                                                v-model="i.answer"
                                            ></el-input>
                                        </el-form-item>
                                    </div>
                                </div>-->
                            </div>
                        </el-row>
                    </el-form>

                    <div class="btnboxStyle">
                        <el-button @click="submit" :disabled="submitBtn">确 定</el-button>
                        <el-button @click="showBox=false">取 消</el-button>
                    </div>
                </div>
            </div>
            <!-- <el-dialog title="提示" :visible.sync="dialogVisible" width="800px" center> -->
            <!-- <div class="formBox">
                    <div class="titleBox">
                        <span class="scoreTitle">评分设置</span>
                        <span>
                            当前权值是：
                            <span style="color:red">{{totalScore}}</span>，勾选复选框表示添加对应评分点
                        </span>
                    </div>
                    <el-form label-width="100px" max-height="700px">
                        <el-row>
                            <div v-for="(item,index) in form" :key="index">
                                <el-checkbox-group
                                    class="inline"
                                    v-model="item.checkForm"
                                    @change="checkFormData($event,item)"
                                >
                                    <el-checkbox>
                                        <el-tooltip
                                            class="item"
                                            effect="dark"
                                            :content="item.remark"
                                            placement="top"
                                        >
                                            <span class="overFlow">
                                                <span>{{item.remark}}</span>
                                            </span>
                                        </el-tooltip>
                                    </el-checkbox>
                                    <el-input
                                        class="inputWidth"
                                        :disabled="!item.checkForm"
                                        v-model="item.answer"
                                    ></el-input>
                                </el-checkbox-group>
                                <el-form-item class="inline" label="分值">
                                    <el-input
                                        class="inputWidth"
                                        :disabled="!item.checkForm"
                                        v-model="item.score"
                                    ></el-input>
                                </el-form-item>
                            </div>
                        </el-row>
                    </el-form>
            </div>-->
            <!-- <span slot="footer" class="dialog-footer">
                    <el-button @click="submit">确 定</el-button>
                    <el-button @click="dialogVisible = false">取 消</el-button>
            </span>-->
            <!-- </el-dialog> -->
        </div>
        <el-dialog title="提示" :visible.sync="showforeignSet" width="400px">
            <div class="foreignSetBox">
                <div v-for="(item,index) in foreignSet" :key="index" style="height: 45px;">
                    <span class="overFlow">
                        <span>{{item.remark}}</span>
                    </span>
                    <el-input class="inputWidth" maxlength="50" v-model="item.answer"></el-input>
                </div>
                <div style="text-align:center">
                    <el-button @click="getForeignSet">确 定</el-button>
                    <el-button @click="showforeignSet = false">取 消</el-button>
                </div>
            </div>
        </el-dialog>
        <el-dialog title="提示" :visible.sync="dialogVisible1" width="300px">
            <div style="text-align:center;height:50px;">
                <span>确定删除？</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="sure">确 定</el-button>
                <el-button @click="dialogVisible1 = false">取 消</el-button>
            </span>
        </el-dialog>
        <div class="btnBox">
            <!-- <el-button>保存</el-button> -->
            <el-button @click="go">上一步</el-button>
            <el-button @click="toNext">完成</el-button>
        </div>
    </el-card>
</template>
<script>
import qs from "qs";
export default {
    data() {
        return {
            questionCode: sessionStorage.getItem("tihaoUUID"),
            data: [],
            dialogVisible: false,
            dialogVisible1: false,
            defaultProps: {
                children: "children",
                label: "label"
            },
            tableData: [],
            form: [],
            form1: [],
            scoreId: "",
            id: "",
            scoreObj: {},
            showBox: false,
            questionPointCode: "",
            showforeignSet: false,
            selectValue: "",
            foreignSet: [],
            index: "",
            gradeSet: [],
            submitBtn: false,
            dropDownBox: false
        };
    },
    created() {
        this.getTree();
        this.getList();
    },
    computed: {
        /* inputValue() {
            let value;
            this.options.forEach(function(item, index) {
                if (item.value == this.selectValue) {
                    value = item.label;
                }
            });
            return value;
        }, */
        totalScore() {
            // let totalScore = "";
            // this.form.forEach(item=>{

            //     return totalScore +=item.score
            // })
            let totalScore = 0;
            for (const i of this.form) {
                totalScore += Number(i.score);
            }
            return totalScore;
        }
    },
    methods: {
        getTime(data,index){
            data.answer=this.$moment(data.answer).format('YYYY-MM-DD')
        },
        selectBlur(e) {
            // console.log(e);
        },
        showDropDown(data, index) {
            data.dropDown = !data.dropDown;
            this.$set(this.form, index, data);

            // this.$nextTick(() => {
            //     //  this.$set(this.form[index],'dropDown',true)

            // });

            // this.dropDownBox = true;
        },
        // 获取用户输入的数据
        getForeignSet() {
            this.showforeignSet = false;
        },
        // 下拉选
        getValue(item, value, index) {
            this.$set(this.form[index], "answer", value);
        },
        // 外键按钮
        foreignSetData(item, index) {
            this.index = index;
            this.showforeignSet = true;
            // 临时存放set数组
            this.foreignSet = item.foreignSet;
        },
        sure() {
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/point/grade/delete",
                    qs.stringify({
                        questionPointCode: this.id
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.$message.success("删除成功！");
                        this.getList();
                        this.dialogVisible1 = false;
                        this.showBox = false;
                    } else {
                        return this.$message.error(res.data.msg);
                    }
                });
        },
        del(row) {
            this.id = row.questionPointCode;

            this.dialogVisible1 = true;
        },
        submit() {
            this.submitBtn = true;
            setInterval(() => {
                this.submitBtn = false;
            }, 2000);
            this.form1 = [];
            for (const i of this.form) {
                if (i.checkForm) {
                    if (!i.score) {
                        return this.$message.error("请填写分值");
                    }
                    this.form1.push(i);
                }
            }
            this.form1 = this.form1.map(item => {
                return {
                    pointItemId: item.id,
                    answer: item.answer,
                    score: item.score
                };
            });
            // if(sessionStorage.getItem('locked')){
            //     if(sessionStorage.getItem('locked')==1){
            //         return this.$message.error('改题目已锁定,无法更改')
            //     }
            // }
            // return;
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/point/grade/update",
                    qs.stringify({
                        // pointId: this.scoreId,
                        questionPointCode: this.questionPointCode,
                        gradeSet: JSON.stringify(this.form1)
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.$message.success("修改成功！");
                        this.showBox = false;
                        this.getList();
                        // this.dialogVisible = false;
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });
            return; // 以下是旧思路的实现方式暂时废弃
            this.gradeSet = [];
            for (let i = 0; i < this.form.length; i++) {
                if (this.form[i].checkForm) {
                    if (this.form[i].foreignKey != 0) {
                        let newArr = [];
                        //判断一条都没有写的状态
                        let num = 0;
                        this.form[i].foreignSet.forEach(item => {
                            if (!item.answer) {
                                num++;
                            } else {
                                newArr.push(item);
                            }
                        });
                        if (num == this.form[i].foreignSet.length) {
                            return this.$message.error("请设置外键答案");
                        }
                        this.form[i].foreignSet = newArr;
                        if (!this.form[i].score) {
                            return this.$message.error("请填写分值");
                        }
                    } else {
                        if (!this.form[i].answer)
                            return this.$message.error("请设置答案");
                        if (!this.form[i].score)
                            return this.$message.error("请填写分值");
                    }

                    this.gradeSet.push(this.form[i]);
                }
            }
            this.gradeSet = this.gradeSet.map(item => {
                return {
                    gradeCode: item.gradeCode,
                    pointItemId: item.id,
                    answer: item.answer,
                    score: item.score,
                    foreignSet: item.foreignSet ? item.foreignSet : null
                };
            });
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/point/grade/update",
                    qs.stringify({
                        gradeSet: JSON.stringify(this.gradeSet),
                        questionPointCode: this.questionPointCode
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.$message.success("提交成功");
                        this.index = "";
                        this.showBox = false;
                        this.getList();
                    } else {
                        return this.$message.error(res.data.msg);
                    }
                });
        },
        checkFormData(e, item) {
            if (e) {
                // item.score = null;
                // item.answerType = null;
                // item.answer = null;
            }
        },
        // 点击操作按钮调取详情
        getDetail() {
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/point/grade/detail",
                    qs.stringify({
                        questionPointCode: this.questionPointCode
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        for (const i of res.data.data) {
                            this.$set(i, "checkForm", false);
                        }
                        this.form = res.data.data;
                        this.form.forEach(item => {
                            if (item.isSelected == 1) {
                                item.selectedArray = JSON.parse(
                                    item.selectedArray
                                );
                            }
                            if (item.score) {
                                item.checkForm = true;
                            }
                            if (item.foreignKey != 0) {
                                item.dropDown = false;
                            }
                        });
                    } else {
                        return this.$message.error(res.data.msg);
                    }
                });
        },
        questionPut(row) {
            this.questionPointCode = row.questionPointCode;
            this.showBox = true;
            this.dialogVisible = true;
            this.getDetail();
        },
        getList() {
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/point/grade/all",
                    qs.stringify({
                        questionCode: sessionStorage.getItem("tihaoUUID")
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.tableData = res.data.data;
                    } else {
                        return this.$message.error(res.data.msg);
                    }
                });
        },
        // 获取树
        getTree() {
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/point/newTree",
                    qs.stringify({
                        // questionCode: this.questionCode
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.data = res.data.data.tree;
                        // this.tableData = res.data.data.pointList;
                    } else {
                        return this.$message.error(res.data.msg);
                    }
                });
        },
        toNext() {
            this.$router.push({
                name: "practicalTraining"
            });
            sessionStorage.removeItem("activeName");
            sessionStorage.removeItem("tihaoUUID");
            sessionStorage.removeItem("questionUUid");
        },
        go() {
            this.$router.push({
                name: "accountSetList",
                query: {
                    qid: this.$route.query.qid,
                    flag1: this.$route.query.flag1,
                    locked: this.$route.query.locked
                }
            });
            // return;
            // if (sessionStorage.getItem("activeName")) {
            //     sessionStorage.removeItem("activeName");
            // }
            // this.$router.push({
            //     name: "categoryPages"
            // });
        },
        handleNodeClick(data) {
            if (data.level == 4) {
                this.$utils
                    .post(
                        this.reqApi.xinls + "/exam/point/grade/add",
                        qs.stringify({
                            questionCode: sessionStorage.getItem("tihaoUUID"),
                            pointId: data.code
                        })
                    )
                    .then(res => {
                        if (res.data.code === "0000") {
                            if (data.level != 1) {
                                let flag = true;
                                for (const i of this.tableData) {
                                    if (i.id === data.code) {
                                        flag = false;
                                    }
                                }
                                if (data.level == 4) {
                                    let scoreObj = {
                                        name: data.label,
                                        id: data.code,
                                        remark: data.remark,
                                        questionPointCode: res.data.data
                                    };
                                    this.tableData.push(scoreObj);
                                }
                            }
                        } else {
                            return this.$message.error(res.data.msg);
                        }
                    });
            }
        }
    }
};
</script>
<style scoped>
.fatherbox {
    display: flex;
    margin: 0 20px;
}
.leftBox {
    width: 268px;
    height: 628px;
    border: 1px solid #eee;
    overflow: scroll;
    /* background-color: yellow; */
}
.rightBox {
    /* flex: 1; */
    /* background-color: pink; */
    margin-left: 10px;
    border: 1px solid #eee;
    width: 1000px;
    position: relative;
    /* text-align: center; */
}
.btnBox {
    margin: 0 20px;
    position: absolute;
    top: 32px;
    right: 20px;
}
.formItem {
    display: inline-block;
}
.inline {
    display: inline-block;
}
.inputWidth {
    width: 200px;
}
.overFlow {
    /* width: 150px; */
    width: 70px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: inline-block;
    vertical-align: bottom;
}
.formBox {
    /* box-sizing: border-box; */
    /* padding: 0px 35px; */
    /* max-height: 500px; */
    overflow: auto;
    padding-left: 35px;
}
.scoreTitle {
    font-size: 16px;
    font-weight: 600;
    margin-right: 10px;
}
.titleBox {
    margin: 10px 0;
}
.btnboxStyle {
    position: absolute;
    bottom: 0;
    width: 100%;
    left: 39%;
    /* text-align: center; */
}
.formBoxchild {
    overflow: scroll;
    max-height: 500px;
    padding-bottom: 25px;
    box-sizing: border-box;
}
.inputWidth1 {
    width: 200px;
}
.inputWidth1 .el-input--suffix .el-input__inner/deep/ {
    height: 35px !important;
}
.foreignSetBox {
    /* padding: 0 20px;
    max-height: 500px; */
    /* padding-bottom: 30px; */
    /* width: 100%;
    height: 40px;
    background-color: pink; */
    overflow: scroll;
    /* padding-bottom: 30px; */
    width: 700px;
    border: 1px solid #eee;
    border-radius: 12px;
    box-sizing: border-box;
    padding-top: 10px;
}
.inputWidth2 {
    width: 177px;
}
.cursor {
    cursor: pointer;
}
</style>
