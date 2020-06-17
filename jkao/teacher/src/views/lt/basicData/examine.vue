<template>
  <div class="upload">
     <img @click="goback" class="backImg" src="@/assets/images/returnbutton.png" alt />
    <!-- 上传证据 -->
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
            <el-breadcrumb-item :to="{ path: '/suppIndex' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item >订单管理</el-breadcrumb-item>
            <el-breadcrumb-item >修正单管理</el-breadcrumb-item>
    </el-breadcrumb>-->
    <div class="detail2">
      <div class="uploadReMarg">
        <p class="store_tit">修正单管理（待审核）</p>
        <router-link :to="{path:'/amendList'}" class="ExBtnback">
          <!-- <img src="@/assets/Rbutton.png" /> -->
        </router-link>
        <!-- <p class="tip_detail ">您的商品确定需要修正，请您上传相关证据。</p> -->
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
                <span>{{tableData2.createTime|converTime('YYYY-MM-DD')}}</span>
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
                <span>{{tableData2.createTime|converTime('YYYY-MM-DD')}}</span>
              </p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <p>
                配送方：
                <span v-if="tableData2.sourceType=='S'">供应商</span>
                <span v-if="tableData2.sourceType=='W'">仓库</span>
              </p>
            </el-col>
            <el-col :span="6">
              <p>
                拒收品项总数：
                <span>{{tableData2.item}}</span>
              </p>
            </el-col>
            <el-col :span="6">
              <p>
                拒收总数：
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
        <div class="list_tab">
          <el-table :data="tableData" style="width: 100%;">
            <el-table-column prop="goodsCode" label="货号" align="center"></el-table-column>
            <el-table-column prop="barcode" label="国际条码" align="center"></el-table-column>
            <el-table-column prop="goodsName" label="品名" align="center"></el-table-column>
            <el-table-column prop="spec" label="规格" align="center"></el-table-column>
            <el-table-column prop="count" label="拒收数" align="center"></el-table-column>
            <el-table-column prop="reason" label="拒收原因" align="center"></el-table-column>
            <el-table-column label="配送方确认数量" align="center">
              <template slot-scope="scope">
                <el-input
                  type="text"
                  oninput="value=value.replace(/[^\d]/g,'')"
                  v-model="scope.row.supplierAmendmentCount"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="finalRuleCount" label="最终裁定数量" align="center"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="img_list2">
      <div class="G_upload uploadReMarg">
        <div class="reasonBox">
          <div class="reasonLeft">
            <span>
              <em class="option">*</em> 意见：
            </span>
          </div>
          <div class="reasoncenter">
            <textarea class="textInfo" v-model="title"></textarea>
            <span class="wowr">{{title.length}}/{{titleMaxLength}}</span>
          </div>
        </div>
        <div class="konge"></div>
        <div class="wareShenhe">
          <el-button class="chaxunBtn" @click="shtg('Y')">审核通过</el-button>
          <el-button class="chongzhiBtn" @click="shtg('N')">审核不通过</el-button>
        </div>
        <p class="allSta">全部动态</p>
        <div class="AllstaBox1">
          <p class="AllstaP1"></p>
          <p class="AllstaP2"></p>
          <span class="creatstore">{{tableData2.storeName}}</span>
          <span class="creatstore2">{{tableData2.createTime|converTime('YYYY-MM-DD HH:mm:ss')}}</span>
          <br />
          <span class="creatstore3">创建</span>
        </div>
        <div class="AllstaBox1">
          <p class="Allcircle"></p>
          <span class="creatPat">{{tableData2.supplierName}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "upload",
  data() {
    return {
      token: this.$route.params.token,
      code: this.$route.params.amendmentCode,
      tableData: [],
      tableData2: {},
      dialogImageUrl: "",
      dialogVisible: false,
      title: "",
      titleMaxLength: 100,
      list: [],
      imageUrl: [],
      changeList: [], // 记录文件信息的列表
      jiluCount: 0,
      queNum: 0
    };
  },
  created() {
    this.getExamine();
  },
  methods: {
    goback(){
      this.$router.push('/amendment')
    },
    changeText() {
      if (this.title == "") {
        this.$message("请填写意见");
      }
    },
    getExamine() {
      let _this = this;
      let code = _this.code;
      _this
        .$utils({
          url: this.reqApi.xinls + "/exam/amendent/detail",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            questionCode: sessionStorage.getItem("questionUUid"),
            code: this.$route.query.code
          })
        })
        .then(res => {
          const {
            code,
            data: { subList, info }
          } = res.data;
          if (code == "0000") {
            _this.tableData2 = info;
            _this.tableData = subList;
          } else if (res.data.code == "6666") {
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
    },
    // 上传图片
    hadea(file, fileList) {
      this.changeList = fileList;
    },
    // 审核通过
    shtg(a) {
      let _this = this;
      _this.list = [];
      _this.tableData.forEach((item, index) => {
        _this.list.push({
          id: item.id,
          number: item.supplierAmendmentCount
        });
        _this.queNum = item.count;
      });
      _this.list.forEach(adc => {
        _this.jiluCount = adc.supplierAmendmentCount;
      });
      if (_this.title == "" || _this.jiluCount == "") {
        this.$message.error("请填写完整");
        return;
      }
      // if (a == "N" && _this.jiluCount == _this.queNum) {
      //   this.$message.error("供应商确认数量不能与缺货数或拒收数相等");
      //   return;
      // }
      if (a == "Y" && this.jiluCount > this.queNum) {
        this.$message.error("供应商确认数量不能大于缺货数或拒收数，请重新填写");
        return;
      }
      if (a == "N" && this.jiluCount > this.queNum) {
        this.$message.error("供应商确认数量不能大于缺货数或拒收数，请重新填写");
        return;
      }
      let token = _this.token;
      let code = _this.code;
      _this
        .$utils({
          url: this.reqApi.xinls + "/exam/amendent/supplier/check",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            questionCode: sessionStorage.getItem("questionUUid"),
            code: this.$route.query.code,
            isPass: a,
            supplierOpinion: _this.title,
            subSet: JSON.stringify(_this.list)
            // files: _this.changeList.map((item) => ({ type: item.raw.type, name: item.name }))
          })
        })
        .then(res => {
          if (res.data.code == "0000") {
            sessionStorage.setItem("isPassbbb", a);
            this.$router.push({
              name: "amendment"
            });
          } else if (res.data.code == "6666") {
            this.$message({
              showClose: true,
              message: "token异常，请重新登录",
              type: "error"
            });
          } else {
            this.$message.error(res.data.msg);
          }
        });
    }
    // handleRemove(file, fileList) {
    // },
    // handlePictureCardPreview(file) {
    //     this.dialogImageUrl = file.url;
    //     this.dialogVisible = true;
    // }
  },
  watch: {
    title() {
      if (this.title.length > this.titleMaxLength) {
        this.title = String(this.title).slice(0, this.titleMaxLength);
      }
    }
  }
};
</script>
<style scoped>
.upload {
  background-color: #fff;
  height: 100%;
  /* min-width: 1700px; */
  min-height: 647px;
  position: relative;
}
.detail2 {
  padding-bottom: 40px;
  padding-top: 10px;
  font-size: 12px;
}
.detail2,
.img_list2 {
  margin: 0 auto;
  background: #fff;
}
.img_list2 {
  padding-bottom: 30px;
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
}
.list p {
  width: 100%;
  font-size: 12px;
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
.ExBtnback {
  text-decoration: none;
  float: right;
  margin-top: 17px;
}
.ExBtnback:hover {
  /* background-color:#01c8dc; */
  color: #444444;
}
.wareShenhe {
  text-align: right;
}
.textInfo {
  float: left;
  width: 100%;
  height: 70px;
  border: 1px solid #c8c8c8;
  resize: none;
  font-size: 15px;
  letter-spacing: 1px;
  font: 14px/25px "\5FAE\8F6F\96C5\9ED1", Arial, Helvetica, sans-serif;
}
.option {
  color: red;
}
.option2 {
  color: red;
  text-align: left;
  display: inherit;
}
h3 {
  padding-bottom: 0;
  margin-bottom: 0;
}
.reasonBox {
  display: flex;
  width: 99.5%;
}
.reasonLeft {
  text-align: right;
  line-height: 70px;
}
.reasoncenter {
  flex: 11;
  position: relative;
}
.wowr {
  position: absolute;
  bottom: 0;
  right: 10px;
}
.allSta {
  font-weight: 800;
  font-size: 16px;
  margin-bottom: 10px;
}
.AllstaBox1 {
  height: 70px;
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
  height: 50px;
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
  margin-left: 20%;
}
.creatstore3 {
  color: #e6000b;
}
.creatstore3,
.creatPat {
  margin-left: 27px;
}
.creatPat {
  font-weight: 800;
}
.uploadReMarg {
  margin: 0 20px;
}
.chaxunBtn,
.chongzhiBtn {
  background-color: #434444;
  color: #fff;
  border: none;
  width: auto;
  height: 32px;
  border-radius: 5px;
  line-height: 10px;
}
.chongzhiBtn {
  background-color: #fff;
  color: #444444;
  border: 1px solid #555555;
  margin-left: 10px;
}
.chaxunBtn:hover,
.chongzhiBtn:hover {
  cursor: pointer;
  background-color: rgba(68, 68, 68, 0.8);
  color: #fff;
  /* transform: scale(0.9); */
  border-color: #444;
}
.backImg {
    position: absolute;
    right: 20px;
    top: 0px;
    cursor: pointer;
    z-index: 55;
}
</style>


