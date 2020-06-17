<template>
    <div class="outBox">
        <van-nav-bar
            title="自评打分"
            left-arrow
            fixed
            @click-left="onClickLeft"
            @click-right="onClickRight"
        >
            <template #right>
                <van-icon name="plus" size="18" />
            </template>
        </van-nav-bar>
        <div class="outBox_one">
        <div >
            <div class="new-tabs">
                <span
                    @click="activeTab"
                    :class="active === 1 ? 'active' : ''"
                    class="new-tabs-child cur-point dis-inline-block"
                >我的申请</span>
                <span
                    @click="activeTab1"
                    :class="active === 2 ? 'active' : ''"
                    class="new-tabs-child cur-point dis-inline-block"
                    v-if="manager==1"
                >我的审批</span>
            </div>
            <div class="shensu_title" v-if="scoreList.length==0">暂无数据</div>
            <!-- <van-cell
                v-for="(item,index) in scoreList"
                :key="index+'a'"
                :title="(item.startTime+'-'+item.endTime)"
                is-link
            >
                <template #default>
                    <span v-if="item.status=='S'" style="color:#FF3000FF">已审核</span>
                    <span v-if="item.status=='W'" style="color:#14C25AFF">待审核</span>
                    <span v-if="item.status=='D'" style="color:#ccc">已作废</span>
                </template>
            </van-cell> -->


            <van-swipe-cell
                        v-else
                        v-for="(item,index) in scoreList"
                        :key="index+'a'"
                        @open="delItem(item)"
                        :before-close="beforeClose"
                    >
                        <van-cell
                            :title="(item.startTime+'-'+item.endTime)"
                            @click="toDetail(item)"
                            is-link
                            class
                        >
                            <template #default>
                                <!-- <span class="centerDate">{{item.createTime}}</span> -->
                                <span style="color:#14C25AFF">{{item.status|filtersType}}</span>
                            </template>
                        </van-cell>
                        <template #right>
                            <van-button square type="danger" text="删除" />
                        </template>
                    </van-swipe-cell>
        </div>
        </div>
        <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
    </div>
</template>
<script>
import qs from 'qs'
export default {
    data() {
        return {
            show: false,
            actions: [
                { name: "普通员工", type: "P" },
                { name: "部门经理", type: "B" },
                { name: "取消" }
            ],
            data: [
                {
                    code: "3",
                    status: "W",
                    startTime: "2019-05-13",
                    endTime: "2019-06-08",
                    createTime: "2019-05-13"
                },
                {
                    code: "2",
                    status: "S",
                    startTime: "2018-05-13",
                    endTime: "2018-06-08",
                    createTime: "2018-05-13"
                },
                {
                    code: "1",
                    status: "D",
                    startTime: "2020-05-13",
                    endTime: "2020-06-08",
                    createTime: "2019-05-13"
                }
            ],
            scoreList: [],
            manager: sessionStorage.getItem("manager"),
            active: 1,
            delCode:''
        };
    },
    created(){
        // this.getList()
          if (this.$route.query.active == 2) {
            this.getGuanli();
        } else {
            this.getList();
        }
        if (this.$route.query.active) {
            this.active = Number(this.$route.query.active);
        }
    },
    methods: {
         toDetail(item) {
            if (this.active == 1) {
                if(item.status=="S"){
                    this.$router.push({
                        name:'approva',
                        query: {
                            code: item.code,
                            status: item.status,
                            active: this.active
                        }
                    })
                }else{
                     this.$router.push({
                    name: "personalRating",
                    query: {
                        status: item.status,
                        active: this.active,
                        code: item.code
                    }
                });
                }
               
            } else if (this.active == 2) {
                if (item.status == "F" || item.status == "S") {
                    this.$router.push({
                        name: "approva",
                        query: {
                            code: item.code,
                            status: item.status,
                            active: this.active
                        }
                    });
                } else if (item.status == "W") {
                    this.$router.push({
                        name: "approva",
                        query: {
                            code: item.code,
                            status: item.status,
                            active: this.active
                        }
                    });
                }
            }
        },
        activeTab() {
            // active=1 表示查看的个人评分
            this.active = 1;
            sessionStorage.setItem("active", this.active);
            this.getList();
        },
        activeTab1() {
            //active状态=2表明是经理的角色。可以提交修改审核
            this.active = 2;
            sessionStorage.setItem("active", this.active);
            this.getGuanli();
        },
        getGuanli(){
            this.$utils.post(this.reqApi.yiBSchool+'/mobile/grade/listForManager').then(res=>{
                if(res.data.code==='0000'){
                    this.scoreList = res.data.data;
                       this.scoreList.forEach(item => {
                            item.startTime = this.$moment(
                                item.startTime
                            ).format("YYYY/MM/DD");
                             item.endTime = this.$moment(
                                item.endTime
                            ).format("YYYY/MM/DD");
                        });
                }else {
                    return this.$toast(res.data.msg)
                }
            })
        },
        getList() {
            this.$utils
                .post(this.reqApi.yiBSchool + "/mobile/grade/list")
                .then(res => {
                    if (res.data.code === "0000") {
                        this.scoreList = res.data.data;
                       this.scoreList.forEach(item => {
                            item.startTime = this.$moment(
                                item.startTime
                            ).format("YYYY/MM/DD");
                             item.endTime = this.$moment(
                                item.endTime
                            ).format("YYYY/MM/DD");
                        });
                    }else {
                        return this.$toast(res.data.msg)
                    }
                });
        },
        onClickLeft() {
            // this.$router.go(-1);
            this.$router.push('/home')
        },
        onClickRight() {
            // this.show = true;
            this.$router.push({
                name:'ratingReview',
                query:{
                    add:1
                }
            })
        },
         delItem(item) {
            this.delCode = item.code;
        },
        onSelect(item) {
            this.$router.push({
                name: "newScore", //myApproval
                query: {
                    type: item.type
                }
            });
        },
         beforeClose({ position, instance }) {
            switch (position) {
                case "left":
                case "cell":
                case "outside":
                    instance.close();
                    break;
                case "right":
                    this.$dialog
                        .confirm({
                            message: "确定删除吗？"
                        })
                        .then(() => {
                            this.$utils
                                .post(
                                    this.reqApi.yiBSchool +
                                        "/mobile/grade/delete",
                                    qs.stringify({
                                        code: this.delCode
                                    })
                                )
                                .then(res => {
                                    if (res.data.code === "0000") {
                                        this.$toast("删除成功");
                                        if (this.$route.query.active == 2) {
                                            this.getGuanli();
                                        } else {
                                            this.getList();
                                        }
                                    } else {
                                        this.$toast(res.data.msg);
                                    }
                                    instance.close();
                                });
                        });
                    break;
            }
        },
    },
    filters:{
         filtersType(val) {
            if (val == "W") {
                return "待审核";
            } else if (val == "F") {
                return "不通过";
            } else if (val == "S") {
                return "通过";
            }
        }
    }
};
</script>
<style scoped>
.outBox {
    box-sizing: border-box;
}
.clockContent {
    padding-top: 46px;
}
.shensu_title {
    font-size: 14px;
    text-align: center;
    margin-top: 20px;
}
</style>