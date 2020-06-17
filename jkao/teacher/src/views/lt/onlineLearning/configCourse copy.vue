<template>
    <el-card shadow="never" class="box-card curriculumsTable_teacher">
        <!-- <my-bread2 level1="课程列表" level2="配置"></my-bread2> -->
        <h3>配置章节目</h3>
        <!-- <router-link to="/courseList">
            <el-button class="backBtn">返回</el-button>
        </router-link> -->
        <previous-page goPreviousPage="/configuration"></previous-page>
        <!-- <h3 class="text-center">{{object.cname}}</h3>
        <div class="text-center">配置章节目</div> -->

        <div>
            <el-button type="primary" size="mini" @click="addContent" class="addChapter">添加章</el-button>
            <el-tree
                :data="data"
                node-key="uuid"
                default-expand-all
                :expand-on-click-node="false"
            >
                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span>{{ data.label }}</span>
                    <span>
                        <el-button
                            class="chapterSectionCatalogue Chapter"
                            type="text"
                            size="mini"
                            v-if="node.level==1||node.level==2"
                            @click="() => addChild(node,data)">
                            <img src="@/assets/images/addTeacher_red.png" alt="新增" />
                            添加
                        </el-button>
                        <el-button
                            class="chapterSectionCatalogue Section"
                            type="text"
                            size="mini"
                            @click="() => modify(node, data)">
                            <img src="@/assets/images/amendTeacher_Red.png" alt="修改" />
                            修改
                        </el-button>
                        <el-button
                            class="chapterSectionCatalogue Catalogue"
                            type="text"
                            size="mini"
                            @click="() => remove(node, data)">
                            <img src="@/assets/images/removeTeacher_red.png" alt="删除" />
                            删除
                        </el-button>
                    </span>
                </span>
            </el-tree>
        </div>
    </el-card>
</template>

<script>
import qs from "qs";
import previousPage from "@/components/previousPage.vue";
export default {
    data() {
        return {
            addfou: false,
            chapterId: "",
            sectionId: "",
            directoryId: "",
            dialogVisibleData1: false,
            dialogVisibleData2: false,
            dialogVisibleData3: false,
            object: [],
            chapterList: [],
            sectionList: [],
            directoryList: [],
            chapterIdList: {},
            sectionIdList: {},
            directoryIdList: {},
            //树状结构
            data: []
        };
    },

    created() {
        if (this.$route.query.uuid) {
            // this.getCourse();
            this.getChapterSectionCatalogue();
        }
    },

    components: {
        "previous-page": previousPage
    },

    methods: {
        goBack(){
            this.$router.push({
                name:'courseList',
                query:{
                    id:this.$route.query.id
                }
            })
        },
        getCourse() {
            const that = this;
            that.$utils.post(`exam/course/findOneCourse/${that.$route.query.id}`)
                .then(res => {
                    const { code, object } = res.data;
                    if (code === "00") {
                        that.object = object;
                        that.getChapter(object.cid);
                    }
                });
        },

        //获取章节目
        getChapterSectionCatalogue() {
            const that = this;
            that.$utils.post(that.reqApi.shuiwuUrl + "/textbook/detail", qs.stringify({
                    textbook_uuid: that.$route.query.uuid,
                    })
                  ).then(res => {
                    const {code, msg, parts} = res.data
                    if (code == "0000") {
                      that.data = parts
                    }else{
                    that.$message(msg)
                    } 
                  });
        },

        //添加章
        addContent() {
            // 添加一个章节
            this.$prompt("请输入章名", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
            }).then(({ value }) => {
              let part =  {
                      textbook_uuid: this.$route.query.uuid,
                      name: value,
                      type: 1,
                      upper_id: 0,
                      status: 1,
                      shared: 1,
                    }
                this.$utils.post(this.reqApi.shuiwuUrl + "/textbook/createPart", qs.stringify({
                  part: JSON.stringify(part)
                  })
                ).then(res => {
                  const {code, msg} = res.data
                  if (code == "0000") {
                    this.$message.success('添加成功')
                    this.getChapterSectionCatalogue()
                  }else{
                   this.$message(msg)
                  } 
                });
            });
        },


        // 增加子节点
        addChild(node, data) {
            let promptMsg = node.level == 2 ? "请输入目名" : "请输入节名";
            this.$prompt(promptMsg, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
            }).then(({ value }) => {
              let part =  {
                      textbook_uuid: this.$route.query.uuid,
                      name: value,
                      type: node.level == 2 ? 3 : 2,
                      upper_id: node.data.uuid,
                      status: 1,
                      shared: 1,
                    }
              this.$utils.post(this.reqApi.shuiwuUrl + "/textbook/createPart", qs.stringify({
                  part: JSON.stringify(part)
                  })
                ).then(res => {
                  const {code, msg} = res.data
                  if (code == "0000") {
                    this.$message.success('添加成功')
                    this.getChapterSectionCatalogue()
                  }else{
                   this.$message(msg)
                  } 
                });
            });
        },

        //修改
        modify(node, data) {
            // console.log(data);
            
            this.$nextTick(() => {
                document.querySelector('.el-input__inner').value = data.label
            })
            const msgMap = {
                "1": "请输入章名",
                "2": "请输入节名",
                "3": "请输入目名"
            };
            // 修改自己
            this.$prompt(msgMap[node.level], "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
            }).then(({ value }) => {
                let part =  {
                  uuid: data.uuid,
                  textbook_uuid: this.$route.query.uuid,
                  name: value,
                  type: data.type,
                  upper_id: data.upper_id,
                  status: 1,
                  shared: 1,
                }
                this.$utils.post(this.reqApi.shuiwuUrl + "/textbook/updatePart", qs.stringify({
                  part: JSON.stringify(part)
                  })
                ).then(res => {
                  const {code, msg} = res.data
                  if (code == "0000") {
                    this.$message.success('添加成功')
                    this.getChapterSectionCatalogue()
                  }else{
                   this.$message(msg)
                  } 
                });
            }).catch();
        },

        //删除
        remove(node, data) {
            this.$confirm("确认删除?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
            }).then(() => {
                    this.$utils.post(this.reqApi.shuiwuUrl + "/textbook/deletePart", qs.stringify({
                         part_uuid: data.uuid
                    })).then(res => {
                        const {code, msg} = res.data
                        if (code == "0000") {
                            this.$message.success('添加成功')
                            this.getChapterSectionCatalogue()
                        }else{
                            this.$message(msg)
                        } 
                    });
                }).catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },

        getChapter(cid) {
            const that = this;
            that.$utils.post(`exam/course/findCourseChapter/${cid}`)
                .then(res => {
                    const { code, list } = res.data;
                    if (code === "00") {
                        that.chapterList = list;
                        that.sectionList = [];
                        that.directoryList = [];
                        that.chapterId = "";
                        that.sectionId = "";
                        that.directoryId = "";
                    }
                });
        },

        // 关闭
        handleClose() {
            this.dialogVisibleData1 = false;
            this.dialogVisibleData2 = false;
            this.dialogVisibleData3 = false;
        }
    }
};
</script>

