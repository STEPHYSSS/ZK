<template>
    <el-card shadow="never" class="box-card curriculumsTable_teacher">
        <h3>配置章节目</h3>
        <!-- <previous-page @click="back"></previous-page> -->
        <div class="previousPage" @click="back">
            <img src="@/assets/images/returnbutton.png" />
        </div>
        <div>
            <el-button type="primary" size="mini" @click="addContent" class="addChapter">添加章</el-button>
        </div>
        <div class="zhangjiemu">
            <div class="treeBox">
                <el-tree
                    :data="data"
                    node-key="id"
                    default-expand-all
                    :expand-on-click-node="false"
                >
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <el-tooltip
                            :content="node.label"
                            :open-delay="200"
                            :enterable="false"
                            :hide-after="3000"
                            placement="top"
                            effect="light"
                        >
                            <span class="nodeContent">{{ node.label }}</span>
                        </el-tooltip>
                        <span>
                            <span @click="addNode(data)" class="btnStyleBox" v-if="data.type!=3">
                                <img
                                    class="iconStyle"
                                    src="@/assets/images/addTeacher_red.png"
                                    alt="新增"
                                />
                                新增
                            </span>
                            <span @click="updateNode(data)" class="btnStyleBox">
                                <img
                                    class="iconStyle"
                                    src="@/assets/images/amendTeacher_Red.png"
                                    alt="修改"
                                />
                                修改
                            </span>
                            <span @click="removeNode(data)" class="btnStyleBox">
                                <img
                                    class="iconStyle"
                                    src="@/assets/images/removeTeacher_red.png"
                                    alt="删除"
                                />
                                删除
                            </span>
                            <!-- <el-button type="text" size="mini" >新增</el-button> -->
                            <!-- <el-button type="text" size="mini" @click="updateNode">修改</el-button>
                            <el-button type="text" size="mini" @click="removeNode">删除</el-button>-->
                        </span>
                    </span>
                </el-tree>
            </div>
        </div>
        <!-- 添加章 -->
        <el-dialog title="提示" :visible.sync="dialogVisible" width="400px">
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-form-item label="章名" prop="name">
                    <el-input
                        maxlength="100"
                        style="width:200px"
                        v-model="ruleForm.name"
                        placeholder="请输入章名"
                    ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button class="search search-btn" @click="addChapter">确 定</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
        <!-- 添加 -->
        <el-dialog title="提示" :visible.sync="jie" width="400px">
            <el-form
                :model="jieData"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-form-item :label="label" prop="name">
                    <el-input
                        maxlength="100"
                        style="width:200px"
                        v-model="jieData.name"
                        placeholder="请输入"
                    ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button class="search search-btn" @click="addJie">确 定</el-button>
                <el-button @click="jie = false">取 消</el-button>
            </span>
        </el-dialog>
        <!-- 修改 -->
        <el-dialog title="提示" :visible.sync="update" width="400px">
            <el-form
                :model="updateData"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-form-item :label="label" prop="name">
                    <el-input
                        maxlength="100"
                        style="width:200px"
                        v-model="updateData.name"
                        placeholder="请输入"
                    ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button class="search search-btn" @click="upDateNodeData">确 定</el-button>
                <el-button @click="update = false">取 消</el-button>
            </span>
        </el-dialog>
        <!-- 删除-->
        <el-dialog title="提示" :visible.sync="delDialog" width="400px">
            <div style="text-align:center;height:60px">
                <span>确定删除？</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button class="search search-btn" @click="del">确 定</el-button>
                <el-button @click="delDialog = false">取 消</el-button>
            </span>
        </el-dialog>
        <!-- 删除 -->
    </el-card>
