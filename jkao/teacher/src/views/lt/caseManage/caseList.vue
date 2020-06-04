<template>
  <el-card class="f-new box-card">
    <new-tabs :active="2" level1="新增案例" level2="管理案例" @callback1="addCase"></new-tabs>

    <!-- 搜索框 -->
    <el-form :inline="true" :model="form" class="fr demo-form-inline">
      <el-form-item label="申报种类:">
        <el-select v-model="form.sbzlDm" placeholder="请选择">
          <el-option
            v-for="(item,index) in sbzlList"
            :key="index"
            :label="item.sbzlMc"
            :value="item.sbzlDm"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="案例名称:" prop="region">
        <el-input clearable v-model="form.caseMc"></el-input>
      </el-form-item>
      <el-form-item label="案例编号:" prop="region">
        <el-input clearable v-model="form.caseBh"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleCaseCX" class="search search-btn">搜索</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      class="topBorder"
    >
      <el-table-column align="center" prop="case_bh" label="案例编号" width="120"></el-table-column>
      <el-table-column prop="sbzl_dm" align="center" width="220" label="申报种类">
        <template slot-scope="scope">
          <div v-for="(item, index) in sbzlList" :key="index">
            <span v-if="scope.row.sbzl_dm === item.sbzlDm">{{item.sbzlMc}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="case_mc" width="250" show-overflow-tooltip label="案例名称"></el-table-column>
      <el-table-column align="center" prop="shared" label="是否共享">
        <template slot-scope="scope">
          <span v-if="scope.row.shared == 1">共享</span>
          <span v-else>私有</span>
          </template>
      </el-table-column>
      <el-table-column prop="fbrq" align="center" label="发布日期"></el-table-column>
      <el-table-column prop="sssq_q" align="center" label="所属时期起"></el-table-column>
      <el-table-column prop="sssq_z" align="center" label="所属时期止"></el-table-column>
      <el-table-column prop="sbqx" align="center" label="申报期限"></el-table-column>
      <el-table-column prop="sjh" align="center" width="160" label="试卷号"></el-table-column>
      <el-table-column align="center" label="操作" width="200" fixed="right">
        <template slot-scope="scope">
          <a href="javacript:;" @click="handlePut(scope.row)">修改</a>
          |
          <a href="javacript:;" @click="copyCase(scope.row)">复制</a>
          |
          <a href="javacript:;" @click="taxpayerInfo(scope.row)">纳税人信息</a>
          <br />
          <a href="javacript:;" @click="setCaseBz(scope.row)">设置标准答案</a>
          |
          <a href="javacript:;" @click="open(scope.row)">删除</a>
          <br />
          <a
            v-if="scope.row.sbzl_dm === '101'"
            href="javacript:;"
            @click="invoiceInfo(scope.row)"
          >进项发票信息</a>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="pagesizes"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </el-card>
</template>

<script>
import newTabs from '@/components/newTabs'
export default {
  data() {
    return {
      dialogVisibleData: false,
      sbzlList: [],
      form: {
        sbzlDm: "",
        caseMc: "",
        caseBh: ""
      },
      tableData: [],
      list: [],
      // 分页数据
      total: 10,
      pagesize: 10,
      pagesizes: [10, 15, 20, 30],
      pagenum: 1,
      aRoleid:sessionStorage.role_id
    };
  },

  created() {
    this.getSbzlList();
    this.getfindCase();
  },
  components: {
    newTabs
  },

  methods: {
    getfindCase() {
      const that = this;
      that.$utils.post("tax/getCaseList").then(res => {
        const { list, code } = res.data;
        if (code === "00") {
          that.list = list;
          that.total = list.length;
          that.tableData = [];
          list.forEach((item, index) => {
            if (index < that.pagesize) return that.tableData.push(item);
          });
        }
      });
    },

    copyCase (data) {
      if (data.shared == 0) return this.$message('无权限！无法操作')
      this.$utils.post(`tax/copyCase/${data.case_bh}/${sessionStorage.aId}`)
      .then(res => {
        const { code, msg } = res.data
        if (code === '00') {
          this.handleCaseCX()
          this.pagenum = 1
          this.$message.success('复制成功')
        }else {
          this.$message(msg)
        }
      })
    },

    // 申报种类
    getSbzlList() {
      const that = this;
      that.$utils.post("tax/getSbzlList").then(res => {
        const { code, list } = res.data;
        if (code === "00") return (that.sbzlList = list);
        else return that.$message("获取申报种类失败！");
      });
    },

    handleCaseCX() {
      const that = this;
      if ( that.form.caseMc === "" && that.form.caseBh === "" && that.form.sbzlDm === "" ) return that.getfindCase();
      that.$utils
      .post("tax/getCaseListSearch", that.form)
      .then(res => {
        const { code, list, msg } = res.data;
        if (code === "00") {
          that.list = list;
          that.total = list.length;
          that.tableData = [];
          list.forEach((item, index) => {
            if (index < that.pagesize) return that.tableData.push(item);
          });
        }
        else return this.$message(msg)
      })
      .catch(err => {
        that.$message.error('网络异常')
      })
    },

    // 关闭
    handleClose() {
      this.dialogVisibleData = false;
    },

    handlePut(info) {
      if(this.aRoleid > 2 && info.create_user_id != sessionStorage.userId){
          this.$message('无权限！无法操作')
        }else{
          sessionStorage.caseInfo = JSON.stringify(info);
          this.$router.push({ name: "addCase" });
        }
    },

    // 删除
    open(info) {
      this.$message("还没做！");
      // this.$confirm('删除操作无法恢复，确定删除吗?', '来自网页的消息', {
      //   cancelButtonText: '取消',
      //   confirmButtonText: '确定',
      // }).then(() => {
      //   this.$utils.post(`exam/news/delNews/${info.nid}`).then(res => {
      // this.tableData = []
      //     this.getArticleList()
      //   })
      // }).catch(() => {

      // })
    },

    setCaseBz(info) {
      this.$router.push({
        name: "setCaseBz",
        query: { id: info.case_bh }
      });
    },

    addCase() {
      this.$router.push({ name: "addCase" });
    },

    taxpayerInfo(info) {
      this.$router.push({
        name: "taxpayerInfo",
        query: { id: info.case_bh }
      });
    },

    invoiceInfo(info) {
      this.$router.push({
        name: "invoiceInfo",
        query: { id: info.case_bh }
      });
    },

    // 分页
    handleSizeChange(val) {
      this.pagesize = val;
      this.tableData = [];
      this.pagenum = 1;
      this.list.forEach((item, index) => {
        if (index < this.pagesize) return this.tableData.push(item);
      });
    },

    handleCurrentChange(val) {
      this.pagenum = val;
      this.tableData = [];
      const currentIndex = this.pagesize * val;
      this.list.forEach((item, index) => {
        let result = [];
        if (index < currentIndex) {
          result.push(item);
          if (index >= this.pagesize * (val - 1)) return this.tableData.push(item);
        }
      });
    },

    // Case分页
    handleSizeChangeCase(val) {
      this.casePagesize = val;
      this.caseTableData = [];
      this.casePagenum = 1;
      this.caseList.forEach((item, index) => {
        if (index < this.casePagesize) return this.caseTableData.push(item);
      });
    },

    handleCurrentChangeCase(val) {
      this.casePagenum = val;
      this.caseTableData = [];
      const currentIndex = this.casePagesize * val;
      this.caseList.forEach((item, index) => {
        let result = [];
        if (index < currentIndex) {
          result.push(item);
          if (index >= this.casePagesize * (val - 1)) return this.caseTableData.push(item);
        }
      });
    }
  }
};
</script>

<style scoped>
</style>