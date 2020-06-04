<template>
    <div class="CouPage">
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
            <el-breadcrumb-item :to="{ path: '/operatIndex' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item >优惠券管理</el-breadcrumb-item>
            <el-breadcrumb-item >推送</el-breadcrumb-item>
        </el-breadcrumb> -->
        <div class="CoupageBox">
            <div class="Cdetail">
                <h3 class="store_tit">推送优惠券</h3>
                <div class="CInfo">
                    <p>活动名称{{pageList.name}}</p>
                    <p>生效日期{{pageList.takeEffectTime | converTime('YYYY-MM-DD')}}</p>
                    <p>失效日期{{pageList.loseEffectTime | converTime('YYYY-MM-DD')}}</p>
                    <el-form :model="form" ref="form" label-width="100px" class="demo-ruleForm demoWid">
                        <el-form-item label="手机号推送" prop="phone"
                        :rules="[{ required: true, message: '号码不能为空',trigger: 'blur'}
                        ]">
                        <el-input type="textarea" v-model="form.phone" placeholder="填写多个手机号，请用逗号（,）隔开"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="AllquedingBtn" @click="isSureTui">确定</el-button>
                            <el-button class="theBtn resetButton" @click="back">返回</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="konge"></div>
            </div>
        </div>
    </div>
</template>
<script>
import qs from 'qs'
export default {
    name:'CouPage',
    data(){
        return{
            pageList:{},
            form:{phone:''}
        }
    },
    created(){
        this.getRowDetai();
    },
    methods:{
        isSureTui(){
            this.$confirm('确定给当前手机号推送优惠券？?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
             this.getPushphone();
            })
            
        },
        getPushphone(){
            this.$axios({
                url:window.apiUrl+'coupon/push',
                method:'POST',
                headers:{'content-type': 'application/x-www-form-urlencoded'},
                data:qs.stringify({
                    token:sessionStorage.getItem('token'),
                    packageId:sessionStorage.getItem('packageId'),
                    phones:this.form.phone
                })
                }).then(res=>{
                    if(res.data.code == '0000'){
                        this.form.phone = ''
                        this.$router.push({name:'CouponMana'})
                    }else if(res.data.code == '1000'){
                        this.$notify.error({
                        title:'该活动已失效',
                        position: 'bottom-right',
                        offset: 100
                        });
                    }else if(res.data.code =='3010'){
                        this.$notify.error({
                        title:'手机号错误，请重新填写',
                        position: 'bottom-right',
                        offset: 100
                        });
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
        getRowDetai(){
            this.$axios({
                url:window.apiUrl+'coupon/detail',
                method:'POST',
                headers:{'content-type': 'application/x-www-form-urlencoded'},
                data:qs.stringify({
                    token:sessionStorage.getItem('token'),
                    packageId:sessionStorage.getItem('packageId')
                })
                }).then(res=>{
                    if(res.data.code == '0000'){
                        this.pageList = res.data.data.couponPackage
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
                    this.$message.error(res.data.msg);
                }               
            })
        },
        back(){
            this.$router.go(-1)
        }
    }
}
</script>
<style scoped>
.CouPage{
    background-color: #fff;
    min-height: 647px;
    height: 100%;
    min-width: 1200px;
    font-size: 12px;
}
.CoupageBox{
    margin: 0px auto;
    border-radius: 10px;
    min-height: 170px;
}
.CoupageBox h3{
    margin-bottom: 0;
    padding-bottom: 0;
}
.Cdetail{
    width: 100%;
    margin: 0 20px;
}
.Cdetail p{
    display: inline-block;
    margin-right: 4.5%;
}
.CInfo{
    margin-top: 10px;
}
.demoWid{
    width: 57%;
    margin-top: 2%;
}
</style>


