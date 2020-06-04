<template>
  <el-card class="f-new box-card">
    <!-- <new-tabs :active="1" :level1="level" level2="试卷分类" @callback2="findPaperCategorys"></new-tabs> -->
    <h3 v-if="this.$route.query.id">修改试卷分类</h3>
    <h3 v-else>新增试卷分类</h3>
    <previous-page goPreviousPage="/findPaperCategorys"></previous-page>
    <div class="newQue-body">
      <div class="new-body">

        <el-form ref="form" :rules="rules" :model="form" label-width="80px">
          <el-form-item label="类别名称:" prop="name">
            <input type="text" maxlength="50" v-model="form.name" class="inputWidth">
          </el-form-item>
          <el-form-item label="类别状态:" prop="status">
            <el-select v-model="form.status" placeholder="请选择" class="inputWidth">
              <el-option label="正常" :value="1"></el-option>
              <el-option label="锁定" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="共享:" prop="shared">
            <el-select v-model="form.shared" placeholder="请选择" class="inputWidth">
              <el-option label="共享" :value="1"></el-option>
              <el-option label="私有" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="说明:" prop="description">
            <input type="text" maxlength="200" v-model="form.description" class="inputWidth">
          </el-form-item>
        </el-form>
        <add-btn
        class="txalign"
        level1="提 交" level2="取 消"
        @submitForm="submitForm('form')"
        @cancelForm="findPaperCategorys">
        </add-btn>
      </div>
    </div>
  </el-card>

</template>

<script>
  import { createTypePaper, updateTypePaper } from '@/api/taxUrl/testpaper'
  import newTabs from '@/components/newTabs'
  import previousPage from "@/components/previousPage.vue";
  export default {
    data() {
      return {
        form: {
          id: null,
          name: '',
          description: '',
          status: 1,
          shared: 1,
          create_user_id: null,
        },
        rules: {
          name: [{ required: true, message: '类别名称不能为空！', trigger: 'blur' }]
        }
      }
    },

    computed: {
      level: {
        get: function () {
          return this.level = !this.$route.query.id ? "新增试卷分类" : "修改试卷分类"
        },
        set: function () {}
      }
    },
    components: {
      newTabs,
      "previous-page": previousPage
    },

    created () {
      if (this.$route.query.id) return this.getPaperInfo()
    },

    methods: {
      getPaperInfo () {
        const that = this
        let paperTypeInfo = JSON.parse(sessionStorage.getItem('paperTypeInfo'))
        that.form = paperTypeInfo
      },
      // 新建对话框 提交
      submitForm(formName) {
        const that = this
        that.$refs[formName].validate(async (valid) => {
          if (valid) {
            that.form.create_time = null
            that.form.update_time = null
            let res = {}
            if (!that.$route.query.id) {
              res = await createTypePaper(that.form)
            }else {
              res = await updateTypePaper(that.form)
            }
            const { code, msg } = res.data
            if (code === '0000') {
              sessionStorage.removeItem('paperTypeInfo')
              that.$router.push({name : 'findPaperCategorys'})
              that.$message.success(msg)
            }
            else return that.$message(msg)
          } else {
            that.$message('请填写完整！')
            return false;
          }
        });
      },

      // 试卷分类
      findPaperCategorys () {
        this.$router.push({name : 'findPaperCategorys'})
      },
    },
  }
</script>

<style scoped>
  .newQue-body {
    border: 1px solid #dbdfe6;
  }
  .newQue-body .new-body {
    padding: 30px 30px;
  }
  .inputWidth{
    width: 250px;
  }
</style>