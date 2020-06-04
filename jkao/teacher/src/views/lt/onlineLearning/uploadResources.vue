<template>
    <div id="uploadResources">
        <!-- <my-bread level1="资源库" level2 level3></my-bread> -->
        <h3 class="textTt">资源库</h3>
        <!-- <router-link to="/configuration"> -->
        <!-- <el-button class="backBtn" @>返回</el-button> -->
        <!-- </router-link> -->
        <div class="previousPage" @click="back">
            <img src="@/assets/images/returnbutton.png" />
        </div>
        <div class="outBox">
            <div class="left">
                <div class="titleStyl">{{title}}</div>
                <el-tree
                    :data="data1"
                    :highlight-current="true"
                    :default-expanded-keys="expandList"
                    :expand-on-click-node="false"
                    :props="defaultProps"
                    @node-click="handleNodeClick"
                >
                    <span class="custom-tree-node" slot-scope="{ node }">
                        <span :title="node.label" class="em-tree-text">{{ node.label}}</span>
                        <!-- <el-tooltip
                            :content="node.label"
                            :open-delay="200"
                            :enterable="false"
                            :hide-after="3000"
                            placement="top"
                            effect="light"
                        > -->
                            <!-- <span>{{ node.label}}</span> -->
                        <!-- </el-tooltip> -->
                    </span>
                </el-tree>
            </div>
            <div class="right">
                <div>
                    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                        <el-tab-pane label="课件资源" name="other">
                            <tabsContent
                                @getfileList="getfileList"
                                :activeName="activeName"
                                :textbook_uuid="textbook_uuid"
                                :part_id="part_id"
                                :videoInfos="data1"
                                :videoInfolist="videoInfolist"
                            ></tabsContent>
                        </el-tab-pane>
                        <el-tab-pane label="视频文件" name="video">
                            <tabsContent
                                @getfileList="getfileList"
                                :activeName="activeName"
                                :textbook_uuid="textbook_uuid"
                                :part_id="part_id"
                                :videoInfos="data1"
                                :videoInfolist="videoInfolist"
                            ></tabsContent>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import qs from "qs";
import tabsContent from "./tabsContent";
// import { teacherTree, getfileReq } from "@/api1/getEnvData";
export default {
    data() {
        return {
            tableData: [],
            videoInfolist: [],
            // fileFlag: false,
            activeName: "other",
            // button: true,

            fileList: [],
            textbook_uuid: "", //课程ID
            part_id: "", //章节目ID
            data1: [],
            defaultProps: {
                children: "children",
                label: "label"
            },
            msgFormSon: false,
            type: "",
            title: sessionStorage.getItem("cname"),
            expandList: []
        };
    },
    created() {
        this.getTree();
    },
    components: {
        tabsContent
    },
    methods: {
        back() {
            this.$router.push({
                name: "configuration",
                query: {
                    id: sessionStorage.getItem("paramsId")
                }
            });
        },
        getfileList(part_id, type) {
            // return
            if (!this.part_id) {
                return this.$message.error("请选择章节目");
            }
            if (this.activeName === "other") {
                this.type = 2;
            } else if (this.activeName === "video") {
                this.type = 1;
            }
            this.$utils
                .post(
                    this.reqApi.shuiwuUrl + "/textbook/getFile",
                    qs.stringify({
                        part_uuid: this.part_id,
                        file_type: this.type
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        if (res.data.coursewares) {
                            this.videoInfolist = res.data.coursewares;
                        } else {
                            this.videoInfolist = res.data.videos;
                        }

                        // console.log(res.data)
                    }
                });
            return;
            this.$axios({
                url: this.reqApi.ziyuankuUrl + "teacher/getfile",
                method: "POST",
                headers: { auth_token: sessionStorage.getItem("token") },
                data: qs.stringify({
                    part_id: this.part_id,
                    file_type: this.type
                })
            })
            .then(res => {
                if (res.data.code === 0) {
                    this.videoInfolist = res.data.data;
                } else if (res.data.code === 401 || res.data.code === 403) {
                    this.$message.error(res.data.msg);
                    this.$router.push("/register");
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        },
        handleNodeClick(data) {
            // return
            this.textbook_uuid = data.textbook_uuid;
            this.part_id = data.uuid;
            this.videoInfoslist = data.coursewaress;
            this.getfileList();
        },
        handleClick(tab, event) {
            this.getfileList();
        },
        getTree() {
            this.$utils
                .post(
                    this.reqApi.shuiwuUrl + "/textbook/detail",
                    qs.stringify({
                        textbook_uuid: this.$route.query.id
                    })
                )
                .then(res => {
                    if (res.data.code == "0000") {
                        this.data1 = res.data.parts;
                    }
                });

            return;
            this.$axios({
                url: this.reqApi.ziyuankuUrl + "teacher/catalog/tree",
                method: "POST",
                headers: { auth_token: sessionStorage.getItem("token") },
                data: qs.stringify({
                    textbook_uuid: this.$route.query.id
                })
            }).then(res => {
                if (res.data.code === 0) {
                    this.data1 = res.data.data.course_part_infos;
                } else if (res.data.code === 401 || res.data.code === 403) {
                    this.$message.error(res.data.msg);
                    this.$router.push("/register");
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        }
        // async getTree() {

        //     const res = await teacherTree(
        //         qs.stringify({
        //             textbook_uuid: this.$route.query.id
        //         })
        //     );
        //     if (res.data.code === 0) {
        //         this.data1 = res.data.data.course_part_infos;
        //     }else{
        //         this.$message.error(res.data.msg)
        //     }

        // },
    }
};
</script>
<style scoped>
#uploadResources {
    /* width: 50%; */

    background-color: #fff;
    position: relative;
    padding-left: 20px;
    padding-top: 20px;
}
.outBox {
    display: flex;
    flex-direction: row;
    height: 700px;
}
#uploadResources .left {
    /* position: absolute; */
    width: 300px;
    height: 100%;
    border: 1px solid #c2cad8;
    /* background-color: pink; */
    display: inline-block;
    margin-right: 12px;
    box-sizing: border-box;
    overflow: hidden;
}
#uploadResources .right {
    width: 750px;
    /* 660px */
    height: 100%;
    display: inline-block;
    border: 1px solid #c2cad8;
    box-sizing: border-box;
}
.del {
    color: #fe0000;
    font-size: 12px;
    margin-left: 25px;
}
.displayBlack {
    display: inline-block;
}
.nameInput {
    width: 200px;
    margin-left: 10px;
    margin-right: 20px;
}
.titleStyl {
    width: 100%;
    background-color: #3ec9dd;
    color: #fff;
    font-weight: 700;
    line-height: 35px;
    text-align: center;
}
.textTt {
    color: #444;
    font-size: 16px;
    padding: 0;
}
.backBtn {
    position: absolute;
    right: 20px;
    top: 20px;
}
.custom-tree-node {
flex: 1;
/* display: flex; */
/* align-items: center; */
/* justify-content: space-between; */
/* font-size: 12px; */
padding-right: 4px;
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
width: 100%;
}
/* .wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
}
.item {
    width: 300px;
    height: 50px;
    background-color: #42b983;
    color: #ffffff;
} */
</style>