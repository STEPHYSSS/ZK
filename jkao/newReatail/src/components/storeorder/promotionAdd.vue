<template>
    <div class="promotionAdd" id="promotionAdd">
        <div class="content1" id="content1">
            <h4 v-if="$route.query.id">编辑促销</h4>
            <h4 v-else>新增促销</h4>
            <el-form
                :model="addData"
                :rules="rules"
                ref="addData"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-form-item label="促销名称" prop="name" label-width="120px">
                    <p>
                        <el-input
                            type="text"
                            v-model="addData.name"
                            placeholder="请输入促销名称"
                            class="salesinput"
                            style="width:27.5%"
                        ></el-input>
                    </p>
                </el-form-item>
                <el-form-item label="促销开始时间" required class="aa" label-width="120px">
                    <el-col :span="11">
                        <el-form-item prop="startTime" border>
                            <el-date-picker
                                v-model="addData.startTime"
                                type="date"
                                format="yyyy-MM-dd"
                                placeholder="选择开始日期"
                                style="width: 60%;"
                                :picker-options="pickerOptionsStart"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="促销结束时间" required class="aa" label-width="120px">
                    <el-col :span="11">
                        <el-form-item prop="endTime">
                            <el-date-picker
                                v-model="addData.endTime"
                                type="date"
                                format="yyyy-MM-dd"
                                placeholder="选择结束日期"
                                style="width: 60%;"
                                :picker-options="pickerOptionsEnd"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="适用渠道" prop="channel" label-width="120px">
                    <el-checkbox-group v-model="addData.channel">
                        <el-checkbox label="OFF">线下门店</el-checkbox>
                        <!-- <el-checkbox label="ON">线上商城</el-checkbox> -->
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item
                    label="线下门店"
                    prop="offlineStore"
                    label-width="120px"
                    class="preferentialMode"
                >
                    <el-radio-group v-model="addData.offlineStore">
                        <el-radio v-model="addData.offlineStore" label="A">全部门店</el-radio>
                        <el-radio v-model="addData.offlineStore" label="B">部分门店</el-radio>
                    </el-radio-group>&nbsp; &nbsp; &nbsp;
                    <div class="choosePresent1">
                        <span v-if="flag" style="color:red">已选择{{this.storageShop.length}}家</span>
                        &nbsp; &nbsp;
                        <el-button
                            class="AllquedingBtn"
                            @click="choosestore"
                            v-if="addData.offlineStore=='B'"
                        >选择门店</el-button>
                    </div>
                    <br />
                    <span style="color:red;font-size:12px" v-if="shopShow">请选择门店</span>
                </el-form-item>
                <el-form-item label="买家范围" prop="buyerScope" label-width="120px">
                    <el-radio-group v-model="addData.buyerScope">
                        <el-radio v-model="addData.buyerScope" label="A">全部买家</el-radio>
                        <el-radio v-model="addData.buyerScope" label="M">全部会员</el-radio>
                        <el-radio v-model="addData.buyerScope" label="Z" @click="assign">指定会员</el-radio>
                    </el-radio-group>
                    <br />
                    <span style="color:red;font-size:12px" v-if="levelSetShow">请选择会员</span>
                    <!--  会员类别从后台接口渲染 -->
                    <el-checkbox-group
                        v-model="checkList"
                        v-if="addData.buyerScope=='Z'"
                        @change="checkMember"
                    >
                        <el-checkbox
                            v-for="(item,index) in memberList"
                            :key="index"
                            :label="item.id"
                        >{{item.name}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <div>
                    <el-button class="AllquedingBtn" @click="chooseGoods">选择商品</el-button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span
                        v-if="flag1"
                        style="color:red"
                    >已选择&nbsp;{{selectGoodsList.length}}&nbsp;种</span>
                    <br />
                    <span style="color:red;font-size:12px" v-if="goodsShow">请选择商品</span>
                </div>
            </el-form>
            <!-- 部分门店弹出框 -->
            <el-dialog title="选择门店" :visible.sync="dialogTableVisible" width="950px">
                <div class="billMaList">
                    <table id="billInput">
                        <tr>
                            <td class="pinName">
                                <span>门店：</span>
                                <p class="inputConent">
                                    <el-input
                                        type="text"
                                        v-model="ruleForm.code"
                                        placeholder="请输入门店编号"
                                    ></el-input>
                                </p>
                            </td>
                            <td class="barNum">
                                <span>门店类型：</span>
                                <p class="inputConent">
                                    <el-select type="text" v-model="ruleForm.type">
                                        <el-option
                                            v-for="(item,index) in pullShop1"
                                            :key="index"
                                            :label="item.name"
                                            :value="item.value"
                                            placeholder="请选择门店类型"
                                        ></el-option>
                                    </el-select>
                                </p>
                            </td>
                            <div class="billsearch">
                                <el-button @click="chaxun" class="theBtn queryButton">查询</el-button>
                                <el-button class="theBtn resetButton" @click="reset">重置</el-button>
                            </div>
                        </tr>
                    </table>
                    <el-table
                        :data="shopData"
                        ref="multipleTable"
                        style="width: 100%;"
                        max-height="245"
                        border
                        @selection-change="sOption"
                        @select-all="selectAll"
                        :row-key="getRowKeys"
                    >
                        <el-table-column
                            type="selection"
                            :reserve-selection="true"
                            width="55"
                            class="leftTitle"
                        ></el-table-column>
                        <el-table-column label="门店编号" align="center" class="codesty">
                            <template scope="scope">
                                <span>{{scope.row.code}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="门店名称" align="center"></el-table-column>
                        <el-table-column label="所在区域" align="center">
                            <template
                                scope="scope"
                            >{{scope.row.province}}-{{scope.row.city}}-{{scope.row.area}}</template>
                        </el-table-column>
                        <el-table-column label="门店类型" align="center">
                            <template scope="scope">{{scope.row.name}}</template>
                        </el-table-column>
                    </el-table>
                    <div class="konge"></div>
                    <div class="pageFenye">
                        <el-button class="AllquedingBtn" @click="amountShop">确定</el-button>
                        <el-button class="theBtn resetButton" @click="dialogTableVisible=false">取消</el-button>
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="pageNum"
                            :page-sizes="[20, 40, 60, 80]"
                            :page-size="ruleForm.pageSize"
                            background
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="shopDataTotal"
                            class="pagination"
                        ></el-pagination>
                    </div>
                </div>
            </el-dialog>
            <!-- 选择商品弹窗 -->
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
                            :page-size="formData.pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="clistTotal"
                        ></el-pagination>
                    </div>
                </div>
            </el-dialog>
            <!-- 选择商品后渲染到页面 -->
            <div class="tab" v-if="flag1">
                <el-table :data="selectGoodsList" style="width: 90%" border max-height="300">
                    <el-table-column align="center" prop="code" label="货号"></el-table-column>
                    <el-table-column align="center" prop="name" label="品名"></el-table-column>
                    <el-table-column align="center" prop="salesPrice" label="单品售价"></el-table-column>
                    <el-table-column align="center" prop="discount" label="折扣">
                        <template slot-scope="{row, $index}">
                            <input
                                type="number"
                                @input="oninput1(row['discount'], $index)"
                                class="number"
                                min="0"
                                max="3"
                                v-model="row['discount']"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="reduce" label="减价">
                        <template slot-scope="{row, $index}">
                            <input
                                type="number"
                                @input="oninput2(row['reduce'], $index)"
                                min="0"
                                max="99999"
                                class="number"
                                v-model="row['reduce']"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="促销价" prop="promotePrice">
                        <template slot-scope="scope">
                            <span>{{scope.row['promotePrice']}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="totalQuota" label="总限购量">
                        <template slot-scope="scope">
                            <input
                                type="number"
                                oninput="value=value.replace(/[^\d]/g,'')"
                                min="1"
                                max="99999999"
                                class="number"
                                v-model="scope.row.totalQuota"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="orderQuota" label="每单限购量">
                        <template slot-scope="scope">
                            <input
                                type="number"
                                oninput="value=value.replace(/[^\d]/g,'')"
                                min="1"
                                max="99999999"
                                class="number"
                                v-model="scope.row.orderQuota"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="everyoneQuota" label="每人限购量">
                        <template slot-scope="scope">
                            <input
                                type="number"
                                oninput="value=value.replace(/[^\d]/g,'')"
                                min="1"
                                max="99999999"
                                class="number"
                                v-model="scope.row.everyoneQuota"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template scope="scope">
                            <span class="codesty" @click="shopDel(scope.$index,scope.row.code)">删除</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="billsearch">
                <el-button class="AllquedingBtn" @click="queding('addData')">确定</el-button>
                <el-button class="theBtn resetButton" @click="returnPage">返回</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import qs from "qs";
export default {
    name: "promotionAdd",
    data() {
        return {
            // 限制结束时间大于开始时间
            pickerOptionsStart: {
                disabledDate: time => {
                    let endDateVal = this.addData.endTime;
                    if (endDateVal) {
                        return time.getTime() > new Date(endDateVal).getTime();
                    }
                }
            },
            pickerOptionsEnd: {
                disabledDate: time => {
                    let beginDateVal = this.addData.startTime;
                    if (beginDateVal) {
                        return (
                            time.getTime() <
                            new Date(beginDateVal).getTime() -
                                1 * 24 * 60 * 1000
                        );
                    }
                }
            },
            getRowKeys(row) {
                return row.code;
            },
            getGoodsCode(row) {
                return row.code;
            },
            selectGoodsList: [], // 选择的商品列表
            //存储选中的门店列表
            storageShop: [],
            currentPage: 1,
            pagesizes: 20,
            formData: {
                pageNum: 1,
                pageSize: 20,
                total: 400
            }, //存放门店列表
            ruleForm: {
                name: "",
                type: [],
                pageNum: 1,
                pageSize: 20,
                token: sessionStorage.getItem("token")
            },
            commodityList1: "",
            // 定义标签，默认不显示已选择的门店数量
            flag: false,
            flag1: false, // 默认不展示商品列表
            flag2: false,
            clist: [],
            clistTotal: 0,
            shopData: [], // 门店数组
            shopDataTotal: 0,
            shopData1: [],
            statu: [], // 温层
            delList: [],
            // 新增促销提交参数
            addData: {
                token: sessionStorage.getItem("token"),
                name: "",
                startTime: "",
                endTime: "",
                offlineStore: "A",
                buyerScope: "",
                levelSet: [],
                channel: ["OFF"],
            },
            storeSet: [],
            goodsSet: [],
            pageNum: 1,
            dialogTableVisible: false,
            dialogVisible: false,
            shopShow: false,
            goodsShow: false,
            levelSetShow: false,
            num: true,
            num1: false,
            checkList: [],
            tableData: [],
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入活动名称",
                        trigger: "blur"
                    },
                    {
                        min: 1,
                        max: 50,
                        message: "长度在 1 到 50 个字符",
                        trigger: "blur"
                    }
                ],
                startTime: [
                    {
                        required: true,
                        message: "请选择活动开始时间",
                        trigger: "blur"
                    }
                ],
                endTime: [
                    {
                        required: true,
                        message: "请选择活动结束时间",
                        trigger: "blur"
                    }
                ],
                channel: [
                      { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'blur' }
                ],
                offlineStore: [
                    {
                        required: true,
                        message: "请选择线下门店",
                        trigger: "change"
                    }
                ],
                buyerScope: [
                    {
                        required: true,
                        message: "请选择买家范围",
                        trigger: "change"
                    }
                ]
            },
            TypeLevel1: [],
            TypeLevel2: [],
            TypeLevel3: [],
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
            memberList: [],

            pullShop1: [],
            number: [],
            shopRow: {}
        };
    },
    created() {
        this.getlist(); // 查询门店列表
        this.getGoodsList(); // 商品分类查询
        this.query(); // 选择商品查询
        this.assign(); // 会员级别列表
        this.pullShop(); // 获取门店下拉选
        this.temperature(); // 获取温层
        this.editDtetails();
    },
    computed: {
        newClist() {
            return this.clist.filter(item => {
                return this.delList.find(i => item.code === i.code);
            });
        }
    },
    methods: {
        // 编辑页面请求参数
        editDtetails() {
            if (this.$route.query.id) {
            //   this.addData.channel=[]
                // let id = sessionStorage.getItem("id");
                // console.log(id)
                this.$axios
                    .post(
                        "/sys/promote/modify/detail",
                        qs.stringify({
                            token: sessionStorage.getItem("token"),
                            promoteId: sessionStorage.getItem("id")
                        })
                    )
                    .then(res => {
                        if (res.data.code === "0000") {
                        //   this.addData.channel=[]
                            // this.addData = res.data.data.promote;
                            this.addData.name=res.data.data.promote.name
                            this.addData.startTime=res.data.data.promote.startTime
                             this.addData.endTime=res.data.data.promote.endTime
                              this.addData.offlineStore=res.data.data.promote.offlineStore
                               this.addData.buyerScope=res.data.data.promote.buyerScope
                            //    if(res.data.data.promote.channel){
                            //      this.addData.channel=JSON.parse(res.data.data.promote.channel)
                            //    }
                            
                
                            this.storageShop = res.data.data.storeList.map(
                                item => {
                                    return {
                                        code: item.storeCode
                                    };
                                }
                            );
                            this.addData.levelSet = res.data.data.levelList;
                            this.checkList = [];
                            this.addData.levelSet = res.data.data.levelList;
                            this.checkList = this.addData.levelSet;
                            this.selectGoodsList = res.data.data.goodsList.map(
                                item => {
                                    return {
                                        code: item.goodsCode,
                                        name: item.goodsName,
                                        discount: item.discount,
                                        reduce: item.reduce,
                                        totalQuota: item.totalQuota,
                                        orderQuota: item.orderQuota,
                                        everyoneQuota: item.everyoneQuota,
                                        promotePrice: item.promotePrice,
                                        id: item.id,
                                        promoteId: item.promoteId,
                                        // promotePrice: item.promotePrice,
                                        salesPrice: item.salesPrice,
                                        type: item.type,
                                        unit: item.unit
                                    };
                                }
                            );
                            console.log(this.selectGoodsList)
                            if (this.addData.offlineStore == "B") {
                                this.flag = true;
                            }
                            this.flag1 = true;
                            this.flag2 = true;
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
            }
        },
        // 确定提交
        queding(addData) {
            this.$refs[addData].validate(valid => {
                if (valid) {
                    this.goodsSet = this.selectGoodsList.map(item => {
                        return {
                            goodsCode: item.code,
                            discount: item.discount,
                            reduce: item.reduce,
                            totalQuota: item.totalQuota,
                            orderQuota: item.orderQuota,
                            everyoneQuota: item.everyoneQuota,
                            // promotionPrice:item.promotionPrice,
                            name: item.name,
                            code: item.code
                        };
                    });
                    for (const i of this.goodsSet) {
                        if (!i.discount && !i.reduce) {
                            return this.$message("请填写完整");
                        }
                    }
                    for (let i = 0; i < this.addData.levelSet.length; i++) {
                        this.addData.levelSet[i] += "";
                    }
                    // 门店
                    this.storeSet = [];
                    for (const i of this.storageShop) {
                        this.storeSet.push(i.code);
                    }
                    //门店
                    if (this.addData.offlineStore == "B") {
                        if (this.storeSet.length == 0) {
                            this.shopShow = true;
                            return;
                        } else if (this.storeSet.length > 0) {
                            this.shopShow = false;
                        }
                    }

                    //会员
                    if (this.addData.buyerScope == "Z") {
                        if (this.addData.levelSet == 0) {
                            return (this.levelSetShow = true);
                        } else if (this.addData.levelSet > 0) {
                            this.levelSetShow = false;
                        }
                    }
                    //商品
                    if (this.goodsSet.length == 0) {
                        return (this.goodsShow = true);
                    } else if (this.goodsSet.length > 0) {
                        this.goodsShow = false;
                    }

                    // 提交数据，发请求
                    let obj = {
                        goodsSet: JSON.stringify(this.goodsSet),
                        storeSet: JSON.stringify(this.storeSet),
                        token: sessionStorage.getItem("token"),
                        name: this.addData.name,
                        startTime: this.$moment(this.addData.startTime).format(
                            "YYYY-MM-DD"
                        ),
                        endTime: this.$moment(this.addData.endTime).format(
                            "YYYY-MM-DD"
                        ),
                        offlineStore: this.addData.offlineStore,
                        buyerScope: this.addData.buyerScope,
                        levelSet: JSON.stringify(this.addData.levelSet),
                        // channel:JSON.stringify(this.addData.channel)
                    };
                    if (this.$route.query.id) {
                        obj.id = sessionStorage.getItem("id");
                        this.$axios
                            .post(
                                "/sys/promote/modify/update",
                                qs.stringify(obj)
                            )
                            .then(res => {
                                if (res.data.code === "0000") {
                                    this.$router.push({
                                        name: "productSales"
                                    });
                                } else if (res.data.code !== "0000") {
                                    this.$message.error(res.data.msg);
                                }
                            });
                    } else {
                        this.$axios
                            .post("/sys/promote/modify/add", qs.stringify(obj))
                            .then(res => {
                                if (res.data.code === "0000") {
                                    this.$router.push({
                                        name: "productSales"
                                    });
                                } else {
                                    this.$message.error(res.data.msg);
                                }
                            });
                    }
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        // 拿到勾选的会员级别
        checkMember(val) {
            // 把会员等级数组给到定义的levelSet里
            this.addData.levelSet = val;
            this.levelSetShow = false;
        },
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
        // 点击确定按钮，把选中的门店数量显示到页面
        amountShop() {
            this.dialogTableVisible = false;
            this.flag = true;
        },
        // 获取门店当前选择的行
        sOption(row) {
            this.storageShop = row;
            this.shopShow = false;
        },
        //门店全选
        selectAll(selection) {
            this.storageShop = selection;
            this.shopShow = false;
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
        },
        // 获取门店类型下拉选
        pullShop() {
            this.$axios
                .post(
                    "/sys/dictionary/list",
                    qs.stringify({
                        code: "store_type_select"
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.pullShop1 = res.data.data;
                    }
                });
        },
        choosestore() {
            // 门店弹窗
            this.dialogTableVisible = true;
            if (this.$route.query.id) {
                this.shopData.forEach((item, index) => {
                    this.storageShop.forEach((i, index2) => {
                        if (item.code == i.code) {
                            this.$nextTick(() => {
                                //将门店里列表中对应的项选中
                                this.$refs.multipleTable.toggleRowSelection(
                                    this.shopData[index],
                                    true
                                );
                            });
                        }
                    });
                });
            }
        },
        // 获取门店列表
        getlist() {
            let token = sessionStorage.getItem("token");
            this.$axios
                .post("/public/store/list", qs.stringify(this.ruleForm))
                .then(res => {
                    if (res.data.code === "0000") {
                        this.shopDataTotal = res.data.data.total;
                        this.shopData = res.data.data.list;
                        if (this.$refs.multipleTable) {
                            this.shopData.forEach((item, index) => {
                                this.storageShop.forEach((i, index2) => {
                                    if (item.code == i.code) {
                                        this.$nextTick(() => {
                                            this.$refs.multipleTable.toggleRowSelection(
                                                this.shopData[index],
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

        // 限制输入的数字小于0
        oninput1(val, index, row) {
            // 验证输入框的值
            if (val < 0 || val > 1)
                return this.$message.error("请输入大于0 小于1的数据");
            this.selectGoodsList[index]["promotePrice"] = parseFloat(
                val * this.selectGoodsList[index]["salesPrice"]
            ).toFixed(2);
            this.selectGoodsList[index]["reduce"] = "";

            // this.selectGoodsList[index].promotePrice = parseFloat(
            //   val * this.selectGoodsList[index].salesPrice
            // ).toFixed(2);
            // this.selectGoodsList[index].reduce = "";

            // console.log(this.selectGoodsList[index]['reduce'])
            // row.promotePrice=parseFloat(val*row.salesPrice).toFixed(2)
            // console.log(row.promotePrice)
            // row.reduce=''
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
        // 删除选中的商品数据
        shopDel(index, code) {
            this.delList.push(code);
            this.selectGoodsList.splice(index, 1);
        },
        // 获取选择商品当前的行
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
        // 选择商品的确定
        shopSure() {
            this.dialogVisible = false;
            this.flag1 = true;
        },
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
        //商品分类
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
        // 重置商品列表
        resetCommodity() {
            this.formInline.typeLevel1 = "";
            this.formInline.typeLevel2 = "";
            this.formInline.typeLevel3 = "";
            this.formInline.goodsCode = "";
            this.formInline.goodsName = "";
            this.formInline.temperature = "";
            this.query();
        },
        // 查询商品列表
        queryList() {
            this.query();
        },
        // 商品弹窗
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
                            this.clist[index]["totalQuota"] = "999999999";
                            this.clist[index]["orderQuota"] = "999";
                            this.clist[index]["everyoneQuota"] = "99";
                            // this.clist[index]["promotePrice"] = null;
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
        // 门店查询
        chaxun() {
            this.getlist();
        },
        // 门店重置
        reset() {
            this.ruleForm.type = "";
            this.ruleForm.code = "";
            this.getlist();
        },

        //分页
        // 查询门店每页的数据
        handleSizeChange(val) {
            this.ruleForm.pageSize = val;
            this.getlist(); //
        },
        // // 门店当前页码
        handleCurrentChange(val) {
            this.ruleForm.pageNum = val;
            this.getlist();
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
        returnPage() {
            this.$router.push({
                name: "productSales"
            });
        }
    },

    filters: {
        statusTip(value) {
            if (value == "1") {
                return "待提交";
            } else if (value == "2") {
                return "备货中";
            } else if (value == "3") {
                return "部分验收";
            } else if (value == "4") {
                return "全部验收";
            }
        }
    }
};
</script>

<style scoped>
#promotionAdd {
    min-width: 1700px;
    background-color: #fff;
    box-sizing: border-box;
    box-shadow: 0px 2px 10px #ccc;
    height: 100%;
}
#promotionAdd .content1 .el-form-item__label {
    width: 125px;
}
#promotionAdd .content1 {
    background-color: #fff;
    margin: 0px 10px;
    padding: 15px;
}
/* .aa{
   width: 125px;
} */
#promotionAdd .el-form-item__content {
    margin-left: 150px;
}
#promotionAdd .submit {
    background-color: #01c8dc;
    color: #fff;
}
/* #promotionAdd .submit1 {
  margin-left: -205px;
  margin-bottom: 10px;
} */
#promotionAdd .pinName {
    text-align: left;
}
#promotionAdd .reset {
    background-color: #fff;
    border: 1px solid #01c8dc;
    color: #01c8dc;
}
#promotionAdd .billsearch {
    text-align: center;
}
#promotionAdd .billMaList {
    padding-left: 35px;
    padding-right: 30px;
}
#promotionAdd .pagination {
    float: right;
}
#promotionAdd .title {
    color: #888;
    text-align: center;
    margin-bottom: 15px;
}
#promotionAdd .shopSel,
.shopSta,
.shopSelect {
    display: inline-block;
}
#promotionAdd .shopInp .shopSel {
    width: 100%;
}
/*商品分类第二个下拉选*/
#promotionAdd .shopSel .shopSel1 {
    margin: 0 5px;
}
#promotionAdd .shopSel .shopSelect {
    width: 20%;
}
#promotionAdd .shopInp {
    width: 100%;
}
#promotionAdd .shopList {
    display: inline-block;
    width: 29%;
    margin-left: 10px;
}
#promotionAdd .shopList .shopscan {
    width: 77%;
    display: inline-block;
}
#promotionAdd .shopList2 {
    width: 30%;
    text-align: left;
    display: inline-block;
    margin-left: auto;
}
#promotionAdd .shopList2 .shopscan2 {
    width: 75%;
    margin-right: 9px;
    display: inline-block;
}
#promotionAdd .shopscan2 {
    margin-left: 10px;
    display: inline-block;
    width: 80%;
}
#promotionAdd .pr {
    display: inline-block;
}
#promotionAdd .pr .el-button {
    margin-left: 15px;
}
#promotionAdd #billInput {
    width: 100%;
}
#promotionAdd .inputConent {
    display: inline-block;
    width: 250px;
}
#promotionAdd .el-input__inner {
    border: 1px solid #ccc;
    width: 220px;
}
#promotionAdd #content1 .el-input__inner {
    border: 1px solid #ccc;
}
#promotionAdd .salesinput::-webkit-input-placeholder {
    color: #ccc;
}
#promotionAdd .tab {
    clear: both;
    margin-top: 10px;
}
#promotionAdd .choosePresent1 {
    position: absolute;
    display: inline-block;
    top: 0px;
}
#promotionAdd .preferentialMode {
    position: relative;
}
#promotionAdd .number {
    /* border-radius: 6px; */
    border: 1px solid #ccc;
    line-height: 21px;
    outline: none;
    border-radius: 8px;
    width: 80%;
    text-align: center;
}
#promotionAdd .pageFenye {
    height: 50px;
    line-height: 50px;
    position: relative;
}
#promotionAdd .widOne {
    width: 93.3px;
}
#promotionAdd .widOne:nth-child(3) {
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
</style>
