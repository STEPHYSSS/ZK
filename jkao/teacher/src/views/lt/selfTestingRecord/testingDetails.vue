<template>
  <el-card shadow="never" id="look-d" class="box-card">
    <my-bread2 level1="用户自测记录" :level2="level2"></my-bread2>

    <el-row class="row-bg">
      <!--左侧题目-->
      <div id="lookDetails-left" class="left">
        <!--标签页-->
        <el-tabs type="card" v-model="activeName" class="tabs" @tab-click="handleClick">
          <el-tab-pane v-for="(item, index) in object.tmUserTestSection" :key="index" :label="item.sname" :name="index + ''">
            <span class="pd-header-span">
              {{item.sname}}
              (共<span class="redQ">{{singleChoice.qsl}}</span>题,
              每题<span class="redQ">{{singleChoice.score}}</span>分,
              共<span class="redQ">{{singleChoice.qsl * singleChoice.score || 0}}</span>分)
            </span>
            <span class="look-mg-left">时间设定 : {{object.starttime}} -- {{object.endtime}}</span>
            <span class="look-mg-left">考试时长 : {{object.duration}}</span>
            <span class="look-mg-left">卷面总分 : {{object.totalscore}}</span>
            <span class="look-mg-left">得分 : {{object.userscore}}</span>

            <!-- 试卷名字 -->
            <span class="section">{{object.tname || ''}}</span>
            <!--试题内容（包括题干和选项）-->
            <div v-for="(item1, index) in item.tmUserTestQuestion" :key="index">
              <div class="questions-two" v-if="index === showQuestion">
                <!--题干-->
                <div class="stem">
                  <h3>
                    <img src="@/assets/images/myTest-icon-two.png" alt="">题干
                  </h3>
                  <p style="padding-left: 70px;" v-html="item1.tmQuestion.qcontent"></p>
                </div>
                <!--选项-->
                <div class="option font-color-82 stem" v-if="item1.tmQuestion.qtype != 4">
                  <h3><img src="@/assets/images/myTest-icon-one.png" alt="">选项</h3>
                  <div class="option-p" v-for="(item2, index) in item1.tmQuestion.options" :key="index">
                    <div v-if="!item1.edata" class="">
                      <span>{{item2.okey}}.</span>
                      <span>{{item2.otxt}}</span>
                    </div>
                    <div v-else :class="item1.edata.indexOf(item2.okey) !== -1 ? 'redQ' : ''">
                      <span>{{item2.okey}}.</span>
                      <span>{{item2.otxt}}</span>
                    </div>
                  </div>
                  <span class="option-p an">您的答案 : <span class="redQ">{{item1.edata || ''}}</span></span>
                  <span class="option-p an" style="padding-left: 40px;color:red">正确答案 : <span class="greenQ">{{item1.tmQuestion.qkey || ''}}</span></span>
                </div>
                <!--解析-->
                <h3>
                  <img src="@/assets/images/myTest-icon-two.png" alt="">解析
                </h3>
                <p style="padding-left: 70px;" v-html="item1.tmQuestion.qresolve || '无试题解析'"></p>
                <br/>
                <el-button
                type="primary"
                style="color: #fff;"
                v-if="item1.tmQuestion.qtype===4"
                @click="showScore(item1.tmQuestion.caseBh)">实训分数
                </el-button>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>

      <!--右侧信息-->
      <div id="lookDetail-right-info" class="info">
        <div class="personalInfo">
          <div class="per-info-img"><img :src="$utils.serverUrl + obj.uPhoto" :onerror="errorImg" alt=""></div>
          <span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名 : {{obj.uRealname}}</span><br>
          <span>学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号 : {{obj.uNo}}</span><br>
          <span>班&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;级 : 暂无数据</span><br>
          <span>考试日期 : {{obj.uRegdate}}</span>
          <!-- <span>考试日期 : </span> -->
        </div>

        <div class="topicInfo">
          <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane
             v-for="(item, index) in object.tmUserTestSection" :key="index"
             :label="item.sname" :name="index + ''">
              <a href="javaScript:;" v-for="(item1, index) in item.tmUserTestQuestion" :key="index">
                <span class="info-question" v-if="!item1.edata" @click="singleChoiceCb(index)">{{index + 1}}</span>
                <span class="info-question" v-else :class="[item1.edata === item1.tmQuestion.qkey ? 'greenB' : 'redB']" @click="singleChoiceCb(index)">{{index + 1}}</span>
              </a>
            </el-tab-pane>
            <div class="qzbhh isSign text-center font-size-12">
              <span class="greenB">对题</span>
              <span class="redB">错题</span>
              <span>未答</span>
            </div>
          </el-tabs>
        </div>

        <div class="tableInfo">
          <el-table :data="object.tmUserTestSection" border style="width: 100%" :header-cell-style="{textAlign:'center'}" :cell-style="{textAlign:'center'}">
            <el-table-column prop="sname" label="题型"></el-table-column>
            <el-table-column prop="remark" label="描述"></el-table-column>
          </el-table>
          <!-- <span class="table-info-logo">LOGO</span> -->
          <!-- <span class="table-info-chou fr">CHOUDONGXI</span> -->
        </div>

      </div>
    </el-row>

    <el-dialog title="实训试题分数查询" center :visible.sync="practicalTraining" class="scorePT">
        <!--<vue-scroll :ops="ops" style="height:550px;width: auto;">-->
            <el-table :data="gradeTable" border show-summary height="550"
                      :header-cell-style="{background:'#c7eff5',color:'#000',textAlign:'center'}"
                      :cell-style="{textAlign:'center'}">
                <el-table-column prop="id.xh" label="序号" width="50" align="center"></el-table-column>
                <el-table-column prop="pfxm" label="评分项目" width="330" align="center"></el-table-column>
                <el-table-column label="学生所填的值" align="center">
                    <template slot-scope="scope">
                        {{parseFloat(scope.row.val).toFixed(2)}}
                    </template>
                </el-table-column>
                <el-table-column label="标准值" align="center">
                    <template slot-scope="scope">
                        {{parseFloat(scope.row.bzz).toFixed(2)}}
                    </template>
                </el-table-column>
                <el-table-column prop="fs" label="得分" align="center">
                    <template slot-scope="scope">
                        {{parseFloat(scope.row.fs).toFixed(2)}}
                    </template>
                </el-table-column>
                <el-table-column prop="ydfs" label="应得分数" align="center"></el-table-column>
            </el-table>
        <!--</vue-scroll>-->
    </el-dialog>
  </el-card>
