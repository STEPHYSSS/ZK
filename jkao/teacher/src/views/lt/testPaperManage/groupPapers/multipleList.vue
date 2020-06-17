<template>
  <div class="question-list">
    <i class="el-icon-d-arrow-right rotate-b cur-point" @click="isShowAll"></i>
    <div class="q-header flex-lr">
      <span class="font-weight-700">
        <span style="margin-right: 35px;">试题类型：多选题</span>
        <span>多选题总分：{{scoreSum}}</span>
      </span>
      <el-button class="group-btn" @click="dialogVisible=true">编辑</el-button>
    </div>
    <ul>
      <li class="flex-sx q-li" v-for="(item, index) in newList" :key="index">
        <span style="width: 20px;" class="dis-inline-block">{{index + 1}}.</span>
        <span style="width: 35px;" class="dis-inline-block">分值</span>
        <input style="margin-right: 15px;" v-if="!isSelf" v-model="item.point" type="text" maxlength="6" @keyup="checkPoint(item, 'point')" class="short-input">
        <input style="margin-right: 15px;" v-else v-model="item.set_score" type="text" maxlength="6" @keyup="checkPoint(item, 'set_score')" class="short-input">
        <el-tooltip class="item" effect="light" :content="item.content" :open-delay="0" :enterable="false" placement="bottom-start">
          <span class="uniline-text dis-inline-block">{{item.content}}</span>
        </el-tooltip>
      </li>
    </ul>

    <!-- 选择试题 -->
    <el-dialog
      title="选择试题"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="1000px">
      <question-dialog v-if="dialogVisible" :isSelf="isSelf" :showQuestion="showQuestion" @addQuestion="addQuestion" :type="2" :kind="'1'" @handleClose="dialogVisible=false"></question-dialog>
    </el-dialog>
  </div>
</template>

<script>
  import questionDialog from "./questionDialog"
  export default {
    data () {
      return {
        dialogVisible: false,
        showQuestion: [],// 显示与未显示的所有试题
        newList: [],
        isShow: false
      }
    },
    props: {
      list: Array,
      isSelf: {
        type: Boolean,
        default: false
      }
    },
    created () {
      this.showQuestion = JSON.parse(JSON.stringify(this.list))
      this.handleHide()
    },
    computed: {
      scoreSum () {
        let sum = 0
        if (this.list && this.list.length > 0) {
          for (const i of this.list) {
            if (!this.isSelf) sum += Number(i.point)
            else sum += Number(i.set_score)
          }
        }
        return sum || 0
      }
    },
    components: {
      questionDialog
    },
    methods: {
      // 操作隐藏
      handleHide (list=this.list) {
        this.newList = []
        let arr = JSON.parse(JSON.stringify(list))
        for (let i = 0; i < 3; i++) {
          if (arr[i]) this.newList.push(arr[i])
        }
      },
      changePoint (data) {
        this.$emit('changePoint', [data, 'multipleList'])
      },
      checkPoint (val, id) {
        let g = val[id] + ''
        g = g.replace(/[^0-9]/g,'')
        val[id] = g
        this.changePoint(val)
      },
      // 穿梭狂传来的试题
      addQuestion (data) {
        this.showQuestion = JSON.parse(JSON.stringify(data))
        this.$emit('questionSort', [data, 'multipleList'])
        this.changePoint(data)
      },
      isShowAll () {
        this.isShow = !this.isShow
        document.querySelector('.rotate-b').style.transform = this.isShow ? "rotateZ(225deg)" : "rotateZ(45deg)"
        // 隐藏
        if (!this.isShow) this.handleHide()
        // 显示
        else this.newList = JSON.parse(JSON.stringify(this.list))
      },
    },
    watch: {
      list: function (val) {
        this.showQuestion = JSON.parse(JSON.stringify(val))
        this.handleHide(val)
      }
    }
  }
</script>

<style scoped>
  @import './set.css';
  .cur-point {
    position: absolute;
    bottom: 3px;
    right: 3px;
    font-size: 18px;
    transition: .3s;
    color: #C2CAD8;
    transform: rotate(45deg);
  }
</style>