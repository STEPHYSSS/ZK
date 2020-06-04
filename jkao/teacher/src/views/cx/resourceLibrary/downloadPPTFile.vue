<template>
  <el-card shadow="never" class="downloadPPT">
    <div class="topPadding onlySty">
      <span class="headline">课程学习</span>
      <previous-page goPreviousPage="/page" style="float: right;display: inline-block;margin-top: 0px;margin-right: 1px"></previous-page>
    </div>
    <div class="principalPart">
      <img src="@/assets/images/Bigtitle.png" class="Logoimg" />
      <img src="@/assets/images/img-1.png" class="Titleimg" />
      <div class="box" v-for="(item,index) in CourseInfo" :key="index">
        <div class="leftImg">
          <img src="@/assets/images/img-2.png" />
        </div>
        <!-- 课程图片 -->
        <div class="leftMin">
          <!-- <img :src="item.logo | serverUrl(item.logo)" :onerror="errorImg"/> -->
          <img :src="reqApi.shuiwuUrl + item.picture" :onerror="errorImg" />
          <!-- <img src="@/assets/images/ppt.png" alt /> -->
        </div>
        <!-- 教材名称 -->
        <div class="rightTi">
          <p class="name">{{item.name}}</p>
          <p class="liulan">创 建 人：{{item.create_user_name}}</p>
          <p class="upTime">更新时间：{{item.update_time|fmtDate2}}</p>
          <!-- <p class="shouming">
            说
            <em style="width:38px;display:inline-block;"></em>明：适用于所有会计和税务专业
          </p> -->
          <div class="eyes2">
            <span class="kechengname">课程介绍：</span>
            <span class="jieshao" v-html="item.description"></span>
          </div>
          <button @click="toDownloadDetail(item.id)">进入课程</button>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import previousPage from "@/components/previousPage.vue";
import qs from "qs"
export default {
  name: "downloadPPTFile",
  data() {
    return{
      CourseInfo: [],
      // errorImg: 'this.src="' + require("@/assets/images/failToLoad.png") + '"',
      errorImg: 'this.src="' + require("@/assets/images/noimg.png") + '"',
      pageNum: 999
    }
  },
  components: {
    "previous-page": previousPage
  },
  created() {
    this.getCourseList();
  },
  methods: {
    getCourseList() {
      this.$utils({
        url: this.reqApi.shuiwuUrl + "course/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: sessionStorage.getItem("token"),
          pageNum: this.pageNum
        })
      }).then(res => {
        if (res.data.code === '0000') {
          this.CourseInfo = res.data.courses.list;
        } else if (res.data.code === 401 || res.data.code === 403) {
          this.$message.error(res.data.msg);
          this.$router.push("/register");
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    toDownloadDetail(id) {
       sessionStorage.setItem("itemId", id);
      this.$router.push({
        name: "textBookList",
        parmas: {
          course_id: id
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
.downloadPPT h3 {
  text-align: center;
  font-size: 20px;
}
.divide {
  width: 100%;
  height: 40px;
  background-color: #3ccbdf;
  border-radius: 5px;
  margin-top: 15px;
}
.principalPart {
  margin: 25px 15px 15px;
  box-sizing: border-box;
}
.principalPart .Logoimg {
  width: 100%;
  height: 347px;
}
.principalPart .Titleimg {
  margin: 16px 0;
  width: 250px;
}
.principalPart ul {
}

.principalPart ul li {
  float: left;
  width: 260px;
  height: 250px;
  /* margin: 10px 20px 10px 0; */
  margin: 10px 20px 10px 0;
  text-align: center;
}
.principalPart ul li:last-child {
  margin-right: 0px;
}
.principalPart ul li a div {
  /* width: 220px; */
  width: 100%;
  height: 200px;
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
.principalPart ul li a .eyes {
  display: inline-block;
  width: 100%;
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
  text-align: right;
  float: right;
}
/* 一门课程样式 */
.box {
  display: flex;
  margin-bottom: 20px;
  height: 300px;
}
.box .leftImg {
  width: 246px;
  /* height: 330px; */
  min-width: 246px;
}
.box img {
  width: 100%;
  height: 100%;
}
.box .leftMin {
  width: 465px;
  min-width: 11%;
  margin: 0 70px;
  box-sizing: border-box;
  border: 1px solid #cfcfcf;
}
.box .rightTi {
  flex: 1;
  position: relative;
  min-width: 330px;
}
.rightTi p {
  font-size: 15px;
  letter-spacing: 4px;
  margin-bottom: 10px;
}
.rightTi .name {
  font-weight: 800;
  font-size: 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.rightTi button {
  border: none;
  color: #fff;
  padding: 10px 20px;
  letter-spacing: 3px;
  background: #31b6ff;
  position: absolute;
  bottom: 0;
  left: 0;
  cursor: pointer;
}
.eyes2 {
  display: flex;
  margin-bottom: 10px;
  font-size: 15px;
  letter-spacing: 4px;
}
.kechengname {
  min-width: 95px;
}
.jieshao {
  max-height: 130px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
}
</style>
