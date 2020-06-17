<template>
    <el-card style="padding: 0 20px; position: relative;">
        <div style="padding-top: 20px;" class="font-weight-700 teacher-title flex-lr">
            <span>配置</span>
            <previous-page style="margin: 0px" goPreviousPage="/selfExamList"></previous-page>
        </div>
        <div class="neck-input">
            <span style="margin-right: 100px;">
                自测名称:
                <input type="text" v-model="userConfigOptions.self_exam.name" />
            </span>
            <span class="redB">*</span>
            <span>
                自测总分: 
                <span>{{userConfigOptions.self_exam.total_score}}</span>
                <!-- <input type="text" v-model="userConfigOptions.self_exam.total_score"> -->
            </span>
        </div>
        <div style="overflow: auto;padding-bottom: 50px;">
            <single-list
                :list="singleList"
                :isSelf="isSelf"
                @changePoint="changePoint"
                @questionSort="questionSort"
            ></single-list>
            <multiple-list
                :list="multipleList"
                :isSelf="isSelf"
                @changePoint="changePoint"
                @questionSort="questionSort"
            ></multiple-list>
            <judge-list
                :list="judgeList"
                :isSelf="isSelf"
                @changePoint="changePoint"
                @questionSort="questionSort"
            ></judge-list>
            <prc-type
                :list="prcType"
                :isSelf="isSelf"
                @changePoint="changePoint"
                @questionSort="questionSort"
            ></prc-type>
        </div>
        <div class="footer flex-sx">
            <el-button @click="submitForm">提交</el-button>
        </div>
    </el-card>
</template>

<script>
import previousPage from "@/components/previousPage.vue";
import { selfExamCreate } from "@/api/taxUrl/selfExam";
import singleList from "@/views/lt/testPaperManage/groupPapers/singleList"; // 单选组件
import multipleList from "@/views/lt/testPaperManage/groupPapers/multipleList"; // 多选组件
import judgeList from "@/views/lt/testPaperManage/groupPapers/judgeList"; // 判断
import prcType from "@/views/lt/testPaperManage/groupPapers/prcType"; //实训
export default {
    data() {
        return {
            isSelf: true,
            // 配置信息
            userConfigOptions: {
                self_exam: {
                    name: "",
                    total_score: ""
                },
                sets: []
            },
            singleList: [], // 单选题型
            multipleList: [], // 多选题型
            judgeList: [], // 判断题型
            prcType: [], // 实训题型
            totalScore: ""
        };
    },
    watch: {
        totalScore() {
            if (this.userConfigOptions.sets.length > 0) {
                this.userConfigOptions.sets = [
                    ...this.singleList,
                    ...this.multipleList,
                    ...this.judgeList,
                    ...this.prcType
                ];
                let sum = 0;
                this.userConfigOptions.forEach(item => {
                    sum += Number(item.set_score);
                });
                this.userConfigOptions.self_exam.total_score = sum;
                return this.userConfigOptions.self_exam.total_score;
            }
            // this.computeTotalSelf()
        }
    },
    components: {
        previousPage,
        singleList,
        multipleList,
        judgeList,
        prcType
    },
    created() {},
    methods: {
      // 子组件改变分值后 父组件改变要提交的值相应改变
      changePoint(data) {
          let val = data[0];
          if (this[data[1]]) {
              for (const i of this[data[1]]) {
                  if (i.question_uuid === val.question_uuid) {
                      if (i.set_score) i.set_score = val.set_score;
                  }
              }
          }
        this.userConfigOptions.sets = [...this.singleList, ...this.multipleList, ...this.judgeList, ...this.prcType]
        this.computeTotalSelf(this.userConfigOptions.sets)
      },
      // 试题排序覆盖
      questionSort (data) {
        this[data[1]] = data[0]
      },
      // 计算总分
      computeTotalSelf (row) {
        let sum = 0
        row.forEach(item => {
          sum += Number(item.set_score)
        })
        this.userConfigOptions.self_exam.total_score = sum
      },
      async submitForm() {
        const that = this
        // that.userConfigOptions.sets = [...this.singleList, ...this.multipleList, ...this.judgeList, ...this.prcType]
        if(that.userConfigOptions.self_exam.name == '') return that.$message.error('请输入自测名称')
        if (that.userConfigOptions.sets.length <= 0) return that.$message('请添加试题')
        // that.computeTotalSelf(that.userConfigOptions.sets)
        const { data: { code, msg } } = await selfExamCreate({
          self_exam: JSON.stringify(that.userConfigOptions.self_exam),
          sets: JSON.stringify(that.userConfigOptions.sets),
        })
        if (code == '0000') {
          that.$message.success(msg)
          that.$router.push({name: 'selfExamList'})
            } else return that.$message(msg);
        }
    }
};
</script>

<style scoped>
@import "../../../lt/testPaperManage/groupPapers/set.css";
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