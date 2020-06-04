<template>
  <div class="shelev minWidth1600">
    <div class="rece_Box">
      <div class="flexBox">
         <div class="addStore">
           <router-link to="/reservoirArea">
             <el-button class="">返回</el-button>
           </router-link>
        <!-- <img src="@/assets/returnbutton.png" alt="" class="codesty" @click="fanhui"> -->
      </div>
        <!-- <div class="increaseBox">
          <h3 class="demonstration">货架管理</h3>
          <div class="addBtnBox">
            <div class="anniu">
              <el-button class="increase themeColor" @click="addHuojia">
                <i class="el-icon-plus"></i>新增
              </el-button>
            </div>

          </div>
        </div> -->
         <div class="addStore">
                    <span class="titleText">库区设置</span>
                        <el-button class="increase themeColor" @click="addHuojia">
                            <i class="el-icon-plus"></i>新增
                        </el-button>
                </div>
      </div>
      <div class="flexBoxContent">
        <el-table :data="tableData" height="550px" border max-height="550px">
          <el-table-column prop="item" label="库区编号" align="center"></el-table-column>
          <el-table-column prop="layerNum" label="货层数量" align="center"></el-table-column>
          <el-table-column prop="locationNum" label="每层货位数量" align="center"></el-table-column>
          <el-table-column prop="locationVolume" label="单个货位容积" align="center"></el-table-column>
          <el-table-column label="商品编号" align="center">
            <template slot-scope="scope">
             <span v-if="scope.row.goodsCode !=null">{{scope.row.goodsCode}}</span> 
              <!-- <span v-if="scope.row.goodsCode !=null">是</span>
              <span v-else>否</span> -->
            </template>
          </el-table-column>
          <el-table-column label="创建时间" align="center">
            <template slot-scope="scope">
              <span
                v-if="scope.row.updateTime !=null"
              >{{scope.row.updateTime | converTime('YYYY-MM-DD')}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 新增 -->
    <el-dialog title="提示：库区货架数量限值为99" :visible.sync="dialogFormVisible" width="950px">
      <el-form :model="ruleForm" label-width="110px" ref="ruleForm">
        <el-form-item label="新增数量">
          <p class="kuquname">
            <el-input
              v-model="ruleForm.count"
              auto-complete="off"
              oninput="value=value.replace(/[^\d]/g,'')"
            ></el-input>
          </p>
        </el-form-item>
      </el-form>
      <div class="btnCent">
        <el-button class="themeColor theBtn textMright" @click="isSure">确定</el-button>
        <el-button class="theBtn resetButton" @click="retuanB">返 回</el-button>
      </div>
    </el-dialog>
    <!-- </div> -->
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "shelev",
  data() {
    return {
      tableData: [],
      ruleForm: {
        count: ""
      },
      dialogFormVisible: false
    };
  },
  created() {
    this.getShelves();
  },
  methods: {
    getShelves() {
      this.$utils.post(this.reqApi.xinls+'/exam/region/shelves/list',qs.stringify({
        questionCode:sessionStorage.getItem("questionUUid"),
        regionId:this.$route.query.id
      })).then(res=>{
         if (res.data.code == "0000") {
          this.tableData = res.data.data;
        }
      })
      return
      this.$axios({
        url: window.apiWare + "shelves/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: sessionStorage.getItem("token"),
          regionId: sessionStorage.getItem("shelvId")
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.tableData = res.data.data;
        }
      });
    },
    addHuojia() {
      this.dialogFormVisible = true;
    },
    isSure() {
      this.$utils.post(this.reqApi.xinls+'/exam/region/shelves/add',qs.stringify({
        regionId:this.$route.query.id,
        questionCode:sessionStorage.getItem("questionUUid"),
        count:this.ruleForm.count
      })).then(res=>{
        if(res.data.code==='0000'){
          this.dialogFormVisible = false
          this.$message.success('提交成功！')
          this.getShelves();
        }else {
          this.$message.error(res.data.msg)
        }
      })
      return
      this.$axios({
        url: window.apiWare + "shelves/add",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: sessionStorage.getItem("token"),
          regionId: sessionStorage.getItem("shelvId"),
          count: this.ruleForm.count
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.$message({
            type: "success",
            message: "新增成功"
          });
          this.dialogFormVisible = false;
          this.getShelves();
        } else if (res.data.code == "6666") {
          this.$message({
            showClose: true,
            message: "token异常，请重新登录",
            type: "error"
          });
          const timer = setTimeout(() => {
            clearTimeout(timer);
            this.$router.push({ name: "login" });
          }, 3000);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    retuanB() {
      this.dialogFormVisible = false;
      this.getShelves();
    },
    fanhui() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.shelev {
  background-color: #fff;
  min-height: 647px;
  box-sizing: border-box;

}
.areaBox,
.areainfo {
  background: #fff;
}
.shelev .rece_Box {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.flexBox {
  /* height: 120px; */
  padding-top: 15px;
}
.flexBoxContent {
  flex: 1;
  -webkit-box-flex: 1;
  margin-bottom: 20px;
  width: calc(100% - 40px);
}
.shelev .nav {
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
.shelev .demonstration {
  display: inline-block;
}
.areainfo {
  margin-top: 15px;
  height: 100%;
}
.wsListsearch {
  position: absolute;
  display: inline-block;
  top: 20px;
  right: 0;
}
.kuquname {
  width: 90%;
  display: inline-block;
}
.btnCent {
  text-align: center;
  padding: 20px 0;
}
.areainfo .el-dialog {
  width: 500px;
}
.anniu{
  padding-top: 15px;
}
.titleText {
    display: inline-block;
    float: left;
    font-size: 14px;
    font-weight: 700;
}
.addStore {
    text-align: right;
    margin-bottom: 20px;
}
</style>


