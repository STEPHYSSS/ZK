<template>
  <el-card shadow="never" class="box-card myTest">
    <div class="font-weight-700 teacher-title">
      <h3>实训训练</h3>
      <previous-page goPreviousPage="/page" style="float: right;display: inline-block;"></previous-page>
    </div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline topPadding">
      <el-form-item label="试题题干">
        <el-input v-model="formInline.pname" placeholder="请输入关键词"></el-input>
      </el-form-item>
      <el-form-item class="serch">
        <el-button type="primary" style="background-color:#444;color:#fff;border:1px solid #444;" @click="search">搜索</el-button>
        <el-button type="primary" style="background-color:#444;color:#fff;border:1px solid #444;" @click="chongzhi">重置</el-button>
      </el-form-item>
    </el-form>
    <!--表格-->
    <el-table :data="list" style="width: 100%" border>
      <el-table-column align="center" prop="number" label="序号"></el-table-column>
      <el-table-column align="center" show-overflow-tooltip label="试题题干">
        <template slot-scope="scope">{{scope.row.content}}</template>
      </el-table-column>
      <el-table-column align="center" prop="create_user_name" label="创建人"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="开始考试" placement="bottom">
            <span class="cur-point"  @click="startTesting(scope.row)">
              <img src="@/assets/images/kaishikaoshi_icon.png" alt />
            </span>
          </el-tooltip>
          <!-- <span @click="startTesting(scope.row)" class="curson">开始测试</span> -->
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </el-card>
</template>

<script>
import qs from "qs";
import previousPage from "@/components/previousPage.vue";
export default {
  data() {
    return {
      list: [],
      formInline: {
        pname: ""
      },
      // 分页数据
      total: 10,
      pageNum: 1,
      pageSize: 10,
    };
  },
  components: {
    "previous-page": previousPage
  },
  created() {
    this.gettingData();
  },
  methods: {
    // 列表查询
    // 获取列表页
    gettingData(pageNum,pageSize) {
      this.$utils({
        url: this.reqApi.shuiwuUrl + "/question/prc/listQu",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          locked:"1",
          content:this.formInline.pname
        })
      }).then(res => {
        if(res.data.code === "0000") {
          this.list = res.data.questions.list;
          this.total = res.data.questions.total;
          this.list.forEach(item => { item.content = item.content.replace(/<[^>]+>|&[^>]+;/g, "").trim();});
        }else {
          this.$message.error(res.data.msg)
        }
      });
    },
    // 搜索
    search() {
      this.gettingData();
    },
    chongzhi() {
      this.formInline.pname = "";
      this.gettingData();
    },
    // 开始测试
    startTesting(row) {
      this.$utils({
        url: this.reqApi.shuiwuUrl + "/selfExam/prcTraining",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          prc_uuid: row.practice_question_uuid
        })
      }).then(res => {
        if(res.data.code === "0000") {
          let selfExamid = res.data.selfExam.id;
          sessionStorage.setItem("exam_id",selfExamid);
          this.$router.push({
            name: "startSelfExam",
            query: {
              exam_id: sessionStorage.getItem("exam_id"),
              training:1
            }
          });
        }else {
          this.$message.error(res.data.msg)
        }
      });
      // startSelfExam
      // this.$router.push({
      //   name: "trainingTest",
      //   query: {
      //     // name: row.name,
      //     questions_id: row.practice_question_uuid
      //   }
      // });
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val
      this.gettingData(this.pageSize, this.pageNum)
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.gettingData(this.pageSize, this.pageNum)
    }
  }
};
</script>

<style scoped>
.me {
  margin-top: 25px;
}

.me p {
  font-weight: 600;
  font-size: 20px;
  position: absolute;
  left: 110px;
}

.el-form {
  margin-top: 10px;
}

.el-form--inline .el-form-item__label {
  font-weight: 600;
}
.curson {
  cursor: pointer;
}
</style>
