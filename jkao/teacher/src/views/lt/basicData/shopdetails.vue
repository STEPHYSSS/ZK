<template>
    <div class="caigouWaper">
        <img @click="goback" class="backImg" src="@/assets/images/returnbutton.png" alt />
        <div class="shopdetails">
            <!-- <p class="store_tit">采购单详情</p> -->
            <!-- <button class="OPBtnBack" @click="goback"> -->
            <!-- <img src="@/assets/Rbutton.png" @click="goback" class="CouponbtnbackC"/> -->
            <!-- </button> -->
            <el-row>
                <el-col :span="6">
                    <span>订单编号:{{purchaseSheet.code}}</span>
                </el-col>
                <el-col :span="6">
                    <span>订购品项数:{{purchaseSheet.item}}</span>
                </el-col>
                <el-col :span="6">
                    <span>订购总数:{{purchaseSheet.count}}</span>
                </el-col>
                <el-col :span="6">
                    <span>订购总金额:{{purchaseSheet.amount}}</span>
                </el-col>

            </el-row>
            <el-row style="padding:15px 0">
               <el-col :span="6">
                    <span>仓库采购单编号:{{purchaseSheet.warehousePurchase}}</span>
                </el-col>
                 <el-col :span="6">
                    <span>供应商编号:{{purchaseSheet.supplierCode}}</span>
                </el-col>
                <el-col :span="6">
                    <span>创建日期:{{purchaseSheet.createTime|fmtDate2}}</span>
                </el-col>
                <el-col :span="6">
                    <span>状态:{{purchaseSheet.status|filStu}}</span>
                </el-col>
               <el-row style="text-align:right">
                  <el-button @click="peisong" v-if="$route.query.flag">确认配送</el-button>
               </el-row>
            </el-row>
            <div class="konge"></div>
            <el-table :data="tableData" style="width: 100%" border>
                <el-table-column prop="goodsCode" label="货号" align="center"></el-table-column>
                <!-- <el-table-column prop="barcode" label="国际条码" align="center" width="150"></el-table-column> -->
                <!-- <el-table-column label="品名" align="center" width="160">
                    <template slot-scope="scope">
                        <span
                            class="codesty"
                            @click="todocuments(scope.row.code)"
                            v-if="flag"
                        >{{scope.row.name}}</span>
                        <span v-else>{{scope.row.name}}</span>
                    </template>
                </el-table-column> -->
                <!-- <el-table-column prop="spec" label="规格" align="center"></el-table-column> -->
                <!-- <el-table-column prop="unit" label="单位" align="center"></el-table-column> -->
                <el-table-column prop="purchasePrice" label="供应商进价" align="center"></el-table-column>
                <!-- <el-table-column label="保质期" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.period}}{{scope.row.periodUnit}}</span>
                    </template>
                </el-table-column> -->
                <!-- <el-table-column prop="temperature" label="温层" align="center"></el-table-column> -->
                <el-table-column prop="count" label="订购总数" align="center"></el-table-column>
                <el-table-column prop="amount" label="订购总金额" align="center"></el-table-column>
                <el-table-column prop="actualDelivery" label="实际发货数" align="center">
                </el-table-column>
                <el-table-column  label="实际收货数" align="center" prop="actualReceipt">
                </el-table-column>
            </el-table>
            <div class="konge"></div>
            <div class="paginStyle">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    :page-sizes="[20,40,60]"
                    :page-size="pageSize"
                    background
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    class="pagination"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import qs from "qs";
export default {
    data() {
        return {
            tableData: [],
            purchaseSheet: {},
            pageNum: 1,
            pageSize: 20,
            total: 0,
            flag: true
        };
    },
    created() {
        this.getlist();
    },
    methods: {
      peisong(){
        this.$utils.post(this.reqApi.xinls+'/exam/purchase/check',qs.stringify({
          questionCode: sessionStorage.getItem("questionUUid"),
          code:this.$route.query.code
        })).then(res=>{
          if(res.data.code==='0000'){
            this.$message.success("提交成功")
            this.$router.push('/shoporder')
          }else {
            return this,$message.error(res.data.msg)
          }
        })
      },
        getlist() {
            this.$utils({
                url: this.reqApi.xinls + "/exam/purchase/detail",
                method: "POST",
                headers: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                data: qs.stringify({
                    questionCode: sessionStorage.getItem("questionUUid"),
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    code: this.$route.query.code
                })
            }).then(res => {
                if (res.data.code == "0000") {
                    this.purchaseSheet = res.data.data.info;
                    if (this.purchaseSheet.warehousePurchase) {
                        this.flag = false;
                    } else {
                        this.flag = true;
                    }
                    this.tableData = res.data.data.subList;
                    // this.total = res.data.data.pageInfo.total;
                } else if (res.data.code == "6666") {
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
        handleSizeChange(val) {
            this.pageNum = val;
            this.getlist();
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.getlist();
        },
        todocuments(e) {
            sessionStorage.setItem("purchaseCode", this.purchaseSheet.code);
            sessionStorage.setItem("goodsCode", e);
            this.$router.push({
                name: "documents"
            });
        },
        goback() {
            this.$router.go(-1);
        }
    },
    filters:{
      filStu(val){
        if(val==1){
          return '待确认'
        }else if(val==2){
          return '已发货'
        }else if(val==3){
          return '已完成'
        }
      }
    }
};
</script>

<style scoped>
.caigouWaper {
    background-color: #fff;
    position: relative;
    height: 100%;
}
.shopdetails {
    /* border: 1px solid #ccc; */
    /* box-shadow: 0px 2px 10px #ccc; */
    padding: 20px 0px;
    max-height: 854px;
    height: 100%;
    border-radius: 4px;
    background: #fff;
    font-size: 12px;
}
.CouponbtnbackC {
    text-decoration: none;
    float: right;
    margin-top: 17px;
    cursor: pointer;
}
.backImg {
    position: absolute;
    right: 20px;
    top: 0px;
    cursor: pointer;
    z-index: 55;
}
</style>
