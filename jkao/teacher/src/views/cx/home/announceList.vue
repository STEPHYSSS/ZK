<template>
  <el-card shadow="never" class="box-card announceList">
    <div class="topPadding">
      <h3 style="padding-left:0px">新闻公告</h3>
      <!-- <div class="headline" style="margin-bottom:15px"></div> -->
      <previous-page goPreviousPage="/page" style="margin-top:0px"></previous-page>
    </div>

    <el-table
      :data="articleList"
      stripe
      style="width: 100%"
      :header-cell-style="{color:'#444',textAlign:'center'}"
      :cell-style="{textAlign:'center'}"
      class="topBorder"
    >
      <el-table-column prop="name" label="标题" width="380"></el-table-column>
      <!-- <el-table-column prop="type_id" label="分类"></el-table-column> -->
      <el-table-column prop="visits" label="访问量" width="150"></el-table-column>
      <el-table-column prop="create_user_name" label="创建人"></el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="查看" placement="bottom">
            <span class="cur-point" @click="noticedetail(scope.row)">
              <img src="@/assets/images/chaxun_icon.png" alt />
            </span>
          </el-tooltip>
          <!-- <a @click="noticedetail(scope.row.id)">查看</a> -->
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
    <!-- 新闻公告遮罩层弹窗 -->
    <el-dialog title="新闻公告" :visible.sync="dialogVisible" width="42%" class="noticeCC">
      <div class="detailsHead" style="color: #999;">
        <div class="content">
          <h4>{{popoutMessage.name}}</h4>
          <p>
            发布时间:
            <i>{{popoutMessage.create_time | fmtDate}} &nbsp;&nbsp;</i>访问量：
            <i>{{popoutMessage.visits}}</i>
          </p>
          <span class="main" v-html="popoutMessage.content"></span>
          <br />
          <span class="issuer">
            发布人:
            <i>{{popoutMessage.create_user_name}}</i>
          </span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">我知道了</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import { noticeList } from '@/api/taxUrl/announcement'
import previousPage from "@/components/previousPage.vue";
import qs from "qs"
export default {
  name: "announceList",
  data() {
    return {
      popoutMessage: {}, //公告详情弹框
      //新闻详情遮罩层
      dialogVisible: false,
      articleList:[],
      pageNum: 0,
      pageSize: 10,
      total: 0
    };
  },
  created() {
    this.noticeList();
  },
  components: {
    "previous-page": previousPage
  },
  methods: {
    async noticeList () {
      const {data: { annos, code } } = await noticeList({pageNum: this.pageNum,pageSize:this.pageSize})
      if (code === '0000') {
        this.articleList = annos.list;
        this.total = annos.total;
      }
    },
    noticedetail(info) {
      this.$utils({
        url: this.reqApi.shuiwuUrl + "/anno/detail",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          anno_id:info
        })
      }).then(res => {
        if (res.data.code === "0000") {
          this.dialogVisible = true;
          this.popoutMessage = res.data.anno;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    onSearch() {
      this.noticeList();
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.noticeList();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.noticeList();
    }
  }
};
</script>

<style scoped>
.detailsHead {
  display: flex;
  justify-content: space-between;
  padding: 0 0 10px 0;
  margin-bottom: 20px;
}

.content {
  width: 700px;
  height: 385px;
  margin: 0 auto;
  overflow: auto;
}

.content span {
  display: block;
}

.content h4 {
  font-size: 25px;
  font-weight: 0;
  color: rgb(53, 51, 51);
  font-size: 22px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.content p {
  color: #c2cad8;
  margin-bottom: 10px;
}

.content .main {
  text-align: left;
  margin-left: 20px;
  text-indent: 20px;
  background-color: #fff !important;
  letter-spacing: 3px;
  color: rgb(53, 51, 51);
}

.content h4,
.content p {
  text-align: center;
}

.content .issuer {
  text-align: right;
  margin-right: 15px;
}

.iKnow {
  display: block;
  margin: 30px auto 0;
  width: 320px;
  height: 40px;
  border-radius: 12px;
}

.search {
  background-color: #444;
}
</style>
