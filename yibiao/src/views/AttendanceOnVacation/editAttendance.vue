<template>
  <div class="editAttendance">
    <div class="box">
      <NavBar>
        <van-icon name="arrow-left" slot="left" @click="onClickLeft" />
        <div slot="title" class="van-nav-bar__title van-ellipsis">编辑申请</div>
        <div slot="right" @click="onClickAdd" >
          <img src="@/assets/images/tijiao_icon@2x.png" alt class="imgIcon" />
          <span class="submit">提交</span>
        </div>
      </NavBar>
      <div class="List">
        <div class="oneBox">
          <van-cell id="showTitle">出勤类型</van-cell>
          <div class="chooseMsg">
            <van-dropdown-menu>
              <van-dropdown-item v-model="form.type" :options="option1" />
            </van-dropdown-menu>
          </div>
        </div>
        <van-cell-group id="chooseTime">
          <van-field v-model="form.starttime" clearable label="开始时间" placeholder="请选择开始时间" @focus="start" />
          <van-field v-model="form.endtime" clearable label="结束时间" placeholder="请选择结束时间" @focus="end" />
        </van-cell-group>
        <!-- 开始时间控件 -->
        <van-popup v-model="show" position="bottom">
          <van-datetime-picker
            v-model="currentDate"
            type="datetime"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="confirm"
            @cancel="cancel"
            :formatter="formatter"
          />
        </van-popup>
        <!-- 结束时间控件 -->
        <van-popup v-model="show1" position="bottom">
          <van-datetime-picker
            v-model="currentDate1"
            type="datetime"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="confirm1"
            @cancel="cancel1"
            :formatter="formatter"
          />
        </van-popup>
        <!-- 备注 -->
        <van-cell-group>
          <van-field
            v-model="form.remark"
            rows="2"
            autosize
            label="描述备注"
            type="textarea"
            maxlength="200"
            placeholder="请输入..."
            show-word-limit
          />
        </van-cell-group>
        <van-cell-group>
          <van-cell id="showTitle">附件
            <van-uploader v-model="fileList" :show-upload="upload" :after-read="onRead2" multiple :max-count="5" :max-size="3 * 1024 * 1024" @oversize="onOversize"/>
          </van-cell>
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import NavBar from "@/components/NavBar.vue";//顶部导航
export default {
  name: 'editAttendance',
  data () {
    return {
      type: 0,
      option1: [
        { text: '请选择', value: 0 },
        { text: '事假', value: 'C' },
        { text: '病假', value: 'S' },
        { text: '外出', value: 'G' },
      ],
      show: false,
      show1: false,
      minHour: 10,
      maxHour: 20,
      minDate: new Date(),
      maxDate: new Date(2020, 11, 31),
      currentDate: new Date(), //开始标准时间
      currentDate1: new Date(), //结束标准时间
      starttime: "", //开始时间
      starttime1: "", //开始时间时间戳
      endtime: "", //结束时间
      endtime1: "" ,//结束时间时间戳
      remark:"",
      token:sessionStorage.getItem("token"),
      fileList: [],//图片文件展示而已
      datas:[],//获取图片存放
      datas2:[],//传给后台
      upload: true,
      form:{
        type:"",
        starttime: "", //开始时间
        endtime: "", //结束时间
        remark:"",
        image:[]
      }
    }
  },
  components: {
    NavBar
  },
  created() {
    this.getLeaveDetail()
  },
  methods: {
    // 获取详情
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
          this.form.type=data.type;
          this.form.starttime = this.$moment(data.startTime).format("YYYY-MM-DD");
          this.form.endtime = this.$moment(data.endTime).format("YYYY-MM-DD");
          this.form.remark=data.remark;
          this.form.image = JSON.parse(data.image);

          // this.fileList = JSON.parse(data.image);
          if (this.form.image.length > 0) {
              this.form.image.forEach(item => {
                  let url = {};
                  url = {
                      url: this.reqApi.yiBSchool + item,
                      isImage: true
                  };
                  this.fileList.push(url);
              });
          }
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
    start() {
      this.show = true;
    },
    // 选择结束时间
    end() {
      this.show1 = true;
    },
    // 点击确定
    confirm() {
      this.show = false;
      this.starttime =
        this.currentDate.getFullYear() +
        "-" +
        (Number(this.currentDate.getMonth()) + 1) +
        "-" +
        this.currentDate.getDate()
        //  +
        // "- "
        // +
        // this.currentDate.getHours() +
        // ":" +
        // this.currentDate.getMinutes();
      this.starttime1 = new Date(this.currentDate).getTime() / 1000;
    },
    // 点击取消
    cancel() {
      this.show = false;
    },
    confirm1() {
      this.show1 = false;
      this.endtime =
        this.currentDate1.getFullYear() +
        "-" +
        (Number(this.currentDate1.getMonth()) + 1) +
        "-" +
        this.currentDate1.getDate()
      this.endtime1 = new Date(this.currentDate1).getTime() / 1000;
    },
    cancel1() {
      this.show1 = false;
    },
    // 处理控件显示的时间格式
    formatter(type, value) {
      // 格式化选择器日期
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      } else if (type === "day") {
        return `${value}日`;
      }
      return value;
    },
    // 上传照片
     onOversize(file) {//文件大小超过限制时触发
      console.log(file);
    },
    onRead2(file){
      let content = file.file;
      let data = new FormData();
      data.append('files',content);
      data.get("files")
      this.$axios.post(this.reqApi.yiBSchool + `/image/upload`,data)
      .then((res) => {
        this.datas = res.data.data.imgCodes;
        this.datas2.push(`${this.datas}`)//datas2用来传给后台
      })
    },
    // 编辑提交
    onClickAdd() {
      this.$axios.post(
        this.reqApi.yiBSchool + `/mobile/leave/update`,
        qs.stringify({
          token:this.token,
          code:this.$route.query.code,
          type:this.form.type,
          startTime:this.form.starttime,
          endTime:this.form.endtime,
          remark:this.form.remark,
          image:JSON.stringify(this.datas2)
        })
      ).then(res=>{
        if (res.data.code === "0000") {
          this.$router.push('attendanceOnVacation')
        }else if (res.data.code === "6666") {
          this.$message.error("token异常，请重新登录");
          const timer = setTimeout(() => {
            clearTimeout(timer);
            this.$router.push({
              name: "login"
            });
          }, 3000);
        }else return this.$message.error(res.data.msg)
      })
    },
    showPopup() {
      this.show = true;
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  },
}
</script>
<style scoped>
@import "../../style/zhu.css";
#showTitle .van-uploader{
  padding-top: 8px;
}
</style>
