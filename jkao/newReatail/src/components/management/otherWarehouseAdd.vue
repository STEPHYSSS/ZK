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
                <input class="inputStyle" type="text" v-model="item.code" @focus="changeDalog" onkeyup="this.value=this.value.replace(/\D/g,'')">
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
      <!-- 商品弹窗 -->
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
                <!-- <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="pageNum"
                  :page-sizes="[20, 40, 60]"
                  :page-size="pageSize"
                  background
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total"
                  class="pagination"
                ></el-pagination> -->
              </div>
            </div>
          </div>
        </el-dialog>
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
      dialogVisible2: false,
      optionsGoods: [], //商品列表
      multipleSelection2: [],
      goodsName:''
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
    // getGoodsList(code, index) {
    //   this.$axios
    //     .post(
    //       "/public/goods/info",
    //       qs.stringify({
    //         goodsCode: code
    //       })
    //     )
    //     .then(res => {
    //       if (res.data.code === "0000") {
    //         this.tableData[index] = res.data.data;
    //         this.$set(this.tableData, index, res.data.data);
    //       } else {
    //         this.$message.error(res.data.msg);
    //       }
    //     });
    // }
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
