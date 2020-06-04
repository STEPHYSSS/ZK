<template>
    <div id="addstoreBox">
        <div class="addBox">
            <div class="add_Box">
                <h4 style="padding:20px 0" v-if="this.$route.query.id">广告位编辑</h4>
                <h4 style="padding:20px 0" v-else>广告位新增</h4>
                <div class="frombox">
                    <el-form
                        :model="ruleForm"
                        :label-position="labelPosition"
                        :rules="rules"
                        ref="ruleForm"
                        label-width="100px"
                        class="demo-ruleForm"
                    >
                        <el-form-item label="主题名称:" prop="name" label-width="120px">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="链接地址:" prop="url" label-width="120px">
                            <el-input v-model="ruleForm.url"></el-input>
                        </el-form-item>
                        <el-form-item label="状态:" prop="status" label-width="120px">
                            <el-select v-model="ruleForm.status" placeholder="请选择">
                                <el-option label="已启用" value="Y"></el-option>
                                <el-option label="已禁用" value="N"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="广告图" label-width="120px">
                            <el-upload
                               :action="`${this.uploadUrl}/image/upload`"
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove"
                                :on-success="onSuccess"
                                :before-upload="beforeUpload"
                                :on-change="astrict"
                                :data="data1"
                                name="files"
                                accept=".jpg, .jpeg, .png, .JPG, .JPEG"
                                :file-list="fileList"
                                :show-file-list="true"
                                :limit="limitCount"
                                :class="{hide:hideUpload}"
                            >
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <span style="color:red">图片(最多上传1张图片，单张图片2M以内)</span>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt />
                            </el-dialog>
                        </el-form-item>
                        <div class="center">
                            <el-button
                                class="theBtn themeColor textMright"
                                @click="submit('ruleForm')"
                            >确定</el-button>
                            <el-button class="theBtn resetButton" @click="resetForm">返回</el-button>
                        </div>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { log } from "util";
