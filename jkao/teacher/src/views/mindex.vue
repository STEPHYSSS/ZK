<template>
  <el-container class="container my-index">
    <el-header class="header">
      <router-link to="/mindex" class="logo">
        <img
          v-if="!$utils.isSeek"
          src="@/assets/images/chanjetLogo.png"
          style="vertical-align: middle;"
          alt
        />
        <img v-else src="@/assets/images/company-logo.png" alt />
      </router-link>
      <span
        class="dis-inline-block logo cur-point"
        @click="show.isCollapse = !show.isCollapse"
        style="padding-left: 20px;"
      >
        <img src="@/assets/images/new-icon.png" alt />
      </span>
      <div class="first_ul" id="index-header">
        <span style="padding-left: 20px" class="schoolName font-size-18 font-weight-700">{{versionDisplay.schoolName}}</span>
        <span class="trial-mfont" v-if="versionDisplay.versionReminder == '演示版'">演示版</span>
      </div>

      <div class="header_right">
        <!-- <span style="padding-right: 10px">教师管理员</span> -->
        <!-- <img src="@/assets/images/setting_icon.png" class="header_first_img"> -->
        <div class="hovering">
          <a href="javascript:;">Hello,{{URealname}}</a>
          <img src="@/assets/images/setting_icon.png" class="header_first_img" />
          <div class="arrows el-icon-arrow-down"></div>
          <div class="secondary_menu">
            <ul>
              <li>
                <img src="@/assets/images/modify-icon.png" />
                <router-link :to="{name: 'newAdmin', query: {id: userId}}">修改密码</router-link>
              </li>
              <li>
                <img src="@/assets/images/guanyu_icon.png" />
                <a @click.prevent="about" href="javascript:;">关于版本</a>
              </li>
              <li>
                <img src="@/assets/images/Signout-icon.png" />
                <a @click.prevent="logout" href="javascript:;">退出系统</a>
              </li>
            </ul>
          </div>
        </div>
        <el-dialog title="版本" :visible.sync="dialogVisible" width="300px" center>
          <span class="edition">{{reqApi.version}}</span>
        </el-dialog>
      </div>
    </el-header>
    <el-container>
      <el-menu class="el-menu-vertical-demo" :collapse="show.isCollapse">
        <el-menu-item
          class="acne"
          index="4"
          @mouseenter.native.prevent="enter(4)"
          @mouseleave.native.prevent="leave(4)"
        >
          <i class="iconfont icon-yonghuguanli fontsIcon"></i>
          <span>用户管理</span>
          <el-menu-item-group :class="{close:show.isCollapse}" v-show="show.isCollapse4 === true">
            <div class="aside-menu">
              <router-link to="/user">学生管理</router-link>
              <router-link to="/adminList">教师设置</router-link>
              <router-link to="/studentAdminList" v-if="role_id == 1 || role_id == 2">管理员设置</router-link>
            </div>
          </el-menu-item-group>
        </el-menu-item>
        <el-menu-item
          class="acne"
          index="9"
          @mouseenter.native.prevent="enter(9)"
          @mouseleave.native.prevent="leave(9)"
        >
          <!-- <i class="iconfont icon-shezhi fontsIcon"></i> -->
          <!-- <img src="@/assets/images/Journal.png" alt=""> -->
          <img src="@/assets/images/Journal.png" class="imgStyle" alt />
          <span>账套设置</span>
          <el-menu-item-group :class="{close:show.isCollapse}" v-show="show.isCollapse9 === true">
            <div class="aside-menu">
              <router-link to="/accountSet">教学账套</router-link>
              <router-link to="/testLedgerList">试题账套</router-link>
              <router-link to="/scoringSettings">评分项设置</router-link>
              <router-link to="/meargList">评分项合并</router-link>

              <!-- <router-link to="/newAdmin">新增管理员</router-link> -->
              <!-- <router-link to="/adminList" v-if="aRoleid ==='admin'">教师设置</router-link> -->
            </div>
          </el-menu-item-group>
        </el-menu-item>
        <el-menu-item
          class="acne"
          index="1"
          @mouseenter.native.prevent="enter(1)"
          @mouseleave.native.prevent="leave(1)"
        >
          <i class="iconfont icon-tikuguanli fontsIcon"></i>
          <span>题库管理</span>
          <el-menu-item-group :class="{close:show.isCollapse}" v-show="show.isCollapse1 === true">
            <div class="aside-menu">
              <!-- <router-link to="/addQuestion">新增题库</router-link> -->
              <router-link to="/findQuestionDbs">题库列表</router-link>
              <!-- <router-link to="/newQuestion">新增试题</router-link> -->
              <!-- <router-link to="/batchLeadQuestion">批量导入试题</router-link> -->
              <router-link to="/manageQuestion">试题管理</router-link>
              <!-- <router-link to="/caseList">案例管理</router-link>
              <router-link to="/newCase">新零售案例</router-link>-->
            </div>
          </el-menu-item-group>
        </el-menu-item>
        <el-menu-item
          class="acne"
          index="2"
          @mouseenter.native.prevent="enter(2)"
          @mouseleave.native.prevent="leave(2)"
        >
          <i class="iconfont icon-shijuan fontsIcon"></i>
          <span>试卷管理</span>
          <el-menu-item-group :class="{close:show.isCollapse}" v-show="show.isCollapse2 === true">
            <div class="aside-menu">
              <!-- <router-link to="/newPaper">创建试卷</router-link> -->
              <router-link to="/findPaperCategorys">试卷分类</router-link>
              <router-link to="/findPapers">试卷管理</router-link>
              <router-link to="/testInfo">考试管理</router-link>
            </div>
          </el-menu-item-group>
        </el-menu-item>
        <el-menu-item
          class="acne"
          index="3"
          @mouseenter.native.prevent="enter(3)"
          @mouseleave.native.prevent="leave(3)"
        >
          <i class="iconfont icon-denglujiemian-nenghaoshujufenxixitong fontsIcon"></i>
          <span>统计分析</span>
          <el-menu-item-group :class="{close:show.isCollapse}" v-show="show.isCollapse3 === true">
            <div class="aside-menu">
              <router-link to="/papersAnalysis">考试分析</router-link>
              <router-link to="/examAnalysis">试卷分析</router-link>
              <router-link to="/resulitAnalysis">成绩分析</router-link>
              <router-link to="/studentResulit">学生成绩</router-link>
              <!-- <router-link to="/totalAnalysis">考试总分析</router-link> -->
              <router-link to="/examinationAnalysis">总分析</router-link>
            </div>
          </el-menu-item-group>
        </el-menu-item>

        <el-menu-item
          class="acne awinhs"
          style="padding-left: 17px !important;"
          index="6"
          @mouseenter.native.prevent="enter(6)"
          @mouseleave.native.prevent="leave(6)"
        >
          <i class="iconfont icon-_huabanfuben fontsIcon"></i>
          <span>课程管理</span>
          <el-menu-item-group :class="{close:show.isCollapse}" v-show="show.isCollapse6 === true">
            <div class="aside-menu">
              <router-link to="/courseCategory">课程分类</router-link>
              <router-link to="/courseList">课程列表</router-link>
              <!-- <router-link to="/lecturerList">讲师列表</router-link> -->
            </div>
          </el-menu-item-group>
        </el-menu-item>
        <el-menu-item
          class="acne"
          index="5"
          @mouseenter.native.prevent="enter(5)"
          @mouseleave.native.prevent="leave(5)"
        >
          <i class="iconfont icon-navicon-jkhd fontsIcon"></i>
          <span>公告管理</span>
          <el-menu-item-group :class="{close:show.isCollapse}" v-show="show.isCollapse5 === true">
            <div class="aside-menu">
              <router-link to="/articleManage">公告分类</router-link>
              <router-link to="/articleList">公告发布</router-link>
            </div>
          </el-menu-item-group>
        </el-menu-item>

        <!-- <el-menu-item class="acne" index="7" @mouseenter.native.prevent="enter(7)" @mouseleave.native.prevent="leave(7)">
          <i class="iconfont  icon-ziliaoku fontsIcon"></i>
          <span slot="title">案例管理</span>
          <el-menu-item-group v-show="show.isCollapse7 === true">
            <div class="aside-menu">
              <router-link to="/newCase">新零售案例</router-link>
            </div>
          </el-menu-item-group>
        </el-menu-item>-->

        <el-menu-item
          class="acne"
          index="8"
          @mouseenter.native.prevent="enter(8)"
          @mouseleave.native.prevent="leave(8)"
        >
          <i class="iconfont icon-shezhi fontsIcon"></i>
          <span>系统管理</span>
          <el-menu-item-group :class="{close:show.isCollapse}" v-show="show.isCollapse8 === true">
            <div class="aside-menu">
              <router-link to="/findClasses">班级管理</router-link>
              <!-- <router-link to="/systemSetup">系统设置</router-link> -->
              <!-- <router-link to="/newAdmin">新增管理员</router-link> -->
            </div>
          </el-menu-item-group>
        </el-menu-item>
      </el-menu>
      <el-main class="main lt-css">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>

        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Vue from "vue";
