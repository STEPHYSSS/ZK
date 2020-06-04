<template>
  <div class="addressBookDetail">
    <div class="box">
      <NavBar>
        <van-icon name="arrow-left" slot="left" @click="onClickLeft" />
        <div slot="title" class="van-nav-bar__title van-ellipsis">通讯录</div>
      </NavBar>
      <div class="List">
        <div class="PhoneBox"><img class="imgPhoto" :src="photo" alt=""></div>
        <van-cell-group>
          <van-cell title="姓名" :value="group.name" />
          <van-cell title="联系方式" @click="showtel(group.phone)">
            <span class="contact">{{group.phone}} </span>
          </van-cell>
          <van-cell title="部门" :value="group.sectionName" />
          <van-cell title="职务" :value="group.job" />
          <van-cell title="邮箱">
            <span class="contact">{{group.email}} </span>
          </van-cell>
          <van-cell title="QQ">
            <span class="contact">{{group.qq}} </span>
          </van-cell>
        </van-cell-group>
        <van-popup v-model="show"  position="bottom" :style="{ height: '19.5%' }">
          <van-cell-group style="text-align:center">
            <van-cell>
              <div style="text-align:center"><a :href="`tel:+86 ${group.phone}`" style="color:#000">拨打手机</a></div>
            </van-cell>
            <van-cell title="复制" @click="copy(group.phone)"></van-cell>
            <van-cell title="取消" @click="cancel"/>
          </van-cell-group>
        </van-popup>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import NavBar from "@/components/NavBar.vue";//顶部导航
export default {
  name: 'addressBookDetail',
  data () {
    return {
      group:{},
      show:false,
      phones:"",
      id:this.$route.query.id,
      photo:require('@/assets/images/img@2x.png')
    }
  },
  components: {
    NavBar
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.$axios.post(this.reqApi.yiBSchool + `/mobile/book/detail`,
        qs.stringify({token:sessionStorage.getItem('token'),id:this.id})
      ).then(res=>{
        if(res.data.code == '0000') {
          this.group = res.data.data;
        }else return this.$toast(res.data.msg)
      })
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    // 复制
    copy(code) {
      const input = document.createElement('input');
      input.setAttribute('readonly', 'readonly');
      input.setAttribute('value', code);
      document.body.appendChild(input);
      input.select();
      input.setSelectionRange(0, 9999);
      if (document.execCommand('copy')) {
        document.execCommand('copy');
        this.$toast.success('复制成功！', 1.5);
        console.log(document.execCommand("Copy"))
      }
      document.body.removeChild(input);
      this.show = false;
    },
    showtel(phone) {
      this.show = true;
      this.phones = phone;
    },
    cancel() {
      this.show = false;
    }
  },
}
</script>
<style scoped>
@import "../../style/zhu.css";
</style>
