<template>
    <div class="storehouseAdd minWidth1600">
        <div class="storehousebox">
            <div class="storehouse_box">
                <div class="block">
                    <h3 class="demonstration" v-if="this.$route.query.code">仓库库存修改</h3>
                    <h3 class="demonstration" v-else>仓库库存新增</h3>
                    <el-form
                        :model="ruleForm"
                        :rules="rules"
                        ref="ruleForm"
                        label-width="110px"
                        class="demo-ruleForm"
                    >
                        <div class="aaa">
                            <el-form-item label="库存数量：" prop="count">
                                <p class="sotlname">
                                    <el-input class="inputWdit" type="text" v-model="ruleForm.count" placeholder="请输入"></el-input>
                                </p>
                            </el-form-item>
                        </div>
                        <div class="aaa">
                            <el-form-item label="选择商品：" prop="goodsCode">
                                <p class="sotlname">
                                    <el-select class="inputWdit" placeholder="请选择" v-model="ruleForm.goodsCode">
                                        <el-option
                                            v-for="item in options"
                                            :key="item.code"
                                            :label="item.name"
                                            :value="item.code"
                                        ></el-option>
                                    </el-select>
                                </p>
                            </el-form-item>
                              <el-form-item label="选择仓库：" prop="warehouseCode">
                                <p class="sotlname">
                                    <el-select class="inputWdit" placeholder="请选择" v-model="ruleForm.warehouseCode">
                                        <el-option
                                            v-for="item in wareoptions"
                                            :key="item.code"
                                            :label="item.name"
                                            :value="item.code"
                                        ></el-option>
                                    </el-select>
                                </p>
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
                count: "",
                goodsCode: "",
                warehouseCode:''
                // shelvesCount: "",
                // locationVolume: ""
            },
            options: [],
            wareoptions:[],
            rules: {
                count: [
                    {
                        required: true,
                        message: "请输入库存数量",
                        trigger: "blur"
                    }
                ],
                goodsCode: [
                    {
                        required: true,
                        message: "请选择商品",
                        trigger: "blur"
                    }
                ],
                warehouseCode:[
                    {
                        required: true,
                        message: "请选择仓库",
                        trigger: "blur"
                    }
                ],
                shelvesCount: [
                    {
                        required: true,
                        message: "请输入货架数量",
                        trigger: "blur"
                    }
                ],
                locationVolume: [
                    {
                        required: true,
                        message: "请输入单个货位容积",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    created() {
        this.showother();
        if (this.$route.query.code) this.getDetail();
    },
    methods: {
        getDetail() {
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/region/detail",
                    qs.stringify({
                        questionCode: sessionStorage.getItem("questionUUid"),
                        regionId: this.$route.query.code
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.ruleForm = res.data.data;
                    }
                });
        },
        // 所属仓库下拉选
        showother() {
            this.$utils
                .post(this.reqApi.xinls + "/exam/goods/list",qs.stringify({
                  questionCode:sessionStorage.getItem("questionUUid")
                }))
                .then(res => {
                    if ((res.data.code = "0000")) {
                        this.options = res.data.data;
                    }
                });
                 this.$utils
                .post(this.reqApi.xinls + "/exam/warehouse/list",qs.stringify({
                  questionCode:sessionStorage.getItem("questionUUid")
                }))
                .then(res => {
                    if ((res.data.code = "0000")) {
                        this.wareoptions = res.data.data;
                    }
                });

            return;
            this.$axios({
                url: "public/warehouse/list",
                method: "POST",
                headers: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                data: qs.stringify({
                    token: sessionStorage.getItem("token")
                })
            }).then(res => {
                if ((res.data.code = "0000")) {
                    this.options = res.data.data.list;
                }
            });
        },
        // 提交
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let reqUrl = this.$route.query.code
                        ? "/exam/warehouse/stock/update"
                        : "/exam/warehouse/stock/add";
                    this.$utils
                        .post(
                            this.reqApi.xinls + reqUrl,
                            qs.stringify(this.ruleForm)
                        )
                        .then(res => {
                            if (res.data.code === "0000") {
                                this.$message({
                                    type: "success",
                                    message: "提交成功"
                                });
                                this.$router.push({ name: "warehouseInventory" });
                            } else {
                                this.$message.error(res.data.msg);
                            }
                        });
                    return;
                    this.$axios({
                        url: window.apiWare + "region/add",
                        method: "POST",
                        headers: {
                            "content-type": "application/x-www-form-urlencoded"
                        },
                        data: qs.stringify({
                            token: sessionStorage.getItem("token"),
                            name: this.ruleForm.name,
                            warehouseCode: this.ruleForm.warehouseCode,
                            shelvesCount: this.ruleForm.shelvesCount,
                            locationVolume: this.ruleForm.locationVolume
                        })
                    }).then(res => {
                        if (res.data.code == "0000") {
                            this.$message({
                                type: "success",
                                message: "新增成功"
                            });
                            this.$router.push({ name: "areaSetting" });
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
            });
        },
        resetForm(formName) {
            this.$router.push({ name: "warehouseInventory" });
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
    width: 40%;
}
.aaa p {
    width: 100%;
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
.inputWdit{
    width: 300px;
}
</style>


