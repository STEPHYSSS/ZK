<template>
  <div class="mallDetail">
    <img src="@/assets/Rbutton.png" @click="goback" class="CouponbtnbackC" />
    <div class="detaiInfo">
      <div v-show="baseInfo">
        <div class="btnBox">
          <el-button class="btnAdd">基础信息</el-button>
          <el-button @click="refund" v-if="baseList.status !='AC'" class="tuiKInfo">收货信息</el-button>
        </div>
        <div class="orderTabInfo">
          <div class="konge"></div>
          <div class="rowInfo">
            <el-row style="white-space: nowrap;">
              <el-col :span="6">
                <p>订单编号：{{baseList.code}}</p>
              </el-col>
              <el-col :span="6">
                <p>用户手机：{{baseList.memberPhone}}</p>
              </el-col>
              <el-col :span="6">
                <p>订单时间：{{baseList.createTime | converTime('YYYY-MM-DD HH:mm:ss')}}</p>
              </el-col>
              <el-col :span="6">
                <p v-if="baseList.payTime !=null">交易时间：{{baseList.payTime | converTime('YYYY-MM-DD HH:mm:ss')}}</p>
                <p v-else>交易时间：无</p>
              </el-col>
            </el-row>
            <div class="konge"></div>
            <el-row style="white-space: nowrap;">
              <el-col :span="6" v-if="baseList.status == 'AC'">
                <p v-if="baseList.cancelRematk !=null">取消理由：{{baseList.cancelRematk}}</p>
                <p v-else>取消理由：无</p>
              </el-col>
              <el-col :span="6">
                <p v-if="baseList.payChannel !=null">支付方式：{{baseList.payChannel}}</p>
              </el-col>
            </el-row>
          </div>
          <el-table :data="tableData" style="width: 100%;">
            <el-table-column prop="goodsCode" label="货号" align="center"></el-table-column>
            <el-table-column prop="goodsName" label="品名" align="center"></el-table-column>
            <el-table-column prop="spec" label="规格" align="center"></el-table-column>
            <el-table-column prop="unit" label="单位" align="center"></el-table-column>
            <el-table-column prop="count" label="数量" align="center"></el-table-column>
            <el-table-column prop="price" label="门店售价（元）" align="center"></el-table-column>
            <el-table-column prop="discountPrice" label="折后金额" align="center"></el-table-column>
            <el-table-column prop="remark" label="备注" align="center"></el-table-column>
          </el-table>
          <div class="count">
            <h4>合计：</h4>
            <span>商品总价：{{baseList.amount}}</span>
            <span>运费：0.00</span>
            <span>积分抵扣：0.00</span>
            <span>优惠金额：{{baseList.discountMoney || 0}}</span>
            <span>实付金额：{{baseList.actualMoney}}</span>
            <span>数量：{{baseList.count}}</span>
          </div>
        </div>
      </div>
      <!-- 收货信息 -->
      <div v-show="showInfo">
        <div class="btnBox">
          <el-button class="tuiKInfo" @click="baseBtn">基础信息</el-button>
          <el-button class="btnAdd">收货信息</el-button>
        </div>
        <div class="orderTabInfo">
          <div class="konge"></div>
          <div class="rowInfo">
            <el-row style="white-space: nowrap;">
              <el-col :span="6">
                <p>收货人：{{baseList.name}}</p>
              </el-col>
              <el-col :span="6">
                <p>联系方式：{{baseList.phone}}</p>
              </el-col>
              <el-col :span="12">
                <p>收货地址：{{baseList.address}}</p>
              </el-col>
            </el-row>
          </div>
          <div style="margin-bottom:20px;border:1px solid rgba(68,68,68,0.5);"></div>
          <!-- 已签收 -->
          <div class="AllstaBox1" style="height:100px" v-if="baseList.receiveTime !=null">
            <span v-if="baseList.receiveTime !=null" style="width:70px">{{baseList.receiveTime | converTime('MM-DD HH:mm')}}</span>
            <span v-else class="NOTime"></span>
            <div class="flexBox1" style="margin: 0 20px;">
              <span class="AllstaP1"></span>
              <span class="AllstaP2"></span>
            </div>
            <div class="flexBox1" style="position: absolute;">
              <p class="creatstore">已签收</p>
              <p class="creatstore">{{baseList.name}}</p>
              <p class="creatstore4">{{baseList.phone}}</p>
              <p class="creatstore4">您的包裹已经送达，如有问题请联系客服。风里来雨里去，只为客官您满意，请赐五星好评，快递小哥继续努力</p>
            </div>
          </div>
          <!-- 运输中 -->
          <div class="AllstaBox1" style="height:100px" v-if="baseList.logisticsDatail !=null">
            <span v-if="baseList.deliverTime !=null">{{baseList.deliverTime | converTime('MM-DD HH:mm')}}</span>
            <span v-else class="NOTime"></span>
            <div class="flexBox1" style="margin: 0 20px;">
              <span class="AllstaP1"></span>
              <span class="AllstaP2"></span>
            </div>
            <div class="flexBox1" style="position: absolute;">
              <p class="creatstore">运输中</p>
              <p class="creatstore4">{{baseList.logisticsDatail}}</p>
            </div>
          </div>
          <!-- 已发货 -->
          <div class="AllstaBox1" style="height:100px" v-if="baseList.deliverTime !=null">
            <span v-if="baseList.deliverTime !=null">{{baseList.deliverTime | converTime('MM-DD HH:mm')}}</span>
            <span v-else class="NOTime"></span>
            <div class="flexBox1" style="margin: 0 20px;">
              <span class="AllstaP1"></span>
              <span class="AllstaP2"></span>
            </div>
            <div class="flexBox1" style="position: absolute;">
              <p class="creatstore">已发货</p>
              <p class="creatstore4">包裹已经出库，正在等待揽收</p>
            </div>
          </div>
          <!-- 创建订单 -->
          <div class="AllstaBox1" style="height:100px">
            <span>{{baseList.createTime | converTime('MM-DD HH:mm')}}</span>
            <div class="flexBox1" style="margin: 0 20px;">
              <span class="AllstaP1"></span>
            </div>
            <div class="flexBox1" style="position: absolute;">
              <p class="creatstore">已下单</p>
              <p class="creatstore4">交易成功，您的订单开始处理</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "mallDetail",
  data() {
    return {
      tableData: [], //基本信息
      baseList: {},
      count: [],
      baseInfo: true,
      showInfo: false
    };
  },
  created() {
    this.getStoreDetail();
  },
  methods: {
    getStoreDetail() {
      this.$axios({
        url: "mall/order/detail",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: sessionStorage.getItem('token'),
          orderCode: this.$route.query.code
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.tableData = res.data.data.detailList;
          this.baseList = res.data.data;
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
    refund() {
      this.showInfo = true;
      this.baseInfo = false;
    },
    baseBtn() {
      this.showInfo = false;
      this.baseInfo = true;
    },
    goback() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.mallDetail {
  background-color: #fff;
  min-height: 647px;
  height: 100%;
  min-width: 1700px;
}
.mallDetail .el-button + .el-button {
  margin-left: 0;
}
.mallDetail .detaiInfo {
  margin: 0 auto;
  min-height: 200px;
  background-color: #fff;
}
.mallDetail .orderTitle {
  margin-bottom: 0;
  padding-bottom: 0;
  height: 50px;
  line-height: 50px;
}
.mallDetail .orderTabInfo,
.mallDetail .orderTitle {
  width: 97%;
  margin: 0 auto;
}
.mallDetail .rowInfo {
  margin-bottom: 20px;
  font-size: 12px;
}
p {
  display: inline-block;
  width: 300px;
}
.TongCenter {
  text-align: center;
}
.TongRight {
  text-align: right;
}

.mallDetail .count {
  text-align: right;
  height: 40px;
  line-height: 40px;
  padding: 20px 0;
}
.count h4 {
  display: inline-block;
}
.count span {
  margin: 0 8px;
}
.btnAdd {
  background-color: #fff;
  color: #444444;
  border-radius: 0;
  border: 1px solid #c2cad8;
  border-top: 2px solid #e6000b;
}
.tuiKInfo {
  background-color: #fff;
  color: #444444;
  border-radius: 0;
}
.CouponbtnbackC {
  margin-right: 20px;
  text-decoration: none;
  float: right;
  cursor: pointer;
  margin-top: 13px;
}
.AllstaBox1 {
  position: relative;
  margin-bottom: 10px;
  position: relative;
  display: flexbox;
}
.AllstaP1,
.AllstaP2,
.flexBox1,
.flexBox2 {
  display: inline-block;
}
.flexBox1 p{
  display: block;
  width: 100%;
}
.AllstaP1 {
  width: 10px;
  height: 10px;
  background: rgba(252, 46, 46, 1);
  opacity: 0.89;
  border-radius: 50%;
}
.sort{
  width: 10px;
  height: 10px;
  background: rgba(198, 198, 198, 1);
  opacity: 0.89;
  border-radius: 50%;
}
.AllstaP2 {
  height: 94%;
  background: rgba(198, 198, 198, 1);
  display: inline-block;
  width: 2px;
  position: absolute;
  top: 20px;
  left: 91px;
}
.NOTime{
  display: inline-block;width: 67px;
}
</style>