<template>
  <div class="wareAmendCheck minWidth1600">
    <div class="detailBackBtn">
      <router-link :to="{path:'/wareAmendList'}">
        <img src="@/assets/returnbutton.png" alt class="codesty" />
      </router-link>
    </div>
    <div class="detail">
      <div class="re_marg">
           <el-row>
          <el-col :span="6">
            <div>修正单编号：
              <span>{{tableData2.code}}</span></div>
          </el-col>
          <el-col :span="6">
            <div> 验收日期：
              <span>{{tableData2.updateTime|converTime('YYYY-MM-DD')}}</span></div>
          </el-col>
          <el-col :span="6">
            <div>创建日期：
              <span>{{tableData2.createTime|converTime('YYYY-MM-DD')}}</span></div>
          </el-col>
          <el-col :span="6">
            <div> 配送方：
              <span>{{tableData2.supplierName}}</span></div>
          </el-col>
        </el-row>
         <el-row>
          <el-col :span="6">
            <div>原配送单编号：
              <span>{{tableData2.deliveryCode}}</span></div>
          </el-col>
          <el-col :span="6">
            <div></div>
          </el-col>
          <el-col :span="6">
            <div></div>
          </el-col>
          <el-col :span="6">
            <div></div>
          </el-col>
        </el-row>
        <div class="list">
          <div class="list_l">
            <p>
              
            </p>
            <p>
             
            </p>
          </div>
          <div class="list_c">
            <p>
            </p>
            <p>
             
            </p>
          </div>
          <div class="list_r">
            <p>
              
            </p>
          </div>
        </div>
        <div class="list_tab">
          <el-table :data="tableData" style="width: 100%;" max-height="600">
            <el-table-column prop="goodsCode" label="货号" align="center"></el-table-column>
            <el-table-column prop="goodsName" label="品名" align="center"></el-table-column>
            <el-table-column prop="spec" label="规格" align="center"></el-table-column>
            <el-table-column prop="salesPrice" label="单品售价" align="center"></el-table-column>
            <el-table-column prop="count" label="缺货数量" align="center"></el-table-column>
            <el-table-column label="类型" align="center">
              <template>
                <span v-if="tableData2.type == 'rejection'">拒收</span>
                <span v-if="tableData2.type == 'shortage'">缺货</span>
              </template>
            </el-table-column>
            <el-table-column prop="reason" label="原因" align="center"></el-table-column>
            <el-table-column label="供货确认数量" align="center">
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
    <div class="img_list">
      <div class="G_wareAmendCheck re_marg">
        <div class="reasonBox">
          <div class="reasonLeft">
            <span>
              <em class="option">*</em> 意见：
            </span>
          </div>
          <div class="reasoncenter">
            <textarea class="textInfo" v-model="WareSupplierOpinion" @blur="changeText"></textarea>
            <span class="wowr">{{WareSupplierOpinion.length}}/{{titleMaxLength}}</span>
          </div>
        </div>
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
          <span class="creatPat">总部中心仓库</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "wareAmendCheck",
  data() {
    return {
      tableData: [],
      tableData2: {},
      dialogImageUrl: "",
      dialogVisible: false,
      WareSupplierOpinion: "", //填写意见
      titleMaxLength: 100,
      list: [],
      showoption: false,
      jiluCount: 0,
      queNum: 0
    };
  },
  created() {
    this.getExamine();
  },
  methods: {
    changeText() {
      if (this.WareSupplierOpinion == "") {
        this.$message("请填写意见！");
        return;
      }
    },
    getExamine() {
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
    },
    // 审核通过
    shtg(a) {
      this.list = [];
      this.tableData.forEach((item, index) => {
        console.log(item)
        this.list.push({
          id: item.id,
          supplierAmendmentCount: item.supplierAmendmentCount
        });
        this.queNum = item.count;
      });
      this.list.forEach(adc => {
        this.jiluCount = adc.supplierAmendmentCount;
      });
      if (this.WareSupplierOpinion == "") {
        this.$message("请填写完整");
        return;
      }
      if(this.jiluCount == null){
        return this.$message.error('请输入数量！')
      }
      if (a == "N" && this.jiluCount == this.queNum) {
        this.$message.error("供应商确认数量不能与缺货数或拒收数相等");
        return;
      }
      this.$axios({
        url: window.apiWare + "amendment/check",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: sessionStorage.getItem("token"),
          amendmentCode: sessionStorage.getItem("WareInCode"),
          isPass: a,
          supplierOpinion: this.WareSupplierOpinion,
          jsonArray: JSON.stringify(this.list)
        })
      }).then(res => {
        if (res.data.code == "0000") {
          sessionStorage.setItem("isPassWare", a);
          this.$router.push({
            name: "wareAmendDetail",
            params: {
              amendmentCode: sessionStorage.getItem("WareInCode"),
              isPass: sessionStorage.getItem("isPassWare")
            }
          });
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
  },
  watch: {
    WareSupplierOpinion() {
      if (this.WareSupplierOpinion.length > this.titleMaxLength) {
        this.WareSupplierOpinion = String(this.WareSupplierOpinion).slice(
          0,
          this.titleMaxLength
        );
      }
    }
  }
};
</script>
<style scoped>
.wareAmendCheck {
  /* background-color: #f1f6fa; */
  min-height: 647px;
  padding-bottom: 20px;
  padding-top: 15px;
}
.detail {
  padding-bottom: 40px;
  padding-top: 20px;
}
.detail,
.img_list {
  width: 100%;
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
}
.img_list {
  padding-bottom: 30px;
}
.img_list,
.M_wareAmendCheck {
  margin-top: 30px;
}
.re_marg {
  margin-left: 35px;
  margin-right: 30px;
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
.shop_wareAmendCheck {
  height: 50px;
  background: #dcf9fc;
  line-height: 50px;
  padding-left: 10px;
}
.G_wareAmendCheck {
  padding-top: 20px;
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
  color: #e6000b;
  border: 1px solid #e6000b;
  border-radius: 5px;
  float: right;
  margin-right: 2%;
}
.btnback:hover {
  background-color: #e6000b;
  color: #fff;
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
.wareShenhe {
  text-align: right;
  margin-top: 20px;
}
.textInfo {
  float: left;
  width: 99.6%;
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
.reasonBox {
  display: flex;
  width: 100%;
}
.reasonLeft {
  text-align: left;
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
.creatstore3,
.creatPat {
  margin-left: 27px;
}
.creatPat {
  font-weight: 800;
}
.chaxunBtn {
    background-color: #434444;
    color: #fff;
    border: none;
    width: auto;
}

.chongzhiBtn {
    background-color: #fff;
    color: #444444;
    border: 1px solid #555555;
    width: auto;
}
</style>


