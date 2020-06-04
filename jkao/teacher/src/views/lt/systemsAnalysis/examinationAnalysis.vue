<template>
    <el-card shadow="never" class="box-card">
        <div class="contentBox">
            <div class="top">
                <div class="topTextBox">
                    <span class="leftBorder"></span>
                    <span class="titleTextStyle">
                        考试分析报告
                        <!-- {{form.name}} -->
                    </span>
                </div>
                <el-form ref="form" :model="form" label-width="80px" size="mini" class="formStyle">
                    <el-row>
                        <el-col>
                            <el-form-item label="选择考试:">
                                <!-- <el-input class="inputWidth" v-model="form.name" placeholder="请选择考试"></el-input> -->
                                <el-select
                                    v-model="form.id"
                                    placeholder="请选择"
                                    @change="checkOption"
                                >
                                    <el-option
                                        v-for="(item,index) in examList"
                                        :key="index"
                                        :label="item.name"
                                        :value="item.id"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <analysis-tab ref="analysisTabs" v-if="flag" :flag="flag" :examId="examId" ></analysis-tab>
            </div>
        </div>
    </el-card>
</template>
<script>
import echarts from "echarts";
import analysisTab from './analysisTab'
import qs from "qs";
export default {
    data() {
        return {
            form: {
                id: "",
                examName: "",
            },
            examId:'',//考试id
            examList: [], //考试数据
            flag:false
        };
    },
    created() {
        this.getExamList();
    },
    mounted(){
       
    },
    methods: {
        //获取考试列表
        getExamList() {
            this.$utils
                .post(
                    this.reqApi.shuiwuUrl + "/exam/list",
                    qs.stringify({
                        finished: 1
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.examList = res.data.exams.list;
                        
                        this.examList.forEach((item,index)=>{
                            if(sessionStorage.getItem('examId')){
                                if(sessionStorage.getItem('examId')==item.id){
                                    this.form.id=item.id
                                    this.examId=item.id
                                    this.flag=true
                                    this.$nextTick(()=>{
                                        
                                        this.$refs.analysisTabs.check(this.form.id)
                                    })
                                }
                            }
                        })
                    }
                });
        },
        checkOption(val){
          this.examId=val
          this.flag=true
          this.$nextTick(() => this.$refs.analysisTabs.check(val))
          
        },
    },
    components:{
      analysisTab
    }
};
</script>
<style scoped>
.contentBox {
    /* width: 100%; */
    min-width: 1200px;
    padding: 0 20px;
    overflow: auto;
    background-color: #fdfcfa;
}
.top,
.center,
.bottom {
    /* height: 500px; */
    /* width: 100%; */
    background-color: #fff;
}
.top {
    background-color: #fff;
    /* margin: 0 20px; */
    border: 1px solid #eee;
    border-top: 1px solid #444;
    margin-top: 20px;
}
.top .topTextBox {
    height: 30px;
    line-height: 30px;
    background-color: #eee;
    padding-left: 10px;
}
.center {
    /* background-color: #eee; */
    overflow: hidden;
}
.bottom {
    /* background-color: lightgreen; */
}
.inputWidth {
    width: 300px;
}
.inputWidth input {
    height: 28px;
}
.formStyle {
    margin-top: 20px;
}
.pieChart {
    /* width: 100%; */
    /* background-color: #fff; */
}
.Histogram1 {
    /* background-color: ; */
}
.leftBorder {
    width: 5px;
    border-left: 5px solid #ff0000;
}
</style>