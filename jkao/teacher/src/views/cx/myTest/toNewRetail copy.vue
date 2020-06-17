<template>
  <div class="login" id="loginTurn">
    <!-- <i class="el-icon-d-arrow-left stem"></i> -->
    <img src="@/assets/images/returnbutton.png" class="reBack"  @click="returnBack"/>
    <div class="countDown">
      <countDown
        :examInfo="countDownInfo"
        v-if="countDownInfo"
        @autoSubmit="autoHandInExaminationPaper"
        ref="countDown"
        class="exam-interval fr"
      ></countDown>
    </div>
    <!-- <div class="loginBox">
      <span class="operation" @click="operation">操作流程</span>
      <h3>请选择您要进入的系统模块</h3>
      <div class="user">
        <div class="inputBox1">
          <ul>
            <li @click="toNewra(1)">
              <img src="@/assets/images/yunying_icon.png" />
              <p @click="toNewra(1)">运营后台</p>
            </li>
            <li @click="toNewra(2)">
              <img src="@/assets/images/mendian_icon.png" />
              <p @click="toNewra(2)">门店</p>
            </li>
            <li @click="toNewra(3)">
              <img src="@/assets/images/gongyingshang_icon.png" />
              <p @click="toNewra(3)">供应商</p>
            </li>
            <li @click="toNewra(4)">
              <img src="@/assets/images/cangku_icon.png" />
              <p @click="toNewra(4)">仓库后台</p>
            </li>
            <li @click="toNewra(5)">
              <img src="@/assets/images/pos_icon.png" />
              <p @click="toNewra(5)">收银POS</p>
            </li>
          </ul>
          <el-tabs v-model="activeName">
            <el-tab-pane label="运营后台" name="sys">
              <el-input class="chooseSys" v-model="account" prefix-icon="iconfont icon-ren" clearable placeholder="请输入账号"></el-input>
            </el-tab-pane>
            <el-tab-pane label="门店系统" name="store">
              <el-input class="chooseSys" v-model="account" prefix-icon="iconfont icon-ren" clearable placeholder="请输入账号"></el-input>
            </el-tab-pane>
            <el-tab-pane label="供应商系统" name="supplier">
              <el-input class="chooseSys" v-model="account" prefix-icon="iconfont icon-ren" clearable placeholder="请输入账号"></el-input>
            </el-tab-pane>
            <el-tab-pane label="仓库后台" name="warehouse">
              <el-input class="chooseSys" v-model="account" prefix-icon="iconfont icon-ren" clearable placeholder="请输入账号"></el-input>
            </el-tab-pane>
            <el-tab-pane label="收银POS" name="clerk">
              <el-input class="chooseSys" v-model="account" prefix-icon="iconfont icon-ren" clearable placeholder="请输入账号"></el-input>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <span class="positionLeft" @click="toNewra(activeName)">登录</span>
      <span class="positionRight" @click="returnBack">
        <i class="el-icon-back">返回</i>
      </span>
    </div>-->
    <div class="boxShow">
      <span class="operation" @click="operation">操作流程</span>
       <!-- <span class="positionRight" @click="returnBack">
        <i class="el-icon-back">返回</i>
      </span> -->
      <div class="logFlex">
        <h3>请选择您要进入的系统模块</h3>
        <div class="topicon">
          <ul>
            <li v-for="(item,index) in Imgs" :key="index"  :class="{active:index == ins}" @click="CheckSys(item.activeName,index)">
              <img :src="index == ins ? item.active : item.normal">
              <p>{{item.title}}</p>
            </li>
            <!-- <li @click="sys">
              <img src="@/assets/images/yunying_icon.png" v-show="imgIcon" />
              <img :src="IMG1" alt v-show="hideImgIcon" class="IMG" />
              <p>运营后台</p>
            </li>
            <li @click="store">
              <img src="@/assets/images/mendian_icon.png" v-show="imgIcon2" />
              <img :src="IMG2" alt v-show="hideImgIcon2" class="IMG" />
              <p>门店</p>
            </li>
            <li @click="supplier">
              <img src="@/assets/images/gongyingshang_icon.png" v-show="imgIcon3" />
              <img :src="IMG3" alt v-show="hideImgIcon3" class="IMG" />
              <p>供应商</p>
            </li>
            <li @click="warehouse">
              <img src="@/assets/images/cangku_icon.png" v-show="imgIcon4" />
              <img :src="IMG4" alt v-show="hideImgIcon4" class="IMG" />
              <p>仓库后台</p>
            </li>
            <li @click="clerk">
              <img src="@/assets/images/pos_icon.png" v-show="imgIcon5" />
              <img :src="IMG5" alt v-show="hideImgIcon5" class="IMG" />
              <p>收银POS</p>
            </li> -->
          </ul>
        </div>
        <div class="bottonicon">
          <img src="@/assets/images/newImgBg.png" alt class="bottonimg" />
          <div class="inputBox">
            <!--用户名-->
            <el-input
              placeholder="请输入账号"
              prefix-icon="iconfont icon-ren"
              clearable
              @keydown.enter.native="toNewra(activeName)"
              v-model.trim="ruleForm.account"
            ></el-input>

            <!--密码-->
            <el-input
              placeholder="请输入密码"
              prefix-icon="iconfont icon-mima"
              type="password"
              clearable
              @keydown.enter.native="toNewra(activeName)"
              show-password
              v-model.trim="ruleForm.password"
            ></el-input>
            <br />

            <el-button type="primary" round class="newLoginBtn" @click="toNewra(activeName)">登录</el-button>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" :before-close="handleClose" width="80%">
      <img src="@/assets/images/img1.png" style="width:100%" alt="操作流程" />
    </el-dialog>
  </div>
