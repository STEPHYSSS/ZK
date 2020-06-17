<template>
  <div class="shadow-card">
    <div class="container-card">
        <el-form :model="form" :rules="rules" ref="form" label-width="135px" class="demo-ruleForm">
            <el-form-item label="主题名称：" prop="name" class="nameAndRemark">
                <el-input v-model="form.name" maxlength="50" class="inp-width" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="链接地址：" prop="url" class="nameAndRemark">
                <el-input v-model="form.url" class="inp-width" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="状态：" prop="status">
                <el-select v-model="form.status" class="inp-width" placeholder="请选择状态">
                    <el-option label="启用" value="1"></el-option>
                    <el-option label="禁用" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="广告图：" class="avatar-uploader" prop="image">
                <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :before-upload="beforeAvatarUpload"> 
                    <img v-if="imageUrl" :src="imageUrl" class="avatar"><i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <span class="hint">备注：图片建议尺寸348×196</span>
            </el-form-item>
        </el-form>
    </div>
    <div class="footer-card">
      <el-button size="mini" class="border-blue bgc-blue font-color-fff" @click="submitForm('form')">保存</el-button>
      <el-button size="mini" class="border-blue font-color-blue" @click="goback">取消</el-button>
    </div>
  </div>
</template>

<script>
import { advertInsert, advertUpdate, advertDetail, uploadImage} from '@/api/moduleManage'
export default {
    data() {
        return {
            imageUrl: '',
            form: {
                name: '',
                url: '',
                image: '',
                status: '1',
            },
            rules: {
                name: { required: true, message: '请填写主题名称', trigger: 'blur' },
                url: { required: true, message: '请填写链接地址', trigger: 'blur' },
                image: { required: true, message: '请选择广告图', trigger: 'change' },
                status: { required: true, message: '状态', trigger: 'change' }
            }
        }
    },

    created () {
        if (this.$route.query.id) {
            this.getAdvertDetail(this.$route.query.id)
        }
    },

    methods:{
        async getAdvertDetail (id) {
            const { data: { code, msg, data } } = await advertDetail({id})
            if (code === '0000') {
                if (data) this.form = data
                this.imageUrl = this.reqApi.baseImgUrl + JSON.parse(data.image)[0]
                this.form['id'] = this.$route.query.id
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let res = {}
                    if (!this.$route.query.id) {
                        res = await advertInsert(this.form)
                    }else {
                        res = await advertUpdate(this.form)
                    }
                    const { code, msg } = res.data
                    if (code === '0000') {
                        this.$message.success('保存成功')
                        this.goback()
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 取消跳转考勤规则列表
        goback () {
            this.$router.push({ name: 'advertising' })
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === "image/jpeg";
            const isPNG = file.type === "image/png";
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG && !isPNG) {
                return this.$message.error("上传图片只能是 JPG/PNG 格式!");
            }
            if (!isLt2M) {
                return this.$message.error("上传图片大小不能超过 2MB!");
            }
            this.imageUrl = URL.createObjectURL(file);
            this.uploadImg(file)
            return isJPG && isLt2M;
        },
        async uploadImg (file) {
            var formData = new FormData();
            formData.append("files", file); // 将formData传给后台
            formData.get("files");
            const { data: { code, msg, data: { imgCodes } } } = await uploadImage(formData)
            if (code === "0000") {
                this.form.image = JSON.stringify([imgCodes])
            }
        },
    },
}
</script>

<style scoped>
.shadow-card {
  background-color: #fbfbfb;
  overflow: hidden;
}
.el-form {
  padding: 50px 50px 100px;
}
.inp-width {
  width: 300px;
}
  .avatar-uploader{
    height: 180px;
  }
  .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .el-upload {
    border: 1px solid #fff;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .hint{
      color: red;
  }
</style>