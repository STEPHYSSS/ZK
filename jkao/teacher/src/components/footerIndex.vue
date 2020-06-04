<template>
  <el-footer style="padding: 0;">
    <!-- <div class="footer-info">
      <div class="nsr-info">
        <i class="iconfont i-ren"></i>
        <span>用户信息：</span>
        <span>{{userInfo.studentMc}}</span>
        <span>{{userInfo.studentDm}}</span>
      </div>
      <div class="time">登陆时间为：{{now}}</div>
    </div> -->
  </el-footer>
</template>

<script>
export default {
  data() {
    return {
      userInfo: [],
      now: this.$utils.getNowFormatDate(),
      intervalFn: null
    };
  },
  components: {},
  created() {
    this.initInfo();
    let _this = this;
    this.intervalFn = setInterval(function() {
      _this.now = _this.$utils.getNowFormatDate();
    }, 1000);
  },
  methods: {
    initInfo: function() {
      //获取用户基本信息
      let that = this;
      let url = "tax/login/" + sessionStorage.kh + "/" + sessionStorage.sjh;
      that.$utils.post(url)
		.then(res => {
			const cjtHomeHash = location.href.split("?");
			sessionStorage.cjtHomeHash = cjtHomeHash[1];
      that.userInfo = res.data; //纳税人基本信息
			sessionStorage.setItem("userInfo", JSON.stringify(res.data));
		})
		.catch(function(err) {
			that.$message.error("获取用户信息异常");
		});
    }
  },
  destroyed() {
    //销毁
    window.clearInterval(this.intervalFn);
  },
  watch: {
    $route(to, from) {}
  }
};
</script>

<style>
</style>