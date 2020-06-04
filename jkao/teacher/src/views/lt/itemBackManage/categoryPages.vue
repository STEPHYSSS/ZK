<template>
    <div>
        <!-- <h3>基础账套</h3> -->
        <!-- <basic></basic> -->
        <!-- 类目管理 -->
        <div class="fatherbox">
            <div class="leftBox">
                <el-tree
                    :data="data"
                    :props="defaultProps"
                    :highlight-current="true"
                    :expand-on-click-node="false"
                    @node-click="handleNodeClick"
                ></el-tree>
            </div>
            <div class="rightBox">
                <el-button @click="addSameLevel('新增同级类目')">新增同级类目</el-button>
                <el-button @click="addSameLevel('新增下级类目')" :disabled="disabled">新增下级类目</el-button>
                <el-form :model="formData" ref="formData">
                    <div class="CategoryBox">
                        <el-form-item label="类目编码：" prop="code">
                            <span>{{formData.code}}</span>
                        </el-form-item>
                        <el-form-item label="类目级别：" prop="level">
                            <span>{{formData.level}}</span>
                        </el-form-item>

                        <el-form-item
                            prop="name"
                            label="类目名称"
                            :rules="[
      { required: true, message: '请输入类目名称', trigger: 'blur' } 
    ]"
                        >
                            <el-input v-model="formData.name" class="inputkuang" placeholder="请输入" />
                        </el-form-item>
                        <div class="btnBox33">
                            <el-button @click="updateSame('formData')">保存</el-button>
                            <el-button @click="delCategory(formData.code)">删除</el-button>
                        </div>
                    </div>
                </el-form>
            </div>
            <el-dialog
                :title="titleText"
                :visible.sync="dialogVisible"
                width="500px"
            >
                <div class="formBox">
                    <el-form :model="formData1" ref="formData1" :rules="rules" label-width="100">
                        <el-form-item label="类目编码：" prop="code">
                            <span>{{formData1.code}}</span>
                        </el-form-item>
                        <el-form-item label="类目级别：" prop="level">
                            <span>{{formData1.level}}</span>
                        </el-form-item>

                        <el-form-item prop="name" label="类目名称">
                            <el-input
                                class="inputkuang"
                                v-model="formData1.name"
                                placeholder="请输入"
                            />
                        </el-form-item>
                        <div class="btnBox33">
                            <el-button @click="sameLevel('formData1')">保存</el-button>
                            <!-- <el-button @clikc="this.$refs.formData1.resetFields()">清空</el-button> -->
                        </div>
                    </el-form>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import basic from "./basicInfo";
