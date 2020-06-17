<template>
  <div>
    <el-form :model="form" label-width="120px">
      <el-form-item v-if="type === 'record'" prop="name" label="姓名：">
        <el-input  clearable  placeholder="请输入姓名" v-model="form.name" style="width: 300px;"></el-input>
      </el-form-item>
      <el-form-item prop="startCreateTime" label="考勤日期开始：">
        <el-date-picker type="date" value-format="yyyy-MM-dd" style="width: 300px;" v-model="form.startCreateTime" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item prop="startCreateTime" label="考勤日期结束：">
        <el-date-picker type="date" value-format="yyyy-MM-dd" style="width: 300px;" v-model="form.endCreateTime" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item v-if="type === 'record'" prop="status" label="状态">
        <el-select placeholder="请选择状态" v-model="form.status" style="width: 300px;">
          <el-option label="正常" value="1"></el-option>
          <el-option label="迟到" value="2"></el-option>
          <el-option label="早退" value="3"></el-option>
          <el-option label="缺卡" value="4"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer text-center">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </div>
  </div>
</template>

<script>
  import { recordExport, statisticExport } from '@/api/attendance'
  import { download } from '@/api/public'
  export default {
    data () {
      return {
        form: {
          name: '',
          startCreateTime: '',
          endCreateTime: '',
          status: '1'
        }
      }
    },
    props: {
      type: String,
    },
    methods: {
      handleClose () {
        this.$emit('handleClose')
      },
      async submitForm () {
        const { name, startCreateTime, endCreateTime, status } = this.form
        // const res = await recordExport({ name, startCreateTime, endCreateTime, status })
        let myObj = {
          method: 'POST',
          url: `${this.reqApi.baseUrl}/manage/clock/record/export`,
          fileName: '考勤数据表',
          data: { name, startCreateTime, endCreateTime, status }
        }
        let statistics = {
          method: 'POST',
          url: `${this.reqApi.baseUrl}/manage/clock/record/statistic/export`,
          fileName: '考勤记录',
          data: { startTime: startCreateTime, endTime: endCreateTime }
        }
        
        if (this.type === 'statistics') {
          if ( !startCreateTime || !endCreateTime) return this.$message.error('请填写开始日期和结束日期')
          download(statistics)
        }
        else download(myObj)
        this.handleClose()
      }
    }
  }
</script>

<style scoped>

</style>