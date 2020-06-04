<template>
    <el-card shadow="never" id="home-page">
        <!-- <my-bread id="pdb-shouye"></my-bread> -->
        <!-- 第一行大盒子 -->
        <div class="page-one-big">
            <!-- 第一行左 -->
            <div class="page-one-left border-color1">
                <!-- 左的上 -->
                <!-- 左的中 -->
                <el-row class="top-left-center">
                    <el-col class="font-weight-700">登陆人信息</el-col>
                    <el-col>
                        <img
                            class="wd110 hportrait"
                            :src="reqApi.shuiwuUrl + aPhoto"
                            alt
                            :onerror="errorImg"
                        />
                    </el-col>
                </el-row>
                <!-- 左的下 -->
                <div class="top-left-bottom">
                    <div>
                        <span>您好:</span>
                        <span>{{realname}}</span>
                    </div>
                    <div>
                        <span>角色:</span>
                        <span>{{juese|roleFilter}}</span>
                    </div>
                </div>
            </div>
            <!-- 第一行中 -->
            <div class="page-one-center border-color1">
                <el-row class="top-center-top font-weight-700">
                    <span></span>
                    新闻公告
                </el-row>
                <el-row class="top-center-center maxHeight">
                    <ul>
                        <li v-for="(item, index) in articleList" :key="index" class="font-size-12">
                            <span>{{item.name}}</span>
                            <span class="add fr" @click="detail(item)">详情</span>&nbsp;&nbsp;
                        </li>
                    </ul>
                </el-row>
                <el-row class="top-center-bottom">
                    <router-link to="/articleList">更多>></router-link>
                </el-row>
            </div>
            <!-- 第一行右 -->
            <div class="page-one-right border-color1">
                <div class="font-weight-700" style="height: 50px; line-height: 50px">实训达人</div>
                <el-row style="height: 25px;">
                    <el-col :span="7">名次</el-col>
                    <el-col :span="9" class="textAlign">用户</el-col>
                    <el-col :span="8" class="textAlign">活跃度</el-col>
                </el-row>
                <el-row
                    v-for="(item, index) in testTopManList1"
                    :key="index"
                    class="top-right-center"
                >
                    <el-col
                        style="height:40px;line-height:40px;padding-left:13px;"
                        :span="7"
                    >{{index + 1}}</el-col>
                    <el-col :span="9" class="my-slh font-size-12 ">
                        <span class="center-body-img">
                            <img
                            v-if="item.photo"
                                class="imgbfb"
                                height="40px"
                                :src="reqApi.shuiwuUrl + item.photo"
                                :onerror="errorImg"
                                alt
                            />
                        </span>
                        <span>{{item.realname}}</span>
                    </el-col>
                    <el-col
                        :span="8"
                        style="height:40px;line-height:40px;text-align:center"
                        class="txalign"
                    >{{item.count}}</el-col>
                </el-row>
            </div>
        </div>

        <!-- 第二行大盒子 -->
        <div class="two-big">
            <!-- 第二行中 -->
            <div class="two-before font-weight-700">考试安排</div>
            <div style="width: calc(100% - 307px); margin-right: 20px;">
                <el-table :data="tableData" border height="338" max-height="338" style="border-top: 1px solid #444;" >
                    <el-table-column align="center" label="考试名称">
                        <template slot-scope="scope">{{ scope.row.name }}</template>
                    </el-table-column>
                    <el-table-column align="center" label="状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.status == 1">开放</span>
                            <span v-if="scope.row.status == 2">关闭</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="时间设定" width="180">
                        <template slot-scope="scope">
                            {{scope.row.start_time|fmtDate}}
                            <br />
                            {{ scope.row.end_time|fmtDate}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="pduration" align="center" label="考试时长">
                        <template slot-scope="scope">{{ scope.row.duration }}分钟</template>
                    </el-table-column>
                    <!-- <el-table-column prop="ptotal_score" align="center" label="卷面总分"></el-table-column> -->
                    <!-- <el-table-column align="center" label="试卷类型">
                        <template slot-scope="scope">
                            <span v-if="scope.row.ppapertype == '1'">随机试卷</span>
                            <span v-if="scope.row.ppapertype == '0'">普通试卷</span>
                        </template>
                    </el-table-column> -->
                    <!-- <el-table-column prop="premark" align="center" label="试卷说明"></el-table-column> -->
                </el-table>
            </div>
            <!-- 第一行右 -->
            <div class="page-one-right border-color1" style="width: 287px;">
                <div class="font-weight-700" style="height: 50px; line-height: 50px">考试达人</div>
                <el-row style="height: 25px;">
                    <el-col :span="7">名次</el-col>
                    <el-col :span="9" class="textAlign">用户</el-col>
                    <el-col :span="8" class="textAlign">平均分</el-col>
                </el-row>
                <el-row
                    v-for="(item, index) in testTopManList"
                    :key="index"
                    class="top-right-center"
                >
                    <el-col
                        style="height:40px;line-height:40px;padding-left:13px;"
                        :span="7"
                    >{{index + 1}}</el-col>
                    <el-col :span="9" class="my-slh font-size-12">
                        <span class="center-body-img">
                            <img
                                v-if="item.user_photo"
                                class="imgbfb"
                                height="40px"
                                :src="reqApi.shuiwuUrl + item.user_photo"
                                :onerror="errorImg"
                                alt
                            />
                        </span>
                        <span>{{item.realname}}</span>
                    </el-col>
                    <el-col
                        :span="8"
                        style="height:40px;line-height:40px;text-align:center"
                        class="txalign"
                    >{{item.rank}}</el-col>
                </el-row>
            </div>
        </div>
        <el-dialog title="新闻公告" :visible.sync="dialogVisible" width="600px">
           
            <div class="titleText">
                 <h4 style="width: 100%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{data.name}}</h4>
                <span class="lightGrey">发布时间：{{data.create_time|fmtDate}}</span>
                <span class="lightGrey">访问量：{{data.visits}}</span>
            </div>
            <div v-html="data.content" class="contentBox">{{data.content}}</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">我知道了</el-button>
            </span>
        </el-dialog>
    </el-card>
</template>

<script>
import { getPapers } from "@/api/taxUrl/testpaper";
import { getTestTopMan } from "@/api/taxUrl/tax";
import { noticeList } from "@/api/taxUrl/announcement";
import qs from "qs";
export default {
    data() {
        return {
            errorImg:
                'this.src="' + require("@/assets/images/img_teacher.png") + '"',
            //日历插件
            time: new Date(),
            // name
            realname: sessionStorage.realname,
            // 文章公告列表
            articleList: [],
            tableData: [],
            // aLogintimes: sessionStorage.aLogintimes,
            // aLastlogin: sessionStorage.aLastlogin,
            aPhoto: '',
            testTopManList: [],
            testTopManList1: [],
            juese: sessionStorage.getItem("role_id"),
            dialogVisible: false,
            data: {}
        };
    },

    created() {
        this.noticeList();
        this.getPapers();
        this.getTestTopMan();
        this.getList();
    },
    mounted(){
        if(sessionStorage.getItem("user_photo")){
            this.aPhoto=sessionStorage.getItem("user_photo")
        }
    },
    methods: {
        detail(data) {
            this.dialogVisible = true;
            this.data = data;
        },
        // 实训
        getList() {
            this.$utils
                .post(
                    this.reqApi.shuiwuUrl + "/selfExam/getSortList",
                    qs.stringify({
                        pageSize: 4
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.testTopManList1 = res.data.stus.list;
                    }else {
                        this.$message.error(res.data.msg)
                    }
                });
        },
        // 获取排名
        getTestTopMan() {
            this.$utils
                .post(
                    this.reqApi.shuiwuUrl + "/exam/getSortList",
                    qs.stringify({
                        pageSize: 4
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.testTopManList = res.data.stus.list;
                    } else {
                        this.$message.error(res.data.msg)
                    }
                });
        },
        // 获取试卷列表
         getPapers() {
            this.$utils.post(this.reqApi.shuiwuUrl+'/exam/list',qs.stringify({
                pageSize:10
            })).then(res=>{
                if(res.data.code==='0000'){
                    this.tableData=res.data.exams.list
                }else {
                    this.$message.error(res.data.msg)
                }
            })
            return
            const {
                data: { list, code }
            } =  getPapers();
            if (code === "0000") return (this.tableData = list);
        },
        // 获取文章公告列表
        async noticeList() {
            const {
                data: { annos, code }
            } = await noticeList();
            if (code === "0000") return (this.articleList = annos.list);
        },

        lookNews(info) {
            this.$router.push({
                name: "news",
                query: { id: info.nid }
            });
        }
    },
    filters: {
        roleFilter(val) {
            if (val == 1) {
                return "超级管理员";
            } else if (val == 2) {
                return "学校管理员";
            } else if (val == 3) {
                return "教师";
            }
        }
    }
};
</script>

<style scoped>
#pdb-shouye {
    padding-bottom: 15px;
}

