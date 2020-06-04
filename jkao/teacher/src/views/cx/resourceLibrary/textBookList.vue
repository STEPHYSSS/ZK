<template>
  <el-card shadow="never" class="textBookList">
    <div class="topPadding onlySty">
      <span class="headline">课程教材</span>
      <previous-page goPreviousPage="/downloadPPTFile" style="float: right;display: inline-block;margin-top: 0px;margin-right: 13px"></previous-page>
    </div>
    <div class="principalPart">
      <img src="@/assets/images/kecheng.png" class="Logoimg" />
      <img src="@/assets/images/title.png" class="Titleimg" />
      <ul>
        <li @click="toDownloadDetail(item.uuid)" v-for="(item,index) in CourseInfo" :key="index">
          <a href="javaScript:;">
            <div>
              <!-- <img
                class="hportrait"
                style="vertical-align:middle;width:100%;height:100%"
                :src="item.logo | serverUrl(item.logo)"
                :onerror="errorImg"
              /> -->

              <!-- <img :src="$utils.serverUrl + item.picture" :onerror="errorImg"  class="hportrait" style="vertical-align:middle;width:100%;height:100%" /> -->
              <img :src=" reqApi.shuiwuUrl + item.picture" :onerror="errorImg"  class="hportrait" style="vertical-align:middle;width:100%;height:100%" />
            </div>
            <p>{{item.name}}</p>
            <span class="eyes">
              <i class="liulanliang el-icon-view">
                <i style="padding-left:5px">{{item.visitorcount}}</i>
              </i>
              <i class="time">{{item.create_time|fmtDate2}}</i>
            </span>
          </a>
        </li>
      </ul>
    </div>
  </el-card>
</template>
<script>
import qs from 'qs'
import previousPage from "@/components/previousPage.vue";
export default {
  name: "textBookList",
  data() {
    return {
      CourseInfo: [],
      errorImg: 'this.src="' + require("@/assets/images/noimg.png") + '"'
    };
  },
  components: {
    "previous-page": previousPage
  },
  created() {
    this.getTextBookList();
  },
  methods: {
    getTextBookList() {
      this.$utils({
        url: this.reqApi.shuiwuUrl + "/textbook/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: sessionStorage.getItem("token"),
          course_id: sessionStorage.getItem('itemId')
        })
      }).then(res => {
        if (res.data.code === '0000') {
          this.CourseInfo = res.data.textbooks.list;
        } else if (res.data.code === 401 || res.data.code === 403) {
          this.$message.error(res.data.msg);
          this.$router.push("/register");
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 点击教材
    toDownloadDetail(id) {
      sessionStorage.setItem("textBookId", id);
      this.$router.push({
        name: "exprole",
        parmas: {
          textbook_uuid: sessionStorage.getItem("textBookId")
        }
      });
      // this.$message('功能没做')
    }
  }
}
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
  margin-bottom: 2px;
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
  width: 560px;
  min-width: 11%;
  margin: 0 50px;
  box-sizing: border-box;
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
