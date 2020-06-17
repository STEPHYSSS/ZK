<template>
  <el-card shadow="never" class="myWrongTopicSet" style="background:#fff">
    <previous-page goPreviousPage="/page" style="float: right;display: inline-block;"></previous-page>
    <div class="topPadding">
      <div class="headline" style="margin-bottom:35px">我的错题集</div>
    </div>

    <!-- <el-row class="row-bg"> -->
    <el-row>
      <!--左侧题目-->
      <!-- <div id="lookDetails-left" class="left"> -->
      <div>
        <div class="mistakesHead">
          <el-row>
            <!-- <el-button type="primary" plain style="color: #31b5ff;">清空收藏夹</el-button> -->
            <el-button type="primary" @click="favoritesCategory" style="color: #fff">收藏夹分类</el-button>
          </el-row>
          <el-row>
            <!--分类搜索-->
            <el-form :inline="true" :model="categoryName" class="demo-form-inline">
              <el-form-item label="收藏夹分类：">
                <el-select v-model="categoryName.id" placeholder="请选择">
                  <el-option
                    v-for="(item, index) in classifiedCollection"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button class="mg0" @click="search">搜索</el-button>
              </el-form-item>
            </el-form>
          </el-row>
        </div>
        <analysis
          v-if="flag"
          :judgeObjs="judgeObjs"
          :singleObjs="singleObjs"
          :multiObjs="multiObjs"
          :remarks="remarks"
          :prcQus="prcQus"
          @search="search"
          ref="eaxmTem"
          :collectId="categoryName.id"
        ></analysis>

        <!--试题内容（包括题干和选项）-->
        <!-- <div
                    v-for="(item, index) in list"
                    :key="index"
                    v-loading="loading"
                    class="questions-two"
                >
        <div v-if="index === showQuestion.index">-->
        <!--题干-->
        <!-- <div class="stem">
                            <h3 class="fontSize">
                                <img
                                    src="@/assets/images/tigan_icon.png"
                                    style="width: 16px;height: 17px;margin-bottom: 7px;"
                                />
                                {{showQuestion.index+1}}.题干
                                <a href="javaScript:;" @click="remove(item)" class="fr">
                                    <i class="el-icon-delete"></i> 删除
                                </a>
                            </h3>
                            <p v-html="item.tmQuestion.qcontent"></p>
        </div>-->
        <!--选项-->
        <!-- <div class="option font-color-82" v-if="item.tmQuestion.qtype != '4'">
                            <h3 class="fontSize">
                                <img src="@/assets/images/xuanxiang_icon.png" alt />选项
                            </h3>
                            <div
                                class="option-p"
                                v-for="(item1, index) in item.tmQuestion.options"
                                :key="index"
                            >
                                <div :class="item1.okey.indexOf(item.userkey) !== -1 ? 'redQ' : ''">
                                    <span>{{item1.okey}}.</span>
                                    <span>{{item1.otxt}}</span>
                                </div>
                            </div>
                            <div class="option-p an">
                                <img src="@/assets/images/smallBulb.png" alt />
                                <span>
                                    您的答案 :
                                    <span class="redQ">{{item.userkey}}</span>
                                </span>
                                <span class="option-p-an">
                                    正确答案 :
                                    <span class="greenQ">{{item.tmQuestion.qkey}}</span>
                                </span>
                            </div>
        </div>-->
        <!--解析-->
        <!-- <div class="stem">
                            <h3 class="fontSize">
                                <img
                                    src="@/assets/images/jiexi_icon.png"
                                    alt
                                    style="vertical-align: unset;"
                                />备注
                            </h3>
                            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.remark || '收藏时未添加备注'}}</p>
        </div>-->
        <!-- </div>
        </div>-->
      </div>

      <!--右侧信息-->
      <!-- <div id="lookDetail-right-info" class="info"> -->
      <!-- <div class="personalInfo">
                    <div class="per-info-img">
                        <img :src="this.$utils.serverUrl + uPhoto" alt :onerror="errorImg" />
                    </div>
                    <span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名 :{{object.uRealname}}</span>
                    <br />
                    <span>学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号 :{{object.uNo}}</span>
      <br />-->
      <!-- <span>考试日期 : {{obj.starttime}}</span> -->
      <!-- </div> -->

      <!-- <div class="topicInfo">
                    <vue-scroll :ops="ops" style="width:auto;height:115px">
                        <div>
                            <a href="javaScript:;" v-for="(item, index) in list" :key="index">
                                <span
                                    class="info-question"
                                    v-if="!item.userkey"
                                    @click="singleChoiceCb(index)"
                                >{{index + 1}}</span>
                                <span
                                    class="info-question"
                                    v-else
                                    :class="[item.userkey === item.qkey ? 'greenB' : 'redB']"
                                    @click="singleChoiceCb(index)"
                                >{{index + 1}}</span>
                            </a>
                        </div>
                    </vue-scroll>
                    <div class="isSign text-center font-size-12">
                        <span class="redB">错题</span>
                        <span>未答</span>
                    </div>
      </div>-->

      <!-- <div class="tableInfo">
                    <span class="table-info-logo">LOGO</span>
                    <span class="table-info-chou fr">CHOUDONGXI</span>
      </div>-->
      <!-- </div> -->
    </el-row>
    <el-dialog title :visible.sync="dialogVisible" width="600px">
      <span class="dialogTitle">新增分类</span>
      <i class="el-icon-circle-plus-outline addBtn1" @click="addType"></i>

      <!-- <a
                href="javascript:;"
                class="addBtn22"
                style="display: inline-block"
                @click="addType"
      >+</a>-->
      <el-table
        :data="classifiedCollection"
        style="width: 100%"
        max-height="400"
        border
        class="topBorder"
        :header-cell-style="{color:'#444',textAlign:'center'}"
        :cell-style="{textAlign:'center'}"
      >
        <el-table-column prop="name" label="分类名称" align="center">
          <template slot-scope="{row,$index}">
            <input
              v-if="editable[$index]"
              type="text"
              v-focus
              style="text-align: center"
              v-model="row.name"
              maxlength="20"
              @blur.prevent="hiddenEdit($index)"
              @keydown.enter="hiddenEdit($index,row)"
            />
            <span v-else>{{row.name}}</span>
          </template>
        </el-table-column>

        <!-- <el-table-column label="编辑" align="center">
                    <template slot-scope="{row, $index}">
                        <a class="el-icon-edit ico" @click="showEdit($index,row)"></a>
                    </template>
        </el-table-column>-->

        <el-table-column prop="num" label="收藏数量" align="center"></el-table-column>
        <el-table-column label="操作" align="center" fixed="right">
          <template slot-scope="{row,$index}">
            <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
              <span class="cur-point"  @click="showEdit($index,row)">
                <img src="@/assets/images/xiugai_icon.png" alt />
              </span>
            </el-tooltip>&nbsp;&nbsp;
            <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
              <span class="cur-point" @click="deleteClassification(row,$index)">
                <img src="@/assets/images/shanchu_icon.png" alt />
              </span>
            </el-tooltip>&nbsp;&nbsp;
            <!-- <a href="javascript:;" @click="showEdit($index,row)">编辑</a>&nbsp;&nbsp;&nbsp;
            <a href="javascript:;" @click="deleteClassification(row,$index)">删除</a> -->
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit">保存</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <!--收藏分类弹框-->
    <!--  <div class="favoritesCategory" ref="favoritesCategory" style="display: none;">
      <div class="favorites">
        <span>收藏夹分类</span>
        <p @click="favoritesCategoryClose">×</p>
      </div>
      <div class="categoryInfo">
        <span class="addClassify">
          收藏分类:
          <input type="text" ref="addTypes" placeholder="请输入分类名称" v-model="inp" />
          <a href="javascript:;" class="addBtn" style="display: inline-block" @click="addType">+</a>
        </span>
        <el-table
          :data="classifiedCollection"
          style="width: 100%"
          height="130"
          class="topBorder"
          :header-cell-style="{color:'#444',textAlign:'center'}"
          :cell-style="{textAlign:'center'}"
        >
          <el-table-column prop="tname" label="分类名称">
            <template slot-scope="{row,$index}">
              <input
                v-if="editable[$index]"
                type="text"
                v-focus
                style="text-align: center"
                v-model="row.tname"
                @blur.prevent="hiddenEdit($index)"
                @keydown.enter="hiddenEdit($index,row)"
              />
              <span v-else>{{row.tname}}</span>
            </template>
          </el-table-column>

          <el-table-column>
            <template slot-scope="{row, $index}">
              <a class="el-icon-edit ico" @click="showEdit($index,row)"></a>
            </template>
          </el-table-column>

          <el-table-column prop="count" label="收藏数量"></el-table-column>
          <el-table-column>
          </el-table-column>

          <el-table-column prop="tid" label="操作">
            <template slot-scope="scope">
              <a href="javascript:;" @click="deleteClassification(scope.row)">删除</a>
            </template>
          </el-table-column>
        </el-table>
        <p>
          <i style="color: darkorange; font-weight: 700">温馨提示:</i>
          点击 "
          <i class="el-icon-edit ico"></i>" 可修改分类名称
        </p>
      </div>
    </div>-->
  </el-card>
