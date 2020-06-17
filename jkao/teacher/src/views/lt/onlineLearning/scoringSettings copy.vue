<template>
    <el-card class="f-new box-card" id="setAnswer">
        <h3>实训评分项设置</h3>
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
                <div class="preservation" v-if="showBtn">
                    <el-button @click="submit">保存</el-button>
                </div>
                <div class="scoreTableBox">
                    <div class="rightBoxChild" v-for="(item,index) in scoreList" :key="index+'1'">
                        <h3>{{item.name}}</h3>
                        <el-table
                            :data="item.pointItem"
                            style="width: 100%;margin-top:20px"
                            border
                            max-height="250px"
                            highlight-current-row
                        >
                            <el-table-column type="index" width="50" label="序号"></el-table-column>
                            <el-table-column
                                prop="remarkBackup"
                                label="数据库字段"
                                width="180"
                                align="center"
                            ></el-table-column>
                            <el-table-column label="前端名称" align="center">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.remark"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="remark" label="是否显示" align="center">
                                <template slot-scope="scope">
                                    {{scope.row.isShow}}
                                    <el-switch
                                        v-model="scope.row.status"
                                        active-color="#13ce66"
                                        inactive-color="#c2c2c2"
                                        @change="getStatus(scope.row.status,scope.row)"
                                    ></el-switch>
                                </template>
                            </el-table-column>

                            <!-- <el-table-column label="操作" align="center">
                            <template slot-scope="scope">
                                <span
                                    class="cur-point dis-inline-block"
                                    @click="questionPut(scope.row.id)"
                                >
                                    <img src="@/assets/images/xiugai_icon.png" alt />&nbsp;&nbsp;&nbsp;
                                </span>
                                <img
                                    src="@/assets/images/shanchu_icon.png"
                                    class="codesty"
                                    @click="del(scope.row.id)"
                                />
                            </template>
                            </el-table-column>-->
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
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
            value: false
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
                    this.reqApi.xinls + "/exam/point/grade/delete",
                    qs.stringify({
                        questionCode: sessionStorage.getItem("questionUUid"),
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
                        this.showBox = false;
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
            this.scoreList.forEach(item => {
                this.pointItemSet = this.pointItemSet.concat(item.pointItem);
            });
           this.pointItemSet= this.pointItemSet.map(item=>{
                return{
                    id:item.id,
                    remark:item.remark,
                    isShow:item.isShow
                }
            })
            console.log(this.pointItemSet,'this.pointItemSet')
            // 评分点修改
            // return;
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/point/item/update",
                    qs.stringify({
                        pointId: this.pointId,
                        pointItemSet: JSON.stringify(this.pointItemSet)
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.$message.success("提交成功！");
                        this.subDetail();
                    }else {
                        return this.$message.error(res.data.msg)
                    }
                });
            return;
            // this.form1 = [];
            // for (const i of this.form) {
            //     if (i.checkForm) {
            //         this.form1.push(i);
            //     }
            // }
            
        },
        checkFormData(e, item) {
            if (e) {
                // item.score = null;
                // item.answerType = null;
                // item.answer = null;
            }
        },
        subDetail(id) {
            // this.showBox = true;
            // this.dialogVisible = true;
            // this.pointId = id;
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/point/detail",
                    qs.stringify({
                        pointId: this.pointId
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        /*  for (const i of res.data.data) {
                            this.$set(i, "checkForm", false);
                        } */
                        this.scoreList = res.data.data;
                        if(this.scoreList.length>0){
                            this.showBtn = true;
                             this.scoreList.forEach((item, index) => {
                            item.pointItem.forEach((i, j) => {
                                if (i.isShow == "1") {
                                    this.$set(i, "status", true);
                                } else if (i.isShow == "0") {
                                    this.$set(i, "status", false);
                                }
                            });
                        });
                        }
                       
                        console.log(this.scoreList, "this.scoreList");
                    }
                });
        },
        // 获取列表
        getList() {
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/point/originTree",
                    qs.stringify({
                        questionCode: this.questionCode
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
            console.log(data, "data");
            this.pointId=data.code
            this.subDetail(data.code);
            /*   this.scoreList = [
                {
                    point: {
                        id: "1",
                        name: "评分点名称1",
                        nameBackup: "评分点名称备份"
                    },
                    pointItem: [
                        {
                            id: "1",
                            remark: "zi评分项名称1",
                            isShow: "1",
                            remarkBackup: "评分项名称的备份"
                        },
                        {
                            id: "6",
                            remark: "zi评分项名称2",
                            isShow: "0",
                            remarkBackup: "评分项名称的备份"
                        }
                    ]
                },
                {
                    point: {
                        id: "2",
                        name: "商品",
                        nameBackup: "评分点名称备份"
                    },
                    pointItem: [
                        {
                            id: "2",
                            remark: "zi评分项名称2",
                            isShow: "1",
                            remarkBackup: "评分项名称的备份"
                        },
                        {
                            id: "7",
                            remark: "zi评分项名称2",
                            isShow: "0",
                            remarkBackup: "评分项名称的备份"
                        }
                    ]
                },
                {
                    point: {
                        id: "3",
                        name: "评分点名称3",
                        nameBackup: "评分点名称备份"
                    },
                    pointItem: [
                        {
                            id: "3",
                            remark: "zi评分项名称3",
                            isShow: "1",
                            remarkBackup: "评分项名称的备份"
                        },
                        {
                            id: "4",
                            remark: "zi评分项名称2",
                            isShow: "0",
                            remarkBackup: "评分项名称的备份"
                        }
                    ]
                },
                {
                    point: {
                        id: "4",
                        name: "评分点名称4",
                        nameBackup: "评分点名称备份"
                    },
                    pointItem: [
                        {
                            id: "4",
                            remark: "zi评分项名称4",
                            isShow: "1",
                            remarkBackup: "评分项名称的备份"
                        },
                        {
                            id: "8",
                            remark: "zi评分项名称2",
                            isShow: "0",
                            remarkBackup: "评分项名称的备份"
                        },
                         {
                            id: "8",
                            remark: "zi评分项名称2",
                            isShow: "1",
                            remarkBackup: "评分项名称的备份"
                        },
                         {
                            id: "8",
                            remark: "zi评分项名称2",
                            isShow: "0",
                            remarkBackup: "评分项名称的备份"
                        },
                         {
                            id: "8",
                            remark: "zi评分项名称2",
                            isShow: "1",
                            remarkBackup: "评分项名称的备份"
                        }, {
                            id: "8",
                            remark: "zi评分项名称2",
                            isShow: "0",
                            remarkBackup: "评分项名称的备份"
                        },
                         {
                            id: "8",
                            remark: "zi评分项名称2",
                            isShow: "1",
                            remarkBackup: "评分项名称的备份"
                        }
                    ]
                }
            ]; */
            /*   if (this.scoreList.length > 0) {
                this.showBtn = true;
            } else {
                this.$message("暂无数据");
            } */
            /*  this.add=true
            this.scoreList.forEach((item, index) => {
                item.pointItem.forEach((i, j) => {
                    if (i.isShow == "1") {
                        this.$set(i, 'status', true)
                    } else if (i.isShow == "0") {
                        this.$set(i, 'status', false)
                    }
                });
            });
            this.pointId = data.code;
            this.questionPut() */
            return;
            if (data.level != 1) {
                let flag = true;
                for (const i of this.tableData) {
                    if (i.id === data.code) {
                        flag = false;
                    }
                }
                if (flag && data.level == 4) {
                    let scoreObj = {
                        name: data.label,
                        id: data.code,
                        remark: data.remark
                    };
                    // this.tableData.push(scoreObj);
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
</style>