<template>
  <div>
    <!-- tab栏 -->
    <div class="detail-tabs">
      <div
        v-if="singleObjs && singleObjs.length > 0"
        class="tab-btn dis-inline-block"
        :class="activeName === 'single' ? 'active' : ''"
        @click="$emit('handleTabs', 'single')">单选题
      </div>
      <div
        v-if="multiObjs && multiObjs.length > 0"
        class="tab-btn dis-inline-block"
        :class="activeName === 'multiple' ? 'active' : ''"
        @click="$emit('handleTabs', 'multiple')">多选题
      </div>
      <div
        v-if="judgeObjs && judgeObjs.length > 0"
        class="tab-btn dis-inline-block"
        :class="activeName === 'judge' ? 'active' : ''"
        @click="$emit('handleTabs', 'judge')">判断题
      </div>
      <div
        v-if="prcQus && prcQus.length > 0"
        class="tab-btn dis-inline-block"
        :class="activeName === 'tax' ? 'active' : ''"
        @click="$emit('handleTabs', 'tax')">实训题
      </div>
    </div>
    <!-- 单选题号 -->
    <div v-if="activeName === 'single'&& singleObjs.length > 0" class="question-num">
      <a v-for="(item, index) in singleObjs" :key="index + 'a'">
        <div
        class="questionOrder"
        @click="$emit('jumpToCurrent', index)"
        :class="{ 'alAnswer' : item['checkAnswer'] ,'cur-question':showQuestion === index}">
        {{index + 1}}
        </div>
      </a>
    </div>
    <!-- 多选题号 -->
    <div v-if="activeName === 'multiple'&& multiObjs.length > 0" class="question-num">
      <a v-for="(item, index) in multiObjs" :key="index + 'b'">
        <span
        class="questionOrder"
        @click="$emit('jumpToCurrent', index)"
        :class="{ 'alAnswer' : item['checkAnswer'] ,'cur-question':showQuestion === index}">
        {{index + 1}}
        </span>
      </a>
    </div>
    <!-- 判选题号 -->
    <div v-if="activeName === 'judge'&& judgeObjs.length > 0" class="question-num">
      <a v-for="(item, index) in judgeObjs" :key="index + 'c'">
        <span
        class="questionOrder"
        @click="$emit('jumpToCurrent', index)"
        :class="{ 'alAnswer' : item['checkAnswer'] ,'cur-question':showQuestion === index}">
        {{index + 1}}
        </span>
      </a>
    </div>
    <!-- 实训题号 -->
    <div v-if="activeName === 'tax'&& prcQus.length > 0" class="question-num">
      <a v-for="(item, index) in prcQus" :key="index + 'd'">
        <span
        class="questionOrder"
        @click="$emit('jumpToCurrent', index)"
        :class="{ 'alAnswer' : item['checkAnswer'] ,'cur-question':showQuestion === index}">
        {{index + 1}}
        </span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    activeName: {
      type: String,
      default: 'single'
    },
    showQuestion: {
      type: Number,
      default: 0
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
