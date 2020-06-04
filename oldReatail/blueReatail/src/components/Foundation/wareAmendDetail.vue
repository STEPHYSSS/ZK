<template>
  <div class="minimum minWidth1600">
    <div class="wareAmendDetail">
      <div class="detailBackBtn">
        <router-link :to="{path:'/wareAmendList'}"><img src="@/assets/returnbutton.png" alt="" class="codesty"></router-link>
      </div>
      <div class="">
        <div class="list">
          <div class="list_l">
            <p>
              修正单编号：
              <span>{{tableData2.code}}</span>
            </p>
            <p>
              验收日期：
              <span
                v-if="tableData2.createTime!=null"
              >{{tableData2.createTime|converTime('YYYY-MM-DD')}}</span>
            </p>
          </div>
          <div class="list_c">
            <p>
              创建日期：
              <span
                v-if="tableData2.createTime!=null"
              >{{tableData2.createTime|converTime('YYYY-MM-DD')}}</span>
            </p>
            <p>
              配送方：
              <span>{{tableData2.supplierName}}</span>
            </p>
            <!-- <p>门店：<span>{{tableData2.storeName}}</span></p> -->
          </div>
          <div class="list_r">
            <p>
              原配送单编号：
              <span>{{tableData2.deliveryCode}}</span>
            </p>
            <p class="newDeliv" v-if="tableData2.newDeliveryCode != null">
              补货配送单号：
              <span>{{tableData2.newDeliveryCode}}</span>
            </p>
            <p class="newDeliv" v-else>
              补货配送单号：
              <span>无</span>
            </p>
          </div>
        </div>
        <!-- shortage缺货 -->
        <div class="list_tab">
          <!-- 拒收 -->
          <el-table :data="tableData" style="width: 100%;">
            <el-table-column prop="goodsCode" label="货号" align="center"></el-table-column>
            <el-table-column prop="goodsName" label="品名" align="center"></el-table-column>
            <el-table-column prop="spec" label="规格" align="center"></el-table-column>
            <el-table-column prop="salesPrice" label="单品售价" align="center"></el-table-column>
            <el-table-column
              prop="count"
              label="缺货数量"
              align="center"
              v-if="tableData2.type == 'shortage'"
            ></el-table-column>
            <el-table-column label="类型" align="center">
              <template>
                <span v-if="tableData2.type == 'rejection'">拒收</span>
                <span v-if="tableData2.type == 'shortage'">缺货</span>
              </template>
            </el-table-column>
            <el-table-column prop="reason" label="原因" align="center"></el-table-column>
            <el-table-column prop="supplierAmendmentCount" label="供货确认数量" align="center"></el-table-column>
            <el-table-column prop="finalRuleCount" label="最终裁定数量" align="center"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="img_list">
      <div class="G_upload re_marg">
        <p class="allSta">全部动态</p>
        <div class="AllstaBox1">
          <p class="AllstaP1"></p>
          <p class="AllstaP2"></p>
          <span class="creatstore">{{tableData2.storeName}}</span>
          <span class="creatstore2">{{tableData2.createTime|converTime('YYYY-MM-DD HH:mm:ss')}}</span>
          <br />
          <span class="creatstore3">创建</span>
        </div>
        <!-- 供应商审核的意见 -->
        <div class="AllstaBox1" v-if="tableData2.supplierOpinion!=null">
          <p class="AllstaP1"></p>
          <p class="AllstaP2"></p>
          <span class="creatstore">{{tableData2.supplierName}}</span>
          <span
            class="creatstore2"
            v-if="tableData2.supplierCheckTime !=null"
          >{{tableData2.supplierCheckTime|converTime('YYYY-MM-DD HH:mm:ss')}}</span>
          <br />
          <span class="creatstore3" v-if="tableData2.status!=4">审核不通过</span>
          <span class="creatstore3" v-if="tableData2.status==4">审核通过</span>
          <br />
          <p class="creatstore4">意见：{{tableData2.supplierOpinion}}</p>
        </div>
        <!-- 门店审核的意见 -->
        <div class="AllstaBox1" v-if="tableData2.storeOpinion!=null">
          <p class="AllstaP1"></p>
          <p class="AllstaP2"></p>
          <span class="creatstore">{{tableData2.storeName}}</span>
          <span
            class="creatstore2"
            v-if="tableData2.storeUploadTime !=null"
          >{{tableData2.storeUploadTime|converTime('YYYY-MM-DD HH:mm:ss')}}</span>
          <br />
          <span class="creatstore3" v-if="tableData2.status==3">已上传意见</span>
          <span class="creatstore3" v-if="tableData2.status!=3">上传意见</span>
          <br />
          <p class="creatstore4">意见：{{tableData2.storeOpinion}}</p>
        </div>
        <!-- 总部意见审核的意见 -->
        <div class="AllstaBox1" v-if="tableData2.headquartersOpinion!=null">
          <p class="AllstaP1"></p>
          <p class="AllstaP2"></p>
          <span class="creatstore">{{tableData2.headquartersUsername}}</span>
          <span
            class="creatstore2"
            v-if="tableData2.headquartersCheckTime !=null"
          >{{tableData2.headquartersCheckTime|converTime('YYYY-MM-DD HH:mm:ss')}}</span>
          <br />
          <span class="creatstore3" v-if="tableData2.status==5">裁定通过</span>
          <br />
          <p class="creatstore4">意见：{{tableData2.headquartersOpinion}}</p>
        </div>
        <!-- 最后圈圈 -->
        <div class="AllstaBox1" v-if="tableData2.status == 4 || tableData2.status == 5">
          <p class="AllstaP1"></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "Checks",
  data() {
    return {
      apiImg: window.apiImg,
      imgList: [],
      imgList2: [],
      tableData: [],
      tableData2: {},
      shenPass: sessionStorage.getItem("isPassWare")
    };
  },
  created() {
    this.getCheck();
  },
  methods: {
    getCheck() {
      this.$axios({
        url: window.apiWare + "amendment/detail",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: sessionStorage.getItem("token"),
          amendmentCode: sessionStorage.getItem("WareInCode")
        })
      })
        .then(res => {
          const {
            code,
            data: { subList, amendmentVo }
          } = res.data;
          if (code == "0000") {
            this.tableData2 = amendmentVo;
            this.tableData = subList;
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
        })
        .catch(err => {
          console.log("数据异常", err);
        });
    }
  }
};
</script>
<style scoped>
.wareAmendDetail {
    height: 200px;
    margin: 0 20px;
    padding-top: 20px;
}
.detail,
.img_list {
  width: 96%;
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
}
.img_list {
  padding-bottom: 30px;
}
.img_list,
.M_upload {
  margin-top: 30px;
}
.re_detail {
  margin-top: 18px;
  margin-bottom: 15px;
  padding-bottom: 0;
}
.tip_detail {
  margin-bottom: 15px;
  color: #b6b6b6;
}
.list {
  display: flex;
}
.list_tab {
  margin-top: 30px;
}
.list_l,
.list_c,
.list_r {
  flex: 1;
}
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
  margin-bottom: 0;
  padding-bottom: 0;
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
  background: #e6000b;
}
.Allcircle {
  height: 14px;
  display: inline-block;
  width: 14px;
  border-radius: 20px;
  border: 1px solid #e6000b;
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
</style>

