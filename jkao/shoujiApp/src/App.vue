<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <!-- <keep-alive>
         <router-view v-if='$route.meta.keepAlive' />
      </keep-alive>
      <router-view v-if='!$route.meta.keepAlive' /> -->
    <router-view/>
  </div>
</template>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
html,body {
  // font-size: 16px;
}
body{
  margin: 0;
  list-style: none;
}
.mint-msgbox{
  width: 15% !important;
}
</style>
