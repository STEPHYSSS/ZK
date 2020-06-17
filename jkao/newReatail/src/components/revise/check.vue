<template>
  <div class="Checks">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
            <el-breadcrumb-item :to="{ path: '/suppIndex' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item >订单管理</el-breadcrumb-item>
            <el-breadcrumb-item >修正单管理</el-breadcrumb-item>
        </el-breadcrumb>
    -->
    <div class="Checksdetail">
      <div class="re_marg">
        <p class="store_tit">修正单管理（{{this.shenPass | amendTip}}）</p>
        <router-link :to="{path:'/amendList'}" class="checkWBtnBack">
          <img src="@/assets/Rbutton.png"/>
        </router-link>
        <div class="list">
          <el-row>
            <el-col :span="6">
              <p>
                修正单编号：
                <span>{{tableData2.code}}</span>
              </p>
            </el-col>
            <el-col :span="6">
              <p>
                创建日期：
                <span
                  v-if="tableData2.createTime!=null"
                >{{tableData2.createTime|converTime('YYYY-MM-DD')}}</span>
              </p>
            </el-col>
            <el-col :span="6">
              <p>
                原配送单编号：
                <span>{{tableData2.deliveryCode}}</span>
              </p>
            </el-col>
            <el-col :span="6">
              <p>
                验收日期：
                <span
                  v-if="tableData2.createTime!=null"
                >{{tableData2.createTime|converTime('YYYY-MM-DD')}}</span>
              </p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <p>
                配送方：
                <span>{{tableData2.supplierName}}</span>
              </p>
            </el-col>
            <el-col :span="6">
              <p v-if="tableData2.type == 'rejection'">
                拒收品项总数：
                <span>{{tableData2.item}}</span>
              </p>
              <p v-if="tableData2.type == 'shortage'">
                缺货品项总数：
                <span>{{tableData2.item}}</span>
              </p>
            </el-col>
            <el-col :span="6">
              <p v-if="tableData2.type == 'rejection'">
                拒收总数：
                <span>{{tableData2.count}}</span>
              </p>
              <p v-if="tableData2.type == 'shortage'">
                缺货总数：
                <span>{{tableData2.count}}</span>
              </p>
            </el-col>
            <el-col :span="6">
              <p>
                门店：
                <span>{{tableData2.storeName}}</span>
              </p>
            </el-col>
          </el-row>
        </div>
        <!-- shortage缺货 -->
        <div class="list_tab">
          <!-- 拒收 -->
          <el-table :data="tableData" style="width: 100%;">
            <el-table-column prop="goodsCode" label="货号" align="center"></el-table-column>
            <el-table-column prop="barcode" label="国际条码" align="center"></el-table-column>
            <el-table-column prop="goodsName" label="品名" align="center"></el-table-column>
            <el-table-column prop="spec" label="规格" align="center"></el-table-column>
            <el-table-column
              prop="count"
              label="拒收数"
              align="center"
              v-if="tableData2.type == 'rejection'"
            ></el-table-column>
            <el-table-column
              prop="count"
              label="缺货数"
              align="center"
              v-if="tableData2.type == 'shortage'"
            ></el-table-column>
            <el-table-column
              prop="reason"
              label="拒收原因"
              align="center"
              v-if="tableData2.type == 'rejection'"
            ></el-table-column>
            <el-table-column
              prop="reason"
              label="缺货原因"
              align="center"
              v-if="tableData2.type == 'shortage'"
            ></el-table-column>
            <el-table-column prop="supplierAmendmentCount" label="供应商确认数量" align="center"></el-table-column>
            <el-table-column prop="finalRuleCount" label="最终裁定数量" align="center"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="checkimg_list">
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
          <span class="creatstore3" v-if="tableData2.status!=3">上传意见</span>
          <span class="creatstore3" v-if="tableData2.status==3">已上传意见</span>
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
      token: this.$route.params.token,
      code: sessionStorage.getItem("amedCode"),
      tableData: [],
      tableData2: {},
      shenPass: sessionStorage.getItem("shenheStaus")
    };
  },
  created() {
    this.getCheck();
  },
  methods: {
    getCheck() {
      let _this = this;
      let token = _this.token;
      let code = _this.code;
      if (token == null) {
        _this.$message({
          showClose: true,
          message: "token异常，请重新登录",
          type: "error"
        });
        const timer = setTimeout(() => {
          clearTimeout(timer);
          _this.$router.push({ name: "login" });
        }, 3000);
      }
      _this
        .$axios({
          url: window.apiSuppli + "amendment/detail",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            token: sessionStorage.getItem("token"),
            amendmentCode: code
          })
        })
        .then(res => {
          // const {code,data:{subList,amendmentVo}} = res.data
          if (res.data.code == "0000") {
            // _this.imgList = amendmentVo.storeUpload.split(',')//门店图片
            // _this.imgList2 = amendmentVo.supplierUpload.split(',')//供应商图片
            _this.tableData2 = res.data.data.amendmentVo;
            _this.tableData = res.data.data.subList;
          } else if (code == "6666") {
            _this.$message({
              showClose: true,
              message: "token异常，请重新登录",
              type: "error"
            });
            const timer = setTimeout(() => {
              clearTimeout(timer);
              _this.$router.push({ name: "login" });
            }, 3000);
          } else {
            _this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log("数据异常", err);
        });
    }
  },
  filters: {
    amendTip(value) {
      if (value == "1") {
        return "待审核";
      } else if (value == "2") {
        return "审核不通过";
      } else if (value == "3") {
        return "已上传意见";
      } else if (value == "4") {
        return "审核通过";
      } else if (value == "5") {
        return "裁定通过";
      }
    }
  }
};
</script>
<style scoped>
.Checks {
  background-color: #fff;
  min-height: 647px;
  min-width: 1700px;
  height: 100%;
  box-shadow: 0px 2px 10px #ccc;
}
.Checksdetail {
  padding-bottom: 40px;
  padding-top: 10px;
}
.Checksdetail,
.checkimg_list {
  margin: 0 auto;
  background: #fff;
}
.checkimg_list {
  padding-bottom: 30px;
}
.M_upload {
  margin-top: 30px;
}
.re_marg {
  margin: 0 20px;
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
.list{
    margin-bottom: 20px;
}
.list p {
  width: 100%;
  font-size: 12px;
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
.checkWBtnBack {
  text-decoration: none;
  float: right;
  cursor: pointer;
  margin-top: 13px;
}
.allSta {
  font-weight: 800;
  font-size: 16px;
  margin-bottom: 10px;
}
.allSta,
.creatstore3 {
  color: #e6000b;
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


