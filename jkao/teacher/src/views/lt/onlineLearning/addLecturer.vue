<template>
  <el-card shadow="never" class="box-card">
    <my-bread level1="新增讲师" level2="新增讲师" level3="填写下面表单，创建新的课程讲师"></my-bread>
    <el-row>
      <el-button size="mini" class="present-btn">新增讲师</el-button>
      <el-button size="mini" @click="courseList">讲师列表</el-button>
    </el-row>

    <table border="1">
      <tbody>
        <tr>
          <td class="text-center">讲师名称: </td>
          <td><input type="text" v-model="form.cname"></td>
        </tr>
        <tr>
          <td class="text-center">联系电话: </td>
          <td>
            <input type="text" v-model="form.corderid"> 
            <span>
              <span class="redB">*</span>数值越小越靠前,如1是第一位
            </span>
          </td>
        </tr>
        <tr>
          <td class="text-center">电子信箱: </td>
          <td><input type="text" v-model="form.cremark"></td>
        </tr>
        <tr>
          <td class="text-center">讲师照片: </td>
          <td>
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </td>
        </tr>
        <tr>
          <td class="text-center">分类描述: </td>
          <td><textarea style="resize:none"  class="area-wh" cols="30" rows="10"></textarea></td>
        </tr>
      </tbody>
    </table>
    <add-btn
    style="margin-left: 130px;"
    level1="确 认" level2="取 消"
    @submitForm="submitForm"
    @cancelForm="courseList">
    </add-btn>

  </el-card>

</template>

<script>
  export default {
    data() {
      return {
        // 缩略图
        imageUrl: '',
        // 学科分类
        list: [],
        form: {
          file: '',
          nauthor: '',
          nclassid: '',
          ncontent: '',
          nmodifyor: '1',
          nnewsfrom: '',
          nposter: '1',
          nvisit: '',
          nstatus: '0',
          ntitle: '',
          ntitle_color: '',
          ntotop: ''
        },
        loading: false,

      }
    },

    created() {
      this.getfindClasses()
    },

    methods: {
      getfindClasses () {
        const that = this
        that.$utils.post('exam/sys/findClasses').then(res => {
          const {code, list} = res.data
          that.tableData = list
        })
      },

      // 提交
      submitForm () {
        const that = this
        let formData = new FormData()
        const obj = that.form
        Object.keys(obj).forEach(key => {
          formData.append(key, obj[key])
        })
        const articlePut = JSON.parse(sessionStorage.getItem('articlePut'))
        const Identification = !articlePut ? 'exam/news/newNews' : 'exam/news/updateNews'
        that.$utils.post(Identification, formData).then(res => {
          const {code} = res.data
          if (code === '00') return that.courseList()
        })
      },

      //缩略图
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG && !isPNG) {
          return this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
        }
        if (!isLt2M) {
          return this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        this.imageUrl = URL.createObjectURL(file.raw);
        this.form.file = file
        return isJPG && isLt2M;
      },

      // courseList
      courseList () {
        this.$router.push({name : 'lecturerList'})
      },
    },

    beforeDestroy () {
      sessionStorage.removeItem('articleManagePut')
    },
  }
</script>

<style scoped>
  /* 头部表格 */
  table {
    border-color:#e4e9ec;
    border-collapse: collapse;
    border: 1px solid #e4e9ec;
    color: #777;
    margin-bottom: 20px;
  }
  table tbody tr td {
    padding: 5px 15px;
  }
  table tbody tr td:nth-child(1) {
    background-color: #a8e7f0;
    width: 200px;
  }
  table tbody tr td:nth-child(2) {
    width: 90%;
  }

  input {
    width: 240px;
  }
  
  /* 缩略图 */
  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    background-color: #dbdfe6;
    border-radius: 6px;
    width: 120px;
    height: 120px;
  }
  .avatar-uploader .el-upload {
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #fff;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }

  .redB {
    color: #ef6f6e;
    vertical-align: middle;
    padding: 0 5px 0 20px;
  }

  .area-wh {
    height: 80px;
    border-radius: 4px;
    border: 1px solid #ccc;
    color: #606266;
    overflow: auto;
    width: 300px;
    font-size: 14px;
  }
</style>