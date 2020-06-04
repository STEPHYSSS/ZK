<template>
  <el-card shadow="never" class="downloadDetail">
    <!-- <div class="headOperation">
      <my-bread2 level1="资源库" level2="课程详情" goRouter="/downloadPPTFile"></my-bread2>
      <previous-page goPreviousPage="/downloadPPTFile" style="float: right;display: inline-block;"></previous-page>
    </div> -->
    <div class="topPadding onlySty">
      <span class="headline">课程详情</span>
      <previous-page goPreviousPage="/textBookList" style="float: right;display: inline-block;"></previous-page>
    </div>
    <h3 class="kechengStyle">{{course_info.name}}</h3>
    <!--文件显示部分-->
    <div class="principalPart2">
      <div class="treeBox">
        <HelloWorld :data="data" @getlist="getlist" />
      </div>
      <div class="kejianBox">
        <img
          src="@/assets/images/quanping_icon.png"
          @click="scan"
          v-show="xiazai && buxiazai"
          class="quanpin"
          title="全屏"
        />
        <img
          src="@/assets/images/xiazai_1icon.png"
          @click="downLoad"
          v-show="xiazai && buxiazai"
          class="down"
          title="下载"
        />
        <img
          src="@/assets/images/xiazai_1icon.png"
          @click="downVideo"
          v-show="downvideo"
          class="quanpin"
          title="下载"
        />
        <div class="tabBox1">
          <el-tabs
            class="zyk-tabs"
            v-model="activeName2"
            type="border-card"
            @tab-click="handleClick2"
          >
            <el-tab-pane
              :label="item.courseware_name || item.video_name"
              :name="index + ''"
              v-for="(item,index) in fileList2"
              :key="index"
            >
              <iframe
                :src="videoCb(item.video_format, item.courseware_format, item.video_url, item.courseware_url)"
                frameborder="0"
                width="100%"
                height="700px"
                v-if="item.courseware_format == '.doc' || item.courseware_format == '.docx' || item.courseware_format == '.ppt' || item.courseware_format == '.pptx' || item.courseware_format == '.pdf'"
              ></iframe>
              <div class="fangda" v-show="hide2">
                <img
                  src="@/assets/images/tuichuquanping_icon.png"
                  @click="suoxiao"
                  class="suoxiao"
                  title="退出全屏"
                />
                <iframe
                  :src="videoCb(item.video_format, item.courseware_format, item.video_url, item.courseware_url)"
                  frameborder="0"
                  width="100%"
                  height="100%"
                  v-if="item.courseware_format == '.doc' || item.courseware_format == '.docx' || item.courseware_format == '.ppt' || item.courseware_format == '.pptx' || item.courseware_format == '.pdf'"
                ></iframe>
              </div>
              <div class="videoBox">
                <video
                  style="text-align: center;width:886px;padding:5px"
                  v-if="item.video_format == '.mp4'"
                  :src="videoUrlO"
                  class="avatar video-avatar"
                  controls="controls"
                  controlslist="nodownload"
                  ref="dialogVideo"
                >您的浏览器不支持视频播放</video>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import mainInfo from "./components/mainInfo.vue";
