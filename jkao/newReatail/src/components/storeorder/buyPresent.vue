<template>
  <div class="productSales">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
      <el-breadcrumb-item :to="{ path: '/operatIndex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>促销中心</el-breadcrumb-item>
      <el-breadcrumb-item>买赠活动</el-breadcrumb-item>
    </el-breadcrumb>-->
    <div class="storeBox">
      <div class="store_Box">
        <p class="store_tit">买赠活动</p>
        <el-row style="white-space: nowrap;">
          <el-col :span="6">
            <span>促销名称：</span>
            <p>
              <el-input type="text" placeholder="请输入" v-model="list2.name"></el-input>
            </p>
          </el-col>
          <el-col :span="6" class="TongCenter">
            <span>促销状态：</span>
            <p>
              <el-select type="text" v-model="list2.status">
                <el-option
                  v-for="(item,index) in options"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  placeholder="请选择"
                ></el-option>
              </el-select>
            </p>
          </el-col>
          <el-col :span="6" class="TongCenter">
            <span>启用状态：</span>
            <p>
              <el-select type="text" v-model="list2.openStatus">
                <el-option
                  v-for="(item,index) in statu"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  placeholder="请选择"
                ></el-option>
              </el-select>
            </p>
          </el-col>
          <el-col :span="6" class="TongRight">
            <el-button class="theBtn queryButton" @click="search">查询</el-button>
            <el-button class="theBtn resetButton" @click="reset">重置</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="storeInfo">
      <div class="store_Box2">
        <div class="buyHideScoll">
           <!-- <div class="increaseBox">
            <div class="addBtnBox">
              <el-button class="increase themeColor" @click="toIncreased">
                <i class="el-icon-plus"></i>新增
              </el-button>
            </div>
          </div> -->
           <div class="addStore">
            <!-- <img src="@/assets/addBtn.png" alt @click="toIncreased" /> -->
            <el-button class="increase themeColor" @click="toIncreased">
                <i class="el-icon-plus"></i>新增
              </el-button>
          </div> 
          <el-table :data="list1" style="width: 100%;" border>
            <el-table-column prop="name" label="促销名称" align="center"></el-table-column>
            <el-table-column label="促销开始时间" align="center">
              <template scope="scope">{{scope.row.startTime | converTime('YYYY-MM-DD')}}</template>
            </el-table-column>
            <el-table-column label="促销结束时间" align="center">
              <template scope="scope">{{scope.row.endTime | converTime('YYYY-MM-DD')}}</template>
            </el-table-column>
            <el-table-column label="促销状态" align="center">
              <template scope="scope">
                <span v-if="scope.row.status =='1'">未开始</span>
                <span v-else-if="scope.row.status =='2'">进行中</span>
                <span v-else>已结束</span>
              </template>
            </el-table-column>
            <el-table-column label="启动状态" align="center">
              <template scope="scope">
                <span v-if="scope.row.openStatus =='Y'">已启用</span>
                <span v-else-if="scope.row.openStatus =='N'">已禁用</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template scope="scope">
                <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
                  <img src="@/assets/xiugai_icon.png" @click="edit(scope.row.id)" class="imgSize" />
                </el-tooltip>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="禁用"
                  placement="bottom"
                  v-if="scope.row.openStatus =='Y'"
                >
                  <img
                    src="@/assets/jinyong_icon.png"
                    @click="modify(scope.row.id)"
                    class="imgSize"
                  />
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="启用" placement="bottom" v-else>
                  <img src="@/assets/qiyong_icon.png" @click="modify(scope.row.id)" class="imgSize" />
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
          <div class="konge"></div>
          <div class="paginStyle">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageNum"
              :page-sizes="[20, 40, 60]"
              :page-size="pageSize"
              background
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              class="pagination"
            ></el-pagination>
          </div>
          <div class="konge"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      options: [
        {
          value: "1",
          label: "未开始"
        },
        {
          value: "2",
          label: "进行中"
        },
        {
          value: "3",
          label: "已结束"
        }
      ],
      statu: [
        {
          value: "Y",
          label: "已启用"
        },
        {
          value: "N",
          label: "已禁用"
        }
      ],
      list1: [], // 存放活动列表
      list2: {
        //发送给后台的数据
        token: sessionStorage.getItem("token"),
        pageNum: 1,
        pageSize: 20,
        name: "",
        status: "",
        openStatus: ""
      },
      pageNum: 1,
      pageSize: 20,
      total: 0
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.$axios
        .post("/sys/promote/give/list", qs.stringify(this.list2))
        .then(res => {
          if (res.data.code === "0000") {
            this.total = res.data.data.total;
            this.list1 = res.data.data.list;
          } else if (res.data.code === "6666") {
            this.$message({
              showClose: true,
              message: "token异常，请重新登录",
              type: "error"
            });
          }else return this.$message.error(res.data.msg)
        });
    },
    // 启用禁用
    modify(id) {
      let codeId = id;
      this.$axios
        .post(
          "/sys/promote/give/modify",
          qs.stringify({
            token: sessionStorage.getItem("token"),
            promoteId: codeId
          })
        )
        .then(res => {
          this.getList();
        });
    },
    // 编辑
    edit(id) {
      sessionStorage.setItem("id", id);
      this.$router.push({
        path: "/buyPresentAdd",
        query: {
          id: sessionStorage.getItem("id")
        }
      });
    },
    //跳转到新增页面
    toIncreased() {
      this.$router.push({
        name: "buyPresentAdd"
      });
    },
    search() {
      this.getList();
    },
    reset() {
      this.list2.name = "";
      this.list2.status = "";
      this.list2.openStatus = "";
      this.getList();
    },
    handleCurrentChange(val) {
      this.list2.pageNum = val;
      this.getList();
    },
    handleSizeChange(val) {
      this.list2.pageSize = val;
      this.getList();
    }
  }
};
</script>

<style scoped>
.productSales {
  background-color: #fff;
  min-height: 647px;
  min-width: 1700px;
  box-sizing: border-box;
  box-shadow: 0px 2px 10px #ccc;
  height: 100%;
}
p {
  display: inline-block;
  width: 300px;
}
.productSales .el-range-editor.el-input__inner {
  width: 100%;
}
.productSales .el-select {
  width: 100%;
}
.addStore img {
  margin-right: 20px;
}
.store_Box2 {
  overflow: hidden;
  position: relative;
  height: 634px;
}
.buyHideScoll {
  position: absolute;
  left: 0;
  top: 0;
  right: -17px;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>

