<template>
    <div class="countDown"><!--倒计时-->
        <span class="character">考试剩余时间</span>
        <span>
        <i>{{hs}}</i>:
        <i>{{ms}}</i>:
        <i>{{ss}}</i>
      </span>
    </div>
</template>

<script>
    export default {
        name: "countDown",
        data() {
            return {
                timeName: null,//定时器名称
                /*====倒计时时间====*/
                hs: 0,
                ms: 0,
                ss: 0,
                lDur: null,// 考试剩余时长 （秒数）
                nowTime: null,
                starTime:null,
                deadline:null
            }
        },
        props: {
            examInfo:Object
        },
        created() {
            // 统一单位 ，时间戳的单位是毫秒  除以1000变成秒
            this.nowTime = parseInt(this.examInfo.nowTime/1000);
            this.starTime = parseInt(this.examInfo.starTime/1000);
            if (this.examInfo.deadline){
                this.deadline = parseInt(this.examInfo.deadline/1000);
            }
            this.duration = this.examInfo.duration*60;//时长  时长单位为分钟乘以60变成秒
        },
        mounted(){
            // 创建倒计时
            clearInterval(this.timeName);
            let duration = this.duration;
            let nowTime = this.nowTime;
            let starTime = this.starTime;
            // 统一单位 为秒(倒计时时长为：时长-（当前时间-开始时间）)
            this.lDur = parseInt(duration - (nowTime-starTime));
            let that = this;
            // 先将时间渲染到页面
            that.hs = ('0' + Math.floor(that.lDur / 3600)).slice(-2);
            that.ms = ('0' + Math.floor(that.lDur / 60 % 60)).slice(-2);
            that.ss = ('0' + Math.floor(that.lDur % 60 % 60)).slice(-2);

            // 开启定时器
            that.timeName = setInterval(function () {
                that.hs = ('0' + Math.floor(that.lDur / 3600)).slice(-2);
                that.ms = ('0' + Math.floor(that.lDur / 60 % 60)).slice(-2);
                that.ss = ('0' + Math.floor(that.lDur % 60 % 60)).slice(-2);

                that.nowTime++;
                that.lDur--;
            }, 1000)
        },
        methods: {
            clearTime() { // 清除定时器
                clearInterval(this.timeName);
            },
            removeSession(path) { // 清除session后跳转页面
                // sessionStorage.removeItem('lDur' + this.pid);
                this.$router.replace({path: path}); // 清除session后跳转页面
            }
        },
        watch: {
          lDur: function (val) { // 监听lDur小于0 时 提交试卷清除定时器
            if ((this.deadline && this.nowTime > this.deadline) || val < 0 ) {
              // 调用父组件 结束考试
              this.$emit('autoSubmit');
            }
          }
        },
        beforeDestroy () {
          this.clearTime()
        }
    }
</script>

<style scoped>
    .countDown img {
        vertical-align: middle;
        margin: 0 10px 5px 0;
    }

    .countDown .character {
        color: #e71517;
        margin-right: 10px;
    }

    .countDown span i {
        display: inline-block;
        width: 25px;
        height: 25px;
        border: 1px solid #E7E3E7;
        text-align: center;
        line-height: 27px;
        background-color: #fff;
    }

    .countDown span i:nth-child(1),
    .countDown span i:nth-child(2) {
        margin-right: 3px;
        text-align: center;
        line-height: 27px;
    }
</style>
