<template>
  <el-card shadow="never" class="box-card" id="invoice-info">
    <div class="topPadding">
     <div class="font-weight-700 teacher-title">进项发票信息</div>
    
    <!-- <el-row style="display:inline-block">
      <el-button size="mini" @click="addCase">新增案例</el-button>
      <el-button size="mini" @click="caseList">管理案例</el-button>
      <el-button size="mini" class="present-btn">进项发票信息</el-button>
    </el-row> -->

    <!-- 搜索框 -->
      <div class="fr" style="margin-bottom:25px;">
        <el-button class="font-size-12 search-btn" @click="addRow">增加一行</el-button>
        <el-button class="font-size-12 search-btn" @click="delRow">删除一行</el-button>
      </div>
    </div>

    <!-- 表格 -->
    <el-table
    class="invoice topBorder"
    :data="tableData"
    id="bwhj"
    :header-cell-style="{color:'#444'}"
    header-align="center"
    show-summary
    highlight-current-row
    @row-click="delRowMou"
    :summary-method="getSummaries" border style="width: 100%">
      <el-table-column align="center" label="发票代码">
        <template slot-scope="{row,$index}">
          <el-input maxlength="50" v-if="editFpdm[$index]" style="width:105px" v-model="row.fpdm" @blur.prevent="hiddenEdit($index)"
          @keydown.enter.native="hiddenEdit($index)" type="text" v-focus class="text-center inputSmall"></el-input>
          <span v-else>{{row.fpdm}}</span>
          <a href="javascript:;" @click="showEditFpdm($index)" class="edit-icon el-icon-edit-outline">
            <span class="edit-word font-size-12">编辑</span>
          </a>
        </template>
      </el-table-column>
      <el-table-column  align="center" width="120" label="发票号码">
        <template slot-scope="{row,$index}">
          <el-input
          maxlength="50"
          v-if="editFphm[$index]"
          v-model="row.fphm"
          @blur.prevent="hiddenEdit($index)"
          @keydown.enter.native="hiddenEdit($index)"
          type="text"
          v-focus
          class="text-center inputSmall"></el-input>
          <span v-else>{{row.fphm}}</span>
          <a href="javascript:;" @click="showEditFphm($index)" class="edit-icon el-icon-edit-outline">
            <span class="edit-word font-size-12">编辑</span>
          </a>
        </template>
      </el-table-column>
      <el-table-column align="center" label="开票日期">
        <template slot-scope="{row,$index}">
          <el-input
          v-if="editKprq[$index]"
          v-model="row.kprq"
          @blur.prevent="hiddenEdit($index)"
          @keydown.enter.native="hiddenEdit($index)"
          type="text"
          v-focus
          class="text-center inputSmall"></el-input>
          <span v-else>{{row.kprq}}</span>
          <a href="javascript:;" @click="showEditKprq($index)" class="edit-icon el-icon-edit-outline">
            <span class="edit-word font-size-12">编辑</span>
          </a>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="销货方名称">
        <template slot-scope="{row,$index}">
          <el-input
          maxlength="50"
          v-if="editXfmc[$index]"
          v-model="row.xfmc"
          @blur.prevent="hiddenEdit($index)"
          @keydown.enter.native="hiddenEdit($index)"
          type="text"
          v-focus
          class="text-center inputSmall"></el-input>
          <span v-else>{{row.xfmc}}</span>
          <a href="javascript:;" @click="showEditXfmc($index)" class="edit-icon el-icon-edit-outline">
            <span class="edit-word font-size-12">编辑</span>
          </a>
        </template>
      </el-table-column>
      <el-table-column align="center" label="销售方税号">
        <template slot-scope="{row,$index}">
          <el-input
          maxlength="50"
          v-if="editXfsh[$index]"
          v-model="row.xfsh"
          @blur.prevent="hiddenEdit($index)"
          @keydown.enter.native="hiddenEdit($index)"
          type="text"
          v-focus
          class="text-center inputSmall"></el-input>
          <span v-else>{{row.xfsh}}</span>
          <a href="javascript:;" @click="showEditXfsh($index)" class="edit-icon el-icon-edit-outline">
            <span class="edit-word font-size-12">编辑</span>
          </a>
        </template>
      </el-table-column>
      <el-table-column align="center" width="110" label="货物名称">
        <template slot-scope="{row,$index}">
          <el-input
          maxlength="50"
          v-if="editHwlwmc[$index]"
          v-model="row.hwlwmc"
          @blur.prevent="hiddenEdit($index)"
          @keydown.enter.native="hiddenEdit($index)"
          type="text"
          v-focus
          class="text-center inputSmall"></el-input>
          <span v-else>{{row.hwlwmc}}</span>
          <a href="javascript:;" @click="showEditHwlwmc($index)" class="edit-icon el-icon-edit-outline">
            <span class="edit-word font-size-12">编辑</span>
          </a>
        </template>
      </el-table-column>
      <el-table-column align="center" width="70" label="数量">
        <template slot-scope="{row,$index}">
          <el-input
          maxlength="20"
          v-if="editSsl[$index]"
          v-model="row.ssl"
          @blur.prevent="hiddenEdit($index)"
          @keydown.enter.native="hiddenEdit($index)"
          @input="if(isNaN(row.ssl - 0)) return row.ssl = 0"
          type="text"
          v-focus
          class="text-center inputSmall"></el-input>
          <span v-else>{{row.ssl}}</span>
          <a href="javascript:;" @click="showEditSsl($index)" class="edit-icon el-icon-edit-outline">
            <span class="edit-word font-size-12 text-center">编辑</span>
          </a>
        </template>
      </el-table-column>
      <el-table-column header-align="center" prop="je" width="120" align="right" label="销售金额">
        <template slot-scope="{row,$index}">
          <el-input
          maxlength="20"
          v-if="editJe[$index]"
          v-model="row.je"
          @blur.prevent="hiddenEdit($index)"
          @keydown.enter.native="hiddenEdit($index)"
          @input="if(isNaN(row.je - 0)) return row.je = '0.00'"
          type="text"
          v-focus
          class="text-center inputSmall"></el-input>
          <span v-else>{{ checkNum(row.je, 'je') }}</span>
          <a href="javascript:;" @click="showEditJe($index)" class="edit-icon el-icon-edit-outline">
            <span class="edit-word font-size-12 text-center">编辑</span>
          </a>
        </template>
      </el-table-column>
      <el-table-column header-align="center" prop="jshj" align="right" width="120" label="价税合计">
        <template slot-scope="{row,$index}">
          <el-input
          maxlength="20"
          v-if="editJshj[$index]"
          v-model="row.jshj"
          @blur.prevent="hiddenEdit($index)"
          @keydown.enter.native="hiddenEdit($index)"
          @input="if(isNaN(row.jshj - 0)) return row.jshj = '0.00'"
          type="text"
          v-focus
          class="text-center inputSmall"></el-input>
          <span v-else>{{ checkNum(row.jshj, 'jshj') }}</span>
          <a href="javascript:;" @click="showEditJshj($index)" class="edit-icon el-icon-edit-outline">
            <span class="edit-word font-size-12 text-center">编辑</span>
          </a>
        </template>
      </el-table-column>
      <el-table-column align="right" header-align="center" width="120" prop="se" label="税额">
        <template slot-scope="{row,$index}">
          <el-input
          maxlength="20"
          v-if="editSe[$index]"
          v-model="row.se"
          @blur.prevent="hiddenEdit($index)"
          @keydown.enter.native="hiddenEdit($index)"
          @input="if(isNaN(row.se - 0)) return row.se = '0.00'"
          type="text"
          v-focus
          class="text-center inputSmall"></el-input>
          <span v-else>{{ checkNum(row.se, 'se') }}</span>
          <a href="javascript:;" @click="showEditSe($index)" class="edit-icon el-icon-edit-outline">
            <span class="edit-word font-size-12 text-center">编辑</span>
          </a>
        </template>
      </el-table-column>
      <el-table-column header-align="center" width="100" align="right" label="税率">
        <!-- <template slot-scope="scope">{{ parseFloat(scope.row.sl * 100).toFixed(2) }}%</template> -->
        <template slot-scope="{row,$index}">
          <el-input
          maxlength="20"
          v-if="editSl[$index]"
          v-model="row.sl"
          @blur.prevent="hiddenEdit($index)"
          @keydown.enter.native="hiddenEdit($index)"
          @input="if(isNaN(row.sl - 0)) return row.sl = '0.00'"
          type="text"
          v-focus
          class="text-center inputSmall"></el-input>
          <span v-else>{{ checkNum(row.sl, 'sl') }}%</span>
          <a href="javascript:;" @click="showEditSl($index)" class="edit-icon el-icon-edit-outline">
            <span class="edit-word font-size-12 text-center">编辑</span>
          </a>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block text-center">
      <add-btn
      class="text-center"
      level1="确 定" level2="取 消"
      @submitForm="submitForm"
      @cancelForm="caseList">
      </add-btn>
    </div>

  </el-card>

