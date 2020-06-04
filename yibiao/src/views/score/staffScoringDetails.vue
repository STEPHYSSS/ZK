<template>
    <div class="hello">
        <table class="table-box" border="1" cellspacing="0" cellpadding="0" width="1500"  style="font-size:14px">
            <caption
                align="top"
                class="table-title"
                style="width: 100%;height: 40px;
    line-height: 40px;border: 1px solid #000;border-bottom: none;"
            >{普通员工}月度考核评分表</caption>
            <tr style="height:45px;line-height: 45px;
    text-align: center;">
                <td width="150">被考评对象</td>
                <td width="150">{{data.personnelName}}</td>
                <td width="150">部门</td>
                <td width="600">{{data.personnelName}}</td>
                <td width="150"  >职务</td>
                <td width="300" colspan="2"></td>
                <!-- <td width="300" colspan="2"></td> -->
                <!-- <td width="150">综合得分</td> -->
                <!-- <td width="150"></td> -->
            </tr>
            <tr style="height:45px;line-height: 45px;
    text-align: center;">
                <td>考评人</td>
                <td>{{data.gradePersonnelName}}</td>
                <td>考评时间</td>
                <td>{{data.startTime|fmtDate1}} 至 {{data.endTime|fmtDate1}}</td>
                <!-- <td>填表时间</td>
                <td colspan="2">{{data.createTime|fmtDate1}}</td> -->
                <td>等级</td>
                <td colspan="2"></td>   
                <!-- <td></td> -->

            </tr>
            <tr style="height:45px;line-height: 45px;
    text-align: center;">
                <td width="150">考核项目</td>
                <td width="150">细分指标</td>
                <td width="150">权重（分）</td>
                <td width='600'>指标具体内容及定义</td>
                <td width='150'>自我评价得分</td>
                <td width='150'>考核评价得分</td>
                <td width='150'>综合得分</td>
            </tr>
            <tr v-for="(item,j) in standardList" :key="j+'a'">
                <td style="line-height:45px;text-align:center">{{item.name}}({{item.score}})</td>
                <td  colspan="6">
                    <div v-for="(ite,index) in item.children" :key="index+'w'" class="remark-box" >
                        <div
                            class="remark-box-zb"
                            style="width: 150px;border-bottom: 1px solid #000;border-right: 1px solid #000;line-height:45px;text-align:center"
                            :class="{'remark-box-zb-none': index === item.children.length - 1}"
                        >{{ite.name}}</div>
                        <div
                            style="width: 150px;border-bottom: 1px solid #000;border-right: 1px solid #000;line-height:45px;text-align:center"
                            :class="{'remark-box-zb-none': index === item.children.length - 1}"
                        >{{ite.score}}</div>
                        <div
                            style="width: 600px;border-bottom: 1px solid #000;border-right: 1px solid #000;text-align:center"
                            :class="{'remark-box-zb-none': index === item.children.length - 1}"
                        >{{ite.remark}}</div>
                        <div
                            style="width: 150px;border-bottom: 1px solid #000;border-right: 1px solid #000;"
                            :class="{'remark-box-zb-none': index === item.children.length - 1}"
                        ></div>
                        <div
                            style="width: 150px;border-bottom: 1px solid #000;border-right: 1px solid #000;"
                            :class="{'remark-box-zb-none': index === item.children.length - 1}"
                        ></div>
                         <div
                            style="width: 150px;border-bottom: 1px solid #000;"
                            :class="{'remark-box-zb-none': index === item.children.length - 1}"
                        ></div>
                        <!-- <div>
                            <div
                                v-for="val in ite.children"
                                :key="val.id"
                                class="remark"
                                style="border-bottom: 1px solid #000;"
                            >
                                <div style="width:150px; border-right:1px solid #000">{{val.score}}</div>
                                <div style="width:300px; border-right:1px solid #000">{{val.remark}}</div>
                            </div>
                        </div>-->
                    </div>
                </td>
                <!-- <td></td>
                <td></td> -->
                <!-- <td></td>
                <td></td> -->
            </tr>
        </table>
    </div>
</template>

