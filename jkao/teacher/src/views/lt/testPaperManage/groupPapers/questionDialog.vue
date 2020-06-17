<template>
  <div class="dia-body">
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item label="题干关键字">
        <el-input v-model="form.content" placeholder="" @change="questionList(pagesize, pagenum)"></el-input>
      </el-form-item>
      <el-form-item label="所属题库1">
        <el-select v-model="form.bank_id" clearable @change="questionList(pagesize, pagenum)" placeholder="所属题库">
          <el-option
            v-for="(item,index) in dbsList"
            :key="index"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="prcType == 'prcType'" label="试题类型">
        <el-select v-model="form.type" clearable @change="questionList(pagesize, pagenum)" placeholder="试题类型">
          <el-option label="普通" :value="1"></el-option>
          <el-option label="综合" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="fr">
        <el-button @click="questionList(pagesize, pagenum)">查询</el-button>
        <el-button @click="reForm">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 穿梭狂 -->
    <div class="my-transfer flex-lr">

      <div class="transfer-left">
        <div class="transfer-title">
          <span class="font-weight-700">已选试题</span>
          <span class="font-color" v-if="addQList">共{{addQList.length}}题</span>
        </div>
        <ul class="transfer-content">
          <li v-for="(item, index) in addQList" :key="index" class="flex-lr cur-point" :class="checkIsQ(item) ? 'bgc-color' : ''" @click="add_ing(item)">
            <el-tooltip class="item" effect="light" :content="item.content" :open-delay="500" :enterable="false" placement="bottom">
              <span class="uniline-text1">{{index + 1}}. {{item.name || item.question_name}}</span>
            </el-tooltip>
            <div>
              <i class="cur-point up_icon" @click="switchPosition('up', item, index)">
                <!-- <img src="@/assets/images/icon/up_icon.png" alt=""> -->
              </i>
              <i style="margin-left: 10px;" class="cur-point down_icon" @click="switchPosition('down', item, index)">
                <!-- <img src="@/assets/images/icon/down_icon.png" alt=""> -->
              </i>
            </div>
          </li>
        </ul>
      </div>

      <div class="transfer-middle flex-center">
        <i @click="add(chooseListObj)" style="font-size: 50px; padding-bottom: 40px;" class="font-color cur-point el-icon-arrow-left">
        </i>
        <i @click="right(chooseListObj)" style="font-size: 50px;" class="font-color cur-point el-icon-arrow-right"></i>
      </div>

      <div class="transfer-right">
        <div class="transfer-title">
          <span class="font-weight-700">待选试题</span>
          <span class="font-color" v-if="tableData">共{{tableData.length}}题</span>
        </div>
        <ul class="transfer-content">
          <li v-for="(item, index) in tableData" :key="index" class="flex-lr cur-point" :class="checkIsQ(item) ? 'bgc-color' : ''" @click="add_ing(item)">
            <el-tooltip class="item" effect="light" :content="item.content" :open-delay="500" :enterable="false" placement="bottom">
              <span class="uniline-text1">{{index + 1}}. {{item.name || item.question_name}}</span>
            </el-tooltip>
          </li>
        </ul>
      </div>

    </div>

    <!-- sub按钮 -->
    <div style="margin-top: 20px;">
      <el-button @click="confirm">确定</el-button>
      <el-button @click="$emit('handleClose')">取消</el-button>
    </div>
  </div>
</template>

