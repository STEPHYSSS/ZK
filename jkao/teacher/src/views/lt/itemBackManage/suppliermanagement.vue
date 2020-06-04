<template>
    <div>
        <div class="suppliermanagement">
            <h4 v-if="$route.query.code" style="margin-left:20px;font-size:14px;font-weight:700">编辑供应商</h4>
            <h4 v-else style="margin-left:20px;font-size:14px;font-weight:700">新增供应商</h4>
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
                    <el-form-item label="供应商名称:" prop="name">
                        <el-input class="inputwidth" v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="供应商简称:" prop="abbreviation">
                        <el-input class="inputwidth" v-model="ruleForm.abbreviation"></el-input>
                    </el-form-item>
                    <el-form-item label="类型:" prop="type">
                        <el-select v-model="ruleForm.type" placeholder="请选择" class="inputwidth">
                            <el-option
                                v-for="(addItem,index) in suppliType"
                                :key="index"
                                :label="addItem.name"
                                :value="addItem.name"
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
                        <!-- </p> -->
                        <!-- <p class="cit"> -->
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
                        <!-- </p> -->
                    </el-form-item>
                    <el-form-item label="详细地址:" prop="address">
                        <el-input
                            type="textarea"
                            class="inputwidth"
                            v-model="ruleForm.address"
                            placeholder="请输入"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="联系人:" prop="contactsName">
                        <el-input v-model="ruleForm.contactsName" class="inputwidth"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式:" prop="contactsPhone">
                        <el-input
                            v-model="ruleForm.contactsPhone"
                            oninput="value=value.replace(/[^\d]/g,'')"
                            maxlength="11"
                            class="inputwidth"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="供应方式:" prop="supplyMode">
                        <el-select
                            v-model="ruleForm.supplyMode"
                            placeholder="请选择"
                            class="inputwidth"
                        >
                            <el-option label="直送门店" value="Z"></el-option>
                            <el-option label="仓库配送" value="W"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="采购中心:" prop="purchase">
                        <el-select v-model="ruleForm.purchase" placeholder="请选择" class="inputwidth">
                            <el-option
                                v-for="(caiitem,index) in supPurchase"
                                :key="index"
                                :label="caiitem.name"
                                :value="caiitem.name"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="物流中心:" prop="logistics">
                        <el-select
                            v-model="ruleForm.logistics"
                            placeholder="请选择"
                            class="inputwidth"
                        >
                            <el-option
                                v-for="(logiitem,index) in logistics"
                                :key="index"
                                :label="logiitem.name"
                                :value="logiitem.name"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="到货周期(天):" prop="arrivalCycle">
                        <el-input
                            v-model="ruleForm.arrivalCycle"
                            @blur="checkInt(ruleForm.arrivalCycle,100)"
                            onkeyup="this.value=this.value.replace(/\D/g,'')"
                            placeholder="请输入"
                            class="inputwidth"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="证照信息" label-width="120px">
                        <el-upload
                            :action="`${reqApi.xinls}/image/upload`"
                            list-type="picture-card"
                            id="picDiv"
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
                    <el-form-item class="center">
                        <el-button class="AllquedingBtn" @click="submitForm('ruleForm')">确定</el-button>
                        <el-button class="theBtn resetButton" @click="resetForm()">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="konge"></div>
        </div>
    </div>
