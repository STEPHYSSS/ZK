<template>
    <div id="addstoreBox">
        <h4 v-if="$route.query.code" style="margin-left:20px;font-size:14px;font-weight:700">门店编辑</h4>
        <h4 v-else style="margin-left:20px;font-size:14px;font-weight:700">门店新增</h4>
        <!-- <div class="addBox"> -->
        <div class="add_Box">
            <span class="hint">提示：</span>
            <span class="hint_tit">创建成功后凭系统生成的编号和初始密码123456登录，请提醒门店及时修改密码！</span>
            <div class="frombox">
                <el-form
                    :model="ruleForm"
                    :label-position="labelPosition"
                    :rules="rules"
                    ref="ruleForm"
                    label-width="120px"
                    class="demo-ruleForm"
                >
                    <el-form-item label="门店名称:" prop="name">
                        <el-input class="inputwidth" v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="类型:" prop="type">
                        <el-select class="inputwidth" v-model="ruleForm.type" placeholder="请选择">
                            <el-option
                                v-for="item in storeType"
                                :key="item.value"
                                :label="item.name"
                                :value="item.name"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所在区域:" required>
                        <el-form-item prop="province" class="inline">
                            <el-select
                                v-model="ruleForm.province"
                                placeholder="请选择"
                                class="selectWidth"
                                @change="chooseProvince"
                            >
                                <el-option
                                    v-for="(item,index) in province"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.name"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="city" class="inline">
                            <el-select
                                v-model="ruleForm.city"
                                placeholder="请选择"
                                class="selectWidth"
                                @change="chooseCity"
                            >
                                <el-option
                                    v-for="(item,index) in city"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.name"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="area" class="inline">
                            <el-select
                                v-model="ruleForm.area"
                                placeholder="请选择"
                                class="selectWidth"
                                @change="chooseArea"
                            >
                                <el-option
                                    v-for="(item,index) in area"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.name"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form-item>
                    <el-form-item label="详细地址:" prop="address">
                        <el-input
                            class="inputwidth"
                            type="textarea"
                            v-model="ruleForm.address"
                            placeholder="请输入"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="开店时间:" required>
                        <el-form-item prop="openTime" class="dis-line">
                            <el-date-picker
                                v-model="ruleForm.openTime"
                                type="date"
                                width="100%"
                                @change="change1"
                                placeholder="请选择开业时间"
                                :picker-options="pickerOptionsStart"
                            ></el-date-picker>
                        </el-form-item>
                        <span>至</span>
                        <el-form-item prop="shutdownTime" class="dis-line">
                            <el-date-picker
                                v-model="ruleForm.shutdownTime"
                                type="date"
                                width="100%"
                                @change="change11"
                                placeholder="请选择停业日期"
                                :picker-options="pickerOptionsEnd"
                            ></el-date-picker>
                        </el-form-item>
                    </el-form-item>
                    <el-form-item label="营业时间:">
                        <el-form-item class="dis-line">
                            <el-time-picker
                                type="fixed-time"
                                placeholder="起始时间"
                                width="100%"
                                v-model="ruleForm.businessTimeStart"
                            ></el-time-picker>
                        </el-form-item>
                        <span>&nbsp;-&nbsp;</span>
                        <el-form-item class="dis-line">
                            <el-time-picker
                                type="fixed-time"
                                placeholder="结束时间"
                                width="100%"
                                v-model="ruleForm.businessTimeEnd"
                            ></el-time-picker>
                        </el-form-item>
                        <!-- </el-col> -->
                    </el-form-item>
                    <el-form-item label="门店联系人:" prop="contactsName">
                        <el-input class="inputwidth" v-model="ruleForm.contactsName"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式:">
                        <el-input
                            class="inputwidth"
                            v-model="ruleForm.contactsPhone"
                            maxlength="11"
                            onkeyup="this.value=this.value.replace(/\D/g,'')"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="证照信息:">
                        <el-upload
                            :action="`${reqApi.xinls}/image/upload`"
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
                        <span style="color:red">图片(最多上传5张图片，单张图片2M以内)</span>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt />
                        </el-dialog>
                    </el-form-item>
                    <div class="center">
                        <el-button class="AllquedingBtn" @click="submit('ruleForm')">确定</el-button>
                        <el-button class="theBtn resetButton" @click="resetForm">取消</el-button>
                    </div>
                </el-form>
            </div>
        </div>
        <!-- </div> -->
    </div>