</template>
<script>
import qs from "qs";
import previousPage from "@/components/previousPage.vue";
export default {
    data() {
        return {
            label: "节名",
            dialogVisible: false,
            jie: false,
            update: false,
            delDialog: false,
            ruleForm: {
                name: ""
            },
            jieData: {
                name: ""
            },
            updateData: {
                name: ""
            },
            data: [],
            part: {},
            part_uuid: "",
            rules: {
                name: [
                    { required: true, message: "请输入章名", trigger: "change" }
                ]
            }
        };
    },
    created() {
        if (this.$route.query.uuid) {
            this.getChapterSectionCatalogue();
        }
    },
    components: {
        "previous-page": previousPage
    },
    methods: {
        back() {
            this.$router.push({
                name: "configuration",
                query: {
                    id: this.$route.query.id
                }
            });
        },
        // 删除
        del() {
            this.$utils
                .post(
                    this.reqApi.shuiwuUrl + "/textbook/deletePart",
                    qs.stringify({
                        part_uuid: this.part_uuid
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.delDialog = false;
                        this.getChapterSectionCatalogue();
                    } else {
                        return this.$message.error(res.data.msg);
                    }
                });
        },
        //增加目
        addMu() {},
        // 增加节
        addJie() {
            this.part.name = this.jieData.name;
            this.$utils
                .post(
                    this.reqApi.shuiwuUrl + "/textbook/createPart",
                    qs.stringify({
                        part: JSON.stringify(this.part)
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.jie = false;
                        this.getChapterSectionCatalogue();
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });
        },
        addNode(node) {
            if (node.type == 2) {
                this.label = "目名";
            }
            this.jie = true;
            this.part = {
                textbook_uuid: this.$route.query.uuid,
                name: "",
                type: node.type + 1,
                upper_id: node.uuid,
                status: 1,
                shared: 1
            };
        },
        // 修改节
        updateNode(node) {
            if (node.type == 1) {
                this.label = "章名";
            } else if (node.type == 2) {
                this.label = "节名";
            } else {
                this.label = "目名";
            }
            this.part = {
                textbook_uuid: this.$route.query.uuid,
                name: "",
                type: node.type,
                upper_id: node.upper_id,
                uuid: node.uuid,
                status: 1,
                shared: 1
            };
            this.update = true;
            this.updateData.name = node.label;
        },
        upDateNodeData() {
            this.part.name = this.updateData.name;
            // returns
            this.$utils
                .post(
                    this.reqApi.shuiwuUrl + "/textbook/updatePart",
                    qs.stringify({
                        part: JSON.stringify(this.part)
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.update = false;
                        this.getChapterSectionCatalogue();
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });
        },
        // 删除
        removeNode(node) {
            this.delDialog = true;
            this.part_uuid = node.uuid;
        },
        // 添加章
        addChapter() {
            let part = {
                textbook_uuid: this.$route.query.uuid,
                name: this.ruleForm.name,
                type: 1,
                upper_id: 0,
                status: 1,
                shared: 1
            };
            this.$utils
                .post(
                    this.reqApi.shuiwuUrl + "/textbook/createPart",
                    qs.stringify({
                        part: JSON.stringify(part)
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.dialogVisible = false;
                        this.getChapterSectionCatalogue();
                    }
                });
        },
        addContent() {
            this.dialogVisible = true;
        },
        //获取章节目
        getChapterSectionCatalogue() {
            const that = this;
            that.$utils
                .post(
                    that.reqApi.shuiwuUrl + "/textbook/detail",
                    qs.stringify({
                        textbook_uuid: that.$route.query.uuid
                    })
                )
                .then(res => {
                    const { code, msg, parts } = res.data;
                    if (code == "0000") {
                        that.data = parts;
                    } else {
                        that.$message(msg);
                    }
                });
        }
    }
};
</script>
<style scoped>
.zhangjiemu {
    width: 90%;
    margin: 0 auto;
    background-color: #eee;
}
.btnStyleBox {
    display: inline-block;
    margin-right: 30px;
}
.iconStyle {
    width: 13px;
    vertical-align: text-bottom;
}
.nodeContent {
    width: 800px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
