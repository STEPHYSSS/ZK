<template>
    <div id="app">
        <!-- <img src="./assets/logo.png"> -->
        <!-- <router-view /> -->
      <keep-alive>
         <router-view v-if='$route.meta.keepAlive' />
      </keep-alive>
      <router-view v-if='!$route.meta.keepAlive' />
    </div>
</template>

<script>
export default {
    name: "App",
}
</script>

<style>
@import "./style/zhu.css";
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    /* -webkit-font-smoothing: antialiased; */
    /* -moz-osx-font-smoothing: grayscale; */
    /* text-align: center;
    color: #2c3e50; */
    height: 100vh;
    width: 100vw;
    background-color: #F5F5F5;
}
/* 设置页面滑动的动画 */
.v-enter {
    opacity: 0;
    transform: translateX(100%);
}
.v-leave-to {
    opacity: 0;
    transform: translateX(-100%);
    position: absolute;
}
.v-enter-active,
.v-leave-active {
    transition: all 0.5s ease;
}
.van-row--justify-space-between{
  border-bottom: 1px solid rgba(235,235,235,1);
  font-size: 14px;
  height: 43px;
  line-height: 43px;
}
/* .van-dropdown-menu__bar */
.oneBox .chooseMsg .van-dropdown-menu {
  border-bottom: 0.026667rem solid #ebedf0;
  padding-left: 1.666667rem;
}
.oneBox .chooseMsg .van-dropdown-menu .van-dropdown-menu__bar{
  box-shadow: none;
}
#chooseTime .van-field__control{
  text-align: right;
}
.input-wid .el-input__inner{
  border: 0;
  padding-left: 0.65rem;
}
</style>
