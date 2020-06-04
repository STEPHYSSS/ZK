<template>
  <div id="addSuppWrapp">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
      <el-breadcrumb-item :to="{ path: '/operatIndex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>供应商管理</el-breadcrumb-item>
      <el-breadcrumb-item>新增</el-breadcrumb-item>
    </el-breadcrumb> -->
    <div class="suppliermanagement">
      <h4 style="padding:20px 0;margin-left:20px;">新增供应商</h4>
        <span class="hint">提示：</span>
        <span class="hint_tit">创建成功后凭系统生成的编号和初始密码123456登录，请提醒门店及时修改密码！</span>
      <div class="frombox">
        <el-form
          :model="ruleForm"
          :label-position="labelPosition"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="供应商名称:" prop="name" label-width="120px">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="供应商简称:" prop="abbreviation" label-width="120px">
            <el-input v-model="ruleForm.abbreviation"></el-input>
          </el-form-item>
          <el-form-item label="类型:" prop="type" label-width="120px">
            <el-select v-model="ruleForm.type" placeholder="请选择">
              <el-option
                v-for="(addItem,index) in suppliType"
                :key="index"
                :label="addItem.name"
                :value="addItem.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所在区域:" label-width="120px" prop="province">
            <ul class="city" style="display:inline-flex">
              <li>
                <!-- 省市区 -->
                <el-select v-model="ruleForm.province" placeholder="请选择" @change="chooseProvince">
                  <el-option
                    v-for="(provitem,index) in inProvince"
                    :key="index"
                    :label="provitem.name"
                    :value="provitem.id"
                  ></el-option>
                </el-select>
              </li>
              <li>
                <el-select v-model="ruleForm.city" placeholder="请选择" @change="chooseCity">
                  <el-option
                    v-for="(cityitem,index) in inCity"
                    :key="index"
                    :label="cityitem.name"
                    :value="cityitem.id"
                  ></el-option>
                </el-select>
              </li>
              <li>
                <el-select v-model="ruleForm.area" placeholder="请选择" @change="chooseArea">
                  <el-option
                    v-for="(areaitem,index) in inArea"
                    :key="index"
                    :label="areaitem.name"
                    :value="areaitem.id"
                  ></el-option>
                </el-select>
              </li>
            </ul>
          </el-form-item>
          <el-form-item label="详细地址:" prop="address" label-width="120px">
            <el-input type="textarea" v-model="ruleForm.address" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="联系人:" prop="contactsName" label-width="120px">
            <el-input v-model="ruleForm.contactsName"></el-input>
          </el-form-item>
          <el-form-item label="联系方式:" prop="contactsPhone" label-width="120px">
            <el-input v-model="ruleForm.contactsPhone" oninput="value=value.replace(/[^\d]/g,'')" maxlength="11"></el-input>
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
                v-for="(caiitem,index) in supPurchase"
                :key="index"
                :label="caiitem.name"
                :value="caiitem.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="物流中心:" prop="logistics" label-width="120px">
            <el-select v-model="ruleForm.logistics" placeholder="请选择">
              <el-option
                v-for="(logiitem,index) in logistics"
                :key="index"
                :label="logiitem.name"
                :value="logiitem.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="到货周期(天):" prop="arrivalCycle" label-width="120px">
            <el-input
              v-model="ruleForm.arrivalCycle"
              @blur="checkInt(ruleForm.arrivalCycle,100)"
              onkeyup="this.value=this.value.replace(/\D/g,'')"
              placeholder="请输入"
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
            <el-button class="AllquedingBtn" @click="submitForm('ruleForm')">确定</el-button>
            <el-button class="theBtn resetButton" @click="resetForm()">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="konge"></div>
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
        token: sessionStorage.getItem("token"),
        code: "",
        type: "",
        name: "",
        supplyMode: "",
        province: "",
        city: "",
        area: "",
        address: "",
        openTime: "",
        shutdownTime: "",
        contactsName: "",
        contactsPhone: "",
        businessTimeStart: "",
        businessTimeEnd: "",
        resourceCodes: []
      },
      inProvince: [], //下拉遍历省
      inCity: [], //下拉遍历市
      inArea: [], //下拉遍历区
      suppliType: [], //类型下拉选
      supPurchase: [], //采购下拉选
      logistics: [], //物流下拉选
      fileList: [], //文件
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
  created() {
    this.showother();
    this.suPurchase();
    this.supplogistics();
  },
  methods: {
    astrict(file, fileList) {
      this.hideUpload = fileList.length >= this.limitCount;
    },
    // 第二种图片上传的方式
    handleRemove(file, fileList) {
      this.hideUpload = fileList.length >= this.limitCount;
      this.ruleForm.resourceCodes = [];
      if (fileList.length > 0) {
        fileList.forEach(item => {
          this.ruleForm.resourceCodes.push(item.response.data);
        });
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    onSuccess(response, file, fileList) {
      this.ruleForm.resourceCodes = [];
      fileList.forEach(item => {
        this.ruleForm.resourceCodes.push(item.response.data);
      });
    },
    beforeUpload(file) {
      if (file.size > 2 * 1024 * 1024) {
        return this.$message.error(file.name + "图片超过2M 不允许上传");
      }
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.ruleForm.city) return this.$message.error("请选择所在区域");
          if (!this.ruleForm.area) return this.$message.error("请选择所在区域");
          this.ruleForm.token = sessionStorage.getItem("token");
          this.$axios
            .post(
              "/sys/supplier/add",
              qs.stringify({
                token: this.ruleForm.token,
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
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    checkInt(n, max) {
      if (n < 0 || n > max) {
        return this.$message.error("请输入小于" + max + "的正整数！！");
      }
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
    resetForm(formName) {
      //  this.$router.push({name:'smanagement'})
      this.$router.go(-1);
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
          if (res.data.code == "0000") {
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
            _this.logistics = res.data.data;
          }
        });
    }
  }
};
</script>

<style scoped>
#addSuppWrapp {
  background-color: #fff;
  box-shadow: 0px 2px 10px #ccc;
  min-height: 647px;
  min-width: 1200px;
  position: relative;
  overflow: hidden;
  height: 100%;
}
#addSuppWrapp .frombox {
  width: 500px;
}
#addSuppWrapp .frombox .city li {
  width: 121px;
  margin-right: 8px;
}
#addSuppWrapp .distpicker-address-wrapper select {
  width: 123px;
  height: 30px;
  padding: 0 10px;
  font-size: 13px;
}
#addSuppWrapp .el-select{
  width: 100%;
}
#addSuppWrapp .suppliermanagement {
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
#addSuppWrapp .center {
  text-align: center;
}
.hint {
  font-size: 14px;
  margin-left:20px;
  /* display: inline-block; */
  background: url("../../assets/hint.png") no-repeat;
  width: 50px;
  height: 28px;
  line-height: 30px;
  float: left;
  padding-left: 38px;
  color: #c6c6c6;
}
 .hint_tit {
  display: inline-block;
  height: 30px;
  line-height: 30px;
  color: #c6c6c6;
  font-size: 14px;
  margin-bottom: 15px;
}
/* .addLeft {
  margin-left: 25px;
}
#addSuppWrapp h3 {
  padding-top: 20px;
  padding-bottom: 10px;
}
#addSuppWrapp .hint {
  font-size: 16px;
  background: url("../../assets/hint.png") no-repeat;
  width: 50px;
  height: 28px;
  line-height: 30px;
  float: left;
  padding-left: 38px;
  color: #c6c6c6;
} */
/* #addSuppWrapp .hint_tit {
  display: inline-block;
  height: 30px;
  line-height: 30px;
  color: #c6c6c6;
  font-size: 14px;
  margin-bottom: 15px;
} */
/* #addSuppWrapp h3 {
  margin-bottom: 0;
  padding-bottom: 0;
} */
</style>
