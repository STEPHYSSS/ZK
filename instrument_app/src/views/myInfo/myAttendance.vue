<template>
  <div class="myAttendance">
    <div class="box">
      <NavBar>
        <van-icon name="arrow-left" slot="left" @click="onClickLeft" />
        <div slot="title" class="van-nav-bar__title van-ellipsis">我的考勤</div>
        <span slot="right" class="van-nav-bar__text" @click="Clockcalendar">打卡日历</span>
      </NavBar>
      <div class="List">
        <div class="clockBox2">
          <div class="calendarBox">
          <van-icon name="arrow-left" class="ArrowL" @click="reduce"/>
          <span class="year_mouth"  @click="showCalendr">
              <img src="@/assets/images/rili_icon@2x.png" alt="日历">
              <span class="daySty">
                <span class="year">{{currentYear}} - </span>
                <span class="mouth">{{currentMonth}}月</span>
              </span>
            </span>
          <van-icon name="arrow" class="ArrowR" @click="add" />
          </div>
          <van-popup v-model="show" position="bottom">
          <van-datetime-picker
            v-model="currentDate"
            type="year-month"
            title="选择年月"
            :formatter="formatter"
            @cancel="show = false"
            @confirm="confirmPicker"
          />
          </van-popup>
          <!-- <Calendar :myCalendar="myCalendar"></Calendar> -->
        </div>
        <div>
          <van-cell-group>
            <van-cell title="应出勤天数" :value="group.attendanceDay" />
            <van-cell title="实际出勤天数" :value="group.normalTimes" />
            <van-cell title="迟到次数" :value="group.lateTimes" />
            <van-cell title="早退次数" :value="group.earlyTimes" />
            <van-cell title="缺卡次数" :value="group.lackTimes" />
            <van-cell title="请假次数" :value="group.leaveTimes" />
          </van-cell-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import NavBar from "@/components/NavBar.vue";//顶部导航
import Calendar from "@/components/Calendars";//日历
export default {
  name: 'myAttendance',
  data () {
    return {
      myCalendar:"M",
      isActive: true,
      hasError: false,
      group:{
        Yday:"25",
        Sday:'22',
        Cday:'1',
        Zday:"2",
        Queday:"2",
        Qday:'2',
      },
      show: false,
      // 选择日期
      currentDate: new Date(),
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth() + 1,
      timeValue:""
    }
  },
  components: {
    NavBar,
    Calendar
  },
  created() {
    this.getAttend();
  },
  computed: {
    // 禁止月份增加
    addDisabled() {
      return this.currentYear === new Date().getFullYear() && this.currentMonth === new Date().getMonth() + 1;
    },
  },
  methods: {
    // 点击选择日期
    showCalendr() {
      this.show = true;
    },
    formatter(type, val) {
      if (type === 'year') {
        return `${val}年`;
      } else if (type === 'month') {
        return `${val}月`;
      }
      return val;
    },
    // 日期确定按钮和取消按钮
    confirmPicker(val) {
      let year = val.getFullYear()
      let month = val.getMonth() + 1
      if (month >= 1 && month <= 9) { month = `0${month}` }
      this.timeValue = `${year}-${month}`
      this.currentYear= `${year}`
      this.currentMonth = `${month}`
      this.getAttend();
      this.show = false
    },
    // 月份减少
    reduce() {
      this.currentMonth--;
      if (!this.currentMonth) {
        this.currentMonth = 12;
        this.currentYear--;
      }
      this.getAttend();
    },
    // 月份增加
    add() {
      if (this.addDisabled) return;
      this.currentMonth++;
      if (this.currentMonth > 12) {
        this.currentMonth = 1;
        this.currentYear++;
      }
      this.getAttend();
    },
    getAttend() {
      this.$axios.post(this.reqApi.yiBSchool + `/mobile/my/attendance`,
        qs.stringify({
          token:sessionStorage.getItem('token'),
          year:this.currentYear,
          month:this.currentMonth
        })
      ).then(res=>{
        if(res.data.code == '0000') {
          this.group = res.data.data;
        }else if (res.data.code === "6666") {
          this.$toast("token异常，请重新登录");
          const timer = setTimeout(() => {
            clearTimeout(timer);
            this.$router.push({
              name: "login"
            });
          }, 3000);
        }else return this.$toast(res.data.msg)
      })
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    Clockcalendar() {
      this.$router.push({ name: 'clockCalendar'})
    }
  },
}
</script>
<style scoped>
@import "../../style/zhu.css";
/* 8vh */
.active{
  height: 8vh;
}
</style>
