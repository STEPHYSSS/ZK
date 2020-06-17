<template>
  <div>
     <van-nav-bar class="guding">
        <slot slot="left"  name="left"></slot>
        <slot slot="title" name="title"></slot>
        <slot slot="right" name="right"></slot>
      </van-nav-bar>
  </div>
</template>
<script>
export default {
  data(){
    return {
      show:true
    }
  },
  methods:{
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    left: {
      type: String,
      default: ""
    },
    right: {
      type: String,
      default: ""
    }
  },
}
</script>
<style scoped>
.guding{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
</style>
