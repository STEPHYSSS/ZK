<template>
    <div class="flowChart">
        <div class="flexBox">
            <!-- <div class="childBox"> -->
            <div class="liuchengBox">
                <div class="liucheng">
                    流
                    <br />程
                    <br />图
                </div>
                <!-- </div> -->
            </div>
            <div class="childBox flow-left">
                <div class="relative-box flow-left-box cursor">
                    <div>
                        <img
                            v-if="flowChart.type==1"
                            @click="toNewMenu(1)"
                            src="@/assets/images/icon/dinggou_icon.png"
                            alt
                        />
                        <img
                            v-else
                            @click="toNewMenu(1)"
                            src="@/assets/images/icon/dinggou_icongray.png"
                            alt
                        />
                    </div>

                    <div class="text">选品订购</div>
                </div>
                <!-- <div class="line-box"> -->
                <div class="leftRow">
                    <img src="@/assets/images/jiantou.png" alt />
                </div>
            </div>
            <div class="flow-right-top two">
                <div style="padding-top:10px" class="cursor">
                    <div>
                        <img
                            v-if="flowChart.type==2"
                            @click="toNewMenu(2)"
                            src="@/assets/images/icon/gongyingshang_icon.png"
                            alt
                        />
                        <img
                            v-else
                            @click="toNewMenu(2)"
                            src="@/assets/images/icon/gongyingshang_icongray.png"
                            alt
                        />
                    </div>
                    <div class="text1">供应商发货</div>
                </div>
                <div style="margin-top: 52px;" class="cursor">
                    <div>
                        <img
                            v-if="flowChart.type==5"
                            @click="toNewMenu(5)"
                            src="@/assets/images/icon/cangku_icon.png"
                            alt
                        />
                        <img
                            v-else
                            @click="toNewMenu(5)"
                            src="@/assets/images/icon/cangku_icongray.png"
                            alt
                        />
                    </div>
                    <div class="text">仓库发货</div>
                </div>
            </div>
            <div class="three">
                <div class="rightRow">
                    <img src="@/assets/images/jiantou-fuben.png" alt />
                </div>
                <div class="posRel store cursor">
                    <div>
                        <img
                            v-if="flowChart.type==3"
                            @click="toNewMenu(3)"
                            src="@/assets/images/icon/mendian_icon.png"
                            alt
                        />

                        <img
                            v-else
                            @click="toNewMenu(3)"
                            src="@/assets/images/icon/mendian_icongray.png"
                            alt
                        />
                    </div>
                    <div class="text">门店验收</div>
                </div>
            </div>
            <div class="four">
                <div class="stringLine">
                    <div>
                        <img src="@/assets/images/liucheng.png" alt />
                    </div>
                    <div>
                        <img src="@/assets/images/liuchengfuben.png" alt />
                    </div>
                </div>
                <div class="posRel modify cursor">
                    <div>
                        <img
                            v-if="flowChart.type==4"
                            @click="toNewMenu(4)"
                            src="@/assets/images/icon/xiuzheng_icon.png"
                            alt
                        />
                        <img
                            v-else
                            @click="toNewMenu(4)"
                            src="@/assets/images/icon/xiuzheng_icongray.png"
                            alt
                        />
                    </div>
                    <div class="text3">修正单</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { EventBus } from "@/common/bus.js";
