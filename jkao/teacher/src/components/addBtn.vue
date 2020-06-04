<template>
  <div class="footer-btn">
    <el-button  @click="$emit('submitForm')">{{level1}}</el-button>
    <el-button  @click="$emit('cancelForm')">{{level2}}</el-button>
  </div>
</template>
<script>
export default {
  name: 'add-btn',
  props: ['level1', 'level2']
}
</script>

<style>
  /* 按钮 */
  .footer-btn .el-button {
    margin-top: 20px;
    /* border: 0px solid #ccc !important; */
    font-size: 12px;
  }
  .footer-btn .el-button:nth-child(1) {
    /* margin-left: 180px; */
    background-color: #444;
    color: #fff;
  }
  .footer-btn .el-button:nth-child(2) {
    background: #efefef;
    color: #000;
  }
</style>
