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
    // let localUrl = window.location.href;
    //   let localToken = localUrl.split("?")[1].split("=")[1];
    //   // let localType = localUrl.split("&")[1].split("=")[1];
    //   this.$axios.post('/exam/docking/get/token',qs.stringify({
    //     flag:localToken
    //   })).then(res=>{
        
    //   })
    this.getParameter();
  },
  methods: {
    getParameter() {
      // if(window.location.href=="http://192.168.1.168:8086/#/transferDirectory"){
      //   return this.$message.error('未检测到考试编号，请回到考试页面')
      // }
      let localUrl = window.location.href;
      let localType1 = localUrl;
      let localToken =localUrl.split("?")[1].split("=")[1].split("&")[0]
      let localType = localType1.split("?")[1].split("&")[1].split("=")[1];
      if(localType1.split("&").length>2) {
        sessionStorage.setItem("flagTeacher",localType1.split("?")[1].split("&")[2].split("=")[1])
      }
      this.$axios({
        url: window.apiToken+"exam/docking/get/token",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          flag: localToken
        })
      }).then(res => {
          if (res.data.code === "0000") {
            sessionStorage.setItem("examId",res.data.data.examId)
            sessionStorage.setItem("token", res.data.data.token);
            sessionStorage.setItem("questionInfo",res.data.data.questionInfo);
            sessionStorage.setItem("examType",res.data.data.examType)
            sessionStorage.setItem("review",res.data.data.review)
            if (localType == "sys") {
              this.$router.push({
                name: "storeManage"
              });
            } else if (localType == "store") {
              this.$router.push({
                name: "choose"
              });
            } else if (localType == "supplier") {
              this.$router.push({
                name: "shoporder"
              });
            } else if (localType == "warehouse") {
              this.$router.push({
                name: "wsettings"
              });
            }
          }
        });
    }
  }
};
</script>
<style scoped>
#aaaaa .el-table {
  border-top: none;
}
</style>