export default {
  name: "index",
  data() {
    return {
			edition_code: '0',
      show: {
        isCollapse: false,
        isCollapse1: false,
        isCollapse2: false,
        isCollapse3: false,
        isCollapse4: false,
        isCollapse5: false,
        isCollapse6: false,
        isCollapse7: false,
        isCollapse8: false,
        isCollapse9: false
      },
      // 姓名
      URealname: sessionStorage.realname,
      userId: sessionStorage.userId,
      aRoleid: sessionStorage.role_id,
      dialogVisible: false,
      role_id: sessionStorage.getItem("role_id"), //用于判断管理员设置菜单是否展示
      versionDisplay: {
        schoolName: "",
        versionReminder: "",
        endTime: ""
      }
    };
  },

  created() {
		// sessionStorage.setItem('realName', '章四')
		this.getSchool()
    sessionStorage.routerName = "mindex";
  },

  methods: {
    getSchool() {
      const that = this;
      that.$utils.post(`/registered/getMessage`).then(res => {
        const { code, school_name, faculty_name, start_time, end_time, edition_code } = res.data;
        if (edition_code) {
          this.edition_code = edition_code;
          Vue.prototype.reqApi["edition_code"] = edition_code;
        } else {
          this.edition_code = "0";
          Vue.prototype.reqApi["edition_code"] = "0";
        }
        if (code == 100) {
          that.versionDisplay.schoolName = school_name;
          that.versionDisplay.versionReminder = "";
          that.versionDisplay.endTime = end_time;
        } else if (code == 200) {
          that.versionDisplay.schoolName = school_name;
          that.versionDisplay.versionReminder = "演示版";
          that.versionDisplay.endTime = end_time;
        } else if (code == 300) {
          that.versionDisplay.schoolName = school_name;
          that.versionDisplay.versionReminder = "授权到期";
          that.$message("授权码到期，请尽快续费");
        }
      });
    },
    // 退出系统
    logout() {
      this.$router.push("/register");
      window.sessionStorage.clear();
    },
    about() {
      this.dialogVisible = true;
    },
    enter(index) {
      Object.keys(this.show).forEach((item, i) => {
        if (index == i) {
          this.show[item] = true;
        }
      });
      const obj = this.show;
      if (this.show.isCollapse) return false;
      Object.keys(obj).forEach((key, q) => {
        this.show[key] = false;
        if (q === index) this.show[key] = true;
      });
    },

    leave(index) {
      Object.keys(this.show).forEach((item, i) => {
        if (index == i) {
          this.show[item] = false;
        }
      });
      const obj = this.show;
      if (this.show.isCollapse) return false;
      Object.keys(obj).forEach(key => {
        this.show[key] = false;
      });
    }
  }
};
</script>

<style scoped>
@import "../style/homePage.css";

.my-index .main {
  padding: 15px;
  height: calc(100vh - 80px);
  overflow: auto;
}
.imgStyle {
  width: 19px;
  height: 18px;
}
.edition {
  margin-left: 100px;
  font-size: 16px;
}
  .trial-mfont {
    font-family: STXingkai;
  }
.close {
  left: 64px !important;
}
</style>
