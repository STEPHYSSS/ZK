<template>
    <el-card class="f-new box-card" id="setAnswer">
        <h3>实训关联表合并</h3>
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
                <div class="preservation">
                    <el-button @click="addScore">新增</el-button>
                </div>
                <el-table
                    :data="tableData"
                    style="width: 100%"
                    border
                    height="400"
                    max-height="400px"
                    highlight-current-row
                >
                    <el-table-column prop="mergeModule" label="关联模块" align="center"></el-table-column>
                    <el-table-column prop="mergeCount" label="关联数量" align="center"></el-table-column>
                    <el-table-column label="操作" align="center" fixed="right">
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="dark" content="查看" placement="bottom">
                                <span class="cur-point dis-inline-block" @click="detail(scope.row)">
                                    <img src="@/assets/images/chaxun_icon.png" alt />&nbsp;&nbsp;&nbsp;
                                </span>
                            </el-tooltip>
                            <el-tooltip
                                class="item"
                                effect="dark"
                                content="取消关联"
                                placement="bottom"
                            >
                                <span class="cur-point dis-inline-block" @click="cancel(scope.row)">
                                    <img src="@/assets/images/quexiaoguanlian_icon.png" alt />&nbsp;&nbsp;&nbsp;
                                </span>
                            </el-tooltip>
                            <!-- <el-tooltip class="item" effect="dark" content="删除" placement="bottom"> -->
                            <!-- <div class="dis"> -->
                            <!-- <img
                                src="@/assets/images/chaxun_icon.png"
                                class="codesty"
                                @click="del(scope.row.id,scope.$index)"
                            />-->
                            <!-- </div> -->
                            <!-- </el-tooltip> -->
                        </template>
                    </el-table-column>
                </el-table>
                <!-- <div>
                    <el-button @click="submit">合 并</el-button>
                    <el-button @click="showBox=false">取 消</el-button>
                </div>-->
                <el-table :data="sublist" style="width: 100%;margin-top:20px" v-if="subTable" max-height="200px" border>
                    <el-table-column prop="name" label="评分点" align="center"></el-table-column>
                    <el-table-column prop="remark" label="描述" align="center"></el-table-column>
                </el-table>
            </div>
        </div>
        <el-dialog title="提示" :visible.sync="dialogVisible1" width="300px">
            <div style="text-align:center;height:50px;">
                <span>确定取消关联？</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="sure">确 定</el-button>
                <el-button @click="dialogVisible1 = false">取 消</el-button>
            </span>
        </el-dialog>
        <!-- <div class="btnBox">
            <el-button @click="go">上一步</el-button>
            <el-button @click="toNext">完成</el-button>
        </div>-->
    </el-card>
