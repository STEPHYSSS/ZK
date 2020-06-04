<template>
  <div class="upload minWidth1600">
    <img @click="goback" class="backImg" src="@/assets/images/returnbutton.png" alt />
    <!-- 上传证据 -->
    <div class="detail">
       <!-- <div class="detailBackBtn">
        <img src="@/assets/returnbutton.png" @click="goback" alt="" class="codesty">
      </div> -->
      <div class="re_marg">
        <!-- <h3 class="re_detail h3mt">修正单上传证据</h3> -->
        <!-- <p class="tip_detail">您的商品确定需要修正，请您上传相关证据。</p> -->
        <div class="list">
          <div class="uploadxiu1">
            <p>
              修正单编号：
              <span>{{amendmentVo.code}}</span>
            </p>
            <p>
              创建日期：
              <span>{{amendmentVo.createTime |converTime('YYYY-MM-DD')}}</span>
            </p>
           
          </div>
          <div class="uploadxiu2">
            <p>
              验收日期：
              <span>{{amendmentVo.createTime |converTime('YYYY-MM-DD')}}</span>
            </p>
            <p>
              配送方：
              <span>{{amendmentVo.supplierName}}</span>
            </p>
            
          </div>
          <div class="uploadxiu3">
            <p>
              拒收总数：
              <span>{{amendmentVo.count}}</span>
            </p>
            <p>
              拒收总金额：
              <span>{{amendmentVo.amount}}</span>
            </p>
          </div>
          <div class="uploadxiu4">
            <p>
              原配送单编号：
              <span>{{amendmentVo.deliveryCode}}</span>
            </p>
            <p>
              拒收品项总数：
              <span>{{subList.length}}</span>
            </p>
          </div>
        </div>
        <div class="list_tab">
          <el-table
            :data="subList" style="width: 100%;" :header-cell-style="tableHeaderColor">
            <el-table-column label="序号" align="center" type="index"></el-table-column>
            <el-table-column prop="goodsCode" label="货号" align="center"></el-table-column>
            <el-table-column prop="goodsName" label="品名" align="center"></el-table-column>
            <el-table-column prop="spec" label="规格" align="center"></el-table-column>
            <el-table-column prop="count" label="拒收数" align="center"></el-table-column>
            <el-table-column prop="salesPrice" label="单品售价" align="center"></el-table-column>
            <el-table-column prop="amount" label="拒收总金额" align="center"></el-table-column>
            <el-table-column prop="reason" label="拒收原因" align="center"></el-table-column>
            <el-table-column prop="supplierAmendmentCount" label="供应商确认拒收数" width="154" align="center"></el-table-column>
            <el-table-column prop="finalRuleCount" label="最终裁定数量" align="center"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="img_list">
      <div class="G_upload re_marg">
        <div class="xiureasonBox">
          <div class="xiureasonLeft">
            <span><em class="option">*</em> 意见：</span>
          </div>
          <div class="xiureason">
              <textarea class="textInfo"  v-model="title" @blur="changeText"></textarea>
              <span class="wowr">{{title.length}}/{{titleMaxLength}}</span>
          </div>
          </div>
          <div class="wareShenhe">
            <el-button class="queryButton theBtn" @click="submitForm">确定</el-button>
          </div>
          <p class="allSta">全部动态</p>
            <div class="AllstaBox1">
                <p class="AllstaP1"></p>
                <p class="AllstaP2"></p>
                <span class="creatstore">{{amendmentVo.storeName}}</span>
                <span class="uploadCreat">{{amendmentVo.createTime|converTime('YYYY-MM-DD HH:mm:ss')}}</span>
                <br>
                <span class="creatstore3">创建</span>
            </div>
            <!-- 供应商审核的意见 -->
            <div class="AllstaBox1" v-if="amendmentVo.supplierOpinion !=null">
                <p class="AllstaP1"></p>
                <p class="AllstaP2"></p>
                <span class="creatstore">{{amendmentVo.supplierName}}</span>
                <span class="uploadCreat" v-if="amendmentVo.supplierCheckTime !=null">{{amendmentVo.supplierCheckTime|converTime('YYYY-MM-DD HH:mm:ss')}}</span>
                <br>
                <span class="creatstore3" v-if="amendmentVo.status==4">审核通过</span>
                <span class="creatstore3" v-if="amendmentVo.status!=4">审核不通过</span>
                <br>
                <p class="creatstore4">意见：{{amendmentVo.supplierOpinion}}</p>
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
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入意见'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
    return {
        // ruleForm:{
        //     storeOpinion:'',
        //     token:sessionStorage.getItem("token"),
        //     amendmentCode:sessionStorage.getItem("code1")
        // },
      amendmentVo: {},
      subList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      rules: {
        storeOpinion: [
          { required: true,validator: validatePass, trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ]
      },
      showoption:false,
      title:'',//意见
      titleMaxLength: 100
    };
  },
  created() {
    this.getDeatil();
  },
  methods: {
    changeText(){
      if(this.title == ''){
          this.showoption = true;
      }else if(this.title != ''){
          this.showoption = false;
      }
    },
    // 提交意见
      submitForm() {
        if(this.title == ''){
          this.$message.error('请输入意见');
        }else{
          this.$utils
          .post(this.reqApi.xinls+"/exam/amendent/store/check",qs.stringify({
            questionCode: sessionStorage.getItem("questionUUid"),
            code:this.$route.query.code,
            storeOpinion:this.title

          })).then(res=>{
              if(res.data.code==='0000'){
                this.$router.push({
                  name:"amendment"
                })
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
      },
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color:#fff;color: #444;";
      }
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //修正单详情
    getDeatil() {
      this.$utils
        .post(
         this.reqApi.xinls+ "/exam/amendent/detail",
          qs.stringify({
            code: this.$route.query.code,
            questionCode: sessionStorage.getItem("questionUUid"),
          })
        )
        .then(res => {
        //   console.log(res);
          if (res.data.code === "0000") {
            this.amendmentVo = res.data.data.info;
            this.subList = res.data.data.subList;
          } else if (res.data.code !== "0000") {
            this.$message.error(res.data.msg);
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
    },
    goback(){
      this.$router.push({
        name:'amendment'
      })
    }
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
  padding-bottom: 20px;
  position: relative;
  padding-top: 20px;
}
.detail {
  /* padding-bottom: 40px; */
  /* padding-top: 10px; */
}
.detail,
.img_list {
  background: #fff;
}
.img_list {
  padding-bottom: 30px;
}
.re_marg {
  margin: 0 20px;
}
.re_detail {
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
.uploadxiu1{
  width: 300px;
}
uploadxiu2,uploadxiu3{
  flex: 1;
}
.uploadxiu2{
  padding-right: 10%;
}
.uploadxiu4{
  flex:0.5;
  /* text-align: right; */
}
.uploadxiu4 p{
  padding-left: 40px;
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
  /* background: #dcf9fc; */
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
  /* text-align: center; */
}
/* 返回 */
.nav {
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
.textInfo{
  float: left;
  height: 70px;
  border: 1px solid #c8c8c8;
  resize: none;
  font-size: 15px;
  letter-spacing: 1px;
  width: 100%;
  font:14px/25px '\5FAE\8F6F\96C5\9ED1', Arial, Helvetica, sans-serif
}
.option{
  color: red;
}
.option2{
  color: red;
  text-align: left;
  display: inherit;
  position: absolute;
}
.wareShenhe{
  text-align: right;
  padding: 10px 0;
}
.optionG{
  margin: 0 9px;
}
.xiureasonBox{
    display: flex;
    width: 100%;
    box-sizing: border-box;
}
.xiureasonLeft{
    text-align: right;
    line-height: 70px;
}
.xiureason{
    flex: 1;
    position: relative;
}
.wowr{
  position: absolute;
  bottom: 0;right: 10px;
}
.creatstore{
  margin-left: 14px;
  font-weight: 800;
  width: 200px;
  display: inline-block;
}
.uploadCreat{
    margin-left: 30%;
}
.creatstore3,.creatPat{
    margin-left: 27px;
}
.creatPat{
    font-weight: 800;
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
.backImg {
    position: absolute;
    right: 20px;
    top: 0px;
    cursor: pointer;
    z-index: 55;
}
</style>


