<template>
    <div class="storehouseAdd">
        <div class="storehousebox">
          <div class="storehouse_box">
            <div class="block">
              <h3 class="demonstration">仓库编辑</h3>
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <div class="aaa">
                    <el-form-item label="仓库名称：" prop="name">
                        <p class="sotlname"><el-input type="text" v-model="ruleForm.name" placeholder="请输入名称"></el-input></p>
                    </el-form-item>
                </div>
                <div class="aaa">
                    <el-form-item label="仓库属性：" prop="attribute">
                        <p class="sotlname">
                            <el-select placeholder="请选择属性" v-model="ruleForm.attribute">
                                <el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.value"></el-option>
                            </el-select>
                        </p>
                    </el-form-item>
                </div>
                <div class="aaa">
                    <el-form-item label="所在区域：">
                        <p class="cit">
                            <el-select v-model="ruleForm.province" placeholder="请选择" @change="chooseProvince">
                                <el-option v-for="(item,index) in province" :key='index' :label="item.name" :value="item.name"></el-option>
                            </el-select>
                        </p>
                        <p class="cit cit2">
                            <el-select v-model="ruleForm.city" placeholder="请选择" @change="chooseCity">
                                <el-option v-for="(item,index) in city" :key="index" :label="item.name" :value="item.name"></el-option>
                            </el-select>
                        </p>
                        <p class="cit">
                            <el-select v-model="ruleForm.area" placeholder="请选择" @change="chooseArea">
                                <el-option v-for="(item,index) in area" :key="index" :label="item.name" :value="item.name"></el-option>
                            </el-select>
                        </p>
                    </el-form-item>
                </div>
                <div class="aaa">
                    <el-form-item label="详细地址：">
                        <p class="sotlname"><el-input type="text" placeholder="请输入地址" v-model="ruleForm.address"></el-input></p>
                    </el-form-item>
                </div>
                <div class="aaa">
                    <el-form-item label="负责人：">
                        <p class="sotlname"><el-input type="text" placeholder="请输入" v-model="ruleForm.chargePerson"></el-input></p>
                    </el-form-item>
                </div>
                <div class="aaa">
                    <el-form-item label="电商仓库：" prop="onlineWarehouse">
                        <p class="sotlname">
                            <el-radio-group v-model="ruleForm.onlineWarehouse">
                            <el-radio label="Y">是</el-radio>
                            <el-radio label="N">否</el-radio>
                            </el-radio-group>
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
            name: '',
            province: '', // 省
            city: '', // 市
            area: '', // 区
            attribute:'',//温层
            address:'',
            chargePerson:'',//负责人
            onlineWarehouse:''
        },
        options:[],
        province:[],//下拉遍历省
        city:[],//下拉遍历市
        area:[],//下拉遍历区
        rules: {
          name: [
            { required: true, message: '请输入仓库名称', trigger: 'blur' }
          ],
          attribute: [
            { required: true, message: '请选择仓库属性', trigger: 'blur' }
          ],
          onlineWarehouse: [
            { required: true, message: '请选择电商仓库', trigger: 'blur' }
          ]
        },
      };
    },
    created(){
        this.enterCity();
        this.showother();
        this.getEditInfo();
    },
    methods:{
        // 城市接口
        enterCity(){
            this.$axios.post(`${window.apiUrl}city/list`).then(res=>{
                if(res.data.code=='0000'){
                this.province=res.data.data;
                }else{
                    this.$message.error(res.data.msg)
                }
            })
        },
        // 城市列表
        chooseProvince(value){
            let aaa = ''
            for (const key in this.province) {
            if (this.province[key].name == value) aaa = this.province[key].id
            }
            this.ruleForm.inCity='';
            this.ruleForm.inArea='';
            this.area=[];
            this.$axios({
            url:window.apiUrl+'city/list',
            method:'POST',
            headers:{'content-type': 'application/x-www-form-urlencoded'},
            data:qs.stringify({
                pid:aaa
            })
            }).then(res=>{
            if(res.data.code=='0000'){
            this.city=res.data.data
            }
            }).catch(err=>{
            console.log('数据异常',err)
            })
        },
        // 市下拉change事件
        chooseCity(value){
            let aaa = ''
            for (const key in this.city) {
            if (this.city[key].name == value)  
            aaa = this.city[key].id
            }
            this.ruleForm.inArea='';
            this.$axios({
                url:window.apiUrl+'city/list',
                method:'POST',
                headers:{'content-type': 'application/x-www-form-urlencoded'},
                data:qs.stringify({
                pid:aaa
                })
            }).then(res=>{
                if(res.data.code=='0000'){
                this.area=res.data.data
                }
            })
        },
        chooseArea(value){
            let aaa = ''
            for (const key in this.area) {
            if (this.area[key].id == value)  
            this.ruleForm.inArea = this.area[key].name
            }
        },
        // 温层下拉选
        showother(){
            let _this = this;
            let token = sessionStorage.getItem('token');
            let code = 'goods_temperature'
            _this.$axios({
            url:window.apiUrl+'dictionary/list',
            method:'POST',
            headers:{'content-type': 'application/x-www-form-urlencoded'},
            data:qs.stringify({
                token:token,
                code:code
            })
            }).then(res=>{
                if(res.data.code =="0000"){
                    this.options=res.data.data
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
        },
        // 获取编辑信息
        getEditInfo(){
            this.$axios({
                url:window.apiWare+'index/detail',
                method:'POST',
                headers:{'content-type': 'application/x-www-form-urlencoded'},
                data:qs.stringify({
                    token:sessionStorage.getItem('token'),
                    code:sessionStorage.getItem('editwareCode')
                })
            }).then(res=>{
                if(res.data.code="0000"){
                   this.ruleForm = res.data.data;
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
        },
        // 提交
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                this.$axios({
                    url:window.apiWare+'index/update',
                    method:'POST',
                    headers:{'content-type': 'application/x-www-form-urlencoded'},
                    data:qs.stringify({
                        token:sessionStorage.getItem('token'),
                        code:sessionStorage.getItem('editwareCode'),
                        name: this.ruleForm.name,
                        province: this.ruleForm.province, // 省
                        city: this.ruleForm.city, // 市
                        area: this.ruleForm.area, // 区
                        attribute:this.ruleForm.attribute,//温层
                        address:this.ruleForm.address,
                        chargePerson:this.ruleForm.chargePerson,//负责人
                        onlineWarehouse:this.ruleForm.onlineWarehouse
                    })
                }).then(res=>{
                    if(res.data.code == "0000"){
                        this.$message({
                            type:'success',
                            message:'修改成功'
                        })
                        this.$router.push({name: 'wsettings'})
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
            }else {
                return false;
            }
            });
        },
        resetForm(formName) {
            this.$router.push({name: 'wsettings'})
        }
    },
  };
</script>
<style scoped>
.storehouseAdd{
  /* background-color: #f1f6fa;
  min-height: 647px;
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
  font-size: 14px;
}
.spacelet{
  letter-spacing: 6px;
}
.aaa p {
  width: 300px;
}
.cit,.aaa p{
  display: inline-block;
}
.aaa .cit {
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


