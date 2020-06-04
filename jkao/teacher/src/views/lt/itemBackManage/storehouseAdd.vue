<template>
    <div class="storehouseAdd minWidth1600">
        <div class="storehousebox">
            <div class="storehouse_box">
                <div class="block">
                    <h3 class="demonstration" v-if="$route.query.code">仓库修改</h3>
                    <h3 class="demonstration" v-else>仓库新增</h3>
                    <el-form
                        :model="ruleForm"
                        :rules="rules"
                        ref="ruleForm"
                        label-width="100px"
                        class="demo-ruleForm"
                    >
                        <div class="aaa">
                            <el-form-item label="仓库名称：" prop="name">
                                <p class="sotlname">
                                    <el-input
                                        type="text"
                                        v-model="ruleForm.name"
                                        placeholder="请输入名称"
                                    ></el-input>
                                </p>
                            </el-form-item>
                        </div>
                        <div class="aaa">
                            <el-form-item label="仓库属性：" prop="attribute">
                                <p class="sotlname">
                                    <el-select
                                        placeholder="请选择属性"
                                        class="selectWith"
                                        v-model="ruleForm.attribute"
                                    >
                                        <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.name"
                                        ></el-option>
                                    </el-select>
                                </p>
                            </el-form-item>
                        </div>
                        <div class="aaa">
                            <el-form-item label="所在区域：" required>
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
                        </div>
                        <div class="aaa">
                            <el-form-item>
                                <el-button
                                    class="theBtn themeColor textMright"
                                    @click="submitForm('ruleForm')"
                                >确定</el-button>
                                <el-button
                                    class="theBtn resetButton"
                                    @click="resetForm('ruleForm')"
                                >取消</el-button>
                            </el-form-item>
                        </div>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import qs from "qs";
export default {
    name: "storehouseAdd",
    data() {
        return {
            ruleForm: {
                questionCode: sessionStorage.getItem("questionUUid"),
                name: "",
                province: "", // 省
                city: "", // 市
                area: "", // 区
                attribute: "" //温层
                // address: "",
                // chargePerson: "", //负责人
                // onlineWarehouse: "Y"
            },
            options: [],
            province: [], //下拉遍历省
            city: [], //下拉遍历市
            area: [], //下拉遍历区
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入仓库名称",
                        trigger: "blur"
                    }
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
                attribute: [
                    {
                        required: true,
                        message: "请选择仓库属性",
                        trigger: "blur"
                    }
                ],
                onlineWarehouse: [
                    {
                        required: true,
                        message: "请选择电商仓库",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    created() {
        this.enterCity();
        this.showother();
        if (this.$route.query.code) this.getDetail();
    },
    methods: {
        // 详情
        getDetail() {
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/warehouse/detail",
                    qs.stringify({
                        questionCode: sessionStorage.getItem("questionUUid"),
                        code: this.$route.query.code
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.ruleForm = res.data.data;
                    } else {
                        this.$message(res.data.msg);
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
        chooseArea(value) {
            let aaa = "";
            for (const key in this.area) {
                if (this.area[key].id == value)
                    this.ruleForm.area = this.area[key].name;
            }
        },
        // 温层下拉选
        showother() {
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/dictionary/list",
                    qs.stringify({
                        code: "goods_temperature",
                        questionCode: sessionStorage.getItem("questionUUid")
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.options = res.data.data;
                    }
                });
        },
        // 提交
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let reqUrl = this.$route.query.code
                        ? "/exam/warehouse/update"
                        : "/exam/warehouse/add";
                    this.$utils
                        .post(
                            this.reqApi.xinls + reqUrl,
                            qs.stringify(this.ruleForm)
                        )
                        .then(res => {
                            if (res.data.code === "0000") {
                                this.$message({
                                    type: "success",
                                    message: "新增成功"
                                });
                                this.$router.push({ name: "warehousePages" });
                            } else {
                                this.$message.error(res.data.msg);
                            }
                        });
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$router.push({ name: "warehousePages" });
        }
    }
};
</script>
<style scoped>
.storehouseAdd {
    /* background-color: #f1f6fa; */
    min-height: 647px;
    min-width: 1200px;
}
.storehousebox {
    margin: 0 auto;
    background: #fff;
    border-radius: 10px;
}
.storehouseAdd .storehouse_box {
    margin-left: 30px;
    margin-right: 30px;
    padding-bottom: 30px;
}
.storehouseAdd .nav {
    display: inline-block;
    height: 50px;
    line-height: 50px;
}
.storehouseAdd .demonstration {
    padding-top: 20px;
    padding-bottom: 20px;
}
.spacelet {
    letter-spacing: 6px;
}
.aaa {
    /* width: 300px; */
}
.aaa p {
    /* width: 100%; */
}
.cit,
.aaa p {
    display: inline-block;
}
.aaa .cit {
    width: 33.3%;
}
.aaa .cit p {
    width: 100%;
}
.aaa {
    margin-bottom: 30px;
}
.aaa .el-range-editor.el-input__inner {
    width: 100%;
}
.selectWith {
    width: 100%;
}
.sotlname {
    width: 300px;
}
.selectWidth {
    /* width: 68px; */
}
.inline {
    display: inline-block;
    width: 97px;
}
</style>


