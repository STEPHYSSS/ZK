<template>
  <el-card style="min-width: 1090px" shadow="never" id="config-select" class="box-card">
    <div class="new-padding-left font-weight-700 teacher-title">配置</div>
    <previous-page goPreviousPage="/findPapers"></previous-page>
    <div class="new-padding-left ex">试卷详情配置，您可以在当前页面创建章节，并向章节中添加试题并设置分值。</div>

    <el-form ref="userConfigOptions" :model="userConfigOptions" label-width="80px" class="config-big">
      <h1 class="text-center">考试试卷配置</h1>
      <div class="config-left ">
        <div class="config-left-header text-center">
          普通试卷<span>考生试卷相同</span>
        </div>
        <div class="config-left-neck text-center">
          <div class="neck-input">
            <span>卷面总分: <input type="text" v-model="userConfigOptions.total_score"></span>
            <span>及格分数: <input type="text" v-model="userConfigOptions.pass_score"></span>
          </div>
        </div>
        <div class="config-left-chest">
          <el-button @click="showQuest('fold')">全部展开</el-button>
          <el-button @click="showQuest('shrink')">全部收缩</el-button>
          <el-button @click="computeTotal(userConfigOptions.sets)">计算总分</el-button>
        </div>
        <ul>
          <li class="config-left-body">
            <draggable id="to-test" class="con-show-quest" v-model="userConfigOptions.sets" :options="optionDrag" @update="update" @add="add($event, userConfigOptions.sets)">

              <!-- 单选题型 -->
              <div class="config-body-header drag">
                题型名称:
                <input type="text" maxlength="50" v-model="singleTitle" readonly class="long-input">
              </div>
              <div class="hideDom" style="height: 100%">
                <div class="config-body-footer" v-for="(item, index) in userConfigOptions.sets" :key="index + 'a'">
                  <template v-if="item.type == 1 && item.kind == 1">
                    <div class="footer-question-left">分值:
                      <input type="text" maxlength="10" v-model="item.point" class="short-input">
                      <span class="unilineText1">{{item.content}}</span>
                    </div>
                    <div class="footer-question-right" @click="deleteRow(item.question_uuid)"><a href="javascript:;">❌</a></div>
                  </template>
                </div>
              </div>

              <!-- 多选题型 -->
              <div class="config-body-header drag">
                题型名称:
                <input type="text" maxlength="50" v-model="multipleTitle" readonly class="long-input">
              </div>
              <div class="hideDom" style="height: 100%">
                <div class="config-body-footer" v-for="(item, index) in userConfigOptions.sets" :key="index + 'b'">
                  <template v-if="item.type == 2 && item.kind == 1">
                    <div class="footer-question-left">分值:
                      <input type="text" maxlength="10" v-model="item.point" class="short-input">
                      <span class="unilineText1">{{item.content}}</span>
                    </div>
                    <div class="footer-question-right" @click="deleteRow(item.question_uuid)"><a href="javascript:;">❌</a></div>
                  </template>
                </div>
              </div>

              <!-- 判断题型 -->
              <div class="config-body-header drag">
                题型名称:
                <input type="text" maxlength="50" v-model="judgeTitle" readonly class="long-input">
              </div>
              <div class="hideDom" style="height: 100%">
                <div class="config-body-footer" v-for="(item, index) in userConfigOptions.sets" :key="index + 'c'">
                  <template v-if="item.type == 3 && item.kind == 1">
                    <div class="footer-question-left">分值:
                      <input type="text" maxlength="10" v-model="item.point" class="short-input">
                      <span class="unilineText1">{{item.content}}</span>
                    </div>
                    <div class="footer-question-right" @click="deleteRow(item.question_uuid)"><a href="javascript:;">❌</a></div>
                  </template>
                </div>
              </div>

              <!-- 实训题型 -->
              <div class="config-body-header drag">
                题型名称:
                <input type="text" maxlength="50" v-model="taxTitle" readonly class="long-input">
              </div>
              <div class="hideDom" style="height: 100%">
                <div class="config-body-footer" v-for="(item, index) in userConfigOptions.sets" :key="index + 'd'">
                  <template v-if="item.kind == 2">
                    <div class="footer-question-left">分值:
                      <input type="text" maxlength="10" v-model="item.point" class="short-input">
                      <span class="unilineText1">{{item.content}}</span>
                    </div>
                    <div class="footer-question-right" @click="deleteRow(item.question_uuid)"><a href="javascript:;">❌</a></div>
                  </template>
                </div>
              </div>

            </draggable>
          </li>
        </ul>
      </div>

      <div class="config-right">
        <div style="position:fixed;">
          <div class="config-left-header text-center">从题库中筛选试题加入到当前试卷</div>
          <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-form-item>
              <el-select v-model="kind" @change="checkKind" placeholder="试题类型" class="searchWid-1">
                <el-option label="客观题" value="1"></el-option>
                <el-option label="实训题" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-if="kind === '1'" clearable @change="questionList(pagesize, pagenum)" v-model="form.type" placeholder="试题类型" class="searchWid-3">
                <el-option label="单选题" :value="1"></el-option>
                <el-option label="多选题" :value="2"></el-option>
                <el-option label="判断题" :value="3"></el-option>
              </el-select>
              <el-select v-else v-model="form.type" clearable @change="questionList(pagesize, pagenum)" placeholder="试题类型" class="searchWid-3">
                <el-option label="普通" :value="1"></el-option>
                <el-option label="综合" :value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="form.bank_id" clearable @change="questionList(pagesize, pagenum)" placeholder="所属题库" class="searchWid-2">
                <el-option
                  v-for="(item,index) in dbsList"
                  :key="index"
                  :label="item.name"
                  :value="item.objective_bank_id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="关键字" clearable @input="questionList(pagesize, pagenum)" v-model="form.content" class="searchWid-3"></el-input>
            </el-form-item>

            <!-- <el-form-item>
              <el-select v-model="form.qlevel" placeholder="试题难度" class="searchWid-3">
                <el-option label="全部" value="0"></el-option>
                <el-option label="非常容易" value="1"></el-option>
                <el-option label="比较容易" value="2"></el-option>
                <el-option label="常规" value="3"></el-option>
                <el-option label="较难" value="4"></el-option>
                <el-option label="非常难" value="5"></el-option>
              </el-select>
            </el-form-item> -->
          </el-form>

          <draggable id="from-test" v-model="tableData" :options="optionDrag">
            <div class="from-question drag" v-for="(item, index) in tableData" :key="index">
              <el-tooltip class="item" effect="light" :enterable="false" :open-delay="500" :content="item.content" placement="bottom-end">
                <span class="unilineText">{{item.content}}</span>
              </el-tooltip>
            </div>
          </draggable>

          <!-- 分页 -->
          <el-pagination
            small
            background
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :page-size="pagesize"
            :current-page="pagenum"
            :total="total">
          </el-pagination>
        </div>
      </div>
      <add-btn
      class="text-center"
      level1="提 交" level2="取 消"
      @submitForm="submitForm"
      @cancelForm="findPapers">
      </add-btn>

    </el-form>
  </el-card>

