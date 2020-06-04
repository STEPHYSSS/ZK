<template>
    <div class="outBox">
        <div class="outBox_one">
            <van-nav-bar
                :title="$route.query.code?'申诉详情':'新建申诉'"
                left-arrow
                fixed
                @click-left="onClickLeft"
                @click-right="del"
            >
                <!-- 普通员工进来，可以查看详情如果状态W则可以删除 -->
                <!-- <template #right>
                    <div v-if="$route.query.status=='W'">
                        <img src="@/assets/images/delete_icon@2x.png" alt class="imgIcon" />
                        <span class="delText">删除</span>
                    </div>
                </template> -->
            </van-nav-bar>
            <div>
                <!-- is-link @click="show=true" -->
                <van-cell title="申诉类型">
                    <template #default>
                        <span>{{form.type|filterValue}}</span>
                    </template>
                </van-cell>
                <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
                <van-field
                    v-model="form.remark"
                    rows="2"
                    border
                    autosize
                    :readonly="oninput"
                    label="申诉描述"
                    type="textarea"
                    
                    placeholder="例如，12月1日正常上班，但系统无考勤记录"
                    
                />
            </div>
            <van-row class="imgBox">
                <van-col span="4">
                    <div class="imgBox_title">附件</div>
                </van-col>
                <van-col span="20">
                    <div class="imgBoxList">
                        <van-uploader
                            :show-upload="upload"
                            v-model="fileList"
                            multiple
                            :deletable="false"
                            
                            :after-read="afterRead"
                            :max-count="5"
                            :max-size="3 * 1024 * 1024"
                            @oversize="onOversize"
                        />
                    </div>
                </van-col>
            </van-row>
            <!-- 拿到详情页的时候进行展示如下部分 -->
            <!-- v-if="$route.query.status=='F'||$route.query.status=='S'" -->
            <div class="imgBox" >
                <van-cell title="提交人" :value="form.personnelName" />
                <van-cell title="提交时间" :value="form.createTime" />
                <van-cell title="审核人" :value="form.checkPersonnelName" v-if="$route.query.status!='W'"/>
                <van-cell title="审核时间" :value="form.checkTime" v-if="$route.query.status!='W'" />
                <van-cell title="状态" :value="form.status|filtersType" />
                <!-- <div v-if="$route.query.status=='F'||$route.query.status=='S'">
                    <van-cell title="审核">
                        <template #default> -->
                            <!-- <el-radio v-model="isPass" label="1"></el-radio>
                            <el-radio v-model="isPass" label="2"></el-radio>-->

                            <!-- <el-radio-group v-model="isPass">
                                <el-radio :label="1">通过</el-radio>
                                <el-radio :label="2">不通过</el-radio>
                            </el-radio-group> -->
                            <!-- <span v-if="isPass==1">通过</span>
                            <span v-if="isPass==2">不通过</span>
                        </template>
                    </van-cell> -->
                    <van-field
                        v-model="form.opinion"
                        rows="2"
                        autosize
                        readonly
                        label="意见"
                        type="textarea"
                        v-if="$route.query.status!='W'"
                        placeholder="请输入意见"
                        
                    />
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
            show: false,
            oninput: false,
            message: "",
            upload: true,

            radio: "1",
            message: "",
            isPass: 1,
            manager: sessionStorage.getItem("manager"),
            fileList: [
                // { url: "http://192.168.1.171:8085/image//image/e91914e6b7414cef89268c604bbde44f" }
                // Uploader 根据文件后缀来判断是否为图片文件
                // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
                // { url: "https://cloud-image", isImage: true }
            ],
            actions: [
                { name: "考勤", type: "A" },
                { name: "评分", type: "G" },
                { name: "其他", type: "O" },
                { name: "取消" }
            ],
            form: {
                type: "",
                remark: "",
                image: [],
                opinion: "",
                isPass: 0,
                createTime: "",
                personnelName: ""
            },
            flag:false
        };
    },
    created() {
        this.getDetail();
        if (
            this.$route.query.status == "W" ||
            this.$route.query.status == "F" ||
            this.$route.query.status == "S"
        ) {
            this.upload = false;
        }
    },
    mounted() {
        if (this.$route.query.status) {
            this.oninput = true;
        }
        if(this.$route.query.code){
            this.flag=false
        }
    },
    methods: {
        del() {
            this.$dialog
                .confirm({
                    message: "确定删除吗？"
                })
                .then(() => {
                    this.$utils
                        .post(
                            this.reqApi.yiBSchool + "/mobile/appeal/delete",
                            qs.stringify({
                                code: this.form.code
                            })
                        )
                        .then(res => {
                            if (res.data.code === "0000") {
                                this.$toast("删除成功");
                                this.$router.push({
                                    name: "grievanceManagement",
                                    query: {
                                        active: this.$route.query.active
                                    }
                                });
                            } else {
                                this.$toast(res.data.msg);
                            }
                            instance.close();
                        });
                });
        },
        // 新增
        submit() {
            if (!this.form.type) {
                return this.$toast("请选择申诉类型");
            }
            if (!this.form.remark) {
                return this.$toast("请填写备注信息");
            }
            this.form.isPass = this.isPass;
            if (this.$route.query.active == 2) {
                this.$utils
                    .post(
                        this.reqApi.yiBSchool + "/mobile/appeal/check",
                        qs.stringify({
                            code: this.form.code,
                            opinion: this.form.opinion,
                            isPass: this.form.isPass
                        })
                    )
                    .then(res => {
                        if (res.data.code === "0000") {
                            this.$toast("提交成功");
                            this.$router.push({
                                name: "grievanceManagement",
                                query: {
                                    active: this.$route.query.active
                                }
                            });
                        } else {
                            this.$toast(res.data.msg);
                        }
                    });
            } else {
                this.$utils
                    .post(
                        this.reqApi.yiBSchool + "/mobile/appeal/insert",
                        qs.stringify({
                            type: this.form.type,
                            remark: this.form.remark,
                            image: JSON.stringify(this.form.image)
                        })
                    )
                    .then(res => {
                        if (res.data.code === "0000") {
                            this.$toast("提交成功！");
                            this.$router.push("/grievanceManagement");
                        }
                    });
            }

            // if (this.manager) {
            //     this.$utils
            //         .post(
            //             this.reqApi.yiBSchool + "/mobile/appeal/check",
            //             qs.stringify(this.form)
            //         )
            //         .then(res => {
            //             if (res.data.code === "0000") {
            //             }
            //         });
            // } else {

            // }
        },
        getDetail() {
            this.$utils
                .post(
                    this.reqApi.yiBSchool + "/mobile/appeal/detail",
                    qs.stringify({
                        code: this.$route.query.code
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.form = res.data.data;
                        if (this.form.opinion == null) {
                            this.form.opinion = "";
                        }
                        this.form.createTime = this.$moment(
                            this.form.createTime
                        ).format("YYYY-MM-DD");
                         this.form.checkTime = this.$moment(
                            this.form.checkTime
                        ).format("YYYY-MM-DD");
                        this.form.image = JSON.parse(this.form.image);
                        if (this.form.status == "S") {
                            this.isPass = 1;
                        } else {
                            this.isPass = 2;
                        }
                        if (this.form.image.length > 0) {
                            this.form.image.forEach(item => {
                                let url = {};
                                url = {
                                    url: this.reqApi.yiBSchool + item,
                                    isImage: true
                                };
                                this.fileList.push(url);
                            });
                        }
                    }
                });
        },

        onClickLeft() {
            this.$router.push({
                name: "grievanceManagement",
                query: {
                    active: this.$route.query.active
                }
            });
        },
        onClickRight() {},
        onSelect(item) {
            this.show = false;
            this.form.type = item.type;

            if (item.name == "取消") {
                this.form.type = "";
            }
        },
        afterRead(file) {
            // 此时可以自行将文件上传至服务器
            // this.form.image=[]
            var formData = new FormData();
            formData.append("files", file.file); // 将formData传给后台
            formData.get("files");
            this.$utils
                .post(this.reqApi.yiBSchool + "/image/upload", formData)
                .then(res => {
                    if (res.data.code === "0000") {
                        this.form.image.push(res.data.data.imgCodes);
                    }
                });
        },
        onOversize(file) {}
    },
    filters: {
        filterValue(val) {
            if (val == "A") {
                return "考勤";
            } else if (val == "G") {
                return "评分";
            } else if (val == "O") {
                return "其他";
            } else {
                return "请选择";
            }
        },
        filtersType(val) {
            if (val == "W") {
                return "待审核";
            } else if (val == "F") {
                return "不通过";
            } else if (val == "S") {
                return "通过";
            }
        }
        // timer(val){
        //     console.log(val)
        //     return this.$moment(val).format('YYYY-MM-DD')
        // }
    }
};
</script>
<style scoped>
.van-cell__right-icon {
    color: #14c25aff;
}
.dis_inline {
    display: inline-block;
}
.imgBox {
    background-color: #fff;
    margin-top: 10px;
    min-height: 40px;
}
.imgBox_title {
    font-size: 12px;
    text-align: center;
    padding-top: 10px;
}
.imgBoxList {
    padding-top: 10px;
}
</style>