<template>
  <el-card class="f-new box-card">
    <!-- <new-tabs :active="1" :level1="level" level2="试卷管理" @callback2="findPapers"></new-tabs> -->
    <h3 v-if="this.$route.query.id">修改试卷</h3>
    <h3 v-else>创建试卷</h3>
    <previous-page goPreviousPage="/findPapers"></previous-page>
    <!-- 表单 -->
    <div class="newQue-body">
      <div class="new-body">
        <el-form ref="form" :rules="rules" :model="form" label-width="100px">
          <div>
            <el-form-item label="试卷名称:" prop="name" class="wushi">
              <input type="text" maxlength="50" v-model="form.name">
            </el-form-item>
            <el-form-item label="试卷状态:" prop="status" class="wushi fr">
              <el-select v-model="form.status" placeholder="请选择">
                <el-option label="开放" :value="1"></el-option>
                <el-option label="关闭" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="试卷分类:" prop="type_id" class="wushi">
              <el-select v-model="form.type_id" placeholder="请选择">
                <el-option
                  v-for="(item,index) in list"
                  :key="index"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="共享:" prop="shared" class="wushi fr">
              <el-select v-model="form.shared" placeholder="请选择" class="add-status">
                <el-option label="共享" :value="1"></el-option>
                <el-option label="私有" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div>
            <!-- <el-form-item label="试卷类型:" prop="ppapertype" class="wushi">
              <el-select v-model="form.ppapertype" :disabled="disabledSel" placeholder="请选择">
                <el-option label="随机试卷" value="1"></el-option>
                <el-option label="普通试卷" value="0"></el-option>
              </el-select>
            </el-form-item> -->
            <!-- <el-form-item label="试题排列顺序:" prop="pquestionOrder" class="wushi fr">
              <el-select v-model="form.pquestionOrder" placeholder="请选择">
                <el-option label="原始顺序" value="1"></el-option>
                <el-option label="随机顺序" value="0"></el-option>
              </el-select>
            </el-form-item> -->
          </div>
          <el-form-item label="试卷说明:" prop="remark">
              <textarea v-model="form.remark" maxlength="200"></textarea>
              <p class="text-right paper-p">{{form.remark.length}}/200 &nbsp;&nbsp;&nbsp;</p>
          </el-form-item>
          <!-- <template v-if="form.ppapertype === '1' && !this.$route.query.id">
            <el-form-item label="">
              <el-button @click="addRow(form.tmPaperSections)">增加章节</el-button>
            </el-form-item>
            <el-form-item label="章节设定:">
              <table v-for="(item, index) in form.tmPaperSections" :key="index" border="1">
                <tbody>
                  <tr>
                    <td>
                      <el-select @input="Typechange($event, item)" v-model="item.cname" class="long-input" placeholder="章节名称">
                        <el-option label="单选题" value="单选题"></el-option>
                        <el-option label="多选题" value="多选题"></el-option>
                        <el-option label="实训题" value="实训题"></el-option>
                      </el-select>
                      <input type="text" class="input-1" v-model="item.remark" placeholder="章节描述">
                    </td>
                    <td rowspan="2" class="del-row text-center" @click="delRow(form.tmPaperSections, index)">❌</td>
                  </tr>
                  <tr>
                    <td>
                      <el-select v-model="item.qdbid" placeholder="请选择题库">
                        <el-option
                          v-for="(item1,index1) in questionList"
                          :key="index1"
                          :label="item1.dname"
                          :value="item1.did">
                        </el-option>
                      </el-select>
                      <el-select v-model="item.qlevel" class="input-2" placeholder="选择难度">
                        <el-option label="非常容易" value="1"></el-option>
                        <el-option label="比较容易" value="2"></el-option>
                        <el-option label="常规" value="3"></el-option>
                        <el-option label="较难" value="4"></el-option>
                        <el-option label="非常难" value="5"></el-option>
                      </el-select>
                      试题数量: <input v-model="item.qsl" class="input-3" type="text">
                      每题分值: <input v-model="item.score" class="input-3" type="text">
                    </td>
                  </tr>
                </tbody>
              </table>
            </el-form-item>
          </template> -->
          <add-btn
          style="margin-left: 100px;"
          level1="提 交" level2="取 消"
          @submitForm="submitForm('form')"
          @cancelForm="findPapers">
          </add-btn>
        </el-form>
      </div>
    </div>
  </el-card>

</template>

