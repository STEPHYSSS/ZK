<template>
  <el-container id="cxdcss" class="container my-index">
    <el-header class="header">
      <a class="logo" @click="goback">
        <img
          v-if="!$utils.isSeek"
          src="@/assets/images/chanjetLogo.png"
          style="vertical-align: middle;"
          alt
        />
        <img v-else src="@/assets/images/company-logo.png" alt />
      </a>
      <span
        class="dis-inline-block logo cur-point"
        @click="show.isCollapse = !show.isCollapse"
        style="padding-left: 20px;"
      >
        <img src="@/assets/images/new-icon.png" alt />
      </span>
      <ul class="first_ul">
        <!-- <li><router-link to="/selfTestRecord"><img src="@/assets/images/dailymanagement-icon.png">自测管理</router-link></li> -->
        <!-- <li><a @click="saveKh" href="javascript:;"><img src="@/assets/images/practicalTrainingDrill_icon.png">实训教学</a></li> -->
        <!-- <li><router-link to="/shixunIndex"><img src="@/assets/images/Journal.png">实训训练</router-link></li> -->
        <!-- <li><router-link :to="{name: 'pageModule', query: {kh: '801', sjh: '2018701'}}"><img src="@/assets/images/practicalTrainingDrill_icon.png">实训训练</router-link></li> -->
        <!-- <li><router-link to="/myTest"><img src="@/assets/images/comprehensiveExam_icon.png">综合考试</router-link></li>
        <li><router-link to="/newRetailTax"><img src="@/assets/images/comprehensiveExam_icon.png">新零售实训</router-link></li>-->
      </ul>
      <div class="header_right">
        <!-- <img src="@/assets/images/user-icon.png" class="header_first_img" /> -->
        <div class="hovering">
          <a href="javascript:;">Hello,{{URealname}}</a>
          <div class="arrows el-icon-arrow-down"></div>
          <div class="secondary_menu">
            <ul>
              <!-- <li><img src="@/assets/images/task-icon.png"><a href="javascript:;">我的任务</a></li>
              <li><img src="@/assets/images/news-icon.png"><a href="javascript:;">我的消息</a></li>-->
              <li>
                <img src="@/assets/images/modify-icon.png" />
                <a @click="changePsd">修改密码</a>
              </li>
              <li>
                <img src="@/assets/images/Signout-icon.png" />
                <a @click.prevent="logout" href="javascript:;">退出系统</a>
              </li>
              <li>
                <img src="@/assets/images/guanyu_icon.png" />
                <a href="javascript:;" title="版本号：1.0.0">关于版本</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- <div class="header_right">
          <a href="javascript:;" style="margin-right:12px;">Hello,{{URealname}}</a>
          <img src="@/assets/images/setting_icon.png" class="header_first_img">
      </div>-->
    </el-header>
    <el-container>
      <el-menu class="el-menu-vertical-demo" :collapse="show.isCollapse">
        <el-menu-item
          class="acne"
          index="1"
          @mouseenter.native.prevent="enter(1)"
          @mouseleave.native.prevent="leave(1)">
          <i class="iconfont icon-iconceyan fontsIcon"></i>
          <span slot="title">我的考试</span>
          <el-menu-item-group v-show="show.isCollapse1 === true">
            <div class="aside-menu">
              <router-link to="/myTest">我的考试</router-link>
              <router-link to="/historyTryBook">历史考试</router-link>
            </div>
          </el-menu-item-group>
        </el-menu-item>
        <el-menu-item
          class="acne"
          index="2"
          @mouseenter.native.prevent="enter(2)"
          @mouseleave.native.prevent="leave(2)"
        >
          <i class="iconfont icon-hf_ceyan fontsIcon"></i>
          <span slot="title">自我检测</span>
          <el-menu-item-group v-show="show.isCollapse2 === true">
            <div class="aside-menu">
              <router-link to="/selfExamList">自我检测</router-link>
              <!-- <router-link to="/curriculumsTable">按章节练习</router-link> -->
              <router-link to="/selfTestRecord">自我检测记录</router-link>
            </div>
          </el-menu-item-group>
        </el-menu-item>
        <el-menu-item
          class="acne"
          index="3"
          @mouseenter.native.prevent="enter(3)"
          @mouseleave.native.prevent="leave(3)"
        >
          <i class="iconfont icon-ziliaoku fontsIcon"></i>
          <span slot="title">资源库</span>
          <el-menu-item-group v-show="show.isCollapse3 === true">
            <div class="aside-menu">
              <router-link to="/downloadPPTFile">课程学习</router-link>
            </div>
          </el-menu-item-group>
        </el-menu-item>
        <el-menu-item
          class="acne"
          index="4"
          @mouseenter.native.prevent="enter(4)"
          @mouseleave.native.prevent="leave(4)"
        >
          <i class="iconfont icon-_huabanfuben fontsIcon"></i>
          <span slot="title">实训练习</span>
          <el-menu-item-group v-show="show.isCollapse4 === true">
            <div class="aside-menu">
              <router-link to="/newRetailTax">实训训练</router-link>
              <a @click="showDialog">实训教学</a>
            </div>
          </el-menu-item-group>
        </el-menu-item>
        <el-menu-item
          class="acne"
          index="5"
          @mouseenter.native.prevent="enter(5)"
          @mouseleave.native.prevent="leave(5)"
        >
          <i class="iconfont icon-ren1 fontsIcon"></i>
          <span slot="title">个人信息</span>
          <el-menu-item-group v-show="show.isCollapse5 === true">
            <div class="aside-menu">
              <router-link to="/myWrongTopicSet">我的错题集</router-link>
              <router-link to="/personalInfo">账户信息</router-link>
            </div>
          </el-menu-item-group>
        </el-menu-item>
      </el-menu>

      <el-main class="main" :class="!showUl ? 'showUl' : ''">
        <!-- <div style="width:70px;height:100%"></div> -->
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-dialog
      title="选择进入公司"
      :visible.sync="centerDialogVisible"
      width="45%"
      center
      :show-close="true"
    >
      <ul class="chooseCompany">
        <li v-for="(item,index) in companyList" :key="index" @click="inToNewReatail(item.id)"  :title="`${item.name}`">
          <span>{{item.name}}</span>
        </li>
      </ul>
    </el-dialog>
  </el-container>
