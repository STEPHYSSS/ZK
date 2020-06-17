<template>
  <el-card shadow="never" class="homePage hgC">
    <!-- <my-bread id="pdb-shouye"></my-bread> -->
    <!-- 第一行大盒子 -->
    <div class="page-one-big">
      <!-- 第一行左 -->
      <div class="page-one-left">
        <!-- 左的上 -->
        <!-- <el-row class="top-left-top">
          <span></span>
          <span>欢迎您，登录学生考试平台</span>
        </el-row>-->
        <!-- 左的中 -->
        <el-row class="top-left-center">
          <el-col class="loginInfoTitle">登录人信息</el-col>
          <el-col>
            <!-- <img class="imgbfb hportrait" :src="$utils.serverUrl + uPhoto" alt :onerror="errorImg" /> -->
            <img class="imgbfb hportrait" :src=" reqApi.shuiwuUrl + uPhoto" :onerror="errorImg" />
          </el-col>
        </el-row>
        <!-- 左的下 -->
        <el-row class="top-left-bottom">
          <el-row>
            <span>您好：</span>
            <span>{{username}}</span>
          </el-row>
          <el-row>
            <span>角色：</span>
            <span>学生</span>
          </el-row>
          <el-row>
            <span>上次登录时间：</span>
            <span>{{ lastLoginTime | fmtDate}}</span>
          </el-row>
        </el-row>
      </div>
      <!-- 第一行中 -->
      <div class="page-one-center">
        <el-row class="top-center-top">
          <span></span>
          新闻公告
        </el-row>
        <el-row class="top-center-center pressRelease">
          <!--<vue-scroll :ops="ops" style="width:auto;height:255px">-->
          <ul style="height: 225px; overflow: auto">
            <li v-for="(item,index) in articleList" :key="index">
              <div style="display: flex;justify-content: space-between;">
                <span class="announcementTitle">{{item.name}}</span>
                <a class="fr" @click="noticedetail(item.id)">
                  <span class="add">+</span>&nbsp;&nbsp;详情
                </a>
              </div>
            </li>
          </ul>
          <!--</vue-scroll>-->
        </el-row>
        <el-row class="top-center-bottom">
          <router-link to="/announceList">更多>></router-link>
        </el-row>
      </div>
      <!-- 第一行右 -->
      <div class="page-one-right border-color1" style="width: 287px;">
        <div class="top-right-top">
          <!-- <span><img class="imgbfb" src="@/assets/images/pageBg.png" alt=""></span> -->
          <span>自测达人</span>
        </div>
        <el-row style="font-size:12px;height: 25px;">
          <el-col :span="8">名次</el-col>
          <el-col :span="8" style="padding-left:10px">用户</el-col>
          <el-col :span="8">活跃度</el-col>
        </el-row>
        <el-row v-for="(item, index) in testTopManList" :key="index" class="top-right-center">
          <el-col
            style="height:40px;line-height:40px;padding-left:13px;font-size:12px;"
            :span="7"
          >{{index + 1}}</el-col>
          <el-col :span="9" class="my-slh font-size-12">
            <span class="center-body-img">
              <img class="imgbfb"  height="100%" v-if="item.user_photo == undefined" :onerror="errorImg">
              <img class="imgbfb"  height="100%" v-else :src="reqApi.shuiwuUrl + item.user_photo" alt :onerror="errorImg"/>
            </span>
            <span>{{item.realname}}</span>
          </el-col>
          <el-col
            :span="8"
            style="height:40px;line-height:40px;font-size:12px;padding-left:14px"
          >{{item.rank}}</el-col>
        </el-row>
      </div>
    </div>

    <!-- 第二行大盒子 -->
    <div class="two-big">
      <!-- 第二行中 -->
      <div class="two-before font-weight-700">考试安排</div>
      <div style="width: calc(100% - 307px); margin-right: 20px;">
        <!-- <template> -->
        <!-- <div class="tabScroll"> -->
        <!-- <vue-scroll :ops="ops" style="width:auto;height:335px"> -->
        <el-table
          :data="dataList"
          class="topBorder"
          style="width: 100%"
          :header-cell-style="{color:'#444',textAlign:'center'}"
          :cell-style="{textAlign:'center'}"
        >
          <el-table-column prop="name" label="试卷名称"></el-table-column>
          <el-table-column label="开始时间" width="180">
            <template slot-scope="scope">{{scope.row.start_time|fmtDate}}</template>
          </el-table-column>
          <el-table-column prop="pendtime" label="结束时间">
            <template slot-scope="scope">{{scope.row.end_time|fmtDate}}</template>
          </el-table-column>
          <el-table-column prop="duration" label="考试时长"></el-table-column>
          <el-table-column prop="pcid" label="操作" fixed="right">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="开始考试" placement="bottom">
                <span class="cur-point"  @click="startExam(scope.row)" v-if="curTime >= scope.row.start_time && curTime < scope.row.end_time">
                  <img src="@/assets/images/kaishikaoshi_icon.png" alt />
                </span>
              </el-tooltip>
              <a v-if="curTime < scope.row.start_time">未开始</a>
              <!-- <a v-if="curTime >= scope.row.start_time && curTime < scope.row.end_time" @click="startExam(scope.row)">开始考试</a>
              <a v-if="curTime < scope.row.start_time">未开始</a>
              <a v-if="curTime > scope.row.end_time">已结束</a> -->
            </template>
          </el-table-column>
        </el-table>
        <!-- </vue-scroll> -->
        <!-- </div> -->
        <!-- </template> -->
      </div>
      <!-- 第二行右 -->
      <div class="calendarBox">
        <div class="top-right-top">
          <span>
            <img class="calendar" src="@/assets/images/calendar.png" alt />
          </span>
          <span style="color: #585c5f;" class="Tooltip">日历</span>
          <div>
            <vue-datepicker-local v-model="now" type="inline"></vue-datepicker-local>
          </div>
        </div>
      </div>
    </div>

    <!-- 新闻公告遮罩层弹窗 -->
    <el-dialog title="新闻公告" :visible.sync="dialogVisible" width="42%" class="noticeCC">
      <div class="detailsHead" style="color: #999;">
        <div class="content">
          <h4>{{popoutMessage.name}}</h4>
          <p>
            发布时间:
            <i>{{popoutMessage.create_time | fmtDate}} &nbsp;&nbsp;</i>访问量：
            <i>{{popoutMessage.visits}}</i>
          </p>
          <span class="main" v-html="popoutMessage.content"></span>
          <br />
          <span class="issuer">
            发布人:
            <i>{{popoutMessage.create_user_name}}</i>
          </span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">我知道了</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import qs from "qs";