<script>
  import { getTypePapers, createPaper, updatePaper } from '@/api/taxUrl/testpaper'
  import { questionBack  } from '@/api/taxUrl/question'
  import newTabs from '@/components/newTabs'
  import previousPage from "@/components/previousPage.vue";
  export default {
    data() {
      return {
        // disabledSel: false,
        // checkAll: false,
        // checkedClass: [], // 提交的
        // showClass: [],
        // isIndeterminate: true,
        classList: [], // 存放班级id
        // 分类列表
        list: [],
        // 题库
        questionList: [],
        form: {
          id: null,
          name: '',
          remark: '',
          total_score: 100,
          course_id: null,
          create_user_id: null,
          create_time: null,
          update_user_id: null,
          update_time: null,
          status: 1,
          shared: 1,
          school_uuid: null,
          type_id: '',
          pass_score: 100,
        },
        rules: {
          name: [{ required: true, message: '试卷名称不能为空！', trigger: 'blur' }],
          status: [{ required: true, message: '试卷状态不能为空！', trigger: 'blur' }],
          type_id: [{ required: true, message: '试卷分类不能为空！', trigger: 'blur' }],
          remark: [{ required: true, message: '试卷说明不能为空！', trigger: 'blur' }],
        }
      }
    },

    computed: {
      level: {
        get: function () {
          return this.level = !this.$route.query.id ? "创建试卷" : "修改试卷"
        },
        set: function () {}
      }
    },
    components: {
      newTabs,
      "previous-page": previousPage
    },

    created() {
      // this.getfindClasses()
      this.getTypePapers()
      if (this.$route.query.id) return this.getOnePaper()
    },

    methods: {
      // 获取试卷分类
      async getTypePapers () {
        const { data: { types, code } } = await getTypePapers()
        // this.$utils.post(`exam/sys/findOpenPaperCategorys`).then(res => {
          // const {list, code} = res.data
          if (code === '0000') return this.list = types.list
          else this.$message('获取试卷分类失败!')
        // })
      },

      // 获取开放题库列表
      async questionBack () {
        const { data: { list, code } } = await questionBack()
        // that.$utils.post(`exam/sys/findOpenQuestionDbs`).then(res => {
          // const {list, code} = res.data
          if (code === '0000') return that.questionList = list
          else this.$message('获取题库列表失败!')
        // })
      },

      change (val, bs,e) {
        const valGb = this.$utils.momentTime(val)
        this.form[bs] = valGb
      },

      // getfindClasses () {
      //   const that = this
      //   that.$utils.post('exam/sys/findOpenClasses').then(res => {
      //     const {code, list} = res.data
      //     if (code === '00') return that.classList = list
      //     else return that.$message('获取班级列表失败')
      //   })
      // },

      // getfindClasses () {
      //   const that = this
      //   that.$utils.post('exam/sys/findOpenClasses').then(res => {
      //     const {code, list} = res.data
      //     if (code === '00') {
      //       let arr = []
      //       list.forEach(item => {
      //         arr.push(item.cid)
      //       })
      //       const result = list.map((item) => {
      //         return {
      //           "name" : item.name,
      //           "pClassid" : item.cid
      //         }
      //       })
      //       that.showClass = result // 放班级名和cid
      //       that.classList = arr // 存放班级id
      //     }else return that.$message('获取班级列表失败')
      //   })
      // },

      // 复选框
      // handleCheckAllChange(val) {
      //   this.checkedClass = val ? this.classList : [] // 存放班级id
      //   this.isIndeterminate = false
      //   this.form.pClassid = this.checkedClass
      // },
      // handleCheckedClassChange(value) {
      //   let checkedCount = value.length
      //   this.checkAll = checkedCount === this.showClass.length
      //   this.isIndeterminate = checkedCount > 0 && checkedCount < this.showClass.length
      //   this.form.pClassid = value
      // }

      // 获取单个试卷
      getOnePaper () {
        let paperInfo = JSON.parse(sessionStorage.getItem('paperInfo'))
        this.form = paperInfo
      },

      // addRow
      addRow (row) {
        row.push({
          "cname": "",
          "remark": "",
          "qdbid":"",
          "qtype":"1",
          "qlevel":"3",
          "qsl":"2",
          "score":"3",
          "xh": row.length + 1
        })
      },
      delRow (row, index) {
        row.splice(index, 1)
      },
      
      // 提交
      submitForm (formName) {
        const that = this
        that.$refs[formName].validate(async (valid) => {
          if (valid) {
            if (that.form.ppapertype == '1') {
              that.form.total_score = 0
              that.form.tmPaperSections.forEach(item => {
                that.form.total_score += item.qsl * item.score
              });
              that.form.pass_score = parseInt(that.form.total_score * 0.6)
            }
            let res = {}
            that.form.create_time = null
            that.form.update_time = null
            if (!that.$route.query.id) {
              res = await createPaper(that.form)
            }else {
              res = await updatePaper(that.form)
            }
              const {code, msg} = res.data
              if (code === '0000') {
                sessionStorage.removeItem('paperInfo')
                that.$router.push({name : 'findPapers'})
                that.$message.success(msg)
              }
              else return that.$message(msg)
          } else {
            that.$message('请填写完整！')
            return false;
          }
        });
      },

      // 试卷管理
      findPapers () {
        this.$router.push({name: 'findPapers'})
      },

    }
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
    min-width: 720px;
  }
  table td {
    padding: 0 5px;
    white-space: nowrap;
  }
  .newQue-body {
    border: 1px solid #dbdfe6;
  }
  .newQue-body .new-body {
    padding: 30px 200px 30px 70px;
  }
  .wushi {
    display: inline-block;
  }

  .inputWid {
    width: 300px !important;
  }
  div.el-select {
    width: 220px;
  }
  input {
    width: 220px;
  }
  .input-1 {
    width: 420px !important;
  }
  .input-2 {
    width: 100px !important;
  }
  .input-3 {
    width: 50px !important;
  }
  .del-row {
    width: 40px;
    background: #e4e9ec;
  }
  textarea {
    display: block;
    resize: none;
    padding: 5px 15px;
    line-height: 1.5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 500px;
    height: 100px;
    font-size: inherit;
    color: #606266;
    background-color: #fff;
    background-image: none;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  }
  textarea:focus {
    outline:0;
  }
  .paper-p {
    width: 500px;
    position: absolute;
    bottom: 0;
  }
  div.el-form-item {
    margin-bottom: 15px;
  }
</style>