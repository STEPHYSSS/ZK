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
        <table
            class="table-box"
            border="1"
            cellspacing="0"
            cellpadding="0"
            width="1500"
            style="font-size:14px;border-collapse: collapse;"
        >
            <caption
                align="top"
                class="table-title"
                style="width: 100%;height: 40px;
    line-height: 40px;border: 1px solid #000;border-bottom: none;"
            >月度考核评分表</caption>
            <tr style="height:45px;line-height: 45px;
    text-align: center;">
                <td width="100">被考评对象</td>
                <td width="100">{{tableData.personnelName}}</td>
                <td width="150">部门</td>
                <td width="600">{{tableData.sectionName}}</td>
                <td width="150">职务</td>
                <td width="200" colspan="2">{{tableData.job}}</td>
                <td width="100">综合得分</td>
                <td width="100">{{tableData.compositeScore}}</td>
            </tr>
            <tr style="height:45px;line-height: 45px;
    text-align: center;">
                <td>考评人</td>
                <td>{{tableData.gradePersonnelName}}</td>
                <td>考评时间</td>
                <td>{{tableData.startTime | fmtDate}} 至 {{tableData.endTime | fmtDate}}</td>
                <td>填表时间</td>
                <td colspan="2">{{tableData.createTime | fmtDate}}</td>
                <td>等级</td>
                <td>
                    <span v-if="tableData.compositeScore >= 90">优秀</span>
                    <span v-if="tableData.compositeScore >= 60 && tableData.compositeScore < 90">合格</span>
                    <span v-if="tableData.compositeScore < 60">不合格</span>
                </td>
                <!-- <td></td> -->
            </tr>
            <tr style="height:45px;line-height: 45px;
    text-align: center;">
                <td width="100">项目</td>
                <td width="100">指标</td>
                <td width="150">等级</td>
                <td width="600">程度描述</td>
                <td width="150">分值</td>
                <td width="100">自评等级</td>
                <td width="100">自评分</td>
                <td width="100">上级评分</td>
                <td width="100">综合得分</td>
            </tr>
            <tr v-for="(item,j) in tableData.gradeStandard" :key="j+'w'">
                <td style="line-height:45px;text-align:center">{{item.name}}({{item.score}})</td>
                <td colspan="8">
                    <div v-for="(item1,index) in item.children" :key="index+'a'" class="remark-box">
                        <div
                            class="remark-box-zb flex-center"
                            style="width: 100px;border-bottom: 1px solid #000;border-right: 1px solid #000;"
                            :class="{'remark-box-zb-none': index === item.children.length - 1}">
                            {{item1.name}}({{item1.score}})
                        </div>
                        <div >
                            <div
                                v-for="(val,k) in item1.children"
                                :key="k+'0'"
                                class="remark"
                                :class="{'remark-box-zb-none': (k === item1.children.length - 1 && index === item.children.length - 1)}"
                                style="border-bottom: 1px solid #000;"
                            >
                                <div style="width:150px; border-right:1px solid #000;text-align:center">{{val.name}}</div>
                                <div style="width:600px; border-right:1px solid #000;text-align:center">{{val.remark}}</div>
                                <div style="width:150px;text-align:center">{{val.score}}</div>
                            </div>
                        </div>
                        
                        <div
                            class="remark-box-zb flex-center"
                            style="width: 100px;border-bottom: 1px solid #000;line-height: 1.1;border-left: 1px solid #000;"
                            :class="{'remark-box-zb-none': index === item.children.length - 1}"
                        >{{item1.detailLevel}}
                        </div>
                        
                        <div
                            class="remark-box-zb flex-center"
                            style="width: 100px;border-bottom: 1px solid #000;border-left: 1px solid #000;"
                            :class="{'remark-box-zb-none': index === item.children.length - 1}"
                        >{{item1.selfScore}}
                        </div>
                        
                        <div
                            class="remark-box-zb flex-center"
                            style="width: 100px;border-bottom: 1px solid #000;border-left: 1px solid #000;"
                            :class="{'remark-box-zb-none': index === item.children.length - 1}"
                        >
                        <template v-if="item1.detailId">
                            <input type="index" v-model="item1.checkScore">
                        </template>
                        </div>
                        
                        <div
                            class="remark-box-zb flex-center"
                            style="width: 100px;border-bottom: 1px solid #000;border-left: 1px solid #000;"
                            :class="{'remark-box-zb-none': index === item.children.length - 1}"
                        >{{item1.compositeScore}}</div>
                    </div>
                </td>
            </tr>
        </table>
        </div>
        <!-- 编辑弹框 -->
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
            tableData: [],
            tableDetail: {},
            form: {
                reason: '',
            },
            code: this.$route.query.code,
            status: this.$route.query.status,
            rules: {
                reason: [{ required: true, message: '请填写申诉单编号或者作废理由', trigger: 'blur' }]
            },
            type: 'B'
        }
    },                                                                

    created(){
        this.getGradeDetail()
    },

    computed: {
        comSum () {
            return function (id) {
                let sum = 0
                for (const i of this.tableData.gradeStandard) {
                    for (const y of i.children) {
                        sum += y[id] - 0
                    }
                }
                if (isNaN(sum)) return 0
                else return sum
            }
        },
    },
    components: {
        myDialog
    },

    methods:{
        checkNum (e, id, index) {
            let g = e.target.value + ''
            //先把非数字的都替换掉，除了数字和.
            g = g.replace(/[^\d.]/g, "")
            //保证只有出现一个.而没有多个.
            g = g.replace(/\.{2,}/g, ".")
            //必须保证第一个为数字而不是.
            // g = g.replace(/^\./g, "")
            //保证.只出现一次，而不能出现两次以上
            g = g.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".")
            //只能输入两个小数
            g = g.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
            if(g == "") {
            g = 0.00
            }
            for (const i of this.tableData) {
                i.children[index][id] = parseFloat(g).toFixed(2)
            }
        },
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

.table-box {
    /* width: 1500px; */
    border-collapse: collapse !important;
    border-color: #000;
}

.table-title {
    /* width: 100%; */
    /* border: 1px solid #000; */
    /* border-bottom: none; */
    /* height: 40px;
    line-height: 40px; */
    box-sizing: border-box;
}

.remark-box {
    display: flex;
}

.remark-box-zb {
    /* width: 150px; */
    /* border-bottom: 1px solid #000;
    border-right: 1px solid #000; */
}

.remark-box-zb-none {
    border-bottom: none !important;
}

.remark {
    display: flex;
    /* border-bottom: 1px solid #000; */
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
.flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>