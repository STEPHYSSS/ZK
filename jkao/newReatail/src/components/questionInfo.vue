<template>
  <div class="countDown">
    <!-- 题干 -->
    <button class="showQuestion" v-if="hideTit" @click="showQuestion">显示题干</button>
    <!-- 题干遮罩层弹窗 -->
    <el-dialog title="考试内容" :visible.sync="dialogVisible" width="52%" :append-to-body="true" :close-on-click-modal="true">
        <div id="maxBox">
          <h4>题干</h4>
          <p v-html="questionInfo2"></p>
        </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "questionInfo",
  props: {
    questionInfo: String
  },
  data() {
    return {
      dialogVisible: false,
      questionInfo2:"",
      hideTit:true
    };
  },
  created() {
    // this.questionInfo2=this.questionInfo.replace(/<[^>]+>|&[^>]+;/g, "").trim();
    this.questionInfo2 = this.questionInfo;
    let flag = sessionStorage.getItem("questionInfo")
    if(flag === "undefined"){
      this.hideTit = false;
    }else{
      this.hideTit = true;
    }
  },
  methods: {
    showQuestion() {
        this.dialogVisible = true;
    }
  }
};
</script>

<style scoped>
#maxBox{
  max-height: 600px;
  overflow-y: scroll;
}
</style>
