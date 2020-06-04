<template>
	<div class="new-main">
    <el-header class="header">
      <a href="javascript:;" class="logo">
        <img v-if="!$utils.isSeek" src="@/assets/images/chanjetLogoPage.png" style="vertical-align: middle;" alt="">
        <img v-else src="@/assets/images/logo.png" alt="">
      </a>
      <!-- <div class="logo-title">税务实训平台</div> -->
      <!-- <ul class="first_ul">

        <li><router-link to="/selfTestRecord" tag="a"><img src="@/assets/images/dailymanagement-icon.png">自测管理</router-link></li>
        <li><a @click="saveKh" href="javascript:;"><img src="@/assets/images/practicalTrainingDrill_icon.png">实训教学</a></li>
        <li><router-link to="/shixunIndex"><img src="@/assets/images/Journal-icon.png">实训训练</router-link></li>
        <li><router-link to="/myTest" tag="a"><img src="@/assets/images/comprehensiveExam_icon.png">综合考试</router-link></li>
      </ul> -->

      <div class="header_right">
        <img src="@/assets/images/user-icon.png" class="header_first_img">
        <div class="hovering">
          <a href="javascript:;">Hello,{{URealname}}</a>
          <!-- <div class="arrows el-icon-arrow-down"></div> -->
          <!-- <div class="secondary_menu">
            <ul>
              <li><img src="@/assets/images/task-icon.png"><a href="javascript:;">我的任务</a></li>
              <li><img src="@/assets/images/news-icon.png"><a href="javascript:;">我的消息</a></li>
              <li><img src="@/assets/images/modify-icon.png"><a href="javascript:;">修改密码</a></li>
              <li><img src="@/assets/images/Signout-icon.png"><a href="javascript:window.opener=null;window.close();">退出系统</a></li>
            </ul>
          </div> -->
        </div>
      </div>
    </el-header>
		<!-- <img src="@/assets/images/top.png" /> -->
    <router-view></router-view>
	</div>
</template>

<script>
  export default {
    data(){
      return{
        URealname: sessionStorage.studentRealName
      }
    }
  }
</script>

<style scoped>
 .new-main .el-button {
    border: 0px solid #31b5ff !important;
    color: #31b5ff;
    padding: 7px 20px;
}
  .logo-title {
    display: inline-block;
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    padding-left: 10px;
  }
  .new-main {
    height: calc(100vh - 122px);
    /* width: calc(100% - 80px);
    min-width: 1365px;
    margin: auto; */
  }



  .header {
    width: 100%;
    background-color: #31b5ff;
    position: relative;
    height: 51px !important;
  }

  header .logo {
    line-height: 50px;
  }

  header .goHome {
    display: inline-block;
    position: absolute;
    left: 265px;
    top: 18px;
    width: 20px;
    height: 15px;
    background-image: url('../assets/images/Back-icon.png');
    background-size: 20px 15px;
  }

  header .first_ul {
    list-style: none;
    position: absolute;
    left: 300px;
    top: 0;
    line-height: 50px;
  }

  header .first_ul li {
    float: left;
    padding: 0 15px;
  }

  header .first_ul li span {
    margin-left: 18px;
    color: #808080;
  }

  header .first_ul li:nth-child(1),
  header .first_ul li:nth-child(2),
  header .first_ul li:nth-child(3) {
    margin-right: 30px;
  }

  header .first_ul li:hover {
    background-color: #58C2FC;
  }

  header .first_ul li a {
    color: #fff;
    font-size: 14px;
    font-weight: 700;
  }

  header .first_ul li a img {
    vertical-align: middle;
    margin-right: 12px;
    width: 16px;
    height: 16px;
  }

  header .header_right {
    float: right;
    line-height: 50px;
    margin-right: 20px;
  }

  header .header_right .header_first_img {
    vertical-align: middle;
    margin-right: 12px;
    width: 30px;
    height: 30px;
  }

  header .header_right .hovering {
    display: inline-block;
    vertical-align: middle;
    top: 0;
    line-height: 47px;
  }

  header .header_right .hovering a {
    color: #fff;
  }

  header .header_right .hovering .arrows {
    display: inline-block;
    vertical-align: middle;
    margin-left: 7px;
    color: #fff;
  }

  header .header_right .hovering:hover .arrows {
    transform: rotateX(180deg);
  }

  header .header_right .hovering:hover .secondary_menu {
    display: block;
  }
</style>
