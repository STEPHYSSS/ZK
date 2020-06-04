<template>
  <div class="lock">
    <div class="biu" v-if="showline">
      <div class="biu2">
        <p>
          <span>管理员:</span>
          <span>{{storelist.username}}</span>
        </p>
        <input style="color: #000;" type="number" placeholder="请输入登录密码 " v-model="numadd" />
        <div class="num" style="padding-left: 30px;">
          <ul>
            <li @click="call($event)">1</li>
            <li @click="call($event)">2</li>
            <li @click="call($event)">3</li>
            <li @click="call($event)">0</li>
            <li @click="call($event)">4</li>
            <li @click="call($event)">5</li>
            <li @click="call($event)">6</li>
            <li @click="callthree">C</li>
            <li @click="call($event)">7</li>
            <li @click="call($event)">8</li>
            <li @click="call($event)">9</li>
            <li @click="showing">解除锁屏</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      storelist: [],
      num: [],
      numadd: "",
      showline: true
    };
  },
  props: [],
  created() {
    this.shopPost();
  },
  methods: {
    shopPost() {
      this.$axios
        .post(
          "/clerk/index/detail",
          qs.stringify({
            token: sessionStorage.getItem("token")
          })
        )
        .then(res => {
          console.log(res, "----");
          if (res.data.code === "0000") {
            this.storelist = res.data.data;
          }
        });
    },
    call(e) {
      var num = e.target.innerText;
      this.num.push(num);
      this.num.forEach(item => {
        this.numadd += item;
        this.num = [];
      });
      console.log(this.numadd);
    },
    callthree() {
      var a = this.numadd.split("");
      var b = "";
      a.splice(a.length - 1, 1);
      if (a.length == 0) {
        this.numadd = "";
        return;
      }
      a.forEach(item => {
        this.numadd = b += item;
      });
    },
    showing() {
      if (this.numadd == "123456") {
        this.showline = false;
        this.$emit("closeMo");
      } else {
        this.$message.error("密码不正确，请重新输入");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.biu {
  background-color: rgba(125, 125, 125, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  .biu2 {
    width: 1.25rem;
    height: 1.4rem;
    background-color: rgba(0, 0, 0, 0.7);
    margin: 0.3rem auto;
    border-radius: 10px;
    padding: 0.1rem;
    border: 1px solid #fff;
    input {
      width: 90%;
      height: 50px;
      margin-left: 30px;
    }
    p {
      text-align: center;
      color: #fff;
      height: 0.2rem;
      line-height: 0.2rem;
      font-size: 24px;
      font-weight: 700;
    }
    .num {
      ul {
        margin: 0;
        padding: 0;
        li {
          display: inline-block;
          width: 102px;
          color: black;
          height: 102px;
          line-height: 102px;
          text-align: center;
          background-color: #fff;
          margin: 0 24px 24px 0;
          border-radius: 4px;
          font-size: 13px;
          &:last-child {
            background-color: skyblue;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