</template>

<script>
  export default {
    name: "exam",
    data() {
      return {
        gradeTable: null,
        practicalTraining: false,//（实训题分数弹框）
        errorImg: 'this.src="' + require('@/assets/images/failToLoad.png') + '"',
        level2: '',

        // 学生信息
        obj: {},
        // 本页数据
        object: {},
        // 单选题
        singleChoice: {},
        // 显示哪个题
        showQuestion: 0,
        activeName: '0',
      };
    },

    created () {
      if (this.$route.query.id) return this.getExamParticulars()
    },

    methods: {
      getExamParticulars () {
        const that = this
        that.$utils.post(`/exam/test/userTestParticulars/${that.$route.query.id}`).then(res => {
          const {object, sbb, code} = res.data
          if (code === '00') {
            that.level2 = object.tname
            that.object = object
            that.obj = sbb
          }
        })
      },

      // 单选题
      singleChoiceCb (index) {
        this.showQuestion = index
      },

      // tab
      handleClick(e) {
        this.showQuestion = 0
      },

      //实训提 显示分数
      showScore(caseBh) {
        const that = this;
        that.$utils.post(`tax/getExamScore/${that.$route.query.id}/${caseBh}`).then(res => {
          const {code, msg, object} = res.data;
          if (code === '00') {
            if (object) {
              that.gradeTable = object.list;
              that.practicalTraining = true;
            }
            else return that.$message('本题无作答！')
          }
          else return that.$message(msg)
        })
      },
    },

    beforeDestroy () {
      sessionStorage.removeItem('studentInfo')
    },

  }
</script>

<style scoped>
  @import '../../../style/lookDe.css';
</style>
