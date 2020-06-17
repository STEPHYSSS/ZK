<template>
    <el-card class="f-new box-card" >
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
                >
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span class="nodeContent">{{ node.label }}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                        <span>
                            <span>
                                <img
                                    v-if="node.level==4"
                                    class="iconStyle"
                                    src="@/assets/images/amendTeacher_Red.png"
                                    alt="修改"
                                    @click.stop="updateNode(data)"
                                />
                            </span>
                        </span>
                    </span>
                </el-tree>
                <!-- 修改 -->
                <el-dialog title="提示" :visible.sync="update" width="400px">
                    <el-form
                        :model="updateData"
                        :rules="rules"
                        ref="ruleForm"
                        label-width="100px"
                        class="demo-ruleForm"
                    >
                        <el-form-item label="名称" prop="name">
                            <el-input
                                maxlength="100"
                                style="width:200px"
                                v-model="updateData.name"
                                placeholder="请输入"
                            ></el-input>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button class="search search-btn" @click="upDateNodeData('ruleForm')">确 定</el-button>
                        <el-button @click="update = false">取 消</el-button>
                    </span>
                </el-dialog>
            </div>
            <div class="rightBox">
                <div class="preservation" v-if="showBtn">
                    <el-button @click="submit" :disabled="submitBtn">保存</el-button>
                </div>
                <div class="scoreTableBox">
                    <div class="rightBoxChild" v-for="(item,index) in scoreList" :key="index+'1'">
                        <div class="textStyle">{{item.nameBackup}}</div>
                        <el-table
                            :data="item.pointItem"
                            style="width: 100%;margin-top:10px"
                            border
                            max-height="250px"
                            highlight-current-row
                        >
                            <el-table-column type="index" width="50" label="序号" align='center'></el-table-column>
                            <el-table-column
                                prop="remarkBackup"
                                label="数据库字段"
                                
                                align="center"
                            ></el-table-column>
                            <el-table-column label="前端名称" align="center">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.remark"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="remark" label="是否显示" align="center" width="80px">
                                <template slot-scope="scope">
                                    <el-switch
                                        v-model="scope.row.status"
                                        active-color="#13ce66"
                                        inactive-color="#c2c2c2"
                                        @change="getStatus(scope.row.status,scope.row)"
                                    ></el-switch>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
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
            update:false,
             updateData: {
                name: "",
                pointId:''
            },
             rules: {
                name: [
                    { required: true, message: "请填写名称", trigger: "change" }
                ]
            },
            submitBtn:false
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
        upDateNodeData(formName){
            this.$refs[formName].validate((valid)=>{
                if(valid){
                    this.$utils.post(this.reqApi.xinls+'/exam/point/update',qs.stringify({
                        pointId:this.updateData.pointId,
                        name:this.updateData.name
                    })).then(res=>{
                        if(res.data.code==='0000'){
                            this.update=false
                            this.$message.success('提交成功')
                            this.getList()
                        }else{
                            return this.$message.error(res.data.msg)
                        }
                    })
                }else {
                     return false;
                }
            })
        },
        updateNode(data) {
            this.updateData.pointId=data.code
            this.update=true
        },
        getStatus(value, row) {
            row.isShow = value ? "1" : "0";
            row.isShow=Number(row.isShow)
        },
        submit() {
            this.submitBtn=true
            setInterval(()=>{
                this.submitBtn=false
            },3000)
            this.scoreList.forEach(item => {
                this.pointItemSet = this.pointItemSet.concat(item.pointItem);
            });
            this.pointItemSet = this.pointItemSet.map(item => {
                return {
                    id: item.id,
                    remark: item.remark,
                    isShow: item.isShow
                };
            });
            // return
            // 评分点修改
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/point/item/update",
                    qs.stringify({
                        pointId: this.pointId,
                        pointItemSet: JSON.stringify(this.pointItemSet)
                    })
                )
                .then(res => {
                    this.pointItemSet=[]
                    if (res.data.code === "0000") {
                        this.$message.success("提交成功！");
                        this.subDetail();
                    } else {
                        return this.$message.error(res.data.msg);
                    }
                });
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
                        if (this.scoreList.length > 0) {
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
                    }else {
                         return this.$message.error(res.data.msg);
                    }
                });
        },
        // 获取列表
        getList() {
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/point/newTree",
                    qs.stringify({
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.data = res.data.data.tree;
                        // this.tableData = res.data.data.pointList;
                    }else{
                         return this.$message.error(res.data.msg);
                    }
                });
        },
        handleNodeClick(data) {
            this.pointId = data.code;
            this.subDetail();
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
    min-width: 220px;
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
.textStyle{
    font-size: 16px;
    font-weight: 700;
}
</style>