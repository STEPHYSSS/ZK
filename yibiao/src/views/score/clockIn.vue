<template>
    <div class="outBox">
        <van-nav-bar
            title="考勤打卡"
            left-arrow
            fixed
            @click-left="onClickLeft"
            @click-right="onClickRight"
        >
            <template #right>
                <div>
                    <img src="@/assets/images/tijiao_icon@2x.png" alt class="imgIcon" />
                    <span class="submit">提交</span>
                </div>
            </template>
        </van-nav-bar>
        <div class="clockContent">
            <van-cell title="打卡日期" :icon="imgObj.one" :value="currentDate|fmtDate1" />
            <van-cell title="更新时间" :icon="imgObj.two" :value="nowTime">
                <!-- <template #right-icon>
                    <span>{{nowTime}}</span>
                </template>-->
            </van-cell>
            <van-cell title="定位" :icon="imgObj.three" :value="value" is-link @click="location" />
            <van-cell
                title="打卡方式"
                :icon="imgObj.four"
                :value="type?type:'请选择'"
                is-link
                @click="show=true"
            />
            <van-cell title="今日考勤" :icon="imgObj.five" center border>
                <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                <template #default>
                    <span v-if="data.toWorkOne">
                        <span class="toWork bgcgreen"></span>
                        <span>
                            上班&nbsp;&nbsp;
                            <span>{{data.toWorkOne}}</span>
                        </span>
                    </span>
                    <br />
                   <span v-if="data.offWorkOne">
                        <span class="offWork bgcRed"></span>
                    <span >
                        下班&nbsp;&nbsp;
                        <span>{{data.offWorkOne}}</span>
                    </span>
                   </span>
                    <br />
                    <span v-if="data.toWorkTwo">
                        <span class="toWork bgcgreen"></span>
                    <span >
                        上班&nbsp;&nbsp;
                        <span>{{data.toWorkTwo}}</span>
                    </span>
                    </span>
                    <br />
                    <span v-if="data.offWorkTwo">
                        <span class="offWork bgcRed"></span>
                    <span >
                        下班&nbsp;&nbsp;
                        <span>{{data.offWorkTwo}}</span>
                    </span>
                    </span>
                </template>
            </van-cell>
            <div class="cameraBox">
                <van-uploader
                    v-model="fileList"
                    :max-count="1"
                    accept="image/*"
                    :after-read="afterRead"
                    @oversize="onOversize"
                    :before-read="beforeRead"
                    @delete="del"
                >
                    <img class="imgBox" src="@/assets/images/camera_Icon@2x.png" alt />
                </van-uploader>
            </div>
            <!-- <van-popup v-model="show" position="bottom" :style="{ height: '22%' }" >
              <div class="popupText">上班</div>
              <div class="popupText">下班</div>
              <div class="popupText" @click="show=false">取消</div>
            </van-popup>-->
            <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
        </div>
    </div>
