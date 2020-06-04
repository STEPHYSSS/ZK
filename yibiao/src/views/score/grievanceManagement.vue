<template>
    <div class="outBox">
        <div class="outBox_one">
            <div class="outBox_top">
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
                <van-nav-bar
                    title="申诉管理"
                    left-arrow
                    fixed
                    @click-left="onClickLeft"
                    @click-right="onClickRight"
                >
                    <template #right>
                        <div>
                            <van-icon name="plus" size="20" />
                        </div>
                    </template>
                </van-nav-bar>
                <div id="shensu">
                    <div class="shensu_title" v-if="appealList.length==0">暂无数据</div>
                    <van-swipe-cell
                        v-else
                        v-for="(item,index) in appealList"
                        :key="index+'a'"
                        @open="delItem(item)"
                        :before-close="beforeClose"
                    >
                        <van-cell
                            :title="item.type|filterValue"
                            @click="toDetail(item)"
                            is-link
                            class
                        >
                            <template #default>
                                <span class="centerDate">{{item.createTime}}</span>
                                <span style="color:#14C25AFF">{{item.status|filtersType}}</span>
                            </template>
                        </van-cell>
                        <template #right>
                            <van-button square type="danger" text="删除" />
                        </template>
                    </van-swipe-cell>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import qs from "qs";
export default {
    data() {
        return {
            delCode: "",
            appealList: [
                // {
                //     code: "123",
                //     type: "A",
                //     status: "W",
                //     checkTime: "2020-05-12",
                //     createTime: "2020-05-01"
                // },
                // {
                //     code: "123",
                //     type: "G",
                //     status: "F",
                //     checkTime: "2020-05-12",
                //     createTime: "2020-05-01"
                // },
                // {
                //     code: "123",
                //     type: "O",
                //     status: "W",
                //     checkTime: "2020-05-12",
                //     createTime: "2020-05-01"
                // },
                // {
                //     code: "123",
                //     type: "A",
                //     status: "W",
                //     checkTime: "2020-05-12",
                //     createTime: "2020-05-01"
                // },
                // {
                //     code: "123",
                //     type: "O",
                //     status: "W",
                //     checkTime: "2020-05-12",
                //     createTime: "2020-05-01"
                // }
            ],
            manager: sessionStorage.getItem("manager"),
            active: 1,
        };
    },
    created() {
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
        delItem(item) {
            this.delCode = item.code;
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
                                        "/mobile/appeal/delete",
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
        activeTab() {
            this.active = 1;
            sessionStorage.setItem("active", this.active);
            this.getList();
        },
        activeTab1() {
            //active状态=2表明是经理的角色
            this.active = 2;
            sessionStorage.setItem("active", this.active);
            this.getGuanli();
        },
        getGuanli() {
            this.$utils
                .post(this.reqApi.yiBSchool + "/mobile/appeal/listForManager")
                .then(res => {
                    if (res.data.code === "0000") {
                        this.appealList = res.data.data;
                        this.appealList.forEach(item => {
                            item.createTime = this.$moment(
                                item.createTime
                            ).format("YYYY-MM-DD");
                        });
                    }
                });
        },
        getList() {
            this.$utils
                .post(this.reqApi.yiBSchool + "/mobile/appeal/list")
                .then(res => {
                    if (res.data.code === "0000") {
                        this.appealList = res.data.data;
                        this.appealList.forEach(item => {
                            item.createTime = this.$moment(
                                item.createTime
                            ).format("YYYY-MM-DD");
                        });
                    }
                });
        },
        toDetail(item) {
            if (this.active == 1) {
                this.$router.push({
                    name: "personalComplaints",
                    query: {
                        status: item.status,
                        active: this.active,
                        code: item.code
                    }
                });
            } else if (this.active == 2) {
                if (item.status == "F" || item.status == "S") {
                    this.$router.push({
                        name: "personalComplaints",
                        query: {
                            code: item.code,
                            status: item.status,
                            active: this.active
                        }
                    });
                } else if (item.status == "W") {
                    this.$router.push({
                        name: "toExamine",
                        query: {
                            code: item.code,
                            status: item.status,
                            active: this.active
                        }
                    });
                }
            }
        },
        onClickLeft() {
            this.$router.push({
                name: "home"
            });
        },
        onClickRight() {
            this.$router.push({
                name: "toExamine",
                query: {
                    add: 1
                }
            });
        }
    },
    filters: {
        filterValue(val) {
            if (val == "A") {
                return "考勤";
            } else if (val == "G") {
                return "评分";
            } else if (val == "O") {
                return "其他";
            }
        },
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
.centerDate {
    position: absolute;
    left: -26px;
    z-index: 999;
}
.van-cell__right-icon {
    color: #14c25aff;
}
.tabs {
    height: 35px;
    margin-right: -8px;
}

/* .new-tabs {
    background-color: #f1f4f6;
    border-bottom: 1px solid #dbe0e5;
    height: 37px;
    font-size: 12px;
}
.new-tabs-child {
    width: 100px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: #444;
    position: relative;
    padding: 10px 26px;
}
.new-tabs .active {
    background-color: #fff;
}
.new-tabs .active::before {
    content: "";
    display: inline-block;
    width: 100px;
    height: 4px;
    background-color: #e71517;
    position: absolute;
    top: 0;
    left: 0;
} */
.shensu_title {
    font-size: 14px;
    text-align: center;
    margin-top: 20px;
}
</style>