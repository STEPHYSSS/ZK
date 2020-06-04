<template>
    <div class="promotionAdd">
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
      <el-breadcrumb-item :to="{ path: '/operatIndex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>促销中心</el-breadcrumb-item>
      <el-breadcrumb-item>买赠活动</el-breadcrumb-item>
        </el-breadcrumb>-->
        <div class="buyScoll">
            <div class="content1" id="content1">
                <h4 v-if="$route.query.id">买赠促销</h4>
                <h4 v-else>新增促销</h4>
                <el-form
                    :model="addData"
                    :rules="rules"
                    ref="addData"
                    label-width="100px"
                    class="demo-ruleForm"
                >
                    <el-form-item
                        label="活动方式"
                        prop="activeMode"
                        :rules="[
        { required: true, message: '请选择活动方式'}
        ]"
                    >
                        <!-- <el-radio-group v-model="addData.activeMode"> -->
                        <el-radio v-model="addData.activeMode" label="E" @change="changeE">满额送</el-radio>
                        <el-radio v-model="addData.activeMode" label="J" @change="changeJ">满件送</el-radio>
                        <el-radio v-model="addData.activeMode" label="S" @change="changeS">买就送</el-radio>
                        <el-radio v-model="addData.activeMode" label="A" @change="changeA">买A送A</el-radio>
                        <!-- </el-radio-group> -->
                    </el-form-item>
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
                        class="preferentialMode"
                        prop="offlineStore"
                        label-width="120px"
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
                            <el-radio
                                v-model="addData.buyerScope"
                                label="Z"
                                @click="assign"
                                :rules="[
      { required: true, message: '请勾选会员级别'},
    ]"
                            >指定会员</el-radio>
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
                        <!-- <el-button type="success" @click="chooseGoods">选择商品</el-button> -->
                    </el-form-item>
                    <el-form-item
                        label="优惠方式"
                        class="preferentialMode"
                        prop="preferentialMode"
                        label-width="120px"
                    >
                        <div class="first" v-if="addData.activeMode=='E'">
                            <!-- 满额送 -->
                            消费满
                            <input
                                type="number"
                                class="number"
                                min="1"
                                max="999999"
                                v-model="addData.fullMoney"
                            />元送
                            <input
                                type="number"
                                class="number"
                                min="1"
                                max="999999"
                                v-model="numberList.number1"
                            />件赠品
                            <el-checkbox
                                v-model="noCelling.notCapping1"
                                true-label="Y"
                                false-label="N"
                            >上不封顶</el-checkbox>
                        </div>
                        <!-- 满件送 -->
                        <div class="second" v-if="addData.activeMode=='J'">
                            消费满
                            <input
                                type="number"
                                class="number"
                                min="1"
                                max="999999"
                                v-model="manyPieces.manyPieces1"
                            />件送
                            <input
                                type="number"
                                class="number"
                                min="1"
                                max="999999"
                                v-model="numberList.number2"
                            />件赠品
                            <el-checkbox
                                v-model="noCelling.notCapping2"
                                true-label="Y"
                                false-label="N"
                            >上不封顶</el-checkbox>
                        </div>
                        <!-- 买就送 -->
                        <div class="third" v-if="addData.activeMode=='S'">
                            送
                            <input
                                type="number"
                                class="number"
                                min="1"
                                max="999999"
                                v-model="numberList.number3"
                            />件赠品
                        </div>
                        <!-- 买A送A -->
                        <div class="fourth" v-if="addData.activeMode=='A'">
                            消费满
                            <input
                                type="number"
                                class="number"
                                min="1"
                                max="999999"
                                v-model="manyPieces.manyPieces2"
                            />件送
                            <input
                                type="number"
                                class="number"
                                min="1"
                                max="999999"
                                v-model="numberList.number4"
                            />件赠品
                        </div>
                        <div class="choosePresent" v-if="addData.activeMode!=='A'">
                            <span v-if="flag3" style="color:red">已选择{{this.giveGoodsList.length}}种</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <el-button class="AllquedingBtn" @click="choosePresent">选择赠品</el-button>
                        </div>
                        <br />
                        <span style="color:red;font-size:12px" v-if="giveGoodsSetShow">请选择赠品</span>
                    </el-form-item>
                    <el-form-item
                        label="商品范围"
                        label-width="120px"
                        :rules="[
      { required: true, message: '请选择商品范围'}
      ]"
                    >
                        <el-radio-group v-model="addData.goodsScope">
                            <el-radio v-model="addData.goodsScope" label="A">全部商品</el-radio>
                            <el-radio v-model="addData.goodsScope" label="B">部分商品</el-radio>
                        </el-radio-group>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span
                            v-if="flag1"
                            style="color:red"
                        >已选择{{selectGoodsList.length}}种</span>
                    </el-form-item>
                    <el-button
                        class="AllquedingBtn"
                        @click="chooseGoods"
                        v-if="addData.goodsScope=='B'"
                    >选择商品</el-button>
                    <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span
                        style="color:red;font-size:12px"
                        v-if="goodsShow"
                    >请选择商品</span>
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
                            ref="multipleTable"
                            :data="shopData"
                            style="width: 100%;"
                            max-height="300"
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
                        <div class="pageFenye">
                            <div class="PromotBtn">
                                <el-button class="AllquedingBtn" @click="amountShop">确定</el-button>
                                <el-button
                                    class="theBtn resetButton"
                                    @click="dialogTableVisible = false"
                                >取消</el-button>
                            </div>
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
                                max-height="300"
                                @select="commodityList"
                                ref="multipleTable1"
                                @select-all="selectAllProduct"
                            >
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
                            <div class="PromotBtn2">
                                <el-button type="success" class="AllquedingBtn" @click="shopSure">确定</el-button>
                                <el-button
                                    class="theBtn resetButton"
                                    @click="dialogVisible = false"
                                >取消</el-button>
                            </div>
                            <el-pagination
                                @size-change="handleSizeChange1"
                                @current-change="handleCurrentChange1"
                                :current-page="currentPage"
                                :page-sizes="[20, 40, 60, 80]"
                                :page-size="formData.pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="clistTotal"
                            ></el-pagination>
                        </div>
                    </div>
                </el-dialog>
                <!-- 选择赠品弹窗 -->
                <el-dialog title="选择赠品" :visible.sync="centerDialogVisible" width="950px">
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
                                max-height="300"
                                @selection-change="giveGoods"
                                ref="multipleTable1"
                                @select-all="selectAllGiveProduct"
                                :row-key="getGoodsCode"
                            >
                                <el-table-column
                                    type="selection"
                                    width="55"
                                    class="leftTitle"
                                    :reserve-selection="true"
                                ></el-table-column>
                                <el-table-column align="center" prop="code" label="货号"></el-table-column>
                                <el-table-column align="center" prop="name" label="品名"></el-table-column>
                                <el-table-column align="center" prop="unit" label="单位"></el-table-column>
                                <el-table-column align="center" prop="spec" label="规格"></el-table-column>
                                <el-table-column align="center" prop="salesPrice" label="单品售价"></el-table-column>
                            </el-table>
                        </div>
                        <!-- 分页 -->
                        <div class="pageFenye">
                            <div class="PromotBtn2">
                                <el-button
                                    type="success"
                                    class="AllquedingBtn"
                                    @click="shopSure1"
                                >确定</el-button>
                                <el-button
                                    class="theBtn resetButton"
                                    @click="centerDialogVisible = false"
                                >取消</el-button>
                            </div>
                            <el-pagination
                                @size-change="handleSizeChange1"
                                @current-change="handleCurrentChange1"
                                :current-page="currentPage"
                                :page-sizes="[20, 40, 60, 80]"
                                :page-size="formData.pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="clistTotal"
                            ></el-pagination>
                        </div>
                    </div>
                </el-dialog>
                <!-- 选择商品后渲染到页面 -->
                <div class="tab" v-if="flag1">
                    <el-table :data="selectGoodsList" border style="width: 90%">
                        <el-table-column align="center" prop="code" label="货号"></el-table-column>
                        <el-table-column align="center" prop="name" label="品名"></el-table-column>
                        <el-table-column align="center" prop="salesPrice" label="单品售价"></el-table-column>
                        <el-table-column align="center" prop="unit" label="单位"></el-table-column>
                        <!-- <el-table-column align="center" label="操作">
            <el-button @click="shopDel()">删除</el-button>
                        </el-table-column>-->
                        <el-table-column label="操作" align="center">
                            <template scope="scope">
                                <span
                                    class="codesty"
                                    @click="shopDel(scope.$index,scope.row.code)"
                                >删除</span>
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
    </div>
