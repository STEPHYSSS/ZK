<template>
  <el-card class="f-new box-card">
    <!-- <new-tabs :active="1" :level1="level" level2="文章分类管理" @callback2="articleManage"></new-tabs> -->
    <h3 v-if="$route.query.id">修改文章分类</h3>
    <h3 v-else>新增文章分类</h3>
    <!-- <previous-page goPreviousPage="/articleManage"></previous-page> -->
    <table border="1">
      <tbody>
        <tr>
          <td class="text-center">分类名称: </td>
          <td>
            <input maxlength="50" type="text" v-model="form.name"> 
            <span>
              <span class="redB">*</span>填写分类名称
            </span>
          </td>
        </tr>
        <!-- <tr>
          <td class="text-center">排序: </td>
          <td>
            <input maxlength="10" type="text" v-model="form.corderid" class="inputWid"> 
            <span>
              <span class="redB">*</span>数值越小越靠前,如1是第一位
            </span>
          </td>
        </tr> -->
        <tr>
          <td class="text-center">状态: </td>
          <td>
            <el-select v-model="form.status" placeholder="请选择">
              <el-option label="开放" :value="1"></el-option>
              <el-option label="关闭" :value="2"></el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td class="text-center">备注: </td>
          <td>
            <input maxlength="500" type="text" v-model="form.remark">
          </td>
        </tr>
      </tbody>
    </table>
    <add-btn
    style="margin-left: 130px;"
    level1="确 认" level2="取 消"
    @submitForm="submitForm"
    @cancelForm="articleManage">
    </add-btn>
  </el-card>

</template>

<script>
  import { newNoticeType, updateNoticeType } from '@/api/taxUrl/announcement'
  import newTabs from '@/components/newTabs'
  // import previousPage from "@/components/previousPage.vue";
  export default {
    data() {
      return {
        form: {
          id: null,
          name: '',
          status: 1,
          school_uuid: null,
          remark:'',

        }
      }
    },
    components: {
      newTabs,
      // "previous-page": previousPage
    },

    created() {
      if (this.$route.query.id) return this.getArticleInfo()
    },

    methods: {
      getArticleInfo () {
        const that = this
        let announcementTypeInfo = JSON.parse(sessionStorage.getItem('announcementTypeInfo'))
        that.form = announcementTypeInfo
      },

      async submitForm () {
        const that = this
        if (!that.form.name) return that.$message('分类名称不能为空！')
        let res = {}
        that.form.create_time = null
        that.form.update_time = null
        if (!that.$route.query.id) {
          res = await newNoticeType(that.form)
        }else {
          res = await updateNoticeType(that.form)
        }
        const {code, msg} = res.data
        if (code === '0000') {
          sessionStorage.removeItem('announcementTypeInfo')
          that.$router.push({name : 'articleManage'})
          that.$message.success(msg)
        }
        else return that.$message(msg)
      },

      // articleManage
      articleManage () {
        this.$router.push({ name : 'articleManage' })
      },

    },
  }
</script>

<style scoped>
  /* 头部表格 */
  table {
    border-color:#e4e9ec;
    border-collapse: collapse;
    border: 1px solid #e4e9ec;
    color: #777;
    margin-bottom: 20px;
  }
  table tbody tr td {
    padding: 5px 15px;
  }
  table tbody tr td:nth-child(1) {
    /* background-color: #a8e7f0; */
    width: 200px;
  }
  table tbody tr td:nth-child(2) {
    width: 90%;
  }

  input {
    width: 240px;
  }
  .inputWid {
    width: 100px;
  }

  .el-button.haha {
    border: 1px solid #31b5ff;
    color: #fff;
    background-color: #31b5ff;
    padding: 7px 7px;
    margin-left: 15px;
  }
  .redB {
    color: #ef6f6e;
    vertical-align: middle;
    padding: 0 5px 0 20px;
  }
</style>