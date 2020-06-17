<template>
  <div class="transferAdd minWidth1600">
    <div class="billMa2">
      <div class="billMaList2">
        <h3>转入门店：{{this.Zname}}</h3>
        <div class="kong"></div>
        <table class="tableLlist" border="0" cellspacing="0" cellpadding="0">
          <thead>
            <th style="width:12%">货号</th>
            <th style="width:10%">品名</th>
            <th style="width:10%">单品售价</th>
            <th style="width:10%">转出数量</th>
            <th style="width:10%">转出总金额</th>
            <th style="width:10%">规格</th>
            <th style="width:10%">单位</th>
            <th style="width:10%">保质期</th>
            <th style="width:10%">温层</th>
            <th>操作</th>
          </thead>
          <tbody>
            <tr v-for="(item, index) in tableData" :key="index">
              <td>
                <input
                  class="inputTd"
                  type="text"
                  v-model="item.code"
                  @focus="changeDalog"
                  maxlength="49"
                />
              </td>
              <td>{{item.name}}</td>
              <td>{{item.salesPrice}}</td>
              <td>
                <input class="inputTd" type="text" v-model="item.count" />
              </td>
              <td>{{item.count * item.salesPrice || ''}}</td>
              <td>{{item.spec}}</td>
              <td>{{item.unit}}</td>
              <td v-if="item.periodUnit =='永久'">{{item.periodUnit}}</td>
              <td v-else>{{item.period}}{{item.periodUnit}}</td>
              <td>{{item.temperature}}</td>
              <td class="codesty" @click="delRetuen(index)">删除</td>
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
              <td class="codesty" @click="addRetuen">添加</td>
            </tr>
          </tbody>
        </table>
        <div class="konge"></div>
        <div class="addButt">
          <el-button class="theBtn queryButton" @click="sure">确定</el-button>
          <el-button class="theBtn resetButton" @click="retuBack">返回</el-button>
        </div>
        <!-- 选择商品弹窗 -->
        <el-dialog title="选择商品" :visible.sync="dialogVisible2" width="800px">
          <div class="choosestore">
            <p class="goodsInputBox">品<em class="zanweiN"></em>名：<el-input v-model="goodsName" placeholder="请输入商品名称"></el-input></p>
            <div class="chooseBox2">
              <el-table
                ref="multipleTable"
                :data="optionsGoods"
                tooltip-effect="dark"
                style="width: 100%"
                border
                @selection-change="handleSelectionChange2"
                @select-all="selectAll"
                :row-key="getGoodsCode"
                max-height="244"
              >
                <el-table-column
                  type="selection"
                  width="55"
                  align="center"
                  :reserve-selection="true"
                ></el-table-column>
                <el-table-column prop="code" label="货号" align="center"></el-table-column>
                <el-table-column prop="name" label="品名" align="center"></el-table-column>
                <el-table-column prop="unit" label="单位" align="center"></el-table-column>
                <el-table-column prop="spec" label="规格" align="center"></el-table-column>
                <el-table-column prop="temperature" label="温层" align="center"></el-table-column>
              </el-table>
              <div class="pageFenye">
                <div class="PromotBtn">
                  <el-button class="AllquedingBtn" @click="isSureGoods">确定</el-button>
                  <el-button class="theBtn resetButton" @click="dialogVisible2 = false">取消</el-button>
                </div>
              </div>
            </div>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "transferAdd",
  data() {
    return {
      token: sessionStorage.getItem("token"),
      tableData: [],
      Zname: sessionStorage.getItem("name"),
      Zcode: sessionStorage.getItem("code"),
      dialogVisible2: false,
      optionsGoods: [], //商品列表
      multipleSelection2: [],
      goodsName:''
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
    handleSelectionChange2(val) {
      this.multipleSelection2 = val;
    },
    // 多选
    selectAll(selection) {
      this.multipleSelection2 = selection;
    },
    getGoodsCode(row) {
    return row.code;
    },
    showAreaGoods(pageNum, pageSize) {
      this.$axios({
        url: "/public/goods/list",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          token: sessionStorage.getItem("token"),
          goodsName: this.goodsName,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
      }).then(res => {
        if (res.data.code == "0000") {
          this.optionsGoods = res.data.data.list;
          this.total = res.data.data.total;
          if(this.$refs.multipleTable){
            this.optionsGoods.forEach((item,index)=>{
              this.tableData.forEach((i,index2)=>{
                if(item.code==i.code){
                  item.flag=true
                   this.$nextTick(() => {
                      this.$refs.multipleTable.toggleRowSelection(
                        this.optionsGoods[index],
                        true
                      );
                    });
                }
              })
            })
          }
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
      // 弹窗点击确定
    isSureGoods() {
      if (this.multipleSelection2 == "")
        return this.$message.error("请选择商品信息");
      this.tableData = this.multipleSelection2;
      this.dialogVisible2 = false;
      this.hideG = true;
    },
    changeDalog(){
      this.dialogVisible2 = true;
      this.showAreaGoods()
    },
    // 输入货号回车事件
    transferData(code, index) {
      // let that = this;
      // let token = sessionStorage.getItem("token");
      // that
      //   .$axios({
      //     url: window.apiStore + "getgoods/info",
      //     method: "POST",
      //     headers: { "content-type": "application/x-www-form-urlencoded" },
      //     data: qs.stringify({
      //       token: token,
      //       code: code
      //     })
      //   })
      //   .then(res => {
      //     if (res.data.code == "0000") {
      //       that.tableData[index] = res.data.data;
      //       this.$set(this.tableData, index, res.data.data);
      //     }else if(res.data.code === "1000") {
      //       return this.$message.error("商品货号错误，请重新输入")
      //     }else {
      //       this.$message.error(res.data.msg);
      //     }
      //   })
    },
    // 删除
    delRetuen(index) {
      this.tableData.splice(index, 1);
    },
    // 确定
    sure() {
      let that = this;
      const aaa = this.tableData.map(item => {
        return {
          code: item.code,
          count: item.count
          // "reason": item.reason,
        };
      });
       if(aaa.length > 0) {
        for (const i of aaa) {
          if (!i.count) {
            return this.$message.error("请添加数量!");
          }
        }
        that
        .$axios({
          url: window.apiStore + "transfer/add",
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify({
            token: sessionStorage.getItem("token"),
            json: JSON.stringify(aaa),
            storeCodeIn: this.Zcode
          })
        })
        .then(res => {
          if (res.data.code == "0000") {
            that.$router.push({ name: "transferSlip" });
          } else if (res.data.code == "6666") {
            this.$message({
              showClose: true,
              message: "token异常，请重新登录",
              type: "error"
            });
          } else if(res.data.code === "3010") {
              return this.$message.error(res.data.msg)
          }else {
            this.$message.error(res.data.msg);
          }
        })
       }else {
        return this.$message.error("请添加数量");
      }
      // aaa.forEach(item => {
      //   if (item.count == null) {
      //     this.$message("请添加数量");
      //   } else {
      //     let token = sessionStorage.getItem("token");
      //     that
      //       .$axios({
      //         url: window.apiStore + "transfer/add",
      //         method: "POST",
      //         headers: { "content-type": "application/x-www-form-urlencoded" },
      //         data: qs.stringify({
      //           token: token,
      //           json: JSON.stringify(aaa),
      //           storeCodeIn: this.Zcode
      //         })
      //       })
      //       .then(res => {
      //         if (res.data.code == "0000") {
      //           that.$router.push({ name: "transferSlip" });
      //         } else if (res.data.code == "6666") {
      //           this.$message({
      //             showClose: true,
      //             message: "token异常，请重新登录",
      //             type: "error"
      //           });
      //         } else if(res.data.code === "3010") {
      //             return this.$message.error("商品货号错误，请重新输入")
      //         }else {
      //           this.$message.error(res.data.msg);
      //         }
      //       })
      //   }
      // });
      
    },
    // 返回
    retuBack() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.transferAdd {
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
}
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
h3 {
  margin: 20px 0;
}
.pageFenye{
  margin-top: 20px;
  text-align: center;
}
.goodsInputBox{
  width: 38%;
}
.goodsInputBox .el-input{
  width: 50%;
}
</style>