</template>

<script>
import qs from "qs";
import { log } from "util";
export default {
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
            giveGoodsList: [], //选择的赠品数组
            //存储选中的门店列表
            storageShop: [],
            currentPage: 1,
            pagesizes: 10,
            formData: {
                pageNum: 1,
                pageSize: 20,
                total: 400
            }, //存放门店列表
            ruleForm: {
                name: "",
                type: [],
                checked: true,
                pageNum: 1,
                pageSize: 20,
                token: sessionStorage.getItem("token")
            },
            // 定义标签，默认不显示已选择的门店数量
            flag: false,
            flag1: false, // 默认不展示商品列表
            flag2: false,
            flag3: false,
            flag4: false,
            clist: [],
            clistTotal: 0,
            // 上不封顶
            noCelling: {
                notCapping1: "N",
                notCapping2: "N"
            },
            //送X件
            numberList: {
                number1: "",
                number2: "",
                number3: "",
                number4: ""
            },
            //满X件
            manyPieces: {
                manyPieces1: "",
                manyPieces2: ""
            },
            shopData: [], // 门店数组
            shopDataTotal: 0,
            shopData1: [],
            statu: [], // 温层
            // 新增促销提交参数
            addData: {
                token: sessionStorage.getItem("token"),
                name: "", //促销名称
                startTime: "", //促销开始时间
                endTime: "", //促销结束时间
                offlineStore: "A", //线下门店
                buyerScope: "", //买家范围
                levelSet: [], //会员等级ID
                goodsScope: "A", //商品范围
                preferentialMode: "", // 优惠方式
                // number: "", // 第X件
                notCapping: "", //上不封顶
                activeMode: "E", //活动方式
                givePiece: "", //送X件
                fullMoney: "", //满X元
                fullPiece: "", //满X件
                channel: ["OFF"]
            },
            storeSet: [], // 后台门店编号数组
            goodsSet: [], //后台商品存放数组
            giveGoodsSet: [], // 后台赠品数组
            pageNum: 1,
            dialogTableVisible: false, // 门店弹框
            dialogVisible: false, // 商品弹框
            shopShow: false,
            goodsShow: false,
            levelSetShow: false,
            giveGoodsSetShow: false,
            centerDialogVisible: false, //赠品弹窗
            checkList: [],
            tableData: [],
            rules: {
                name: [
                    // 促销名称验证
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
                    //活动开始时间
                    {
                        required: true,
                        message: "请选择活动开始时间",
                        trigger: "blur"
                    }
                ],
                channel: [
                    {
                        type: "array",
                        required: true,
                        message: "请至少选择一个活动性质",
                        trigger: "blur"
                    }
                ],
                endTime: [
                    //活动开始时间
                    {
                        required: true,
                        message: "请选择活动结束时间",
                        trigger: "blur"
                    }
                ],
                offlineStore: [
                    //线下门店
                    {
                        required: true,
                        message: "请选择线下门店",
                        trigger: "change"
                    }
                ],
                buyerScope: [
                    //买家范围
                    {
                        required: true,
                        message: "请选择买家范围",
                        trigger: "change"
                    }
                ]
                // preferentialMode: [
                //   { required: true, message: "请选择优惠方式", trigger: "change" }
                // ]
            },
            //商品分类下拉选
            TypeLevel1: [],
            TypeLevel2: [],
            TypeLevel3: [],
            formInline: {
                typeLevel1: "",
                typeLevel2: "",
                typeLevel3: "",
                goodsCode: "", //货号
                goodsName: "", //品名
                temperature: "", //温层
                token: sessionStorage.getItem("token"),
                pageNum: 1,
                pageSize: 20,
                total: ""
            },
            memberList: [], // 会员级别列表

            pullShop1: [], //门店类型下拉
            number: [],
            delList: []
        };
    },
    created() {
        this.getGoodsList(); // 商品分类查询
        this.query(); // 选择商品查询
        this.assign(); // 会员级别列表
        this.pullShop(); // 获取门店下拉选
        this.temperature(); // 获取温层
        this.editDtetails();
        this.getlist(); // 查询门店列表
    },
    computed: {
        newClist() {
            return this.clist.filter(item => {
                return this.delList.find(i => item.code === i.code);
            });
        }
    },
    methods: {
        //编辑数据的详情
        editDtetails() {
            if (this.$route.query.id) {
                let id = sessionStorage.getItem("id");
                this.$axios
                    .post(
                        "/sys/promote/give/detail",
                        qs.stringify({
                            token: sessionStorage.getItem("token"),
                            promoteId: id
                        })
                    )
                    .then(res => {
                        if (res.data.code === "0000") {
                            this.addData = res.data.data.promote;
                            // if (this.addData.channel) {
                            //     this.addData.channel = JSON.parse(
                            //         this.addData.channel
                            //     );
                            // }
                            this.addData.levelSet = res.data.data.levelList;
                            // 会员数组重复
                            this.checkList = [];
                            this.checkList = this.addData.levelSet;
                            this.selectGoodsList = res.data.data.goodsList.map(
                                item => {
                                    return {
                                        code: item.goodsCode,
                                        name: item.goodsName,
                                        salesPrice: item.salesPrice,
                                        unit: item.unit
                                    };
                                }
                            );
                            this.storageShop = res.data.data.storeList.map(
                                item => {
                                    return {
                                        code: item.storeCode
                                    };
                                }
                            );
                            this.giveGoodsList = res.data.data.giveGoodsList.map(
                                item => {
                                    return {
                                        code: item.goodsCode
                                    };
                                }
                            );
                            if (this.addData.activeMode === "E") {
                                this.numberList.number1 = this.addData.givePiece;
                                this.noCelling.notCapping1 = this.addData.notCapping;
                            } else if (this.addData.activeMode === "J") {
                                this.manyPieces.manyPieces1 = this.addData.fullPiece;
                                this.numberList.number2 = this.addData.givePiece;
                                this.noCelling.notCapping2 = this.addData.notCapping;
                            } else if (this.addData.activeMode === "S") {
                                this.numberList.number3 = this.addData.givePiece;
                            } else if (this.addData.activeMode === "A") {
                                this.manyPieces.manyPieces2 = this.addData.fullPiece;
                                this.numberList.number4 = this.addData.givePiece;
                            }
                            if (this.addData.offlineStore == "B") {
                                this.flag = true;
                            }
                            if (this.addData.goodsScope == "B") {
                                this.flag1 = true;
                            }
                            // this.flag1 = true;
                            this.flag2 = true;
                            this.flag3 = true;
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
            // 表单验证
            this.$refs[addData].validate(valid => {
                if (valid) {
                    if (this.addData.activeMode === "E") {
                        this.addData.givePiece = this.numberList.number1;
                        this.addData.notCapping = this.noCelling.notCapping1;
                    } else if (this.addData.activeMode === "J") {
                        this.addData.fullPiece = this.manyPieces.manyPieces1;
                        this.addData.givePiece = this.numberList.number2;
                        this.addData.notCapping = this.noCelling.notCapping2;
                    } else if (this.addData.activeMode === "S") {
                        this.addData.givePiece = this.numberList.number3;
                    } else if (this.addData.activeMode === "A") {
                        this.addData.fullPiece = this.manyPieces.manyPieces2;
                        this.addData.givePiece = this.numberList.number4;
                    } else {
                        this.$message({
                            message: "请输入正确的信息",
                            type: "warning"
                        });
                        return;
                    }
                    for (let i = 0; i < this.addData.levelSet.length; i++) {
                        this.addData.levelSet[i] += "";
                    }
                    //把门店商品 赠品 都拿到提交的时候来转换
                    // 门店
                    this.storeSet = [];
                    for (const i of this.storageShop) {
                        this.storeSet.push(i.code);
                    }
                    // 商品
                    this.goodsSet = [];
                    for (const i of this.selectGoodsList) {
                        this.goodsSet.push(i.code);
                    }
                    // 赠品
                    this.giveGoodsSet = [];
                    for (const i of this.giveGoodsList) {
                        this.giveGoodsSet.push(i.code);
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
                    if (this.addData.activeMode !== "A") {
                        if (this.giveGoodsSet.length == 0) {
                            return (this.giveGoodsSetShow = true);
                        } else if (this.giveGoodsSet.length > 0) {
                            this.giveGoodsSetShow = false;
                        }
                    }

                    //部分商品
                    if (this.addData.goodsScope == "B") {
                        if (this.goodsSet.length == 0) {
                            return (this.goodsShow = true);
                        } else if (this.goodsSet.length > 0) {
                            this.goodsShow = false;
                        }
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
                        goodsScope: this.addData.goodsScope,
                        activeMode: this.addData.activeMode,
                        givePiece: this.addData.givePiece,
                        notCapping: this.addData.notCapping,
                        fullMoney: this.addData.fullMoney,
                        fullPiece: this.addData.fullPiece,
                        notCapping: this.addData.notCapping,
                        discount: this.addData.discount,
                        reduce: this.addData.reduce,
                        levelSet: JSON.stringify(this.addData.levelSet),
                        giveGoodsSet: JSON.stringify(this.giveGoodsSet),
                        // channel: JSON.stringify(this.addData.channel)
                    };
                    if (this.$route.query.id) {
                        obj.id = sessionStorage.getItem("id");
                        this.$axios
                            .post("/sys/promote/give/update", qs.stringify(obj))
                            .then(res => {
                                if (res.data.code === "0000") {
                                    this.$router.push({
                                        name: "buyPresent"
                                    });
                                } else if (res.data.code !== "0000") {
                                    this.$message.error(res.data.msg);
                                }
                            });
                    } else {
                        this.$axios
                            .post("/sys/promote/give/add", qs.stringify(obj))
                            .then(res => {
                                if (res.data.code === "0000") {
                                    this.$router.push({
                                        name: "buyPresent"
                                    });
                                } else if (res.data.code !== "0000") {
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
        // 删除选中的商品数据
        shopDel(index, code) {
            this.delList.push(code);
            this.selectGoodsList.splice(index, 1);
        },
        // 拿到勾选的会员级别
        checkMember(val) {
            // 把会员等级数组给到定义的levelSet里
            this.addData.levelSet = val;
            this.levelSetShow = false;
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
                if (this.storageShop.length > 0) {
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
            }
        },
        chooseGoods() {
            this.query();
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
        // 赠品弹窗
        choosePresent() {
            this.centerDialogVisible = true;
            if (this.$route.query.id) {
                this.clist.forEach((item, index) => {
                    this.giveGoodsList.forEach((i, index2) => {
                        if (item.code == i.code) {
                            this.$nextTick(() => {
                                //           //将门店里列表中对应的项选中
                                this.$refs.multipleTable1.toggleRowSelection(
                                    this.clist[index],
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
                        /*    this.shopData.forEach((item, index) => {
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
            }); */
                    } else {
                        console.log(res.data.msg);
                    }
                });
        },
        // 获取选择商品当前的行
        commodityList(selection, row) {
            if (row["flag"]) {
                // 为true 表示选中状态，点击的话就变成false
                row["flag"] = false;
            } else {
                row["flag"] = true;
            }
            if (row["flag"]) {
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
        //商品全选
        //商品全选
        selectAllProduct(selection) {
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
        // 获取赠品当前选择的行
        giveGoods(row) {
            this.giveGoodsList = row;
            this.giveGoodsSetShow = false;
        },
        //赠品全选
        selectAllGiveProduct(selection) {
            this.giveGoodsList = selection;
            this.giveGoodsSetShow = false;
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
        // 选择商品的确定
        shopSure() {
            this.dialogVisible = false;
            this.flag1 = true;
        },
        shopSure1() {
            this.centerDialogVisible = false;
            this.flag3 = true;
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
                    }
                });
        },
        // 商品分类下拉选2
        choose2(value) {
            // this.formInline.typeLevel2=value
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
                    }
                });
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
            this.changeTime = ""; //创建日期
            this.ruleForm.type = "";
            this.ruleForm.code = "";
            this.getlist();
        },
        //活动方式选中按钮改变的时候 清空其他项
        changeE() {
            this.manyPieces.manyPieces1 = ""; //2
            this.numberList.number2 = "";
            this.noCelling.notCapping2 = "";
            this.numberList.number3 = ""; //3
            this.manyPieces.manyPieces2 = ""; //4
            this.numberList.number4 = "";
        },
        changeJ() {
            this.addData.fullMoney = ""; //1
            this.numberList.number1 = "";
            this.noCelling.notCapping1 = "";
            this.numberList.number3 = ""; //3
            this.manyPieces.manyPieces2 = ""; //4
            this.numberList.number4 = "";
        },
        changeS() {
            this.addData.fullMoney = ""; //1
            this.numberList.number1 = "";
            this.noCelling.notCapping1 = "";
            this.manyPieces.manyPieces1 = ""; //2
            this.numberList.number2 = "";
            this.noCelling.notCapping2 = "";

            this.manyPieces.manyPieces2 = ""; //4
            this.numberList.number4 = "";
        },
        changeA() {
            this.addData.fullMoney = ""; //1
            this.numberList.number1 = "";
            this.noCelling.notCapping1 = "";
            this.manyPieces.manyPieces1 = ""; //2
            this.numberList.number2 = "";
            this.noCelling.notCapping2 = "";
            this.numberList.number3 = ""; //3
        },
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
                name: "buyPresent"
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
.content1 {
    position: absolute;
    left: 0;
    top: 0;
    right: -17px;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: scroll;
}
.buyScoll {
    height: 800px;
    overflow: hidden;
    position: relative;
}
.promotionAdd {
    height: 100%;
    min-width: 1700px;
    background-color: #fff;
    box-sizing: 0 2px 10px #ccc;
}
.content1 .el-form-item__label {
    width: 125px;
}
.content1 {
    background-color: #fff;
    margin: 0px 10px;
    padding: 15px;
}
/* .aa{
   width: 125px;
} */
.el-form-item__content {
    margin-left: 150px;
}
.submit {
    background-color: #01c8dc;
    color: #fff;
}
.submit1 {
    margin-left: -205px;
    margin-bottom: 10px;
}
.reset {
    background-color: #fff;
    border: 1px solid #01c8dc;
    color: #01c8dc;
}

.billMaList {
    padding-left: 35px;
    padding-right: 30px;
}
.billMaList2 {
    box-sizing: border-box;
    padding: 15px 30px 50px 35px;
}
.pagination {
    float: right;
    margin-top: 30px;
    margin-bottom: 30px;
}
.title {
    color: #888;
    text-align: center;
    margin-bottom: 15px;
}
.shopSel,
.shopSta,
.shopSelect {
    display: inline-block;
}
.shopInp .shopSel {
    width: 100%;
}
/*商品分类第二个下拉选*/
.shopSel .shopSel1 {
    margin: 0 5px;
}
.shopSel .shopSelect {
    width: 20%;
}
.shopInp {
    width: 100%;
}
.shopList {
    display: inline-block;
    width: 29%;
    margin-left: 10px;
}
.shopList .shopscan {
    width: 77%;
    display: inline-block;
}
.shopList2 {
    width: 30%;
    text-align: left;
    display: inline-block;
    margin-left: 8px;
}
.shopList2 .shopscan2 {
    width: 75%;
    margin-right: 9px;
    display: inline-block;
}
.shopscan2 {
    margin-left: 10px;
    display: inline-block;
    width: 80%;
}
.billsearch {
    text-align: center;
}
.pr {
    display: inline-block;
    margin-left: 165px;
}
.block {
    overflow: hidden;
}
#billInput {
    width: 100%;
}
.inputConent {
    display: inline-block;
    width: 250px;
}
.el-input__inner {
    border: 1px solid #ccc;
    width: 220px;
}
#content1 .el-input__inner {
    border: 1px solid #ccc;
}
.salesinput::-webkit-input-placeholder {
    color: #ccc;
}
.tab {
    clear: both;
}
.first {
    position: absolute;
    display: inline-block;
}
.second,
.third,
.fourth {
    display: inline-block;
}
.choosePresent {
    position: absolute;
    left: 425px;
    top: 0px;
}
.choosePresent1 {
    position: absolute;
    display: inline-block;
    top: 0px;
}
.preferentialMode {
    position: relative;
}
.pinName {
    text-align: left;
}
input {
    width: 75px;
    height: 25px;
    border: 1px solid #bbb;
    border-radius: 5px;
    outline: none;
    margin: 0 6px;
}
.chaxunBtn {
    background-color: #434444;
    color: #fff;
    border: none;
}
.chaxunBtn {
    width: 69px;
    height: 32px;
    border-radius: 5px;
    line-height: 10px;
}

.chaxunBtn:hover {
    cursor: pointer;
}
.pageFenye {
    height: 50px;
    line-height: 50px;
    position: relative;
}
.PromotBtn,
.PromotBtn2 {
    display: inline-block;
}
.PromotBtn {
    position: absolute;
    left: 20px;
    bottom: -20px;
}
.PromotBtn2 {
    position: absolute;
    left: 20px;
    bottom: 2px;
}
.shopsto .widOne {
    width: 93.3px;
}
.promotionAdd .shopsto .widOne:nth-child(3) {
    margin: 0 5px;
}
.shopsto p,
.shopsto .huoNumzan,
.PromotBtn {
    display: inline-block;
}
.huoNumzan {
    width: 19px;
}
.shopsto {
    margin-bottom: 10px;
}
.number {
    text-align: center;
}
</style>
