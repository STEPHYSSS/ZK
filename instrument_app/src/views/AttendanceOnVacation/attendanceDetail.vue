<template>
  <div class="attendanceDetail">
    <div class="box">
      <NavBar>
        <van-icon name="arrow-left" slot="left" @click="onClickLeft" />
        <div slot="title" class="van-nav-bar__title van-ellipsis">出勤休假</div>
      </NavBar>
      <div class="List">
        <van-cell-group>
          <van-cell title="出勤类型">{{detailList.type | statusTip2}}</van-cell>
        </van-cell-group>
        <van-cell-group>
          <van-cell title="开始时间">{{detailList.startTime | fmtDate}}</van-cell>
          <van-cell title="结束时间">{{detailList.endTime | fmtDate}}</van-cell>
        </van-cell-group>
        <van-cell-group style="height:auto">
          <van-field
            :disabled ="true"
            autosize
            v-model="detailList.remark"
            label="描述备注"
            type="textarea"
          />
        </van-cell-group>
        <van-cell-group>
          <van-cell id="showTitle" style="display:flex">
            <span>附件</span>
            <!-- <van-uploader multiple :max-count="5" :max-size="2 * 1024 * 1024" @oversize="onOversize"/> -->
            <div style="flex:2">
              <li v-for="(item,index) in fileList" :key="index">
                <van-image width="100" height="100" :src="`${reqApi.yiBSchool}`+item" @click="showImg(item,index)"/>
              </li>
            </div>
          </van-cell>
        </van-cell-group>
        <div>
          <van-cell-group>
            <van-cell title="提交人">{{detailList.personnelName}}</van-cell>
            <van-cell title="提交时间">{{detailList.createTime|fmtDate}}</van-cell>
            <van-cell title="状态">{{detailList.status | statusTip}}</van-cell>
          </van-cell-group>
           <van-cell-group v-if="detailList.status !='W'">
              <van-cell title="审核人" v-if="detailList.checkPersonnelName === null">admin</van-cell>
              <van-cell title="审核人" v-else>{{detailList.checkPersonnelName}}</van-cell>
              <van-cell title="审核时间">{{detailList.checkTime|fmtDate}}</van-cell>
            </van-cell-group>
        </div>
        <!-- 意见 根据状态判断是否显示 -->
        <div v-if="detailList.opinion != null">
          <van-cell-group>
            <van-field
            autosize
            :disabled ="true"
            v-model="detailList.opinion"
            label="意见"
            type="textarea"
          />
          </van-cell-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ImagePreview } from 'vant';
import qs from "qs";
import NavBar from "@/components/NavBar.vue";//顶部导航
export default {
  name: 'attendanceDetail',
  data () {
    return {
      detailList:{},
      fileList:[],
      token:sessionStorage.getItem("token"),
      fileList2:[],//图片预览
    }
  },
  components: {
    NavBar
  },
  created() {
    this.getLeaveDetail();
  },
  methods: {
    getLeaveDetail() {
      this.$axios.post(
        this.reqApi.yiBSchool + `/mobile/leave/detail`,
        qs.stringify({
          token:this.token,
          code:this.$route.query.code
        })
      ).then(res=>{
        if (res.data.code === "0000") {
          const {code,msg,data} = res.data;
          this.detailList = data;
          this.fileList = JSON.parse(this.detailList.image);
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
    // 图片预览
    showImg(images,index) {
      this.fileList.forEach(element => {
        let imgURl = this.reqApi.yiBSchool +element;
        this.fileList2.push(imgURl)
        return
      });
      ImagePreview({
        images: this.fileList2,
        startPosition:index,
        closeable: true,
      })
      this.fileList2 = []
    },
    showPopup() {
      this.show = true;
    },
    onClickLeft() {
      this.$router.go(-1);
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
</style>
