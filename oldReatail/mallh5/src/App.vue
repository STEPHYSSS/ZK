<template>
    <div id="app">
        <router-view />
    </div>
</template>
<script>
export default {
};
</script>
<style lang="less">
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    // height: 100vh;
    // width: 100vw;
    overflow-x: hidden;
    width: 100%;
    height: 100%;
    // height: 100vh;
}
// /* 设置页面滑动的动画 */
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
</style>
