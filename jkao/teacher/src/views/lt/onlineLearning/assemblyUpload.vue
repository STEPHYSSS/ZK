<template>
    <div>
        <!-- action="http://192.168.1.120:8081/file/upload" -->
        <div style="width:500px">
            <el-upload
                class="upload-demo"
                :action="this.reqApi.fileUpload+'file/upload'"
                :show-file-list="false"
                :on-preview="handlePreview"
                :before-upload="beforeUploadVideo"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :on-progress="uploadVideoProcess"
                :on-success="handleVideoSuccess"
                :on-error="fileError"
                ref="uploadVue"
                id="zujian"
                :data="data1"
                name="file"
                :on-exceed="handleExceed"
                :file-list="fileList"
            >
                <el-button size="small">
                    <i class="el-icon-plus"></i>选择文件
                </el-button>
                <el-progress
                v-if="videoFlag == true"
                type="circle"
                :percentage="videoUploadPercent"
                style="margin-top:30px;"
            ></el-progress>
                <div slot="tip" class="tipText" v-show="activeName=='other'">只能上传pdf/ppt/doc/文件，且不超过10M</div>
                <div slot="tip" class="tipText" v-show="activeName=='video'">只能上传.mp4/ogg/webm文件，且不超过1G</div>
            </el-upload>
        </div>
    </div>
</template>
<script>
import { log } from "util";
export default {
    data() {
        return {
            show: true,
            videoFlag: false,
            videoUploadPercent: 0,
            dialogVisible: true,
            data1: {
                token: sessionStorage.getItem("token")
            },
            dialogvisible: false,
            fileList: [
               
            ],
            fileUrl:this.reqApi.fileUpload+'file/upload'

        };
    },
    mounted() {
        this.dom();
    },
    props: ["activeName"],
    methods: {
        beforeUploadVideo(file) {
            if (this.activeName === "video") {
                const isLt10M = file.size / 1024 / 1024 / 1024 < 1;
                if (
                    ["video/mp4", "audio/ogg", "video/webm"].indexOf(
                        file.type
                    ) == -1
                ) {
                    this.$message.error("请上传正确的视频格式");
                    return false;
                }
                if (!isLt10M) {
                    this.$message.error("上传视频大小不能超过1G哦!");
                    return false;
                }
            } else if (this.activeName === "other") {
                const isLt10M = file.size / 1024 / 1024 < 10;
                var FileExt = file.name.replace(/.+\./, "");
                if (
                    ["ppt", "pptx", "pdf", "doc", "docx"].indexOf(
                        FileExt.toLowerCase()
                    ) === -1
                ) {
                    this.$message({
                        type: "warning",
                        message:
                            "请上传后缀名为ppt、pptx、pdf、doc、docx的附件！"
                    });
                    return;
                }
            }
           
        },
        dom() {},
        fileError(err, file, fileList){
             if(file.status=='fail'){
                this.$refs.uploadVue.clearFiles()
                this.videoFlag=false
                this.$message.error('上传失败！！！')
            }
            // this.$refs.uploadVue.clearFiles()
        },
        uploadVideoProcess(event, file, fileList) {
            this.videoFlag = true;
            this.videoUploadPercent = file.percentage
            // if(file.status=='fail'){
            //     this.$refs.uploadVue.clearFiles()
            // }
        },
        handleVideoSuccess(res, file, fileList) {
            this.videoFlag = false;
            this.videoUploadPercent = 0;
            if (this.activeName === "other") {
                 let i={
                    courseware_name:file.response.data.courseware_info.courseware_name,
                    courseware_editName:file.response.data.courseware_info.courseware_name,
                    courseware_url:file.response.data.courseware_info.courseware_url,
                    courseware_format:file.response.data.courseware_info.courseware_format,
                    courseware_size:file.response.data.courseware_info.courseware_size,
                    courseware_id:'',
                    courseware_desc:'',
                    courseware_download:false
                }
                this.fileList.push(i)
            } else if (this.activeName === "video") {
                
                 let i={
                    courseware_name:file.response.data.video_info.video_name,
                    courseware_editName:file.response.data.video_info.video_name,
                    courseware_url:file.response.data.video_info.video_url,
                    courseware_format:file.response.data.video_info.video_format,
                    courseware_size:file.response.data.video_info.video_size,
                    courseware_id:'',
                    courseware_desc:'',
                    courseware_download:false
                }
                this.fileList.push(i)
            }
           
             this.sendMsg();
        },
        handleRemove(file, fileList) {
        },
        handlePreview(file) {
        },
        handleExceed(files, fileList) {
            return;
            this.$message.warning(
                `当前限制选择 3 个文件，本次选择了 ${
                    files.length
                } 个文件，共选择了 ${files.length + fileList.length} 个文件`
            );
        },
        beforeRemove(file, fileList) {
            return;
            return this.$confirm(`确定移除 ${file.name}？`);
        },
        sendMsg() {
            this.$emit("func", this.fileList);
        }
    }
};
</script>
<style scoped>
.tipText {
    font-size: 7px;
    color: #fe0000;
    margin-top: 8px;
}
</style>