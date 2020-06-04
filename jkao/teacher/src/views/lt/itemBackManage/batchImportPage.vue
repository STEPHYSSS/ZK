<template>
  <el-card class="new-class f-new box-card">
    <previous-page goPreviousPage="/testLedgerList" style="float: right;display: inline-block;"></previous-page>
    <h3 class="titleText">导入账套</h3>
    <br>
    <div class="topPadding">
      <span>选择需要导入的账套文件，如果没有请先去导出模板</span>
      <el-upload
        class="upload-demo"
        :action="`${this.reqApi.xinls}/exam/accouunt/input`"
        :show-file-list="false"
        :before-upload="beforeUploadVideo"
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
       
        
				 <el-button size="small" class="btnclass">
          <i class="el-icon-plus"></i>选择文件
        </el-button>
        <!-- <div slot="tip" class="tipText" v-show="activeName=='other'">只能上传pdf/ppt/doc/文件，且不超过10M</div> -->
        <!-- <div slot="tip" class="tipText" v-show="activeName=='video'">只能上传.mp4/ogg/webm文件，且不超过1G</div> -->
      </el-upload>
			<el-progress
          v-if="videoFlag == true"
          type="circle"
          :percentage="videoUploadPercent"
          style="margin-top:30px;"
        ></el-progress>
    </div>
  </el-card>
</template>
<script>
import previousPage from "@/components/previousPage.vue";
export default {
  data() {
    return {
			data1: {
                token: sessionStorage.getItem("token")
						},
						fileList:[],
						videoFlag: false,
						videoUploadPercent: 0,
						url:'http://47.103.211.239:8086//exam/accouunt/input'
		};
  },
  components: {
    "previous-page": previousPage
  },
  methods: {
		handleVideoSuccess(res, file, fileList){
			if(res.code==='0000'){
					this.videoFlag=false
          this.$message.success('上传成功')
          this.$router.push({
            name:'testLedgerList'
          })
			}
		},
		handleExceed(){},
    // 上传进度
    uploadVideoProcess(event, file, fileList) {
      this.videoFlag = true;
      this.videoUploadPercent = file.percentage;
      // if(file.status=='fail'){
      //     this.$refs.uploadVue.clearFiles()
      // }
    },
    // 上传前，判断文件类型大小
    beforeUploadVideo(file) {
      if (this.activeName === "video") {
        const isLt10M = file.size / 1024 / 1024 / 1024 < 1;
        if (["video/mp4", "audio/ogg", "video/webm"].indexOf(file.type) == -1) {
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
            message: "请上传后缀名为ppt、pptx、pdf、doc、docx的附件！"
          });
          return;
        }
      }
    },
    // 上传失败
    fileError(err, file, fileList) {
      if (file.status == "fail") {
        this.$refs.uploadVue.clearFiles();
        this.videoFlag = false;
        this.$message.error("上传失败！！！");
      }
      // this.$refs.uploadVue.clearFiles()
    }
  }
};
</script>
<style scoped>
.titleText {
  margin-left: 20px;
  margin-top: 10px;
}
.topPadding {
  padding: 0;
  padding-left: 20px;
}
</style>

