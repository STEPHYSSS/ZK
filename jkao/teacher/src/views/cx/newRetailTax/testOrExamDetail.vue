<template>
  <div class="login" id="loginTurn">
    <div class="loginBox">
      <span class="operation" @click="operation">操作流程</span>
      <h3>请选择您要进入的系统模块</h3>
      <div class="user">
        <div class="inputBox1">
          <!-- <ul>
            <li @click="toNewra(1)">
              <img src="@/assets/images/yunying_icon.png" />
              <p>运营后台</p>
            </li>
            <li @click="toNewra(2)">
              <img src="@/assets/images/mendian_icon.png" />
              <p>门店</p>
            </li>
            <li @click="toNewra(3)">
              <img src="@/assets/images/gongyingshang_icon.png" />
              <p>供应商</p>
            </li>
            <li @click="toNewra(4)">
              <img src="@/assets/images/cangku_icon.png" />
              <p>仓库后台</p>
            </li>
            <li @click="toNewra(5)">
              <img src="@/assets/images/pos_icon.png" />
              <p>收银POS</p>
            </li>
          </ul> -->
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
// import countDown from "@/components/countDown.vue";
export default {
  data() {
    return {
      // curTime: new Date().getTime(), // 当前服务器时间
      // countDownInfo: null, // 定时器所需信息
      flag: false,
      dialogVisible: false,
      token: sessionStorage.getItem("token"),
      exam_id: this.$route.query.exam_id,
      examFlow: this.$route.query.examFlow,
      examType: this.$route.query.examType,
      questionCode: this.$route.query.questionCode,
      testDetail:this.$route.query.testDetail,////试题回顾所需的参数
      activeName: "sys",
      account:""//用户输入的账号
      // questionInfo:this.$route.query.questionInfo
    };
  },
  created() {
    // if(this.examType == "E"){
    //   this.$nextTick(async () => (this.curTime = await getDate()));
    //   this.detailForStu();
    // }
  },
  components: {
    // countDown
  },
  methods: {
    // 操作提示
    operation() {
      this.dialogVisible = !this.dialogVisible;
    },
    handleClose(done) {
      this.dialogVisible = false;
    },
    // 获取考试信息
    // async detailForStu() {
    //   const {
    //     data: { code, testpaper, exam }
    //   } = await detailForStu({ exam_id: this.exam_id });
    //   if (code == "0000") {
    //     this.testpaperId = testpaper.id;
    //     this.countDownInfo = {
    //       duration: exam.duration,
    //       deadline: exam.end_time,
    //       nowTime: this.curTime,
    //       starTime: exam.start_time
    //     };
    //   }
    // },
    // 点击跳转
    toNewra(activeName) {
      if (this.examType == "T") {
        this.$utils
          .post(
            this.reqApi.xinls + `/exam/docking/review/login`,
            qs.stringify({
              token: sessionStorage.getItem("token"),
              examId: this.exam_id,
              examFlow: this.examFlow,
              examType: this.examType,
              questionCode: this.questionCode,
              questionInfo: sessionStorage.getItem("questionInfo"),
              system: activeName,
              account: this.account
            })
          )
          .then(res => {
            if (res.data.code == "0000") {
              let flag = res.data.data;
              if (activeName == "clerk") {
                window.location.href = this.reqApi.xinls +  "/pay/#/kongbai?flag=" +  flag +  "&type=" +  activeName;
                // window.location.href = "http://192.168.1.144:8082" +  "/#/kongbai?flag=" +  flag +  "&type=" +  activeName;

              } else {
                // window.location.href =  "http://192.168.1.144:8081" +  "/#/transferDirectory?flag=" +  flag +  "&type=" +  activeName;
                window.location.href =  this.reqApi.xinls +  "/#/transferDirectory?flag=" +  flag +  "&type=" +  activeName;
              }
            }else return this.$message.error(res.data.msg)
          });
      }else if(this.examType == "E") {
        this.$utils
        .post(
          this.reqApi.xinls + `/exam/docking/review/login`,
          qs.stringify({
            token: sessionStorage.getItem("token"),
            examId: this.exam_id,
            examFlow: this.examFlow,
            examType: this.examType,
            questionCode: this.questionCode,
            questionInfo: sessionStorage.getItem("questionInfo"),
            system: activeName,
            account: this.account
          })
        )
        .then(res => {
          if (res.data.code == "0000") {
            let flag = res.data.data;
            if (activeName == "clerk") {
              window.location.href = this.reqApi.xinls +"/pay/#/kongbai?flag=" +flag +"&type=" +activeName;
              // window.location.href = "http://192.168.1.144:8082" +"/#/kongbai?flag=" +flag +"&type=" +activeName;
            } else {
              window.location.href = this.reqApi.xinls +"/#/transferDirectory?flag=" +flag +"&type=" +activeName;
              // window.location.href = "http://192.168.1.144:8081" +"/#/transferDirectory?flag=" +flag +"&type=" +activeName;
            }
          }else return this.$message.error(res.data.msg);
        });
      }
    },
    autoHandInExaminationPaper() {},
    returnBack(){
      if(!this.testDetail){
        this.$router.push({
          name: "historyExamDetails",
          query: {
            exam_id: this.exam_id
          }
        });
      }else{
        this.$router.push({
          name: "historyExamDetails",
          query: {
            exam_id: this.exam_id,
            testDetail:this.testDetail
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
  background: url("../../../assets/images/newLoginBg.png");
  background-size: 100% 100%;
  position: relative;
  box-sizing: border-box;
}
#loginTurn .operation {
  position: absolute;
  top: 5%;
  right: 3%;
  color: #4e84e1;
  cursor: pointer;
}
.loginBox {
  width: auto;
  height: 320px;
  background: #fff;
  border-radius: 10px;
  position: absolute;
  top: 30%;
  right: 3%;
}
.loginBox h3 {
  text-align: center;
  margin-left: 0;
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
  margin-top: 9px;
}
.stem {
  font-size: 18px;
  position: absolute;
  top: 0;
  right: 0;
}
.chooseSys{
  margin-top: 45px;
}
</style>