</template>
<script>
import qs from "qs";
import { getDate } from "@/api/taxUrl/base";
import { detailForStu } from "@/api/taxUrl/exam";
import countDown from "@/components/countDown.vue";
export default {
  data() {
    return {
      curTime: new Date().getTime(), // 当前服务器时间
      countDownInfo: null, // 定时器所需信息
      flag: false,
      dialogVisible: false,
      token: sessionStorage.getItem("token"),
      exam_id: sessionStorage.getItem("exam_id"),//考试id
      examFlow: this.$route.query.examFlow,//考试流水号
      examType: this.$route.query.examType,
      questionCode: this.$route.query.questionCode,
      baseScore: this.$route.query.baseScore,
      activeName: "sys",
      ruleForm: {
        username: "",
        password: ""
      },
      Imgs: [
        {
          title:'运营后台',
          activeName:'sys',
          normal: require("@/assets/images/yunying_icon.png"),
          active: require("@/assets/images/yunying_icon_1.png")
        },
        {
          title:'门店',
          activeName:'store',
          normal: require("@/assets/images/mendian_icon.png"),
          active: require("@/assets/images/mendian_icon_1.png")
        },
        {
          title:'供应商',
          activeName:'supplier',
          normal: require("@/assets/images/gongyingshang_icon.png"),
          active: require("@/assets/images/gongyingshang_icon_1.png")
        },{
          title:'仓库后台',
          activeName:'warehouse',
          normal: require("@/assets/images/cangku_icon.png"),
          active: require("@/assets/images/changku_icon_1.png")
        },{
          title:'收银POS',
          activeName:'clerk',
          normal: require("@/assets/images/pos_icon.png"),
          active: require("@/assets/images/shouyinpos_icon_1.png")
        }
      ],
      ins:0
    };
  },
  created() {
    if (this.examType == "E") {
      this.$nextTick(async () => (this.curTime = await getDate()));
      this.detailForStu();
    }
  },
  components: {
    countDown
  },
  methods: {
    // 操作提示
    operation() {
      this.dialogVisible = !this.dialogVisible;
    },
    // 登录开始
    CheckSys(val,index){
      this.activeName = val;
      this.ins = index
    },
    // 登录结束
    handleClose(done) {
      this.dialogVisible = false;
    },
    // 获取考试信息
    async detailForStu() {
      const {
        data: { code, testpaper, exam }
      } = await detailForStu({ exam_id: this.exam_id });
      if (code == "0000") {
        this.testpaperId = testpaper.id;
        this.countDownInfo = {
          duration: exam.duration,
          deadline: exam.end_time,
          nowTime: this.curTime,
          starTime: exam.start_time
        };
      }
    },
    // 点击跳转
    toNewra(activeName) {
      if (this.ruleForm.account === "" || this.ruleForm.password === "")
        return that.$message("用户名或密码不能为空");
      if (this.examType == "T") {
        // 自测
        this.$utils
          .post(
            this.reqApi.xinls + `/exam/docking/exam/login`,
            qs.stringify({
              token: sessionStorage.getItem("token"),
              examFlow: this.examFlow,
              examType: this.examType,
              questionCode: this.questionCode,
              baseScore: this.baseScore,
              questionInfo: sessionStorage.getItem("questionInfo"),
              system: activeName,
              account: this.ruleForm.account,
              password: this.ruleForm.password
            })
          )
          .then(res => {
            if (res.data.code == "0000") {
              let flag = res.data.data;
              if (activeName == "clerk") {
                window.location.href =
                  this.reqApi.xinls +
                  "/pay/#/kongbai?flag=" +
                  flag +
                  "&type=" +
                  activeName;
                // window.location.href = "http://192.168.1.144:8082" +  "/#/kongbai?flag=" +  flag +  "&type=" +  activeName;
              } else {
                // window.location.href =  "http://192.168.1.144:8081" +  "/#/transferDirectory?flag=" +  flag +  "&type=" +  activeName;
                window.location.href =
                  this.reqApi.xinls +
                  "/#/transferDirectory?flag=" +
                  flag +
                  "&type=" +
                  activeName;
              }
            } else return this.$message.error(res.data.msg);
          });
      } else if (this.examType == "E") {
        // 考试
        this.$utils
          .post(
            this.reqApi.xinls + `/exam/docking/exam/login`,
            qs.stringify({
              token: sessionStorage.getItem("token"),
              examId: this.exam_id,
              examFlow: this.examFlow,
              examType: this.examType,
              questionCode: this.questionCode,
              baseScore: this.baseScore,
              questionInfo: sessionStorage.getItem("questionInfo"),
              system: activeName,
              account: this.ruleForm.account,
              password: this.ruleForm.password
            })
          )
          .then(res => {
            if (res.data.code == "0000") {
              let flag = res.data.data;
              if (activeName == "clerk") {
                window.location.href =
                  this.reqApi.xinls +
                  "/pay/#/kongbai?flag=" +
                  flag +
                  "&type=" +
                  activeName;
                // window.location.href = "http://192.168.1.144:8082" +"/#/kongbai?flag=" +flag +"&type=" +activeName;
              } else {
                window.location.href =
                  this.reqApi.xinls +
                  "/#/transferDirectory?flag=" +
                  flag +
                  "&type=" +
                  activeName;
                // window.location.href = "http://192.168.1.144:8081" +"/#/transferDirectory?flag=" +flag +"&type=" +activeName;
              }
            } else return this.$message.error(res.data.msg);
          });
      }
    },
    autoHandInExaminationPaper() {},
    returnBack() {
      if (this.examType == "E") {
        this.$router.push({
          name: "exam",
          query: {
            exam_id: this.exam_id,
            flag: "continueQ",
            showQuestion: this.$route.query.showQuestion
          }
        });
      } else {
        this.$router.push({
          name: "startSelfExam",
          query: {
            flag: "continueQ",
            exam_id: this.exam_id,
            flagBack: "Z",
            showQuestion: this.$route.query.showQuestion
          }
        });
      }
    }
  }
};
</script>
<style  scoped>
#loginTurn {
  width: 100%;
  height: 100%;
  /* background: url("../../../assets/images/newImgBg.png"); */
  background-color: #fff;
  background-size: 100% 100%;
  position: relative;
  box-sizing: border-box;
}
#loginTurn .operation {
  position: absolute;
  top: 3%;
  right: 3%;
  color: #4e84e1;
  cursor: pointer;
}
.loginBox {
  /* background: url("../../../assets/images/newImgBg.png"); */
  width: 800px;
  height: 320px;
  border-radius: 10px;
  /* position: absolute;
  top: 30%;
  right: 3%; */
}

