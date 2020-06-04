<template>
    <div id="integral">
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
            <el-breadcrumb-item :to="{ path: '/operatIndex' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item >会员中心</el-breadcrumb-item>
            <el-breadcrumb-item >积分政策</el-breadcrumb-item>
        </el-breadcrumb> -->
         <div class="policy">
            <h3 class="ship">积分政策</h3>
            <div class="shipTime">
                <span v-if="form.updateTime!=null">更新时间：{{form.updateTime | converTime('YYYY-MM-DD')}}</span>
                <span style="display:inline-block;margin-left:15px">更新人：{{upName}}</span>
            </div>
            <div class="policyBox">
                <div class="intergPadd">
                    1.每支付<p class="word"><el-input v-model="form.pay" placeholder="请输入"></el-input></p>元，
                    送<p class="word"><el-input v-model="form.give" placeholder="请输入"></el-input></p>个积分，
                    最低消费门槛<p class="word"><el-input v-model="form.minConsume" placeholder="请输入"></el-input></p>元，
                    每笔交易最多送<p class="word"><el-input v-model="form.maxGive" placeholder="请输入"></el-input></p>积分
                </div>
                <div class="intergPadd">2.注册成功送<p class="word"><el-input v-model="form.registerGive" placeholder="请输入"></el-input></p>积分</div>
                <div class="intergPadd">3.积分抵扣使用最低门槛为<p class="word"><el-input v-model="form.minDeduct" placeholder="请输入"></el-input></p>积分，
                     单笔消费最多可以使用<p class="word"><el-input v-model="form.maxUse" placeholder="请输入"></el-input></p>积分
                </div>
                <div class="intergPadd">4.会员日积分按<p class="word"><el-input v-model="form.memberDayMultiple" placeholder="请输入"></el-input></p>倍积分</div>
                <div class="intergPadd">5.会员日设置
                    <el-radio-group v-model="form.memberDayConfig">
                        <el-radio label="W" @change="anweek">按周指定
                            <p class="zhidingday month"><el-input v-model="form.week" placeholder="请输入" ></el-input></p>
                        </el-radio>
                        <el-radio label="M" @change="anmonth">按月指定
                            <p class="zhidingday"><el-input v-model="form.month" placeholder="请输入"></el-input></p>
                        </el-radio>
                        <el-radio label="D" @change="anday">指定日期
                            <p class="zhidingday">
                                <el-date-picker v-model="form.startTime" type="date" @input="Panchange($event, index, 'startTime')" placeholder="开始日期"></el-date-picker>
                            </p>
                            <span class="zhi">至</span>
                            <p class="zhidingday">
                                <el-date-picker v-model="form.endTime" type="date" @input="Panchange($event, index, 'endTime')" placeholder="结束日期"></el-date-picker>
                            </p>
                        </el-radio>
                    </el-radio-group>
                </div>
                <div class="intergPadd">6.积分获得乘以倍数之后最终会进行四舍五入处理，最小积分单位为1，积分使用永久有效</div>
                <div class="intergPadd">
                    <el-button type="primary" @click="issure" class="AllquedingBtn">确定</el-button>
                    <el-button @click="chongzhi" class="theBtn resetButton">重置</el-button>
                </div>
            </div>
        </div>
        <!-- <div class="policy" v-show="showList" v-for="(item,index) in policyInfo" :key="index">
            <h3 class="ship">积分政策</h3>
            <div class="shipTime">
                <span v-if="item.updateTime!=null">更新时间：{{item.updateTime | converTime('YYYY-MM-DD')}}</span>
                <span style="display:inline-block;margin-left:15px">更新人：{{upName}}</span>
            </div>
            <div class="policyBox">
                <div class="intergPadd">
                    1.每支付<p class="word"><el-input v-model="item.pay" placeholder="请输入"></el-input></p>元，
                    送<p class="word"><el-input v-model="item.give" placeholder="请输入"></el-input></p>个积分，
                    最低消费门槛<p class="word"><el-input v-model="item.minConsume" placeholder="请输入"></el-input></p>元，
                    每笔交易最多送<p class="word"><el-input v-model="item.maxGive" placeholder="请输入"></el-input></p>积分
                </div>
                <div class="intergPadd">2.注册成功送<p class="word"><el-input v-model="item.registerGive" placeholder="请输入"></el-input></p>积分</div>
                <div class="intergPadd">3.积分抵扣使用最低门槛为<p class="word"><el-input v-model="item.minDeduct" placeholder="请输入"></el-input></p>积分，
                     单笔消费最多可以使用<p class="word"><el-input v-model="item.maxUse" placeholder="请输入"></el-input></p>积分
                </div>
                <div class="intergPadd">4.会员日积分按<p class="word"><el-input v-model="item.memberDayMultiple" placeholder="请输入"></el-input></p>倍积分</div>
                <div class="intergPadd">5.会员日设置
                    <el-radio-group v-model="item.memberDayConfig">
                        <el-radio label="W" @change="anweek">按周指定
                            <p class="zhidingday month"><el-input v-model="item.week" placeholder="请输入" ></el-input></p>
                        </el-radio>
                        <el-radio label="M" @change="anmonth">按月指定
                            <p class="zhidingday"><el-input v-model="item.month" placeholder="请输入"></el-input></p>
                        </el-radio>
                        <el-radio label="D" @change="anday">指定日期
                            <p class="zhidingday">
                                <el-date-picker v-model="item.startTime" type="date" @input="Panchange($event, index, 'startTime')" placeholder="开始日期"></el-date-picker>
                            </p>
                            <span class="zhi">至</span>
                            <p class="zhidingday">
                                <el-date-picker v-model="item.endTime" type="date" @input="Panchange($event, index, 'endTime')" placeholder="结束日期"></el-date-picker>
                            </p>
                        </el-radio>
                    </el-radio-group>
                </div>
                <div class="intergPadd">6.积分获得乘以倍数之后最终会进行四舍五入处理，最小积分单位为1，积分使用永久有效</div>
                <div class="intergPadd">
                    <el-button type="primary" @click="issure" class="AllquedingBtn">确定</el-button>
                    <el-button @click="chongzhi" class="theBtn resetButton">重置</el-button>
                </div>
            </div>
        </div> -->
    </div>
