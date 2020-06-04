<template>
  <div id="suppliermanagement">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
      <el-breadcrumb-item :to="{ path: '/operatIndex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>供应商管理</el-breadcrumb-item>
      <el-breadcrumb-item>编辑</el-breadcrumb-item>
    </el-breadcrumb> -->
    <div class="ovle">
      <p class="store_tit">编辑</p>
    <div class="frombox">
      <el-form
        :model="ruleForm"
        :label-position="labelPosition"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="供应商名称:" label-width="120px" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="供应商简称:" label-width="120px">
          <el-input v-model="ruleForm.abbreviation"></el-input>
        </el-form-item>
        <el-form-item label="类型:" prop="type" label-width="120px">
          <el-select v-model="ruleForm.type" placeholder="请选择">
            <el-option
              v-for="(item,index) in suppliType"
              :key="index"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在区域:" label-width="120px" prop="province">
          <ul class="city" style="display:inline-flex">
            <li>
              <!-- 省市区 -->
              <el-select v-model="ruleForm.province" placeholder="请选择" @change="chooseProvince">
                <el-option
                  v-for="(item,index) in inProvince"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </li>
            <li>
              <el-select v-model="ruleForm.city" placeholder="请选择" @change="chooseCity">
                <el-option
                  v-for="(item,index) in inCity"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </li>
            <li>
              <el-select v-model="ruleForm.area" placeholder="请选择" @change="chooseArea">
                <el-option
                  v-for="(item,index) in inArea"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </li>
          </ul>
        </el-form-item>
        <el-form-item label="详细地址:" label-width="120px" prop="address">
          <el-input type="textarea" v-model="ruleForm.address" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="联系人:" label-width="120px">
          <el-input v-model="ruleForm.contactsName"></el-input>
        </el-form-item>
        <el-form-item label="联系方式:" label-width="120px">
          <el-input v-model="ruleForm.contactsPhone" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
        </el-form-item>
        <el-form-item label="供应方式:" prop="supplyMode" label-width="120px">
          <el-select v-model="ruleForm.supplyMode" placeholder="请选择">
            <el-option label="直送门店" value="Z"></el-option>
            <el-option label="仓库配送" value="W"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="采购中心:" prop="purchase" label-width="120px">
          <el-select v-model="ruleForm.purchase" placeholder="请选择">
            <el-option
              v-for="(item,index) in supPurchase"
              :key="index"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="物流中心:" prop="logistics" label-width="120px">
          <el-select v-model="ruleForm.logistics" placeholder="请选择">
            <el-option
              v-for="(item,index) in logisticbb"
              :key="index"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="到货周期(天):" prop="arrivalCycle" label-width="120px">
          <el-input
            v-model="ruleForm.arrivalCycle"
            @blur="checkInt(ruleForm.arrivalCycle,100)"
            onkeyup="this.value=this.value.replace(/\D/g,'')"
            placeholder="请输入小于100的天数"
          ></el-input>
        </el-form-item>
        <el-form-item label="证照信息" label-width="120px">
          <el-upload
            :action="`${this.uploadUrl}/image/upload`"
            list-type="picture-card"
            id="picDiv"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="onSuccess"
            :before-upload="beforeUpload"
            :on-change="astrict"
            :data="data1"
            name="files"
            accept=".jpg, .jpeg, .png, .JPG, .JPEG"
            :file-list="fileList"
            :show-file-list="true"
            :limit="limitCount"
            :class="{hide:hideUpload}"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <span style="color:red">图片(最多上传5张图片，单张图片2M以内)</span>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt>
          </el-dialog>
        </el-form-item>
        <el-form-item class="center">
          <el-button class="theBtn queryButton" @click="submitForm('ruleForm')">确定</el-button>
          <el-button class="theBtn resetButton" @click="resetForm">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      data1: {
        token: sessionStorage.getItem("token")
      },
      limitCount: 5,
      hideUpload: false,
      fileList: [],
      fileSizeIsSatisfy: true,
      dialogImageUrl: "",
      dialogVisible: false,
      ruleForm: {
        name: "", //供应商名称
        abbreviation: "", //简称
        type: "",
        supplyMode: "",
        province: "",
        city: "",
        area: "",
        address: "",
        contactsName: "", //联系人
        contactsPhone: "", //联系方式
        purchase: "", //采购
        logistics: "", //物流
        arrivalCycle: "", //到货周期
        files: "",
        token: sessionStorage.getItem("token"),
        code: ""
      },
      inProvince: [], //下拉遍历省
      inCity: [], //下拉遍历市
      inArea: [], //下拉遍历区
      suppliType: [], //类型下拉选
      supPurchase: [], //采购下拉选
      logisticbb: [], //物流下拉选
      addInp: false,
      mask: false,
      labelPosition: "right",
      formInline: {
        user: "",
        region: ""
      },
      mark: true,
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { max: 50, message: "长度不超过50字符", trigger: "blur" }
        ],
        type: [{ required: true, message: "请选择内容", trigger: "change" }],
        arrivalCycle: [
          { required: true, message: "请输入到货日期", trigger: "blur" }
        ],
        purchase: [
          { required: true, message: "请选择内容", trigger: "change" }
        ],
        logistics: [
          { required: true, message: "请选择内容", trigger: "change" }
        ],
        province: [
          { required: true, message: "请选择所在区域", trigger: "change" }
        ],
        supplyMode: [
          { required: true, message: "请选择供应方式", trigger: "change" }
        ]
      }
    };
  },
  created() {
    this.getEdit();
    this.showother();
    this.suPurchase();
    this.supplogistics();
  },
  mounted() {
    // 进入页面就执行城市列表
    let that = this;
    that.$axios
      .post(`${window.apiUrl}city/list`)
      .then(res => {
        if (res.data.code == "0000") {
          that.inProvince = res.data.data;
        }
      })
      .catch(err => {
        console.log("数据异常", err);
      });
  },
  methods: {
    astrict(file, fileList) {
      this.hideUpload = fileList.length >= this.limitCount;
    },
    // 第二种图片上传的方式
    handleRemove(file, fileList) {
      this.hideUpload = fileList.length >= this.limitCount;
      this.ruleForm.resourceCodes = [];
      fileList.forEach(item => {
        if (item.response) {
          this.ruleForm.resourceCodes.push(item.response.data);
        } else {
          this.ruleForm.resourceCodes.push(item.url);
        }
      });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    onSuccess(response, file, fileList) {
      this.ruleForm.resourceCodes = [];
      fileList.forEach(item => {
        if (item.response) {
          this.ruleForm.resourceCodes.push(item.response.data);
        } else {
          this.ruleForm.resourceCodes.push(item.url);
        }
      });
    },
    beforeUpload(file) {
      if (file.size > 2 * 1024 * 1024) {
        return this.$message.error(file.name + "图片超过2M 不允许上传");
      }
    },
    getEdit() {
      // const _this = this;
      let token = sessionStorage.getItem("token");
      let code = this.$route.params.code;
      this.$axios({
        url: window.apiUrl + "supplier/detail",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: token,
          code: this.$route.query.code
        })
      })
        .then(res => {
          if (res.data.code == "0000") {
            this.ruleForm = res.data.data;
            if (this.ruleForm.resourceCodes != null) {
              this.fileList = [];
              this.ruleForm.resourceCodes = JSON.parse(
                this.ruleForm.resourceCodes
              );
              if (this.ruleForm.resourceCodes.length > 0) {
                // let url = "http://192.168.1.168:8080";
                // let url = "";
                for (const i of this.ruleForm.resourceCodes) {
                  i = {
                    url: this.uploadUrl + i
                    // name: "营业执照" + index + ".jpg",
                    // size: 1*1024*1024
                  };

                  this.fileList.push(i);
                  this.hideUpload = this.fileList.length >= this.limitCount;
                }
              }
            }
          } else if (res.data.code === "6666") {
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
          console.log("数据有误");
        });
    },
    // 城市列表
    chooseProvince(value) {
      for (const key in this.inProvince) {
        if (this.inProvince[key].id == value)
          this.ruleForm.province = this.inProvince[key].name;
      }
      this.ruleForm.city = "";
      this.ruleForm.area = "";
      this.$axios({
        url: window.apiUrl + "city/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          pid: value
        })
      })
        .then(res => {
          if (res.data.code == "0000") {
            this.inCity = res.data.data;
          }
        })
        .catch(err => {
          console.log("数据异常", err);
        });
    },
    checkInt(n, max) {
      if (n < 0 || n > max) {
        return this.$message.error("请输入小于" + max + "的正整数！！");
      }
    },
    // 市下拉change事件
    chooseCity(value) {
      for (const key in this.inCity) {
        if (this.inCity[key].id == value)
          this.ruleForm.city = this.inCity[key].name;
      }
      this.ruleForm.area = "";
      this.$axios({
        url: window.apiUrl + "city/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          pid: value
        })
      })
        .then(res => {
          if (res.data.code == "0000") {
            this.inArea = res.data.data;
          }
        })
        .catch(err => {
          console.log("数据异常", err);
        });
    },
    chooseArea(value) {
      for (const key in this.inArea) {
        if (this.inArea[key].id == value)
          this.ruleForm.area = this.inArea[key].name;
      }
    },
    //  编辑提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.ruleForm.city) return this.$message.error("请选择所在区域");
          if (!this.ruleForm.area) return this.$message.error("请选择所在区域");
          this.ruleForm.token = sessionStorage.getItem("token");
          this.ruleForm.code = this.$route.query.code;
          this.$axios
            .post(
              "/sys/supplier/update",
              qs.stringify({
                token: this.ruleForm.token,
                code: this.$route.query.code,
                type: this.ruleForm.type,
                name: this.ruleForm.name,
                province: this.ruleForm.province,
                city: this.ruleForm.city,
                area: this.ruleForm.area,
                logistics: this.ruleForm.logistics,
                purchase: this.ruleForm.purchase,
                arrivalCycle: this.ruleForm.arrivalCycle,
                abbreviation: this.ruleForm.abbreviation,
                address: this.ruleForm.address,
                contactsName: this.ruleForm.contactsName,
                contactsPhone: this.ruleForm.contactsPhone,
                resourceCodes: JSON.stringify(this.ruleForm.resourceCodes),
                supplyMode: this.ruleForm.supplyMode
              })
            )
            .then(res => {
              if (res.data.code === "0000") {
                this.$router.push({
                  name: "smanagement"
                });
              } else {
                this.$message.error(res.data.msg);
              }
            });
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$router.push({name:'smanagement'})
      // this.$router.go(-1);
    },
    // 采购中心下拉选supplier_purchase_select
    suPurchase() {
      let _this = this;
      let token = sessionStorage.getItem("token");
      let code = "supplier_purchase_select";
      _this
        .$axios({
          url: window.apiUrl + "dictionary/list",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            token: token,
            code: code
          })
        })
        .then(res => {
          if ((res.data.code = "0000")) {
            _this.supPurchase = res.data.data;
          }
        });
    },
    // 供应商类型下拉选	supplier_type_select
    showother() {
      let _this = this;
      let token = sessionStorage.getItem("token");
      let code = "supplier_type_select";
      _this
        .$axios({
          url: window.apiUrl + "dictionary/list",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            token: token,
            code: code
          })
        })
        .then(res => {
          if ((res.data.code = "0000")) {
            _this.suppliType = res.data.data;
          }
        })
        .catch(err => {
          console.log("数据异常", err);
        });
    },
    // 物流下拉选
    supplogistics() {
      let _this = this;
      let token = sessionStorage.getItem("token");
      let code = "supplier_logistics_select";
      _this
        .$axios({
          url: window.apiUrl + "dictionary/list",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            token: token,
            code: code
          })
        })
        .then(res => {
          if ((res.data.code = "0000")) {
            _this.logisticbb = res.data.data;
          }
        });
    }
  }
};
</script>

<style scoped>
#suppliermanagement {
  box-shadow: 0px 2px 10px #ccc;
  min-width: 1200px;
  border-radius: 4px;
  background: #fff;
  position: relative;
  overflow: hidden;
  height: 100%;
}
.ovle{
  padding: 0 20px;
  background: #fff;
  position: absolute;
  left: 0;
  top: 0;
  right: -17px;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  height: 100%;
}

#suppliermanagement .frombox {
  width: 500px;
}
#suppliermanagement .distpicker-address-wrapper select {
  width: 123px;
  height: 30px;
  padding: 0 10px;
  font-size: 13px;
}
#suppliermanagement .el-select{
  width: 100%;
}
#suppliermanagement .frombox .city li {
  width: 121px;
  margin-right: 8px;
}
#suppliermanagement .center {
  text-align: center;
}
.store_tit {
  padding-top: 20px;
  padding-bottom: 20px;
  font-size: 14px;
  font-weight: 900;
}
</style>
