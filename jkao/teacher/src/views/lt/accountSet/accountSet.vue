<template>
  <el-card class="new-class f-new box-card" id="accountSet">
    <div style="padding-left:20px;">
      <h3 class="headline2">教学账套</h3>
      <previous-page goPreviousPage="/mpage" style="float: right;display: inline-block;"></previous-page>
      <el-form :inline="true" :model="formInline" size="mini" class="demo-form-inline f-new-inp">
        <el-row>
          <el-col :span="10" style="text-align:left; min-width: 425px">
            <el-form-item label="创建日期：">
              <el-date-picker
                type="daterange"
                @change="creatChange"
                v-model="createTim"
                class="datePicker"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8" style="text-align:left">
            <el-form-item label="公司名称：">
              <el-input
                placeholder="请输入关键词"
                clearable
                v-model="formInline.name"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" class="fr text-right" style="padding:0 20px 20px 0;">
            <!-- <el-form-item class="serch"> -->
              <el-button
                type="primary"
                style="background-color:#444;color:#fff;border:1px solid #444;"
                @click="search"
              >搜索</el-button>
              <el-button class="search search-btn" @click="clear">重置</el-button>
            <!-- </el-form-item> -->
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="addBtnBox">
      <el-button @click="addCompany">新增</el-button>
    </div>
    <el-table ref="multipleTable" :data="tableData" class="topBorder" style="width: 100%" >
      <el-table-column prop="name" label="公司名称" align="center"></el-table-column>
      <el-table-column prop="description" label="备注" align="center"></el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status=='1'">启用</span>
          <span v-else>禁用</span>
        </template>
      </el-table-column>
      <el-table-column label="共享" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.shared=='1'">共享</span>
          <span v-else>私有</span>
        </template>
      </el-table-column>
      <el-table-column prop="create_user_name" label="创建人" align="center"></el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">{{scope.row.create_time | fmtDate1}}</template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="修改" placement="bottom">
            <span class="cur-point dis-inline-block">
              <img src="@/assets/images/xiugai_icon.png" @click="editCompany(scope.row)">&nbsp;&nbsp;&nbsp;
            </span>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="账套数据" placement="bottom">
            <span class="cur-point dis-inline-block">
              <img src="@/assets/images/zicejilu_icon.png" @click="zhangtao(scope.row)">&nbsp;&nbsp;&nbsp;
            </span>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
            <span class="cur-point dis-inline-block">
              <img src="@/assets/images/shanchu_icon.png" @click="delCompany(scope.row)">&nbsp;&nbsp;&nbsp;
            </span>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="复制" placement="bottom">
            <span class="cur-point dis-inline-block">
             <img src="@/assets/images/fuzhi_icon.png" alt  @click="copyCompany(scope.row)">
            </span>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[10,20,30,40]"
        :page-size="pageSize"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        class="pagination"
      ></el-pagination>
    </div>
  </el-card>
</template>
<script>
import qs from "qs";
import newTabs from "@/components/newTabs";
import previousPage from "@/components/previousPage.vue";
export default {
  data() {
    return {
      formInline: {
        name: "",
        start_time: "",
        end_time: ""
      },
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      createTim: [], //创建时间
    };
  },
  components: {
    newTabs,
    "previous-page": previousPage
  },
  created() {
    this.getCompanyList();
  },
  methods: {
    clear(){
      this.createTim=[],
      this.formInline.start_time=''
      this.formInline.end_time=''
      this.formInline.name=''
      this.getCompanyList()
    },
    creatChange(e) {
      if (e) {
        this.formInline.start_time = this.$moment(e[0]).format("YYYY-MM-DD");
        this.formInline.end_time = this.$moment(e[1]).format("YYYY-MM-DD");
      } else {
        this.createTim = [];
        this.formInline.start_time = "";
        this.formInline.end_time = "";
        this.getCompanyList();
      }
    },
    // 搜索
    search() {
      this.getCompanyList();
    },
    getCompanyList() {
      this.$utils
        .post(
          this.reqApi.shuiwuUrl + "/company/list",
          qs.stringify({
            name: this.formInline.name,
            start_time: this.formInline.start_time,
            end_time: this.formInline.end_time,
            pageNum: this.pageNum,
            pageSize: this.pageSize
          })
        )
        .then(res => {
          if (res.data.code === "0000") {
            this.tableData = res.data.companies.list;
            this.total = res.data.companies.total;
          }
        });
    },
    // 新增
    addCompany() {
      this.$router.push({ name: "addCompany" });
    },
    //编辑
    editCompany(info) {
      this.$router.push({
        name: "addCompany",
        query: { id: info.id }
      });
    },
    // 账套
    zhangtao(info) {
      sessionStorage.setItem("companyId", info.id);
      this.$router.push({ name: "teacherPublicRole", query: { teacher: "Y" } });
    },
    // 删除
    delCompany(info) {
      const that = this;
      if (this.role_id == "3" && info.create_user_id != this.userId) {
        this.$message("无权限！无法操作");
      } else {
        that
          .$confirm("删除操作无法恢复，确定删除吗?", "来自网页的消息", {
            cancelButtonText: "取消",
            confirmButtonText: "确定"
          })
          .then(() => {
            that.$utils
              .post(
                that.reqApi.shuiwuUrl + "/company/delete",
                qs.stringify({
                  company_id: info.id
                })
              )
              .then(res => {
                const { code, msg } = res.data;
                if (code === "0000") {
                  that.getCompanyList();
                  that.$message.success("删除成功！");
                } else return that.$message(msg);
              });
          })
          .catch(() => {});
      }
    },
    // 复制
    copyCompany(info) {
      const that = this;
      if (this.role_id == "3" && info.create_user_id != this.userId) {
        this.$message("无权限！无法操作");
      } else {
        that.$utils
          .post(
            that.reqApi.shuiwuUrl + "/company/copy",
            qs.stringify({
              company_id: info.id
            })
          )
          .then(res => {
            const { code, msg } = res.data;
            if (code === "0000") {
              this.$message.success("复制成功！！");
              that.getCompanyList();
            } else return that.$message(msg);
          });
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getCompanyList(this.pageNum, val);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getCompanyList(val, this.pageSize);
    }
  }
};
</script>
<style scoped>
.inputWidth {
  width: 300px;
}
.headline2 {
  padding-left: 0px;
}
.addBtnBox {
  text-align: right;
  margin-right: 20px;
  margin-bottom: 20px;
}
#accountSe .datePicker .el-input__icon {
  line-height: 25px;
}

</style>
