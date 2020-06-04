<template>
  <div id="addstoreBox">
    <div class="addBox">
      <div class="add_Box">
        <h4 style="padding:20px 0">门店新增</h4>
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
            <el-form-item label="门店名称:" prop="name" label-width="120px">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="类型:" prop="type" label-width="120px">
              <el-select v-model="ruleForm.type" placeholder="请选择">
                <el-option
                  v-for="item in storeType"
                  :key="item.value"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所在区域:" label-width="120px" prop="province">
              <ul class="adcity" style="display:inline-flex">
                <li>
                  <!-- 省市区 -->
                  <el-select v-model="ruleForm.province" placeholder="请选择" @change="chooseProvince">
                    <el-option
                      v-for="item in inProvince"
                      :key="item.value"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </li>
                <li>
                  <el-select v-model="ruleForm.city" placeholder="请选择" @change="chooseCity">
                    <el-option
                      v-for="item in inCity"
                      :key="item.value"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </li>
                <li>
                  <el-select v-model="ruleForm.area" placeholder="请选择" @change="chooseArea">
                    <el-option
                      v-for="item in inArea"
                      :key="item.value"
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
            <el-form-item label="开店时间:" label-width="120px" required>
              <el-col :span="11">
                <el-form-item prop="openTime">
                  <el-date-picker
                    v-model="ruleForm.openTime"
                    type="date"
                    @change="change1"
                    placeholder="请选择开业时间"
                    style="width: 100%;"
                    :picker-options="pickerOptionsStart"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2">至</el-col>
              <el-col :span="11">
                <el-form-item prop="shutdownTime">
                  <el-date-picker
                    v-model="ruleForm.shutdownTime"
                    type="date"
                    @change="change11"
                    placeholder="请选择停业日期"
                    style="width: 100%;"
                    :picker-options="pickerOptionsEnd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="营业时间:" label-width="120px">
              <el-col :span="11">
                <el-time-picker
                  type="fixed-time"
                  placeholder="起始时间"
                  v-model="ruleForm.businessTimeStart"
                  style="width: 100%;"
                ></el-time-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-time-picker
                  type="fixed-time"
                  placeholder="结束时间"
                  v-model="ruleForm.businessTimeEnd"
                  style="width: 100%;"
                ></el-time-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="门店联系人:" prop="contactsName" label-width="120px">
              <el-input v-model="ruleForm.contactsName"></el-input>
            </el-form-item>
            <el-form-item label="联系方式:" label-width="120px">
              <el-input
                v-model="ruleForm.contactsPhone"
                maxlength="11"
                onkeyup="this.value=this.value.replace(/\D/g,'')"
              ></el-input>
            </el-form-item>
            <el-form-item label="证照信息" label-width="120px">
              <el-upload
                :action="`${this.uploadUrl}/image/upload`"
                list-type="picture-card"
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
                <img width="100%" :src="dialogImageUrl" alt />
              </el-dialog>
            </el-form-item>
            <div class="center">
              <el-button class="AllquedingBtn" @click="submit('ruleForm')">确定</el-button>
              <el-button class="theBtn resetButton" @click="resetForm">返回</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VDistpicker from "v-distpicker";
