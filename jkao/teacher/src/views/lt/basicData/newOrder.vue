<template>
    <div>
        <el-row style="padding-bottom: 15px;">
            <el-col :span="12">
                选择门店：
                <el-select style="width:300px" type="text" v-model="storeCode" placeholder="请选择">
                    <el-option v-for="i in options1" :key="i.code" :label="i.name" :value="i.code"></el-option>
                </el-select>
            </el-col>
            <el-col :span="12">
                <div>
                    <el-button class="AllquedingBtn" @click="chooseGoods">选择商品</el-button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <!-- <span
                        style="color:red"
                    >已选择&nbsp;{{selectGoodsList.length}}&nbsp;种</span>
                    <br />-->
                    <!-- <span style="color:red;font-size:12px" v-if="goodsShow">请选择商品</span> -->
                </div>
            </el-col>
        </el-row>
        <el-dialog title="选择商品" :visible.sync="dialogVisible" width="950px">
            <div class="right" style="width:100%;">
                <div class="shopsto">
                    <!-- <el-row style="white-space: nowrap;">
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
                    </el-row>-->
                    <!-- <div class="konge"></div> -->
                    <!-- <el-row style="white-space: nowrap;">
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
                    </el-row>-->
                </div>
                <div class="tab">
                    <el-table
                        :data="clist"
                        border
                        style="width: 100%"
                        max-height="247"
                        ref="multipleTable1"
                        @selection-change="selectAllProduct"
                    >
                        <!-- selection-change -->
                        <!-- @select="commodityList" -->
                        <el-table-column
                            type="selection"
                            width="55"
                            align="center"
                            class="leftTitle"
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
                    <div class="PromotBtn">
                        <el-button class="AllquedingBtn" @click="shopSure">确定</el-button>
                        <el-button class="theBtn resetButton" @click="dialogVisible = false">取消</el-button>
                    </div>
                    <!-- <el-pagination
                            @size-change="handleSizeChange1"
                            @current-change="handleCurrentChange1"
                            :current-page="currentPage"
                            :page-sizes="[20,40,60,80]"
                            :page-size="formData.pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="clistTotal"
                    ></el-pagination>-->
                </div>
            </div>
        </el-dialog>
        <div class="tab" v-if="flag">
            <el-table :data="selectGoodsList" style="width: 90%" border max-height="300">
                <el-table-column align="center" prop="code" label="货号"></el-table-column>
                <el-table-column align="center" prop="name" label="品名"></el-table-column>
                <el-table-column align="center" prop="salesPrice" label="单品售价"></el-table-column>
                 <el-table-column align="center"  label="数量">
                   <template slot-scope="scope">
                     <!-- <span>{{}}</span> -->
                     <input type="text" v-model="scope.row.number">
                     <!-- <el-input v-model="scope.row.number"></el-input> -->
                   </template>
                 </el-table-column>
                 <input class="inputTd" type="text"  />
                <!-- <el-table-column label="操作" align="center">
                    <template scope="scope">
                        <span class="codesty" @click="shopDel(scope.$index,scope.row.code)">删除</span>
                    </template>
                </el-table-column> -->
            </el-table>
        </div>
         <div class="PromotBtn">
                        <el-button class="AllquedingBtn" @click="submit">确定</el-button>
                        <el-button class="theBtn resetButton" @click="dialogVisible = false">取消</el-button>
                    </div>
    </div>
</template>
<script>
import qs from "qs";
export default {
    data() {
        return {
            options1: [],
            storeCode: "",
            dialogVisible: false,
            clist: [],
            goodsSet: [],
            selectGoodsList: [],
            flag:false
          
        };
    },
    created() {
        this.showother();
        this.getList();
    },
    methods: {
      submit(){
        if(!this.storeCode) return this.$message.error('请选择门店')
       this.goodsSet= this.selectGoodsList.map(item=>{
          return{
            goodsCode:item.code,
            number:item.number
          }
          
        })
       for(let i=0;i<this.goodsSet.length;i++){
         if(!this.goodsSet[i].number){
           return this.$message.error('请输入数量')
         }
         this.$utils.post(this.reqApi.xinls+'/exam/ordering/insert',qs.stringify({
           questionCode: sessionStorage.getItem("questionUUid"),
           storeCode:this.storeCode,
           goodsSet:JSON.stringify(this.goodsSet)
         })).then(res=>{
           if(res.data.code=='0000'){
             this.$message.success('新增成功！')
             this.$router.push('/invoice')
           }else {
            return  this.$message.error(res.data.msg)
           }
         })
       }
      },
        shopSure() {
            this.dialogVisible = false;
            this.flag=true
        },
        selectAllProduct(data) {
            this.selectGoodsList = data;
            this.selectGoodsList.forEach(item=>{
              item.number=''
            })
        },
        chooseGoods() {
            this.dialogVisible = true;
        },
        getList() {
            let questionCode = sessionStorage.getItem("questionUUid");
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/goods/list",
                    qs.stringify({
                        questionCode: sessionStorage.getItem("questionUUid")
                    })
                )
                .then(res => {
                    if (res.data.code === "0000") {
                        this.clist = res.data.data;
                    }
                });
        },
        showother() {
            this.$utils
                .post(
                    this.reqApi.xinls + "/exam/store/list",
                    qs.stringify({
                        questionCode: sessionStorage.getItem("questionUUid")
                    })
                )
                .then(res => {
                    if ((res.data.code = "0000")) {
                        this.options1 = res.data.data;
                    }
                });
        }
    }
};
</script>
<style scoped>
.tab {
    padding: 0 20px;
}
.PromotBtn {
    padding: 10px 20px;
}
</style>