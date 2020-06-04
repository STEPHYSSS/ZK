<template>
  <div class="dingdanchaxun" id="storeID">
    <div class="dingdanRece">
      <div class="dingdanflexBox">
        <!-- 查询框部分 -->
        <p class="store_tit">门店管理</p>
        <el-row style="white-space: nowrap;">
          <el-col :span="6">
            <span>
              城
              <em class="emstyle"></em>市：
            </span>
            <p class="widOne">
              <el-select v-model="inProvince" placeholder="请选择" @change="chooseProvince">
                <el-option
                  v-for="item in province"
                  :key="item.value"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </p>
            <p class="widOne">
              <el-select v-model="inCity" placeholder="请选择" @change="chooseCity">
                <el-option
                  v-for="item in city"
                  :key="item.value"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </p>
            <p class="widOne">
              <el-select v-model="inArea" placeholder="请选择" @change="chooseArea">
                <el-option
                  v-for="item in area"
                  :key="item.value"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </p>
          </el-col>
          <el-col :span="6" class="TongCenter">
            <span>门店类型：</span>
            <p>
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in storeType"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </p>
          </el-col>
          <el-col :span="6" class="TongCenter">
            <span>状态：</span>
            <p>
              <el-select v-model="value2" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </p>
          </el-col>
          <el-col :span="6" class="TongRight">
            <span>门店名称：</span>
            <p>
              <el-input type="text" placeholder="请输入" v-model="shopName" />
            </p>
          </el-col>
        </el-row>
        <div class="konge"></div>
        <el-row>
          <el-col :span="6">
            <span>门店编号：</span>
            <p>
              <el-input type="text" placeholder="请输入" v-model="shopNum" />
            </p>
          </el-col>
          <el-col :span="18" class="TongRight">
            <el-button class="theBtn queryButton" @click="checkInfo">查询</el-button>
            <el-button class="theBtn resetButton" @click="reset">重置</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="dingdanMain">
        <div class="addStore">
          <router-link to="/addStore">
            <!-- <img src="@/assets/addBtn.png" /> -->
            <el-button class="increase themeColor">
                <i class="el-icon-plus"></i>新增
              </el-button>
          </router-link>
        </div>
        <el-table :data="storeList" style="width: 100%;" border height="100%">
          <el-table-column prop="code" label="门店编号" align="center"></el-table-column>
          <el-table-column prop="name" label="门店名称" align="center"></el-table-column>
          <el-table-column label="所在区域" align="center">
            <template scope="scope">{{scope.row.province}}-{{scope.row.city}}-{{scope.row.area}}</template>
          </el-table-column>
          <el-table-column prop="address" label="详细地址" align="center" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="开店时间" align="center">
            <template scope="scope">
              <span>{{scope.row.openTime | converTime('YYYY-MM-DD')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="停业时间" align="center">
            <template scope="scope">
              <span
                v-if="scope.row.shutdownTime!=null"
              >{{scope.row.shutdownTime | converTime('YYYY-MM-DD')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center">
            <template scope="scope">
              <span v-if="scope.row.status =='1'">待开业</span>
              <span v-else-if="scope.row.status =='2'">营业中</span>
              <span v-else-if="scope.row.status =='0'">已停业</span>
            </template>
          </el-table-column>
          <el-table-column prop="contactsName" label="联系人" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template scope="scope">
              <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
                <img
                  src="@/assets/entering_icon.png"
                  @click="handleEdit(scope.row.code)"
                  class="imgSize"
                />
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="重置密码" placement="bottom">
                <img
                  src="@/assets/resetpasswords_icon.png"
                  @click="open(scope.row.code)"
                  class="imgSize"
                />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <div class="paginStyle fenyedignwei">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[20,40,60]"
            :page-size="pageSize"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            class="pagination"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "store",
  data() {
    return {
      storeList: [], //门店列表
      inProvince: "", // 省
      inCity: "", // 市
      inArea: "", // 区
      province: [], //下拉遍历省
      city: [], //下拉遍历市
      area: [], //下拉遍历区
      value: "", //门店类型展示
      value2: "", //门店状态展示
      options: [
        {
          value: "1",
          label: "待开业"
        },
        {
          value: "2",
          label: "营业中"
        },
        {
          value: "0",
          label: "已停业"
        }
      ],
      storeType: [], //门店类型
      shopName: "", //门店名称
      shopNum: "", //门店编号
      // 分页数据
      pageNum: 1,
      pageSize: 20,
      total: 0
    };
  },
  mounted() {
    // 进入页面就执行城市列表
    let that = this;
    that.$axios
      .post(`${window.apiUrl}city/list`)
      .then(res => {
        if (res.data.code == "0000") {
          that.province = res.data.data;
        }
      })
      .catch(err => {
        console.log("数据异常", err);
      });
  },
  created() {
    this.enter(this.pageNum, this.pageSize);
    this.showother();
  },
  methods: {
    // 进入调用接口
    enter(pageNum, pageSize) {
      const _this = this;
      let token = sessionStorage.getItem("token");
      _this
        .$axios({
          url: window.apiUrl + "store/list",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            token: token,
            pageNum: _this.pageNum,
            pageSize: _this.pageSize,
            province: _this.inProvince,
            city: _this.inCity,
            area: _this.inArea,
            type: _this.value,
            status: _this.value2,
            name: _this.shopName,
            code: _this.shopNum
          })
        })
        .then(res => {
          if (res.data.code == "0000") {
            _this.storeList = res.data.data.list;
            _this.total = res.data.data.total;
          } else if (res.data.code == "6666") {
            _this.$message({
              showClose: true,
              message: "token异常，请重新登录",
              type: "error"
            });
            const timer = setTimeout(() => {
              clearTimeout(timer);
              _this.$router.push({ name: "login" });
            }, 3000);
          } else {
            _this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log("数据异常", err);
        });
    },
    // 门店类型
    showother() {
      let _this = this;
      let token = sessionStorage.getItem("token");
      let code = "store_type_select";
      _this
        .$axios({
          url: window.apiUrl + "dictionary/list",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            token: token,
            code: code
          })
        })
        .then(res => {
          if ((res.data.code = "0000")) {
            _this.storeType = res.data.data;
          }
        })
        .catch(err => {
          console.log("数据异常", err);
        });
    },
    // 城市列表
    chooseProvince(value) {
      let aaa = "";
      for (const key in this.province) {
        if (this.province[key].name == value) aaa = this.province[key].id;
      }
      this.inCity = "";
      this.inArea = "";
      this.area = [];
      this.$axios({
        url: window.apiUrl + "city/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          pid: aaa
        })
      })
        .then(res => {
          if (res.data.code == "0000") {
            this.city = res.data.data;
          }
        })
        .catch(err => {
          console.log("数据异常", err);
        });
    },
    // 市下拉change事件
    chooseCity(value) {
      let aaa = "";
      for (const key in this.city) {
        if (this.city[key].name == value) aaa = this.city[key].id;
      }
      this.inArea = "";
      this.$axios({
        url: window.apiUrl + "city/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          pid: aaa
        })
      })
        .then(res => {
          if (res.data.code == "0000") {
            this.area = res.data.data;
          }
        })
        .catch(err => {
          console.log("数据异常", err);
        });
    },
    chooseArea(value) {
      let aaa = "";
      for (const key in this.area) {
        if (this.area[key].id == value) this.inArea = this.area[key].name;
      }
    },
    // 重置 查询
    checkInfo() {
      this.enter();
    },
    reset() {
      this.inProvince = "";
      this.inCity = "";
      this.inArea = "";
      this.value = "";
      this.value2 = "";
      this.shopName = "";
      this.shopNum = "";
      this.enter();
    },
    // 重置密码
    open(code) {
      this.$confirm("确定将门店登陆密码重置为123456？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "设置成功!"
          });
          let token = sessionStorage.getItem("token");
          let formData = new FormData();
          formData.append("token", token);
          formData.append("code", code);
          this.$axios
            .post(`${window.apiUrl}store/password/reset`, formData)
            .then(res => {})
            .catch(err => {
              console.log("数据异常", err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消重置"
          });
        });
    },
    // 编辑
    handleEdit(code) {
      this.$router.push({
        name: "editStore",
        query: {
          code
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.enter(this.pageNum, val);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.enter(val, this.pageSize);
    }
  }
};
</script>
<style scoped>
.dingdanchaxun {
  background-color: #fff;
  min-height: 647px;
  min-width: 1700px;
  height: 100%;
  box-sizing: border-box;
}
.dingdanchaxun .dingdanRece {
  font-size: 12px;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.dingdanflexBox {
  height: 200px;
  margin: 0 20px;
  box-sizing: border-box;
}
.dingdanMain {
  flex: 1;
  max-height: 600px;
  -webkit-box-flex: 1;
  position: relative;
  margin-bottom: 90px;
}
.fenyedignwei {
  position: absolute;
  bottom: -90px;
  right: 0;
}
p {
  width: 300px;
  display: inline-block;
}
.widOne {
  width: 93.3px;
}
.widOne:nth-child(3) {
  margin: 0 10px;
}
.TongRight .el-button {
  padding: 0;
}
.emstyle {
  display: inline-block;
  width: 20px;
}
.addStore {
  /* padding-right: 20px; */
}
#storeID .el-range-editor.el-input__inner {
  width: 100%;
}
#storeID .el-select{
  width: 100%;
}
</style>