import { noticeList } from '@/api/taxUrl/announcement'
import { getDate } from '@/api/taxUrl/base'
export default {
  data() {
    //日历插件
    const min = new Date(2017, 5, 1, 0, 0, 0);
    const max = new Date(2019, 8, 30, 0, 0, 0);
    const now = new Date();
    return {
      list: [], //未考试试卷
      list2: [], //开始考试还为提交的试卷
      ps: {
        //传参
        pid: "",
        uid: sessionStorage.getItem("userId")
      },
      isClick: "", //获取操作列按钮
      notice: [], //文章公告
      start: "", //开始时间
      end: "", //结束时间
      popoutMessage: {}, //公告详情弹框
      testTopManList: [], //自测达人排名
      loginInfo: [], //登录人信息及时间
      //滚动条插件
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {
          keepShow: true
        },
        bar: {
          hoverStyle: true,
          onlyShowBarOnScroll: false, //是否只有滚动的时候才显示滚动条
          background: "#7f7f7f",
          minSize: "0.3"
        }
      },
      //日历插件
      now: now,
      time: min,
      min: min,
      max: max,
      //环形图
      charts: "",
      opinion: [],
      opinionData: [
        { value: 335 }, //, name:'11'
        { value: 310 } //, name:'直接访问'
      ],
      //学生姓名
      username:sessionStorage.getItem("realname"),
      lastLoginTime:parseInt(sessionStorage.getItem("last_login_time")),//上次登录时间
      // uPhoto: sessionStorage.getItem("user_photo"),
      uPhoto:"",
      //头像加载失败占位
      errorImg: 'this.src="' + require("@/assets/images/failToLoad.png") + '"',
      //新闻详情遮罩层
      dialogVisible: false,
      articleList:[],
      dataList:[],//考试列表
      curTime: new Date().getTime(),
    };
  },
  created() {
    this.getPaperList(); //表格数据
    this.noticeList(); //新闻公告
    this.loginInfoAndTimes(); //登录人信息及次数
    this.getTestTopMan(); //实训达人排名
    this.$nextTick(async () => {
      this.curTime = await getDate()
    })
  },
  mounted() {
    const parent = document.querySelectorAll(".el-table__row");
    if(sessionStorage.getItem("user_photo")){
      this.uPhoto=sessionStorage.getItem("user_photo")
    }
    // this.isClick = this.$refs.changeOperation;//获取操作列按钮元素
    this.isClick = document.getElementById("changeOperation");
  },
  methods: {
    //表格（操作）跳转页面
    examWillBegin(exInfo) {
      // let end = exInfo.pendtime; //考试截止时间
      // let start = exInfo.pstarttime; //考试开始时间
      // let that = this;
      // let getUserId = sessionStorage.getItem("userId");
      // console.log(getUserId);
      // that.$utils.post(`exam/findToExam/${getUserId}`).then(resout => {
      //   let nowT = resout.data.object; //服务器当前时间
      //   // 1，当前时间是否在开始时间和截至时间内
      //   if (nowT < start) return false;
      //   else if (nowT >= end) {
      //     that.gettingData();
      //   } else {
      //     that.$router.push(`/prepareForExamination/${exInfo.pid}`);
      //   }
      // });
    },

    //表格数据
    gettingData() {
      let that = this;
      let getUserId = sessionStorage.getItem("userId");
      // that.$utils
      //   .post(`exam/findToExam/${getUserId}`)
      //   .then(res => {
      //     const { list, list2 } = res.data;
      //     this.list = list.concat(list2);

      //     //显示试卷类型
      //     let examType = this.list.length;
      //     let types = this.list;
      //     let nowT = res.data.object;

      //     //表格操作列排序声明
      //     let rankList1 = [];
      //     let rankList2 = [];
      //     let rankList3 = [];
      //     let rankList4 = [];

      //     for (let i = 0; i < examType; i++) {
      //       let el = types[i];
      //       if (el.ppapertype === 0) {
      //         el.ppapertype = "普通试卷";
      //       } else if (el.ppapertype === 1) {
      //         el.ppapertype = "随机试卷";
      //       }

      //       let startT = el.pstarttime;
      //       let endT = el.pendtime;
      //       let examstatus = el.examstatus; // 考试状态
      //       // if(examstatus === 1){
      //       if (nowT < startT) {
      //         el.eStatus = "未开始";
      //       } else if (nowT > endT) {
      //         el.eStatus = "已结束";
      //       } else if (nowT > startT && nowT < endT && examstatus === 2) {
      //         el.eStatus = "继续考试";
      //       } else if (nowT > startT && nowT < endT && examstatus === 1) {
      //         el.eStatus = "开始考试";
      //       }

      //       //表格操作列排序（1.继续考试 2.开始考试 3.未开始 4.已结束）List:未开始、开始考试、已结束，List2:继续考试
      //       if (types[i].eStatus === "继续考试") {
      //         rankList1.unshift(types[i]);
      //       } else if (types[i].eStatus === "开始考试") {
      //         rankList2.unshift(types[i]);
      //       } else if (types[i].eStatus === "未开始") {
      //         rankList3.push(types[i]);
      //       } else if (types[i].eStatus === "已结束") {
      //         rankList4.push(types[i]);
      //       }
      //     }
      //     that.list = rankList1.concat(rankList2, rankList3, rankList4);
      //   })
      //   .catch(function(error) {});
    },
    getPaperList() {
        this.$utils({
          url: this.reqApi.shuiwuUrl + "/exam/myAliveExam",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            token: sessionStorage.getItem("token"),
            pageNum: this.pageNum,
            pageSize: this.pageSize
          })
        }).then(res => {
          if(res.data.code === "0000"){
            this.dataList = res.data.exams.list;
            this.total = res.data.exams.total;
          }else{
            this.$message.error(res.data.msg);
          }
        });
      },
    //获取排名
    getTestTopMan() {
      this.$utils.post(this.reqApi.shuiwuUrl+'/selfExam/getSortList').then(res => {
        const { code, stus } = res.data;
        if (code === "0000") {
          for (const key in stus.list) {
            if (key <= 3) this.testTopManList.push(stus.list[key]);
          }
        }
      });
    },

    //左侧登录人信息和次数
    loginInfoAndTimes() {
      let that = this;
      // that.$utils
      //   .post(`exam/user/findOneUser/${sessionStorage.getItem("userId")}`)
      //   .then(res => {
      //     const { object, code } = res.data;
      //     if (code === "00") {
      //       that.loginInfo = object;
      //     }
      //   });
    },
    // 开始考试
    startExam(info) {
      this.$router.push({
        name: "prepareForExamination",
        query: {
          exam_id : info.id
        }
      });
    },
    //新闻公告
    async noticeList () {
      const {data: { annos, code } } = await noticeList()
      if (code === '0000') return this.articleList = annos.list
    },
    noticedetail(info) {
      this.$utils({
        url: this.reqApi.shuiwuUrl + "/anno/detail",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          anno_id:info
        })
      }).then(res => {
        if (res.data.code === "0000") {
          this.dialogVisible = true;
          this.popoutMessage = res.data.anno;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    }
  }
};
</script>

