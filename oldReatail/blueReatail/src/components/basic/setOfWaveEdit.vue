<template>
  <div id="setOfWaveEdit" class="minimum minWidth1600">
    
    <div class="content1">
      <h3>策略编辑</h3>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="130px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="12">
            <div class="left">
              <el-form-item label="仓库名称:" prop="name">
                <el-select v-model="ruleForm.name" placeholder="请选择仓库名称" class="input1">
                  <el-option label="所有仓库" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="单据数量上限:" prop="sheetMax">
                <el-input v-model="ruleForm.sheetMax" class="input1"></el-input>
              </el-form-item>
              <el-form-item label="单据数量下限:" prop="sheetMin">
                <el-input v-model="ruleForm.sheetMin" class="input1"></el-input>
              </el-form-item>
              <el-form-item label="商品数量上限:" prop="goodsMax">
                <el-input v-model="ruleForm.goodsMax" class="input1"></el-input>
              </el-form-item>
              <el-form-item label="商品数量下限:" prop="goodsMin">
                <el-input v-model="ruleForm.goodsMin" class="input1"></el-input>
              </el-form-item>
              <el-form-item label="商品品类上限:" prop="goodsTypeMax">
                <el-input v-model="ruleForm.goodsTypeMax" class="input1"></el-input>
              </el-form-item>
              <el-form-item label="商品品类下限:" prop="goodsTypeMin">
                <el-input v-model="ruleForm.goodsTypeMin" class="input1"></el-input>
              </el-form-item>
              <el-form-item label="优先级:" prop="priority">
                <el-select v-model="ruleForm.priority" placeholder="请选择活动区域" class="input1">
                  <el-option label="1" value="1"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="组波生成规则:" prop="formationRule">
                <el-radio-group v-model="ruleForm.formationRule" class="input1">
                  <el-radio label="D">按订单</el-radio>
                  <el-radio label="M">按品类</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="定时器设定规则:" prop="timer">
                <el-radio v-model="ruleForm.timer" label="1">每天执行一次</el-radio>
                <div class="forbid">
                  <span>22:00</span>
                </div>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <div style="text-align:center;">
          <el-button class="theBtn themeColor textMright" @click="submit('ruleForm')">确定</el-button>
          <el-button class="theBtn resetButton" @click="back">返回</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  data() {
    return {
      ruleForm: {
        name: "1",
        priority: "1",
        sheetMax: "",
        sheetMin: "",
        goodsMax: "",
        goodsMin: "",
        goodsTypeMax: "",
        goodsTypeMin: "",
        formationRule: "M",
        status: "",
        timer: "1"
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        sheetMax: [
          { required: true, message: "请输入单据数量上限", trigger: "blur" }
        ],
        goodsMax: [
          { required: true, message: "请输入商品数量上限", trigger: "blur" }
        ],
        goodsTypeMax: [
          { required: true, message: "请输入商品品类上限", trigger: "blur" }
        ],
        priority: [
          { required: true, message: "请选择优先级", trigger: "blur" }
        ],
        sheetMin: [
          { required: true, message: "请输入单据数量下限", trigger: "blur" }
        ],
        goodsMin: [
          { required: true, message: "请输入商品数量下限", trigger: "blur" }
        ],
        goodsTypeMin: [
          { required: true, message: "请输入商品品类下限", trigger: "blur" }
        ],
        formationRule: [
          { required: true, message: "请选择组波生成规则", trigger: "blur" }
        ],
        timer: [
          { required: true, message: "请选择定时器规则", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    back() {
      this.$router.push({
        name: "setOfWaveList"
      });
    },
    getDetail() {
    this.$axios({
        url: window.apiWare + "formation/detail",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({token: sessionStorage.getItem("token")})
      })
        .then(res => {
          if (res.data.code === "0000") {
            this.ruleForm = res.data.data;
            this.ruleForm.name = "1";
            this.ruleForm.timer = "1";
            this.ruleForm.priority = "1";
          }else if (res.data.code === "6666") {
            this.$message({
              showClose: true,
              message: "token异常，请重新登录",
              type: "error"
            });
            const timer = setTimeout(() => {
              clearTimeout(timer);
              this.$router.push({ name: "login" });
            }, 3000);
          }
        });
    },
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios({
            url: window.apiWare + "formation/update",
            method: "POST",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            data: qs.stringify({
              token:sessionStorage.getItem('token'),
              name:this.ruleForm.name,
              priority:this.ruleForm.priority,
              sheetMax:this.ruleForm.sheetMax,
              sheetMin:this.ruleForm.sheetMin,
              goodsMax:this.ruleForm.goodsMax,
              goodsMin:this.ruleForm.goodsMin,
              goodsTypeMax:this.ruleForm.goodsTypeMax,
              goodsTypeMin:this.ruleForm.goodsTypeMin,
              formationRule:this.ruleForm.formationRule,
              status:this.ruleForm.status,
              timer:this.ruleForm.timer
            })
          }).then(res =>{
            if (res.data.code === "0000") {
              this.$router.push({
                name: "setOfWaveList"
              });
            }else return this.$message.error(res.data.msg)
          })
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
#setOfWaveEdit .nav {
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
#setOfWaveEdit .content1 {
  background-color: #fff;
  padding: 15px 25px;
}
#setOfWaveEdit .content1 .left .input1 {
  width: 60%;
}
#setOfWaveEdit .content1 .right .input1 {
  width: 60%;
}
#setOfWaveEdit .content1 .forbid {
  width: 80px;
  height: 30px;
  background-color: #dcf9fc;
  line-height: 30px;
  display: inline-block;
  border: 1px solid #ddd;
  text-align: center;
}
h3 {
  padding: 20px 0 20px 0px;
}
</style>
