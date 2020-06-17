<template>
  <div>
     
     <van-tabbar safe-area-inset-bottom v-model="active" inactive-color="#777777" active-color="#4489FEFF">
            <van-tabbar-item v-for="(item,index) in tabbars" :key="index" :to="(item.name)">
                <span>{{item.title}}</span>
                <img slot="icon" slot-scope="props" :src="props.active ? item.active : item.normal" />
            </van-tabbar-item>
        </van-tabbar>
        
  </div>
</template>
<script>
export default {
    name: "tabbar",
    data() {
        return {
            active: 0,
            tabbars: [
                {
                    name: "home",
                    title: "首页",
                    normal: require("@/assets/images/icon/shouye_icon@2x.png"),
                    active: require("@/assets/images/icon/shouye_icon@2x (2).png")
                },
                {
                    name: "addressBook",
                    title: "通讯录",
                   normal: require("@/assets/images/icon/tongxunlu_icon@2x.png"),
                    active: require("@/assets/images/icon/tongxunlu_icon1@2x.png")
                },
                {
                    name: "myinfo",
                    title: "我的",
                   normal: require("@/assets/images/icon/wode_icon@2x.png"),
                    active: require("@/assets/images/icon/wode_icon1@2x.png")
                }
            ]
        };
    },
    created() {
        if (this.$route.name == "home") {
            
            this.active = 0;
        } else if (this.$route.name == "addressBook") {
            this.active = 1;
        } else if (this.$route.name == "myInfo") {
            this.active = 2;
        }
        // else if (this.$route.name == "myinfo"){
        //     this.active = 3;
        // }
    },
    methods: {
        toMyinfo() {
            if (this.active == "home") {
                this.$router.push({
                    name: "home"
                });
            } else if (this.active == "phoneBook") {
                this.$router.push({
                    name: "phoneBook"
                });
            } else if (this.active == "myinfo") {
                this.$router.push({
                    name: "myinfo"
                });
            }
        }
    }
};
</script>
<style scoped>
</style>