<script>
import qs from 'qs'
export default {
    name: "HelloWorld",
    props: {
        msg: String
    },
    data() {
        return {
            data: {
                checkScoce: 31,
                checkTime: "2020-05-19T14:05:22.603+0800",
                code: "200519000001",
                compositeScore: null,
                createTime: "2020-05-19T11:40:11.738+0800",
                endTime: "2020-05-01T00:00:00.000+0800",
                gradePensonnelId: 1,
                gradePersonnelName: "admin",

                personnelId: 7,
                personnelName: "normal888",
                remark: "452",
                selfScore: null,
                startTime: "2020-03-01T00:00:00.000+0800",
                status: "S",
                type: "P",
                updateTime: "2020-05-19T14:05:22.604+0800",
                gradeStandard: [
                    {
                        id: 3,
                        pid: 0,
                        level: 1,
                        type: "P",
                        name: "业务技能",
                        remark: "一级描述",
                        score: "100",
                        detailId: 6,
                        gradeCode: "200519000001",
                        detailLevel: null,
                        selfScore: 12,
                        checkScore: null,
                        compositeScore: null,
                        children: [
                            {
                                id: 4,
                                pid: 3,
                                level: 2,
                                type: "P",
                                name: "分析判断与应变能力",
                                remark:
                                    "能对复杂的问题进行正确判断，处理工作事务机敏灵活，并在自己职权范围内能迅速而准确的地对多种备选行动方案进行评价，并作出最终决定",
                                score: "4",
                                detailId: null,
                                gradeCode: null,
                                detailLevel: null,
                                selfScore: null,
                                checkScore: null,
                                compositeScore: null,
                                children: [
                                    {
                                        id: 6,
                                        pid: 4,
                                        level: 3,
                                        type: "P",
                                        name: "三级1名称",
                                        remark: "三级1描述",
                                        score: "25",
                                        detailId: null,
                                        gradeCode: null,
                                        detailLevel: null,
                                        selfScore: null,
                                        checkScore: null,
                                        compositeScore: null,
                                        children: null
                                    },
                                    {
                                        id: 7,
                                        pid: 4,
                                        level: 3,
                                        type: "P",
                                        name: "三级2名称",
                                        remark: "三级2描述",
                                        score: "25",
                                        detailId: null,
                                        gradeCode: null,
                                        detailLevel: null,
                                        selfScore: null,
                                        checkScore: null,
                                        compositeScore: null,
                                        children: null
                                    }
                                ]
                            },
                            {
                                id: 5,
                                pid: 3,
                                level: 2,
                                type: "P",
                                name: "问题解决能力",
                                remark:
                                    "根据现场的突发事件，能够从多方面进行分析，找出原因，从而解决问题",
                                score: "5",
                                detailId: null,
                                gradeCode: null,
                                detailLevel: null,
                                selfScore: null,
                                checkScore: null,
                                compositeScore: null,
                                children: []
                            },
                            {
                                id: 5,
                                pid: 3,
                                level: 2,
                                type: "P",
                                name: "执行能力",
                                remark:
                                    "对上级的命令、下达的计划、布置的工作能及时贯彻执行，并及时复命。",
                                score: "50",
                                detailId: null,
                                gradeCode: null,
                                detailLevel: null,
                                selfScore: null,
                                checkScore: null,
                                compositeScore: null,
                                children: []
                            },
                            {
                                id: 5,
                                pid: 3,
                                level: 2,
                                type: "P",
                                name: "创新能力",
                                remark:
                                    "在处理工作事务时，运用新思维、新方法提高工作效率和效益。",
                                score: "4",
                                detailId: null,
                                gradeCode: null,
                                detailLevel: null,
                                selfScore: null,
                                checkScore: null,
                                compositeScore: null,
                                children: []
                            },
                            {
                                id: 5,
                                pid: 3,
                                level: 2,
                                type: "P",
                                name: "表达及沟通能力",
                                remark:
                                    "能清楚、完整地向对方充分说明及表达自己的想法而使其理解，并能聆听及尊重对方的意见。",
                                score: "5",
                                detailId: null,
                                gradeCode: null,
                                detailLevel: null,
                                selfScore: null,
                                checkScore: null,
                                compositeScore: null,
                                children: []
                            },
                            {
                                id: 5,
                                pid: 3,
                                level: 2,
                                type: "P",
                                name: "协调及人力关系能力",
                                remark:
                                    "作为组织的一员，能够自觉地与组织内其他成员保持良好合作管理，热情协助他人的工作，积极参加工作室及部门内部的各种活动，维护良好的同事关系。",
                                score: "5",
                                detailId: null,
                                gradeCode: null,
                                detailLevel: null,
                                selfScore: null,
                                checkScore: null,
                                compositeScore: null,
                                children: []
                            }
                        ]
                    },
                    {
                        id: 3,
                        pid: 0,
                        level: 1,
                        type: "P",
                        name: "品质与态度",
                        remark: "一级描述",
                        score: "100",
                        detailId: 6,
                        gradeCode: "200519000001",
                        detailLevel: null,
                        selfScore: 12,
                        checkScore: null,
                        compositeScore: null,
                        children: [
                            {
                                id: 4,
                                pid: 3,
                                level: 2,
                                type: "P",
                                name: "道德品质",
                                remark:
                                    "诚实正直、以身作则、克己奉公、乐于助人。",
                                score: "4",
                                detailId: null,
                                gradeCode: null,
                                detailLevel: null,
                                selfScore: null,
                                checkScore: null,
                                compositeScore: null,
                                children: [
                                    {
                                        id: 6,
                                        pid: 4,
                                        level: 3,
                                        type: "P",
                                        name: "三级1名称",
                                        remark: "三级1描述",
                                        score: "25",
                                        detailId: null,
                                        gradeCode: null,
                                        detailLevel: null,
                                        selfScore: null,
                                        checkScore: null,
                                        compositeScore: null,
                                        children: null
                                    },
                                    {
                                        id: 7,
                                        pid: 4,
                                        level: 3,
                                        type: "P",
                                        name: "三级2名称",
                                        remark: "三级2描述",
                                        score: "25",
                                        detailId: null,
                                        gradeCode: null,
                                        detailLevel: null,
                                        selfScore: null,
                                        checkScore: null,
                                        compositeScore: null,
                                        children: null
                                    }
                                ]
                            },
                            {
                                id: 5,
                                pid: 3,
                                level: 2,
                                type: "P",
                                name: "忠诚度",
                                remark:
                                    "对工作室忠诚的程度及爱护工作室的行为。",
                                score: "5",
                                detailId: null,
                                gradeCode: null,
                                detailLevel: null,
                                selfScore: null,
                                checkScore: null,
                                compositeScore: null,
                                children: []
                            },
                            {
                                id: 5,
                                pid: 3,
                                level: 2,
                                type: "P",
                                name: "责任感",
                                remark:
                                    "对工作室忠诚的程度及爱护工作室的行为。",
                                score: "50",
                                detailId: null,
                                gradeCode: null,
                                detailLevel: null,
                                selfScore: null,
                                checkScore: null,
                                compositeScore: null,
                                children: []
                            },
                            {
                                id: 5,
                                pid: 3,
                                level: 2,
                                type: "P",
                                name: "进取心",
                                remark:
                                    "学习努力，时刻向上，不断提高和完善自己。",
                                score: "4",
                                detailId: null,
                                gradeCode: null,
                                detailLevel: null,
                                selfScore: null,
                                checkScore: null,
                                compositeScore: null,
                                children: []
                            },
                            {
                                id: 5,
                                pid: 3,
                                level: 2,
                                type: "P",
                                name: "纪律性",
                                remark: "对工作目标以及自己的决定充满信心。",
                                score: "5",
                                detailId: null,
                                gradeCode: null,
                                detailLevel: null,
                                selfScore: null,
                                checkScore: null,
                                compositeScore: null,
                                children: []
                            },
                            {
                                id: 5,
                                pid: 3,
                                level: 2,
                                type: "P",
                                name: "自信心",
                                remark: "对工作目标以及自己的决定充满信心。",
                                score: "5",
                                detailId: null,
                                gradeCode: null,
                                detailLevel: null,
                                selfScore: null,
                                checkScore: null,
                                compositeScore: null,
                                children: []
                            }
                        ]
                    }
                ]
            },
            standardList:[]
        };
    },
     created(){
        this.getDetail();
        this.getStandard()
    },
    mounted() {},
    methods: {
        goUrl() {
            let url = "www.baidu.com";
            window.location.href = `https://${url}`;
        },
        getStandard(){
            this.$utils.post(this.reqApi.yiBSchool+'/mobile/grade/standard/get').then(res=>{
                if(res.data.code==='0000'){
                    this.standardList=res.data.data
                }
            })
        },
        getDetail(){
            this.$utils.post(this.reqApi.yiBSchool+'/mobile/grade/detail',qs.stringify({
                code:this.$route.query.code
            })).then(res=>{
                if(res.data.code==='0000'){
                    this.data=res.data.data
                }
            })
        },
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table-box {
    /* width: 1500px; */
    border-collapse: collapse;
    border-color: #000;
}

.table-title {
    /* width: 100%; */
    /* border: 1px solid #000; */
    /* border-bottom: none; */
    /* height: 40px;
    line-height: 40px; */
    box-sizing: border-box;
}

.remark-box {
    display: flex;
}

.remark-box-zb {
    /* width: 150px; */
    /* border-bottom: 1px solid #000;
    border-right: 1px solid #000; */
}

.remark-box-zb-none {
    border-bottom: none!important;
}

.remark {
    display: flex;
    /* border-bottom: 1px solid #000; */
}
* {
    padding: 0;
    margin: 0;
}
</style>
