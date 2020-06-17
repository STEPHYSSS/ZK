<template>
    <el-card>
        <div class="header">
            <el-button type="primary" size="small" class="goback" @click="goback" plain>返回</el-button>
            <el-button type="primary" size="small" class="derive" plain>导出</el-button>
            <el-button type="primary" v-if="status === 'W'" size="small" class="cancellation" plain @click="handleGradeTj">提交</el-button>
            <el-button type="primary" v-if="status === 'S'" size="small" class="cancellation" plain @click="dialogFormVisible = true">作废</el-button>
            <div class="title">评分详情
                <span v-if="status === 'W'">（待审核）</span>
                <span v-if="status === 'S'">（已审核）</span>
                <span v-if="status === 'D'">（已作废）</span>
            </div>
        </div>

        <div class="TS">
            <table border="1">
                <tbody>
                    <tr>
                        <th colspan="7">月度考核评分表</th>
                    </tr>
                    <tr>
                        <td>考评对象</td>
                        <td>{{tableData.personnelName}}</td>
                        <td>部门</td>
                        <td>{{tableData.sectionName}}</td>
                        <td>职务</td>
                        <td colspan="2">{{tableData.job}}</td>
                    </tr>

                    <tr>
                        <td>考评人</td>
                        <td>{{tableData.gradePersonnelName}}</td>
                        <td>考评时间</td>
                        <td>{{tableData.startTime | fmtDate}} 至 {{tableData.endTime | fmtDate}}</td>
                        <td>等级</td>
                        <td colspan="2">
                            <span v-if="tableData.compositeScore >= 90">优秀</span>
                            <span v-if="tableData.compositeScore >= 60 && tableData.compositeScore < 90">合格</span>
                            <span v-if="tableData.compositeScore < 60">不合格</span>
                        </td> 
                    </tr>

                    <tr>
                        <td>考核项目</td>
                        <td>细分指标</td>
                        <td>权重（分）</td>
                        <td>指标具体内容及定义</td>
                        <td>自我评价得分</td>
                        <td>考核评价得分</td>
                        <td>综合得分</td>
                    </tr>
                
                </tbody>
                <tbody v-for="(item, index) in tableData.gradeStandard" :key="index + 'a'">
                    <tr v-for="(item1, index1) in item.children" :key="index1 + 'b'">
                        <td v-if="index1 === 0" :rowspan="item.children.length">{{item.name}}（{{item.score}}）</td>
                        <td>
                            {{item1.name}}
                        </td>
                        <td>
                            {{item1.score}}
                        </td>
                        <td>
                            {{item1.remark}}
                        </td>
                        <td>
                            {{item1.selfScore}}
                        </td>
                        <td>
                            <input v-if="item1.detailId" type="index" v-model="item1.checkScore">
                        </td>
                        <td>
                            {{item1.compositeScore}}
                        </td>
                    </tr>
                </tbody>
                <!-- <tr>
                    <td colspan="4">合计</td>
                    <td>{{comSum('selfScore')}}</td>
                    <td>{{comSum('checkScore')}}</td>
                    <td>{{comSum('compositeScore')}}</td>
                </tr> -->

                <tr>
                    <td>评语</td>
                    <td colspan="3">{{tableData.remark}}</td>
                    <td>签名</td>
                    <td colspan="2">日期</td>
                </tr>
            </table>
        </div>
        
        <!-- 作废弹框 -->
        <el-dialog title="作废" :visible.sync="dialogFormVisible" class="compileDialog">
            <el-form ref="form" :model="form" :rules="rules">
                <el-form-item label=" " prop="reason">
                    <input type="text" v-model="form.reason" maxlength="50" placeholder="请填写申诉单编号或者作废理由" class="compileDialogInp">
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleGrade('form')">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 提交对话框 -->
        <my-dialog ref="myDialog" :content="'提交后数据无法更改，确认提交？'" @confirm="confirmTj"></my-dialog>
    </el-card>
</template>

<script>
import myDialog from '@/components/myDialog'
import { gradeDetail, gradeCancel, gradeCheck } from '@/api/dailyManage'
export default {
    data(){
        return{
            dialogFormVisible: false,
            tableData: {
                gradeStandard: [{children: []}]
            },
            form: {
                reason: '',
            },
            code: this.$route.query.code,
            rules: {
                reason: [{ required: true, message: '请填写申诉单编号或者作废理由', trigger: 'blur' }]
            },
            status: this.$route.query.status
        }
    },                                                                

    created(){
        this.getGradeDetail()
    },
    components: {
        myDialog
    },

    computed: {
        comSum () {
            return function (id) {
                let sum = 0
                for (const i of this.tableData.gradeStandard) {
                    for (const y of i.children) {
                        if (y[id]) {
                            sum += y[id] - 0
                        }
                    }
                }
                if (isNaN(sum)) return 0
                else return sum
            }
        },
    },

    methods:{
        async getGradeDetail () {
            const { data: { code, data } } = await gradeDetail({code: this.code})
            if (code === '0000') {
                this.tableData = data
            }
        },
        async handleGrade (formName) {
            this.$refs[formName].validate(async(valid) => {
                if (valid) {
                    let res = await gradeCancel({code: this.code, reason: this.form.reason})
                    if (res.data.code === '0000') {
                        this.$message.success('操作成功!')
                        this.goback()
                    }
                }
            })
        },
        handleGradeTj () {
            this.$refs.myDialog.dialogVisible = true
        },
        async confirmTj () {
            let arr = []
            for (const i of this.tableData.gradeStandard) {
                for (const y of i.children) {
                    if (y.detailId) {
                        arr.push({
                            detailId: y.detailId,
                            checkScore: y.checkScore
                        })
                    }
                }
            }
            let res = await gradeCheck({
                remark: 'null',
                gradeDetailSet: JSON.stringify(arr),
                code: this.code
            })
            if (res.data.code === '0000') {
                this.$message.success('操作成功!')
                this.goback()
            }
        },
        goback () {
            this.$router.push({name: 'scoreReview'})
        },
    }
}
</script>

<style scoped>
/* 顶部按钮 */
.header{
    margin-bottom: 35px;
    position: relative;
}

.header .title{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.header .goback{
    color: #FA8A11;
    background-color: #fff;
    border: 1px solid #FA8A11;
}

.header .goback:hover,
.header .goback:active{
    color: #FA8A11;
    background-color: #fff;
    border: 1px solid #FA8A11;
}

.header .derive{
    color: #4489FE;
    background-color: #fff;
    border: 1px solid #4489FE;
}

.header .derive:hover,
.header .derive:active{
    color: #fff;
    background-color: #4489FE;
    border: 1px solid #4489FE;
}

.header .cancellation{
    color: #fff;
    background-color: #4489FE;
    border: 1px solid #4489FE;
}

.header .cancellation:active,
.header .cancellation:hover{
    color: #4489FE;
    background-color: #fff;
    border: 1px solid #4489FE;
}/* 顶部按钮结束 */

/* 表格样式 */
.TS table{
    margin: 0 auto;
}

.TS th{
    padding: 5px 0 5px 0;
}

.TS td{
    text-align: center;
    padding: 5px 5px 5px 5px;
}
input {
    width: calc(100% - 50px);
    border-radius: 4px;
    -webkit-appearance: none;
    background-color: #fff;
    border: 1px solid #ccc;
    background-image: none;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: 12px;
    height: 30px;
    line-height: 30px;
    outline: 0;
    padding: 0 5px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}
</style>