</template>

<script>
  export default {
    data() {
      return {
        // 编辑框显示隐藏
        editFwl: [],
        editFpdm: [],
        editFphm: [],
        editKprq: [],
        editXfmc: [],
        editXfsh: [],
        editHwlwmc: [],
        editSsl: [],
        editJe: [],
        editJshj: [],
        editSe: [],
        editSl: [],
        form: {
          user: ''
        },
        tableData: [],
        delRowM: '',
      }
    },

    directives: {
      focus: {
        inserted: function (el) {
          el.querySelector('input').focus()
        }
      }
    },

    created() {
      this.getCaseBz()
    },

    methods: {
      getCaseBz () {
        const that = this
        that.$utils.post(`tax/getCaseFbJxs/${that.$route.query.id}`).then(res => {
          const {code, list, msg} = res.data
          if (code === '00') return that.tableData = list
          else return that.$message(msg)
        })
      },

      delRowMou (row) {
        this.delRowM = row.fphm
      },

      checkNum (val, id) {
        if (isNaN(val - 0)) return '0.00'
        else if (id === 'sl') return parseFloat(val * 100).toFixed(2)
        else return parseFloat(val).toFixed(2)
      },

      // 删除一行
      delRow () {
        if (!this.delRowM) return this.$message('请选择要删除的案例！')
        this.$confirm('删除操作无法恢复，确定删除吗?', '来自网页的消息', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
        }).then(() => {
          for (const i in this.tableData) {
            if (this.tableData[i].fphm === this.delRowM) {
              this.tableData.splice(i, 1)
              this.delRowM = ''
              return false
            }
          }
        }).catch(() => {})
      },

      // ++一行
      addRow () {
        this.tableData.push({
          "caseBh": this.$route.query.id,
          "fpdm": this.tableData[0].fpdm,
          "fphm": "",
          "fplx": "11",
          "hwlwmc": "",
          "je": 0,
          "jshj": 0,
          "kprq": "2019-04-15",
          "lsh": "",
          "nsrsbh": this.tableData[0].nsrsbh,
          "se": 0,
          "sl": 0,
          "ssl": 0,
          "xfmc": "",
          "xfsh": ""
        })
      },

      // 提交
      submitForm () {
        const that=this;
        that.$utils.post('tax/upCaseFbJxs', that.tableData).then(res => {
          const {code, msg} = res.data;
          if (code === '00') {
            that.$message.success(msg);
            that.caseList()
          }
          else return that.$message(msg)
        })
      },
      
      showEditFwl (row) {
        this.editFwl[row] = true;
        this.$set(this.editFwl, row, true)
      },
      showEditFpdm (row) {
        this.editFpdm[row] = true;
        this.$set(this.editFpdm, row, true)
      },
      showEditFphm (row) {
        this.editFphm[row] = true;
        this.$set(this.editFphm, row, true)
      },
      showEditKprq (row) {
        this.editKprq[row] = true;
        this.$set(this.editKprq, row, true)
      },
      showEditXfmc (row) {
        this.editXfmc[row] = true;
        this.$set(this.editXfmc, row, true)
      },
      showEditXfsh (row) {
        this.editXfsh[row] = true;
        this.$set(this.editXfsh, row, true)
      },
      showEditHwlwmc (row) {
        this.editHwlwmc[row] = true;
        this.$set(this.editHwlwmc, row, true)
      },
      showEditSsl (row) {
        this.editSsl[row] = true;
        this.$set(this.editSsl, row, true)
      },
      showEditJe (row) {
        this.editJe[row] = true;
        this.$set(this.editJe, row, true)
      },
      showEditJshj (row) {
        this.editJshj[row] = true;
        this.$set(this.editJshj, row, true)
      },
      showEditSe (row) {
        this.editSe[row] = true;
        this.$set(this.editSe, row, true)
      },
      showEditSl (row) {
        this.editSl[row] = true;
        this.$set(this.editSl, row, true)
      },
      hiddenEdit(row) {
        this.$set(this.editFwl, row, false)
        this.$set(this.editFpdm, row, false)
        this.$set(this.editFphm, row, false)
        this.$set(this.editKprq, row, false)
        this.$set(this.editXfmc, row, false)
        this.$set(this.editXfsh, row, false)
        this.$set(this.editHwlwmc, row, false)
        this.$set(this.editSsl, row, false)
        this.$set(this.editJe, row, false)
        this.$set(this.editJshj, row, false)
        this.$set(this.editSe, row, false)
        this.$set(this.editSl, row, false)
      },

      // 删除
      open(info) {
        // this.$confirm('删除操作无法恢复，确定删除吗?', '来自网页的消息', {
        //   cancelButtonText: '取消',
        //   confirmButtonText: '确定',
        // }).then(() => {
        //   this.$utils.post(`exam/news/delNews/${info.nid}`).then(res => {
        //     this.getArticleList()
        //   })
        // }).catch(() => {

        // })
      },

      // 合计
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) return sums[index] = '合计'
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              return !isNaN(value) ?  prev + curr :  prev
            }, 0)
            sums[index] = parseFloat(sums[index]).toFixed(2)
            if (index === 10) return sums[index] = parseFloat(sums[index] * 100).toFixed(2) + '%'
          }
        });

        return sums;
      },
      
      addCase () {
        this.$router.push({name : 'addCase'})
      },

      taxpayerInfo () {
        this.$router.push({name : 'taxpayerInfo'})
      },

      caseList () {
        this.$router.push({name : 'caseList'})
      },

    },
  }
