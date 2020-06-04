<template>
     <div class="previousPage">
       <!-- <el-button @click="backHistory" size="mini" >返回</el-button> -->
       <img src="@/assets/images/returnbutton.png" @click="backHistory" />
     </div>
</template>

<script>
export default {
  name: 'previousPage',
  props:['goPreviousPage'],
  methods:{
  backHistory(){
    if (this.goPreviousPage) return this.$router.push({path: this.goPreviousPage})
  },
  }
}
</script>

<style>
.previousPage {
  /* position: absolute; */
    /* top: 30px;
    right: 35px; */
    cursor: pointer;
    z-index: 55;
    float: right;
    margin-top: 20px;
    margin-right: 20px;
}
</style>
