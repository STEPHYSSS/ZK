<template>
  <el-card class="f-new box-card">
    <!-- <new-tabs :active="3" level1="新增用户" level2="管理用户" level3="批量导入用户" @callback1="addUsers" @callback2="manageUser"></new-tabs> -->
    <h3>批量导入用户</h3>
    <previous-page goPreviousPage="/user"></previous-page>
    <div class="newQue-body">
      <div class="new-body">
        <p>请使用EXCEl作为模版文件,请注意格式要求,一种题型一个文件,多余的单元格可留空</p>
        <p><a @click="downLoad" href="javascript:;">下载Excel格式模版</a>请下载模版,并按照格式填写，填写完成后,上传文件即可完成导入</p>
          <el-form ref="form" :model="form" label-width="75px">
            <table border="1">
              <tbody>
                <tr>
                  <td class="text-center">所属班级: </td>
                  <td>
                    <el-select v-model="form.uClassid" placeholder="请选择">
                      <el-option
                        v-for="(item,index) in list"
                        :key="index"
                        :label="item.name"
                        :value="item.cid">
                      </el-option>
                    </el-select>
                    <span class="redB">*
                      <span>填写班级名称</span>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td class="text-center">数据文件: </td>
                  <td>
                    <input type="text" v-model="afile" id="changeRd">
                    <a href="javascript:;" class="upload">
                      <input class="change" type="file" multiple="multiple" @change="getFile($event)"/>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
            <add-btn
            style="margin-left: 120px;"
            level1="确 认" level2="取 消"
            @submitForm="tmImport"
            @cancelForm="manageUser">
            </add-btn>

          </el-form>
      </div>
    </div>


  </el-card>

</template>

<script>
  import newTabs from '@/components/newTabs'
  import previousPage from "@/components/previousPage.vue";
  export default {
    data() {
      return {
        list: [],
        afile: '',
        form: {
          file: {},
          uClassid: '',
        }
      }
    },

    created () {
      this.getfindClasses()
    },
    components: {
      newTabs,
      "previous-page": previousPage
    },

    methods: {
      // 班级列表
      getfindClasses () {
        const that = this
        that.$utils.post('exam/sys/findClasses').then(res => {
          const {code, list} = res.data
          that.list = list
        })
      },
      // 选择文件
      getFile(event) {
        this.form.file = event.target.files[0]
        this.afile = event.target.files[0].name
      },
      // 下载模版
      downLoad () {
        this.$utils({
          method: 'post',
          url: '/exam/tmDownload/2',
          responseType: 'blob',
        }).then(res => {
          const type='application/zip'//ZIP文件  
          const blob = new Blob([res.data], { type: type })
          const fileName = '批量导入模版'
          const elink = document.createElement('a')
          elink.download = fileName
          elink.style.display = 'none'
          elink.href = window.URL.createObjectURL(blob)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href)
          document.body.removeChild(elink)
        })
      },
      // addUsers 
      addUsers () {
        this.$router.push({name: 'addUsers'})
      },
      // 管理试题
      manageUser () {
        this.$router.push({ name : 'user'})
      },

      // 提交
      tmImport () {
        if (!this.form.uClassid) return this.$message('所属班级不能为空!')
        if (!this.form.file) return this.$message('数据文件不能为空!')
        let formData = new FormData();
        formData.append('file', this.form.file)
        formData.append('uClassid', this.form.uClassid)
        this.$utils.post('exam/userImport', formData).then(res => {
          const {code, msg} = res.data
          if (code === '00') {
            this.manageUser()
            this.$message.success(msg)
          }
        })
      },

    },
  }
</script>

<style scoped>
  .newQue-body {
    border: 1px solid #dbdfe6;
  }
  .newQue-body .new-body {
    padding: 26px 60px;
  }
  .newQue-body .new-body p {
    color: #c3c3c3;
    height: 30px;
    position: relative;
  }
  .newQue-body .new-body p::before {
    display: inline-block;
    content: "";
    position: absolute;
    left: -22px;
    top: 5px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: #f6ad42;
  }
  .newQue-body .new-body p:nth-child(2):before {
    background-color: #54c9de;
  }

  div.el-select {
    width: 300px !important;
  }
  .change{
    position: absolute;
    overflow: hidden;
    left: 15px;
    top: 5px;
    opacity: 0;
    height: 30px;
  }

  /* 头部表格 */
  table {
    border-color:#e4e9ec;
    border-collapse: collapse;
    border: 1px solid #e4e9ec;
    color: #777;
    margin-bottom: 20px;
    position: relative;
  }
  table tbody tr td {
    padding: 5px 15px;
  }
  table tbody tr td:nth-child(1) {
    /* background-color: #a8e7f0; */
    width: 200px;
  }
  table tbody tr td:nth-child(2) {
    position: relative;
    width: 90%;
  }

  input {
    border-radius: 4px;
    width: 300px;
  }

  .el-button.haha {
    border: 1px solid #31b5ff;
    color: #fff;
    background-color: #31b5ff;
    padding: 7px 7px;
    margin-left: 15px;
  }

  .el-form {
    padding-top: 20px;
  }

  .redB {
    color: #ef6f6e;
    padding-left: 5px;
  }
  .redB span {
    color: #444;
    vertical-align:10%;
  }
  
</style>