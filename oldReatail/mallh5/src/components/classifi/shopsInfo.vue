<template>
  <div class="shopsInfo">
    <topNav :title="title"></topNav>
    <div>
      <van-grid :column-num="2">
        <van-grid-item v-for="(item,index) in infoList" :key="index">
          <!-- <router-linkstyle="color:#333333"> -->
          <div class="listImgBox" @click="toGoods(item.code)">
            <img src="../../assets/homeimg/img_5.png" class="goodsTip" />
            <img
              :src="item.listImage | serverUrl(item.image)"
              :onerror="errImg"
              style="width:168px;height:130px;"
            />
            <p class="goodsTit">{{item.name}}</p>
            <div class="goodsPrice">
              <p class="price">￥{{item.salesPrice}}</p>
              <p class="buy"></p>
            </div>
          </div>
          <!-- </router-linkstyle="color:#333333"> -->
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>
<script>
import qs from "qs";
import topNav from "@/components/common/topNav.vue";
export default {
  name: "shopsInfo",
  data() {
    return {
      title: this.$route.query.label,
      typeLevel2: this.$route.query.code,
      infoList: [],
      errImg: 'this.src="' + require("@/assets/homeimg/img22@2x.png") + '"'
    };
  },
  components: {
    topNav
  },
  created() {
    this.getShopList();
  },
  methods: {
    getShopList() {
      this.$axios({
        url: "shop/goods/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          typeLevel2: this.typeLevel2,
          pageNum: 900,
          pageSize: 20
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.infoList = res.data.data.list;
        }
      });
    },
    toGoods(code) {
      this.$router.push({
        name: "goodsDetail",
        query: {
          code:code,
          title:this.title
        }
      });
    }
  }
};
</script>
<style scoped>
.shopsInfo {
  margin-top: 46px;
}
.recommended {
  width: 60%;
  margin: 0 auto;
}
.recommended img {
  width: 100%;
}
.listImgBox {
  width: 167.5px;
  position: relative;
  margin: 5px 0;
  background-color: #fff;
  border-radius: 3px;
}
.listImgBox .goodsTip {
  position: absolute;
  top: 0;
  left: 0;
}
.goodsTit {
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 95.5px;
  text-align: left;
  box-sizing: border-box;
  padding-left: 5px;
}
.goodsPrice {
  width: 100%;
  display: flex;
  margin-top: 10px;
}
.goodsPrice .price {
  display: inline-block;
  flex: 3;
  font-size: 16px;
  color: #f23a3a;
  text-align: left;
  box-sizing: border-box;
  padding-left: 5px;
}
.buy {
  display: inline-block;
  width: 25px;
  height: 25px;
  position: relative;
  font-size: 10px;
  color: #808080;
}
.buy::before {
  content: "购买";
  position: absolute;
  width: 25px;
  height: 25px;
  line-height: 25px;
  border-radius: 50%;
  top: -4px;
  right: 5px;
  background-color: rgba(0, 0, 0, 1);
}
</style>