</template>
<script>
// import VDistpicker from "v-distpicker";
// import { log } from "util";
import qs from "qs";
export default {
    name: "addstore1",

    data() {
        return {
            // 限制结束时间大于开始时间
            pickerOptionsStart: {
                disabledDate: time => {
                    let endDateVal = this.ruleForm.shutdownTime;
                    if (endDateVal) {
                        return time.getTime() > new Date(endDateVal).getTime();
                    }
                }
            },
            pickerOptionsEnd: {
                disabledDate: time => {
                    let beginDateVal = this.ruleForm.openTime;
                    if (beginDateVal) {
                        return (
                            time.getTime() <
                            new Date(beginDateVal).getTime() -
                                1 * 24 * 60 * 60 * 1000
                        );
                    }
                }
            },
            data1: {
                token: sessionStorage.getItem("token")
            },
            limitCount: 5,
            hideUpload: false,
            dialogImageUrl: "",
            dialogVisible: false,
            fileList: [],
            fileSizeIsSatisfy: true,
            dialogImageUrl: "",
            dialogVisible: false,
            labelPosition: "right",
            ruleForm: {
                token: sessionStorage.getItem("token"),
                type: "",
                name: "",
                province: "",
                city: "",
                area: "",
                address: "",
                openTime: "",
                shutdownTime: "",
                contactsName: "",
                contactsPhone: "",
                businessTimeStart: "",
                businessTimeEnd: "",
                resourceCodes: []
            },
            openTime2: "",
            shutdownTime2: "",
            businessTimeStart2: "",
            businessTimeEnd2: "",
            province: [], //下拉遍历省
            city: [], //下拉遍历市
            area: [], //下拉遍历区
            storeType: [],
            mark: true,
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入活动名称",
                        trigger: "blur"
                    },
                    { max: 50, message: "长度不超过50个字符", trigger: "blur" }
                ],
                type: [
                    { required: true, message: "请选择类型", trigger: "blur" }
                ],
                province: [
                    { required: true, message: "请选择", trigger: "change" }
                ],
                city: [
                    { required: true, message: "请选择", trigger: "change" }
                ],
                area: [
                    { required: true, message: "请选择", trigger: "change" }
                ],
                address: [
                    { required: true, message: "请输入地址", trigger: "blur" },
                    { max: 50, message: "长度不超过50个字符", trigger: "blur" }
                ],
                openTime: [
                    {
                        required: true,
                        message: "请选择开店时间",
                        trigger: "change"
                    }
                ],
                shutdownTime: [
                    {
                        required: true,
                        message: "请选择停店时间",
                        trigger: "change"
                    }
                ],
                contactsName: [
                    {
                        min: 1,
                        max: 20,
                        message: "长度在 1 到 20 个字符",
                        trigger: "blur"
                    }
                ],
                province: [
                    {
                        required: true,
                        message: "请选择所在区域",
                        trigger: "change"
                    }
                ]
            }
        };
    },
    created() {
        this.showother();
        this.enterCity();
        if (this.$route.query.code) this.getDetail();
    },
    methods: {
        getDetail() {
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/store/detail",
                    qs.stringify({
                        code: this.$route.query.code,
                        questionCode: sessionStorage.getItem("questionUUid")
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.ruleForm = res.data.data;
                        if (this.ruleForm.resourceCodes != null) {
                            this.fileList = [];
                            this.ruleForm.resourceCodes = JSON.parse(
                                this.ruleForm.resourceCodes
                            );
                            if (this.ruleForm.resourceCodes.length > 0) {
                                this.ruleForm.resourceCodes.forEach(item => {
                                    let url = {};
                                    url = {
                                        url: this.reqApi.xinls + item
                                    };
                                    this.fileList.push(url);
                                });
                                this.hideUpload =
                                    this.fileList.length >= this.limitCount;
                            }
                        }
                    }
                });
        },
        // 城市接口
        enterCity() {
            this.$utils.post(this.reqApi.xinls + "/sys/city/list").then(res => {
                if (res.data.code === "0000") {
                    this.province = res.data.data;
                }
            });
        },
        // 城市列表
        chooseProvince(value) {
            let aaa = "";
            for (const key in this.province) {
                if (this.province[key].name == value)
                    aaa = this.province[key].id;
            }
            this.ruleForm.city = "";
            this.ruleForm.area = "";
            this.area = [];
            this.$utils
                .post(
                    this.reqApi.xinls + "/sys/city/list",
                    qs.stringify({
                        pid: aaa
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.city = res.data.data;
                    }
                });
        },
        // 市下拉change事件
        chooseCity(value) {
            let aaa = "";
            for (const key in this.city) {
                if (this.city[key].name == value) aaa = this.city[key].id;
            }
            this.ruleForm.area = "";
            this.$utils
                .post(
                    this.reqApi.xinls + "/sys/city/list",
                    qs.stringify({
                        pid: aaa
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.area = res.data.data;
                    }
                });
        },
        astrict(file, fileList) {
            this.hideUpload = fileList.length >= this.limitCount;
        },
        // 第二种图片上传的方式
        handleRemove(file, fileList) {
            this.hideUpload = fileList.length >= this.limitCount;
            this.ruleForm.resourceCodes = [];
            if (fileList.length > 0) {
                fileList.forEach(item => {
                    if (item.response) {
                        this.ruleForm.resourceCodes.push(item.response.data);
                    } else {
                        this.ruleForm.resourceCodes.push(item.url);
                    }
                });
            }
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        onSuccess(response, file, fileList) {
            this.ruleForm.resourceCodes = [];
            fileList.forEach(item => {
                if (item.response) {
                    this.ruleForm.resourceCodes.push(item.response.data);
                } else {
                    this.ruleForm.resourceCodes.push(item.url);
                }
            });
        },
        beforeUpload(file) {
            if (file.size > 2 * 1024 * 1024) {
                return this.$message.error(file.name + "图片超过2M 不允许上传");
            }
        },
        submit(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (!this.ruleForm.city)
                        return this.$message.error("请选择所在区域");
                    if (!this.ruleForm.area)
                        return this.$message.error("请选择所在区域");
                    if (this.ruleForm.resourceCodes.length > 0) {
                        this.ruleForm.resourceCodes = this.ruleForm.resourceCodes.map(
                            item => {
                                let index = item.indexOf("/image/");
                                return (item = item.substr(index));
                            }
                        );
                    }
                    if (this.$route.query.code) {
                        this.$utils
                            .post(
                                this.reqApi.xinls + "/exam/store/update",
                                qs.stringify({
                                    code: this.$route.query.code,
                                    type: this.ruleForm.type,
                                    name: this.ruleForm.name,
                                    province: this.ruleForm.province,
                                    city: this.ruleForm.city,
                                    area: this.ruleForm.area,
                                    address: this.ruleForm.address,
                                    openTime: this.$moment(
                                        this.ruleForm.openTime
                                    ).format("YYYY-MM-DD"),
                                    shutdownTime: this.$moment(
                                        this.ruleForm.shutdownTime
                                    ).format("YYYY-MM-DD"),
                                    contactsName: this.ruleForm.contactsName,
                                    contactsPhone: this.ruleForm.contactsPhone,
                                    businessTimeStart: this.ruleForm
                                        .businessTimeStart,
                                    businessTimeEnd: this.ruleForm
                                        .businessTimeEnd,
                                    resourceCodes: JSON.stringify(
                                        this.ruleForm.resourceCodes
                                    ),
                                    questionCode: sessionStorage.getItem(
                                        "questionUUid"
                                    )
                                })
                            )
                            .then(res => {
                                if (res.data.code == "0000") {
                                    this.$message.success("提交成功");
                                    this.$router.push({
                                        name: "storeManage"
                                    });
                                } else {
                                    this.$message.error(res.data.msg);
                                }
                            });
                    } else {
                        this.$utils
                            .post(
                                this.reqApi.xinls + "/exam/store/add",
                                qs.stringify({
                                    type: this.ruleForm.type,
                                    name: this.ruleForm.name,
                                    province: this.ruleForm.province,
                                    city: this.ruleForm.city,
                                    area: this.ruleForm.area,
                                    address: this.ruleForm.address,
                                    openTime: this.ruleForm.openTime,
                                    shutdownTime: this.ruleForm.shutdownTime,
                                    contactsName: this.ruleForm.contactsName,
                                    contactsPhone: this.ruleForm.contactsPhone,
                                    businessTimeStart: this.ruleForm
                                        .businessTimeStart,
                                    businessTimeEnd: this.ruleForm
                                        .businessTimeEnd,
                                    resourceCodes: JSON.stringify(
                                        this.ruleForm.resourceCodes
                                    ),
                                    questionCode: sessionStorage.getItem(
                                        "questionUUid"
                                    )
                                })
                            )
                            .then(res => {
                                if (res.data.code === "0000") {
                                    this.$message.success("提交成功");
                                    this.$router.push({
                                        name: "storeManage"
                                    });
                                } else {
                                    this.$message.error(res.data.msg);
                                }
                            });
                    }
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        // 门店类型
        showother() {
            let code = "store_type_select";
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/dictionary/list",
                    qs.stringify({
                        code: code,
                        questionCode: sessionStorage.getItem("questionUUid")
                    })
                )
                .then(res => {
                    if ((res.data.code = "0000")) {
                        this.storeType = res.data.data;
                    } else {
                        return this.$message.error(res.data.msg);
                    }
                });
        },

        // 时间选择
        change1(e) {
            this.ruleForm.openTime = this.$moment(e).format("YYYY-MM-DD");
        },
        change11(e) {
            this.ruleForm.shutdownTime = this.$moment(e).format("YYYY-MM-DD");
        },
        chooseArea(value) {
            for (const key in this.inArea) {
                if (this.inArea[key].id == value)
                    this.ruleForm.area = this.inArea[key].name;
            }
        },
        resetForm(formName) {
            // this.$router.push({name:'storeManage'})
            this.$router.go(-1);
        }
    }
};
</script>
<style scoped>
#addstoreBox {
    /* background-color: #f1f6fa; */
    box-sizing: border-box;
    /* position: relative;
  overflow: hidden; */
}
#addstoreBox .addBox {
    width: 700px;
    /* margin: 0 auto;
  background: #fff;
  border-radius: 10px;
   position: absolute;
  left: 0;
  top: 0;
  right: -17px;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  height: 100%; */
}
#addstoreBox .add_Box {
    margin-left: 30px;
    margin-right: 30px;
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
    /* background: url("../../assets/hint.png") no-repeat; */
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
    width: 100%;
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
.inline {
    display: inline-block;
    width: 116px;
}
.inputwidth {
    width: 355px;
}
.dis-line {
    display: inline-block;
    width: 44%;
}
.dis-line1 {
    display: inline-block;
    width: 45%;
}
</style>