import qs from "qs";
export default {
    data() {
        return {
            defaultProps: {
                children: "children",
                label: "label"
            },
            dialogVisible: false,
            disabled:false,
            titleText: "",
            data: [],
            formData: {
                name: "",
                level: "",
                questionCode: sessionStorage.getItem("questionUUid")
            },
            formData1: {
                name: "",
                code: "",
                level: "",
                questionCode: sessionStorage.getItem("questionUUid"),
                pcode: ""
            },
            CategoryCode: "",
            backupsCode: "",
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入类目名称",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    created() {
        this.getThree();
    },
    mounted(){
    },
    methods: {
        handleClose(done) {
            done();
            // this.$refs[formName].resetFields();
        },
        // 删除
        delCategory(code) {
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/goods/type/delete",
                    qs.stringify({
                        questionCode: sessionStorage.getItem("questionUUid"),
                        code: code
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.$message.success("删除成功！");
                        this.getThree();
                        this.formData.name = "";
                        this.formData.level = "";
                        this.formData.code = "";
                        // this.CategoryCode=''
                        // this.categoryDetail()
                    }else {
                        this.$message.error(res.data.msg)
                    }
                });
        },
        addSameLevel(tit) {
            if (this.data.length == 0) {
                this.dialogVisible = true;
            } else {
                
                if (!this.CategoryCode) {
                    return this.$message.error("请选择类目！");
                }
                this.dialogVisible = true;
            }

            this.categoryDetail();
            this.titleText = tit;
            this.backupsCode = this.formData1.code;

            if (tit == "新增同级类目") {
            } else if (tit == "新增下级类目") {
            }
            
        },
        updateSame(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    // console.log(this.formData);
                    if (this.formData1.level == 1) {
                        this.formData1.code = 0;
                    }
                    // console.log(this.formData1, "--");
                    this.$utils
                        .post(
                            this.reqApi.xinls + "/exam/goods/type/update",
                            qs.stringify(this.formData)
                        )
                        .then(res => {
                            if (res.data.code === "0000") {
                                this.$message.success("修改成功！！");
                                this.CategoryCode = "";
                                this.formData.name = "";
                                this.formData.level = "";
                                this.formData.code = "";
                                this.getThree();
                            }
                        });
                }
            });
        },
        sameLevel(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let code = this.formData1.code;
                    // if(this.data.length==0){

                    // }
                    if (this.titleText === "新增同级类目") {
                        if (this.formData1.level == 1||this.data.length==0) {
                            this.formData1.code = 0;
                        } else {
                            this.formData1.code = this.formData1.pcode;
                        }
                    } 
                   
                    

                    // else {
                    //     this.formData1.code=code
                    // }
                    // if (this.titleText === "新增下级类目") {
                    //     console.log("********");
                    // }
                    // return;
                    this.$utils
                        .post(
                            this.reqApi.xinls + "/exam/goods/type/add",
                            qs.stringify({
                                questionCode: sessionStorage.getItem(
                                    "questionUUid"
                                ),
                                pcode: this.formData1.code,
                                name: this.formData1.name
                            })
                        )
                        .then(res => {
                            if (res.data.code === "0000") {
                                this.$message.success("新增成功！");

                                this.dialogVisible = false;
                                this.formData1.code = "";
                                this.formData1.level = "";
                                this.formData1.name = "";
                                this.CategoryCode = "";
                                this.getThree();
                                // this.$refs.formData1.resetFields();//清空
                            } else {
                                this.$message.error(res.data.msg);
                            }
                        });
                }
            });
        },
        // 类目树
        getThree() {
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/goods/type/tree",
                    qs.stringify({
                        questionCode: sessionStorage.getItem("questionUUid")
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.data = res.data.data;
                    }
                });
        },
        handleNodeClick(data) {
            // 类目编号
            this.CategoryCode = data.code;
            this.categoryDetail();
            if(data.level==3){
                this.disabled=true
            }else {
                this.disabled=false
            }
            // console.log(data);
            // this.formData.name = data.label;
            // this.formData.level = data.level;
            // this.formData.code = data.code;

            // //  this.formData1.name=data.label
            // this.formData1.level = data.level;
            // this.formData1.code = data.code;

            // console.log(this.formData, "form");
        },
        categoryDetail() {
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/goods/type/detail",
                    qs.stringify({
                        questionCode: sessionStorage.getItem("questionUUid"),
                        code: this.CategoryCode
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        // this.formData = res.data.data;
                        // this.formData1 = res.data.data;
                        // this.formData1.name=''

                        // console.log(res.data.data);
                        this.formData.name = res.data.data.name;
                        this.formData.level = res.data.data.level;
                        this.formData.code = res.data.data.code;
                        this.formData1.level = res.data.data.level;
                        this.formData1.code = res.data.data.code;
                        this.formData1.pcode = res.data.data.pcode;
                        // console.log(this.formData1, "this.formData1");
                        // console.log(this.formData, "this.formData");
                    }
                });
        }
        // getTreeList() {
        //     this.$utils
        //         .post(
        //             this.reqApi.shuiwuUrl1 + "/exam/goods/type/tree",
        //             qs.stringify({
        //                 questionCode: "1478524",
        //                 token: "aab01f234fcf933ff620618877ea327c"
        //             })
        //         )
        //         .then(res => {});
        // }
    },
    components: {
        basic
    }
};
</script>
<style scoped>
.fatherbox {
    display: flex;
    margin: 0 20px;
}
.leftBox {
    width: 268px;
    height: 628px;
    border: 1px solid #eee;
    /* background-color: yellow; */
}
.rightBox {
    flex: 1;
    /* background-color: pink; */
    margin-left: 10px;
    border: 1px solid #eee;
    padding: 20px 0 0 20px;
}
.CategoryBox {
    border: 1px solid #ccc;
    width: 500px;
    height: 450px;
    margin: 20px;
    border-radius: 10px;
    padding: 20px;
    margin-left: 0;
}
.inputkuang {
    width: 300px;
}
.btnBox33 {
    margin: 20px;
}
.formBox {
    box-sizing: border-box;
    padding: 20px;
}
</style>