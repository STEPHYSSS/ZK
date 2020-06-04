<template>
    <div id="turnTable" class="minimum">
        <h3>摇一摇</h3>
        <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            class="demo-ruleForm"
            label-width="120px"
        >
            <span class="box1 borderTop">
                <div class="activityTitle">
                    <span class="titleText">活动信息</span>
                </div>

                <el-form-item label="活动名称" prop="name">
                    <el-input class="inputWidth" v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="活动开始时间" class="aa">
                    <el-col :span="11">
                        <el-form-item prop="startTime" border>
                            <el-date-picker
                                v-model="ruleForm.startTime"
                                type="date"
                                class="inputWidth"
                                format="yyyy-MM-dd"
                                placeholder="选择开始日期"
                                :picker-options="pickerOptionsStart"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="活动结束时间" class="aa">
                    <el-col :span="11">
                        <el-form-item prop="endTime">
                            <el-date-picker
                                v-model="ruleForm.endTime"
                                type="date"
                                class="inputWidth"
                                format="yyyy-MM-dd"
                                placeholder="选择结束日期"
                                :picker-options="pickerOptionsEnd"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="活动备注">
                    <el-input
                        type="textarea"
                        resize="none"
                        class="textareaWidth"
                        v-model="ruleForm.remark"
                    ></el-input>
                    <span class="textareaText">0/100</span>
                </el-form-item>
                 <el-form-item label="奖品类型" prop="name">
                    <el-select class="select1" v-model="ruleForm.type" @change='clearVal' placeholder="请选择活动区域">
                        <el-option label="奖品" value="P"></el-option>
                        <el-option label="积分" value="S"></el-option>
                        <el-option label="优惠券" value="C"></el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="奖品" prop="prize">
                    <el-input v-show="ruleForm.type!='S'" class="inputWidth" v-model="ruleForm.prize"></el-input>
                    <el-input v-show="ruleForm.type=='S'" disabled class="inputWidth" v-model="ruleForm.prize"></el-input>
                </el-form-item>
                 <el-form-item label="数量" prop="number">
                    <el-input class="inputWidth" v-model="ruleForm.number"></el-input>
                </el-form-item>
            </span>

            <!-- <span class="box1"> -->
               
                <el-form-item label="活动背景图" label-width="120px">
                    <el-upload
                        :action="`${this.uploadUrl}/image/upload`"
                        list-type="picture-card"
                        id="picDiv"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :on-success="onSuccess"
                        :before-upload="beforeUpload"
                        :on-change="astrict"
                        :data="data1"
                        name="files"
                        :file-list="fileList"
                        :show-file-list="true"
                        :limit="limitCount"
                        accept=".jpg, .jpeg, .png, .JPG, .JPEG"
                        :class="{hide:hideUpload}"
                    >
                        <i class="el-icon-plus" v-if="fileList.length<5"></i>
                    </el-upload>
                    <span style="color:red">图片(最多上传5张图片，单张图片2M以内)</span>
                    <el-dialog :visible.sync="dialogVisible1">
                        <img width="100%" :src="dialogImageUrl" alt />
                    </el-dialog>
                </el-form-item>
                <el-form-item class="center">
                    <el-button class="AllquedingBtn" @click="submit">确定</el-button>
                    <el-button class="theBtn resetButton" @click="reset">重置</el-button>
                </el-form-item>
            <!-- </span> -->
        </el-form>
    </div>
