<template>
  <div id="disStyle">
    <el-tree
      :data="data"
      :props="defaultProps"
      :highlight-current="true"
      :expand-on-click-node="false"
      @node-click="handleNodeClick"
      class="treeStyle"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <!-- <el-tooltip
          :content="node.label"
          :open-delay="200"
          :enterable="false"
          :hide-after="3000"
          placement="top"
          effect="light"
        > -->
          <span :title="node.label" class="em-tree-text exprole">{{ node.label}}</span>
        <!-- </el-tooltip> -->
        <span class="marginLeft">
          <el-tooltip
            :content="`文件数量:${data.coursewares.length}`"
            placement="top"
            effect="light"
          >
            <span v-if="data.coursewares.length>0">
              <img src="@/assets/images/wendang_icon.png" style="vertical-align: middle;" />
              <span class="textStyle">({{data.coursewares.length}})</span>
            </span>
          </el-tooltip>
          <!-- 播放 -->
          <el-tooltip :content="`视频数量:${data.videos.length}`" placement="top" effect="light">
            <span v-if="data.videos.length > 0">
              <img src="@/assets/images/bofang_1icon.png" style="vertical-align: middle;" />
              <span class="textStyle">({{data.videos.length}})</span>
            </span>
          </el-tooltip>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
import pdf from "vue-pdf";
import qs from "qs";
export default {
  name: "HelloWorld",
  data() {
    return {
      shrinkage: false,
      dialogVisible: false,
      dialogVisible2: false,
      dialogVisible3: false,
      data2: "",
      data3: "",
      data4: "",
      videoNmae: "",
      pdfName: "",
      currentPage: 0, // pdf文件页码
      pageCount: 0, // pdf文件总页数
      fileType: "pdf", // 文件类型
      defaultProps: {
        children: "children",
        label: "label"
      },
      videoList: [],
      fileList: [],
      dataList: [],
      flag1: false,
      flag2: false,
      flag3: false
    };
  },
  props: {
    data: Array,
  },
  components: {
    pdf
  },
  mounted() {
    // this.$emit("getdownList");
  },
  created() {
    // this.getdownList();
  },
  methods: {
    handleNodeClick(data) {
      this.videoList = data.videos;
      this.fileList = data.coursewares;
      this.$emit("getlist", this.videoList, this.fileList);
    },
    // getdownList() {
    //   this.$utils({
    //     url: this.reqApi.shuiwuUrl + "/textbook/detail",
    //     method: "POST",
    //     headers: { "content-type": "application/x-www-form-urlencoded" },
    //     data: qs.stringify({
    //       token: sessionStorage.getItem("token"),
    //       textbook_uuid: sessionStorage.getItem("textBookId")
    //     })
    //   }).then(res => {
    //       if (res.data.code == "0000") {
    //         this.dataList = res.data.parts;
    //       }
    //   });
    },
    // 查看
    downCheck(el) {
    },
    // 下载
    down(codeUrl) {
    },
    // 收缩
    hideTree(itemCourseId, index) {},
    changePdfPage(val) {
    },

    // pdf加载时
    loadPdfHandler(e) {
      this.currentPage = 1; // 加载的时候先加载第一页
    },
    handleClose() {
      this.dialogVisible2 = false;
    },
    closeDialog() {
      this.data3 = "";
    }
  };
</script>
<style scoped>
/* #disStyle {
  margin: 0px 15px 0 17px;
} */
.treeOne {
  margin-left: 35px;
  position: relative;
  line-height: 45px;
  border-bottom: 1px solid rgba(228, 234, 236, 1);
  margin-right: 40px;
  box-sizing: border-box;
}
.treeOne .treeSee {
  display: inline-block;
  margin-right: 30px;
  height: 45px;
}
.treeOne p {
  position: absolute;
  top: 4px;
  right: 0;
}
.treeSee img,
.treeSee2 img {
  margin-right: 5px;
  vertical-align: top;
}
.marginRight {
  margin-right: 5px;
}
.marginLeft {
  margin-left: 5px;
  position: absolute;
  right: 5px;
}
.treeStyle {
  position: relative;
}
.treeSee,
.treeOne {
  cursor: pointer;
}
li {
  margin: 15px 0;
}
.treeAdd {
  vertical-align: middle;
  margin-right: 5px;
  width: 16px;
}
.arrow {
  padding-top: 20px;
  padding-left: 64px;
}
.turn {
  display: inline-block;
  width: 80px;
  height: 30px;
  background-color: #c8c8c8;
  text-align: center;
  line-height: 30px;
  border-radius: 5px;
}
.container .el-dialog__header {
  padding: 20px;
}
.textStyle {
  font-size: 12px;
  margin-right: 5px;
}
.documentText {
  font-size: 16px;
  font-weight: 700;
  color: #31b5ff;
}
#disStyle .el-tree-node__content {
    white-space: nowrap;
    text-overflow: ellipsis;
    /* overflow: hidden; */
    width: 60%;
    display: inline-block;
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
/* .custom-tree-node>span.em-tree-text{
display: inline-block;
overflow: hidden;
white-space: nowrap;
width:100%;
text-overflow: ellipsis;
} */
/* 文字多出省略号 */
.exprole{
  display: inline-block;
  width: 310px;
  overflow:hidden;
	text-overflow:ellipsis;
	white-space:nowrap;
}
</style>

