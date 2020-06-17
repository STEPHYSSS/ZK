<template>
  <div class="addAttendance">
    <div class="box">
      <NavBar>
        <van-icon name="arrow-left" slot="left" @click="onClickLeft" />
        <div slot="title" class="van-nav-bar__title van-ellipsis">新建申请</div>
        <div slot="right" @click="onClickAdd">
          <img src="@/assets/images/tijiao_icon@2x.png" alt class="imgIcon" />
          <span class="submit">提交</span>
        </div>
      </NavBar>
      <div class="List">
        <div class="oneBox">
          <van-cell id="showTitle">出勤类型</van-cell>
          <div class="chooseMsg">
            <van-dropdown-menu>
              <van-dropdown-item v-model="type" :options="option1" />
            </van-dropdown-menu>
          </div>
        </div>
        <!-- 开始时间 -->
        <van-cell
          title="开始时间"
          is-link
          :value-class="className"
          :value="timeValue"
          @click="showPopup" />
        <van-popup v-model="show" position="bottom">
          <van-datetime-picker
            v-model="currentDate"
            type="datetime"
            title="选择时间"
            :min-date="minDate2"
            :max-date="maxDate"
            :formatter="formatter"
            @cancel="show = false"
            @confirm="confirmPicker"
          />
        </van-popup>
        <!-- 结束时间 -->
        <van-cell
          title="结束时间"
          is-link
          :value-class="className"
          :value="timeValue2"
          @click="showPopup2" />
        <van-popup v-model="show1" position="bottom">
          <van-datetime-picker
            v-model="currentDate"
            type="datetime"
            title="选择时间"
            :min-date="minDate"
            :max-date="maxDate"
            :formatter="formatter"
            @cancel="show = false"
            @confirm="confirmPicker2"
          />
        </van-popup>
        <!-- 备注 -->
        <van-cell-group>
          <van-field
            v-model="remark"
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
          <van-cell id="showTitle">
            附件
            <!-- :before-read="beRead" -->
            <!-- <van-uploader v-model="fileList" :after-read="onRead2" multiple :max-count="5" :max-size="2 * 1024 * 1024" @oversize="onOversize"/> -->
            <van-uploader
              :show-upload="upload"
              :before-read="beRead"
              v-model="fileList"
              multiple
              :after-read="onRead2"
              :max-count="5"
              :max-size="10 * 1024 * 1024"
              @delete="delImgs"
            />
          </van-cell>
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import NavBar from "@/components/NavBar.vue"; //顶部导航
export default {
  name: "addAttendance",
  data() {
    return {
      readonly: true,
      type: 0,
      option1: [
        { text: "请选择", value: 0 },
        { text: "事假", value: "C" },
        { text: "病假", value: "S" },
        { text: "外出", value: "G" }
      ],
      show: false,
      show1: false,
      remark: "",
      token: sessionStorage.getItem("token"),
      fileList: [], //图片文件展示而已
      datas: [], //获取图片存放
      datas2: [], //传给后台
      upload: true,
      timeValue: '请选择时间',
      timeValue2:'请选择时间',
      currentDate: new Date(),
      minDate2: new Date(2020, 0, 1),
      minDate: new Date(),
      maxDate: new Date(2030, 12, 31),
      className: ''
    };
  },
  components: {
    NavBar
  },
  methods: {
     // 显示弹窗
    showPopup () {
      this.show = true;
    },
    showPopup2(){
      this.minDate = this.currentDate
      this.show1 = true;
    },
    timeFormat(time){
      let year = time.getFullYear();
        let month = time.getMonth() + 1;
        let day = time.getDate();
        return year + '年' + month + '月' + day + '日'
    },
    // 确认选择的时间
    confirmPicker (val) {
      let year = val.getFullYear()
      let month = val.getMonth() + 1
      let day = val.getDate()
      let hour = val.getHours()
      let minute = val.getMinutes()
      if (month >= 1 && month <= 9) { month = `0${month}` }
      if (day >= 1 && day <= 9) { day = `0${day}` }
      if (hour >= 0 && hour <= 9) { hour = `0${hour}` }
      if (minute >= 0 && minute <= 9) { minute = `0${minute}` }
      this.className = 'timeClass'
      this.timeValue = `${year}-${month}-${day} ${hour}:${minute}:00`
      this.show = false
    },
    // 选项格式化函数
    formatter (type, value) {
      if (type === 'year') {
        return `${value}年`
      } else if (type === 'month') {
        return `${value}月`
      } else if (type === 'day') {
        return `${value}日`
      } else if (type === 'hour') {
        return `${value}时`
      } else if (type === 'minute') {
        return `${value}分`
      } else if (type === 'second') {
        return `${value}秒`
      }
      return value
    },
    // 结束
    // 确认选择的时间
    confirmPicker2 (val) {
      let year = val.getFullYear()
      let month = val.getMonth() + 1
      let day = val.getDate()
      let hour = val.getHours()
      let minute = val.getMinutes()
      if (month >= 1 && month <= 9) { month = `0${month}` }
      if (day >= 1 && day <= 9) { day = `0${day}` }
      if (hour >= 0 && hour <= 9) { hour = `0${hour}` }
      if (minute >= 0 && minute <= 9) { minute = `0${minute}` }
      this.className = 'timeClass'
      this.timeValue2 = `${year}-${month}-${day} ${hour}:${minute}:00`
      this.show1 = false
    },

    onRead2(file) {
      let content = file.file;
      let data = new FormData();
      data.append("files", content);
      data.get("files");
      this.$axios
        .post(this.reqApi.yiBSchool + `/image/upload`, data)
        .then(res => {
          // this.datas = res.data.data.imgCodes;
          // this.datas2.push(`${this.datas}`); //datas2用来传给后台
          if(res.data.code === "0000"){
            this.datas2.push(res.data.data.imgCodes);
          }
        });
    },

    beRead(file) {
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        this.$toast("只允许上传jpg/png格式的图片！");
        return false;
      }
      return true;
    },
    // 删除图片
    delImgs(file,index){
      this.datas2.splice(index,1)
    },
    // 提交
    onClickAdd() {
      if (this.starttime == "" || this.endtime == "" || this.type == "" || this.remark == "") {
        return this.$toast("请检查信息是否填写完整");
      }
      if( this.timeValue >= this.timeValue2){
        return this.$toast("开始时间不能大于结束时间");
      }
      this.$axios
        .post(
          this.reqApi.yiBSchool + `/mobile/leave/insert`,
          qs.stringify({
            token: this.token,
            type: this.type,
            startTime: this.timeValue,
            endTime: this.timeValue2,
            remark: this.remark,
            image: JSON.stringify(this.datas2)
          })
        )
        .then(res => {
          if (res.data.code === "0000") {
            this.$router.push({name:'attendanceOnVacation'});
          } else if (res.data.code === "6666") {
            this.$toast("token异常，请重新登录");
            const timer = setTimeout(() => {
              clearTimeout(timer);
              this.$router.push({
                name: "login"
              });
            }, 3000);
          } else { this.$toast(res.data.msg);}
        });
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
@import "../../style/zhu.css";
#showTitle .van-uploader {
  padding-top: 8px;
}
</style>
