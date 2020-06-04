<template>
  <div class="reviewOperation">
    <div class="box">
      <NavBar>
        <van-icon name="arrow-left" slot="left" @click="onClickLeft" />
        <div slot="title" class="van-nav-bar__title van-ellipsis">出勤休假</div>
        <div slot="right" @click="onClickAdd" >
          <img src="@/assets/images/tijiao_icon@2x.png" alt class="imgIcon" />
          <span class="submit">提交</span>
        </div>
      </NavBar>
      <div class="List">
        <van-cell-group>
          <van-cell title="出勤类型">{{detailList.type | statusTip2}}</van-cell>
        </van-cell-group>
        <van-cell-group>
          <van-cell title="开始时间">{{detailList.startTime | conTime('yyyy-MM-DD')}}</van-cell>
          <van-cell title="结束时间">{{detailList.endTime | conTime('yyyy-MM-DD')}}</van-cell>
        </van-cell-group>
        <van-cell-group>
          <van-field
            autosize
            v-model="detailList.remark"
            label="描述备注"
            type="textarea"
          />
        </van-cell-group>
        <van-cell-group>
          <van-cell id="showTitle" style="display:flex">
            <span>附件</span>
            <div style="flex:2">
              <li v-for="(item,index) in fileList" :key="index">
               <van-image width="100" height="100" :src="`${reqApi.yiBSchool}`+item" @click="showImg(item,index)"/>
              </li>
            </div>
            <!-- <van-uploader v-model="fileList" multiple :max-count="5" :max-size="2 * 1024 * 1024" @oversize="onOversize"/> -->
          </van-cell>
        </van-cell-group>
        <!-- 以下部分是需要提交的 -->
        <div>
          <van-cell-group>
            <van-cell title="提交人">{{detailList.personnelName}}</van-cell>
            <van-cell title="提交时间">{{detailList.createTime|conTime('yyyy-MM-DD')}}</van-cell>
          </van-cell-group>
          <van-cell-group>
            <van-field name="radio" label="状态">
              <template #input>
                <van-radio-group v-model="isPass" direction="horizontal">
                  <van-radio name="1" checked-color="#07c160">通过</van-radio>
                  <van-radio name="2" checked-color="#07c160">不通过</van-radio>
                </van-radio-group>
              </template>
            </van-field>
          </van-cell-group>
        </div>
        <div>
          <van-cell-group>
            <van-field
              v-model="opinions"
              autosize
              label="意见"
              type="textarea"
              maxlength="200"
              placeholder="请输入..."
              show-word-limit
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
  name: 'reviewOperation',
  data () {
    return {
      fileList: [],
      opinions:"",
      isPass:"1",
      detailList:{},
      fileList2:[],//图片预览
      token:sessionStorage.getItem("token")
    }
  },
  components: {
    NavBar
  },
  created() {
    this.getDetail();
  },
  methods: {
    // 获取详情
    getDetail() {
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
    // 提交审核意见
    onClickAdd() {
      if(this.opinions == null || this.opinions == "")return this.$toast("请填写意见！")
      this.$axios.post(
        this.reqApi.yiBSchool + `/mobile/leave/check`,
        qs.stringify({
          token:this.token,
          code:this.$route.query.code,
          opinion:this.opinions,
          isPass:this.isPass
        })
      ).then(res=>{
        if (res.data.code === "0000") {
          this.$router.push('attendanceOnVacation')
        }else if (res.data.code === "6666") {
          this.$toast("token异常，请重新登录");
          const timer = setTimeout(() => {
            clearTimeout(timer);
            this.$router.push({
              name: "login"
            });
          }, 3000);
        }else return this.$toast(res.data.code)
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
