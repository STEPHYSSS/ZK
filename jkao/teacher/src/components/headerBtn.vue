<template>
  <ul class="buttons">
    <li @click="$emit('close')">
      <i class="el-icon-warning"></i>
      <span>返回</span>
    </li>
    <li @click="$emit('submitFrm')">
      <i style="color: #3ec8dd;" class="el-icon-success" :class="{die:isEdit == false}"></i>
      <span>保存</span>
    </li>
    <li @click="$emit('close')">
      <i class="el-icon-error"></i>
      <span>关闭</span>
    </li>
    <li v-if="level" class="center">
      {{level}}
    </li>
  </ul>
</template>

<script>
  export default {
    props: {
      isEdit: {
        type: Boolean,
        default: false
      },
      level: {
        type: String,
        default: ''
      },
    },
	}
</script>

<style>
  ul {
    position: relative;
  }
  .center {
    cursor: default;
    position: absolute;
    top: 50%;
    left: 50%;
    transform:translate(-50%,-50%);
  }
</style>