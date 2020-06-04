<template>
    <div class="commonality">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item class="parent" @click.native="pageHome">
          <span class="page-bread">首页</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{headline}}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button class="fr page-bread" size="mini" v-if="back" @click="goBack" icon="el-icon-back">返回</el-button>
    </div>
</template>

<script>
    export default {
      name: "my-crumbs",
      props:['headline', 'back'],
      methods: {
        pageHome () {
          this.$router.push({name : sessionStorage.routerName})
        },
        goBack () {
          this.$router.push({path: '/index'})
        },
      }
    }
</script>

<style scoped>
  .el-breadcrumb {
    cursor: pointer;
    font-size: 12px;
    height: 25px;
    line-height: 25px;
    /* margin-bottom: 16px; */
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
    display: inline-block;
    height: 25px;
    line-height: 25px;
    /* margin-bottom: 16px; */
  }

</style>
