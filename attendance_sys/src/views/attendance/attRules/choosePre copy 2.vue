<template>
  <div>
    <!-- 遮罩层内表单 -->
    <div class="dialogHead">
      <span>
        选择人员&nbsp;
        <i>(提示：重新选择人员后考勤规则次日生效，前期规则不变)</i>
      </span>
    </div>
    
    <el-form :model="maskLayerForm" ref="maskLayerForm" :inline="true" size="mini" class="attendanceRules">
      <el-row>
        <el-col :span="8">
          <el-form-item label="姓名:">
            <el-input clearable placeholder="" v-model="maskLayerForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系方式">
            <el-input clearable placeholder="" v-model="maskLayerForm.phone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="部门">
            <el-select clearable placeholder="请选择" v-model="maskLayerForm.section">
              <el-option v-for="(item, index) in statisticList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24" class="btn_style">
          <el-form-item label=" ">
            <el-button class="search" @click="getTableData">查询</el-button>
            <el-button class="reset" @click="resetForm">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 遮罩层内表格 -->
    <el-table
      ref="multipleTable"
      :data="maskTableData"
      tooltip-effect="dark"
      height="400px"
      :header-cell-style="{color:'#444', width: '100%', borderTop: '1px solid #E6E6E6'}"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" label="全选" width="55" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" width="120" align="center"></el-table-column>
      <el-table-column prop="phone" label="联系方式" width="120" align="center"></el-table-column>
      <el-table-column prop="classes" label="班级" align="center"></el-table-column>
      <el-table-column prop="sectionName" label="部门" align="center"></el-table-column>
      <el-table-column prop="job" label="职务" align="center"></el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 1">启用</span>
          <span v-if="scope.row.status == 0">禁用</span>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleClose">确 定</el-button>
    </div>
  </div>
</template>

<script>
  import { personnelList } from '@/api/user'
  import { attAlreadyBind } from '@/api/attendance'
  import { stationList } from '@/api/systemSetup'
  export default {
    data () {
      return {
        list: [],
        statisticList: [],
        multipleSelection: [], // 已绑定人员列表
        allTableData: [], // 所有人员列表
        maskLayerForm: {
          name: "",
          phone: "",
          section: ""
        },
        maskTableData: [],
      }
    },
    created () {
      this.getTableData()
      this.getStationList()
    },
    props: {
      rule_id: Number
    },
    methods: {
      async getStationList () {
        const { data: { code, msg, data: { list, total } } } = await stationList()
        if (code === '0000') {
          this.statisticList = list
        }
      },
      // 获取所有人员列表
      // async getAllTableData(pageNum, pageSize) {
      //   if (this.allTableData.length > 0) return false
      //   const { data: { code, msg, data: { list, total } } } = await personnelList({pageNum, pageSize})
      //   if (code === '0000') {
      //     this.allTableData = list
      //     // 获取到数据后 获取已绑定人员列表
      //     this.getAttAlreadyBind()
      //   }
      // },
      async getTableData() {
        const { name, phone, section } = this.maskLayerForm
        const { data: { code, msg, data: { list, total } } } = await personnelList({name, phone, section, pageSize: 9999, pageNum: 1})
        if (code === '0000') {
          this.maskTableData = list
          // 获取到数据后 获取已绑定人员列表
          this.getAttAlreadyBind()
        }
      },
      async getAttAlreadyBind () {
        const { data: { code, msg, data } } = await attAlreadyBind({rule_id: this.rule_id})
        if (code === '0000') {
          this.multipleSelection = data
          // 拿到数据后 反选
          this.toggleSelection()
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = []
        for (const i of val) {
          this.multipleSelection.push(i.id)
        }
      },
      toggleSelection() {
        let arr = []
        for (const i of this.maskTableData) {
          for (const y in this.multipleSelection) {
            const item = this.multipleSelection[y]
            if (i.id == item) arr.push(i)
          }
        }
        arr.forEach(item => {
          this.$refs.multipleTable.toggleRowSelection(item, true);
        });
      },
      resetForm(formName) {
        this.maskLayerForm = {
          name: "",
          phone: "",
          section: ""
        }
        this.getTableData()
      },
      handleClose () {
        this.$emit('handleClose')
      }
    }
  }
</script>

<style scoped>

.maskLayer .dialogBlock {
  display: inline-block;
  position: absolute;
  right: 10px;
  bottom: 20px;
}
.btn_style {
  text-align: right;
}

.search {
  background-color: #4489fe;
  color: #fff;
  border: 1px solid #4489fe;
}

.reset {
  background-color: #fff;
  color: #4489fe;
  border: 1px solid #4489fe;
}
</style>