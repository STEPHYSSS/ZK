<template>
  <div class="Classification">
    <topNav title="分类"></topNav>
    <van-tree-select height="100%" :items="treeitems" :main-active-index.sync="activeIndex">
      <template slot="content">
        <div>
          <van-grid :gutter="10">
            <van-grid-item 
              v-for="(value, index) in treeitems[activeIndex]['children']"
              :key="index"
              icon="photo-o"
            >
            <img :src="value.image | serverUrl(value.image)" :onerror="errImg" @click="goodsInfo(value)" style="height:79px;width:79px"/>
            <span>{{value.text}}</span>
            </van-grid-item>
          </van-grid>
        </div>
      </template>
    </van-tree-select>
     <tabbar></tabbar>
  </div>
</template>
<script>
import qs from "qs";
import tabbar from "@/components/common/tabbar.vue";
import topNav from "@/components/common/topNav.vue";
export default {
  name: "Classification",
  data() {
    return {
      errImg: 'this.src="' + require('@/assets/homeimg/img22@2x.png') + '"',
      treeitems:[
        { children: [] }
      ],
      title:"",
      activeId: 1,
      activeIndex: 0
    };
  },
  created(){
    this.getGoodsTree();
  },
  methods: {
    getGoodsTree(){
      this.$axios({
        url: "/shop/goods/type/tree",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({})
      }).then(res=>{
        if(res.data.code == "0000"){
          // this.title = res.data.data.label
          const items = res.data.data.map(item => {            
            const child = item.children.map(item1 => {
              return {
                text: item1.label,
                code: item1.code,
                level: item1.level,
                image:item1.image
              }
            })            
            return {
              text: item.label,
              code: item.code,
              level: item.level,
              children: child
            }
            
          })
          this.treeitems = items;
        }
      })
    },
    goodsInfo(value){
      this.$router.push({
        name: "shopsInfo",
        query:{
          code:value.code,
          label:value.text
        }
      });
    }
  },
  components: {
    tabbar,
    topNav
  },
  // filters: {
  //   filterImgSrc(value) {
  //     return "http://192.168.1.168:8080" + value;
  //   }
  // },
};
</script>
<style scoped>
  .Classification{
    margin-top: 46px;
    margin-bottom: 50px;
    box-sizing: border-box;
  }
  .Classification .van-tree-select__nav{
    width: 77px;
  }
  
 
</style>