import qs from "qs";
export default {
  name: "addstore1",

  data() {
    return {
      // 限制结束时间大于开始时间
      pickerOptionsStart: {
        disabledDate: time => {
          let endDateVal = this.ruleForm.shutdownTime;
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime();
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          let beginDateVal = this.ruleForm.openTime;
          if (beginDateVal) {
            return (
              time.getTime() <
              new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
            );
          }
        }
      },
      data1: {
        token: sessionStorage.getItem("token")
      },
      limitCount: 5,
      hideUpload: false,
      dialogImageUrl: "",
      dialogVisible: false,
      fileList: [],
      fileSizeIsSatisfy: true,
      labelPosition: "right",
      ruleForm: {
        token: sessionStorage.getItem("token"),
        type: "",
        name: "",
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
      openTime2: "",
      shutdownTime2: "",
      businessTimeStart2: "",
      businessTimeEnd2: "",
      inProvince: [], //下拉遍历省
      inCity: [], //下拉遍历市
      inArea: [], //下拉遍历区
      storeType: [],
      mark: true,
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { max: 50, message: "长度不超过50个字符", trigger: "blur" }
        ],
        type: [{ required: true, message: "请选择类型", trigger: "blur" }],
        province: [{ required: true, message: "请选择", trigger: "change" }],
        city: [{ required: true, message: "请选择", trigger: "change" }],
        area: [{ required: true, message: "请选择", trigger: "change" }],
        address: [
          { required: true, message: "请输入地址", trigger: "blur" },
          { max: 50, message: "长度不超过50个字符", trigger: "blur" }
        ],
        openTime: [
          {
            required: true,
            message: "请选择开店时间",
            trigger: "change"
          }
        ],
        // shutdownTime: [
        //   {
        //     required: true,
        //     message: "请选择停业时间",
        //     trigger: "change"
        //   }
        // ],
        contactsName: [
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        // province: [
        //   { required: true, message: "请选择所在区域", trigger: "change" }
        // ]
      }
    };
  },
  components: {
    VDistpicker
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
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.ruleForm.city) return this.$message.error("请选择所在区域");
          if (!this.ruleForm.area) return this.$message.error("请选择所在区域");
          this.$axios
            .post(window.apiUrl+"store/add", qs.stringify({
                token: this.ruleForm.token,
                type: this.ruleForm.type,
                name: this.ruleForm.name,
                province: this.ruleForm.province,
                city: this.ruleForm.city,
                area: this.ruleForm.area,
                address: this.ruleForm.address,
                openTime: this.ruleForm.openTime,
                shutdownTime: this.ruleForm.shutdownTime,
                contactsName: this.ruleForm.contactsName,
                contactsPhone: this.ruleForm.contactsPhone,
                businessTimeStart: this.ruleForm.businessTimeStart,
                businessTimeEnd: this.ruleForm.businessTimeEnd,
                resourceCodes: JSON.stringify(this.ruleForm.resourceCodes)
            }))
            .then(res => {
              if (res.data.code === "0000") {
                this.$router.push({
                  name: "storeManage"
                });
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
    // 门店类型
    showother() {
      let _this = this;
      let token = sessionStorage.getItem("token");
      let code = "store_type_select";
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
            _this.storeType = res.data.data;
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
          }
        })
        .catch(err => {
          console.log("数据异常", err);
        });
    },

    // 时间选择
    change1(e) {
      this.ruleForm.openTime = this.$moment(e).format("YYYY-MM-DD");
    },
    change11(e) {
      this.ruleForm.shutdownTime = this.$moment(e).format("YYYY-MM-DD");
    },

    // 城市列表
    chooseProvince(value) {
      for (const key in this.inProvince) {
        if (this.inProvince[key].id == value)
          this.ruleForm.province = this.inProvince[key].name;
      }
      this.ruleForm.city = "";
      this.ruleForm.area = "";
      this.inArea = [];
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
      // this.$router.push({name:'storeManage'})
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
#addstoreBox {
  background-color: #f1f6fa;
  min-height: 647px;
  box-sizing: border-box;
  box-shadow: 0px 2px 10px #ccc;
  height: 100%;
  position: relative;
  overflow: hidden;
}
#addstoreBox .addBox{
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
   position: absolute;
  left: 0;
  top: 0;
  right: -17px;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  height: 100%;
}
#addstoreBox .add_Box {
  margin-left: 30px;
  margin-right: 30px;
  padding-bottom: 30px;
 
}
#addstoreBox .nav {
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
#addstoreBox .hint {
  font-size: 14px;
  /* display: inline-block; */
  background: url("../../assets/hint.png") no-repeat;
  width: 50px;
  height: 28px;
  line-height: 30px;
  float: left;
  padding-left: 38px;
  color: #c6c6c6;
}
#addstoreBox .hint_tit {
  display: inline-block;
  height: 30px;
  line-height: 30px;
  color: #c6c6c6;
  font-size: 14px;
  margin-bottom: 15px;
}
#addstoreBox .frombox {
  width: 500px;
  margin-left: 25px;
}
#addstoreBox .el-select{
  width: 100%;
}
#addstoreBox .distpicker-address-wrapper select {
  width: 123px;
  padding: 0 10px;
  font-size: 13px;
}
#addstoreBox .distpicker-address-wrapper select {
  width: 123px;
  padding: 0.5rem 0.75rem;
  height: 40px;
  font-size: 1rem;
  line-height: 1.25;
  color: #464a4c;
  background-color: #fff;
  background-image: none;
  -webkit-background-clip: padding-box;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
  -webkit-transition: border-color ease-in-out 0.15s,
    -webkit-box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s,
    -webkit-box-shadow ease-in-out 0.15s;
  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s,
    -webkit-box-shadow ease-in-out 0.15s;
}
#addstoreBox .el-date-editor.el-input {
  width: 380px;
}
#addstoreBox .el-col-2 {
  text-align: center;
}
#addstoreBox .el-select .el-input .el-select__caret {
  line-height: 15px;
}
#addstoreBox .adcity li {
  width: 121px;
  margin-right: 8px;
}
#addstoreBox .upload-demo {
  position: relative;
}
#addstoreBox .upload-demo .el-button {
  margin: 0;
  margin-left: 290px;
  /* position: absolute; */
}
#addstoreBox .el-upload__tip {
  color: red;
}
#addstoreBox .center {
  text-align: center;
}
</style>




