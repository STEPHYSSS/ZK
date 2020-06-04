<template>
  <div class="Cgrefuse">
    <!--<el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
             <el-breadcrumb-item :to="{ path: '/operatIndex' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item >门店单据管理</el-breadcrumb-item>
            <el-breadcrumb-item >修正单管理</el-breadcrumb-item> 
    </el-breadcrumb>-->
    <div class="scollHide">
      <h3 class="store_tit">修正单管理</h3>
      <!-- <el-button class="CGBtnBack" @click="back">返回</el-button> -->
      <img src="@/assets/Rbutton.png" @click="back" class="CGBtnBack" />
      <div class="detail">
        <div class>
          <div class="list">
            <el-row>
              <el-col :span="6">
                <p class="xiuNumber">
                  修正单编号：
                  <span>{{amendmentVo.code}}</span>
                </p>
              </el-col>
              <el-col :span="6">
                <p>
                  创建日期：
                  <span>{{amendmentVo.createTime | fmtDate2('YYYY-MM-DD')}}</span>
                </p>
              </el-col>
              <el-col :span="6">
                <p>
                  原配送单编号：
                  <span>{{amendmentVo.deliveryCode}}</span>
                </p>
              </el-col>
              <el-col :span="6">
                <p>
                  验收日期：
                  <span>{{amendmentVo.createTime | fmtDate2('YYYY-MM-DD')}}</span>
                </p>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <p>
                  配送方：
                  <span>{{amendmentVo.supplierName}}</span>
                </p>
              </el-col>
              <el-col :span="6">
                <p>
                  拒收品项总数：
                  <span>{{subList.length}}</span>
                </p>
              </el-col>
              <el-col :span="6">
                <p>
                  拒收总数：
                  <span>{{amendmentVo.count}}</span>
                </p>
              </el-col>
              <el-col :span="6">
                <p>
                  拒收总金额：
                  <span>{{amendmentVo.amount}}</span>
                </p>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <p>
                  门店：
                  <span>{{amendmentVo.storeName}}</span>
                </p>
              </el-col>
            </el-row>
          </div>
          <div class="list_tab">
            <el-table :data="subList" style="width: 100%;" border>
              <el-table-column prop="goodsCode" label="货号" align="center" width="100"></el-table-column>
              <el-table-column prop="goodsName" label="品名" align="center" width="150"></el-table-column>
              <el-table-column prop="spec" label="规格" align="center"></el-table-column>
              <el-table-column
                prop="count"
                label="拒收数"
                align="center"
                v-if="statusDetail == 'rejection'"
              ></el-table-column>
              <el-table-column
                prop="count"
                label="缺货数"
                align="center"
                v-if="statusDetail == 'shortage'"
              ></el-table-column>
              <el-table-column prop="salesPrice" label="单品售价" align="center"></el-table-column>
              <el-table-column prop="amount" label="总金额" align="center"></el-table-column>
              <el-table-column label="类型" align="center">
                <template>
                  <span v-if="amendmentVo.type == 'rejection'">拒收</span>
                  <span v-if="amendmentVo.type == 'shortage'">缺货</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="reason"
                label="拒收原因"
                align="center"
                v-if="statusDetail == 'rejection'"
              ></el-table-column>
              <el-table-column
                prop="reason"
                label="缺货原因"
                align="center"
                v-if="statusDetail == 'shortage'"
              ></el-table-column>
              <el-table-column
                prop="supplierAmendmentCount"
                label="供应确认数量"
                width="154"
                align="center"
              ></el-table-column>
              <el-table-column prop="finalRuleCount" label="最终裁定数量" align="center"></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div
        class="CgdetImg_list"
        v-if="amendmentVo.storeOpinion != null ||amendmentVo.supplierOpinion !=null ||amendmentVo.headquartersOpinion!=null"
      >
        <div class="G_upload">
          <p class="allSta">全部动态</p>
          <div class="AllstaBox1">
            <p class="AllstaP1"></p>
            <p class="AllstaP2"></p>
            <span class="creatstore">{{amendmentVo.storeName}}</span>
            <span class="creatstore2">{{amendmentVo.createTime|converTime('YYYY-MM-DD HH:mm:ss')}}</span>
            <br />
            <span class="creatstore3">创建</span>
          </div>
          <!-- 供应商审核的意见 -->
          <div class="AllstaBox1" v-if="amendmentVo.supplierOpinion!=null">
            <p class="AllstaP1"></p>
            <p class="AllstaP2"></p>
            <span class="creatstore">{{amendmentVo.supplierName}}</span>
            <span
              class="creatstore2"
              v-if="amendmentVo.supplierCheckTime !=null"
            >{{amendmentVo.supplierCheckTime|converTime('YYYY-MM-DD HH:mm:ss')}}</span>
            <br />
            <span class="creatstore3" v-if="amendmentVo.status==4">审核通过</span>
            <span class="creatstore3" v-if="amendmentVo.status!=4">审核不通过</span>
            <br />
            <p class="creatstore4">意见：{{amendmentVo.supplierOpinion}}</p>
          </div>
          <!-- 门店审核的意见 -->
          <div class="AllstaBox1" v-if="amendmentVo.storeOpinion!=null">
            <p class="AllstaP1"></p>
            <p class="AllstaP2"></p>
            <span class="creatstore">{{amendmentVo.storeName}}</span>
            <span
              class="creatstore2"
              v-if="amendmentVo.storeUploadTime !=null"
            >{{amendmentVo.storeUploadTime|converTime('YYYY-MM-DD HH:mm:ss')}}</span>
            <br />
            <span class="creatstore3" v-if="amendmentVo.status==3">已上传意见</span>
            <span class="creatstore3" v-if="amendmentVo.status!=3">上传意见</span>
            <br />
            <p class="creatstore4">意见：{{amendmentVo.storeOpinion}}</p>
          </div>
          <!-- 总部意见审核的意见 -->
          <div class="AllstaBox1" v-if="amendmentVo.headquartersOpinion!=null">
            <p class="AllstaP1"></p>
            <p class="AllstaP2"></p>
            <span class="creatstore">{{amendmentVo.headquartersUsername}}</span>
            <span
              class="creatstore2"
              v-if="amendmentVo.headquartersCheckTime !=null"
            >{{amendmentVo.headquartersCheckTime|converTime('YYYY-MM-DD HH:mm:ss')}}</span>
            <br />
            <span class="creatstore3" v-if="amendmentVo.status==5">裁定通过</span>
            <br />
            <p class="creatstore4">意见：{{amendmentVo.headquartersOpinion}}</p>
          </div>
          <!-- 最后圈圈 -->
          <div class="AllstaBox1" v-if="amendmentVo.status == 4 || amendmentVo.status == 5">
            <p class="AllstaP1"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Cgrefuse",
  data() {
    return {
      amendmentCode: "",
      amendmentVo: {},
      subList: [],
      statusDetail: sessionStorage.getItem("xiustatus")
    };
  },
  created() {
    this.aaa();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    aaa() {
      var aaa = [];
      aaa.token = sessionStorage.getItem("token");
      aaa.amendmentCode = sessionStorage.getItem("xiuCode");
      let formData = new FormData();
      const obj = aaa;
      Object.keys(obj).forEach(key => {
        formData.append(key, obj[key]);
      });
      this.$axios.post("/sys/amendment/detail", formData).then(res => {
        if (res.data.code == "0000") {
          this.subList = res.data.data.subList;
          this.amendmentVo = res.data.data.amendmentVo;
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
    }
    // 修改table header的背景色
    // tableHeaderColor({ row, column, rowIndex, columnIndex }) {
    //   if (rowIndex === 0) {
    //     return "background-color:#01c8dc;color: #fff;";
    //   }
    // }
  }
};
</script>
<style scoped>
.Cgrefuse {
  background-color: #fff;
  min-height: 647px;
  height: 100%;
  min-width: 1700px;
  position: relative;
  overflow: hidden;
}
.detail {
  padding-bottom: 40px;
  padding-top: 10px;
}
.detail,
.CgdetImg_list {
  margin: 0 20px;
  background: #fff;
  border-radius: 10px;
}
.CgdetImg_list {
  width: 98%;
}
.M_upload {
  margin-top: 30px;
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
  margin-bottom: 20px;
  font-size: 12px;
}
.list p{
  width: 100%;
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
.CGBtnBack {
  text-decoration: none;
  float: right;
  margin-right: 20px;
  cursor: pointer;
  margin-top: 13px;
}
.allSta,
.creatstore3 {
  color: #e6000b;
}
.allSta {
  font-weight: 800;
  font-size: 16px;
  margin-bottom: 10px;
}
.AllstaBox1 {
  position: relative;
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
  /* height: 50px; */
  height: 84%;
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
.store_tit {
  margin-left: 20px;
  margin-bottom: 0;
}
.scollHide {
  position: absolute;
  left: 0;
  top: 0;
  right: -17px;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: scroll;
}
.xiuNumber {
  width: 310px;
}
</style>


