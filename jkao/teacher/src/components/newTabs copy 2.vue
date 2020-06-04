<template>
  <div class="new-tabs">
    <!-- 动态tabs -->
    <span v-for="(item,index) in tabsArray" :key="index+'a'" @click="$emit('toTabs',index,item)" :class="active === index ? 'active' : ''" class="new-tabs-child cur-point dis-inline-block">{{item.name}}</span>
     <!-- <span @click="$emit('callback1')" :class="active === 1 ? 'active' : ''" class="new-tabs-child cur-point dis-inline-block">{{level1}}</span>
    <span @click="$emit('callback2')" :class="active === 2 ? 'active' : ''" class="new-tabs-child cur-point dis-inline-block">{{level2}}</span>
    <span @click="$emit('callback3')" :class="active === 3 ? 'active' : ''" class="new-tabs-child cur-point dis-inline-block">{{level3}}</span>
    <span @click="$emit('callback4')" v-if="level4" :class="active === 4 ? 'active' : ''" class="new-tabs-child cur-point dis-inline-block">{{level4}}</span>
    <span @click="$emit('callback5')" v-if="level5" :class="active === 5 ? 'active' : ''" class="new-tabs-child cur-point dis-inline-block">{{level5}}</span>
    <span @click="$emit('callback6')" v-if="level6" :class="active === 6 ? 'active' : ''" class="new-tabs-child cur-point dis-inline-block">{{level6}}</span>
    <span @click="$emit('callback7')" v-if="level7" :class="active === 7 ? 'active' : ''" class="new-tabs-child cur-point dis-inline-block">{{level7}}</span> -->
    <!-- <span @click="$emit('callback8')" v-if="level8" :class="active === 8 ? 'active' : ''" class="new-tabs-child cur-point dis-inline-block">{{level8}}</span> -->
  </div>
</template>

<script>
  export default {
    data () {
      return {

      }
    },
    props: {
      active: {
        type: Number,
        default: 1
      },
      level1: {
        type: String,
        default: ''
      },
      level2: {
        type: String,
        default: ''
      },
      level3: {
        type: String,
        default: ''
      },
      level4: {
        type: String,
        default: ''
      },
      level5: {
        type: String,
        default: ''
      },
      level6: {
        type: String,
        default: ''
      },
      level7: {
        type: String,
        default: ''
      },
      // level8: {
      //   type: String,
      //   default: ''
      // }
    }
  }
</script>

<style scoped>
  .new-tabs {
    background-color: #f1f4f6;
    border-bottom: 1px solid #dbe0e5;
    height: 40px;
    
  }
  .new-tabs-child {
    width: 90px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: #444;
    position: relative;
  }
  .new-tabs .active {
    background-color: #fff;
  }
  .new-tabs .active::before {
    content: "";
    display: inline-block;
    width: 90px;
    height: 4px;
    background-color: #e71517;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>