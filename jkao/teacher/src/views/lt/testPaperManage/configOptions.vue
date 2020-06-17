<template>
  <el-card style="padding: 0 20px; position: relative;">
    <div style="padding-top: 20px;" class="font-weight-700 teacher-title flex-lr">
      <span>配置</span>
      <previous-page style="margin: 0px" goPreviousPage="/findPapers"></previous-page>
    </div>
    <div class="neck-input">
      <span style="margin-right: 100px;">卷面总分: {{userConfigOptions.total_score}}</span>
      <span class="redB">*</span>
      <span>及格分数: <input type="text" @input="checkScore(userConfigOptions.pass_score)" v-model="userConfigOptions.pass_score"></span>
    </div>
    <div style="overflow: auto;padding-bottom: 50px;">
      <single-list :list="singleList" @changePoint="changePoint" @questionSort="questionSort"></single-list>
      <multiple-list :list="multipleList" @changePoint="changePoint" @questionSort="questionSort"></multiple-list>
      <judge-list :list="judgeList" @changePoint="changePoint" @questionSort="questionSort"></judge-list>
      <prc-type :list="prcType" @changePoint="changePoint" @questionSort="questionSort"></prc-type>
    </div>
    <div class="footer flex-sx">
      <el-button @click="submitForm">提交</el-button>
    </div>
  </el-card>
</template>

<script>
  import previousPage from "@/components/previousPage.vue";
  import { paperDetail, typePaperSet, papersetDetail } from '@/api/taxUrl/testpaper'
  import singleList from "./groupPapers/singleList";
  import multipleList from "./groupPapers/multipleList";
  import judgeList from "./groupPapers/judgeList";
  import prcType from "./groupPapers/prcType";
  export default {
    data () {
      return {
        isSelf: false,
        // 配置信息
        userConfigOptions: {
          id: '',
          total_score: 0,
          pass_score: 0,
          // ppapertype: 0,
          sets: []
        },
        singleList: [], // 单选题型
        multipleList: [], // 多选题型
        judgeList: [], // 判断题型
        prcType: [], // 实训题型
      }
    },
    components: {
      previousPage,
      singleList,
      multipleList,
      judgeList,
      prcType
    },
    created () {
      this.paperDetail() // 获取试卷信息
    },
    methods: {
      async paperDetail () {
        const that = this
        const { data: { code, testpaper, back } } = await papersetDetail(that.$route.query.id - 0)
        if (code == '0000') {
          for (const i of back) {
            i.content = i.content.replace(/<[^>]+>|&[^>]+;/g,"").trim()
            if (i.type == 1 && i.kind == 1) this.$nextTick(() => this.singleList.push(i))
            if (i.type == 2 && i.kind == 1) this.$nextTick(() => this.multipleList.push(i))
            if (i.type == 3 && i.kind == 1) this.$nextTick(() => this.judgeList.push(i))
            if (i.kind == 2)this.$nextTick(() => this.prcType.push(i))
          }
          that.userConfigOptions.sets = back
          Object.keys(testpaper).forEach(key => {
            if (that.userConfigOptions[key] !== undefined) that.userConfigOptions[key] = testpaper[key]
          })
        }
      },
      // 子组件改变分值后 父组件改变要提交的值相应改变
      changePoint (data) {
        let val = data[0]
        if (this[data[1]]) {
          for (const i of this[data[1]]) {
            if (i.question_uuid === val.question_uuid) {
              i.point = val.point
            }
          }
        }
        this.userConfigOptions.sets = [...this.singleList, ...this.multipleList, ...this.judgeList, ...this.prcType]
        this.computeTotal(this.userConfigOptions.sets)
      },
      // 试题排序覆盖
      questionSort (data) {
        this[data[1]] = data[0]
      },
      checkScore (val) {
        let g = val + ''
        g = g.replace(/[^0-9]/g,'')
        this.userConfigOptions.pass_score = g
      },
      // 计算总分
      computeTotal (row) {
        let sum = 0
        row.forEach(item => {
          sum += Number(item.point)
        })
        this.userConfigOptions.total_score = sum
      },
      async submitForm() {
        const that = this
        // that.userConfigOptions.sets = [...this.singleList, ...this.multipleList, ...this.judgeList, ...this.prcType]
        if (that.userConfigOptions.sets.length <= 0) return this.$message('请添加试题')
        // that.computeTotal(that.userConfigOptions.sets)
        const { data: { code, msg } } = await typePaperSet({
          testpaper_id: that.userConfigOptions.id,
          total_score: that.userConfigOptions.total_score,
          pass_score: that.userConfigOptions.pass_score,
          sets: JSON.stringify(that.userConfigOptions.sets),
        })
        if (code == '0000') {
          that.$message.success(msg)
          that.$router.push({name : 'findPapers'})
        }
        else return that.$message(msg)
      },
    }
  }
</script>

<style scoped>
  @import './groupPapers/set.css';
  .footer {
    position: absolute;
    bottom: 0px;
    left: 0px;
    padding-left: 20px;
    z-index: 999;
    width: calc(100% - 20px);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    height: 40px;
    z-index: 99;
  }
</style>