export default {
    data() {
        return {};
    },
    mounted() {},
    methods: {
        toNewMenu(number) {
            EventBus.$emit("aMsg", number);
            // sessionStorage.setItem('checkNode',number)

            switch (number) {
                case 1:
                    this.$router.push({
                        name: "invoice",
                        query: {
                            key: number
                        }
                    });
                    break;
                case 2:
                    this.$router.push({
                        name: "shoporder",
                        query: {
                            key: number
                        }
                    });
                    break;
                case 3:
                    this.$router.push({
                        name: "receiving",
                        query: {
                            key: number
                        }
                    });
                    break;
                case 4:
                    this.$router.push({
                        name: "amendment",
                        query: {
                            key: number
                        }
                    });
                    break;
                case 5:
                    this.$router.push({
                        name: "orderWarehouseList",
                        query: {
                            key: number
                        }
                    });
                    break;
            }
        }
    },
    props: {
        flowChart: {
            type: Object
        }
    }
};
</script>
<style scoped>
.iconBox {
    position: relative;
    height: 65px;
    width: 80px;
    text-align: center;
}
.title1 {
    position: absolute;
    bottom: -14px;
    left: 23px;
}
.dis_inline {
    display: inline-block;
}
.dashedLine {
    width: 738px;
    height: 150px;
    margin-left: 17%;
    /* margin: 30px 0; */

    overflow: hidden;
}
.gYS {
    position: absolute;
    left: 83px;
    top: -19px;
}
.MD {
    position: absolute;
    left: 376px;
    top: -19px;
}
.XZ {
    position: absolute;
    right: 0px;
    top: -19px;
}
.XP {
    /* height: 50px; */
    height: 50px;
    position: absolute;
    top: 53px;
    width: 110px;
    text-align: center;
}
.iconBox_12 {
    position: relative;
    height: 90px;
    margin: 30px 0;
    border: 2px dashed #eee;
}
.title2 {
    position: absolute;
    bottom: 4px;
    left: 5px;
    width: 72px;
}
.title3 {
    position: absolute;
    bottom: 4px;
    left: 5px;
    width: 72px;
}
.title4 {
    position: absolute;
    bottom: 4px;
    left: 6px;
    width: 72px;
}
.startIcon {
    position: relative;
}
.LC {
    /* 画图画了两个小时 */
}

/* 流程图样式 */
.flow {
    display: flex;
}
.sign {
    width: 35px;
    height: 35px;
    border: 1px dashed #666666;
    border-radius: 50%;
    padding: 5px;
}
.sign div {
    width: 100%;
    height: 100%;
    background-color: #0f0;
    border-radius: 50%;
}
.sign-active div {
    background-color: #888888;
}
.text {
    margin-top: 10px;
    position: absolute;
    width: 100px;
    left: -12px;
}
.flow-right-top {
    display: flex;
    /* margin-bottom: 70px; */
}
.flow-right-top > div {
    position: relative;
}
.line {
    width: 200px;
    height: 1px;
    border-top: 1px dashed #666666;
    margin-top: 22px;
}
.flow-right-bottom {
    display: flex;
}
.flow-right-bottom > div {
    position: relative;
}
.flow-left {
    width: 285px;
    display: flex;
    align-items: center;
    margin-left: 50px;
}
.relative-box {
    position: relative;
}
.line-box {
    margin-left: 35px;
    width: 200px;
    height: 120px;
    border: 1px dashed #666666;
    border-right: none;
    position: relative;
}
.line-box::after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-right: 25px solid #666666;
    border-bottom: 10px solid transparent;
    left: -25px;
    top: 50%;
    margin-top: -10px;
}
.liucheng {
    width: 80px;
    font-size: 16px;
    font-weight: 700;
    color: #444444;
    position: absolute;
    left: 54%;
    top: 36%;
}
.liuchengBox {
    width: 15%;
    position: relative;
    width: 80px;
}

.flexBox {
    width: 100%;
    height: 150px;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    margin: 25px 0;
}
.childBox {
    /* flex: 1; */
    width: 20%;
    /* height: 90px; */
    /* background-color: pink; */
    /* border: 1px solid #eee; */
    /* min-width: 50%;
    max-width: 50%; */
}
.two {
    width: 5%;
    display: flex;
    flex-direction: column;
}
.three {
    width: 20%;
    display: flex;
    align-items: flex-start;
}
.posRel {
    position: relative;
}
.four {
    width: 20%;
    display: flex;
    align-items: flex-start;
}
.leftRow {
    height: 110px;
    margin-top: 12px;
    margin-left: 10px;
}
.store {
    padding-top: 55px;
}
.rightRow {
    height: 110px;
    margin-top: 25px;
    margin-right: 15px;
}
.stringLine {
    margin-top: 20%;
}
.modify {
    margin-top: 55px;
    margin-left: 15px;
}
.cursor {
    cursor: pointer;
}
.text1 {
    margin-top: 10px;
    position: absolute;
    width: 100px;
    left: -17px;
}
.text3 {
    margin-top: 10px;
    position: absolute;
    width: 100px;
    left: -3px;
}
.flowChart{
    min-width: 1000px;
}
</style>