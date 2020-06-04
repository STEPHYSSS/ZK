<template>
  <div class="orderEncasement minimum minWidth1600" id="orderEncasement">
    <img @click="goback" class="backImg" src="@/assets/images/returnbutton.png" alt />
    <div class="billBox">
      <!-- <div class="detailBackBtn">
        <router-link :to="{ path: '/orderWarehouseList' }">
          <img src="@/assets/returnbutton.png" alt class="codesty" />
        </router-link>
      </div> -->
      <div class="billboxTab">
        <!-- <h3 class="billtit">集货装箱</h3> -->
        <el-row>
          <el-col :span="6">
            <div>创建日期：{{list.createTime|converTime('YYYY-MM-DD')}}</div>
          </el-col>
          <el-col :span="6">
            <div>门店名称：{{list.storeName}}</div>
          </el-col>
          <el-col :span="6">
            <div>订货数量：{{list.actualDeliver}}</div>
          </el-col>
          <el-col :span="6">
            <div>拣货数量：{{list.actualReceive}}</div>
          </el-col>
        </el-row>

        <table class="deliveTab">
          <tr>
            <td class="rowwith"></td>
            <td class="rowwith"></td>
            <td class="rowwith"></td>
            <div style="text-align:right">
              <el-button class="themeColor increase" @click="encasement">集货装箱</el-button>
            </div>
          </tr>
        </table>
      </div>
      <div class="billboxTab">
        <el-table
          :data="tableData"
          max-height="600"
          style="width: 100%"
          :row-key="getRowKeys"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" :reserve-selection="true" class="leftTitle" align="center"></el-table-column>
          <el-table-column prop="goodsCode" label="货号" align="center"></el-table-column>
          <!-- <el-table-column prop="name" label="品名" align="center"></el-table-column> -->
          <el-table-column prop="count" label="订购数量" align="center"></el-table-column>
          <!-- <el-table-column prop="unit" label="单位" align="center"></el-table-column> -->
          <!-- <el-table-column prop="spec" label="规格" align="center"></el-table-column> -->

          <!-- <el-table-column label="保质期" align="center">
            <template scope="scope">
              <span>{{scope.row.period}}{{scope.row.periodUnit}}</span>
            </template>
          </el-table-column> -->
          <!-- <el-table-column prop="temperature" label="温层" align="center"></el-table-column> -->
          <el-table-column prop="picking" label="拣货数量" align="center"></el-table-column>
        </el-table>
        <el-dialog title="提示" :visible.sync="centerDialogVisible" width="480px" center>
          <div slot="title" class="auditBtn">
            <span class="el-icon-info"></span>
            <span class="auditBtn-1">提示</span>
          </div>
          <div class="title">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="包装箱号" prop="packingCode" align="left">
                <el-input
                  v-model="ruleForm.packingCode"
                  class="small"
                  placeholder="请输入"
                  type='number'
                  maxlength="5"
                ></el-input>
              </el-form-item>
              <el-form-item label="包装人员" prop="packingName" align="left">
                <el-input
                  v-model="ruleForm.packingName"
                  class="small"
                  placeholder="请输入，输入内容不超过20个字符"
                  maxlength="20"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button class="theBtn themeColor textMright" @click="sure('ruleForm')">确定</el-button>
            <el-button class="theBtn resetButton" @click="centerDialogVisible = false">取 消</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "orderEncasement",
  data() {
    return {
      getRowKeys(row) {
        return row.code;
      },
      tableData: [],
      list: {},
      isPacking: "Y",
      centerDialogVisible: false,
      ruleForm: {
        packingCode: "",
        packingName: ""
      },
      subSet: [],
      rules: {
        packingCode: [
          { required: true, message: "请输入包装箱号", trigger: "blur" }
        ],
        packingName: [
          { required: true, message: "请输入包装人员", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    goback(){
      this.$router.push('/orderWarehouseList')
    },
    //获取详情
    getlist() {
      this.$utils
        .post(
          this.reqApi.xinls+"/exam/warehouse/checkout/detail",
          qs.stringify({
           questionCode: sessionStorage.getItem("questionUUid"),
            code: this.$route.query.code,
            isPacking: this.isPacking
          })
        )
        .then(res => {
          if (res.data.code === "0000") {
            this.list = res.data.data.info;
            this.tableData = res.data.data.subList;
            this.list.actualDeliver = 0;
            this.list.actualReceive = 0;
            for (let i = 0; i < this.tableData.length; i++) {
              this.list.actualDeliver += parseFloat(this.tableData[i].count);
              this.list.actualReceive += parseFloat(this.tableData[i].picking);
            }
          } else return this.$message.error(res.data.msg)
        });
    },
    encasement() {
      if (this.subSet.length == 0) {
        return this.$message.error("请选择商品！！");
      }
      this.centerDialogVisible = true;
    },
    handleSelectionChange(selection) {
      this.subSet = [];
      selection.forEach(item => {
        this.subSet.push(item.id);
      });
    },
    sure(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {

          this.$utils
            .post(
              this.reqApi.xinls+"/exam/warehouse/checkout/packing",
              qs.stringify({
                questionCode: sessionStorage.getItem("questionUUid"),
                checkoutCode: this.$route.query.code,
                subSet: JSON.stringify(this.subSet),
                packingCode: this.ruleForm.packingCode,
                packingName: this.ruleForm.packingName
              })
            )
            .then(res => {
              if (res.data.code == "0000") {
                this.centerDialogVisible = false;
                this.$router.push({
                  name: "orderWarehouseList"
                });
              } else {
                this.$message.error(res.data.msg);
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  filters: {
    statusTip(value) {
      if (value == "F") {
        return "审核不通过";
      } else if (value == "W") {
        return "待审核";
      } else if (value == "S") {
        return "审核通过";
      }
    }
  }
};
</script>
<style scoped>
#orderEncasement {
  min-height: 647px;
  /* min-width: 1200px; */
  position: relative;
}
#orderEncasement .billBox {
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
  padding-top: 15px;
}
#orderEncasement .billboxTab {
  margin-left: 20px;
  margin-right: 22px;
  padding-bottom: 15px;
}  
#orderEncasement .billboxTab .billtit span {
  font-weight: 100;
  font-size: 16px;
}
#orderEncasement .deliveTab {
  position: relative;
  border-collapse: collapse;
  width: 100%;
  text-align: left;
}
#orderEncasement .deliveTab td {
  width: 25%;
  padding-bottom: 15px;
  font-size: 16px;
}
#orderEncasement .deliveTab tr {
  width: 100%;
}
#orderEncasement .deliveTab .rowwith {
  width: 30%;
}
/* 返回 */
#orderEncasement .nav {
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
#orderEncasement .inputBox {
  height: 70px;
  width: 300px;
  margin-bottom: 10px;
  resize: none;
  outline: none;
  line-height: 70px;
}
#orderEncasement .btnAdd {
  background-color: #e50109;
  color: #fff;
  margin: 0;
  margin-bottom: 10px;
}
#orderEncasement .auditBtn {
  position: absolute;
  left: 0;
  top: -1px;
  padding-top: 20px;
  border-bottom: 3px solid #dbe0e5;
  width: 100%;
  text-align: left;
  padding-left: 14px;
  box-sizing: border-box;
}
#orderEncasement .el-icon-info {
  color: #ffab5a;
  font-size: 25px;
}
#orderEncasement .auditBtn-1 {
  font-size: 16px;
  margin-left: 5px;
  vertical-align: top;
}
#orderEncasement .title {
  text-align: center;
  margin-top: 15px;
}
#orderEncasement .small {
  width: 85%;
}
#orderEncasement input::-webkit-outer-spin-button,
 input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
}
.backImg {
    position: absolute;
    right: 20px;
    top: 0px;
    cursor: pointer;
    z-index: 55;
}
</style>


