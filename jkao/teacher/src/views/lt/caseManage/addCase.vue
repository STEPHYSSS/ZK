<template>
  <el-card class="f-new box-card" id="add-case">
    <new-tabs :active="1" :level1="level" level2="管理案例" @callback2="caseList"></new-tabs>

    <!-- 考试信息 -->
    <el-row class="add-exam">
      <el-form ref="form" :rules="rules" :model="form" label-width="100px">
        <div>
          <el-form-item label="案例编号:" prop="caseBh" class="wushi">
            <input type="text" maxlength="50" v-model="form.caseBh" class="inputWid">
          </el-form-item>
          <el-form-item label="申报种类:" prop="sbzlDm" class="wushi fr">
            <el-select v-model="form.sbzlDm" placeholder="请选择">
              <el-option
                v-for="(item,index) in sbzlList"
                :key="index"
                :label="item.sbzlMc"
                :value="item.sbzlDm">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="案例名称:" prop="caseMc" class="wushi">
            <input type="text" maxlength="50" v-model="form.caseMc" class="inputWid">
          </el-form-item>
          <el-form-item label="发布日期:" prop="fbrq" class="wushi fr">
            <el-date-picker
              class="inputWid"
              @change="change(form.fbrq, 'fbrq')"
              v-model="form.fbrq"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="所属时期起:" prop="sssqQ" class="wushi">
            <el-date-picker
              class="inputWid"
              @change="change(form.sssqQ, 'sssqQ')"
              v-model="form.sssqQ"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="所属时期止:" prop="sssqZ" class="wushi fr">
            <el-date-picker
              class="inputWid"
              @change="change(form.sssqZ, 'sssqZ')"
              v-model="form.sssqZ"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </div>
        <div>
            <el-form-item label="申报期限:" prop="sbqx" class="wushi">
              <el-date-picker
                class="inputWid"
                @change="change(form.sbqx, 'sbqx')"
                v-model="form.sbqx"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>

            <el-form-item label="试卷号:" prop="sjh" class="wushi fr">
            <input type="text" maxlength="50" v-model="form.sjh" class="inputWid fr">
          </el-form-item>

          <el-form-item label="共享:" prop="shared">
            <el-select v-model="form.shared" placeholder="请选择" class="add-status">
              <el-option label="共享" :value="1"></el-option>
              <el-option label="私有" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
    </el-row>

    <add-btn
    class="txalign"
    level1="提 交" level2="取 消"
    @submitForm="submitForm('form')"
    @cancelForm="caseList">
    </add-btn>

  </el-card>

</template>

<script>
  import newTabs from '@/components/newTabs'
  export default {
    data() {
      return {
        sbzlList: [],
        tableData: [],
        form: {
          caseBh: "",
          sbzlDm: "101",
          caseMc: "",
          fbrq: "",
          sssqZ: "",
          sssqQ: "",
          sbqx: "",
          yxbz: "Y",
          mbbz: "N",
          diff: "3",
          sjh:"",
          shared:sessionStorage.aRoleid == 'teacher'? 0 : 1,
        },
        rules: {
          caseBh: [{ required: true, message: '案例编号不能为空！', trigger: 'blur' }],
          sbzlDm: [{ required: true, message: '申报种类不能为空！', trigger: 'blur' }],
          caseMc: [{ required: true, message: '案例名称不能为空！', trigger: 'blur' }],
          fbrq: [{ required: true, message: '发布日期不能为空！', trigger: 'blur' }],
          sssqZ: [{ required: true, message: '所属时期止不能为空！', trigger: 'blur' }],
          sssqQ: [{ required: true, message: '所属时期起不能为空！', trigger: 'blur' }],
          sbqx: [{ required: true, message: '申报期限不能为空！', trigger: 'blur' }],
          sjh: [{ required: true, message: '试卷号不能为空！', trigger: 'blur' }],
        },
      }
    },

    computed: {
      level: {
        get: function () {
          return this.level = !sessionStorage.caseInfo ? "新增案例" : "修改案例"
        },
        set: function () {}
      }
    },
    components: {
      newTabs
    },

    created() {
      this.getSbzlList()
      if (sessionStorage.caseInfo) {
        let sessData = JSON.parse(sessionStorage.caseInfo)
        this.form = {
          caseBh: sessData.case_bh,
          sbzlDm: sessData.sbzl_dm,
          caseMc: sessData.case_mc,
          fbrq: sessData.fbrq,
          sssqZ: sessData.sssq_z,
          sssqQ: sessData.sssq_q,
          sbqx: sessData.sbqx,
          yxbz: sessData.yxbz,
          mbbz: sessData.mbbz,
          diff: sessData.diff,
          sjh: sessData.sjh,
          shared:sessData.shared
        }
      }
    },

    methods: {
      // 申报种类
      getSbzlList () {
        const that = this
        that.$utils.post('tax/getSbzlList').then(res => {
          const {code, list} = res.data
          if (code === '00') return that.sbzlList = list
          else return that.$message('获取申报种类失败！') 
        })
      },

      // 提交
      submitForm (formName) {
        const that = this
        that.$refs[formName].validate((valid) => {
          if (valid) {
            that.$utils
            .post(`tax/upCase`, that.form)
            .then(res => {
              const {code, msg} = res.data
              if (code === '00') {
                that.caseList()
                that.$message.success(msg)
              }
              else return that.$message(msg)
            })
            .catch(err => {
              that.$message.error('网络异常')
            })
          } else {
            that.$message('请填写完整!')
            return false;
          }
        })
      },

      change (val, bs) {
        this.form[bs] = this.$moment(val).format('YYYY-MM-DD')
      },
      
      caseList () {
        this.$router.push({name : 'caseList'})
      },

    },
    destroyed() {
      sessionStorage.removeItem('caseInfo')
    },
  }
</script>

<style scoped>
  /* 考试信息头 */
  .add-exam {
    width: 100%;
    border: 1px solid #c2cad8;
  }
  .el-form, .table-border {
    padding: 20px 200px 20px 60px;
  }
  .table-border {
    border: 1px solid #dbdfe6;
    margin-top: 20px;
  }
  .wushi {
    display: inline-block;
  }

  .inputWid {
    width: 250px;
  }
  .inputSmall {
    width: 80px;
  }
  .inputBbig {
    width: 360px;
  }
  div.el-select {
    width: 250px !important;
  }
  .el-form-item {
    margin-bottom: 14px;
  }
</style>