<style scoped>
/*===公告详情弹框样式===*/
.announcementTitle {
  display: block;
  min-width: 325px;
  min-height: 16px;
  width: 77%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.announcementOfDetails {
  width: 650px;
  height: 550px;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 8px 0 10px 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
}

.detailsHead {
  display: flex;
  justify-content: space-between;
  padding: 0 0 10px 0;
  margin-bottom: 20px;
}

.content {
  width: 700px;
  height: 385px;
  margin: 0 auto;
  overflow: auto;
}
.content h4 {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.content span {
  display: block;
}

.content h4 {
  font-size: 25px;
  font-weight: 0;
  color: rgb(53, 51, 51);
  font-size: 22px;
}

.content p {
  color: #c2cad8;
  margin-bottom: 10px;
}

.content .main {
  text-align: left;
  margin-left: 20px;
  text-indent: 20px;
  background-color: #fff !important;
  letter-spacing: 3px;
  color: rgb(53, 51, 51);
}

.content h4,
.content p {
  text-align: center;
}

.content .issuer {
  text-align: right;
  margin-right: 15px;
}

.iKnow {
  display: block;
  margin: 30px auto 0;
  width: 320px;
  height: 40px;
  border-radius: 12px;
}

/*===公告详情弹框样式结束===*/

.my-index header .header_right .secondary_menu ul li img {
  width: 12px;
  height: 12px;
  margin-bottom: 17px;
}

/* #pdb-shouye {
    padding-bottom: 15px;
  } */

/* 第一行大盒子 */
.page-one-big {
  margin-bottom: 50px;
  display: grid;
  width: 100%;
  grid-template-rows: 340px;
  grid-template-columns: 245px auto 287px;
}

/* 第一行左 */
.page-one-big .page-one-left {
  border: 1px solid #c2cad8;
  border-radius: 3px;
}

/* 第一行左边的top */
.page-one-big .page-one-left .top-left-top {
  width: 101%;
  height: 41px;
  line-height: 41px;
  text-align: center;
  background-color: #3ec8dd;
  padding: 0 15px;
  position: relative;
  top: -1px;
  left: -1px;
  border-radius: 2px;
  font-size: 16px;
}

.page-one-big .page-one-left .top-left-top span:nth-child(1) {
  display: inline-block;
}

.page-one-big .page-one-left .top-left-top span:nth-child(2) {
  color: #fff;
}

/* 第一行左边的center */
.page-one-big .page-one-left .top-left-center {
  width: 210px;
  border-bottom: 1px solid #cdcdcd;
  margin: 10px 16px;
}

.page-one-big .page-one-left .top-left-center .el-col:nth-child(1):before {
  content: "";
  display: inline-block;
  position: relative;
  top: -2px;
  vertical-align: bottom;
  width: 4px;
  height: 13px;
  background-color: #31b5ff;
  margin-right: 3px;
}

.loginInfoTitle {
  font-size: 14px;
  font-weight: 600;
}

.page-one-big .page-one-left .top-left-center .el-col:nth-child(2) {
  width: 60%;
  padding: 10px 0 15px;
}

/* 第一行左边的bottom */
.page-one-big .page-one-left .top-left-bottom {
  width: 100%;
  padding: 15px 10px;
  line-height: 23px;
}

.page-one-big .page-one-left .top-left-bottom .el-row {
  width: 100%;
  padding: 0 15px;
}

/* 第一行中 */
.page-one-big .page-one-center {
  position: relative;
  border: 1px solid #c2cad8;
  margin: 0 15px;
  border-radius: 3px;
  min-width: 550px;
}

/* 第一行中的头 */
.page-one-big .page-one-center .top-center-top {
  /* background-color: #f5ad58; */
  color: #444;
  width: 130px;
  font-size: 14px;
  font-weight: 600;
  padding: 5px 15px;
  border-radius: 2px;
  position: relative;
  vertical-align: bottom;
  left: -1px;
  top: -1px;
  margin-left: 18px;
  margin-top: 7px;
}

.page-one-big .page-one-center .top-center-top span {
  display: inline-block;
  background-color: #f5ad58;
  width: 4px;
  height: 13px;
  vertical-align: text-top;
}

/* 第一行中的身体 */
.page-one-big .page-one-center .top-center-center li {
  padding: 8px 20px;
  border-bottom: 1px solid #cdcdcd;
  margin: 0 20px;
  color: #444444;
  font-size: 12px;
}

.page-one-big .page-one-center .top-center-center li .add {
  display: inline-block;
  width: 10px;
  height: 10px;
  line-height: 10px;
  text-align: center;
  border: 1px solid #000;
}

/* 第一行中的脚 */
.page-one-big .page-one-center .top-center-bottom {
  text-align: right;
  padding-right: 20px;
  position: relative;
  top: 20px;
}

/* 第一行右 */
.page-one-big .page-one-right {
  border: 1px solid #c2cad8;
  border-radius: 3px;
  position: relative;
  padding-left: 20px;
}

/* 第一行右的头 */
.page-one-big .page-one-right .top-right-top {
  /* color: #fff; */
  width: 101%;
  font-size: 16px;
}

.page-one-big .page-one-right .top-right-top span:nth-child(1) {
  display: inline-block;
  width: 300px;
  height: 39px;
  font-size: 14px;
  font-weight: 600;
  margin-top: 15px;
}

.page-one-big .page-one-right .top-right-top img {
  width: 330px;
  position: absolute;
  left: -23px;
  top: -13px;
}

.calendarBox .calendar {
  width: 33px;
  height: 34px;
  position: absolute;
  top: 2px;
  left: 2px;
}

.page-one-big .page-one-right .top-right-top span:nth-child(2) {
  color: #fff;
  position: absolute;
  left: 0px;
  top: 0px;
  padding-left: 45px;
  padding-top: 7px;
}

/* 第一行右的身体 */
.page-one-big .page-one-right .top-right-center {
  height: 67px;
  vertical-align: middle;
}

.page-one-big .page-one-right .top-right-center .center-body-img {
  display: inline-block;
  width: 40px;
  height: 40px;
  vertical-align: middle;
  border-radius: 50%;
  overflow: hidden;
}

/* 第二行 */
.page-one-big .page-one-left .top-left-center.del-line {
  border-bottom: 0px solid #cdcdcd;
}

/* 中间的图 */
.page-one-big .page-one-center .two-img {
  position: absolute;
  top: -36px;
}

.page-one-big .page-one-center .two-img span {
  position: absolute;
  top: 0px;
  left: 36px;
  font-size: 16px;
}

.pressRelease {
  margin-top: 10px;
}

.hportrait {
  border-radius: 50%;
  overflow: hidden;
  width: 130px;
  height: 130px;
  /* border: 1px solid; */
}

.netherTab {
  display: flex;
  justify-content: space-between;
}

.netherTab .page-one-center {
  width: 86%;
  min-width: 550px;
  margin-left: 0;
}

.calendarBox {
  border: 1px solid #c2cad8;
  border-radius: 3px;
  position: relative;
  padding-left: 0;
}
.Tooltip {
  float: left;
  margin-left: 40px;
  margin-top: 10px;
}

.two-big {
  display: flex;
  position: relative;
}

.two-before {
  position: absolute;
  top: -26px;
  margin-left: 12px;
}
.two-before::before {
  content: "";
  display: inline-block;
  margin-right: 3px;
  position: relative;
  top: -2px;
  vertical-align: bottom;
  width: 4px;
  height: 13px;
  background-color: #29a3f4;
}
/* .ccss {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  } */
</style>