import qs from "qs";
export default {
    name: "addstore1",

    data() {
        return {
            data1: {
                token: sessionStorage.getItem("token")
            },
            limitCount: 1,
            hideUpload: false,
            dialogImageUrl: "",
            dialogVisible: false,
            fileList: [],
            labelPosition: "right",
            ruleForm: {
                token: sessionStorage.getItem("token"),
                // type: "",
                name: "",
                url: "",
                status: "",
                resourceCodes: []
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入活动名称",
                        trigger: "blur"
                    },
                    { max: 50, message: "长度不超过50个字符", trigger: "blur" }
                ],
                status: [
                    { required: true, message: "请选择状态", trigger: "blur" }
                ],
                url: [
                    { required: true, message: "请输入地址", trigger: "blur" }
                    // { max: 50, message: "长度不超过50个字符", trigger: "blur" }
                ]
            }
        };
    },
    created() {
        this.getDetail();
    },
    methods: {
        // 图片上传start
        astrict(file, fileList) {
            this.hideUpload = fileList.length >= this.limitCount;
        },
        handleRemove(file, fileList) {
            this.hideUpload = fileList.length >= this.limitCount;
            // this.ruleForm.resourceCodes = [];
            // if (fileList.length > 0) {
            //     fileList.forEach(item => {
            //         if (item.response) {
            //             this.ruleForm.resourceCodes.push(item.response.data);
            //         } else {
            //             this.ruleForm.resourceCodes.push(item.url);
            //         }
            //     });
            // }
            if(file.response){
                this.ruleForm.resourceCodes=file.response.data
            }

        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        onSuccess(response, file, fileList) {
            // this.ruleForm.resourceCodes = [];

            // fileList.forEach(item => {
            //     if (item.response) {
            //         this.ruleForm.resourceCodes.push(item.response.data);
            //     } else {
            //         this.ruleForm.resourceCodes.push(item.url);
            //     }
            // });
            if(file.response){
                this.ruleForm.resourceCodes=file.response.data
            }
        },
        beforeUpload(file) {
            if (file.size > 2 * 1024 * 1024) {
                return this.$message.error(file.name + "图片超过2M 不允许上传");
            }
        },
        // 图片上传end
        // 提交
        submit(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (this.$route.query.id) {
                        this.$axios
                            .post(
                                "/mall/banner/update",
                                qs.stringify({
                                    id: this.$route.query.id,
                                    token: sessionStorage.getItem("token"),
                                    name: this.ruleForm.name,
                                    url: this.ruleForm.url,
                                    status: this.ruleForm.status,
                                    image: this.ruleForm.resourceCodes
                                })
                            )
                            .then(res => {
                                if (res.data.code === "0000") {
                                    this.$router.push({
                                        name: "Advertising"
                                    });
                                }
                            });
                    } else {
                        this.$axios
                            .post(
                                "/mall/banner/add",
                                qs.stringify({
                                    token: sessionStorage.getItem("token"),
                                    name: this.ruleForm.name,
                                    url: this.ruleForm.url,
                                    status: this.ruleForm.status,
                                    image: this.ruleForm.resourceCodes
                                })
                            )
                            .then(res => {
                                if (res.data.code === "0000") {
                                    this.$router.push({
                                        name: "Advertising"
                                    });
                                } else {
                                    this.$message.error(res.data.msg);
                                }
                            })
                            .catch(err => {
                                console.log("数据异常", err);
                            });
                    }
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$router.push({
                name: "Advertising"
            });
        },
        // 详情
        getDetail() {
            if (this.$route.query.id) {
                this.$axios
                    .post(
                        "/mall/banner/detail",
                        qs.stringify({
                            token: sessionStorage.getItem("token"),
                            id: this.$route.query.id
                        })
                    )
                    .then(res => {
                        if (res.data.code === "0000") {
                            this.ruleForm = res.data.data;
                            if (res.data.data.image) {
                                this.ruleForm.resourceCodes =
                                    res.data.data.image;
                                // this.ruleForm.resourceCodes = JSON.parse(
                                //     this.ruleForm.resourceCodes
                                // );
                                if (this.ruleForm.resourceCodes) {
                                    this.fileList = [];
                                    // let url = "http://192.168.1.168:8080";  //只用来做本地预览，编辑提交的时候需要注释掉
                                    let url = "";
                                    this.fileList.push({
                                        url: this.uploadUrl + this.ruleForm.resourceCodes
                                    });
                                    // for (const i of this.ruleForm
                                    //     .resourceCodes) {
                                    // i = {
                                    //     url: url + i
                                    // name: "营业执照" + index + ".jpg",
                                    // size: 1*1024*1024
                                    // };
                                    // this.fileList.push(i);
                                    this.hideUpload =
                                        this.fileList.length >= this.limitCount;
                                    // }
                                }
                            }
                        } else if (res.data.code == "6666") {
                            this.$message({
                                showClose: true,
                                message: "token异常，请重新登录",
                                type: "error"
                            });
                            const timer = setTimeout(() => {
                                clearTimeout(timer);
                                this.$router.push({ name: "login" });
                            }, 3000);
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    });
            }
        }
    }
};
</script>
<style scoped>
#addstoreBox {
    background-color: #f1f6fa;
    min-height: 647px;
    box-sizing: border-box;
    min-width: 1700px;
    box-shadow: 0px 2px 10px #ccc;
    height: 100%;
    position: relative;
    overflow: hidden;
}
#addstoreBox .addBox {
    margin: 0 auto;
    background: #fff;
    border-radius: 10px;
    position: absolute;
    left: 0;
    top: 0;
    right: -17px;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: scroll;
    height: 100%;
}
#addstoreBox .add_Box {
    margin: 0 20px;
    padding-bottom: 30px;
}
#addstoreBox .nav {
    display: inline-block;
    height: 50px;
    line-height: 50px;
}
#addstoreBox .hint {
    font-size: 14px;
    /* display: inline-block; */
    background: url("../../assets/hint.png") no-repeat;
    width: 50px;
    height: 28px;
    line-height: 30px;
    float: left;
    padding-left: 38px;
    color: #c6c6c6;
}
#addstoreBox .hint_tit {
    display: inline-block;
    height: 30px;
    line-height: 30px;
    color: #c6c6c6;
    font-size: 14px;
    margin-bottom: 15px;
}
#addstoreBox .frombox {
    width: 500px;
    margin-left: 25px;
}
#addstoreBox .el-select {
    width: 100%;
}
#addstoreBox .distpicker-address-wrapper select {
    width: 123px;
    padding: 0 10px;
    font-size: 13px;
}
#addstoreBox .distpicker-address-wrapper select {
    width: 123px;
    padding: 0.5rem 0.75rem;
    height: 40px;
    font-size: 1rem;
    line-height: 1.25;
    color: #464a4c;
    background-color: #fff;
    background-image: none;
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0.25rem;
    -webkit-transition: border-color ease-in-out 0.15s,
        -webkit-box-shadow ease-in-out 0.15s;
    transition: border-color ease-in-out 0.15s,
        -webkit-box-shadow ease-in-out 0.15s;
    -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
    transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
    transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s,
        -webkit-box-shadow ease-in-out 0.15s;
}
#addstoreBox .el-date-editor.el-input {
    width: 380px;
}
#addstoreBox .el-col-2 {
    text-align: center;
}
#addstoreBox .el-select .el-input .el-select__caret {
    line-height: 15px;
}
#addstoreBox .adcity li {
    width: 121px;
    margin-right: 8px;
}
#addstoreBox .upload-demo {
    position: relative;
}
#addstoreBox .upload-demo .el-button {
    margin: 0;
    margin-left: 290px;
    /* position: absolute; */
}
#addstoreBox .el-upload__tip {
    color: red;
}
#addstoreBox .center {
    text-align: center;
}
</style>