</template>

<script>
import qs from "qs";
export default {
  name: "index",
  data() {
    return {
      kh: "801",
      sjh: "2018701",
      showUl: false,
      show: {
        isCollapse: false,
        isCollapse1: false,
        isCollapse2: false,
        isCollapse3: false,
        isCollapse4: false,
        isCollapse5: false,
        isCollapse6: false,
        isCollapse7: false,
        isCollapse8: false
      },
      eid: "",
      // 姓名
      URealname: sessionStorage.realname,
      centerDialogVisible: false,
      companyList: []
    };
  },
  created() {
    sessionStorage.routerName = "index";
    this.showUl = sessionStorage.getItem("showUl");
  },
  mounted() {
    // this.$router.beforeEach((to, from, next) => {
    // if (from.name==='prepareForExamination' && to.name === 'exam') {
    //   this.launchIntoFullscreen()
    //   next()
    // }
    // if (to.name === 'exam') {
    //   sessionStorage.setItem('showUl', 1)
    //   this.showUl = sessionStorage.getItem('showUl')
    //   next()
    // }
    // if (to.name !== 'exam') {
    //   sessionStorage.setItem('showUl', null)
    //   this.showUl = sessionStorage.getItem('showUl')
    //   next()
    // }
    // else {
    //   sessionStorage.removeItem('showUl')
    //   this.showUl = null
    //   // this.exitFullscreen1()
    //   next()
    // }
    //   next()
    // })
  },
  methods: {
    saveKh() {
      let serverurl = location.hostname;
      let port = location.port;
      // let port = '8080'
      let ajaxUrl = "http://" + serverurl + ":" + port + "/taxexam/";
      // let ajaxUrl = 'http://'+serverurl+':'+port;
      window.open(`${ajaxUrl}#/pageModule?kh=${this.kh}&sjh=${this.sjh}`);
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
    logout() {
      this.$router.push("/register");
      window.sessionStorage.clear();
    },
    enter(index) {
      const obj = this.show;
      if (this.show.isCollapse) return false;
      Object.keys(obj).forEach((key, q) => {
        this.show[key] = false;
        if (q === index) this.show[key] = true;
      });
    },

    leave(index) {
      const obj = this.show;
      if (this.show.isCollapse) return false;
      Object.keys(obj).forEach(key => {
        this.show[key] = false;
      });
    },

    //修改密码
    changePsd() {
      this.$router.push({
        name: "personalInfo"
        // query: { id: sessionStorage.userId }
      });
    },
    // 点击实训教学
    showDialog() {
      this.centerDialogVisible = true;
      // 调用展示公司列表接口
      this.$utils({
        url: this.reqApi.shuiwuUrl + "/company/myList",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: sessionStorage.getItem("token")
        })
      }).then(res => {
        if (res.data.code === "0000") {
          this.companyList = res.data.companies;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //
    inToNewReatail(info) {
      // 选择公司进行跳转
      sessionStorage.setItem("companyId",info)
      this.$router.push({
        name: "publicRole",
        query: { companyId: sessionStorage.getItem("companyId") }
      });
      this.centerDialogVisible = false;
    },
    goback() {
      this.$router.push("/page");
    }
    // launchIntoFullscreen() {
    //   var element = document.documentElement;
    //   if(element.requestFullscreen) {
    //     element.requestFullscreen();
    //   } else if(element.mozRequestFullScreen) {
    //     element.mozRequestFullScreen();
    //   } else if(element.webkitRequestFullscreen) {
    //     element.webkitRequestFullscreen();
    //   } else if(element.msRequestFullscreen) {
    //     element.msRequestFullscreen();
    //   }
    // },
    // exitFullscreen1() {
    //   if(document.exitFullscreen) {
    //     document.exitFullscreen();
    //   } else if(document.mozCancelFullScreen) {
    //     document.mozCancelFullScreen();
    //   } else if(document.webkitExitFullscreen) {
    //     document.webkitExitFullscreen();
    //   } else if(document.msExitFullscreen) {
    //     document.msExitFullscreen();
    //   }
    // },
  }
};
</script>

<style scoped>
@import "../style/homePage.css";
.my-index .showUl {
  padding: 15px !important;
}
.exam-btn {
  background-color: rgb(214, 23, 23);
  margin: 10px 0 0 20px;
}
.chooseCompany {
  height: 150px;
}
.chooseCompany li {
  float: left;
  width: 135px;
  margin: 10px 20px;
  text-align: center;
  line-height: 35px;
  border: 1px solid;
  border-radius: 5px;
  cursor: pointer;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
</style>
