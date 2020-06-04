<template>
  <div>
     <van-nav-bar :title="title" left-arrow :fixed="show" @click-left="onClickLeft">
        <div slot="left">
                <img class="topimgstyle" src="@/images/fanhui_icon@2x.png" alt />
            </div>
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
     onClickLeft() {
            this.$router.go(-1);
        },
  },
  props: {
    title: {
      type: String,
      default: ""
    }
  }
}
</script>
<style lang="less" scoped>

</style>