.wd110 {
    width: 110px;
}
/* 第一行大盒子 */
.page-one-big {
    margin-bottom: 50px;
    display: grid;
    width: 100%;
    grid-template-rows: 340px;
    grid-template-columns: 245px auto 287px;
    /* grid-template-columns: 12.4% 62.45% 22.72%; */
}

/* 第一行左 */
.page-one-big .page-one-left {
    /* border: 1px solid #dbe0e5; */
    border-radius: 3px;
}

/* 第一行左边的top */
.page-one-big .page-one-left .top-left-top {
    width: 101%;
    height: 41px;
    line-height: 41px;
    text-align: center;
    background-color: #3ec8dd;
    padding: 0 15px;
    position: relative;
    top: -1px;
    left: -1px;
    border-radius: 2px;
    font-size: 16px;
}
.one-left-img {
    width: 25px;
    height: 40px;
    vertical-align: middle;
}
.page-one-big .page-one-left .top-left-top span:nth-child(1) {
    display: inline-block;
}
.page-one-big .page-one-left .top-left-top span:nth-child(2) {
    color: #fff;
}

.hportrait {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
}

/* 第一行左边的center */
.page-one-big .page-one-left .top-left-center {
    width: 210px;
    border-bottom: 1px solid #dbe0e5;
    margin: 10px 16px;
}
.page-one-big .page-one-left .top-left-center .el-col:nth-child(1):before {
    content: "";
    display: inline-block;
    margin-right: 6px;
    position: relative;
    top: -2px;
    vertical-align: middle;
    width: 5px;
    height: 18px;
    background-color: #29a3f4;
}
.page-one-big .page-one-left .top-left-center .el-col:nth-child(2) {
    width: 50%;
    padding: 40px 0 20px;
}

