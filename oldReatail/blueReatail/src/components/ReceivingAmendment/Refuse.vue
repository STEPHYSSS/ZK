<template>
  <div class="refuse minWidth1600">
    <div class="detail">
      <div class="detailBackBtn">
        <router-link :to="{path:'/amendment'}"><img src="@/assets/returnbutton.png" alt="" class="codesty"></router-link>
      </div>
      <div class="re_marg">
        <h3 class="h3mt">修正单详情</h3>
        <div class="list">
          <div class="refuseXiu1">
            <p>修正单编号：<span>{{amendmentVo.code}}</span></p>
            <p>验收日期：<span>{{amendmentVo.createTime |converTime('YYYY-MM-DD')}}</span></p>            
          </div>
          <div class="refuseXiu2">
            <p>创建日期：<span>{{amendmentVo.createTime |converTime('YYYY-MM-DD')}}</span></p>
            <p>配送方：<span>{{amendmentVo.supplierName}}</span></p>            
          </div>
          <div class="refuseXiu3">
            <p>原配送单编号：<span>{{amendmentVo.deliveryCode}}</span></p>
            <p style="color:red"  v-if="amendmentVo.newDeliveryCode != null">补货配送单号：<span>{{amendmentVo.newDeliveryCode}}</span></p>
            <p style="color:red" v-else>补货配送单号：<span>无</span></p>
          </div>
          <!-- <div class="xiu4">
            <p>拒收总数：<span>{{amendmentVo.count}}</span></p>
            <p>拒收总金额：<span>{{amendmentVo.amount}}</span></p>
          </div> -->
        </div>
        <div class="list_tab">
          <el-table
            :data="subList" style="width: 100%;" :header-cell-style="tableHeaderColor"
            v-if="this.amendmentVo.type=='rejection'">
            <el-table-column label="序号" align="center" type="index"></el-table-column>
            <el-table-column prop="goodsCode" label="货号" align="center"></el-table-column>
            <el-table-column prop="goodsName" label="品名" align="center"></el-table-column>
            <el-table-column prop="spec" label="规格" align="center"></el-table-column>
            <el-table-column prop="count" label="拒收数" align="center"></el-table-column>
            <!-- <el-table-column prop="salesPrice" label="单品售价" align="center"></el-table-column>
            <el-table-column prop="amount" label="拒收总金额" align="center"></el-table-column> -->
            <el-table-column label="类型" align='center'>
              <template>
                <span v-if="amendmentVo.type == 'rejection'">拒收</span>
                <span v-if="amendmentVo.type == 'shortage'">缺货</span>
              </template>
            </el-table-column>
            <el-table-column prop="reason" label="拒收原因" align="center"></el-table-column>
            <el-table-column
              prop="supplierAmendmentCount"
              label="供应确认数量"
              width="154"
              align="center"
            ></el-table-column>
            <el-table-column prop="finalRuleCount" label="最终裁定数量" align="center"></el-table-column>
          </el-table>
          <el-table :data="subList" style="width: 100%;"
            :header-cell-style="tableHeaderColor"
            v-if="this.amendmentVo.type=='shortage'">
            <el-table-column label="序号" align="center" type="index"></el-table-column>
            <el-table-column prop="goodsCode" label="货号" align="center"></el-table-column>
            <el-table-column prop="goodsName" label="品名" align="center"></el-table-column>
            <el-table-column prop="spec" label="规格" align="center"></el-table-column>
            <el-table-column prop="count" label="缺货数" align="center"></el-table-column>
            <!-- <el-table-column prop="salesPrice" label="单品售价" align="center"></el-table-column>
            <el-table-column prop="amount" label="缺货总金额" align="center"></el-table-column> -->
            <el-table-column label="类型" align='center'>
              <template>
                <span v-if="amendmentVo.type == 'rejection'">拒收</span>
                <span v-if="amendmentVo.type == 'shortage'">缺货</span>
              </template>
            </el-table-column>
            <el-table-column prop="reason" label="缺货原因" align="center"></el-table-column>
            <el-table-column label="供应确认缺货数" width="154"  align="center" v-if="subList.count!=subList.supplierAmendmentCount">
                <template slot-scope="scope">
                    <span class="red">{{ scope.row.supplierAmendmentCount }}</span>
                </template>
              </el-table-column>
              <el-table-column label="供应确认数量" width="154" align="center">
                <template slot-scope="scope">
                    <span class="black">{{ scope.row.supplierAmendmentCount }}</span>
                </template>
              </el-table-column>
             <el-table-column label="最终裁定数量"  align="center">
                <template slot-scope="scope">
                    <span class="black">{{ scope.row.finalRuleCount }}</span>
                </template>
              </el-table-column>
              <el-table-column label="最终裁定数量"  align="center" v-if="subList.count!=subList.finalRuleCount">
                <template slot-scope="scope">
                    <span class="red">{{ scope.row.finalRuleCount }}</span>
                </template>
              </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="img_list" v-if="panduanStatus != '1'">
      <div class="G_upload re_marg">
        <p class="allSta">全部动态</p>
        <div class="AllstaBox1">
            <p class="AllstaP1"></p>
            <p class="AllstaP2"></p>
            <span class="creatstore">{{amendmentVo.storeName}}</span>
            <span class="creatstore2">{{amendmentVo.createTime|converTime('YYYY-MM-DD HH:mm:ss')}}</span>
            <br>
            <span class="creatstore3">创建</span>
        </div>
        <!-- 供应商审核的意见 -->
        <div class="AllstaBox1" v-if="amendmentVo.supplierOpinion !=null">
            <p class="AllstaP1"></p>
            <p class="AllstaP2"></p>
            <span class="creatstore">{{amendmentVo.supplierName}}</span>
            <span class="creatstore2" v-if="amendmentVo.supplierCheckTime !=null">
                {{amendmentVo.supplierCheckTime|converTime('YYYY-MM-DD HH:mm:ss')}}</span>
            <br>
            <span class="creatstore3" v-if="amendmentVo.status!=4">审核不通过</span>
            <span class="creatstore3" v-if="amendmentVo.status==4">审核通过</span>
            <br>
            <p class="creatstore4">意见：{{amendmentVo.supplierOpinion}}</p>
        </div>
        <!-- 门店审核的意见 -->
        <div class="AllstaBox1" v-if="amendmentVo.storeOpinion!=null">
            <p class="AllstaP1"></p>
            <p class="AllstaP2"></p>
            <span class="creatstore">{{amendmentVo.storeName}}</span>
            <span class="creatstore2" v-if="amendmentVo.storeUploadTime !=null">
                {{amendmentVo.storeUploadTime|converTime('YYYY-MM-DD HH:mm:ss')}}</span>
            <br>
            <span class="creatstore3" v-if="amendmentVo.status==3">已上传意见</span>
            <span class="creatstore3" v-if="amendmentVo.status!=3">上传意见</span>
            <br>
            <p class="creatstore4">意见：{{amendmentVo.storeOpinion}}</p>
        </div>
        <!-- 总部意见审核的意见 -->
        <div class="AllstaBox1" v-if="amendmentVo.headquartersOpinion!=null">
            <p class="AllstaP1"></p>
            <p class="AllstaP2"></p>
            <span class="creatstore">{{amendmentVo.headquartersUsername}}</span>
            <span class="creatstore2" v-if="amendmentVo.headquartersCheckTime !=null">
                {{amendmentVo.headquartersCheckTime|converTime('YYYY-MM-DD HH:mm:ss')}}</span>
            <br>
            <span class="creatstore3" v-if="amendmentVo.status==5">裁定通过</span>
            <!-- <span class="creatstore3" v-if="amendmentVo.status != 5">裁定不通过</span> -->
            <br>
            <p class="creatstore4">意见：{{amendmentVo.headquartersOpinion}}</p>
        </div>
        <!-- 最后圈圈 -->
        <div class="AllstaBox1" v-if="amendmentVo.status == 4 || amendmentVo.status == 5">
          <p class="AllstaP1"></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "refuse",
  data() {
    return {
      class: {
        red: "color:red",
        black: "color:black"
      },
      amendmentCode: "",
      subList: [],
      amendmentVo: {},
      panduanStatus:sessionStorage.getItem('shopstatus')
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color:#fff;color: #444;";
      }
    },
    getlist() {
      var code = [];
      code.amendmentCode = sessionStorage.getItem("shopCode");
      code.token = sessionStorage.getItem("token");
      let formData = new FormData();
      const obj = code;
      Object.keys(obj).forEach(key => {
        formData.append(key, obj[key]);
      });
      this.$axios.post("/store/amendment/detail", formData).then(res => {
        if (res.data.code == "0000") {
          this.subList = res.data.data.subList;
          this.amendmentVo = res.data.data.amendmentVo;
        }else if(res.data.code=="6666"){
            this.$message({
            showClose: true,
            message: 'token异常，请重新登录',
            type: 'error'
        });
        const timer = setTimeout(() => {
            clearTimeout(timer)
            this.$router.push({name: "login"})}, 3000)
        }else{
            this.$message.error(res.data.msg);
        }
      });
    }
  }
};
</script>
<style scoped>
.refuse {
  min-height: 647px;
  padding-bottom: 20px;
  min-width: 1200px;
}
.detail {
  padding-bottom: 40px;
}
.detail,
.img_list {
  background: #fff;
}
.img_list {
  padding-bottom: 30px;
}
.img_list,
.M_upload {
  /* margin-top: 30px; */
}
.re_marg {
  margin: 0 20px;
}
.re_detail {
  margin-top: 18px;
  margin-bottom: 15px;
}
.tip_detail {
  margin-bottom: 15px;
  color: #b6b6b6;
}
.list {
  display: flex;
  margin-bottom: 20px;
}
/* .list_l,
.list_c,
.list_r {
  flex: 1;
} */
.table1 {
  border-collapse: collapse;
  clear: both;
}
.menu {
  font: 12px verdana, arial, sans-serif;
}
.menu,
.menu li {
  list-style: none;
  padding: 0;
  margin: 0;
  float: left;
  margin-left: 25px;
  margin-bottom: 20px;
  margin-top: 20px;
}
.menu li img {
  width: 210px;
}
.shop_upload {
  height: 50px;
  background: #dcf9fc;
  line-height: 50px;
  padding-left: 10px;
}
.G_upload {
  padding-top: 20px;
}
.opinion {
  text-align: center;
  height: 50px;
  line-height: 50px;
  margin: 20px auto;
}
/* 表格样式 */
table {
  text-align: center;
}
.tab_tr {
  height: 50px;
}
.tab_tr2 {
  height: 100px;
}
/* 返回 */
.nav {
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
.btnback {
  text-decoration: none;
  width: 80px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  background-color: #fff;
  color: #01c8dc;
  border: 1px solid #01c8dc;
  border-radius: 5px;
  float: right;
  margin-right: 2%;
}
.btnback:hover {
  background-color: #01c8dc;
  color: #fff;
}
.black {
  color: black;
}
.red {
    color: red;
}
.refuseXiu1,.refuseXiu2,.refuseXiu3{
  /* flex: 1; */
  width: 33%;
}
.refuseXiu2{
  box-sizing: border-box;
  padding-left: 9%;
}
.refuseXiu3{
  box-sizing: border-box;
  padding-left: 7%;
}
.newDeliv {
  color: red;
}
.allSta {
  font-weight: 800;
  font-size: 16px;
  margin-bottom: 10px;
}
.allSta,
.creatstore3 {
  color: #e50109;
}
.AllstaBox1 {
  margin-bottom: 10px;
  position: relative;
}
.AllstaP1,
.AllstaP2 {
  display: inline-block;
}
.AllstaP1 {
  height: 14px;
  display: inline-block;
  width: 14px;
  border-radius: 20px;
  background: #e50109;
}
.Allcircle {
  height: 14px;
  display: inline-block;
  width: 14px;
  border-radius: 20px;
  border: 1px solid #e50109;
  position: absolute;
  top: 5px;
}
.AllstaP2 {
  height: 88%;
  background: #c8c8c8;
  display: inline-block;
  width: 2px;
  position: absolute;
  top: 20px;
  left: 6px;
}
.creatstore {
  margin-left: 14px;
  font-weight: 800;
}
.creatstore2 {
  position: absolute;
  left: 50%;
}
.creatstore3,
.creatstore4 {
  margin-left: 27px;
}
.list p {
  margin-bottom: 5px;
}
</style>