import previousPage from "@/components/previousPage.vue";
import qs from "qs";
export default {
  name: "exprole",
  components: {
    HelloWorld,
    mainInfo,
    "previous-page": previousPage
  },
  data() {
    return {
      videoUrlO: "",
      buxiazai: true,
      activeName: "first",
      activeName2: "0",
      data: [],
      course_info: {}, //课程信息
      studentCourse: [],
      errorImg: 'this.src="' + require("@/assets/images/failToLoad.png") + '"',
      videoList2: [],
      fileList2: [],
      data2: "",
      show: true,
      hide: false,
      hide2: false,
      downLoadUrl: {},
      xiazai: false,
      downvideo: false
    };
  },
  created() {
    this.getdownList();
  },
  computed: {
    videoCb() {
      return function(videoFormat, courFormat, videoUrl, courUrl) {
        let url = "";
        if (videoUrl) {
          if (videoFormat === ".mp4") {
            url = this.reqApi.fileUpload + videoUrl;
          }
        } else if (courUrl) {
          if (
            courFormat === ".doc" ||
            courFormat === ".docx" ||
            courFormat === ".ppt" ||
            courFormat === ".pptx" ||
            courFormat === ".pdf"
          )
            // url =
            //   this.reqApi.fileyulan +
            //   "/onlinePreview?url=" +
            //   encodeURIComponent(this.reqApi.fileUpload + courUrl);
            url =this.reqApi.fileUpload + courUrl
        }
        return url;
      };
    }
  },
  methods: {
    handleClick(tab, event) {
      if(this.activeName == "second"){
        this.xiazai = true;
      }
      // console.log(tab, event);
    },
    handleClick2(tabs) {
      this.downLoadUrl = {
        url: this.fileList2[tabs.name].courseware_url,
        courDownload: this.fileList2[tabs.name].courseware_download,
        videoDownload: this.fileList2[tabs.name].video_download,
        videoUrl: this.fileList2[tabs.name].video_url
      };
      if (this.fileList2[tabs.name].video_format === ".mp4") {
        if (this.fileList2[tabs.name].video_download == "1") {
          this.downvideo = true;
        } else {
          this.downvideo = false;
        }
        this.buxiazai = false;
        this.videoUrlO =
          this.reqApi.fileUpload + this.fileList2[tabs.name].video_url;
      } else {
        this.videoUrlO = "";
        this.buxiazai = true;
      }
    },
    // 下载
    downLoad() {
      console.log(this.downLoadUrl.courDownload )
      if (this.downLoadUrl.courDownload == "1") {
        let newUrl = this.downLoadUrl.url.replace("//", "/");
        window.location.href = this.reqApi.fileUpload + newUrl;
      } else {
        this.$message("此文件不支持下载");
      }
    },
    downVideo() {
      if (this.downLoadUrl.videoDownload == "1") {
        window.location.href =
          this.reqApi.fileUpload + this.downLoadUrl.videoUrl;
      } else {
        this.$message("此文件不支持下载");
      }
    },
    scan() {
      this.hide2 = true;
    },
    suoxiao() {
      this.hide2 = false;
    },
    getlist(videoList, fileList) {
      this.videoList2 = videoList;
      this.fileList2 = fileList;
      this.fileList2 = this.fileList2.concat(this.videoList2);
      if (fileList.length > 0 || videoList.length > 0) {
        this.xiazai = true;
      } else {
        this.xiazai = false;
      }
    },
    getdownList() {
      this.$utils({
        url: this.reqApi.shuiwuUrl + "/textbook/detail",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: sessionStorage.getItem("token"),
          textbook_uuid: sessionStorage.getItem("textBookId")
        })
      }).then(res => {
          if (res.data.code == "0000") {
            this.data = res.data.parts;
            this.course_info = res.data.textbook;
          }
      });
    }
  }
};
</script>
<style scoped>
.hint-icon a {
  margin-right: 30px;
}
.principalPart2 {
  position: relative;
  display: flex;
  box-sizing: border-box;
  min-height: 699px;
}
.divide {
  width: 100%;
  height: 40px;
  background-color: #3ccbdf;
  border-radius: 5px;
  margin-top: 15px;
}

.principalPart {
  display: flex;
  margin-top: 30px;
}
/* .principalPart2 {
  width: 100%;
  float: left;
} */
.principalPart ul li {
  float: left;
  width: 459px;
  height: 288px;
  margin-bottom: 20px;
  text-align: center;
}
.principalPart ul li:last-child {
  margin-right: 0px;
}
.principalPart ul li a div {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d3d3d3;
}
.principalPart ul li a p {
  text-align: left;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  margin: 5px 0;
}
.eyes {
  display: inline-block;
  width: 100%;
  margin-top: 5px;
}
.principalPart ul li a .eyes .liulanliang,
.principalPart ul li a .eyes .time {
  width: 50%;
}
.liulanliang {
  text-align: left;
  float: left;
}
.time {
  margin-left: 15px;
  float: left;
}
/* 课程详情 */
.kecheng {
  display: inline-block;
  margin-left: 20px;
}
.kecheng hr {
  background: rgba(219, 224, 229, 1);
}
.kecheng p {
  margin-bottom: 8px;
}
.kecheng .eyes2 {
  display: flex;
}
.kechengname {
  min-width: 70px;
}
.jieshao {
  width: 602px;
  max-height: 210px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 11;
  -webkit-box-orient: vertical;
}
.kechengStyle {
  font-size: 15px;
  font-weight: 800;
  padding-left: 14px;
}
.tabBox {
  width: 100%;
  box-sizing: border-box;
}
.treeBox {
  width: 350px;
  min-width: 350px;
  margin-right: 15px;
  /* min-height: 698px; */
  padding-top: 5px;
  border: 1px solid #e4e7ed;
  overflow: hidden;
}
.kejianBox {
  border: 1px solid #e4e7ed;
  flex: 1;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
}
.kejianBox .quanpin {
  position: absolute;
  right: 36px;
  top: 55px;
  z-index: 22;
  cursor: pointer;
}
.kejianBox .down {
  position: absolute;
  right: 36px;
  top: 104px;
  z-index: 22;
  cursor: pointer;
}
/* .flexBottom {
  background-color: orange;
  position: flexed;
} */

.fangda {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 9999;
}
.suoxiao {
  position: absolute;
  right: 35px;
  top: 16px;
  font-size: 35px;
  letter-spacing: 3px;
  border: none;
  cursor: pointer;
  z-index: 9999;
  color: #fff;
}
</style>
