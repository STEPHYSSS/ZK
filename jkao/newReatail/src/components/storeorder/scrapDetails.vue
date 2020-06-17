<template>
  <div class="billdetailInfo">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
      <el-breadcrumb-item :to="{ path: '/operatIndex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>门店单据管理</el-breadcrumb-item>
      <el-breadcrumb-item>报废单详情</el-breadcrumb-item>
    </el-breadcrumb> -->
    <h3 class="store_tit">报废单详情</h3>
    <router-link :to="{ path: '/scrapForm' }" class="SBtnBack">
      <img src="@/assets/Rbutton.png">
    </router-link>
    <div class="billBox">
      <div class="billboxTab">
        <table class="deliveTab" v-for="(item,index) in list" :key="index">
          <tr>
            <td class="rowWith">创建日期：{{item.createTime|converTime('YYYY-MM-DD')}}</td>
            <td class="rowwith">报废单编号：{{item.code}}</td>
            <td class="rowWith">门店：{{item.name}}</td>
            <td class="rowwith">报废状态：{{item.status |statusTip }}</td>
            <!-- (对应的是后台的123代码 1待审核2 审核通过 3 审核不通过) -->
          </tr>
          <tr>
            <td class="rowWith">报废品项数：{{item.item}}</td>
            <td class="rowwith">报废总数：{{item.count}}</td>
            <td class="rowWith">报废总金额：{{item.amount}}</td>
            <td class="rowWith" v-if="item.checkOpinion">审核意见：{{item.checkOpinion}}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
             <div class="btn-1">
            <el-button 
            type="text" class="informationBtn btn" 
            @click="centerDialogVisible = true" 
            v-if="item.status==1"
            >审核</el-button>

            <!-- <button class="informationBtn btn" @click="audit(ruleForm.code)">审核</button> -->
          </div>
          </tr>
         
         <div class="fixationCenter">
              <el-dialog
            title="审核"
            :visible.sync="centerDialogVisible"
            width="360px"
            center
            style="position:rrelative"           
          >
            <div slot="title" class="auditBtn">
              <span class="el-icon-info"></span>
              <span class="auditBtn-1">审核</span>
            </div>

            <div class="title">
              <textarea rows="1" :placeholder="content" class="inputBox" v-model="ruleForm.checkOpinion"></textarea>
              <br>
              <el-radio v-model="ruleForm.status" label="2">通过</el-radio>
              <el-radio v-model="ruleForm.status" label="3">不通过</el-radio>
            </div>

            <span slot="footer" class="dialog-footer">
              <el-button type="primary" class="AllquedingBtn" @click="SubmitAduit">确定</el-button>
              <el-button @click="centerDialogVisible = false">取 消</el-button>
            </span>
          </el-dialog>
         </div>
        </table>
      </div>
      <div class="billboxTab">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="goodsCode" label="货号" align="center"></el-table-column>
          <el-table-column prop="name" label="品名" align="center"></el-table-column>
          <el-table-column prop="salePrice" label="单品售价" align="center"></el-table-column>
          <el-table-column prop="count" label="报废数量" align="center"></el-table-column>
          <el-table-column prop="amount" label="报废总金额" align="center"></el-table-column>
          <el-table-column prop="spec" label="规格" align="center"></el-table-column>
          <el-table-column prop="unit" label="单位" align="center"></el-table-column>
          <el-table-column label="保质期" align="center">
            <template scope="scope">{{scope.row.period}}{{scope.row.periodUnit}}</template>
          </el-table-column>
          <el-table-column prop="temperature" label="温层" align="center"></el-table-column>
          <el-table-column prop="reason" label="报废原因" align="center"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "billdetailInfo",
  data() {
    return {
      content: "意见必填，限20个字",
       radio: '3',
      centerDialogVisible: false,
      tableData: [],
      list: [],
      ruleForm: {
        token: sessionStorage.getItem("token"),
        code: sessionStorage.getItem("code"),
        checkOpinion:'',
        status:'2'
      },// status:'2'
      flag: true
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    //获取详情
    getlist() {
      this.$axios
        .post("/sys/scrap/detail", qs.stringify(this.ruleForm))
        .then(res => {
          if (res.data.code === "0000") {
            this.list = res.data.data.list;
            this.tableData = res.data.data.subList;
          }else if(res.data.code==='6666') {
              this.$message({
                    showClose: true,
                    message: 'token异常，请重新登录',
                    type: 'error'
                    });
                    const timer = setTimeout(() => {
                    clearTimeout(timer)
                    this.$router.push({name: "login"})
                }, 3000)
            }
        });
    },
    //  订单审核
    SubmitAduit(){
        this.centerDialogVisible=false
        this.$axios.post('/sys/scrap/check',qs.stringify(this.ruleForm)).then(res=>{
            if(res.data.code==='0000'){
              this.centerDialogVisible=false
              this.$route.push({
                name:'scrapForm'
              })
                
            }else{
                this.$message.error(res.data.msg)
            }
        })
    }
  },
  filters: {
    statusTip(value) {
      if (value == "1") {
        return "待审核";
      } else if (value == "2") {
        return "审核通过";
      } else if (value == "3") {
        return "审核不通过";
      }
    }
  }
};
</script>
<style scoped>
.billdetailInfo {
  background-color: #ffffff;
  min-height: 647px;
  min-width: 1700px;
  height: 100%;
  box-shadow: 0 2px 10px #ccc;
}
.billBox {
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
}
.billboxTab {
  margin-left: 20px;
  margin-right: 20px;
  padding-bottom: 30px;
}
.billboxTab .billtit {
  padding-top: 20px;
}
.billboxTab .billtit span {
  font-weight: 100;
  font-size: 16px;
}
.deliveTab {
  position: relative;
  border-collapse: collapse;
  width: 100%;
  text-align: left;
}
.deliveTab td {
  width: 25%;
  font-size: 12px;
}
.deliveTab tr {
  width: 100%;
}
.deliveTab .rowwith {
  width: 30%;
}
/* 返回 */
.nav {
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
.SBtnBack {
  text-decoration: none;
    float: right;
    margin-right: 20px;
    cursor: pointer;
    margin-top: 13px;
}
.btn {
  margin: 0px;
}
.inputBox {
  height: 70px;
  width: 300px;
  margin-bottom: 10px;
  resize: none;
  outline: none;
  line-height: 70px;
}
.title {
  text-align: center;
  margin-top: 20px;
}
.fixationCenter {
    width: 360px;
}
.el-dialog__header {
  padding-top: 20px;
  border-bottom: 1px solid #01c8dc;
}
.auditBtn {
  position: absolute;
  left: 0;
  top: -1px;
  padding-top: 20px;
  border-bottom: 3px solid #01c8dc;
  width: 100%;
  text-align: left;
  padding-left: 14px;
  box-sizing: border-box;
}
.el-icon-info {
  color: #ffab5a;
  font-size: 25px;
}
.auditBtn-1 {
  font-size: 16px;
  margin-left: 5px;
  vertical-align: top;
}
.btn-1 {
  text-align: right;
}
.store_tit{
  margin-left: 20px;
}
</style>


