<template>
  <div id="distributionList" class="minimum minWidth1600">
    <div class="content">
      <h3>分配策略</h3>
      <el-table :data="list" style="width: 100%;" border>
        <el-table-column align="center" label="序号">
          <template slot-scope="scope">{{ scope.$index+1}}</template>
        </el-table-column>
        <el-table-column align="center" prop="name" label="组波策略名称"></el-table-column>
        <el-table-column align="center" label="创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime|fmtDate2}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="更新时间">
          <template slot-scope="scope">
            <span>{{ scope.row.updateTime|fmtDate2}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">{{ scope.row.status| statusTip}}</template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
            <p class="dis">
              <img src="@/assets/xiugai_icon.png" class="codesty" @click="edit()" />
            </p>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="禁用"
            placement="bottom"
            v-if="list[0].status =='1'"
          >
            <p class="dis">
              <img src="@/assets/jinyong_icon.png" class="codesty" @click="modify(list[0].status)" />
            </p>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="启用" placement="bottom" v-else>
            <p class="dis">
              <img src="@/assets/qiyong_icon.png" class="codesty" @click="modify(list[0].status)" />
            </p>
          </el-tooltip>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  data() {
    return {
      list: [
        {
          name: "出库单分配策略",
          createTime: "",
          updateTime: "",
          status: ""
        }
      ]
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.$axios
        .post(
          "/warehouse/distribution/distributionStrategy",
          qs.stringify({
            token: sessionStorage.getItem("token")
          })
        )
        .then(res => {
          if (res.data.code === "0000") {
            this.list[0].createTime = res.data.data.createTime;
            this.list[0].updateTime = res.data.data.updateTime;
            this.list[0].status = res.data.data.status;
          } else if (res.data.code === "6666") {
            this.$message({
              showClose: true,
              message: "token异常，请重新登录",
              type: "error"
            });
          }else return this.$message.error(res.data.msg)
        });
    },
    edit() {
      this.$router.push({
        name: "distributionEdit"
      });
    },
    modify() {
      if (this.list.status == "1") {
        this.list.status == "0";
      } else if (this.list.status == "0") {
        this.list.status == "1";
      }
      this.$axios
        .post(
          "/warehouse/distribution/status/modify",
          qs.stringify({
            token: sessionStorage.getItem("token")
          })
        )
        .then(res => {
          if (res.data.code === "0000") {
            this.getList();
          }
        });
    }
  },
  filters: {
    statusTip(value) {
      if (value == "1") {
        return "启用";
      } else if (value == "0") {
        return "禁用";
      }
    }
  }
};
</script>
<style scoped>
#distributionList .nav {
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
#distributionList .content {
  background-color: #fff;
  padding: 15px 25px;
}
h4 {
  padding-bottom: 10px;
}
#distributionList .tableLlist {
  width: 100%;
  text-align: center;
}
h3 {
  padding: 20px 0 20px 0px;
}
</style>

