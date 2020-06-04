<template>
  <div id="aaaaa">
    <el-table v-loading="loading" :data="tableData" style="width: 100%">
      <el-table-column prop="date" label=" " width="180"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import qs from "qs";
export default {
  data() {
    return {
      loading: true,
      tableData: []
    };
  },
  created() {
    this.getParameter();
  },
  methods: {
    getParameter() {
      let localUrl = window.location.href;
      let localToken =localUrl.split("?")[1].split("=")[1].split("&")[0];
      if(localUrl.split("&").length>2) {
        sessionStorage.setItem("flagTeacher",localUrl.split("?")[1].split("&")[2].split("=")[1])
      }
      this.$axios.post(this.getToken+'exam/docking/get/token',qs.stringify({
        flag: localToken
      })).then(res => {
          if (res.data.code === "0000") {
            sessionStorage.setItem("token", res.data.data.token);
            sessionStorage.setItem("examId",res.data.data.examId);
            sessionStorage.setItem("questionInfo",res.data.data.questionInfo);
            sessionStorage.setItem("examType",res.data.data.examType)
            sessionStorage.setItem("review",res.data.data.review)
            this.$router.push({
              name: "moneyhome"
            });
          }
        });
    }
  }
};
</script>
<style scoped>
</style>