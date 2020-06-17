<template>
    <el-card class="new-class f-new box-card">
        <div v-if="$route.query.user">
            <previous-page goPreviousPage="/user"></previous-page>
            <h3 class="titleText">学生批量导入</h3>
        </div>
        <div v-if="$route.query.teacher">
            <previous-page goPreviousPage="/adminList"></previous-page>
            <h3 class="titleText">老师批量导入</h3>
        </div>
        <div class="newQue-body">
            <div class="new-body">
                <el-form ref="form" :rules="rules" :model="form" label-width="100px">
                    <!-- 学生 -->
                    <el-form-item label="所属班级:" prop="classId" v-if="$route.query.user">
                        <el-select v-model="form.classId" placeholder="请选择">
                            <el-option
                                v-for="(item,index) in list"
                                :key="index"
                                :label="item.class_name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- 老师 -->
                    <el-form-item label="所属班级:" prop="classId" v-else>
                        <el-select v-model="form.classId" placeholder="请选择">
                            <el-option
                                v-for="(item,index) in list"
                                :key="index"
                                :label="item.class_name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <!-- <el-button @click="exportQs">导出</el-button> -->
                        <el-button @click="importQs">导入</el-button>
                    </el-form-item>
                    <el-form-item v-if="show">
                        <el-upload
                            class="upload-demo"
                            :action="`${this.reqApi.xinls}${reqUrl}`"
                            :show-file-list="false"
                            :before-upload="beforeUploadVideo"
                            :on-progress="uploadVideoProcess"
                            :on-success="handleVideoSuccess"
                            :on-error="fileError"
                            ref="uploadVue"
                            id="zujian"
                            :data="form"
                            name="orign"
                            :file-list="fileList"
                        >
                            <el-button size="small" class="btnclass">
                                <i class="el-icon-plus"></i>选择文件
                            </el-button>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <div class="errorBox" v-if="showBox">
                    <span>{{succesSum}}条提交成功</span>
                    <br />
                    <!-- <span v-if="succesSum">表格第{{failSum}}行提交失败</span> -->
                    <br />
                    <span v-if="failUsernames">用户名异常 {{failUsernames}}</span>
                    <br />
                    <span v-if="failRealnames">真实姓名异常 {{failRealnames}}</span>
                    <br />
                    <span v-if="failNums">工号 {{failNums}}</span>
                </div>
            </div>
        </div>

        <div class="topPadding"></div>
    </el-card>
</template>
<script>
import previousPage from "@/components/previousPage.vue";
export default {
    data() {
        return {
            data1: {
                token: sessionStorage.getItem("token"),
                
            },
            fileList: [],
            videoFlag: false,
            videoUploadPercent: 0,
            fileList: [],
            failSum: "",
            succesSum: "",
            failRowNums: "",
            failUsernames: "",
            failRealnames: "",
            failNums: "",
            showBox: false,
            show: false,
            form: {
                classId: "",
                 token: sessionStorage.getItem("token"),
            },
            list: [],
            reqUrl:'',
            rules:{
              classId:[
                 {
                        required: true,
                        message: "数据文件不能为空！",
                        trigger: "blur"
                    }
              ]
            }
        };
    },
    created() {
      if(this.$route.query.user){

        this.getClassList();
        this.reqUrl='/student/inputExcel'
      }else {
        this.reqUrl='/teacher/inputExcel'
          this. getfindClasses()
      }

    },
     components: {
        "previous-page": previousPage
    },
    methods: {
        importQs() {
            this.show = true;
        },
        // 学生调班级接口
        getClassList() {
            this.$utils
                .post(this.reqApi.shuiwuUrl + "/class/myClass")
                .then(res => {
                    if (res.data.code === "0000") {
                        this.list = res.data.classes.list;
                    }
                });
        },
        // 老师调班级接口
        getfindClasses() {
            const that = this;
            that.$utils
                .post(
                    this.reqApi.shuiwuUrl + "/class/list")
                .then(res => {
                    if (res.data.code === "0000") {
                        this.list = res.data.classes.list;
                    }
                });
        },
        beforeUploadVideo() {},
        uploadVideoProcess() {},
        handleVideoSuccess(res, file, fileList) {
            if (res.code === "0000") {
                // this.$message.success('提交成功')
                // this.$router.push('/user')
                // if(res.failRowNums){
                // this.data=res
                this.showBox = true;
                this.succesSum = res.succesSum;
                this.failSum = res.failRowNums.toString();
                if (res.failUsernames.length > 0) {
                    this.failUsernames = res.failUsernames.toString();
                }
                if (res.failUsernames.length > 0) {
                    this.failRealnames = res.failRealnames.toString();
                }
                if (res.failNums.length > 0) {
                    this.failNums = res.failNums.toString();
                }
                // }
            } else {
            }
        },
        fileError() {}
    }
};
</script>
<style scoped>
.topPadding {
    padding: 0;
    padding-left: 20px;
    padding-top: 20px;
}
.errorBox {
    padding: 20px;
}
.newQue-body {
    border: 1px solid #dbdfe6;
}
.newQue-body .new-body {
    padding: 25px 60px;
}
.newQue-body .new-body p {
    color: #c3c3c3;
    height: 30px;
    position: relative;
}
.newQue-body .new-body p::before {
    display: inline-block;
    content: "";
    position: absolute;
    left: -22px;
    top: 5px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: #f6ad42;
}
</style>