</template>
<script>
import qs from 'qs'
export default {
    name:'integral',
    data(){
        return{
            form: {
                token:sessionStorage.getItem('token'),
                id:'',
                pay:'',// 每支付x元
                give:'',//送x积分
                minConsume:'',//最低消费门槛x元,
                maxGive:'',//每笔交易最多赠送x积分
                registerGive:'',//注册成功送x积分
                minDeduct:'',//最低使用门槛为x积分
                maxUse:'',//每笔交易最多可以使用x积分
                memberDayMultiple:'',//会员日按x倍积分
                memberDayConfig:'',//会员日设置（W按周指定，M按月指定，D指定日期）
                week:'',//周
                month:'',//月
                startTime:'',//开始日期
                endTime:'',//结束日期
            },
            upName:'',//更新人
            updateTime:'',// 更新时间
            changeTime:'',//时间
            changeTime2:'',
            policyInfo:[],//
        }
    },
    created(){
        this.getintegral();
    },
    methods:{
        getintegral(){
            this.$axios({
                url:window.apiUrl+'member/score',
                method:'POST',
                headers:{'content-type': 'application/x-www-form-urlencoded'},
                data:qs.stringify({
                    token:sessionStorage.getItem('token')
                })
                }).then(res=>{
                    if(res.data.code=='0000'){
                        let listArr = res.data.data.list;
                        // this.form = res.data.data.list;
                        listArr.forEach((item,index) => {
                            console.item
                            this.form = item
                        });
                        this.upName = res.data.data.username;
                        
                    }else if(res.data.code=="6666"){
                        this.$message({
                        showClose: true,
                        message: 'token异常，请重新登录',
                        type: 'error'
                });
                // const timer = setTimeout(() => {
                //     clearTimeout(timer)
                //     this.$router.push({name: "login"})}, 3000)
                }else{
                    this.$message.error(res.data.msg);
                }
            })
        },
        // radio选中后清空其他数据
        anweek(){
            this.policyInfo[0].month = '';
            this.policyInfo[0].startTime = '';
            this.policyInfo[0].endTime = ''
        },
        anmonth(){
            this.policyInfo[0].week = '';
            this.policyInfo[0].startTime = '';
            this.policyInfo[0].endTime = ''
        },
        anday(){
            this.policyInfo[0].month = '';
            this.policyInfo[0].week = '';
        },
        // 选择时间
        Panchange (e, index, name) {
            this.policyInfo[index][name] = this.$moment(e).format('YYYY-MM-DD');
        },
        // aaaaaa () {
        //     let obj = this.policyInfo[0]
        //     Object.keys(obj).forEach(item => {
        //         if (this.form[item] != undefined || this.form[item]) return this.form[item] = obj[item]
        //     })
        // },
        // 提交
        issure(){
            // this.aaaaaa()
            this.$axios({
                url:window.apiUrl+'member/editScore',
                method:'POST',
                headers:{'content-type': 'application/x-www-form-urlencoded'},
                data:qs.stringify(this.form)
                }).then(res=>{
                    if(res.data.code=='0000'){
                        this.$message({
                            message: '保存成功',
                            type: 'success'
                        })
                        this.getintegral();
                    }else if(res.data.code=="6666"){
                        this.$message({
                        showClose: true,
                        message: 'token异常，请重新登录',
                        type: 'error'
                    });
                    // const timer = setTimeout(() => {
                    //     clearTimeout(timer)
                    //     this.$router.push({name: "login"})}, 3000)
                    }else{
                        this.$message.error(res.data.msg);
                    }
            })
        },
        chongzhi(){
            this.form.pay='',// 每支付x元
            this.form.give='',//送x积分
            this.form.minConsume='',//最低消费门槛x元,
            this.form.maxGive='',//每笔交易最多赠送x积分
            this.form.registerGive='',//注册成功送x积分
            this.form.minDeduct='',//最低使用门槛为x积分
            this.form.maxUse='',//每笔交易最多可以使用x积分
            this.form.memberDayMultiple='',//会员日按x倍积分
            this.form.memberDayConfig='',//会员日设置（W按周指定，M按月指定，D指定日期）
            this.form.week='',//周
            this.form.month='',//月
            this.form.startTime='',//开始日期
            this.form.endTime=''//结束日期
        }
        
        //     // let obj = this.policyInfo[0]
        //     // Object.keys(obj).forEach(item => {
        //     //     return obj[item] = ''
        //     // })        
    }
}
</script>
<style scoped>
#integral{
    background-color: #fff;
    min-height: 647px;
    height: 100%;
    min-width: 1700px;
    box-shadow: 0 2px 10px #ccc;
}
.policy{
    width: 100%;
    margin: 0 auto;
    background: #fff;
    height: 100%;
}
.ship,.shipTime{
    display: inline-block;
}
.ship{
    margin-bottom: 0px;
    padding-bottom: 0px;
    height: 40px;
    line-height: 40px;
    margin-left: 20px;
    font-size: 14px;
    font-weight: 900;
}
.shipTime{
    text-align: right;
    float: right;
    padding-right: 30px;
    height: 40px;
    line-height: 40px;
}
.policyBox{
    min-height: 400px;
    font-size: 16px;
    clear: both;
    width: 96%;
    margin: 0 auto;
}
.policyBox .intergPadd{
    padding:10px;
}
.word{
    display: inline-block;
    width: 60px;
    margin: 0 5px;
}
.month{
    width:280px;
    margin-bottom: 10px;
}
.zhidingday{
    width: 160px;
}
.zhidingday,.zhi{
    display: inline-block
}
.zhi{
    margin: 0 50px;
}
</style>

