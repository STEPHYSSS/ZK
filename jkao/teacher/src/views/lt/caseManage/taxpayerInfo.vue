<template>
  <el-card shadow="never" class="box-card" id="taxpayer-info">
    <!-- <my-bread2 level1="管理案例" level2="纳税人信息"></my-bread2> -->
    <!-- <div class="font-weight-700 teacher-title">纳税人信息</div> -->

    <div class="big-box txalign">
      <h3>纳税人信息</h3>
      <div class="small-box">

        <el-form :model="form" :rules="rules" ref="form" :show-message="false" label-width="120px" class="demo-ruleForm">
          <el-row style="padding-top: 40px;">
            <el-col :span="12">
              <el-form-item label="案例编号: " prop="caseBh">
                {{form.caseBh || $route.query.id}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="纳税人识别号: " prop="nsrsbh">
                <el-input maxlength="50" class="input-big" v-model="form.nsrsbh"></el-input>
                <i v-if="!form.nsrsbh" class="close-color el-icon-circle-close"></i>
                <i v-if="form.nsrsbh" class="check-color el-icon-circle-check"></i>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="纳税人名称: " prop="nsrmc">
                <el-input maxlength="50" class="input-big" v-model="form.nsrmc"></el-input>
                <i v-if="!form.nsrmc" class="close-color el-icon-circle-close"></i>
                <i v-if="form.nsrmc" class="check-color el-icon-circle-check"></i>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="地址: " prop="dz">
                <el-input maxlength="50" class="input-big" v-model="form.dz"></el-input>
                <i v-if="!form.dz" class="close-color el-icon-circle-close"></i>
                <i v-if="form.dz" class="check-color el-icon-circle-check"></i>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="银行及账号: " prop="zh">
                <el-input maxlength="50" class="input-big" v-model="form.zh"></el-input>
                <i v-if="!form.zh" class="close-color el-icon-circle-close"></i>
                <i v-if="form.zh" class="check-color el-icon-circle-check"></i>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="电话号码: " prop="dhhm">
                <!-- <el-input maxlength="50" class="input-big" v-model.number="form.dhhm"></el-input> -->
                <input class="input-big circularBead" maxlength="11" v-model="form.dhhm" @input="getNumber">
                <i v-if="!form.dhhm" class="close-color el-icon-circle-close"></i>
                <i v-if="form.dhhm" class="check-color el-icon-circle-check"></i>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="登记注册类型: " prop="djzclx">
                <el-input maxlength="50" class="input-big" v-model="form.djzclx"></el-input>
                <i v-if="!form.djzclx" class="close-color el-icon-circle-close"></i>
                <i v-if="form.djzclx" class="check-color el-icon-circle-check"></i>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="法定代表人: " prop="fddbr">
                <el-input maxlength="50" class="input-big" v-model="form.fddbr"></el-input>
                <i v-if="!form.fddbr" class="close-color el-icon-circle-close"></i>
                <i v-if="form.fddbr" class="check-color el-icon-circle-check"></i>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <add-btn
        class="txalign"
        style="margin-top: 60px;"
        level1="确 定" level2="取 消"
        @submitForm="submitForm"
        @cancelForm="caseList">
        </add-btn>

        <div class="zouni">温馨提示: 红色星号表示必填项...</div>
      </div>
    </div>
  </el-card>

</template>

<script>
  export default {
    data() {
      return {
        form: {
          caseBh: "",
          dhhm: "",
          djzclx: "",
          dz: "",
          fddbr: "",
          nsrmc: "",
          nsrsbh: "",
          sbq: '',
          zh: ''
        },
        rules: {
          caseBh: [{required: false, trigger: 'blur'}],
          nsrsbh: [{required: false, trigger: 'blur'}],
          nsrmc: [{required: true, trigger: 'blur'}],
          dz: [{required: false, trigger: 'blur'}],
          zh: [{required: true, trigger: 'blur'}],
          dhhm: [{required: true, trigger: 'blur'}],
          djzclx: [{required: true, trigger: 'blur'}],
          fddbr: [{required: true, trigger: 'blur'}],
        }

      }
    },

    created() {
      this.getCaseNsrxx()
    },

    methods: {
      getCaseNsrxx () {
        const that = this
        that.$utils.post(`tax/getCaseNsrxx/${that.$route.query.id}`).then(res => {
          const {code, object, msg} = res.data
          if (code === '00') return that.form = object
          else {
            that.form.caseBh = that.$route.query.id
            that.$message(msg)
          }
        })
      },

      //电话号码验证
      getNumber(e) {
      e = e || window.event;
      let value = e.target.value
      this.form.dhhm = value.replace(/\D/g,'')
    },

      caseList () {
        this.$router.push({name : 'caseList'})
      },

      submitForm() {
        const that = this
        that.$utils.post('tax/upCaseNsrxx', that.form).then(res => {
          const {code, msg} = res.data
          if (code === '00') {
            that.$message.success('提交成功！')
            that.$router.push({name : 'caseList'})
          }
          else return that.$message(code + '---' + msg)
        })
      },

    },
  }
</script>

<style scoped>
.el-card {
  background-color: #f1f5f7;
}
.big-box {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 72%;
  height: 500px;
  margin: 70px auto 0;
  background-color: #f4f4f1;
  padding: 60px;
  padding-top: 0;
}
.small-box {
  /* border: 1px solid #c0dce6; */
  width: calc(100% -60px);
  height: 440px;
  background: #fff;
  padding: 0 30px;
  font-size: 12px !important;
  background: url('../../../assets/images/jfbg.jpg') no-repeat;
  background-size: 100% 100%;
}
h3 {
  padding: 0;
  height: 60px;
  line-height: 60px;
}
input[type=text] {
  height: 25px;
  line-height: 25px;
}
.input-big {
  width: 269px;
  height: 25px;
  line-height: 25px;
}
.input-middle {
  width: 175px;
}
.input-small {
  width: 148px;
}
.check-color {
  color: #60ce39;
  font-size: 20px;
}
.close-color {
  color: #ed3833;
  font-size: 20px;
}
.el-form-item {
    margin-bottom: 10px;
}
.el-form {
  text-align: left;
}
label.el-form-item__label {
  text-align: left;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 0px 0 5px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
  .zouni {
    text-align: left;
    padding: 20px 0 0 120px;
    color: #ed3833;
    font-size: 14px;
  }

  .circularBead{
    border-radius: 4px;
    border: 1px solid #ccc;
    width: 266px;
   outline: none;  /* 去除选中状态边框 */
  }

   input.input-big.circularBead:focus{
         border: 1px solid #444;
    border-radius: 4px;
   }
</style>