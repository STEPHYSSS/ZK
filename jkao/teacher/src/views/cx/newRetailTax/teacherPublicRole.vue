<template>
  <div class="login" id="loginTurn">
   <img src="@/assets/images/returnbutton.png" class="reback"  @click="returnBack"/>
    <!-- <div class="loginBox">
      <span class="operation" @click="operation">操作流程</span>
      <h3>请选择您要进入的系统模块</h3>
      <div class="user">
        <div class="inputBox1">
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
    </el-dialog> -->
    <div class="bigBox">
      <div class="boxShow">
        <span class="operation" @click="operation">操作流程</span>
        <div class="logFlex">
          <h3>请选择您要进入的系统模块</h3>
          <div class="topicon">
            <ul>
              <li v-for="(item,index) in Imgs" :key="index"  :class="{active:index == ins}" @click="CheckSys(item.activeName,index)">
                <img :src="index == ins ? item.active : item.normal">
                <p>{{item.title}}</p>
              </li>
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
    </div>
    <el-dialog :visible.sync="dialogVisible" :before-close="handleClose" width="80%">
      <img src="@/assets/images/img1.png" style="width:100%" alt="操作流程" />
    </el-dialog>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name:"teacherPublicRole",
  data() {
    return {
      dialogVisible: false,
      token: sessionStorage.getItem("token"),
      companyId: sessionStorage.getItem("companyId"),
      // companyId:this.$route.query.companyId,
      examFlow: this.$route.query.examFlow,
      examType: this.$route.query.examType,
      questionCode: this.$route.query.questionCode,
      baseScore: this.$route.query.baseScore,
      teacher: this.$route.query.teacher, //老师端账套设置
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
          active: require("@/assets/images/shouyinpos_icon1@2x.png")
        },
        {
          title:'门店',
          activeName:'store',
          normal: require("@/assets/images/mendian_icon.png"),
          active: require("@/assets/images/mendian_icon1@2x.png")
        },
        {
          title:'供应商',
          activeName:'supplier',
          normal: require("@/assets/images/gongyingshang_icon.png"),
          active: require("@/assets/images/gongyingshang_icon1@2x.png")
        },{
          title:'仓库后台',
          activeName:'warehouse',
          normal: require("@/assets/images/cangku_icon.png"),
          active: require("@/assets/images/cangku_icon1@2x.png")
        },{
          title:'商城后台',
          activeName:'mall',
          normal: require("@/assets/images/shangcheng_icon.png"),
          active: require("@/assets/images/shangcheng_icon1@2x.png")
        },{
          title:'收银POS',
          activeName:'clerk',
          normal: require("@/assets/images/pos_icon.png"),
          active: require("@/assets/images/shouyinpos_icon1@2x.png")
        },{
          title:'手机商城',
          activeName:'shop',
          normal: require("@/assets/images/shoujishangcheng_icon.png"),
          active: require("@/assets/images/shouji_icon 1@2x.png")
        }
      ],
      ins:0
    };
  },
  created() {
  },
  methods: {
    // 操作提示
    operation() {
      this.dialogVisible = !this.dialogVisible;
    },
    handleClose(done) {
      this.dialogVisible = false;
    },
    // 登录开始
    CheckSys(val,index){
      this.activeName = val;
      this.ins = index
    },
    // 登录结束
    // 点击跳转
    toNewra(activeName) {
      if (this.ruleForm.account === "" || this.ruleForm.password === "")
      return that.$message("用户名或密码不能为空");
      this.$utils
      .post(
        this.reqApi.xinls + `/exam/docking/case/login`,
        qs.stringify({
          token: sessionStorage.getItem("token"),
          companyId: this.companyId,
          system: activeName,
          account: this.ruleForm.account,
          password:this.ruleForm.password
        })
      )
      .then(res => {
        if (res.data.code == "0000") {
          let flag = res.data.data
          if (activeName == "clerk") {//收银
            window.location.href = this.reqApi.xinls + "/pay/#/kongbai?flag=" + flag + "&type=" + activeName + "&flagT=" + "Tea";
            // window.location.href = "http://192.168.1.144:8082" + "/#/kongbai?flag=" + flag + "&type=" + activeName + "&flagT=" + "Tea";
          }else if(activeName == "shop"){//手机商城
            // window.location.href = this.reqApi.xinls + "/#/transferDirectory?flag=" + flag + "&type=" + activeName + "&flagT=" + "Tea"
            window.location.href = "http://192.168.1.144:8081" + "/#/transferDirectory?flag=" + flag + "&type=" + activeName + "&flagT=" + "Tea"
          } else {//运营，门店，商城，供应商，仓库后台
            // window.location.href = this.reqApi.xinls + "/#/transferDirectory?flag=" + flag + "&type=" + activeName + "&flagT=" + "Tea"
            window.location.href = "http://192.168.1.144:8081" + "/#/transferDirectory?flag=" + flag + "&type=" + activeName + "&flagT=" + "Tea"
          }
        }else return this.$message.error(res.data.msg)
      });
    },
    returnBack() {
      if(this.teacher) {
        this.$router.push({
          name:'accountSet'
        })
      }else{
        this.$router.push({
          name:'accountSet'
        })
      }
    },
    o(index) {
      this.showValue.forEach((item, i) => {
        if (index == i) {
          this.ruleForm.username = item;
        }
      });
      this.flag = false;
    },
    downList() {
      this.flag = !this.flag;
    }
  },
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

.bigBox{
  padding-top: 85px;
}
.boxShow {
  max-width: 975px;
  min-width: 800px;
  /* width: 975px; */
  height: 657px;
  border: 1px solid #d0e9f4;
  position: relative;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 2px 6px 16px 3px #dfeaf4;
  min-width: 800px;
}
.boxShow h3 {
  display: block;
  text-align: center;
  padding: 0;
  font-size: 20px;
}
.logFlex{
  display: flex;
  flex-direction:column;
  width: 800px;
  margin: 55px auto 0;
  box-sizing: border-box;
}
.topicon{
  flex:1;
  margin: 5% 0;
}
.topicon ul li {
  float: left;
  width: 60px;
  height: 94px;
  text-align: center;
  position: relative;
  margin: 0 20px;
  cursor: pointer;
}
.topicon ul li img {
  width: 35px;
  height: 35px;
  margin-bottom: 22px;
}
.active img{
  position: absolute;
  top: -10px;
  left: 4px;
  width: 60px  !important;
  height: 60px  !important;
  margin-bottom: 13px !important;
}
.active p{
  position: absolute;
  bottom: 13px;
  left: -15px;
  width: 100px;
  text-align: center;
  font-size: 16px;
}
.topicon ul{
  margin-left: 5%;
}
.inputBox .newLoginBtn{
  width: 323px;
  height: 50px;
  position: absolute;
  bottom: 0px;
  background: #4E84E1 !important;
  font-size: 18px;
  letter-spacing: 10px;
  color: #fff;
  border: 0;
}
.bottonicon {
  flex:1;
  display: flex;
}
.bottonicon .bottonimg {
  width: 320px;
  box-sizing: border-box;
}
.inputBox{
  width: 326px;
  margin-left: 68px;
  position: relative;
  height: 176px;
  margin-top: 60px;
}
.inputBox .el-input{
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
  margin-top: 9px;
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
.reback{
  float: right;
  margin: 20px 20px 0 0;
}
</style>
