<template>
  <div class="billdetailInfo minWidth1600 minimum">
     <img @click="goback" class="backImg" src="@/assets/images/returnbutton.png" alt />
    <div class="billBox">
      <!-- <div class="detailBackBtn">
        <el-button class="theBtn resetButton" @click="goback">返回</el-button>
      </div> -->
      
       <div class="detailBackBtn">
        <!-- <img src="@/assets/returnbutton.png" @click="goback" alt="" class="codesty"> -->
      </div>
      <div class="billboxTab">
        <!-- <h3 class="billtit">报废单详情</h3> -->
          <el-row class="rowSpacing">
          <el-col :span="6">
            <div>
              创建日期：{{list.createTime|converTime('YYYY-MM-DD')}}
            </div>
          </el-col>
          <el-col :span="6">
            <div>报废单编号：{{list.code}}</div>
          </el-col>
          <el-col :span="6">
            <div>报废状态：{{list.status | statusTip}}</div>
          </el-col>
          <el-col :span="6">
            <div>审核意见：{{list.checkOpinion}}</div>
          </el-col>
        </el-row>
          <el-row>
          <el-col :span="6">
            <div>报废品项数：{{list.item}}</div>
          </el-col>
          <el-col :span="6">
            <div>报废总数：{{list.count}}</div>
          </el-col>
          <el-col :span="6">
            <div>报废总金额：{{list.amount}}</div>
          </el-col>
          <el-col :span="6">
            <div></div>
          </el-col>
        </el-row>
        <table class="deliveTab" v-for="(item,index) in list" :key="index">
          <!-- <tr>
            <td class="rowWith">创建日期：{{item.createTime|converTime('YYYY-MM-DD')}}</td>
            <td class="rowwith">报废单编号：{{item.code}}</td>
            <td class="rowWith">报废状态：{{item.status | statusTip}}</td>
            <td class="rowwith">审核意见：{{item.checkOpinion}}</td>
          </tr>
          <tr>
            <td class="rowWith">报废品项数：{{item.item}}</td>
            <td class="rowwith">报废总数：{{item.count}}</td>
            <td class="rowWith">报废总金额：{{item.amount}}</td>
          </tr> -->
        </table>
      </div>
      <div class="billboxTab">
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column prop="goodsCode" label="货号" align="center"></el-table-column>
          <!-- <el-table-column prop="name" label="品名" align="center"></el-table-column> -->
          <el-table-column prop="salePrice" label="单品售价" align="center"></el-table-column>
          <el-table-column prop="count" label="报废数量" align="center"></el-table-column>
          <el-table-column prop="amount" label="报废总金额" align="center"></el-table-column>
          <!-- <el-table-column prop="spec" label="规格" align="center"></el-table-column> -->
          <!-- <el-table-column prop="unit" label="单位" align="center"></el-table-column> -->
          <!-- <el-table-column label="保质期" align="center">
            <template scope="scope">{{scope.row.period}}{{scope.row.periodUnit}}</template>
          </el-table-column> -->
          <!-- <el-table-column prop="temperature" label="温层" align="center"></el-table-column> -->
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
      tableData: [],
      list: []
    };
  },
  created() {
    this.getScrapDetail();
  },
  methods: {
    getScrapDetail() {
      this.$utils({
        url: this.reqApi.xinls + "/exam/scrap/detail",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          code: sessionStorage.getItem("code"),
          questionCode: sessionStorage.getItem("questionUUid")
        })
      }).then(res => {
        const {
        data:{code,msg,data}
        } = res;
        if (code == "0000") {
          this.list = data.info;
          this.tableData = data.subList;
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
    goback() {
      this.$router.push('/scrapManage');
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
  /* background-color: #f1f6fa; */
  min-height: 647px;
  /* min-width: 1200px; */
  position: relative;
}
.billBox {
  background: #fff;
  padding-top: 45px;
}
.billboxTab {
  margin-left: 30px;
  margin-right: 21px;
  padding-bottom: 30px;
}
.billboxTab .billtit span {
  font-weight: 100;
  font-size: 16px;
}
.deliveTab {
  border-collapse: collapse;
  width: 100%;
  text-align: left;
}
.deliveTab td {
  width: 19%;
  padding-bottom: 15px;
  font-size: 16px;
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
.btnback {
  text-decoration: none;
  width: 80px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  background-color: #fff;
  color: #01c8dc;
  border: 1px solid #01c8dc;
  border-radius: 5px;
  float: right;
  margin-right: 2%;
}
.btnback:hover {
  background-color: #01c8dc;
  color: #fff;
}
.gocou {
  margin-top: 14px;
}
.backImg {
    position: absolute;
    right: 20px;
    top: 0px;
    cursor: pointer;
}
</style>

