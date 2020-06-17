<template>
  <div class="AttendanceOnVacation">
    <div class="box">
      <NavBar>
        <!-- <span slot="left" class="van-nav-bar__text"  @click="onClickLeft">返回</span> -->
        <van-icon name="arrow-left" slot="left" @click="onClickLeft" />
        <div slot="title" class="van-nav-bar__title van-ellipsis">出勤休假</div>
        <van-icon name="plus" slot="right" @click="onClickAdd" />
      </NavBar>
      <div class="List">
        <div class="new-tabs">
          <span @click="activeTab" :class="active === 1 ? 'active' : ''" class="new-tabs-child cur-point dis-inline-block"
          >我的申请</span>
          <span @click="activeTab1" :class="active === 2 ? 'active' : ''" class="new-tabs-child cur-point dis-inline-block" v-if="manager==1"
          >我的审批</span>
        </div>
        <div v-show="personHide">
          <div class="fontSty" v-if="list.length == 0">暂无数据</div>
          <van-cell v-else>
            <van-row type="flex" justify="space-between" v-for="(item,index) in list" :key="index" @click="toDetail(item.code,item.status)">
              <van-col span="6" class="spLeft">{{item.type | statusTip2}}</van-col>
              <van-col span="6" class="only">{{item.createTime | conTime('YYYY-MM-DD')}}</van-col>
              <van-swipe-cell style="width:82px;" class="only2">
                <van-cell :border="false" :title="item.status | statusTip" :class="{ active2: (item.status=='S'|| item.status =='F')}"/>
                <template #right>
                  <van-button square type="danger" text="删除"  @click="dele(item.code)" v-if="item.status=='W'"/>
                </template>
              </van-swipe-cell>
            </van-row>
          </van-cell>
        </div>
        <!-- 上级 -->
        <div v-show="Managerhide">
          <div class="fontSty" v-if="managerList.length == 0">暂无数据</div>
          <van-cell v-else>
            <van-row type="flex" justify="space-between" v-for="(item,index) in managerList" :key="index">
              <van-col span="8" class="spLeft">{{item.type | statusTip2}}</van-col>
              <van-col span="8" class="only">{{item.createTime | conTime('YYYY-MM-DD')}}</van-col>
              <van-col span="8" class="only2" :class="{ active2: (item.status=='S'|| item.status =='F')}" @click="toDetail2(item.code,item.status)">{{item.status | statusTip}} <span><van-icon name="arrow" /></span></van-col>
            </van-row>
          </van-cell>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import NavBar from "@/components/NavBar.vue";//顶部导航
export default {
  name: 'AttendanceOnVacation',
  data () {
    return {
      list:[],
      managerList:[],
      token:sessionStorage.getItem("token"),
      manager: sessionStorage.getItem("manager"),
      active: 1,
      flag:1,
      Managerhide:false,
      personHide:true
    }
  },
  components: {
    NavBar
  },
  created() {
    this.getList();
    if(this.manager === 1){
      this.getManagerList();
    }

  },
  methods: {
    // 根据状态调用
    activeTab() {
      this.active = 1;
      this.Managerhide = false;
      this.personHide = true
      sessionStorage.setItem('active',this.active)
      this.getList()
    },
    activeTab1() {
      this.Managerhide = true;
      this.personHide = false
      this.active = 2;
      this.flag=2
      sessionStorage.setItem('active',this.active)
      this.getManagerList();
    },
    getList() {
      this.$axios.post(
        this.reqApi.yiBSchool + `/mobile/leave/list`,
        qs.stringify({token:this.token})
      ).then(res=>{
        if (res.data.code === "0000") {
          const {code,msg,data} = res.data;
          this.list = data;
        }else if (res.data.code === "6666") {
          this.$toast("token异常，请重新登录");
          const timer = setTimeout(() => {
              clearTimeout(timer);
              this.$router.push({
                name: "login"
              });
          }, 3000);
        }else return this.$toast(res.data.msg)
      })
    },
    // 上级列表接口
    getManagerList() {
      this.$axios.post(
        this.reqApi.yiBSchool + `/mobile/leave/listForManager`,
        qs.stringify({token:this.token})
      ).then(res=>{
        if (res.data.code === "0000") {
          const {code,msg,data} = res.data;
          this.managerList = data;
        }else if (res.data.code === "6666") {
          this.$toast("token异常，请重新登录");
          const timer = setTimeout(() => {
              clearTimeout(timer);
              this.$router.push({
                name: "login"
              });
          }, 3000);
        }else return this.$toast(res.data.msg)
      })
    },
    // 一般人员新建之后待审核只能查看详情
    toDetail(code,status) { this.$router.push({ name:"attendanceDetail", query:{code:code}}) },
    toDetail2(code,status){
      if(status == 'W') {
        this.$router.push({ name:"reviewOperation", query:{code:code}})
      }else{
        this.$router.push({ name:"attendanceDetail", query:{code:code}})
      }
    },
    // 删除 自己新建的待审核才能删除
    dele(code){
       this.$axios.post(
        this.reqApi.yiBSchool + `/mobile/leave/delete`,
        qs.stringify({token:this.token,code:code})
      ).then(res=>{
        if (res.data.code === "0000") {
          this.$toast('删除成功');
          this.getList();
        }else if (res.data.code === "6666") {
          this.$toast("token异常，请重新登录");
          const timer = setTimeout(() => {
              clearTimeout(timer);
              this.$router.push({
                name: "login"
              });
          }, 3000);
        }else return this.$toast(res.data.msg)
      })
    },
    onClickAdd() {
      this.$router.push({ name:"addAttendance" })
    },
    onClickLeft() {
      // this.$router.go(-1);
      this.$router.push({ name:"home" })
    }
  },
  filters: {
    statusTip(value) {
      if (value == "S") {
        return "通过";
      } else if (value == "F") {
        return "不通过";
      }else if(value == "W"){
        return "待审核";
      }
    },
    statusTip2(value){
      if(value == "C"){
        return "事假";
      }else if(value == "S"){
        return "病假";
      }else if(value == "G"){
        return "外出";
      }
    }
  }
}
</script>
<style scoped>
@import "../../style/zhu.css";
.active2{
  color: #10c157ff;
}

</style>
