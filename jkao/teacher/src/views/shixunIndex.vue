<template>
  <el-container id="shixunIndexdecss" class="container my-index">
    <el-header class="header">
      <a href="javascript:;" @click="goback" class="logo">
        <img v-if="!$utils.isSeek" src="@/assets/images/chanjetLogo.png" style="vertical-align: middle;" alt="">
        <img v-else src="@/assets/images/company-logo.png" alt="">
      </a>
      <!-- <a href="javascript:;" class="goHome"></a> -->
      <ul class="first_ul">
        <!-- <li><a href="javascript:;"><img src="@/assets/images/Student-icon.png">学生管理</a></li> -->
        <li><router-link to="/selfTestRecord"><img src="@/assets/images/dailymanagement-icon.png">自测管理</router-link></li>
        <li><a href="javascript:;" @click="saveKh"><img src="@/assets/images/practicalTrainingDrill_icon.png">实训教学</a></li>
        <li><router-link to="/shixunIndex"><img src="@/assets/images/Journal-icon.png">实训训练</router-link></li>
        <li><router-link to="/myTest" tag="a"><img src="@/assets/images/comprehensiveExam_icon.png">综合考试</router-link></li>
      </ul>

      <div class="header_right">
        <img src="@/assets/images/user-icon.png" class="header_first_img">
        <div class="hovering">
          <a href="javascript:;">Hello,{{URealname}}</a>
          <div class="arrows el-icon-arrow-down"></div>
          <div class="secondary_menu">
            <ul>
              <li><img src="@/assets/images/modify-icon.png"><router-link to="/personalInfo" tag="a" href="javascript:;">修改密码</router-link></li>
              <li><img src="@/assets/images/Signout-icon.png"><a @click.prevent="logout" href="javascript:;">退出系统</a></li>
            </ul>
          </div>
        </div>
      </div>


    </el-header>
    <el-container>
      <div class="aside">
        <div class="aside-header">申报种类</div>
        <ul class="aside-body">
          <li
          class="sl"
          v-for="(item, index) in shixunList"
          :key="index"
          >
            <el-tooltip class="item" effect="light" :enterable="false" :open-delay="500" :content="item.sbzl_mc + '(' + item.qsl + ')'" placement="bottom-end">
              <router-link :to="{name : 'trainingEntrance',params: {sbzlDm : item.sbzl_dm}}">{{item.sbzl_mc}}({{item.qsl}})</router-link>
            </el-tooltip>
          </li>
        </ul>
      </div>

      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>


  </el-container>
</template>

<script>
  export default {
    data(){
      return{
        kh: sessionStorage.uUsername,
        sjh: '2018701',
        shixunList: [],
        URealname: sessionStorage.studentRealName
      }
    },
    created () {
      this.findSbzl()
      sessionStorage.routerName = 'index'
    },
    methods:{
      // 获取实训题
      findSbzl () {
        this.$utils.post(`tax/findSbzl`).then(res => {
          const {code, list} = res.data
          if (code == '00') return this.shixunList = list
        })
      },
      saveKh () {
        let serverurl =  location.hostname;
        let port = location.port;
        // let port = '8080'
        let ajaxUrl = 'http://'+serverurl+':'+port+'/taxexam/';
        // let ajaxUrl = 'http://'+serverurl+':'+port;
        // window.open(`${ajaxUrl}#/pageModule?kh=${this.kh}&sjh=${this.sjh}`);
        this.$router.push(`/pageModule?kh=${this.kh}&sjh=${this.sjh}`)
        // sessionStorage.setItem("kh", this.kh);
        // sessionStorage.setItem("sjh", this.sjh);
        // this.$router.push({
        //   name: 'pageModule',
        //   query: {
        //     kh: this.kh,
        //     sjh: this.sjh
        //   }
        // })
      },
      goback(){
         this.$router.push('/page')
      },
      logout () {
        window.sessionStorage.clear()
        this.$router.push('/register')
      },
    },
  }
</script>

<style scoped>
  @import '../style/homePage.css';
  .aside {
    width: 250px;
    position: fixed;
    height: 100%;
    background-color: #fff;
    z-index: 999;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }
  .main {
    margin-left: 250px;
    padding: 2px 10px 5px 10px;
  }
  .aside-header {
    height: 40px;
    line-height: 40px;
    background-color: #caf3f9;
    color: #46b6f8;
    font-weight: 700;
    font-size: 20px;
  }
  .sl {
    height: 30px;
    line-height: 30px;
    display: inherit;
    width: 240px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