</template>
<script>
import qs from "qs";
export default {
    data() {
        return {
            // 限制结束时间大于开始时间
            pickerOptionsStart: {
                disabledDate: time => {
                    let endDateVal = this.ruleForm.endTime;
                    if (endDateVal) {
                        return time.getTime() > new Date(endDateVal).getTime();
                    }
                }
            },
            pickerOptionsEnd: {
                disabledDate: time => {
                    let beginDateVal = this.ruleForm.startTime;
                    if (beginDateVal) {
                        return (
                            time.getTime() <
                            new Date(beginDateVal).getTime() -
                                1 * 24 * 60 * 1000
                        );
                    }
                }
            },
            flag1: false,

            // 图片上传 start
            data1: {
                token: sessionStorage.getItem("token")
            },
            limitCount: 5,
            hideUpload: false,
            dialogImageUrl: "",
            fileList: [],
            // 图片上传 end
            currentPage: 1,
            resourceCodes: [],
            ruleForm: {
                name: ""
                // region: "",
                // date1: "",
                // date2: "",
                // delivery: false,
                // type: [],
                // resource: "",
                // desc: "",
                // resourceCodes: []
            },
            dialogVisible1: false,
            rules: {}
        };
    },
    created() {
        this.getDetail(); // 活动详情
    },
    methods: {
        // 重置按钮
        reset() {
            this.ruleForm.name = "";
            this.ruleForm.startTime = "";
            this.ruleForm.endTime = "";
            this.ruleForm.remark = "";
            this.ruleForm.type = "";
            this.ruleForm.prize = "";
            this.ruleForm.number = "";
            this.fileList = []; //图片数组
        },
        clearVal(){
          if(this.ruleForm.type=="S"){
            this.ruleForm.prize=''
          }
        },
        // 提交数据
        submit() {
            if (!this.ruleForm.name) {
                return this.$message.error("请填写活动名称");
            }
            if (!this.ruleForm.startTime) {
                return this.$message.error("请选择活动开始时间");
            }
            if (!this.ruleForm.endTime) {
                return this.$message.error("请选择活动结束时间");
            }
             if (!this.ruleForm.type) {
                return this.$message.error("请选择奖品类型");
            }
            if (this.ruleForm.type!="S"){
              if (!this.ruleForm.prize) {
                return this.$message.error("请输入奖品名称");
            }
            }
             
             if (!this.ruleForm.number) {
                return this.$message.error("请输入数量");
            }
            if (this.resourceCodes.length == 0) {
                return this.$message.error("请上传活动活动背景图");
            }

            this.$axios
                .post(
                    "/sys/activity/shake/update",
                    qs.stringify({
                        token: sessionStorage.getItem("token"),
                        id: this.ruleForm.id,
                        name: this.ruleForm.name,
                        startTime: this.$moment(this.ruleForm.startTime).format(
                            "YYYY-MM-DD"
                        ),
                        endTime: this.$moment(this.ruleForm.endTime).format(
                            "YYYY-MM-DD"
                        ),
                        remark: this.ruleForm.remark,
                        type: this.ruleForm.type,
                        number: this.ruleForm.number,
                        prize: this.ruleForm.prize,
                        background: JSON.stringify(this.resourceCodes),
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.getDetail();
                    }
                });
        },
        
       
        
        // 大转盘详情
        getDetail() {
            this.$axios
                .post(
                    "/sys/activity/shake/detail",
                    qs.stringify({
                        token: sessionStorage.getItem("token")
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.ruleForm = res.data.data;
                       
                        if (this.ruleForm.background) {
                            this.fileList = [];
                            this.resourceCodes = JSON.parse(
                                this.ruleForm.background
                            );
                            if (this.resourceCodes.length > 0) {
                                // let url = "http://192.168.1.168:8080";
                                let url = "";
                                for (const i of this.resourceCodes) {
                                    i = {
                                        url: this.uploadUrl + i
                                        // name: "营业执照" + index + ".jpg",
                                        // size: 1*1024*1024
                                    };
                                    this.fileList.push(i);
                                    this.hideUpload =
                                        this.fileList.length >= this.limitCount;
                                }
                            }
                        }
                    } else if (res.data.code === "6666") {
                        this.$message({
                            showClose: true,
                            message: "token异常，请重新登录",
                            type: "error"
                        });
                        const timer = setTimeout(() => {
                            clearTimeout(timer);
                            this.$router.push({ name: "login" });
                        }, 3000);
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });
        },
        // 图片上传start
        astrict(file, fileList) {
            this.hideUpload = fileList.length >= this.limitCount;
        },
        handleRemove(file, fileList) {
            this.hideUpload = fileList.length >= this.limitCount;
            this.resourceCodes = [];
            fileList.forEach(item => {
                if (item.response) {
                    this.resourceCodes.push(item.response.data);
                } else {
                    this.resourceCodes.push(item.url);
                }
            });
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible1 = true;
        },
        onSuccess(response, file, fileList) {
            this.resourceCodes = [];
            fileList.forEach(item => {
                if (item.response) {
                    this.resourceCodes.push(item.response.data);
                } else {
                    this.resourceCodes.push(item.url);
                }
            });
        },
        beforeUpload(file) {
            if (file.size > 2 * 1024 * 1024) {
                return this.$message.error(file.name + "图片超过2M 不允许上传");
            }
        },
        // 图片上传end
    }
};
</script>
<style  scoped>
#turnTable {
    padding: 0 20px;
}
h3 {
    margin-bottom: 20px;
    padding-top: 20px;
}
.inputWidth {
    width: 300px;
}
#turnTable .el-input--prefix .el-input__inner {
    width: 300px;
}
.textareaWidth {
    width: 300px;
    resize: none;
}
.select1 {
    width: 100px;
}
.tablebox {
    /* width: 600px; */
    /* border: 1px solid #ccc; */
    border-collapse: collapse;
    text-align: center;
    font-size: 12px;
    color: #444;
    margin-left: 20px;
}
.number {
    /* border-radius: 6px; */
    border: 1px solid #ccc;
    line-height: 21px;
    outline: none;
    border-radius: 8px;
    width: 80%;
    text-align: center;
}
.tablebox td {
    width: 120px;
    height: 32px;
    border: 1px solid #ccc;
    padding: 5px;
}
.tablebox .el-input {
    text-align: center;
    font-size: 12px;
}
#turnTable .trinput1 {
    width: 80px;
}
.activityTitle {
    padding: 10px 0;
    background-color: #eee;
    /* border-left: 3px solid #e6000b; */
    padding-left: 10px;
    margin-bottom: 15px;
}
.box1 {
    display: block;
    border: 1px solid #dbe0e5;
    margin-bottom: 5px;
    border-top: 1px solid #444;
}
.titleText {
    border-left: 7px solid #e6000b;
    /* display: inline-block; */
    padding-left: 5px;
}
.borderTop {
}
.pageFenye {
    height: 50px;
    line-height: 50px;
    position: relative;
}
.widOne {
    width: 93.3px;
}
.widOne:nth-child(3) {
    margin: 0 5px;
}
.shopsto p,
.shopsto .huoNumzan,
.PromotBtn {
    display: inline-block;
}
.shopsto {
    margin-bottom: 10px;
}
.huoNumzan {
    width: 19px;
}
.PromotBtn {
    position: absolute;
    top: 0;
    left: 0;
}
.el-input {
    font-size: 12px;
}
.el-raido {
    margin-right: 65px;
}
.mgright {
    margin-right: 65px;
}
.textareaText {
    position: absolute;
    top: 20px;
    left: 260px;
    color: #999;
    font-size: 12px;
}
.marginTop {
    margin-top: 15px;
}
</style>