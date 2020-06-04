<template>
    <div class="exam-box">
        <!-- 考试界面身体 -->
        <div class="exam-body">
            <!-- 试题部分 -->
            <div class="exam-question">
              <!-- <span class="delStyle" @click="delCollect" v-if="singleObjs.length>0||multiObjs.length>0||judgeObjs.length>0||prcQus.length>0">删除</span> -->
                <!-- tab栏 -->
                <exam-tabs
                    :activeName="activeName"
                    :singleObjs="singleObjs"
                    :remarksList="remarksList"
                    :multiObjs="multiObjs"
                    :judgeObjs="judgeObjs"
                    :prcQus="prcQus"
                    @handleTabs="handleTabs"
                ></exam-tabs>
                <!-- tab中的内容 -->
                <div class="tab-content">
                    <!-- 单选题 -->
                    <template v-if="activeName === 'single'">
                        <single-tab
                            type="viewDetails"
                            :singleObjs="singleObjs"
                            :collect_id="collect_id"
                            :remarksList="remarksList"
                            :activeName="activeName"
                            :showQuestion="showQuestion"
                            @getData="getData"
                            @add="showQuestion++"
                            @cut="showQuestion--"
                        ></single-tab>
                    </template>
                    <!-- 多选题 -->
                    <template v-if="activeName === 'multiple'">
                        <multiple-tab
                            type="viewDetails"
                            :multiObjs="multiObjs"
                            :remarksList="remarksList"
                            :collect_id="collect_id"
                            :showQuestion="showQuestion"
                            @add="showQuestion++"
                            @cut="showQuestion--"
                            @getData="getData"
                        ></multiple-tab>
                    </template>
                    <!-- 判断题 -->
                    <template v-if="activeName === 'judge'">
                        <single-tab
                            type="viewDetails"
                            :singleObjs="judgeObjs"
                            :remarksList="remarksList"
                            :collect_id="collect_id"
                            :activeName="activeName"
                            @getData="getData"
                            :showQuestion="showQuestion"
                            @add="showQuestion++"
                            @cut="showQuestion--"
                        ></single-tab>
                    </template>
                    <!-- s实训题 -->
                    <template v-if="activeName === 'tax'">
                        <tax-tab
                            type="viewDetails"
                            :remarksList="remarksList"
                            :prcQus="prcQus"
                            :collect_id="collect_id"
                            @getData="getData"
                            :showQuestion="showQuestion"
                            @add="showQuestion++"
                            @cut="showQuestion--"
                        ></tax-tab>
                    </template>
                </div>
            </div>
            <!-- 学生信息 -->
            <div class="exam-detail">
               <div class="imgStyle">
                  <img  :src="reqApi.shuiwuUrl+stuObject.user_photo" alt />
               </div>
                姓名：{{stuObject.realname}}
                <br />学号：{{stuObject.num}}
                <exam-detail
                    @handleTabs="handleTabs"
                    @jumpToCurrent="jumpToCurrent"
                    :activeName="activeName"
                    :showQuestion="showQuestion"
                    :singleObjs="singleObjs"
                    :multiObjs="multiObjs"
                    :judgeObjs="judgeObjs"
                    :prcQus="prcQus"
                ></exam-detail>
            </div>
        </div>
    </div>
</template>

