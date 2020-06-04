<template>
    <div>
        <van-nav-bar title="我的地址" left-arrow @click-left="onClickLeft" fixed>
            <div slot="left">
                <img class="topimgstyle" src="@/images/fanhui_icon@2x.png" alt />
            </div>
            <div slot="right">
                <!-- <span class="Preservation" @click="Preservation">保存</span> -->
                <img @click="onAdd" class="topimgstyle" src="@/images/zengjia_icon@2x.png" alt />
            </div>
        </van-nav-bar>
        <div class="bodyContent">
            <div v-show="list.length==0" class="nomessage">
                <span>点击右上角添加地址</span>
            </div>
            <!-- <van-radio-group v-model="radio">
                <van-radio name="1">
                    
                </van-radio>
                <van-radio name="2">单选框 2</van-radio>
            </van-radio-group>-->
            <div class="outbigBox" v-for="(item,index) in list" :key="index">
                <!-- <van-radio-group
                    class="radioBox"
                    v-model="radio"
                    checked-color="#FC2E2E"
                    icon-size="15px"
                    v-show="$route.query.code"
                >
                    <van-radio :name="item.id"></van-radio>
                </van-radio-group> -->
                <div @click="toorder(item.id)">
                    <div class="box1 addressText">
                        <span class="nameText">{{item.name}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                        <span class="phoneText nameText">{{item.tel}}</span>
                    </div>
                    <div class="fontSizeColor addressText mrginBottom">{{item.address}}</div>
                </div>
                <span class="editText" @click="onEdit(item.id)">编辑</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            radio: "",
            list: [],
            code: ""
        };
    },
    created() {
        this.getlist();
    },
    methods: {
        onClickLeft() {
            // this.$router.go(-1);
            if (this.$route.query.code) {
                this.$router.push({
                    name: "buyNow",
                    code:this.$route.query.code
                });
            } else {
                this.$router.push({
                    name: "myinfo"
                });
            }
        },
        onEdit(id) {
            if (this.$route.query.code) {
                this.$router.push({
                    name: "addressEdit",
                    query: {
                        code: this.$route.query.code,
                        id: id
                    }
                });
            } else {
                this.$router.push({
                    name: "addressEdit",
                    query: {
                        id: id
                    }
                });
            }
        },
        toorder(id) {
            this.code = sessionStorage.getItem("code");
            if (this.$route.query.code) {
                this.$router.push({
                    name: "buyNow",
                    params: {
                        id: sessionStorage.setItem("id", id)
                    }
                });
            }
            sessionStorage.removeItem("code");
        },
        onAdd() {
            // this.$toast("新增地址");
            this.$router.push({
                name: "addressEdit",
                query: {
                    code: this.$route.query.code
                }
            });
        },
        getlist() {
            sessionStorage.setItem("code", this.$route.query.code);
            this.$axios
                .post(
                    "/shop/my/address/list",
                    this.$qs.stringify({
                        token: localStorage.getItem("token")
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.list = res.data.data.list;

                        this.list = res.data.data.list.map(item => {
                            return {
                                id: item.id,
                                name: item.name,
                                tel: item.phone,
                                address:
                                    item.province +
                                    item.city +
                                    item.area +
                                    item.address,
                                isDefault: item.isDefault
                            };
                        });
                        this.list.forEach(item => {
                            if (item.isDefault == "Y") {
                                this.radio = item.id;
                            }
                        });
                    } else if (res.data.code === "6666") {
                        this.$toast.fail("请登录");
                        this.$router.push({
                            name: "login"
                        });
                    } else {
                        this.$toast.fail(res.data.msg);
                    }
                });
        }
    }
};
</script>
<style lang="less" scoped>
.nameText {
    font-size: 16px;
    color: #333;
}
.phoneText {
}
.addressText {
    width: 282px;
    text-align: left;
    margin: 5px auto;
}
.nomessage {
    font-size: 14px;
    color: #999;
    padding-top: 10px;
    background-color: #fff;
}
.box1 {
}
.outbigBox {
    position: relative;
    // padding-top: 10px;
    background-color: #fff;
}
.editText {
    position: absolute;
    right: 0;
    color: #fc2e2e;
    font-size: 12px;
    top: 40%;
    right: 15px;
    display: inline-block;
    height: 23px;
    width: 41px;
}
.mrginBottom{
    padding-bottom: 10px;
}
.radioBox {
    position: absolute;
    display: inline-block;
    left: 17px;
    top: 40%;

    .van-.van-radio__icon {
        width: 10px;
        height: 10px;
    }
}
</style>