</template>

<script>
import previousPage from "@/components/previousPage.vue";
import qs from "qs";
import analysis from "./analysis.vue";
export default {
  name: "myWrongTopicSet",
  data() {
    return {
      delPost: "", //用于接受删除的cid
      // 本页数据
      list: [],
      //学生信息
      object: {},
      // 显示哪个题
      showQuestion: {
        index: 0
      },
      //遮罩层
      dialogFormVisible: false,
      dialogVisible: false,
      loading: false,
      //收藏夹分内按钮弹框
      classifiedCollection: [],
      msg: "", //收藏夹弹框的删除分类的错误提示信息
      inp: "", //收藏夹弹框的新增分类的分类名称
      editable: [], //收藏夹弹框的修改
      searchClassified: "", //搜索单个分类
      //分类搜索数据
      categoryName: {
        uid: sessionStorage.getItem("userId"),
        tid: "", //分类id
        timeOrder: "0" //时间排序0默认1降序2升序
      },
      value4: "",
      //滚动条插件数据
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {
          keepShow: true
        },
        bar: {
          hoverStyle: true,
          onlyShowBarOnScroll: false, //是否只有滚动的时候才显示滚动条
          background: "#7f7f7f",
          minSize: "0.3"
        }
      },
      //收藏夹弹框的修改
      getId: "",
      uPhoto: sessionStorage.getItem("hPortrait"),
      //头像加载失败占位
      errorImg: 'this.src="' + require("@/assets/images/failToLoad.png") + '"',
      judgeObjs: [],
      singleObjs: [],
      multiObjs: [],
      prcQus: [],
      remarks: [],
      flag: false
    };
  },
  components: {
    "previous-page": previousPage,
    analysis
  },
  //自动获取焦点（文本框）
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },

  created() {
    // this.categoryListings();
    this.getList();
  },

  mounted() {
    // this.getExamParticulars();
  },

  methods: {
    // 收藏夹列表
    getList() {
      this.$utils
        .post(
          this.reqApi.shuiwuUrl + "/collect/list",
          qs.stringify({
            pageSize: 999999999999
          })
        )
        .then(res => {
          this.classifiedCollection = res.data.collects;
        });
    },
    submit() {
      this.$utils
        .post(
          this.reqApi.shuiwuUrl + "/collect/save",
          qs.stringify({
            collects: JSON.stringify(this.classifiedCollection)
          })
        )
        .then(res => {
          this.dialogVisible = false;
          this.$message.success("提交成功！");
          this.editable = [];
          this.getList();
        });
    },
    //获取页面信息
    getExamParticulars() {
      const that = this;
      that.$utils
        .post(`exam/collection/findAllCollection/${sessionStorage.userId}`)
        .then(res => {
          const { list, code, object } = res.data;
          if (code === "00") {
            that.loading = false;
            that.list = list;
            that.object = object;
            list.forEach(item => {
              that.categoryName.tid = item.tid;
            });
          } else {
            that.loading = false;
            that.$message.warning(msg);
          }
        });
    },

    //收藏夹分类按钮
    favoritesCategory() {
      this.dialogVisible = true;
      // this.$refs.favoritesCategory.style = "display:block";
    },

    //分类列表
    categoryListings() {
      let that = this;
      that.$utils
        .post(`exam/collection/findAllCollectionType/${sessionStorage.userId}`)
        .then(favorites => {
          if (favorites.data.code === "00") {
            that.classifiedCollection = favorites.data.list;
            // let classifyLen = that.list.length;
            // let classify = that.list;
            // for (let i = 0; i < classifyLen; i++) {
            // that.classifyName = classify[i].tname;
            // }
            let arr = that.classifiedCollection;
            let len = arr.length;
            that.editable = new Array(len);
          }
        });
    },

    //搜索按钮(查询单个分类)
    search(data) {
      // if(data){
      //     this.categoryName.id=data
      // }
      this.$utils
        .post(
          this.reqApi.shuiwuUrl + "/collect/detail",
          qs.stringify({
            collect_id: this.categoryName.id
          })
        )
        .then(res => {
          if (res.data.code === "0000") {
            this.flag = true;
            sessionStorage.setItem("hide", 1);
            this.judgeObjs = res.data.judgeObjs;
            this.singleObjs = res.data.singleObjs;
            this.multiObjs = res.data.multiObjs;
            this.prcQus = res.data.prcQus;
            this.remarks = res.data.remarks;
            for (const i of this.singleObjs) {
              this.$set(i, "checkAnswer", "");
              this.$set(i.question, "remark", "");
            }
            for (const i of this.multiObjs) {
              this.$set(i, "checkAnswer", "");
              this.$set(i.question, "remark", "");
            }
            for (const i of this.judgeObjs) {
              this.$set(i, "checkAnswer", "");
              this.$set(i.question, "remark", "");
            }
            for (const i of this.prcQus) {
              // this.$set(i, "checkAnswer", "");
              this.$set(i, "remark", "");
            }
          }
        });
    },

    //收藏夹分类弹框中列表里的删除
    deleteClassification(delInfo, index) {
      this.classifiedCollection.splice(index, 1);
      this.$utils
        .post(
          this.reqApi.shuiwuUrl + "/collect/delete",
          qs.stringify({
            collect_id: delInfo.id
          })
        )
        .then(res => {
          if (res.data.code === "0000") {
            this.$message.success("删除成功！！");
            this.getList();
          }
        });
      return;
      let that = this;
      that.$utils
        .post(`exam/collection/delCollectionType/${delInfo.tid}`)
        .then(delClassify => {
          const { code } = delClassify.data;
          if (code === "00") {
            that.categoryListings(); //刷新当前页面，重新拉取数据渲染
          } else {
            this.$confirm("该分类下还有错题，不能删除！", "来自网页的消息...", {
              cancelButtonText: "取消",
              confirmButtonText: "确定"
            })
              .then(() => {})
              .catch(() => {});
          }
        });
    },

    //收藏夹分类弹框叉
    favoritesCategoryClose() {
      if (!this.getId.name || this.getId.name == "") {
        this.$message("分类名称未填写");
      } else {
        this.$refs.favoritesCategory.style = "display:none";
      }
    },

    //收藏夹分类弹框的新增分类
    addType() {
      let obj = {
        name: "分类名称"
      };
      console.log(this.classifiedCollection.length);
      console.log(this.classifiedCollection);
      if (this.classifiedCollection.length > 49) {
        this.$message("最多新增50个！");
      } else {
        this.classifiedCollection.push(obj);
        return;
        let that = this;
        if (!this.inp.trim() || this.inp == "") {
          this.$message("请输入分类名称");
          return false;
        } else {
          let addCollectType = {
            name: this.inp,
            uid: sessionStorage.userId
          };
          addCollectType.name = that.inp;
          that.$utils
            .post(`exam/collection/newCollectionType`, addCollectType)
            .then(res => {
              if (res.data.code === "00") {
                that.inp = "";
                that.categoryListings();
              } else if (res.data.code === "11") {
                that
                  .$confirm("分类名重复，不能添加", "提示", {
                    cancelButtonText: "取消",
                    confirmButtonText: "确定"
                  })
                  .then(() => {})
                  .catch(() => {});
              }
            });
        }
      }
      // this.classifiedCollection.push(obj);
      // return;
    },

    //收藏夹分类列表的修改
    showEdit(index, getId) {
      this.editable[index] = true;
      this.$set(this.editable, index, true);
      this.getId = getId;
    },

    //收藏夹分类列表的修改.点击其他地方文本框关闭
    hiddenEdit(row) {
      let that = this;
      if (!that.getId.name || that.getId.name == "") {
        this.$message("请输入正确的分类名称");
        // }else{
        let amendParameter = {
          tid: that.getId.tid,
          name: that.getId.name
        };
        that.$utils
          .post(`exam/collection/updateCollectionType`, amendParameter)
          .then(res => {
            if (res.data.code === "00") {
              this.$set(this.editable, row, false);
            } else if (res.data.code === "11") {
              this.$confirm("分类名重复，请重新输入！", "来自网页的消息", {
                cancelButtonText: "取消",
                confirmButtonText: "确定"
              })
                .then(() => {})
                .catch(() => {});
            }
          });
      }
    },

    //右侧信息每个题目
    singleChoiceCb(index) {
      this.showQuestion.index = index;
    },

    // 单题删除按钮(已封装)
    remove(testQuestionsInfo) {
      this.$confirm("删除操作无法恢复，确定删除吗?", "来自网页的消息", {
        cancelButtonText: "取消",
        confirmButtonText: "确定"
      })
        .then(() => {
          this.$utils
            .post(`exam/collection/delCollection/${testQuestionsInfo.cid}`)
            .then(res => {
              this.getExamParticulars();
            });
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped>
input {
  width: 100px;
}

/*分类搜索&删除*/
.mistakesHead {
  display: flex;
  justify-content: space-between;
  border-bottom: 2px dotted #aee1fe;
  padding-bottom: 10px;
  margin-bottom: 15px;
  margin: 0 20px;
}

/*收藏夹分类按钮*/
.favoritesCategory {
  height: 300px;
  width: 458px;
  border: 1px solid #c2cad8;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 1px 1px 1px 1px #ccc;
}

.favoritesCategory .favorites {
  width: 100%;
  height: 45px;
  background-color: #eef1f5;
}

.favoritesCategory .favorites p {
  float: right;
  font-size: 22px;
  color: #666;
  margin: 9px 5px 0 0;
  cursor: pointer;
  cursor: pointer;
}

.favoritesCategory .favorites span {
  color: #444;
  line-height: 45px;
  font-weight: 600;
  font-size: 15px;
  margin-left: 15px;
}

.favoritesCategory .favorites img {
  width: 25px;
  height: 25px;
  vertical-align: middle;
  margin: 0 0 3px 15px;
}

.favoritesCategory .categoryInfo {
  padding: 20px 0 5px 0;
}

.favoritesCategory .categoryInfo .addClassify {
  color: #000;
  font-size: 15px;
  display: block;
  margin: 0 10px 20px 10px;
}

.favoritesCategory .categoryInfo .addClassify a {
  height: 29px;
  width: 29px;
  color: #fff;
  background-color: #e71517;
  text-align: center;
  font-size: 32px;
  vertical-align: middle;
  line-height: 30px;
}

.favoritesCategory .categoryInfo p {
  margin: 15px 0 0 15px;
}

/****收藏夹分类按钮结束*****/

.el-card {
  background-color: #f1f5f7;
}

.el-card > div.el-card__body {
  padding: 0;
}

div.el-card__body {
  padding: 0 !important;
}

.row-bg {
  display: flex;
  justify-content: space-between;
}

/*============左侧题目============*/
.row-bg .left {
  width: 80%;
  margin-right: 44px;
  /* border: 1px solid #ccc; */
  /*margin-top: 15px;*/
}

/*标签页*/
.left .section {
  font-size: 20px;
  font-weight: 700;
  display: block;
  padding: 15px 20px 10px;
  background: #f1f5f7;
}

/*试题内容*/
.left {
  height: 635px;
  overflow: auto;
  /* padding: 15px 20px 20px; */
  background-color: #fff;
}

.left .questions-two .stem,
.left .questions-two .option {
  padding-bottom: 30px;
  border-bottom: 2px dotted #aee1fe;
}

.left .questions-two .option {
  border-bottom: 0px dotted #aee1fe;
}

.left .questions-two .option .option-p {
  padding-left: 75px;
  padding-top: 15px;
}

.left .questions-two .option .option-p .option-p-an {
  padding-left: 40px;
}

.left .questions-two .option .option-p.an {
  font-weight: 700;
}

.left .questions-two div h3 img {
  vertical-align: middle;
  margin-right: 10px;
}

.left .questions-two div h3 a {
  font-weight: normal;
  font-size: 14px;
}

.left .questions-two div h3 a:hover {
  color: #444;
}

.left .questions-two p {
  padding-left: 47px;
}

/* .option-p-an {
      padding-left: 85px;
      padding-top: 15px;
    } */

/*==========右侧信息===========*/
.row-bg .info {
  width: 264px;
  height: 665px;
  /*margin-top: 55px;*/
  background-color: #fff;
  border: 1px solid #e4e7ed;
}

/*右侧信息*/
.info .personalInfo,
.tableInfo:nth-child(1) {
  border-bottom: 2px dotted #aee1fe;
  margin-bottom: 5px;
  padding: 15px;
  position: relative;
}

.tableInfo {
  /*padding-bottom: 60px;*/
}

.info .tableInfo span {
  display: inline-block;
  position: absolute;
}

.info .tableInfo .table-info-logo {
  left: 15px;
  bottom: 0px;
}

.info .tableInfo .table-info-chou {
  right: 0px;
  bottom: -10px;
}

.info .personalInfo .per-info-img {
  width: 80px;
}

.info .personalInfo .per-info-img img {
  width: 100%;
}

.info .topicInfo {
  border-bottom: 2px dotted #aee1fe;
  margin-bottom: 5px;
  padding: 15px;
}

.info .topicInfo .isSign {
  padding: 15px 0 0px;
  position: relative;
  left: -8px;
}

.info .topicInfo .isSign span {
  color: #acabab;
  padding: 3px 18px;
  background-color: #f3f3f3;
}

.info .topicInfo .isSign span:nth-child(2) {
  margin: 0 5px;
}

.info .topicInfo .info-question {
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  font-size: 12px;
  background-color: #f3f3f3;
  color: #acabab;
  margin-right: 9px;
  margin-bottom: 5px;
}

.info .topicInfo a {
  color: #333;
}

.redB {
  background-color: #ef6f6e !important;
  color: #fff !important;
}

.greenB {
  background-color: #65da9d !important;
  color: #fff !important;
}

.redQ {
  color: #ef6f6e !important;
}

.greenQ {
  color: #65da9d !important;
}

.bgc-yellow {
  color: #f7b844;
  font-size: 16px;
}

.bgc-ccc {
  color: #ccc;
  font-size: 16px;
}

.bgc-ccc:hover {
  color: #ccc !important;
}

.look-mg-left {
  margin-left: 20px;
}

.el-tabs--border-card > .el-tabs__content {
  padding: 0px;
}

.pd-header-span {
  padding: 15px 0 15px 15px;
  display: inline-block;
}

.per-info-img img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
}
.addBtn22 {
  height: 20px;
  width: 20px;
  color: #fff;
  background-color: #31b5ff;
  text-align: center;
  font-size: 24px;
  vertical-align: middle;
  line-height: 20px;
}
.mg0 {
  margin-right: -10px;
}
.dialogTitle {
  margin: 0 0 20px 20px;
  display: inline-block;
  font-size: 16px;
}
.addBtn1 {
  vertical-align: text-bottom;
  font-size: 19px;
  color: #31b5ff;
  font-weight: 700;
  cursor: pointer;
}
</style>
