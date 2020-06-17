<template>
  <div class="shadow-card">
    <div class="container-card">
      <el-form :model="form" :rules="rules" ref="from" label-width="100px" class="demo-ruleForm">
        <el-form-item label="岗位名称:" prop="name">
          <el-input clearable size="mini" maxlength="50" class="inp-width" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="备注:" prop="remark">
          <el-input clearable size="mini" maxlength="20" class="inp-width" v-model="form.remark"></el-input>
        </el-form-item>
        <el-form-item label="岗位细则:" prop="rules">
          <div id="editor"></div>
        </el-form-item>
        <el-form-item v-if="form.status" label="状态:" prop="status">
          <el-select clearable size="mini" class="inp-width" v-model="form.status" placeholder="请选择状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="footer-card">
      <el-button size="mini" class="border-blue bgc-blue font-color-fff" @click="submitForm('from')">保存</el-button>
      <el-button size="mini" class="border-blue font-color-blue" @click="stationList">取消</el-button>
    </div>
  </div>
</template>

<script>
import { cleanWord } from '@/api/public'
import Editor from 'wangeditor'
import 'wangeditor/release/wangEditor.min.css'
import { stationInsert, stationUpdate, stationDetail } from '@/api/systemSetup'
export default {
  data() {
    return {
      editor: '',
      // 富文本
      editorOption:[
        'head',  // 标题
        'bold',  // 粗体
        'fontSize',  // 字号
        'fontName',  // 字体
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        'backColor',  // 背景颜色
        'link',  // 插入链接
        'list',  // 列表
        'justify',  // 对齐方式
        'quote',  // 引用
        'emoticon',  // 表情
        'image',  // 插入图片
        'table',  // 表格
        // 'video',  // 插入视频
        'code',  // 插入代码
        'undo',  // 撤销
        'redo'  // 重复
      ],
      form: {
        name: '',
        rules: '',
        remark: '',
        status: null
      },
      rules: {
        name: { required: true, message: '请输入姓名', trigger: 'blur' },
        status: { required: true, message: '请状态', trigger: 'change' }
      }
    };
  },
  
  created () {
    if (this.$route.query.id) {
      this.getStationDetail(this.$route.query.id)
    }
  },
  mounted() {
    this.editor = new Editor('#editor');
    this.editor.customConfig.uploadImgShowBase64 = true;
    this.editor.customConfig.showLinkImg = true;
    this.editor.customConfig.uploadImgMaxSize = 1 * 1024 * 1024; // 将图片大小限制为 1M
    this.editor.customConfig.menus = this.editorOption
    this.editor.customConfig.onchange = (html) => {
      this.form.rules = html
    }
    this.editor.create()
  },

  methods: {
    // 获取账号详情
    async getStationDetail (id) {
      const { data: { code, msg, data } } = await stationDetail({id})
      if (code === '0000') {
        this.form = data
        this.form['id'] = id
        this.editor.txt.html(this.form.rules)
      }
    },
    // 保存
    submitForm (formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          // 格式化word格式
          this.form.rules = cleanWord(this.form.rules)
          let res = {}
          if (!this.$route.query.id) {
            res = await stationInsert(this.form)
          }else {
            res = await stationUpdate(this.form)
          }
          const { code, msg } = res.data
          if (code === '0000') {
            this.stationList()
            this.$message.success('保存成功')
          }
        }
      })
    },
    // 取消跳转账号列表
    stationList () {
      this.$router.push({ name: 'stationList' })
    }
  }
};
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
</style>