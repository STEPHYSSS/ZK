<template>
    <el-card id="attendanceRecord">
        <div style="padding: 0 20px;">
            <el-button plain size="small" class="goBack" @click="goback">返回</el-button>
            <el-button plain size="small" v-if="status == 'W'" @click="dialogFormVisible = true" class="audit">审核</el-button>
            <div class="splitDown">
                <span>出勤类型：</span>
                <i v-if="tableData.type == 'C'">事假</i>
                <i v-if="tableData.type == 'S'">病假</i>
                <i v-if="tableData.type == 'G'">外出</i>
            </div>
            <div class="splitDown">
                <span>开始时间：</span>{{tableData.startTime | fmtDate}}
            </div>
            <div class="splitDown">
                <span>结束时间：</span>{{tableData.endTime | fmtDate}}
            </div>
            <div class="splitDown">
                <span>附件：</span>
                <div class="accessoryImg">
                    <img v-for="(item, index) in image" :key="index" :src="reqApi.baseImgUrl + item" alt="">
                </div>
            </div>
            <div class="splitDown">
                <span>提交人：</span>{{tableData.personnelName}}
            </div>
            <div class="splitDown">
                <span>提交时间：</span>{{tableData.createTime | fmtDate}}
            </div>
            <div class="splitDown">
                <span>状态：</span>
                <i v-if="tableData.status == 'W'">待审核</i>
                <i v-if="tableData.status == 'F'">不通过</i>
                <i v-if="tableData.status == 'S'">通过</i>
            </div>
            <div v-if="status != 'W'" class="splitDown">
                <span>审核人：</span>{{tableData.checkPersonnelName}}
            </div>
            <div v-if="status != 'W'" class="splitDown">
                <span>审核时间：</span>{{tableData.checkTime | fmtDate}}
            </div>
            <div v-if="status != 'W'" class="splitDown">
                <span>审核意见：</span>{{tableData.opinion}}
            </div>
        </div>
        <el-dialog title="审核意见" width="400px" :visible.sync="dialogFormVisible" class="compileDialog">
            <el-form ref="form" :model="form" :rules="rules">
                <el-form-item label=" " prop="opinion">
                    <textarea v-model="form.opinion" maxlength="200"></textarea>
                    <p class="text-right paper-p">{{form.opinion.length}}/200 &nbsp;&nbsp;&nbsp;</p>
                </el-form-item>
                <el-form-item label="" class="text-center">
                    <el-radio-group v-model="form.isPass">
                    <el-radio label="1">通过</el-radio>
                    <el-radio label="2">不通过</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleCheck('form')">确 定</el-button>
            </div>
        </el-dialog>
    </el-card>
</template>

<script>
import { leaveDetail, leaveCheck } from '@/api/dailyManage'
export default {
    data(){
        return{
            form: {
                opinion: '',
                isPass: '1',
            },
            image: [],
            dialogFormVisible: false,
            tableData: {},
            code: this.$route.query.code,
            status: this.$route.query.status,
            rules: {
                opinion: { required: true, message: '请输入审核意见', trigger: 'blur' }
            },
        }
    },

    created(){
        this.getLeaveDetail()
    },

    methods:{
        async getLeaveDetail () {
            const { data: { code, data } } = await leaveDetail({code: this.code})
            if (code === '0000') {
                this.tableData = data
                this.image = JSON.parse(data.image)
            }
        },
        async handleCheck (formName) {
            this.$refs[formName].validate(async(valid) => {
                if (valid) {
                    const res = await leaveCheck({
                        code: this.code,
                        opinion: this.form.opinion,
                        isPass: this.form.isPass,
                    })
                    if (res.data.code === '0000') {
                        this.$message.success('操作成功!')
                        this.goback()
                    }
                }
            })
        },
        goback(){
            this.$router.push('/attendanceVacation')
        },
    },
}
</script>

<style scoped>
    .goBack{
        background-color: #FA8A11;
        color: #fff;
        border: 1px solid #FA8A11;
        margin-bottom: 20px;
    }

    .goBack:hover{
        background-color: #fff;
        color: #FA8A11;
        border: 1px solid #FA8A11;
    }

    .audit{
        background-color: #fff;
        color: #FA8A11;
        border: 1px solid #FA8A11;
    }

    .audit:hover{
        background-color: #FA8A11;
        color: #fff;
        border: 1px solid #FA8A11;
    }

    .splitDown{
        margin-bottom: 20px;
    }

    .splitDown span{
        text-align: right;
        width: 80px;
        display: inline-block;
    }

    .accessoryImg{
        display: inline-block;
        vertical-align: text-top;
        padding-top: 5px;
    }

    .accessoryImg img{
        width: 150px;
        height: 90px;
    }
  textarea {
    display: block;
    resize: none;
    padding: 5px 15px;
    line-height: 1.5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 325px;
    height: 100px;
    font-size: inherit;
    color: #606266;
    background-color: #fff;
    background-image: none;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  }
  textarea:focus {
    outline:0;
  }
  .paper-p {
    width: 350px;
    position: absolute;
    bottom: 0;
  }
</style>