<template>
  <div class="calendar">
    <div class="calendarBox">
      <!-- <span class="left" type="left" @click="reduce"/> -->
      <van-icon name="arrow-left" class="ArrowL" @click="reduce"/>
      <span class="year_mouth" @click="showCalendr">
        <img src="../assets/images/rili_icon@2x.png" alt="日历">
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
    <div class="rili">
      <ul class="led-color data-control">
        <li>日</li>
        <li>一</li>
        <li>二</li>
        <li>三</li>
        <li>四</li>
        <li>五</li>
        <li>六</li>
      </ul>
      <ul>
        <li v-for="(item2, index) in emptyArr" :key="`0${index}`"></li>
        <li v-for="(item, index) in dateList" :key="index" @click="queding(item.num)">
          <span class="spn_content" :class="{'onestatus3':item.status === 3 || item.status === 4,'Istoday':item.num === today}">
          {{item?item.num:""}}<i class="dian" :class="{'onestatus2':item.status === 1,'onestatus1':item.status === 2}"
          ></i></span>
          <!-- <span
              class="spn_content"
              :class="{ 'isImportant': item && item.type === 1 }">
              {{item ? item.num : ''}}
            </span> -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data(){
    return {
      loading: false,
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth() + 1,
      date: new Date().getDate(),
      dateList: [],
      clockCalender:[],
      emptyArr: [],
      dakaArr:[],
      show: false,
      // 选择日期
      currentDate: new Date(),
      today:new Date().getDate()
    }
  },
  props: {
    myCalendar: String
  },
  computed: {
    // 禁止月份增加
    addDisabled() {
      return this.currentYear === new Date().getFullYear() && this.currentMonth === new Date().getMonth() + 1;
    },
  },
  watch: {
    queryForm: {
      handler() {
        this.getItemList();
      },
      deep: true,
    },
  },
  created() {
    this.getClock();
    this.getRecord();
  },
  methods: {
    // 选择日期进行查询打卡记录
    queding(info) {
      this.$axios.post(this.reqApi.yiBSchool + `/mobile/my/attendanceRecord`,
        qs.stringify({
          token:sessionStorage.getItem('token'),
          year:this.currentYear,
          month:this.currentMonth,
          day:info
        })
      ).then(res=>{
        if(res.data.code == '0000') {
          this.dakaArr = res.data.data;
          this.clickFlag = 1;
          this.$emit('getStatus',this.dakaArr);
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
      this.currentYear= `${year}`
      this.currentMonth = `${month}`
      this.getClock();
      this.getRecord();
      this.show = false
    },
    // 月份减少
    reduce() {
      this.currentMonth--;
      if (!this.currentMonth) {
        this.currentMonth = 12;
        this.currentYear--;
      }
      this.getClock();
      this.getCalendarDate();
    },
    // 月份增加
    add() {
      if (this.addDisabled) return;
      this.currentMonth++;
      if (this.currentMonth > 12) {
        this.currentMonth = 1;
        this.currentYear++;
      }
      this.getClock();
      this.getCalendarDate();
    },
    // 获取打卡
    getClock() {
      this.$axios.post(this.reqApi.yiBSchool + `/mobile/my/attendanceCalendar`,
        qs.stringify({
          token:sessionStorage.getItem('token'),
          year:this.currentYear,
          month:this.currentMonth
        })
      ).then(res=>{
        if(res.data.code == '0000') {
          this.clockCalender = res.data.data;
          for(let i = 0;i<this.clockCalender.length;i++){
            this.$set(this.clockCalender[i], 'day', this.clockCalender[i].recordDay.split('T')[0].split('-')[2]);
          }
          this.getCalendarDate();
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
    getCalendarDate() {
      this.dateList = [];
      const startDate = new Date(this.currentYear, this.currentMonth - 1, 1);
      const endDate = new Date(this.currentYear, this.currentMonth, 0);
      this.emptyArr = new Array(startDate.getDay());
      // 获取月份第一天星期几  对数组索引赋值  将前几位置为empty
      // this.dateList[startDate.getDay()] = {
      //   type: 1,
      //   num: startDate.getDate(),
      // };
      for (let i = 1; i <= endDate.getDate(); i++) {
        this.dateList.push({
          type: 1,
          num: i,
        });
      }
      this.clockCalender.forEach((val) => {
        this.$set(this.dateList[val.day - 1], 'status', val.status);
      });
    },
    // 打卡记录
    getRecord() {
      this.$axios.post(this.reqApi.yiBSchool + `/mobile/my/attendanceRecord`,
        qs.stringify({
          token:sessionStorage.getItem('token'),
          year:this.currentYear,
          month:this.currentMonth,
          day:this.date
        })
      ).then(res=>{
        if(res.data.code == '0000') {
          this.dakaArr = res.data.data;
          this.$emit('getStatus',this.dakaArr);
        }else return this.$toast(res.data.msg)
      })
    },
  },
}
</script>

<style scoped>
@import "../style/zhu.css";
.isImportant{
  border-color: #4489FE!important;
}
.isImportant :hover{
  cursor: pointer;
  border-color: #E08821!important;
}
.onestatus1{
  background-color: red;
}
.onestatus2{
  background-color: greenyellow;
}
.onestatus3{
  background-color: #ccc;
}
.dian{
  display: inline-block;
  position: absolute;
  bottom: 2px;
  left: 45%;
  border-radius: 50%;
  width: 5px;
  height: 5px;
}
ul {
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
  padding-bottom: 5px;
  font-size: 14px;
  height: 25px;
}
li {
  height: 40px;
  user-select: none;
  width: 14.28%;
  text-align: center;
}
.spn_content {
  width: 35px;
  display: block;
  height: 35px;
  line-height: 35px;
  margin: 0 auto;
  border-radius: 50%;
  position: relative;
}
.spn_content:hover{
  border: 1px dashed #4489FE;
}
.Istoday{
  background-color: #b5e4f7;
}
</style>