<script>
import qs from "qs";
import { detailHistory } from "@/api/taxUrl/exam";
import { selfExamDetail } from "@/api/taxUrl/selfExam";
import { detailForAys } from "@/api/taxUrl/Analysis";
import examDetail from "@/views/cx/myTest/components/examDetail"; // 学生详情
import examTabs from "@/views/cx/myTest/components/examTabs"; // tab栏
import singleTab from "@/views/cx/myTest/components/singleTab"; // 单选判断
import multipleTab from "@/views/cx/myTest/components/multipleTab"; // 多选
import taxTab from "@/views/cx/myTest/components/taxTab"; // 实训
export default {
    data() {
        return {
            activeName: "single", // tab选中栏
            examDetailInfo: {}, // 考试详情信息
            paperDetailInfo: {}, // 试卷详情信息
            // singleObjs: [], // 单选题
            // multiObjs: [], // 多选题
            // judgeObjs: [], // 判断题
            // prcQus: [], // 实训题集合
            showQuestion: 0,
            collect_id:this.collect_id,
            stuObject:{},
            remarksList:this.remarks
        };
    },
    created() {
        this.getExam();
        this.getStuDetail()
        /**
         * @testDetail  1 表示自测详情 2 表示从考试管理-->考试详情-->查看详情中进入  不传表示查看考试详情   ------可用于判断返回按钮返回哪个页面
         */
        this.detailHistory(
            this.$route.query.exam_id,
            this.$route.query.testDetail
        ); // 获取考试信息
    },
    mounted() {
      this.collect_id=this.collectId
    },
    watch:{
      
      singleObjs:{
        handler(old,newVal){
          this.getExam()
        },
        immediate: true,
        deep: true, 
      },
    },
    components: {
        examDetail,
        examTabs,
        singleTab,
        multipleTab,
        taxTab
    },
    props: {
        judgeObjs: Array,
        singleObjs: Array,
        multiObjs: Array,
        prcQus: Array,
        collectId:Number,
        remarks:Array
    },
    methods: {
      getStuDetail(){
            this.$utils.post(this.reqApi.shuiwuUrl+'/student/detail',qs.stringify({
                student_id:sessionStorage.getItem('userId')
            })).then(res=>{
                if(res.data.code==='0000'){
                    this.stuObject=res.data.student
                }
            })
        },
      getData(question_uuid){
        // console.log(this.collectId)
        // console.log(question_uuid,'==')
        // return
        this.$utils.post(this.reqApi.shuiwuUrl+'/collect/cancel',qs.stringify({
                    collect_id:this.collect_id,
                    question_uuid:question_uuid
            })).then(res=>{
                if(res.data.code==='0000'){
                    this.$message.success('删除成功！')
                    this.$emit('search')
                }
            })
      },
        getExam() {
            if (this.singleObjs && this.singleObjs.length > 0) {
                this.activeName = "single";
            } else if (this.multiObjs && this.multiObjs.length > 0) {
                this.activeName = "multiple";
            } else if (this.judgeObjs && this.judgeObjs.length > 0) {
                this.activeName = "judge";
            } else if (this.prcQus && this.prcQus.length > 0) {
                this.activeName = "tax";
            }
             // 遍历单选操作
            for (const single of this.singleObjs) {
                // this.$nextTick(() => {
                    single.checkAnswer = single.question.key;
                // });
            }
            // 遍历多选操作
            for (const multiple of this.multiObjs) {
                // this.$nextTick(() => {
                    multiple.checkAnswer = multiple.question.key;
                // });
            }
            // 遍历判选操作
            for (const judge of this.judgeObjs) {
                // this.$nextTick(() => {
                    judge.checkAnswer = judge.question.key;
                // });
            }



            return
            // 调用
            this.getRecord(
                this.singleObjs,
                this.multiObjs,
                this.judgeObjs,
                this.prcQus
            );
        },
        // 获取开始考试信息
        async detailHistory(exam_id, testDetail) {
            return;
            let res = {};
            if (testDetail == 1) {
                res = await selfExamDetail({ self_exam_id: exam_id });
            } else if (testDetail == 2) {
                res = await detailForAys({ exam_id });
            } else {
                res = await detailHistory({ exam_id });
            }
            const {
                code,
                msg,
                singleObjs,
                multiObjs,
                judgeObjs,
                prcQus,
                records
            } = res.data;
            if (code == "0000") {
                // 这三个遍历 手动添加考生所选选中答案字段
                for (const i of singleObjs) {
                    this.$set(i, "checkAnswer", "");
                }
                for (const i of multiObjs) {
                    this.$set(i, "checkAnswer", "");
                }
                for (const i of judgeObjs) {
                    this.$set(i, "checkAnswer", "");
                }
                this.singleObjs = singleObjs;
                this.multiObjs = multiObjs;
                this.judgeObjs = judgeObjs;
                this.prcQus = prcQus;
                if (this.singleObjs && this.singleObjs.length > 0) {
                    this.activeName = "single";
                } else if (this.multiObjs && this.multiObjs.length > 0) {
                    this.activeName = "multiple";
                } else if (this.judgeObjs && this.judgeObjs.length > 0) {
                    this.activeName = "judge";
                } else if (this.prcQus && this.prcQus.length > 0) {
                    this.activeName = "tax";
                }
                // 调用
                this.getRecord(
                    records,
                    singleObjs,
                    multiObjs,
                    judgeObjs,
                    prcQus
                );
            }
        },
        /**
         * @records 用户的所有操作 @singleObjs 单选列表 @multiObjs 多选列表 @judgeObjs 判断列表
         */
        getRecord(singleObjs, multiObjs, judgeObjs) {
            // 这边三个遍历 将答案放入自己手动添加的字段中
            // 遍历单选操作
            for (const single of this.singleObjs) {
                // this.$nextTick(() => {
                    single.checkAnswer = this.single.question.key;
                // });
            }
            // 遍历多选操作
            for (const multiple of this.multiObjs) {
                // this.$nextTick(() => {
                    multiple.checkAnswer = this.multiple.question.key;
                // });
            }
            // 遍历判选操作
            for (const judge of this.judgeObjs) {
                // this.$nextTick(() => {
                    judge.checkAnswer = this.judge.question.key;
                // });
            }
        },
        /* 学生信息tabs栏 */
        handleTabs(data) {
            this.activeName = data;
            this.showQuestion = 0;
        },
        /* 学生信息栏切换题 */
        jumpToCurrent(data) {
            this.showQuestion = data;
        }
    }
};
</script>

<style scoped>
/* @import "./components/exam.css"; */
/* 试题部分 */
.exam-question {
    width: calc(100% - 464px);
    height: 100%;
    /* background-color: rgb(13, 138, 44); */
    padding: 0px;
    position: relative;
    margin-left: 20px;
}
.exam-body {
    position: relative;
}
.exam-detail {
    position: absolute;
    top: 0;
    right: 0;
    width: 372px;
}
.delStyle{
  position: absolute;
  right: 0;
}
.imgStyle{
  width: 100px;
  /* height: 50px; */
}
.imgStyle img{
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
</style>
