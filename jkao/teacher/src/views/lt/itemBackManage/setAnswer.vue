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
                <el-table :data="tableData" style="width: 100%" border max-height="250px" highlight-current-row>
                    <el-table-column prop="name" label="评分点" width="180" align="center"></el-table-column>
                    <el-table-column prop="sumScore" label="权值" width="180" align="center"></el-table-column>
                    <el-table-column prop="remark" label="描述" align="center"></el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <!-- <el-tooltip class="item" effect="dark" content="编辑" placement="bottom"> -->
                            <span
                                class="cur-point dis-inline-block"
                                @click="questionPut(scope.row.id)"
                            >
                                <img src="@/assets/images/xiugai_icon.png" alt />&nbsp;&nbsp;&nbsp;
                            </span>
                            <!-- </el-tooltip> -->
                            <!-- <el-tooltip class="item" effect="dark" content="删除" placement="bottom"> -->
                            <!-- <div class="dis"> -->
                            <img
                                src="@/assets/images/shanchu_icon.png"
                                class="codesty"
                                @click="del(scope.row.id)"
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
                            <div v-for="(item,index) in form" :key="index" style="height: 45px;">
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
                            <!-- </el-col> -->
                            <!-- <el-col :span="8">
                            <div></div>
                        </el-col>
                        <el-col :span="8">
                            <div></div>
                            </el-col>-->
                        </el-row>
                    </el-form>
                    <div class="btnboxStyle">
                        <el-button @click="submit">确 定</el-button>
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
            questionCode: sessionStorage.getItem("titleNumber"),
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
            showBox:false
        };
    },
    created() {
        this.getList();
    },
    computed: {
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
        sure() {
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/point/grade/delete",
                    qs.stringify({
                        questionCode: sessionStorage.getItem("titleNumber"),
                        pointId: this.id
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.$message.success("删除成功！");
                        
                        this.tableData.forEach((item, index) => {
                            if (item.id === this.id) {
                                this.tableData.splice(index, 1);
                            }
                        });
                        // this.getList()
                        this.dialogVisible1 = false;
                        this.showBox=false
                    }
                });
        },
        del(id) {
            this.id = id;
            
            this.dialogVisible1 = true;
        },
        // del(id){
        //     this.$utils.post(this.reqApi.xinls+'/exam/point/grade/delete',qs.stringify({
        //         questionCode:this.questionCode,
        //         pointId:id
        //     })).then(res=>{
        //         if(res.data.code==='0000'){

        //         }
        //     })
        // },
        submit() {
            this.form1 = [];
            for (const i of this.form) {
                if (i.checkForm) {
                    this.form1.push(i);
                }
            }
            if(sessionStorage.getItem('locked')){
                if(sessionStorage.getItem('locked')==1){
                    return this.$message.error('改题目已锁定,无法更改')
                }
            }
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/point/grade/add",
                    qs.stringify({
                        pointId: this.scoreId,
                        questionCode: this.questionCode,
                        gradeSet: JSON.stringify(this.form1)
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.$message.success("修改成功！");
                        this.questionPut()
                        // this.getList();
                        // this.dialogVisible = false;
                    } else {
                        this.$message.error(res.data.msg);
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
        questionPut(id) {
            this.showBox=true
            this.dialogVisible = true;
            this.scoreId = id;
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/point/detail",
                    qs.stringify({
                        questionCode: this.questionCode,
                        pointId: this.scoreId
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        for (const i of res.data.data) {
                            this.$set(i, "checkForm", false);
                        }
                        this.form = res.data.data;
                    }
                });
        },
        // 获取列表
        getList() {
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/point/all",
                    qs.stringify({
                        questionCode: this.questionCode
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.data = res.data.data.tree;
                        this.tableData = res.data.data.pointList;
                    }
                });
        },
        toNext() {
            this.$router.push({
                name: "practicalTraining"
            });
            sessionStorage.removeItem("activeName");
            sessionStorage.removeItem("questionUUid");
            sessionStorage.removeItem("titleNumber");
        },
        go() {
            this.$router.push({
                name: "accountSetList",
                query: {
                    qid: this.$route.query.qid,
                    flag1: this.$route.query.flag1
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
            if (data.level != 1) {
                let flag = true;
                for (const i of this.tableData) {
                    if (i.id === data.code) {
                        flag = false;
                    }
                }
                if (flag&&data.level == 4) {
                    let scoreObj = {
                        name: data.label,
                        id: data.code,
                        remark: data.remark
                    };
                    this.tableData.push(scoreObj);
                }
            }

            //  for (const i of this.tableData){
            //     if(i.id!=data.code){
            //         scoreArray.push(data)
            //         // this.tableData=this.tableData.concat(scoreArray)
            //     }
            // }
            // this.tableData=this.tableData.concat(scoreArray)
            // console.log(this.tableData)
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
    width: 150px;
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
.btnboxStyle{
    position: absolute;
    bottom: 0;
    width: 100%;
    left: 39%;
    /* text-align: center; */
}
.formBoxchild{
    overflow: scroll;
    max-height: 500px;
    padding-bottom: 25px;
    box-sizing: border-box;
}
</style>