</template>
<script>
import qs from "qs";
export default {
    data() {
        return {
            imgObj: {
                one: require("@/assets/images/icon/daka_icon@2x.png"),
                two: require("@/assets/images/icon/gengxin_icon@2x.png"),
                three: require("@/assets/images/icon/dingwei_icon@2x.png"),
                four: require("@/assets/images/icon/fangshi_icon@2x.png"),
                five: require("@/assets/images/icon/jinrikaoqin_icon@2x.png")
            },
            show: false,
            actions: [
                { name: "上班", type: "TO" },
                { name: "下班", type: "OFF" },
                { name: "取消" }
            ],
            fileList: [],
            currentDate: new Date(),
            differ: "", //三分钟之内
            timeStamp: "", //进入页面的时间戳
            type: "",
            form: {
                type: "",
                coordinate: "",
                photo: ""
            },
            value: " ",
            nowTime: "",
            data: {}
        };
    },
    mounted() {
        this.getFileList();
        // this.$moment(this.nowTime).format("HH:mm:ss");
        // console.log(this.nowTime.getTime(), "haomiao");
        // console.log(this.$moment(this.nowTime).format("HH:mm:ss"), "===");

        window.setInterval(() => {
            let nowTime = new Date();
            this.nowTime = this.$moment().format("HH:mm:ss");
        }, 1000);
        // console.log(this.currentDate,'this.currentDate//进入页面的时间')
        this.timeStamp = this.currentDate.getTime(); // 当前时间毫秒
        // console.log(
        //     this.$moment(this.timeStamp).format("YYYY-MM-DD HH:mm:ss"),
        //     "进入页面的时间"
        // );
        let threeMinute = 1000 * 60 * 1; //三分钟的缓冲
        this.differ = this.timeStamp + threeMinute;
        // console.log(this.$moment(this.differ).format('YYYY-MM-DD HH:mm:ss'),'三分钟之内的时间')
        // console.log(threeMinute)
        this.value = this.$route.query.value;
    },
    created() {
        this.getattendance();
    },
    methods: {
        getattendance() {
            this.$utils
                .post(this.reqApi.yiBSchool + "/mobile/attendance/today")
                .then(res => {
                    if (res.data.code === "0000") {
                        this.data = res.data.data;
                    } else if (res.data.code === "1000") {
                        this.$toast(res.data.msg + "无法打卡");
                        return this.$router.push("/home");
                    } else {
                    }
                });
        },
        getFileList() {
            if (sessionStorage.getItem("photo")) {
                let url = {};
                url = {
                    url:
                        this.reqApi.yiBSchool + sessionStorage.getItem("photo"),
                    isImage: true
                };
                this.fileList.push(url);
            }
            if(sessionStorage.getItem('type')){
                if(sessionStorage.getItem('type')=='TO'){
                    this.type='上班'
                }else if(sessionStorage.getItem('type')=='OFF'){
                    this.type='下班'
                }
            }
        },
        del(file, index) {
            this.form.photo.splice(index, 1);
        },
        beforeRead(file, detail) {
            if (
                file.type == "image/jpeg" ||
                file.type == "image/jpg" ||
                file.type == "image/JPG" ||
                file.type == "image/JPEG"
            ) {
                // this.$toast("请上传 jpg 格式图片");
                return true;
            } else {
                alert("请上传 jpg 格式图片");
                return false;
            }
            return true;
        },
        location() {
            this.$router.push("/map");
        },
        onOversize(file) {
            if (file.size > 10 * 1024 * 1024) {
                alert("上传图片超出大小限制，请重新上传");
            }
        },
        onClickLeft() {
            this.$dialog
                .confirm({
                    title: "",
                    message: "确定退出考勤打卡页面？？？"
                })
                .then(() => {
                    // on confirm
                    this.$router.push("/home");
                })
                .catch(() => {
                    // on cancel
                });
        },
        afterRead(file) {
            file.status = "uploading";
            file.message = "上传中...";
            // 此时可以自行将文件上传至服务器
            // this.form.image=[]
            var formData = new FormData();
            formData.append("files", file.file); // 将formData传给后台
            formData.get("files");
            this.$utils
                .post(this.reqApi.yiBSchool + "/image/upload", formData)
                .then(res => {
                    if (res.data.code === "0000") {
                        this.form.photo = res.data.data.imgCodes;
                        sessionStorage.setItem("photo", this.form.photo);
                        file.status = "";
                    } else {
                        // this.$toast(res.data.msg)
                        setTimeout(() => {
                            file.status = "failed";
                            file.message = "上传失败";
                        }, 1000);
                    }
                });
        },
        onClickRight() {
            // this.$toast("提交成功");
            let submitTime = new Date().getTime();
            // console.log(this.$moment(this.submitTime).format('YYYY-MM-DD HH:mm:ss'))
            if (submitTime - this.timeStamp < 1 * 60 * 1000) {
                // console.log('三分钟之内')
                // 如果超过三分钟则提交系统时间，三分钟以内则提交，进入页面的时间
            } else {
                // console.log('三分钟之外')
            }
            if (this.$route.query.location) {
                this.form.coordinate = this.$route.query.location;
            }
            if (sessionStorage.getItem("photo")) {
                this.form.photo = sessionStorage.getItem("photo");
            }
            if (!this.form.type) return this.$toast.fail("请选择打卡方式");
            this.$utils
                .post(
                    this.reqApi.yiBSchool + "/mobile/attendance/clock",
                    qs.stringify({
                        type: this.form.type,
                        coordinate: this.form.coordinate,
                        photo: JSON.stringify(this.form.photo)
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.$toast("打卡成功");
                        this.$router.push("/home");
                        sessionStorage.removeItem("photo");
                    } else {
                        return this.$toast(res.data.msg);
                    }
                });
            //    if(this.timeStamp<submitTime&&submitTime<this.differ){
            //        console.log('三分钟之内')
            //    }else{
            //        console.log('三分钟之外')
            //    }
        },
        onSelect(item) {
            console.log(item)
            this.type = item.name;
            this.form.type = item.type;
            sessionStorage.setItem('type',item.type)
            if (item.name == "取消") {
                this.type=''
            }
            this.show = false;
        }
    }
};
</script>
 <style scoped>
.outBox {
    box-sizing: border-box;
}
.imgIcon {
    width: 16px;
    height: 16px;
    /* margin-right: 3px; */
    vertical-align: sub;
}
.submit {
    font-size: 14px;
    color: #1989fa;
}
.clockContent {
    padding-top: 46px;
}
.toWork,
.offWork {
    overflow: hidden;
    display: inline-block;
    width: 5px;
    height: 5px;
    vertical-align: middle;
    border-radius: 3px;
}
.bgcgreen {
    background-color: #10c157ff;
}
.bgcRed {
    background-color: #ff3000ff;
}
.van-cell--center {
    border-bottom: 1px solid rgba(235, 235, 235, 0.56);
}
.cameraBox {
    height: 109px;
    width: 100%;
    text-align: right;
    padding: 10px 15px;
    box-sizing: border-box;
}
.imgBox {
    width: 64px;
    height: 64px;
}
.popupText {
    height: 45px;
    border: 1px solid rgba(235, 235, 235, 0.56);
    border-radius: 10px;
    text-align: center;
    font-size: 16px;
    line-height: 45px;
    margin-bottom: 3px;
}
.popupText:hover {
    background-color: rgba(235, 235, 235, 0.56);
}
</style>


