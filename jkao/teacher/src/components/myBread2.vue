<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item class="font-size-12" @click.native="pageHome"><span class="page-bread">首页</span></el-breadcrumb-item>
      <el-breadcrumb-item class="font-size-12"><a href="javascript:;" @click="goBack()">{{level1}}</a></el-breadcrumb-item>
      <el-breadcrumb-item class="font-size-12">{{level2}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name:'my-bread2',
  props:['level1', 'level2'],
  methods: {
    goBack () {
      if (this.level1 == '试卷管理') return this.$router.push({name: 'findPapers'})
      if (this.level1 == '管理案例') return this.$router.push({name: 'caseList'})
      if (this.level1 == '课程列表') return this.$router.push({name: 'courseList'})
    },
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
  }

  .el-breadcrumb .page-bread {
    display: inline-block;
    background-color: #31b5ff;
    color: #fff;
    text-align: center;
    border-radius: 5px;
    width: 100px;
    font-weight: 300;
  }

  .el-breadcrumb {
    height: 25px;
    line-height: 25px;
  }
</style>
