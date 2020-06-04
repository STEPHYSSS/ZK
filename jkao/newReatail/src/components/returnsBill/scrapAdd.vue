<template>
  <div class="billManagerment minWidth1600">
    <div class="billMa2">
      <div class="billMaList2">
        <h3 class="addbill">新增报废</h3>
        <table class="tableLlist" border="0" cellspacing="0" cellpadding="0">
          <thead>
            <th style="width:9%">货号</th>
            <th style="width:10%">品名</th>
            <th style="width:5%">单品售价</th>
            <th style="width:8%">报废数量</th>
            <th style="width:5%">报废总金额</th>
            <th style="width:5%">规格</th>
            <th style="width:5%">单位</th>
            <th style="width:5%">保质期</th>
            <th style="width:5%">温层</th>
            <th style="width:10%">报废原因</th>
            <th style="width:5%">操作</th>
          </thead>
          <tbody>
            <tr v-for="(item, index) in tableData" :key="index">
              <td>
                <input
                  class="inputTd"
                  type="text"
                  v-model="item.code"
                  @keydown.enter="searthData(item.code, index)"
                  maxlength="49"              
                />
              </td>
              <td>{{item.name}}</td>
              <td>{{item.salesPrice}}</td>
              <td>
                <input class="inputTd" type="text" v-model="item.count" />
              </td>
              <td>{{item.count*item.salesPrice||0}}</td>
              <td>{{item.spec}}</td>
              <td>{{item.unit}}</td>
              <td>{{item.period}}{{item.periodUnit}}</td>
              <td>{{item.temperature}}</td>
              <td>
                <el-select class="inputSelect" type="text" v-model="item.reason" placeholder="请选择">
                  <el-option
                    v-for="(item,index) in reasonList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </td>
              <td class="codesty" @click="delScrap(index)">删除</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td class="codesty" @click="addRetuen">添加</td>
            </tr>
          </tbody>
        </table>
        <div class="addButt">
          <el-button class="theBtn queryButton" @click="sure">确定</el-button>
          <el-button @click="retuBack" class="theBtn resetButton">返回</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "billManagerment",
  data() {
    return {
      token: sessionStorage.getItem("token"),
      ruleForm: [
        {
          code: "",
          count: "",
          reason: ""
        }
      ],
      tableData: [],
      reasonList: [
        {
          value: "货品包装破损",
          label: "货品包装破损"
        },
        {
          value: "商品品质问题",
          label: "商品品质问题"
        },
        {
          value: "商品过期或临期",
          label: "商品过期或临期"
        },
        {
          value: "其它不可抗力因素",
          label: "其它不可抗力因素"
        }
      ]
    };
  },
  methods: {
    addRetuen() {
      this.tableData.push({
        code: "",
        unit: "",
        name: "",
        spec: "",
        temperature: "",
        salesPrice: "",
        period: ""
      });
    },
    // 输入货号回车事件
    searthData(code, index) {
      let that = this;
      let token = sessionStorage.getItem("token");
      // if(token){
      that
        .$axios({
          url: window.apiStore + "getgoods/info",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            token: token,
            code: code
          })
        })
        .then(res => {
          if (res.data.code == "0000") {
            that.tableData[index] = res.data.data;
            this.$set(this.tableData, index, res.data.data);
          }else if(res.data.code === "1000") {
            return this.$message.error("商品货号错误，请重新输入")
          }else {
            this.$message.error(res.data.msg);
          }
        });
    },
    // 删除
    delScrap(index) {
      this.tableData.splice(index, 1);
    },
    // 确定
    sure() {
      let that = this;
      const aaa = this.tableData.map(item => {
        return {
          code: item.code,
          count: item.count,
          reason: item.reason
        };
      });
      if (aaa == "") {
        this.$message("请添加报废信息");
        return;
      }
      aaa.forEach(item => {
        if (item.count == null) {
          this.$message("请添加报废数量");
        } else if (item.reason == null) {
          this.$message("请添加报废原因");
        } else {
          let token = sessionStorage.getItem("token");
          that
            .$axios({
              url: window.apiStore + "scrap/add",
              method: "POST",
              headers: { "content-type": "application/x-www-form-urlencoded" },
              data: qs.stringify({
                token: token,
                json: JSON.stringify(aaa)
              })
            })
            .then(res => {
              if (res.data.code == "0000") {
                that.$router.push({ name: "scrapManage" });
              } else if (res.data.code == "6666") {
                this.$message({
                  showClose: true,
                  message: "token异常，请重新登录",
                  type: "error"
                });                
              } else if(res.data.code === "3010") {
                  return this.$message.error("商品货号错误，请重新输入")
              }else {
                this.$message.error(res.data.msg);
              }
            })
        }
      });
    },
    // 返回
    retuBack() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.billManagerment {
  /* background-color: #f1f6fa; */
  min-height: 647px;
  min-width: 1200px;
}
.billMa2 {
  margin: 0px auto;
  background: #fff;
  border-radius: 10px;
  min-height: 170px;
}
.addbill {
  padding: 0;
  margin: 20px 0;
}
.billMaList {
  padding-left: 35px;
  padding-right: 30px;
}
.billMaList2 {
  box-sizing: border-box;
  padding: 20px 30px 50px 35px;
}
.addButt {
  height: 50px;
  text-align: center;
  margin-top: 15px;
}

.pagination {
  float: right;
  margin-top: 30px;
  margin-bottom: 30px;
}
.inputStyle {
  /* width: 53px;  */
  width: 36%;
  height: 25px;
  border-radius: 5px;
  outline: 0;
  border: 1px solid #dbe0e5;
}
.inputStyle:focus {
  border-color: #444;
}

/* new */
.tableLlist {
  width: 100%;
  text-align: center;
}
.tableLlist th {
  background: #fff;
  color: #444;
  font-weight: 700;
  padding-left: 10px;
  padding-right: 10px;
  line-height: 23px;
  border: none;
  padding: 12px 0;
  text-align: center;
  border: 1px solid #dbe0e5;
  border-top: 1px solid #444;
}
.tableLlist tr {
  border-left: 1px solid #dbe0e5;
  border-right: 1px solid #dbe0e5;
}
table {
  border-collapse: collapse;
  font-size: 12px;
  /* font: 12px/25px '微软雅黑' '\5FAE\8F6F\96C5\9ED1', Arial, Helvetica, sans-serif;
  font-size: 14px;
  color: #444; */
}
.tableLlist tbody td {
  padding-left: 10px;
  padding-right: 10px;
  line-height: 23px;
  padding: 8px 0;
  text-align: center;
  font-size: 12px;
  color: #444;
  border: 1px solid #dbe0e5;
}
.tableLlist tbody tr:hover,
.tableLlist tbody tr:focus {
  background-color: #f0f3f5;
}
.inputTd {
  outline: none;
  border: 1px solid #dbe0e5;
  width: 80%;
  height: 28px;
  border-radius: 8px;
  line-height: 28px;
  /* padding-left: 16px; */
  text-align: center;
  box-sizing: content-box;
  color: #444;
}
.inputSelect {
  width: 80%;
  height: 32px;
}
</style>
