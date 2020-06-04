<template>
  <div class="selfTestingCountDown"><!--倒计时-->
    <img src="../assets/images/myTesst-clock_icon.png">
    <span class="character">考试剩余时间</span>
    <span>
        <i>00</i>:
        <i>00</i>:
        <i>00</i>
      </span>
  </div>
</template>

<script>
  export default {
    name: "selfTestingCountDown",
    data() {
      return {
        hh: '',
        mm: '',
        ss: ''
      }
    },
    created() {
        sessionStorage.getItem('selfTestTime')
    },
    methods:{

    }
  }
</script>

<style scoped>
  .selfTestingCountDown img {
    vertical-align: middle;
    margin: 0 10px 5px 0;
  }

  .selfTestingCountDown .character {
    color: #31B6FF;
  }

  .selfTestingCountDown span i {
    display: inline-block;
    width: 25px;
    height: 25px;
    border: 1px solid #E7E3E7;
    text-align: center;
    background-color: #fff;
  }

  .selfTestingCountDown span i:nth-child(1),
  .selfTestingCountDown span i:nth-child(2) {
    margin-right: 3px;
  }
</style>
