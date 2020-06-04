<template>
    <div id="addressEdit">
        <!-- addressEdit -->
        <van-nav-bar :title="title" left-arrow @click-left="onClickLeft">
            <div slot="left">
                <img class="topimgstyle" src="@/images/fanhui_icon@2x.png" alt />
            </div>
            <div slot="right">
                <span class="Preservation" @click="Preservation">保存</span>
            </div>
        </van-nav-bar>
        <van-cell-group>
            <van-field
                v-model="addressList.name"
                clearable
                label="收货人："
                @click-right-icon="$toast('question')"
            />
            <van-field
                clearable
                @blur="textphone(addressList.phone)"
                type="number"
                v-model="addressList.phone"
                maxlength="11"
                label="手机号码："
            />
            <van-cell title="省/市/区：" :value="country" @click="show = true" class="cityGird"></van-cell>
            <van-popup v-model="show" position="bottom">
                <van-area
                    ref="area"
                    value
                    :area-list="areaList"
                    @confirm="onChange"
                    @cancel="show = false"
                />
            </van-popup>
            <van-cell-group>
                <van-field
                    v-model="addressList.address"
                    rows="1"
                    autosize
                    label="详细地址："
                    type="textarea"
                    clearable
                />
            </van-cell-group>
            <van-cell-group>
                <van-cell title="设置成默认地址" value="内容">
                    <van-switch v-model="isDefault" size="16px" slot="default" />
                </van-cell>
            </van-cell-group>
        </van-cell-group>
        <div class="delet" @click="delet" v-if="this.$route.query.id">删除</div>
    </div>
</template>
<script>
import areaList from "@/assets/area.js";
export default {
    data() {
        return {
            checked: true,
            show: false,
            areaList,
            country: "",
            password: "",
            addressList: {
                id: "",
                name: "",
                phone: "",
                province: "",
                city: "",
                area: "",
                address: "",
                isDefault: false
            },
            isDefault: false,
            title:'新增地址'
        };
    },
    created() {
        this.getDetail();
    },

    methods: {
        Preservation() {
            // var myreg = new RegExp();
            // myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
            // if (!myreg.test(this.addressList.phone)) {
            //     return this.$toast.fail("请输入有效的手机号");
            // }
            if (!this.addressList.name) {
                return this.$toast.fail("请填写收货人姓名");
            } else if (!this.addressList.phone) {
                return this.$toast.fail("请填写手机号");
            } else if (!this.country) {
                return this.$toast.fail("请选择城市");
            } else if (!this.addressList.address) {
                return this.$toast.fail("请填写详细地址");
            }
            this.addressList.token = localStorage.getItem("token");
            if (this.isDefault) {
                this.addressList.isDefault = "Y";
            } else {
                this.addressList.isDefault = "N";
            }
            if (this.$route.query.id) {
                this.$axios
                    .post(
                        "/shop/my/address/update",
                        this.$qs.stringify(this.addressList)
                    )
                    .then(res => {
                        if (res.data.code === "0000") {
                            this.$toast.success("修改成功");

                            // 编辑的页面跳转，带code回去
                            if (this.$route.query.code) {
                                this.$router.push({
                                    name: "addresList",
                                    query: {
                                        code: this.$route.query.code
                                    }
                                });
                            }else {
                                // 直接跳转
                                this.$router.push("/addresList");
                            }
                        } else if (res.data.code === "6666") {
                            this.$toast("请登录");
                            // const timer = setTimeout(() => {
                            //     clearTimeout(timer);
                            this.$router.push({ name: "login" });
                            // }, 3000);
                        } else {
                            this.$toast.fail(res.data.msg);
                        }
                    });
            } else {
                this.$axios
                    .post(
                        "/shop/my/address/add",
                        this.$qs.stringify(this.addressList)
                    )
                    .then(res => {
                        if (res.data.code === "0000") {
                            this.$toast.success("新增成功");
                            // this.$router.push("/addresList");
                            if (this.$route.query.code) {
                                this.$router.push({
                                    name: "addresList",
                                    query: {
                                        code: this.$route.query.code
                                    }
                                });
                            }else {
                                this.$router.push("/addresList");
                            }
                        }
                    });
            }
        },
        delet() {
            this.$dialog
                .confirm({
                    title: "确定要删除吗？",
                    message: ""
                })
                .then(() => {
                    this.$axios
                        .post(
                            "/shop/my/address/delete",
                            this.$qs.stringify({
                                token: localStorage.getItem("token"),
                                id: this.$route.query.id
                            })
                        )
                        .then(res => {
                            if (res.data.code === "0000") {
                                this.$toast.success("删除成功");
                                // console.log(this.$route.query)
                                if(this.$route.query.code){
                                    this.$router.push({
                                        name:'addresList',
                                        query:{
                                            code:this.$route.query.code
                                        }
                                    })
                                } else{
                                    this.$router.push("/addresList");
                                }
                                
                            }
                        });
                    // on confirm
                })
                .catch(() => {
                    // console.log(promise)
                    // on cancel
                });
        },
        getDetail() {
            if (this.$route.query.id) {
                this.title="地址编辑"
                this.$axios
                    .post(
                        "/shop/my/address/detail",
                        this.$qs.stringify({
                            token: localStorage.getItem("token"),
                            id: this.$route.query.id
                        })
                    )
                    .then(res => {
                        if (res.data.code === "0000") {
                            this.addressList = res.data.data;
                            this.country =
                                this.addressList.province +
                                this.addressList.city +
                                this.addressList.area;
                            if (this.addressList.isDefault == "Y") {
                                this.isDefault = true;
                            } else if (this.addressList.isDefault == "N") {
                                this.isDefault = false;
                            }
                        }
                    });
            } else {
                return;
            }
        },
        textphone(phone) {
            if (phone) {
                var myreg = new RegExp();
                myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
                if (!myreg.test(phone)) {
                    return this.$toast.fail("请输入有效的手机号");
                } else {
                    return true;
                }
            }
        },
        onChange(value) {
            this.country = "";
            for (var i = 0; i < value.length; i++) {
                this.country = this.country + value[i].name + " ";
            }
            this.addressList.province = value[0].name;
            this.addressList.city = value[1].name;
            this.addressList.area = value[2].name;
            this.show = false;
        },
        onClickLeft() {
            // this.$router.go(-1);
            if(this.$route.query.code){
                 this.$router.push({
                name: "addresList",
                query:{
                    code:this.$route.query.code
                }
            });
            }else {
                 this.$router.push({
                name: "addresList"
            });
            }
           
        }
    }
};
</script>
<style lang="less" scoped>
#addressEdit{
    background-color: #fff;
}
.Preservation {
    color: #fff;
    font-size: 12px;
}
.van-switch--on {
    background-color: #20b120;
}
#addressEdit .cityGird {
    // width: 48px;
    .van-cell__title {
        flex: none;
        width: 91px;
    }
    .van-cell__value {
        text-align: left;
    }
}
.delet {
    width: 345px;
    line-height: 42px;
    border: 1px solid #ebedf0;
    margin: 0 auto;
    font-size: 14px;
    margin-top: 10px;
}
</style>