</template>

<script>
  import { paperDetail, typePaperSet, papersetDetail } from '@/api/taxUrl/testpaper'
  import { questionList, questionBack, questionPrcList, questionPrcBack } from '@/api/taxUrl/question'
  import draggable from 'vuedraggable'
  import previousPage from "@/components/previousPage.vue";
  export default {
    data() {
      return {
        // 配置信息
        userConfigOptions: {
          id: '',
          total_score: 0,
          pass_score: 0,
          // ppapertype: 0,
          sets: []
        },
        form: {
          content: '',
          bank_id: '',
          type: 1
        },
        kind: '1', // 1客观题 2实训题
        singleTitle: '单选题', // 单选题型
        multipleTitle: '多选题', // 多选题型
        judgeTitle: '判断题', // 判断题型
        taxTitle: '实训题', // 实训题型

        optionDrag: {
          // filter: ".drag-item",
          draggable: ".drag",
          group:'people',
          animation: 300,
        },

        tableData: [], // 客观题列表
        prcList: [], // 实训题列表
        dbsList: [], // 客观题库列表
        // 分页数据
        total: 100,
        pagesize: 9,
        pagenum: 1,
      }
    },

    components: {
      draggable,
      "previous-page": previousPage
    },

    created () {
      this.paperDetail() // 获取试卷信息
      this.questionList(this.pagesize, this.pagenum) // 获取客观试题
      this.questionBack() // 获取客观题库
    },

    methods: {
      async paperDetail () {
        const that = this
        const { data: { code, testpaper, back } } = await papersetDetail(that.$route.query.id - 0)
        if (code == '0000') {
          for (const i of back) {
            i.content = i.content.replace(/<[^>]+>|&[^>]+;/g,"").trim()
          }
          that.userConfigOptions.sets = back
          Object.keys(testpaper).forEach(key => {
            if (that.userConfigOptions[key] !== undefined) that.userConfigOptions[key] = testpaper[key]
          })
          that.$nextTick(() => that.update())
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
          for (const i of questions.list) {
            i.content = i.content.replace(/<[^>]+>|&[^>]+;/g,"").trim()
            if (that.kind === '1') {
              that.$set(i, 'kind', 1)
            }else {
              that.$set(i, 'kind', 2)
            }
          }
          that.tableData = questions.list
          that.total = questions.total
        }
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
        if (code === '0000') return that.dbsList = banks.list
      },

      // 展开收缩
      showQuest (index) {
        let changeHeight = document.querySelectorAll('.hideDom')
        let _icon = document.querySelectorAll('.el-icon-top')
        if (index === 'shrink') {
          changeHeight.forEach(item => item.style.height = '0px')
          _icon.forEach(item => item.style.transform = "rotate(180deg)")
          return false
        }
        else if (index === 'fold') {
          changeHeight.forEach(item => item.style.height = '100%')
          _icon.forEach(item => item.style.transform = "rotate(0deg)")
          return false
        }
        else {
          if (changeHeight[index].style.height == '100%') {
            changeHeight[index].style.height = '0px'
            _icon[index].style.transform = "rotate(180deg)"
          }else {
            changeHeight[index].style.height = '100%'
            _icon[index].style.transform = "rotate(0deg)"
          }
        }
      },

      // 计算总分
      computeTotal (row) {
        let sum = 0
        row.forEach(item => {
          sum += Number(item.point)
        })
        this.userConfigOptions.total_score = sum
        this.userConfigOptions.pass_score = parseInt(sum * .6)
      },

      // 删除试题
      deleteRow(qid) {
        for (const [i, item] of new Map(this.userConfigOptions.sets.map((item, i) => [i, item]))) {
          if (item.question_uuid === qid) this.userConfigOptions.sets.splice(i, 1)
        }
        this.$nextTick(() => {
          this.update()
        })
      },

      add (e, sets) {
        if (e.from.id === 'from-test') {
          // 设置sets对象所需字段
          this.userConfigOptions.sets = this.userConfigOptions.sets.map((addMap, index) => {
            // 试题id
            let question_uuid = ''
            if (addMap.objective_question_uuid) {
              question_uuid = addMap.objective_question_uuid
            }
            else if (addMap.practice_question_uuid) {
              question_uuid = addMap.practice_question_uuid
            }
            else question_uuid = addMap.question_uuid
            // 分值
            let point = addMap.point ? addMap.point : 2
            return {
              id: null,
              question_uuid,
              id: this.$route.query.id,
              order_by: index + 1,
              status: addMap.status,
              school_uuid: addMap.school_uuid,
              kind: addMap.kind,
              type: addMap.type,
              point,
              content: addMap.content
            }
          })
          // 去重
          for (let i = 0; i < this.userConfigOptions.sets.length; i++) {
            const item1 = this.userConfigOptions.sets[i];
            for (let y = i + 1; y < this.userConfigOptions.sets.length; y++) {
              const item2 = this.userConfigOptions.sets[y];
              if (item1.question_uuid === item2.question_uuid) {
                this.userConfigOptions.sets.splice(y, 1)
              }
            }
          }
          this.update()
        }
      },

      update () {
        // 更新改变顺序
        this.userConfigOptions.sets.forEach((item, index) => {
          item.order_by = index + 1
        });
        let questionDom = document.querySelectorAll('.config-body-footer')
        for (const i of questionDom) {
          if (i.children.length <= 0) i.style = 'display: none'
          else i.style = 'display: block'
        }
      },

      // 客观题/实训题 切换
      checkKind () {
        this.form.bank_id = ''
        this.form.type = 1
        this.questionList(this.pagesize, this.pagenum)
        this.questionBack()
      },

      async submitForm() {
        const that = this
        if (that.userConfigOptions.sets.length <= 0) return this.$message('请添加试题')
        that.computeTotal(that.userConfigOptions.sets)
        const { data: { code, msg } } = await typePaperSet({
            // testpaper_id: JSON.stringify(that.userConfigOptions.id),
            // total_score: JSON.stringify(that.userConfigOptions.total_score),
            // pass_score: JSON.stringify(that.userConfigOptions.pass_score),
            testpaper_id: that.userConfigOptions.id,
            total_score: that.userConfigOptions.total_score,
            pass_score: that.userConfigOptions.pass_score,
            sets: JSON.stringify(that.userConfigOptions.sets),
        })
        if (code == '0000') {
          that.$message.success(msg)
          that.$router.push({name : 'findPapers'})
        }
        else return that.$message(msg)
      },

      // 试卷管理
      findPapers () {
        this.$router.push({name: 'findPapers'})
      },

      // 分页
      handleCurrentChange(val) {
        this.pagenum = val
        this.questionList(this.pagesize, this.pagenum)
      },

    },
  }