</template>
<script>
import qs from "qs";
export default {
    data() {
        return {
            questionCode: sessionStorage.getItem("questionUUid"),
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
            pointId: "",
            id: "",
            scoreObj: {},
            showBox: false,
            scoreList: [],
            showBtn: false,
            pointItemSet: [],
            value: false,
            mainPointId: "",
            sublist: [],
            subTable: false
        };
    },
    created() {
        this.getList();
        this.getScoringPoint();
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
        detail(row) {
            this.subTable = true;
            this.sublist = row.mergePointList;
        },
        cancel(row) {
            this.mainPointId = row.mainPointId;
            this.dialogVisible1 = true;
        },
        addScore() {
            this.$router.push("/scoreConsolidation");
        },
        getStatus(value, row) {
            row.isShow = value ? "1" : "0";
        },
        getTree() {
            this.$utils
                .post(this.reqApi.xinls + "/exam/point/tree")
                .then(res => {
                    if (res.data.code === "0000") {
                        this.data = res.data.data;
                    } else {
                        return this.$message.error(res.data.msg);
                    }
                });
        },
        sure() {
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/point/merge/delete",
                    qs.stringify({
                        mainPointId: this.mainPointId
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.$message.success("删除成功！");

                        // this.tableData.forEach((item, index) => {
                        //     if (item.id === this.id) {
                        //         this.tableData.splice(index, 1);
                        //     }
                        // });
                        // this.getList()
                        this.dialogVisible1 = false;
                        this.getScoringPoint();
                        // this.showBox = false;
                    }
                });
        },
        del(id, index) {
            this.tableData.splice(index, 1);
            // this.id = id;
            //  this.tableData.forEach((item, index) => {
            //                 if (item.id === this.id) {
            //                     this.tableData.splice(index, 1);
            //                 }
            //             });

            // this.dialogVisible1 = true;
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
        checkFormData(e, item) {
            if (e) {
                // item.score = null;
                // item.answerType = null;
                // item.answer = null;
            }
        },
        questionPut(id) {
            this.showBox = true;
            this.dialogVisible = true;
            this.pointId = id;
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/point/detail",
                    qs.stringify({
                        pointId: this.pointId
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
        getScoringPoint() {
            this.$utils
                .post(this.reqApi.xinls + "/exam/point/merge/list")
                .then(res => {
                    if (res.data.code === "0000") {
                        this.tableData = res.data.data;
                    } else {
                        return this.$message.error(res.data.msg);
                    }
                });
        },
        // 获取列表
        getList() {
            // this.reqApi.xinls + "/exam/point/originTree"// 新接口地址
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/point/newTree",
                    qs.stringify({
                        // questionCode: this.questionCode
                        // token: "476a83ac00f740d750243d546b01a40a"
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.data = res.data.data.tree;
                        // this.tableData = res.data.data.pointList;
                    }
                });
        },
        toNext() {
            this.$router.push({
                name: "practicalTraining"
            });
            sessionStorage.removeItem("activeName");
            sessionStorage.removeItem("questionUUid");
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
            // this.questionPut()
            // if (this.code && this.code !== data.pid) {
            //     this.$message("请选择相同类目下的子项进行合并");
            //     return;
            // }
            return;
            // this.code = data.pid;
            if (data.level != 1) {
                let flag = true;
                if (this.tableData) {
                    for (const i of this.tableData) {
                        // 判断重复添加
                        if (i.id === data.code) {
                            flag = false;
                        }
                    }
                }

                if (flag && data.level == 4) {
                    let scoreObj = {
                        name: data.label,
                        id: data.code,
                        remark: data.remark,
                        pid: data.pid
                    };
                    if (this.tableData.length == 0) {
                        this.tableData.push(scoreObj);
                    } else if (this.tableData.length > 0) {
                        let but = true;
                        this.tableData.forEach(item => {
                            if (item.pid == data.pid) {
                                if (item.id == data.code) {
                                    but = false;
                                }
                            } else {
                                return this.$message(
                                    "请选择相同类目下的子项进行合并"
                                );
                            }
                        });
                        if (but) {
                            this.tableData.push(scoreObj);
                        }

                        // let flag = true;
                        // this.tableData.forEach(item => {
                        //     if (item.id == data.code) {
                        //         flag = false;
                        //     }
                        // });
                        // if (flag) {
                        //     this.tableData.push(scoreObj);
                        // }
                    }

                    // this.tableData.forEach(item=>{
                    //   if(item.pid==data.pid)
                    // })
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
    /* width: 1000px; */
    position: relative;
    /* text-align: center; */
    display: flex;
    flex-direction: column;
    width: 1025px;
    padding-left: 15px;
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
.rightBoxChild {
    width: 1000px;
    /* height: 80px; */
    flex: 0.3;
    padding-left: 20px;
}
#setAnswer .el-table td,
.el-table th {
    padding: 0 !important;
}
.preservation {
    text-align: right;
    padding: 15px 20px 0 0;
}
.scoreTableBox {
    box-sizing: border-box;
    max-height: 730px;
    overflow: scroll;
    margin-top: 15px;
}
.preservation {
    text-align: right;
    padding: 15px 20px 15px 0;
}
</style>