/* 第一行左边的bottom */
.page-one-big .page-one-left .top-left-bottom {
    width: 100%;
    padding: 15px 16px;
}
.page-one-big .page-one-left .top-left-bottom .el-row {
    width: 100%;
    padding: 0 15px;
}

/* 第一行中 */
.page-one-big .page-one-center {
    position: relative;
    /* border: 1px solid #dbe0e5; */
    margin: 0 20px;
    border-radius: 3px;
    min-width: 550px;
}
.maxHeight {
    height: 252px;
    overflow: auto;
}
/* 第一行中的头 */
.page-one-big .page-one-center .top-center-top {
    color: #444;
    width: 130px;
    padding: 5px 15px;
    border-radius: 2px;
    position: relative;
    left: -1px;
    top: -1px;
    margin-left: 18px;
    margin-top: 7px;
}
.page-one-big .page-one-center .top-center-top span {
    display: inline-block;
    background-color: #f5ad58;
    width: 4px;
    height: 14px;
    vertical-align: text-top;
}

/* 第一行中的身体 */
.page-one-big .page-one-center .top-center-center li {
    padding: 5px 20px;
    border-bottom: 1px solid #cdcdcd;
    margin: 0 20px;
    color: #444444;
}
.page-one-big .page-one-center .top-center-center li .add {
    display: inline-block;
    /* width: 10px; */
    /* height: 10px; */
    /* line-height: 10px; */
    text-align: center;
    cursor: pointer;
    /* border: 1px solid #000; */
}

/* 第一行中的脚 */
.page-one-big .page-one-center .top-center-bottom {
    text-align: right;
    padding-right: 20px;
    position: relative;
    top: 20px;
}

/* 第一行右 */
.page-one-right {
    /* border: 1px solid #dbe0e5; */
    border-radius: 3px;
    position: relative;
    padding-left: 20px;
}
/* 第一行右的头 */
.page-one-right .top-right-top {
    /* color: #fff; */
    width: 101%;
    font-size: 16px;
}
.page-one-right .top-right-top span:nth-child(1) {
    display: inline-block;
    width: 300px;
    height: 43px;
}
.page-one-right .top-right-top img {
    width: 329px;
    position: absolute;
    left: -22px;
    top: -13px;
}
.page-one-right .top-right-top span:nth-child(2) {
    color: #fff;
    position: absolute;
    left: 0px;
    top: 0px;
    padding-left: 20px;
    padding-top: 5px;
}

.calendarBox {
    /* border: 1px solid #c2cad8; */
    border-radius: 3px;
    position: relative;
    padding-left: 0;
}
.Tooltip {
    float: left;
    margin-left: 40px;
    margin-top: 10px;
}

.calendarBox .calendar {
    width: 33px;
    height: 34px;
    position: absolute;
    top: 2px;
    left: 2px;
}

/* 第一行右的身体 */
.page-one-right .top-right-center {
    height: 67px;
    vertical-align: middle;
}
.page-one-right .top-right-center .center-body-img {
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    vertical-align: middle;
}

/* 第二行 */
.page-one-left .top-left-center.del-line {
    border-bottom: 1px solid #cdcdcd;
}
/* 中间的图 */
.page-one-center .two-img {
    position: absolute;
    top: -36px;
}
.page-one-center .two-img span {
    position: absolute;
    top: 0px;
    left: 36px;
    font-size: 16px;
}

.two-big {
    display: flex;
    position: relative;
}
.two-before {
    position: absolute;
    top: -26px;
}
.two-before::before {
    content: "";
    display: inline-block;
    margin-right: 6px;
    position: relative;
    top: -2px;
    vertical-align: bottom;
    width: 4px;
    height: 14px;
    background-color: #29a3f4;
}
.textAlign {
    text-align: center;
}
.titleText{
    text-align: center;
    padding: 0 80px;
    border-top: 1px solid #eee;
}
.contentBox{
    padding: 0 35px;
    line-height: 29px;
    max-height: 500px;
    overflow: auto;
}
.lightGrey{
    font-size: 12px;
    color: #a1a1a1;
    padding: 5px 0;
    display: inline-block;
}
</style>
