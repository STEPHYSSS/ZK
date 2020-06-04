<template>
	<div>
		<el-container class="tax-index" style="height: 100vh;">
      <el-tooltip class="item" effect="dark" :content="shrinkH ? '收起' : '展开'" placement="bottom-end">
        <div :class="shrinkH ? 'retract' : 'open'" @click="shrinkH = !shrinkH"></div>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="保存并返回" placement="bottom-end">
        <div v-if="this.$route.params.lx" @click="goback" class="saveBack"></div>
        <div v-if="qcontent.sbzlDm === '405'" @click="goback" class="saveBack"></div>
      </el-tooltip>
      <el-header class="txalign" :style="shrinkH ? 'height: 260px' : 'height: 130px'">
        <div class="img-title"></div>
        <el-card shadow="always" style="height: 200px" class="tax-css-body stem txalign-l">
          <div class="exam-topic">
            <div v-if="qcontent.name">
              {{qcontent.name}},共
              <span style="color: red;" class="font-size-16">{{qcontent.total}}</span>
              题, 此题为第
              <span style="color: red;" class="font-size-16">{{qcontent.cur}}</span> 题。
            </div>
            <!-- {{qcontent.content}} -->
            <span v-html="qcontent.content"></span>
          </div>
          <count-down
          :examInfo="examInfo"
          v-if="examInfo"
          @autoSubmit="autoHandInExaminationPaper"
          ref="countDown"
          class="exam-interval"></count-down>

        </el-card>
        <!-- <a href="javascript:;" @click="shou" class="arrow-up txalign">
          <i class="iconfont icon-double-caret-down"></i>
        </a> -->
      </el-header>
			<el-main>
        <v-content></v-content>
			</el-main>
		</el-container>
	</div>
</template>

<script>
  import content from '@/components/content';
  import countDown from '@/components/countDown.vue'
	export default {
		data() {
			return {
        name:'',
        shrinkH: false,
        qcontent: JSON.parse(sessionStorage.practicalContent),
        examInfo:null,// 考试信息（时长，截止时间,开始时间，当前服务器时间）
			}
		},
		components: {
      "v-content": content,
      countDown
    },
		created() {
      this.testDetails()
		},
		methods: {
      //页面数据
      testDetails() {
        const pid = sessionStorage.getItem('examCCpid')
        if (!pid) return false
        const that = this;
        const obj = {
          pid: pid,
          uid: sessionStorage.getItem('userId')
        }
        that.$utils.post('exam/newExam', obj).then(res => {
          const {object,sbb,code,paging} = res.data
          if (code == '00') {
            that.examInfo = {//传给子组件的值
              'duration':object.pduration,
              'deadline':object.pendtime,
              'nowTime':paging,
              'starTime':sbb.starttime
            }
          }
        })
      },
      //自动交卷(无弹框提示，直接交卷跳转到历史页面)
      autoHandInExaminationPaper() {
        let that = this;
        // 马上清除定时器，暂停时间
        that.$refs.countDown.clearTime();
        let examPost = {
          eid: sessionStorage.getItem('examCCeid'),
          pid: sessionStorage.getItem('examCCpid'),
          uid: sessionStorage.getItem('userId')
        };
        that.$utils.post(`exam/endExam`, examPost).then(res => {
          if (res.data.code === "00") return that.$refs.countDown.removeSession('/historyTryBook')
        })
      },
      // shou () {
      //   this.shrinkH = !this.shrinkH
      //   document.querySelector('.el-header').style.height = !this.shrinkH ? "260px" : "130px"
      //   document.querySelector('.icon-double-caret-down').style.transform = !this.shrinkH ? "rotateZ(180deg)" : "rotateZ(0deg)"
      // },
      goback () {
        if (this.qcontent.lx == 'TEST' && !this.qcontent.back) return this.$router.push(`/startSelf-test/${this.qcontent.tid}`)
        else if (this.qcontent.lx == 'TEST' && this.qcontent.back === 'test') return this.$router.push(`/selfTestRecordParticulars?id=${this.qcontent.tid}`)
        else if (this.qcontent.lx == 'EXAM') return this.$router.push(`/exam/${sessionStorage.examPid}`)
        else return this.$message('请先返回主页！')
      }
    },
	}
</script>

<style scoped="scoped">
  .el-main {
    padding: 20px 70px;
  }
	header.el-header {
    position: relative;
    width: 100%;
    padding: 0 70px;
    transition: .5s;
    overflow: hidden;
  }
  .el-container {
    background: url('../assets/images/taxBg.png') no-repeat;
    background-size: 100% 100%;
  }
  .img-title {
    height: 30px;
    background: url('../assets/images/sxkst.png') no-repeat center center;
  }
  .stem {
    width: calc(100% - 45px);
    min-height: 70px;
    min-width: 1260px;
    background-color: #fff;
    padding: 15px 20px;
    overflow: auto;
  }
  .saveBack, .retract, .open {
    background: url('../assets/images/baochun_icon.png') no-repeat 100% 100%;
    width: 20px;
    height: 30px;
    display: inline-block;
    position: absolute;
    top: -3px;
    right: 14px;
    z-index: 999;
  }
  .retract, .open {
    background: url('../assets/images/shouqi_icon.png') no-repeat 100% 100%;
    top: -14px;
    right: 49px;
  }
  .open {
    background: url('../assets/images/zhankai_icon.png') no-repeat 100% 100%;
    top: -7px;
  }
  /* .arrow-up {
    display: block;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 20px;
    line-height: 20px;
    background-color: #000;
  } */
  /* .arrow-up .icon-double-caret-down {
    display: inline-block;
    transform: rotate(180deg);
    transition: .5s;
  } */
  .exam-topic, .exam-interval {
    display: inline-block;
  }
  .exam-topic {
    width: calc(100% - 240px);
  }
  .exam-interval {
    position: absolute;
  }
</style>
