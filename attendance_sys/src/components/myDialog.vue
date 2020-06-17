<template>
  <el-dialog
    class="dialog-re-pwd"
    :visible.sync="dialogVisible"
    :show-close="false"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    :before-close="handleClose"
    center
    width="350px">
    <div class="dialog-header bgc-blue font-color-fff">
      <i class="el-icon-warning"></i>
      <i class="dialog-title">提示</i>
      <i class="el-icon-close fr cur-point" @click="handleClose"></i>
    </div>
    <div class="dialog-body text-center">{{content}}</div>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" class="border-blue font-color-blue" @click="handleClose">取 消</el-button>
      <el-button size="mini" class="border-blue bgc-blue font-color-fff" @click="$emit('confirm')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        dialogVisible: false,
      }
    },

    props: {
      content: String
    },

    methods: {
      handleClose () {
        this.dialogVisible = false
      }
    }
  }
</script>

<style scoped>

</style>