<script>
  import { questionList, questionBack, questionPrcList, questionPrcBack } from '@/api/taxUrl/question'
  export default {
    data () {
      return {
        chooseListObj: [], // 选中试题后的列表
        addQList: [], // 左边框显示的试题列表
        tableData: [], // 右边框显示的试题列表
        dbsList: [], // 客观题库列表
        total: 0,
        pagesize: 999999999,
        pagenum: 1,
        // 试题搜索条件
        form: {
          content: '',
          bank_id: '',
          type: 1
        }
      }
    },
    props: {
      prcType: {
        default: '0'
      },
      showQuestion: Array,
      kind: String, // 1客观题 2实训题
      isSelf: Boolean,
      type: {
        type: Number,
        default: 1
      }
    },
    created () {
      this.form.type = this.type
      this.addQList = JSON.parse(JSON.stringify(this.showQuestion))
      this.update() // 试题排序
      this.questionList(this.pagesize, this.pagenum) // 获取客观试题
      this.questionBack() // 获取客观题库
    },
    methods: {
      reForm () {
        this.form = {
          content: '',
          bank_id: '',
          type: 1
        }
      },
      // 验证chooseListObj中是否又这道题
      checkIsQ (item) {
        let flag = false
        for (const i of this.chooseListObj) {
          if (i.question_uuid === item.question_uuid) return flag = true
        }
        return flag
      },
      // 添加试题到chooseListObj
      add_ing (item1) {
        if (this.chooseListObj.length <= 0) {
          this.chooseListObj.push(item1)
        }else {
          let flag = true
          for (const [i, item] of new Map(this.chooseListObj.map((item, i) => [i, item]))) {
            if (item.question_uuid === item1.question_uuid) {
              this.chooseListObj.splice(i, 1)
              flag = false
            }
          }
          if (flag) {
            this.chooseListObj.push(item1)
          }
        }
      },
      // 获取客观/实训试题列表
      async questionList (pageSize, pageNum) {
        const that = this
        let res = {}
        const { content, bank_id, type } = that.form
        if (that.kind === '1') {
          res = await questionList({ pageSize, pageNum, type, content, bank_id, locked: 1 })
        }else {
          res = await questionPrcList({ pageSize, pageNum, type, content, bank_id, locked: 1 })
        }
        const { questions, code } = res.data
        if (code == '0000') {
          this.chooseListObj = []
          for (const i of questions.list) {
            i.content = i.content.replace(/<[^>]+>|&[^>]+;/g,"").trim()
            if (that.kind === '1') {
              that.$set(i, 'kind', 1)
              that.$set(i, 'question_uuid', i.objective_question_uuid)
            }else {
              that.$set(i, 'kind', 2)
              that.$set(i, 'question_uuid', i.practice_question_uuid)
            }
          }
          that.tableData = questions.list
          that.total = questions.total
        }
      },
      // 切换试题顺序
      switchPosition (uod, item, index) {
        if (uod === 'up' && index > 0) {
          let temp = this.addQList[index - 1]
          this.$set(this.addQList, index - 1, item)
          this.$set(this.addQList, index, temp)
        }else if (uod === 'down' && index < (this.addQList.length - 1)) {
          let temp = this.addQList[index + 1]
          this.$set(this.addQList, index + 1, item)
          this.$set(this.addQList, index, temp)
        }
        this.update()
      },
      // 添加试题后
      add (sets) {
        // 设置sets对象所需字段
        let newArr = []
        if (!this.isSelf) {
          newArr = sets.map((addMap, index) => {
            // 试题id
            // let question_uuid = ''
            // if (addMap.objective_question_uuid) {
            //   question_uuid = addMap.objective_question_uuid
            // }
            // else if (addMap.practice_question_uuid) {
            //   question_uuid = addMap.practice_question_uuid
            // }
            // else question_uuid = addMap.question_uuid
            let question_uuid = question_uuid = addMap.question_uuid
            // 分值
            let point = addMap.point ? addMap.point : 2
            return {
              question_uuid,
              id: this.$route.query.id,
              order_by: 1,
              status: addMap.status,
              school_uuid: addMap.school_uuid,
              kind: addMap.kind,
              name: addMap.name || addMap.question_name,
              type: addMap.type,
              point,
              content: addMap.content
            }
          })
        }else {
          newArr = sets.map((addMap, index) => {
            let question_uuid = question_uuid = addMap.question_uuid
            let set_score = addMap.set_score ? addMap.set_score : 2
            return {
              question_uuid,
              self_exam_id: null,
              name: addMap.name,
              question_kind: addMap.kind || addMap.question_kind,
              order_by: 1,
              type: addMap.type,
              set_score,
              content: addMap.content
            }
          })
        }
        // 删除题库试题中已添加至chooseListObj中的试题
        this.chooseListObj.forEach((item, index) => {
          this.tableData.forEach((item1, index1) => {
            if (item.question_uuid === item1.question_uuid) this.tableData.splice(index1, 1)
          });
        });
        //  去重
        let arr = [...this.addQList, ...newArr]
        
        for(var i=0; i<arr.length; i++){
          for(var j=i+1; j<arr.length; j++){
            if(arr[i].question_uuid==arr[j].question_uuid){         //第一个等同于第二个，splice方法删除第二个
              arr.splice(j,1);
              j--;
            }
          }
        }
        this.addQList = arr
        this.update()
        this.chooseListObj = []
      },
      // 左侧试题移入右侧
      right (sets) {
        // 删除题库试题中已添加至chooseListObj中的试题
        this.chooseListObj.forEach((item, index) => {
          this.addQList.forEach((item1, index1) => {
            if (item.question_uuid === item1.question_uuid) this.addQList.splice(index1, 1)
          });
        });
        
        //  去重
        let arr = [...this.tableData, ...this.chooseListObj]
        
        for(var i=0; i<arr.length; i++){
          for(var j=i+1; j<arr.length; j++){
            if(arr[i].question_uuid==arr[j].question_uuid){         //第一个等同于第二个，splice方法删除第二个
              arr.splice(j,1);
              j--;
            }
          }
        }
        this.tableData = arr
        this.chooseListObj = []
      },
      update () {
        this.addQList.forEach((item, index) => {
          item.order_by = index + 1
        });
      },
      confirm () {
        this.$emit('addQuestion', this.addQList)
        this.$emit('handleClose')
      },
      // 获取题库列表
      async questionBack () {
        const that = this
        let res = {}
        if (that.kind === '1') {
          res = await questionBack()
        }else {
          res = await questionPrcBack()
        }
        const { banks, code } = res.data
        for (const i of banks.list) {
          if (i.objective_bank_id) i['id'] = i.objective_bank_id
          else if (i.practice_bank_id) i['id'] = i.practice_bank_id
        }
        if (code === '0000') return that.dbsList = banks.list
      },
      // 客观题/实训题 切换
      checkKind () {
        this.form.bank_id = ''
        this.form.type = 1
        this.questionList(this.pagesize, this.pagenum)
        this.questionBack()
      },
    },
    watch: {
      showQuestion: function (val) {
        this.addQList = JSON.parse(JSON.stringify(val))
      }
    }
  }
