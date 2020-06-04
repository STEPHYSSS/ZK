<template>
    <div>
        <!-- <van-tabbar route>
            <van-tabbar-item @click="router.push('/Home')" to="/Home" icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item to="/Classification" icon="search">分类</van-tabbar-item>
            <van-tabbar-item to="/Card" icon="search">购物车</van-tabbar-item>
            <van-tabbar-item @click="toMyinfo" to="/myinfo" icon="search">我的</van-tabbar-item>
        </van-tabbar>-->
        <!-- <van-tabbar v-model="active" @change="toMyinfo">
            <van-tabbar-item name="home" icon="home-o">首页{{active}}</van-tabbar-item>
            <van-tabbar-item name="classification" icon="search">分类</van-tabbar-item>
            <van-tabbar-item name="shopcard" icon="friends-o">购物车</van-tabbar-item>
            <van-tabbar-item name="myinfo" icon="setting-o">我的</van-tabbar-item>
        </van-tabbar>-->
        <!-- <van-tabbar route>
            <van-tabbar-item @click="router.push('/Home')"  icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item @click="router.push('/Classification')"  icon="search">分类</van-tabbar-item>
            <van-tabbar-item @click="router.push('/Card')"  icon="search">购物车</van-tabbar-item>
            <van-tabbar-item @click="router.push('/myinfo')"  icon="search">我的</van-tabbar-item>
        </van-tabbar>-->

        <!-- <van-tabbar v-model="active">
            <van-tabbar-item info="3">
                <span>自定义</span>
                <img slot="icon" slot-scope="props" :src="props.active ? icon.active : icon.normal" />
            </van-tabbar-item>
            <van-tabbar-item icon="search">标签</van-tabbar-item>
            <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
        </van-tabbar>-->

        <van-tabbar safe-area-inset-bottom v-model="active" inactive-color="#777777" active-color="#FC2E2E">
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
            active: "0",
            tabbars: [
                {
                    name: "Home",
                    title: "首页",
                    normal: require("@/images/shouye_icon2@2x.png"),
                    active: require("@/images/shouye_icon@2x.png")
                },
                {
                    name: "Classification",
                    title: "分类",
                    normal:
                        require("@/images/fenlei_icon@2x.png"),
                    active:
                        require("@/images/fenlei_icon2@2x.png")
                },
                {
                    name: "Card",
                    title: "购物车",
                    normal:
                        require("@/images/guowuche_icon@2x1.png"),
                    active:
                        require("@/images/guowuche_icon@2x.png")
                },
                {
                    name: "myinfo",
                    title: "我的",
                    normal:
                        require("@/images/wode_icon2@2x.png"),
                    active:
                        require("@/images/wode_icon@2x.png")
                }
            ]
        };
    },
    created() {
        if (this.$route.name == "Home") {
            this.active = 0;
        } else if (this.$route.name == "Classification") {
            this.active = 1;
        } else if (this.$route.name == "Card") {
            this.active = 2;
        }else if (this.$route.name == "myinfo"){
            this.active = 3;
        }
    },
    methods: {
        toMyinfo() {
            if (this.active == "home") {
                this.$router.push({
                    name: "Home"
                });
            } else if (this.active == "classification") {
                this.$router.push({
                    name: "Classification"
                });
            } else if (this.active == "Card") {
                this.$router.push({
                    name: "Card"
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
<style lang="less" scoped>
</style>