<style scoped>
.line {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    padding: 20px 20px;
    margin-top: 20px;
}

h3{
    padding-top: 20px;
}

/* 头部表格 */
.add-course table {
    border-color: #c2cad8;
    border-collapse: collapse;
    border: 1px solid #c2cad8;
    color: #777;
    margin-bottom: 20px;
}
.add-course table tbody tr td {
    padding: 0px 15px;
}
.add-course table tbody tr .one-td {
    background-color: #a8e7f0;
    width: 100px;
}
.add-course table tbody tr .two-td {
    width: 38%;
}
.add-course table tbody tr .three-td {
    width: 33.8%;
}

/* 数据分析身体 */
.analyzeBody {
    padding: 30px;
}
.analyzeBody table {
    border-color: #e4e9ec;
    border-collapse: collapse;
    border: 1px solid #e4e9ec;
}
.analyzeBody tr td:nth-child(1) {
    white-space: nowrap;
    padding: 3px 20px;
    background-color: #d7f8fc;
}
.analyzeBody tr td:nth-child(2) {
    width: 100%;
    padding-left: 10px;
}
/* 数据分析头部 */
.analyzeHead {
    padding: 10px 20px;
    background-color: #54c8de;
    color: #fff;
    font-size: 16px;
}
.analyzeHead img {
    width: 25px;
    height: 25px;
    vertical-align: top;
}
.analyzeHead a {
    padding-top: 3px;
    font-size: 20px;
    color: #fff;
    font-weight: 700;
}
.analyzeHead span:nth-child(3) {
    font-size: 24px;
    color: #fff;
    font-weight: 700;
}
.backBtn {
    position: absolute;
    right: 20px;
    top: 20px;
}
.box-card {
    position: relative;
}
.el-button {
    padding: 5px 18px;
}

.curriculumsTable_teacher .el-message-box__input{
    width: 150px !important;
    margin: 0 auto !important;
}

.curriculumsTable_teacher .el-message-box__content{
    padding: 10px 0 !important;
}
</style>
