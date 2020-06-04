<template>
    <div class="contWidth" id="tabsContent">
        <div style="margin-bottom:15px">
            <el-button v-show="button" @click="showuploadBox">上传</el-button>
            <el-button v-show="button" @click="editBtn">编辑</el-button>
        </div>
        <!-- 上传的盒子 -->
        <div class="fileListBox" v-show="uploadBox">
            <upload ref="uploadres" :activeName="activeName" @func="getMsgFormSon"></upload>

            <!-- <div v-for="(item,index) in test" :key="index" class="item">
                        <p>{{item}}</p>
            </div>-->
            <div
                v-show="flagFile"
                v-for="(item,index) in coursewareFile.coursewareList"
                :key="index + 'a'"
                class="draggableBox"
            >
                <span class="textstyle1">{{item.courseware_editName}}</span>

                <el-input
                    v-model="item.courseware_name"
                    placeholder="文件名，必填"
                    class="displayBlack nameInput"
                ></el-input>下载
                <el-switch
                    v-model="item.courseware_download"
                    active-color="#13ce66"
                    inactive-color="#eee"
                    :active-value="1"
                    :inactive-value="2"
                ></el-switch>
                <span class="del" @click="del1(index,item.courseware_id)">删除</span>
            </div>
            <div class="btnBox">
                <el-button @click="preservation">保存</el-button>
                <el-button @click="quxiao">取消</el-button>
            </div>
        </div>
        <!-- 编辑的盒子 -->
        <div class="fileListBox" v-show="editBox">
            <span class="tipText">提示：拖拽文件可以进行排序</span>
            <!-- <upload v-model="showUpload" @func="getMsgFormSon"></upload> -->
            <div class="draggableBox">
                <draggable class="wrapper" v-model="tableData">
                    <transition-group>
                        <!-- <div v-for="(item,index) in test" :key="index" class="item">
                        <p>{{item}}</p>
                        </div>-->
                        <!-- <el-table :data="tableData" style="width: 100%">
                            <el-table-column prop="courseware_editName" label="文件名称" width="180"></el-table-column>
                            <el-table-column  width="180">
                                <template scope="scope">
                                   <el-input v-model="scope.row.courseware_name"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="address" label="地址">

                            </el-table-column>
                        </el-table>-->
                        <div v-for="(item,index) in tableData" :key="index + 'b'" class="rowList">
                            <template v-if="item.courseware_valid == 1">
                                <span class="textstyle1">{{item.courseware_editName}}</span>

                                <el-input
                                    v-model="item.courseware_name"
                                    placeholder="文件名，必填"
                                    class="displayBlack nameInput"
                                ></el-input>下载
                                <el-switch
                                    v-model="item.courseware_download"
                                    active-color="#13ce66"
                                    :active-value="1"
                                    :inactive-value="2"
                                    inactive-color="#eee"
                                ></el-switch>
                                <!-- <span class="del" @click="del(index,item.courseware_id)">删除</span> -->
                                <span class="del" @click="item.courseware_valid = 2">删除</span>
                            </template>
                        </div>
                    </transition-group>
                </draggable>
            </div>

            <div class="btnBox">
                <el-button @click="preservation1">保存</el-button>
                <el-button @click="quxiao">取消</el-button>
            </div>
        </div>
        <el-table
            v-if="activeName==='other'&&showTable"
            :data="videoInfolist"
            style="width: 100%"
            border
            max-height="591px"
        >
            <el-table-column type="index" label="序号" width="50" align="center">
                <template slot-scope="{row,$index}">
                    <span>{{$index+1}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="courseware_name" label="文件名" align="center"></el-table-column>
            <el-table-column prop="courseware_format" label="文件类型" width="120" align="center"></el-table-column>
            <el-table-column label="是否下载" align="center" width="120">
                <template slot-scope="scope">
                    <span>{{scope.row.courseware_download|filterDowlond}}</span>
                </template>
            </el-table-column>
            <el-table-column label="预览" width="120" align="center">
                <template slot-scope="scope">
                    <img
                        src="@/assets/images/chakan_icon.png"
                        class="cursor"
                        @click="showFile(scope.row)"
                        title="预览"
                    />
                </template>
            </el-table-column>
        </el-table>
        <el-table
            v-if="activeName==='video'&&videoTable"
            :data="videoInfolist"
            style="width: 100%"
            border
            max-height="591px"
        >
            <el-table-column type="index" label="序号" width="50" align="center">
                <template slot-scope="{row,$index}">
                    <span>{{$index+1}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="video_name" label="文件名" align="center"></el-table-column>
            <el-table-column prop="video_format" label="文件类型" width="120" align="center"></el-table-column>
            <el-table-column label="是否下载" align="center" width="120">
                <template slot-scope="scope">
                    <span>{{scope.row.video_download|filterDowlond}}</span>
                </template>
            </el-table-column>
            <el-table-column label="预览" width="120" align="center">
                <template slot-scope="scope">
                    <img
                        src="@/assets/images/chakan_icon.png"
                        class="cursor"
                        ref="btn"
                        @click="showFile(scope.row)"
                        title="预览"
                    />
                </template>
                <!-- <img src="@/assets/images/chakan_icon.png" title="预览" class="cursor" /> -->
            </el-table-column>
        </el-table>
        <el-dialog class="dialogStyle" :title="title" :visible.sync="dialogVisible" width="80%" :modal="false" center style="margin-top:9vh">
            <!-- <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>-->
            <!-- <iframe
            src="http://www.seekerp.com/"
            frameborder="0"
            height="800px"
            width="100%"
            ></iframe>-->
            <div class="videoBox">
                <iframe v-show="fileBox" id="framePage" :src="fileUrl" frameborder="0" ></iframe>
                <!-- <a :href="fileUrl" target="_parent"></a> -->
            </div>
            <!-- <iframe
            v-show="videoBox"
            :src="fileUrl"
            frameborder="0"
            height="1000px"
            width="100%"
            ></iframe>-->
        </el-dialog>
        <el-dialog
            :title="title"
            :visible.sync="dialogVisible1"
            @close="closeDialog"
            width="900px"
            center
            :modal="false"
            style="margin-top:9vh"
            :destroy-on-close="true"
        >
            <!-- <video
                src="http://192.168.1.120:8081/6d82492df3cc81a7c4d4cfc0ff92b5f7.mp4"
                class="avatar video-avatar"
                controls="controls"
               ref="dialogVideo"
                autoplay=”autoplay”
                v-show="videoBox"
            >您的浏览器不支持视频播放</video>-->
            <div class="videoBox1">
                <video
                    :src="videoUrl"
                    class="avatar video-avatar"
                    controls="controls"
                    ref="dialogVideo"
                >您的浏览器不支持视频播放</video>
            </div>

            <!-- <video
                src="http://192.168.1.120:8081/6d82492df3cc81a7c4d4cfc0ff92b5f7.mp4"
                controls="controls"
            >your browser does not support the video tag</video>-->
            <!-- <video-player
                ref="videoPlayer"
                class="video-player vjs-custom-skin avatar video-avatar"
                :playsinline="true"
                :options="playerOptions"
                @play="onPlayerPlay($event)"
                @pause="onPlayerPause($event)"
            /> -->
        </el-dialog>
    </div>
</template>
<script>
import draggable from "vuedraggable";
// import Mock from "mockjs";
import upload from "./assemblyUpload.vue";
// import {
//     uploadreq,
//     resureDel,
//     teacherOrder,
//     videoReq,
//     orderReq,
//     videoDel,
//     getfileReq
// } from "@/api1/getEnvData.js";
import qs from "qs";
export default {
    data() {
        return {
            button: true,
            uploadBox: false,
            editBox: false,
            showUpload: true,
            showTable: true,
            value: false,
            flagFile: false,
            tableData: [],
            fileList: [],
            list: [],
            delList: [],
            backupsData: [],
            videoTable: true,
            type: "",
            fileUrl: "",
            videoUrl: "",
            title: "",
            test: [
                // { id: 1, name: "张三" },
                // { id: 2, name: "李四" },
                // { id: 3, name: "小六" },
                // { id: 4, name: "王五" }
            ],
            coursewareFile: {
                coursewareList: [],
                textbook_uuid: this.$route.query.id,
                part_id: ""
            },
            dialogVisible: false,
            dialogVisible1: false,
            videoBox: false,
            fileBox: false,
            //播放器
            playerOptions: {
                playbackRates: [0.7, 1.0,1.25, 1.5, 2.0], //播放速度
                autoplay: false, // 如果true,浏览器准备好时开始回放。
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 导致视频一结束就重新开始。
                controls: true,
                preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: "zh-CN",
                aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: {
                    type: "video/mp4", // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                    // src:
                    //     "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm" // url地址
                    src:''
                        // "http://192.168.1.120:8081/6d82492df3cc81a7c4d4cfc0ff92b5f7.mp4"
                },
                hls: true,
                // poster:
                //     "http://pic33.nipic.com/20131007/13639685_123501617185_2.jpg", // 你的封面地址
                // width: document.documentElement.clientWidth, // 播放器宽度
                notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar: {
                    timeDivider: true,
                    durationDisplay: true,
                    remainingTimeDisplay: false,
                    fullscreenToggle: true // 全屏按钮
                }
            }
        };
    },
    created() {},
    props: [
        "activeName",
        "part_id",
        "textbook_uuid",
        "videoInfos",
        "videoInfolist"
    ],
    computed: {
        player() {
            return this.$refs.videoPlayer.player; //自定义播放
        }
    },
    methods: {
        //播放器
        onPlayerPlay(){},
        onPlayerPause(){},
        //------
        closeDialog() {
            this.videoBox = false;
            this.videoUrl = "";
            //         if (this.$refs.dialogVideo.paused) {
            //     this.$refs.dialogVideo.play();
            //   } else {
            //     this.$refs.dialogVideo.pause();
            //   }
        },
        showuploadBox() {
            // if (!this.part_id) {
            //     return this.$message.error("请选择章节目");
            // }
            this.button = false;
            this.uploadBox = true;
            this.showTable = false;
            this.videoTable = false;
        },
        quxiao() {
            this.uploadBox = false;
            this.button = true;
            this.editBox = false;
            this.showTable = true;
            this.videoTable = true;
        },
        quxiao1() {},
        // 预览文件
        showFile(row) {
            var url = "http://192.168.1.120:8081";
            if (this.activeName === "other") {
                this.title = row.courseware_name;
                this.dialogVisible = true;
                this.fileBox = true;
                // this.fileUrl =
                //     "http://192.168.1.120:8012/onlinePreview?url=" +
                //     encodeURIComponent(url + row.courseware_url);
                this.fileUrl =
                    // this.reqApi.fileyulan +
                    // "/onlinePreview?url=" +
                        this.reqApi.fileUpload + row.courseware_url
            } else if (this.activeName === "video") {
                this.title = row.video_name;
                this.dialogVisible1 = true;
                this.videoBox = true;
                // this.videoUrl = url + row.video_url;
                this.videoUrl = this.reqApi.fileUpload + row.video_url;
                // this.playerOptions.sources.src=this.reqApi.fileUpload + row.video_url;
                // this.fileUrl =
                //     "http://192.168.1.120:8012/onlinePreview?url=" +
                //     encodeURIComponent(url + row.video_url);
                //  this.playerOptions.sources.src ='http://192.168.1.120:8081/6d82492df3cc81a7c4d4cfc0ff92b5f7.mp4'
                // "http://192.168.1.120:8012/onlinePreview?url=" +
                // encodeURIComponent(url + row.video_url);
                // this.playerOptions.sources.src="http://192.168.1.120:8012/onlinePreview?url=" +encodeURIComponent(url + row.video_url);"
            }

            // window.open('http://192.168.1.120:8012/38aade6082398fffd758eca94e1d2480.pdf', "_blank");
            // window.open('http://192.168.1.120:8082/'+'38aade6082398fffd758eca94e1d2480.pdf', "_blank");
            // let url = "http://192.168.1.120:8081/04f60bd532867f5b404f8aaf8d83be70.mp4";
            // window.open('http://192.168.1.120:8012/onlinePreview?url='+encodeURIComponent(url+el.courseware_url));
            // window.localStorage.setItem("pdf", JSON.stringify(el));
        },
        preservation() {
            if (!this.textbook_uuid && !this.part_id) {
                return this.$message({
                    message: "请选择章节",
                    type: "warning"
                });
            }
            if (this.coursewareFile.coursewareList.length == 0) {
                return this.$message({
                    message: "请选择文件",
                    type: "warning"
                });
            }
            // this.uploadBox = false;
            // this.button = true;
            if (this.activeName === "other") {
                this.coursewareFile.coursewareList = this.coursewareFile.coursewareList.map(
                    item => {
                        return {
                            courseware_name: item.courseware_name,
                            courseware_format: item.courseware_format,
                            courseware_url: item.courseware_url,
                            courseware_size: item.courseware_size,
                            courseware_download: item.courseware_download
                        };
                    }
                );
                this.$utils.post(this.reqApi.shuiwuUrl+'/courseware/upload',qs.stringify({
                    textbook_uuid:this.textbook_uuid,
                    part_id:this.part_id,
                    coursewares:JSON.stringify(
                            this.coursewareFile.coursewareList
                        )
                })).then(res=>{
                    if(res.data.code==='0000'){
                        this.$message({
                            message: "上传成功",
                            type: "success"
                        });
                        this.uploadBox = false;
                        this.button = true;
                        this.$refs.uploadres.fileList = [];
                        this.coursewareFile.coursewareList = [];
                        
                        if (this.activeName === "other") {
                            this.type = 2;
                        } else if (this.activeName === "video") {
                            this.type = 1;
                        }
                        this.$emit(
                            "getfileList",
                            this.part_id,
                            this.type
                        );
                        this.showTable = true;
                    }
                })
                return
                this.$axios({
                    url: this.reqApi.ziyuankuUrl + "teacher/courseware/upload",
                    method: "POST",
                    headers: { auth_token: sessionStorage.getItem("token") },
                    data: qs.stringify({
                        textbook_uuid: this.textbook_uuid,
                        part_id: this.part_id,
                        courseware_info: JSON.stringify(
                            this.coursewareFile.coursewareList
                        )
                    })
                }).then(res => {
                    if (res.data.code === 0) {
                        this.$message({
                            message: "上传成功",
                            type: "success"
                        });
                        this.uploadBox = false;
                        this.button = true;
                        this.$refs.uploadres.fileList = [];
                        this.coursewareFile.coursewareList = [];

                        if (this.activeName === "other") {
                            this.type = 2;
                        } else if (this.activeName === "video") {
                            this.type = 1;
                        }
                        this.$emit(
                            "getfileList",
                            this.part_id,
                            this.type
                        );
                        this.showTable = true;
                    } else if (res.data.code === 401 || res.data.code === 403) {
                        this.$message.error(res.data.msg);
                        this.$router.push("/register");
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });
                // const res = await uploadreq(
                //     qs.stringify({
                //         textbook_uuid: this.textbook_uuid,
                //         part_id: this.part_id,
                //         courseware_info: JSON.stringify(
                //             this.coursewareFile.coursewareList
                //         )
                //     })
                // );
                // this.reqM4Service('teacher/courseware/upload', qs.stringify({
                //         textbook_uuid: this.textbook_uuid,
                //         part_id: this.part_id,
                //         courseware_info: JSON.stringify(
                //             this.coursewareFile.coursewareList
                //         )
                //     })).then(res=>{

                //  })
            } else if (this.activeName === "video") {
                this.coursewareFile.coursewareList = this.coursewareFile.coursewareList.map(
                    item => {
                        return {
                            video_name: item.courseware_name,
                            video_format: item.courseware_format,
                            video_url: item.courseware_url,
                            video_size: item.courseware_size,
                            video_download: item.courseware_download
                        };
                    }
                );
               this.$utils.post(this.reqApi.shuiwuUrl+'/video/upload',qs.stringify({
                   videos:JSON.stringify(
                            this.coursewareFile.coursewareList
                        ),
                   textbook_uuid:this.textbook_uuid,
                   part_id:this.part_id
               })).then(res=>{
                   if(res.data.code==='0000'){
                        this.$message({
                            message: "上传成功",
                            type: "success"
                        });
                        this.uploadBox = false;
                        this.button = true;
                        this.$refs.uploadres.fileList = [];
                        this.coursewareFile.coursewareList = [];
                        if (this.activeName === "other") {
                            this.type = 2;
                        } else if (this.activeName === "video") {
                            this.type = 1;
                        }
                        this.$emit(
                            "getfileList",
                            this.part_id,
                            this.type
                        );
                        this.videoTable = true;
                   }else {
                       this.$message.error(res.data.msg)
                   }
               })
                return 
                this.$axios({
                    url: this.reqApi.ziyuankuUrl + "teacher/video/upload",
                    method: "POST",
                    headers: { auth_token: sessionStorage.getItem("token") },
                    data: qs.stringify({
                        textbook_uuid: this.textbook_uuid,
                        part_id: this.part_id,
                        video_info: JSON.stringify(
                            this.coursewareFile.coursewareList
                        )
                    })
                }).then(res => {
                    if (res.data.code === 0) {
                        this.$message({
                            message: "上传成功",
                            type: "success"
                        });
                        this.uploadBox = false;
                        this.button = true;
                        // this.coursewareFile.coursewareList = [];
                        this.$refs.uploadres.fileList = [];
                        this.coursewareFile.coursewareList = [];
                        if (this.activeName === "other") {
                            this.type = 2;
                        } else if (this.activeName === "video") {
                            this.type = 1;
                        }
                        this.$emit(
                            "getfileList",
                            this.part_id,
                            this.type
                        );
                        this.videoTable = true;
                    } else if (res.data.code === 401 || res.data.code === 403) {
                        this.$message.error(res.data.msg);
                        this.$router.push("/register");
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });
                // const res = await videoReq(
                //     qs.stringify({
                //         textbook_uuid: this.textbook_uuid,
                //         part_id: this.part_id,
                //         video_info: JSON.stringify(
                //             this.coursewareFile.coursewareList
                //         )
                //     })
                // );
            }
        },
        preservation1() {
            if (this.activeName === "other") {
                this.$utils.post(this.reqApi.shuiwuUrl+'/courseware/order',qs.stringify({
                    coursewares:JSON.stringify(this.tableData),
                    textbook_uuid:this.textbook_uuid,
                    part_id:this.part_id
                })).then(res=>{
                    if(res.data.code==='0000'){
                        this.$message({
                            message: "保存成功",
                            type: "success"
                        });
                        this.editBox = false;
                        this.button = true;
                        this.showTable = true;
                        this.delList = [];
                        this.tableData = [];
                        this.$emit(
                            "getfileList",
                            this.part_id,
                            this.type
                        );
                    }else {
                        this.$message.error(res.data.code)
                    }
                })
                return
                this.$axios({
                    url: this.reqApi.ziyuankuUrl + "teacher/courseware/order",
                    method: "POST",
                    headers: { auth_token: sessionStorage.getItem("token") },
                    data: qs.stringify({
                        courseware_infos: JSON.stringify(this.tableData)
                    })
                }).then(res => {
                    if (res.data.code === 0) {
                        this.$message({
                            message: "保存成功",
                            type: "success"
                        });
                        this.editBox = false;
                        this.button = true;
                        this.showTable = true;
                        this.delList = [];
                        this.tableData = [];
                        this.$emit(
                            "getfileList",
                            this.part_id,
                            this.type
                        );
                    } else if (res.data.code === 401 || res.data.code === 403) {
                        this.$message.error(res.data.msg);
                        this.$router.push("/register");
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });
                // const res = await teacherOrder(
                //     qs.stringify({
                //         courseware_infos: JSON.stringify(this.tableData)
                //     })
                // );
                // if (res.data.code === 0) {
                //     this.$message({
                //         message: "保存成功",
                //         type: "success"
                //     });
                //     this.editBox = false;
                //     this.button = true;
                //     this.showTable = true;
                //     this.delList = [];
                //     this.tableData = [];
                //     this.$emit("getfileList", this.part_id, this.type);
                // }
            } else {
                this.tableData = this.tableData.map(item => {
                    return {
                        video_download: item.courseware_download,
                        video_format: item.courseware_format,
                        video_id: item.courseware_id,
                        video_name: item.courseware_name,
                        video_size: item.courseware_size,
                        video_url: item.courseware_url,
                        video_valid: item.courseware_valid
                    };
                });
                 this.$utils.post(this.reqApi.shuiwuUrl+'/video/order',qs.stringify({
                    videos:JSON.stringify(this.tableData),
                    textbook_uuid:this.textbook_uuid,
                    part_id:this.part_id
                })).then(res=>{
                    if(res.data.code==='0000'){
                        this.$message({
                            message: "保存成功",
                            type: "success"
                        });
                        this.editBox = false;
                        this.button = true;
                        this.videoTable = true;
                        this.delList = [];
                        this.tableData = [];
                        this.$emit(
                            "getfileList",
                            this.part_id,
                            this.type
                        );
                    }
                })
                return 
                this.$axios({
                    url: this.reqApi.ziyuankuUrl + "teacher/video/order",
                    method: "POST",
                    headers: { auth_token: sessionStorage.getItem("token") },
                    data: qs.stringify({
                        video_infos: JSON.stringify(this.tableData)
                    })
                }).then(res => {
                    if (res.data.code === 0) {
                        this.$message({
                            message: "保存成功",
                            type: "success"
                        });
                        this.editBox = false;
                        this.button = true;
                        this.videoTable = true;
                        this.delList = [];
                        this.tableData = [];
                        this.$emit(
                            "getfileList",
                            this.part_id,
                            this.type
                        );
                    } else if (res.data.code === 401 || res.data.code === 403) {
                        this.$message.error(res.data.msg);
                        this.$router.push("/register");
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });

                // const res = await orderReq(
                //     qs.stringify({
                //         video_infos: JSON.stringify(this.tableData)
                //     })
                // );
            }
        },
        editBtn() {
            if (!this.textbook_uuid && !this.part_id) {
                return this.$message({
                    message: "请选择章节",
                    type: "warning"
                });
            }
            this.button = false;
            this.editBox = true;
            this.showUpload = false;
            this.showTable = false;
            this.videoTable = false;
            if (this.videoInfolist.length > 0) {
                if (this.activeName === "other") {
                    this.videoTable = false;
                    this.showTable = false;
                    this.tableData = this.videoInfolist.map(item => {
                        return {
                            courseware_id: item.courseware_id,
                            courseware_editName: item.courseware_name,
                            courseware_name: item.courseware_name,
                            courseware_download:
                                item.courseware_download | status,
                            courseware_format: item.courseware_format,
                            courseware_url: item.courseware_url,
                            courseware_size: item.courseware_size,
                            courseware_valid: item.courseware_valid
                        };
                    });
                } else if (this.activeName === "video") {
                    this.videoTable = false;
                    this.showTable = false;
                    this.tableData = this.videoInfolist.map(item => {
                        return {
                            courseware_id: item.video_id,
                            courseware_editName: item.video_name,
                            courseware_name: item.video_name,
                            courseware_download: item.video_download,
                            courseware_format: item.video_format,
                            courseware_url: item.video_url,
                            courseware_size: item.video_size,
                            courseware_valid: item.video_valid
                        };
                    });
                    // this.tableData.forEach(item => {
                    //     if (item.courseware_download === 1) {
                    //         item.courseware_download = true;
                    //     } else if (item.courseware_download === 2) {
                    //         item.courseware_download = false;
                    //     }
                    // });
                }
            }
        },

        //子组件传递过来的数据
        getMsgFormSon(data) {
            this.coursewareFile.coursewareList = data;
            if (this.coursewareFile.coursewareList.length > 0) {
                this.flagFile = true;
                // this.list.forEach(item=>{
                //     if(item.courseware_download)
                // })
            }
        },
        del(index, id) {
            this.delList.push(id);
            this.tableData.splice(index, 1);
        },
        del1(index) {
            this.coursewareFile.coursewareList.splice(index, 1);
        }
    },
    components: {
        draggable,
        upload
    },
    filters: {
        filterDowlond(value) {
            if (value == 1) {
                return "允许";
            } else if (value == 2) {
                return "不允许";
            }
        },
        status(val) {
            if (val == 1) {
                //允许下载
                return true;
            } else if (val == 2) {
                //不允许下载
                return false;
            }
        }
    }
};
</script>
<style scoped>
.displayBlack {
    display: inline-block;
}
.contWidth {
    /* height: 653px; */
    /* border: 1px solid #c2cad8; */
    box-sizing: border-box;
    height: 600px;
    /* position: relative; */
    /* overflow: scroll; */
}
.nameInput {
    width: 200px;
    margin-left: 10px;
    margin-right: 20px;
}
.tipText {
    font-size: 7px;
    color: #fe0000;
}
.draggableBox {
    margin-top: 15px;
}
.rowList {
    margin: 10px 0;
}
.fileListBox {
    height: 100%;
}
.del {
    margin-left: 15px;
    cursor: pointer;
    color: #fe0000;
}
.btnBox {
    margin-top: 20px;
    text-align: center;
}
.textstyle1 {
    display: inline-block;
    width: 170px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.cursor {
    cursor: pointer;
}
#tabsContent .container .el-dialog__body {
    padding: 15px 20px;
}
.video-avatar {
    width: 100%;
    height: 100%;
    padding: 0 10px;
    /* cursor: pointer; */
}
.videoBox {
    text-align: center;
    width: 100%;
    /* width: 880px; */
}
.videoBox1 {
    text-align: center;
    /* width: 100%; */
    width: 880px;
}
/* .iframe_page{
        width: 900px;
        height: 260px;
        background-color: orange; 
    }
    .iframe_page #framePage{
        width: 300px;
        height: 200px;
        background-color: pink; 
    }

     #framePage--scrollable-y .el-table__body-wrapper::-webkit-scrollbar {
    width: 10px;
    background-color: black;
} */
</style>