</script>

<style scoped>
  /* 按钮 */
  .footer-btn {
    display: inline-block;
    padding-right: 20px;
  }
  .footer-btn .el-button {
    border: 0px solid #ccc;
  }
  .footer-btn .el-button:nth-child(1) {
    background-color: #31b5ff;
    color: #fff;
  }
  .footer-btn .el-button:nth-child(2) {
    background: #c2cad8;
    color: #000;
  }

  .inputSmall {
    width: 80px;
  }
  .edit-icon{
    position: absolute;
    padding-left: 10px;
    top: 50%;
    transform: translateY(-50%);
    display: none;
  }
  .edit-icon:hover .edit-word{
    display: inline-block;
  }
  .edit-word {
    display: none;
    position: absolute;
    padding: 5px 0px;
    width: 40px;
    left: 40px;
    top: 50%;
    z-index: 99999999;
    transform: translateY(-50%);
    border: 1px solid #c2cad8;
    border-radius: 3px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    background-color: #fff;
  }
  .edit-word::before {
    display: block;
    content: '';
    position: absolute;
    left: -24px;
    top: 5px;
    z-index: 9;
    width: 0px;
    height: 0px;
    border-top: 6px solid rgba(34, 173, 87, 0);
    border-right: 12px solid #c2cad8;
    border-bottom: 6px solid rgba(34, 173, 87, 0);
    border-left: 12px solid rgba(34, 173, 87, 0);
  }
  .edit-word::after {
    display: block;
    content: '';
    position: absolute;
    left: -23px;
    top: 5px;
    z-index: 9;
    width: 0px;
    height: 0px;
    border-top: 6px solid rgba(34, 173, 87, 0);
    border-right: 12px solid #fff;
    border-bottom: 6px solid rgba(34, 173, 87, 0);
    border-left: 12px solid rgba(34, 173, 87, 0);
  }
</style>