</script>

<style scoped>
  @import './set.css';
  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .dia-body {
    padding: 20px;
    padding-top: 0;
  }
  .my-transfer {
    width: 100%;
  }
  .my-transfer .transfer-left, .my-transfer .transfer-middle, .my-transfer .transfer-right {
    /* width: 250px; */
    height: 350px;
    /* border: 1px solid #333; */
  }
  .my-transfer .transfer-left, .my-transfer .transfer-right {
    width: 450px;
  }
  .my-transfer .transfer-middle {
    width: 70px;
  }
  /* .my-transfer .transfer-right {
    width: 400px;
  } */
  .my-transfer .transfer-left .transfer-title, .my-transfer .transfer-right .transfer-title {
    height: 20px;
  }
  .my-transfer .transfer-left .transfer-content, .my-transfer .transfer-right .transfer-content {
    width: 100%;
    height: calc(100% - 30px);
    border: 1px solid #C2CAD8;
    border-top: 1px solid #333;
    overflow: auto;
    padding-bottom: 10px;
  }
  .my-transfer .transfer-right .transfer-content .uniline-text1 {
    width: 300px;
  }
  .my-transfer .transfer-left .transfer-content li, .my-transfer .transfer-right .transfer-content li {
    height: 30px;
    line-height: 30px;
    padding: 0 20px 0 10px;
    border-bottom: 1px solid #C2CAD8;
  }
  .my-transfer .transfer-left .transfer-content li:last-child, .my-transfer .transfer-right .transfer-content li:last-child {
    border-bottom: 0px solid #C2CAD8;
  }
  .font-color {
    color: #bebebe;
  }
  .uniline-text1 {
    display: block;
    width: 220px;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    -webkit-text-overflow: ellipsis;
    -moz-text-overflow: ellipsis;
    white-space: nowrap;
  }
  .bgc-color {
    background-color: #eef1f5;
  }
  .up_icon {
    width: 10px;
    height: 13px;
    display: inline-block;
    background-image: url("../../../../assets/images/icon/up_icon.png");
  }
  .down_icon {
    width: 10px;
    height: 13px;
    display: inline-block;
    background-image: url("../../../../assets/images/icon/down_icon.png");
  }
  .up_icon:hover {
    background-image: url("../../../../assets/images/icon/up_icon_focus.png");
  }
  .down_icon:hover {
    background-image: url("../../../../assets/images/icon/down_icon_focus.png");
  }
  .dia-body ::-webkit-scrollbar {
    width: 10px;
    height: 14px;
  }
</style>