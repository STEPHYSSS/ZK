<template>
  <div class="clockCalendar">
    <div class="box">
      <NavBar>
        <van-icon name="arrow-left" slot="left" @click="onClickLeft" />
        <div slot="title" class="van-nav-bar__title van-ellipsis">打卡日历</div>
      </NavBar>
      <div class="List">
        <div class="clockBox">
          <Calendar :myCalendar="myCalendar" @getStatus='getDaka'></Calendar>
          <div class="clockList">
            <div class="fontSty" v-if="getArr.length == 0">无打卡记录</div>
            <!-- to代表上班，off代表下班 -->
            <van-cell v-for="(item,index) in getArr" :key="index">
              <template #title>
                <span class="statusty" :class="{'toWork':item.type === 'TO','noWork':item.type === 'OFF'}"></span>
                <span>{{item.type|statusTip2}}</span>&nbsp;&nbsp;<span>{{item.time}}</span>
              </template>
              <template #default>
                <span class="work" :class="{'zcWork':item.status === '1'}">{{item.status|statusTip}}</span>
              </template>
            </van-cell>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import NavBar from "@/components/NavBar.vue";//顶部导航
import Calendar from "../../components/Calendars"
export default {
  name: 'clockCalendar',
  data () {
    return {
      myCalendar:"D",
      getArr:{}

    }
  },
  created() {
  },
  components: {
    NavBar,
    Calendar
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    // 获取打卡
    getDaka(res) {
      this.getArr = res;
    }
  },
  filters: {
    statusTip(value) {
      if (value == "1") {
        return "正常";
      } else if (value == "2") {
        return "早退";
      }else if(value == "3"){
        return "迟到";
      }else return "缺卡"
    },
    statusTip2(value) {
      if (value == "TO") {
        return "上班";
      } else return "下班"
    },
  }
}
</script>
<style scoped>
@import "../../style/zhu.css";
.clockList .van-cell__title{
  text-align: left;
}
.statusty{
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.toWork{
  background-color: #10C157;
}
.noWork{
  background-color: #FF3000;
}
.work{
  color: #999999;
}
.zcWork{
  color: #004444;
}
</style>
