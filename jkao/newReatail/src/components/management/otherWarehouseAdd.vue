<template>
    <div id="otherWarehouseAdd" class="minWidth1600 minimum">
     
    <div class="content">
      <h3>仓库名称：{{WareName}}</h3>
      <table class="tableLlist" border="0" cellspacing="0" cellpadding="0" >
        <thead>
          <tr>
            <th style="width:14%">货号</th>
            <th style="width:16%">品名</th>
            <th style="width:10%">单品售价</th>
            <th style="width:10%">入库数量</th>
            <th style="width:10%">规格</th>
            <th style="width:10%">单位</th>
            <th style="width:10%">保质期</th>
            <th style="width:10%">温层</th>
            <th style="width:10%">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in tableData" :key="index">
            <td style="width:14%">
                <input class="inputStyle" type="text" v-model="item.code" @keydown.enter="getGoodsList(item.code, index)" onkeyup="this.value=this.value.replace(/\D/g,'')">
            </td>
            <td style="width:16%">{{item.name}}</td>
            <td style="width:10%">{{item.salesPrice}}</td>
            <td style="width:10%">
                 <input class="inputStyle" type="text" v-model="item.count" onkeyup="this.value=this.value.replace(/\D/g,'')">
            </td>
            <td style="width:10%">{{item.spec}}</td>
            <td style="width:10%">{{item.unit}}</td>
            <td style="width:10%">{{item.period}}</td>
            <td style="width:10%">{{item.temperature}}</td>
            <td style="width:10%" class="codesty" @click="del(item.code,index)">删除</td>
           
          </tr>
            <tr>
            <td style="width:14%"></td>
            <td style="width:16%"></td>
            <td style="width:10%"></td>
            <td style="width:10%"></td>
            <td style="width:10%"></td>
            <td style="width:10%"></td>
            <td style="width:10%"></td>
            <td style="width:10%"></td>
            <td style="width:10%" @click="addRow" class="codesty">添加</td>
          </tr>
        </tbody>
      </table>
      <div class="billsearch">
        <el-button @click="submit" class="theBtn queryButton">保存</el-button>
        <el-button class="theBtn resetButton" @click="returnPage">返回</el-button>
      </div>
    </div>
    </div>
</template>
<script>
import qs from "qs";
export default {
  data() {
    return {
      tableData: [],
      goodsSet: [],
      token: sessionStorage.getItem("token"),
      warehouseCode: this.$route.query.code,
      WareName:this.$route.query.WareName,
    };
  },
  methods: {
    del(code, index) {
      this.tableData.splice(index, 1);
    },
    addRow() {
      this.tableData.push({
        code: "",
        unit: "",
        name: "",
        spec: "",
        temperature: "",
        salesPrice: "",
        period: "",
        count: ""
      });
    },
    submit() {
      this.goodsSet = this.tableData.map(item => {
        return {
          goodsCode: item.code,
          count: item.count
        };
      });
      if (this.goodsSet.length > 0) {
        for (const i of this.goodsSet) {
          if (!i.count && !i.goodsCode) {
            return this.$message.error("请选择商品！！");
          } else if (!i.count) {
            return this.$message.error("请输入入库数量！！");
          }
        }
        this.$axios
          .post(
            "/warehouse/other/in/add",
            qs.stringify({
              token: this.token,
              warehouseCode: this.warehouseCode,
              goodsSet: JSON.stringify(this.goodsSet)
            })
          )
          .then(res => {
            if (res.data.code === "0000") {
              this.$router.push({
                name: "otherWarehouseList"
              });
            } else if (res.data.code === "6666") {
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
      } else {
        return this.$message.error("请选择商品！！！");
      }
    },
    returnPage() {
      this.$router.push({
        name: "otherWarehouseList"
      });
    },
    getGoodsList(code, index) {
      this.$axios
        .post(
          "/public/goods/info",
          qs.stringify({
            goodsCode: code
          })
        )
        .then(res => {
          if (res.data.code === "0000") {
            this.tableData[index] = res.data.data;
            this.$set(this.tableData, index, res.data.data);
          } else {
            this.$message.error(res.data.msg);
          }
        });
    }
  }
};
</script>
<style scoped>
#otherWarehouseAdd {
  min-height: 647px;
  min-width: 1200px;
}
#otherWarehouseAdd .nav {
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
#otherWarehouseAdd .content {
  background-color: #fff;
  padding: 15px 25px;
}
#otherWarehouseAdd h4 {
  padding-bottom: 10px;
}
#otherWarehouseAdd .tableLlist {
  width: 100%;
  text-align: center;
}
#otherWarehouseAdd .tableLlist th {
  background: #fff;
  color: #444;
  font-weight: 200;
  padding-left: 10px;
  padding-right: 10px;
  line-height: 23px;
  border: none;
  padding: 12px 0;
  text-align: center;
  border: 1px solid #dbe0e5;
  border-top: 1px solid #444;
}
#otherWarehouseAdd .tableLlist tr {
  border-left: 1px solid #dbe0e5;
  border-right: 1px solid #dbe0e5;
}
table {
  border-collapse: collapse;
}
.tableLlist tbody td {
  font-weight: 200;
  padding-left: 10px;
  padding-right: 10px;
  line-height: 23px;
  padding: 8px 0;
  text-align: center;
  font-size: 14px;
  color: #606266;
  border: 1px solid #dbe0e5;
}
#otherWarehouseAdd .tableLlist tbody td input {
  width: 60%;
}
#otherWarehouseAdd #codesty {
  color: #01c8df;
  cursor: pointer;
}
#otherWarehouseAdd .submit {
  background-color: #01c8dc;
  color: #fff;
}
#otherWarehouseAdd .billsearch {
  text-align: center;
}
h3 {
  padding: 20px 0 20px 0px;
}
</style>
