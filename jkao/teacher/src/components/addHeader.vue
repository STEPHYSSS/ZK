<template>
  <div class="exam-head">
    <span class="add-ren-parent">
      <img class="add-ren" src="@/assets/images/addRen.png" alt="">
    </span>
    <span>{{level}}</span>
  </div>
</template>

<script>
export default {
  name: 'add-header',
  props: ['level']
}
</script>

<style>
  .exam-head {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: #3ec8dd;
    font-size: 16px;
    color: #fff;
  }
  /* 所有新增头的小人 */
  .add-ren-parent {
    height: 100%;
    display: inline-block;
    margin-left: 20px;
  }
  .add-ren {
    width: 100%;
    vertical-align: middle;
  }
</style>
