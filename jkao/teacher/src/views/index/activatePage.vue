<template>
  <div class="activatePage activationCodeLogin">
      <div class="popout">
        <header>
          <span>welcome</span>
          <!-- <a>申请授权码</a> -->
          <!-- <router-link tag="a" to="register">申请授权码</router-link> -->
          <!-- <router-link tag="a" to="activatePage">申请授权码</router-link> -->
        </header>

        <div class="bodyDiv">
            <span>
              <i class="nativeCode">本机编码：</i>
              &nbsp;<i class="localCode">{{localCode}}</i>&nbsp;&nbsp;
              <input type="text" class="copyConcealInfo" v-model="localCode" ref="localCode">
              <el-button size="small" class="clickCopy" @click="copy">点击复制</el-button>
            </span><br>

            <!-- <div class="inputBox "> 授权码：&nbsp;<el-input placeholder="请输入内容" v-model="activationKey" clearable></el-input></div><br> -->
            <el-upload class="upload-demo" :action="reqApi.shuiwuUrl + 'registered/importCode'"
        :before-upload="beforeAvatarUpload" :on-preview="handlePreview" 
                :on-remove="handleRemove" :on-progress="uploading"
                :before-remove="beforeRemove" multiple :limit="1" :on-exceed="handleExceed" :file-list="fileList">
                <el-button size="small" type="primary" class="authorizationFile">上传授权文件</el-button>
            </el-upload><br>
            <p class="remind">提 醒：请 与 商 家 联 系 获 取 授 权 文 件 </p>
              <!-- <button @click="confirmJump" class="btn_sure"></button> -->
        </div>

        <footer>
          <p>Copyright 2020 
            <i v-if="reqApi.taxStateCode == '2' || reqApi.taxStateCode == '3' || reqApi.taxStateCode == '4'">畅捷通</i>
            <i v-if="reqApi.taxStateCode == '1'">武汉浙科友通软件有限公司</i>
             AIl Rights Reserved
          </p>
          <!-- <p>客服热线：027-12345678</p> -->
        </footer>
      </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  name: "activatePage",
  data() {
    return {
      loading: null,
      localCode :'',
      activationKey: '',
      fileList: [],
      fileName:''
    };
  },
  created(){
    this.getLocalCode();
  },

  methods: {
    getLocalCode(){
      const that = this
      that.$utils.post(`/registered/getMac`).then(res => {
        const {code, localMac} = res.data
        if (code === 0) return that.localCode = localMac
      })
    },

    //确定按钮
    // confirmJump(){
    //   const that = this
    //   if(that.activationKey == ''){
    //       that.$message("请输入授权码");
    //   }else{
    //       that.$utils.post('/registered/active' , {activation_code: that.activationKey}).then(res => {
    //       const {code} = res.data
    //       if (code === 100) {//正式
    //         // sessionStorage.setItem('versions',code)
    //         // sessionStorage.setItem('schoolName',school_name)
    //         // sessionStorage.setItem('startTime',start_time)
    //         // sessionStorage.setItem('endTime',end_time)
    //         that.$message.success("正式版，请登录");
    //         that.$router.push({ name: "register" });
    //       }else if(code === 200){//试用
    //         // sessionStorage.setItem('versions',code)
    //         // sessionStorage.setItem('schoolName',school_name)
    //         // sessionStorage.setItem('startTime',start_time)
    //         // sessionStorage.setItem('endTime',end_time)
    //         that.$message.success("适用版，请登录");
    //         that.$router.push({ name: "register" });
    //       }else if(code === 300){//授权到期
    //         that.$message("授权码到期");
    //       }else if(code === 400){//未授权
    //         that.$message("未授权");
    //       }
    //     }).catch(res => {
    //     });
    //   }
    // },

      beforeAvatarUpload () {
        this.loading = this.$loading({
          lock: true,
          text: '文件上传中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
      },

      // 上传时
      uploading(event,file,fileList){
        let that = this;
        if (!file) return that.$message('请选择需要上传的文件！')
        let formData = new FormData();
        formData.append('file', file.raw)
        that.$utils.post(`registered/importCode`, formData).then(res => {
          this.loading.close();
          const { code } = res.data
          if(code == '100'){
            that.$message.success("上传成功，正式版登录");
            that.$router.push({ name: "register" });
          }else if(code == '200'){
            that.$message.success("上传成功，试用版登录");
            that.$router.push({ name: "register" });
          }else if(code == '300'){//授权到期
            that.$message("授权码到期");
          }else if(code == '400'){//未授权
            that.$message("未授权");
          }
        }).catch( err => {
          this.loading.close()
        })
      },

      // 文件列表移除文件时
      handleRemove(file, fileList) {
      },

      // 点击文件列表中已上传的文件时
      handlePreview(file) {
      },

      // 文件超出个数限制时
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },

      // 文件列表移除文件时
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },

      //复制本机编码
      copy(){
        let doms = this.$refs.localCode;
        doms.select(); // 选择对象
        document.execCommand("Copy"); // 执行浏览器复制命令
        this.$message.success("授权码已经复制到粘贴板")
      },
  },
  watch: {
    
  }
};
</script>

<style scoped>
.activatePage{
    background: #000;
    width: 100%;
    height: 100%;
}

.popout{
    width: 600px;
    height: 318px;
    background-color: #fff;
    border-radius: 8px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-image: url("../../assets/images/activatePageBgLittle.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.popout header{
  /* display: flex;
  justify-content: space-between; */
  position: relative;
  padding: 12px;
}

/* .popout header span{
    position: absolute;
    left: 15px;
    top: 15px;
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    font-style: italic;
} */

.popout header span{
    position: absolute;
    left: 250px;
    top: 13px;
    color: #fff;
    font-size: 23px;
    font-weight: 600;
    font-style: italic;
}

.popout header a{
    position: absolute;
    right: 15px;
    top: 15px;
    color: #fff;
    font-size: 15px;
}

.popout .bodyDiv{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
}

.popout .bodyDiv span{
  font-size: 17px;
  white-space: nowrap;
}

.popout .bodyDiv span .nativeCode{
  font-weight: 600;
}

.popout .bodyDiv span .clickCopy{
  background-color: #28cd17;
  color: #fff;
}

.popout .bodyDiv span .localCode{
    display: inline-block;
    max-width: 325px;
    /* overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;*/
    margin-right: 5px; 
    vertical-align: middle;
}

.popout .bodyDiv .inputBox{
  font-size: 15px;
  white-space: nowrap;
  margin-top: 20px;
}

.popout .bodyDiv .el-input{
  width: 70%;
  line-height: 40px;
}

.popout .bodyDiv .el-input--suffix .el-input__inner{
  height: 33px !important;
  width: 160px;
}

.popout .bodyDiv .btn_sure{
  width: 170px;
  height: 31px;
  background-size: 170px 31px;
  border: 0;
  margin: 10px 0 0 66px;
  background-repeat: no-repeat;
  background-image: url("../../assets/images/sureBtn.png");
}

.popout .bodyDiv .remind{
  color: #999;
}

.popout footer p:first-child{
    position: absolute;
    left: 15px;
    bottom: 6px;
    color: #fff;
}

.popout footer p:last-child{
    position: absolute;
    right: 15px;
    bottom: 6px;
    color: #fff;
    font-size: 14px;
}

.copyConcealInfo{
  position: absolute;
  bottom: 0;
  right: 0;
  opacity: 0;
}
</style>
