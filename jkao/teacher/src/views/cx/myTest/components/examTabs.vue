<template>
  <div class="exam-tabs">
    <span
      v-if="singleObjs && singleObjs.length > 0"
      class="tab-btn dis-inline-block"
      :class="activeName === 'single' ? 'active' : ''"
      @click="$emit('handleTabs', 'single')"
    >单选题</span>
    <span
      v-if="multiObjs && multiObjs.length > 0"
      class="tab-btn dis-inline-block"
      :class="activeName === 'multiple' ? 'active' : ''"
      @click="$emit('handleTabs', 'multiple')"
    >多选题</span>
    <span
      v-if="judgeObjs && judgeObjs.length > 0"
      class="tab-btn dis-inline-block"
      :class="activeName === 'judge' ? 'active' : ''"
      @click="$emit('handleTabs', 'judge')"
    >判断题</span>
    <span
      v-if="prcQus && prcQus.length > 0"
      class="tab-btn dis-inline-block"
      :class="activeName === 'tax' ? 'active' : ''"
      @click="$emit('handleTabs', 'tax')"
    >实训题</span>
  </div>
</template>

<script>
export default {
  props: {
    activeName: {
      type: String,
      default: 'single'
    },
    singleObjs: Array,
    multiObjs: Array,
    judgeObjs: Array,
    prcQus: Array
  }
};
</script>

<style scoped>
  @import "./exam.css";
</style>