.boxShow {
  width: 845px;
  height: 607px;
  border: 1px solid #d0e9f4;
  /* margin: 0 auto; */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 8px;
  box-shadow: 2px 6px 16px 3px #dfeaf4;
}
.boxShow h3 {
  display: block;
  text-align: center;
  padding: 0;
  font-size: 20px;
}
.logFlex {
  display: flex;
  flex-direction: column;
  width: 800px;
  margin: 55px auto 0;
  box-sizing: border-box;
}
.topicon {
  flex: 1;
  margin: 5% 0;
}
.topicon ul li {
  float: left;
  width: 60px;
  text-align: center;
  margin: 0 20px;
  cursor: pointer;
}
.topicon ul li img {
  width: 35px;
  height: 35px;
  margin-bottom: 22px;
}
.topicon ul li .IMG {
  width: 45px;
  height: 45px;
  margin-bottom: 13px;
}
.topicon ul {
  margin-left: 18%;
}
.inputBox .newLoginBtn {
  width: 323px;
  height: 50px;
  position: absolute;
  bottom: 0px;
  background: #4e84e1 !important;
  font-size: 18px;
  letter-spacing: 10px;
}
.bottonicon {
  flex: 1;
  display: flex;
}
.bottonicon .bottonimg {
  width: 320px;
  box-sizing: border-box;
}
.inputBox {
  width: 326px;
  margin-left: 68px;
  position: relative;
  height: 176px;
  margin-top: 60px;
}
.inputBox .el-input {
  margin-bottom: 20px;
}
.user {
  padding-bottom: 4px;
  margin-bottom: 12px;
  padding: 0 50px;
  box-sizing: border-box;
  margin-top: 39px;
}
.inputBox1 {
  display: inline-block;
  width: 100%;
  position: relative;
  height: 32px;
}
.inputBox1 ul li {
  float: left;
  width: 60px;
  text-align: center;
  margin: 0 20px;
  cursor: pointer;
}
.inputBox1 ul li img {
  width: 36px;
  height: 36px;
  margin-bottom: 22px;
}
.icon {
  vertical-align: middle;
  position: absolute;
  top: 0;
  left: 0;
}
.input-wid {
  font-size: 16px;
  width: 90%;
  margin-left: 30px;
}
.dropDown {
  position: absolute;
  right: 0;
  top: 5px;
  font-size: 20px;
  cursor: pointer;
}
#loginTurn > input[type="text"] {
  border: none;
}
.selectBox {
  height: 180px;
  overflow: auto;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
  z-index: 88;
}
#loginTurn .selectBox::-webkit-scrollbar-thumb {
  background-color: #ccc;
}
.selectBox > ul > li {
  background-color: #fff;
  line-height: 32px;
  height: 32px;
  font-size: 14px;
  margin-left: 10px;
  color: #444;
}
.selectBox > ul > li:hover {
  background-color: #eee;
  color: #6699fd;
  cursor: pointer;
}
.selectBox table tr td {
  padding: 5px 10px;
}

#loginTurn .el-input__inner {
  border: none;
}
.positionLeft {
  position: absolute;
  bottom: 20px;
  right: 85px;
  cursor: pointer;
  color: #4e84e1;
  font-size: 15px;
}
.positionRight {
  position: absolute;
  bottom: 20px;
  right: 15px;
  cursor: pointer;
  color: #4e84e1;
  font-size: 15px;
}
.loginImg {
  width: 70%;
  height: 58px;
  margin-left: 58px;
  margin-top: 30px;
  cursor: pointer;
}
.exam-interval {
  display: inline-block;
  background-color: #fff;
  margin-top: 24px;
  margin-right: 20px;
}
.stem {
  font-size: 18px;
  position: absolute;
  top: 0;
  right: 0;
}
.chooseSys {
  margin-top: 45px;
}
.reBack{
  float: right;
  margin: 20px 20px 0 0;
}
</style>