</script>

<style scoped>
  /* 面包屑结束 */
  h1 {
    height: 30px;
    color: #000;
    font-size: 18px;
    width: calc(100% - 440px);
  }
  input {
    width: 100px;
    height: 25px;
    line-height: 25px;
    padding: 0 15px;
  }
  input.long-input {
    width: 300px;
  }
  input.short-input {
    width: 60px;
  }
  /* 外圈大盒子 */
  .config-big {
    box-sizing: content-box;
    font-size: 0;
    padding-left: 15px;
  }
  .config-big > div {
    display: inline-block;
    border: 1px solid #e4e9ec;
    border-bottom: 0px solid #ccc;
    vertical-align: top;
    font-size: 14px;
    box-sizing: border-box;
  }
  .config-big .config-left {
    width: calc(100% - 500px);
    min-height: 400px;
    border-bottom: 1px solid #e4e9ec;
  }
  .config-left-header {
    color: #444;
    height: 35px;
    line-height: 35px;
    border-top: 1px solid #444;
  }
  .config-big .config-left .config-left-header span {
    padding-left:15px;
  }
  .config-big .config-left .config-left-neck {
    font-size: 12px;
    padding: 10px 0;
  }
  .config-big .config-left .config-left-neck span:nth-child(2) {
    padding-left: 20px;
  }
  .config-big .config-left .config-left-chest {
    margin-left: 15px;
    margin-bottom: 15px;
  }
  .config-big .config-left .config-left-body {
    background-color: #f0f4f7;
    /* margin-bottom: 15px; */
  }
  .config-big .config-left .config-left-body .config-body-header,
  .config-big .config-left .config-left-body .config-body-body{
    border-top: 1px solid #e4e9ec;
    padding: 5px 0;
    padding-left: 20px
  }


  .config-big .config-left .config-left-body .config-body-footer {
    border-top: 1px solid #e4e9ec;
    border-bottom: 1px solid #e4e9ec;
    background-color: #fff;
  }
  .config-big .config-left .config-left-body .config-body-footer div {
    display: inline-block;
    box-sizing: border-box;
    vertical-align: top;
    padding: 5px 0;
  }
  .config-big .config-left .config-left-body .config-body-footer .footer-question-left  {
    padding-left: 40px;
    width: calc(100% - 60px);
  }
  .config-big .config-left .config-left-body .config-body-footer .footer-question-left span  {
    padding-left: 20px;
  }
  .config-big .config-left .config-left-body .config-body-footer .footer-question-right  {
    width: 50px;
    text-align: center;
  }
  .config-big .config-right {
    width: 480px;
    height: 100%;
    position: relative;
  }

  /* 输入框们 */
  div.el-form-item {
    margin-bottom: 0;
    margin-right: 0;
  }
  .search.el-button {
    border: 1px solid #31b5ff;
    padding: 7px 7px;
  }
  .demo-form-inline {
    border-bottom: 1px solid #e4e9ec;
    padding-left: 3px;
  }

  /* 题目列表 */
  .from-question {
    border-bottom: 1px solid #e4e9ec;
    color: #777;
    padding: 5px 4px;
  }

  /* 按钮 */
  div.footer-btn {
    border: 0px solid #e4e9ec;
    width: calc(100% - 400px);
    margin-top: 20px;
  }
  .footer-btn .el-button {
    margin-top: 20px;
    border: 0px solid #ccc;
    background-color: #31b5ff;
    color: #fff;
  }
  .footer-btn .el-button:nth-child(2) {
    background: #c2cad8;
    color: #000;
  }

  /* 分页 */
  div.el-pagination {
    /* float: right; */
    border: 0px solid #000;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .el-select.long-input {
    width: 300px !important;
    /* height: 25px; */
  }

  .unilineText {
    display: block;
    width: 476px;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    -webkit-text-overflow: ellipsis;
    -moz-text-overflow: ellipsis;
    white-space: nowrap;
  }
  .unilineText1 {
    display: inline-block;
    width: calc(100% - 180px);
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    -webkit-text-overflow: ellipsis;
    -moz-text-overflow: ellipsis;
    white-space: nowrap;
  }

  .con-show-quest {
    overflow: hidden;
  }

  .pd-right {
    margin-right: 20px;
  }
  .hideDom {
    overflow: hidden;
  }
</style>
