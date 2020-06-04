<template>
  <div class="zparent">
    <el-breadcrumb separator-class="el-icon-arrow-right child">
      <!-- <el-breadcrumb-item class="font-size-12 parent" @click.native="pageHome"><span class="page-bread">首页</span></el-breadcrumb-item> -->
      <el-breadcrumb-item v-if="level1" class="font-size-12">{{level1}}</el-breadcrumb-item>
    </el-breadcrumb>
    <h3 v-if="level2">{{level2}}</h3>
    <div class="ex" v-else-if="level3">{{level3}}</div>
  </div>
</template>

<script>
export default {
  name:'my-bread',
  props:['level1', 'level2', 'level3'],
  methods: {
    pageHome () {
      this.$router.push({name : sessionStorage.routerName})
    },
  }
}
</script>

<style scoped>
  .el-breadcrumb {
    cursor: pointer;
    height: 25px;
    line-height: 25px;
    /* margin-bottom: 16px; */
  }

  .el-breadcrumb .page-bread {
    /* display: inline-block; */
    background-color: #31b5ff;
    color: #fff;
    text-align: center;
    border-radius: 3px;
    padding: 4px 27px;
    /* width: 100px; */
    font-weight: 300;
  }

  .el-breadcrumb {
    height: 25px;
    line-height: 25px;
    /* margin-bottom: 16px; */
  }
  .zparent {
    margin: 0 20px;
  }
</style>
