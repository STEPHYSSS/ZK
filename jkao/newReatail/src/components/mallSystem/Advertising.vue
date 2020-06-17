<template>
  <div class="Advertising minimum">
    <div class="cbox">
      <h3>广告位管理</h3>
      <el-row>
        <el-col :span="8">
          <div>
            <span class="textTitle textTitleR textMright">主题名称:</span>
            <el-input type="text" placeholder="请输入" v-model="dataList.name" class="input1" />
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <span class="textTitle textTitleR textMright">状态:</span>
            <p class="TongYiInput">
              <el-select v-model="dataList.status" placeholder="请选择">
                <el-option label="已启用" value="Y"></el-option>
                <el-option label="已禁用" value="N"></el-option>
              </el-select>
            </p>
          </div>
        </el-col>
        <el-col :span="8" class="textAlignRight">
          <div>
            <div>
              <el-button class="theBtn queryButton" @click="search">查询</el-button>
              <el-button @click="resetForm" class="theBtn resetButton">重置</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="increaseBox">
      <div class="addBtnBox">
        <div class="serchBoxBtn70">
          <el-button class="increase themeColor" @click="newIncrease">
            <i class="el-icon-plus"></i>新增
          </el-button>
        </div>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%" max-height="600">
      <el-table-column prop="name" align="center" label="主题名称"></el-table-column>
      <el-table-column prop="url" label="链接地址" align="center"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center">
          <template scope="scope">
              <span>{{scope.row.createTime | converTime('YYYY-MM-DD')}}</span>
            </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="更新时间" align="center">
        <template scope="scope">
              <span>{{scope.row.updateTime | converTime('YYYY-MM-DD')}}</span>
            </template>
      </el-table-column>
      <el-table-column prop="operationName" label="最后操作人" align="center"></el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status=='Y'">启用</span>
          <span v-if="scope.row.status=='N'">禁用</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
            <img src="@/assets/xiugai_icon.png" @click="editRow(scope.row.id)" class="codesty" alt />
          </el-tooltip>&nbsp;&nbsp;&nbsp;&nbsp;
          <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
            <img
              src="@/assets/shanchu_icon.png"
              @click="delPanRow(scope.row.id)"
              class="codesty"
              alt
            />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div style="height:50px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="dataList.pageNum"
        :page-sizes="[20, 40, 60]"
        :page-size="dataList.pageSize"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        class="pagination"
      ></el-pagination>
    </div>
    <el-dialog title="提示" :visible.sync="centerDialogVisible" width="360px" center>
      <div slot="title" class="auditBtn">
        <span class="el-icon-info"></span>
        <span class="auditBtn-1">提示</span>
      </div>
      <div class="title">
        <p>确定删除？</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="theBtn themeColor textMright" @click="del">确定</el-button>
        <el-button class="theBtn resetButton" @click="centerDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "Advertising",
  data() {
    return {
      dataList: {
        token: sessionStorage.getItem("token"),
        name: "",
        status: "",
        pageSize: 20,
      pageNum: 1,
      },
      
      total: 0,
      tableData: [],
      id: "",
      centerDialogVisible: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.$axios
        .post("/mall/banner/list", qs.stringify(this.dataList))
        .then(res => {
          if (res.data.code === "0000") {
            this.total = res.data.data.total;
            this.tableData = res.data.data.list;
          }
        });
    },
    editRow(code) {
      console.log(code);
      this.$router.push({
        name: "advertisementAdd",
        query: {
          id: code
        }
      });
    },
    newIncrease() {
      this.$router.push({
        name: "advertisementAdd"
      });
    },
    search() {
      this.getList();
    },
    resetForm() {
      this.dataList.name = "";
      this.dataList.status = "";
      this.getList();
    },
    delPanRow(id) {
      // console.log(code);
      this.id = id;
      this.centerDialogVisible = true;
      // this.$axios.post('')
     
    },
    del() {
      console.log(this.id);
       this.$axios
        .post("/mall/banner/delete", qs.stringify({
          token:sessionStorage.getItem('token'),
          id:this.id
        }))
        .then(res => {
          if (res.data.code === "0000") {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.centerDialogVisible=false
            this.getList()
          } else{
            this.$message.error(res.data.msg)
          }
        });
    },
    handleSizeChange(val) {
      this.dataList.pageSize=val
      this.getList();
    },
    handleCurrentChange(val) {
      this.dataList.pageNum=val
      this.getList();
    }
  }
};
</script>
<style scoped>
.Advertising {
  background-color: #fff;
  box-shadow: 0 2px 10px #ccc;
  min-width: 1700px;
}
.cbox {
  height: 200px;
  margin: 0 20px;
}
h3 {
  padding: 20px 0;
}
.el-icon-info {
  color: #ffab5a;
  font-size: 25px;
}
.auditBtn {
  position: absolute;
  left: 0;
  top: -1px;
  padding-top: 20px;
  border-bottom: 3px solid #dbe0e5;
  width: 100%;
  text-align: left;
  padding-left: 14px;
  box-sizing: border-box;
}
 .auditBtn-1 {
  font-size: 16px;
  margin-left: 5px;
  vertical-align: top;
}
 .title {
  text-align: center;
}
</style>