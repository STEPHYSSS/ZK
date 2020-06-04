<template>
    <div>
        <a href="javaScript:;" @click="handleColl" class="fr">
            <i class="bgc-yellow el-icon-star-on"></i>收藏
        </a>
        <el-dialog title="添加收藏" :visible.sync="dialogVisible" width="400px" center>
            <el-form
                :model="collectionobj"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
                style="margin: 0px 20px;"
            >
                <el-form-item label="分类名称：" prop="collect_id">
                    <el-select class="inputWidth" v-model="collectionobj.collect_id" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="收藏备注：" prop="remark">
                  <el-input class="inputWidth" v-model="collectionobj.remark" maxlength="100" placeholder="请输入"></el-input>
                </el-form-item>
            </el-form>
            <!-- 分类名称：
            <el-select v-model="collectionobj.collect_id" placeholder="请选择">
                <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                ></el-option>
            </el-select>收藏备注：
            <el-input v-model="collectionobj.remark"></el-input> -->

            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="sure('ruleForm')">确 定</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import qs from "qs";
export default {
    data() {
        return {
            dialogVisible: false,
            options: [],
            collectionobj: {
                collect_id: "", //收藏夹ID
                question_uuid: this.question_uuid, //试题UUID
                kind: "", //试题类型 1客观题/2实训题
                remark: "" //备注
            },
            rules: {
                collect_id: [
                    {
                        required: true,
                        message: "请选择收藏夹",
                        trigger: "change"
                    }
                ],
                remark: [
                    {
                        required: true,
                        message: "请输入",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    props: ["question_uuid", "type"],
    created() {
        this.getcollection();
    },
    methods: {
        sure(formName) {
         this.$refs[formName].validate(valid=>{
           if(valid){
             if (this.type != "tax") {
                this.collectionobj.kind = 1;
            } else {
                this.collectionobj.kind = 2;
            }
            this.$utils.post(this.reqApi.shuiwuUrl+'/collect/add',qs.stringify(this.collectionobj)).then(res=>{
              if(res.data.code==='0000'){
                this.$message.success('提交成功！')
                this.dialogVisible=false

                this.$refs.ruleForm.resetFields();
                // this.collectionobj.collect_id=''
                // this.collectionobj.remark=''
              }else {
                this.$message.error(res.data.msg)
              }
            })
           }else {
             return false
           }
         })

        },
        //收藏夹列表
        getcollection() {
            this.$utils
                .post(
                    this.reqApi.shuiwuUrl + "/collect/list",
                    qs.stringify({
                        pageSize: 99999999
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.options = res.data.collects;
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });
        },
        // 收藏
        handleColl(info) {
            this.dialogVisible = true;
              return
            let that = this;
            that.atWill = info;
            that.dialogFormVisible = true;
            that.form.qid = info.qid;
            that.form.sid = info.sid;
            that.form.userkey = info.edata;
        }
    }
};
</script>
<style scoped>
@import "./exam.css";
.inputWidth{
  width: 240px;
}
</style>