</template>
<script>
import qs from "qs";
export default {
    data() {
        return {
            data1: {
                token: sessionStorage.getItem("token")
            },
            limitCount: 5,
            hideUpload: false,
            fileList: [],
            fileSizeIsSatisfy: true,
            dialogImageUrl: "",
            dialogVisible: false,
            ruleForm: {
                code: "",
                type: "",
                name: "",
                supplyMode: "",
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
            province: [], //下拉遍历省
            city: [], //下拉遍历市
            area: [], //下拉遍历区
            suppliType: [], //类型下拉选
            supPurchase: [], //采购下拉选
            logistics: [], //物流下拉选
            fileList: [], //文件
            addInp: false,
            mask: false,
            labelPosition: "right",
            formInline: {
                user: "",
                region: ""
            },
            mark: true,
            rules: {
                name: [
                    { required: true, message: "请输入名称", trigger: "blur" },
                    { max: 50, message: "长度不超过50字符", trigger: "blur" }
                ],
                type: [
                    { required: true, message: "请选择内容", trigger: "change" }
                ],
                arrivalCycle: [
                    {
                        required: true,
                        message: "请输入到货日期",
                        trigger: "blur"
                    }
                ],
                purchase: [
                    { required: true, message: "请选择内容", trigger: "change" }
                ],
                logistics: [
                    { required: true, message: "请选择内容", trigger: "change" }
                ],
                province: [
                    {
                        required: true,
                        message: "请选择省份",
                        trigger: "blur"
                    }
                ],
                city: [
                    {
                        required: true,
                        message: "请选择城市",
                        trigger: "blur"
                    }
                ],
                area: [
                    {
                        required: true,
                        message: "请选择地区",
                        trigger: "blur"
                    }
                ],
                supplyMode: [
                    {
                        required: true,
                        message: "请选择供应方式",
                        trigger: "change"
                    }
                ]
            }
        };
    },
    created() {
        this.showother();
        this.suPurchase();
        this.supplogistics();
        this.enterCity();
        if (this.$route.query.code) {
            this.getDetail();
        }
    },
    methods: {
        getDetail() {
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/supplier/detail",
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
                                // console.log(this.fileList);
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

        submitForm(formName) {
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
                                this.reqApi.xinls + "/exam/supplier/update",
                                qs.stringify({
                                    code: this.$route.query.code,
                                    type: this.ruleForm.type,
                                    name: this.ruleForm.name,
                                    province: this.ruleForm.province,
                                    city: this.ruleForm.city,
                                    area: this.ruleForm.area,
                                    logistics: this.ruleForm.logistics,
                                    purchase: this.ruleForm.purchase,
                                    arrivalCycle: this.ruleForm.arrivalCycle,
                                    abbreviation: this.ruleForm.abbreviation,
                                    address: this.ruleForm.address,
                                    contactsName: this.ruleForm.contactsName,
                                    contactsPhone: this.ruleForm.contactsPhone,
                                    resourceCodes: JSON.stringify(
                                        this.ruleForm.resourceCodes
                                    ),
                                    supplyMode: this.ruleForm.supplyMode,
                                    questionCode: sessionStorage.getItem(
                                        "questionUUid"
                                    )
                                })
                            )
                            .then(res => {
                                if (res.data.code === "0000") {
                                    this.$message.success("提交成功！");
                                    this.$router.push({
                                        name: "smanagement"
                                    });
                                }
                            });
                    } else {
                        this.$utils
                            .post(
                                this.reqApi.xinls + "/exam/supplier/add",
                                qs.stringify({
                                    type: this.ruleForm.type,
                                    name: this.ruleForm.name,
                                    province: this.ruleForm.province,
                                    city: this.ruleForm.city,
                                    area: this.ruleForm.area,
                                    logistics: this.ruleForm.logistics,
                                    purchase: this.ruleForm.purchase,
                                    arrivalCycle: this.ruleForm.arrivalCycle,
                                    abbreviation: this.ruleForm.abbreviation,
                                    address: this.ruleForm.address,
                                    contactsName: this.ruleForm.contactsName,
                                    contactsPhone: this.ruleForm.contactsPhone,
                                    resourceCodes: JSON.stringify(
                                        this.ruleForm.resourceCodes
                                    ),
                                    supplyMode: this.ruleForm.supplyMode,
                                    questionCode: sessionStorage.getItem(
                                        "questionUUid"
                                    )
                                })
                            )
                            .then(res => {
                                if (res.data.code === "0000") {
                                    this.$message.success("提交成功！");
                                    this.$router.push({
                                        name: "smanagement"
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
        checkInt(n, max) {
            if (n < 0 || n > max) {
                return this.$message.error("请输入小于" + max + "的正整数！！");
            }
        },

        chooseArea(value) {
            for (const key in this.inArea) {
                if (this.inArea[key].id == value)
                    this.ruleForm.area = this.inArea[key].name;
            }
        },
        resetForm(formName) {
            //  this.$router.push({name:'smanagement'})
            this.$router.go(-1);
        },
        // 采购中心下拉选supplier_purchase_select
        suPurchase() {
            let _this = this;
            let token = sessionStorage.getItem("token");
            let code = "supplier_purchase_select";
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/dictionary/list",
                    qs.stringify({
                        code: code,
                        questionCode: sessionStorage.getItem("questionUUid")
                    })
                )
                .then(res => {
                    if (res.data.code == "0000") {
                        _this.supPurchase = res.data.data;
                    }
                });
        },
        // 供应商类型下拉选	supplier_type_select
        showother() {
            let code = "supplier_type_select";
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/dictionary/list",
                    qs.stringify({
                        questionCode: sessionStorage.getItem("questionUUid"),
                        code: code
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.suppliType = res.data.data;
                    } else {
                        return this.$message.error(res.data.msg);
                    }
                });
        },
        // 物流下拉选
        supplogistics() {
            let _this = this;
            let token = sessionStorage.getItem("token");
            let code = "supplier_logistics_select";
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/dictionary/list",
                    qs.stringify({
                        questionCode: sessionStorage.getItem("questionUUid"),
                        code: code
                    })
                )
                .then(res => {
                    if ((res.data.code = "0000")) {
                        _this.logistics = res.data.data;
                    }
                });
        }
    }
};
</script>
<style scoped>
#addSuppWrapp {
    background-color: #fff;
    box-shadow: 0px 2px 10px #ccc;
    min-height: 647px;
    min-width: 1200px;
    position: relative;
    overflow: hidden;
    height: 100%;
}
.frombox {
    width: 500px;
}
#addSuppWrapp .el-select {
    width: 100%;
}
#addSuppWrapp .suppliermanagement {
    background: #fff;
    position: absolute;
    left: 0;
    top: 0;
    right: -17px;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: scroll;
    height: 100%;
}
#addSuppWrapp .center {
    text-align: center;
}
.hint {
    font-size: 14px;
    margin-left: 20px;
    /* display: inline-block; */
    background: url("../../../assets/images/hint.png") no-repeat;
    width: 50px;
    height: 28px;
    line-height: 30px;
    float: left;
    padding-left: 38px;
    color: #c6c6c6;
}
.hint_tit {
    display: inline-block;
    height: 30px;
    line-height: 30px;
    color: #c6c6c6;
    font-size: 14px;
    margin-bottom: 15px;
}
.inline {
    display: inline-block;
    width: 97px;
}
.inputwidth {
    width: 300px;
}
</style>