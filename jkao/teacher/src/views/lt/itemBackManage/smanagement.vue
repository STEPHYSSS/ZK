<template>
  <div class="Gmanagement">
    <div class="dingdanRece">
      <div class="dingdanMain">
        <div class="addStore">
          <router-link to="/suppliermanagement">
            <el-button class="increase themeColor">
              <i class="el-icon-plus"></i>新增
            </el-button>
          </router-link>
        </div>
        <el-table :data="tableDataList" style="width: 100%" border max-height="500px">
          <el-table-column prop="code" label="供应商编号" align="center"></el-table-column>
          <el-table-column prop="name" label="供应商名称" align="center"></el-table-column>
          <el-table-column prop="contactsName" label="联系人" align="center"></el-table-column>
          <el-table-column label="创建时间" align="center">
            <template slot-scope="scope">
              <span
                v-if="scope.row.createTime!=null"
              >{{scope.row.createTime | converTime('YYYY-MM-DD')}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="purchase" label="采购中心" align="center"></el-table-column>
          <el-table-column prop="type" label="类型" align="center"></el-table-column>
          <el-table-column label="供应方式" align="center">
            <template slot-scope="scope">{{scope.row.supplyMode | suppmode}}</template>
          </el-table-column>
          <el-table-column prop="status" label="状态" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.status =='0'">已禁用</span>
              <span v-else>已启用</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
                <img
                  src="@/assets/images/xiugai_icon.png"
                  @click="editSupplier(scope.row.code)"
                  class="imgSize"
                />
              </el-tooltip>&nbsp;&nbsp;
              <el-tooltip
                class="item"
                effect="dark"
                content="启用"
                placement="bottom"
                v-if="scope.row.status=='0'"
              >
                <img
                  src="@/assets/images/jinyong_icon.png"
                  @click="modify(scope.row.status,scope.row.code)"
                  class="imgSize"
                />
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="禁用" placement="bottom" v-else>
                <img
                  src="@/assets/images/qiyong_icon.png"
                  @click="modify(scope.row.status,scope.row.code)"
                  class="imgSize"
                />
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="重置密码" placement="bottom">
                <!-- <img src="@/assets/resetpasswords_icon.png" @click="resPwd" class="imgSize" /> -->
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      ruleForm: {
        questionCode:sessionStorage.getItem('questionUUid')
      },
      Info: {
        code: "",
        questionCode:sessionStorage.getItem('questionUUid')
      },
      tableDataList: [],
      n1: false,
      n2: true,
      n3: true,
      n4: false,
      statu: [
        {
          value: "0",
          label: "已禁用"
        },
        {
          value: "1",
          label: "已启用"
        }
      ],
      // 分页数据
      pageNum: 1,
      pageSize: 20,
      total: 0
    };
  },
  created() {
    // this.getSmageList();
    // this.showother();
    // this.suPurchase();
    this.getList()
  },
  filters: {
    suppmode(value) {
      if (value == "Z") {
        return "直送门店";
      } else if (value == "W") {
        return "仓库配送";
      }
    }
  },
  methods: {
    getList(){
       this.$utils.post(this.reqApi.xinls+'/exam/supplier/list',qs.stringify({
      questionCode:sessionStorage.getItem('questionUUid')
    })).then(res=>{
      if(res.data.code==='0000'){
          this.tableDataList=res.data.data
      }
    })
    },
    // 编辑
    editSupplier(code) {
      this.$router.push({
        name: "suppliermanagement",
        query: {
          code: code
        }
      });
    },
    // 启用1、禁用0
    modify(status, code) {
      let _this = this;
      _this.Info.token = sessionStorage.getItem("token");
      _this.Info.code = code;
      this.$utils.post(this.reqApi.xinls+'/exam/supplier/status/modify',qs.stringify(_this.Info)).then(res=>{
        if(res.data.code==='0000'){
          this.getList()
        }else {
          return this.$message.error(res.data.msg)
        }
      })
    }
  }
};
</script>

<style scoped>
.Gmanagement .dingdanRece {
  height: 100%;
}
.dingdanflexBox {
  height: 200px;
  margin: 0 20px;
  box-sizing: border-box;
}
.dingdanMain {
  flex: 1;
  -webkit-box-flex: 1;
  position: relative;
  margin-bottom: 90px;
  max-height: 600px;
}
.fenyedignwei {
  position: absolute;
  bottom: -90px;
  right: 0;
}
p {
  display: inline-block;
  width: 300px;
}
.Gmanagement .el-range-editor.el-input__inner {
  width: 100%;
}
.Gmanagement .el-select {
  width: 100%;
}
.TongRight .el-button {
  padding: 0;
}
.addStore img {
  margin-right: 20px;
}
.lett {
  letter-spacing: 3px;
}
.addStore {
    text-align: right;
    margin-bottom: 20px;
}
</style>
