<template>
  <div id="distributionEdit">
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
               <el-form-item label="库存周转规则:" prop="turnoverRule">
                <el-radio-group v-model="ruleForm.turnoverRule" class="input1">
                  <el-radio label="X">先进先出</el-radio>
                  <el-radio label="H">后进先出</el-radio>
                </el-radio-group>
              </el-form-item>
               <el-form-item label="库位数量规则:" prop="countRule">
                <el-select v-model="ruleForm.countRule" placeholder="请选择库位数量规则" class="input1">
                  <el-option label="最小拣货次数" value="Z"></el-option>
                  <el-option label="优先清零库位" value="Y"></el-option>
                </el-select>
              </el-form-item>
             <el-form-item label="优先级:" prop="priority">
                <el-select v-model="ruleForm.priority" placeholder="请选择活动区域" class="input1">
                  <el-option label="1" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="分配优先规则:" prop="distributionRule">
                <el-radio v-model="ruleForm.distributionRule" label="D">订单创建时间</el-radio>
                 <el-radio v-model="ruleForm.distributionRule" label="X">先直营后加盟</el-radio>
              </el-form-item>
              <el-form-item label="任务生成规则:" prop="createRule">
                <el-select v-model="ruleForm.createRule" placeholder="请选择任务生成规则" class="input1">
                    <el-option label="根据仓库商品属性" value="根据仓库商品属性"></el-option>
                  <el-option label="单品爆款" value="单品爆款"></el-option>
                  <el-option label="单品单件" value="单品单件"></el-option>
                  <el-option label="混合批次" value="混合批次"></el-option>
                  <el-option label="组合爆款" value="组合爆款"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <div class="btnBox">
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
        token: sessionStorage.getItem("token"),
        name: "1",
        priority: "1",
        countRule:'Z',
        turnoverRule: "X",
        status: "",
        distributionRule:'D',
        createRule:'根据仓库商品属性'
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        priority: [
          { required: true, message: "请选择优先级", trigger: "blur" }
        ],
        countRule: [
          { required: true, message: "请选择库位数量规则", trigger: "blur" }
        ],
        turnoverRule: [
          { required: true, message: "请选择库存周转规则", trigger: "blur" }
        ],
        distributionRule: [
          { required: true, message: "请选择分配优先规则", trigger: "blur" }
        ],
        createRule: [
          { required: true, message: "请选择任务生成规则", trigger: "blur" }
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
        name: "distributionList"
      });
    },
    getDetail() {
      this.$axios
        .post(
          "/warehouse/distribution/detail",
          qs.stringify({
            token: sessionStorage.getItem("token")
          })
        )
        .then(res => {
          if (res.data.code === "0000") {
            this.ruleForm = res.data.data;
            this.ruleForm.name = "1";
            this.ruleForm.priority = "1";
          }else if (res.data.code === "6666") {
            this.$message({
              showClose: true,
              message: "token异常，请重新登录",
              type: "error"
            });
          }else return this.$message.error(res.data.msg)
        });
    },
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("/warehouse/distribution/update", qs.stringify(this.ruleForm))
            .then(res => {
              if (res.data.code === "0000") {
                this.$router.push({
                  name: "distributionList"
                });
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
#distributionEdit .nav {
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
#distributionEdit .content1 {
  background-color: #fff;
  /* margin: 0px 10px; */
  padding: 15px 25px;
}
#distributionEdit .formBox {
  width: 100%;
}
#distributionEdit .content1 .left .input1 {
  width: 300px;
}
#distributionEdit .content1 .right .input1 {
  width: 300px;
}
#distributionEdit .content1 .forbid {
  width: 80px;
  height: 30px;
  background-color: #dcf9fc;
  line-height: 30px;
  display: inline-block;
  border: 1px solid #ddd;
  text-align: center;
}

#distributionEdit .submit {
  background-color: #01c8dc;
  color: #fff;
}
#distributionEdit .btnBox{
    margin-left: 150px
}
</style>
