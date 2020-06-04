<template>
  <el-card shadow="never" class="box-card">
    <my-bread2 :level1="level1" :level2="level2"></my-bread2>

    <h3 class="txalign">{{object.ntitle}}</h3>
    <div class="txalign">
      <span>发布时间: {{object.nmodifydate}}</span>
      <span>访问量: {{object.nvisit}}</span>
    </div>
    <div class="line">
      <span v-html="object.ncontent"></span>
    </div>
  </el-card>
</template>

<script>
  export default {
    data() {
      return {
        object: [],
        level1: '',
        level2: ''
      };
    },

    created () {
      if (this.$route.query.id) return this.lookNews()
    },

    methods: {
      lookNews () {
        const that = this
        that.$utils.post(`exam/news/findOneNews/${that.$route.query.id}/1`).then(res => {
          const {code, object} = res.data
          if (code === '00') {
            that.level1 = object.cname
            that.level2 = object.ntitle
            that.object = object
          }
        })
      }
    }

  }
</script>

<style scoped>
  .line {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    padding: 20px 20px;
    margin-top: 20px;
  }
</style>
