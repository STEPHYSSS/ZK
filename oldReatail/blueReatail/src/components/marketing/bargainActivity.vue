<template>
    <div id="turnTable" class="minimum">
        <h3>砍价</h3>
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
                <el-form-item label="买家范围">
                    <el-radio-group v-model="ruleForm.buyerScope">
                        <el-radio v-model="ruleForm.buyerScope" label="A">全部买家</el-radio>
                        <el-radio v-model="ruleForm.buyerScope" label="M">全部会员</el-radio>
                        <el-radio v-model="ruleForm.buyerScope" label="Z">指定会员</el-radio>
                    </el-radio-group>
                    <el-checkbox-group
                        v-model="checkList"
                        v-if="ruleForm.buyerScope=='Z'"
                        @change="checkMember"
                    >
                        <el-checkbox
                            v-for="(item,index) in memberList"
                            :key="index"
                            :label="item.id"
                        >{{item.name}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </span>

            <span class="box1">
                <div class="activityTitle">
                    <span class="titleText">拼团信息</span>
                </div>
                <!-- <el-form-item label="成团人数" prop="name">
                    <el-input class="inputWidth" v-model="ruleForm.memberNumber"></el-input>
                </el-form-item> -->
                <!-- <el-form-item label="限购数量" prop="name">
                    <el-input class="inputWidth" v-model="ruleForm.limitNumber"></el-input>
                </el-form-item> -->
                <el-form-item label="参加商品" prop="name">
                    <!-- <el-input class="inputWidth" v-model="ruleForm.name"></el-input> -->
                    <el-button class="AllquedingBtn" @click="chooseGoods">选择</el-button>
                </el-form-item>
                <el-table
                    :data="selectGoodsList"
                    v-show="flag1"
                    style="width: 90%"
                    border
                    max-height="300"
                >
                    <el-table-column align="center" prop="code" label="货号"></el-table-column>
                    <el-table-column align="center" prop="name" label="品名"></el-table-column>
                    <el-table-column align="center" prop="salesPrice" label="单品售价"></el-table-column>
                    <el-table-column align="center" prop="floorPrice" label="保底价格">
                        <template slot-scope="{row}">
                            <!-- @input="oninput1(row['discount'], $index)" -->
                            <input
                                type="number"
                                class="number"
                                min="1"
                                maxlength="10"
                                v-model="row['floorPrice']"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="singleMin" label="单次砍价最低价格">
                        <template slot-scope="{row}">
                            <!-- @input="oninput2(row['reduce'], $index)" -->
                            <input
                                type="number"
                                min="1"
                                maxlength="10"
                                class="number"
                                v-model="row['singleMin']"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="singleMax" label="单次砍价最高价格

">
                        <template slot-scope="scope">
                            <input
                                type="number"
                                oninput="value=value.replace(/[^\d]/g,'')"
                                min="1"
                                maxlength="10"
                                class="number"
                                v-model="scope.row.singleMax"
                            />
                        </template>
                    </el-table-column>
                     <el-table-column align="center" prop="bargainNumber" label="参与砍价数量">
                        <template slot-scope="scope">
                            <input
                                type="number"
                                oninput="value=value.replace(/[^\d]/g,'')"
                                min="1"
                                maxlength="10"
                                class="number"
                                v-model="scope.row.bargainNumber"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template scope="scope">
                            <span class="codesty" @click="shopDel(scope.$index,scope.row.code)">删除</span>
                        </template>
                    </el-table-column>
                </el-table>
            </span>
            <span class="box1">
                <div class="activityTitle">
                    <span class="titleText">其他信息</span>
                </div>
                <el-form-item label="分享缩略图" label-width="120px">
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
                <el-form-item label="分享标题">
                    <el-input class="inputWidth" v-model="ruleForm.shareTitle"></el-input>
                    <!-- <span class="textareaText">0/100</span> -->
                </el-form-item>
                <el-form-item label="分享描述">
                    <el-input
                        type="textarea"
                        resize="none"
                        class="textareaWidth"
                        v-model="ruleForm.shareDesc"
                    ></el-input>
                    <span class="textareaText">0/100</span>
                </el-form-item>
                <el-form-item class="center">
                    <el-button class="AllquedingBtn" @click="submit">确定</el-button>
                    <el-button class="theBtn resetButton" @click="reset">重置</el-button>
                </el-form-item>
            </span>
        </el-form>
        <el-dialog title="选择商品" :visible.sync="dialogVisible" width="950px">
            <div class="right" style="width:100%;">
                <div class="shopsto">
                    <el-row style="white-space: nowrap;">
                        <el-col :span="10">
                            <span>商品分类：</span>
                            <p class="widOne">
                                <el-select
                                    v-model="formInline.typeLevel1"
                                    size="mini"
                                    placeholder="请选择"
                                    @change="choose"
                                >
                                    <el-option
                                        v-for="item in TypeLevel1"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.code"
                                    ></el-option>
                                </el-select>
                            </p>
                            <p class="widOne">
                                <el-select
                                    v-model="formInline.typeLevel2"
                                    size="mini"
                                    placeholder="请选择"
                                    @change="choose2"
                                >
                                    <el-option
                                        v-for="item in TypeLevel2"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.code"
                                    ></el-option>
                                </el-select>
                            </p>
                            <p class="widOne">
                                <el-select
                                    v-model="formInline.typeLevel3"
                                    size="mini"
                                    placeholder="请选择"
                                >
                                    <el-option
                                        v-for="item in TypeLevel3"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.code"
                                    ></el-option>
                                </el-select>
                            </p>
                        </el-col>
                        <el-col :span="7" class="TongRight">
                            <span>温层：</span>
                            <p>
                                <el-select type="text" v-model="formInline.temperature">
                                    <el-option
                                        v-for="(item,index) in statu"
                                        :key="index"
                                        :label="item.name"
                                        :value="item.name"
                                        placeholder="请选择"
                                    ></el-option>
                                </el-select>
                            </p>
                        </el-col>
                        <el-col :span="7" class="TongRight">
                            <span>品名：</span>
                            <p>
                                <el-input
                                    type="text"
                                    placeholder="请输入"
                                    v-model="formInline.goodsName"
                                />
                            </p>
                        </el-col>
                    </el-row>
                    <div class="konge"></div>
                    <el-row style="white-space: nowrap;">
                        <el-col :span="18">
                            <span>
                                货
                                <em class="huoNumzan"></em>号：
                            </span>
                            <p style="width: 290px;">
                                <el-input
                                    type="text"
                                    placeholder="请输入"
                                    v-model="formInline.goodsCode"
                                />
                            </p>
                        </el-col>
                        <el-col :span="6" class="TongRight">
                            <el-button @click="queryList" class="theBtn queryButton">查询</el-button>
                            <el-button class="theBtn resetButton" @click="resetCommodity">重置</el-button>
                        </el-col>
                    </el-row>
                </div>
                <div class="tab">
                    <el-table
                        :data="clist"
                        border
                        style="width: 100%"
                        max-height="247"
                        ref="multipleTable1"
                        @select-all="selectAllProduct"
                        @select="commodityList"
                    >
                        <!-- selection-change -->
                        <!-- @select="commodityList" -->
                        <el-table-column type="selection" width="55" class="leftTitle"></el-table-column>
                        <el-table-column align="center" prop="code" label="货号"></el-table-column>
                        <el-table-column align="center" prop="name" label="品名"></el-table-column>
                        <el-table-column align="center" prop="unit" label="单位"></el-table-column>
                        <el-table-column align="center" prop="spec" label="规格"></el-table-column>
                        <el-table-column align="center" prop="salesPrice" label="单品售价"></el-table-column>
                    </el-table>
                </div>
                <!-- 分页 -->
                <div class="pageFenye">
                    <div class="PromotBtn">
                        <el-button class="AllquedingBtn" @click="shopSure">确定</el-button>
                        <el-button class="theBtn resetButton" @click="dialogVisible = false">取消</el-button>
                    </div>
                    <el-pagination
                        @size-change="handleSizeChange1"
                        @current-change="handleCurrentChange1"
                        :current-page="currentPage"
                        :page-sizes="[20,40,60,80]"
                        :page-size="formInline.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="clistTotal"
                    ></el-pagination>
                </div>
            </div>
        </el-dialog>
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

            clist: [], //商品数组
            currentPage: 1,
            // pageSize: 20,
            clistTotal: 0,
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
            dialogVisible: false,
            dialogVisible1: false,
            rules: {},
            statu: [], // 温层
            memberList: [], //会员数组
            checkList: [], //会员
            TypeLevel1: [], //下拉1
            TypeLevel2: [], //下拉2
            TypeLevel3: [], //下拉3
            formInline: {
                typeLevel1: "",
                typeLevel2: "",
                typeLevel3: "",
                goodsCode: "",
                goodsName: "",
                temperature: "",
                token: sessionStorage.getItem("token"),
                pageNum: 1,
                pageSize: 20,
                total: ""
            },
            delList: [],
            selectGoodsList: []
        };
    },
    computed: {
        newClist() {
            return this.clist.filter(item => {
                return this.delList.find(i => item.code === i.code);
            });
        }
    },
    created() {
        this.getDetail(); // 活动详情
        this.query(); //商品数据
        this.assign(); // 会员
        this.getGoodsList(); // 商品分类下拉查询
        this.temperature(); // 温层
    },
    methods: {
        // 重置按钮
        reset() {
            this.ruleForm.name = "";
            this.ruleForm.startTime = "";
            this.ruleForm.endTime = "";
            this.ruleForm.remark = "";
            this.ruleForm.buyerScope = "";
            this.ruleForm.shareTitle = "";
            this.ruleForm.shareDesc = "";
            this.fileList = []; //图片数组
            this.checkList = []; // 会员

            this.selectGoodsList = []; //参加商品
            this.ruleForm.levelList.forEach(item => {
                item.levelId = "";
            });
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
            if (!this.ruleForm.buyerScope) {
                return this.$message.error("请填写买家范围");
            }
            //   会员
            if (this.ruleForm.buyerScope == "Z") {
                if (this.ruleForm.levelList.length == 0) {
                    return this.$message.error("请选择指定会员的类别");
                }
            }

            if (this.selectGoodsList.length == 0) {
                return this.$message.error("请选择参加商品！");
            }
            // 参加商品
            this.ruleForm.goodsList = this.selectGoodsList.map(item => {
                return {
                    goodsCode: item.code,
                    floorPrice: item.floorPrice,
                    singleMin: item.singleMin,
                    singleMax: item.singleMax,
                    bargainNumber: item.bargainNumber
                };
            });
            for (const i of this.ruleForm.goodsList) {
                if (!i.floorPrice) {
                    return this.$message.error("请填写保底价格");
                }
                if (!i.singleMin) {
                    return this.$message.error("请填写单次砍价最低价");
                }
                if (!i.singleMax) {
                    return this.$message.error("请填写单次砍价最高价");
                }
                if(!i.bargainNumber){
                  return this.$message.error("请填写参与砍价数量");
                }
            }
            if (this.resourceCodes.length == 0) {
                return this.$message.error("请上传活动图片");
            }
            
            this.$axios
                .post(
                    "/sys/activity/bargain/update",
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
                        buyerScope: this.ruleForm.buyerScope,
                        shareThumbnail: JSON.stringify(this.resourceCodes),
                        shareTitle: this.ruleForm.shareTitle,
                        shareDesc: this.ruleForm.shareDesc,

                        goodsSet: JSON.stringify(this.ruleForm.goodsList),
                        levelSet: JSON.stringify(this.checkList)
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.getDetail();
                    }
                });
        },
        // 选择商品
        //商品全选
        selectAllProduct(selection) {
            // this.selectGoodsList = selection;
            this.clist.forEach((item, index) => {
                if (selection.length == 0) {
                    item["flag"] = false;
                } else {
                    item["flag"] = true;
                }
            });
            this.selectGoodsList = selection;
            this.goodsShow = false;
        },
        /*  selectAllProduct(selection) {
            console.log(selection);
            // this.ruleForm.goodsList = [];
            // selection.forEach((item, index) => {
            //     this.ruleForm.goodsList.push(item.code);
            // });
            // this.ruleForm.goodsList=selection
        }, */
        // 删除选中的商品数据
        shopDel(index, code) {
            this.delList.push(code);
            this.selectGoodsList.splice(index, 1);
        },
        // 获取商品当前选择行
        commodityList(selection, row) {
            // 勾选的就是true  未勾选就是false
            if (row.flag) {
                // 为true 表示选中状态，点击的话就变成false
                row.flag = false;
            } else {
                row.flag = true;
            }
            if (row.flag) {
                this.selectGoodsList.forEach((item, index) => {
                    if (item.code == row.code) {
                        this.selectGoodsList.splice(index, 1);
                    }
                });
                this.selectGoodsList.push(row);
            } else {
                this.selectGoodsList.forEach((item, index) => {
                    if (item.code == row.code) {
                        this.selectGoodsList.splice(index, 1);
                    }
                });
            }
            this.goodsShow = false;
        },

        // 弹窗确定
        shopSure() {
            this.dialogVisible = false;
            // if (this.ruleForm.goodsList.length > 0) {
            //     this.flag1 = false;
            //     this.flag = true;
            // }
        },
        // 中奖信息切换清空数据
        clearVal(item) {
            item.prize = "";
        },
        // 选择商品弹窗
        chooseGoods() {
            this.query();
            /* this.clist
        .filter(item => {
          return this.delList.find(i => item.code === i.code)
        })
        .forEach(item =>
          this.$nextTick(() => {
            this.$refs.multipleTable1.toggleRowSelection(item, false);

          })
        ); */
            this.flag1 = true;
            this.newClist.forEach(item =>
                this.$nextTick(() => {
                    this.$refs.multipleTable1.toggleRowSelection(item, false);
                })
            );

            this.delList = [];
            // 商品弹窗
            this.dialogVisible = true;
            this.clist.forEach((item, index) => {
                this.selectGoodsList.forEach((i, index2) => {
                    if (item.code == i.code) {
                        item.flag = true;
                        this.$nextTick(() => {
                            this.$refs.multipleTable1.toggleRowSelection(
                                this.clist[index],
                                true
                            );
                        });
                    }
                });
            });
        },

        // 弹窗重置商品列表
        resetCommodity() {
            this.formInline.typeLevel1 = "";
            this.formInline.typeLevel2 = "";
            this.formInline.typeLevel3 = "";
            this.formInline.goodsCode = "";
            this.formInline.goodsName = "";
            this.formInline.temperature = "";
            this.query();
        },
        // 大转盘详情
        getDetail() {
            this.$axios
                .post(
                    "/sys/activity/bargain/detail",
                    qs.stringify({
                        token: sessionStorage.getItem("token")
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.ruleForm = res.data.data;
                        // this.this.ruleForm.resourceCodes=this.ruleForm.bannerImage
                        if (this.ruleForm.goodsList.length > 0) {
                            this.selectGoodsList = this.ruleForm.goodsList.map(
                                item => {
                                    return {
                                        code: item.goodsCode,
                                        name: item.goodsName,
                                        salesPrice: item.salesPrice,
                                        groupLead: item.groupLead,
                                        groupSub: item.groupSub,
                                        floorPrice:item.floorPrice,
                                        groupNumber: item.groupNumber,
                                        singleMax:item.singleMax,
                                        singleMin:item.singleMin,
                                        bargainNumber:item.bargainNumber
                                    };
                                }
                            );
                            this.flag1 = true;
                        }

                        this.checkList = [];
                        // this.checkList=this.ruleForm.levelList
                        if (this.ruleForm.levelList.length > 0) {
                            this.ruleForm.levelList.forEach((item, index) => {
                                this.checkList.push(item.levelId);
                            });
                        }
                        // this.ruleForm.resourceCodes=[]
                        if (this.ruleForm.shareThumbnail) {
                            this.fileList = [];
                            this.resourceCodes = JSON.parse(
                                this.ruleForm.shareThumbnail
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
        // 限制输入的数字小于0
        oninput1(val, index, row) {
            // 验证输入框的值
            if (val < 0 || val > 1)
                return this.$message.error("请输入大于0 小于1的数据");
            this.selectGoodsList[index]["promotePrice"] = parseFloat(
                val * this.selectGoodsList[index]["salesPrice"]
            ).toFixed(2);
            this.selectGoodsList[index]["reduce"] = "";
        },
        oninput2(val, index) {
            // 促销价= 单品售价-val
            // if(this.shopRow.discount){
            //   this.shopRow.promotePrice=this.shopRow.salesPrice*this.shopRow.discount
            //   this.shopRow.reduce=''
            // }
            this.selectGoodsList[index]["promotePrice"] = parseFloat(
                this.selectGoodsList[index]["salesPrice"] - val
            ).toFixed(2);
            this.selectGoodsList[index]["discount"] = "";
            // 折扣=val/单品售价
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
        // 会员级别列表
        assign() {
            let token = sessionStorage.getItem("token");
            this.$axios
                .post(
                    "/sys/member/level",
                    qs.stringify({
                        token: token
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.memberList = res.data.data;
                    }
                });
        },
        // 拿到勾选的会员级别
        checkMember(val) {
            // 把会员等级数组给到定义的levelSet里
            this.ruleForm.levelList = val;
            // this.levelSetShow = false;
        },
        //商品下拉分类
        getGoodsList() {
            this.$axios
                .post(
                    "/sys/goods/type/list",
                    qs.stringify({
                        pcode: "0",
                        token: this.token
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.TypeLevel1 = res.data.data;
                    }
                });
        },
        // 商品分类下拉选1
        choose(value) {
            let code = value;
            this.$axios
                .post(
                    "/sys/goods/type/list",
                    qs.stringify({
                        pcode: code
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.TypeLevel2 = res.data.data;
                    } else {
                        console.log(res.data.msg);
                    }
                });
        },
        // 商品分类下拉选2
        choose2(value) {
            let code = value;
            this.$axios
                .post(
                    "/sys/goods/type/list",
                    qs.stringify({
                        pcode: code
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.TypeLevel3 = res.data.data;
                    } else {
                        console.log(res.data.msg);
                    }
                });
        },

        //商品分类当前页码
        handleCurrentChange1(val) {
            this.formInline.pageNum = val;
            this.query();
        },
        // 选择商品每页数据
        handleSizeChange1(val) {
            this.formInline.pageSize = val;
            this.query();
        },
        //拿到所有的商品数据
        query() {
            this.$axios
                .post("/sys/goods/list", qs.stringify(this.formInline))
                .then(res => {
                    if (res.data.code === "0000") {
                        //把拿到的商品存放到数组里面,分页需要tatal
                        this.clistTotal = res.data.data.total;
                        this.clist = res.data.data.list;
                        this.clist.forEach((item, index) => {
                            // this.clist[index]["discount"] = null;
                            // this.clist[index]["reduce"] = null;
                        });
                        if (this.$refs.multipleTable1) {
                            this.clist.forEach((item, index) => {
                                this.selectGoodsList.forEach((i, index2) => {
                                    if (item.code == i.code) {
                                        item.flag = true;
                                        this.$nextTick(() => {
                                            this.$refs.multipleTable1.toggleRowSelection(
                                                this.clist[index],
                                                true
                                            );
                                        });
                                    }
                                });
                            });
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
                    }
                });
        },
        // 查询商品列表
        queryList() {
            this.query();
        },

        // 获取温层类别
        temperature() {
            this.$axios
                .post(
                    "/sys/dictionary/list",
                    qs.stringify({
                        code: "goods_temperature"
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.statu = res.data.data;
                    }
                });
        }
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