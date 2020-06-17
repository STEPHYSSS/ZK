<template>
    <div class="storehouseAdd minWidth1600">
        <div class="storehousebox">
          <div class="storehouse_box">
            <div class="block">
              <h3 class="demonstration">库区新增</h3>
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
                <div class="aaa">
                    <el-form-item label="库区名称：" prop="name">
                        <p class="sotlname"><el-input type="text" v-model="ruleForm.name" maxlength="50" placeholder="请输入"></el-input></p>
                    </el-form-item>
                </div>
                <div class="aaa">
                    <el-form-item label="所属仓库：" prop="warehouseCode">
                        <p class="sotlname">
                            <el-select placeholder="请选择" v-model="ruleForm.warehouseCode">
                                <el-option v-for="item in options" :key="item.code" :label="item.name" :value="item.code"></el-option>
                            </el-select>
                        </p>
                    </el-form-item>
                </div>
                <div class="aaa">
                    <el-form-item label="货架数量：" prop="shelvesCount">
                        <p class="sotlname"><el-input type="text" placeholder="请输入" v-model="ruleForm.shelvesCount"></el-input></p>
                    </el-form-item>
                </div>
                <div class="aaa">
                    <el-form-item label="货层数量：">
                        <p class="sotlname"><el-input type="text" placeholder="请输入" readonly="readonly" v-model="ruleForm.num"></el-input></p>
                    </el-form-item>
                </div>
                <div class="aaa">
                    <el-form-item label="每层货位数量:">
                        <p class="sotlname">
                            <el-input type="text" placeholder="请输入" readonly="readonly" v-model="ruleForm.num"></el-input>
                        </p>
                    </el-form-item>
                </div>
                <div class="aaa">
                    <el-form-item label="单个货位容积:" prop="locationVolume">
                        <p class="sotlname">
                            <el-input type="text" placeholder="请输入" v-model="ruleForm.locationVolume"></el-input>
                        </p>
                    </el-form-item>
                </div>
                <div class="aaa">
                    <el-form-item>
                        <el-button class="theBtn themeColor textMright" @click="submitForm('ruleForm')">确定</el-button>
                        <el-button class="theBtn resetButton" @click="resetForm('ruleForm')">返回</el-button>
                    </el-form-item>
                </div>
              </el-form>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
import qs from 'qs'
 export default {
    name:'storehouseAdd',
    data() {
      return {
        ruleForm: {
            name:'',
            warehouseCode:'',
            shelvesCount:'',
            locationVolume:'',
            num:'1'
        },
        options:[],
        rules: {
          name: [
            { required: true, message: '请输入仓库名称', trigger: 'blur' }
          ],
          warehouseCode: [
            { required: true, message: '请选择所属仓库', trigger: 'blur' }
          ],
          shelvesCount: [
            { required: true, message: '请输入货架数量', trigger: 'blur' }
          ],
          locationVolume: [
            { required: true, message: '请输入单个货位容积', trigger: 'blur' }
          ]
        },
      };
    },
    created(){
        this.showother();
    },
    methods:{
        // 所属仓库下拉选
        showother(){
            this.$axios({
            url:'public/warehouse/list',
            method:'POST',
            headers:{'content-type': 'application/x-www-form-urlencoded'},
            data:qs.stringify({
                token:sessionStorage.getItem('token')
            })
            }).then(res=>{
                if(res.data.code === "0000"){
                    this.options=res.data.data.list
                }
            })
        },
        // 提交
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios({
                url:window.apiWare+'region/add',
                method:'POST',
                headers:{'content-type': 'application/x-www-form-urlencoded'},
                data:qs.stringify({
                    token:sessionStorage.getItem('token'),
                    name: this.ruleForm.name,
                    warehouseCode:this.ruleForm.warehouseCode,
                    shelvesCount:this.ruleForm.shelvesCount,
                    locationVolume:this.ruleForm.locationVolume
                })
                }).then(res=>{
                    if(res.data.code == "0000"){
                        this.$message({
                            type:'success',
                            message:'新增成功'
                        })
                        this.$router.push({name: 'areaSetting'})
                    }else if(res.data.code=="6666"){
                        this.$message({
                        showClose: true,
                        message: 'token异常，请重新登录',
                        type: 'error'
                        });
                        const timer = setTimeout(() => {
                        clearTimeout(timer)
                        this.$router.push({name: "login"})}, 3000)
                    }else{
                        this.$message.error(res.data.msg)
                    }
                })
            }
        });
      },
      resetForm(formName) {
        this.$router.push({name: 'areaSetting'})
      }
    },
  };
</script>
<style scoped>
.storehouseAdd{
  /* background-color: #f1f6fa; */
  /* min-height: 647px;
  min-width: 1200px; */
}
.storehousebox{
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
}
.storehouseAdd .storehouse_box{
  margin-left: 30px;
  margin-right: 30px;
  padding-bottom: 30px;
}
.storehouseAdd .nav{
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
.storehouseAdd .demonstration{
  padding-top:20px;
  padding-bottom: 20px; 
}
.spacelet{
  letter-spacing: 6px;
}

.aaa p{
  width: 300px;
}
.cit,.aaa p{
  display: inline-block;
}
.aaa .cit{
  width: 95px;
  margin-right: 8px;
}
.aaa .cit p{
    width: 100%;
}
.aaa{
    margin-bottom: 30px;
}
.aaa .el-range-editor.el-input__inner {
  width: 100%;
}

</style>


